-- Mindvanta curated source ingestion: candidates, versions, segments, review audit.
-- Apply: supabase db push or paste into SQL editor.
-- Does not replace legal review; humans approve production text.

create extension if not exists pgcrypto;

do $$ begin
  create type public.candidate_workflow_status as enum (
    'candidate',
    'needs_review',
    'approved_root_text',
    'approved_translation',
    'bibliography_only',
    'blocked'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.source_ingestion_tier as enum (
    'tier1_production_candidate',
    'tier2_reference_only',
    'tier3_blocked'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.catalog_version_type as enum (
    'sanskrit_root',
    'transliteration',
    'english_translation',
    'commentary',
    'summary'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.ingestion_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  note text
);

comment on table public.ingestion_admins is 'Supabase Auth users who may manage source candidates (RLS).';

create table if not exists public.source_candidate (
  id uuid primary key default gen_random_uuid(),
  work_id text not null,
  title text,
  source_url text not null,
  source_domain text not null,
  source_type text not null,
  internet_archive_identifier text,
  publication_year integer,
  editor text,
  translator text,
  publisher text,
  language text,
  script text,
  file_format text,
  license_claim text,
  license_url text,
  license_confidence text not null default 'low' check (license_confidence in ('high', 'medium', 'low')),
  commercial_use_allowed boolean not null default false,
  derivative_use_allowed boolean not null default false,
  attribution_required boolean not null default false,
  public_domain_evidence jsonb,
  ingestion_tier public.source_ingestion_tier not null default 'tier1_production_candidate',
  classifier_rationale_codes text[] not null default '{}',
  metadata_snapshot jsonb,
  fetched_at timestamptz,
  status public.candidate_workflow_status not null default 'candidate',
  notes text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users (id)
);

create index if not exists source_candidate_work_id_idx on public.source_candidate (work_id);
create index if not exists source_candidate_status_idx on public.source_candidate (status);
create unique index if not exists source_candidate_ia_id_uidx
  on public.source_candidate (internet_archive_identifier)
  where internet_archive_identifier is not null;

comment on table public.source_candidate is 'Inbound source; never auto-published to users without catalog_text_version approval.';

create table if not exists public.catalog_text_version (
  id uuid primary key default gen_random_uuid(),
  work_id text not null,
  source_candidate_id uuid references public.source_candidate (id) on delete set null,
  version_type public.catalog_version_type not null,
  license_status text not null default 'requires_legal_review',
  approved_for_public_display boolean not null default false,
  approved_for_commercial_app boolean not null default false,
  attribution_text text,
  source_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists catalog_text_version_work_idx on public.catalog_text_version (work_id);

comment on table public.catalog_text_version is 'Ship only when both approval flags are true for commercial Mindvanta.';

create table if not exists public.catalog_text_segment (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.catalog_text_version (id) on delete cascade,
  work_id text not null,
  chapter integer,
  section text,
  verse_number integer,
  sutra_number integer,
  canonical_reference text,
  devanagari text,
  transliteration text,
  translation text,
  commentary text,
  content_kind text not null default 'source_text' check (content_kind in ('source_text', 'translation', 'educational_note')),
  source_page text,
  confidence_score real,
  sort_key text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists catalog_text_segment_version_idx on public.catalog_text_segment (version_id);
create index if not exists catalog_text_segment_work_chapter_idx on public.catalog_text_segment (work_id, chapter);

create table if not exists public.review_event (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid references public.source_candidate (id) on delete cascade,
  actor_id uuid references auth.users (id),
  action text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists review_event_candidate_idx on public.review_event (candidate_id);

create or replace function public.touch_catalog_text_version_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists catalog_text_version_touch on public.catalog_text_version;
create trigger catalog_text_version_touch
  before update on public.catalog_text_version
  for each row
  execute function public.touch_catalog_text_version_updated_at();

create or replace function public.is_ingestion_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.ingestion_admins i
    where i.user_id = auth.uid()
  );
$$;

grant execute on function public.is_ingestion_admin() to authenticated;
grant execute on function public.is_ingestion_admin() to anon;

alter table public.ingestion_admins enable row level security;
alter table public.source_candidate enable row level security;
alter table public.catalog_text_version enable row level security;
alter table public.catalog_text_segment enable row level security;
alter table public.review_event enable row level security;

drop policy if exists ingestion_admins_select on public.ingestion_admins;
create policy ingestion_admins_select on public.ingestion_admins
  for select
  to authenticated
  using (public.is_ingestion_admin());

drop policy if exists source_candidate_admin_all on public.source_candidate;
create policy source_candidate_admin_all on public.source_candidate
  for all
  to authenticated
  using (public.is_ingestion_admin())
  with check (public.is_ingestion_admin());

drop policy if exists catalog_version_admin_all on public.catalog_text_version;
create policy catalog_version_admin_all on public.catalog_text_version
  for all
  to authenticated
  using (public.is_ingestion_admin())
  with check (public.is_ingestion_admin());

drop policy if exists catalog_version_public_read on public.catalog_text_version;
create policy catalog_version_public_read on public.catalog_text_version
  for select
  to anon, authenticated
  using (
    approved_for_public_display
    and approved_for_commercial_app
  );

drop policy if exists catalog_segment_admin_all on public.catalog_text_segment;
create policy catalog_segment_admin_all on public.catalog_text_segment
  for all
  to authenticated
  using (public.is_ingestion_admin())
  with check (public.is_ingestion_admin());

drop policy if exists catalog_segment_public_read on public.catalog_text_segment;
create policy catalog_segment_public_read on public.catalog_text_segment
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.catalog_text_version v
      where v.id = catalog_text_segment.version_id
        and v.approved_for_public_display
        and v.approved_for_commercial_app
    )
  );

drop policy if exists review_event_admin_all on public.review_event;
create policy review_event_admin_all on public.review_event
  for all
  to authenticated
  using (public.is_ingestion_admin())
  with check (public.is_ingestion_admin());
