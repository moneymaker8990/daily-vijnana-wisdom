import { useState } from 'react';

type JournalCalendarProps = {
  journalingDays: string[]; // ISO date strings
  onSelectDate: (date: string) => void;
};

export function JournalCalendar({ journalingDays, onSelectDate }: JournalCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  
  const monthName = currentMonth.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const today = new Date().toISOString().split('T')[0];
  
  const dayHasEntry = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return journalingDays.includes(dateStr);
  };
  
  const isToday = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateStr === today;
  };
  
  const handleDayClick = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (dayHasEntry(day)) {
      onSelectDate(dateStr);
    }
  };

  const days = [];
  // Add empty cells for days before the first day
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-10" />);
  }
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const hasEntry = dayHasEntry(day);
    const isTodayDay = isToday(day);
    
    days.push(
      <button
        key={day}
        onClick={() => handleDayClick(day)}
        disabled={!hasEntry}
        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm transition-all ${
          hasEntry
            ? 'bg-violet-500/30 text-white hover:bg-violet-500/50 cursor-pointer'
            : 'text-white/30 cursor-default'
        } ${
          isTodayDay
            ? 'ring-2 ring-violet-400'
            : ''
        }`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-white font-medium">{monthName}</h3>
        <button
          onClick={nextMonth}
          className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="h-8 flex items-center justify-center text-xs text-white/40">
            {day}
          </div>
        ))}
      </div>
      
      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <div className="w-3 h-3 rounded-full bg-violet-500/30" />
          <span>Journal entry</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <div className="w-3 h-3 rounded-full ring-2 ring-violet-400" />
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}

