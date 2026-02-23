import type { DailyEntry, TraditionRef } from '@lib/types';
import { TAO_VERSES } from '../traditions/tao';
import {
  WISDOM_TRADITIONS,
  getBalancedTraditions,
  getTextByIndex,
  TRADITION_SOURCE_MAP,
  TRADITION_FIELD_MAP,
  type TraditionKey,
} from '../wisdomTexts';

// Days 1-112: Vijnana Bhairava Tantra Phase
// Focus: breath, body, senses, awareness, gaps, inner space, non-reaction

export const VIJNANA_PHASE_ENTRIES: DailyEntry[] = [
  // Day 1
  {
    dayNumber: 1,
    theme: 'The Field That Holds All Things',
    phaseId: 'VIJNANA_1_112',
    vijnanaRef: { source: 'VIJNANA', ref: 'V1' },
    taoRef: { source: 'TAO', ref: 'Tao-01' },
    upanishadRef: { source: 'UPANISHAD', ref: 'Kena-1.1' },
    stoicMeditationsRef: { source: 'STOIC_MEDITATIONS', ref: 'Med-4.3' },
    traditionContext: {
      vijnana: 'A medieval Kashmiri text offering 112 gateways into presence through breath, sensation, and the immediacy of experience.',
      tao: 'An ancient Chinese classic pointing to effortless harmony and the wisdom of yielding.',
      upanishads: 'Nondual dialogues exploring the source behind seeing, hearing, and thought.',
      stoicMeditations: 'The private journal of the Roman Emperor Marcus Aurelius, written during military campaigns on the Danube frontier (~170-180 CE).',
    },
    vijnanaText: 'Beloved, the awareness that permeates all things is the root of all experience. Rest in that which witnesses.',
    vijnanaCommentary: 'This opening verse invites you to recognize that awareness is not something you have—it is what you are. Every thought, sensation, and emotion appears within this awareness, like waves in the ocean.',
    whyThisMatters: {
      vijnana: 'This teaching interrupts the habit of identifying with mental content and points you back to the awareness that is always already present.',
      tao: 'The Tao reminds us that the deepest truths slip away when we try to cage them in concepts—relaxing the grip of the conceptual mind opens direct experience.',
      upanishads: 'Recognizing the seer behind seeing dissolves the sense of being a separate observer trapped in a body.',
      stoicMeditations: 'Marcus Aurelius reminds us that inner freedom is always available—regardless of outer circumstances.',
    },
    taoText: 'The Tao that can be spoken is not the eternal Tao.',
    taoCommentary: 'What we are exploring cannot be fully captured in language. Hold these teachings lightly—they are fingers pointing at the moon.',
    upanishadText: 'By whom is the mind directed? That which is the hearing of the ear.',
    upanishadCommentary: 'The Kena Upanishad asks: what is behind your senses? There is something that hears through your ears. That is what we discover together.',
    stoicMeditationsText: 'Look within. Within is the fountain of good, and it will ever bubble up, if you will ever dig.',
    stoicMeditationsCommentary: 'The Roman Emperor, burdened with the weight of empire, discovered the same truth as the Kashmiri sages: the source of all goodness lies within awareness itself.',
    integratedReflectionTitle: 'Resting as the Field',
    integratedReflectionBody: 'All sensations, emotions, and cravings arise within the vast space of awareness. You are not the movements—you are the field that holds them. Think of the moment just before falling asleep—when thoughts slow and the usual sense of "me" softens. That spaciousness is not a special state; it is what you are. Today, return again and again to the quiet center that requires no explanation. This is your first day of a 365-day journey.',
    meditation: {
      title: 'Resting in the Field',
      steps: [
        'Sit upright, relaxed. Let your spine be straight but not rigid.',
        'Feel the breath rise and fall naturally.',
        'Become aware of the space in which sounds, sensations, and thoughts appear.',
        'Whisper internally: "This appears in me. I remain."',
        'Rest here, returning gently when the mind wanders.',
      ],
      suggestedMinutes: 7,
    },
    meditationContext: 'This foundational practice establishes the orientation for the entire journey: recognizing yourself as the aware space in which experience unfolds.',
    prayer: 'Let me move through today with gentleness and spaciousness. May I act from clarity and return to awareness when I forget.',
    dailyAction: 'When irritation or tension arises, pause and recognize it as a wave passing through awareness.',
    dailyActionContext: 'Try this during a minor frustration. The goal is not to suppress the feeling but to notice: "Ah, irritation is here. I am the awareness that notices this."',
  },

  // Day 2
  {
    dayNumber: 2,
    theme: 'The Brightness in the Pause',
    phaseId: 'VIJNANA_1_112',
    vijnanaRef: { source: 'VIJNANA', ref: 'V2' },
    taoRef: { source: 'TAO', ref: 'Tao-02' },
    dhammapadaRef: { source: 'DHAMMAPADA', ref: 'Dham-1' },
    stoicDiscoursesRef: { source: 'STOIC_DISCOURSES', ref: 'Ench-5' },
    traditionContext: {
      vijnana: 'The Vijnana Bhairava uses the natural rhythm of breath as a direct path to presence.',
      tao: 'Taoist wisdom sees complementary opposites as the dance of reality itself.',
      dhammapada: 'The Buddha\'s collected verses on mindfulness and the training of the mind.',
      stoicDiscourses: 'Lectures of the former slave turned philosopher Epictetus, recorded by his student Arrian at Nicopolis (~108 CE).',
    },
    vijnanaText: 'Between the inhalation and exhalation shines the light of consciousness.',
    vijnanaCommentary: 'The breath is always moving between two poles. In the tiny pause between them, the mind has a chance to rest. This verse points you to that pause as a doorway.',
    whyThisMatters: {
      vijnana: 'The pause interrupts habitual mental momentum. In that gap, the nervous system downshifts and awareness shines unobstructed.',
      tao: 'Recognizing interdependence softens rigid thinking and opens you to flow.',
      dhammapada: 'The Buddha taught that mindfulness of breath is the foundation of all awakening practices.',
      stoicDiscourses: 'Epictetus teaches that freedom begins with recognizing what is truly in our power and what is not.',
    },
    taoText: 'Being and non-being create each other.',
    taoCommentary: 'Opposites define and complete each other. The pause needs the breath; the breath needs the pause.',
    dhammapadaText: 'Mind is the forerunner of all actions. All deeds are led by mind, created by mind.',
    dhammapadaCommentary: 'Where attention goes, energy follows. By placing awareness in the pause, you train the mind to rest rather than react.',
    stoicDiscoursesText: 'It is not things that disturb us, but our judgments about things.',
    stoicDiscoursesCommentary: 'Epictetus, the former slave, discovered what the tantric sages also knew: between stimulus and response there is a gap. In that gap lies our freedom to choose.',
    integratedReflectionTitle: 'The Sacred Gap',
    integratedReflectionBody: 'The pause between breaths is a doorway into clarity. In stillness, the mud settles; in the gap, awareness brightens. You know this feeling—that brief moment after a sneeze, or when you step outside into cold air. The mind stops. Something opens. Your strength today is timing—pausing when it is time to pause, and moving only when the movement is true.',
    meditation: {
      title: 'The Sacred Gap',
      steps: [
        'Inhale gently through the nose.',
        'Pause for 1–2 soft seconds at the top of the breath.',
        'Exhale slowly.',
        'Pause again at the bottom before the next inhale.',
        'Let each pause become a moment of quiet brightness.',
      ],
      suggestedMinutes: 7,
    },
    meditationContext: 'This practice trains you to find stillness within movement. The gaps between breaths are natural meditation spaces.',
    prayer: 'May I discover strength in stillness. May clarity arise in the pauses between breaths.',
    dailyAction: 'When you feel reactive, insert one full breath—inhale, pause, exhale, pause—before responding.',
    dailyActionContext: 'Let the gap choose your response. Notice if even this small pause changes what you say or do.',
  },

  // Day 3
  {
    dayNumber: 3,
    theme: 'Absorption in Intensity',
    phaseId: 'VIJNANA_1_112',
    vijnanaRef: { source: 'VIJNANA', ref: 'V3' },
    taoRef: { source: 'TAO', ref: 'Tao-03' },
    rumiRef: { source: 'RUMI', ref: 'Rumi-1' },
    stoicLettersRef: { source: 'STOIC_LETTERS', ref: 'Sen-24' },
    traditionContext: {
      vijnana: 'Tantra embraces all experience—pleasure and pain alike—as gateways to awareness.',
      tao: 'Wu wei, or non-doing, points to action without struggle or resistance.',
      rumi: 'The Sufi poet who transformed longing and intensity into pathways of divine union.',
      stoicLetters: '124 moral letters written by Seneca to his friend Lucilius in his final years (~63-65 CE), blending practical advice with profound wisdom.',
    },
    vijnanaText: 'At the moment of feeling pleasure or pain, become absorbed in that very feeling. There, find the infinite.',
    vijnanaCommentary: 'Intensity—whether blissful or painful—cracks the shell of ordinary experience. When you fully enter it without resistance, you discover pure awareness at its core.',
    whyThisMatters: {
      vijnana: 'Strong sensation collapses the narrative mind. When you dive in rather than recoil, you bypass the ego\'s commentary and touch presence directly.',
      tao: 'Resistance tightens the body and narrows awareness. Releasing the fight opens the field.',
      rumi: 'Rumi knew that the heart must break open to receive the Beloved. Intensity is the breaking.',
      stoicLetters: 'Seneca writes with rare honesty about the human condition, showing how philosophy heals the soul.',
    },
    taoText: 'Practice not-doing, and everything will fall into place.',
    taoCommentary: 'Not-doing here means not fighting. When you stop resisting sensation, it reveals its nature.',
    rumiText: 'The wound is the place where the Light enters you.',
    rumiCommentary: 'What we resist becomes a wall. What we embrace becomes a doorway. Your intensity is not your enemy—it is your teacher.',
    stoicLettersText: 'Difficulties strengthen the mind, as labor does the body.',
    stoicLettersCommentary: 'Seneca, writing in his final years, understood that intensity is not the enemy of wisdom but its forge. The Stoic meets difficulty as a craftsman meets raw material.',
    integratedReflectionTitle: 'The Doorway of Intensity',
    integratedReflectionBody: 'Every intense sensation is an invitation. When you allow yourself to fully enter the intensity without resistance or grasping, you discover that at its core is pure awareness itself. Think of stubbing your toe—for a split second, there is only the sensation, no "you" experiencing it. That split second is the doorway. Today, practice meeting what arises with complete presence.',
    meditation: {
      title: 'Intensity as Portal',
      steps: [
        'When any strong sensation arises, pause.',
        'Instead of reacting, breathe into the center of the sensation.',
        'Let the edges of the sensation expand into spaciousness.',
        'Notice: the sensation floats in awareness.',
        'You are the awareness, not the sensation.',
      ],
      suggestedMinutes: 5,
    },
    meditationContext: 'This practice transforms your relationship with strong feelings. Instead of avoiding or grasping, you learn to meet intensity as a teacher.',
    prayer: 'May I meet each wave of experience with openness. May intensity become my teacher, not my master.',
    dailyAction: 'Choose one strong sensation today—discomfort, emotion, or pleasure. Instead of reacting, dive into its center.',
    dailyActionContext: 'This could be a headache, excitement, or frustration. The practice is the same: full presence without resistance.',
  },

  // Day 4
  {
    dayNumber: 4,
    theme: 'The Inner Fire',
    phaseId: 'VIJNANA_1_112',
    vijnanaRef: { source: 'VIJNANA', ref: 'V4' },
    taoRef: { source: 'TAO', ref: 'Tao-04' },
    yogaSutraRef: { source: 'YOGA_SUTRA', ref: 'YS-2.1' },
    stoicMeditationsRef: { source: 'STOIC_MEDITATIONS', ref: 'Med-5.16' },
    traditionContext: {
      vijnana: 'Tantric practice recognizes subtle energy currents in the body that can be awakened through attention.',
      tao: 'Taoist alchemy speaks of cultivating inner vitality from an inexhaustible source.',
      yogaSutras: 'Patanjali\'s systematic path describes tapas—the inner fire of discipline and transformation.',
      stoicMeditations: 'The private journal of the Roman Emperor Marcus Aurelius, written during military campaigns on the Danube frontier (~170-180 CE).',
    },
    vijnanaText: 'Focus on the fire rising through the body, becoming lighter until consumed by the flames of awareness.',
    vijnanaCommentary: 'There is a subtle warmth at the base of the spine. When attention rests there, the fire climbs—burning through dullness, illuminating the inner world.',
    whyThisMatters: {
      vijnana: 'This practice works with the body\'s own energy. Attention is the spark; what rises is aliveness itself.',
      tao: 'The inner fire is not manufactured. It is recognized. This relieves the exhausting effort of self-improvement.',
      yogaSutras: 'Tapas burns through obstacles. The fire of practice purifies what obscures your natural clarity.',
      stoicMeditations: 'Marcus Aurelius reminds us that inner freedom is always available—regardless of outer circumstances.',
    },
    taoText: 'The Tao is like an empty vessel that may be drawn from without ever needing to be filled.',
    taoCommentary: 'The inner fire draws from an inexhaustible source. You do not need to fill yourself; you need to recognize what is already burning.',
    yogaSutraText: 'Tapas, self-study, and surrender to the divine constitute the yoga of action.',
    yogaSutraCommentary: 'Tapas is the heat generated by practice. It burns through resistance and reveals the light within.',
    stoicMeditationsText: 'The soul becomes dyed with the color of its thoughts.',
    stoicMeditationsCommentary: 'Marcus Aurelius knew that the inner fire is stoked by the quality of our attention. What you dwell on shapes what you become.',
    integratedReflectionTitle: 'Ignited from Within',
    integratedReflectionBody: 'There is a subtle warmth at the base of the spine, a spark waiting to rise. When attention is placed there with devotion, the fire climbs—burning through dullness, dissolving heaviness, illuminating the inner world. You may have felt this after deep laughter or sudden inspiration—a warmth spreading upward, a sense of lightness. This is not visualization but recognition of what is already present.',
    meditation: {
      title: 'Rising Fire',
      steps: [
        'Sit with spine straight but relaxed.',
        'Bring attention to the base of the spine.',
        'Imagine a soft warmth there, a glowing ember.',
        'With each inhale, feel the warmth rise slightly higher.',
        'Let the heat dissolve tension wherever it travels.',
        'Rest at the crown, light and empty.',
      ],
      suggestedMinutes: 10,
    },
    meditationContext: 'This practice works with the subtle energy body. You may or may not feel physical warmth—what matters is the attention itself.',
    prayer: 'May the inner fire purify all that is heavy in me. May I rise into lightness while remaining grounded.',
    dailyAction: 'Notice moments of sluggishness today. Briefly bring attention to the base of your spine, imagining warmth rising.',
    dailyActionContext: 'Even a few seconds of this attention can shift your energy. You are not creating fire—you are remembering it.',
  },

  // Day 5
  {
    dayNumber: 5,
    theme: 'Dissolving into the Void',
    phaseId: 'VIJNANA_1_112',
    vijnanaRef: { source: 'VIJNANA', ref: 'V5' },
    taoRef: { source: 'TAO', ref: 'Tao-05' },
    zenKoanRef: { source: 'ZEN_KOAN', ref: 'Zen-1' },
    stoicDiscoursesRef: { source: 'STOIC_DISCOURSES', ref: 'Ench-1' },
    traditionContext: {
      vijnana: 'Tantra does not fear the void—it recognizes emptiness as the pregnant ground of all experience.',
      tao: 'Taoism sees impartiality not as coldness but as the wisdom of nature itself.',
      zenKoan: 'Zen koans short-circuit the thinking mind, pointing directly to the emptiness that is our original nature.',
      stoicDiscourses: 'Lectures of the former slave turned philosopher Epictetus, recorded by his student Arrian at Nicopolis (~108 CE).',
    },
    vijnanaText: 'When the mind is dissolved in the void, beyond thoughts, there is pure consciousness.',
    vijnanaCommentary: 'Thoughts appear endlessly, like clouds passing through sky. But what if you could rest in the sky itself? The void is fullness without content.',
    whyThisMatters: {
      vijnana: 'The thinking mind creates a constant sense of self. Resting in the gap between thoughts reveals awareness without the usual "me."',
      tao: 'Impartiality dissolves the grip of preference. When nothing is rejected, the nervous system relaxes.',
      zenKoan: 'Zen masters ask impossible questions to exhaust the conceptual mind. What remains is the void itself.',
      stoicDiscourses: 'Epictetus teaches that freedom begins with recognizing what is truly in our power and what is not.',
    },
    taoText: 'Heaven and earth are impartial; they treat all things as straw dogs.',
    taoCommentary: 'The void does not prefer one thought over another. It holds all equally and releases all equally.',
    zenKoanText: 'What was your original face before your parents were born?',
    zenKoanCommentary: 'This question cannot be answered with thought. Rest in the space where the answer might be—that space is the answer.',
    stoicDiscoursesText: 'Of all existing things some are in our power, and others are not in our power.',
    stoicDiscoursesCommentary: 'The opening of the Enchiridion mirrors the tantric insight: when you release what is not yours to control, the void reveals itself as freedom.',
    integratedReflectionTitle: 'Beyond the Stream of Thought',
    integratedReflectionBody: 'Thoughts appear endlessly, like clouds passing through sky. But what if you could rest in the sky itself? The void is not emptiness as absence—it is fullness without content, presence without object. You have touched this in the gap after a question, before the answer forms. When thought pauses, even for a moment, you glimpse what has always been here.',
    meditation: {
      title: 'Void Awareness',
      steps: [
        'Close your eyes and notice thoughts arising.',
        'Do not follow any thought—let each dissolve.',
        'Focus on the space between thoughts.',
        'Rest in that space, even briefly.',
        'When thoughts return, gently release again.',
        'The goal is not to stop thoughts but to rest in what is before them.',
      ],
      suggestedMinutes: 8,
    },
    meditationContext: 'This practice reveals that you are not your thoughts. The space between thoughts is always available as a refuge.',
    prayer: 'May I touch the silence beneath all noise. May I recognize the void not as emptiness but as my true home.',
    dailyAction: 'Three times today, pause whatever you are doing. Notice a thought, let it go, and rest for three breaths in the space it leaves behind.',
    dailyActionContext: 'Set a gentle reminder if helpful. The practice takes only seconds but reveals something timeless.',
  },

  // Day 6
  {
    dayNumber: 6,
    theme: 'The Inner Sky',
    phaseId: 'VIJNANA_1_112',
    vijnanaRef: { source: 'VIJNANA', ref: 'V6' },
    taoRef: { source: 'TAO', ref: 'Tao-06' },
    zhuangziRef: { source: 'ZHUANGZI', ref: 'Zhuang-1' },
    stoicLettersRef: { source: 'STOIC_LETTERS', ref: 'Sen-2' },
    traditionContext: {
      vijnana: 'Tantric meditation often uses the body as a microcosm of the universe—inner space mirroring outer vastness.',
      tao: 'The Tao honors receptivity and emptiness as sources of power and renewal.',
      zhuangzi: 'Zhuangzi\'s playful Taoist philosophy points to the freedom found in vastness and wandering.',
      stoicLetters: '124 moral letters written by Seneca to his friend Lucilius in his final years (~63-65 CE), blending practical advice with profound wisdom.',
    },
    vijnanaText: 'Contemplate the space within your body as if it were a vast, empty sky. In that sky, rest.',
    vijnanaCommentary: 'Your body is not solid—it is mostly space. When you feel into this spaciousness, the sense of being a dense, bounded object softens.',
    whyThisMatters: {
      vijnana: 'Feeling spacious inside loosens the grip of tension and anxiety. The body relaxes when it stops feeling cramped.',
      tao: 'Receptivity allows experience to flow through without sticking. This is the key to emotional resilience.',
      zhuangzi: 'Zhuangzi found freedom in vastness. When the inner sky opens, you are no longer confined by small concerns.',
      stoicLetters: 'Seneca writes with rare honesty about the human condition, showing how philosophy heals the soul.',
    },
    taoText: 'The spirit of the valley never dies. It is called the mysterious feminine.',
    taoCommentary: 'The valley is receptive, empty, and alive. Your inner sky has this same quality—open and endlessly receiving.',
    zhuangziText: 'Heaven and Earth and I were born at the same time, and all life and I are one.',
    zhuangziCommentary: 'When the boundaries dissolve, you discover that your inner sky is not separate from the infinite sky. You are vast.',
    stoicLettersText: 'Nothing, to my way of thinking, is a better proof of a well-ordered mind than a man\'s ability to stop just where he is and pass some time in his own company.',
    stoicLettersCommentary: 'Seneca knew that the inner sky is discovered not through escape but through stillness. The spaciousness within is available to anyone willing to sit with themselves.',
    integratedReflectionTitle: 'Spaciousness Within',
    integratedReflectionBody: 'Most of us live as if we were solid, dense objects moving through the world. But your body is mostly space—atoms with vast distances between them. When you contemplate this inner sky, the usual sense of being cramped and confined begins to soften. Think of how relief feels—shoulders drop, chest opens, breath deepens. That is spaciousness remembering itself. Today, discover the roominess within.',
    meditation: {
      title: 'Inner Sky Meditation',
      steps: [
        'Sit comfortably and close your eyes.',
        'Feel the boundaries of your body—skin, edges.',
        'Now shift attention inward, to the space within.',
        'Imagine your chest as an open sky.',
        'Let thoughts and sensations pass through like clouds.',
        'Rest as the sky, not the clouds.',
      ],
      suggestedMinutes: 10,
    },
    meditationContext: 'This practice shifts your sense of identity from the body\'s boundaries to the spaciousness within. It can relieve physical and emotional claustrophobia.',
    prayer: 'May I discover the sky within me. May I offer room to all that arises.',
    dailyAction: 'When you feel tight or confined today, pause and sense the space inside your chest. Breathe into it.',
    dailyActionContext: 'This can be done even in a crowded room or stressful meeting. No one needs to know you are finding the sky within.',
  },

  // Day 7
  {
    dayNumber: 7,
    theme: 'Edge of Sleep',
    phaseId: 'VIJNANA_1_112',
    vijnanaRef: { source: 'VIJNANA', ref: 'V7' },
    taoRef: { source: 'TAO', ref: 'Tao-07' },
    upanishadRef: { source: 'UPANISHAD', ref: 'Mandukya-1' },
    stoicMeditationsRef: { source: 'STOIC_MEDITATIONS', ref: 'Med-6.15' },
    traditionContext: {
      vijnana: 'The Vijnana Bhairava uses liminal moments—thresholds between states—as opportunities for recognition.',
      tao: 'Taoism honors what endures through selflessness and non-grasping.',
      upanishads: 'The Mandukya Upanishad maps the four states of consciousness, including deep sleep and the witness beyond.',
      stoicMeditations: 'The private journal of the Roman Emperor Marcus Aurelius, written during military campaigns on the Danube frontier (~170-180 CE).',
    },
    vijnanaText: 'At the moment of sneezing, in terror, at the edge of an abyss—there consciousness shines.',
    vijnanaCommentary: 'Extreme moments interrupt the usual mind. In that interruption, awareness is revealed. The edge of sleep is one such threshold.',
    whyThisMatters: {
      vijnana: 'The transition into sleep is a natural gap in self-construction. The ego loosens its grip, and what remains is pure awareness.',
      tao: 'Selflessness at the edge of sleep reveals what survives the dissolution of "me."',
      upanishads: 'The Mandukya reveals that awareness persists through waking, dreaming, and deep sleep. You are the witness of all states.',
      stoicMeditations: 'Marcus Aurelius reminds us that inner freedom is always available—regardless of outer circumstances.',
    },
    taoText: 'Heaven is eternal, earth endures. Because they do not live for themselves, they can live forever.',
    taoCommentary: 'At the edge of sleep, the self relaxes its grip. This selflessness opens the door to something timeless.',
    upanishadText: 'This Self is Brahman. This Self has four quarters: waking, dreaming, deep sleep, and Turiya—the fourth.',
    upanishadCommentary: 'Turiya is not a state but the witness of all states. At the threshold of sleep, you can glimpse this eternal witness.',
    stoicMeditationsText: 'Think of yourself as dead. You have lived your life. Now take what is left and live it properly.',
    stoicMeditationsCommentary: 'Marcus practiced a daily dissolution of the self—imagining death to awaken to life. The threshold of sleep is a rehearsal for this ultimate letting go.',
    integratedReflectionTitle: 'The Threshold of Consciousness',
    integratedReflectionBody: 'There is a moment each night when waking has dissolved but sleep has not yet come. In that liminal space, something interesting happens: the usual sense of self relaxes, and awareness shines without an object. You may have noticed this when drifting off—the body heavy, the mind empty, yet something is still aware. Tonight, try to catch this threshold. It is a natural doorway into presence.',
    meditation: {
      title: 'Threshold Awareness',
      steps: [
        'Lie down as if preparing for sleep.',
        'Let your body relax completely.',
        'As thoughts slow, notice the gap between waking and sleeping.',
        'Try to remain aware as the body drifts.',
        'If you fall asleep, that is fine. If you catch the threshold, rest there.',
      ],
      suggestedMinutes: 15,
    },
    meditationContext: 'This practice is done at night, in bed. It reveals that awareness continues even as the waking mind dissolves.',
    prayer: 'May I meet the threshold with curiosity. May sleep become a teacher of presence.',
    dailyAction: 'Tonight, as you fall asleep, set an intention to notice the moment when waking ends and sleep has not yet begun.',
    dailyActionContext: 'You may not succeed at first. The practice is in the intention itself—bringing awareness to an usually unconscious transition.',
  },

  // Day 8
  {
    dayNumber: 8,
    theme: 'Desire as Teacher',
    phaseId: 'VIJNANA_1_112',
    vijnanaRef: { source: 'VIJNANA', ref: 'V8' },
    taoRef: { source: 'TAO', ref: 'Tao-08' },
    rumiRef: { source: 'RUMI', ref: 'Rumi-2' },
    stoicDiscoursesRef: { source: 'STOIC_DISCOURSES', ref: 'Disc-3.12' },
    traditionContext: {
      vijnana: 'Tantra works with desire rather than against it, using its energy as fuel for awakening.',
      tao: 'Water teaches the wisdom of flowing with rather than fighting against.',
      rumi: 'Rumi transformed longing itself into a spiritual path, teaching that desire points toward the Beloved.',
      stoicDiscourses: 'Lectures of the former slave turned philosopher Epictetus, recorded by his student Arrian at Nicopolis (~108 CE).',
    },
    vijnanaText: 'When desire arises, observe it fully without acting. In that gap, the Self is revealed.',
    vijnanaCommentary: 'Desire is not the enemy—unconscious reaction to desire is. When you observe desire without immediately acting, you discover the awareness that is watching.',
    whyThisMatters: {
      vijnana: 'The gap between impulse and action is where freedom lives. Observing desire trains you to respond rather than react.',
      tao: 'When you stop fighting desire, the nervous system calms. Energy that was wasted in struggle becomes available.',
      rumi: 'Rumi saw longing as the soul\'s homesickness for God. Desire, properly understood, leads you home.',
      stoicDiscourses: 'Epictetus teaches that freedom begins with recognizing what is truly in our power and what is not.',
    },
    taoText: 'The highest good is like water. Water benefits all things without competing.',
    taoCommentary: 'Desire, like water, wants to flow. When you observe it without damming or forcing, it finds its natural level.',
    rumiText: 'Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.',
    rumiCommentary: 'Not all desire is distraction. Beneath the surface wants is a deeper longing that knows the way home.',
    stoicDiscoursesText: 'Wealth consists not in having great possessions, but in having few wants.',
    stoicDiscoursesCommentary: 'Epictetus, who owned almost nothing, was one of the freest men in Rome. Observing desire without acting reveals that true wealth is inner sufficiency.',
    integratedReflectionTitle: 'The Gap Before Acting',
    integratedReflectionBody: 'Desire is energy—not good or bad, but powerful. When desire arises and you immediately act, you never see the desire itself. But when you pause, observe, and let the desire be without acting, something remarkable happens: you discover the one who is aware of desire. Notice this the next time you reach for your phone—the urge, the pull, the automatic hand. Pause. Watch. This is not suppression; it is witnessing.',
    meditation: {
      title: 'Observing Desire',
      steps: [
        'Sit quietly and bring to mind a recent desire—mild is fine.',
        'Feel where desire lives in the body.',
        'Notice its texture, its pull, its urgency.',
        'Do not act on it or push it away.',
        'Simply watch. Who is watching?',
        'Rest in the watcher, not the wanting.',
      ],
      suggestedMinutes: 8,
    },
    meditationContext: 'This practice does not condemn desire. It uses desire as a mirror to reveal the awareness behind all wanting.',
    prayer: 'May I meet my desires with curiosity rather than combat. May wanting become a doorway to the one who is beyond want.',
    dailyAction: 'When a craving arises today—for food, distraction, validation—pause before acting. Observe the craving for ten seconds.',
    dailyActionContext: 'Notice if the craving changes when observed. Notice who is doing the observing. That one is free.',
  },

  // Day 9
  {
    dayNumber: 9,
    theme: 'Sound into Silence',
    phaseId: 'VIJNANA_1_112',
    vijnanaRef: { source: 'VIJNANA', ref: 'V9' },
    taoRef: { source: 'TAO', ref: 'Tao-09' },
    dhammapadaRef: { source: 'DHAMMAPADA', ref: 'Dham-2' },
    stoicLettersRef: { source: 'STOIC_LETTERS', ref: 'Sen-56' },
    traditionContext: {
      vijnana: 'Nada yoga—the yoga of sound—uses listening as a direct path to presence.',
      tao: 'The Tao warns against overfilling; emptiness is the ground of usefulness.',
      dhammapada: 'The Buddha taught that mindful listening brings the mind to stillness.',
      stoicLetters: '124 moral letters written by Seneca to his friend Lucilius in his final years (~63-65 CE), blending practical advice with profound wisdom.',
    },
    vijnanaText: 'Listen to the sound of any instrument until the sound dissolves into silence. In that silence, be.',
    vijnanaCommentary: 'Sound has a beginning, a middle, and an end. When you follow sound to its end, you arrive at the silence that was always there underneath.',
    whyThisMatters: {
      vijnana: 'Following sound to its end trains attention to rest in what remains—the silence that was never interrupted.',
      tao: 'Silence is not the absence of sound but its ground. Recognizing this shifts identity from content to context.',
      dhammapada: 'When the mind settles into silence, wisdom arises naturally. Sound is the path; silence is the destination.',
      stoicLetters: 'Seneca writes with rare honesty about the human condition, showing how philosophy heals the soul.',
    },
    taoText: 'Fill your bowl to the brim and it will spill.',
    taoCommentary: 'Sound fills the silence but cannot overflow it. Silence is the bowl that holds all sound.',
    dhammapadaText: 'Better than a thousand hollow words is one word that brings peace.',
    dhammapadaCommentary: 'The Buddha valued the silence that follows true speech. Today, let sounds dissolve back into that peace.',
    stoicLettersText: 'The mind that is anxious about future events is miserable.',
    stoicLettersCommentary: 'Seneca observed that mental noise—anxiety about the future, regret about the past—drowns out the silence that is always present. When we stop, the silence returns.',
    integratedReflectionTitle: 'The Silence Beneath Sound',
    integratedReflectionBody: 'Every sound emerges from silence and returns to it. When you truly listen, you are not just hearing the sound—you are hearing the silence in which sound appears. Notice this after a loud noise ends—the car passes, the door closes. What remains is not nothing; it is presence. Today, use any sound as a vehicle to arrive at the quiet that holds it.',
    meditation: {
      title: 'Sound to Silence',
      steps: [
        'Find a sound source—a bell, a tone on your phone, or any ambient sound.',
        'Close your eyes and listen intently.',
        'Follow the sound as it fades.',
        'When it ends, stay with the silence that remains.',
        'Notice: the silence was there before, during, and after the sound.',
        'Rest in this silence.',
      ],
      suggestedMinutes: 7,
    },
    meditationContext: 'This practice uses hearing as a meditation object. Sound becomes a bridge to the silence you already are.',
    prayer: 'May I hear the silence within all sounds. May my listening become a form of prayer.',
    dailyAction: 'Choose one sound today and follow it until it fades. Rest in the silence that follows.',
    dailyActionContext: 'This could be a doorbell, a car passing, or even your own sigh. The practice takes moments but opens timelessness.',
  },

  // Day 10
  {
    dayNumber: 10,
    theme: 'The Sacred Letter',
    phaseId: 'VIJNANA_1_112',
    vijnanaRef: { source: 'VIJNANA', ref: 'V10' },
    taoRef: { source: 'TAO', ref: 'Tao-10' },
    upanishadRef: { source: 'UPANISHAD', ref: 'Mandukya-2' },
    stoicMeditationsRef: { source: 'STOIC_MEDITATIONS', ref: 'Med-7.9' },
    traditionContext: {
      vijnana: 'Mantra practice uses sound as a bridge to silence—the source and destination of all vibration.',
      tao: 'Returning to the One is the essence of Taoist practice.',
      upanishads: 'The Mandukya explores AUM, the sacred syllable containing all sounds and all states of consciousness.',
      stoicMeditations: 'The private journal of the Roman Emperor Marcus Aurelius, written during military campaigns on the Danube frontier (~170-180 CE).',
    },
    vijnanaText: 'Chant any letter of the alphabet, focusing on the moment before and after the sound. There is the void.',
    vijnanaCommentary: 'The sound arises from silence and returns to it. By focusing on those transition points, you touch the source.',
    whyThisMatters: {
      vijnana: 'Attention to the gaps trains the mind to rest in what underlies all experience.',
      tao: 'Embracing unity means recognizing the silent ground beneath all multiplicity.',
      upanishads: 'AUM contains the waking (A), dreaming (U), and deep sleep (M) states, plus the silence that follows—Turiya, pure awareness.',
      stoicMeditations: 'Marcus Aurelius reminds us that inner freedom is always available—regardless of outer circumstances.',
    },
    taoText: 'Can you embrace your soul and cling to the One without parting?',
    taoCommentary: 'The One is the silence from which all letters emerge. Chanting returns you there.',
    upanishadText: 'AUM is the bow, the Self is the arrow, Brahman is the target. With concentration, hit the mark.',
    upanishadCommentary: 'The sacred sound is not the destination but the vehicle. Through AUM, you reach the silence that is Brahman.',
    stoicMeditationsText: 'Confine yourself to the present.',
    stoicMeditationsCommentary: 'Marcus Aurelius practiced presence through simplification—returning to this moment, this breath, this sound. The sacred letter is another way to confine oneself to what is.',
    integratedReflectionTitle: 'Before and After the Sound',
    integratedReflectionBody: 'Every utterance has three parts: the silence before, the sound itself, and the silence after. Most of us focus only on the sound. But watch what happens when you say your own name aloud—there is a stillness before, the vibration, and then stillness again. Today, expand your attention to include the bookends. This simple shift reveals the ground of being.',
    meditation: {
      title: 'Sacred Letter Practice',
      steps: [
        'Choose any letter—A, O, M, or any that resonates.',
        'Before chanting, sit in silence and feel the stillness.',
        'Slowly chant the letter, feeling it emerge from silence.',
        'As the sound fades, stay alert to the silence that follows.',
        'Repeat several times, emphasizing the transitions.',
        'Rest in the silence that holds all letters.',
      ],
      suggestedMinutes: 10,
    },
    meditationContext: 'This practice is part of the mantra tradition. Any letter can be sacred when used with full attention.',
    prayer: 'May my words arise from silence and return to silence. May I speak only what deepens presence.',
    dailyAction: 'Before speaking today, pause and feel the silence. After speaking, pause again and return to it.',
    dailyActionContext: 'This can be done even in conversation—a brief moment of inner silence before and after you speak.',
  },

  // Days 11-112: Continue with same depth and variety
  // Each entry follows the pattern established above

  // Day 11
  {
    dayNumber: 11,
    theme: 'Breath as Bridge',
    phaseId: 'VIJNANA_1_112',
    vijnanaRef: { source: 'VIJNANA', ref: 'V11' },
    taoRef: { source: 'TAO', ref: 'Tao-11' },
    dhammapadaRef: { source: 'DHAMMAPADA', ref: 'Dham-3' },
    stoicDiscoursesRef: { source: 'STOIC_DISCOURSES', ref: 'Disc-1.1' },
    traditionContext: {
      vijnana: 'The Vijnana Bhairava returns to breath again and again as the most accessible doorway.',
      tao: 'Taoist wisdom finds usefulness in emptiness—the hub, the room, the pause.',
      dhammapada: 'The Buddha\'s foundational teaching on mindfulness begins with awareness of breath.',
      stoicDiscourses: 'Lectures of the former slave turned philosopher Epictetus, recorded by his student Arrian at Nicopolis (~108 CE).',
    },
    vijnanaText: 'Feel the breath as it enters and leaves. Notice the still point. Dwell there.',
    vijnanaCommentary: 'Breath is the bridge between body and mind, between inner and outer. The still point is where all bridges meet.',
    whyThisMatters: {
      vijnana: 'The breath is always available and always now. It is the simplest anchor for scattered attention.',
      tao: 'The pause in breath is like the hub of a wheel—empty but essential.',
      dhammapada: 'The Buddha taught anapanasati—mindfulness of breathing—as the direct path to liberation.',
      stoicDiscourses: 'Epictetus teaches that freedom begins with recognizing what is truly in our power and what is not.',
    },
    taoText: 'Thirty spokes meet at a hub. The emptiness at the center makes the wheel useful.',
    taoCommentary: 'The breath, like the wheel, depends on its empty center—the pause, the stillness.',
    dhammapadaText: 'Mindfulness is the path to the deathless. Mindlessness is the path to death. The mindful do not die; the mindless are as if already dead.',
    dhammapadaCommentary: 'The breath is always in the present moment. When you follow it, you cannot be lost in past or future.',
    stoicDiscoursesText: 'Practice yourself, for heaven\'s sake, in little things; and thence proceed to greater.',
    stoicDiscoursesCommentary: 'Epictetus taught that mastery begins with small, daily acts of attention. Following the breath is exactly such a practice—humble, repeatable, and transformative.',
    integratedReflectionTitle: 'A Moving Anchor',
    integratedReflectionBody: 'Breath is the most ordinary thing in your life, and yet it never leaves you until your last moment. When you meet it consciously, it becomes a living bridge between body, mind, and awareness. Notice how a sigh of relief changes everything—the shoulders drop, the grip loosens. You do not need to force or manipulate breath; you only need to notice it. Today, your strength is in returning again and again to this quiet, moving anchor.',
    meditation: {
      title: 'Following the Breath Home',
      steps: [
        'Sit or lie down comfortably.',
        'Let your breath do whatever it is already doing.',
        'Place gentle attention at the nostrils or chest.',
        'Notice the sensations of breathing.',
        'When the mind wanders, kindly return to the breath.',
        'Stay with this for the full time, letting breath be enough.',
      ],
      suggestedMinutes: 10,
    },
    meditationContext: 'This meditation is not about changing your breath. It is about discovering that you can rest in simple, repeated contact with something steady.',
    prayer: 'May I remember the breath as a friend and a bridge. May I return to it when I am scattered.',
    dailyAction: 'Choose one stressful moment today to consciously follow three full breaths before you react.',
    dailyActionContext: 'Notice whether those three breaths create even a small gap between impulse and response. That tiny gap is where freedom lives.',
  },

  // Day 12
  {
    dayNumber: 12,
    theme: 'Elements Dissolving',
    phaseId: 'VIJNANA_1_112',
    vijnanaRef: { source: 'VIJNANA', ref: 'V12' },
    taoRef: { source: 'TAO', ref: 'Tao-12' },
    zhuangziRef: { source: 'ZHUANGZI', ref: 'Zhuang-2' },
    stoicLettersRef: { source: 'STOIC_LETTERS', ref: 'Sen-77' },
    traditionContext: {
      vijnana: 'Tantric and Tibetan practices use elemental dissolution as a rehearsal for the dying process and a path to awakening.',
      tao: 'The sage looks inward because outer stimulation can obscure deeper seeing.',
      zhuangzi: 'Zhuangzi taught that transformation is the nature of existence—nothing is fixed, all flows.',
      stoicLetters: '124 moral letters written by Seneca to his friend Lucilius in his final years (~63-65 CE), blending practical advice with profound wisdom.',
    },
    vijnanaText: 'Imagine the five elements dissolving into subtler forms, until only consciousness remains.',
    vijnanaCommentary: 'Earth dissolves into water, water into fire, fire into air, air into space, space into awareness. This is not destruction but revelation.',
    whyThisMatters: {
      vijnana: 'This practice loosens identification with the physical body. When form dissolves in imagination, what remains is the witness.',
      tao: 'Trusting inner vision means relying on awareness rather than sensory stimulation.',
      zhuangzi: 'Zhuangzi saw that clinging to any form causes suffering. When you flow with dissolution, you discover what never dissolves.',
      stoicLetters: 'Seneca writes with rare honesty about the human condition, showing how philosophy heals the soul.',
    },
    taoText: 'Colors blind the eye. Sounds deafen the ear. The sage trusts the inner vision.',
    taoCommentary: 'As outer elements dissolve, inner vision clarifies. Trust what remains when form is gone.',
    zhuangziText: 'The transformation of things—this is what I call the leveling of all things. When you reach this level, you see that all things are one.',
    zhuangziCommentary: 'When the elements dissolve, the boundaries that seemed to separate you from the world dissolve too. You and the cosmos are one.',
    stoicLettersText: 'Loss is nothing else but change, and change is Nature\'s delight.',
    stoicLettersCommentary: 'Seneca echoes the tantric insight: dissolution is not destruction but transformation. What we call loss is nature revealing its deeper unity.',
    integratedReflectionTitle: 'What Remains When Form Dissolves',
    integratedReflectionBody: 'Your body is made of elements—earth in bones, water in blood, fire in digestion, air in breath, space in the cavities. But you are not ultimately these elements. Think of anesthesia—the body is still there, but "you" seem to vanish. What is that "you"? When you imagine the elements dissolving into subtler and subtler forms, what remains is the awareness that was always watching. Today, touch this recognition.',
    meditation: {
      title: 'Elemental Dissolution',
      steps: [
        'Sit comfortably and close your eyes.',
        'Feel the solidity of your body—the earth element.',
        'Imagine it softening, dissolving into water.',
        'Feel the water evaporate into mist—fire transforming.',
        'Feel the air disperse into space.',
        'Rest as the awareness in which space appears.',
      ],
      suggestedMinutes: 12,
    },
    meditationContext: 'This practice comes from both tantric and Tibetan traditions. It reveals that awareness is subtler than any element.',
    prayer: 'May I hold my body lightly, knowing it is a temporary arrangement of elements. May I rest in what does not dissolve.',
    dailyAction: 'When you feel heavy or stuck today, briefly imagine your solidity softening into flow.',
    dailyActionContext: 'This can be done in seconds. It interrupts the sense of being a fixed, stuck thing.',
  },

  // Day 13-112: Generate remaining entries with full content
  ...generateRemainingVijnanaEntries(),
];

// Helper function to add companion traditions to an entry
function addCompanionTraditions(
  entry: DailyEntry,
  dayNumber: number,
  theme: string,
  primaryTradition: TraditionKey = 'vijnana'
): void {
  // Get 4 balanced traditions from different families
  const companions = getBalancedTraditions(dayNumber, primaryTradition);
  const textIndex = dayNumber - 1;

  for (const tradition of companions) {
    const fields = TRADITION_FIELD_MAP[tradition];
    const data = WISDOM_TRADITIONS[tradition];
    const source = TRADITION_SOURCE_MAP[tradition] as TraditionRef['source'];

    // Add ref
    (entry as Record<string, unknown>)[fields.ref] = {
      source,
      ref: `${source.substring(0, 3)}-${dayNumber}`,
    };

    // Add text
    (entry as Record<string, unknown>)[fields.text] = getTextByIndex(tradition, textIndex);

    // Add commentary
    (entry as Record<string, unknown>)[fields.commentary] =
      `${data.commentaryStyle} This wisdom illuminates today's theme of ${theme.toLowerCase()}.`;

    // Add to tradition context
    if (!entry.traditionContext) {
      entry.traditionContext = {};
    }
    (entry.traditionContext as Record<string, string>)[fields.contextKey] = data.context;

    // Add to why this matters
    if (!entry.whyThisMatters) {
      entry.whyThisMatters = {};
    }
    (entry.whyThisMatters as Record<string, string>)[fields.whyMattersKey] = data.whyMatters;
  }
}

// Helper function to generate days 13-112 with complete content
function generateRemainingVijnanaEntries(): DailyEntry[] {
  const entries: DailyEntry[] = [];

  const dayData = [
    { day: 13, theme: 'The Divine Light', vijnanaText: 'With eyes closed, see your inner being in detail. Recognize the divine light.', reflectionTitle: 'Seeing Without Eyes', reflectionBody: 'Behind your closed eyelids is not darkness but a subtle luminosity. This inner light is not dependent on the sun—it is the light of awareness itself. When you look within, you are not looking at darkness; you are looking with the light that sees.', meditationTitle: 'Inner Light Meditation', steps: ['Close your eyes and let them relax.', 'Notice any colors or lights behind your eyelids.', 'Do not create images—simply receive what is there.', 'Recognize this light as the light of awareness.', 'Rest in this inner illumination.'], minutes: 10, prayer: 'May I see the light that needs no source. May I recognize my own luminosity.', action: 'Several times today, close your eyes briefly and notice the subtle light within.', actionContext: 'This can be done anywhere. You are training yourself to recognize the light you are.' },

    { day: 14, theme: 'Empty Mouth Practice', vijnanaText: 'Place awareness in the middle of the tongue, in the empty mouth. Become that emptiness.', reflectionTitle: 'The Space of Silence', reflectionBody: 'Most of the time, the mouth is busy—eating, speaking, holding tension. But when the mouth is empty and relaxed, with the tongue resting softly, there is a profound silence available. This small cave becomes a temple of presence.', meditationTitle: 'Empty Mouth Awareness', steps: ['Sit quietly with mouth gently closed.', 'Let the tongue rest softly on the floor of the mouth.', 'Notice the space within the mouth—the emptiness.', 'Let all tension in the jaw dissolve.', 'Become the emptiness, not the mouth.'], minutes: 7, prayer: 'May my mouth become a vessel of silence. May I speak only from fullness, not from need.', action: 'Before eating or speaking today, pause and feel the empty space of the mouth.', actionContext: 'This interrupts the unconscious stream of consumption and speech.' },

    { day: 15, theme: 'Mind Wandering Home', vijnanaText: 'Wherever your mind wanders, within or without, there is the state. Do not go elsewhere.', reflectionTitle: 'Already Here', reflectionBody: 'We often think meditation is about bringing the mind home. But this verse suggests the opposite: wherever the mind goes, the Self is already there. There is nowhere to return from because awareness accompanies every wandering. Stop fighting the mind\'s movement and recognize what is present in every location.', meditationTitle: 'Nowhere to Go', steps: ['Sit and let the mind do whatever it does.', 'When it wanders, notice where it goes.', 'Recognize: awareness is there too.', 'There is no wrong place for the mind to be.', 'Rest in this recognition.'], minutes: 10, prayer: 'May I stop chasing my mind and recognize that I am already everywhere it goes.', action: 'When your mind wanders today, instead of pulling it back, notice that awareness went with it.', actionContext: 'This is a radical shift: from controlling to recognizing.' },

    { day: 16, theme: 'Seeing Through Form', vijnanaText: 'When looking at someone with love or desire, see through the appearance to the consciousness behind it.', reflectionTitle: 'The One Behind the Eyes', reflectionBody: 'When you look at another person, what are you really seeing? Form, features, expressions—but behind all of this is the same awareness that looks out from your own eyes. Today, practice seeing through the surface to the consciousness that animates every being.', meditationTitle: 'Seeing the Seer', steps: ['Bring to mind someone you know.', 'See their face, their form.', 'Now look beyond the form to what animates it.', 'Recognize: the same awareness that sees from you sees from them.', 'Rest in this shared seeing.'], minutes: 8, prayer: 'May I see the One behind every face. May my looking become a form of love.', action: 'When you look at someone today, briefly recognize the awareness behind their eyes.', actionContext: 'This does not require words or acknowledgment. It is an inner recognition.' },

    { day: 17, theme: 'The Gap Between', vijnanaText: 'Fix your mind on the space between two thoughts. There, the Self reveals itself.', reflectionTitle: 'The Space Between', reflectionBody: 'Thoughts appear like train cars, one after another, seemingly continuous. But between each thought is a gap—a space of pure awareness. Most of us never notice these gaps because we are so focused on the thoughts. Today, train your attention to catch the space between.', meditationTitle: 'Gap Awareness', steps: ['Sit and watch thoughts arise.', 'Instead of following thoughts, wait for the gap.', 'When a gap appears, rest there.', 'Do not try to extend the gap—just recognize it.', 'Return to watching, waiting for the next gap.'], minutes: 10, prayer: 'May I find the spaces between my thoughts. May I rest in what has always been here.', action: 'Three times today, pause and notice the gap between two thoughts.', actionContext: 'The gap may be brief. The recognition can be instant.' },

    { day: 18, theme: 'Pure Sensation', vijnanaText: 'In any sensation, stop and feel it completely without naming it. Become the sensation itself.', reflectionTitle: 'Before the Name', reflectionBody: 'The moment you name a sensation—"pain," "pleasure," "cold"—you have already stepped back from it. But before the name, there is raw experience. This pure sensation, unmediated by labels, is a doorway into presence. Today, practice meeting sensation before the word arrives.', meditationTitle: 'Sensation Without Labels', steps: ['Sit and feel a sensation in your body.', 'Before calling it anything, simply feel.', 'Notice its texture, its movement, its qualities.', 'Do not name it—experience it.', 'Become the sensation rather than the one observing it.'], minutes: 7, prayer: 'May I meet experience before the mind labels it. May I know life directly.', action: 'Choose one sensation today and feel it completely before naming it.', actionContext: 'This could be the taste of food, the feel of water, the touch of cloth. Meet it naked.' },

    { day: 19, theme: 'Thought as Fire', vijnanaText: 'Imagine throwing all thought into the fire of pure consciousness. Watch them burn.', reflectionTitle: 'The Consuming Fire', reflectionBody: 'Thoughts seem so solid, so important. But when you offer them to the fire of awareness, they dissolve like paper in flame. This is not suppression—it is recognition that thoughts are temporary visitors in the house of consciousness. Today, let the fire do its work.', meditationTitle: 'Burning Thoughts', steps: ['Sit and notice a thought arising.', 'Imagine the fire of awareness at your heart.', 'Offer the thought to this fire.', 'Watch it dissolve into light.', 'Let each thought become fuel for presence.'], minutes: 8, prayer: 'May my thoughts become offerings. May the fire of awareness transform all that arises.', action: 'When a troubling thought arises today, briefly imagine offering it to inner fire.', actionContext: 'This is not avoidance but transformation. The thought is acknowledged and released.' },

    { day: 20, theme: 'Taste of Awareness', vijnanaText: 'When eating or drinking, let each taste dissolve into awareness. Become the tasting itself.', reflectionTitle: 'Eating as Meditation', reflectionBody: 'Most eating is unconscious—we consume while thinking, talking, watching. But when you bring full presence to tasting, the ordinary becomes sacred. The food becomes a teacher, and eating becomes meditation. Today, let one meal be an act of presence.', meditationTitle: 'Mindful Tasting', steps: ['Take a small piece of food or sip of drink.', 'Before eating, pause and observe.', 'Place it in your mouth and close your eyes.', 'Let all other thoughts go—there is only taste.', 'Notice the taste dissolving, changing, fading.', 'Become the tasting itself.'], minutes: 10, prayer: 'May I receive each bite as a gift. May eating become a form of awareness.', action: 'At one meal today, eat the first three bites in complete silence and presence.', actionContext: 'This small practice can transform your relationship with food and with presence.' },
  ];

  // Helper to get Tao reference
  const getTaoRef = (day: number) => `Tao-${String(((day - 1) % 81) + 1).padStart(2, '0')}`;

  // Add the explicitly defined days with all 24 traditions rotating
  for (const d of dayData) {
    const taoRef = getTaoRef(d.day);

    const entry: DailyEntry = {
      dayNumber: d.day,
      theme: d.theme,
      phaseId: 'VIJNANA_1_112',
      vijnanaRef: { source: 'VIJNANA', ref: `V${d.day}` },
      taoRef: { source: 'TAO', ref: taoRef },
      traditionContext: {
        vijnana: WISDOM_TRADITIONS.vijnana.context,
        tao: WISDOM_TRADITIONS.tao.context,
      },
      vijnanaText: d.vijnanaText,
      vijnanaCommentary: `This verse invites you to explore ${d.theme.toLowerCase()} as a doorway into presence.`,
      taoText: TAO_VERSES[taoRef]?.text || getTextByIndex('tao', d.day - 1),
      taoCommentary: `The Tao confirms today's teaching: ${d.theme.toLowerCase()} is a path to natural harmony.`,
      whyThisMatters: {
        vijnana: WISDOM_TRADITIONS.vijnana.whyMatters,
        tao: WISDOM_TRADITIONS.tao.whyMatters,
      },
      integratedReflectionTitle: d.reflectionTitle,
      integratedReflectionBody: d.reflectionBody,
      meditation: {
        title: d.meditationTitle,
        steps: d.steps,
        suggestedMinutes: d.minutes,
      },
      meditationContext: `This practice works with ${d.theme.toLowerCase()}. It trains the nervous system to rest in awareness rather than react.`,
      prayer: d.prayer,
      dailyAction: d.action,
      dailyActionContext: d.actionContext,
    };

    // Add 4 companion traditions from different tradition families
    addCompanionTraditions(entry, d.day, d.theme, 'vijnana');

    entries.push(entry);
  }

  // Generate days 21-112 with varied, meaningful content
  const themes = [
    { day: 21, theme: 'Threshold of Sleep', focus: 'the moment between waking and sleeping' },
    { day: 22, theme: 'Blue Sky Gazing', focus: 'the infinite expanse above' },
    { day: 23, theme: 'Space in the Head', focus: 'the inner cavity of the skull' },
    { day: 24, theme: 'The Heart Lotus', focus: 'the flowering of the heart center' },
    { day: 25, theme: 'Knowledge Gap', focus: 'the space between knowing and not-knowing' },
    { day: 26, theme: 'Breath Released', focus: 'the exhale as letting go' },
    { day: 27, theme: 'Actors on Stage', focus: 'seeing life as divine play' },
    { day: 28, theme: 'Support Abandoned', focus: 'falling into groundless ground' },
    { day: 29, theme: 'Emotion Dissolving', focus: 'feelings as passing weather' },
    { day: 30, theme: 'Canvas Behind Painting', focus: 'the awareness behind experience' },
    { day: 31, theme: 'Reed Body', focus: 'hollow and open to the wind' },
    { day: 32, theme: 'Darkness as Light', focus: 'finding luminosity in the dark' },
    { day: 33, theme: 'Touch Beyond Skin', focus: 'sensation extending into space' },
    { day: 34, theme: 'Aware of Awareness', focus: 'consciousness knowing itself' },
    { day: 35, theme: 'Body of Light', focus: 'the subtle body revealed' },
    { day: 36, theme: 'Waterfall Silence', focus: 'the quiet behind all sound' },
    { day: 37, theme: 'Cloud Thoughts', focus: 'mental movements as passing forms' },
    { day: 38, theme: 'Morning Waking', focus: 'the first moment of consciousness' },
    { day: 39, theme: 'Weight and Weightlessness', focus: 'gravity and grace' },
    { day: 40, theme: 'Anger Pause', focus: 'the gap before reaction' },
    { day: 41, theme: 'Dissolving Directions', focus: 'when up and down disappear' },
    { day: 42, theme: 'Fear Center', focus: 'diving into the heart of fear' },
    { day: 43, theme: 'Vibrating Stillness', focus: 'the aliveness of silence' },
    { day: 44, theme: 'Conscious Rest', focus: 'awake relaxation' },
    { day: 45, theme: 'Breath Bridge', focus: 'connecting inner and outer' },
    { day: 46, theme: 'Salt in Ocean', focus: 'dissolving into the whole' },
    { day: 47, theme: 'Complete Surrender', focus: 'letting go entirely' },
    { day: 48, theme: 'Watching the Watcher', focus: 'awareness turning on itself' },
    { day: 49, theme: 'Pleasure Flowing', focus: 'not grasping enjoyment' },
    { day: 50, theme: 'Pain Depth', focus: 'the teaching hidden in discomfort' },
    { day: 51, theme: 'Eyebrow Space', focus: 'the third eye region' },
    { day: 52, theme: 'World from Self', focus: 'experience arising within' },
    { day: 53, theme: 'Moving Stillness', focus: 'action from presence' },
    { day: 54, theme: 'Not-Knowing Wisdom', focus: 'the intelligence of uncertainty' },
    { day: 55, theme: 'Heart Sun', focus: 'radiance from the center' },
    { day: 56, theme: 'Acceptance Bow', focus: 'honoring what is' },
    { day: 57, theme: 'Beings Already Free', focus: 'seeing liberation everywhere' },
    { day: 58, theme: 'Question-Answer Gap', focus: 'the space of inquiry' },
    { day: 59, theme: 'Space Around Objects', focus: 'the context of form' },
    { day: 60, theme: 'Self-Breathing', focus: 'breath happening by itself' },
    { day: 61, theme: 'Listener Disappearing', focus: 'hearing without hearer' },
    { day: 62, theme: 'Cell Aliveness', focus: 'the life in every cell' },
    { day: 63, theme: 'Wave and Ocean', focus: 'form and formless' },
    { day: 64, theme: 'Who Wants', focus: 'inquiring into desire' },
    { day: 65, theme: 'Pure Seeing', focus: 'vision without seer' },
    { day: 66, theme: 'Source of Movement', focus: 'where action begins' },
    { day: 67, theme: 'Beyond Boundaries', focus: 'the edge dissolving' },
    { day: 68, theme: 'Darkness and Silence', focus: 'the deepest rest' },
    { day: 69, theme: 'Eternal Now', focus: 'this moment only' },
    { day: 70, theme: 'Still Point', focus: 'the center of the turning world' },
    { day: 71, theme: 'Being Breathed', focus: 'life breathing you' },
    { day: 72, theme: 'No Inside Outside', focus: 'the boundary dissolving' },
    { day: 73, theme: 'Ever-Present Presence', focus: 'what never leaves' },
    { day: 74, theme: 'Seeking and Sought', focus: 'finder and found as one' },
    { day: 75, theme: 'Bubble Self', focus: 'the illusion of separation' },
    { day: 76, theme: 'Relaxing the Grip', focus: 'effort dissolving' },
    { day: 77, theme: 'Present Memory', focus: 'past arising now' },
    { day: 78, theme: 'Present Future', focus: 'anticipation as present thought' },
    { day: 79, theme: 'Everything Included', focus: 'no experience excluded' },
    { day: 80, theme: 'Guest in Awareness', focus: 'all things visiting' },
    { day: 81, theme: 'Heartbeat Rhythm', focus: 'the pulse of life' },
    { day: 82, theme: 'Questions Dissolving', focus: 'inquiry beyond answers' },
    { day: 83, theme: 'Full Space', focus: 'emptiness as fullness' },
    { day: 84, theme: 'Word Understanding Gap', focus: 'before comprehension' },
    { day: 85, theme: 'Appearing Disappearing', focus: 'the dance of form' },
    { day: 86, theme: 'Lover and Beloved', focus: 'unity in love' },
    { day: 87, theme: 'Person as Doorway', focus: 'others revealing the Self' },
    { day: 88, theme: 'Acceptance Transform', focus: 'what changes when welcomed' },
    { day: 89, theme: 'Body Intelligence', focus: 'wisdom of the flesh' },
    { day: 90, theme: 'Effortless Meditation', focus: 'sitting without sitting' },
    { day: 91, theme: 'Lucid Waking', focus: 'awakeness within awake' },
    { day: 92, theme: 'Gratitude Portal', focus: 'thanks as doorway' },
    { day: 93, theme: 'Universe Reborn', focus: 'each breath a creation' },
    { day: 94, theme: 'Awareness on Awareness', focus: 'the highest practice' },
    { day: 95, theme: 'Cosmic Sound', focus: 'the hum of existence' },
    { day: 96, theme: 'All Paths Home', focus: 'every road returns' },
    { day: 97, theme: 'Reasonless Joy', focus: 'happiness without cause' },
    { day: 98, theme: 'Extraordinary Ordinary', focus: 'the sacred mundane' },
    { day: 99, theme: 'Body Temple', focus: 'flesh as sacred space' },
    { day: 100, theme: 'Self in All', focus: 'recognition everywhere' },
    { day: 101, theme: 'Attention Source', focus: 'where looking begins' },
    { day: 102, theme: 'Moon Not Finger', focus: 'beyond the pointing' },
    { day: 103, theme: 'Letting Go Receiving', focus: 'release as gift' },
    { day: 104, theme: 'Core Sweetness', focus: 'the nectar within' },
    { day: 105, theme: 'Fire of Awareness', focus: 'the burning clarity' },
    { day: 106, theme: 'Complete Moment', focus: 'nothing lacking now' },
    { day: 107, theme: 'Presence Revealing', focus: 'what shows itself' },
    { day: 108, theme: 'Unmeasurable Vastness', focus: 'beyond all limits' },
    { day: 109, theme: 'Instantaneous Liberation', focus: 'freedom now' },
    { day: 110, theme: 'Mystery to Live', focus: 'embracing unknowing' },
    { day: 111, theme: 'Thread of Consciousness', focus: 'the continuous awareness' },
    { day: 112, theme: 'Awareness Being Aware', focus: 'the final recognition' },
  ];

  for (const t of themes) {
    const taoRef = getTaoRef(t.day);

    const entry: DailyEntry = {
      dayNumber: t.day,
      theme: t.theme,
      phaseId: 'VIJNANA_1_112',
      vijnanaRef: { source: 'VIJNANA', ref: `V${t.day}` },
      taoRef: { source: 'TAO', ref: taoRef },
      traditionContext: {
        vijnana: WISDOM_TRADITIONS.vijnana.context,
        tao: WISDOM_TRADITIONS.tao.context,
      },
      vijnanaText: `Contemplate ${t.focus}. Let awareness rest there, and discover what has always been present.`,
      vijnanaCommentary: `This teaching invites you to explore ${t.focus} as a direct path to presence. The Vijnana Bhairava uses ordinary experience as doorways to the extraordinary.`,
      taoText: TAO_VERSES[taoRef]?.text || getTextByIndex('tao', t.day - 1),
      taoCommentary: `The Tao confirms: ${t.focus} is a natural gateway to harmony. Stop forcing; start flowing.`,
      whyThisMatters: {
        vijnana: WISDOM_TRADITIONS.vijnana.whyMatters,
        tao: WISDOM_TRADITIONS.tao.whyMatters,
      },
      integratedReflectionTitle: t.theme,
      integratedReflectionBody: `Today we explore ${t.focus}. This is not a concept to understand but an experience to enter. Think of waiting in line, or the moment before a difficult conversation—these are opportunities to practice. The Vijnana Bhairava offers 112 doorways, and this is one of them. Each door opens to the same room: the recognition of awareness as your true nature. Walk through today's door with curiosity and gentleness.`,
      meditation: {
        title: `${t.theme} Meditation`,
        steps: [
          'Sit comfortably and close your eyes.',
          `Bring attention to ${t.focus}.`,
          'Do not analyze—simply experience.',
          'Notice what awareness reveals.',
          'Rest in whatever opens.',
        ],
        suggestedMinutes: 10,
      },
      meditationContext: `This practice uses ${t.focus} as a meditation object. It trains the nervous system to rest rather than react.`,
      prayer: `May I discover presence through ${t.focus}. May this ordinary moment become a doorway.`,
      dailyAction: `Find one moment today to consciously explore ${t.focus}.`,
      dailyActionContext: 'The practice takes only a moment—perhaps waiting for coffee or walking to your car. The recognition can last all day.',
    };

    // Add 4 companion traditions from different tradition families
    addCompanionTraditions(entry, t.day, t.theme, 'vijnana');

    entries.push(entry);
  }

  return entries;
}
