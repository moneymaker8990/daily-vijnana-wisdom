/**
 * The Path of Love - A Thematic Journey
 * 
 * Divine love across Sufi, Bhakti, and Christian mysticism.
 * Drawing from Rumi, Narada Bhakti Sutra, Conference of the Birds, 
 * Imitation of Christ, and Cloud of Unknowing.
 */

import type { Course } from '@core/study/types';

export const pathOfLoveCourse: Course = {
  id: 'path-of-love',
  title: 'The Path of Love',
  description: 'The mystics of every tradition speak of a path where love alone leads to the Divine. Journey through Sufi poetry, Hindu devotion, and Christian contemplation to discover that love is not just a feeling—it is a way.',
  icon: '❤️',
  pathwayType: 'themed',
  difficulty: 1,
  estimatedWeeks: 3,
  lessons: [
    {
      id: 'pol-1',
      title: 'Love as the Path',
      introduction: `While some traditions emphasize knowledge, discrimination, or discipline, the path of love (bhakti, ishq, agape) teaches that the heart is the surest guide. Narada declares: "Bhakti is supreme love for God." Rumi sings: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray."

The Cloud of Unknowing puts it starkly: "For He can well be loved, but He cannot be thought. By love He can be grasped and held, but by thought never." Where intellect fails, love succeeds.

This is not romantic love, though it may use its language. It is a fundamental orientation of the soul toward the Divine, a longing that burns through all obstacles, a devotion that transforms the lover into the beloved.`,
      verses: [
        'nbs-2',       // "Bhakti is supreme love for God"
        'rumi-6',      // "Let yourself be silently drawn by what you really love"
        'cloud-1',     // "By love He can be grasped, by thought never"
        'nbs-4',       // "On attaining it, one becomes perfect, immortal, satisfied"
      ],
      reflectionQuestions: [
        'What have you loved so completely that it transformed you?',
        'Do you believe the heart can know what the mind cannot?',
        'What draws you most strongly toward the Divine?',
      ],
      practice: {
        title: 'Opening the Heart',
        duration: '15 minutes',
        instructions: [
          'Sit quietly with hands resting on your heart.',
          'Breathe gently and feel the physical heart beating.',
          'Allow a feeling of warmth or tenderness to arise.',
          'Think of something or someone you love deeply.',
          'Let that love expand to fill your chest.',
          'Now direct that love toward the Divine—however you understand it.',
          'You need not define it. Simply love it.',
          'Rest in this loving awareness.',
        ],
      },
    },
    {
      id: 'pol-2',
      title: 'The Longing of the Soul',
      introduction: `Before union comes longing. The Sufi tradition honors this longing (ishq) as itself sacred. Rumi writes: "The minute I heard my first love story, I started looking for you, not knowing how blind that was. Lovers don't finally meet somewhere. They're in each other all along."

The Conference of the Birds describes the birds' journey as driven by longing for the Simorgh: "How can the moth escape the flame? How can the lover flee the Beloved?" This longing is not suffering to be eliminated but a sacred fire that purifies and transforms.

In the Christian tradition, the Dark Night speaks of the soul "kindled in love with yearnings." The longing itself is the proof of connection. We would not long for what does not exist.`,
      verses: [
        'rumi-22',     // "Lovers don't finally meet somewhere. They're in each other all along."
        'cob-30',      // "How can the moth escape the flame?"
        'dn-poem-1',   // "Kindled in love with yearnings"
        'rumi-11',     // "What you seek is seeking you"
      ],
      reflectionQuestions: [
        'What is the deepest longing of your heart?',
        'Have you ever felt that what you seek is also seeking you?',
        'Can longing itself be a form of prayer?',
      ],
      practice: {
        title: 'Honoring the Longing',
        duration: '15 minutes',
        instructions: [
          'Sit in stillness and turn attention inward.',
          'Allow yourself to feel your deepest longing.',
          'Don\'t try to name it or satisfy it.',
          'Simply feel the pull, the yearning, the ache.',
          'This longing is sacred—it connects you to the Beloved.',
          'Let the longing expand until it fills you.',
          'Rest in the longing itself, without seeking to resolve it.',
          'The longing is the bridge. The longing is the love.',
        ],
      },
    },
    {
      id: 'pol-3',
      title: 'Love Beyond Desire',
      introduction: `The path of love is not desire for spiritual rewards. Narada is clear: "This love is not of the nature of desire, because it is a complete renunciation of all selfish desires." And: "God is displeased by one who craves for liberation. He is pleased only by love."

This is love for love's sake. The Cloud of Unknowing instructs: "Mean God himself, not any good or goods that you may get from Him." True devotion wants nothing but the Beloved. It doesn't bargain for enlightenment or peace.

This distinction separates mere religiosity from true mystical love. As Rumi says: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it."`,
      verses: [
        'nbs-7',       // "This love is a complete renunciation of all selfish desires"
        'nbs-27',      // "God is pleased only by love, not by craving liberation"
        'cloud-39',    // "Mean God himself, not any good you may get from Him"
        'rumi-8',      // "Seek and find all the barriers you have built against love"
      ],
      reflectionQuestions: [
        'What do you secretly want from your spiritual practice?',
        'Can you love without wanting anything in return?',
        'What barriers have you built against love?',
      ],
      practice: {
        title: 'Purifying Love',
        duration: '20 minutes',
        instructions: [
          'Sit quietly and close your eyes.',
          'Bring to mind your spiritual aspirations.',
          'Notice: what do you want from practice? Peace? Power? Escape?',
          'Now let go of all these desires.',
          'Simply love. Love without wanting.',
          'If God gave you nothing—no peace, no insight, no reward—',
          'would you still love?',
          'Rest in love that wants nothing but to love.',
        ],
      },
    },
    {
      id: 'pol-4',
      title: 'Devotion in Practice',
      introduction: `How is divine love cultivated? Through practice, through attention, through company. Narada teaches: "The principal means of attaining bhakti is the grace of great souls." And: "The company of great souls is difficult to obtain; but it never fails to transform."

The practices are simple but profound: repetition of the divine name, worship, service, remembrance. The Cloud of Unknowing offers centering prayer: "Take a short word of one syllable—GOD or LOVE. Fasten this word to your heart." The Sufi whirls, the Hindu chants, the Christian prays—all are methods of turning the heart toward the Beloved.

But ultimately, Narada says: "The nature of divine love is beyond description. It is like the experience of a mute who tastes something sweet." Practice prepares; grace fulfills.`,
      verses: [
        'nbs-35',      // "Company of great souls never fails to transform"
        'cloud-7',     // "Take a short word—GOD or LOVE"
        'nbs-45',      // "Like a mute who tastes something sweet"
        'nbs-49',      // "One sees only God, hears only God, thinks only of God"
      ],
      reflectionQuestions: [
        'What practices turn your heart toward love?',
        'Who are the "great souls" in your life?',
        'What would it mean to see, hear, and think only of God?',
      ],
      practice: {
        title: 'Sacred Word Practice',
        duration: '20 minutes',
        instructions: [
          'Choose a sacred word: God, Love, Peace, or a divine name.',
          'Sit quietly and begin to repeat it silently.',
          'Let the word become a gentle rhythm.',
          'When thoughts arise, return to the word.',
          'Let the word become softer, more subtle.',
          'Eventually it may fade into silence.',
          'Rest in that silence—the word has done its work.',
          'The Beloved is closer than the word.',
        ],
      },
    },
    {
      id: 'pol-5',
      title: 'Love Transforms the Lover',
      introduction: `True love transforms. The lover becomes like the Beloved. The Conference of the Birds describes the final stage: "In that moment, the birds were no more. Only the Simorgh remained." The Dark Night speaks of the soul "transformed in the Beloved."

This is not loss but completion. Narada describes: "Having attained this love, one sees only God, hears only God, speaks only of God, and thinks only of God." The separate self doesn't die—it is revealed to have always been an expression of the Divine.

Rumi captures this: "You are not a drop in the ocean. You are the entire ocean in a drop." Love reveals our true nature. The lover discovers they were never separate from the Beloved.`,
      verses: [
        'cob-28',      // "The birds were no more. Only the Simorgh remained"
        'dn-poem-5',   // "Night that joined Beloved with lover, lover transformed"
        'rumi-19',     // "You are the entire ocean in a drop"
        'dn-4-1',      // "The soul becomes God by participation"
      ],
      reflectionQuestions: [
        'Have you ever been so in love that you forgot yourself?',
        'What would it mean to be "transformed into the Beloved"?',
        'Is there any separation between the lover and the love?',
      ],
      practice: {
        title: 'Dissolving into Love',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness with eyes closed.',
          'Feel love arising in your heart.',
          'Let this love expand beyond your heart.',
          'Let it fill your whole body.',
          'Let it expand beyond your body.',
          'There is no longer a "you" loving something "other."',
          'There is only love, loving itself.',
          'Rest here. You and the Beloved are not two.',
        ],
      },
    },
    {
      id: 'pol-6',
      title: 'Living Love',
      introduction: `The culmination of the path of love is not withdrawal from the world but a new way of living in it. One who has been transformed by love sees the Beloved everywhere. Rumi says: "Let the beauty we love be what we do. There are hundreds of ways to kneel and kiss the ground."

Narada describes: "Such a one crosses over maya and helps others to cross." Love naturally overflows into compassion and service. It is not that the lover decides to serve—love itself serves through them.

The Imitation of Christ speaks of a love that "runs freely and joyfully, that is generous and open." This is the fruit: a life lived in love, for love, as love. The path of love ends in discovering that love is what we are.`,
      verses: [
        'rumi-20',     // "Let the beauty we love be what we do"
        'nbs-44',      // "Such a one helps others to cross"
        'rumi-21',     // "Love is the bridge between you and everything"
        'dp-1-5',      // "Hatred never ceases by hatred, by love alone"
      ],
      reflectionQuestions: [
        'How does love express itself through your life?',
        'Can you see the Beloved in ordinary activities?',
        'What would it mean to live as love itself?',
      ],
      practice: {
        title: 'Love in Action',
        duration: 'Throughout the day',
        instructions: [
          'Carry love with you today.',
          'In each interaction, remember: this is the Beloved.',
          'Let your actions be expressions of love.',
          'When you eat, eat with love.',
          'When you speak, speak from love.',
          'When you listen, listen with love.',
          'Notice how this changes your experience.',
          'By evening, reflect: what did love teach you today?',
        ],
      },
    },
  ],
};



