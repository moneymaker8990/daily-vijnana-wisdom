/**
 * Death, Dying, and Deathlessness - A Thematic Journey
 * 
 * How traditions teach us to face mortality and discover what is deathless.
 * Drawing from Bhagavad Gita, Dhammapada, Upanishads, Sufi poetry, and Christian Mysticism.
 */

import type { Course } from '../../types';

export const deathAndDeathlessnessCourse: Course = {
  id: 'death-and-deathlessness',
  title: 'Death, Dying, and Deathlessness',
  description: 'Face the great mystery that every tradition addresses: death. Discover how mortality can be our greatest teacher, and what the sages mean when they speak of that which never dies.',
  icon: '🌅',
  pathwayType: 'themed',
  difficulty: 2,
  estimatedWeeks: 3,
  lessons: [
    {
      id: 'dad-1',
      title: 'Death as Teacher',
      introduction: `Every spiritual tradition begins with a confrontation with death. The Buddha left his palace after seeing old age, sickness, and death. Arjuna's crisis on the battlefield was a crisis about killing and dying. The Sufi poets constantly remind us that this life is fleeting.

Why is death so central to awakening? Because until we face our mortality, we remain asleep, lost in trivial pursuits. The Buddha said: "Of all mindfulness meditations, that on death is supreme." The Sufi poet Rumi wrote: "Die before you die, and find that there is no death."

In this journey, we don't flee from death—we meet it. Not morbidly, but with clear eyes. And in that meeting, something unexpected happens: we begin to discover what cannot die.`,
      verses: [
        'dp-1-6',      // "The world does not know that we must all come to an end here"
        'rumi-4',      // "Don't grieve. Anything you lose comes round in another form"
        'katha-3',     // "Arise, awake, the path is sharp as a razor's edge"
        'cob-21',      // "True immortality is found only when you die to yourself"
      ],
      reflectionQuestions: [
        'How often do you remember that this life will end?',
        'What would change in your life if you kept death as a constant companion?',
        'What are you avoiding by not thinking about death?',
      ],
      practice: {
        title: 'Death Contemplation',
        duration: '15 minutes',
        instructions: [
          'Sit quietly in a comfortable position.',
          'Reflect: "I will die. This is certain. The time is uncertain."',
          'Notice any resistance, fear, or denial that arises.',
          'Don\'t push away these feelings—acknowledge them.',
          'Ask: "What matters most, knowing that I will die?"',
          'Let this awareness clarify your priorities.',
          'Notice: even now, awareness is present. What is aware?',
          'Rest in the awareness that contemplates death.',
        ],
      },
    },
    {
      id: 'dad-2',
      title: 'The Deathless Self',
      introduction: `On the battlefield, when Arjuna despairs at the prospect of killing his kinsmen, Krishna reveals the fundamental teaching: "Never was there a time when I did not exist, nor you, nor all these kings; nor in the future shall any of us cease to be."

The Katha Upanishad declares: "The Self is never born, nor does it ever die. It has not come from anywhere, nor is it anyone. Unborn, eternal, everlasting, primeval, it is not slain when the body is slain."

This is not denial of death but recognition: something in you has never been touched by birth or death. The body changes, the mind changes, but awareness—the knowing presence in which all changes appear—where does it go? Can you find its beginning or end?`,
      verses: [
        'gita-2-12',   // "Never was there a time when I did not exist"
        'katha-7',     // "The Self is never born, nor does it ever die"
        'gita-2-11',   // "The wise grieve neither for the living nor for the dead"
        'ashtavakra-1-3', // "You are neither earth nor water... you are consciousness itself"
      ],
      reflectionQuestions: [
        'What in you has remained unchanged since childhood?',
        'Can you imagine your own non-existence?',
        'What is it that is aware of the fear of death?',
      ],
      practice: {
        title: 'Finding the Unchanging',
        duration: '20 minutes',
        instructions: [
          'Sit quietly with eyes closed.',
          'Remember yourself as a young child.',
          'Notice: the body has completely changed since then.',
          'The thoughts and emotions have changed.',
          'Yet something knows both the child and the adult.',
          'What is this awareness that has witnessed your entire life?',
          'Has this awareness itself changed, or only its contents?',
          'Rest in this unchanging awareness. This is what the sages call deathless.',
        ],
      },
    },
    {
      id: 'dad-3',
      title: 'Dying Before You Die',
      introduction: `The mystics speak of another kind of death—not physical death, but the death of the false self, the ego, the sense of separation. Rumi says: "Die before you die, and find that there is no death." The Conference of the Birds describes the final valley as "Poverty and Annihilation"—the death of the separate self.

This death is not loss but liberation. What dies is only the illusion of being a separate, limited being. What remains is the vastness that was always present. The Dark Night of the Soul describes this: "This dark night of love does not annihilate the soul but transforms it. It destroys what is human and creates what is divine."

Every moment, we have the opportunity for this death—to let go of who we think we are and discover what we truly are.`,
      verses: [
        'rumi-32',     // "Be melting snow. Wash yourself of yourself"
        'cob-17',      // "The Valley of Poverty and Annihilation... the self dissolves"
        'dn-2-4',      // "This dark night destroys what is human, creates what is divine"
        'rumi-24',     // "Be crumbled, so wildflowers will come up where you are"
      ],
      reflectionQuestions: [
        'What parts of your identity are you most attached to?',
        'Have you ever experienced a death of some aspect of yourself?',
        'What would remain if everything you think you are disappeared?',
      ],
      practice: {
        title: 'Ego Death Meditation',
        duration: '20 minutes',
        instructions: [
          'Sit in stillness. Close your eyes.',
          'Ask: "Who am I?" and wait for answers to arise.',
          'For each answer (I am my name, my role, my body), ask: "Is this what I truly am?"',
          'Let each identification dissolve.',
          'Continue until no answers come.',
          'Rest in the silence that remains.',
          'This silence that knows it cannot be named—this is prior to the ego.',
          'Notice: you still exist. What has died? What remains?',
        ],
      },
    },
    {
      id: 'dad-4',
      title: 'The Dark Night',
      introduction: `St. John of the Cross describes a profound experience on the spiritual path: the Dark Night of the Soul. This is when all spiritual consolation is withdrawn. The soul feels abandoned by God, unable to pray, unable to feel anything but darkness.

Yet this darkness is not punishment but purification. "God leads into the dark night those whom he desires to purify from all their imperfections, so as to bring them forward to divine union."

Many seekers experience something like this—a time when practices feel empty, when meaning drains away, when even the search itself seems futile. The teaching is not to flee but to trust: "The soul must pass through this dark night of mortification before it can arrive at divine union."`,
      verses: [
        'dn-poem-1',   // "On a dark night, kindled in love with yearnings"
        'dn-1-6',      // "God leads into the dark night those he desires to purify"
        'dn-poem-3',   // "Without light or guide, save that which burned in my heart"
        'dn-3-2',      // "The soul must be emptied so God may fill it"
      ],
      reflectionQuestions: [
        'Have you experienced periods of spiritual dryness or darkness?',
        'What might be purified through such experiences?',
        'Can you trust darkness as much as light?',
      ],
      practice: {
        title: 'Embracing Darkness',
        duration: '15 minutes',
        instructions: [
          'Sit in a dark room if possible, or close your eyes.',
          'Let yourself feel the darkness without resisting.',
          'Notice any discomfort, fear, or restlessness.',
          'Remember: "This light guided me more surely than the light of noonday."',
          'In this darkness, there is a different kind of guidance.',
          'Let go of the need to see, understand, or feel anything.',
          'Simply be present to what is—even if it is nothing.',
          'Trust that darkness can be as sacred as light.',
        ],
      },
    },
    {
      id: 'dad-5',
      title: 'Transformation Through Surrender',
      introduction: `The death that leads to deathlessness is not achieved through effort but through surrender. The Bhagavad Gita teaches: "One who offers their actions to Brahman, abandoning all attachment, is not affected by sin, as a lotus leaf is not affected by water."

The Sufi tradition speaks of fana—annihilation in the Beloved. "The thirty birds... were what they had sought." The seekers discovered that in losing themselves, they found their true nature.

This surrender is not defeat but victory. It is not loss but the finding of what cannot be lost. The Dhammapada says: "There is no suffering for one who has finished the journey, who has abandoned grief, who has freed themselves on all sides."`,
      verses: [
        'gita-5-10',   // "Not affected by sin, as a lotus leaf by water"
        'cob-27',      // "When you are lost, you are found"
        'dp-7-1',      // "No suffering for one who has finished the journey"
        'cob-28',      // "They were no more. Only the Simorgh remained"
      ],
      reflectionQuestions: [
        'What would you need to surrender to truly let go?',
        'Is there a part of you that wants to keep controlling, even spiritual progress?',
        'What might transformation look like when achieved through surrender rather than effort?',
      ],
      practice: {
        title: 'Total Surrender Practice',
        duration: '20 minutes',
        instructions: [
          'Sit quietly. Let the body settle.',
          'Bring attention to your breathing.',
          'On each exhale, practice letting go.',
          'Let go of the body... let go of thoughts... let go of self.',
          'If resistance arises, surrender that too.',
          'There is nothing to hold onto, nothing to achieve.',
          'Let yourself fall into the Unknown.',
          'Trust: what remains when all is surrendered is what you truly are.',
        ],
      },
    },
    {
      id: 'dad-6',
      title: 'Living in Light of Death',
      introduction: `The teaching on death is not meant to make us morbid but to make us alive. When we truly accept that this life will end, we stop wasting it. Every moment becomes precious. Every encounter becomes meaningful.

The Upanishads teach: "From joy all beings are born, by joy they are sustained, toward joy they move, and into joy they return." Death is not the opposite of life—it is the opposite of birth. Life itself continues, transforms, returns to its source.

The sage who has died before death lives without fear. "There is no suffering for one who has finished the journey." Not because life is denied, but because what was never real has been seen through. What remains is deathless awareness, expressing itself as this precious, fleeting life.`,
      verses: [
        'taittiriya-1', // "From joy all beings are born, into joy they return"
        'dp-2-1',      // "Earnestness is the path of immortality, thoughtlessness the path of death"
        'brihad-1',    // "Lead me from death to immortality"
        'ashtavakra-5-4', // "You are complete, even now"
      ],
      reflectionQuestions: [
        'How would you live if you truly accepted your death?',
        'What would fall away? What would become essential?',
        'Can you feel the joy of being alive, right now?',
      ],
      practice: {
        title: 'Living Fully',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and close your eyes.',
          'Imagine this is your last day of life.',
          'What do you feel grateful for?',
          'What do you regret?',
          'What would you want to do, say, or be?',
          'Now open your eyes. You are alive.',
          'Let this life be lived with the intensity and gratitude',
          'of one who knows how precious it is.',
          'Go forth into your day, awake to the gift of being.',
        ],
      },
    },
  ],
};

