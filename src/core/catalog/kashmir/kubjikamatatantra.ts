import type { MindvantaRendering, ReflectionPrompt, TextVersion, TextWork } from '../types';

const sourceUrl = 'https://www.wisdomlib.org/hinduism/book/kubjikamatatantra-sanskrit';

export type ConceptSection = {
  id: string;
  title: string;
  summary: string;
};

export const KUBJIKAMATATANTRA_CONCEPTS: ConceptSection[] = [
  {
    id: 'who-is-kubjika',
    title: 'Who or what is Kubjika?',
    summary:
      'Kubjika names the hidden, contracted, and coiled goddess power at the center of this Kaula current.',
  },
  {
    id: 'crooked-meaning',
    title: 'The meaning of crooked',
    summary:
      'Crooked does not mean defective; it points to hiddenness, contraction, coiled power, and a non-linear path of Shakti.',
  },
  {
    id: 'kaula-kula',
    title: 'Kaula and kula',
    summary:
      'Kaula language treats body, lineage, powers, and awareness as a sacred family or embodied totality.',
  },
  {
    id: 'body-as-mandala',
    title: 'The body as mandala',
    summary:
      'The body is approached as a sacred map, not as an object for sensationalism or uninitiated ritual imitation.',
  },
  {
    id: 'shakti-embodiment',
    title: 'Shakti and embodiment',
    summary:
      'Shakti is studied as lived power: sensation, breath, posture, attention, and recognition in embodied life.',
  },
  {
    id: 'subtle-body',
    title: 'The subtle body',
    summary:
      'Subtle-body language is framed as contemplative symbolism unless reviewed lineage context permits more.',
  },
  {
    id: 'sacred-power-without-sensationalism',
    title: 'Sacred power without sensationalism',
    summary:
      'Mindvanta keeps this material reverent, contextual, and non-instructional where initiation would be required.',
  },
];

export const KUBJIKAMATATANTRA_RENDERINGS: MindvantaRendering[] = [
  {
    id: 'kubjikamatatantra-selected-1',
    sourceTextSlug: 'kubjikamatatantra',
    chapterNumber: 'selected',
    verseNumber: 'concept-1',
    originalScript: 'कुब्जिका',
    transliteration: 'kubjika',
    mindvantaRendering:
      'The crooked goddess is hidden not because she is absent, but because power coils itself inside embodiment.',
    literalNotes: 'Selected conceptual rendering draft from the name and tradition-context of Kubjika.',
    philosophicalCommentary:
      'This rendering frames crookedness as contraction and hidden potency, not as defect or spectacle.',
    practiceNote:
      'Notice one place where power feels contracted, and meet it as something asking for careful awareness.',
    reflectionQuestion: 'Where does hidden power appear in your body without needing to become a ritual instruction?',
    keyTerms: [
      {
        term: 'कुब्जिका',
        transliteration: 'Kubjika',
        basicMeaning: 'crooked or bent one',
        technicalMeaning: 'A goddess name associated with hidden, contracted, coiled power.',
        keepUntranslated: true,
      },
    ],
    ambiguityNotes: 'Draft conceptual rendering only; passage selection requires specialist review.',
    sourceReference: 'Kubjikamatatantra selected study note 1',
    reviewStatus: 'draft',
    productionEligible: false,
  },
  {
    id: 'kubjikamatatantra-selected-2',
    sourceTextSlug: 'kubjikamatatantra',
    chapterNumber: 'selected',
    verseNumber: 'concept-2',
    originalScript: 'कुल',
    transliteration: 'kula',
    mindvantaRendering:
      'The body is not outside the sacred family of awareness; it is one of the places where Shakti gathers herself.',
    literalNotes: 'Selected conceptual rendering draft around kula as family, body, and totality.',
    philosophicalCommentary:
      'Mindvanta should present Kaula embodiment as careful contemplative theology, not as a manual of esoteric procedure.',
    practiceNote: 'Feel the body as included in awareness before trying to improve or transcend it.',
    reflectionQuestion: 'What changes when embodiment is included in the sacred rather than treated as a problem?',
    keyTerms: [
      {
        term: 'कुल',
        transliteration: 'kula',
        basicMeaning: 'family, group, body, totality',
        technicalMeaning: 'A Kaula term for the embodied field and its powers.',
        keepUntranslated: true,
      },
    ],
    ambiguityNotes: 'Kula has multiple technical ranges; this draft keeps the term visible.',
    sourceReference: 'Kubjikamatatantra selected study note 2',
    reviewStatus: 'draft',
    productionEligible: false,
  },
  {
    id: 'kubjikamatatantra-selected-3',
    sourceTextSlug: 'kubjikamatatantra',
    chapterNumber: 'selected',
    verseNumber: 'concept-3',
    originalScript: 'शक्ति',
    transliteration: 'shakti',
    mindvantaRendering:
      'Sacred power is not display for the ego; it is the quiet force by which awareness becomes body, breath, and recognition.',
    literalNotes: 'Selected conceptual rendering draft around Shakti and embodiment.',
    philosophicalCommentary:
      'This keeps the material contemplative and ethical, avoiding both reduction and sensationalism.',
    practiceNote: 'Sense aliveness as power without turning it into a performance.',
    reflectionQuestion: 'How can power become more humble and more precise in your practice?',
    keyTerms: [
      {
        term: 'शक्ति',
        transliteration: 'shakti',
        basicMeaning: 'power',
        technicalMeaning: 'The dynamic force of awareness in manifestation and embodiment.',
        keepUntranslated: true,
      },
    ],
    ambiguityNotes: 'Draft rendering for orientation only; not a complete translation.',
    sourceReference: 'Kubjikamatatantra selected study note 3',
    reviewStatus: 'draft',
    productionEligible: false,
  },
];

const reflectionThemes = [
  'embodiment',
  'hidden power',
  'Shakti',
  'subtle body',
  'sacred body',
  'contraction and expansion',
  'non-linear awakening',
  'devotion to the goddess',
  'Kaula context',
  'power without sensationalism',
];

const KUBJIKA_REFLECTIONS: ReflectionPrompt[] = reflectionThemes.map((theme, index) => ({
  id: `kubjikamatatantra-reflection-${index + 1}`,
  sourceTextSlug: 'kubjikamatatantra',
  theme,
  prompt: `Let Kubjikamatatantra frame ${theme} as a careful contemplative inquiry rather than a claim of full translation.`,
  practice: 'Pause and sense embodiment as included in awareness without forcing an esoteric interpretation.',
  journalQuestion: `How can ${theme} be approached with reverence, restraint, and clarity?`,
  difficulty: 'advanced',
  linkedCourseSlug: 'crooked-goddess-body-power-nondual-shakti',
  linkedLibrarySlug: 'kubjikamatatantra',
}));

export const KUBJIKAMATATANTRA_WORK: TextWork = {
  id: 'kubjikamatatantra',
  slug: 'kubjikamatatantra',
  title_primary: 'Kubjikamatatantra: The Crooked Goddess and the Sacred Body',
  title_alt: ['Kubjikamata Tantra', 'Tantra of the Crooked Goddess'],
  author_attribution: 'Kubjika Kaula tradition; selected Mindvanta study framing',
  tradition: 'Shakta Tantra',
  genre: 'tantra',
  approx_date: 'medieval Sanskrit Tantra; exact dating requires specialist review',
  difficulty: 5,
  summary_short:
    'A review-gated selected study layer for Kubjika, Kaula embodiment, subtle-body symbolism, and nondual Shakti.',
  summary_long:
    'Mindvanta treats Kubjikamatatantra as guided study with selected conceptual renderings only. It is not a complete translation and does not publish ritual or initiatory procedures.',
  why_it_matters:
    'It gives the app a careful Shakta/Kaula lens on sacred embodiment and hidden goddess power without overclaiming access to the full text.',
  status_badge: 'stub',
  availability_mode: 'guided_study',
  source_license_status: 'original_only',
  allowed_surfaces: ['library_card', 'study_guide', 'search_index'],
  included_in_app: [
    'Guided Study with Selected Mindvanta Renderings.',
    'Conceptual map and selected non-ritual draft renderings for review.',
  ],
  not_included_yet: [
    'Complete translation of the Kubjikamatatantra.',
    'Ritual instructions, initiation rules, mantra procedures, or lineage-restricted practice details.',
  ],
  bibliography: [
    {
      citation: 'Kubjikamatatantra Sanskrit text references, Wisdom Library',
      url: sourceUrl,
      note: 'Used for source orientation only; selected renderings require review before production.',
    },
  ],
  related_text_ids: ['kramastotra', 'manthanabhairava-tantra', 'spanda-karika'],
  curriculum_order: 36,
  tags: ['kubjika', 'kaula', 'shakti', 'subtle-body', 'embodiment', 'tantra', 'goddess'],
  licenseStatus: 'source_text_only',
  reviewStatus: 'needs_review',
  contentType: 'selected_mindvanta_renderings',
  renderingLevel: 'selected_mindvanta_renderings',
  difficultyBand: 'advanced',
  originalLanguage: 'Sanskrit',
  sourceName: 'Kubjikamatatantra Sanskrit source references',
  sourceUrl,
  libraryEligible: true,
  courseEligible: true,
  reflectionEligible: true,
  themes: reflectionThemes,
  courseLinks: [
    {
      courseSlug: 'crooked-goddess-body-power-nondual-shakti',
      moduleSlug: 'meeting-kubjika',
      reason: 'Primary reference for the selected Kubjika study path.',
    },
  ],
  reflectionPrompts: KUBJIKA_REFLECTIONS,
  warning:
    'Guided Study with Selected Mindvanta Renderings. Not a complete translation or ritual manual; review required before production.',
  historicalContext:
    'A major goddess-centered Kaula textual current; Mindvanta starts with conceptual, non-ritual study only.',
  coreTeachings: KUBJIKAMATATANTRA_CONCEPTS.map((section) => section.title),
  suggestedPractices: [
    'Approach as advanced conceptual study, not as ritual instruction.',
    'Keep Sanskrit terms visible when a term carries technical ambiguity.',
    'Use embodiment language contemplatively and ethically.',
  ],
};

export const KUBJIKAMATATANTRA_VERSION: TextVersion = {
  id: 'kubjikamatatantra-selected-draft-v1',
  work_id: 'kubjikamatatantra',
  language: 'English',
  script: 'Sanskrit source orientation with English study framing',
  translator_or_editor: 'Mindvanta selected rendering draft; Sanskrit review required',
  source_name: 'Kubjikamatatantra Sanskrit source references',
  source_url: sourceUrl,
  license_type: 'app_original',
  license_notes: 'Selected Mindvanta renderings and conceptual study only; not a complete translation.',
  attribution_required: true,
  commercial_use_allowed: true,
  derivative_use_allowed: true,
  approved_for_shipping: false,
  approved_surfaces: [],
  review_notes: 'Production approval requires source, safety, and Sanskrit/Tantra review.',
};
