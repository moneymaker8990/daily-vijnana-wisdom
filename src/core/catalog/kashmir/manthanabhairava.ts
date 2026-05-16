import type { ReflectionPrompt, TextVersion, TextWork } from '../types';

export type StudyMapSection = {
  id: string;
  title: string;
  summary: string;
};

export const MANTHANABHAIRAVA_STUDY_MAP: StudyMapSection[] = [
  {
    id: 'what-is-manthana',
    title: 'What does Manthana mean?',
    summary:
      'Manthana means churning, a symbol for transformation through friction, intensity, and repeated turning.',
  },
  {
    id: 'bhairava-bhairavi',
    title: 'Bhairava and Bhairavi',
    summary:
      'The study map treats Bhairava and Bhairavi as fierce awareness and its power, not as sensational imagery.',
  },
  {
    id: 'kubjika-current',
    title: 'Kubjika and the goddess current',
    summary:
      'The text belongs near Kubjika currents and should be approached with historical and initiatory caution.',
  },
  {
    id: 'churning-transformation',
    title: 'Churning as transformation',
    summary:
      'Churning names the inner process by which resistance, devotion, and awareness transform experience.',
  },
  {
    id: 'subtle-body-field',
    title: 'The subtle body as sacred field',
    summary:
      'Subtle-body language is presented as guided conceptual orientation, not as a DIY ritual procedure.',
  },
  {
    id: 'hiddenness-initiation',
    title: 'Hiddenness and initiation',
    summary:
      'The map explicitly respects hiddenness and does not publish lineage-restricted instructions.',
  },
  {
    id: 'advanced-material',
    title: 'Why this is advanced material',
    summary:
      'The scale, technical vocabulary, and ritual density require caution before any selected rendering work.',
  },
  {
    id: 'responsible-mindvanta-approach',
    title: 'How Mindvanta approaches this responsibly',
    summary:
      'Mindvanta begins with orientation, themes, and reflection prompts while avoiding full-translation claims.',
  },
];

const reflectionThemes = [
  'transformation',
  'churning',
  'friction',
  'hidden power',
  'fierce awareness',
  'devotion',
  'sacred embodiment',
  'nondual Shakti',
  'inner intensity',
  'responsible study',
];

const MANTHANA_REFLECTIONS: ReflectionPrompt[] = reflectionThemes.map((theme, index) => ({
  id: `manthanabhairava-reflection-${index + 1}`,
  sourceTextSlug: 'manthanabhairava-tantra',
  theme,
  prompt: `Let Manthanabhairava frame ${theme} as advanced study, not as a claim of complete translation.`,
  practice: 'Notice one form of inner friction and meet it with steady awareness rather than dramatizing it.',
  journalQuestion: `How can ${theme} become clearer without becoming sensational?`,
  difficulty: 'advanced',
  linkedCourseSlug: 'churning-of-consciousness',
  linkedLibrarySlug: 'manthanabhairava-tantra',
}));

export const MANTHANABHAIRAVA_WORK: TextWork = {
  id: 'manthanabhairava-tantra',
  slug: 'manthanabhairava-tantra',
  title_primary: 'Manthanabhairava Tantra: The Churning of Goddess Consciousness',
  title_alt: ['Manthanabhairava Tantra', 'Manthanabhairavatantra'],
  author_attribution: 'Kubjika-associated Bhairava Tantra tradition; guided Mindvanta study map',
  tradition: 'Shakta Tantra',
  genre: 'tantra',
  approx_date: 'medieval Sanskrit Tantra; exact dating requires specialist review',
  difficulty: 5,
  summary_short:
    'An advanced guided study map for churning, fierce awareness, hidden power, sacred embodiment, and nondual Shakti.',
  summary_long:
    'Mindvanta treats Manthanabhairava Tantra as an advanced guided study map first. It is too large and specialized for an immediate verse-by-verse rendering and must not be presented as a complete translation.',
  why_it_matters:
    'It gives advanced users a responsible orientation to a major goddess-centered Tantra without copying modern scholarship or exposing ritual procedures.',
  status_badge: 'stub',
  availability_mode: 'bibliographic_only',
  source_license_status: 'original_only',
  allowed_surfaces: ['library_card', 'study_guide', 'search_index'],
  included_in_app: [
    'Advanced guided study map.',
    'Conceptual orientation, themes, and review-gated reflection prompts.',
  ],
  not_included_yet: [
    'Full verse-by-verse translation.',
    'Selected renderings beyond future reviewed passages.',
    'Initiatory ritual instructions or lineage-restricted procedures.',
  ],
  bibliography: [
    {
      citation: 'Manthanabhairava Tantra secondary and bibliographic references',
      note: 'Used for study-map orientation only; no complete translation is bundled.',
    },
  ],
  related_text_ids: ['kubjikamatatantra', 'kramastotra', 'tantraloka'],
  curriculum_order: 37,
  tags: ['manthana', 'bhairava', 'kubjika', 'shakti', 'transformation', 'tantra', 'embodiment'],
  licenseStatus: 'source_text_only',
  reviewStatus: 'needs_review',
  contentType: 'guided_study_map',
  renderingLevel: 'guided_study_map',
  difficultyBand: 'advanced',
  originalLanguage: 'Sanskrit',
  sourceName: 'Manthanabhairava Tantra bibliographic study references',
  libraryEligible: true,
  courseEligible: true,
  reflectionEligible: true,
  themes: reflectionThemes,
  courseLinks: [
    {
      courseSlug: 'churning-of-consciousness',
      moduleSlug: 'what-is-churning',
      reason: 'Primary reference for the guided study map on churning, fierce awareness, and hidden goddess power.',
    },
  ],
  reflectionPrompts: MANTHANA_REFLECTIONS,
  warning: 'Advanced Guided Study Map. Not a complete translation, ritual manual, or production-approved rendering.',
  historicalContext:
    'A vast goddess-centered Tantra associated with Kubjika currents; Mindvanta begins with responsible orientation only.',
  coreTeachings: MANTHANABHAIRAVA_STUDY_MAP.map((section) => section.title),
  suggestedPractices: [
    'Use as a conceptual map for advanced study.',
    'Do not infer ritual instructions from symbolic language.',
    'Hold intensity with humility and review-gated caution.',
  ],
};

export const MANTHANABHAIRAVA_VERSION: TextVersion = {
  id: 'manthanabhairava-study-map-draft-v1',
  work_id: 'manthanabhairava-tantra',
  language: 'English',
  script: 'Sanskrit source orientation with English study map',
  translator_or_editor: 'Mindvanta guided study map draft; specialist review required',
  source_name: 'Manthanabhairava Tantra bibliographic study references',
  license_type: 'app_original',
  license_notes: 'Guided study map only; not a complete translation or selected rendering edition.',
  attribution_required: true,
  commercial_use_allowed: true,
  derivative_use_allowed: true,
  approved_for_shipping: false,
  approved_surfaces: [],
  review_notes: 'Production approval requires specialist review and no ritual-procedure leakage.',
};
