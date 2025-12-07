/**
 * Central Registry
 * 
 * Single source of truth: ALL_VERSES and ALL_SOURCES
 * Every part of the app queries these, not individual files.
 */

import type { Verse, Source } from './types';

// Import all verse arrays
import { gitaVerses } from './verses/gitaVerses';
import { taoVerses } from './verses/taoVerses';
import { vbtVerses } from './verses/vbtVerses';
import { upanishadVerses } from './verses/upanishadVerses';
import { ashtavakraVerses } from './verses/ashtavakraVerses';
import { yogaSutraVerses } from './verses/yogaSutraVerses';
import { shivaSutraVerses } from './verses/shivaSutraVerses';
import { rigVedaVerses } from './verses/rigVedaVerses';
import { dhammapadaVerses } from './verses/dhammapadaVerses';
import { zenKoansVerses } from './verses/zenKoansVerses';
import { rumiVerses } from './verses/rumiVerses';
import { cloudOfUnknowingVerses } from './verses/cloudOfUnknowingVerses';
import { zhuangziVerses } from './verses/zhuangziVerses';
import { prajnaparamitaVerses } from './verses/prajnaparamitaVerses';
import { suttaNipataVerses } from './verses/suttaNipataVerses';
import { avadhutaGitaVerses } from './verses/avadhutaGitaVerses';
import { vivekachudamaniVerses } from './verses/vivekachudamaniVerses';
import { naradaBhaktiSutraVerses } from './verses/naradaBhaktiSutraVerses';
import { yogaVasisthaVerses } from './verses/yogaVasisthaVerses';
import { conferenceOfBirdsVerses } from './verses/conferenceOfBirdsVerses';
import { darkNightVerses } from './verses/darkNightVerses';
import { corpusHermeticumVerses } from './verses/corpusHermeticumVerses';
import { kybalionVerses } from './verses/kybalionVerses';
import { imitationOfChristVerses } from './verses/imitationOfChristVerses';

/**
 * ALL_VERSES: The complete collection of sacred verses
 * Every query goes through this single array
 */
export const ALL_VERSES: Verse[] = [
  ...gitaVerses,
  ...taoVerses,
  ...vbtVerses,
  ...upanishadVerses,
  ...ashtavakraVerses,
  ...yogaSutraVerses,
  ...shivaSutraVerses,
  ...rigVedaVerses,
  ...dhammapadaVerses,
  ...zenKoansVerses,
  ...rumiVerses,
  ...cloudOfUnknowingVerses,
  ...zhuangziVerses,
  ...prajnaparamitaVerses,
  ...suttaNipataVerses,
  ...avadhutaGitaVerses,
  ...vivekachudamaniVerses,
  ...naradaBhaktiSutraVerses,
  ...yogaVasisthaVerses,
  ...conferenceOfBirdsVerses,
  ...darkNightVerses,
  ...corpusHermeticumVerses,
  ...kybalionVerses,
  ...imitationOfChristVerses,
];

/**
 * ALL_SOURCES: Metadata about each sacred text
 */
export const ALL_SOURCES: Source[] = [
  {
    id: 'bhagavad-gita',
    name: 'Bhagavad Gita',
    tradition: 'Hindu',
    totalVerses: 700,
    description: 'The Song of God - A 700-verse dialogue between Prince Arjuna and Lord Krishna on the battlefield of Kurukshetra, addressing duty, action, devotion, and liberation.',
    originalLanguage: 'Sanskrit',
    period: '500-200 BCE',
    translator: 'Edwin Arnold',
    icon: '🙏',
  },
  {
    id: 'tao-te-ching',
    name: 'Tao Te Ching',
    tradition: 'Taoist',
    totalVerses: 81,
    description: 'The Way and Its Power - Ancient Chinese wisdom pointing to effortless harmony, the value of yielding, and living in accord with the natural order.',
    originalLanguage: 'Chinese',
    period: '6th century BCE',
    translator: 'James Legge',
    icon: '☯️',
  },
  {
    id: 'vijnana-bhairava-tantra',
    name: 'Vijnana Bhairava Tantra',
    tradition: 'Tantric',
    totalVerses: 112,
    description: '112 meditation techniques revealed by Shiva to Shakti, offering direct gateways into presence through breath, sensation, and immediate experience.',
    originalLanguage: 'Sanskrit',
    period: '8th-9th century CE',
    translator: 'Paul Reps',
    icon: '🕉️',
  },
  {
    id: 'upanishads',
    name: 'The Upanishads',
    tradition: 'Hindu',
    totalVerses: 51,
    description: 'Secret teachings of the forest sages, exploring the nature of Brahman (ultimate reality), Atman (true self), and their essential unity.',
    originalLanguage: 'Sanskrit',
    period: '800-200 BCE',
    translator: 'Max Müller',
    icon: '🔥',
  },
  {
    id: 'ashtavakra-gita',
    name: 'Ashtavakra Gita',
    tradition: 'Hindu',
    totalVerses: 102,
    description: 'The Song of Pure Awareness - A radical non-dual dialogue teaching that you are already free, already the Self, with nothing to attain.',
    originalLanguage: 'Sanskrit',
    period: '~500 CE',
    icon: '👁️',
  },
  {
    id: 'yoga-sutras',
    name: 'Yoga Sutras of Patanjali',
    tradition: 'Hindu',
    totalVerses: 196,
    description: 'The foundational text of Classical Yoga - 196 aphorisms presenting a systematic path for stilling the mind and realizing the true Self.',
    originalLanguage: 'Sanskrit',
    period: '~400 CE',
    icon: '🧘',
  },
  {
    id: 'shiva-sutras',
    name: 'Shiva Sutras',
    tradition: 'Tantric',
    totalVerses: 77,
    description: 'Revealed to the sage Vasugupta in a dream, these 77 sutras form the foundation of Kashmir Shaivism, describing consciousness as supreme reality.',
    originalLanguage: 'Sanskrit',
    period: '9th century CE',
    icon: '🔱',
  },
  {
    id: 'rig-veda',
    name: 'Rig Veda',
    tradition: 'Hindu',
    totalVerses: 100,
    description: 'Selected hymns from the oldest sacred text of Hinduism - praises to cosmic forces and profound philosophical insights.',
    originalLanguage: 'Sanskrit',
    period: '1500-1200 BCE',
    translator: 'Ralph Griffith',
    icon: '📜',
  },
  {
    id: 'dhammapada',
    name: 'Dhammapada',
    tradition: 'Buddhist',
    totalVerses: 82,
    description: 'The Path of Truth - 423 verses of the Buddha\'s essential teachings, perfect for daily contemplation and practice.',
    originalLanguage: 'Pali',
    period: '~3rd century BCE',
    translator: 'Max Müller',
    icon: '☸️',
  },
  {
    id: 'zen-koans',
    name: 'Zen Koans (Mumonkan)',
    tradition: 'Zen',
    totalVerses: 48,
    description: 'The Gateless Gate - 48 koans designed to break through conceptual thinking and catalyze direct awakening.',
    originalLanguage: 'Chinese/Japanese',
    period: '13th century CE',
    icon: '🌀',
  },
  {
    id: 'rumi',
    name: 'Rumi - Masnavi & Odes',
    tradition: 'Sufi',
    totalVerses: 100,
    description: 'Selected poems from the great Sufi mystic, expressing divine love, longing, and the path of the heart.',
    originalLanguage: 'Persian',
    period: '13th century CE',
    icon: '🌹',
  },
  {
    id: 'cloud-of-unknowing',
    name: 'The Cloud of Unknowing',
    tradition: 'ChristianMystic',
    totalVerses: 100,
    description: 'A 14th-century mystical guide to contemplative prayer, teaching that God is found beyond all thought in loving darkness.',
    originalLanguage: 'Middle English',
    period: '14th century CE',
    icon: '☁️',
  },
  {
    id: 'zhuangzi',
    name: 'Zhuangzi (Chuang Tzu)',
    tradition: 'Taoist',
    totalVerses: 55,
    description: 'The second great Taoist classic, known for its playful philosophy, paradoxes, and stories pointing to spontaneous freedom.',
    originalLanguage: 'Chinese',
    period: '4th century BCE',
    translator: 'James Legge',
    icon: '🦋',
  },
  {
    id: 'prajnaparamita',
    name: 'Heart Sutra & Diamond Sutra',
    tradition: 'Buddhist',
    totalVerses: 41,
    description: 'The essence of Mahayana Buddhist wisdom teaching on emptiness (shunyata) and the perfection of wisdom.',
    originalLanguage: 'Sanskrit',
    period: '1st-5th century CE',
    translator: 'Edward Conze',
    icon: '💎',
  },
  {
    id: 'sutta-nipata',
    name: 'Sutta Nipata',
    tradition: 'Buddhist',
    totalVerses: 60,
    description: 'One of the oldest Buddhist scriptures, containing some of the Buddha\'s earliest teachings, known for directness and poetic beauty.',
    originalLanguage: 'Pali',
    period: '~5th century BCE',
    translator: 'V. Fausbøll',
    icon: '🪷',
  },
  {
    id: 'avadhuta-gita',
    name: 'Avadhuta Gita',
    tradition: 'Hindu',
    totalVerses: 36,
    description: 'A radical Advaita Vedanta text attributed to Dattatreya, proclaiming the absolute freedom and non-dual nature of the Self, beyond all concepts and distinctions.',
    originalLanguage: 'Sanskrit',
    period: '9th-10th century CE',
    icon: '✨',
  },
  {
    id: 'vivekachudamani',
    name: 'Vivekachudamani',
    tradition: 'Hindu',
    totalVerses: 31,
    description: 'Shankara\'s "Crest-Jewel of Discrimination" - a classic Advaita Vedanta dialogue guiding the seeker to discriminate between the Real and the unreal.',
    originalLanguage: 'Sanskrit',
    period: '8th century CE',
    icon: '💠',
  },
  {
    id: 'narada-bhakti-sutra',
    name: 'Narada Bhakti Sutra',
    tradition: 'Hindu',
    totalVerses: 40,
    description: 'A foundational text on Bhakti Yoga by sage Narada, outlining the nature, practice, and supreme glory of divine love and devotion.',
    originalLanguage: 'Sanskrit',
    period: '~10th century CE',
    icon: '❤️',
  },
  {
    id: 'yoga-vasistha',
    name: 'Yoga Vasistha',
    tradition: 'Hindu',
    totalVerses: 29,
    description: 'A philosophical masterpiece teaching Advaita Vedanta through stories and dialogues between Sage Vasistha and Prince Rama, emphasizing self-knowledge.',
    originalLanguage: 'Sanskrit',
    period: '6th-14th century CE',
    icon: '📖',
  },
  {
    id: 'conference-of-birds',
    name: 'The Conference of the Birds',
    tradition: 'Sufi',
    totalVerses: 32,
    description: 'A masterpiece of Persian poetry by Farid ud-Din Attar - an allegorical tale of birds on a spiritual journey to find their king, the Simorgh.',
    originalLanguage: 'Persian',
    period: '12th century CE',
    icon: '🕊️',
  },
  {
    id: 'dark-night',
    name: 'Dark Night of the Soul',
    tradition: 'ChristianMystic',
    totalVerses: 40,
    description: 'St. John of the Cross\'s classic describing the two phases of spiritual purification that a soul undergoes on its journey to union with God.',
    originalLanguage: 'Spanish',
    period: '16th century CE',
    icon: '🕯️',
  },
  {
    id: 'corpus-hermeticum',
    name: 'Corpus Hermeticum',
    tradition: 'Hermetic',
    totalVerses: 31,
    description: 'Ancient Greco-Egyptian texts attributed to Hermes Trismegistus, containing teachings on divine wisdom, the nature of reality, and spiritual rebirth.',
    originalLanguage: 'Greek',
    period: '1st-3rd century CE',
    icon: '🏛️',
  },
  {
    id: 'kybalion',
    name: 'The Kybalion',
    tradition: 'Hermetic',
    totalVerses: 28,
    description: 'A modern distillation of Hermetic philosophy, outlining seven universal principles governing reality and consciousness.',
    originalLanguage: 'English',
    period: '1908 CE',
    icon: '🔺',
  },
  {
    id: 'imitation-of-christ',
    name: 'The Imitation of Christ',
    tradition: 'ChristianMystic',
    totalVerses: 31,
    description: 'Thomas à Kempis\'s beloved devotional classic, offering practical spiritual advice on living a Christ-like life and cultivating inner peace.',
    originalLanguage: 'Latin',
    period: '15th century CE',
    icon: '✝️',
  },
];

/**
 * Get verse count by source
 */
export function getVerseCountBySource(): Record<string, number> {
  const counts: Record<string, number> = {};
  ALL_VERSES.forEach(v => {
    counts[v.sourceId] = (counts[v.sourceId] || 0) + 1;
  });
  return counts;
}

/**
 * Get tradition statistics
 */
export function getTraditionStats(): Record<string, { sources: number; verses: number }> {
  const stats: Record<string, { sources: number; verses: number }> = {};
  
  ALL_SOURCES.forEach(s => {
    if (!stats[s.tradition]) {
      stats[s.tradition] = { sources: 0, verses: 0 };
    }
    stats[s.tradition].sources++;
  });
  
  ALL_VERSES.forEach(v => {
    if (stats[v.tradition]) {
      stats[v.tradition].verses++;
    }
  });
  
  return stats;
}

