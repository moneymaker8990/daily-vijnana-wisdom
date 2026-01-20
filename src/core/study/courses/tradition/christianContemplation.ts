/**
 * Christian Contemplation - Tradition Deep Dive
 * 
 * Western mystical tradition through The Cloud of Unknowing,
 * Dark Night of the Soul, and The Imitation of Christ.
 */

import type { Course } from '@core/study/types';

export const christianContemplationCourse: Course = {
  id: 'christian-contemplation',
  title: 'Christian Contemplation',
  description: 'Enter the rich tradition of Christian mysticism. Through The Cloud of Unknowing, St. John\'s Dark Night, and The Imitation of Christ, discover contemplative prayer, the journey through darkness, and union with the Divine.',
  icon: '✝️',
  pathwayType: 'tradition',
  difficulty: 2,
  estimatedWeeks: 4,
  lessons: [
    {
      id: 'cc-1',
      title: 'The Interior Kingdom',
      introduction: `The Christian contemplative tradition begins with a simple truth: "The kingdom of God is within you." God is not found primarily in external rituals or doctrines but in the depths of the soul. As The Imitation of Christ teaches: "Turn with all your heart to the Lord and forsake this wretched world, and your soul will find rest."

This is not world-rejection but priority-setting. The contemplative learns to look inward first, to find the Divine dwelling place within. "Learn to despise external things and give yourself to the interior, and you will see the kingdom of God come within you."

The journey begins here: turning attention from the outer to the inner, from the many to the One.`,
      verses: [
        'ioc-2-1',     // "The kingdom of God is within you"
        'ioc-2-2',     // "Give yourself to the interior"
        'cloud-28',    // "A naked intent toward God in the depths of your being"
        'ioc-2-3',     // "One gathered together within can be at peace"
      ],
      reflectionQuestions: [
        'Where do you typically look for God—inside or outside?',
        'What would it mean to find the kingdom within?',
        'How can you give yourself more to the interior life?',
      ],
      practice: {
        title: 'Turning Inward',
        duration: '15 minutes',
        instructions: [
          'Sit quietly in a comfortable position.',
          'Close your eyes and let the world recede.',
          'Turn your attention gently inward.',
          'Notice: beneath thoughts and emotions, there is stillness.',
          'This is where God dwells—in the depths of your being.',
          'Don\'t strain to find anything. Simply be present.',
          'Rest in the inner sanctuary.',
          'The kingdom is here, now, within you.',
        ],
      },
    },
    {
      id: 'cc-2',
      title: 'Love Beyond Thought',
      introduction: `The Cloud of Unknowing offers a radical teaching: "For He can well be loved, but He cannot be thought. By love He can be grasped and held, but by thought never." The intellect, for all its power, cannot reach God. Only love can.

This is the heart of contemplative prayer: not thinking about God but loving God directly. "Leave all that you can think and choose to love that which you cannot think." The mind must be quieted so the heart can speak.

The anonymous author instructs: "Take a short word of one syllable—GOD or LOVE. Fasten this word to your heart." This simple practice—centering prayer—has guided contemplatives for centuries.`,
      verses: [
        'cloud-1',     // "By love He can be grasped, by thought never"
        'cloud-16',    // "Leave all that you can think, choose to love"
        'cloud-7',     // "Take a short word—GOD or LOVE"
        'cloud-10',    // "To the knowing power, God is incomprehensible; to love, comprehensible"
      ],
      reflectionQuestions: [
        'Can love know what thought cannot?',
        'What is the difference between thinking about God and loving God?',
        'What word would you choose for centering prayer?',
      ],
      practice: {
        title: 'Centering Prayer',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness. Close your eyes.',
          'Choose a sacred word: God, Jesus, Love, or Peace.',
          'Introduce the word gently, as a symbol of your consent to God.',
          'When thoughts arise, return to the sacred word.',
          'The word is not for concentration but for letting go.',
          'If the word fades into silence, let it go.',
          'Rest in the silence beyond words.',
          'When the time ends, remain in silence for a few moments.',
        ],
      },
    },
    {
      id: 'cc-3',
      title: 'The Two Clouds',
      introduction: `The Cloud of Unknowing describes two clouds: above you is the "cloud of unknowing"—between you and God. You cannot penetrate it with thought. But below you, you must place a "cloud of forgetting"—between you and all created things.

"Put a cloud of forgetting beneath you, between you and all the creatures that have ever been made." This doesn't mean rejecting creation but putting it aside during contemplation. All thoughts, even holy ones, must sink into the cloud of forgetting.

"Strike that thick cloud of unknowing with the sharp dart of longing love, and do not cease come what may." The only tool that penetrates the upper cloud is love—pure, longing, one-pointed love.`,
      verses: [
        'cloud-2',     // "Put a cloud of forgetting beneath you"
        'cloud-19',    // "Strike that cloud with the sharp dart of longing love"
        'cloud-23',    // "You find nothing but a darkness, a cloud of unknowing"
        'cloud-21',    // "All things except God should be put beneath the cloud of forgetting"
      ],
      reflectionQuestions: [
        'What thoughts are hardest to put in the cloud of forgetting?',
        'Can you love without needing to understand?',
        'What is the dart of longing love in your experience?',
      ],
      practice: {
        title: 'Cloud Practice',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness with eyes closed.',
          'Above you, imagine a cloud of unknowing—impenetrable to thought.',
          'Below you, place a cloud of forgetting.',
          'Let all thoughts, concerns, and attachments sink into it.',
          'Even thoughts about God—let them sink.',
          'Only love remains—a longing toward the Unknown.',
          'You need not understand. Only love.',
          'Rest in this posture: forgetting below, unknowing above, love between.',
        ],
      },
    },
    {
      id: 'cc-4',
      title: 'The Dark Night of the Senses',
      introduction: `St. John of the Cross describes the soul's purification through darkness. First comes the Night of the Senses: "God weans the soul from the breasts of consolation, puts it down from his arms, and teaches it to walk alone."

This is when spiritual practices that once brought joy become dry. Prayer feels empty. God seems absent. The soul is tempted to think it has failed or been abandoned.

But the Dark Night is not punishment—it is growth. "The cause of this dryness is that God transfers the goods and the strength of the senses to the spirit." What feels like loss is actually transformation.`,
      verses: [
        'dn-1-2',      // "God weans the soul from the breasts of consolation"
        'dn-1-3',      // "The soul finds no sweetness... in the things of God"
        'dn-1-5',      // "The cause is that God transfers goods to the spirit"
        'dn-1-6',      // "God leads into the dark night those he desires to purify"
      ],
      reflectionQuestions: [
        'Have you experienced spiritual dryness?',
        'Can you trust darkness as part of the journey?',
        'What might God be purifying in you?',
      ],
      practice: {
        title: 'Trusting the Darkness',
        duration: '15 minutes',
        instructions: [
          'Sit in stillness, in as dark a space as possible.',
          'Let go of any expectation of spiritual experience.',
          'If dryness or emptiness is present, welcome it.',
          'Say inwardly: "I trust this darkness. God is at work."',
          'Don\'t try to force feelings or insights.',
          'Simply be present to what is, even if it is nothing.',
          'The darkness is not God\'s absence but God\'s deeper presence.',
          'Rest in unknowing trust.',
        ],
      },
    },
    {
      id: 'cc-5',
      title: 'The Dark Night of the Spirit',
      introduction: `Deeper still is the Night of the Spirit. Here, the soul feels not just spiritual dryness but profound darkness: "The soul feels itself so impure that God seems to be against it." Everything the soul believed about itself is exposed and burned away.

Yet this fire is love: "This dark night of love does not annihilate the soul but transforms it. It destroys what is human and creates what is divine." The pain is the pain of becoming.

"The fire of divine love first purges the soul, heating and blackening it with its smoke. Then it illuminates and cleanses it. Finally it transforms it." What burns is not the true self but the false.`,
      verses: [
        'dn-2-2',      // "God's light reveals one's imperfections"
        'dn-2-4',      // "This dark night destroys what is human, creates what is divine"
        'dn-2-5',      // "The fire first purges, then illuminates, then transforms"
        'dn-poem-5',   // "Oh, night that joined Beloved with lover"
      ],
      reflectionQuestions: [
        'What in you needs to be burned away?',
        'Can you see how pain might be part of transformation?',
        'Is there a love that purifies as it burns?',
      ],
      practice: {
        title: 'Fire of Transformation',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness and bring to mind something in you that resists God.',
          'A pride, a fear, an attachment.',
          'Now imagine the fire of divine love touching it.',
          'The fire doesn\'t destroy you—it transforms.',
          'Let whatever is false be consumed.',
          'Say inwardly: "Burn away what is not You in me."',
          'Rest in the fire. It is love, not punishment.',
          'What remains when the burning is complete?',
        ],
      },
    },
    {
      id: 'cc-6',
      title: 'Humility and Self-Knowledge',
      introduction: `The Imitation of Christ emphasizes humility as the foundation of the spiritual life. "This is the highest and most profitable lesson: to know oneself truly and to despise oneself. To think nothing of oneself and always to think well of others—this is great wisdom and perfection."

This is not self-hatred but honest seeing. We see our limitations, our pretensions, our subtle selfishness—and through this seeing, we are freed from them. "If you wish to learn and appreciate something worthwhile, love to be unknown and considered as nothing."

The Cloud of Unknowing agrees: "Whenever you feel that you are in no way doing anything, you are closest to God." The ego's achievements mean nothing in contemplation. Only humble presence matters.`,
      verses: [
        'ioc-1-8',     // "The highest lesson: to know oneself and despise oneself"
        'ioc-1-7',     // "Love to be unknown and considered as nothing"
        'cloud-26',    // "When you feel you are doing nothing, closest to God"
        'ioc-1-9',     // "Never think yourself better than anyone else"
      ],
      reflectionQuestions: [
        'How does true self-knowledge lead to humility?',
        'Can you love being unknown?',
        'What happens when you stop trying to be something?',
      ],
      practice: {
        title: 'Embracing Humility',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and examine yourself honestly.',
          'See your limitations, your failures, your pretensions.',
          'Don\'t judge—simply see.',
          'Say inwardly: "I am nothing. God is everything."',
          'This is not self-hatred but freedom.',
          'When you stop trying to be something, you can simply be.',
          'Rest in humble openness before God.',
          'In this emptiness, God can work.',
        ],
      },
    },
    {
      id: 'cc-7',
      title: 'Divine Union',
      introduction: `The goal of Christian contemplation is union with God—not absorption, but participation. "In this union, the soul becomes God by participation. Though remaining distinct in its being, it becomes one with God in love."

The Dark Night ends in dawn: "Oh, night more lovely than the dawn! Oh, night that joined Beloved with lover, lover transformed in the Beloved!" The soul has passed through the fire and emerged transfigured.

"The soul now lives the life of God. Its understanding becomes divine understanding; its will, divine will." This is not the end of personhood but its fulfillment—the person fully alive because fully united with the Source of life.`,
      verses: [
        'dn-4-1',      // "The soul becomes God by participation"
        'dn-poem-5',   // "Night that joined Beloved with lover, lover transformed"
        'dn-4-2',      // "Its understanding becomes divine understanding"
        'dn-4-5',      // "The soul sees all things in God and God in all things"
      ],
      reflectionQuestions: [
        'What would union with God feel like?',
        'Can you remain yourself while being one with God?',
        'Is this union already present, waiting to be recognized?',
      ],
      practice: {
        title: 'Resting in Union',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness and close your eyes.',
          'Let go of all striving, all seeking.',
          'You are already in God. God is already in you.',
          'There is nothing to achieve—only to recognize.',
          'Rest in this recognition.',
          'Your will and God\'s will are one.',
          'Your life and God\'s life are one.',
          'Simply be—and in being, be with God.',
        ],
      },
    },
  ],
};



