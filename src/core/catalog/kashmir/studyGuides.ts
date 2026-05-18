/**
 * Original study guides — Mindvanta in-house layer (Phase 1).
 */

import type { StudyGuide } from '../types';

export const KASHMIR_STUDY_GUIDES: StudyGuide[] = [
  {
    id: 'guide-shiva-sutras',
    work_id: 'shiva-sutras',
    overview:
      'Treat the Śiva Sūtras as three tonal families: direct recognition (śāmbhava), śakti-luminous attention (śākta), and embodied skillful means (āṇava). Read one sūtra, then feel which register it calls forth in your day.',
    structure_map:
      '• Section I — Śāmbhavopāya (direct pointers)\n• Section II — Śāktopāya (mantra, energy of attention)\n• Section III — Āṇavopāya (body, breath, structured methods)',
    key_concepts: ['Upāya', 'Pratyabhijñā (recognition)', 'Śakti', 'Prakāśa', 'Vimaria (often discussed in commentary)'],
    common_confusions: [
      'Mistaking aphorisms for the entire philosophical system.',
      'Thinking “direct path” means bypassing ethical and relational honesty.',
    ],
    guided_path: [
      {
        title: 'Map your current means',
        detail: 'Skim section titles, then note which upāya you gravitate toward when stressed.',
        prompt: 'What do you reach for first—still looking, mantra-like focus, or breath counting?',
      },
      {
        title: 'One sūtra, ten minutes',
        detail: 'Pick one line; speak it quietly, then sit without solving it.',
        prompt: 'Where does the sūtra land under the ribs or behind the eyes?',
      },
      {
        title: 'Commentary anticipation',
        detail: 'Write one confusion the sūtra raises; treat it as a bookmark for later teacher/text study.',
      },
    ],
    reflection_prompts: [
      'Where did a sūtra feel like relief vs subtle aggression toward your humanity?',
      'What would change if liberation were recognition, not accumulation?',
    ],
    related_lessons: ['ks-4', 'ks-2', 'ks-study-map'],
  },
  {
    id: 'guide-shiva-commentary',
    work_id: 'shiva-sutra-commentary-tradition',
    overview:
      'Commentary is not “extra homework.” It is how practitioners historically refused to weaponise brevity. Use this guide to orient toward Kṣemarāja’s Vimarśinī and related voices without expecting them in-app yet.',
    structure_map:
      '• Lexicon building\n• Argument tracing\n• Practice cross-checks\n• Ethical humility around initiation',
    key_concepts: ['Vimarśinī', 'Spanda (linked)', 'Pratyabhijñā vocabulary', 'Guru-śiṣya context'],
    common_confusions: [
      'Assuming one English gloss captures technical Sanskrit forever.',
      'Forcing ritual detail without community context.',
    ],
    guided_path: [
      {
        title: 'Clarify your question',
        detail: 'Choose one sūtra; write what you need: grammar of practice? metaphysics? ethics?',
      },
      {
        title: 'Off-app reading ritual',
        detail: 'Open a print or legally obtained PDF; read ten minutes, note one definition only.',
      },
      {
        title: 'Return to embodiment',
        detail: 'After commentary, sit five minutes without rehearsing arguments.',
        prompt: 'What silences in the body feel different?',
      },
    ],
    reflection_prompts: ['What would humble scholarship look like in your weekly rhythm?'],
    related_lessons: ['ks-layer-commentary', 'ks-4'],
  },
  {
    id: 'guide-spanda',
    work_id: 'spanda-karika',
    overview:
      'Spanda asks you to notice the subtle “alive” quality of knowing—without dramatising vibration into a performance.',
    structure_map:
      '• Kārikā sequences unfold themes of agency-in-consciousness, manifestation, freedom-in-action.\n• Pair reading with listening meditation.',
    key_concepts: ['Spanda', 'Śakti as pulsation', 'Stillness-in-motion'],
    common_confusions: [
      'Confusing spanda with anxious bodily hype.',
      'Thinking stillness must feel blank rather than lucid.',
    ],
    guided_path: [
      {
        title: 'Listen, don’t grasp',
        detail: 'Take one kārikā; read twice, then hear room tone without commentary.',
      },
      {
        title: 'Emotion laboratory',
        detail: 'Notice a strong feeling; ask if it appears inside a field that is not writhing.',
        prompt: 'Can intensity coexist with openness?',
      },
    ],
    reflection_prompts: ['When did you last sense clarity as gentle rather than sharp?'],
    related_lessons: ['ks-6', 'ks-3'],
  },
  {
    id: 'guide-hridayam',
    work_id: 'pratyabhijna-hridayam',
    overview:
      'The Heart text is a memory practice: bondage as contraction, freedom as remembering the wide knowing you already depend on to read these words.',
    structure_map:
      '• Twenty sūtras build: consciousness as source → manifestation → bondage mechanics → recognition → fruit.',
    key_concepts: ['Pratyabhijñā', 'Saṁkoca (contraction)', 'Vikāsa (unfolding)'],
    common_confusions: [
      'Thinking the Hṛdayam replaces Utpaladeva’s full treatise.',
      'Moral perfectionism masquerading as “recognition.”',
    ],
    guided_path: [
      {
        title: 'One thread per week',
        detail: 'Choose sūtras 1–5 for week one; reread daily in under ninety seconds.',
      },
      {
        title: 'Contrast journaling',
        detail: 'When contracted, write one sentence each for story vs felt knowing-of-story.',
      },
    ],
    reflection_prompts: ['What would compassion for contraction look like?'],
    related_lessons: ['ks-5', 'ks-layer-recognition'],
  },
  {
    id: 'guide-ipk',
    work_id: 'isvara-pratyabhijna-karika',
    overview:
      'The Kārikā layer is logic-heavy. Treat it like learning a musical grammar: slow, repetitive, and respectful of teachers who unpack technical Sanskrit.',
    structure_map:
      '• Not shipped verbatim here — use this guide to prep notebooks, questions, and ethical patience.',
    key_concepts: ['Pramāṇa', 'Pratyabhijñā proofs', 'Theological nondualism in debate form'],
    common_confusions: [
      'Winning arguments vs tasting the insight the argument protects.',
      'Downloading PDFs without honouring their licenses.',
    ],
    guided_path: [
      {
        title: 'Equipment check',
        detail: 'Gather one reputable translation, one Sanskrit helper tool if needed, and a time box.',
      },
      {
        title: 'Micro-scope',
        detail: 'Attempt one kārikā; rewrite its claim in naive English, then compare.',
      },
    ],
    reflection_prompts: ['Who helps you sanity-check when philosophy spins into anxiety?'],
    related_lessons: ['ks-layer-recognition', 'ks-layer-advanced'],
  },
  {
    id: 'guide-vimarshini-ipk',
    work_id: 'isvara-pratyabhijna-vimarshini',
    overview:
      'Abhinavagupta’s commentary is not “more words about words.” It is structured training in seeing how objections dissolve when awareness is granted primacy—but it demands slow reading.',
    structure_map:
      '• Classical commentary rhythm: seed statement, objection, resolution, corollary.',
    key_concepts: ['Vimarśinī', 'Abhinavagupta’s scholastic method', 'Recognition vs description'],
    common_confusions: [
      'Assuming every English volume online is legal to ingest into products.',
      'Idolising intellect while skipping compassion.',
    ],
    guided_path: [
      {
        title: 'Scholarly posture',
        detail: 'Set a cue (tea, lamp, closing phone) before dense reading.',
      },
      {
        title: 'Summarise ethically',
        detail: 'After ten minutes, write a three-bullet paraphrase without near-quotation.',
      },
    ],
    reflection_prompts: ['Where does this commentary deepen practice—not just pride?'],
    related_lessons: ['ks-layer-commentary', 'ks-layer-advanced'],
  },
  {
    id: 'guide-vbt',
    work_id: 'vijnana-bhairava-tantra',
    overview:
      'Pick one technique—not all 112—and court boring sincerity: repetition beats novelty for stabilising awareness.',
    structure_map:
      '• Dialogue frame: the Goddess asks “what is your nature?”\n• Techniques cluster around breath, sound, body, emotion, void, sleep edges.',
    key_concepts: ['Dhāraṇā', 'Doorways in ordinary life', 'Śiva–Śakti inquiry'],
    common_confusions: [
      'Technique-hopping as avoidance.',
      'Using intensity to dissociate rather than sense.',
    ],
    guided_path: [
      {
        title: 'One gateway for fourteen days',
        detail: 'Log date, duration, one sentence effect—no scoring.',
      },
      {
        title: 'Category browse',
        detail: 'Use breath or sound filters when friction spikes.',
      },
    ],
    reflection_prompts: ['Did the practice reveal hunger for control dressed as spirituality?'],
    related_lessons: ['ks-7', 'ks-layer-practice'],
  },
  {
    id: 'guide-tantraloka',
    work_id: 'tantraloka',
    overview:
      'The excerpt deck here is flavor, not nutrition completeness. Let it teach the habit of relating ritual, yoga, and metaphysics as one ecology.',
    structure_map:
      '• Full Tantrāloka: dozens of chapters / thousands of verses in print traditions.\n• App layer: fifty curated English excerpt cards.',
    key_concepts: ['Āhnika structure (historically)', 'Ritual as interiorized', 'Mantra theology'],
    common_confusions: [
      'Believing excerpts replace chapter study.',
      'Performing outer ritual you have not received with guidance.',
    ],
    guided_path: [
      {
        title: 'Thematic read',
        detail: 'Choose excerpts tagged ritual OR integration in one session.',
      },
      {
        title: 'Honest scale',
        detail: 'Note one question too big for excerpts—schedule library time off-app.',
      },
    ],
    reflection_prompts: ['How does this synthesis resist splitting “mystical” from “mundane”?'],
    related_lessons: ['ks-8', 'ks-layer-advanced'],
  },
  {
    id: 'guide-malini',
    work_id: 'malinivijayottara-tantra',
    overview:
      'Malini anchors much Trika imagination about mantra, subtle body, and scriptural authority. Until root text ships, hold questions more than answers.',
    structure_map:
      '• Study guide only in-app\n• Off-app: pursue licensed editions and qualified oral teaching',
    key_concepts: ['Mālā / mātṛkā imagination', 'Initiation ethics'],
    common_confusions: [
      'DIY recreating restricted ritual sequences from snippets.',
      'Romanticising tantra without lineage accountability.',
    ],
    guided_path: [
      {
        title: 'Map dependencies',
        detail: 'List three ideas you already met (mantra, śakti, ritual) Malini likely amplifies.',
      },
    ],
    reflection_prompts: ['What safeguards keep curiosity ethical?'],
    related_lessons: ['ks-layer-advanced'],
  },
  {
    id: 'guide-netra',
    work_id: 'netra-tantra',
    overview:
      'Netra reminds you the tradition has fiercely ritual literatures, not only consciousness aphorisms. Respect historical weight and modern communities.',
    structure_map:
      '• Bibliographic + conceptual orientation in-app\n• Primary study off-app with legal texts',
    key_concepts: ['Netra deity cycle', 'Ritual secrecy norms'],
    common_confusions: ['Treating all tantras as equally “safe” for casual mashups.'],
    guided_path: [
      {
        title: 'Context before performance',
        detail: 'Read one academic introduction; note ethical cautions before emulation.',
      },
    ],
    reflection_prompts: ['Where does humility live in your curiosity?'],
    related_lessons: ['ks-layer-advanced'],
  },
  {
    id: 'guide-paramarthasara',
    work_id: 'paramarthasara',
    overview:
      'Thematic entries are training wheels toward Paramārthasāra’s real poems in print: synthesising ethics, manifestation, and recognition.',
    structure_map:
      '• 100 short Mindvanta notes\n• Classical ~100 śloka sphere depending on recension',
    key_concepts: ['Paramārtha (highest sense)', 'Grace and effort', 'Integration'],
    common_confusions: [
      'Taking app notes as scholarly-critical alignment with one edition.',
      'Skipping beautiful difficulties in published translations.',
    ],
    guided_path: [
      {
        title: 'Theme-a-day',
        detail: 'Read one card; connect to one daily interaction.',
      },
      {
        title: 'Buy or borrow a book',
        detail: 'Pair app themes with one licensed translation chapter monthly.',
      },
    ],
    reflection_prompts: ['What “essence” teachings clarify vs flatten in your life?'],
    related_lessons: ['ks-8', 'ks-layer-synthesis'],
  },
];
