type JourneyProgressProps = {
  currentDay: number;
  totalDays?: number;
};

export function JourneyProgress({ currentDay, totalDays = 365 }: JourneyProgressProps) {
  const progress = (currentDay / totalDays) * 100;
  const weeksComplete = Math.floor(currentDay / 7);
  const monthsApprox = Math.floor(currentDay / 30);

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs uppercase tracking-[0.15em] text-white/50">Your Journey</h4>
        <span className="text-xs text-violet-300/70">{progress.toFixed(1)}%</span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-3">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
        {/* Milestone markers */}
        {[25, 50, 75].map((milestone) => (
          <div
            key={milestone}
            className={`absolute top-0 w-0.5 h-full ${
              progress >= milestone ? 'bg-white/40' : 'bg-white/20'
            }`}
            style={{ left: `${milestone}%` }}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-white/5 rounded-lg py-2">
          <p className="text-lg font-light text-white">{currentDay}</p>
          <p className="text-[10px] text-white/40 uppercase tracking-wider">Days</p>
        </div>
        <div className="bg-white/5 rounded-lg py-2">
          <p className="text-lg font-light text-white">{weeksComplete}</p>
          <p className="text-[10px] text-white/40 uppercase tracking-wider">Weeks</p>
        </div>
        <div className="bg-white/5 rounded-lg py-2">
          <p className="text-lg font-light text-white">{monthsApprox}</p>
          <p className="text-[10px] text-white/40 uppercase tracking-wider">Months</p>
        </div>
      </div>

      {/* Encouragement */}
      <p className="text-center text-xs text-white/40 mt-3 italic">
        {currentDay < 7 && "Beginning the path..."}
        {currentDay >= 7 && currentDay < 30 && "Building momentum..."}
        {currentDay >= 30 && currentDay < 90 && "Growing in wisdom..."}
        {currentDay >= 90 && currentDay < 180 && "Deepening your practice..."}
        {currentDay >= 180 && currentDay < 300 && "Halfway through the journey..."}
        {currentDay >= 300 && currentDay < 365 && "Nearing completion..."}
        {currentDay >= 365 && "Journey complete! ✨"}
      </p>
    </div>
  );
}

