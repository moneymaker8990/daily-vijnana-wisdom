/**
 * Kashmir Shaivism / Trika — TextWork + TextVersion catalog (Phase 1).
 * Summaries and notes are original in-house copy for Mindvanta.
 */

import type { TextVersion, TextWork } from '../types';
import { KRAMASTOTRA_VERSION, KRAMASTOTRA_WORK } from './kramastotra';
import { KUBJIKAMATATANTRA_VERSION, KUBJIKAMATATANTRA_WORK } from './kubjikamatatantra';
import { MANTHANABHAIRAVA_VERSION, MANTHANABHAIRAVA_WORK } from './manthanabhairava';

export const KASHMIR_TEXT_WORKS: TextWork[] = [
  KRAMASTOTRA_WORK,
  KUBJIKAMATATANTRA_WORK,
  MANTHANABHAIRAVA_WORK,
  {
    id: 'shiva-sutras',
    slug: 'shiva-sutras',
    title_primary: 'Śiva Sūtras',
    title_alt: ['Shiva Sutras', 'Shivasutra'],
    author_attribution: 'Tradition: revealed to Vasugupta (9th c. Kashmir)',
    tradition: 'Kashmir Shaivism',
    genre: 'sutra',
    approx_date: 'c. 850 CE',
    difficulty: 3,
    summary_short:
      'Seventy-seven ultra-compressed aphorisms mapping direct recognition, śakti-centered means, and embodied upāyas.',
    summary_long:
      'The Śiva Sūtras are often treated as the seed-text of Pratyabhijñā-related practice in Kashmir: they name consciousness as primary, organize teachings into three modes of means (śāmbhava, śākta, āṇava), and expect life-long contemplation rather than slogan-deep reading. They are memorised in tradition precisely because each sūtra unpacks into extensive oral and commentarial exposition.',
    why_it_matters:
      'If you want the temperament of the path in miniature—recognition-first, world-affirming, practice-fluid—this is the spine many later teachers assume you have felt, not merely read.',
    status_badge: 'active',
    availability_mode: 'root_text',
    source_license_status: 'pd',
    allowed_surfaces: ['library_card', 'study_guide', 'segment_reader', 'search_index'],
    included_in_app: [
      'English aphorisms attributed as public-domain rendering in the reader (verify for your ship criteria).',
      'Full 77 sūtras in the verse engine.',
    ],
    not_included_yet: [
      'Kṣemarāja’s Śiva Sūtra Vimarśinī (and other commentaries) as a full running commentary in-app.',
      'Sanskrit critical edition line-by-line in the reader.',
    ],
    bibliography: [
      {
        citation: 'Jaideva Singh, Śiva Sūtras (tr.) — use library editions for parallel study.',
        note: 'Check copyright for any modern English before mirroring off-app.',
      },
    ],
    related_text_ids: ['shiva-sutra-commentary-tradition', 'spanda-karika', 'vijnana-bhairava-tantra'],
    curriculum_order: 10,
    tags: ['philosophy', 'practice', 'recognition', 'tantra', 'kashmir', 'meditation'],
    legacy_registry_source_id: 'shiva-sutras',
  },
  {
    id: 'shiva-sutra-commentary-tradition',
    slug: 'shiva-sutra-commentary-tradition',
    title_primary: 'Śiva Sūtra commentarial tradition',
    title_alt: ['Shiva Sutra Vimarshini lineage', 'Commentary on the Shiva Sutras'],
    author_attribution: 'Key figure: Kṣemarāja; related works in Abhinavagupta’s orbit',
    tradition: 'Kashmir Shaivism',
    genre: 'commentary',
    approx_date: '10th–11th century CE',
    difficulty: 4,
    summary_short:
      'The commentarial ecosystem that unpacks each sūtra into grammar of practice, recognition, and ritual context.',
    summary_long:
      'The sūtras alone are laconic to the point of riddle. The tradition’s pedagogical generosity lives in commentary: glosses, argumentative steps, and examples that show how a single word steadies meditation, mantra, or ethical posture. Mindvanta treats this layer as essential bibliography and guided study—not as a pasted copyrighted translation.',
    why_it_matters:
      'Serious readers eventually need commentary discipline; this entry names that need honestly so nobody mistakes aphorisms alone for the full intellectual craft.',
    status_badge: 'active',
    availability_mode: 'bibliographic_only',
    source_license_status: 'restricted',
    allowed_surfaces: ['library_card', 'study_guide', 'search_index'],
    included_in_app: ['Original study guide, terminology, and reading path in this app.'],
    not_included_yet: [
      'Full running translation of Śiva Sūtra Vimarśinī or other commentaries pending explicit open license or PD determination.',
    ],
    bibliography: [
      {
        citation: 'Kṣemarāja, Śiva Sūtra Vimarśinī — consult academic or traditional print/digital editions off-app.',
      },
    ],
    related_text_ids: ['shiva-sutras', 'pratyabhijna-hridayam', 'isvara-pratyabhijna-vimarshini'],
    curriculum_order: 70,
    tags: ['philosophy', 'commentary', 'recognition', 'tantra', 'kashmir'],
  },
  {
    id: 'spanda-karika',
    slug: 'spanda-karika',
    title_primary: 'Spanda Kārikā',
    title_alt: ['Spandakarika'],
    author_attribution: 'Tradition links to Vasugupta lineage; often associated with Kallata',
    tradition: 'Kashmir Shaivism',
    genre: 'karika',
    approx_date: '9th century CE',
    difficulty: 3,
    summary_short:
      'Fifty-three metric verses on the “quiver” of consciousness—stillness that nevertheless pulses as manifestation.',
    summary_long:
      'Spanda teaching reframes experience: thoughts and perceptions are not proof you left awareness; they are movements inside one field. The kārikās reward slow reading paired with sitting and listening, not speed-competition with metaphysics blogs.',
    why_it_matters:
      'It is the classic corrective to flattening non-duality into numb quiet: the tradition wants alive, ethical, embodied subtlety.',
    status_badge: 'active',
    availability_mode: 'root_text',
    source_license_status: 'open',
    allowed_surfaces: ['library_card', 'study_guide', 'segment_reader', 'search_index'],
    included_in_app: [
      'Sanskrit kārikās via GRETIL-style sourcing noted in registry; English close readings produced for the app.',
    ],
    not_included_yet: ['Full traditional commentaries in running translation in the reader.'],
    bibliography: [
      {
        citation: 'GRETIL input for Spandakārikā — verify file header and CC terms before redistribution.',
        url: 'https://gretil.sub.uni-goettingen.de/',
      },
    ],
    related_text_ids: ['shiva-sutras', 'vijnana-bhairava-tantra', 'pratyabhijna-hridayam'],
    curriculum_order: 20,
    tags: ['philosophy', 'spanda', 'practice', 'tantra', 'kashmir'],
    legacy_registry_source_id: 'spanda-karika',
  },
  {
    id: 'pratyabhijna-hridayam',
    slug: 'pratyabhijna-hridayam',
    title_primary: 'Pratyabhijñāhṛdayam',
    title_alt: ['Heart of Recognition', 'Pratyabhijna Hridayam'],
    author_attribution: 'Kṣemarāja',
    tradition: 'Kashmir Shaivism',
    genre: 'digest',
    approx_date: '11th century CE',
    difficulty: 4,
    summary_short:
      'Twenty sūtras that compress the Pratyabhijñā vision of recognition as liberation into memorisable form.',
    summary_long:
      'The Hṛdayam is a bridge text: dense enough to satisfy philosophers, short enough for daily return. It repeatedly turns “bondage” into patterns of contraction and forgetting rather than ontological dirt, which changes how practice feels ethically.',
    why_it_matters:
      'It orients you to the vocabulary and logic that the larger Pratyabhijñā corpus will insist upon—without pretending twenty sūtras replace Utpaladeva’s full architectonic.',
    status_badge: 'active',
    availability_mode: 'digest_summary',
    source_license_status: 'open',
    allowed_surfaces: ['library_card', 'study_guide', 'segment_reader', 'search_index'],
    included_in_app: [
      'Twenty Sanskrit sūtras (GRETIL-sourced as noted in registry) with in-app English close readings.',
    ],
    not_included_yet: [
      'Īśvara Pratyabhijñā Kārikā and Abhinavagupta’s Vimarśinī as continuous primary text in-app.',
    ],
    bibliography: [
      {
        citation: 'GRETIL / secondary scholarship on Pratyabhijñāhṛdayam — consult for parallel reading.',
        url: 'https://gretil.sub.uni-goettingen.de/',
      },
    ],
    related_text_ids: ['isvara-pratyabhijna-karika', 'isvara-pratyabhijna-vimarshini', 'shiva-sutras'],
    curriculum_order: 30,
    tags: ['philosophy', 'recognition', 'tantra', 'kashmir'],
    legacy_registry_source_id: 'pratyabhijnahridayam',
  },
  {
    id: 'isvara-pratyabhijna-karika',
    slug: 'isvara-pratyabhijna-karika',
    title_primary: 'Īśvara Pratyabhijñā Kārikā',
    title_alt: ['Isvara Pratyabhijna Karika', 'IPK'],
    author_attribution: 'Utpaladeva',
    tradition: 'Kashmir Shaivism',
    genre: 'philosophical_treatise',
    approx_date: '10th century CE',
    difficulty: 5,
    summary_short:
      'The systematic kārikā foundation of the Pratyabhijñā school: argument, epistemology, and grammar of recognition.',
    summary_long:
      'Where the Hṛdayam whispers aphorisms, the Kārikā builds cases: how awareness knows itself, how apparent limits arise, how ritual language and ordinary perception can be re-read inside a nondual frame. It is closer to a technical treatise than a bedside handout—prepare patience and teacherly help.',
    why_it_matters:
      'This is often named the intellectual spine for Kashmir Śaiva ideas that later encyclopedic works presuppose.',
    status_badge: 'active',
    availability_mode: 'bibliographic_only',
    source_license_status: 'unverified',
    allowed_surfaces: ['library_card', 'study_guide', 'search_index'],
    included_in_app: ['Original summaries, concepts, reading path, and reflection prompts.'],
    not_included_yet: [
      'Any full Sanskrit-English aligned reader layer until an explicit open license or vetted PD edition is attached to a TextVersion with approved_for_shipping.',
    ],
    bibliography: [
      {
        citation: 'Raffaele Torella (ed./tr. tradition) and related academic sources — obtain legally for verbatim study off-app.',
      },
    ],
    related_text_ids: ['pratyabhijna-hridayam', 'isvara-pratyabhijna-vimarshini', 'tantraloka'],
    curriculum_order: 50,
    tags: ['philosophy', 'recognition', 'tantra', 'kashmir'],
  },
  {
    id: 'isvara-pratyabhijna-vimarshini',
    slug: 'isvara-pratyabhijna-vimarshini',
    title_primary: 'Īśvara Pratyabhijñā Vimarśinī',
    title_alt: ['Isvara Pratyabhijna Vimarshini'],
    author_attribution: 'Abhinavagupta (commentary on Utpaladeva)',
    tradition: 'Kashmir Shaivism',
    genre: 'commentary',
    approx_date: 'late 10th–early 11th century CE',
    difficulty: 5,
    summary_short:
      'Line-by-line philosophical supercharge on the Kārikā: arguments, examples, and refinements that train advanced readers.',
    summary_long:
      'The Vimarśinī is where “Recognition” becomes a living scholastic practice: objections, refinements, careful definitions. Mindvanta foregrounds why it exists, how to approach it ethically with teachers, and what questions to carry—without silently pasting long copyrighted prose.',
    why_it_matters:
      'Skipping it silently while claiming full “Recognition” depth would be misleading; naming it keeps the map honest.',
    status_badge: 'active',
    availability_mode: 'bibliographic_only',
    source_license_status: 'restricted',
    allowed_surfaces: ['library_card', 'study_guide', 'search_index'],
    included_in_app: ['Guided study, vocabulary anchors, and progression hints.'],
    not_included_yet: ['Full commentary translation running in the reader under verified license.'],
    bibliography: [
      {
        citation: 'Isabelle Ratié and related scholarly literature on Abhinavagupta’s Pratyabhijñā commentaries.',
      },
    ],
    related_text_ids: ['isvara-pratyabhijna-karika', 'tantraloka', 'paramarthasara'],
    curriculum_order: 60,
    tags: ['philosophy', 'commentary', 'recognition', 'tantra', 'kashmir'],
  },
  {
    id: 'vijnana-bhairava-tantra',
    slug: 'vijnana-bhairava-tantra',
    title_primary: 'Vijñāna Bhairava Tantra',
    title_alt: ['Vijnana Bhairava'],
    author_attribution: 'Anonymous tantric dialogue tradition (Śaiva, Kashmir-associated transmission)',
    tradition: 'Kashmir Shaivism',
    genre: 'practice_manual',
    approx_date: '8th–9th century CE',
    difficulty: 2,
    summary_short:
      'One hundred and twelve contemplative experiments turning breath, senses, emotion, and ordinary moments into direct acquaintance with awareness.',
    summary_long:
      'The text’s genius is pedagogical range: it meets household minds where they already live. In Mindvanta the English lines are presented with attribution metadata you must keep legally honest; treat them as practice sketches you test, not trophies to collect.',
    why_it_matters:
      'It is the classic bridge between map-reading (metaphysics) and map-testing (experience).',
    status_badge: 'active',
    availability_mode: 'root_text',
    source_license_status: 'unverified',
    allowed_surfaces: ['library_card', 'study_guide', 'segment_reader', 'search_index'],
    included_in_app: [
      '112 practice verses in the reader with category filters and app-authored practice scaffolding.',
    ],
    not_included_yet: [
      'Sanskrit pada edition aligned in-app unless you later bind an approved TextVersion.',
      'Substitution with a vetted open translation if current attributions fail legal review.',
    ],
    bibliography: [
      {
        citation: 'Jaideva Singh, Paul Reps (attrib. in app) — confirm PD/licensing per string before commercial reliance.',
      },
    ],
    related_text_ids: ['shiva-sutras', 'spanda-karika', 'tantraloka'],
    curriculum_order: 40,
    tags: ['practice', 'meditation', 'tantra', 'kashmir'],
    legacy_registry_source_id: 'vijnana-bhairava-tantra',
  },
  {
    id: 'tantraloka',
    slug: 'tantraloka',
    title_primary: 'Tantrāloka',
    title_alt: ['Tantraloka', 'Light on Tantra'],
    author_attribution: 'Abhinavagupta',
    tradition: 'Kashmir Shaivism',
    genre: 'compendium',
    approx_date: 'late 10th–early 11th century CE',
    difficulty: 5,
    summary_short:
      'Monumental synthesis of ritual, yoga, mantra, aesthetics, and philosophy across dozens of chapters.',
    summary_long:
      'Tradition and scholarship describe an encyclopedic work on the order of thousands of verses. Mindvanta currently surfaces a small curated excerpt set so you can feel Abhinavagupta’s integrative voice without pretending fifty cards replace the arc of the whole.',
    why_it_matters:
      'Later Kashmir Shaivism “makes sense in one piece” here: practice and theory refuse divorce.',
    status_badge: 'active',
    availability_mode: 'excerpt',
    source_license_status: 'original_only',
    allowed_surfaces: ['library_card', 'study_guide', 'segment_reader', 'search_index'],
    included_in_app: ['Curated English excerpt verses unique to this app’s editorial selection.'],
    not_included_yet: [
      'Full chapter-by-chapter reader with lazy loading (planned architecture; needs approved base text).',
    ],
    bibliography: [
      {
        citation: 'Gavin Flood, Douglas Renfrew Brooks, and Taishō/Indological references for context — consult major translations off-app under their licenses.',
      },
    ],
    related_text_ids: ['malinivijayottara-tantra', 'netra-tantra', 'paramarthasara', 'isvara-pratyabhijna-vimarshini'],
    curriculum_order: 80,
    tags: ['philosophy', 'ritual', 'practice', 'tantra', 'kashmir'],
    legacy_registry_source_id: 'tantraloka-selections',
  },
  {
    id: 'malinivijayottara-tantra',
    slug: 'malinivijayottara-tantra',
    title_primary: 'Mālinīvijayottara Tantra',
    title_alt: ['Malinivijayottara', 'Malini Vijayottara'],
    author_attribution: 'Śaiva scripture (attributed revelation)',
    tradition: 'Kashmir Shaivism',
    genre: 'tantra',
    approx_date: 'early medieval (scholarly dating debated)',
    difficulty: 4,
    summary_short:
      'Śaiva tantra Abhinavagupta and his tradition treat as a primary scriptural partner to later synthesis.',
    summary_long:
      'Readers of Tantrāloka eventually meet Malini as part of the tantric ecology: ritual detail, subtle-body cartography, initiatory imagination. Mindvanta keeps the entry so your mental bibliography matches serious scholars—even before primary shipping.',
    why_it_matters:
      'Without naming Malini, a “full tradition map” silently lies by omission.',
    status_badge: 'active',
    availability_mode: 'bibliographic_only',
    source_license_status: 'unverified',
    allowed_surfaces: ['library_card', 'study_guide', 'search_index'],
    included_in_app: ['Study guide and cross-links to works you can open today.'],
    not_included_yet: ['Root tantra reader layer pending verified textual basis.'],
    bibliography: [
      {
        citation: 'Academic editions / Andre Padoux lineage discussions — obtain licensed material off-app for verbatim study.',
      },
    ],
    related_text_ids: ['tantraloka', 'netra-tantra', 'shiva-sutras'],
    curriculum_order: 90,
    tags: ['ritual', 'tantra', 'kashmir', 'philosophy'],
  },
  {
    id: 'netra-tantra',
    slug: 'netra-tantra',
    title_primary: 'Netra Tantra',
    title_alt: ['Netra Tantram'],
    author_attribution: 'Śaiva scripture (Eye of Śiva tradition material)',
    tradition: 'Kashmir Shaivism',
    genre: 'tantra',
    approx_date: 'early medieval (debated)',
    difficulty: 4,
    summary_short:
      'Ritual-rich Śaiva revelation text with historical importance for mantra-deity liturgy and esoteric praxis.',
    summary_long:
      'Netra is heavier in ritual grammar than beginner silence-meditation. Naming it helps you place why some tantric vocabulary shows up in encyclopedic commentaries, and reminds you ethics of secrecy and initiation matter in living communities.',
    why_it_matters:
      'Historical seriousness without flattening everything into “awareness quotes.”',
    status_badge: 'active',
    availability_mode: 'bibliographic_only',
    source_license_status: 'unverified',
    allowed_surfaces: ['library_card', 'study_guide', 'search_index'],
    included_in_app: ['Orientation essay, glossary hooks, related-text navigation.'],
    not_included_yet: ['Full ritual prose reader pending licensing and pastoral review.'],
    bibliography: [
      {
        citation: 'See Indological studies on Netra and Trika connections — consult specialists before personal ritual imitation.',
      },
    ],
    related_text_ids: ['tantraloka', 'malinivijayottara-tantra'],
    curriculum_order: 100,
    tags: ['ritual', 'tantra', 'kashmir'],
  },
  {
    id: 'paramarthasara',
    slug: 'paramarthasara',
    title_primary: 'Paramārthasāra',
    title_alt: ['Paramarthasara', 'Essence of the Highest Reality'],
    author_attribution: 'Tradition: Abhinavagupta circle (attribution discussed in scholarship)',
    tradition: 'Kashmir Shaivism',
    genre: 'philosophical_treatise',
    approx_date: '10th–11th century CE',
    difficulty: 3,
    summary_short:
      'Versified “essence” teaching on non-dual Śaiva metaphysics and practice orientation; this app ships thematic entries, not a critical edition.',
    summary_long:
      'Paramārthasāra distills themes that show up across longer works. Mindvanta’s entries are original study atoms: they help you ask better questions before you sit with a printed translation alongside a teacher.',
    why_it_matters:
      'It trains synthetic thinking—how ethics, ritual, recognition, and everyday life thread together.',
    status_badge: 'active',
    availability_mode: 'guided_study',
    source_license_status: 'original_only',
    allowed_surfaces: ['library_card', 'study_guide', 'segment_reader', 'search_index'],
    included_in_app: [
      'One hundred short thematic notes marked educational in the verse engine; app-original prose.',
    ],
    not_included_yet: [
      'Scholarly aligned śloka-by-śloka reader with one fixed print edition embedded verbatim.',
    ],
    bibliography: [
      {
        citation: 'John R. Dupuche (tr.) and other published Paramārthasāra translations — read off-app under publisher terms.',
      },
    ],
    related_text_ids: ['tantraloka', 'isvara-pratyabhijna-vimarshini', 'pratyabhijna-hridayam'],
    curriculum_order: 110,
    tags: ['philosophy', 'practice', 'recognition', 'tantra', 'kashmir'],
    legacy_registry_source_id: 'paramarthasara-selections',
  },
];

function v(x: Omit<TextVersion, 'id'> & { id?: string }): TextVersion {
  const id = x.id ?? `${x.work_id}-default`;
  return { ...x, id } as TextVersion;
}

export const KASHMIR_TEXT_VERSIONS: TextVersion[] = [
  KRAMASTOTRA_VERSION,
  KUBJIKAMATATANTRA_VERSION,
  MANTHANABHAIRAVA_VERSION,
  v({
    work_id: 'shiva-sutras',
    language: 'en',
    translator_or_editor: 'Attributed public-domain rendering (registry)',
    license_type: 'public_domain_claim',
    license_notes: 'Confirm PD status for your distribution counsel; replace if uncertain.',
    attribution_required: false,
    commercial_use_allowed: true,
    derivative_use_allowed: true,
    approved_for_shipping: true,
    approved_surfaces: ['library_card', 'study_guide', 'segment_reader', 'search_index'],
    legacy_registry_source_id: 'shiva-sutras',
  }),
  v({
    work_id: 'shiva-sutra-commentary-tradition',
    language: 'en',
    license_type: 'requires_legal_review',
    license_notes: 'No primary commentary text bundled; guides only until a version is legally cleared.',
    attribution_required: false,
    commercial_use_allowed: false,
    derivative_use_allowed: false,
    approved_for_shipping: false,
    approved_surfaces: ['library_card', 'study_guide', 'search_index'],
  }),
  v({
    work_id: 'spanda-karika',
    language: 'sa',
    script: 'Devanāgarī (GRETIL-derived)',
    source_name: 'GRETIL electronic text',
    source_url: 'https://gretil.sub.uni-goettingen.de/',
    license_type: 'cc_by_nc_sa',
    license_notes: 'Sanskrit kārikās per registry notice; English close readings are app editorial.',
    attribution_required: true,
    commercial_use_allowed: false,
    derivative_use_allowed: true,
    approved_for_shipping: true,
    approved_surfaces: ['library_card', 'study_guide', 'segment_reader', 'search_index'],
    legacy_registry_source_id: 'spanda-karika',
  }),
  v({
    work_id: 'pratyabhijna-hridayam',
    language: 'sa',
    script: 'Devanāgarī (GRETIL-derived)',
    source_name: 'GRETIL electronic text',
    source_url: 'https://gretil.sub.uni-goettingen.de/',
    license_type: 'cc_by_nc_sa',
    license_notes: 'Follow CC BY-NC-SA obligations for Sanskrit file redistribution.',
    attribution_required: true,
    commercial_use_allowed: false,
    derivative_use_allowed: true,
    approved_for_shipping: true,
    approved_surfaces: ['library_card', 'study_guide', 'segment_reader', 'search_index'],
    legacy_registry_source_id: 'pratyabhijnahridayam',
  }),
  v({
    work_id: 'isvara-pratyabhijna-karika',
    language: 'sa',
    license_type: 'requires_legal_review',
    license_notes: 'No kārikā body shipped in Phase 1.',
    attribution_required: false,
    commercial_use_allowed: false,
    derivative_use_allowed: false,
    approved_for_shipping: false,
    approved_surfaces: ['library_card', 'study_guide', 'search_index'],
  }),
  v({
    work_id: 'isvara-pratyabhijna-vimarshini',
    language: 'sa',
    license_type: 'requires_legal_review',
    license_notes: 'Commentary not shipped.',
    attribution_required: false,
    commercial_use_allowed: false,
    derivative_use_allowed: false,
    approved_for_shipping: false,
    approved_surfaces: ['library_card', 'study_guide', 'search_index'],
  }),
  v({
    work_id: 'vijnana-bhairava-tantra',
    language: 'en',
    translator_or_editor: 'Paul Reps (attrib. in verse file)',
    license_type: 'requires_legal_review',
    license_notes:
      'English rendering flagged for legal verification; keep until replaced with vetted open or PD lines.',
    attribution_required: true,
    commercial_use_allowed: false,
    derivative_use_allowed: false,
    approved_for_shipping: true,
    approved_surfaces: ['library_card', 'study_guide', 'segment_reader', 'search_index'],
    review_notes: 'Compliance team: downgrade to false if counsel cannot substantiate PD.',
    legacy_registry_source_id: 'vijnana-bhairava-tantra',
  }),
  v({
    work_id: 'tantraloka',
    language: 'en',
    license_type: 'curated_excerpt_app_original',
    license_notes: 'Short excerpts composed/adapted for study cards—not a full translation.',
    attribution_required: false,
    commercial_use_allowed: true,
    derivative_use_allowed: true,
    approved_for_shipping: true,
    approved_surfaces: ['library_card', 'study_guide', 'segment_reader', 'search_index'],
    legacy_registry_source_id: 'tantraloka-selections',
  }),
  v({
    work_id: 'malinivijayottara-tantra',
    language: 'sa',
    license_type: 'requires_legal_review',
    license_notes: 'Bibliographic shell only.',
    attribution_required: false,
    commercial_use_allowed: false,
    derivative_use_allowed: false,
    approved_for_shipping: false,
    approved_surfaces: ['library_card', 'study_guide', 'search_index'],
  }),
  v({
    work_id: 'netra-tantra',
    language: 'sa',
    license_type: 'requires_legal_review',
    license_notes: 'Bibliographic shell only.',
    attribution_required: false,
    commercial_use_allowed: false,
    derivative_use_allowed: false,
    approved_for_shipping: false,
    approved_surfaces: ['library_card', 'study_guide', 'search_index'],
  }),
  v({
    work_id: 'paramarthasara',
    language: 'en',
    license_type: 'app_original',
    license_notes: 'Thematic educational entries are Mindvanta-original summaries.',
    attribution_required: false,
    commercial_use_allowed: true,
    derivative_use_allowed: true,
    approved_for_shipping: true,
    approved_surfaces: ['library_card', 'study_guide', 'segment_reader', 'search_index'],
    legacy_registry_source_id: 'paramarthasara-selections',
  }),
];
