/**
 * Canonical catalog model: intellectual works, versions, licensing, and study layers.
 * Phase 1: backs honest metadata + guides; legacy Source/Verse still powers the reader where linked.
 */

export type LicenseStatus =
  | 'public_domain_us'
  | 'open_license'
  | 'source_text_only'
  | 'needs_review'
  | 'do_not_import';

export type ReviewStatus = 'draft' | 'needs_review' | 'approved' | 'rejected';

export type DifficultyBand = 'beginner' | 'intermediate' | 'advanced';

export type RenderingLevel =
  | 'complete_mindvanta_rendering'
  | 'selected_mindvanta_renderings'
  | 'guided_study_map';

export type ContentType =
  | 'full_text'
  | 'excerpt_collection'
  | 'guided_source_text'
  | 'course_reference'
  | 'reflection_source'
  | 'mindvanta_rendering'
  | 'selected_mindvanta_renderings'
  | 'guided_study_map';

export type ReflectionPrompt = {
  id: string;
  sourceTextSlug: string;
  excerptId?: string;
  theme: string;
  prompt: string;
  practice?: string;
  journalQuestion?: string;
  difficulty: DifficultyBand;
  linkedCourseSlug?: string;
  linkedLibrarySlug?: string;
};

export type CourseLink = {
  courseSlug: string;
  moduleSlug: string;
  reason: string;
};

export type SanskritKeyTerm = {
  term: string;
  transliteration: string;
  basicMeaning: string;
  technicalMeaning?: string;
  keepUntranslated: boolean;
};

export type MindvantaRendering = {
  id: string;
  sourceTextSlug: string;
  verseNumber?: string;
  chapterNumber?: string;
  originalScript?: string;
  transliteration?: string;
  mindvantaRendering: string;
  literalNotes: string;
  philosophicalCommentary: string;
  practiceNote: string;
  reflectionQuestion: string;
  keyTerms: SanskritKeyTerm[];
  ambiguityNotes?: string;
  sourceReference?: string;
  reviewStatus: ReviewStatus;
  productionEligible: boolean;
  reviewNotes?: string;
  reviewerName?: string;
  reviewedAt?: string;
  needsSanskritReview?: boolean;
};

export type SourceLicenseStatus = 'pd' | 'open' | 'original_only' | 'unverified' | 'restricted';

export type WorkStatusBadge = 'active' | 'stub' | 'coming_soon';

/** User-facing primary label (directive-aligned). */
export type AvailabilityMode =
  | 'root_text'
  | 'commentary'
  | 'digest_summary'
  | 'excerpt'
  | 'guided_study'
  | 'bibliographic_only';

export type LicenseSurface = 'library_card' | 'study_guide' | 'segment_reader' | 'search_index';

export type PreferredReader = 'legacy' | 'segment';

export type LicenseType =
  | 'public_domain_claim'
  | 'cc_by_nc_sa'
  | 'app_original'
  | 'curated_excerpt_app_original'
  | 'requires_legal_review';

export type BibliographyEntry = {
  citation: string;
  url?: string;
  note?: string;
};

export type TextWorkGenre =
  | 'sutra'
  | 'karika'
  | 'tantra'
  | 'philosophical_treatise'
  | 'commentary'
  | 'compendium'
  | 'practice_manual'
  | 'digest';

export type TextWork = {
  id: string;
  slug: string;
  title_primary: string;
  title_alt: string[];
  author_attribution: string;
  tradition: string;
  genre: TextWorkGenre;
  approx_date: string;
  /** 1–5 */
  difficulty: 1 | 2 | 3 | 4 | 5;
  summary_short: string;
  summary_long: string;
  why_it_matters: string;
  status_badge: WorkStatusBadge;
  availability_mode: AvailabilityMode;
  source_license_status: SourceLicenseStatus;
  allowed_surfaces: LicenseSurface[];
  /** What the reader or app actually contains today (honest). */
  included_in_app: string[];
  /** What serious study still requires outside the app. */
  not_included_yet: string[];
  bibliography: BibliographyEntry[];
  related_text_ids: string[];
  /** Lower = earlier in curated curriculum. */
  curriculum_order: number;
  tags: string[];
  licenseStatus?: LicenseStatus;
  reviewStatus?: ReviewStatus;
  contentType?: ContentType;
  renderingLevel?: RenderingLevel;
  difficultyBand?: DifficultyBand;
  originalLanguage?: string;
  sourceName?: string;
  sourceUrl?: string;
  publicationYear?: number | string;
  libraryEligible?: boolean;
  courseEligible?: boolean;
  reflectionEligible?: boolean;
  themes?: string[];
  courseLinks?: CourseLink[];
  reflectionPrompts?: ReflectionPrompt[];
  warning?: string;
  historicalContext?: string;
  coreTeachings?: string[];
  suggestedPractices?: string[];
  /** Phase 2 override for works that should open approved Supabase segments before legacy bundles. */
  preferred_reader?: PreferredReader;
  /** When set, links to `Source.id` / `Verse.sourceId` in the legacy engine. */
  legacy_registry_source_id?: string;
};

export type TextVersion = {
  id: string;
  work_id: string;
  language: string;
  script?: string;
  translator_or_editor?: string;
  source_name?: string;
  source_url?: string;
  license_type: LicenseType;
  license_notes: string;
  attribution_required: boolean;
  commercial_use_allowed: boolean;
  derivative_use_allowed: boolean;
  approved_for_shipping: boolean;
  approved_surfaces: LicenseSurface[];
  review_notes?: string;
  /**
   * When the shipped corpus is the legacy verse bundle, this ties approval to registry `sourceId`.
   */
  legacy_registry_source_id?: string;
};

export type GuidedPathStep = {
  title: string;
  detail: string;
  prompt?: string;
};

export type StudyGuide = {
  id: string;
  work_id: string;
  overview: string;
  structure_map: string;
  key_concepts: string[];
  common_confusions: string[];
  guided_path: GuidedPathStep[];
  reflection_prompts: string[];
  related_lessons: string[];
};
