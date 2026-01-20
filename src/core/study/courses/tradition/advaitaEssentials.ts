/**
 * Advaita Essentials - Tradition Deep Dive
 * 
 * A comprehensive exploration of Advaita Vedanta (Non-dualism)
 * through its three great texts: Ashtavakra Gita, Vivekachudamani, and Yoga Vasistha
 */

import type { Course } from '@core/study/types';

export const advaitaEssentialsCourse: Course = {
  id: 'advaita-essentials',
  title: 'Advaita Essentials',
  description: 'Immerse yourself in the radical non-dual wisdom of Advaita Vedanta. Study the Ashtavakra Gita\'s direct pointing, Shankara\'s systematic discrimination, and the Yoga Vasistha\'s profound teachings on consciousness and liberation.',
  icon: '🕉️',
  pathwayType: 'tradition',
  difficulty: 3,
  estimatedWeeks: 4,
  lessons: [
    {
      id: 'ae-1',
      title: 'Introduction: The Path of Knowledge',
      introduction: `Advaita Vedanta, meaning "non-dual end of the Vedas," is one of humanity's most profound and uncompromising spiritual philosophies. It teaches that there is only one reality—Brahman, pure consciousness—and that your true Self (Atman) is not different from this ultimate reality.

The three texts we'll study represent different approaches to this teaching:

• **Ashtavakra Gita** - The most radical. No path, no practice, just direct recognition of your already-free nature.
• **Vivekachudamani** - Systematic discrimination (viveka) between the real and unreal, attributed to Shankara.
• **Yoga Vasistha** - Vast philosophical teachings through stories, addressing both understanding and practice.

In this course, we don't just learn about Advaita—we inquire into our own experience and test these teachings against what we actually find.`,
      verses: [
        'vc-3',          // "Highest is discrimination... higher still is realization"
        'ashtavakra-1-1', // Janaka's foundational question
        'yv-1-2',        // "The world exists because consciousness exists"
        'chandogya-2',   // "Tat tvam asi—That thou art"
      ],
      reflectionQuestions: [
        'What draws you to study non-dual teachings?',
        'What would change if you discovered you are already what you seek?',
        'How do intellectual understanding and direct experience differ?',
      ],
      practice: {
        title: 'Setting Intention',
        duration: '10 minutes',
        instructions: [
          'Sit quietly and close your eyes.',
          'Reflect on why you are drawn to these teachings.',
          'What do you hope to understand? What do you hope to experience?',
          'Let these questions rest in your heart without seeking immediate answers.',
          'Set an intention: "May these teachings reveal what I truly am."',
          'Sit in silence for a few minutes, resting in openness.',
        ],
      },
    },
    {
      id: 'ae-2',
      title: 'The Witness: You Are Not the Body',
      introduction: `The first discrimination in Advaita is recognizing that you are not the physical body. This isn't rejection of the body—it's precision. The body is born, ages, and dies. What you truly are has none of these characteristics.

The Ashtavakra Gita states with crystalline clarity: "You are neither earth, nor water, nor fire, nor air, nor space. To be liberated, know yourself as the witness of all these, as consciousness itself."

Vivekachudamani guides us through the five sheaths (koshas) that cover the Self like layers of an onion: the physical sheath, the vital energy sheath, the mental sheath, the intellectual sheath, and the bliss sheath. You are the awareness in which all these appear—not any of the sheaths themselves.`,
      verses: [
        'ashtavakra-1-3', // "You are neither earth, nor water, nor fire..."
        'vc-4',          // "Liberation is... destruction of 'I am body'"
        'vc-91',         // "The five sheaths... within these dwells the Self"
        'vc-120',        // "Neither gross body nor vital airs... Self is witness"
        'avd-1-29',      // "I am not the body, not the mind..."
      ],
      reflectionQuestions: [
        'What remains constant while the body constantly changes?',
        'When you say "my body," who is the "I" that possesses the body?',
        'Can you find the boundary between you and your body?',
      ],
      practice: {
        title: 'Neti Neti - Not This, Not This',
        duration: '15 minutes',
        instructions: [
          'Sit comfortably and close your eyes.',
          'Bring attention to physical sensations.',
          'Acknowledge: "This body is perceived. It is not what I am."',
          'Bring attention to breath and vital energy.',
          'Acknowledge: "This energy is perceived. It is not what I am."',
          'Continue with thoughts, emotions, even subtle bliss.',
          'With each layer: "Not this. I am the one who perceives."',
          'Rest in that which perceives but cannot itself be perceived as an object.',
        ],
      },
    },
    {
      id: 'ae-3',
      title: 'Beyond Mind and Intellect',
      introduction: `The subtler discrimination is seeing that you are not even the mind or intellect. These too are objects appearing in awareness. The mind thinks, plans, worries, imagines—but what is it that knows the mind is thinking?

The Yoga Vasistha is unequivocal: "The mind is nothing but a bundle of thoughts. When thoughts cease, the mind ceases. When the mind ceases, only pure consciousness remains."

Advaita doesn't ask you to destroy the mind—that would be like trying to kill a shadow. It asks you to recognize that the mind, like a shadow, has no independent existence. When seen clearly, it dissolves into its source: pure awareness.`,
      verses: [
        'yv-2-2',        // "Mind is nothing but a bundle of thoughts"
        'yv-2-3',        // "There is no mind in reality"
        'vc-74',         // "The inner organ is fourfold: mind, intellect..."
        'avd-1-22',      // "There is no mind in me, no body, no senses"
        'ashtavakra-8-1', // "Bondage is when the mind desires..."
      ],
      reflectionQuestions: [
        'Are you present before thought arises?',
        'If all thought stopped, would you cease to exist?',
        'What is the relationship between the thinker and the thought?',
      ],
      practice: {
        title: 'Mind as Mirage',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness. Let thoughts come freely.',
          'Watch thoughts arise and dissolve, like waves in the ocean.',
          'Notice: each thought appears in awareness and disappears from awareness.',
          'Ask: "What is this mind except thoughts appearing and vanishing?"',
          'Look for the mind as a thing. Can you find it?',
          'Notice the space between thoughts. Is the mind there?',
          'Rest as the awareness in which the mirage of mind appears.',
          'Recognize: awareness itself has no thought in it.',
        ],
      },
    },
    {
      id: 'ae-4',
      title: 'The Self as Pure Consciousness',
      introduction: `Having seen what you are not, what are you? Advaita points to pure consciousness—not consciousness "of" something, but consciousness itself. Self-luminous, needing nothing outside itself to be known.

Janaka's realization in the Ashtavakra Gita captures this: "Oh, I am spotless, peaceful, pure awareness, beyond nature. All this time I have been duped by illusion."

The Aitareya Upanishad declares: "Prajnana Brahma—Consciousness is Brahman." Not consciousness as a property of the brain, but consciousness as the fundamental reality, appearing as brain, body, world, and universe.`,
      verses: [
        'ashtavakra-2-1', // "Oh, I am spotless, peaceful, pure awareness"
        'ashtavakra-2-9', // "I am pure light. The world arose from me."
        'aitareya-3',     // "Prajnana Brahma—Consciousness is Brahman"
        'avd-1-16',       // "I am the Self that is within all"
        'yv-5-1',        // "In a mirror a city is reflected..."
      ],
      reflectionQuestions: [
        'Is awareness something you have, or something you are?',
        'When you say "I am aware," what is the "I" that is speaking?',
        'Could you ever experience the absence of awareness?',
      ],
      practice: {
        title: 'Self-Luminous Awareness',
        duration: '20 minutes',
        instructions: [
          'Sit quietly. Close your eyes.',
          'Notice you are aware. Simply aware.',
          'This awareness doesn\'t depend on any particular content.',
          'Objects come and go; awareness remains.',
          'Notice: awareness is self-knowing. It doesn\'t need light from elsewhere.',
          'As the sun illuminates but isn\'t illuminated by anything else, so awareness.',
          'Rest as this self-luminous awareness.',
          'Recognize: this is what the sages call Brahman, Atman, the Self.',
        ],
      },
    },
    {
      id: 'ae-5',
      title: 'The World as Appearance',
      introduction: `If consciousness alone is real, what is the world? Advaita offers a subtle teaching: the world is not non-existent, but it doesn't exist the way we think it does. It is an appearance in consciousness, like a dream is an appearance in the dreaming mind.

The Yoga Vasistha uses many metaphors: "Just as the dream-world appears to exist due to the dreamer's mind, so does this waking-world appear due to the cosmic mind. Both are equally real or unreal."

This isn't nihilism. It's precision. The world isn't nothing—it's consciousness appearing as multiplicity. The wave isn't separate from the ocean. The ornament isn't separate from the gold.`,
      verses: [
        'yv-1-4',        // "Just as the dream-world appears..."
        'ashtavakra-2-4', // "Waves, foam, bubbles are not different from water"
        'yv-5-4',        // "A rope is mistaken for a snake..."
        'avd-1-3',       // "The world exists like a mirage within me"
        'ashtavakra-2-10', // "The world exists in me like a mirage in a desert"
      ],
      reflectionQuestions: [
        'In a dream, where does the dream world exist?',
        'Can you find where "consciousness" ends and "world" begins?',
        'Does seeing the world as appearance change your relationship to it?',
      ],
      practice: {
        title: 'World as Dream',
        duration: '15 minutes',
        instructions: [
          'Open your eyes and look around.',
          'Notice: everything you see appears in awareness.',
          'Sound, sensation, visual forms—all arising in the same awareness.',
          'Consider: in a dream, all this would also appear in awareness.',
          'Ask: what is the fundamental difference between dream and waking?',
          'Don\'t try to make the world unreal. Simply notice: it appears.',
          'Rest in the recognition: all appearances arise in one awareness.',
          'This awareness is what you are. The appearances are its play.',
        ],
      },
    },
    {
      id: 'ae-6',
      title: 'Beyond Bondage and Liberation',
      introduction: `The deepest teaching of Advaita is the most shocking: there is no bondage, so there is no liberation. The Avadhuta Gita declares: "There is no birth, no death, no bound soul, no seeker, no one seeking liberation, no liberated one. This is the ultimate truth."

How can this be? Because bondage was always an illusion—a case of mistaken identity. You took yourself to be the body-mind, and from that false identification, all suffering arose. See through this error, and you don't become free—you recognize you were never bound.

The Ashtavakra Gita says: "For me there is neither bondage nor liberation. The illusion has lost its support and has ceased."`,
      verses: [
        'avd-1-9',       // "No birth, no death, no bound one, no seeker..."
        'ashtavakra-2-19', // "For me there is neither bondage nor liberation"
        'ashtavakra-1-6', // "You are indeed ever free"
        'yv-4-5',        // "Where is liberation for one who has never been bound?"
        'avd-1-30',      // "Liberation is not the result of any practice"
      ],
      reflectionQuestions: [
        'If bondage is an illusion, who is it that feels bound?',
        'What remains when the sense of being a seeker falls away?',
        'Can something real ever be bound or liberated?',
      ],
      practice: {
        title: 'Already Free',
        duration: '15 minutes',
        instructions: [
          'Sit quietly. Let everything be as it is.',
          'Ask: "Who is it that seeks liberation?"',
          'Look for the one who is bound. Can you find them?',
          'Notice: the awareness that is looking is already free.',
          'It was never in bondage—only the imagined self was.',
          'Let the sense of seeking something dissolve.',
          'You are not becoming free. The illusion is becoming transparent.',
          'Rest in this: you have always been what you are now.',
        ],
      },
    },
    {
      id: 'ae-7',
      title: 'Living Advaita',
      introduction: `Understanding Advaita intellectually is a beginning, not an end. The Yoga Vasistha emphasizes self-effort: "There is no power greater than right action. There is no greater friend than self-effort."

But this isn't effort to become something—it's the effort to see clearly, to inquire persistently, to live from recognition rather than assumption. The liberated one described in these texts isn't withdrawn from life. They act, but without the sense of being a separate doer.

The Yoga Vasistha says: "The liberated one lives in the world but is not of the world. Though acting, one does not act. Though enjoying, one does not enjoy." This is the natural state—not something achieved, but something recognized.`,
      verses: [
        'yv-3-1',        // "There is no power greater than right action"
        'yv-3-2',        // "Present self-effort is more powerful than past"
        'yv-4-3',        // "The liberated one lives in the world but is not of the world"
        'ashtavakra-4-1', // "The sage... like a child, playing with whatever comes"
        'avd-2-3',       // "The Avadhuta... wanders about in the world"
      ],
      reflectionQuestions: [
        'How would you live if you truly knew yourself as awareness?',
        'What changes when action arises from wholeness rather than lack?',
        'Can you act fully while holding everything lightly?',
      ],
      practice: {
        title: 'Witness in Action',
        duration: 'Throughout the day',
        instructions: [
          'Choose one activity today—walking, eating, or working.',
          'As you do this activity, notice: awareness is present.',
          'The body moves; awareness watches.',
          'Thoughts arise about the activity; awareness watches.',
          'Don\'t try to be "spiritual." Just notice what\'s already happening.',
          'See if action can happen with less sense of a separate doer.',
          'At the end, reflect: who was acting? Who was watching?',
          'Can you find two? Or is there only one awareness appearing as both?',
        ],
      },
    },
    {
      id: 'ae-8',
      title: 'The Essence: Nothing to Attain',
      introduction: `We end where we began—and where we never left. The Ashtavakra Gita tells us: "You do not belong to any caste or stage of life. You are unattached and formless, the witness of all. Be happy."

All the teachings, all the practices, all the discriminations—they point to one thing: recognize what you already are. Not what you might become with enough practice, but what you have always been.

The Avadhuta Gita sings: "I am the Self—pure, free, ever-existing consciousness." Not "I will become" but "I am." This is the final word of Advaita: rest in what you are.`,
      verses: [
        'ashtavakra-1-5', // "You are unattached and formless, the witness of all"
        'avd-1-5',       // "I am the Atman, by nature free!"
        'ashtavakra-5-4', // "You are complete, even now"
        'yv-6-5',        // "O Rama, be free from all mental modifications"
        'vc-8',          // "Self shines forth in its own nature, just as sun when clouds disperse"
      ],
      reflectionQuestions: [
        'What falls away when you stop seeking?',
        'How does knowing "I am already free" change your life?',
        'What is left to do when there is nothing to attain?',
      ],
      practice: {
        title: 'Resting in Being',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness. This is not meditation—it\'s recognition.',
          'Let go of all technique. Let go of achieving anything.',
          'You are already aware. You are already present.',
          'Don\'t try to be the witness. You already are.',
          'Don\'t try to stop thoughts. They don\'t touch awareness.',
          'Just rest. Be what you have always been.',
          'If the sense of "doing meditation" arises, notice: who is meditating?',
          'The one who asks this question is already the answer.',
        ],
      },
    },
  ],
};

