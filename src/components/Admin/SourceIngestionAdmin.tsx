import type { CandidateWorkflowStatus } from '@core/ingestion/types';
import { isSupabaseConfigured, supabase } from '@lib/supabase';
import { useCallback, useEffect, useState } from 'react';

type CandidateRow = {
  id: string;
  work_id: string;
  title: string | null;
  source_url: string;
  internet_archive_identifier: string | null;
  license_claim: string | null;
  license_url: string | null;
  license_confidence: string;
  commercial_use_allowed: boolean;
  status: CandidateWorkflowStatus;
  ingestion_tier: string;
  classifier_rationale_codes: string[];
  publication_year: number | null;
  notes: string | null;
  fetched_at: string | null;
};

const VERSION_TYPES = [
  'sanskrit_root',
  'transliteration',
  'english_translation',
  'commentary',
  'summary',
] as const;

const STATUS_ACTIONS: CandidateWorkflowStatus[] = [
  'needs_review',
  'approved_root_text',
  'approved_translation',
  'bibliography_only',
  'blocked',
];

type Props = {
  onClose: () => void;
};

export function SourceIngestionAdmin({ onClose }: Props) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [candidates, setCandidates] = useState<CandidateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<CandidateRow | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [versionType, setVersionType] = useState<(typeof VERSION_TYPES)[number]>('sanskrit_root');
  const [licenseStatus, setLicenseStatus] = useState('requires_legal_review');
  const [approvedPublic, setApprovedPublic] = useState(false);
  const [approvedCommercial, setApprovedCommercial] = useState(false);
  const [attributionText, setAttributionText] = useState('');
  const [sourceNotes, setSourceNotes] = useState('');
  const [versionBusy, setVersionBusy] = useState(false);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).');
      setAuthorized(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data: isAdmin, error: rpcErr } = await supabase.rpc('is_ingestion_admin');
    if (rpcErr) {
      setError(rpcErr.message);
      setAuthorized(false);
      setLoading(false);
      return;
    }

    const ok = Boolean(isAdmin);
    setAuthorized(ok);
    if (!ok) {
      setLoading(false);
      return;
    }

    const { data, error: selErr } = await supabase
      .from('source_candidate')
      .select(
        'id, work_id, title, source_url, internet_archive_identifier, license_claim, license_url, license_confidence, commercial_use_allowed, status, ingestion_tier, classifier_rationale_codes, publication_year, notes, fetched_at'
      )
      .order('fetched_at', { ascending: false });

    if (selErr) {
      setError(selErr.message);
      setCandidates([]);
    } else {
      setCandidates((data ?? []) as CandidateRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const setStatus = async (row: CandidateRow, status: CandidateWorkflowStatus) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      setError('Sign in required to review sources.');
      return;
    }

    setBusyId(row.id);
    setError(null);

    const prev = row.status;
    const { error: upErr } = await supabase
      .from('source_candidate')
      .update({
        status,
        reviewed_at: new Date().toISOString(),
        reviewed_by: session.user.id,
      })
      .eq('id', row.id);

    if (upErr) {
      setError(upErr.message);
      setBusyId(null);
      return;
    }

    await supabase.from('review_event').insert({
      candidate_id: row.id,
      actor_id: session.user.id,
      action: 'status_change',
      payload: { from: prev, to: status },
    });

    await load();
    setBusyId(null);
    setSelected((s) => (s?.id === row.id ? { ...row, status } : s));
  };

  const createCatalogVersion = async (row: CandidateRow) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      setError('Sign in required.');
      return;
    }

    setVersionBusy(true);
    setError(null);

    const { data: inserted, error: insErr } = await supabase
      .from('catalog_text_version')
      .insert({
        work_id: row.work_id,
        source_candidate_id: row.id,
        version_type: versionType,
        license_status: licenseStatus,
        approved_for_public_display: approvedPublic,
        approved_for_commercial_app: approvedCommercial,
        attribution_text: attributionText.trim() || null,
        source_notes: sourceNotes.trim() || null,
      })
      .select('id')
      .maybeSingle();

    if (insErr) {
      setError(insErr.message);
      setVersionBusy(false);
      return;
    }

    await supabase.from('review_event').insert({
      candidate_id: row.id,
      actor_id: session.user.id,
      action: 'create_catalog_text_version',
      payload: { version_id: inserted?.id, version_type: versionType },
    });

    setVersionBusy(false);
    setAttributionText('');
    setSourceNotes('');
    setApprovedPublic(false);
    setApprovedCommercial(false);
    await load();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 text-white">
        <p className="text-white/70 text-sm">Loading admin…</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white p-6">
        <p className="text-center text-white/80 max-w-md mb-4">
          Source ingestion admin is restricted. Sign in with an account that has been added to
          <code className="mx-1 text-violet-300">ingestion_admins</code> in Supabase.
        </p>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950 text-white overflow-hidden">
      <header className="shrink-0 border-b border-white/10 px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-white">Source candidates</h1>
          <p className="text-xs text-white/50">
            Ingestion never auto-publishes. Approve versions separately in{' '}
            <code className="text-violet-300">catalog_text_version</code>.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-sm"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-sm"
          >
            Close
          </button>
        </div>
      </header>

      {error && <div className="shrink-0 px-4 py-2 bg-red-950/50 text-red-200 text-sm">{error}</div>}

      <div className="flex-1 flex min-h-0">
        <aside className="w-1/2 max-w-lg border-r border-white/10 overflow-y-auto">
          <ul className="divide-y divide-white/10">
            {candidates.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelected(c)}
                  className={`w-full text-left px-4 py-3 hover:bg-white/5 ${selected?.id === c.id ? 'bg-white/10' : ''}`}
                >
                  <div className="text-sm font-medium text-white truncate">{c.title ?? c.source_url}</div>
                  <div className="text-xs text-white/45 truncate">
                    {c.work_id} · {c.status} · {c.internet_archive_identifier ?? 'no ia id'}
                  </div>
                </button>
              </li>
            ))}
          </ul>
          {candidates.length === 0 && (
            <p className="p-4 text-sm text-white/45">
              No candidates yet. Run{' '}
              <code className="text-violet-300">npm run ingest:metadata:push</code> or service-role ingest.
            </p>
          )}
        </aside>

        <main className="flex-1 overflow-y-auto p-4">
          {!selected ? (
            <p className="text-white/45 text-sm">Select a candidate.</p>
          ) : (
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-base font-semibold">{selected.title ?? 'Untitled'}</h2>
              <dl className="text-sm space-y-2 text-white/75">
                <div>
                  <dt className="text-white/40">Work ID</dt>
                  <dd>{selected.work_id}</dd>
                </div>
                <div>
                  <dt className="text-white/40">URL</dt>
                  <dd>
                    <a href={selected.source_url} className="text-violet-400 underline break-all" target="_blank" rel="noreferrer">
                      {selected.source_url}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-white/40">License</dt>
                  <dd className="break-words">{selected.license_claim ?? '—'}</dd>
                </div>
                {selected.license_url && (
                  <div>
                    <dt className="text-white/40">License URL</dt>
                    <dd>
                      <a href={selected.license_url} className="text-violet-400 underline break-all" target="_blank" rel="noreferrer">
                        {selected.license_url}
                      </a>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-white/40">Classifier</dt>
                  <dd>{(selected.classifier_rationale_codes ?? []).join(', ') || '—'}</dd>
                </div>
                <div>
                  <dt className="text-white/40">Commercial OK (auto)</dt>
                  <dd>{selected.commercial_use_allowed ? 'yes' : 'no'}</dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-2">
                {STATUS_ACTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={busyId === selected.id}
                    onClick={() => void setStatus(selected, s)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs capitalize disabled:opacity-50"
                  >
                    {s.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>

              <div className="border border-white/10 rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-medium text-white">Create catalog_text_version</h3>
                <p className="text-xs text-white/45">
                  Tie an editorial version to this candidate. Only check display + commercial approval when counsel
                  agrees.
                </p>
                <label className="block text-xs text-white/50">
                  Version type
                  <select
                    value={versionType}
                    onChange={(e) => setVersionType(e.target.value as (typeof VERSION_TYPES)[number])}
                    className="mt-1 w-full rounded-lg bg-slate-900 border border-white/15 px-2 py-1.5 text-sm text-white"
                  >
                    {VERSION_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs text-white/50">
                  license_status (app enum string)
                  <input
                    value={licenseStatus}
                    onChange={(e) => setLicenseStatus(e.target.value)}
                    className="mt-1 w-full rounded-lg bg-slate-900 border border-white/15 px-2 py-1.5 text-sm text-white"
                  />
                </label>
                <label className="flex items-center gap-2 text-xs text-white/70">
                  <input type="checkbox" checked={approvedPublic} onChange={(e) => setApprovedPublic(e.target.checked)} />
                  approved_for_public_display
                </label>
                <label className="flex items-center gap-2 text-xs text-white/70">
                  <input
                    type="checkbox"
                    checked={approvedCommercial}
                    onChange={(e) => setApprovedCommercial(e.target.checked)}
                  />
                  approved_for_commercial_app
                </label>
                <label className="block text-xs text-white/50">
                  attribution_text
                  <textarea
                    value={attributionText}
                    onChange={(e) => setAttributionText(e.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded-lg bg-slate-900 border border-white/15 px-2 py-1.5 text-sm text-white"
                  />
                </label>
                <label className="block text-xs text-white/50">
                  source_notes
                  <textarea
                    value={sourceNotes}
                    onChange={(e) => setSourceNotes(e.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded-lg bg-slate-900 border border-white/15 px-2 py-1.5 text-sm text-white"
                  />
                </label>
                <button
                  type="button"
                  disabled={versionBusy}
                  onClick={() => void createCatalogVersion(selected)}
                  className="px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-sm disabled:opacity-50"
                >
                  {versionBusy ? 'Saving…' : 'Create version row'}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
