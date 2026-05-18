import type { Course, Lesson } from '@core/study/types';

function lesson(
  id: string,
  title: string,
  relatedTextSlugs: string[],
  introduction: string,
  practiceTitle: string
): Lesson {
  return {
    id,
    title,
    introduction,
    verses: [],
    relatedTextSlugs,
    reflectionQuestions: [
      `What does "${title}" ask you to notice directly rather than believe abstractly?`,
      'Which source text would you return to when this theme becomes difficult in daily life?',
      'How can this lesson become a small practice today rather than a concept you admire?',
    ],
    practice: {
      title: practiceTitle,
      duration: '12 minutes',
      instructions: [
        'Read the lesson introduction once without trying to master it.',
        'Choose one related text and name the theme it clarifies.',
        'Sit quietly and notice where the theme appears in present experience.',
        'Write one sentence of application for the next ordinary task you will do.',
      ],
    },
  };
}

export const whatIsAwarenessCourse: Course = {
  id: 'what-is-awareness',
  title: 'What Is Awareness?',
  description: 'A cross-tradition introduction to witness consciousness, Atman, mind-waves, and awareness without identity.',
  icon: '◎',
  pathwayType: 'themed',
  difficulty: 2,
  estimatedWeeks: 4,
  lessons: [
    lesson('the-witness-behind-experience', 'The Witness Behind Experience', ['upanishads-paramananda'], 'The Upanishads invite you to notice awareness as the light behind changing experience, not an object inside experience.', 'Witness sounds and thoughts'),
    lesson('the-field-and-the-knower', 'The Field and the Knower', ['bhagavad-gita-song-celestial'], 'The Gita frames practice as learning the difference between the field of experience and the knower of that field.', 'Name the field'),
    lesson('mind-waves-and-stillness', 'Mind-Waves and Stillness', ['yoga-sutras-johnston'], 'The Yoga Sutras give a practical vocabulary for how attention moves and how stillness becomes trainable.', 'Watch one mind-wave'),
    lesson('awareness-without-identity', 'Awareness Without Identity', ['ashtavakra-gita'], 'The Ashtavakra Gita points radically to awareness before personal identity, effort, or spiritual self-image.', 'Rest before identity'),
    lesson('recognition-in-kashmir-shaivism', 'Recognition in Kashmir Shaivism', ['shiva-sutras'], 'The Shiva Sutras place recognition at the heart of liberation: awareness recognizing itself through experience.', 'Recognize the recognizer'),
  ],
};

export const realityDreamAndMindCourse: Course = {
  id: 'reality-dream-and-mind',
  title: 'Reality, Dream, and Mind',
  description: 'A contemplative path through dreamlike reality, mind-created worlds, emptiness, and waking up inside experience.',
  icon: '☾',
  pathwayType: 'themed',
  difficulty: 3,
  estimatedWeeks: 4,
  lessons: [
    lesson('the-dreamlike-world', 'The Dreamlike World', ['yoga-vasistha'], 'Yoga Vasistha repeatedly asks whether waking life is as fixed as the mind assumes.', 'Question solidity'),
    lesson('the-mind-projects-reality', 'The Mind Projects Reality', ['yoga-vasistha'], 'This module studies how perception, memory, and desire shape the world you take to be given.', 'Notice projection'),
    lesson('form-is-not-fixed', 'Form Is Not Fixed', ['diamond-sutra'], 'The Diamond Sutra loosens the grip of fixed form, fixed self, and fixed attainment.', 'Release a label'),
    lesson('death-bardo-and-perception', 'Death, Bardo, and Perception', ['dhammapada'], 'Until Tibetan material is cleared, this module uses Buddhist impermanence teachings as the safe foundation for death-state reflection.', 'Contemplate change'),
    lesson('waking-up-inside-experience', 'Waking Up Inside Experience', ['yoga-vasistha', 'diamond-sutra'], 'Integration means waking up in the middle of ordinary appearances, not escaping them.', 'Wake inside one moment'),
  ],
};

export const thePathOfPracticeCourse: Course = {
  id: 'the-path-of-practice',
  title: 'The Path of Practice',
  description: 'Training attention, ethics, devotion, and daily action through Buddhist, Yogic, and Gita sources.',
  icon: '✦',
  pathwayType: 'themed',
  difficulty: 2,
  estimatedWeeks: 4,
  lessons: [
    lesson('discipline-and-mind', 'Discipline and Mind', ['dhammapada'], 'The Dhammapada begins with mind because practice begins with the quality of attention.', 'Guard the mind'),
    lesson('yoga-as-stilling-the-mind', 'Yoga as Stilling the Mind', ['yoga-sutras-johnston'], 'The Yoga Sutras describe practice and dispassion as the two hands of meditation training.', 'Return to stillness'),
    lesson('action-without-attachment', 'Action Without Attachment', ['bhagavad-gita-song-celestial'], 'The Gita teaches action that is sincere, disciplined, and less bound to outcome.', 'Offer one action'),
    lesson('devotion-as-surrender', 'Devotion as Surrender', ['bhagavad-gita-song-celestial'], 'Devotion becomes a practice of relaxing self-importance while acting with care.', 'Practice surrender'),
    lesson('daily-meditation-structure', 'Daily Meditation Structure', ['dhammapada', 'yoga-sutras-johnston'], 'A stable practice needs simple repeatable structure more than dramatic states.', 'Build a small container'),
  ],
};

export const goddessShaktiCourse: Course = {
  id: 'goddess-shakti-and-sacred-power',
  title: 'Goddess, Shakti, and Sacred Power',
  description: 'A safe guided-study path for Divine Feminine, Shakti, Kali, Spanda, and embodied nonduality.',
  icon: '△',
  pathwayType: 'tradition',
  difficulty: 3,
  estimatedWeeks: 4,
  lessons: [
    lesson('what-is-shakti', 'What Is Shakti?', ['shiva-sutras'], 'Shakti names the living power of awareness as movement, creativity, sensation, and transformation.', 'Feel aliveness'),
    lesson('devi-as-cosmic-mother', 'Devi as Cosmic Mother', ['devi-bhagavata-purana'], 'The Devi Bhagavata remains review-gated, so this module uses bibliography and original framing until cleared.', 'Honor protection'),
    lesson('kali-as-time-death-and-liberation', 'Kali as Time, Death, and Liberation', ['devi-bhagavata-purana'], 'Kali study is treated as original Mindvanta commentary unless a source text is cleared for use.', 'Meet change directly'),
    lesson('spanda-the-pulse-of-consciousness', 'Spanda: The Pulse of Consciousness', ['spanda-karika'], 'Spanda keeps nonduality alive by emphasizing the pulse and dynamism of consciousness.', 'Listen for pulse'),
    lesson('embodied-nonduality', 'Embodied Nonduality', ['vijnana-bhairava-tantra'], 'The senses can become gates to awareness when practice includes body, breath, feeling, and space.', 'Use the senses as gates'),
  ],
};

export const emptinessAndNonGraspingCourse: Course = {
  id: 'emptiness-and-non-grasping',
  title: 'Emptiness and Non-Grasping',
  description: 'A Mahayana and early Buddhist course on grasping, no fixed self, compassion, and integration.',
  icon: '◇',
  pathwayType: 'themed',
  difficulty: 3,
  estimatedWeeks: 4,
  lessons: [
    lesson('the-problem-of-grasping', 'The Problem of Grasping', ['dhammapada'], 'Grasping turns experience into struggle by insisting that changing things should stay fixed.', 'Find one grasp'),
    lesson('the-diamond-sutra-and-no-fixed-self', 'The Diamond Sutra and No Fixed Self', ['diamond-sutra'], 'The Diamond Sutra undermines the habit of building identity out of every perception.', 'Loosen selfing'),
    lesson('seeing-through-conceptual-reality', 'Seeing Through Conceptual Reality', ['diamond-sutra'], 'Concepts are useful until they become cages; this lesson practices seeing without clinging to the label.', 'Look before naming'),
    lesson('compassion-without-clinging', 'Compassion Without Clinging', ['diamond-sutra', 'dhammapada'], 'Compassion matures when care is not fused with possession, identity, or control.', 'Care lightly'),
    lesson('integration-practice', 'Integration Practice', ['diamond-sutra'], 'Integration means meeting ordinary tasks with less grasping and more clarity.', 'Release and act'),
  ],
};

export const kaliTimeSequenceCourse: Course = {
  id: 'kali-time-and-sequence-of-awareness',
  title: 'Kali, Time, and the Sequence of Awareness',
  description:
    'An advanced Krama sequence study path for Kramastotra, time, transition, dissolution, and the goddess as awareness in sequence.',
  icon: '◐',
  pathwayType: 'tradition',
  difficulty: 3,
  estimatedWeeks: 6,
  lessons: [
    lesson(
      'what-is-krama',
      'What is Krama?',
      ['kramastotra'],
      'Krama means sequence, but in this course it points to the living order by which awareness appears as moment, perception, and return.',
      'Notice the sequence'
    ),
    lesson(
      'kali-as-the-power-of-time',
      'Kali as the Power of Time',
      ['kramastotra'],
      'Kramastotra lets Kali be understood as the power through which moments arise, ripen, dissolve, and reveal awareness.',
      'Feel time from within'
    ),
    lesson(
      'the-sequence-of-perception',
      'The Sequence of Perception',
      ['kramastotra'],
      'Perception is not a flat event: it flashes, takes form, is measured, and returns to the field that knows it.',
      'Track one perception'
    ),
    lesson(
      'creation-and-dissolution-in-every-moment',
      'Creation and Dissolution in Every Moment',
      ['kramastotra'],
      'The hymn repeatedly points to srishti, sthiti, and laya as powers visible in every ordinary experience.',
      'Watch arising and return'
    ),
    lesson(
      'the-gap-between-thoughts',
      'The Gap Between Thoughts',
      ['kramastotra'],
      'The gap is not blank absence; it is the luminous continuity in which the sequence of thought is known.',
      'Rest in the interval'
    ),
    lesson(
      'recognizing-the-goddess-as-awareness',
      'Recognizing the Goddess as Awareness',
      ['kramastotra'],
      'The course culminates by reading goddess power as awareness moving, revealing, consuming, and recognizing itself.',
      'Recognize living power'
    ),
  ],
};

export const crookedGoddessCourse: Course = {
  id: 'crooked-goddess-body-power-nondual-shakti',
  title: 'The Crooked Goddess: Body, Power, and Nondual Shakti',
  description:
    'A review-gated selected study course for the crooked goddess, body as mandala, Kaula symbolism, and nondual Shakti.',
  icon: '⌁',
  pathwayType: 'tradition',
  difficulty: 3,
  estimatedWeeks: 5,
  lessons: [
    lesson(
      'meeting-kubjika',
      'Meeting Kubjika',
      ['kubjikamatatantra'],
      'Kubjika is introduced as hidden, contracted goddess power, held here as selected Mindvanta study rather than a full translation or ritual guide.',
      'Meet hidden power'
    ),
    lesson(
      'the-crooked-path',
      'The Crooked Path',
      ['kubjikamatatantra'],
      'Crookedness points to coiled and non-linear transformation: power folding inward, moving indirectly, and refusing spectacle or defect language.',
      'Follow one curve'
    ),
    lesson(
      'body-as-sacred-map',
      'Body as Sacred Map',
      ['kubjikamatatantra'],
      'The body is approached as a sacred field with ethical caution, contemplative restraint, and no claim to publish ritual procedures.',
      'Include the body'
    ),
    lesson(
      'kaula-family-of-power',
      'The Kaula Family of Power',
      ['kubjikamatatantra'],
      'Kula language invites study of embodied totality, sacred relation, and technical humility without flattening Kaula terms into slogans.',
      'Name the family'
    ),
    lesson(
      'power-without-sensationalism',
      'Power Without Sensationalism',
      ['kubjikamatatantra'],
      'Advanced goddess study becomes more trustworthy when it refuses theatrics, keeps review gates visible, and names what is not being taught.',
      'Practice restraint'
    ),
  ],
};

export const churningOfConsciousnessCourse: Course = {
  id: 'churning-of-consciousness',
  title: 'The Churning of Consciousness',
  description:
    'An advanced guided study map for Manthanabhairava Tantra, transformation, fierce awareness, and responsible Shakta Tantra study.',
  icon: '◍',
  pathwayType: 'tradition',
  difficulty: 3,
  estimatedWeeks: 5,
  lessons: [
    lesson(
      'what-is-churning',
      'What Is Churning?',
      ['manthanabhairava-tantra'],
      'Manthana frames transformation as churning: pressure, turning, devotion, and awareness meeting resistance without turning intensity into drama.',
      'Notice friction'
    ),
    lesson(
      'bhairava-and-bhairavi',
      'Bhairava and Bhairavi',
      ['manthanabhairava-tantra'],
      'Fierce awareness and its power are studied symbolically and ethically, with emphasis on orientation rather than sensational imagery.',
      'Hold intensity steadily'
    ),
    lesson(
      'hidden-power-and-initiation',
      'Hidden Power and Initiation',
      ['manthanabhairava-tantra'],
      'The guided map respects hiddenness, initiation boundaries, and living traditions by refusing to publish lineage-restricted procedure.',
      'Respect the hidden'
    ),
    lesson(
      'subtle-body-as-field',
      'Subtle Body as Sacred Field',
      ['manthanabhairava-tantra'],
      'Subtle-body language is framed as contemplative map and historical orientation, not as a do-it-yourself ritual technology.',
      'Sense the field'
    ),
    lesson(
      'responsible-advanced-study',
      'Responsible Advanced Study',
      ['manthanabhairava-tantra'],
      'Advanced Tantra belongs in Mindvanta only with honesty about scope, review, and what is not being claimed.',
      'Review the claim'
    ),
  ],
};
