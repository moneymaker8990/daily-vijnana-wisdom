import type { DailyEntry } from '../../lib/types';

// Days 301-330: Yoga Sutras Essentials (30 days)
// Focus: stilling mind, kleshas, abhyasa & vairagya, eight limbs, psychological clarity

export const YOGA_SUTRAS_PHASE_ENTRIES: DailyEntry[] = generateYogaSutrasEntries();

function generateYogaSutrasEntries(): DailyEntry[] {
  const yogaDays = [
    { day: 301, theme: 'Now, Yoga', ref: 'YS-1.1', text: 'Now, the teachings of yoga.', focus: 'beginning now' },
    { day: 302, theme: 'Stilling the Mind', ref: 'YS-1.2', text: 'Yoga is the stilling of the movements of the mind.', focus: 'definition of yoga' },
    { day: 303, theme: 'The Seer Abides', ref: 'YS-1.3', text: 'Then the Seer abides in its own true nature.', focus: 'resting as Self' },
    { day: 304, theme: 'Mistaken Identity', ref: 'YS-1.4', text: 'At other times, the Seer identifies with the movements of the mind.', focus: 'lost in thought' },
    { day: 305, theme: 'Practice and Non-Attachment', ref: 'YS-1.12', text: 'These movements are stilled by practice and non-attachment.', focus: 'the two wings' },
    { day: 306, theme: 'Steady Effort', ref: 'YS-1.13', text: 'Practice is the effort to be steady in that stillness.', focus: 'consistent return' },
    { day: 307, theme: 'Firm Foundation', ref: 'YS-1.14', text: 'Practice becomes firmly established when cultivated for a long time, without interruption, and with devotion.', focus: 'long-term commitment' },
    { day: 308, theme: 'Free from Craving', ref: 'YS-1.15', text: 'Non-attachment is the mastery of one who is free from craving for what is seen or heard.', focus: 'releasing craving' },
    { day: 309, theme: 'Highest Non-Attachment', ref: 'YS-1.16', text: 'The highest non-attachment arises from knowledge of the Self and frees one even from the gunas.', focus: 'supreme letting go' },
    { day: 310, theme: 'Four Attitudes', ref: 'YS-1.33', text: 'Clarity comes through cultivating friendliness, compassion, delight, and equanimity.', focus: 'relational practice' },
    { day: 311, theme: 'Breath Regulation', ref: 'YS-1.34', text: 'Or by the exhalation and retention of breath.', focus: 'pranayama path' },
    { day: 312, theme: 'Inner Light', ref: 'YS-1.36', text: 'Or by fixing the mind on a radiant light within.', focus: 'luminous focus' },
    { day: 313, theme: 'Yoga in Action', ref: 'YS-2.1', text: 'Yoga in action is: discipline, self-study, and surrender to the source.', focus: 'kriya yoga' },
    { day: 314, theme: 'Reducing Afflictions', ref: 'YS-2.2', text: 'These reduce afflictions and cultivate samadhi.', focus: 'purification purpose' },
    { day: 315, theme: 'The Five Kleshas', ref: 'YS-2.3', text: 'The afflictions are: ignorance, ego, attachment, aversion, and clinging to life.', focus: 'root obstacles' },
    { day: 316, theme: 'Ignorance Root', ref: 'YS-2.4', text: 'Ignorance is the field in which the other afflictions grow.', focus: 'primal confusion' },
    { day: 317, theme: 'Mistaking Impermanent', ref: 'YS-2.5', text: 'Ignorance is seeing the impermanent as permanent, the impure as pure, the painful as pleasant.', focus: 'core misperception' },
    { day: 318, theme: 'Ego Identification', ref: 'YS-2.6', text: 'Ego is the identification of the Seer with the power of seeing.', focus: 'false self' },
    { day: 319, theme: 'Attachment Pattern', ref: 'YS-2.7', text: 'Attachment is that which accompanies pleasure.', focus: 'grasping mechanism' },
    { day: 320, theme: 'Aversion Pattern', ref: 'YS-2.8', text: 'Aversion is that which accompanies pain.', focus: 'pushing away' },
    { day: 321, theme: 'Clinging to Life', ref: 'YS-2.9', text: 'Clinging to life flows on by its own nature, rooted even in the wise.', focus: 'primal fear' },
    { day: 322, theme: 'Tracing Back', ref: 'YS-2.10', text: 'These subtle afflictions can be overcome by tracing them back to their origin.', focus: 'reverse inquiry' },
    { day: 323, theme: 'Meditation Overcomes', ref: 'YS-2.11', text: 'In their active state, they are overcome through meditation.', focus: 'active dissolution' },
    { day: 324, theme: 'Avoiding Future Suffering', ref: 'YS-2.16', text: 'The suffering yet to come can be avoided.', focus: 'preventive wisdom' },
    { day: 325, theme: 'Discriminative Awareness', ref: 'YS-2.26', text: 'The means of liberation is unbroken discriminative awareness.', focus: 'viveka' },
    { day: 326, theme: 'Eight Limbs', ref: 'YS-2.29', text: 'The eight limbs are: restraints, observances, posture, breath, sense withdrawal, concentration, meditation, absorption.', focus: 'complete path' },
    { day: 327, theme: 'Steady Posture', ref: 'YS-2.46', text: 'Posture should be steady and comfortable.', focus: 'balanced sitting' },
    { day: 328, theme: 'Relaxing into Infinite', ref: 'YS-2.47', text: 'By relaxing effort and meditating on the infinite.', focus: 'effortless ease' },
    { day: 329, theme: 'Mind Stilling Complete', ref: 'YS-1.2', text: 'When the mind is stilled, the Seer rests in its nature.', focus: 'return home' },
    { day: 330, theme: 'Integration', ref: 'YS-1.3', text: 'Then the Seer abides in its own true nature—this is the fruit of yoga.', focus: 'yoga complete' },
  ];

  return yogaDays.map(y => ({
    dayNumber: y.day,
    theme: y.theme,
    phaseId: 'YOGA_SUTRAS_301_330' as const,
    yogaSutraRef: { source: 'YOGA_SUTRA' as const, ref: y.ref },
    taoRef: { source: 'TAO' as const, ref: `Tao-${String(((y.day - 301) % 81) + 1).padStart(2, '0')}` },
    vijnanaRef: { source: 'VIJNANA' as const, ref: `V${((y.day - 301) % 112) + 1}` },
    traditionContext: {
      yogaSutras: 'Patanjali\'s classical text offering precise psychology for understanding and stilling the mind—the definitive map of inner territory.',
      tao: 'Ancient Chinese wisdom confirming that stillness reveals what was always present.',
      vijnana: 'A Kashmiri tantra using breath and body as the laboratory for inner work.',
    },
    yogaSutraText: y.text,
    yogaSutraCommentary: `Patanjali illuminates ${y.focus}. The Yoga Sutras offer precise psychology for understanding and transforming the mind, revealing the pure awareness beneath all mental activity.`,
    whyThisMatters: {
      yogaSutras: `Understanding ${y.focus} gives you a map for the mind's territory. This is practical psychology, not abstract philosophy.`,
      tao: 'Stillness is both the method and the discovery. East and West converge here.',
      vijnana: 'The body is the laboratory. Tantra grounds abstract teaching in felt experience.',
    },
    taoText: 'Empty yourself of everything. Let the mind rest at peace.',
    taoCommentary: 'Tao and Yoga agree: stillness reveals what was always present.',
    vijnanaText: 'Between the inhalation and exhalation shines the light of consciousness.',
    vijnanaCommentary: 'Tantra uses breath and body as the laboratory for Patanjali\'s teachings.',
    integratedReflectionTitle: y.theme,
    integratedReflectionBody: `Today we explore ${y.focus}. Patanjali's Yoga Sutras are not religious scripture but practical psychology—a manual for working with the mind. Think of how a restless night differs from restful sleep—the difference is mind activity. Each sutra is dense with meaning, unpacked over centuries of practice. Let this teaching inform your day, not as philosophy to believe but as practice to embody.`,
    meditation: {
      title: `${y.theme} Practice`,
      steps: [
        'Sit with spine erect but relaxed.',
        'Let the breath settle naturally.',
        'Observe the current state of your mind—busy or calm.',
        'Apply today\'s teaching as a lens.',
        'Rest in whatever stillness emerges.',
      ],
      suggestedMinutes: 12,
    },
    meditationContext: `This practice integrates sutra study with direct experience. It trains the mind to still itself, revealing the awareness beneath thought. The sutras are not to be memorized but lived.`,
    prayer: `May I understand and embody ${y.focus}. May my mind become still and clear.`,
    dailyAction: 'Apply today\'s sutra teaching to one mental pattern you notice.',
    dailyActionContext: 'Try this when you notice anxiety or restlessness. Notice how awareness of the pattern changes your relationship to it. This is the beginning of mastery.',
  }));
}
