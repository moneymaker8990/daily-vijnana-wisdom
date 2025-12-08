/**
 * Stillness and Silence - A Thematic Journey
 * 
 * Cross-tradition exploration of inner quiet and the power of silence.
 * Drawing from Taoism, Tantra, Christian Mysticism, Zen, and Buddhism.
 */

import type { Course } from '../../types';

export const stillnessAndSilenceCourse: Course = {
  id: 'stillness-and-silence',
  title: 'Stillness and Silence',
  description: 'Discover the transformative power of silence. Journey through Taoist emptiness, Tantric presence, Christian contemplation, and Zen stillness to find the quiet center that all traditions point toward.',
  icon: '🌙',
  pathwayType: 'themed',
  difficulty: 1,
  estimatedWeeks: 3,
  lessons: [
    {
      id: 'sas-1',
      title: 'The Value of Emptiness',
      introduction: `Every tradition that speaks of the sacred eventually falls silent. Not because there is nothing to say, but because the deepest truth lies beyond words. In this journey, we explore the many faces of stillness—not as absence, but as the most profound presence.

The Tao Te Ching opens with a paradox: "The Tao that can be told is not the eternal Tao." Silence is not the failure of speech but its fulfillment. When we learn to value emptiness, we discover that the space within the cup is what makes it useful, the silence between notes is what makes music, and the stillness within is what makes us alive.

This course invites you not to learn about stillness, but to enter it.`,
      verses: [
        'tao-11',      // "It is the space within that makes it useful"
        'tao-4',       // "The Tao is like an empty vessel"
        'vbt-38',      // "Simply by looking into the blue sky, the serenity"
        'cloud-26',    // "When you feel you are doing nothing, closest to God"
      ],
      reflectionQuestions: [
        'What in your life is most valuable because of its emptiness or spaciousness?',
        'When have you experienced silence not as absence but as fullness?',
        'What would it mean to value emptiness as much as fullness?',
      ],
      practice: {
        title: 'Resting in Spaciousness',
        duration: '15 minutes',
        instructions: [
          'Find a quiet place and sit comfortably.',
          'Close your eyes and let your breathing settle naturally.',
          'Become aware of the space around you—the room, the air.',
          'Notice the space between sounds, between breaths.',
          'Let your attention rest in this spaciousness rather than on objects.',
          'When thoughts arise, notice the space they appear in.',
          'There is nothing to do. Simply rest in the vastness that is already here.',
          'Before ending, appreciate the value of this emptiness.',
        ],
      },
    },
    {
      id: 'sas-2',
      title: 'The Pause Between Breaths',
      introduction: `The Vijnana Bhairava Tantra, an ancient Tantric text, reveals 112 gateways into presence. Many of these center on the breath—particularly the sacred pause between inhalation and exhalation.

This pause is not ordinary time. It is a gap in the rhythm of life where eternity touches the finite. Shiva tells Shakti: "After breath comes in and just before turning up—the beneficence." In that still point, something can be recognized that is always present but usually overlooked.

The Taoists also honored this stillness. "Empty yourself of everything," says Lao Tzu. "Let the mind rest at peace." The breath is our constant companion, and in its natural pauses lies a doorway to the timeless.`,
      verses: [
        'vbt-2',       // "After breath comes in, just before turning up—the beneficence"
        'vbt-3',       // "Through both these turns, realize"
        'vbt-4',       // "Touch the energy-less, energy-filled center"
        'tao-16',      // "Empty yourself of everything. Let the mind rest at peace"
      ],
      reflectionQuestions: [
        'Have you ever noticed the natural pause between breaths?',
        'What happens to thoughts in the moment between exhale and inhale?',
        'Can you find stillness even while breathing continues?',
      ],
      practice: {
        title: 'Sacred Pause Meditation',
        duration: '15 minutes',
        instructions: [
          'Sit quietly with eyes closed.',
          'Breathe naturally—do not control the breath.',
          'Begin to notice the pause after each exhale.',
          'Let your attention rest in that pause—don\'t extend it, just notice it.',
          'Similarly, notice the brief pause after each inhale.',
          'These pauses are gateways. Rest your awareness there.',
          'If you find stillness in the pause, let it expand naturally.',
          'The breath continues, but you rest in the silence between.',
        ],
      },
    },
    {
      id: 'sas-3',
      title: 'Silence as the Language of God',
      introduction: `Rumi declared: "Silence is the language of God, all else is poor translation." The Cloud of Unknowing teaches that God "cannot be thought... by love He can be grasped and held, but by thought never."

Every mystical tradition discovers that the Divine is not found through more words, more concepts, more thinking—but through less. In the surrender of speech and thought, something else begins to speak. The Zen masters knew this too: when the Buddha held up a flower in silence, Mahakashyapa smiled. The entire teaching was transmitted without a word.

This is not the silence of emptiness, but the silence of fullness—so complete that no word could add to it.`,
      verses: [
        'rumi-10',     // "Silence is the language of God"
        'cloud-1',     // "He cannot be thought... by love He can be grasped"
        'mumon-6',     // Buddha holds up a flower; Mahakashyapa smiles
        'cloud-22',    // "This work requires a great quietness"
      ],
      reflectionQuestions: [
        'Have you ever experienced a communication that needed no words?',
        'What might it mean that God\'s language is silence?',
        'Is there a knowing that happens before or without thought?',
      ],
      practice: {
        title: 'Centering Word Practice',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness with eyes closed.',
          'Choose a single word—"Peace," "Love," "Yes," or simply "God."',
          'Hold this word gently, not as thought but as feeling.',
          'When thoughts arise, let them sink below into silence.',
          'Return to your word, but hold it more and more lightly.',
          'Eventually, even the word may dissolve into quiet.',
          'Rest in that silence—not trying to achieve, simply being.',
          'If the word returns, welcome it. If silence remains, rest there.',
        ],
      },
    },
    {
      id: 'sas-4',
      title: 'The Still Mind',
      introduction: `The Buddha compared the untamed mind to a fish out of water—thrashing, never at rest. But a mind settled in awareness becomes like a deep, clear lake: "Even as a deep lake is clear and calm, so the wise become tranquil."

Zen master Zuigan would call to himself each day: "Master! Are you awake?" This wasn't madness—it was the practice of presence. When we check in with ourselves, we often find the mind racing, planning, worrying. The practice is not to stop the mind by force, but to notice: there is something that observes the busy mind. That witness is already still.

The Tao Te Ching says: "The still is the master of unrest." Not by fighting restlessness, but by resting in the stillness that is already present beneath it.`,
      verses: [
        'dp-6-5',      // "Even as a deep lake is clear and calm"
        'dp-3-3',      // "It is good to tame the mind... a tamed mind brings happiness"
        'mumon-12',    // Zuigan: "Master! Are you awake?"
        'tao-26',      // "The still is the master of unrest"
      ],
      reflectionQuestions: [
        'What does your mind do when it has nothing to do?',
        'Can you find the stillness beneath mental activity?',
        'What is observing your thoughts right now?',
      ],
      practice: {
        title: 'Witness Meditation',
        duration: '15 minutes',
        instructions: [
          'Sit comfortably with eyes closed.',
          'Let thoughts come and go without engaging them.',
          'Simply watch the mind like watching clouds pass through the sky.',
          'Notice: you are aware of thinking. You are not the thoughts.',
          'Ask yourself gently: "Who is watching?"',
          'Don\'t seek an answer—just notice the watching itself.',
          'The witness is already still. Rest there.',
          'Thoughts may continue, but you rest in the stillness that observes.',
        ],
      },
    },
    {
      id: 'sas-5',
      title: 'Entering the Cloud',
      introduction: `The author of The Cloud of Unknowing describes a profound practice: between you and God, there is a "cloud of unknowing"—a darkness you cannot penetrate with thought. But below you, you must place a "cloud of forgetting"—letting go of all thoughts, all concerns, all knowing.

This practice requires courage. We are asked to enter darkness without the comfort of understanding. Yet in that darkness, something else guides us—love itself. "Strike that thick cloud of unknowing with the sharp dart of longing love."

The Vijnana Bhairava Tantra offers a similar teaching: "In rain during a dark night, enter that blackness as the form of forms." In the darkness where seeing fails, a deeper seeing awakens.`,
      verses: [
        'cloud-2',     // "Put a cloud of forgetting beneath you"
        'cloud-23',    // "A darkness, a cloud of unknowing"
        'cloud-19',    // "Strike that cloud with the sharp dart of longing love"
        'vbt-23',      // "In rain during a dark night, enter that blackness"
      ],
      reflectionQuestions: [
        'What would it mean to let go of all knowing?',
        'Are you willing to meet God in darkness rather than light?',
        'What might the "dart of longing love" be in your experience?',
      ],
      practice: {
        title: 'Cloud of Unknowing Practice',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness. Close your eyes.',
          'Let all thoughts of the past sink below into a cloud of forgetting.',
          'Let all concerns about the future sink there too.',
          'Above you, imagine a cloud of unknowing—you cannot see through it.',
          'Do not try to penetrate it with thought. Simply be present to it.',
          'Let a feeling of love or longing rise from your heart toward the Unknown.',
          'Rest in this posture: forgetting below, unknowing above, love between.',
          'If thoughts intrude, let them sink into the cloud of forgetting.',
        ],
      },
    },
    {
      id: 'sas-6',
      title: 'Already Still, Already Silent',
      introduction: `The deepest teaching about stillness is that you don't need to create it. Stillness is not an achievement but a recognition. The Tao Te Ching says: "The ten thousand things rise and fall while the Self watches their return." Activity happens within stillness, not instead of it.

Zen points to "this very mind" as already Buddha. The noise of thought arises in silence, plays in silence, and dissolves back into silence—like waves arising from and returning to the sea. The water never leaves the ocean.

Your practice is not to become still, but to notice the stillness you have never left. Even now, reading these words, there is a silent awareness in which reading happens. That awareness is not disturbed by words.`,
      verses: [
        'tao-16',      // "The ten thousand things rise and fall while the Self watches"
        'mumon-30',    // "This very mind is Buddha"
        'vbt-41',      // "Wherever your mind is wandering, at this very place, this"
        'rumi-29',     // "There is a voice that doesn't use words. Listen."
      ],
      reflectionQuestions: [
        'Can you find the stillness that is present even now?',
        'Does thought disturb awareness, or does awareness contain thought?',
        'What if you have never left silence, even for a moment?',
      ],
      practice: {
        title: 'Recognizing Natural Stillness',
        duration: '15 minutes',
        instructions: [
          'Sit quietly. Do not try to become still.',
          'Notice: awareness is already present.',
          'Sounds arise—in what do they arise? In stillness.',
          'Thoughts arise—in what do they arise? In the same stillness.',
          'You are not creating this stillness. It is already here.',
          'Rest in recognition rather than achievement.',
          'Let everything be as it is. Stillness contains it all.',
          'You are not becoming still. You are noticing you never left.',
        ],
      },
    },
  ],
};

