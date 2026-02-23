/**
 * Letters to Lucilius — Seneca
 *
 * 124 moral letters written to his friend Lucilius in Seneca's final
 * years (~63-65 CE), blending practical advice with profound wisdom.
 *
 * Translation: Richard Mott Gummere (1917, public domain)
 */

import type { Verse } from '../types';

export const stoicLettersVerses: Verse[] = [
  // Letter 1 — On Saving Time
  { id: 'sen-1-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 1', verseNumber: 1, text: 'Continue to act thus, my dear Lucilius—set yourself free for your own sake; gather and save your time, which till lately has been forced from you, or filched away, or has merely slipped from your hands.', translator: 'Richard Mott Gummere', tags: ['time', 'present-moment', 'self-mastery'], difficulty: 1, commentary: 'The very first letter opens with what Seneca considers the most urgent problem of human life: we squander the one resource that can never be recovered.' },

  { id: 'sen-1-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 1', verseNumber: 2, text: 'It is not that we have a short time to live, but that we waste a great deal of it. Life is long enough, and a sufficiently generous amount has been given to us for the highest achievements if it were all well invested.', translator: 'Richard Mott Gummere', tags: ['time', 'wisdom', 'present-moment'], difficulty: 1 },

  { id: 'sen-1-3', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 1', verseNumber: 3, text: 'Hold every hour in your grasp. Lay hold of to-day\'s task, and you will not need to depend so much upon to-morrow\'s. While we are postponing, life speeds by.', translator: 'Richard Mott Gummere', tags: ['time', 'present-moment', 'discipline'], difficulty: 1 },

  // Letter 2 — On Discursiveness in Reading
  { id: 'sen-2-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 2', verseNumber: 1, text: 'The primary indication, to my thinking, of a well-ordered mind is a man\'s ability to remain in one place and linger in his own company.', translator: 'Richard Mott Gummere', tags: ['self-mastery', 'tranquility', 'simplicity'], difficulty: 1 },

  { id: 'sen-2-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 2', verseNumber: 2, text: 'You must linger among a limited number of master thinkers, and digest their works, if you would derive ideas which shall win firm hold in your mind. Everywhere means nowhere.', translator: 'Richard Mott Gummere', tags: ['wisdom', 'discipline', 'simplicity'], difficulty: 1, commentary: 'Seneca warns against intellectual restlessness. True learning requires depth, not breadth—a principle applicable to all contemplative traditions.' },

  // Letter 3 — On True and False Friendship
  { id: 'sen-3-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 3', verseNumber: 1, text: 'Ponder for a long time whether you shall admit a given person to your friendship; but when you have decided to admit him, welcome him with all your heart and soul. Speak as boldly with him as with yourself.', translator: 'Richard Mott Gummere', tags: ['friendship', 'virtue', 'courage'], difficulty: 1 },

  // Letter 7 — On Crowds
  { id: 'sen-7-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 7', verseNumber: 1, text: 'Do you ask me what you should regard as especially to be avoided? I say, crowds; for as yet you cannot trust yourself to them with safety.', translator: 'Richard Mott Gummere', tags: ['self-mastery', 'simplicity', 'virtue'], difficulty: 1 },

  { id: 'sen-7-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 7', verseNumber: 2, text: 'To consort with the crowd is harmful; there is no person who does not make some vice attractive to us, or stamp it upon us, or taint us unconsciously therewith.', translator: 'Richard Mott Gummere', tags: ['self-mastery', 'virtue', 'discipline'], difficulty: 2 },

  { id: 'sen-7-3', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 7', verseNumber: 3, text: 'Associate with those who will make a better man of you. Welcome those whom you yourself can improve. The process is mutual; for men learn while they teach.', translator: 'Richard Mott Gummere', tags: ['friendship', 'wisdom', 'virtue'], difficulty: 1, commentary: 'Seneca anticipates modern psychology on social influence: we become like those we surround ourselves with. Choose companions who elevate.' },

  // Letter 12 — On Old Age
  { id: 'sen-12-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 12', verseNumber: 1, text: 'Let us cherish and love old age; for it is full of pleasure if one knows how to use it. Fruits are most welcome when almost over; youth is most charming at its close.', translator: 'Richard Mott Gummere', tags: ['death', 'time', 'present-moment'], difficulty: 2 },

  // Letter 13 — On Groundless Fears
  { id: 'sen-13-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 13', verseNumber: 1, text: 'There are more things, Lucilius, likely to frighten us than there are to crush us; we suffer more often in imagination than in reality.', translator: 'Richard Mott Gummere', tags: ['suffering', 'courage', 'wisdom'], difficulty: 1, commentary: 'One of Seneca\'s most quoted lines. Anxiety is almost always worse than the event itself—a truth that bridges Stoic philosophy and modern cognitive therapy.' },

  { id: 'sen-13-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 13', verseNumber: 2, text: 'What I advise you to do is, not to be unhappy before the crisis comes; since it may be that the dangers before which you paled as if they were threatening you, will never come upon you.', translator: 'Richard Mott Gummere', tags: ['suffering', 'courage', 'present-moment'], difficulty: 1 },

  // Letter 16 — On Philosophy, the Guide of Life
  { id: 'sen-16-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 16', verseNumber: 1, text: 'It is clear to you, I am sure, Lucilius, that no man can live a happy life, or even a supportable life, without the study of wisdom; and that a happy life is reached when our wisdom is brought to completion.', translator: 'Richard Mott Gummere', tags: ['wisdom', 'virtue', 'discipline'], difficulty: 2 },

  { id: 'sen-16-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 16', verseNumber: 2, text: 'Philosophy is not a thing for idle moments; she shapes and constructs the soul, she orders our life, guides our conduct, shows us what we should do and what we should leave undone.', translator: 'Richard Mott Gummere', tags: ['wisdom', 'virtue', 'discipline'], difficulty: 2 },

  // Letter 24 — On Despising Death
  { id: 'sen-24-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 24', verseNumber: 1, text: 'It is not because things are difficult that we do not dare; it is because we do not dare that things are difficult.', translator: 'Richard Mott Gummere', tags: ['courage', 'virtue', 'self-mastery'], difficulty: 1 },

  { id: 'sen-24-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 24', verseNumber: 2, text: 'Rehearse death. To say this is to tell a person to rehearse his freedom. A person who has learned how to die has unlearned how to be a slave.', translator: 'Richard Mott Gummere', tags: ['death', 'courage', 'freedom'], difficulty: 2, commentary: 'The Stoic practice of meditatio mortis (meditation on death) is not morbid but liberating. Familiarity with mortality frees us from the fears that enslave.' },

  // Letter 26 — On Old Age and Death
  { id: 'sen-26-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 26', verseNumber: 1, text: 'Let us go to our sleep with joy and gladness; let us say: "I have lived; the course which Fortune set for me is finished."', translator: 'Richard Mott Gummere', tags: ['death', 'tranquility', 'courage'], difficulty: 2 },

  // Letter 28 — On Travel as a Cure for Discontent
  { id: 'sen-28-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 28', verseNumber: 1, text: 'Do you suppose that you alone have had this experience? Are you surprised, as if it were a novelty, that after such long travel and so many changes of scene you have not been able to shake off the gloom and heaviness of your mind? You need a change of soul rather than a change of climate.', translator: 'Richard Mott Gummere', tags: ['tranquility', 'self-mastery', 'wisdom'], difficulty: 2, commentary: 'You carry yourself wherever you go. No external journey can substitute for the inner work of self-examination—a truth common to Stoic, Buddhist, and contemplative Christian traditions alike.' },

  // Letter 33 — On the Futility of Learning Maxims
  { id: 'sen-33-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 33', verseNumber: 1, text: 'The truth will never be discovered if we rest contented with discoveries already made. Besides, he who follows another not only discovers nothing but is not even investigating.', translator: 'Richard Mott Gummere', tags: ['wisdom', 'courage', 'self-mastery'], difficulty: 2 },

  { id: 'sen-33-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 33', verseNumber: 2, text: 'We should not merely recite the utterances of others. Let us produce something of our own. All these men who do nothing but lurk in the shadow of others will never accomplish anything.', translator: 'Richard Mott Gummere', tags: ['wisdom', 'courage', 'self-mastery'], difficulty: 2 },

  // Letter 47 — On Master and Slave
  { id: 'sen-47-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 47', verseNumber: 1, text: 'Kindly remember that he whom you call your slave sprang from the same stock, is smiled upon by the same skies, and on equal terms with yourself breathes, lives, and dies.', translator: 'Richard Mott Gummere', tags: ['virtue', 'compassion', 'nature'], difficulty: 1, commentary: 'A radical moral statement for the ancient world. Seneca insists on the shared humanity of enslaved persons—remarkably progressive and profoundly Stoic in its cosmopolitan vision.' },

  { id: 'sen-47-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 47', verseNumber: 2, text: 'Show me a man who is not a slave; one is a slave to lust, another to greed, another to ambition, and all men are slaves to fear. No servitude is more disgraceful than that which is self-imposed.', translator: 'Richard Mott Gummere', tags: ['freedom', 'self-mastery', 'virtue'], difficulty: 2 },

  // Letter 49 — On the Shortness of Life
  { id: 'sen-49-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 49', verseNumber: 1, text: 'A single lifetime, even though it were wholly devoted to the sky, would not be enough for the investigation of so vast a subject. And we are not allotted merely a lifetime; we give much of it over to vices, much of it is frittered away.', translator: 'Richard Mott Gummere', tags: ['time', 'wisdom', 'nature'], difficulty: 2 },

  // Letter 53 — On the Faults of the Spirit
  { id: 'sen-53-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 53', verseNumber: 1, text: 'Be harsh with yourself at times. Observe what you are doing and from what motive. The first step to amendment is the recognition of a fault; for no one can begin to cure a sickness if he does not know that he is sick.', translator: 'Richard Mott Gummere', tags: ['self-mastery', 'wisdom', 'discipline'], difficulty: 2 },

  // Letter 63 — On Grief for Lost Friends
  { id: 'sen-63-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 63', verseNumber: 1, text: 'Let us see to it that the recollection of those whom we have lost becomes a pleasant memory to us. No man reverts with pleasure to any subject which he will not be able to reflect upon without pain.', translator: 'Richard Mott Gummere', tags: ['friendship', 'suffering', 'death'], difficulty: 2 },

  { id: 'sen-63-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 63', verseNumber: 2, text: 'What need is there to weep over parts of life? The whole of it calls for tears. New troubles will press on before you have done with the old. Therefore restraint is needed, especially in grieving.', translator: 'Richard Mott Gummere', tags: ['suffering', 'tranquility', 'self-mastery'], difficulty: 2, commentary: 'Seneca does not dismiss grief but cautions against drowning in it. He teaches a middle path: honor the memory of the dead by living well, not by perpetual mourning.' },

  // Letter 65 — On the First Cause
  { id: 'sen-65-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 65', verseNumber: 1, text: 'What is the essential nature of the soul? It is a kind of breath, and yet not like the breath of the wind; for that is thin and passes on. Ours is compressed and will not abandon the body until life abandons it.', translator: 'Richard Mott Gummere', tags: ['nature', 'wisdom', 'death'], difficulty: 3 },

  // Letter 70 — On the Proper Time to Slip the Cable
  { id: 'sen-70-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 70', verseNumber: 1, text: 'The wise man will live as long as he ought, not as long as he can. He will always reflect concerning the quality, and not the quantity, of his life.', translator: 'Richard Mott Gummere', tags: ['death', 'virtue', 'courage'], difficulty: 3 },

  // Letter 77 — On Taking One's Own Life
  { id: 'sen-77-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 77', verseNumber: 1, text: 'Just as I shall select my ship when I am about to go on a voyage, or my house when I propose to take a residence, so I shall choose my death when I am about to depart from life.', translator: 'Richard Mott Gummere', tags: ['death', 'freedom', 'courage'], difficulty: 3 },

  { id: 'sen-77-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 77', verseNumber: 2, text: 'Life is like a play: it matters not how long the piece is, but how well it is acted. It makes no difference at what point you stop. Stop whenever you choose; only make sure that the closing period is well turned.', translator: 'Richard Mott Gummere', tags: ['death', 'virtue', 'present-moment'], difficulty: 2 },

  // Letter 78 — On the Healing Power of the Mind
  { id: 'sen-78-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 78', verseNumber: 1, text: 'It is not that the things which we suffer are hard to bear, but that we are soft and delicate and have been raised upon flattery. It is habit that breeds endurance of toil.', translator: 'Richard Mott Gummere', tags: ['suffering', 'courage', 'self-mastery'], difficulty: 2 },

  { id: 'sen-78-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 78', verseNumber: 2, text: 'Reflect that nothing merits our disturbance; that the causes of our anxiety are trifling. No man has been shattered by the blows of Fortune unless he was first deceived by her favours.', translator: 'Richard Mott Gummere', tags: ['suffering', 'tranquility', 'wisdom'], difficulty: 2 },

  // Letter 88 — On Liberal and Vocational Studies
  { id: 'sen-88-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 88', verseNumber: 1, text: 'You wish to know whether the liberal arts make men good. They make no pretence of teaching this; they do not point the soul in that direction. Where then does virtue dwell? It is developed by practice and toil.', translator: 'Richard Mott Gummere', tags: ['virtue', 'wisdom', 'discipline'], difficulty: 3 },

  { id: 'sen-88-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 88', verseNumber: 2, text: 'The only really liberal studies are those which give a man his liberty. They are the studies of wisdom, lofty and brave and great-souled.', translator: 'Richard Mott Gummere', tags: ['wisdom', 'freedom', 'virtue'], difficulty: 2, commentary: 'Seneca redefines "liberal" education—not grammar or music for their own sake, but whatever genuinely frees the soul. True learning serves character, not credentials.' },

  // Letter 90 — On the Part Played by Philosophy in Human Progress
  { id: 'sen-90-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 90', verseNumber: 1, text: 'Philosophy did not find the ploughshare, but she found the art of living. She did not build houses, but she showed us how to live in them as free beings.', translator: 'Richard Mott Gummere', tags: ['wisdom', 'simplicity', 'nature'], difficulty: 2 },

  { id: 'sen-90-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 90', verseNumber: 2, text: 'Nature suffices for what she demands. Luxury has turned away from nature; each day she expands herself and in all the ages has been gathering strength, aiding vices by her resourcefulness.', translator: 'Richard Mott Gummere', tags: ['simplicity', 'nature', 'virtue'], difficulty: 3 },

  // Letter 104 — On Care of Health and Peace of Mind
  { id: 'sen-104-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 104', verseNumber: 1, text: 'Wherever you go, your faults will follow you. Socrates once told a man who complained about travel: "Why do you wonder that globe-trotting does not help you, seeing that you always take yourself with you?"', translator: 'Richard Mott Gummere', tags: ['self-mastery', 'tranquility', 'wisdom'], difficulty: 1 },

  // Letter 107 — On Obedience to the Universal Will
  { id: 'sen-107-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 107', verseNumber: 1, text: 'We cannot change the universal order; we can do this one thing—we can acquire stout hearts, worthy of good men, thereby courageously enduring whatever befalls and bringing ourselves into harmony with nature.', translator: 'Richard Mott Gummere', tags: ['courage', 'nature', 'tranquility'], difficulty: 2 },

  { id: 'sen-107-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 107', verseNumber: 2, text: 'Fate leads the willing and drags along the reluctant.', translator: 'Richard Mott Gummere', tags: ['courage', 'nature', 'self-mastery'], difficulty: 1, commentary: 'Seneca quotes the Stoic Cleanthes. This is the essence of amor fati: what must happen will happen. Our only choice is whether to walk forward or be dragged.' },

  // Letter 124 — On the True Good as Attained by Reason
  { id: 'sen-124-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 124', verseNumber: 1, text: 'The good of man is found in reason and in reason alone. All other creatures are below man; man is above them all. But the Good of man is something peculiar—his own proper excellence, which reason alone can discover.', translator: 'Richard Mott Gummere', tags: ['virtue', 'wisdom', 'nature'], difficulty: 3 },

  // Additional famous passages from various letters

  // Letter 6 — On Sharing Knowledge
  { id: 'sen-6-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 6', verseNumber: 1, text: 'I feel, my dear Lucilius, that I am being not only reformed, but transformed. I do not yet, however, assure myself, or indulge the hope, that there are no elements in me which need to be changed.', translator: 'Richard Mott Gummere', tags: ['self-mastery', 'wisdom', 'discipline'], difficulty: 2 },

  // Letter 9 — On Philosophy and Friendship
  { id: 'sen-9-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 9', verseNumber: 1, text: 'The wise man is self-sufficient, not in the sense that he wishes to be without friends, but that he is able to be without them; when I say "is able," I mean this: he endures the loss of a friend with equanimity.', translator: 'Richard Mott Gummere', tags: ['friendship', 'tranquility', 'self-mastery'], difficulty: 2, commentary: 'Self-sufficiency is not isolation but inner stability. The Stoic sage cherishes friendship—but is not destroyed by its loss.' },

  // Letter 18 — On Festivals and Fasting
  { id: 'sen-18-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 18', verseNumber: 1, text: 'Set aside a certain number of days, during which you shall be content with the scantiest and cheapest fare, with coarse and rough dress, saying to yourself the while: "Is this the condition that I feared?"', translator: 'Richard Mott Gummere', tags: ['simplicity', 'courage', 'discipline'], difficulty: 1, commentary: 'Voluntary discomfort as a Stoic practice: by periodically rehearsing poverty, we discover that what we feared is perfectly bearable.' },

  // Letter 41 — On the God Within Us
  { id: 'sen-41-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 41', verseNumber: 1, text: 'God is near you, he is with you, he is within you. A holy spirit indwells within us, one who marks our good and bad deeds, and is our guardian.', translator: 'Richard Mott Gummere', tags: ['nature', 'virtue', 'wisdom'], difficulty: 2, commentary: 'Stoic theology identifies the divine with rational nature itself. The "god within" is the spark of universal reason (logos) present in every person.' },

  { id: 'sen-41-2', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 41', verseNumber: 2, text: 'No man is good without God. Can any one rise superior to fortune unless God helps him to rise? He it is that gives noble and upright counsel.', translator: 'Richard Mott Gummere', tags: ['virtue', 'nature', 'courage'], difficulty: 2 },

  // Letter 48 — On Quibbling as Unworthy of the Philosopher
  { id: 'sen-48-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 48', verseNumber: 1, text: 'Philosophy deals with broad questions and not with petty ones. She teaches us to do, not merely to say; she insists that every man should live according to his own standards, that his life should not be out of harmony with his words.', translator: 'Richard Mott Gummere', tags: ['wisdom', 'virtue', 'discipline'], difficulty: 2 },

  // Letter 55 — On Vatia's Villa
  { id: 'sen-55-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 55', verseNumber: 1, text: 'It is the mind that must be made tranquil; it is the mind that must be called home from its wanderings. Do not think that solitude and seclusion are sufficient for repose; an evil conscience can beset you even in solitude.', translator: 'Richard Mott Gummere', tags: ['tranquility', 'self-mastery', 'wisdom'], difficulty: 2 },

  // Letter 71 — On the Supreme Good
  { id: 'sen-71-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 71', verseNumber: 1, text: 'Nothing is good except virtue, and nothing is evil except that which is opposed to virtue. All other things lie outside the sphere of good and evil—they are merely material and occasion.', translator: 'Richard Mott Gummere', tags: ['virtue', 'wisdom', 'courage'], difficulty: 3 },

  // Letter 74 — On Virtue as a Refuge from Worldly Distractions
  { id: 'sen-74-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 74', verseNumber: 1, text: 'Nothing is dreadful when once you have measured it by the standard of the true good; for what is called evil is merely misunderstood indifference. Once you gaze upon what is truly good, all else shrinks to insignificance.', translator: 'Richard Mott Gummere', tags: ['virtue', 'wisdom', 'tranquility'], difficulty: 3 },

  // Letter 82 — On the Natural Fear of Death
  { id: 'sen-82-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 82', verseNumber: 1, text: 'The brave man is not he who does not feel afraid, but he who conquers that fear. "But death is something terrible." Who denies it? But life itself, which we love so dearly, is something still more terrible at times.', translator: 'Richard Mott Gummere', tags: ['death', 'courage', 'suffering'], difficulty: 2 },

  // Letter 91 — On the Lesson to Be Drawn from the Burning of Lyons
  { id: 'sen-91-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 91', verseNumber: 1, text: 'No one ever has been so far advanced by Fortune that she did not threaten him as greatly as she had previously indulged him. Do not trust her seeming calm; in a moment the sea is moved to its depths.', translator: 'Richard Mott Gummere', tags: ['suffering', 'courage', 'tranquility'], difficulty: 2 },

  // Letter 95 — On the Usefulness of Basic Principles
  { id: 'sen-95-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 95', verseNumber: 1, text: 'We are members of a great body. Nature has made us relatives, when she produced us from the same materials and for the same destinies. She has implanted in us a mutual love, and fitted us for a social life.', translator: 'Richard Mott Gummere', tags: ['nature', 'compassion', 'virtue'], difficulty: 2 },

  // Letter 99 — On Consolation to the Bereaved
  { id: 'sen-99-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 99', verseNumber: 1, text: 'Fortune has taken away, but Fortune has given. Let us use what we have with thankfulness, remembering how long we held it. Can we complain that we have been cheated, if we return that which was lent us?', translator: 'Richard Mott Gummere', tags: ['death', 'suffering', 'tranquility'], difficulty: 2 },

  // Letter 101 — On the Futility of Planning Ahead
  { id: 'sen-101-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 101', verseNumber: 1, text: 'Let us balance life\'s books each day. The man who puts the finishing touches on his life each day is never in want of time.', translator: 'Richard Mott Gummere', tags: ['time', 'present-moment', 'death'], difficulty: 1 },

  // Letter 108 — On the Approaches to Philosophy
  { id: 'sen-108-1', sourceId: 'stoic-letters', sourceName: 'Letters to Lucilius', tradition: 'Stoic', chapter: 'Letter 108', verseNumber: 1, text: 'We should apply what we have learned. For knowledge alone is not enough; one must also act. What good are remedies if we do not use them?', translator: 'Richard Mott Gummere', tags: ['wisdom', 'discipline', 'virtue'], difficulty: 1 },
];
