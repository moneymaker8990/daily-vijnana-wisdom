export type TraditionRef = {
  source: 'VIJNANA' | 'TAO' | 'ART_OF_WAR' | 'UPANISHAD' | 'GITA' | 'ASHTAVAKRA' | 'YOGA_SUTRA' | 'SHIVA_SUTRA';
  ref: string; // e.g. "V1", "Tao-01", "AoW-1.1", "Kena-1.1", "Ashta-1.1", "YS-1.2", "SS-1.1"
};

export type MeditationInstruction = {
  title: string;
  steps: string[];
  suggestedMinutes: number;
};

export type SpiritualPhaseId =
  | 'VIJNANA_1_112'
  | 'UPANISHADS_113_168'
  | 'GITA_169_210'
  | 'TAO_211_260'
  | 'ASHTAVAKRA_261_300'
  | 'YOGA_SUTRAS_301_330'
  | 'SHIVA_SUTRAS_331_365';

export type SpiritualPhase = {
  id: SpiritualPhaseId;
  name: string;
  startDay: number;
  endDay: number;
  primaryTradition: 'VIJNANA' | 'UPANISHAD' | 'GITA' | 'TAO' | 'ASHTAVAKRA' | 'YOGA_SUTRA' | 'SHIVA_SUTRA';
  description: string;
};

export type DailyEntry = {
  dayNumber: number; // 1..365
  theme: string; // e.g. "The Field That Holds All Things"

  vijnanaRef?: TraditionRef;
  taoRef?: TraditionRef;
  artOfWarRef?: TraditionRef;
  upanishadRef?: TraditionRef;
  gitaRef?: TraditionRef;
  ashtavakraRef?: TraditionRef;
  yogaSutraRef?: TraditionRef;
  shivaSutraRef?: TraditionRef;

  // Sacred text quotes
  vijnanaText?: string;
  taoText?: string;
  artOfWarText?: string;
  upanishadText?: string;
  gitaText?: string;
  ashtavakraText?: string;
  yogaSutraText?: string;
  shivaSutraText?: string;

  // Short explanatory commentaries under each quote
  vijnanaCommentary?: string;
  taoCommentary?: string;
  artOfWarCommentary?: string;
  upanishadCommentary?: string;
  gitaCommentary?: string;
  ashtavakraCommentary?: string;
  yogaSutraCommentary?: string;
  shivaSutraCommentary?: string;

  // Subtle 1–2 sentence origin/context blurbs for each tradition used in the entry
  traditionContext?: {
    vijnana?: string;
    tao?: string;
    artOfWar?: string;
    upanishads?: string;
    gita?: string;
    ashtavakra?: string;
    yogaSutras?: string;
    shivaSutras?: string;
  };

  // Short "why this matters" explanations for each quote
  whyThisMatters?: {
    vijnana?: string;
    tao?: string;
    artOfWar?: string;
    upanishads?: string;
    gita?: string;
    ashtavakra?: string;
    yogaSutras?: string;
    shivaSutras?: string;
  };

  integratedReflectionTitle: string;
  integratedReflectionBody: string;

  meditation: MeditationInstruction;

  // A short "why this practice today" explanation
  meditationContext?: string;

  prayer: string;

  dailyAction: string;

  // Explanation/example for daily action
  dailyActionContext?: string;

  phaseId?: SpiritualPhaseId;
};
