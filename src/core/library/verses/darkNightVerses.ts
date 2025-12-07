/**
 * Dark Night of the Soul - St. John of the Cross
 * 
 * A 16th-century mystical poem and commentary by the Spanish Carmelite friar,
 * describing the soul's journey through darkness toward divine union.
 * 
 * Translation: Based on E. Allison Peers and other public domain sources
 */

import type { Verse } from '../types';

export const darkNightVerses: Verse[] = [
  // The Poem
  { id: 'dn-poem-1', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'The Poem', verseNumber: 1, text: 'On a dark night, kindled in love with yearnings—oh, happy chance!—I went forth without being observed, my house being now at rest.', translator: 'E. Allison Peers', tags: ['journey', 'love', 'stillness'], difficulty: 2, commentary: 'The opening: the soul secretly escapes from the house of the senses.' },
  
  { id: 'dn-poem-2', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'The Poem', verseNumber: 2, text: 'In darkness and secure, by the secret ladder, disguised—oh, happy chance!—in darkness and in concealment, my house being now at rest.', translator: 'E. Allison Peers', tags: ['darkness', 'mystery', 'surrender'], difficulty: 2 },
  
  { id: 'dn-poem-3', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'The Poem', verseNumber: 3, text: 'In the happy night, in secret, when none saw me, nor I beheld aught, without light or guide, save that which burned in my heart.', translator: 'E. Allison Peers', tags: ['darkness', 'love', 'guidance'], difficulty: 2, commentary: 'The inner light guides when all outer lights fail.' },
  
  { id: 'dn-poem-4', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'The Poem', verseNumber: 4, text: 'This light guided me more surely than the light of noonday, to the place where one waited for me whom I knew well, in a place where none appeared.', translator: 'E. Allison Peers', tags: ['guidance', 'love', 'devotion'], difficulty: 2 },
  
  { id: 'dn-poem-5', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'The Poem', verseNumber: 5, text: 'Oh, night that guided me! Oh, night more lovely than the dawn! Oh, night that joined Beloved with lover, lover transformed in the Beloved!', translator: 'E. Allison Peers', tags: ['darkness', 'love', 'nonduality'], difficulty: 3 },
  
  { id: 'dn-poem-6', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'The Poem', verseNumber: 6, text: 'Upon my flowery breast, kept wholly for himself alone, there he stayed sleeping, and I caressed him, and the fanning of the cedars made a breeze.', translator: 'E. Allison Peers', tags: ['love', 'stillness', 'presence'], difficulty: 2 },
  
  { id: 'dn-poem-7', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'The Poem', verseNumber: 7, text: 'The breeze blew from the turret as I parted his locks; with his gentle hand he wounded my neck and caused all my senses to be suspended.', translator: 'E. Allison Peers', tags: ['love', 'transformation', 'stillness'], difficulty: 3 },
  
  { id: 'dn-poem-8', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'The Poem', verseNumber: 8, text: 'I remained, lost in oblivion; my face I reclined on the Beloved. All ceased and I abandoned myself, leaving my cares forgotten among the lilies.', translator: 'E. Allison Peers', tags: ['surrender', 'stillness', 'nonduality'], difficulty: 3, commentary: 'The final stanza: complete self-abandonment in divine union.' },

  // Book One: The Night of the Senses
  { id: 'dn-1-1', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Night of Senses', verseNumber: 1, text: 'Souls begin to enter this dark night when God is drawing them out of the state of beginners and leading them to that of proficients.', translator: 'E. Allison Peers', tags: ['journey', 'transformation', 'darkness'], difficulty: 2 },
  
  { id: 'dn-1-2', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Night of Senses', verseNumber: 2, text: 'God weans the soul from the breasts of consolation, puts it down from his arms, and teaches it to walk alone.', translator: 'E. Allison Peers', tags: ['transformation', 'solitude', 'journey'], difficulty: 2, commentary: 'God removes spiritual consolations so the soul can mature.' },
  
  { id: 'dn-1-3', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Night of Senses', verseNumber: 3, text: 'The soul finds no sweetness or pleasure in the things of God; neither does it find pleasure in other created things.', translator: 'E. Allison Peers', tags: ['suffering', 'surrender', 'darkness'], difficulty: 2 },
  
  { id: 'dn-1-4', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Night of Senses', verseNumber: 4, text: 'The soul ordinarily has anxiety and care about God, thinking it is not serving God but falling backward, because it finds no sweetness in the things of God.', translator: 'E. Allison Peers', tags: ['fear', 'devotion', 'doubt'], difficulty: 2 },
  
  { id: 'dn-1-5', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Night of Senses', verseNumber: 5, text: 'The cause of this dryness is that God transfers the goods and the strength of the senses to the spirit.', translator: 'E. Allison Peers', tags: ['transformation', 'senses', 'spirit'], difficulty: 3 },
  
  { id: 'dn-1-6', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Night of Senses', verseNumber: 6, text: 'God leads into the dark night those whom he desires to purify from all their imperfections, so as to bring them forward to divine union.', translator: 'E. Allison Peers', tags: ['darkness', 'transformation', 'nonduality'], difficulty: 3 },

  // Book Two: The Night of the Spirit
  { id: 'dn-2-1', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Night of Spirit', verseNumber: 1, text: 'This dark contemplation produces in the soul a profound darkness, which makes the soul feel that it is very far from God.', translator: 'E. Allison Peers', tags: ['darkness', 'suffering', 'meditation'], difficulty: 3 },
  
  { id: 'dn-2-2', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Night of Spirit', verseNumber: 2, text: 'The shadow cast by God\'s light is as terrible as God\'s light is beautiful. The soul feels itself so impure that God seems to be against it.', translator: 'E. Allison Peers', tags: ['darkness', 'shadow', 'suffering'], difficulty: 3, commentary: 'Divine light reveals one\'s imperfections.' },
  
  { id: 'dn-2-3', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Night of Spirit', verseNumber: 3, text: 'The soul feels as if a great weight of darkness and suffering were upon it. All seems to be against it. This is the dark night of the spirit.', translator: 'E. Allison Peers', tags: ['darkness', 'suffering', 'journey'], difficulty: 3 },
  
  { id: 'dn-2-4', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Night of Spirit', verseNumber: 4, text: 'This dark night of love does not annihilate the soul but transforms it. It destroys what is human and creates what is divine.', translator: 'E. Allison Peers', tags: ['transformation', 'love', 'death'], difficulty: 4 },
  
  { id: 'dn-2-5', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Night of Spirit', verseNumber: 5, text: 'The fire of divine love first purges the soul, heating and blackening it with its smoke. Then it illuminates and cleanses it. Finally it transforms it.', translator: 'E. Allison Peers', tags: ['transformation', 'love', 'fire'], difficulty: 3 },
  
  { id: 'dn-2-6', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Night of Spirit', verseNumber: 6, text: 'The soul must pass through this dark night of mortification of appetites and denial of pleasures before it can arrive at divine union.', translator: 'E. Allison Peers', tags: ['discipline', 'surrender', 'nonduality'], difficulty: 3 },

  // On Contemplation
  { id: 'dn-3-1', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Contemplation', verseNumber: 1, text: 'Contemplation is nothing but a secret, peaceful, and loving infusion from God, which inflames the soul with the spirit of love.', translator: 'E. Allison Peers', tags: ['meditation', 'love', 'stillness'], difficulty: 2 },
  
  { id: 'dn-3-2', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Contemplation', verseNumber: 2, text: 'The soul must be emptied of everything that can fall within its capacity, so that God may fill it with himself.', translator: 'E. Allison Peers', tags: ['emptiness', 'surrender', 'grace'], difficulty: 3, commentary: 'Divine fullness requires human emptiness.' },
  
  { id: 'dn-3-3', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Contemplation', verseNumber: 3, text: 'The road that leads to God does not consist in a multitude of meditations or ways, but in one thing only: knowing how to deny oneself.', translator: 'E. Allison Peers', tags: ['surrender', 'discipline', 'simplicity'], difficulty: 2 },
  
  { id: 'dn-3-4', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Contemplation', verseNumber: 4, text: 'The wisdom of God is so pure that the soul must also be pure and simple if it is to receive and experience it.', translator: 'E. Allison Peers', tags: ['wisdom', 'simplicity', 'purity'], difficulty: 2 },
  
  { id: 'dn-3-5', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Contemplation', verseNumber: 5, text: 'In this dark night of contemplation, the soul lies hidden with the Beloved, transformed into love.', translator: 'E. Allison Peers', tags: ['meditation', 'love', 'nonduality'], difficulty: 3 },

  // On Divine Union
  { id: 'dn-4-1', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Divine Union', verseNumber: 1, text: 'In this union, the soul becomes God by participation. Though remaining distinct in its being, it becomes one with God in love.', translator: 'E. Allison Peers', tags: ['nonduality', 'love', 'transformation'], difficulty: 4, commentary: 'The soul becomes divine while remaining itself—union without confusion.' },
  
  { id: 'dn-4-2', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Divine Union', verseNumber: 2, text: 'The soul now lives the life of God. Its understanding becomes divine understanding; its will, divine will; its memory, divine memory.', translator: 'E. Allison Peers', tags: ['nonduality', 'transformation', 'presence'], difficulty: 4 },
  
  { id: 'dn-4-3', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Divine Union', verseNumber: 3, text: 'The soul that has passed through the dark night has become so united with God that there is nothing between them.', translator: 'E. Allison Peers', tags: ['nonduality', 'love', 'union'], difficulty: 3 },
  
  { id: 'dn-4-4', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Divine Union', verseNumber: 4, text: 'The soul feels such love for God that it desires to be consumed and transformed into God.', translator: 'E. Allison Peers', tags: ['love', 'devotion', 'transformation'], difficulty: 3 },
  
  { id: 'dn-4-5', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Divine Union', verseNumber: 5, text: 'In this state, the soul sees all things in God and God in all things. It sees how God is the essence and substance of all.', translator: 'E. Allison Peers', tags: ['vision', 'nonduality', 'presence'], difficulty: 3 },

  // Practical Guidance
  { id: 'dn-5-1', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Guidance', verseNumber: 1, text: 'In the night of sense, the soul must be patient, not distressed. God is working invisibly. Trust in darkness as in light.', translator: 'E. Allison Peers', tags: ['patience', 'trust', 'darkness'], difficulty: 2 },
  
  { id: 'dn-5-2', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Guidance', verseNumber: 2, text: 'Do not seek consolations. The desire for spiritual sweetness is itself an impurity. Seek God, not his gifts.', translator: 'E. Allison Peers', tags: ['surrender', 'devotion', 'discipline'], difficulty: 3 },
  
  { id: 'dn-5-3', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Guidance', verseNumber: 3, text: 'To arrive at possessing everything, desire to possess nothing. To arrive at being everything, desire to be nothing.', translator: 'E. Allison Peers', tags: ['paradox', 'surrender', 'nonduality'], difficulty: 4, commentary: 'The path of negation leads to fullness.' },
  
  { id: 'dn-5-4', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Guidance', verseNumber: 4, text: 'When you dwell upon anything, you cease to cast yourself upon the All. For to pass from all to the All, you must deny yourself all in all.', translator: 'E. Allison Peers', tags: ['surrender', 'nonduality', 'discipline'], difficulty: 4 },
  
  { id: 'dn-5-5', sourceId: 'dark-night', sourceName: 'Dark Night of the Soul', tradition: 'ChristianMystic', chapter: 'Guidance', verseNumber: 5, text: 'When you come to possess the All, you must possess it without wanting anything.', translator: 'E. Allison Peers', tags: ['surrender', 'freedom', 'paradox'], difficulty: 3 },
];

export default darkNightVerses;

