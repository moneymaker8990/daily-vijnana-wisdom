/**
 * Central Registry
 * 
 * Single source of truth: ALL_VERSES and ALL_SOURCES
 * Every part of the app queries these, not individual files.
 */

import type { Verse, Source } from './types';

// Import all verse arrays
import { gitaVerses } from './verses/gitaVerses';
import { taoVerses } from './verses/taoVerses';
import { vbtVerses } from './verses/vbtVerses';
import { upanishadVerses } from './verses/upanishadVerses';
import { ashtavakraVerses } from './verses/ashtavakraVerses';
import { yogaSutraVerses } from './verses/yogaSutraVerses';
import { shivaSutraVerses } from './verses/shivaSutraVerses';
import { spandaKarikaVerses } from './verses/spandaKarikaVerses';
import { pratyabhijnahridayamVerses } from './verses/pratyabhijnahridayamVerses';
import { tantralokaVerses } from './verses/tantralokaVerses';
import { rigVedaVerses } from './verses/rigVedaVerses';
import { dhammapadaVerses } from './verses/dhammapadaVerses';
import { zenKoansVerses } from './verses/zenKoansVerses';
import { rumiVerses } from './verses/rumiVerses';
import { cloudOfUnknowingVerses } from './verses/cloudOfUnknowingVerses';
import { zhuangziVerses } from './verses/zhuangziVerses';
import { prajnaparamitaVerses } from './verses/prajnaparamitaVerses';
import { suttaNipataVerses } from './verses/suttaNipataVerses';
import { avadhutaGitaVerses } from './verses/avadhutaGitaVerses';
import { vivekachudamaniVerses } from './verses/vivekachudamaniVerses';
import { naradaBhaktiSutraVerses } from './verses/naradaBhaktiSutraVerses';
import { yogaVasisthaVerses } from './verses/yogaVasisthaVerses';
import { conferenceOfBirdsVerses } from './verses/conferenceOfBirdsVerses';
import { darkNightVerses } from './verses/darkNightVerses';
import { corpusHermeticumVerses } from './verses/corpusHermeticumVerses';
import { kybalionVerses } from './verses/kybalionVerses';
import { imitationOfChristVerses } from './verses/imitationOfChristVerses';
import { stoicMeditationsVerses } from './verses/stoicMeditationsVerses';
import { stoicDiscoursesVerses } from './verses/stoicDiscoursesVerses';
import { stoicLettersVerses } from './verses/stoicLettersVerses';

/**
 * ALL_VERSES: The complete collection of sacred verses
 * Every query goes through this single array
 */
export const ALL_VERSES: Verse[] = [
  ...gitaVerses,
  ...taoVerses,
  ...vbtVerses,
  ...upanishadVerses,
  ...ashtavakraVerses,
  ...yogaSutraVerses,
  ...shivaSutraVerses,
  ...spandaKarikaVerses,
  ...pratyabhijnahridayamVerses,
  ...tantralokaVerses,
  ...rigVedaVerses,
  ...dhammapadaVerses,
  ...zenKoansVerses,
  ...rumiVerses,
  ...cloudOfUnknowingVerses,
  ...zhuangziVerses,
  ...prajnaparamitaVerses,
  ...suttaNipataVerses,
  ...avadhutaGitaVerses,
  ...vivekachudamaniVerses,
  ...naradaBhaktiSutraVerses,
  ...yogaVasisthaVerses,
  ...conferenceOfBirdsVerses,
  ...darkNightVerses,
  ...corpusHermeticumVerses,
  ...kybalionVerses,
  ...imitationOfChristVerses,
  ...stoicMeditationsVerses,
  ...stoicDiscoursesVerses,
  ...stoicLettersVerses,
];

/**
 * ALL_SOURCES: Metadata about each sacred text
 */
export const ALL_SOURCES: Source[] = [
  {
    id: 'bhagavad-gita',
    name: 'Bhagavad Gita',
    tradition: 'Hindu',
    totalVerses: 700,
    description: 'A battlefield dialogue on how to act with clarity when duty, devotion, fear, and freedom all collide.',
    originalLanguage: 'Sanskrit',
    period: '500-200 BCE',
    translator: 'Edwin Arnold',
    icon: '🙏',
    historicalIntro: {
      origin: 'The Bhagavad Gita sits inside the Mahabharata and unfolds at a moment of paralysis: Arjuna is asked to fight a war he no longer knows how to justify. The setting matters because the teaching is not abstract. It begins in moral confusion, urgency, and grief.',
      author: 'Tradition attributes the text to Vyasa, the sage associated with the Mahabharata as a whole. However it reached its final form, the Gita carries the feel of a teaching refined over time for readers who need both philosophical depth and practical guidance.',
      significance: 'The Gita is enduring because it refuses the false choice between spiritual life and responsible action. It asks how to move in the world without being owned by success, failure, fear, or ego. That question keeps it alive in every era.',
      howToRead: 'Read it as a conversation you are overhearing and gradually entering. Arjuna\'s confusion is part of the method. Pause when a passage unsettles you, because the text does some of its best work there.',
    },
  },
  {
    id: 'tao-te-ching',
    name: 'Tao Te Ching',
    tradition: 'Taoist',
    totalVerses: 81,
    description: 'Brief, paradoxical teachings on softness, restraint, and living without forcing every outcome.',
    originalLanguage: 'Chinese',
    period: '6th century BCE',
    translator: 'James Legge',
    icon: '☯️',
    historicalIntro: {
      origin: 'Legend says Lao Tzu wrote these verses when leaving public life and was stopped at a border gate by someone who asked him to leave his wisdom behind. Whether literally true or not, the story fits the text: concise, elusive, and uninterested in spectacle.',
      author: 'The Tao Te Ching is attributed to Lao Tzu, though scholars still debate whether it emerged from one historical figure or from a stream of related teachings. Either way, the voice is consistent in its distrust of excess and coercion.',
      significance: 'This text matters because it keeps challenging the instinct to dominate, prove, and overcorrect. Again and again it points to another kind of strength: one that comes from alignment, restraint, and responsiveness.',
      howToRead: 'Treat each chapter like a short meditation rather than a puzzle to solve. Read a few lines, then stop before you have turned them into a theory. The text opens more through return than through mastery.',
    },
  },
  {
    id: 'vijnana-bhairava-tantra',
    name: 'Vijnana Bhairava Tantra',
    tradition: 'Tantric',
    totalVerses: 112,
    description: 'A practice manual of 112 direct experiments using breath, sensation, sound, and attention as doorways into presence.',
    originalLanguage: 'Sanskrit',
    period: '8th-9th century CE',
    translator: 'Paul Reps',
    icon: '🕉️',
    historicalIntro: {
      origin: 'The Vijnana Bhairava Tantra comes out of Kashmir Shaivism and is framed as a dialogue between Shiva and Devi. That framing is important: the text is relational, practical, and grounded in lived experience rather than distant abstraction.',
      author: 'Like many tantric works, it is treated as revealed wisdom rather than the property of a single thinker. Later teachers such as Abhinavagupta helped transmit and interpret it, but the core voice remains strikingly immediate and instructional.',
      significance: 'What sets this text apart is its refusal to separate spiritual practice from ordinary life. Breath, surprise, desire, sound, sleep, and sensation all become usable. It reads less like doctrine and more like a collection of precise invitations.',
      howToRead: 'Do not try to admire all 112 techniques from a distance. Pick one, try it honestly, and notice what actually happens in your body and attention. The text rewards experiment more than analysis.',
    },
  },
  {
    id: 'upanishads',
    name: 'The Upanishads',
    tradition: 'Hindu',
    totalVerses: 84,
    description: 'Forest teachings that ask what is truly aware, and whether the deepest self is separate from ultimate reality at all.',
    originalLanguage: 'Sanskrit',
    period: '800-200 BCE',
    translator: 'Max Müller',
    icon: '🔥',
    historicalIntro: {
      origin: 'The Upanishads emerged over centuries in teaching settings far from political centers: forests, hermitages, and intimate circles of study. Their atmosphere is closer to searching conversation than to proclamation.',
      author: 'Different sages appear across the texts, including Yajnavalkya, Uddalaka, Maitreyi, and Gargi. That plurality matters because the Upanishads preserve inquiry in motion: arguments, reversals, and moments when language reaches its edge.',
      significance: 'Their lasting power lies in a radical claim: the deepest ground of reality is not elsewhere. The truth being sought is intimately bound up with the seeker. Much of later Vedanta grows from that shock.',
      howToRead: 'Read slowly enough to let the questions work on you. These texts often repeat, circle, and reframe because they are pushing beyond easy conceptual answers. Let them interrogate your assumptions rather than merely decorate them.',
    },
  },
  {
    id: 'ashtavakra-gita',
    name: 'Ashtavakra Gita',
    tradition: 'Hindu',
    totalVerses: 115,
    description: 'The Song of Pure Awareness - A radical non-dual dialogue teaching that you are already free, already the Self, with nothing to attain.',
    originalLanguage: 'Sanskrit',
    period: '~500 CE',
    icon: '👁️',
    historicalIntro: {
      origin: 'The Ashtavakra Gita is set as a dialogue between the sage Ashtavakra (born with eight deformities, yet realized from birth) and King Janaka. The text likely emerged between the 8th and 14th centuries CE, though the legend it references is far older, appearing in the Mahabharata.',
      author: 'Unknown. The text is attributed to the sage Ashtavakra, but scholars believe it was composed by later Advaita masters who used this legendary dialogue as a vehicle for the most radical non-dual teaching.',
      significance: 'This is perhaps the most uncompromising expression of Advaita (non-dual) Vedanta. Unlike texts that offer progressive paths, the Ashtavakra Gita declares from the start: you are already free. The apparent journey is itself the illusion. It influenced later teachers like Ramana Maharshi and Nisargadatta Maharaj.',
      howToRead: 'This text can be destabilizing—it offers no handholds. Read only when you\'re ready to have all your spiritual ambitions questioned. Don\'t try to "do" what it says; rather, notice if its words resonate with something you already know but have been ignoring. It points to what remains when all seeking stops.',
    },
  },
  {
    id: 'yoga-sutras',
    name: 'Yoga Sutras of Patanjali',
    tradition: 'Hindu',
    totalVerses: 196,
    description: 'The foundational text of Classical Yoga - 196 aphorisms presenting a systematic path for stilling the mind and realizing the true Self.',
    originalLanguage: 'Sanskrit',
    period: '~400 CE',
    icon: '🧘',
    historicalIntro: {
      origin: 'The Yoga Sutras were composed in India around 400 CE, systematizing yogic teachings that had developed over centuries. "Sutra" means thread—each verse is compressed, meant to be memorized and unpacked through practice and teaching. The text assumes a student working with a qualified teacher.',
      author: 'Attributed to the sage Patanjali, about whom little is historically known. Some traditions identify him with a famous grammarian of the same name; others consider "Patanjali" a title. What matters is the precision and depth of the teaching itself.',
      significance: 'The Yoga Sutras codified what became "Classical Yoga"—one of the six orthodox schools of Hindu philosophy. Its eight-limbed path (ashtanga) remains the foundation of most yoga practice today. The opening definition—"Yoga is the stilling of the movements of the mind"—encapsulates the entire teaching.',
      howToRead: 'Each sutra is meant to be unpacked slowly. Read one verse, then sit with it. Traditional study involves years with each chapter. Focus especially on the first two chapters (Samadhi Pada and Sadhana Pada), which contain the essential teaching. The later chapters deal with supernatural powers—interesting but not essential.',
    },
  },
  {
    id: 'shiva-sutras',
    name: 'Shiva Sutras',
    tradition: 'Tantric',
    totalVerses: 77,
    description: 'Revealed to the sage Vasugupta in a dream, these 77 sutras form the foundation of Kashmir Shaivism, describing consciousness as supreme reality.',
    originalLanguage: 'Sanskrit',
    period: '9th century CE',
    icon: '🔱',
    historicalIntro: {
      origin: 'According to tradition, the sage Vasugupta received these sutras in a dream around 800-850 CE in the Kashmir valley. He was directed to a rock on Mahadeva Mountain where the sutras were inscribed. This text became the foundation of the Kashmir Shaivism tradition.',
      author: 'Revealed to Vasugupta; considered a direct transmission from Shiva (consciousness itself). The commentary tradition was developed by masters including Ksemaraja and Abhinavagupta, whose elaborations help unlock the compressed meaning of each sutra.',
      significance: 'The Shiva Sutras present a non-dual tantra distinct from both Vedanta and Buddhist approaches. Here, the world is not illusion but the creative expression of consciousness. The body and senses become instruments of realization rather than obstacles. This recognition-based path influenced later teachings across traditions.',
      howToRead: 'Each sutra is extremely condensed—a seed containing vast teaching. Read with a good commentary (Ksemaraja\'s is classical). Focus on the three "awakenings" that structure the text: Shambhavopaya (the way of Shiva), Shaktopaya (the way of energy), and Anavopaya (the individual way). Let each sutra become a meditation object.',
    },
  },
  {
    id: 'spanda-karika',
    name: 'Spanda Karika',
    tradition: 'Tantric',
    totalVerses: 12,
    description: 'A concise Kashmir Shaivism text on the subtle pulse of consciousness, teaching how stillness and movement share one living source.',
    originalLanguage: 'Sanskrit',
    period: '9th century CE',
    translator: 'Adapted from traditional translations',
    icon: '🌊',
    historicalIntro: {
      origin: 'The Spanda Karika emerged in the early flowering of Kashmir Shaivism and is traditionally linked to the teachings of Vasugupta and his lineage. It distills the insight that ultimate reality is not inert, but vibrantly alive as the subtle throb or pulse called spanda.',
      author: 'The text is usually attributed to Kallata, a direct disciple in the Vasugupta lineage, though some traditions link its core insight more directly to Vasugupta himself. However scholars sort the authorship, the work clearly stands in the earliest stream of non-dual Shaiva thought.',
      significance: 'Spanda matters because it reframes spiritual life around living participation rather than withdrawal. Consciousness is not merely the witness behind experience; it is the very pulse within thought, sensation, creativity, and action.',
      howToRead: 'Read the verses as contemplative prompts rather than as abstract metaphysics. The practical question is always the same: can you feel the living pulse of awareness in stillness, in emotion, and in ordinary activity?',
    },
  },
  {
    id: 'pratyabhijnahridayam',
    name: 'Pratyabhijnahridayam',
    tradition: 'Tantric',
    totalVerses: 12,
    description: 'Kshemaraja\'s short manual of recognition, explaining how infinite consciousness appears as the individual and how it can remember itself.',
    originalLanguage: 'Sanskrit',
    period: '11th century CE',
    translator: 'Adapted from traditional translations',
    icon: '💓',
    historicalIntro: {
      origin: 'Pratyabhijnahridayam, “The Heart of Recognition,” was composed in medieval Kashmir as a concise doorway into the recognition school of Shaivism. It condenses a sophisticated philosophical tradition into a more approachable series of aphoristic teachings.',
      author: 'The work is attributed to Kshemaraja, one of the great commentators of Kashmir Shaivism and a disciple in the lineage of Abhinavagupta. He was especially gifted at turning dense doctrine into language practitioners could actually use.',
      significance: 'Its power lies in its clarity: bondage is not a real fall from divinity but a contraction or forgetting of what consciousness already is. Liberation, then, is recognition rather than acquisition.',
      howToRead: 'Read it with the language of remembrance in mind. Each verse asks you to notice where you contract into a smaller identity and how awareness might recognize itself again in the middle of ordinary life.',
    },
  },
  {
    id: 'tantraloka-selections',
    name: 'Tantraloka (Selections)',
    tradition: 'Tantric',
    totalVerses: 12,
    description: 'Curated passages from Abhinavagupta\'s vast tantric synthesis, emphasizing embodied practice, ritual, and recognition as one path.',
    originalLanguage: 'Sanskrit',
    period: '10th-11th century CE',
    translator: 'Adapted from traditional translations',
    icon: '🪔',
    historicalIntro: {
      origin: 'Tantraloka, “Light on Tantra,” was written in Kashmir as Abhinavagupta\'s grand synthesis of ritual, philosophy, yoga, and contemplative insight. It gathers many streams of tantric practice into a single, luminous vision.',
      author: 'Abhinavagupta was the towering polymath of Kashmir Shaivism: philosopher, exegete, poet, aesthetician, and practitioner. His work shaped how later generations understood the unity of doctrine and practice in the Shaiva tradition.',
      significance: 'Tantraloka is significant because it refuses the split between the highest realization and embodied life. Ritual, mantra, breath, relationship, and direct awareness are all shown as valid expressions of one awakened field.',
      howToRead: 'Approach selections slowly and practically. Rather than trying to master the whole system, notice how Abhinavagupta keeps redirecting outer practice toward inner recognition and whole-life integration.',
    },
  },
  {
    id: 'rig-veda',
    name: 'Rig Veda',
    tradition: 'Hindu',
    totalVerses: 61,
    description: 'Selected hymns from the oldest sacred text of Hinduism - praises to cosmic forces and profound philosophical insights.',
    originalLanguage: 'Sanskrit',
    period: '1500-1200 BCE',
    translator: 'Ralph Griffith',
    icon: '📜',
    historicalIntro: {
      origin: 'The Rig Veda is among the oldest religious texts still in continuous use, composed in northwest India between 1500-1200 BCE. It emerged from an oral tradition where hymns were memorized with astonishing precision, passed from teacher to student for centuries before being written down.',
      author: 'Various rishis (seers) whose names are preserved with each hymn. These were not considered "authors" but receivers—the hymns were "seen" or "heard" from the cosmic order itself. Families of rishis maintained specific collections over generations.',
      significance: 'The Rig Veda is the foundation of Hindu tradition—the source from which all later scriptures flow. Its hymns shaped Sanskrit, influenced all subsequent Indian philosophy, and continue to be chanted in rituals today. Embedded within the ritual poetry are profound philosophical insights about consciousness and reality.',
      howToRead: 'The Rig Veda is difficult to approach directly—it was composed for a world very different from ours. Read selected hymns (like the Nasadiya Sukta on creation or hymns to Agni) with good commentary. Let the imagery work on you. These are not primitive nature worship but sophisticated symbolic language pointing to cosmic truths.',
    },
  },
  {
    id: 'dhammapada',
    name: 'Dhammapada',
    tradition: 'Buddhist',
    totalVerses: 218,
    description: 'The Path of Truth - Essential verses of the Buddha\'s teachings across all 26 chapters, perfect for daily contemplation and practice.',
    originalLanguage: 'Pali',
    period: '~3rd century BCE',
    translator: 'Max Müller',
    icon: '☸️',
    historicalIntro: {
      origin: 'The Dhammapada was compiled in India around the 3rd century BCE, within a few centuries of the Buddha\'s death. It collects verses the Buddha spoke on various occasions, organized by theme. The title means "Path of the Dhamma (Truth/Teaching)" or "Verses of the Teaching."',
      author: 'Attributed to Gautama Buddha (c. 563-483 BCE), compiled by the early sangha (community). Each verse was preserved because of its memorable power—these are the Buddha\'s words that most deeply struck his listeners and were carried forward through oral tradition.',
      significance: 'The Dhammapada is Buddhism\'s most beloved and accessible text. It distills the Buddha\'s practical wisdom into memorable verses, covering the mind, action, happiness, and the path to liberation. Unlike dense philosophical texts, it speaks directly to daily life and immediate practice.',
      howToRead: 'Read one verse per day and carry it with you. The Dhammapada is meant to be lived, not merely understood. Each verse is a mirror—notice your reactions. The famous opening—"Mind is the forerunner of all actions"—establishes the key insight: work with your mind, and everything else follows.',
    },
  },
  {
    id: 'zen-koans',
    name: 'Zen Koans (Mumonkan)',
    tradition: 'Zen',
    totalVerses: 48,
    description: 'The Gateless Gate - 48 koans designed to break through conceptual thinking and catalyze direct awakening.',
    originalLanguage: 'Chinese/Japanese',
    period: '13th century CE',
    icon: '🌀',
    historicalIntro: {
      origin: 'The Mumonkan (Gateless Gate) was compiled by Chinese Zen master Wumen Huikai in 1228 CE. It collects 48 koans—teaching stories and questions—from earlier masters, each accompanied by Wumen\'s commentary and verse. These koans had been used in Zen training for centuries before compilation.',
      author: 'Compiled by Wumen Huikai (1183-1260), who arranged and commented on koans from earlier masters including Zhaozhou, Nanquan, and others. The koans themselves emerged from actual encounters between masters and students—spontaneous moments that revealed awakened mind.',
      significance: 'The Mumonkan is one of the two primary koan collections used in Rinzai Zen training. Koans are not puzzles to be solved intellectually but gates that open when the conceptual mind exhausts itself. They catalyze direct insight (kensho) by short-circuiting ordinary thinking.',
      howToRead: 'Don\'t try to figure out the "answer." A koan is meant to stop your thinking mind. Take one koan (start with "Mu" or "Original Face") and hold it in awareness during sitting meditation. Let it become a burning question that consumes all other thoughts. When genuine breakthrough occurs, the meaning becomes obvious—but the obvious cannot be spoken.',
    },
  },
  {
    id: 'rumi',
    name: 'Rumi - Masnavi & Odes',
    tradition: 'Sufi',
    totalVerses: 80,
    description: 'Selected poems from the great Sufi mystic, expressing divine love, longing, and the path of the heart.',
    originalLanguage: 'Persian',
    period: '13th century CE',
    icon: '🌹',
    historicalIntro: {
      origin: 'Rumi composed his poetry in 13th-century Konya (modern-day Turkey), then part of the Seljuk Sultanate of Rum. His poetry poured forth after his transformative meeting with the wandering mystic Shams-i-Tabrizi. When Shams disappeared, Rumi\'s grief transmuted into an ocean of poetry.',
      author: 'Jalal ad-Din Muhammad Rumi (1207-1273), born in present-day Afghanistan, fled the Mongol invasions and eventually settled in Konya. A respected Islamic scholar, his encounter with Shams catalyzed a spiritual revolution. He became a "drunken" mystic poet while remaining a devoted Muslim.',
      significance: 'Rumi is the best-selling poet in America today, 800 years after his death. His poetry transcends religious boundaries, speaking directly to the heart\'s longing for the Divine. The Masnavi, his 25,000-verse masterpiece, is called "the Quran in Persian" for its spiritual depth.',
      howToRead: 'Read aloud—Rumi\'s poetry was often sung or whirled to. Let go of trying to understand every metaphor. The poems communicate heart-to-heart, bypassing the analytical mind. Notice which images spark recognition: the reed flute\'s longing, the moth drawn to flame, the wine that intoxicates the soul.',
    },
  },
  {
    id: 'cloud-of-unknowing',
    name: 'The Cloud of Unknowing',
    tradition: 'ChristianMystic',
    totalVerses: 70,
    description: 'A 14th-century mystical guide to contemplative prayer, teaching that God is found beyond all thought in loving darkness.',
    originalLanguage: 'Middle English',
    period: '14th century CE',
    icon: '☁️',
    historicalIntro: {
      origin: 'The Cloud of Unknowing was written in England around 1375, during a flowering of English mysticism that included Julian of Norwich and Richard Rolle. Written as guidance for a young contemplative, it draws on the apophatic tradition of Pseudo-Dionysius while speaking in practical, pastoral tones.',
      author: 'Anonymous—the author deliberately concealed his identity, possibly a Carthusian monk or rural parish priest. The anonymity itself teaches: the ego must step aside for the work to transmit pure contemplative wisdom rather than personal authority.',
      significance: 'This text offers the clearest practical instruction for contemplative prayer in the Christian tradition. Its teaching of "unknowing"—releasing all thoughts to rest in loving attention—parallels practices across traditions. Thomas Merton called it essential reading for any serious contemplative.',
      howToRead: 'The Cloud is addressed to you directly—it assumes you want to pray deeply. Read slowly, a chapter at a time. When the author describes putting thoughts beneath a "cloud of forgetting," try it. This is a practice manual. The teaching is simple but demands everything: give your loving attention to God, and let all thoughts go.',
    },
  },
  {
    id: 'zhuangzi',
    name: 'Zhuangzi (Chuang Tzu)',
    tradition: 'Taoist',
    totalVerses: 71,
    description: 'The second great Taoist classic, known for its playful philosophy, paradoxes, and stories pointing to spontaneous freedom.',
    originalLanguage: 'Chinese',
    period: '4th century BCE',
    translator: 'James Legge',
    icon: '🦋',
    historicalIntro: {
      origin: 'The Zhuangzi emerged in China during the Warring States period (4th century BCE), a time of chaos and intense philosophical debate. While the Tao Te Ching offers terse, enigmatic verses, the Zhuangzi delights in stories, humor, and extended philosophical explorations.',
      author: 'The "Inner Chapters" (1-7) are attributed to Zhuang Zhou (Chuang Tzu), a historical figure known for his wit and refusal of political office. The remaining chapters were likely added by followers. Zhuangzi\'s style—playful, irreverent, profound—is unmistakable throughout the core text.',
      significance: 'The Zhuangzi expands Taoist philosophy into new dimensions: relativism, the transformation of things, the uselessness of usefulness. Its influence extends through Chan/Zen Buddhism and continues in contemporary philosophy. The butterfly dream—am I a man dreaming I\'m a butterfly, or a butterfly dreaming I\'m a man?—remains philosophy\'s most famous challenge to fixed identity.',
      howToRead: 'Enjoy the stories first—the massive gourd, the skillful butcher, the dream of the butterfly. Don\'t rush to extract "lessons." Let the humor and paradox work on your certainties. Zhuangzi teaches through destabilization; when you find yourself confused, you\'re learning. Return especially to the "Inner Chapters" for Zhuangzi\'s own voice.',
    },
  },
  {
    id: 'prajnaparamita',
    name: 'Heart Sutra & Diamond Sutra',
    tradition: 'Buddhist',
    totalVerses: 41,
    description: 'The essence of Mahayana Buddhist wisdom teaching on emptiness (shunyata) and the perfection of wisdom.',
    originalLanguage: 'Sanskrit',
    period: '1st-5th century CE',
    translator: 'Edward Conze',
    icon: '💎',
    historicalIntro: {
      origin: 'The Prajnaparamita (Perfection of Wisdom) sutras emerged in India between the 1st century BCE and 5th century CE, representing a revolutionary development in Buddhist thought. The Heart Sutra is a condensation; the Diamond Sutra an extended exploration of the same teaching on emptiness.',
      author: 'Traditionally considered the Buddha\'s words, transmitted by Manjushri or revealed through visionary experience. Historically, these sutras developed within Mahayana Buddhist communities, crystallizing insights from meditation practice into literary form.',
      significance: 'These sutras are the philosophical foundation of Mahayana Buddhism. The teaching of shunyata (emptiness) transforms how we understand reality: nothing exists independently, everything arises through relationship. The Heart Sutra\'s "Form is emptiness, emptiness is form" is Buddhism\'s most essential statement.',
      howToRead: 'Emptiness doesn\'t mean nothingness—it means no separate, independent existence. As you read, apply the teaching to your own experience: where is the boundary of "you"? The Heart Sutra can be memorized and chanted; its meaning deepens through repetition. The Diamond Sutra rewards slow, repeated reading—notice how it systematically dissolves every concept, including the concept of emptiness.',
    },
  },
  {
    id: 'sutta-nipata',
    name: 'Sutta Nipata',
    tradition: 'Buddhist',
    totalVerses: 59,
    description: 'One of the oldest Buddhist scriptures, containing some of the Buddha\'s earliest teachings, known for directness and poetic beauty.',
    originalLanguage: 'Pali',
    period: '~5th century BCE',
    translator: 'V. Fausbøll',
    icon: '🪷',
    historicalIntro: {
      origin: 'The Sutta Nipata is among the oldest strata of Buddhist literature, with some portions possibly dating to the Buddha\'s lifetime (5th century BCE). Its poetic form and archaic language suggest it preserves early oral teachings before later systematization.',
      author: 'Attributed to Gautama Buddha, preserved through oral recitation by the earliest sangha. The text\'s directness and lack of technical terminology suggest it captures the Buddha\'s voice before later philosophical elaboration.',
      significance: 'The Sutta Nipata offers a window into earliest Buddhism—before the extensive commentarial traditions, before the split into schools. Its teachings on non-attachment, the dangers of views, and the possibility of liberation are presented with striking immediacy and poetic power.',
      howToRead: 'Read as poetry first—the beauty is not decorative but integral to the teaching. The verses on "The Rhinoceros" (solo spiritual practice) and "Metta Sutta" (loving-kindness) are particularly beloved. Notice the freshness—these are not religious formulas but direct transmissions from an awakened human being.',
    },
  },
  {
    id: 'avadhuta-gita',
    name: 'Avadhuta Gita',
    tradition: 'Hindu',
    totalVerses: 67,
    description: 'A radical Advaita Vedanta text attributed to Dattatreya, proclaiming the absolute freedom and non-dual nature of the Self, beyond all concepts and distinctions.',
    originalLanguage: 'Sanskrit',
    period: '9th-10th century CE',
    icon: '✨',
    historicalIntro: {
      origin: 'The Avadhuta Gita likely emerged between the 9th and 12th centuries CE in India. It presents itself as the spontaneous song of an avadhuta—a realized being who has "shaken off" all worldly and even spiritual concerns. The text celebrates absolute freedom beyond all practice and attainment.',
      author: 'Attributed to Dattatreya, the legendary sage considered an incarnation of Brahma, Vishnu, and Shiva combined. Whether authored by one person or emerging from the avadhuta tradition, the text speaks with a single ecstatic voice of unconditional freedom.',
      significance: 'This is one of the most radical non-dual texts in existence. It goes beyond even the Ashtavakra Gita in declaring that there is no path, no practice, no bondage to overcome. The avadhuta is free in all circumstances because freedom is already the nature of what we are.',
      howToRead: 'This text is not for beginners—it can sound nihilistic or create spiritual bypassing if approached prematurely. Read it when you\'re exhausted with seeking, when spiritual practice has become another form of bondage. Let its fierce declarations strip away even the desire for liberation. What remains?',
    },
  },
  {
    id: 'vivekachudamani',
    name: 'Vivekachudamani',
    tradition: 'Hindu',
    totalVerses: 81,
    description: 'A disciplined Advaita guide that teaches how to distinguish the changing layers of self from what does not come and go.',
    originalLanguage: 'Sanskrit',
    period: '8th century CE',
    icon: '💠',
    historicalIntro: {
      origin: 'The Vivekachudamani appears as a teacher-student dialogue from the Advaita world of medieval India. Its method is orderly and cumulative: it trains the mind to discriminate rather than flooding it with mystical language.',
      author: 'Tradition attributes the work to Adi Shankaracharya, though scholars debate the exact history. Whatever its authorship, the text carries a recognizably Shankaran style: rigorous, incisive, and aimed at direct recognition rather than sentiment.',
      significance: 'This text is valuable because it makes non-duality concrete. Instead of declaring lofty truths and moving on, it patiently examines the body, senses, mind, and ego until the reader can test each claim firsthand.',
      howToRead: 'Approach it as a live inquiry, not as a set of slogans to admire. Each negation is an invitation to check your own experience: if this changes, can it be what I most fundamentally am?',
    },
  },
  {
    id: 'narada-bhakti-sutra',
    name: 'Narada Bhakti Sutra',
    tradition: 'Hindu',
    totalVerses: 66,
    description: 'A foundational text on Bhakti Yoga by sage Narada, outlining the nature, practice, and supreme glory of divine love and devotion.',
    originalLanguage: 'Sanskrit',
    period: '~10th century CE',
    icon: '❤️',
    historicalIntro: {
      origin: 'The Narada Bhakti Sutra emerged from the devotional movements that swept across medieval India. While attributed to the legendary celestial sage Narada, the text was likely composed between the 10th and 12th centuries CE as bhakti traditions crystallized their teachings.',
      author: 'Attributed to Narada, the divine sage who wanders the three worlds playing his vina and singing God\'s names. Whether mythological attribution or historical author, the text transmits the essence of the bhakti path with unusual clarity and systematic organization.',
      significance: 'This text defines pure bhakti: devotion for its own sake, not for any result. It distinguishes various forms of devotion, describes its characteristics and obstacles, and ultimately declares love of God to be the highest path—easier than jnana (knowledge) and more complete than karma (action).',
      howToRead: 'The Narada Bhakti Sutra speaks to the heart, not just the head. As you read about the characteristics of divine love, notice if any resonate with experiences you\'ve had. The text is especially meaningful for those who feel drawn to a devotional path. Let it validate and deepen your heart\'s natural movement toward the Divine.',
    },
  },
  {
    id: 'yoga-vasistha',
    name: 'Yoga Vasistha',
    tradition: 'Hindu',
    totalVerses: 49,
    description: 'A philosophical masterpiece teaching Advaita Vedanta through stories and dialogues between Sage Vasistha and Prince Rama, emphasizing self-knowledge.',
    originalLanguage: 'Sanskrit',
    period: '6th-14th century CE',
    icon: '📖',
    historicalIntro: {
      origin: 'The Yoga Vasistha is one of the longest texts in Sanskrit literature, with the full version containing over 29,000 verses. Composed over centuries (6th-14th CE), it uses the frame of sage Vasistha teaching young prince Rama to convey profound non-dual philosophy through nested stories.',
      author: 'Traditionally attributed to Valmiki, author of the Ramayana. The text likely grew through accretion, with core teachings expanded by later contributors. The unified vision—consciousness as the sole reality—remains consistent throughout.',
      significance: 'The Yoga Vasistha offers the most extensive narrative presentation of Advaita Vedanta. Its stories-within-stories demonstrate how consciousness creates worlds, how liberation is found through understanding rather than action, and how a liberated being functions in the world. It influenced Kashmir Shaivism and later Vedanta.',
      howToRead: 'This is a vast text—start with an abridged version. Let the stories work on you as dreams might. Each tale illustrates how consciousness creates experience. The text particularly suits those who learn through story and imagination. Take one story, contemplate it, then move to another. The depth is inexhaustible.',
    },
  },
  {
    id: 'conference-of-birds',
    name: 'The Conference of the Birds',
    tradition: 'Sufi',
    totalVerses: 56,
    description: 'A masterpiece of Persian poetry by Farid ud-Din Attar - an allegorical tale of birds on a spiritual journey to find their king, the Simorgh.',
    originalLanguage: 'Persian',
    period: '12th century CE',
    icon: '🕊️',
    historicalIntro: {
      origin: 'The Conference of the Birds was composed in Persia (modern Iran) around 1177 CE. It tells of birds gathering to seek their king, the Simorgh, and their journey through seven valleys of the mystical path. The allegory draws on ancient Persian mythology and Sufi teaching.',
      author: 'Farid ud-Din Attar (c. 1145-1221), a pharmacist in Nishapur who became one of the most influential Sufi poets. He wrote during the golden age of Persian Sufi literature, predating Rumi, who was deeply influenced by his work. Attar was reportedly killed during the Mongol invasion.',
      significance: 'This is Sufism\'s supreme allegorical work. The journey through the seven valleys—Quest, Love, Knowledge, Detachment, Unity, Bewilderment, and Annihilation—maps the stages of the mystical path. The final revelation—discovering that the Simorgh (king) was always their own collective Self—teaches non-duality in Sufi terms.',
      howToRead: 'Read as a journey you are on. Identify with the birds—their fears, objections, and eventual transformation mirror your own. Each bird\'s excuse for not undertaking the journey reveals a pattern you may recognize in yourself. The embedded stories teach through indirection. Let the final revelation—"si morgh" means "thirty birds" in Persian—land fresh in your heart.',
    },
  },
  {
    id: 'dark-night-of-the-soul',
    name: 'Dark Night of the Soul',
    tradition: 'ChristianMystic',
    totalVerses: 60,
    description: 'St. John of the Cross\'s classic describing the two phases of spiritual purification that a soul undergoes on its journey to union with God.',
    originalLanguage: 'Spanish',
    period: '16th century CE',
    icon: '🕯️',
    historicalIntro: {
      origin: 'St. John of the Cross wrote the poem "Dark Night of the Soul" while imprisoned by his own religious order in Toledo, Spain (1577-1578). He later wrote extensive commentary explaining the poem\'s mystical meaning. The work emerged from direct experience of both suffering and divine union.',
      author: 'San Juan de la Cruz (St. John of the Cross, 1542-1591), a Spanish Carmelite priest and mystic. With St. Teresa of Ávila, he reformed the Carmelite order. His writings are considered among the most profound mystical texts in any language, earning him the title "Doctor of the Church."',
      significance: 'The "dark night" has become a universal term for spiritual crisis and transformation. John describes two nights: the purification of the senses (giving up attachment to spiritual consolations) and the purification of the spirit (the deeper stripping away of the ego). His map helps those lost in spiritual darkness recognize it as grace.',
      howToRead: 'Read especially during difficult times of spiritual dryness or crisis. John assures us that the darkness is not punishment but purification—God is at work when we feel most abandoned. The poetry speaks to the heart; the commentary to the understanding. Let both work on you. This is one of the most important texts for understanding the complete spiritual journey.',
    },
  },
  {
    id: 'corpus-hermeticum',
    name: 'Corpus Hermeticum',
    tradition: 'Hermetic',
    totalVerses: 53,
    description: 'Ancient Greco-Egyptian texts attributed to Hermes Trismegistus, containing teachings on divine wisdom, the nature of reality, and spiritual rebirth.',
    originalLanguage: 'Greek',
    period: '1st-3rd century CE',
    icon: '🏛️',
    historicalIntro: {
      origin: 'The Corpus Hermeticum was composed in Greco-Roman Egypt between the 1st and 3rd centuries CE. It represents the meeting of Greek philosophy, Egyptian religion, and Jewish mysticism in the multicultural milieu of Alexandria. The texts present themselves as revelations from the god Hermes (Egyptian Thoth).',
      author: 'Attributed to Hermes Trismegistus ("Thrice-Greatest Hermes"), considered a divine teacher or the god Thoth in human form. The texts were actually written by multiple anonymous authors within Hermetic schools. Renaissance scholars believed these were more ancient than Plato; we now know they\'re roughly contemporary with early Christianity.',
      significance: 'The Hermetic texts profoundly influenced Western esotericism, alchemy, and magic. Their central insight—"As above, so below"—expresses the correspondence between cosmic and human reality. The first text, "Poimandres," describes cosmic creation and the soul\'s journey in ways that parallel both Gnostic and Neoplatonic thought.',
      howToRead: 'Begin with "Poimandres" (Treatise I), the foundational revelation. The dialogic form—student questioning teacher—invites you to identify with the seeker. Notice the blend of intellectual philosophy and visionary experience. These texts taught through initiation; read them as if you were a student in an ancient mystery school.',
    },
  },
  {
    id: 'kybalion',
    name: 'The Kybalion',
    tradition: 'Hermetic',
    totalVerses: 44,
    description: 'A modern distillation of Hermetic philosophy, outlining seven universal principles governing reality and consciousness.',
    originalLanguage: 'English',
    period: '1908 CE',
    icon: '🔺',
    historicalIntro: {
      origin: 'The Kybalion was published in Chicago in 1908 by "Three Initiates." It claims to transmit ancient Egyptian wisdom passed through secret lineages, but it\'s actually a modern synthesis blending Hermeticism with New Thought, Theosophy, and Hindu philosophy popular in early 20th-century esoteric circles.',
      author: 'The "Three Initiates" are generally identified as William Walker Atkinson (1862-1932), a prolific New Thought author, possibly with Paul Foster Case and Michael Whitty. Despite its modern origins, the text effectively systematizes concepts from the authentic Hermetic tradition.',
      significance: 'The Kybalion has become the most accessible introduction to Hermetic philosophy for modern readers. Its seven principles—Mentalism, Correspondence, Vibration, Polarity, Rhythm, Cause and Effect, and Gender—provide a framework for understanding reality that has influenced countless spiritual seekers and occultists.',
      howToRead: 'Study one principle at a time and look for its manifestation in your daily life. The Kybalion is meant to be practical—each principle is a tool for understanding and working with reality. While scholars debate its authenticity, the teaching remains useful. Take what illuminates your understanding and leave what doesn\'t resonate.',
    },
  },
  {
    id: 'imitation-of-christ',
    name: 'The Imitation of Christ',
    tradition: 'ChristianMystic',
    totalVerses: 51,
    description: 'Thomas à Kempis\'s beloved devotional classic, offering practical spiritual advice on living a Christ-like life and cultivating inner peace.',
    originalLanguage: 'Latin',
    period: '15th century CE',
    icon: '✝️',
    historicalIntro: {
      origin: 'The Imitation of Christ was composed in the Netherlands around 1418-1427, emerging from the Devotio Moderna movement that emphasized practical piety over academic theology. It became the most widely read Christian devotional text after the Bible, translated into more languages than any other book except scripture.',
      author: 'Thomas à Kempis (c. 1380-1471), an Augustinian monk at Mount Saint Agnes monastery in the Netherlands. Thomas spent his life in contemplative community, copying manuscripts and writing devotional works. The Imitation reflects his decades of monastic experience distilled into practical wisdom.',
      significance: 'The Imitation offers the clearest guide to Christian interior life ever written. It teaches detachment from worldly concerns, interior communion with Christ, and the gradual transformation of the soul through grace. Its influence spans Catholic, Protestant, and Orthodox traditions—Ignatius of Loyola, John Wesley, and countless others treasured it.',
      howToRead: 'Read a small section daily as spiritual food, not for information. The four books progress from outer to inner life, culminating in the Eucharist. Don\'t be put off by medieval language or apparent harshness toward self—underneath is profound tenderness and practical wisdom. Let the text question your attachments rather than defending against it.',
    },
  },
  {
    id: 'stoic-meditations',
    name: 'Meditations',
    tradition: 'Stoic',
    totalVerses: 54,
    description: 'The private philosophical journal of the Roman Emperor Marcus Aurelius, written during military campaigns on the Danube frontier — reflections on virtue, duty, impermanence, and inner freedom.',
    originalLanguage: 'Greek',
    period: '~170-180 CE',
    translator: 'George Long',
    icon: '🏛️',
    historicalIntro: {
      origin: 'The Meditations were written during Marcus Aurelius\'s military campaigns on the Danube frontier, far from the comforts of Rome. These were private notes to himself—never intended for publication—composed in Greek, the language of philosophy, rather than Latin, the language of empire. They survive by chance, preserved through Byzantine manuscript tradition.',
      author: 'Marcus Aurelius (121-180 CE), Roman Emperor from 161 until his death. The last of the "Five Good Emperors," he ruled during plague, war, and economic crisis while maintaining a rigorous inner philosophical practice. He studied Stoicism under Junius Rusticus and the correspondence of Marcus Cornelius Fronto.',
      significance: 'The Meditations is perhaps the most intimate document of self-examination ever written by a person of such power. Here the most powerful man in the world seeks not conquest but virtue, not fame but equanimity. The text demonstrates that Stoic philosophy is not cold theory but a daily practice of radical inner transformation.',
      howToRead: 'Read a few entries at a time, perhaps in the morning as Marcus intended his own practice. These are not systematic philosophy but daily exercises in attention. Notice the recurring themes: impermanence, duty, the shortness of life, the power of judgment. Let Marcus\'s struggles with anger, distraction, and mortality mirror your own. The most powerful man in the world had the same inner battles you do.',
    },
  },
  {
    id: 'stoic-discourses',
    name: 'Discourses',
    tradition: 'Stoic',
    totalVerses: 50,
    description: 'The lectures of Epictetus — born a slave, became one of the most influential philosophers in history — on freedom, judgment, and the art of living, recorded by his student Arrian.',
    originalLanguage: 'Greek',
    period: '~108 CE',
    translator: 'Elizabeth Carter',
    icon: '⛓️',
    historicalIntro: {
      origin: 'The Discourses were recorded at Epictetus\'s school in Nicopolis (northwestern Greece) around 108 CE by his student Arrian of Nicomedia. Originally eight books, only four survive. Arrian also compiled the Enchiridion (Handbook), a condensed summary of the core teachings. The school attracted students from across the Roman Empire.',
      author: 'Epictetus (c. 50-135 CE) was born a slave in Hierapolis, Phrygia (modern Turkey). His master Epaphroditus allowed him to study under the Stoic teacher Musonius Rufus. Tradition holds that his master broke his leg, teaching Epictetus firsthand about what is and is not in one\'s control. Freed after Nero\'s death, he taught in Rome until Domitian banished philosophers, then established his school in Nicopolis.',
      significance: 'Epictetus\'s teaching centers on the "dichotomy of control"—distinguishing what is "up to us" (our judgments, intentions, desires) from what is not (our body, reputation, possessions). This single insight, rigorously applied, constitutes his entire philosophy. His influence extends through Marcus Aurelius (who studied the Discourses), Stockdale (who survived POW camp with Epictetus), and modern cognitive behavioral therapy.',
      howToRead: 'Read the Enchiridion first for the essential framework, then dive into the Discourses for the full teaching in action. Epictetus is direct, often blunt, sometimes funny. He challenges students who want comfort rather than truth. Apply each teaching to your own life immediately—Epictetus despised armchair philosophy. Ask yourself with each passage: "What is up to me here? What is not?"',
    },
  },
  {
    id: 'stoic-letters',
    name: 'Letters to Lucilius',
    tradition: 'Stoic',
    totalVerses: 55,
    description: '124 moral letters from Seneca to his friend Lucilius, written in his final years — the most accessible entry point to Stoic philosophy, blending practical advice with profound wisdom on time, death, virtue, and the good life.',
    originalLanguage: 'Latin',
    period: '~63-65 CE',
    translator: 'Richard Mott Gummere',
    icon: '✉️',
    historicalIntro: {
      origin: 'The Moral Letters to Lucilius were written in Rome and Seneca\'s country estates during the last two years of his life (63-65 CE), after he had retired from politics and the court of Nero. Whether the letters were real correspondence or a literary device remains debated; either way, they represent Seneca\'s most mature philosophical thought, composed with the urgency of a man who knew his time was short.',
      author: 'Lucius Annaeus Seneca (c. 4 BCE - 65 CE) was born in Córdoba, Spain, and raised in Rome. He served as statesman, dramatist, and tutor to the young emperor Nero. When Nero turned tyrannical, Seneca withdrew. Accused of conspiracy in 65 CE, he was ordered to commit suicide, which he did with philosophical composure, in conscious imitation of Socrates.',
      significance: 'The Letters are perhaps the most readable introduction to Stoic philosophy ever written. Seneca writes not as a sage dispensing perfection but as a fellow traveler sharing what he has learned. His topics—how to use time, how to face death, the nature of true friendship, the trap of wealth—remain urgently relevant. The Letters influenced Montaigne, Shakespeare, and the entire essay tradition.',
      howToRead: 'Read one letter at a time, as Lucilius would have received them. Seneca writes with warmth and self-deprecating honesty—he admits his own failings even as he counsels. Pay attention to the opening of each letter, which often contains a practical observation from daily life. Let Seneca be your philosophical friend rather than your teacher. These letters were written to be lived, not merely admired.',
    },
  },
];

/**
 * Get verse count by source
 */
export function getVerseCountBySource(): Record<string, number> {
  const counts: Record<string, number> = {};
  ALL_VERSES.forEach(v => {
    counts[v.sourceId] = (counts[v.sourceId] || 0) + 1;
  });
  return counts;
}

/**
 * Get tradition statistics
 */
export function getTraditionStats(): Record<string, { sources: number; verses: number }> {
  const stats: Record<string, { sources: number; verses: number }> = {};
  
  ALL_SOURCES.forEach(s => {
    if (!stats[s.tradition]) {
      stats[s.tradition] = { sources: 0, verses: 0 };
    }
    stats[s.tradition].sources++;
  });
  
  ALL_VERSES.forEach(v => {
    if (stats[v.tradition]) {
      stats[v.tradition].verses++;
    }
  });
  
  return stats;
}

