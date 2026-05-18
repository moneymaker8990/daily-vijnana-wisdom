/**
 * Upsert source_candidate rows from allowlist.seeds.json (Internet Archive metadata).
 *
 * Modes:
 *   --dry-run          Log only
 *   --emit-sql PATH    Write PostgreSQL statements (apply with supabase db query --linked -f PATH)
 *   default            HTTP upsert via SUPABASE_SERVICE_ROLE_KEY
 *
 * Env: SUPABASE_URL or VITE_SUPABASE_URL; SUPABASE_SERVICE_ROLE_KEY for HTTP mode.
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fetchArchiveMetadata, mapArchiveToCandidateFields } from './fetchArchiveMetadata';
import type { SourceIngestionTier } from '../../src/core/ingestion/types';

config({ path: join(process.cwd(), '.env.local') });
config({ path: join(process.cwd(), '.env') });

const __dirname = dirname(fileURLToPath(import.meta.url));

type SeedEntry = {
  work_id: string;
  source_type: string;
  ingestion_tier: SourceIngestionTier;
  identifiers: string[];
  notes?: string;
};

type SeedFile = {
  entries: SeedEntry[];
};

type CandidateInsertRow = ReturnType<typeof mapArchiveToCandidateFields>;

function parseArgs() {
  const dryRun = process.argv.includes('--dry-run');
  const emitIdx = process.argv.indexOf('--emit-sql');
  const emitSql = emitIdx >= 0 ? process.argv[emitIdx + 1] : null;
  return { dryRun, emitSql: emitSql && emitSql.startsWith('-') ? null : emitSql };
}

function sqlStr(s: string | null | undefined): string {
  if (s == null || s === '') return 'NULL';
  return "'" + String(s).replace(/'/g, "''") + "'";
}

function sqlJson(obj: unknown): string {
  const body = JSON.stringify(obj ?? null);
  return `$json$${body}$json$::jsonb`;
}

function sqlTextArray(arr: string[] | undefined): string {
  if (!arr?.length) return 'ARRAY[]::text[]';
  const parts = arr.map((a) => "'" + a.replace(/'/g, "''") + "'");
  return `ARRAY[${parts.join(',')}]::text[]`;
}

function rowToUpsertSql(row: CandidateInsertRow): string {
  const tier = `'${row.ingestion_tier}'::public.source_ingestion_tier`;
  const status = `'${row.status}'::public.candidate_workflow_status`;
  const licConf = `'${row.license_confidence}'`;

  const cols = `work_id, title, source_url, source_domain, source_type, internet_archive_identifier, publication_year, editor, translator, publisher, language, script, file_format, license_claim, license_url, license_confidence, commercial_use_allowed, derivative_use_allowed, attribution_required, public_domain_evidence, ingestion_tier, classifier_rationale_codes, metadata_snapshot, fetched_at, status, notes`;

  const vals = [
    sqlStr(row.work_id),
    sqlStr(row.title),
    sqlStr(row.source_url),
    sqlStr(row.source_domain),
    sqlStr(row.source_type),
    sqlStr(row.internet_archive_identifier),
    row.publication_year == null ? 'NULL' : String(row.publication_year),
    sqlStr(row.editor),
    sqlStr(row.translator),
    sqlStr(row.publisher),
    sqlStr(row.language),
    sqlStr(row.script),
    sqlStr(row.file_format),
    sqlStr(row.license_claim),
    sqlStr(row.license_url),
    licConf,
    row.commercial_use_allowed ? 'true' : 'false',
    row.derivative_use_allowed ? 'true' : 'false',
    row.attribution_required ? 'true' : 'false',
    sqlJson(row.public_domain_evidence),
    tier,
    sqlTextArray(row.classifier_rationale_codes),
    sqlJson(row.metadata_snapshot),
    row.fetched_at ? sqlStr(row.fetched_at) + '::timestamptz' : 'now()',
    status,
    sqlStr(row.notes),
  ].join(',\n  ');

  const setClause = `
  work_id = EXCLUDED.work_id,
  title = EXCLUDED.title,
  source_url = EXCLUDED.source_url,
  source_domain = EXCLUDED.source_domain,
  source_type = EXCLUDED.source_type,
  publication_year = EXCLUDED.publication_year,
  editor = EXCLUDED.editor,
  translator = EXCLUDED.translator,
  publisher = EXCLUDED.publisher,
  language = EXCLUDED.language,
  script = EXCLUDED.script,
  file_format = EXCLUDED.file_format,
  license_claim = EXCLUDED.license_claim,
  license_url = EXCLUDED.license_url,
  license_confidence = EXCLUDED.license_confidence,
  commercial_use_allowed = EXCLUDED.commercial_use_allowed,
  derivative_use_allowed = EXCLUDED.derivative_use_allowed,
  attribution_required = EXCLUDED.attribution_required,
  public_domain_evidence = EXCLUDED.public_domain_evidence,
  ingestion_tier = EXCLUDED.ingestion_tier,
  classifier_rationale_codes = EXCLUDED.classifier_rationale_codes,
  metadata_snapshot = EXCLUDED.metadata_snapshot,
  fetched_at = EXCLUDED.fetched_at,
  status = EXCLUDED.status,
  notes = EXCLUDED.notes`;

  return `INSERT INTO public.source_candidate (${cols})
VALUES (
  ${vals}
)
ON CONFLICT (internet_archive_identifier) WHERE (internet_archive_identifier IS NOT NULL)
DO UPDATE SET ${setClause};`;
}

async function main() {
  const { dryRun, emitSql } = parseArgs();
  const url = (process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL)?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!dryRun && !emitSql && (!url || !key)) {
    console.error(
      'Set SUPABASE_SERVICE_ROLE_KEY (+ SUPABASE_URL or VITE_SUPABASE_URL), or use --dry-run / --emit-sql PATH'
    );
    process.exit(1);
  }

  const seedsPath = join(__dirname, 'allowlist.seeds.json');
  const seeds: SeedFile = JSON.parse(readFileSync(seedsPath, 'utf8')) as SeedFile;

  const supabase = url && key ? createClient(url, key) : null;
  const sqlChunks: string[] = ['BEGIN;', 'SET statement_timeout = \'120s\';'];

  let fetched = 0;
  let errors = 0;

  for (const entry of seeds.entries) {
    if (entry.source_type !== 'internet_archive') {
      console.warn(`Skip non-IA entry work_id=${entry.work_id}`);
      continue;
    }

    for (const id of entry.identifiers) {
      if (!id.trim()) continue;
      try {
        const meta = await fetchArchiveMetadata(id);
        const row = mapArchiveToCandidateFields(id, meta, entry.work_id, entry.ingestion_tier);
        if (entry.notes) {
          row.notes = [entry.notes, row.notes].filter(Boolean).join(' | ') || entry.notes;
        }
        fetched++;
        console.log(
          dryRun || emitSql ? '[prepare]' : 'upsert',
          id,
          row.title ?? '',
          '=>',
          row.status
        );

        if (emitSql) {
          sqlChunks.push(rowToUpsertSql(row));
        } else if (!dryRun && supabase) {
          const { data: existing, error: selErr } = await supabase
            .from('source_candidate')
            .select('id')
            .eq('internet_archive_identifier', id)
            .maybeSingle();
          if (selErr) {
            console.error('Select error', id, selErr.message);
            errors++;
            continue;
          }
          const op = existing
            ? supabase.from('source_candidate').update(row).eq('id', existing.id)
            : supabase.from('source_candidate').insert(row);
          const { error } = await op;
          if (error) {
            console.error('Write error', id, error.message);
            errors++;
          }
        }
      } catch (e) {
        console.error('Fetch failed', id, e instanceof Error ? e.message : e);
        errors++;
      }
    }
  }

  if (emitSql) {
    sqlChunks.push('COMMIT;');
    writeFileSync(emitSql, sqlChunks.join('\n\n') + '\n', 'utf8');
    console.log(`Wrote ${emitSql} (${sqlChunks.length - 3} upserts)`);
  }

  console.log(`Done. processed=${fetched} errors=${errors} dryRun=${dryRun} emitSql=${!!emitSql}`);
  if (errors) process.exit(1);
}

main();
