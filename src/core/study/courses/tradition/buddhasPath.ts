/**
 * Buddha's Path - Tradition Deep Dive
 * 
 * Core Buddhist teachings from the Dhammapada, Sutta Nipata, and Prajnaparamita sutras.
 * Covering the Four Noble Truths, the Noble Eightfold Path, emptiness, and awakening.
 */

import type { Course } from '@core/study/types';

export const buddhasPathCourse: Course = {
  id: 'buddhas-path',
  title: "Buddha's Path",
  description: 'Journey into the heart of Buddhist wisdom. From the fundamental teachings of the Dhammapada through the profound emptiness of the Prajnaparamita sutras, discover the path from suffering to liberation.',
  icon: '☸️',
  pathwayType: 'tradition',
  difficulty: 2,
  estimatedWeeks: 4,
  lessons: [
    {
      id: 'bp-1',
      title: 'Mind Is the Forerunner',
      introduction: `The Dhammapada opens with perhaps the most famous Buddhist teaching: "All that we are is the result of what we have thought: it is founded on our thoughts, it is made up of our thoughts."

This is not abstract philosophy but practical psychology. The Buddha's first insight is that our experience of reality is shaped by mind. If we think with purity, happiness follows; if we think with impurity, suffering follows.

This teaching places responsibility squarely with us. We cannot control external circumstances, but we can train the mind. And in training the mind, we transform our entire experience of life.`,
      verses: [
        'dp-1-1',      // "All that we are is the result of what we have thought"
        'dp-1-2',      // "If a person speaks or acts with a pure thought, happiness follows"
        'dp-3-3',      // "It is good to tame the mind... a tamed mind brings happiness"
        'dp-3-4',      // "Let the wise guard their thoughts"
      ],
      reflectionQuestions: [
        'How do your thoughts shape your experience right now?',
        'What patterns of thinking create suffering in your life?',
        'Is it possible to change habitual thought patterns?',
      ],
      practice: {
        title: 'Watching the Mind',
        duration: '15 minutes',
        instructions: [
          'Sit quietly with eyes closed.',
          'Simply watch thoughts arise.',
          'Don\'t engage with them—just observe.',
          'Notice: are thoughts pleasant, unpleasant, or neutral?',
          'Notice: how do thoughts affect your mood?',
          'You are not your thoughts—you are that which observes.',
          'Let thoughts pass like clouds.',
          'Rest in the awareness that watches.',
        ],
      },
    },
    {
      id: 'bp-2',
      title: 'The First Noble Truth: Suffering',
      introduction: `The Buddha's teaching begins with an honest assessment: "There is suffering." Life inevitably includes old age, sickness, death, separation from what we love, union with what we dislike, not getting what we want.

This is not pessimism but realism. The Buddha doesn't say life is only suffering—he says suffering is a fundamental part of conditioned existence. By acknowledging this honestly, we can begin to understand its causes and find the way out.

The Dhammapada echoes: "Long is the night to one who is awake; long is a mile to one who is tired; long is life to the foolish who do not know the true path." The unawakened life is marked by unsatisfactoriness (dukkha).`,
      verses: [
        'dp-5-1',      // "Long is the night to one who is awake; long is life to the foolish"
        'dp-1-6',      // "The world does not know we must all come to an end here"
        'sn-rhino-2',  // "Following affection, this suffering arises"
        'heart-8',     // "No suffering, no origination" (pointing to liberation)
      ],
      reflectionQuestions: [
        'Where do you experience suffering in your life?',
        'Can you acknowledge suffering without being overwhelmed by it?',
        'Is avoidance of suffering different from freedom from suffering?',
      ],
      practice: {
        title: 'Acknowledging Suffering',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and let your attention settle.',
          'Gently acknowledge: "There is suffering in life."',
          'Notice any suffering present in this moment.',
          'Don\'t push it away. Simply acknowledge it.',
          'Say inwardly: "This too is part of the human experience."',
          'Feel how acknowledgment differs from resistance.',
          'Rest in compassionate acceptance of things as they are.',
          'This honest seeing is the beginning of the path.',
        ],
      },
    },
    {
      id: 'bp-3',
      title: 'The Cause of Suffering: Craving',
      introduction: `The Second Noble Truth identifies the cause of suffering: tanha (craving, thirst, clinging). We suffer not because of external circumstances but because of our relationship to them—grasping for pleasure, pushing away pain, demanding that reality be other than it is.

"Hatred never ceases by hatred in this world. By love alone does hatred cease. This is an eternal law." The Buddha saw that our reactive patterns—craving and aversion—perpetuate suffering. By understanding this mechanism, we can begin to free ourselves.

The Dhammapada warns: "As a torrent carries off a sleeping village, death carries off the person whose mind is distracted and who only gathers the flowers of sensual pleasure."`,
      verses: [
        'dp-1-5',      // "Hatred never ceases by hatred, by love alone"
        'dp-1-3',      // "He abused me... in those who harbor such thoughts, hatred will never cease"
        'dp-4-2',      // "Death carries off the person who only gathers sensual pleasure"
        'sn-oct-1',    // "Ruin through sensual pleasures, mind obsessed with passion"
      ],
      reflectionQuestions: [
        'What do you crave most strongly?',
        'What do you push away most vigorously?',
        'How does craving create suffering in your experience?',
      ],
      practice: {
        title: 'Noticing Craving',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and observe your mind.',
          'Notice any wanting that arises—"I want this, I want that."',
          'Notice any aversion—"I don\'t want this."',
          'Don\'t act on these impulses. Just observe them.',
          'See how craving creates tension in the body and mind.',
          'Notice: between craving and satisfaction, there is suffering.',
          'What happens when you simply observe craving without acting?',
          'Rest in the peace of non-grasping.',
        ],
      },
    },
    {
      id: 'bp-4',
      title: 'The End of Suffering: Nirvana',
      introduction: `The Third Noble Truth offers hope: there is an end to suffering. This is Nirvana—not a place but a state, the complete cessation of craving and the suffering it produces.

"There is no suffering for one who has finished the journey, who has abandoned grief, who has freed themselves on all sides, who has thrown off all fetters."

Nirvana is often described in negative terms—the absence of suffering, the cessation of craving—because it transcends ordinary experience. But it is also described positively as the highest happiness, perfect peace, the "deathless."`,
      verses: [
        'dp-7-1',      // "No suffering for one who has finished the journey"
        'heart-9',     // "Without any hindrance, no fears exist. One dwells in nirvana"
        'dp-7-3',      // "One whose passions are destroyed... their path is like birds in the air"
        'sn-metta-10', // "By not holding to fixed views... one never again knows rebirth"
      ],
      reflectionQuestions: [
        'Can you imagine a state free of craving?',
        'Have you ever experienced moments of complete contentment?',
        'What would freedom from all mental suffering feel like?',
      ],
      practice: {
        title: 'Tasting Peace',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and let the body relax completely.',
          'For now, want nothing.',
          'Let go of any agenda for this meditation.',
          'Simply be here, needing nothing to be different.',
          'Notice any peace that arises.',
          'This peace is always available when craving ceases.',
          'It doesn\'t need to be created—only uncovered.',
          'Rest in this natural peace.',
        ],
      },
    },
    {
      id: 'bp-5',
      title: 'The Noble Eightfold Path',
      introduction: `The Fourth Noble Truth is the path to the end of suffering: the Noble Eightfold Path. This is a practical guide for living, covering wisdom (right view, right intention), ethics (right speech, right action, right livelihood), and mental discipline (right effort, right mindfulness, right concentration).

"By earnestness, by self-control, by restraint, the wise will build themselves an island which no flood can overwhelm." The path is not passive—it requires effort, discipline, and practice.

Yet the effort is not straining. "Those who restrain their mind... will be free from the bonds of Mara." It is persistent, patient cultivation of wholesome qualities.`,
      verses: [
        'dp-2-4',      // "By earnestness, self-control, restraint, the wise build an island"
        'dp-3-5',      // "Those who restrain their mind will be free from the bonds of Mara"
        'dp-8-3',      // "One who conquers oneself is the greatest of conquerors"
        'sn-metta-1',  // "What should be done by one skilled in goodness"
      ],
      reflectionQuestions: [
        'Which aspect of the Eightfold Path calls to you most?',
        'Where is your practice strongest? Where does it need attention?',
        'What does "right effort" mean to you?',
      ],
      practice: {
        title: 'Walking the Path',
        duration: 'Daily reflection',
        instructions: [
          'Each morning, reflect on the Eightfold Path.',
          'Ask: "How can I practice right speech today?"',
          'Ask: "How can I practice right action today?"',
          'Set a simple intention for one aspect of the path.',
          'Throughout the day, return to this intention.',
          'In the evening, reflect: "How did I do?"',
          'Without judgment, note what helped and what hindered.',
          'Tomorrow, continue the practice.',
        ],
      },
    },
    {
      id: 'bp-6',
      title: 'Loving-Kindness',
      introduction: `The Buddha taught metta—loving-kindness—as a powerful practice and way of being. The Metta Sutta instructs: "Even as a mother protects with her life her child, her only child, so with a boundless heart should one cherish all living beings."

This is not sentimentality but radical goodwill extended to all beings without exception. "Radiating kindness over the entire world: spreading upward to the skies, downward to the depths, outward and unbounded, free from hatred and ill-will."

Metta practice transforms the heart. By cultivating universal loving-kindness, we soften the boundaries of self and experience our connection with all life.`,
      verses: [
        'sn-metta-7',  // "As a mother protects her only child"
        'sn-metta-8',  // "Radiating kindness over the entire world"
        'sn-metta-3',  // "May all beings be happy and secure"
        'dp-10-1',     // "All beings tremble before violence. All love life"
      ],
      reflectionQuestions: [
        'Can you feel goodwill toward all beings, without exception?',
        'Who is difficult to include in your loving-kindness?',
        'What happens in your heart when you genuinely wish others well?',
      ],
      practice: {
        title: 'Metta Meditation',
        duration: '20 minutes',
        instructions: [
          'Sit comfortably and close your eyes.',
          'Begin with yourself: "May I be happy. May I be peaceful. May I be free from suffering."',
          'Extend to someone you love: "May you be happy..."',
          'Extend to a neutral person: "May you be happy..."',
          'Extend to a difficult person: "May you be happy..."',
          'Extend to all beings everywhere: "May all beings be happy..."',
          'Feel your heart expanding to include all life.',
          'Rest in boundless loving-kindness.',
        ],
      },
    },
    {
      id: 'bp-7',
      title: 'Emptiness: Form Is Emptiness',
      introduction: `The Prajnaparamita sutras take Buddhist teaching to its ultimate depth. The Heart Sutra declares: "Form does not differ from emptiness, emptiness does not differ from form. That which is form is emptiness, that which is emptiness is form."

This is not nihilism. Emptiness (shunyata) means that all things lack inherent, independent existence—they arise through conditions, are impermanent, and have no fixed essence. This understanding liberates us from clinging.

"No suffering, no origination, no stopping, no path. No cognition, also no attainment, with nothing to attain." Even the Buddhist teachings are empty—not to be clung to as ultimate truths but used as rafts to cross to the other shore.`,
      verses: [
        'heart-2',     // "Form is emptiness, emptiness is form"
        'heart-4',     // "All dharmas are marked with emptiness"
        'heart-8',     // "No suffering, no origination... with nothing to attain"
        'diamond-6',   // "The notion of a being does not exist in any real sense"
      ],
      reflectionQuestions: [
        'What does it mean that things are empty of inherent existence?',
        'How is emptiness different from nothingness?',
        'Can emptiness and compassion coexist?',
      ],
      practice: {
        title: 'Contemplating Emptiness',
        duration: '20 minutes',
        instructions: [
          'Sit quietly and choose an object to observe.',
          'Notice its form, color, texture.',
          'Now consider: this object arose through conditions.',
          'Where did its materials come from? Who made it?',
          'It will also pass away, change form.',
          'It has no permanent, independent essence.',
          'This is emptiness—not non-existence, but interdependent arising.',
          'Rest in this understanding. Form is emptiness; emptiness is form.',
        ],
      },
    },
    {
      id: 'bp-8',
      title: 'Gone Beyond',
      introduction: `The Heart Sutra concludes with the great mantra: "Gate gate paragate parasamgate bodhi svaha!" (Gone, gone, gone beyond, gone utterly beyond—awakening, so be it!)

This is the Buddha's path completed: going beyond suffering, beyond craving, beyond even the concepts of Buddhism itself. "The Bodhisattva depends on Prajnaparamita and the mind is no hindrance. Without any hindrance, no fears exist. Far apart from every perverted view, one dwells in nirvana."

The path is not about accumulating spiritual achievements but about letting go completely—until there is nothing left to cling to and nowhere left to stand. This is freedom.`,
      verses: [
        'heart-12',    // "Gate gate paragate parasamgate bodhi svaha"
        'heart-9',     // "Without any hindrance, no fears exist"
        'dp-7-5',      // "Calm is the mind, calm is the action of one wholly freed"
        'diamond-11',  // "All conditioned phenomena are like a dream, an illusion"
      ],
      reflectionQuestions: [
        'What would it mean to go "utterly beyond"?',
        'Is there anything you\'re still clinging to—even spiritual attainment?',
        'Can freedom be achieved, or only recognized?',
      ],
      practice: {
        title: 'Letting Go Completely',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness. Close your eyes.',
          'Let go of the body—don\'t hold tension.',
          'Let go of thoughts—don\'t grasp at them.',
          'Let go of wanting anything from this meditation.',
          'Let go of "being a meditator."',
          'Let go of "letting go."',
          'What remains when everything is released?',
          'Gate gate paragate parasamgate bodhi svaha.',
        ],
      },
    },
  ],
};



