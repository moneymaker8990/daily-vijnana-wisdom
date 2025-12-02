import type { DailyEntry } from '../../lib/types';

// Days 331-365: Shiva Sutras (Kashmir Shaivism) (35 days)
// Focus: identity as consciousness, play of energy, integrating all prior phases

export const SHIVA_SUTRAS_PHASE_ENTRIES: DailyEntry[] = generateShivaSutrasEntries();

function generateShivaSutrasEntries(): DailyEntry[] {
  const shivaDays = [
    { day: 331, theme: 'Consciousness is the Self', ref: 'SS-1.1', text: 'Consciousness is the Self.', focus: 'ultimate identity' },
    { day: 332, theme: 'Knowledge as Bondage', ref: 'SS-1.2', text: 'Knowledge is bondage.', focus: 'trap of knowing' },
    { day: 333, theme: 'The World from the Self', ref: 'SS-1.3', text: 'The source of the worlds is activity of the Self.', focus: 'creative power' },
    { day: 334, theme: 'Arising of Inner Awareness', ref: 'SS-1.5', text: 'The arising of inner awareness is Bhairava.', focus: 'divine awakening' },
    { day: 335, theme: 'The Fourth in All States', ref: 'SS-1.7', text: 'Such a yogi experiences the fourth state even in waking, dreaming, and deep sleep.', focus: 'continuous presence' },
    { day: 336, theme: 'Waking as Knowledge', ref: 'SS-1.8', text: 'Knowledge is waking.', focus: 'ordinary awareness' },
    { day: 337, theme: 'Self as Actor', ref: 'SS-1.9', text: 'The Self as actor is the inner stage.', focus: 'cosmic theater' },
    { day: 338, theme: 'Inner Audience', ref: 'SS-1.10', text: 'The audience is the inner Self.', focus: 'witness presence' },
    { day: 339, theme: 'Senses as Spectators', ref: 'SS-1.11', text: 'The senses become spectators through pure awareness.', focus: 'transformed perception' },
    { day: 340, theme: 'Wonder of Yoga', ref: 'SS-1.12', text: 'Stages of yoga are wonder.', focus: 'astonishment' },
    { day: 341, theme: 'Will as Uma', ref: 'SS-1.13', text: 'The power of will is the maiden Uma.', focus: 'divine feminine' },
    { day: 342, theme: 'Body as Visible', ref: 'SS-1.14', text: 'The visible is the body.', focus: 'manifest form' },
    { day: 343, theme: 'Heart Center', ref: 'SS-1.15', text: 'When the heart is fixed on its center, the world appears as a vision.', focus: 'centered seeing' },
    { day: 344, theme: 'Pure Awareness Rest', ref: 'SS-1.16', text: 'Or by resting in pure awareness.', focus: 'natural abiding' },
    { day: 345, theme: 'Self-Discernment', ref: 'SS-1.17', text: 'Right discernment is knowledge of the Self.', focus: 'true knowing' },
    { day: 346, theme: 'World Bliss', ref: 'SS-1.18', text: 'The bliss of the world is the bliss of samadhi.', focus: 'ordinary ecstasy' },
    { day: 347, theme: 'Creative Energy', ref: 'SS-1.19', text: 'In the creative energy, the body arises.', focus: 'shakti embodiment' },
    { day: 348, theme: 'Threefold State', ref: 'SS-1.20', text: 'The union of elements, separation of elements, and union of all—this is the threefold state.', focus: 'cosmic dynamics' },
    { day: 349, theme: 'Mastering the Wheel', ref: 'SS-1.21', text: 'By plunging into pure awareness, one attains mastery over the wheel of energies.', focus: 'energy mastery' },
    { day: 350, theme: 'Great Lake Awareness', ref: 'SS-1.22', text: 'By experiencing the great lake of awareness, one masters mantra.', focus: 'vast presence' },
    { day: 351, theme: 'Mind is Mantra', ref: 'SS-2.1', text: 'The mind is mantra.', focus: 'thought as sacred' },
    { day: 352, theme: 'Effort as Means', ref: 'SS-2.2', text: 'Effort is the means.', focus: 'devoted practice' },
    { day: 353, theme: 'Secret of Mantra', ref: 'SS-2.3', text: 'The secret of mantra is the body of knowledge.', focus: 'embodied wisdom' },
    { day: 354, theme: 'Womb of Illusion', ref: 'SS-2.4', text: 'In the womb of illusion, there is the spreading of inferior knowledge.', focus: 'recognizing maya' },
    { day: 355, theme: 'Infinite Spaciousness', ref: 'SS-2.5', text: 'On the arising of innate knowledge, the state of Shiva is attained—infinite spaciousness.', focus: 'natural knowing' },
    { day: 356, theme: 'Guru Means', ref: 'SS-2.6', text: 'The guru is the means.', focus: 'grace transmission' },
    { day: 357, theme: 'Matrix Awakening', ref: 'SS-2.7', text: 'The awakening is the knowledge of the matrix.', focus: 'understanding source' },
    { day: 358, theme: 'Body Offering', ref: 'SS-2.8', text: 'The body is the offering.', focus: 'embodied sacrifice' },
    { day: 359, theme: 'Knowledge Food', ref: 'SS-2.9', text: 'Knowledge is food.', focus: 'nourishing wisdom' },
    { day: 360, theme: 'Self as Mind', ref: 'SS-3.1', text: 'The Self is the mind.', focus: 'mind as Self' },
    { day: 361, theme: 'Victory Through Expansion', ref: 'SS-3.7', text: 'By conquering delusion and through natural expansion, there is victory.', focus: 'expanded awareness' },
    { day: 362, theme: 'Absorption Understanding', ref: 'SS-3.12', text: 'Intuitive understanding is attained through absorption.', focus: 'samadhi insight' },
    { day: 363, theme: 'Freedom Achieved', ref: 'SS-3.13', text: 'Freedom is achieved.', focus: 'liberation realized' },
    { day: 364, theme: 'Consciousness Returns', ref: 'SS-1.1', text: 'Consciousness is the Self—this is the beginning and the end.', focus: 'full circle' },
    { day: 365, theme: 'The Circle Complete', ref: 'SS-1.1', text: 'Consciousness is the Self. The journey ends where it began.', focus: 'eternal recognition' },
  ];

  return shivaDays.map(s => {
    const isLastDay = s.day === 365;
    
    return {
      dayNumber: s.day,
      theme: s.theme,
      phaseId: 'SHIVA_SUTRAS_331_365' as const,
      shivaSutraRef: { source: 'SHIVA_SUTRA' as const, ref: s.ref },
      taoRef: { source: 'TAO' as const, ref: isLastDay ? 'Tao-81' : `Tao-${String(((s.day - 331) % 81) + 1).padStart(2, '0')}` },
      vijnanaRef: { source: 'VIJNANA' as const, ref: isLastDay ? 'V112' : `V${((s.day - 331) % 112) + 1}` },
      artOfWarRef: { source: 'ART_OF_WAR' as const, ref: isLastDay ? 'AoW-13.3' : `AoW-${Math.floor((s.day - 331) / 5) + 1}.${((s.day - 331) % 5) + 1}` },
      traditionContext: {
        shivaSutras: 'The heart of Kashmir Shaivism, revealing consciousness as ultimate reality and identity.',
        tao: isLastDay 
          ? 'The Tao Te Ching ends with simplicity—truth beyond beautiful words.'
          : 'Ancient Chinese wisdom pointing to the one reality beneath all forms.',
        vijnana: isLastDay
          ? 'The Vijnana Bhairava\'s 112 techniques all lead to this single recognition.'
          : 'A Kashmiri tantra using immediate experience as the doorway to recognition.',
        artOfWar: 'Strategic wisdom confirming that self-knowledge is the only true victory.',
      },
      shivaSutraText: s.text,
      shivaSutraCommentary: isLastDay
        ? 'We end where we began. The Shiva Sutras declare from the first word what the entire journey confirms: Consciousness is the Self. You are not on a path to become aware—you ARE awareness itself.'
        : `This sutra reveals ${s.focus}. The Shiva Sutras complete our journey by returning us to the source—pure consciousness recognizing itself in and as all experience.`,
      whyThisMatters: {
        shivaSutras: isLastDay
          ? 'This recognition ends the exhausting search. You are already what you sought.'
          : `Recognizing ${s.focus} collapses the distance between you and the divine. There is no gap to cross.`,
        tao: isLastDay
          ? 'Words point beyond themselves. The journey ends in silence.'
          : 'All traditions converge at the source. Different windows, same light.',
        vijnana: isLastDay
          ? 'Every technique was a finger pointing at the moon. Now, see the moon directly.'
          : 'The body and breath are laboratories for this recognition.',
        artOfWar: isLastDay
          ? 'The ultimate victory is recognizing you have always been home.'
          : 'Self-knowledge ends all inner warfare.',
      },
      taoText: isLastDay ? 'True words are not beautiful. Beautiful words are not true.' : 'The Tao flows everywhere, nourishing all things.',
      taoCommentary: isLastDay
        ? 'We end with simplicity. All the beautiful words of 365 days point to what is beyond words.'
        : 'Tao and Shiva are one reality seen through different windows.',
      vijnanaText: isLastDay
        ? 'In the end, which is also the beginning, there is only this—awareness being aware of itself, forever.'
        : 'Rest in the space between breaths. There, consciousness recognizes itself.',
      vijnanaCommentary: isLastDay
        ? 'The Vijnana Bhairava\'s final verse echoes the Shiva Sutras\' first: awareness is all.'
        : 'All 112 techniques of the Vijnana Bhairava lead to this single recognition.',
      artOfWarText: isLastDay ? 'The wise warrior prepares the ground for peace.' : 'Know yourself and you will win all battles.',
      artOfWarCommentary: isLastDay
        ? 'The ultimate strategy is recognition: you have always been what you sought.'
        : 'Self-knowledge is the only true victory.',
      integratedReflectionTitle: s.theme,
      integratedReflectionBody: isLastDay
        ? 'Day 365 brings us full circle. We end where we began: consciousness is the Self. Every teaching, every practice, every tradition has pointed to this single truth. Think of how a child knows they exist before they know their name—that knowing is what we have been exploring. The journey was never about reaching somewhere new but about recognizing what has always been here. Tomorrow, the cycle begins again—but you are not the same. You know. You have always known. The recognition deepens, the forgetting lessens, and daily life becomes the final teaching.'
        : `Today we contemplate ${s.focus}. The Shiva Sutras, from the heart of Kashmir Shaivism, integrate everything we have learned. Think of how awareness is present in every experience—joy, pain, boredom, excitement. That unchanging presence is what the sutras point to. This is not a new teaching but the same truth seen more directly. Consciousness is not something you have—it is what you are. All experience arises within you, as you. There is no gap between you and the divine.`,
      meditation: {
        title: isLastDay ? 'Complete Recognition' : `${s.theme} Recognition`,
        steps: isLastDay
          ? [
              'Sit in stillness one final time this year.',
              'Review the journey of 365 days—not in detail, but in essence.',
              'Let all teachings dissolve into one recognition.',
              'Consciousness is the Self. You are That.',
              'Rest in this knowing, complete and whole.',
              'There is nothing more to seek.',
            ]
          : [
              'Sit in deep stillness.',
              'Let all seeking cease.',
              'Rest in consciousness as consciousness.',
              'Notice: there is no gap between you and awareness.',
              'This is the recognition the sutras point toward.',
            ],
        suggestedMinutes: isLastDay ? 30 : 20,
      },
      meditationContext: isLastDay
        ? 'This final meditation is a celebration and a completion. Not an ending but a recognition that every moment is already full. The practice continues, but seeking ends.'
        : 'This practice is not about achieving a state but recognizing what is already true. The Shiva Sutras point out that you are already Shiva—pure consciousness itself.',
      prayer: isLastDay
        ? 'May this recognition be permanent. May every day be a fresh expression of this eternal truth. May all beings recognize their true nature. Om.'
        : `May I recognize ${s.focus}. May this recognition deepen with each passing day.`,
      dailyAction: isLastDay
        ? 'Carry this recognition into a new year. Each day is both the end and the beginning. Live from this knowing.'
        : 'See every experience today as consciousness recognizing itself in yet another form.',
      dailyActionContext: isLastDay
        ? 'The journey continues, but the seeking ends. You are home. You have always been home. Now live from here.'
        : 'This is the final practice: seeing all of life as the play of consciousness, and yourself as both the player and the play.',
    };
  });
}
