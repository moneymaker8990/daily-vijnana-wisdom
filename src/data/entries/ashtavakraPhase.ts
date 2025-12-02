import type { DailyEntry } from '../../lib/types';

// Days 261-300: Ashtavakra Gita Cycle (40 days)
// Focus: radical nondual insight, letting go of identification, seeing thoughts as passing

export const ASHTAVAKRA_PHASE_ENTRIES: DailyEntry[] = generateAshtavakraEntries();

function generateAshtavakraEntries(): DailyEntry[] {
  const ashtaDays = [
    { day: 261, theme: 'You Are Already Free', ref: 'Ashta-1.1', text: 'If you wish to be free, know you are the Self, the witness of all these, and be happy.', focus: 'instant liberation' },
    { day: 262, theme: 'Not the Elements', ref: 'Ashta-1.2', text: 'You are neither earth, nor water, nor fire, nor air, nor space. Know yourself as awareness.', focus: 'beyond form' },
    { day: 263, theme: 'Separate from the Body', ref: 'Ashta-1.3', text: 'If you separate yourself from the body and rest in consciousness, you will at once be happy.', focus: 'instant peace' },
    { day: 264, theme: 'Formless Witness', ref: 'Ashta-1.4', text: 'You are unseen, unattached, formless. The witness of all, be happy.', focus: 'invisible seer' },
    { day: 265, theme: 'Neither Doer Nor Enjoyer', ref: 'Ashta-1.5', text: 'Right and wrong, pleasure and pain, exist only in the mind. You neither do nor enjoy. You are free.', focus: 'beyond action' },
    { day: 266, theme: 'Unbounded Awareness', ref: 'Ashta-2.1', text: 'I am unbounded awareness. Only through ignorance have I imagined myself to have limits.', focus: 'limitless Self' },
    { day: 267, theme: 'The Infinite Ocean', ref: 'Ashta-2.2', text: 'I am the one infinite ocean, and all worlds are like waves. This is the truth.', focus: 'ocean nature' },
    { day: 268, theme: 'Formless Everywhere', ref: 'Ashta-2.3', text: 'I am formless, I am everywhere, beyond the senses, ever free.', focus: 'omnipresent Self' },
    { day: 269, theme: 'Mirror Consciousness', ref: 'Ashta-2.4', text: 'Just as a mirror reflects forms but is not touched by them, so the Self reflects the world but remains unchanged.', focus: 'untouched witness' },
    { day: 270, theme: 'What is Space', ref: 'Ashta-2.5', text: 'What is space? What is time? What is matter? They all appear in awareness. I am that awareness.', focus: 'prior to all' },
    { day: 271, theme: 'Knowing Yourself Free', ref: 'Ashta-3.1', text: 'Knowing yourself as pure awareness, witnessing all, you become free from every bond.', focus: 'recognition freedom' },
    { day: 272, theme: 'Bubbles from Sea', ref: 'Ashta-3.2', text: 'The universe rises from you like bubbles from the sea. Know yourself as the ocean and be free.', focus: 'source identity' },
    { day: 273, theme: 'Snake in Rope', ref: 'Ashta-3.3', text: 'You are awareness itself. The world appears in you like a snake appears in a rope.', focus: 'illusory appearance' },
    { day: 274, theme: 'Let Come What Comes', ref: 'Ashta-4.1', text: 'Let come what comes, let go what goes. See what remains.', focus: 'accepting flow' },
    { day: 275, theme: 'Why Pretend', ref: 'Ashta-4.2', text: 'You are already free. Why do you still pretend to be bound?', focus: 'ending pretense' },
    { day: 276, theme: 'Illusion\'s End', ref: 'Ashta-5.1', text: 'Neither bondage nor liberation exists. The illusion has lost its basis.', focus: 'beyond duality' },
    { day: 277, theme: 'Pure Being', ref: 'Ashta-5.2', text: 'Knowing yourself as pure being, cease to identify with the world. Be happy.', focus: 'essential nature' },
    { day: 278, theme: 'Infinite Like Space', ref: 'Ashta-6.1', text: 'I am infinite like space. The world is a jar. This is the truth.', focus: 'containing all' },
    { day: 279, theme: 'Waves Rising', ref: 'Ashta-7.1', text: 'In the ocean of being, the waves of the world arise and fall. What is lost, what is gained?', focus: 'equanimity' },
    { day: 280, theme: 'Mind Longing', ref: 'Ashta-8.1', text: 'Bondage is when the mind longs for something, grieves about something, rejects or holds onto something.', focus: 'root of bondage' },
    { day: 281, theme: 'Liberation Mind', ref: 'Ashta-9.1', text: 'Liberation is when the mind does not long for anything, grieve about anything, or hold onto anything.', focus: 'free mind' },
    { day: 282, theme: 'Neither Rejoices', ref: 'Ashta-10.1', text: 'The wise person neither rejoices at praise nor feels upset by blame.', focus: 'beyond opinion' },
    { day: 283, theme: 'Action Inaction', ref: 'Ashta-11.1', text: 'He who is desireless sees everywhere action that is inaction.', focus: 'desireless seeing' },
    { day: 284, theme: 'No I No Bondage', ref: 'Ashta-12.1', text: 'When there is no "I", there is only liberation. When there is "I", there is bondage.', focus: 'ego as bondage' },
    { day: 285, theme: 'Free from Dualism', ref: 'Ashta-13.1', text: 'Free from the dualism of do and do not, the wise person shines.', focus: 'beyond opposites' },
    { day: 286, theme: 'Where is My Body', ref: 'Ashta-14.1', text: 'Where is my body, where is my mind? I am alone, peaceful, watching.', focus: 'dissolution inquiry' },
    { day: 287, theme: 'Guests Coming Going', ref: 'Ashta-15.1', text: 'In the body, pleasures and pains come and go like guests. The Self remains, untouched.', focus: 'host awareness' },
    { day: 288, theme: 'Already Fulfilled', ref: 'Ashta-16.1', text: 'I am fulfilled. What have I to do with thoughts, with existence or non-existence?', focus: 'complete now' },
    { day: 289, theme: 'Ocean of Beings', ref: 'Ashta-17.1', text: 'In me, the limitless ocean, the waves of beings rise and set. No gain, no loss.', focus: 'vast containing' },
    { day: 290, theme: 'Illusion Resting', ref: 'Ashta-18.1', text: 'I am neither bound nor free. The illusion has come to rest.', focus: 'illusion ended' },
    { day: 291, theme: 'Witness and Be Happy', ref: 'Ashta-1.1', text: 'You are the witness. Knowing this, be happy.', focus: 'witness joy' },
    { day: 292, theme: 'No Thing to Do', ref: 'Ashta-15.2', text: 'For one who has known the Self, there is nothing to do, nothing to avoid.', focus: 'end of effort' },
    { day: 293, theme: 'Serene in All', ref: 'Ashta-17.2', text: 'The wise one is serene in crowded places, serene in solitude.', focus: 'unchanging peace' },
    { day: 294, theme: 'No Pride No Shame', ref: 'Ashta-18.2', text: 'There is no pride in me, no shame. I am beyond the pairs of opposites.', focus: 'beyond duality' },
    { day: 295, theme: 'What Knowledge', ref: 'Ashta-19.1', text: 'What is knowledge, what is the world, what is the body? I am pure awareness.', focus: 'radical inquiry' },
    { day: 296, theme: 'No Birth No Death', ref: 'Ashta-19.2', text: 'For awareness there is no birth, no death, no bondage, no liberation.', focus: 'eternal Self' },
    { day: 297, theme: 'Play of Consciousness', ref: 'Ashta-19.3', text: 'All this is the play of consciousness. Rest in this knowing.', focus: 'cosmic play' },
    { day: 298, theme: 'Alone and Free', ref: 'Ashta-20.1', text: 'I am alone, free, the witness of all. Nothing binds me.', focus: 'solitary freedom' },
    { day: 299, theme: 'No Teacher Needed', ref: 'Ashta-20.2', text: 'One who knows the Self needs no teacher, no scripture, no path.', focus: 'self-sufficient knowing' },
    { day: 300, theme: 'Simply Be', ref: 'Ashta-20.3', text: 'All teachings lead to this: simply be what you are.', focus: 'natural being' },
  ];

  return ashtaDays.map(a => ({
    dayNumber: a.day,
    theme: a.theme,
    phaseId: 'ASHTAVAKRA_261_300' as const,
    ashtavakraRef: { source: 'ASHTAVAKRA' as const, ref: a.ref },
    taoRef: { source: 'TAO' as const, ref: `Tao-${String(((a.day - 261) % 81) + 1).padStart(2, '0')}` },
    vijnanaRef: { source: 'VIJNANA' as const, ref: `V${((a.day - 261) % 112) + 1}` },
    traditionContext: {
      ashtavakra: 'A radical nondual dialogue where an enlightened sage reveals to a king that he is already free—no practice needed, no path to walk.',
      tao: 'Ancient Chinese wisdom pointing to what lies beyond form and concept.',
      vijnana: 'A Kashmiri tantra using immediate experience as the doorway to recognition.',
    },
    ashtavakraText: a.text,
    ashtavakraCommentary: `This verse points directly to ${a.focus}. The Ashtavakra Gita is the most radical scripture—it does not comfort the ego but dissolves it, revealing the unbounded awareness you have always been.`,
    whyThisMatters: {
      ashtavakra: `Recognizing ${a.focus} ends the exhausting search for something missing. You stop running and discover you were always home.`,
      tao: 'Words point beyond themselves. The Tao and Advaita both dissolve concepts to reveal what is prior.',
      vijnana: 'Awareness recognizing itself is liberation. No technique needed—just clear seeing.',
    },
    taoText: 'The Tao that can be spoken is not the eternal Tao.',
    taoCommentary: 'Both Tao and Ashtavakra point beyond words to direct recognition.',
    vijnanaText: 'When you are aware of being aware, that is the state.',
    vijnanaCommentary: 'Tantra and Advaita converge: awareness recognizing itself is liberation.',
    integratedReflectionTitle: a.theme,
    integratedReflectionBody: `Today's radical teaching points us toward ${a.focus}. The Ashtavakra Gita does not offer gradual progress or future promises—it declares that you are already free, already complete, already the infinite awareness in which all experience appears. Think of waking from a dream—nothing changed except recognition. The only obstacle is believing otherwise. Let this teaching shock you awake.`,
    meditation: {
      title: `${a.theme} Recognition`,
      steps: [
        'Sit in stillness, releasing all seeking.',
        'Notice: awareness is already present.',
        'Ask: "Is this awareness bound?"',
        'Look for the one who is bound. Can you find them?',
        'Rest in the recognition: freedom is already here.',
      ],
      suggestedMinutes: 15,
    },
    meditationContext: `This practice is not about achieving a state but recognizing what is already true. It reveals that the seeker is what is sought. The Ashtavakra points out that seeking itself assumes something is missing—but nothing is missing.`,
    prayer: `May I recognize ${a.focus}. May I stop pretending to be bound.`,
    dailyAction: 'When limitation feels real, ask: "Who is limited?" Look for the one who is bound.',
    dailyActionContext: 'Try this when you feel stuck or contracted. This inquiry dissolves the assumption of bondage. You will not find the bound one because there is no bound one—only awareness pretending.',
  }));
}
