/**
 * The Kybalion - Seven Hermetic Principles
 * 
 * A 1908 text presenting the essence of Hermetic philosophy through
 * seven universal principles. Though modern, it draws on ancient wisdom.
 * 
 * Translation: The Three Initiates (public domain)
 */

import type { Verse } from '../types';

export const kybalionVerses: Verse[] = [
  // Introduction
  { id: 'kyb-intro-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Introduction', verseNumber: 1, text: '"The lips of wisdom are closed, except to the ears of understanding." Under all the outer shows of the universe, there is a reality—a substance that underlies all.', translator: 'Three Initiates', tags: ['wisdom', 'mystery', 'nonduality'], difficulty: 2 },
  
  { id: 'kyb-intro-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Introduction', verseNumber: 2, text: 'The possession of knowledge, unless accompanied by a manifestation in action, is like hoarding precious metals—vain and foolish. Knowledge, like wealth, is intended for use.', translator: 'Three Initiates', tags: ['wisdom', 'action', 'discipline'], difficulty: 1 },

  // Principle 1: Mentalism
  { id: 'kyb-1-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Mentalism', verseNumber: 1, text: '"THE ALL is MIND; the Universe is Mental." This Principle embodies the truth that "All is Mind." The Universe is a mental creation of THE ALL.', translator: 'Three Initiates', tags: ['consciousness', 'creation', 'nonduality'], difficulty: 3, commentary: 'The first principle: everything exists in and as Mind.' },
  
  { id: 'kyb-1-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Mentalism', verseNumber: 2, text: 'THE ALL creates in its Infinite Mind countless universes, which exist for aeons of time—and yet, to THE ALL, the creation, development, and decline of these universes is as but an instant.', translator: 'Three Initiates', tags: ['consciousness', 'creation', 'time'], difficulty: 3 },
  
  { id: 'kyb-1-3', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Mentalism', verseNumber: 3, text: 'THE ALL is in every thought, act, and experience. Nothing exists outside THE ALL. Everything is held in the Mind of THE ALL.', translator: 'Three Initiates', tags: ['nonduality', 'presence', 'consciousness'], difficulty: 2 },

  // Principle 2: Correspondence
  { id: 'kyb-2-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Correspondence', verseNumber: 1, text: '"As above, so below; as below, so above." This Principle embodies the truth that there is always a correspondence between the laws of the various planes of existence.', translator: 'Three Initiates', tags: ['unity', 'wisdom', 'nature'], difficulty: 2, commentary: 'The famous maxim: the microcosm reflects the macrocosm.' },
  
  { id: 'kyb-2-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Correspondence', verseNumber: 2, text: 'The old Hermetic axiom ran: "As above, so below; as below, so above." Understanding this principle enables one to reason from the known to the unknown.', translator: 'Three Initiates', tags: ['wisdom', 'inquiry', 'nature'], difficulty: 2 },
  
  { id: 'kyb-2-3', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Correspondence', verseNumber: 3, text: 'The same laws that govern the atom govern the solar system. The same patterns repeat at every scale. This is the Law of Correspondence.', translator: 'Three Initiates', tags: ['nature', 'unity', 'cosmos'], difficulty: 2 },

  // Principle 3: Vibration
  { id: 'kyb-3-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Vibration', verseNumber: 1, text: '"Nothing rests; everything moves; everything vibrates." This Principle embodies the truth that everything is in motion—that nothing is at rest.', translator: 'Three Initiates', tags: ['motion', 'nature', 'change'], difficulty: 2, commentary: 'The third principle: everything vibrates at different rates.' },
  
  { id: 'kyb-3-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Vibration', verseNumber: 2, text: 'From THE ALL, which is pure Spirit, down to the grossest form of matter, all is in vibration. The higher the vibration, the closer to Spirit.', translator: 'Three Initiates', tags: ['spirit', 'matter', 'transformation'], difficulty: 2 },
  
  { id: 'kyb-3-3', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Vibration', verseNumber: 3, text: 'One who understands the Principle of Vibration has grasped the scepter of power. By changing vibration, one can change their mental states and conditions.', translator: 'Three Initiates', tags: ['transformation', 'mind', 'discipline'], difficulty: 3 },

  // Principle 4: Polarity
  { id: 'kyb-4-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Polarity', verseNumber: 1, text: '"Everything is dual; everything has poles; everything has its pair of opposites; like and unlike are the same; opposites are identical in nature, but different in degree."', translator: 'Three Initiates', tags: ['duality', 'nonduality', 'nature'], difficulty: 3, commentary: 'Opposites are the same thing differing only in degree.' },
  
  { id: 'kyb-4-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Polarity', verseNumber: 2, text: 'Heat and cold are identical in nature—the differences being merely a matter of degree. The same is true of light and darkness, hard and soft, sharp and dull.', translator: 'Three Initiates', tags: ['duality', 'nature', 'paradox'], difficulty: 2 },
  
  { id: 'kyb-4-3', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Polarity', verseNumber: 3, text: 'Love and hate, the most apparently different emotions, are but different degrees of the same thing. Fear and courage, likewise, are poles of the same quality.', translator: 'Three Initiates', tags: ['love', 'fear', 'transformation'], difficulty: 2 },
  
  { id: 'kyb-4-4', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Polarity', verseNumber: 4, text: 'Mental transmutation is the practical application of this Principle. A thing may be transmuted from one pole to another—from hate to love, from darkness to light.', translator: 'Three Initiates', tags: ['transformation', 'mind', 'alchemy'], difficulty: 3 },

  // Principle 5: Rhythm
  { id: 'kyb-5-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Rhythm', verseNumber: 1, text: '"Everything flows, out and in; everything has its tides; all things rise and fall; the pendulum-swing manifests in everything."', translator: 'Three Initiates', tags: ['flow', 'nature', 'change'], difficulty: 2, commentary: 'The fifth principle: the rhythmic swing between poles.' },
  
  { id: 'kyb-5-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Rhythm', verseNumber: 2, text: 'The measure of the swing to the right is the measure of the swing to the left. Rhythm compensates. There is always an action and a reaction.', translator: 'Three Initiates', tags: ['nature', 'flow', 'balance'], difficulty: 2 },
  
  { id: 'kyb-5-3', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Rhythm', verseNumber: 3, text: 'The Master polarizes at the desired point and neutralizes the backward swing of the pendulum. Thus, the Law of Rhythm is used rather than escaped.', translator: 'Three Initiates', tags: ['discipline', 'mastery', 'stillness'], difficulty: 3 },

  // Principle 6: Cause and Effect
  { id: 'kyb-6-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Cause and Effect', verseNumber: 1, text: '"Every cause has its effect; every effect has its cause; everything happens according to law; chance is but a name for law not recognized."', translator: 'Three Initiates', tags: ['action', 'karma', 'law'], difficulty: 2, commentary: 'The sixth principle: nothing happens by chance.' },
  
  { id: 'kyb-6-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Cause and Effect', verseNumber: 2, text: 'There is a cause for every effect, an effect from every cause. Nothing ever "merely happens"—there is no such thing as chance.', translator: 'Three Initiates', tags: ['karma', 'law', 'wisdom'], difficulty: 2 },
  
  { id: 'kyb-6-3', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Cause and Effect', verseNumber: 3, text: 'The masses are carried along by their environment and the wills of others. The Masters rise above the plane and become Causers rather than Effects.', translator: 'Three Initiates', tags: ['mastery', 'freedom', 'action'], difficulty: 3 },

  // Principle 7: Gender
  { id: 'kyb-7-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Gender', verseNumber: 1, text: '"Gender is in everything; everything has its masculine and feminine principles; gender manifests on all planes."', translator: 'Three Initiates', tags: ['duality', 'nature', 'creation'], difficulty: 2, commentary: 'The seventh principle: creative polarity exists in all things.' },
  
  { id: 'kyb-7-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Gender', verseNumber: 2, text: 'The Masculine principle tends toward giving; the Feminine principle tends toward receiving. Neither can exist without the other. Creation requires both.', translator: 'Three Initiates', tags: ['creation', 'balance', 'nature'], difficulty: 2 },
  
  { id: 'kyb-7-3', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Gender', verseNumber: 3, text: 'No creation is possible without this principle—on the physical, mental, or spiritual planes. This is the mystery of creation itself.', translator: 'Three Initiates', tags: ['creation', 'mystery', 'nature'], difficulty: 3 },

  // Mental Transmutation
  { id: 'kyb-8-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Mental Transmutation', verseNumber: 1, text: '"Mind may be transmuted from state to state, degree to degree, condition to condition, pole to pole, vibration to vibration." This is the Art of Mental Alchemy.', translator: 'Three Initiates', tags: ['transformation', 'mind', 'alchemy'], difficulty: 3 },
  
  { id: 'kyb-8-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Mental Transmutation', verseNumber: 2, text: 'THE ALL is immutable—but forms, shapes, conditions, and states are subject to change. This change of mental states is Mental Transmutation.', translator: 'Three Initiates', tags: ['transformation', 'consciousness', 'mastery'], difficulty: 3 },
  
  { id: 'kyb-8-3', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Mental Transmutation', verseNumber: 3, text: 'The art of polarization becomes the art of mental alchemy. By changing your polarity, you master your moods and mental states instead of being their slave.', translator: 'Three Initiates', tags: ['transformation', 'mastery', 'freedom'], difficulty: 3, commentary: 'The practical application: transmute negative to positive.' },
  
  { id: 'kyb-8-4', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Mental Transmutation', verseNumber: 4, text: '"He who grasps the truth of the mental nature of the Universe is well advanced on the path to Mastery." Nothing real can be harmed; all is Mind.', translator: 'Three Initiates', tags: ['consciousness', 'nonduality', 'mastery'], difficulty: 3 },
  
  { id: 'kyb-9-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Plane of Correspondence', verseNumber: 1, text: 'There are great planes of consciousness, from the lowest to the highest. But all are subject to the same Laws—from the smallest atom to the greatest sun.', translator: 'Three Initiates', tags: ['consciousness', 'law', 'correspondence'], difficulty: 2 },
  
  { id: 'kyb-9-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Plane of Correspondence', verseNumber: 2, text: 'Man dwells on the physical plane, but his being extends upward through the mental and spiritual planes. He is a citizen of many realms.', translator: 'Three Initiates', tags: ['consciousness', 'humanity', 'spirit'], difficulty: 2 },
  
  { id: 'kyb-9-3', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Plane of Correspondence', verseNumber: 3, text: 'The wise one studies the known to understand the unknown. The principles operating on the lowest plane reveal those operating on the highest.', translator: 'Three Initiates', tags: ['wisdom', 'correspondence', 'inquiry'], difficulty: 2 },
  
  { id: 'kyb-10-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Whole and Part', verseNumber: 1, text: 'While All is in THE ALL, it is equally true that THE ALL is in All. He who truly understands this truth has great knowledge.', translator: 'Three Initiates', tags: ['nonduality', 'divine', 'paradox'], difficulty: 3, commentary: 'The paradox of immanence: God is in everything, and everything is in God.' },
  
  { id: 'kyb-10-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Whole and Part', verseNumber: 2, text: 'THE ALL creates within its Infinite Mind countless universes, which exist for aeons of time—and yet to THE ALL, they are but the wink of an eye.', translator: 'Three Initiates', tags: ['divine', 'time', 'creation'], difficulty: 3 },
  
  { id: 'kyb-10-3', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Whole and Part', verseNumber: 3, text: 'The mind of man, like the mind of THE ALL, contains within it the power to create. Man creates mental worlds just as THE ALL creates the Universe.', translator: 'Three Initiates', tags: ['consciousness', 'creation', 'mind'], difficulty: 2 },
  
  { id: 'kyb-11-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Divine Paradox', verseNumber: 1, text: 'Under the same Laws, the wise proceed in the opposite direction. While the masses sink into materiality, the wise rise toward Spirit.', translator: 'Three Initiates', tags: ['wisdom', 'freedom', 'discipline'], difficulty: 2 },
  
  { id: 'kyb-11-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Divine Paradox', verseNumber: 2, text: 'The Universe exists by reason of these Laws. These same Laws allow the wise to escape from the lower planes to the higher.', translator: 'Three Initiates', tags: ['law', 'liberation', 'wisdom'], difficulty: 2 },
  
  { id: 'kyb-11-3', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Divine Paradox', verseNumber: 3, text: 'The half-wise, recognizing the unreality of the Universe, imagine that they may defy its Laws. Such are vain fools; they are dashed against the rocks.', translator: 'Three Initiates', tags: ['wisdom', 'discipline', 'shadow'], difficulty: 2 },
  
  { id: 'kyb-11-4', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Divine Paradox', verseNumber: 4, text: 'The truly wise, knowing the nature of the Universe, use Law against laws, the higher against the lower, and by Alchemy transmute the undesirable into the worthy.', translator: 'Three Initiates', tags: ['alchemy', 'mastery', 'transformation'], difficulty: 3 },
  
  { id: 'kyb-12-1', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Axioms', verseNumber: 1, text: 'The possession of Knowledge, unless accompanied by a manifestation and expression in Action, is like the hoarding of precious metals—a vain and foolish thing.', translator: 'Three Initiates', tags: ['wisdom', 'action', 'discipline'], difficulty: 2 },
  
  { id: 'kyb-12-2', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Axioms', verseNumber: 2, text: 'Knowledge, like Wealth, is intended for Use. The Law of Use is universal, and he who violates it suffers by reason of his conflict with natural forces.', translator: 'Three Initiates', tags: ['wisdom', 'action', 'law'], difficulty: 2 },
  
  { id: 'kyb-12-3', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Axioms', verseNumber: 3, text: 'To change your mood or mental state, change your vibration. This is the secret of mental alchemy: raise the vibration, and the state changes.', translator: 'Three Initiates', tags: ['transformation', 'vibration', 'alchemy'], difficulty: 2 },
  
  { id: 'kyb-12-4', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Axioms', verseNumber: 4, text: 'The wise ones serve on the higher planes, but they rule on the lower. In this way, they operate under the Law of the higher, while ruling as masters on the lower.', translator: 'Three Initiates', tags: ['mastery', 'service', 'wisdom'], difficulty: 3 },
  
  { id: 'kyb-12-5', sourceId: 'kybalion', sourceName: 'The Kybalion', tradition: 'Hermetic', chapter: 'Axioms', verseNumber: 5, text: '"The lips of wisdom are closed, except to the ears of Understanding." This is the great paradox: those who know, speak carefully; those who speak freely, know little.', translator: 'Three Initiates', tags: ['wisdom', 'silence', 'discipline'], difficulty: 2, commentary: 'True wisdom speaks only to those ready to receive.' },
];

export default kybalionVerses;

