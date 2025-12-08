import { useState, useEffect } from 'react';
import { 
  loadJournalEntries, 
  deleteJournalEntry, 
  getJournalStats, 
  hasEntryToday,
  searchEntries,
  getAllTags,
  getEntriesByTag,
  type JournalEntry,
  type JournalStats as JournalStatsType
} from '../../lib/journalStorage';
import { getDailyPrompt, moodInfo, type JournalPrompt } from '../../data/journalPrompts';
import { JournalEntryForm } from './JournalEntryForm';
import { JournalEntryDetail } from './JournalEntryDetail';
import { JournalCalendar } from './JournalCalendar';
import { JournalStats } from './JournalStats';

type View = 'list' | 'form' | 'detail' | 'calendar' | 'stats';

export function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [stats, setStats] = useState<JournalStatsType | null>(null);
  const [view, setView] = useState<View>('list');
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [viewingEntry, setViewingEntry] = useState<JournalEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [initialPrompt, setInitialPrompt] = useState<JournalPrompt | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setEntries(loadJournalEntries());
    setStats(getJournalStats());
    setAllTags(getAllTags());
  };

  const handleSave = () => {
    refreshData();
    setView('list');
    setEditingEntry(null);
    setInitialPrompt(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      deleteJournalEntry(id);
      refreshData();
      setView('list');
      setViewingEntry(null);
    }
  };

  const startNewEntry = (prompt?: JournalPrompt) => {
    setInitialPrompt(prompt || null);
    setEditingEntry(null);
    setView('form');
  };

  const filteredEntries = searchQuery
    ? searchEntries(searchQuery)
    : selectedTag
    ? getEntriesByTag(selectedTag)
    : entries;

  const todayEntry = hasEntryToday();
  const dailyPrompt = getDailyPrompt();

  // View: Entry Form
  if (view === 'form') {
    return (
      <JournalEntryForm
        entry={editingEntry}
        onSave={handleSave}
        onCancel={() => {
          setView('list');
          setEditingEntry(null);
          setInitialPrompt(null);
        }}
        initialPrompt={initialPrompt}
      />
    );
  }

  // View: Entry Detail
  if (view === 'detail' && viewingEntry) {
    return (
      <JournalEntryDetail
        entry={viewingEntry}
        onBack={() => {
          setView('list');
          setViewingEntry(null);
        }}
        onEdit={() => {
          setEditingEntry(viewingEntry);
          setView('form');
          setViewingEntry(null);
        }}
        onDelete={() => handleDelete(viewingEntry.id)}
      />
    );
  }

  // View: Calendar
  if (view === 'calendar' && stats) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setView('list')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
          <h2 className="text-lg font-serif text-white">Calendar</h2>
          <div className="w-16" />
        </div>
        
        <JournalCalendar
          journalingDays={stats.journalingDays}
          onSelectDate={(date) => {
            const entry = entries.find(e => e.date.split('T')[0] === date);
            if (entry) {
              setViewingEntry(entry);
              setView('detail');
            }
          }}
        />
        
        <div className="text-center text-white/40 text-sm">
          Tap on highlighted days to view entries
        </div>
      </div>
    );
  }

  // View: Stats
  if (view === 'stats' && stats) {
    return (
      <JournalStats
        stats={stats}
        onClose={() => setView('list')}
      />
    );
  }

  // View: List (main view)
  return (
    <div className="space-y-6">
      {/* Subheader */}
      <div className="text-center pb-4 border-b border-white/10">
        <p className="text-sm text-white/60">
          Reflect, grow, and discover your inner wisdom
        </p>
      </div>

      {/* Stats Bar */}
      {stats && stats.totalEntries > 0 && (
        <button
          onClick={() => setView('stats')}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl border border-violet-400/20 hover:border-violet-400/40 transition-all group"
        >
          <div className="flex items-center gap-6">
            {/* Streak */}
            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <div className="text-left">
                <p className="text-lg font-light text-white">{stats.currentStreak}</p>
                <p className="text-xs text-white/40">day streak</p>
              </div>
            </div>
            
            {/* Entries */}
            <div className="flex items-center gap-2">
              <span className="text-xl">📖</span>
              <div className="text-left">
                <p className="text-lg font-light text-white">{stats.totalEntries}</p>
                <p className="text-xs text-white/40">entries</p>
              </div>
            </div>
          </div>
          
          <svg className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Daily Prompt Card (if no entry today) */}
      {!todayEntry && (
        <button
          onClick={() => startNewEntry(dailyPrompt)}
          className="w-full text-left bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl p-5 border border-amber-400/20 hover:border-amber-400/40 transition-all group"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">✨</span>
            <div className="flex-1">
              <p className="text-sm text-amber-300/70 mb-1">Today's Prompt</p>
              <p className="text-white font-serif leading-relaxed">
                {dailyPrompt.text}
              </p>
              <p className="mt-3 text-sm text-amber-300/60 flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                <span>Start writing</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </p>
            </div>
          </div>
        </button>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => startNewEntry()}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 rounded-xl text-white font-medium shadow-lg shadow-violet-500/25 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New Entry</span>
        </button>
        
        <button
          onClick={() => setView('calendar')}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
          title="Calendar View"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      {/* Search */}
      {entries.length > 0 && (
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedTag(null);
            }}
            placeholder="Search your entries..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-400/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Tags Filter */}
      {allTags.length > 0 && !searchQuery && (
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 custom-scrollbar">
          <button
            onClick={() => setSelectedTag(null)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-all ${
              !selectedTag
                ? 'bg-violet-500 text-white'
                : 'bg-white/10 text-white/60 hover:text-white'
            }`}
          >
            All
          </button>
          {allTags.slice(0, 8).map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-all ${
                selectedTag === tag
                  ? 'bg-violet-500 text-white'
                  : 'bg-white/10 text-white/60 hover:text-white'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Entries List */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <svg className="w-10 h-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-lg text-white/70 mb-2">
            {searchQuery || selectedTag ? 'No entries found' : 'Start your journal'}
          </h3>
          <p className="text-sm text-white/40 max-w-xs mx-auto">
            {searchQuery || selectedTag 
              ? 'Try adjusting your search or filters'
              : 'Begin capturing your thoughts, gratitudes, and reflections to discover patterns in your journey.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onClick={() => {
                setViewingEntry(entry);
                setView('detail');
              }}
            />
          ))}
        </div>
      )}

      {/* Results count */}
      {(searchQuery || selectedTag) && filteredEntries.length > 0 && (
        <div className="text-center text-sm text-white/40">
          {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} found
        </div>
      )}
    </div>
  );
}

type EntryCardProps = {
  entry: JournalEntry;
  onClick: () => void;
};

function EntryCard({ entry, onClick }: EntryCardProps) {
  const mood = moodInfo[entry.mood] || moodInfo.neutral;
  
  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const isToday = new Date(entry.date).toDateString() === new Date().toDateString();
  const isYesterday = new Date(entry.date).toDateString() === new Date(Date.now() - 86400000).toDateString();

  const dateLabel = isToday ? 'Today' : isYesterday ? 'Yesterday' : formattedDate;

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all group"
    >
      <div className="flex items-start gap-3">
        {/* Mood indicator */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${mood.color} flex items-center justify-center text-lg border`}>
          {mood.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-white truncate">
              {entry.title || dateLabel}
            </h3>
            <span className="text-xs text-white/40 flex-shrink-0 ml-2">
              {entry.title ? dateLabel : ''}
            </span>
          </div>
          
          {/* Gratitudes preview */}
          {entry.gratitudes.length > 0 && (
            <div className="flex items-center gap-1 mb-1 text-amber-300/60 text-xs">
              <span>🙏</span>
              <span>{entry.gratitudes.length} gratitude{entry.gratitudes.length !== 1 ? 's' : ''}</span>
            </div>
          )}
          
          <p className="text-sm text-white/60 line-clamp-2">
            {entry.content}
          </p>
          
          {/* Tags */}
          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {entry.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs text-violet-300/60">
                  #{tag}
                </span>
              ))}
              {entry.tags.length > 3 && (
                <span className="text-xs text-white/30">+{entry.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>

        {/* Arrow */}
        <svg className="w-5 h-5 text-white/30 group-hover:text-white/60 flex-shrink-0 transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

