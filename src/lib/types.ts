export type TraditionRef = {
  source:
    | 'VIJNANA'
    | 'TAO'
    | 'ART_OF_WAR'
    | 'UPANISHAD'
    | 'GITA'
    | 'ASHTAVAKRA'
    | 'YOGA_SUTRA'
    | 'SHIVA_SUTRA'
    | 'DHAMMAPADA'
    | 'RUMI'
    | 'ZEN_KOAN'
    | 'ZHUANGZI'
    | 'RIG_VEDA'
    | 'CLOUD_OF_UNKNOWING'
    | 'PRAJNAPARAMITA'
    | 'SUTTA_NIPATA'
    | 'AVADHUTA_GITA'
    | 'VIVEKACHUDAMANI'
    | 'NARADA_BHAKTI'
    | 'YOGA_VASISTHA'
    | 'CONFERENCE_OF_BIRDS'
    | 'DARK_NIGHT'
    | 'CORPUS_HERMETICUM'
    | 'KYBALION'
    | 'IMITATION_OF_CHRIST';
  ref: string;
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
  dayNumber: number;
  theme: string;

  // References to source texts
  vijnanaRef?: TraditionRef;
  taoRef?: TraditionRef;
  artOfWarRef?: TraditionRef;
  upanishadRef?: TraditionRef;
  gitaRef?: TraditionRef;
  ashtavakraRef?: TraditionRef;
  yogaSutraRef?: TraditionRef;
  shivaSutraRef?: TraditionRef;
  dhammapadaRef?: TraditionRef;
  rumiRef?: TraditionRef;
  zenKoanRef?: TraditionRef;
  zhuangziRef?: TraditionRef;
  rigVedaRef?: TraditionRef;
  cloudOfUnknowingRef?: TraditionRef;
  prajnaparamitaRef?: TraditionRef;
  suttaNipataRef?: TraditionRef;
  avadhutaGitaRef?: TraditionRef;
  vivekachudamaniRef?: TraditionRef;
  naradaBhaktiRef?: TraditionRef;
  yogaVasisthaRef?: TraditionRef;
  conferenceOfBirdsRef?: TraditionRef;
  darkNightRef?: TraditionRef;
  corpusHermeticumRef?: TraditionRef;
  kybalionRef?: TraditionRef;
  imitationOfChristRef?: TraditionRef;

  // Sacred text quotes
  vijnanaText?: string;
  taoText?: string;
  artOfWarText?: string;
  upanishadText?: string;
  gitaText?: string;
  ashtavakraText?: string;
  yogaSutraText?: string;
  shivaSutraText?: string;
  dhammapadaText?: string;
  rumiText?: string;
  zenKoanText?: string;
  zhuangziText?: string;
  rigVedaText?: string;
  cloudOfUnknowingText?: string;
  prajnaparamitaText?: string;
  suttaNipataText?: string;
  avadhutaGitaText?: string;
  vivekachudamaniText?: string;
  naradaBhaktiText?: string;
  yogaVasisthaText?: string;
  conferenceOfBirdsText?: string;
  darkNightText?: string;
  corpusHermeticumText?: string;
  kybalionText?: string;
  imitationOfChristText?: string;

  // Short explanatory commentaries
  vijnanaCommentary?: string;
  taoCommentary?: string;
  artOfWarCommentary?: string;
  upanishadCommentary?: string;
  gitaCommentary?: string;
  ashtavakraCommentary?: string;
  yogaSutraCommentary?: string;
  shivaSutraCommentary?: string;
  dhammapadaCommentary?: string;
  rumiCommentary?: string;
  zenKoanCommentary?: string;
  zhuangziCommentary?: string;
  rigVedaCommentary?: string;
  cloudOfUnknowingCommentary?: string;
  prajnaparamitaCommentary?: string;
  suttaNipataCommentary?: string;
  avadhutaGitaCommentary?: string;
  vivekachudamaniCommentary?: string;
  naradaBhaktiCommentary?: string;
  yogaVasisthaCommentary?: string;
  conferenceOfBirdsCommentary?: string;
  darkNightCommentary?: string;
  corpusHermeticumCommentary?: string;
  kybalionCommentary?: string;
  imitationOfChristCommentary?: string;

  // Context blurbs for each tradition
  traditionContext?: {
    vijnana?: string;
    tao?: string;
    artOfWar?: string;
    upanishads?: string;
    gita?: string;
    ashtavakra?: string;
    yogaSutras?: string;
    shivaSutras?: string;
    dhammapada?: string;
    rumi?: string;
    zenKoan?: string;
    zhuangzi?: string;
    rigVeda?: string;
    cloudOfUnknowing?: string;
    prajnaparamita?: string;
    suttaNipata?: string;
    avadhutaGita?: string;
    vivekachudamani?: string;
    naradaBhakti?: string;
    yogaVasistha?: string;
    conferenceOfBirds?: string;
    darkNight?: string;
    corpusHermeticum?: string;
    kybalion?: string;
    imitationOfChrist?: string;
  };

  // Why this matters explanations
  whyThisMatters?: {
    vijnana?: string;
    tao?: string;
    artOfWar?: string;
    upanishads?: string;
    gita?: string;
    ashtavakra?: string;
    yogaSutras?: string;
    shivaSutras?: string;
    dhammapada?: string;
    rumi?: string;
    zenKoan?: string;
    zhuangzi?: string;
    rigVeda?: string;
    cloudOfUnknowing?: string;
    prajnaparamita?: string;
    suttaNipata?: string;
    avadhutaGita?: string;
    vivekachudamani?: string;
    naradaBhakti?: string;
    yogaVasistha?: string;
    conferenceOfBirds?: string;
    darkNight?: string;
    corpusHermeticum?: string;
    kybalion?: string;
    imitationOfChrist?: string;
  };

  integratedReflectionTitle: string;
  integratedReflectionBody: string;

  meditation: MeditationInstruction;
  meditationContext?: string;

  prayer: string;

  dailyAction: string;
  dailyActionContext?: string;

  phaseId?: SpiritualPhaseId;
};
