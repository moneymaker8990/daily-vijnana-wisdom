import { useState, useEffect } from 'react';
import type { DailyEntry } from '@lib/types';
import { NavigationButtons } from '../Navigation/NavigationButtons';
import { getPhaseForDay } from '@data/phases';
import { MeditationTimer } from '../Timer/MeditationTimer';
import { ShareButton } from '../Share/ShareButton';
import { FavoriteButton } from '../Favorites/FavoriteButton';
import { JourneyProgress } from '../Progress/JourneyProgress';
import { getTextSize, type TextSize, textSizeClasses } from '@lib/textSize';
import { WisdomSearch } from './WisdomSearch';
import { DailyVerseCard } from './DailyVerseCard';
import { getDataSource } from '@lib/dataSource';

type DayViewProps = {
  entry: DailyEntry;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onGoToDay?: (day: number) => void;
  onOpenLibrary?: () => void;
};

function SectionHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3 ${className}`}>
      {children}
    </h3>
  );
}

function TraditionCard({
  title,
  text,
  commentary,
  context,
  dayNumber,
  textSize,
}: {
  title: string;
  text: string;
  commentary?: string;
  context?: string;
  dayNumber: number;
  textSize: TextSize;
}) {
  const sizeClasses = textSizeClasses[textSize];

  return (
    <div className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10 group overflow-hidden">
      {/* Header row */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h4 className="text-[10px] sm:text-xs font-medium text-violet-300/80 uppercase tracking-wider truncate">
          {title}
        </h4>
        <div className="flex items-center gap-0.5 flex-shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <FavoriteButton
            dayNumber={dayNumber}
            source={title}
            title={title}
            text={text}
          />
          <ShareButton
            text={text}
            title={title}
            source={title}
            dayNumber={dayNumber}
          />
        </div>
      </div>

      {/* Context (simplified) */}
      {context && (
        <p className="text-[10px] sm:text-[11px] text-white/40 leading-relaxed mb-3 line-clamp-2">
          {context}
        </p>
      )}

      {/* Main quote - centered */}
      <div className="py-2">
        <p
          className={`${sizeClasses.body} text-white/90 leading-relaxed italic text-center font-serif`}
          style={{ overflowWrap: 'break-word', wordWrap: 'break-word' }}
        >
          "{text}"
        </p>
      </div>

      {/* Commentary */}
      {commentary && (
        <p className="mt-3 pt-3 border-t border-white/5 text-xs sm:text-sm text-white/60 leading-relaxed">
          {commentary}
        </p>
      )}
    </div>
  );
}

export function DayView({ entry, onPrev, onNext, onToday, onGoToDay, onOpenLibrary }: DayViewProps) {
  const { dayNumber, theme } = entry;
  const phase = getPhaseForDay(dayNumber);
  const [textSize, setTextSize] = useState<TextSize>('medium');
  const [showProgress, setShowProgress] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [allEntries, setAllEntries] = useState<DailyEntry[]>([]);

  useEffect(() => {
    setTextSize(getTextSize());

    // Listen for text size changes
    const handleStorage = () => setTextSize(getTextSize());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Lazy-load all entries for search
  useEffect(() => {
    if (showSearch && allEntries.length === 0) {
      getDataSource().getAllEntries().then(setAllEntries);
    }
  }, [showSearch, allEntries.length]);

  const sizeClasses = textSizeClasses[textSize];

  return (
    <div className="space-y-5 sm:space-y-6 md:space-y-8">
      {/* Day Header - Compact */}
      <section className="text-center pb-4 sm:pb-6 border-b border-white/10 relative">
        {/* Search icon */}
        {onGoToDay && (
          <button
            onClick={() => setShowSearch(true)}
            className="absolute right-0 top-0 p-2 text-white/30 hover:text-white/70 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Search all days"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}
        <button
          onClick={() => setShowProgress(!showProgress)}
          className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-violet-300/70 mb-1 hover:text-violet-300 transition-colors cursor-pointer"
        >
          Day {dayNumber} of 365
        </button>
        {phase && (
          <p className="text-[10px] sm:text-xs text-white/40 mb-2 sm:mb-3">
            {phase.name}
          </p>
        )}
        <h2 className={`${sizeClasses.heading} font-serif text-white font-medium px-2`}>
          {theme}
        </h2>

        {/* Share entire day - smaller on mobile */}
        <div className="mt-2 sm:mt-3">
          <ShareButton
            text={`Day ${dayNumber}: ${theme}\n\n${entry.integratedReflectionBody}`}
            title={`Day ${dayNumber} - ${theme}`}
            variant="full"
            className="inline-flex text-xs"
            dayNumber={dayNumber}
          />
        </div>
      </section>

      {/* Progress tracker (collapsible) */}
      {showProgress && (
        <div className="animate-fadeIn">
          <JourneyProgress currentDay={dayNumber} />
        </div>
      )}

      {/* Tradition Passages */}
      <section>
        <SectionHeader>Sacred Texts</SectionHeader>
        <div className="grid gap-3 sm:gap-4">
          {entry.vijnanaText && (
            <TraditionCard 
              title="Vijnana Bhairava Tantra" 
              text={entry.vijnanaText} 
              commentary={entry.vijnanaCommentary}
              context={entry.traditionContext?.vijnana}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.taoText && (
            <TraditionCard 
              title="Tao Te Ching" 
              text={entry.taoText} 
              commentary={entry.taoCommentary}
              context={entry.traditionContext?.tao}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.artOfWarText && (
            <TraditionCard 
              title="The Art of War" 
              text={entry.artOfWarText} 
              commentary={entry.artOfWarCommentary}
              context={entry.traditionContext?.artOfWar}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.upanishadText && (
            <TraditionCard 
              title="Upanishads" 
              text={entry.upanishadText} 
              commentary={entry.upanishadCommentary}
              context={entry.traditionContext?.upanishads}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.gitaText && (
            <TraditionCard 
              title="Bhagavad Gita" 
              text={entry.gitaText} 
              commentary={entry.gitaCommentary}
              context={entry.traditionContext?.gita}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.ashtavakraText && (
            <TraditionCard 
              title="Ashtavakra Gita" 
              text={entry.ashtavakraText} 
              commentary={entry.ashtavakraCommentary}
              context={entry.traditionContext?.ashtavakra}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.yogaSutraText && (
            <TraditionCard 
              title="Yoga Sutras" 
              text={entry.yogaSutraText} 
              commentary={entry.yogaSutraCommentary}
              context={entry.traditionContext?.yogaSutras}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.shivaSutraText && (
            <TraditionCard
              title="Shiva Sutras"
              text={entry.shivaSutraText}
              commentary={entry.shivaSutraCommentary}
              context={entry.traditionContext?.shivaSutras}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.dhammapadaText && (
            <TraditionCard
              title="Dhammapada"
              text={entry.dhammapadaText}
              commentary={entry.dhammapadaCommentary}
              context={entry.traditionContext?.dhammapada}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.rumiText && (
            <TraditionCard
              title="Rumi"
              text={entry.rumiText}
              commentary={entry.rumiCommentary}
              context={entry.traditionContext?.rumi}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.zenKoanText && (
            <TraditionCard
              title="Zen Koan"
              text={entry.zenKoanText}
              commentary={entry.zenKoanCommentary}
              context={entry.traditionContext?.zenKoan}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.zhuangziText && (
            <TraditionCard
              title="Zhuangzi"
              text={entry.zhuangziText}
              commentary={entry.zhuangziCommentary}
              context={entry.traditionContext?.zhuangzi}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.rigVedaText && (
            <TraditionCard
              title="Rig Veda"
              text={entry.rigVedaText}
              commentary={entry.rigVedaCommentary}
              context={entry.traditionContext?.rigVeda}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.cloudOfUnknowingText && (
            <TraditionCard
              title="Cloud of Unknowing"
              text={entry.cloudOfUnknowingText}
              commentary={entry.cloudOfUnknowingCommentary}
              context={entry.traditionContext?.cloudOfUnknowing}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.prajnaparamitaText && (
            <TraditionCard
              title="Heart Sutra"
              text={entry.prajnaparamitaText}
              commentary={entry.prajnaparamitaCommentary}
              context={entry.traditionContext?.prajnaparamita}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.suttaNipataText && (
            <TraditionCard
              title="Sutta Nipata"
              text={entry.suttaNipataText}
              commentary={entry.suttaNipataCommentary}
              context={entry.traditionContext?.suttaNipata}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.avadhutaGitaText && (
            <TraditionCard
              title="Avadhuta Gita"
              text={entry.avadhutaGitaText}
              commentary={entry.avadhutaGitaCommentary}
              context={entry.traditionContext?.avadhutaGita}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.vivekachudamaniText && (
            <TraditionCard
              title="Vivekachudamani"
              text={entry.vivekachudamaniText}
              commentary={entry.vivekachudamaniCommentary}
              context={entry.traditionContext?.vivekachudamani}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.naradaBhaktiText && (
            <TraditionCard
              title="Narada Bhakti Sutra"
              text={entry.naradaBhaktiText}
              commentary={entry.naradaBhaktiCommentary}
              context={entry.traditionContext?.naradaBhakti}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.yogaVasisthaText && (
            <TraditionCard
              title="Yoga Vasistha"
              text={entry.yogaVasisthaText}
              commentary={entry.yogaVasisthaCommentary}
              context={entry.traditionContext?.yogaVasistha}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.conferenceOfBirdsText && (
            <TraditionCard
              title="Conference of the Birds"
              text={entry.conferenceOfBirdsText}
              commentary={entry.conferenceOfBirdsCommentary}
              context={entry.traditionContext?.conferenceOfBirds}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.darkNightText && (
            <TraditionCard
              title="Dark Night of the Soul"
              text={entry.darkNightText}
              commentary={entry.darkNightCommentary}
              context={entry.traditionContext?.darkNight}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.corpusHermeticumText && (
            <TraditionCard
              title="Corpus Hermeticum"
              text={entry.corpusHermeticumText}
              commentary={entry.corpusHermeticumCommentary}
              context={entry.traditionContext?.corpusHermeticum}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.kybalionText && (
            <TraditionCard
              title="The Kybalion"
              text={entry.kybalionText}
              commentary={entry.kybalionCommentary}
              context={entry.traditionContext?.kybalion}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.imitationOfChristText && (
            <TraditionCard
              title="Imitation of Christ"
              text={entry.imitationOfChristText}
              commentary={entry.imitationOfChristCommentary}
              context={entry.traditionContext?.imitationOfChrist}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.stoicMeditationsText && (
            <TraditionCard
              title="Meditations"
              text={entry.stoicMeditationsText}
              commentary={entry.stoicMeditationsCommentary}
              context={entry.traditionContext?.stoicMeditations}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.stoicDiscoursesText && (
            <TraditionCard
              title="Discourses"
              text={entry.stoicDiscoursesText}
              commentary={entry.stoicDiscoursesCommentary}
              context={entry.traditionContext?.stoicDiscourses}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
          {entry.stoicLettersText && (
            <TraditionCard
              title="Letters to Lucilius"
              text={entry.stoicLettersText}
              commentary={entry.stoicLettersCommentary}
              context={entry.traditionContext?.stoicLetters}
              dayNumber={dayNumber}
              textSize={textSize}
            />
          )}
        </div>
      </section>

      {/* Daily Verse from Sacred Library */}
      <DailyVerseCard dayNumber={dayNumber} onOpenLibrary={onOpenLibrary} />

      {/* Integrated Reflection */}
      <section className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/15">
        <SectionHeader>Integrated Reflection</SectionHeader>
        <h4 className={`${textSize === 'large' ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-lg md:text-xl'} font-serif text-white mb-2 sm:mb-3`}>
          {entry.integratedReflectionTitle}
        </h4>
        <p className={`${sizeClasses.body} text-white/75 leading-relaxed`} style={{ overflowWrap: 'break-word' }}>
          {entry.integratedReflectionBody}
        </p>
      </section>

      {/* Meditation with Timer */}
      <section className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10">
        <SectionHeader>Meditation</SectionHeader>
        <div className="flex items-baseline justify-between gap-2 mb-2 sm:mb-3">
          <h4 className={`${textSize === 'large' ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-lg md:text-xl'} font-serif text-white flex-1 min-w-0`}>
            {entry.meditation.title}
          </h4>
          <span className="text-[10px] sm:text-xs text-white/50 bg-white/10 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">
            {entry.meditation.suggestedMinutes} min
          </span>
        </div>

        {entry.meditationContext && (
          <p className="mb-3 sm:mb-4 text-[11px] sm:text-xs md:text-sm text-white/60 leading-relaxed">
            {entry.meditationContext}
          </p>
        )}

        <ol className="space-y-1.5 sm:space-y-2">
          {entry.meditation.steps.map((step, idx) => (
            <li key={idx} className={`flex gap-2 sm:gap-3 ${sizeClasses.body} text-white/75`}>
              <span className="text-violet-300/70 font-medium flex-shrink-0">{idx + 1}.</span>
              <span style={{ overflowWrap: 'break-word' }}>{step}</span>
            </li>
          ))}
        </ol>

        {/* Meditation Timer */}
        <MeditationTimer
          suggestedMinutes={entry.meditation.suggestedMinutes}
          title={entry.meditation.title}
        />
      </section>

      {/* Prayer */}
      <section className="text-center py-4 sm:py-6 border-y border-white/10 group">
        <div className="flex items-center justify-center gap-2 mb-2">
          <SectionHeader className="mb-0">Prayer</SectionHeader>
          <div className="md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <ShareButton
              text={entry.prayer}
              title={`Day ${dayNumber} Prayer`}
              source="Daily Vijnana Wisdom"
              dayNumber={dayNumber}
            />
          </div>
        </div>
        <p
          className={`${textSize === 'large' ? 'text-base sm:text-lg md:text-xl' : 'text-sm sm:text-base md:text-lg'} text-white/80 italic font-serif leading-relaxed max-w-xl mx-auto px-2`}
          style={{ overflowWrap: 'break-word' }}
        >
          {entry.prayer}
        </p>
      </section>

      {/* Daily Action */}
      <section className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10">
        <SectionHeader>Daily Action</SectionHeader>
        <p className={`${sizeClasses.body} text-white/80 leading-relaxed`} style={{ overflowWrap: 'break-word' }}>
          {entry.dailyAction}
        </p>
        {entry.dailyActionContext && (
          <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs md:text-sm text-white/60 leading-relaxed">
            {entry.dailyActionContext}
          </p>
        )}
      </section>

      {/* Navigation */}
      <NavigationButtons
        onPrev={onPrev}
        onNext={onNext}
        onToday={onToday}
        disablePrev={dayNumber <= 1}
        disableNext={dayNumber >= 365}
      />

      {/* Wisdom Search Modal */}
      {showSearch && onGoToDay && (
        <WisdomSearch
          entries={allEntries}
          onGoToDay={onGoToDay}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
}
