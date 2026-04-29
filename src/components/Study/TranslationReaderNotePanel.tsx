import type { TranslationReaderNote } from '@core/library/types';

export function translationNoteHasContent(note: TranslationReaderNote | undefined): boolean {
  if (!note) return false;
  return Boolean(note.tightVsLoose || note.alternatives || note.takeaway);
}

/** Plain text for AI explain / prompts */
export function formatTranslationNoteForPrompt(note: TranslationReaderNote | undefined): string {
  if (!translationNoteHasContent(note) || !note) return '';
  const parts: string[] = [];
  if (note.tightVsLoose) parts.push(`Close vs interpretive: ${note.tightVsLoose}`);
  if (note.alternatives) parts.push(`Other readings: ${note.alternatives}`);
  if (note.takeaway) parts.push(`Takeaway: ${note.takeaway}`);
  return parts.join('\n');
}

type TranslationReaderNotePanelProps = {
  note: TranslationReaderNote;
  /** library: full Sacred Text reader; compact: lesson cards; daily: wrapped in details */
  variant: 'library' | 'compact' | 'daily';
};

function NoteBody({
  note,
  labelClass,
  bodyClass,
}: {
  note: TranslationReaderNote;
  labelClass: string;
  bodyClass: string;
}) {
  return (
    <>
      {note.tightVsLoose && (
        <div className="mb-4 last:mb-0">
          <p className={labelClass}>What is close · what is stretched</p>
          <p className={bodyClass}>{note.tightVsLoose}</p>
        </div>
      )}
      {note.alternatives && (
        <div className="mb-4 last:mb-0">
          <p className={labelClass}>What else it can mean</p>
          <p className={bodyClass}>{note.alternatives}</p>
        </div>
      )}
      {note.takeaway && (
        <div className="mb-0">
          <p className={labelClass}>Takeaway</p>
          <p className={bodyClass}>{note.takeaway}</p>
        </div>
      )}
    </>
  );
}

export function TranslationReaderNotePanel({ note, variant }: TranslationReaderNotePanelProps) {
  if (!translationNoteHasContent(note)) return null;

  if (variant === 'library') {
    return (
      <div className="mt-6 pt-6 border-t border-white/10">
        <h4 className="text-xs uppercase tracking-wider text-amber-200/80 mb-3">Note on this rendering</h4>
        <p className="text-[11px] text-white/45 mb-4 leading-relaxed">
          The English above is an in-app close reading, not a published translation. This note marks honest limits—where
          the wording is firmer, where it is more interpretive, and what you might still ask a teacher or Sanskrit
          commentary about.
        </p>
        <NoteBody
          note={note}
          labelClass="text-[11px] uppercase tracking-wider text-violet-300/65 mb-1.5"
          bodyClass="text-sm md:text-base text-white/72 leading-relaxed"
        />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <details className="mt-3 group">
        <summary className="text-[10px] uppercase tracking-wider text-violet-300/60 cursor-pointer list-none flex items-center gap-1 [&::-webkit-details-marker]:hidden">
          <span className="opacity-70 group-open:rotate-90 transition-transform inline-block">›</span>
          Note on this rendering
        </summary>
        <div className="mt-2 pl-3 border-l-2 border-violet-500/25 space-y-3">
          <p className="text-[10px] text-white/40 leading-relaxed">
            In-app close reading only—see note for where English is tight vs approximate.
          </p>
          <NoteBody
            note={note}
            labelClass="text-[10px] uppercase tracking-wider text-violet-300/55 mb-1"
            bodyClass="text-xs text-white/62 leading-relaxed"
          />
        </div>
      </details>
    );
  }

  /* daily */
  return (
    <details className="mt-3 text-left w-full">
      <summary className="text-[10px] text-emerald-300/65 uppercase tracking-wider cursor-pointer list-none text-center [&::-webkit-details-marker]:hidden">
        Note on this translation
      </summary>
      <div className="mt-2 pt-2 border-t border-emerald-400/15 space-y-3">
        <p className="text-[10px] text-white/45 leading-relaxed text-center">
          Close reading only—not a published translation.
        </p>
        <NoteBody
          note={note}
          labelClass="text-[10px] uppercase tracking-wider text-emerald-300/55 mb-1 text-center"
          bodyClass="text-xs text-white/65 leading-relaxed text-center"
        />
      </div>
    </details>
  );
}
