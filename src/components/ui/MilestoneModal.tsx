type MilestoneModalProps = {
  days: number;
  title: string;
  message: string;
  onDismiss: () => void;
};

export function MilestoneModal({ days, title, message, onDismiss }: MilestoneModalProps) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm bg-gradient-to-br from-violet-950/90 to-indigo-950/90 backdrop-blur-xl rounded-3xl border border-violet-400/20 p-8 shadow-2xl shadow-violet-500/20 text-center">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl" />
        </div>

        {/* Streak number */}
        <div className="relative mb-4">
          <span className="text-6xl font-light text-violet-300 tracking-wider">{days}</span>
          <p className="text-xs uppercase tracking-[0.2em] text-violet-400/70 mt-1">Day Streak</p>
        </div>

        {/* Title */}
        <h2 className="text-xl font-serif font-medium text-white mb-3">{title}</h2>

        {/* Message */}
        <p className="text-white/60 text-sm leading-relaxed mb-6">{message}</p>

        {/* Flame decoration */}
        <div className="text-3xl mb-6">🔥</div>

        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="w-full py-3 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 rounded-xl text-white font-medium shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
