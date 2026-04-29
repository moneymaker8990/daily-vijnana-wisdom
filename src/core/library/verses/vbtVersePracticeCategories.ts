import type { Verse, VbtPracticeCategory } from '../types';

type VbtEnrichFields = {
  plainLanguage: string;
  practiceInstructions: string;
  reflectionPrompt: string;
  modernLifeApplication: string;
  journalQuestion: string;
};

function firstSentenceAnchor(text: string): string {
  const t = text.trim();
  const m = /^.{1,220}?[.?!](?=\s|$)/.exec(t);
  const s = m ? m[0] : t.slice(0, 160).trim();
  return s.length < t.length && !/[.?!]$/.test(s) ? `${s}…` : s;
}

/** Default practice notes by category — merged for every verse; ENRICH overrides per field. */
const CATEGORY_TEMPLATE: Record<VbtPracticeCategory, VbtEnrichFields> = {
  breath: {
    plainLanguage:
      'Let breath move naturally. Interest rests on transitions and texture rather than on controlling outcomes.',
    practiceInstructions:
      'Sit or stand comfortably. For several minutes, feel inhale and exhale without lengthening or judging. When attention drifts, return kindly to the next breath.',
    reflectionPrompt: 'What is aware of breathing—does it feel like a thing or like open attention?',
    modernLifeApplication: 'Once an hour, notice three breaths before the next task.',
    journalQuestion: 'When did breath feel like an ally rather than a technique today?',
  },
  sound: {
    plainLanguage:
      'Sound comes and goes; listening can widen to include silence and space around tones.',
    practiceInstructions:
      'Listen to ambient sound for a few minutes. Let labels arise and pass; stay with the field of hearing.',
    reflectionPrompt: 'Is there a difference between “sound” and the awareness that hears?',
    modernLifeApplication: 'During one song or conversation, add one minute of listening without planning a reply.',
    journalQuestion: 'What changed when I listened without trying to improve the moment?',
  },
  mantra: {
    plainLanguage:
      'Syllable, rhythm, or inner resonance can gather scattered attention—gently, without strain.',
    practiceInstructions:
      'If you use a mantra, let it be quiet and steady. If not, rest attention on subtle inner vibration or silent repetition of one syllable for a short span.',
    reflectionPrompt: 'Does repetition reveal a background stillness, or only more thinking?',
    modernLifeApplication: 'Walk for two minutes coordinating soft inner rhythm with steps.',
    journalQuestion: 'Did mantra or rhythm calm the edges of anxiety or scatter today?',
  },
  space: {
    plainLanguage:
      'Space—inner or outer—can be felt as openness in which experience appears.',
    practiceInstructions:
      'Feel room inside the chest or skull, or gaze at sky and wall. Rest with “room” rather than with filling the room with thoughts.',
    reflectionPrompt: 'Is spaciousness an absence, or a quiet fullness?',
    modernLifeApplication: 'Before entering a crowded space, pause once and sense physical space around the body.',
    journalQuestion: 'Where did I feel cramped—and could I add one inch of mental space?',
  },
  void: {
    plainLanguage:
      'Emptiness here means openness without a fixed story—not numbness, not nihilism.',
    practiceInstructions:
      'When the mind quiets, rest without needing an object. If fear of “nothing” arises, meet it with patience and short sessions.',
    reflectionPrompt: 'What is it like to be present without needing a label for what is happening?',
    modernLifeApplication: 'Stare softly at a plain surface for 30 seconds; notice mind filling the void—and relax that habit once.',
    journalQuestion: 'Did I confuse emptiness with dissociation at any point?',
  },
  body: {
    plainLanguage:
      'The body is a field of sensation; awareness can inhabit it without owning or fighting it.',
    practiceInstructions:
      'Scan from feet to crown slowly. When you find tension, breathe there without demanding release.',
    reflectionPrompt: 'Who or what knows the sensations before they are explained?',
    modernLifeApplication: 'Link one daily chore to feeling hands and feet for thirty seconds.',
    journalQuestion: 'What part of the body asked for kindness today?',
  },
  senses: {
    plainLanguage:
      'Sight, touch, taste, smell—each can return attention to immediacy instead of only to ideas about things.',
    practiceInstructions:
      'Choose one sense gate. For two minutes, receive impressions without chasing the next fix of stimulation.',
    reflectionPrompt: 'Can sensing be simple contact rather than consumption?',
    modernLifeApplication: 'Eat one bite or drink one sip with full attention once today.',
    journalQuestion: 'Which sense felt most grounding when I gave it honest attention?',
  },
  emotion: {
    plainLanguage:
      'Pleasure, pain, and mixed tones move through awareness; they need not define the whole of what you are.',
    practiceInstructions:
      'When a feeling arises, name it lightly, then feel its location and breath together for a short while.',
    reflectionPrompt: 'Does emotion pass differently when it is allowed without a verdict?',
    modernLifeApplication: 'After strong news or conflict, sit for one minute before answering.',
    journalQuestion: 'What emotion did I meet with less armor today?',
  },
  desire: {
    plainLanguage:
      'Wanting is movement; seeing it clearly loosens the fiction that you are only a hungry point.',
    practiceInstructions:
      'When craving appears, stay with the body sensation of “want” for ten breaths before acting.',
    reflectionPrompt: 'Is there awareness of desire that is not itself consumed by desire?',
    modernLifeApplication: 'Delay one small urge once—phone, snack, distraction—and notice the arc.',
    journalQuestion: 'What did desire teach when I did not obey it instantly?',
  },
  fear: {
    plainLanguage:
      'Intensity can reveal bare attention before the story; do not seek danger—work with what already arises.',
    practiceInstructions:
      'If fear is mild, feel feet, breath, and peripheral vision. If severe or traumatic, prioritize safety and professional support; this is contemplation, not exposure therapy.',
    reflectionPrompt: 'What is present in the body during fear besides the narrative?',
    modernLifeApplication: 'Name fear once aloud or on paper, then take one practical calming step.',
    journalQuestion: 'Did fear shrink when met with body awareness, or only when avoided?',
  },
  dream_sleep: {
    plainLanguage:
      'Threshold states blur the usual edges of self; they invite gentle curiosity, not control.',
    practiceInstructions:
      'Before sleep or on waking, lie still and notice the texture of awareness without forcing lucidity.',
    reflectionPrompt: 'What feels continuous between waking and dreaming if you do not insist on a sharp line?',
    modernLifeApplication: 'Keep a one-line note on waking: mood only, not interpretation.',
    journalQuestion: 'Did rest feel kinder when I stopped wrestling for a special state?',
  },
  thought_gap: {
    plainLanguage:
      'Between thoughts, or beneath them, attention can notice the simple fact of knowing.',
    practiceInstructions:
      'Sit quietly. When a thought ends, rest in the brief interval before the next. If none appears, rest in openness.',
    reflectionPrompt: 'In a gap, is there truly “no one,” or is there luminous knowing?',
    modernLifeApplication: 'After reading something provocative, pause before commenting—feel one gap.',
    journalQuestion: 'Where did a pause change my next word or action?',
  },
};

export const VBT_CATEGORY_LABELS: Record<VbtPracticeCategory, string> = {
  breath: 'Breath',
  sound: 'Sound',
  space: 'Space',
  emotion: 'Emotion',
  desire: 'Desire',
  fear: 'Fear',
  body: 'Body',
  senses: 'Senses',
  void: 'Void',
  dream_sleep: 'Dream / sleep',
  thought_gap: 'Gap between thoughts',
  mantra: 'Mantra / vibration',
};

export const VBT_CATEGORY_ORDER: VbtPracticeCategory[] = [
  'breath',
  'sound',
  'mantra',
  'space',
  'void',
  'body',
  'senses',
  'emotion',
  'desire',
  'fear',
  'dream_sleep',
  'thought_gap',
];

/** App commentary — not an alternate translation of the passage. Per-field overrides on top of CATEGORY_TEMPLATE. */
const ENRICH: Partial<Record<string, Partial<VbtEnrichFields>>> = {
  'vbt-2': {
    plainLanguage:
      'Notice the brief pause between exhale and inhale. Rest attention there without forcing the breath.',
    practiceInstructions:
      'Sit comfortably. Follow natural breathing. When the breath turns, rest in the turn for one or two cycles. If the mind narrates, return to the next pause.',
    reflectionPrompt: 'What do you notice in the gap that is different from ordinary thinking?',
    modernLifeApplication: 'Before speaking in a tense moment, feel one natural breath-gap.',
    journalQuestion: 'Where did the breath-gap feel most available today — and where did I rush past it?',
  },
  'vbt-9': {
    plainLanguage:
      'Listen for subtle inner sound, or rest attention in the “hum” of hearing when outer sound fades.',
    practiceInstructions:
      'In a quiet space, lightly block the ears or listen to steady outer sound, then feel the subtle field of hearing itself.',
    reflectionPrompt: 'Can you sense hearing as an open field, not just “things heard”?',
    modernLifeApplication: 'For one minute, listen to traffic or wind as a single ocean of sound.',
    journalQuestion: 'What happened when I listened without needing to name each sound?',
  },
  'vbt-26': {
    plainLanguage:
      'Sudden moments (surprise, fear, a sneeze) can interrupt the story of self—stay with bare awareness.',
    practiceInstructions:
      'Do not seek danger. When a startle or strong sensation happens naturally, notice the first instant before interpretation.',
    reflectionPrompt: 'What is present in the first split-second of a strong sensation?',
    modernLifeApplication: 'After a minor surprise, pause once: what was aware before the explanation?',
    journalQuestion: 'Did I allow one strong moment today to be felt without immediately fixing it?',
  },
  'vbt-30': {
    plainLanguage:
      'The fuzzy edge before sleep is a doorway—neither fully awake nor asleep, awareness can be noticed.',
    practiceInstructions:
      'Lie down safely. Let the body relax. As wakefulness softens, stay gently interested in the one who is aware.',
    reflectionPrompt: 'What remains when the usual daytime identity thins?',
    modernLifeApplication: 'Tonight, for 60 seconds, notice the fade toward sleep without chasing entertainment.',
    journalQuestion: 'What did I learn from watching the sleep threshold without fighting it?',
  },
  'vbt-31': {
    plainLanguage:
      'When wanting arises, look at it directly; then release the fixation and rest as the space of awareness.',
    practiceInstructions:
      'When a small desire appears (food, distraction, approval), watch it for a few breaths without acting. Notice the space when attention loosens.',
    reflectionPrompt: 'Is desire a solid thing, or movement in awareness?',
    modernLifeApplication: 'Before one impulse purchase or scroll, pause for three breaths with the wanting.',
    journalQuestion: 'What pattern in my wanting became visible when I did not chase it?',
  },
  'vbt-32': {
    plainLanguage:
      'Shift from “what is seen” to “that which sees”—the simple fact of being aware.',
    practiceInstructions:
      'Look at any object. For a few seconds, ask softly: what is it that is aware of seeing?',
    reflectionPrompt: 'Does the knower feel like a thing, or like open knowing?',
    modernLifeApplication: 'During screen time, once ask: what is aware of these colors and words?',
    journalQuestion: 'When did “perceiver” feel obvious, and when did I collapse back into only the story?',
  },
  'vbt-41': {
    plainLanguage:
      'Wherever attention goes, that very movement happens within awareness.',
    practiceInstructions:
      'Let the mind wander on purpose for a minute. Each time you notice where it went, rest as the knowing of that movement.',
    reflectionPrompt: 'Is awareness ever actually absent, or only overlooked?',
    modernLifeApplication: 'In a boring meeting, notice where attention wanders—without shaming it.',
    journalQuestion: 'What helps me remember the wider field when attention narrows?',
  },
  'vbt-45': {
    plainLanguage:
      'Between daily tasks, return to the breath’s natural rhythm as a thread of presence.',
    practiceInstructions:
      'During a routine activity, feel three breaths with the body doing what it does.',
    reflectionPrompt: 'Can ordinary action and steady awareness coexist?',
    modernLifeApplication: 'Link breath-awareness to one habitual transition (doorways, stairs, washing hands).',
    journalQuestion: 'Where did “practice” feel kind rather than forced today?',
  },
  'vbt-50': {
    plainLanguage:
      'Let mental chatter rest; in simplicity, the sense of a cramped self can widen.',
    practiceInstructions:
      'Sit quietly. When a thought arises, neither follow nor fight—return to simple being.',
    reflectionPrompt: 'What is left when you stop insisting on a narrative?',
    modernLifeApplication: 'Two minutes of “no project” sitting before the day accelerates.',
    journalQuestion: 'What did silence reveal that effort could not manufacture?',
  },
  'vbt-58': {
    plainLanguage:
      'Between pleasure and pain, attention can rest in a neutral openness.',
    practiceInstructions:
      'Notice a mild sensation. Feel the middle way: not chasing comfort, not bracing against discomfort.',
    reflectionPrompt: 'What knows both pleasant and unpleasant tones equally?',
    modernLifeApplication: 'During minor irritation, feel one breath “between” story and reactivity.',
    journalQuestion: 'Where did I meet discomfort with curiosity instead of collapse?',
  },
  'vbt-72': {
    plainLanguage:
      'Thought’s wanderings occur in awareness; return to the field, not only the content.',
    practiceInstructions:
      'When lost in thought, label once “thinking,” then feel the space in which thinking appears.',
    reflectionPrompt: 'Is the wanderer different from awareness itself?',
    modernLifeApplication: 'After rumination spirals, one gentle question: what is aware of this movie?',
    journalQuestion: 'What triggers my tightest mental loops—and what softens them?',
  },
  'vbt-110': {
    plainLanguage:
      'Rest in intervals—between sounds, actions, or thoughts—as living stillness.',
    practiceInstructions:
      'Listen or move slowly. Each time a gap appears, stay with the gap for one beat longer than usual.',
    reflectionPrompt: 'Do gaps feel empty, or quietly full?',
    modernLifeApplication: 'Between sentences in conversation, allow a half-breath of silence.',
    journalQuestion: 'Did I discover any peace in the pauses today?',
  },
};

const OVERRIDES: Partial<Record<string, VbtPracticeCategory>> = {
  'vbt-1': 'thought_gap',
};

function inferCategory(v: Verse): VbtPracticeCategory {
  const text = v.text.toLowerCase();
  const tags = new Set(v.tags.map((t) => t.toLowerCase()));

  if (OVERRIDES[v.id]) return OVERRIDES[v.id]!;

  if (tags.has('breath') || /\b(breath|breathing|inhale|exhale|prana)\b/.test(text)) return 'breath';
  if (tags.has('mantra') || /\b(aum|om|sanskrit letters|syllable|chant)\b/.test(text)) return 'mantra';
  if (/\b(sound of sounds|waterfall|inton|audibly|listen|hearing|music|ears)\b/.test(text)) return 'sound';
  if (/\b(sleep|dream|dreaming)\b/.test(text)) return 'dream_sleep';
  if (/\b(fright|fear|terror|anxiety|chasm|battle|sneez|hunger)\b/.test(text) && /\baware\b/.test(text))
    return 'fear';
  if (/\bdesire\b/.test(text) || (text.includes('want') && text.includes('consciousness'))) return 'desire';
  if (/\b(pleasure|pain|emotion|delight)\b/.test(text)) return 'emotion';
  if (/\b(void|blackness|emptiness|formless|nothing)\b/.test(text) && !text.includes('breath'))
    return 'void';
  if (
    /\b(gap|between two|pause between|wandering)\b/.test(text) ||
    v.id === 'vbt-41' ||
    v.id === 'vbt-72' ||
    v.id === 'vbt-110'
  )
    return 'thought_gap';
  if (/\b(space|sky|spacious|ether|cosmos as)\b/.test(text)) return 'space';
  if (tags.has('body-awareness')) return 'body';
  if (tags.has('senses')) return 'senses';
  if (tags.has('witness') || tags.has('inquiry')) return 'thought_gap';
  return 'space';
}

function mergeEnrichment(v: Verse, category: VbtPracticeCategory): Partial<VbtEnrichFields> {
  const tmpl = CATEGORY_TEMPLATE[category];
  const anchor = firstSentenceAnchor(v.text);
  const base: VbtEnrichFields = {
    plainLanguage: `This passage points to: “${anchor}”\n\n${tmpl.plainLanguage}`,
    practiceInstructions: tmpl.practiceInstructions,
    reflectionPrompt: tmpl.reflectionPrompt,
    modernLifeApplication: tmpl.modernLifeApplication,
    journalQuestion: tmpl.journalQuestion,
  };
  const o = ENRICH[v.id];
  if (!o) return base;
  return {
    plainLanguage: o.plainLanguage ?? base.plainLanguage,
    practiceInstructions: o.practiceInstructions ?? base.practiceInstructions,
    reflectionPrompt: o.reflectionPrompt ?? base.reflectionPrompt,
    modernLifeApplication: o.modernLifeApplication ?? base.modernLifeApplication,
    journalQuestion: o.journalQuestion ?? base.journalQuestion,
  };
}

export function assignVbtPracticeCategories(verses: Verse[]): Verse[] {
  return verses.map((v) => {
    const category = v.practiceCategory ?? inferCategory(v);
    const enriched = mergeEnrichment(v, category);
    return {
      ...v,
      practiceCategory: category,
      ...enriched,
    };
  });
}
