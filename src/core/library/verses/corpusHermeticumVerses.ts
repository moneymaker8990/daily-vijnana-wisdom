/**
 * Corpus Hermeticum - Selected Tracts
 * 
 * Ancient Greek-Egyptian wisdom texts attributed to Hermes Trismegistus,
 * exploring the divine nature, the cosmos, and the human soul.
 * 
 * Translation: Based on G.R.S. Mead and other public domain sources
 */

import type { Verse } from '../types';

export const corpusHermeticumVerses: Verse[] = [
  // Book I: Poimandres
  { id: 'ch-1-1', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Poimandres', verseNumber: 1, text: 'Once, when I had begun to think upon the things that are, my thought was raised to a great height, and my bodily senses were put under restraint. And I saw an immeasurable vision.', translator: 'G.R.S. Mead', tags: ['vision', 'meditation', 'beginning'], difficulty: 2 },
  
  { id: 'ch-1-2', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Poimandres', verseNumber: 2, text: '"I am Poimandres, the Mind of the Sovereignty. I know what you desire, and I am with you everywhere."', translator: 'G.R.S. Mead', tags: ['divine', 'presence', 'wisdom'], difficulty: 2, commentary: 'The divine Mind reveals itself to the seeker.' },
  
  { id: 'ch-1-3', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Poimandres', verseNumber: 3, text: '"What do you wish to learn and know?" I said: "I wish to learn the nature of things and to know God."', translator: 'G.R.S. Mead', tags: ['inquiry', 'wisdom', 'devotion'], difficulty: 1 },
  
  { id: 'ch-1-4', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Poimandres', verseNumber: 4, text: '"Fix your thought upon the Light, and learn to know it." And when he had spoken this, I saw in my mind that the Light was endless, and all had become Light.', translator: 'G.R.S. Mead', tags: ['light', 'meditation', 'nonduality'], difficulty: 2 },
  
  { id: 'ch-1-5', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Poimandres', verseNumber: 5, text: '"That Light is I, Mind, your God, who was before the watery nature that appeared out of darkness. And the Light-giving Word that issued from Mind is the Son of God."', translator: 'G.R.S. Mead', tags: ['light', 'creation', 'divine'], difficulty: 3 },
  
  { id: 'ch-1-6', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Poimandres', verseNumber: 6, text: '"Mind the Father is Light and Life, and from him Man was born. Therefore, if you learn that you are made of Light and Life, you will go back again to Life."', translator: 'G.R.S. Mead', tags: ['identity', 'light', 'life'], difficulty: 3, commentary: 'Know your divine origin, and return to it.' },
  
  { id: 'ch-1-7', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Poimandres', verseNumber: 7, text: '"Let the one who has mind recognize oneself." For one who has come to know oneself has come to know the good which is above all things.', translator: 'G.R.S. Mead', tags: ['self-inquiry', 'wisdom', 'identity'], difficulty: 2 },
  
  { id: 'ch-1-8', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Poimandres', verseNumber: 8, text: '"The growth of man is deification. For he who has come to know himself has entered into the Good that is above all being."', translator: 'G.R.S. Mead', tags: ['transformation', 'nonduality', 'liberation'], difficulty: 3 },

  // Book II: The Key
  { id: 'ch-2-1', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'The Key', verseNumber: 1, text: 'All things that are moved are moved in something that is unmoved. That which moves is living; that which is moved is matter. The living gives motion to matter.', translator: 'G.R.S. Mead', tags: ['creation', 'motion', 'stillness'], difficulty: 3 },
  
  { id: 'ch-2-2', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'The Key', verseNumber: 2, text: 'God is the cause of motion, but unmoved himself. All things exist in God, but God contains nothing. He is both everywhere and nowhere.', translator: 'G.R.S. Mead', tags: ['divine', 'paradox', 'presence'], difficulty: 3 },
  
  { id: 'ch-2-3', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'The Key', verseNumber: 3, text: 'Contemplate this with your mind. Bid your soul travel to any land you choose, and sooner than you bid it go, it will already be there.', translator: 'G.R.S. Mead', tags: ['mind', 'consciousness', 'freedom'], difficulty: 2 },
  
  { id: 'ch-2-4', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'The Key', verseNumber: 4, text: 'Bid your soul leap up to heaven, and it will need no wings. Nothing can prevent it—not the fire of the sun, not the aether, not the whirling of the spheres, not the bodies of the stars.', translator: 'G.R.S. Mead', tags: ['consciousness', 'freedom', 'spirit'], difficulty: 2 },
  
  { id: 'ch-2-5', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'The Key', verseNumber: 5, text: 'Think that you are not yet born, that you are in the womb, that you are young, old, dead, beyond death. Grasp all this at once—all times, all places—and you will know God.', translator: 'G.R.S. Mead', tags: ['consciousness', 'nonduality', 'meditation'], difficulty: 4 },

  // Book III: The Sacred Discourse
  { id: 'ch-3-1', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Sacred Discourse', verseNumber: 1, text: 'The glory of all things is God—divine both the nature and the work. The beginning of existing things is God, who is Mind and Nature and Matter, being the Wisdom that shows forth all things.', translator: 'G.R.S. Mead', tags: ['divine', 'creation', 'wisdom'], difficulty: 3 },
  
  { id: 'ch-3-2', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Sacred Discourse', verseNumber: 2, text: 'God is all things: the invisible and the visible, the comprehensible and the incomprehensible, the temporal and the eternal.', translator: 'G.R.S. Mead', tags: ['divine', 'nonduality', 'paradox'], difficulty: 3 },

  // Book IV: The Cup (Krater)
  { id: 'ch-4-1', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'The Cup', verseNumber: 1, text: 'God made Man, and gave him Mind. But he did not give Mind to all, wishing that it should be a prize that souls must struggle for.', translator: 'G.R.S. Mead', tags: ['mind', 'grace', 'discipline'], difficulty: 2 },
  
  { id: 'ch-4-2', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'The Cup', verseNumber: 2, text: 'God sent down a great bowl filled with Mind, and sent a herald to proclaim: "Baptize yourself, you who can, in this bowl, you who believe you will ascend to him who sent it down."', translator: 'G.R.S. Mead', tags: ['grace', 'transformation', 'devotion'], difficulty: 3, commentary: 'Those who immerse in Mind are transformed.' },
  
  { id: 'ch-4-3', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'The Cup', verseNumber: 3, text: 'Those who heeded the proclamation and were baptized in Mind, they received a share of knowledge. They became perfect and initiates of the Mind.', translator: 'G.R.S. Mead', tags: ['wisdom', 'transformation', 'initiation'], difficulty: 2 },
  
  { id: 'ch-4-4', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'The Cup', verseNumber: 4, text: 'But those who failed to heed the proclamation, they have reason but not Mind. They do not know for what purpose they were created.', translator: 'G.R.S. Mead', tags: ['wisdom', 'inquiry', 'shadow'], difficulty: 2 },

  // Book X: The Key of Hermes
  { id: 'ch-10-1', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Key of Hermes', verseNumber: 1, text: 'The soul is an incorporeal substance, and even when in the body, it does not depart from its essential nature. For by its very essence it is always in motion.', translator: 'G.R.S. Mead', tags: ['soul', 'motion', 'essence'], difficulty: 3 },
  
  { id: 'ch-10-2', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Key of Hermes', verseNumber: 2, text: 'The soul that has not known the truth has never been saved. Such a soul wanders, led astray by demons. But the good soul, rising upward, returns to its source.', translator: 'G.R.S. Mead', tags: ['soul', 'liberation', 'truth'], difficulty: 3 },
  
  { id: 'ch-10-3', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Key of Hermes', verseNumber: 3, text: 'No part of the cosmos is empty of God. He fills all things with himself; he is both within all things and around all things.', translator: 'G.R.S. Mead', tags: ['divine', 'presence', 'nonduality'], difficulty: 2 },

  // Book XI: Mind to Hermes
  { id: 'ch-11-1', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Mind to Hermes', verseNumber: 1, text: '"Can you conceive of God?" "No." "Yet you speak of God." "The inconceivable alone speaks truth of God. What can be said falls short."', translator: 'G.R.S. Mead', tags: ['mystery', 'divine', 'paradox'], difficulty: 3 },
  
  { id: 'ch-11-2', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Mind to Hermes', verseNumber: 2, text: 'God cannot be seen with eyes, or heard with ears, or spoken with a tongue. God can only be known by Mind—and that Mind must be purified.', translator: 'G.R.S. Mead', tags: ['meditation', 'purity', 'vision'], difficulty: 3 },
  
  { id: 'ch-11-3', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Mind to Hermes', verseNumber: 3, text: 'If you do not make yourself equal to God, you cannot know God. For like is known by like. Leap free from all that is bodily, and become like God.', translator: 'G.R.S. Mead', tags: ['transformation', 'nonduality', 'discipline'], difficulty: 4, commentary: 'To know God, become God-like.' },
  
  { id: 'ch-11-4', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Mind to Hermes', verseNumber: 4, text: 'Rise above all time and become eternal. Then you will know God. Believe that nothing is impossible. Consider yourself immortal and capable of knowing all things.', translator: 'G.R.S. Mead', tags: ['transformation', 'wisdom', 'presence'], difficulty: 3 },
  
  { id: 'ch-11-5', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Mind to Hermes', verseNumber: 5, text: 'Become higher than all heights and lower than all depths. Collect into yourself all sensations of things—fire, water, wet, dry. Be everywhere at once—on land, in sea, in sky.', translator: 'G.R.S. Mead', tags: ['meditation', 'consciousness', 'nonduality'], difficulty: 4 },

  // Book XIII: The Secret Discourse
  { id: 'ch-13-1', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Secret Discourse', verseNumber: 1, text: 'The vision of rebirth, my son, cannot be taught. It is remembered when God wills. The old nature dies, the new is born.', translator: 'G.R.S. Mead', tags: ['rebirth', 'transformation', 'grace'], difficulty: 3 },
  
  { id: 'ch-13-2', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Secret Discourse', verseNumber: 2, text: '"Who effects this rebirth?" "The son of God, the one Man, by God\'s will." "And what kind of man is born?" "God\'s son, the All in all, composed of all the powers."', translator: 'G.R.S. Mead', tags: ['rebirth', 'divine', 'nonduality'], difficulty: 4 },
  
  { id: 'ch-13-3', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Secret Discourse', verseNumber: 3, text: '"I have passed beyond myself. I am no longer what I was. I have been born in Mind. This is not a thing of the body—I see now not with bodily sight."', translator: 'G.R.S. Mead', tags: ['rebirth', 'transformation', 'vision'], difficulty: 3, commentary: 'Spiritual rebirth: a new identity beyond body and personality.' },
  
  { id: 'ch-13-4', sourceId: 'corpus-hermeticum', sourceName: 'Corpus Hermeticum', tradition: 'Hermetic', chapter: 'Secret Discourse', verseNumber: 4, text: '"I have become immortal. No longer am I what I seemed before. I have been born in Mind. This body that was mine—I know it now for a dream."', translator: 'G.R.S. Mead', tags: ['rebirth', 'dream', 'liberation'], difficulty: 3 },
];

export default corpusHermeticumVerses;

