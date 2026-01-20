/**
 * The Way of the Tao - Tradition Deep Dive
 * 
 * Complete immersion in Taoist wisdom through the Tao Te Ching and Zhuangzi.
 * Covering wu-wei, naturalness, the uncarved block, and living in harmony.
 */

import type { Course } from '@core/study/types';

export const wayOfTaoCourse: Course = {
  id: 'way-of-tao',
  title: 'The Way of the Tao',
  description: 'Immerse yourself in the ancient wisdom of Taoism. Journey through the Tao Te Ching and Zhuangzi to discover wu-wei, the power of emptiness, and the art of living in harmony with the natural order.',
  icon: '☯️',
  pathwayType: 'tradition',
  difficulty: 2,
  estimatedWeeks: 4,
  lessons: [
    {
      id: 'wot-1',
      title: 'The Tao That Cannot Be Named',
      introduction: `The Tao Te Ching opens with a paradox: "The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name." From the first line, we are warned that ultimate truth escapes all language.

This is not evasion but precision. Whatever we can define, categorize, or conceptualize is not the deepest reality. The Tao is the source from which all things emerge and to which all things return—but it is not a thing itself.

Zhuangzi plays with this: "Words are not just wind. Words have something to say. But if what they have to say is not fixed, then do they really say something?" The teachings point beyond themselves. Use them as fingers pointing at the moon, but don't mistake the finger for the moon.`,
      verses: [
        'tao-1',       // "The Tao that can be told is not the eternal Tao"
        'tao-14',      // "Look and it cannot be seen... grasp and it cannot be held"
        'zz-2-1',      // "Words are not just wind"
        'tao-25',      // "Something mysteriously formed, born before heaven and earth"
      ],
      reflectionQuestions: [
        'Why might the deepest truth be beyond words?',
        'Have you ever known something you couldn\'t express?',
        'What happens when you try to define the indefinable?',
      ],
      practice: {
        title: 'Resting in Mystery',
        duration: '15 minutes',
        instructions: [
          'Sit quietly with eyes closed.',
          'Notice your tendency to name, categorize, define.',
          'Just for now, let go of all labels.',
          'Don\'t call anything by its name.',
          'Experience direct reality before concepts.',
          'Rest in not-knowing.',
          'The Tao is here, unnamed.',
          'Let silence speak what words cannot.',
        ],
      },
    },
    {
      id: 'wot-2',
      title: 'The Power of Emptiness',
      introduction: `Taoism teaches the value of emptiness—not as absence, but as potential. "Thirty spokes share one hub. It is the center hole that makes it useful. Shape clay into a vessel; it is the space within that makes it useful."

This teaching inverts our usual values. We prize what is full, solid, present. Taoism asks us to notice the space, the gap, the void. The room is useful because of its emptiness. The cup holds tea because of its hollowness.

Spiritually, this points to the value of inner emptiness—a mind not cluttered with fixed opinions, a heart not congested with stale emotions. "The Tao is like an empty vessel that may be used but never filled."`,
      verses: [
        'tao-11',      // "It is the space within that makes it useful"
        'tao-4',       // "The Tao is like an empty vessel"
        'zz-4-2',      // "Because of the hole, the whole room is full of light"
        'tao-22',      // "Empty and be full"
      ],
      reflectionQuestions: [
        'Where do you see the value of emptiness in daily life?',
        'What would it mean to empty your mind of fixed opinions?',
        'Can fullness and emptiness coexist?',
      ],
      practice: {
        title: 'Embracing Emptiness',
        duration: '15 minutes',
        instructions: [
          'Sit in stillness and close your eyes.',
          'Notice the space around you.',
          'Notice the space between sounds.',
          'Notice the space between thoughts.',
          'Let your mind become like the empty room—spacious.',
          'Don\'t fill the space with anything.',
          'Rest as the space itself.',
          'This emptiness is not nothing—it is infinite potential.',
        ],
      },
    },
    {
      id: 'wot-3',
      title: 'Wu-Wei: Non-Doing',
      introduction: `Wu-wei is the heart of Taoist practice. Often translated as "non-action" or "effortless action," it means acting in harmony with the natural flow rather than forcing against it.

"The Tao never acts, yet nothing is left undone." This is not laziness or passivity. It is action aligned with the Tao—like water flowing downhill, finding the path of least resistance while accomplishing its purpose effortlessly.

Zhuangzi illustrates through stories: Cook Ding's butchering, Woodworker Ch'ing's bell-stand. In each, mastery appears as spontaneous ease. The master doesn't force; they find where the way is already open.`,
      verses: [
        'tao-37',      // "The Tao never acts, yet nothing is left undone"
        'tao-48',      // "In pursuit of learning, every day something is added. In pursuit of Tao, every day something is dropped"
        'zz-3-4',      // "I go along with the natural makeup"
        'tao-29',      // "The universe is sacred. You cannot improve it"
      ],
      reflectionQuestions: [
        'Where are you forcing against the natural flow?',
        'What would it mean to drop rather than add?',
        'Can you accomplish more by trying less?',
      ],
      practice: {
        title: 'Finding the Flow',
        duration: 'Throughout the day',
        instructions: [
          'Set an intention to notice forcing.',
          'Several times today, pause and ask:',
          '"Am I flowing or pushing?"',
          'When you notice pushing, pause.',
          'Take a breath and ask: "What wants to happen here?"',
          'Let action emerge from listening, not from will.',
          'Notice: does less effort produce better results?',
        ],
      },
    },
    {
      id: 'wot-4',
      title: 'The Uncarved Block',
      introduction: `Pu, the uncarved block, represents original simplicity—the state before conditioning, categorizing, and complicating. "Return to the state of the uncarved block." This is not regression but rediscovery of an original wholeness.

We are born simple and whole. Life carves us into shapes—roles, identities, fixed patterns. Taoism invites a return to the natural, undivided self. Not to become primitive, but to shed unnecessary complexity.

"Give up sainthood, renounce wisdom, and it will be a hundred times better for everyone." This shocking advice points to the burden of artificial virtue. When we stop trying to be something special, our natural goodness emerges.`,
      verses: [
        'tao-28',      // "Return to being like an infant"
        'tao-19',      // "Give up sainthood, renounce wisdom"
        'zz-5-4',      // "When a man has true virtue, he is not conscious of it"
        'tao-10',      // "Can you become soft like an infant?"
      ],
      reflectionQuestions: [
        'What artificial complexity have you added to your life?',
        'What would your "uncarved" self look like?',
        'What roles or identities can you release?',
      ],
      practice: {
        title: 'Returning to Simplicity',
        duration: '20 minutes',
        instructions: [
          'Sit quietly and close your eyes.',
          'Notice all the roles you play: worker, parent, friend, seeker.',
          'For now, let them all go.',
          'You are not your roles.',
          'Feel what remains when all identities are released.',
          'This is the uncarved block—simple, whole, undivided.',
          'Rest here without needing to be anyone.',
          'Original nature is already present.',
        ],
      },
    },
    {
      id: 'wot-5',
      title: 'Water Wisdom',
      introduction: `"The highest good is like water. Water benefits all things and does not compete. It dwells in the lowly places that all disdain—and so is near to the Tao."

Water is the Taoist model for perfect action. It is soft yet overcomes the hard. It is yielding yet unstoppable. It takes the shape of its container but has no fixed shape itself.

The sage is like water: going where others don't want to go, giving without expecting return, adapting to circumstances without losing essential nature. "Yield and overcome. Bend and be straight."`,
      verses: [
        'tao-8',       // "The highest good is like water"
        'tao-78',      // "Nothing in the world is softer than water, yet nothing better overcomes the hard"
        'zz-2-7',      // "The sage is a mirror—he responds and does not store"
        'tao-76',      // "The stiff and unbending is the disciple of death"
      ],
      reflectionQuestions: [
        'How can you be more like water in difficult situations?',
        'Where do you resist going low or yielding?',
        'What would softness accomplish that hardness cannot?',
      ],
      practice: {
        title: 'Being Water',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and bring to mind a difficult situation.',
          'Notice your resistance—where are you hard and unbending?',
          'Now imagine you are water.',
          'Water doesn\'t fight obstacles; it flows around them.',
          'Water doesn\'t strain upward; it finds the lowest place.',
          'What would water do in your situation?',
          'Feel yourself becoming soft, yielding, adaptable.',
          'Softness is not weakness—it is the way of life.',
        ],
      },
    },
    {
      id: 'wot-6',
      title: 'The Butterfly Dream',
      introduction: `"Once upon a time, Chuang Tzu dreamed that he was a butterfly, fluttering happily about. He didn't know that he was Chuang Tzu. Suddenly he awoke and found that he was Chuang Tzu. But he didn't know if he was Chuang Tzu who had dreamed of being a butterfly, or a butterfly dreaming of being Chuang Tzu."

This famous passage dissolves fixed identity. Who is the dreamer? Who is the dream? The boundary between self and world, real and unreal, becomes fluid.

This isn't meant to confuse but to liberate. When we don't know with certainty who we are, we can stop defending a fixed self. Life becomes lighter, more playful, more free.`,
      verses: [
        'zz-2-3',      // The butterfly dream
        'zz-1-6',      // "Heaven and earth were born at the same time I was"
        'zz-2-5',      // "How do I know that loving life is not a delusion?"
        'tao-20',      // "Stop thinking and end your problems"
      ],
      reflectionQuestions: [
        'Have you ever woken and wondered which reality was real?',
        'What if you couldn\'t be certain who you are?',
        'How would life change if identity were fluid?',
      ],
      practice: {
        title: 'Dissolving Identity',
        duration: '15 minutes',
        instructions: [
          'Sit quietly with eyes closed.',
          'Ask: "Who am I?"',
          'Notice any answers that arise.',
          'For each answer, ask: "Is that who I really am?"',
          'Keep inquiring until no certain answer remains.',
          'Rest in not knowing who you are.',
          'This is not confusion—it is freedom from fixed identity.',
          'Perhaps you are the dreamer. Perhaps you are the dream.',
        ],
      },
    },
    {
      id: 'wot-7',
      title: 'The Sage Mind',
      introduction: `"The mind of the sage is still. It is the mirror of Heaven and earth, the glass of the ten thousand things." The sage doesn't impose but reflects. They don't accumulate but respond freshly to each moment.

"Do not be an embodier of fame; do not be a storehouse of schemes; do not be an undertaker of projects; do not be a proprietor of wisdom." The sage owns nothing, not even wisdom. Everything passes through without sticking.

This is the mind at rest in motion—active yet still, engaged yet detached. "The True Man breathes with his heels; the mass of men breathe with their throats."`,
      verses: [
        'zz-7-3',      // "The mind of the sage is still—mirror of Heaven and earth"
        'zz-7-1',      // "Do not be an embodier of fame..."
        'zz-5-3',      // "The True Man breathes with his heels"
        'tao-16',      // "Empty yourself of everything. Let the mind rest at peace"
      ],
      reflectionQuestions: [
        'What would it mean to be a mirror rather than a container?',
        'What are you storing that could be released?',
        'Can you breathe from your heels—deeply, from your whole being?',
      ],
      practice: {
        title: 'Mirror Mind',
        duration: '20 minutes',
        instructions: [
          'Sit quietly with eyes open, gaze soft.',
          'Imagine your mind is a perfectly still mirror.',
          'Whatever appears—sights, sounds, thoughts—let them be reflected.',
          'Don\'t grab onto anything. Don\'t push anything away.',
          'Simply reflect, like a mirror reflecting images.',
          'Notice: the mirror is not disturbed by what it reflects.',
          'Rest as this mirror-mind.',
          'Things arise, are reflected, and pass—you remain still.',
        ],
      },
    },
    {
      id: 'wot-8',
      title: 'Returning to the Source',
      introduction: `"The ten thousand things rise and fall while the Self watches their return. They grow and flourish and then return to the source. Returning to the source is stillness, which is the way of nature."

All things emerge from the Tao and return to the Tao. This ceaseless arising and dissolving is not tragedy but the natural rhythm. When we align with this rhythm, we find peace.

"Without going out, you may know the world. Without looking through the window, you may see the way of heaven." The journey is not outward but inward—not to acquire but to return to what was never lost.`,
      verses: [
        'tao-16',      // "The ten thousand things rise and fall while the Self watches"
        'tao-47',      // "Without going out, you may know the world"
        'zz-6-6',      // "Enter the realm where there is no life and no death"
        'tao-52',      // "Returning to the root is called stillness"
      ],
      reflectionQuestions: [
        'What does "returning to the source" mean to you?',
        'Can you watch things arise and pass without grasping?',
        'What would it mean to find everything within?',
      ],
      practice: {
        title: 'Watching the Return',
        duration: '20 minutes',
        instructions: [
          'Sit quietly with eyes closed.',
          'Notice thoughts arising and passing.',
          'Notice sensations arising and passing.',
          'Everything rises and returns.',
          'Watch this natural rhythm without interfering.',
          'You are the still awareness in which rising and returning happen.',
          'Rest in this stillness—the source from which all arises.',
          'You have never left the source. You are returning now.',
        ],
      },
    },
  ],
};



