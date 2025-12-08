/**
 * The Nature of Self - A Thematic Journey
 * 
 * Cross-tradition exploration of the fundamental question "Who am I?"
 * Drawing from Upanishads, Ashtavakra Gita, Zen, and Christian Mysticism
 */

import type { Course } from '../../types';

export const natureOfSelfCourse: Course = {
  id: 'nature-of-self',
  title: 'The Nature of Self',
  description: 'Who am I? Explore this fundamental question through the lenses of Vedanta, Zen, and Christian mysticism. Discover what sages across traditions have realized about your true nature.',
  icon: '🪞',
  pathwayType: 'themed',
  difficulty: 2,
  estimatedWeeks: 3,
  lessons: [
    {
      id: 'nos-1',
      title: 'The Question That Matters',
      introduction: `Before seeking any answer, we must first feel the question. "Who am I?" is not an intellectual puzzle—it's the most intimate inquiry possible. Every tradition we'll explore begins here: not with beliefs or doctrines, but with this burning question about our own nature.

The Upanishadic sages called this inquiry "Atma-vichara"—self-inquiry. Ramana Maharshi made it his sole teaching. Zen masters point to it with koans like "What is your original face?" Even Christian mystics like the author of The Cloud of Unknowing knew that we cannot truly know God until we know what we are.

In this lesson, we don't seek answers. We learn to hold the question itself.`,
      verses: [
        'kena-1',      // "By whom commanded does the mind go toward its objects?"
        'mumon-23',    // "What is your original face before your parents were born?"
        'ashtavakra-1-1', // Janaka's question: "How is knowledge acquired?"
        'vc-3',        // "Higher still is discrimination between Self and not-Self"
      ],
      reflectionQuestions: [
        'When you ask "Who am I?" where does the question come from?',
        'What is the difference between thinking about who you are and directly inquiring into your nature?',
        'Can the one who is asking the question ever become the answer?',
      ],
      practice: {
        title: 'Self-Inquiry Meditation',
        duration: '15 minutes',
        instructions: [
          'Sit comfortably with eyes closed.',
          'Let the mind settle naturally for a few breaths.',
          'Ask inwardly: "Who am I?" or "To whom do these thoughts arise?"',
          'Do not seek an intellectual answer. Feel where the question points.',
          'When thoughts arise, ask: "To whom does this thought appear?"',
          'Rest in the silence that follows the question.',
          'Repeat gently, without forcing—simply inquire and listen.',
        ],
      },
    },
    {
      id: 'nos-2',
      title: 'You Are Not the Body',
      introduction: `Every spiritual tradition makes a fundamental distinction: you are not the physical body. This isn't a rejection of the body—it's a recognition that what you truly are witnesses the body, uses the body, but cannot be limited to it.

The Upanishads teach that the Self is "neither earth, nor water, nor fire, nor air, nor space." The Ashtavakra Gita declares that you are "unattached and formless, the witness of all." Zen asks us to find our "original face"—what we were before we had this body.

This understanding is not intellectual but experiential. We're not trying to dissociate from the body, but to recognize what remains constant while the body constantly changes.`,
      verses: [
        'ashtavakra-1-3', // "You are neither earth, nor water..."
        'ashtavakra-1-4', // "If only you will remain resting in consciousness..."
        'katha-7',        // "The Self is never born, nor does it ever die"
        'vc-4',           // "Liberation is not achieved... but only by destruction of 'I am body'"
        'vc-120',         // "Neither gross body nor vital airs... Self is witness of all"
      ],
      reflectionQuestions: [
        'The body you had as a child is completely different from your current body. What has remained the same?',
        'Can you locate the boundary between "you" and "your body"?',
        'If you lost a limb, would you be less "you"?',
      ],
      practice: {
        title: 'Body Witnessing Practice',
        duration: '20 minutes',
        instructions: [
          'Sit or lie comfortably. Close your eyes.',
          'Bring attention to physical sensations—warmth, pressure, tingling.',
          'Notice: you are aware of these sensations. What is this awareness?',
          'Scan through the body slowly, noticing: "I am aware of this."',
          'Now notice: the sensations change, but awareness remains constant.',
          'Ask: "Am I the sensations, or am I that which knows them?"',
          'Rest as the witnessing awareness, allowing the body to simply be there.',
          'Notice how thoughts about the body come and go, but you remain.',
        ],
      },
    },
    {
      id: 'nos-3',
      title: 'The Witness Beyond Mind',
      introduction: `If you are not the body, perhaps you are the mind? But look closely: thoughts come and go. Emotions rise and fall. Memories appear and disappear. What is it that knows all of this?

The Kena Upanishad points to this beautifully: "It is the mind of the mind"—that which thinks through the mind but is not itself a thought. The Ashtavakra Gita says, "Virtue and vice, pleasure and pain, are attributes of the mind, not of you."

Zen expresses this through Zuigan's practice of calling to himself: "Master! Are you awake?" This isn't madness—it's the recognition that there is something deeper than the thinking mind, something that can witness the mind's activities.`,
      verses: [
        'kena-2',         // "It is the ear of the ear, the mind of the mind"
        'ashtavakra-1-6', // "Virtue and vice... are attributes of mind, not of you"
        'mumon-12',       // Zuigan calling to himself: "Master! Are you awake?"
        'mumon-26',       // "It is your mind that moves" (flag/wind koan)
        'vc-121',         // "Self is witness of three states—waking, dreaming, deep sleep"
      ],
      reflectionQuestions: [
        'When you observe a thought, what is observing it?',
        'Has there ever been a moment without awareness, or only moments you weren\'t aware of?',
        'What is the difference between the mind being quiet and you being absent?',
      ],
      practice: {
        title: 'Thought Witnessing Meditation',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and close your eyes.',
          'Let thoughts come freely—don\'t try to stop them.',
          'Simply notice each thought as it arises.',
          'Label it gently: "thinking" or "memory" or "planning."',
          'Notice: you are aware of thinking. You are not the thought.',
          'Watch thoughts appear out of nowhere and dissolve into nowhere.',
          'Rest in the gap between thoughts. What remains?',
          'Ask: "What is aware of the absence of thought?"',
        ],
      },
    },
    {
      id: 'nos-4',
      title: 'The Light of Awareness',
      introduction: `Having recognized that you are neither body nor mind, what are you? Every tradition points to the same reality: pure awareness, consciousness itself, the light by which everything is known.

Janaka, in the Ashtavakra Gita, awakens to this: "As I alone give light to this body, so I give light to the world." The Mandukya Upanishad describes "Turiya"—the Fourth state beyond waking, dreaming, and sleep—as pure consciousness without content.

This is not something new you become. It is what you have always been. Like the sun that lights the world but is never itself illuminated by anything else, awareness is self-luminous.`,
      verses: [
        'ashtavakra-2-1', // "Oh, I am spotless, peaceful, pure awareness"
        'ashtavakra-2-2', // "As I alone give light to this body, so I give light to the world"
        'mandukya-7',     // Description of Turiya—the Fourth
        'ashtavakra-1-9', // "I am the one pure awareness"
        'aitareya-3',     // "Prajnana Brahma—Consciousness is Brahman"
      ],
      reflectionQuestions: [
        'Is awareness something you do, or something you are?',
        'Can awareness ever be absent? Or is even "unconsciousness" something we become aware of later?',
        'What would remain if all objects of awareness disappeared?',
      ],
      practice: {
        title: 'Resting as Awareness',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness. Close your eyes gently.',
          'Notice that you are aware—simply aware.',
          'Don\'t focus on any particular object. Rest as awareness itself.',
          'If attention goes to a sensation, sound, or thought—notice that awareness is already there.',
          'Let go of being aware "of" something. Just be awareness.',
          'Notice: awareness has no boundary, no location, no limit.',
          'Rest here. You are not entering awareness—you are recognizing you never left.',
          'When the timer ends, notice: awareness didn\'t change.',
        ],
      },
    },
    {
      id: 'nos-5',
      title: 'Beyond Knowing and Not-Knowing',
      introduction: `At a certain point, even our understanding becomes an obstacle. The Cloud of Unknowing teaches that God "cannot be thought... by love He can be grasped and held, but by thought never." Zen points to a truth "not mind, not Buddha, not things."

This is not ignorance—it is the humility of realizing that ultimate reality transcends our categories. The Kena Upanishad says, "It is other than the known, and also above the unknown."

Here we encounter the paradox: the Self that knows cannot be known as an object. To truly realize our nature, we must go beyond both knowing and not-knowing.`,
      verses: [
        'cloud-1',        // "By love He can be grasped and held, but by thought never"
        'cloud-10',       // "To the knowing power, God is incomprehensible; to love, fully comprehensible"
        'kena-3',         // "There the eye goes not, speech goes not, nor the mind"
        'kena-4',         // "It is other than the known, and also above the unknown"
        'mumon-27',       // "It is not mind. It is not Buddha. It is not things."
      ],
      reflectionQuestions: [
        'What remains when you let go of everything you think you know about yourself?',
        'Is there a knowing that is not intellectual—a direct recognition?',
        'What is the relationship between love and understanding?',
      ],
      practice: {
        title: 'Cloud of Unknowing Practice',
        duration: '15 minutes',
        instructions: [
          'Sit quietly. Let the body settle.',
          'Choose a simple word—"God," "Love," "Being," or simply "Yes."',
          'Hold this word gently, not as a thought but as a feeling.',
          'When thoughts arise, let them sink below into a "cloud of forgetting."',
          'Don\'t try to understand. Don\'t try not to understand.',
          'Simply rest in loving attention toward the Mystery.',
          'Let the word become a bridge between you and the Unknowable.',
          'Rest in not-knowing, yet somehow being intimately present.',
        ],
      },
    },
    {
      id: 'nos-6',
      title: 'You Have Always Been Free',
      introduction: `The final teaching of all these traditions is perhaps the most radical: you don't need to become liberated. You already are what you seek. The Ashtavakra Gita declares, "You are indeed ever free." The Zen masters say there is nothing to attain.

This is not a denial of practice or growth. It is the recognition that what you truly are was never bound. The bondage was imaginary—a case of mistaken identity. Once you see through the illusion, you don't become free; you recognize you always were.

The journey of self-inquiry doesn't take you somewhere new. It brings you home to what you never left.`,
      verses: [
        'ashtavakra-1-6', // "You are neither the doer nor the enjoyer. You are indeed ever free."
        'ashtavakra-2-19', // "For me there is neither bondage nor liberation"
        'mumon-30',       // "This very mind is Buddha"
        'brihad-1',       // "Lead me from unreal to real..."
        'chandogya-2',    // "Tat tvam asi—That thou art"
      ],
      reflectionQuestions: [
        'If you are already free, what falls away?',
        'What would change in your life if you truly knew yourself to be awareness itself?',
        'Can you find the one who was ever bound?',
      ],
      practice: {
        title: 'Resting in Freedom',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness. Let everything be as it is.',
          'Notice: this moment, just as it is, lacks nothing.',
          'Don\'t try to change anything. Don\'t try to stay the same.',
          'Recognize: awareness is already present, already complete.',
          'Let the sense of being a seeker dissolve.',
          'You are not becoming free. You are recognizing freedom.',
          'Rest without agenda, without future, without lack.',
          'This—just this—is what all the sages point to.',
        ],
      },
    },
  ],
};

