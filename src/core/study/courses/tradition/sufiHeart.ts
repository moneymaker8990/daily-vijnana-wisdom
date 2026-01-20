/**
 * The Sufi Heart - Tradition Deep Dive
 * 
 * Journey into Sufi mysticism through Rumi's poetry and the Conference of the Birds.
 * The path of love, longing, and annihilation in the Beloved.
 */

import type { Course } from '@core/study/types';

export const sufiHeartCourse: Course = {
  id: 'sufi-heart',
  title: 'The Sufi Heart',
  description: 'Enter the intoxicating world of Sufi mysticism. Through Rumi\'s poetry and Attar\'s Conference of the Birds, discover the path of divine love, longing, annihilation, and union with the Beloved.',
  icon: '🌹',
  pathwayType: 'tradition',
  difficulty: 2,
  estimatedWeeks: 3,
  lessons: [
    {
      id: 'sh-1',
      title: 'The Call of the Beloved',
      introduction: `Sufism is the mystical heart of Islam—a path of direct experience of the Divine through love. While scholars study, the Sufi loves. While theologians argue, the Sufi dances. "Come, come, whoever you are. Wanderer, worshipper, lover of leaving—it doesn't matter. Ours is not a caravan of despair."

Rumi, the greatest Sufi poet, speaks of a pull that draws the soul toward its source. "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray." This pull is not toward something external but toward our own deepest nature.

The Sufi journey begins with hearing the call—recognizing that something greater beckons, that ordinary life is not enough, that the heart longs for its true home.`,
      verses: [
        'rumi-1',      // "Come, come, whoever you are"
        'rumi-6',      // "Let yourself be silently drawn"
        'cob-4',       // "Tell us how we may find this king"
        'rumi-11',     // "What you seek is seeking you"
      ],
      reflectionQuestions: [
        'Have you heard the call of something greater?',
        'What pulls at your heart that you cannot explain?',
        'What would it mean to follow love wherever it leads?',
      ],
      practice: {
        title: 'Listening to the Call',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and close your eyes.',
          'Place your attention on your heart.',
          'Ask: "What is calling me?"',
          'Don\'t answer with the mind—listen with the heart.',
          'Feel for a pull, a longing, a direction.',
          'This is the Beloved calling you home.',
          'Even if you cannot name it, feel it.',
          'Let yourself be silently drawn.',
        ],
      },
    },
    {
      id: 'sh-2',
      title: 'The Seven Valleys',
      introduction: `Attar's Conference of the Birds describes the spiritual journey as passing through seven valleys. The birds set out to find their king, the Simorgh, knowing they must traverse these stages: Quest, Love, Knowledge, Detachment, Unity, Bewilderment, and finally Poverty and Annihilation.

"The first valley is the Valley of the Quest. Here, love and longing are the wings." The journey begins with intense seeking. "In this valley, years may pass like moments. Mountains must be crossed, oceans traversed."

Each valley strips away another layer of self until, in the final valley, "the drop becomes the sea. The self dissolves into the Self. Nothing remains but the Beloved."`,
      verses: [
        'cob-5',       // "The Valley of the Quest—love and longing are the wings"
        'cob-7',       // "The Valley of Love—reason is abandoned"
        'cob-13',      // "The Valley of Unity—all things are one"
        'cob-17',      // "The Valley of Poverty and Annihilation"
      ],
      reflectionQuestions: [
        'Which valley do you feel you are in now?',
        'What must be left behind for the journey to continue?',
        'Are you willing to lose yourself to find the Beloved?',
      ],
      practice: {
        title: 'The Inner Journey',
        duration: '20 minutes',
        instructions: [
          'Sit quietly and imagine yourself as a bird.',
          'You are on a journey to find your true King.',
          'What valley are you traveling through?',
          'What obstacles do you face?',
          'What must you surrender to continue?',
          'Remember: thousands set out, but only thirty arrive.',
          'Are you willing to go the whole way?',
          'Rest in your commitment to the journey.',
        ],
      },
    },
    {
      id: 'sh-3',
      title: 'The Wine of Love',
      introduction: `Sufi poetry is filled with images of wine and intoxication—metaphors for the ecstatic state that divine love produces. "Knowing it, one becomes intoxicated, stunned, and delighted in the Self."

Rumi speaks of a love that breaks all rules: "Forget safety. Live where you fear to live. Destroy your reputation. Be notorious." This is not recklessness but willingness to be transformed by love, regardless of what the world thinks.

"Dance, when you're broken open. Dance, if you've torn the bandage off. Dance in the middle of the fighting. Dance in your blood. Dance when you're perfectly free."`,
      verses: [
        'rumi-23',     // "Dance, when you're broken open"
        'rumi-18',     // "Forget safety. Live where you fear to live"
        'rumi-5',      // "You were born with wings, why prefer to crawl?"
        'cob-8',       // "In the Valley of Love, the mind is useless. Only the heart can guide"
      ],
      reflectionQuestions: [
        'What would it mean to be intoxicated with divine love?',
        'Where are you playing it safe when love calls you to risk?',
        'Can you dance even when broken?',
      ],
      practice: {
        title: 'The Dance of the Heart',
        duration: '15 minutes (or more)',
        instructions: [
          'Put on music that moves your soul.',
          'Stand and let your body begin to move.',
          'Don\'t plan the movement—let it arise.',
          'Dance for the Beloved, not for anyone watching.',
          'Let the dance be prayer, be longing, be joy.',
          'If tears come, let them. If laughter comes, let it.',
          'Dance until you forget who is dancing.',
          'This is worship.',
        ],
      },
    },
    {
      id: 'sh-4',
      title: 'The Guest House',
      introduction: `Rumi's famous poem "The Guest House" teaches a radical acceptance: "This being human is a guest house. Every morning a new arrival. A joy, a depression, a meanness, some momentary awareness comes as an unexpected visitor."

The Sufi doesn't fight against difficult emotions but welcomes them as teachers. "Welcome and entertain them all! Even if they're a crowd of sorrows, who violently sweep your house empty of its furniture, still, treat each guest honorably."

This is not passive resignation but active embrace. "The dark thought, the shame, the malice, meet them at the door laughing, and invite them in. Be grateful for whoever comes, because each has been sent as a guide from beyond."`,
      verses: [
        'rumi-26',     // "This being human is a guest house"
        'rumi-27',     // "Welcome and entertain them all"
        'rumi-28',     // "Meet them at the door laughing"
        'rumi-2',      // "The wound is the place where the Light enters you"
      ],
      reflectionQuestions: [
        'What guests are you resisting in your guest house?',
        'Can you welcome difficult emotions as teachers?',
        'How might your wounds be openings for light?',
      ],
      practice: {
        title: 'Welcoming All Guests',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and notice what you\'re feeling.',
          'Whatever arises—joy, anxiety, sadness, boredom—welcome it.',
          'Say inwardly: "Welcome, guest. What have you come to teach me?"',
          'Don\'t try to change the feeling. Let it be.',
          'Notice: when welcomed, feelings often soften.',
          'Each emotion is a messenger from the Beloved.',
          'Treat each guest honorably.',
          'Rest in the spaciousness that can hold all guests.',
        ],
      },
    },
    {
      id: 'sh-5',
      title: 'Fana: Annihilation in the Beloved',
      introduction: `The culmination of the Sufi path is fana—annihilation of the self in God. This is not destruction but dissolving, like a drop returning to the ocean. "The thirty birds... were what they had sought. They were the Simorgh."

"Be melting snow. Wash yourself of yourself." The separate self is an illusion that must be seen through. "Very little grows on jagged rock. Be ground. Be crumbled, so wildflowers will come up where you are."

This death is liberation. "Strip away all you have, and you will possess all. Die to yourself, and you will live forever. This is the paradox of the path."`,
      verses: [
        'rumi-32',     // "Be melting snow. Wash yourself of yourself"
        'cob-27',      // "When you are lost, you are found"
        'cob-28',      // "In that annihilation, they found their true selves"
        'rumi-24',     // "Be crumbled, so wildflowers will come up where you are"
      ],
      reflectionQuestions: [
        'What would it mean to wash yourself of yourself?',
        'What in you resists annihilation?',
        'Can you see how the death of ego might be liberation?',
      ],
      practice: {
        title: 'Melting into the Beloved',
        duration: '20 minutes',
        instructions: [
          'Sit quietly and feel your boundaries.',
          'Notice where "you" seem to end and the world begins.',
          'Now let these boundaries soften.',
          'Imagine yourself as snow melting in sunlight.',
          'You are not disappearing—you are becoming water.',
          'Let the solid sense of "me" dissolve.',
          'What remains is not nothing—it is everything.',
          'Rest as the ocean, not the drop.',
        ],
      },
    },
    {
      id: 'sh-6',
      title: 'Union: The Ocean in a Drop',
      introduction: `After annihilation comes baqa—subsistence in God. The Sufi discovers they were never separate from the Beloved. "You are not a drop in the ocean. You are the entire ocean in a drop."

"I have lived on the lip of insanity, wanting to know reasons, knocking on a door. It opens. I've been knocking from the inside." The seeking ends when we realize we are what we sought. The lover and Beloved were always one.

"Lovers don't finally meet somewhere. They're in each other all along." This is the final teaching: there is no journey because there is no distance. There is only the eternal embrace.`,
      verses: [
        'rumi-19',     // "You are the entire ocean in a drop"
        'rumi-16',     // "It opens. I've been knocking from the inside"
        'rumi-22',     // "Lovers don't finally meet somewhere"
        'cob-26',      // "They saw themselves—thirty birds, si-morgh"
      ],
      reflectionQuestions: [
        'Have you ever sensed that seeker and sought are one?',
        'What would life look like lived from this recognition?',
        'Can you feel the ocean in the drop that you are?',
      ],
      practice: {
        title: 'Recognizing Union',
        duration: '15 minutes',
        instructions: [
          'Sit quietly and close your eyes.',
          'Feel your longing for the Beloved.',
          'Now feel the Beloved\'s longing for you.',
          'Are these two longings, or one?',
          'The seeker is the sought. The lover is the Beloved.',
          'There is no door to open—you are already inside.',
          'Rest in this recognition.',
          'You have always been home.',
        ],
      },
    },
  ],
};



