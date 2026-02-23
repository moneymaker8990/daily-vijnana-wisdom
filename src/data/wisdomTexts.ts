/**
 * Shared Wisdom Texts for Daily Rotation
 *
 * Contains quotes from all 24 sacred traditions for use across all 365 days.
 * Each tradition has multiple texts that rotate to ensure variety.
 */

export type TraditionKey =
  | 'vijnana' | 'tao' | 'gita' | 'upanishads' | 'ashtavakra' | 'yogaSutras' | 'shivaSutras'
  | 'dhammapada' | 'rumi' | 'zenKoan' | 'zhuangzi' | 'rigVeda' | 'cloudOfUnknowing'
  | 'prajnaparamita' | 'suttaNipata' | 'avadhutaGita' | 'vivekachudamani' | 'naradaBhakti'
  | 'yogaVasistha' | 'conferenceOfBirds' | 'darkNight' | 'corpusHermeticum' | 'kybalion' | 'imitationOfChrist'
  | 'stoicMeditations' | 'stoicDiscourses' | 'stoicLetters';

export interface TraditionData {
  name: string;
  context: string;
  whyMatters: string;
  texts: string[];
  commentaryStyle: string;
}

export const WISDOM_TRADITIONS: Record<TraditionKey, TraditionData> = {
  // === TANTRIC/KASHMIRI ===
  vijnana: {
    name: 'Vijnana Bhairava Tantra',
    context: 'A medieval Kashmiri text offering 112 gateways into presence through breath, sensation, and the immediacy of experience.',
    whyMatters: 'This teaching interrupts habitual patterns and opens direct contact with awareness.',
    texts: [
      'The awareness that permeates all things is the root of all experience. Rest in that which witnesses.',
      'Between the inhalation and exhalation shines the light of consciousness.',
      'At the moment of feeling pleasure or pain, become absorbed in that very feeling. There, find the infinite.',
      'Focus on the fire rising through the body, becoming lighter until consumed by the flames of awareness.',
      'When the mind is dissolved in the void, beyond thoughts, there is pure consciousness.',
      'Contemplate the space within your body as if it were a vast, empty sky. In that sky, rest.',
      'At the moment of sneezing, in terror, at the edge of an abyss—there consciousness shines.',
      'When desire arises, observe it fully without acting. In that gap, the Self is revealed.',
    ],
    commentaryStyle: 'This verse invites you to recognize awareness through direct experience.',
  },

  shivaSutras: {
    name: 'Shiva Sutras',
    context: 'Revealed to the sage Vasugupta in Kashmir, these sutras describe consciousness as supreme reality.',
    whyMatters: 'Recognition of your true nature as Shiva—pure awareness—liberates instantly.',
    texts: [
      'Consciousness is the Self.',
      'Knowledge is bondage.',
      'The world appears in the Self like images in a mirror.',
      'The individual soul is the entire universe.',
      'Pure awareness is the state of Shiva.',
      'The stages of yoga are a progressive wonder.',
      'Waking, dreaming, and deep sleep are but modifications of consciousness.',
      'The yogi settled in the Self transforms everything into the Self.',
    ],
    commentaryStyle: 'Kashmir Shaivism teaches that you are already Shiva—this sutra helps you recognize it.',
  },

  // === TAOIST ===
  tao: {
    name: 'Tao Te Ching',
    context: 'An ancient Chinese classic pointing to effortless harmony and the wisdom of yielding.',
    whyMatters: 'The Tao reminds us that the deepest truths emerge when we stop forcing and start flowing.',
    texts: [
      'The Tao that can be spoken is not the eternal Tao.',
      'Being and non-being create each other.',
      'Practice not-doing, and everything will fall into place.',
      'The Tao is like an empty vessel that may be drawn from without ever needing to be filled.',
      'The highest good is like water. Water benefits all things without competing.',
      'Thirty spokes meet at a hub. The emptiness at the center makes the wheel useful.',
      'Knowing others is intelligence; knowing yourself is true wisdom.',
      'The softest thing in the universe overcomes the hardest.',
    ],
    commentaryStyle: 'The Tao points beyond concepts to direct experience of flow and harmony.',
  },

  zhuangzi: {
    name: 'Zhuangzi',
    context: 'Zhuangzi\'s playful Taoist philosophy points to the freedom found in vastness and transformation.',
    whyMatters: 'Freedom comes from flowing with change rather than resisting it.',
    texts: [
      'Heaven and Earth and I were born at the same time, and all life and I are one.',
      'The fish trap exists because of the fish. Once you\'ve gotten the fish, you can forget the trap.',
      'Flow with whatever may happen and let your mind be free.',
      'Happiness is the absence of striving for happiness.',
      'Great knowledge sees all in one. Small knowledge breaks down into the many.',
      'When there is no more separation between this and that, it is called the still-point of the Tao.',
      'A path is made by walking on it.',
      'Once upon a time, I dreamt I was a butterfly. Now I do not know whether I am a man dreaming I was a butterfly, or a butterfly dreaming I am a man.',
    ],
    commentaryStyle: 'Zhuangzi\'s playful wisdom dissolves fixed views and reveals natural freedom.',
  },

  // === HINDU/VEDANTIC ===
  upanishads: {
    name: 'Upanishads',
    context: 'Nondual dialogues exploring the source behind seeing, hearing, and thought.',
    whyMatters: 'Recognizing the seer behind seeing dissolves the sense of separation.',
    texts: [
      'That which the mind cannot think, but by which the mind thinks—know that alone to be Brahman.',
      'This Self is Brahman. This Self has four quarters: waking, dreaming, deep sleep, and the fourth.',
      'You are That. Tat tvam asi.',
      'The Self is not this, not this. It is unseizable, undecaying, unattached.',
      'From the unreal lead me to the real. From darkness lead me to light.',
      'He who knows the Self overcomes grief.',
      'In the beginning was Brahman, with whom was the Word.',
      'That which is the subtle essence—in that have all beings their existence. That is the Self.',
    ],
    commentaryStyle: 'The Upanishads point directly to the Self that you already are.',
  },

  gita: {
    name: 'Bhagavad Gita',
    context: 'Krishna\'s timeless teaching on action, devotion, and the nature of the Self.',
    whyMatters: 'The Gita unites action and awareness, showing how to live liberation in daily life.',
    texts: [
      'You have the right to work, but never to the fruit of work.',
      'The self cannot be cut, burned, wetted, or dried. Eternal, all-pervading, unchanging.',
      'Abandon all varieties of religion and just surrender unto Me.',
      'When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.',
      'Be steadfast in yoga. Perform your duty without attachment.',
      'One who sees inaction in action and action in inaction is wise.',
      'He who has no attachments can really love others, for his love is pure and divine.',
      'Set thy heart upon thy work, but never on its reward.',
    ],
    commentaryStyle: 'Krishna shows how action performed without attachment becomes a path to liberation.',
  },

  ashtavakra: {
    name: 'Ashtavakra Gita',
    context: 'A radical non-dual dialogue teaching that you are already free, already the Self.',
    whyMatters: 'This text cuts through all seeking by declaring that liberation is already your nature.',
    texts: [
      'You are pure consciousness—the witness of all experience. Rest in that.',
      'The Self is neither bound nor free. Why do you imagine bondage or liberation?',
      'You are already complete. Nothing needs to be added.',
      'Let go of everything. You are the infinite ocean; these waves are nothing to you.',
      'When you know yourself as That in which all appears, you are free.',
      'Bondage is when the mind desires or grieves over something.',
      'You are awareness itself. The world is a dream appearing in you.',
      'For the wise one who has realized the Self, there is neither bondage nor liberation.',
    ],
    commentaryStyle: 'The Ashtavakra Gita offers no path because you are already the destination.',
  },

  yogaSutras: {
    name: 'Yoga Sutras of Patanjali',
    context: 'The foundational text of Classical Yoga presenting a systematic path for stilling the mind.',
    whyMatters: 'Yoga shows how to disentangle awareness from the movements of the mind.',
    texts: [
      'Yoga is the stilling of the movements of the mind.',
      'Then the seer abides in its own nature.',
      'Practice and non-attachment are the means to still the mind.',
      'When the mind is free from all distractions, it becomes clear like a crystal.',
      'From contentment, supreme happiness is gained.',
      'By self-study, communion with the divine is established.',
      'Ignorance is taking the impermanent, the impure, the painful, and the not-Self to be permanent, pure, pleasant, and the Self.',
      'When all mental modifications are controlled, the yogi attains samadhi.',
    ],
    commentaryStyle: 'Patanjali offers a systematic map for the journey from distraction to stillness.',
  },

  rigVeda: {
    name: 'Rig Veda',
    context: 'The oldest sacred text of Hinduism, containing hymns to cosmic forces and profound philosophical insights.',
    whyMatters: 'These ancient hymns connect daily practice to the cosmic rhythms of creation.',
    texts: [
      'Truth is one; the wise call it by many names.',
      'In the beginning there was neither existence nor non-existence.',
      'May we be protected together. May we be nourished together.',
      'From the unreal lead me to the real. From darkness lead me to light.',
      'Let noble thoughts come to us from all directions.',
      'May all beings be happy. May all beings be free from illness.',
      'The sun never sets or rises. When people think it sets, it is going round to the other side.',
      'As the rivers flow into the ocean, so do all paths lead to the One.',
    ],
    commentaryStyle: 'The Rig Veda reveals the cosmic dimension of awareness.',
  },

  avadhutaGita: {
    name: 'Avadhuta Gita',
    context: 'A radical Advaita text proclaiming the absolute freedom and non-dual nature of the Self.',
    whyMatters: 'This text declares that all distinctions are illusory—you are free beyond all concepts.',
    texts: [
      'I am neither bound nor liberated. I am Brahman alone.',
      'There is no world, no universe, no creation—only the eternal Self.',
      'I have no color, no form. I am pure consciousness.',
      'Neither mantra, nor yantra, nor guru—I am the Self, birthless and deathless.',
      'How can I speak of the Self? It is beyond all words.',
      'I have no karma, no dharma. All such distinctions do not touch me.',
      'The wise see the Self in all, and all in the Self.',
      'I am like space—pure, infinite, unchanging.',
    ],
    commentaryStyle: 'The Avadhuta\'s song declares freedom beyond all categories.',
  },

  vivekachudamani: {
    name: 'Vivekachudamani',
    context: 'Shankara\'s "Crest-Jewel of Discrimination" guiding the seeker to discriminate between Real and unreal.',
    whyMatters: 'Through discrimination, you recognize what you truly are beyond all changing appearances.',
    texts: [
      'Brahman alone is real. The world is appearance. The individual soul is Brahman itself.',
      'You are not the body, not the mind, not the ego—you are the witness of all these.',
      'Like the sun that illuminates without being affected, so is the Self.',
      'Liberation is not something to be attained—it is your very nature.',
      'When the mind is purified, the Self is revealed spontaneously.',
      'He who identifies with the body lives in bondage. He who knows the Self is free.',
      'Neti neti—not this, not this. Remove all that is not the Self.',
      'The Self is self-luminous, needing no other light to be known.',
    ],
    commentaryStyle: 'Shankara systematically removes false identifications until only the Self remains.',
  },

  naradaBhakti: {
    name: 'Narada Bhakti Sutra',
    context: 'A foundational text on Bhakti Yoga outlining the nature and practice of divine love.',
    whyMatters: 'The path of devotion shows that love itself is the direct way to liberation.',
    texts: [
      'Supreme love for God is called Bhakti.',
      'Obtaining that, one becomes perfect, immortal, and satisfied.',
      'True bhakti is the surrender of all actions to God.',
      'Love knows no barriers, no conditions, no fear.',
      'The devotee sees God everywhere and in all beings.',
      'When the heart is full of love, there is no room for ego.',
      'Bhakti is its own reward. It asks nothing in return.',
      'Pure devotion dissolves all karma and leads to liberation.',
    ],
    commentaryStyle: 'Narada shows that the heart\'s natural movement toward love is itself the path.',
  },

  yogaVasistha: {
    name: 'Yoga Vasistha',
    context: 'A philosophical masterpiece teaching Advaita through stories and dialogues between Vasistha and Rama.',
    whyMatters: 'Through vivid stories, this text shows that the world is consciousness dreaming.',
    texts: [
      'This world is nothing but consciousness appearing as form.',
      'The mind creates the world; the mind also dissolves it.',
      'Liberation is the end of the false notion "I am the body."',
      'As long as there is mental modification, there is the world. When modification ceases, there is Brahman.',
      'The self-realized sage sees all beings as his own Self.',
      'Whatever you see is nothing but the Self seeing itself.',
      'The world is like a city seen in a dream—it appears real while dreaming.',
      'When the mind is controlled, the whole universe is controlled.',
    ],
    commentaryStyle: 'Through storytelling, Vasistha reveals that reality is consciousness alone.',
  },

  // === BUDDHIST ===
  dhammapada: {
    name: 'Dhammapada',
    context: 'The Buddha\'s collected verses on mindfulness, wisdom, and the training of the mind.',
    whyMatters: 'Buddhist mindfulness grounds awakening in direct experience of the present moment.',
    texts: [
      'Mind is the forerunner of all actions. All deeds are led by mind, created by mind.',
      'Better than a thousand hollow words is one word that brings peace.',
      'Mindfulness is the path to the deathless. Mindlessness is the path to death.',
      'You yourself must strive. The Buddhas only point the way.',
      'As a solid rock is not shaken by the wind, so the wise are not moved by praise or blame.',
      'Let go of the past, let go of the future. Cross over to the farther shore.',
      'Hatred never ceases by hatred in this world. By love alone does hatred cease.',
      'Radiate boundless love towards the entire world—above, below, and across.',
    ],
    commentaryStyle: 'The Buddha offers practical wisdom for transforming the mind.',
  },

  zenKoan: {
    name: 'Zen Koans',
    context: 'Zen koans short-circuit the thinking mind, pointing directly to original nature.',
    whyMatters: 'Zen dissolves conceptual mind to reveal what has always been here.',
    texts: [
      'What was your original face before your parents were born?',
      'Does a dog have Buddha nature? Mu.',
      'What is the sound of one hand clapping?',
      'If you meet the Buddha on the road, kill him.',
      'When hungry, eat. When tired, sleep.',
      'Sitting quietly, doing nothing, spring comes, and the grass grows by itself.',
      'Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water.',
      'The obstacle is the path.',
    ],
    commentaryStyle: 'This koan cannot be solved by thinking—let it dissolve the thinking mind.',
  },

  prajnaparamita: {
    name: 'Heart Sutra & Diamond Sutra',
    context: 'The essence of Mahayana Buddhist wisdom on emptiness and the perfection of wisdom.',
    whyMatters: 'Understanding emptiness reveals that nothing has independent existence—all is interconnected.',
    texts: [
      'Form is emptiness, emptiness is form.',
      'All phenomena are marked by emptiness—they do not appear or disappear.',
      'No wisdom, no attainment, because there is nothing to attain.',
      'Gate gate paragate parasamgate bodhi svaha—gone, gone, gone beyond.',
      'Abide nowhere and let the mind arise.',
      'All conditioned phenomena are like a dream, an illusion, a bubble, a shadow.',
      'The bodhisattva saves all beings without any being being saved.',
      'Past mind cannot be grasped. Present mind cannot be grasped. Future mind cannot be grasped.',
    ],
    commentaryStyle: 'The Perfection of Wisdom cuts through all conceptual grasping.',
  },

  suttaNipata: {
    name: 'Sutta Nipata',
    context: 'One of the oldest Buddhist scriptures, containing some of the Buddha\'s earliest teachings.',
    whyMatters: 'These early teachings have a directness and freshness that speaks across millennia.',
    texts: [
      'As the mother would protect her only child with her life, even so let one cultivate boundless love towards all beings.',
      'Just as a bee collects nectar without harming the flower, so should one gather wisdom.',
      'Whoever has no expectations can have no frustrations.',
      'The wise who hurt no living being, who keep their body, speech, and mind at peace—they attain the peaceful state.',
      'Let one not give back evil for evil. Let one conquer anger with non-anger.',
      'Whatever is not yours, abandon it. This will lead to your welfare and happiness.',
      'Like the rhinoceros, wander alone.',
      'Not by birth is one an outcast, not by birth is one a brahmin. By action one becomes an outcast; by action one becomes a brahmin.',
    ],
    commentaryStyle: 'The Buddha\'s early words offer direct guidance without elaboration.',
  },

  // === SUFI/ISLAMIC MYSTICISM ===
  rumi: {
    name: 'Rumi',
    context: 'The Sufi poet who transformed longing and intensity into pathways of divine union.',
    whyMatters: 'The heart knows what the mind cannot grasp—Rumi shows love as the direct path.',
    texts: [
      'The wound is the place where the Light enters you.',
      'Let yourself be silently drawn by the strange pull of what you really love.',
      'Out beyond ideas of wrongdoing and rightdoing, there is a field. I\'ll meet you there.',
      'What you seek is seeking you.',
      'Be melting snow. Wash yourself of yourself.',
      'Silence is the language of God, all else is poor translation.',
      'You are not a drop in the ocean. You are the entire ocean in a drop.',
      'Stop acting so small. You are the universe in ecstatic motion.',
    ],
    commentaryStyle: 'Rumi\'s poetry speaks directly to the heart\'s longing for union.',
  },

  conferenceOfBirds: {
    name: 'Conference of the Birds',
    context: 'Attar\'s masterpiece of Persian poetry—an allegorical tale of birds seeking their king.',
    whyMatters: 'The journey through the seven valleys maps the stages of the mystical path.',
    texts: [
      'If you desire to know the secret, you must seek it with your whole being.',
      'The heart that loves is always young.',
      'When the bird of the soul flies free, it seeks only the Simorgh.',
      'The path is long, but the destination is nearer than you think.',
      'Attachment to self is the only veil.',
      'In the end, the thirty birds discovered they themselves were the Simorgh.',
      'Each valley of the path brings new trials and new revelation.',
      'What you seek has been seeking you all along.',
    ],
    commentaryStyle: 'Attar\'s allegory reveals that what we seek is what we already are.',
  },

  // === CHRISTIAN MYSTICISM ===
  cloudOfUnknowing: {
    name: 'Cloud of Unknowing',
    context: 'A 14th-century mystical guide teaching that God is found beyond all thought.',
    whyMatters: 'Contemplative prayer shows that presence is found by releasing all concepts.',
    texts: [
      'Beat upon that thick cloud of unknowing with the dart of longing love.',
      'Let go of all thoughts, good and bad, and simply be.',
      'God can be loved but not thought. By love may he be caught, but by thinking never.',
      'Put all creatures beneath a cloud of forgetting.',
      'The shortest prayer pierces heaven.',
      'All good activity proceeds from love.',
      'Be content with the blind stirring of love toward God.',
      'In this work, silence is better than speech.',
    ],
    commentaryStyle: 'The Cloud points beyond all concepts to loving presence.',
  },

  darkNight: {
    name: 'Dark Night of the Soul',
    context: 'St. John of the Cross\'s classic on the two phases of spiritual purification.',
    whyMatters: 'The dark night is not punishment but purification—grace working in hiddenness.',
    texts: [
      'In the dark night, the soul makes its way to the divine light.',
      'To come to enjoy what you have not, you must go by a way in which you enjoy not.',
      'The soul that is attached to anything, however much good there may be in it, will not arrive at the liberty of divine union.',
      'In that happy night, in secret, seen of none, seeing nothing, with no other light or guide than that which burned in my heart.',
      'Spiritual dryness is often the beginning of contemplation.',
      'God leads into the wilderness those whom he means to speak to.',
      'The darkest hour is nearest the dawn.',
      'When God perceives that the soul has grown a little, He weans it from the sweet breast.',
    ],
    commentaryStyle: 'John of the Cross maps the dark passages that lead to divine union.',
  },

  imitationOfChrist: {
    name: 'Imitation of Christ',
    context: 'Thomas à Kempis\'s beloved devotional classic on living a Christ-like life.',
    whyMatters: 'Practical spiritual wisdom for cultivating inner peace through daily practice.',
    texts: [
      'In the cross is salvation. In the cross is life.',
      'He who knows himself best, esteems himself least.',
      'Be not anxious about tomorrow, for tomorrow will have anxieties of its own.',
      'Love is swift, sincere, pious, pleasant, and delightful.',
      'Think often on your last end, and how you will stand before the strict Judge.',
      'Vanity of vanities, all is vanity, except to love God and serve Him alone.',
      'At the Day of Judgment we shall not be examined on what we have read, but what we have done.',
      'For without the way, there is no going; without the truth, there is no knowing; without the life, there is no living.',
    ],
    commentaryStyle: 'Thomas à Kempis offers timeless wisdom for the inner life.',
  },

  // === HERMETIC/WESTERN ESOTERIC ===
  corpusHermeticum: {
    name: 'Corpus Hermeticum',
    context: 'Ancient Greco-Egyptian texts containing teachings on divine wisdom and spiritual rebirth.',
    whyMatters: 'The Hermetic teachings reveal the correspondence between cosmic and human reality.',
    texts: [
      'As above, so below; as below, so above.',
      'Mind is the maker, and all things are made through Mind.',
      'The Word of God is the creator of all things.',
      'If then you do not make yourself equal to God, you cannot understand God.',
      'Close your eyes and let the mind expand. Let no fear of death or darkness arrest its course.',
      'Everything that exists is in God, not as being contained in a place, but as being embraced by God\'s love.',
      'The sleep of the body is the sober watching of the Mind.',
      'There is nothing in all the world that is not God.',
    ],
    commentaryStyle: 'Hermes Trismegistus reveals the sacred science of transformation.',
  },

  kybalion: {
    name: 'The Kybalion',
    context: 'A modern distillation of Hermetic philosophy, outlining seven universal principles.',
    whyMatters: 'Understanding these principles provides a framework for working with reality.',
    texts: [
      'The All is Mind; the Universe is Mental.',
      'As above, so below; as below, so above.',
      'Nothing rests; everything moves; everything vibrates.',
      'Everything is dual; everything has poles.',
      'Everything flows, out and in; everything has its tides.',
      'Every cause has its effect; every effect has its cause.',
      'Gender is in everything; everything has its masculine and feminine principles.',
      'Mind may be transmuted from state to state; degree to degree.',
    ],
    commentaryStyle: 'The Kybalion systematizes cosmic principles for practical application.',
  },

  // === STOIC ===
  stoicMeditations: {
    name: 'Meditations (Marcus Aurelius)',
    context: 'The private journal of the Roman Emperor Marcus Aurelius, written during military campaigns on the Danube frontier (~170-180 CE).',
    whyMatters: 'Marcus Aurelius reminds us that inner freedom is always available—regardless of outer circumstances.',
    texts: [
      'You have power over your mind—not outside events. Realize this, and you will find strength.',
      'The happiness of your life depends upon the quality of your thoughts.',
      'Waste no more time arguing about what a good man should be. Be one.',
      'Very little is needed to make a happy life; it is all within yourself, in your way of thinking.',
      'When you arise in the morning, think of what a precious privilege it is to be alive.',
      'The soul becomes dyed with the color of its thoughts.',
      'Accept the things to which fate binds you, and love the people with whom fate brings you together.',
      'Never esteem anything as of advantage to you that will make you break your word or lose your self-respect.',
      'How much more grievous are the consequences of anger than the causes of it.',
      'Loss is nothing else but change, and change is Nature\'s delight.',
      'It is not death that a man should fear, but he should fear never beginning to live.',
      'The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane.',
      'Dwell on the beauty of life. Watch the stars, and see yourself running with them.',
      'Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.',
      'The best revenge is to be unlike him who performed the injury.',
      'Begin each day by telling yourself: today I shall meet with interference, ingratitude, insolence, disloyalty, ill-will, and selfishness.',
      'If it is not right do not do it; if it is not true do not say it.',
      'Look within. Within is the fountain of good, and it will ever bubble up, if you will ever dig.',
      'He who lives in harmony with himself lives in harmony with the universe.',
      'The universe is change; our life is what our thoughts make it.',
      'That which is not good for the swarm, neither is it good for the bee.',
      'Do every act of your life as though it were the very last act of your life.',
      'To the wise, life is a problem; to the fool, a solution.',
      'Be like the cliff against which the waves continually break; but it stands firm and tames the fury of the water around it.',
      'Confine yourself to the present.',
      'No man is free who is not master of himself.',
      'What we do now echoes in eternity.',
      'The impediment to action advances action. What stands in the way becomes the way.',
      'Think of yourself as dead. You have lived your life. Now take what is left and live it properly.',
      'Today I escaped anxiety. Or no, I discarded it, because it was within me, in my own perceptions—not outside.',
      'You always own the option of having no opinion.',
    ],
    commentaryStyle: 'Marcus Aurelius reminds us that inner freedom is always available, regardless of circumstance.',
  },

  stoicDiscourses: {
    name: 'Discourses (Epictetus)',
    context: 'Lectures of the former slave turned philosopher Epictetus, recorded by his student Arrian at Nicopolis (~108 CE).',
    whyMatters: 'Epictetus teaches that freedom begins with recognizing what is truly in our power and what is not.',
    texts: [
      'There is only one way to happiness and that is to cease worrying about things which are beyond the power of our will.',
      'It is not things that disturb us, but our judgments about things.',
      'Make the best use of what is in your power, and take the rest as it happens.',
      'No man is free who is not master of himself.',
      'First say to yourself what you would be; and then do what you have to do.',
      'We cannot choose our external circumstances, but we can always choose how we respond to them.',
      'Wealth consists not in having great possessions, but in having few wants.',
      'Don\'t explain your philosophy. Embody it.',
      'If you want to improve, be content to be thought foolish and stupid.',
      'He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has.',
      'It is difficulties that show what men are.',
      'Any person capable of angering you becomes your master.',
      'The key is to keep company only with people who uplift you, whose presence calls forth your best.',
      'Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.',
      'Men are disturbed not by things, but by the views which they take of things.',
      'Caretake this moment. Immerse yourself in its particulars.',
      'Other people\'s views and troubles can be contagious. Don\'t sabotage yourself by unwittingly adopting negative, unproductive attitudes.',
      'You are a little soul carrying about a corpse.',
      'Suffering arises from trying to control what is uncontrollable, or from neglecting what is within our power.',
      'Of all existing things some are in our power, and others are not in our power.',
      'Nature hath given men one tongue but two ears, that we may hear from others twice as much as we speak.',
      'It is impossible for a man to learn what he thinks he already knows.',
      'Circumstances don\'t make the man, they only reveal him to himself.',
      'Practice yourself, for heaven\'s sake, in little things; and thence proceed to greater.',
      'Who is your master? Anyone who has control over things upon which you\'ve set your heart.',
      'The greater the difficulty, the more glory in surmounting it.',
      'Be not swept off your feet by the vividness of the impression, but say, "Impression, wait for me a little."',
      'God has entrusted me with myself.',
      'On the occasion of every accident that befalls you, remember to turn to yourself and inquire what power you have for turning it to use.',
      'No thing great is created suddenly, any more than a bunch of grapes or a fig.',
      'If you wish to be a writer, write.',
    ],
    commentaryStyle: 'Epictetus teaches that true freedom lies in mastering our judgments and responses.',
  },

  stoicLetters: {
    name: 'Letters to Lucilius (Seneca)',
    context: '124 moral letters written by Seneca to his friend Lucilius in his final years (~63-65 CE), blending practical advice with profound wisdom.',
    whyMatters: 'Seneca writes with rare honesty about the human condition, showing how philosophy heals the soul.',
    texts: [
      'It is not that we have a short time to live, but that we waste a great deal of it.',
      'We suffer more often in imagination than in reality.',
      'Luck is what happens when preparation meets opportunity.',
      'True happiness is to enjoy the present, without anxious dependence upon the future.',
      'Difficulties strengthen the mind, as labor does the body.',
      'As is a tale, so is life: not how long it is, but how good it is, is what matters.',
      'He who is brave is free.',
      'Begin at once to live, and count each separate day as a separate life.',
      'It is the power of the mind to be unconquerable.',
      'If a man knows not to which port he sails, no wind is favorable.',
      'We are more often frightened than hurt; and we suffer more often in imagination than in reality.',
      'Religion is to do good. The best way to worship the gods is to be like them.',
      'The whole future lies in uncertainty: live immediately.',
      'It is not the man who has too little who is poor, but the one who hankers after more.',
      'Until we have begun to go without them, we fail to realize how unnecessary many things are.',
      'There is no genius without a touch of madness.',
      'Associate with people who are likely to improve you.',
      'Hang on to your youthful enthusiasms—you will be able to use them better when you are older.',
      'Nothing, to my way of thinking, is a better proof of a well-ordered mind than a man\'s ability to stop just where he is and pass some time in his own company.',
      'The mind that is anxious about future events is miserable.',
      'Life is like a play: it is not the length, but the excellence of the acting that matters.',
      'No man was ever wise by chance.',
      'Withdraw into yourself, as far as you can. Associate with those who will make a better man of you.',
      'A gem cannot be polished without friction, nor a man perfected without trials.',
      'Sometimes even to live is an act of courage.',
      'He who has a why to live for can bear almost any how.',
      'What need is there to weep over parts of life? The whole of it calls for tears.',
      'Most powerful is he who has himself in his own power.',
      'While we are postponing, life speeds by.',
      'Enjoy present pleasures in such a way as not to injure future ones.',
      'You act like mortals in all that you fear, and like immortals in all that you desire.',
    ],
    commentaryStyle: 'Seneca writes with rare honesty about the human condition, showing how philosophy heals the soul.',
  },
};

/**
 * Get tradition text by index with cycling
 */
export function getTextByIndex(tradition: TraditionKey, index: number): string {
  const data = WISDOM_TRADITIONS[tradition];
  return data.texts[index % data.texts.length];
}

/**
 * Get a rotation of traditions for a given day
 * Returns 4-5 traditions to feature alongside the primary tradition
 */
export function getTraditionsForDay(dayNumber: number, primaryTradition: TraditionKey): TraditionKey[] {
  // All 24 traditions except the primary
  const allTraditions: TraditionKey[] = [
    'vijnana', 'tao', 'gita', 'upanishads', 'ashtavakra', 'yogaSutras', 'shivaSutras',
    'dhammapada', 'rumi', 'zenKoan', 'zhuangzi', 'rigVeda', 'cloudOfUnknowing',
    'prajnaparamita', 'suttaNipata', 'avadhutaGita', 'vivekachudamani', 'naradaBhakti',
    'yogaVasistha', 'conferenceOfBirds', 'darkNight', 'corpusHermeticum', 'kybalion', 'imitationOfChrist',
    'stoicMeditations', 'stoicDiscourses', 'stoicLetters'
  ];

  // Remove primary tradition
  const available = allTraditions.filter(t => t !== primaryTradition);

  // Create rotation patterns based on day
  // Use day number to offset which traditions are selected
  const offset = (dayNumber - 1) % available.length;

  // Select 4 companion traditions
  const selected: TraditionKey[] = [];
  for (let i = 0; i < 4; i++) {
    const idx = (offset + i * 5) % available.length; // Space them out
    if (!selected.includes(available[idx])) {
      selected.push(available[idx]);
    }
  }

  return selected;
}

/**
 * Tradition groupings for thematic alignment
 */
export const TRADITION_FAMILIES = {
  tantric: ['vijnana', 'shivaSutras'] as TraditionKey[],
  taoist: ['tao', 'zhuangzi'] as TraditionKey[],
  vedantic: ['upanishads', 'gita', 'ashtavakra', 'avadhutaGita', 'vivekachudamani', 'yogaVasistha'] as TraditionKey[],
  yogic: ['yogaSutras', 'naradaBhakti', 'rigVeda'] as TraditionKey[],
  buddhist: ['dhammapada', 'zenKoan', 'prajnaparamita', 'suttaNipata'] as TraditionKey[],
  sufi: ['rumi', 'conferenceOfBirds'] as TraditionKey[],
  christianMystic: ['cloudOfUnknowing', 'darkNight', 'imitationOfChrist'] as TraditionKey[],
  hermetic: ['corpusHermeticum', 'kybalion'] as TraditionKey[],
  stoic: ['stoicMeditations', 'stoicDiscourses', 'stoicLetters'] as TraditionKey[],
};

/**
 * Get traditions from different families for maximum variety
 */
export function getBalancedTraditions(dayNumber: number, primaryTradition: TraditionKey): TraditionKey[] {
  // Find which family the primary belongs to
  let primaryFamily: string | null = null;
  for (const [family, traditions] of Object.entries(TRADITION_FAMILIES)) {
    if (traditions.includes(primaryTradition)) {
      primaryFamily = family;
      break;
    }
  }

  // Select one tradition from each different family
  const families = Object.keys(TRADITION_FAMILIES).filter(f => f !== primaryFamily);
  const selected: TraditionKey[] = [];

  for (let i = 0; i < 4 && i < families.length; i++) {
    const familyIndex = (dayNumber + i) % families.length;
    const family = families[familyIndex] as keyof typeof TRADITION_FAMILIES;
    const familyTraditions = TRADITION_FAMILIES[family];
    const traditionIndex = (dayNumber + i) % familyTraditions.length;
    const tradition = familyTraditions[traditionIndex];
    if (!selected.includes(tradition) && tradition !== primaryTradition) {
      selected.push(tradition);
    }
  }

  return selected;
}

/**
 * Map TraditionKey to the source type used in TraditionRef
 */
export const TRADITION_SOURCE_MAP: Record<TraditionKey, string> = {
  vijnana: 'VIJNANA',
  tao: 'TAO',
  gita: 'GITA',
  upanishads: 'UPANISHAD',
  ashtavakra: 'ASHTAVAKRA',
  yogaSutras: 'YOGA_SUTRA',
  shivaSutras: 'SHIVA_SUTRA',
  dhammapada: 'DHAMMAPADA',
  rumi: 'RUMI',
  zenKoan: 'ZEN_KOAN',
  zhuangzi: 'ZHUANGZI',
  rigVeda: 'RIG_VEDA',
  cloudOfUnknowing: 'CLOUD_OF_UNKNOWING',
  prajnaparamita: 'PRAJNAPARAMITA',
  suttaNipata: 'SUTTA_NIPATA',
  avadhutaGita: 'AVADHUTA_GITA',
  vivekachudamani: 'VIVEKACHUDAMANI',
  naradaBhakti: 'NARADA_BHAKTI',
  yogaVasistha: 'YOGA_VASISTHA',
  conferenceOfBirds: 'CONFERENCE_OF_BIRDS',
  darkNight: 'DARK_NIGHT',
  corpusHermeticum: 'CORPUS_HERMETICUM',
  kybalion: 'KYBALION',
  imitationOfChrist: 'IMITATION_OF_CHRIST',
  stoicMeditations: 'STOIC_MEDITATIONS',
  stoicDiscourses: 'STOIC_DISCOURSES',
  stoicLetters: 'STOIC_LETTERS',
};

/**
 * Map TraditionKey to the ref, text, commentary, etc. field names used in DailyEntry
 */
export const TRADITION_FIELD_MAP: Record<TraditionKey, {
  ref: string;
  text: string;
  commentary: string;
  contextKey: string;
  whyMattersKey: string;
}> = {
  vijnana: { ref: 'vijnanaRef', text: 'vijnanaText', commentary: 'vijnanaCommentary', contextKey: 'vijnana', whyMattersKey: 'vijnana' },
  tao: { ref: 'taoRef', text: 'taoText', commentary: 'taoCommentary', contextKey: 'tao', whyMattersKey: 'tao' },
  gita: { ref: 'gitaRef', text: 'gitaText', commentary: 'gitaCommentary', contextKey: 'gita', whyMattersKey: 'gita' },
  upanishads: { ref: 'upanishadRef', text: 'upanishadText', commentary: 'upanishadCommentary', contextKey: 'upanishads', whyMattersKey: 'upanishads' },
  ashtavakra: { ref: 'ashtavakraRef', text: 'ashtavakraText', commentary: 'ashtavakraCommentary', contextKey: 'ashtavakra', whyMattersKey: 'ashtavakra' },
  yogaSutras: { ref: 'yogaSutraRef', text: 'yogaSutraText', commentary: 'yogaSutraCommentary', contextKey: 'yogaSutras', whyMattersKey: 'yogaSutras' },
  shivaSutras: { ref: 'shivaSutraRef', text: 'shivaSutraText', commentary: 'shivaSutraCommentary', contextKey: 'shivaSutras', whyMattersKey: 'shivaSutras' },
  dhammapada: { ref: 'dhammapadaRef', text: 'dhammapadaText', commentary: 'dhammapadaCommentary', contextKey: 'dhammapada', whyMattersKey: 'dhammapada' },
  rumi: { ref: 'rumiRef', text: 'rumiText', commentary: 'rumiCommentary', contextKey: 'rumi', whyMattersKey: 'rumi' },
  zenKoan: { ref: 'zenKoanRef', text: 'zenKoanText', commentary: 'zenKoanCommentary', contextKey: 'zenKoan', whyMattersKey: 'zenKoan' },
  zhuangzi: { ref: 'zhuangziRef', text: 'zhuangziText', commentary: 'zhuangziCommentary', contextKey: 'zhuangzi', whyMattersKey: 'zhuangzi' },
  rigVeda: { ref: 'rigVedaRef', text: 'rigVedaText', commentary: 'rigVedaCommentary', contextKey: 'rigVeda', whyMattersKey: 'rigVeda' },
  cloudOfUnknowing: { ref: 'cloudOfUnknowingRef', text: 'cloudOfUnknowingText', commentary: 'cloudOfUnknowingCommentary', contextKey: 'cloudOfUnknowing', whyMattersKey: 'cloudOfUnknowing' },
  prajnaparamita: { ref: 'prajnaparamitaRef', text: 'prajnaparamitaText', commentary: 'prajnaparamitaCommentary', contextKey: 'prajnaparamita', whyMattersKey: 'prajnaparamita' },
  suttaNipata: { ref: 'suttaNipataRef', text: 'suttaNipataText', commentary: 'suttaNipataCommentary', contextKey: 'suttaNipata', whyMattersKey: 'suttaNipata' },
  avadhutaGita: { ref: 'avadhutaGitaRef', text: 'avadhutaGitaText', commentary: 'avadhutaGitaCommentary', contextKey: 'avadhutaGita', whyMattersKey: 'avadhutaGita' },
  vivekachudamani: { ref: 'vivekachudamaniRef', text: 'vivekachudamaniText', commentary: 'vivekachudamaniCommentary', contextKey: 'vivekachudamani', whyMattersKey: 'vivekachudamani' },
  naradaBhakti: { ref: 'naradaBhaktiRef', text: 'naradaBhaktiText', commentary: 'naradaBhaktiCommentary', contextKey: 'naradaBhakti', whyMattersKey: 'naradaBhakti' },
  yogaVasistha: { ref: 'yogaVasisthaRef', text: 'yogaVasisthaText', commentary: 'yogaVasisthaCommentary', contextKey: 'yogaVasistha', whyMattersKey: 'yogaVasistha' },
  conferenceOfBirds: { ref: 'conferenceOfBirdsRef', text: 'conferenceOfBirdsText', commentary: 'conferenceOfBirdsCommentary', contextKey: 'conferenceOfBirds', whyMattersKey: 'conferenceOfBirds' },
  darkNight: { ref: 'darkNightRef', text: 'darkNightText', commentary: 'darkNightCommentary', contextKey: 'darkNight', whyMattersKey: 'darkNight' },
  corpusHermeticum: { ref: 'corpusHermeticumRef', text: 'corpusHermeticumText', commentary: 'corpusHermeticumCommentary', contextKey: 'corpusHermeticum', whyMattersKey: 'corpusHermeticum' },
  kybalion: { ref: 'kybalionRef', text: 'kybalionText', commentary: 'kybalionCommentary', contextKey: 'kybalion', whyMattersKey: 'kybalion' },
  imitationOfChrist: { ref: 'imitationOfChristRef', text: 'imitationOfChristText', commentary: 'imitationOfChristCommentary', contextKey: 'imitationOfChrist', whyMattersKey: 'imitationOfChrist' },
  stoicMeditations: { ref: 'stoicMeditationsRef', text: 'stoicMeditationsText', commentary: 'stoicMeditationsCommentary', contextKey: 'stoicMeditations', whyMattersKey: 'stoicMeditations' },
  stoicDiscourses: { ref: 'stoicDiscoursesRef', text: 'stoicDiscoursesText', commentary: 'stoicDiscoursesCommentary', contextKey: 'stoicDiscourses', whyMattersKey: 'stoicDiscourses' },
  stoicLetters: { ref: 'stoicLettersRef', text: 'stoicLettersText', commentary: 'stoicLettersCommentary', contextKey: 'stoicLetters', whyMattersKey: 'stoicLetters' },
};
