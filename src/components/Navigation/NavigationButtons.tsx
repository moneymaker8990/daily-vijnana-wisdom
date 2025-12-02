type NavigationButtonsProps = {
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  disablePrev?: boolean;
};

export function NavigationButtons({
  onPrev,
  onNext,
  onToday,
  disablePrev,
}: NavigationButtonsProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={disablePrev}
        className="px-4 py-2.5 rounded-xl glass-button text-sm md:text-base text-white/90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ← Previous Day
      </button>
      <button
        type="button"
        onClick={onToday}
        className="px-5 py-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm md:text-base font-medium hover:bg-white/30 transition-all duration-300"
      >
        Today
      </button>
      <button
        type="button"
        onClick={onNext}
        className="px-4 py-2.5 rounded-xl glass-button text-sm md:text-base text-white/90"
      >
        Next Day →
      </button>
    </div>
  );
}




