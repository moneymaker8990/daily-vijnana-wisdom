/**
 * Action Without Attachment - A Thematic Journey
 * 
 * Karma yoga, wu-wei, and mindful action across traditions.
 * Drawing from Bhagavad Gita, Tao Te Ching, Zhuangzi, and Dhammapada.
 */

import type { Course } from '@core/study/types';

export const actionWithoutAttachmentCourse: Course = {
  id: 'action-without-attachment',
  title: 'Action Without Attachment',
  description: 'How can we act fully while remaining free? Explore karma yoga, wu-wei, and the art of doing without doing through the Bhagavad Gita, Taoist classics, and Buddhist wisdom.',
  icon: '🌊',
  pathwayType: 'themed',
  difficulty: 2,
  estimatedWeeks: 3,
  lessons: [
    {
      id: 'awa-1',
      title: 'The Paradox of Effortless Action',
      introduction: `Every tradition that speaks of liberation must answer a practical question: How do we act in the world? The answer across traditions is remarkably consistent: act, but without attachment to results. Act fully, but remain inwardly free.

The Tao Te Ching calls this wu-wei—often translated as "non-action" but better understood as "effortless action" or "action without forcing." The Bhagavad Gita calls it nishkama karma—action without desire for fruits. Zen speaks of "doing without doing."

This is not passivity. It is action aligned with a deeper wisdom, where the doer dissolves into the doing. As Zhuangzi describes Cook Ding butchering an ox: "Every touch of his hand, every heave of his shoulder... all was in perfect rhythm."`,
      verses: [
        'tao-2',       // "The sage works without working"
        'gita-2-47',   // "You have the right to action, never to its fruits"
        'zz-3-2',      // "Cook Ding... all was in perfect rhythm"
        'dp-4-3',      // "The bee collects nectar without harming the flower"
      ],
      reflectionQuestions: [
        'When have you experienced action that felt effortless?',
        'What happens when you act with attachment to a specific result?',
        'Can you distinguish between effort and force?',
      ],
      practice: {
        title: 'Observing Action',
        duration: 'Throughout the day',
        instructions: [
          'Choose a simple activity—walking, washing dishes, typing.',
          'Do the activity with full attention.',
          'Notice when you tense up or push for results.',
          'When you notice forcing, pause and relax.',
          'Let the action flow from a quieter place.',
          'Notice: what happens to the quality of action?',
          'At day\'s end, reflect: what did you learn about effort?',
        ],
      },
    },
    {
      id: 'awa-2',
      title: 'Acting Without Attachment to Fruits',
      introduction: `The Bhagavad Gita delivers one of the most famous teachings on action: "You have the right to action alone, never to its fruits. Let not the fruits of action be your motive, nor let your attachment be to inaction."

This is not indifference. Krishna doesn't say we shouldn't care. He says we shouldn't be bound by outcomes. We act because action is appropriate, not because we're guaranteed a specific result. When we attach our peace to outcomes, we're perpetually disturbed—because outcomes are never fully in our control.

Acting without attachment doesn't mean acting without skill or intention. It means releasing the grip of "this must turn out my way." The archer aims carefully, releases skillfully—and then the arrow is no longer their concern.`,
      verses: [
        'gita-2-47',   // "You have the right to action, never to its fruits"
        'gita-2-48',   // "Perform action established in yoga, abandoning attachment"
        'gita-3-19',   // "Without attachment, perform action"
        'tao-9',       // "Retire when the work is done—the way of heaven"
      ],
      reflectionQuestions: [
        'What outcomes are you most attached to right now?',
        'How does attachment to results affect your peace of mind?',
        'What would it mean to do your best and then release?',
      ],
      practice: {
        title: 'Releasing Outcomes',
        duration: '15 minutes + reflection',
        instructions: [
          'Sit quietly and bring to mind a current concern.',
          'Notice: what outcome are you attached to?',
          'Feel how this attachment creates tension.',
          'Now ask: "Have I done what I can?"',
          'If yes, practice releasing: "The outcome is not in my hands."',
          'If no, identify one action you can take.',
          'Then release: "I will act, and then let go."',
          'Rest in the peace of having done your part.',
        ],
      },
    },
    {
      id: 'awa-3',
      title: 'Wu-Wei: The Art of Not Forcing',
      introduction: `The Taoist concept of wu-wei is often misunderstood as doing nothing. But the Tao Te Ching says: "The Tao never acts, yet nothing is left undone." This is not inactivity but alignment—acting in harmony with the natural flow rather than against it.

Zhuangzi illustrates this with the story of Cook Ding: "I go along with the natural makeup, strike in the big hollows, guide the knife through the big openings, and follow things as they are." The master doesn't force; he finds where the way is open.

Water is the Taoist model: "The highest good is like water. Water benefits all things and does not compete." It flows around obstacles, finds the lowest place, achieves its purpose without struggle. Can we act like water?`,
      verses: [
        'tao-37',      // "The Tao never acts, yet nothing is left undone"
        'tao-8',       // "The highest good is like water"
        'zz-3-3',      // "I go along with the natural makeup"
        'tao-22',      // "Yield and overcome"
      ],
      reflectionQuestions: [
        'Where in your life are you forcing instead of flowing?',
        'What would it mean to act like water in a difficult situation?',
        'Can you identify the "big hollows" where effort is easier?',
      ],
      practice: {
        title: 'Water Practice',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and bring to mind a situation where you feel stuck.',
          'Notice how you\'ve been approaching it—with force? Resistance?',
          'Now imagine you are water encountering a rock.',
          'Water doesn\'t fight the rock. It flows around.',
          'Where is the path of least resistance in your situation?',
          'What would yielding look like here?',
          'You\'re not giving up—you\'re finding the natural way through.',
          'Rest in this softer approach.',
        ],
      },
    },
    {
      id: 'awa-4',
      title: 'Action as Offering',
      introduction: `The Bhagavad Gita offers another frame for unattached action: offer all actions to the Divine. "Whatever you do, whatever you eat, whatever you offer in sacrifice, whatever you give, whatever austerities you perform—do that as an offering to Me."

When action becomes offering, the ego steps back. We are no longer the one "doing"—we become instruments. This is not passivity but a profound shift in identity. The action still happens, often with more skill and less anxiety.

Zhuangzi describes the sage: "His movement is like that of water, his stillness like that of a mirror, his response like that of an echo." Like water, mirror, echo—the sage responds without inserting a personal agenda.`,
      verses: [
        'gita-9-27',   // "Whatever you do, offer it to Me"
        'zz-4-3',      // "His movement is like water, his stillness like a mirror"
        'gita-18-46',  // "By worshipping Him through one's own duty, one attains perfection"
        'tao-7',       // "The sage puts himself last and finds himself first"
      ],
      reflectionQuestions: [
        'What would it mean to offer your work as a gift?',
        'How would your actions change if you weren\'t the "doer"?',
        'Can you act with full commitment while being like an echo?',
      ],
      practice: {
        title: 'Offering Practice',
        duration: 'Before any significant action',
        instructions: [
          'Before beginning any task today, pause.',
          'Internally offer: "May this action serve something greater than my ego."',
          'You can offer to the Divine, to Life, to all beings.',
          'Then begin the action without further thought of offering.',
          'Just act—fully, skillfully, present.',
          'When complete, release: "It is done. I release the results."',
          'Notice how offering changes the quality of action.',
        ],
      },
    },
    {
      id: 'awa-5',
      title: 'The Sage Acts Without Acting',
      introduction: `What does it mean to "act without acting"? Not that nothing happens, but that the usual sense of "I am doing this" dissolves. The Tao Te Ching says: "The sage acts without ado." The True Person of Zhuangzi "does not know what it is to love life or to hate death."

This is not dissociation but integration. When we are fully present, fully aligned, there is action but no sense of a separate actor forcing events. The Buddha taught: "Actions exist, consequences exist, but the person who acts does not."

This is the highest teaching on action: not that we perfect our technique, but that the separate doer is seen through. What remains acts naturally, appropriately, without the distortion of ego.`,
      verses: [
        'tao-47',      // "Without going out, you may know the world"
        'zz-5-1',      // "The True Man did not know what it was to love life or hate death"
        'dp-7-5',      // "Calm is the action of one who is wholly freed"
        'mumon-7',     // "Wash your bowl" - presence in simple action
      ],
      reflectionQuestions: [
        'Have you ever acted and then wondered "who did that?"',
        'What is left when the sense of being the doer dissolves?',
        'Can right action arise without "you" deciding it?',
      ],
      practice: {
        title: 'Who Is Acting?',
        duration: '20 minutes',
        instructions: [
          'Sit quietly with eyes closed.',
          'Let your hand slowly rise.',
          'Ask: "Who is moving this hand?"',
          'Watch closely—can you find a separate doer?',
          'Let the hand lower.',
          'Where is the one who decided?',
          'Now, simply sit. Breathing happens.',
          'Who is breathing? Who is sitting? Who is asking?',
          'Rest in not-knowing who the doer is.',
        ],
      },
    },
    {
      id: 'awa-6',
      title: 'Living as Flow',
      introduction: `The culmination of action without attachment is not a technique but a way of being. The Bhagavad Gita describes one who has mastered this: "Having abandoned attachment to the fruits of actions, ever content, depending on nothing, such a one, though engaged in action, does not act at all."

This doesn't mean withdrawal from life. The sage engages fully—perhaps more fully than before, because there's no anxiety about outcomes draining energy. Zhuangzi says: "The True Man breathes with his heels; the mass of men breathe with their throats."

Life becomes flow. Actions arise naturally from the situation's needs, not from ego's demands. The response is appropriate, spontaneous, and then complete. Nothing lingers. This is freedom in action.`,
      verses: [
        'gita-4-20',   // "Abandoning attachment, ever content, depending on nothing"
        'zz-7-3',      // "The mind of the sage is still—the mirror of Heaven and earth"
        'tao-17',      // "The greatest leader... people barely know one exists"
        'zz-5-2',      // "He received something and took pleasure; he forgot and handed it back"
      ],
      reflectionQuestions: [
        'What would your life look like if action flowed without resistance?',
        'Can you be fully engaged and completely unattached at once?',
        'What is the simplest action you can offer right now?',
      ],
      practice: {
        title: 'Daily Flow',
        duration: 'Ongoing',
        instructions: [
          'Begin each morning with the intention: "Today I act without grasping."',
          'When challenges arise, ask: "What does this moment need?"',
          'Respond to the need, not to ego\'s fears or desires.',
          'When action is complete, let it go completely.',
          'Don\'t rehearse, don\'t review obsessively.',
          'Each moment is fresh. Each action is complete in itself.',
          'At day\'s end, let the whole day go.',
          'Sleep as one who has nothing to hold onto.',
        ],
      },
    },
  ],
};



