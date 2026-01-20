/**
 * The Inner Teacher - Comparative Study
 * 
 * Guru, master, spiritual friend across traditions. Zen master-student,
 * Sufi sheikh, Christian director, Vedantic guru.
 */

import type { Course } from '@core/study/types';

export const innerTeacherCourse: Course = {
  id: 'inner-teacher',
  title: 'The Inner Teacher',
  description: 'Every tradition speaks of the teacher—outer guides who point to the inner guru. Explore the role of spiritual guidance across Zen, Sufism, Christianity, and Vedanta, and discover the teacher that dwells within.',
  icon: '👁️',
  pathwayType: 'comparative',
  difficulty: 2,
  estimatedWeeks: 3,
  lessons: [
    {
      id: 'it-1',
      title: 'The Need for Guidance',
      introduction: `The spiritual path is treacherous. The ego is clever at co-opting spirituality for its own purposes. Traditions across the world agree: we need guidance—teachers, masters, spiritual friends who have walked the path before us.

The Dhammapada counsels: "If you see an intelligent person who tells you where true treasures are to be found, who shows what is to be avoided, and administers reproofs, follow that wise one." The Narada Bhakti Sutra says: "The company of great souls is difficult to obtain; but it never fails to transform."

Yet every tradition also points beyond the outer teacher to the inner one. The guru is ultimately not a person but the Self.`,
      verses: [
        'dp-6-1',      // "If you see an intelligent person... follow that wise one"
        'nbs-35',      // "The company of great souls never fails to transform"
        'katha-2',     // "The Self is attained only by one whom the Self chooses"
        'cloud-3',     // "Lift up your heart to God with a humble impulse of love"
      ],
      traditionalContext: 'All traditions emphasize the importance of guidance while also pointing to inner wisdom. The outer teacher helps remove obstacles so the inner teacher can be heard.',
      reflectionQuestions: [
        'Who have been your spiritual teachers?',
        'What is the difference between following a teacher and becoming dependent?',
        'Can the inner teacher be heard without outer guidance?',
      ],
      practice: {
        title: 'Honoring Your Teachers',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and bring to mind your spiritual teachers.',
          'Include books, experiences, and people who have guided you.',
          'Feel gratitude for each one.',
          'Notice: what did each teach you?',
          'Now ask: "Who teaches me now?"',
          'Listen for the inner teacher.',
          'Rest in gratitude for all guidance, outer and inner.',
        ],
      },
    },
    {
      id: 'it-2',
      title: 'The Zen Master',
      introduction: `In Zen, the relationship between master and student is direct, fierce, and intimate. The master's role is not to give knowledge but to strip away delusion. "Bring me your mind and I will pacify it," says Bodhidharma. When the student cannot find the mind, the teaching is complete.

Zen stories are filled with slaps, shouts, and paradoxical answers—not cruelty but precision, cutting through conceptual thinking. "A monk asked Joshu, 'Does a dog have Buddha-nature?' Joshu answered: 'Mu.'" The answer is not information but a koan—a key to unlock the mind.

Master Zuigan would call to himself daily: "Master! Are you awake?" The outer master points to the inner one.`,
      verses: [
        'mumon-41',    // Bodhidharma: "Bring me your mind and I will pacify it"
        'mumon-1',     // Joshu's Mu
        'mumon-12',    // Zuigan: "Master! Are you awake?"
        'mumon-7',     // "Wash your bowl"
      ],
      traditionalContext: 'The Zen master transmits awakening "outside the scriptures"—through direct encounter, not through words. The relationship is characterized by spontaneity and immediacy.',
      reflectionQuestions: [
        'What would a Zen master do with your questions?',
        'Can awakening be transmitted, or only pointed to?',
        'Who is the master within you that answers when called?',
      ],
      practice: {
        title: 'Calling to Yourself',
        duration: '10 minutes',
        instructions: [
          'Sit in stillness with eyes closed.',
          'Call out inwardly: "Master!"',
          'Answer yourself: "Yes?"',
          '"Are you awake?" "Yes, I am."',
          '"Never be deceived!" "No, I won\'t."',
          'Repeat this dialogue several times.',
          'Who is calling? Who is answering?',
          'Rest in the presence that both calls and answers.',
        ],
      },
    },
    {
      id: 'it-3',
      title: 'The Sufi Sheikh',
      introduction: `In Sufism, the sheikh (or murshid) is the guide on the path of love. The relationship is deeply personal—the sheikh knows the student's heart and prescribes practices tailored to their needs. The sheikh is not worshipped as God but revered as the door to God.

"The company of great souls is difficult to obtain; but it never fails to transform." The Sufi says: "Between God and the saints there is no distinction." To love the sheikh is to love God; to serve the sheikh is to serve truth.

The Conference of the Birds shows the Hoopoe guiding the birds on their journey. He doesn't fly for them—he shows the way. "Tell us of the way," the birds cry. The Hoopoe answers with stories, challenges, and encouragement.`,
      verses: [
        'nbs-36',      // "Between God and the saints there is no distinction"
        'cob-2',       // The Hoopoe: "I know of a king. His name is Simorgh"
        'rumi-1',      // "Come, come, whoever you are"
        'cob-31',      // "The heart is the garden, love is the seed"
      ],
      traditionalContext: 'The Sufi sheikh transmits baraka (spiritual blessing) and guides the mureed (student) through the stages of the path. The relationship is one of love, trust, and surrender.',
      reflectionQuestions: [
        'Have you experienced a teacher who knew your heart?',
        'What is the difference between following and surrendering?',
        'Can love be taught, or only transmitted?',
      ],
      practice: {
        title: 'Heart Connection',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and bring to mind a spiritual guide.',
          'Feel their presence in your heart.',
          'If you have no outer guide, imagine one.',
          'Let love flow between you.',
          'Ask: "What do you want me to know?"',
          'Listen not with the mind but with the heart.',
          'The teacher speaks through love.',
          'Rest in this heart connection.',
        ],
      },
    },
    {
      id: 'it-4',
      title: 'The Christian Spiritual Director',
      introduction: `In Christian tradition, the spiritual director or confessor guides the soul through discernment. They don't give orders but help the person recognize God's movement within. "I will hear what the Lord God speaks within me," says The Imitation of Christ.

The Cloud of Unknowing was written by an anonymous guide for a young contemplative—personal, practical, tender. The mystic teacher points beyond themselves: "For He can well be loved, but He cannot be thought." The director's role is to help clear the obstacles so the soul can meet God directly.

This is the paradox of spiritual guidance: the teacher is necessary, yet the teacher's goal is to become unnecessary.`,
      verses: [
        'ioc-3-1',     // "Blessed is the soul that hears the Lord speaking within"
        'cloud-1',     // "By love He can be grasped"
        'ioc-3-4',     // "My words are spirit and life... to be heard in silence"
        'dn-3-1',      // "Contemplation is a secret, peaceful, loving infusion from God"
      ],
      traditionalContext: 'The Christian spiritual director helps discern God\'s will and navigate the interior life. The relationship combines psychological insight with theological wisdom.',
      reflectionQuestions: [
        'How do you discern God\'s guidance in your life?',
        'What is the relationship between human teachers and divine teaching?',
        'Can you hear "what the Lord speaks within"?',
      ],
      practice: {
        title: 'Listening for the Inner Voice',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness and quiet the mind.',
          'Say inwardly: "Speak, Lord, for your servant listens."',
          'Wait in silence. Don\'t force anything.',
          'Notice any subtle impressions, words, feelings.',
          'Don\'t rush to interpret—simply receive.',
          'The inner teacher speaks softly.',
          'Trust what arises from deep silence.',
          'Rest in receptive listening.',
        ],
      },
    },
    {
      id: 'it-5',
      title: 'The Vedantic Guru',
      introduction: `In Vedanta, the guru is literally "dispeller of darkness." The guru removes the ignorance that obscures our true nature. But the deepest teaching is that the guru is not ultimately a person—the guru is the Self, appearing as an external form to guide us home.

The Katha Upanishad says: "The Self is not attained through study, nor through intellect, nor through much learning. It is attained only by one whom the Self chooses." The guru is how the Self calls to itself.

The Ashtavakra Gita was spoken by a guru to King Janaka—but its teaching is that there is no guru and no student, no bondage and no liberation. "You are indeed ever free." The ultimate guru is your own Self.`,
      verses: [
        'katha-2',     // "The Self is attained by one whom the Self chooses"
        'ashtavakra-1-1', // Janaka's question to Ashtavakra
        'chandogya-2', // "Tat tvam asi—That thou art"
        'ashtavakra-1-6', // "You are indeed ever free"
      ],
      traditionalContext: 'In Advaita Vedanta, the guru points to what the student already is. The guru-student relationship is ultimately seen through as non-dual—there is only the Self.',
      reflectionQuestions: [
        'If the guru is ultimately the Self, what does that mean for outer teachers?',
        'Can you hear the Self calling to itself through teachers?',
        'What would it mean to recognize the guru within?',
      ],
      practice: {
        title: 'The Self as Guru',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and close your eyes.',
          'Ask: "Who is my true teacher?"',
          'Notice: you are aware of this question.',
          'The awareness that hears the question is the teacher.',
          'It has always been present, guiding from within.',
          'Every outer teacher was this inner presence appearing.',
          'Rest in the recognition: Guru and Self are one.',
        ],
      },
    },
    {
      id: 'it-6',
      title: 'The Teacher Within',
      introduction: `All traditions point beyond outer teachers to the inner guru—the Christ within, the Buddha-nature, the Atman, the still small voice. The outer teacher's highest role is to awaken the inner one.

The Cloud of Unknowing says: "Whenever you feel that you are in no way doing anything, you are closest to God." When the ego's seeking stops, the inner teacher is heard. Zen says: "This very mind is Buddha." The search ends when we recognize what was always here.

Rumi captures it: "What you seek is seeking you." The teacher you long for is the one longing. The question and the answer arise from the same source.`,
      verses: [
        'mumon-30',    // "This very mind is Buddha"
        'cloud-26',    // "When you feel you are doing nothing, closest to God"
        'rumi-11',     // "What you seek is seeking you"
        'kena-2',      // "It is the ear of the ear, the mind of the mind"
      ],
      traditionalContext: 'The inner teacher is known by many names—the indwelling Christ, Buddha-nature, Atman, the Tao. It is not something separate from us but our own deepest nature.',
      reflectionQuestions: [
        'How does the inner teacher speak to you?',
        'What prevents you from hearing inner guidance?',
        'Is the teacher within the same across all traditions?',
      ],
      practice: {
        title: 'Recognizing the Inner Guru',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness and release all seeking.',
          'You are not looking for the teacher. The teacher is looking.',
          'The awareness reading this is the teacher.',
          'It needs no improvement, no development.',
          'Let this awareness recognize itself.',
          'All guidance has come from here.',
          'All wisdom arises from this source.',
          'Rest as the teacher recognizing itself.',
        ],
      },
    },
  ],
};



