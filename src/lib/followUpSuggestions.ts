/**
 * Follow-Up Suggestion Engine for Spiritual Guide Chat
 *
 * Generates contextual follow-up question pills after each assistant response.
 * AI path: parses FOLLOW_UPS: from model output.
 * Offline path: keyword-matched bank of 60+ templates across 12 categories.
 */

/** Strip FOLLOW_UPS: line from AI response and extract suggestions */
export function parseFollowUpsFromAI(rawResponse: string): {
  cleanResponse: string;
  suggestions: string[];
} {
  const marker = 'FOLLOW_UPS:';
  const idx = rawResponse.lastIndexOf(marker);

  if (idx === -1) {
    return { cleanResponse: rawResponse.trim(), suggestions: [] };
  }

  const cleanResponse = rawResponse.slice(0, idx).trim();
  const followUpLine = rawResponse.slice(idx + marker.length).trim();

  // Suggestions separated by | or numbered list
  const suggestions = followUpLine
    .split(/\s*\|\s*|\s*\d+\.\s*/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && s.length < 120)
    .slice(0, 3);

  return { cleanResponse, suggestions };
}

// ── Category follow-up banks ─────────────────────────────────────────

const FOLLOW_UP_BANK: Record<string, string[]> = {
  anxiety: [
    'What does my anxiety feel like in my body right now?',
    'How can I befriend my anxious thoughts instead of fighting them?',
    'Is there a mantra or practice for calming the nervous system?',
    'What is the difference between healthy concern and anxiety?',
    'How do spiritual traditions view worry and future-thinking?',
  ],
  meditation: [
    'How do I deal with thoughts that keep pulling me away?',
    'What is the simplest meditation I can start with today?',
    'How long should I meditate to see real benefits?',
    'Can meditation help with emotional pain?',
    'What is the difference between concentration and awareness?',
  ],
  grief: [
    'How do I honor my grief without being consumed by it?',
    'Is there a spiritual perspective on loss that brings comfort?',
    'What practices help when grief feels overwhelming?',
    'How do different traditions understand what happens after death?',
    'When does grief become a teacher rather than just pain?',
  ],
  relationships: [
    'How can I love someone without losing myself?',
    'What do spiritual traditions teach about healthy boundaries?',
    'How do I forgive someone who hurt me deeply?',
    'What is the difference between attachment and genuine love?',
    'How can I be more present with the people I care about?',
  ],
  forgiveness: [
    'How do I forgive when the pain is still fresh?',
    'Can I forgive without condoning what happened?',
    'What does self-forgiveness look like in practice?',
    'How do I release resentment that feels justified?',
    'Is forgiveness a one-time act or an ongoing practice?',
  ],
  selfWorth: [
    'How do I separate my worth from my achievements?',
    'What do sacred texts say about our inherent value?',
    'How can I silence the inner critic without suppressing it?',
    'What practices build genuine self-compassion?',
    'How do I stop comparing myself to others?',
  ],
  fear: [
    'How can I act with courage when fear feels paralyzing?',
    'What is the spiritual purpose of fear?',
    'How do I distinguish between intuition and anxiety?',
    'What practice helps when fear strikes at night?',
    'How did great sages deal with their own fears?',
  ],
  gratitude: [
    'How can I deepen my gratitude practice beyond listing things?',
    'What happens in the mind and body when we feel grateful?',
    'How do I feel grateful during genuinely difficult times?',
    'What is the connection between gratitude and spiritual growth?',
    'Can gratitude change how I experience suffering?',
  ],
  doubt: [
    'Is spiritual doubt a sign of failure or of deepening?',
    'How do I navigate a crisis of faith?',
    'What is the difference between healthy questioning and destructive doubt?',
    'How did mystics handle their own dark nights of the soul?',
    'Can I have a spiritual life without certainty?',
  ],
  suffering: [
    'How do I find meaning in suffering without justifying it?',
    'What is the Buddhist understanding of the end of suffering?',
    'How do I sit with pain without trying to fix it?',
    'What is the difference between pain and suffering?',
    'How can suffering open the door to compassion?',
  ],
  lettingGo: [
    'How do I let go without feeling like I am giving up?',
    'What does non-attachment actually look like in daily life?',
    'How do I release expectations about the future?',
    'What is the Taoist approach to letting things unfold naturally?',
    'How do I let go of someone I still love?',
  ],
  silence: [
    'How do I find inner silence when my mind is racing?',
    'What is the difference between silence and emptiness?',
    'How can I bring more stillness into a busy life?',
    'What do contemplative traditions say about the power of silence?',
    'Is there a practice for listening to the silence beneath thoughts?',
  ],
};

const UNIVERSAL_FOLLOW_UPS = [
  'How can I apply this wisdom in my daily life?',
  'Can you share a practice I can try right now?',
  'What sacred text speaks most deeply to this?',
  'How do I go deeper with this understanding?',
  'What would a contemplative teacher say about this?',
];

// Keywords → category mapping
const KEYWORD_CATEGORIES: [string[], string][] = [
  [['anxious', 'anxiety', 'worried', 'worry', 'nervous', 'panic', 'overwhelm'], 'anxiety'],
  [['meditat', 'practice', 'mindful', 'breathe', 'breath', 'sit', 'stillness'], 'meditation'],
  [['grief', 'loss', 'died', 'death', 'mourning', 'miss', 'gone'], 'grief'],
  [['relationship', 'partner', 'marriage', 'breakup', 'love', 'family', 'friend'], 'relationships'],
  [['forgive', 'forgiveness', 'grudge', 'resent', 'bitter'], 'forgiveness'],
  [['worth', 'enough', 'imposter', 'shame', 'self-esteem', 'confident', 'value'], 'selfWorth'],
  [['fear', 'afraid', 'scared', 'terrif', 'dread', 'phobia'], 'fear'],
  [['grateful', 'thankful', 'gratitude', 'blessed', 'appreciation'], 'gratitude'],
  [['doubt', 'faith', 'believe', 'crisis', 'question', 'uncertain'], 'doubt'],
  [['suffer', 'pain', 'hurt', 'unfair', 'why me', 'agony'], 'suffering'],
  [['let go', 'letting go', 'attachment', 'holding on', 'move on', 'release', 'cling'], 'lettingGo'],
  [['silence', 'quiet', 'still', 'noise', 'peace', 'calm', 'serene'], 'silence'],
];

/**
 * Generate 3 follow-up suggestions based on user message + assistant response keywords.
 * Used as fallback when AI doesn't provide FOLLOW_UPS or for offline mode.
 */
export function generateFollowUpSuggestions(
  userMessage: string,
  assistantResponse: string,
): string[] {
  const combined = (userMessage + ' ' + assistantResponse).toLowerCase();

  // Find matching categories
  const matchedCategories: string[] = [];
  for (const [keywords, category] of KEYWORD_CATEGORIES) {
    if (keywords.some(kw => combined.includes(kw))) {
      matchedCategories.push(category);
    }
  }

  // Collect suggestions from matched categories
  const pool: string[] = [];
  for (const cat of matchedCategories) {
    pool.push(...FOLLOW_UP_BANK[cat]);
  }

  // If no matches, use universal
  if (pool.length === 0) {
    return pickRandom(UNIVERSAL_FOLLOW_UPS, 3);
  }

  // Pick 3 random from pool, then fill with universal if needed
  const picked = pickRandom(pool, 3);
  if (picked.length < 3) {
    const remaining = UNIVERSAL_FOLLOW_UPS.filter(q => !picked.includes(q));
    picked.push(...remaining.slice(0, 3 - picked.length));
  }

  return picked.slice(0, 3);
}

function pickRandom(arr: string[], count: number): string[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
