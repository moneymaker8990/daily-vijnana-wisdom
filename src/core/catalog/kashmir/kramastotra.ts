import type { MindvantaRendering, ReflectionPrompt, SanskritKeyTerm, TextVersion, TextWork } from '../types';

export const KRAMASTOTRA_SOURCE_LABEL =
  'Original Mindvanta Rendering and Commentary based on the Sanskrit source text.';

const sourceUrl = 'https://sanskritdocuments.org/doc_shiva/kramastotram.html';
const REVIEWED_AT = '2026-05-15';
const EDITORIAL_REVIEW_NOTE =
  'Editorial safety pass complete for tone, scope, and non-ritual presentation. Sanskrit accuracy and source alignment still require human review.';

const TERMS = {
  krama: {
    term: 'क्रम',
    transliteration: 'krama',
    basicMeaning: 'sequence, order, step',
    technicalMeaning: 'The unfolding sequence of awareness through manifestation, perception, and return.',
    keepUntranslated: true,
  },
  samvid: {
    term: 'संविद्',
    transliteration: 'samvid',
    basicMeaning: 'consciousness, awareness',
    technicalMeaning: 'Self-luminous awareness as both witness and appearing field.',
    keepUntranslated: true,
  },
  shakti: {
    term: 'शक्ति',
    transliteration: 'shakti',
    basicMeaning: 'power, capacity',
    technicalMeaning: 'The dynamic power by which awareness manifests, knows, and reabsorbs experience.',
    keepUntranslated: true,
  },
  vimarsha: {
    term: 'विमर्श',
    transliteration: 'vimarsha',
    basicMeaning: 'reflective awareness, self-recognition',
    technicalMeaning: 'Awareness knowing itself rather than remaining inert luminosity.',
    keepUntranslated: true,
  },
  bhairava: {
    term: 'भैरव',
    transliteration: 'Bhairava',
    basicMeaning: 'the awe-filled one',
    technicalMeaning: 'The fierce, all-pervading form of consciousness beyond contraction.',
    keepUntranslated: true,
  },
  srishti: {
    term: 'सृष्टि',
    transliteration: 'srishti',
    basicMeaning: 'creation, emanation',
    technicalMeaning: 'The arising phase in the sequence of awareness.',
    keepUntranslated: true,
  },
  sthiti: {
    term: 'स्थिति',
    transliteration: 'sthiti',
    basicMeaning: 'abiding, maintenance',
    technicalMeaning: 'The sustaining phase in which appearances are held in awareness.',
    keepUntranslated: true,
  },
  laya: {
    term: 'लय',
    transliteration: 'laya',
    basicMeaning: 'dissolution, absorption',
    technicalMeaning: 'The return of appearing forms into their conscious source.',
    keepUntranslated: true,
  },
  kali: {
    term: 'काली',
    transliteration: 'Kali',
    basicMeaning: 'the dark one; power of time',
    technicalMeaning: 'The goddess power of time, transition, devouring, and liberating recognition.',
    keepUntranslated: true,
  },
} satisfies Record<string, SanskritKeyTerm>;

type VerseSeed = {
  originalScript: string;
  transliteration: string;
  rendering: string;
  literalNotes: string;
  commentary: string;
  practice: string;
  question: string;
  terms: SanskritKeyTerm[];
  ambiguity?: string;
};

function rendering(index: number, seed: VerseSeed): MindvantaRendering {
  return {
    id: `kramastotra-${index}`,
    sourceTextSlug: 'kramastotra',
    verseNumber: String(index),
    originalScript: seed.originalScript,
    transliteration: seed.transliteration,
    mindvantaRendering: seed.rendering,
    literalNotes: seed.literalNotes,
    philosophicalCommentary: seed.commentary,
    practiceNote: seed.practice,
    reflectionQuestion: seed.question,
    keyTerms: seed.terms,
    ambiguityNotes:
      seed.ambiguity ??
      'This is a first-pass Mindvanta rendering for contemplative study and requires Sanskrit review.',
    sourceReference: `Kramastotra ${index}`,
    reviewStatus: 'draft',
    productionEligible: false,
    reviewNotes: EDITORIAL_REVIEW_NOTE,
    reviewerName: 'Mindvanta editorial review',
    reviewedAt: REVIEWED_AT,
    needsSanskritReview: true,
  };
}

const verseSeeds: VerseSeed[] = [
  {
    originalScript: 'अयं दुःखव्रातव्रतपरिगमे पारणविधिः',
    transliteration: 'ayam duhkha-vrata-parigame parana-vidhih',
    rendering:
      'When the discipline of suffering has reached its end, this praise becomes the rite of crossing into vast joy.',
    literalNotes: 'The verse turns praise into a completion rite after the exhaustion of sorrow.',
    commentary:
      'Kramastotra opens by refusing to treat devotion as escape. Praise is the movement by which contracted fear is ripened into fearless awareness.',
    practice: 'Name one repeated sorrow, then feel the simple awareness in which it is known.',
    question: 'What changes when suffering is met as a threshold rather than a final identity?',
    terms: [TERMS.krama, TERMS.bhairava],
  },
  {
    originalScript: 'विमृश्य स्वात्मानं विमृशति पुनः स्तुत्यचरितम्',
    transliteration: 'vimrishya svatmanam vimrishati punah stutya-caritam',
    rendering:
      'Having reflected into the Self, the one who praises sees that praise, praised one, and praiser arise in one field.',
    literalNotes: 'The verse plays on reflection: self-reflection and the act of praising.',
    commentary:
      'Vimarsha is not thinking about awareness from outside. It is awareness tasting its own power through the apparent act of devotion.',
    practice: 'While speaking inwardly, notice the awareness that hears the words before, during, and after they form.',
    question: 'Where is the boundary between the one who praises and the awareness being praised?',
    terms: [TERMS.vimarsha, TERMS.samvid],
  },
  {
    originalScript: 'अनामृष्टः स्वात्मा न हि भवति भावप्रमितिभाक्',
    transliteration: 'anamrishtah svatma na hi bhavati bhava-pramiti-bhak',
    rendering:
      'The Self is not known as living experience unless it is touched by its own reflective power.',
    literalNotes: 'Unreflected selfhood is contrasted with self-recognition through awareness.',
    commentary:
      'The hymn insists that consciousness is not blank being. It is luminous self-contact, the pulse by which experience becomes meaningful.',
    practice: 'Rest for a minute, then notice not only what appears but that appearing is known.',
    question: 'How does experience feel when awareness recognizes itself in the act of knowing?',
    terms: [TERMS.vimarsha, TERMS.samvid, TERMS.shakti],
  },
  {
    originalScript: 'विचित्रैर्जात्यादिभ्रमणपरिपाटीपरिकरैः',
    transliteration: 'vicitrair jaty-adi-bhramana-paripati-parikaraih',
    rendering:
      'Through the many circuits of birth, identity, and wandering, the heart has gathered a hidden knowledge.',
    literalNotes: 'The verse addresses the heart as having gained insight through varied conditions.',
    commentary:
      'Nothing in experience is wasted. The sequence of lives, moods, and perceptions becomes material for recognition when turned toward the source.',
    practice: 'Recall one difficult pattern and ask what it has taught your awareness to notice.',
    question: 'Which repeated pattern in your life is secretly asking to become wisdom?',
    terms: [TERMS.krama, TERMS.samvid],
  },
  {
    originalScript: 'विधुन्वानो बन्धाभिमतभवमार्गस्थितिमिमाम्',
    transliteration: 'vidhunvano bandhabhimata-bhava-marga-sthitim imam',
    rendering:
      'Shaking loose the path mistaken for bondage, I drink the world as the blazing praise of the boundless one.',
    literalNotes: 'Bondage is shaken off and experience is tasted as devotional fire.',
    commentary:
      'The Krama vision does not require hatred of the world. It burns the false reading of the world as merely binding.',
    practice: 'Choose one ordinary perception and silently read it as the shining of awareness.',
    question: 'What would change if the world were not the obstacle but the place of recognition?',
    terms: [TERMS.krama, TERMS.bhairava, TERMS.shakti],
  },
  {
    originalScript: 'भवप्राज्यैश्वर्यप्रथितबहुशक्तेर्भगवतः',
    transliteration: 'bhava-prajyaishvarya-prathita-bahu-shakter bhagavatah',
    rendering:
      'The Lord of many powers wears the wealth of becoming; bowing into that unity is the first method.',
    literalNotes: 'The verse links the many powers of manifestation with Shiva-unity.',
    commentary:
      'Practice begins where multiplicity is no longer denied. The many powers are honored as the expressive body of the one.',
    practice: 'Bow inwardly to one sensation, one emotion, and one thought as powers of awareness.',
    question: 'Can multiplicity become a doorway into unity rather than a distraction from it?',
    terms: [TERMS.shakti, TERMS.bhairava],
  },
  {
    originalScript: 'ज्वलद्रूपं भास्वत्पचनमथ दाहं प्रकटनम्',
    transliteration: 'jvalad-rupam bhasvat-pacanam atha daham prakatanam',
    rendering:
      'Fire is not separate from shining, burning, cooking, and revealing; so awareness is not separate from its rays.',
    literalNotes: 'Fire and its powers illustrate consciousness and its manifestations.',
    commentary:
      'Awareness is not a hidden substance behind experience. Its powers are how it is known: light, heat, transformation, disclosure.',
    practice: 'Notice seeing, feeling, and understanding as rays of the same conscious fire.',
    question: 'Which power of awareness is most vivid for you today: light, heat, transformation, or revelation?',
    terms: [TERMS.samvid, TERMS.shakti],
  },
  {
    originalScript: 'विचित्रारम्भत्वे गलितनियमे यः किल रसः',
    transliteration: 'vicitrarambhatve galita-niyame yah kila rasah',
    rendering:
      'When fixed rules melt inside the strange beginning of everything, the unsurpassable fullness of awareness tastes itself.',
    literalNotes: 'The verse praises the paradoxical richness of consciousness beyond limiting categories.',
    commentary:
      'Krama is sequence, but not mechanical sequence. It is the living order of freedom, where contradiction is held in a fuller consciousness.',
    practice: 'Let two opposite feelings be present without forcing either to win.',
    question: 'Can awareness hold contradiction without shrinking?',
    terms: [TERMS.krama, TERMS.samvid],
  },
  {
    originalScript: 'इतीदृक्षै रूपैर्वरद विविधं ते किल वपुः',
    transliteration: 'itidrkshai rupair varada vividham te kila vapuh',
    rendering:
      'O giver of blessing, your body appears as all these forms, and my heart keeps rushing to praise that indivisible display.',
    literalNotes: 'The divine body is described as the manifold world without true division.',
    commentary:
      'The hymn makes embodiment sacred without reducing the divine to any single form. The many are a body of recognition.',
    practice: 'Look at three different objects and sense them as one field of appearing.',
    question: 'What happens when the world is approached as a body of awareness?',
    terms: [TERMS.shakti, TERMS.samvid],
  },
  {
    originalScript: 'तवैवैकस्यान्तः स्फुरितमहसो बोधजलधेः',
    transliteration: 'tavaivaikasyantah sphurita-mahaso bodha-jaladheh',
    rendering:
      'Within the one ocean of knowing, waves of moon, sun, and fire rise and subside together.',
    literalNotes: 'The verse uses ocean, waves, moon, sun, and fire for cycles of manifestation.',
    commentary:
      'Creation, maintenance, and dissolution are not separate cosmic events only. They are the rhythm of every perception.',
    practice: 'Watch one breath arise, shine, and dissolve as a complete cycle.',
    question: 'Where do you see creation, abiding, and dissolution in one ordinary moment?',
    terms: [TERMS.srishti, TERMS.sthiti, TERMS.laya, TERMS.samvid],
  },
  {
    originalScript: 'अतश्चित्राचित्रक्रमतदितरादिस्थितिजुषः',
    transliteration: 'atash citracitra-krama-tad-itaradi-sthiti-jushah',
    rendering:
      'Whether patterned, unpatterned, sequential, or beyond sequence, the power of the Lord is never divided.',
    literalNotes: 'The verse includes both krama and what exceeds krama without splitting divine power.',
    commentary:
      'Krama is a doorway, not a cage. Awareness can appear as order, disorder, sequence, simultaneity, and the freedom beyond them.',
    practice: 'Notice the order in one experience and the mystery that exceeds that order.',
    question: 'Can you sense both sequence and timelessness in the same field?',
    terms: [TERMS.krama, TERMS.shakti, TERMS.bhairava],
  },
  {
    originalScript: 'अमुष्मात् सम्पूर्णात् वत रसमहोल्लाससरसात्',
    transliteration: 'amushmat sampurnat vata rasa-mahollasa-sarasat',
    rendering:
      'From fullness, by free delight, you let your own power appear as difference without leaving yourself.',
    literalNotes: 'Difference arises from divine freedom, not from lack.',
    commentary:
      'Manifestation is not a fall from wholeness. It is the play of freedom by which fullness tastes itself as relation.',
    practice: 'When a difference appears, ask whether awareness itself has been divided.',
    question: 'What if difference is expression rather than exile?',
    terms: [TERMS.shakti, TERMS.samvid],
  },
  {
    originalScript: 'इदन्तावद्रूपं तव भगवतः शक्तिसरसम्',
    transliteration: 'idam tavad rupam tava bhagavatah shakti-sarasam',
    rendering:
      'This whole field of “this” is saturated with your power, overflowing beyond the calculation of time.',
    literalNotes: 'The verse points to the world of thisness as the form of divine power.',
    commentary:
      'The sacred is not elsewhere. Even the immediacy of “this” is already soaked with shakti when seen without contraction.',
    practice: 'Say “this” to the present moment and feel its texture before naming it further.',
    question: 'How does the present change when “this” is felt as power rather than object?',
    terms: [TERMS.shakti, TERMS.kali],
  },
  {
    originalScript: 'क्रमोल्लासं तस्यां भुवि विरचयन् भेदकलनाम्',
    transliteration: 'kramollasam tasyam bhuvi viracayan bheda-kalanam',
    rendering:
      'You unfold the radiance of sequence, displaying difference through the powers of will, knowing, and action.',
    literalNotes: 'The verse names the triad of iccha, jnana, and kriya powers.',
    commentary:
      'The sequence of awareness is not passive. Will, knowing, and action are how the one field becomes lived reality.',
    practice: 'In one choice today, feel intention, understanding, and action as one movement.',
    question: 'Where do will, knowing, and action separate in you, and where do they reunite?',
    terms: [TERMS.krama, TERMS.shakti, TERMS.srishti, TERMS.sthiti, TERMS.laya],
  },
  {
    originalScript: 'परा सृष्टिर्लीना हुतवहमयी यात्र विलसत्',
    transliteration: 'para srishtir lina hutavaha-mayi yatra vilasat',
    rendering:
      'The supreme creation shines as fire and moon together, a subtle arising already touched by return.',
    literalNotes: 'Creation is described through fire and moon imagery.',
    commentary:
      'Arising and return are interwoven. Even the first flash of creation carries the tenderness of dissolution.',
    practice: 'At the start of an action, notice the quiet into which it will eventually dissolve.',
    question: 'How does beginning feel when you remember that ending is already included?',
    terms: [TERMS.srishti, TERMS.laya, TERMS.kali],
  },
  {
    originalScript: 'विसृष्टे भावांशे बहिरतिशयास्वादविरसे',
    transliteration: 'visrishte bhavamse bahir-atishayasvada-virase',
    rendering:
      'When experience is released outward and its taste grows thin, the red goddess draws it back into living intensity.',
    literalNotes: 'The verse invokes the red goddess as passion or vivid return.',
    commentary:
      'Externalization can become dull when awareness forgets itself. The goddess restores rasa: the felt vividness of conscious life.',
    practice: 'When attention feels scattered, return to the felt pulse inside one sensation.',
    question: 'What brings experience back from dullness into living intensity?',
    terms: [TERMS.shakti, TERMS.kali],
  },
  {
    originalScript: 'बहिर्वृत्तिं हातुं चितिभुवमुदारां निवसितुम्',
    transliteration: 'bahir-vrittim hatum citi-bhuvam udaram nivasitum',
    rendering:
      'When outward movement is released and the vast ground of awareness is inhabited, ordinary stability is undone.',
    literalNotes: 'The verse contrasts outward activity with dwelling in the field of consciousness.',
    commentary:
      'The destruction named here is not nihilism. It is the end of a cramped way of stabilizing identity in external motion.',
    practice: 'Pause before reacting and feel the open ground beneath the impulse to move outward.',
    question: 'What form of stability is ready to dissolve into a wider awareness?',
    terms: [TERMS.samvid, TERMS.laya],
  },
  {
    originalScript: 'जगत्संहारेण प्रशमयितुकामः स्वरभसात्',
    transliteration: 'jagat-samharena prashamayitu-kamah sva-rabhasat',
    rendering:
      'By drawing the world back, the great goddess cuts through fear, doubt, prohibition, and compulsion.',
    literalNotes: 'World-dissolution is linked with the pacification of fear and mental constraint.',
    commentary:
      'Dissolution is compassionate when it breaks the structures that make awareness afraid of itself.',
    practice: 'Let one unnecessary “must” or “must not” dissolve for a few breaths.',
    question: 'Which inner rule creates fear rather than wisdom?',
    terms: [TERMS.laya, TERMS.kali, TERMS.shakti],
  },
  {
    originalScript: 'विलीने शङ्कौघे सपदि परिपूर्णे च विभवे',
    transliteration: 'viline shankaughe sapadi paripurne ca vibhave',
    rendering:
      'When the mass of doubt dissolves and fullness stands revealed, the goddess consumes the residues of separation.',
    literalNotes: 'The verse describes doubt and social/scriptural fixations dissolving in fullness.',
    commentary:
      'This is not contempt for tradition. It is the moment when living recognition is no longer imprisoned by anxious rule-making.',
    practice: 'Feel one doubt fully, then ask what remains when it is known inside awareness.',
    question: 'What is left when doubt is not suppressed but dissolved in fullness?',
    terms: [TERMS.laya, TERMS.samvid, TERMS.kali],
  },
  {
    originalScript: 'तदित्थं देवीभिः सपदि दलिते भेदविभवे',
    transliteration: 'tad ittham devibhih sapadi dalite bheda-vibhave',
    rendering:
      'When the goddesses break the splendor of division, the mothering power of awareness shines without strain.',
    literalNotes: 'The verse names the goddesses as powers that break divisive appearance.',
    commentary:
      'The maternal image is not sentimental. It points to awareness as the matrix that holds and reabsorbs every distinction.',
    practice: 'Let a hard distinction soften: self and world, sacred and ordinary, inner and outer.',
    question: 'Which division would become less solid if held by a mothering awareness?',
    terms: [TERMS.shakti, TERMS.vimarsha, TERMS.samvid],
  },
  {
    originalScript: 'तदित्थं ते तिस्रो निजविभवविस्फारणवशात्',
    transliteration: 'tad ittham te tisro nija-vibhava-vispharana-vashat',
    rendering:
      'Thus the three powers expand into six wheels, establishing the steps of the Krama in the field of experience.',
    literalNotes: 'The verse connects three powers, sixfold structure, and sequential unfolding.',
    commentary:
      'The hymn sketches a subtle map without making it a manual. The point is contemplative recognition of power moving as sequence.',
    practice: 'Feel experience as a sequence of opening, knowing, acting, and returning.',
    question: 'Can a subtle map help you recognize experience without trying to control it?',
    terms: [TERMS.krama, TERMS.shakti],
  },
  {
    originalScript: 'इमां रुन्धे भूमिं भवभयभिदातङ्ककरणीम्',
    transliteration: 'imam rundhe bhumim bhava-bhaya-bhida-atanka-karanim',
    rendering:
      'She blocks the ground that breeds fear of becoming and opens the ground that melts into awakened knowing.',
    literalNotes: 'One ground is restrained; another is made fluid with awakened awareness.',
    commentary:
      'The goddess is both limit and release. She closes the route that sustains fear and opens the route into recognition.',
    practice: 'Ask which ground you are standing on now: fear of becoming or fluid awareness.',
    question: 'What inner ground needs to be closed so a freer ground can open?',
    terms: [TERMS.kali, TERMS.samvid, TERMS.shakti],
  },
  {
    originalScript: 'क्रियाबुद्ध्यक्षादेः परिमितपदे मानपदवीम्',
    transliteration: 'kriya-buddhy-akshades parimita-pade mana-padavim',
    rendering:
      'She gathers back the limited measures of action, intellect, and sense, drawing separation out by its root.',
    literalNotes: 'The verse names action, intelligence, and sense as limited measuring faculties.',
    commentary:
      'The senses are not rejected; their contraction into separative measurement is reabsorbed into the solar power of awareness.',
    practice: 'Notice one sense perception before the mind measures it as useful, useless, pleasant, or unpleasant.',
    question: 'What remains of perception before measurement hardens it?',
    terms: [TERMS.shakti, TERMS.laya, TERMS.samvid],
  },
  {
    originalScript: 'समग्रामक्षालीं क्रमविरहितामात्मनि मुहुः',
    transliteration: 'samagram akshalim krama-virahitam atmani muhuh',
    rendering:
      'Again and again, she gathers the whole garland of powers into the Self beyond sequence.',
    literalNotes: 'The verse moves from ordered powers back into sequence-free Self.',
    commentary:
      'Krama culminates by revealing what is not bound by sequence. The steps return into the step-free heart.',
    practice: 'After tracking a sequence of sensations, rest as the awareness that did not move.',
    question: 'What in you knows sequence without itself becoming sequential?',
    terms: [TERMS.krama, TERMS.samvid, TERMS.laya],
  },
  {
    originalScript: 'प्रमाणे संलीने शिवपदलसद्वैभववशात्',
    transliteration: 'pramane samline shiva-pada-lasad-vaibhava-vashat',
    rendering:
      'When the means of knowing dissolve into the splendor of Shiva, body, breath, and time enter the place of return.',
    literalNotes: 'The verse describes epistemic instruments and embodiment dissolving into Shiva.',
    commentary:
      'The deepest knowing is not anti-body. Body and breath are recognized as temporary measures within a wider consciousness.',
    practice: 'Feel breath and body as measures arising in awareness rather than as the edge of who you are.',
    question: 'How does embodiment change when it is known inside Shiva-consciousness?',
    terms: [TERMS.laya, TERMS.bhairava, TERMS.samvid],
  },
  {
    originalScript: 'प्रकाशाख्या संवित् क्रमविरहिता शून्यपदतः',
    transliteration: 'prakashakhya samvit krama-virahita shunya-padatah',
    rendering:
      'Awareness as pure light, beyond sequence, extends even through the seeming void; this is Mahakali measuring time itself.',
    literalNotes: 'The verse explicitly joins samvid, sequence-free luminosity, void, and Mahakali.',
    commentary:
      'Kali is not merely a mythic figure here. She is time seen from within awareness: the power that makes, veils, and consumes all duration.',
    practice: 'Sit with the feeling of time passing and ask what knows the passing.',
    question: 'What is time when it is felt inside awareness rather than outside you?',
    terms: [TERMS.samvid, TERMS.krama, TERMS.kali],
  },
  {
    originalScript: 'ततो देव्यां यस्यां परमपरिपूर्णस्थितिजुषि',
    transliteration: 'tato devyam yasyam parama-paripurna-sthiti-jushi',
    rendering:
      'In the goddess of complete fullness, measure, measurer, measured, and world are gathered into consciousness.',
    literalNotes: 'The verse gathers pramana, matri, miti, and jagat into the goddess.',
    commentary:
      'Subject, object, and means of knowledge are not finally separate. They are held in the womb of conscious fullness.',
    practice: 'In one act of seeing, notice seer, seen, and seeing as one event.',
    question: 'Can knowing reveal unity without erasing distinction?',
    terms: [TERMS.samvid, TERMS.shakti, TERMS.vimarsha],
  },
  {
    originalScript: 'अनर्गलस्वात्ममये महेशे तिष्ठन्ति यस्मिन् विभुशक्तयस्ताः',
    transliteration: 'anargala-svatmamaye maheshe tishthanti yasmin vibhu-shaktayas tah',
    rendering:
      'In the unobstructed Lord made of the Self, all-pervading powers abide; I bow to that power-bearing one, essence of the world.',
    literalNotes: 'The verse names the power-bearing Lord and Manthana as world-essence.',
    commentary:
      'The hymn’s devotion is precise: power and power-holder are not split into rival principles. The world is their shared essence.',
    practice: 'Bow inwardly to the power that lets this moment appear at all.',
    question: 'How do power and awareness belong together in direct experience?',
    terms: [TERMS.shakti, TERMS.bhairava, TERMS.samvid],
  },
  {
    originalScript: 'इत्थं स्वशक्तिकिरणौघनुतिप्रबन्धान्',
    transliteration: 'ittham sva-shakti-kiranaugha-nuti-prabandhan',
    rendering:
      'Hearing this praise of the rays of your own power, may grace quiet the darkness in all beings.',
    literalNotes: 'The verse turns personal praise toward collective pacification.',
    commentary:
      'Recognition is not private possession. If awareness is truly seen, its light must soften the field of shared life.',
    practice: 'Dedicate one moment of clarity to the easing of confusion in others.',
    question: 'How can insight become blessing rather than self-importance?',
    terms: [TERMS.shakti, TERMS.samvid],
  },
  {
    originalScript: 'षट्षष्ठिनामके वर्षे नवम्यामसितेऽहनि',
    transliteration: 'shat-shashti-namake varshe navamyam asite ahani',
    rendering:
      'In the sixty-sixth year, on the dark ninth day of Margashirsha, Abhinavagupta praised Shiva.',
    literalNotes: 'The closing verse gives date, authorial attribution, and devotional completion.',
    commentary:
      'The ending grounds the luminous hymn in historical time. Krama is not only cosmic sequence; it is also this day, this author, this act.',
    practice: 'Mark today as part of the sequence of your own practice, not as an anonymous day.',
    question: 'What would it mean to make this day worthy of remembrance in awareness?',
    terms: [TERMS.krama, TERMS.bhairava, TERMS.kali],
  },
];

export const KRAMASTOTRA_RENDERINGS: MindvantaRendering[] = verseSeeds.map((seed, index) =>
  rendering(index + 1, seed)
);

const reflectionThemes = [
  'Kali',
  'time',
  'sequence',
  'dissolution',
  'perception',
  'awareness',
  'transition',
  'the gap between moments',
  'sacred change',
  'recognition',
];

const KRAMASTOTRA_REFLECTIONS: ReflectionPrompt[] = reflectionThemes.map((theme, index) => ({
  id: `kramastotra-reflection-${index + 1}`,
  sourceTextSlug: 'kramastotra',
  theme,
  prompt: `Let Kramastotra point you toward ${theme} as a living movement of awareness rather than an abstract idea.`,
  practice: 'Pause at a transition between activities and sense the awareness that remains continuous.',
  journalQuestion: `How does ${theme} appear in direct experience today?`,
  difficulty: 'advanced',
  linkedCourseSlug: 'kali-time-and-sequence-of-awareness',
  linkedLibrarySlug: 'kramastotra',
}));

export const KRAMASTOTRA_WORK: TextWork = {
  id: 'kramastotra',
  slug: 'kramastotra',
  title_primary: 'Kramastotra: Hymn to the Sequence of Awareness',
  title_alt: ['Krama Stotram', 'Hymn to the Sequence'],
  author_attribution: 'Abhinavagupta; Sanskrit source captured from Sanskrit Documents',
  tradition: 'Kashmir Shaivism',
  genre: 'tantra',
  approx_date: '991 CE attribution in Shaiva manuscript notes; Sanskrit Documents edition updated 2021',
  difficulty: 5,
  summary_short:
    'A Krama-oriented hymn on awareness unfolding as sequence, time, goddess power, creation, maintenance, and dissolution.',
  summary_long:
    'Kramastotra is treated here as an advanced Mindvanta rendering project, not as an official scholarly translation. The first pass offers original contemplative renderings and commentary from Sanskrit source lines, all held behind review gates until qualified review.',
  why_it_matters:
    'It gives Mindvanta a focused Kali/Krama backbone for time, perception, transition, and recognition without copying modern copyrighted translations.',
  status_badge: 'stub',
  availability_mode: 'guided_study',
  source_license_status: 'original_only',
  allowed_surfaces: ['library_card', 'study_guide', 'search_index'],
  included_in_app: [
    KRAMASTOTRA_SOURCE_LABEL,
    'Thirty draft verse-level renderings, literal notes, commentary, practice notes, key terms, and reflection questions for review.',
  ],
  not_included_yet: [
    'Official scholarly translation or critical academic edition.',
    'Production-approved rendering before human and Sanskrit review.',
    'Initiatory ritual instructions or lineage-restricted practice procedures.',
  ],
  bibliography: [
    {
      citation: 'Krama Stotram by Abhinavagupta, Sanskrit Documents',
      url: sourceUrl,
      note: 'Sanskrit source used for original Mindvanta rendering drafts; verify before production approval.',
    },
  ],
  related_text_ids: ['spanda-karika', 'vijnana-bhairava-tantra', 'tantraloka'],
  curriculum_order: 35,
  tags: ['krama', 'kali', 'time', 'sequence', 'shakti', 'kashmir', 'tantra', 'recognition'],
  licenseStatus: 'source_text_only',
  reviewStatus: 'needs_review',
  contentType: 'mindvanta_rendering',
  renderingLevel: 'complete_mindvanta_rendering',
  difficultyBand: 'advanced',
  originalLanguage: 'Sanskrit',
  sourceName: 'Sanskrit Documents: Krama Stotram by Abhinavagupta',
  sourceUrl,
  publicationYear: 'Sanskrit source; digital edition updated 2021',
  libraryEligible: true,
  courseEligible: true,
  reflectionEligible: true,
  themes: reflectionThemes,
  courseLinks: [
    {
      courseSlug: 'kali-time-and-sequence-of-awareness',
      moduleSlug: 'what-is-krama',
      reason: 'Primary source for the Krama course on Kali, time, perception, and the sequence of awareness.',
    },
  ],
  reflectionPrompts: KRAMASTOTRA_REFLECTIONS,
  warning: `${KRAMASTOTRA_SOURCE_LABEL} Experimental rendering. Not yet reviewed for production.`,
  historicalContext:
    'Shaiva manuscript notes describe Kramastotra as an early work attributed to Abhinavagupta and connected with the Krama current.',
  coreTeachings: ['Krama', 'Kali', 'Shakti', 'Time', 'Sequence', 'Recognition', 'Creation', 'Dissolution'],
  suggestedPractices: [
    'Use only as contemplative study until review is complete.',
    'Pause at transitions and notice awareness before, during, and after change.',
    'Preserve key Sanskrit terms instead of flattening them into vague mystical language.',
  ],
};

export const KRAMASTOTRA_VERSION: TextVersion = {
  id: 'kramastotra-mindvanta-rendering-draft-v1',
  work_id: 'kramastotra',
  language: 'English',
  script: 'Devanagari source with romanized study support',
  translator_or_editor: 'Mindvanta original rendering draft; Sanskrit review required',
  source_name: 'Sanskrit Documents: Krama Stotram by Abhinavagupta',
  source_url: sourceUrl,
  license_type: 'app_original',
  license_notes: `${KRAMASTOTRA_SOURCE_LABEL} Draft only; not an official translation or critical edition.`,
  attribution_required: true,
  commercial_use_allowed: true,
  derivative_use_allowed: true,
  approved_for_shipping: false,
  approved_surfaces: [],
  review_notes: 'Production approval requires human review and preferably Sanskrit/Tantra scholarship review.',
};
