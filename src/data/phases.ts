import type { SpiritualPhase } from '../lib/types';

export const SPIRITUAL_PHASES: SpiritualPhase[] = [
  {
    id: 'VIJNANA_1_112',
    name: 'Vijnana Bhairava Tantra',
    startDay: 1,
    endDay: 112,
    primaryTradition: 'VIJNANA',
    description:
      'Direct awareness practices from the Vijnana Bhairava Tantra: breath, body, space, and perception as doorways to the Self.',
  },
  {
    id: 'UPANISHADS_113_168',
    name: 'Upanishads Cycle',
    startDay: 113,
    endDay: 168,
    primaryTradition: 'UPANISHAD',
    description:
      'Nondual roots from the Upanishads, especially Kena, exploring the source of seeing, hearing, and thought.',
  },
  {
    id: 'GITA_169_210',
    name: 'Bhagavad Gita Cycle',
    startDay: 169,
    endDay: 210,
    primaryTradition: 'GITA',
    description:
      'Selected verses from the Bhagavad Gita on steadiness of mind, right action, devotion, and the psychology of dharma.',
  },
  {
    id: 'TAO_211_260',
    name: 'Tao Te Ching Deep Cycle',
    startDay: 211,
    endDay: 260,
    primaryTradition: 'TAO',
    description:
      'A slower walk through the Tao Te Ching, embodying softness, non-resistance, and effortless action.',
  },
  {
    id: 'ASHTAVAKRA_261_300',
    name: 'Ashtavakra Gita Cycle',
    startDay: 261,
    endDay: 300,
    primaryTradition: 'ASHTAVAKRA',
    description:
      'Radical nondual insight: pure awareness, freedom from identification, and the shock of seeing the Self clearly.',
  },
  {
    id: 'YOGA_SUTRAS_301_330',
    name: 'Yoga Sutras Essentials',
    startDay: 301,
    endDay: 330,
    primaryTradition: 'YOGA_SUTRA',
    description:
      'The psychology of mind and practice from the Yoga Sutras: stilling the mind, kleshas, abhyasa/vairagya, and the eight limbs.',
  },
  {
    id: 'SHIVA_SUTRAS_331_365',
    name: 'Shiva Sutras Closing Arc',
    startDay: 331,
    endDay: 365,
    primaryTradition: 'SHIVA_SUTRA',
    description:
      'Short, potent sutras from Kashmir Shaivism, integrating everything into the recognition of consciousness as one\'s true nature.',
  },
];

export function getPhaseForDay(dayNumber: number): SpiritualPhase | undefined {
  return SPIRITUAL_PHASES.find(
    (p) => dayNumber >= p.startDay && dayNumber <= p.endDay
  );
}










