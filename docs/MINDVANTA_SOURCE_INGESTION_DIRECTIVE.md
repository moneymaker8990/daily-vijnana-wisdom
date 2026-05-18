# Mindvanta source ingestion (curated allowlist)

This document is **operational engineering guidance**, not legal advice. A lawyer should review any production text you ship in a commercial app.

## What was added

- **Supabase schema**: [`supabase/migrations/20260201120000_source_ingestion_catalog.sql`](./../supabase/migrations/20260201120000_source_ingestion_catalog.sql) — `source_candidate`, `catalog_text_version`, `catalog_text_segment`, `review_event`, `ingestion_admins`, RLS, `is_ingestion_admin()`.
- **License classifier**: [`src/core/ingestion/licenseClassifier.ts`](./../src/core/ingestion/licenseClassifier.ts) — conservative defaults (e.g. **NC** → not commercial-eligible; Tier 2 → bibliography-only pipeline default).
- **IA metadata ingest** (allowlist only): [`scripts/ingestion/runIngestMetadata.ts`](./../scripts/ingestion/runIngestMetadata.ts), seeds in [`scripts/ingestion/allowlist.seeds.json`](./../scripts/ingestion/allowlist.seeds.json).
- **Admin UI**: open the app with hash **`#admin/sources`** and set **`VITE_ENABLE_SOURCE_ADMIN=true`** (staging / internal builds only).
- **Public segments API**: [`src/lib/ingestion/publicSegments.ts`](./../src/lib/ingestion/publicSegments.ts) — reads rows allowed by RLS (only double-approved versions).

## Hard rules (automation + product)

1. **No random scraping** — scripts only call **Internet Archive** metadata URLs from your seed list (`archive.org/metadata/...`).
2. **No auto-publish** — candidates land as `source_candidate` with review status; **users** only see `catalog_text_segment` rows when the parent `catalog_text_version` has **`approved_for_public_display` and `approved_for_commercial_app`**.
3. **NonCommercial sources** — classifier marks NC as **not** commercially eligible; default workflow tilts to **`bibliography_only`** / blocked for app text unless you document a human override.
4. **Service role** — `SUPABASE_SERVICE_ROLE_KEY` is for **local/CI scripts only**, never `VITE_*` or client bundles.

## Bootstrap

1. Apply migrations: `npx supabase db push --include-all` (use `--include-all` if an older-timestamp migration was added after newer ones).
2. Grant admin access (one-time SQL), e.g. in the Supabase SQL editor:

```sql
insert into public.ingestion_admins (user_id, note)
values ('YOUR_AUTH_USER_UUID', 'founder')
on conflict (user_id) do nothing;
```

(Linked-project maintainers may already have accounts in `ingestion_admins`.)

3. **Load candidates into Postgres** (no service-role key required): from repo root,

```bash
npm run ingest:metadata:push
```

This generates `scripts/ingestion/_generated_candidates.sql` and applies it with `supabase db query --linked`.

Optionally use the **Supabase service role** instead: add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` and run `npm run ingest:metadata`.

4. Enable admin UI in env: `VITE_ENABLE_SOURCE_ADMIN=true`, then visit **`/path#admin/sources`**. Change candidate status, then create **`catalog_text_version`** rows (with approval flags only after legal review).

## MINDVANTA SOURCE INGESTION DIRECTIVE (summary)

- **Production text** may render only when license posture is **CC0, PD mark, confirmed PD edition, commercial-safe open license, or Mindvanta-original** — and after **human** approval flags on `catalog_text_version`.
- **Do not** ship **CC BY-NC / CC BY-NC-SA** as production app text without permission; use **bibliography / reference** instead.
- **Tantrāloka-scale** works: **chapter-level** loading only — see [`LARGE_TEXT_SEGMENT_ARCHITECTURE.md`](./LARGE_TEXT_SEGMENT_ARCHITECTURE.md).
