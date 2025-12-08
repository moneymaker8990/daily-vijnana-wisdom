/**
 * Beyond Words: Negative Theology - Comparative Study
 * 
 * What cannot be said. Apophatic approaches in Cloud of Unknowing,
 * Upanishads' "neti neti," Zen's "not this," Tao's namelessness.
 */

import type { Course } from '../../types';

export const beyondWordsCourse: Course = {
  id: 'beyond-words',
  title: 'Beyond Words: Negative Theology',
  description: 'When all words fail, what remains? Explore the apophatic path—knowing through unknowing—across Cloud of Unknowing, the Upanishads\' "neti neti," Zen\'s negations, and Taoism\'s nameless Source.',
  icon: '🌑',
  pathwayType: 'comparative',
  difficulty: 3,
  estimatedWeeks: 3,
  lessons: [
    {
      id: 'bw-1',
      title: 'The Limits of Language',
      introduction: `Every mystical tradition eventually encounters a problem: the deepest truth cannot be spoken. The Tao Te Ching opens with this recognition: "The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name."

This is not a failure of language but its proper limit. Whatever can be defined, categorized, or conceptualized is an object—but ultimate reality is not an object. It is the source from which all objects arise, the space in which all concepts appear.

The Cloud of Unknowing agrees: "He cannot be thought. By love He can be grasped and held, but by thought never." When thought reaches its limit, something else begins.`,
      verses: [
        'tao-1',       // "The Tao that can be told is not the eternal Tao"
        'cloud-1',     // "He cannot be thought"
        'kena-3',      // "There the eye goes not, speech goes not, nor the mind"
        'mumon-27',    // "It is not mind. It is not Buddha. It is not things."
      ],
      traditionalContext: 'Apophatic (negative) theology appears across traditions—saying what ultimate reality is NOT rather than what it IS. This via negativa recognizes that any positive statement limits the infinite.',
      reflectionQuestions: [
        'Why might the deepest truth be beyond words?',
        'What do you know that you cannot express?',
        'Is there a knowing that is not thinking?',
      ],
      practice: {
        title: 'Entering Silence',
        duration: '15 minutes',
        instructions: [
          'Sit in stillness and close your eyes.',
          'Notice how the mind wants to name, categorize, define.',
          'For now, let go of all labels.',
          'Experience reality before concepts divide it.',
          'The tree is not "tree"—that is only a word.',
          'What is it before naming?',
          'Rest in the reality that words can only point to.',
          'This silence is not absence but fullness.',
        ],
      },
    },
    {
      id: 'bw-2',
      title: 'Neti Neti: Not This, Not This',
      introduction: `The Upanishads teach the great negation: "Neti neti—not this, not this." The Self is described by what it is not. "This Self is not this, not this. It is unseizable, for it cannot be seized. It is indestructible, for it cannot be destroyed."

Why negation? Because every positive attribute limits. To say "God is good" makes God an object with a quality. But the source of all qualities cannot itself have qualities in the same way. It transcends all categories.

The Kena Upanishad expresses this beautifully: "It is other than the known, and also above the unknown." Neither known nor unknown—beyond both categories. This is the ultimate via negativa.`,
      verses: [
        'brihad-3',    // "Neti neti—not this, not this"
        'kena-4',      // "It is other than the known, and also above the unknown"
        'kena-5',      // "That which is not expressed through speech..."
        'kena-6',      // "That which does not think through the mind..."
      ],
      traditionalContext: 'Neti neti is the method of discrimination in Advaita Vedanta. By negating everything that can be perceived or conceived, awareness recognizes itself as the unobjectifiable Subject.',
      reflectionQuestions: [
        'What remains when everything perceivable is negated?',
        'Can the eye see itself?',
        'What is "other than the known" yet not unknown?',
      ],
      practice: {
        title: 'Neti Neti Meditation',
        duration: '20 minutes',
        instructions: [
          'Sit quietly and begin self-inquiry.',
          'Notice the body. Say inwardly: "Not this."',
          'Notice sensations. "Not this."',
          'Notice thoughts. "Not this."',
          'Notice emotions. "Not this."',
          'Notice the sense of being a person. "Not this."',
          'What remains that cannot be negated?',
          'That which observes all negation IS what you are.',
          'Rest here, beyond all "this."',
        ],
      },
    },
    {
      id: 'bw-3',
      title: 'The Cloud of Unknowing',
      introduction: `The anonymous author of The Cloud of Unknowing instructs: "Put a cloud of forgetting beneath you, between you and all the creatures that have ever been made." Between you and God is another cloud—the cloud of unknowing, impenetrable to thought.

"When you first begin, you find nothing but a darkness, and as it were a cloud of unknowing; you know not what." This darkness is not God's absence but the limit of the mind's reach. Beyond this cloud, God is present—but only love can enter.

"Strike that thick cloud of unknowing with the sharp dart of longing love." The Christian apophatic path is not cold negation but passionate reaching beyond what can be known.`,
      verses: [
        'cloud-23',    // "You find nothing but a darkness, a cloud of unknowing"
        'cloud-2',     // "Put a cloud of forgetting beneath you"
        'cloud-19',    // "Strike that cloud with the sharp dart of longing love"
        'cloud-11',    // "He is hid between silence and speaking"
      ],
      traditionalContext: 'The Cloud of Unknowing stands in the Christian apophatic tradition of Pseudo-Dionysius. It teaches that God is found not by thinking more but by thinking less—by love, not by knowledge.',
      reflectionQuestions: [
        'Can you love what you cannot understand?',
        'What is the dart of longing love in your experience?',
        'Is darkness a barrier or a doorway?',
      ],
      practice: {
        title: 'Cloud Practice',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness, preferably in dim light.',
          'Let all thoughts of created things sink into a cloud of forgetting.',
          'Above you, imagine a cloud of unknowing.',
          'You cannot penetrate it with thought.',
          'But you can reach through it with love.',
          'Let a feeling of longing rise from your heart.',
          'Don\'t try to understand. Simply love.',
          'Rest in loving unknowing.',
        ],
      },
    },
    {
      id: 'bw-4',
      title: 'Zen\'s Radical Negations',
      introduction: `Zen takes negation to its extreme. Nansen says: "It is not mind. It is not Buddha. It is not things." Joshu answers every question with "Mu"—not yes, not no, just... Mu.

These are not philosophical positions but tools to break the grip of conceptual thinking. When the student grasps "mind is Buddha," the master says "mind is not Buddha." When they grasp that, the master says something else entirely.

"The Buddha held up a flower. Everyone was silent. Only Mahakashyapa smiled." The teaching that transcends words is transmitted in silence. What is communicated when nothing is said?`,
      verses: [
        'mumon-27',    // "It is not mind. It is not Buddha. It is not things"
        'mumon-1',     // Joshu's Mu
        'mumon-6',     // Buddha holds up a flower
        'mumon-33',    // "This mind is not Buddha"
      ],
      traditionalContext: 'Zen uses negation, paradox, and silence to bypass conceptual mind. The goal is direct recognition—not understanding about reality but awakening as reality.',
      reflectionQuestions: [
        'What is Joshu pointing to with "Mu"?',
        'Can truth be transmitted without words?',
        'What do you understand when you understand nothing?',
      ],
      practice: {
        title: 'Mu Practice',
        duration: '15 minutes',
        instructions: [
          'Sit quietly with the question: "What is Mu?"',
          'Don\'t look for an intellectual answer.',
          'Let "Mu" fill your awareness.',
          'Mu is not yes. Mu is not no.',
          'What is Mu before thought divides?',
          'Become Mu. Be Mu.',
          'When the question and answer dissolve...',
          'What remains is what Mu points to.',
        ],
      },
    },
    {
      id: 'bw-5',
      title: 'The Nameless Tao',
      introduction: `"The name that can be named is not the eternal name. The nameless is the beginning of heaven and earth." Taoism rests in the nameless. Any name limits; the Tao is unlimited.

"Look and it cannot be seen—it is beyond form. Listen and it cannot be heard—it is beyond sound. Grasp and it cannot be held—it is intangible." The Tao is not an absence but a presence that transcends the categories of presence and absence.

Zhuangzi plays with this: "The fish trap exists because of the fish. Once you've gotten the fish, you can forget the trap." Words exist because of meaning—but once you've gotten the meaning, the words can be forgotten. The Tao is what remains when all traps are released.`,
      verses: [
        'tao-1',       // "The nameless is the beginning of heaven and earth"
        'tao-14',      // "Look and it cannot be seen"
        'zz-2-4',      // "Once you've gotten the fish, forget the trap"
        'tao-25',      // "I do not know its name; I call it Tao"
      ],
      traditionalContext: 'Taoism expresses the apophatic through poetry and paradox rather than systematic negation. The Tao is pointed to but never grasped.',
      reflectionQuestions: [
        'What is the nameless source of all names?',
        'Can you sense what is "beyond form, beyond sound"?',
        'What fish are you still trying to catch with word-traps?',
      ],
      practice: {
        title: 'Resting in the Nameless',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and let attention rest on nothing in particular.',
          'Don\'t name what you experience.',
          'Before "tree" there is something.',
          'Before "thought" there is something.',
          'This something has no name.',
          'It is the source of all names.',
          'Rest in the nameless.',
          'The Tao is closer than any word can reach.',
        ],
      },
    },
    {
      id: 'bw-6',
      title: 'The Silence That Speaks',
      introduction: `All traditions converge on silence—not empty silence but pregnant silence, the silence from which all words arise and into which they return.

"There is a voice that doesn't use words. Listen," says Rumi. The Buddha's transmission to Mahakashyapa was wordless—a flower held up, a smile exchanged. The Tao that can be spoken is not the eternal Tao. God is found in the cloud of unknowing. The Self is "neti neti."

This is not the failure of mysticism but its fulfillment. The finger that points at the moon is not the moon. Every word has been a pointer. What they point to is here, now, in the silence between these words.`,
      verses: [
        'rumi-29',     // "There is a voice that doesn't use words. Listen."
        'mumon-6',     // Buddha's silent transmission
        'cloud-26',    // "When you feel you are doing nothing, closest to God"
        'mandukya-7',  // Turiya—indescribable, the essence of Self-knowledge
      ],
      traditionalContext: 'The via negativa culminates in silence—not the absence of sound but the presence of the unspeakable. All traditions meet here, beyond words.',
      reflectionQuestions: [
        'What does the silence between words communicate?',
        'Can you hear "the voice that doesn\'t use words"?',
        'Is silence the absence of speech or the source of it?',
      ],
      practice: {
        title: 'Listening to Silence',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness and close your eyes.',
          'Listen—not to sounds, but to the silence beneath sounds.',
          'This silence is not empty. It is full.',
          'It is the womb of all words, all music, all expression.',
          'Let this silence communicate directly.',
          'What it says cannot be repeated.',
          'What it reveals cannot be taught.',
          'Rest here. This is what all words point to.',
        ],
      },
    },
  ],
};

