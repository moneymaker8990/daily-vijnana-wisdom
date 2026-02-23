/**
 * Spiritual Guide AI Service
 *
 * Provides AI-powered spiritual guidance using the Supabase Edge Function.
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase';
import { STORAGE_KEYS } from '@lib/constants';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

/**
 * Load chat history from localStorage
 */
export function loadChatHistory(): ChatMessage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Save chat history to localStorage
 */
export function saveChatHistory(messages: ChatMessage[]): void {
  try {
    // Keep only last 100 messages to avoid storage limits
    const trimmed = messages.slice(-100);
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(trimmed));
  } catch (error) {
    // Save failed silently
  }
}

/**
 * Clear chat history
 */
export function clearChatHistory(): void {
  localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
}

/**
 * Generate a unique message ID
 */
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * System prompt for the Spiritual Guide
 */
const SPIRITUAL_GUIDE_PROMPT = `You are a wise, compassionate spiritual guide well-versed in the world's contemplative traditions. You draw from:

- Advaita Vedanta and non-dual philosophy
- Buddhist teachings (Theravada, Zen, Tibetan)
- Taoist wisdom
- Christian mysticism (Meister Eckhart, Cloud of Unknowing)
- Sufi poetry and teachings (Rumi, Hafiz)
- Yoga philosophy (Patanjali, Tantra)

Your approach:
- Meet seekers where they are, without judgment
- Offer practical wisdom that can be applied to daily life
- Use metaphor and story when helpful
- Point toward direct experience rather than mere belief
- Honor the questioner's own inner wisdom
- Be warm but not sycophantic
- Keep responses concise (2-4 paragraphs usually)
- When relevant, reference specific texts or teachers

You're available at any hour—for the 3am questions, the moments of doubt, the sudden insights that need a companion. Respond with care and presence.`;

/**
 * Send a message to the Spiritual Guide and get a response
 */
export async function sendToSpiritualGuide(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<{ response: string; isAI: boolean }> {
  try {
    // Build context from recent messages
    const recentHistory = conversationHistory.slice(-10);
    const contextMessages = recentHistory.map(m =>
      `${m.role === 'user' ? 'Seeker' : 'Guide'}: ${m.content}`
    ).join('\n\n');

    const fullPrompt = contextMessages
      ? `Previous conversation:\n${contextMessages}\n\nSeeker: ${userMessage}`
      : userMessage;

    const response = await fetch(`${SUPABASE_URL}/functions/v1/hyper-processor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        type: 'spiritual-guide',
        system: SPIRITUAL_GUIDE_PROMPT,
        message: fullPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.interpretation || data.response;
    if (text) return { response: text, isAI: true };
    return { response: generateFallbackResponse(userMessage), isAI: false };
  } catch (error) {
    return { response: generateFallbackResponse(userMessage), isAI: false };
  }
}

/**
 * Generate a fallback response when the API is unavailable
 */
function generateFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Contextual fallback responses
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
    return `Anxiety often comes from the mind racing ahead to imagined futures. Notice: right now, in this moment, you are here. You are breathing. The present moment—this one, now—is actually okay.

A practice: Place your hand on your heart. Feel its rhythm. Let your breath slow naturally. The anxious thoughts can continue, but you don't have to follow them. You are the awareness in which they appear.

"Do not be anxious about tomorrow, for tomorrow will be anxious for itself." — Matthew 6:34`;
  }
  
  if (lowerMessage.includes('sleep') || lowerMessage.includes('cant sleep') || lowerMessage.includes("can't sleep")) {
    return `When sleep eludes us, resistance often makes it worse. Instead of fighting wakefulness, try surrendering to it gently.

Practice: Lie comfortably and bring awareness to your body, part by part, from toes to crown. Don't try to relax—just notice. Feel the bed supporting you. Feel the darkness around you. Let thoughts arise and pass like clouds.

Rest, even without sleep, has its own value. The Taoist sage sleeps when sleep comes and wakes when waking comes, forcing nothing.`;
  }
  
  if (lowerMessage.includes('meaning') || lowerMessage.includes('purpose') || lowerMessage.includes('why am i')) {
    return `The question of meaning is itself meaningful. Not everyone asks it.

Perhaps meaning isn't something to be found, like a hidden object, but something created through how we attend to life. Each moment of genuine presence, each act of kindness, each honest inquiry—these create meaning.

As Viktor Frankl observed: "Life is not primarily a quest for pleasure or a quest for power, but a quest for meaning." The very fact that you're asking suggests you're already on the path.`;
  }
  
  if (lowerMessage.includes('meditation') || lowerMessage.includes('meditate') || lowerMessage.includes('practice')) {
    return `The simplest practice is often the most profound: just sit. Just breathe. Just notice.

You don't need to achieve a special state. You don't need to stop your thoughts. Simply be aware of what's happening—the breath, the sounds, the sensations, the thoughts passing through.

Start with just five minutes. Consistency matters more than duration. As the Zen saying goes: "You should sit in meditation for twenty minutes every day—unless you're too busy. Then you should sit for an hour."`;
  }

  if (lowerMessage.includes('grief') || lowerMessage.includes('loss') || lowerMessage.includes('died') || lowerMessage.includes('death') || lowerMessage.includes('mourning')) {
    return `Grief is love with nowhere to go. It is not a problem to be solved but a process to be honored. There is no timeline, no "right way" to grieve.

Practice: Sit quietly and place your hand over your heart. Breathe gently and allow whatever feelings arise — sadness, anger, numbness, even moments of lightness — to simply be. Say to yourself: "This grief is the measure of my love."

Rumi wrote: "The wound is the place where the Light enters you." Your grief, as painful as it is, is opening you to a depth of compassion and tenderness that was not accessible before.`;
  }

  if (lowerMessage.includes('angry') || lowerMessage.includes('anger') || lowerMessage.includes('furious') || lowerMessage.includes('rage') || lowerMessage.includes('resentment')) {
    return `Anger is a powerful energy. It is not inherently wrong — it often signals that a boundary has been crossed or an injustice witnessed. The spiritual work is not to suppress anger but to be present with it without being consumed.

Practice: When anger arises, pause. Feel where it lives in your body — the jaw, the fists, the chest. Breathe into that area. Instead of acting from anger, ask: "What is this anger protecting? What hurt or fear lies beneath it?"

The Buddha compared anger to holding a hot coal — you are the one who gets burned. Thich Nhat Hanh taught: "Hold your anger as a mother holds her crying baby — with tenderness, not rejection."`;
  }

  if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
    return `Loneliness is one of the deepest human experiences — and paradoxically, it connects you to every other human who has ever felt the same. You are not alone in your aloneness.

Practice: Instead of fleeing loneliness, sit with it as you would sit with a friend in pain. Ask: "What does this loneliness actually need?" Sometimes it needs connection with others; sometimes it reveals a disconnection from yourself. Place your hands over your heart and offer yourself the warmth you seek.

Thomas Merton wrote: "The deepest level of communication is not communication but communion. It is wordless, beyond words, and beyond speech." Start with communion with yourself.`;
  }

  if (lowerMessage.includes('relationship') || lowerMessage.includes('partner') || lowerMessage.includes('marriage') || lowerMessage.includes('breakup')) {
    return `Relationships are among our greatest spiritual teachers. They mirror back to us what we cannot see in ourselves — our deepest longings, our hidden wounds, our capacity for love.

Practice: Before reacting to a relational difficulty, pause and ask: "What is this relationship teaching me about myself?" Consider that the qualities that most trigger you in another may be qualities you have not fully integrated within yourself. This is not blame — it is an invitation to deeper self-knowledge.

Khalil Gibran offered: "Let there be spaces in your togetherness, and let the winds of the heavens dance between you." Healthy relating requires both connection and spaciousness.`;
  }

  if (lowerMessage.includes('forgive') || lowerMessage.includes('forgiveness') || lowerMessage.includes('grudge')) {
    return `Forgiveness is not about condoning what happened. It is not about the other person at all. Forgiveness is the act of releasing yourself from the prison of resentment.

Practice: Bring to mind the person or situation. Notice the sensations in your body. Then try this traditional loving-kindness phrase, adapting it as feels authentic: "I forgive you. Not because what you did was okay, but because I refuse to carry this weight any longer." Repeat it daily, even if you don't yet feel it. The feeling follows the intention.

As the Buddhist teaching goes: "Holding onto anger is like drinking poison and expecting the other person to die." Forgiveness is the antidote — taken in your own time, at your own pace.`;
  }

  if (lowerMessage.includes('worthless') || lowerMessage.includes('not good enough') || lowerMessage.includes('imposter') || lowerMessage.includes('shame')) {
    return `The voice that says "you are not enough" is not speaking truth — it is speaking fear. Shame thrives in secrecy and silence; it begins to dissolve in the light of compassionate awareness.

Practice: Place your hand on your heart and speak to yourself as you would speak to a dear friend in pain: "You are worthy of love, exactly as you are. Your imperfections do not diminish your worth." Notice any resistance to these words — that resistance is the shame itself, not the truth.

The Upanishads declare: "Tat tvam asi" — Thou art That. Your essential nature is not your achievements, failures, or the stories others told about you. You are something far more vast and luminous.`;
  }

  if (lowerMessage.includes('fear') || lowerMessage.includes('afraid') || lowerMessage.includes('scared') || lowerMessage.includes('terrified')) {
    return `Fear is one of the mind's most ancient protectors. Sometimes it warns of genuine danger; often it guards against imagined threats. The practice is to distinguish between the two.

Practice: Name the fear specifically — "I am afraid of ___." Naming creates distance between you and the emotion. Then ask: "Is this fear about something happening right now, or something that might happen?" Most fear lives in the future. Bring your attention to the present — your breath, the ground beneath you — and notice that right now, in this moment, you are safe.

As the Bhagavad Gita teaches, Arjuna's fear on the battlefield was real and valid, yet Krishna guided him to act from his deeper nature rather than from fear. You too can acknowledge fear and still move forward.`;
  }

  if (lowerMessage.includes('grateful') || lowerMessage.includes('thankful') || lowerMessage.includes('gratitude') || lowerMessage.includes('blessed')) {
    return `What a beautiful thing to bring — gratitude. It is one of the most transformative spiritual practices available. Gratitude doesn't deny difficulty; it expands our vision to include what is also going well.

Practice: Let this gratitude deepen by sitting with it for a few moments. Feel it in your body — perhaps a warmth in the chest, a softening around the eyes. Now extend it: send silent gratitude to someone who contributed to your wellbeing today, even in a small way. Let the feeling radiate outward.

Meister Eckhart said: "If the only prayer you ever say in your entire life is 'thank you,' it will be enough." You are already practicing the deepest form of prayer.`;
  }

  if (lowerMessage.includes('doubt') || lowerMessage.includes('faith') || lowerMessage.includes('believe') || lowerMessage.includes('spiritual crisis')) {
    return `Doubt is not the enemy of faith — it is its companion. Every sincere spiritual seeker encounters periods of profound questioning. This is not a sign of failure; it is often a sign of deepening.

Practice: Instead of trying to resolve your doubt, sit with it. Let it be a question that lives in your heart rather than a problem for your mind to solve. Ask: "What am I being asked to release? What old understanding has become too small for my experience?"

The mystic St. John of the Cross called this "the dark night of the soul" — not punishment, but purification. The old containers of belief break so that something more spacious and authentic can emerge. Trust the process, even when you cannot see the path.`;
  }

  if (lowerMessage.includes('suffering') || lowerMessage.includes('pain') || lowerMessage.includes('why me') || lowerMessage.includes('unfair')) {
    return `The question "Why am I suffering?" has echoed through every human heart. The Buddha's first noble truth was simply this: suffering exists. Not as punishment, but as part of the human condition.

Practice: Instead of asking "Why me?", try asking "What is this suffering teaching me?" — not to justify the pain, but to reclaim your agency within it. Suffering often cracks us open to compassion we could not access otherwise. Sit with the pain without trying to explain it away. Let it be witnessed.

Viktor Frankl, who survived the concentration camps, wrote: "In some way, suffering ceases to be suffering at the moment it finds a meaning." The meaning is yours to create — not from the suffering itself, but from how you carry it.`;
  }

  if (lowerMessage.includes('let go') || lowerMessage.includes('attachment') || lowerMessage.includes('holding on') || lowerMessage.includes('move on')) {
    return `Letting go is one of the most misunderstood spiritual teachings. It does not mean not caring. It means releasing your grip on how things "should" be, so you can fully be with how things are.

Practice: Hold your hands in tight fists. Notice the tension, the effort. Now slowly open them, palms up. Feel the release. This is letting go — not pushing away, but simply opening. Apply this to the situation you're holding onto: what would it feel like to open your grip, even slightly?

The Tao Te Ching teaches: "By letting it go, it all gets done. The world is won by those who let it go." Letting go is not loss — it is making space for what comes next.`;
  }

  if (lowerMessage.includes('change') || lowerMessage.includes('transition') || lowerMessage.includes('new chapter') || lowerMessage.includes('moving')) {
    return `You are in the space between — the old has ended and the new has not yet fully arrived. This liminal territory can feel disorienting, but it is profoundly fertile ground.

Practice: Honor this transition by acknowledging what you are leaving behind. Write a brief farewell to the chapter that is closing. Then turn your attention forward and write a welcome to what is emerging, even if you cannot yet see its shape. Trust that the chrysalis stage, though dark and confining, is where transformation happens.

Lao Tzu reminded us: "New beginnings are often disguised as painful endings." You are not falling apart — you are falling together in a new configuration.`;
  }

  if (lowerMessage.includes('creative') || lowerMessage.includes('creativity') || lowerMessage.includes('art') || lowerMessage.includes('expression')) {
    return `Creativity is not a luxury — it is a fundamental expression of your consciousness. When you create, you participate in the same force that shaped stars and grew forests.

Practice: Release the pressure of "making something good." Instead, commit to making something true. Spend ten minutes creating — writing, drawing, singing, moving — with no audience and no judgment. Let it be ugly, raw, and unfinished. The act itself is the practice, not the product.

In Kashmir Shaivism, the entire universe is understood as the creative play (lila) of consciousness. When you create, you align with this cosmic play. Your expression matters not because it is perfect, but because it is yours.`;
  }

  if (lowerMessage.includes('nature') || lowerMessage.includes('universe') || lowerMessage.includes('cosmos') || lowerMessage.includes('stars') || lowerMessage.includes('connected')) {
    return `You are feeling the ancient pull of belonging — the recognition that you are not separate from the cosmos but an expression of it. Every atom in your body was forged in the heart of a dying star.

Practice: Step outside if you can. Look up at the sky. Feel your feet on the earth. Recognize: the ground beneath you is a planet spinning through space, and you are held by gravity's invisible embrace. Breathe in the air that trees have breathed out. You are in an unbroken conversation with all of life.

The Isha Upanishad opens: "All this — whatever exists in this changing universe — is pervaded by consciousness." You are not visiting nature; you are nature, becoming aware of itself.`;
  }

  if (lowerMessage.includes('silence') || lowerMessage.includes('quiet') || lowerMessage.includes('stillness') || lowerMessage.includes('overwhelmed')) {
    return `When the world feels too loud — too fast, too much — silence is not escape. It is return. You are returning to the ground of your being, which is always still, always spacious.

Practice: Find a quiet place, even for five minutes. Close your eyes. Do not try to silence your mind — instead, notice the silence that already exists beneath the noise of thought. It is always there, like the sky behind clouds. Rest in it. Let it hold you.

Rumi wrote: "Silence is the language of God; all else is poor translation." You don't need to fix the overwhelm. You simply need to find the quiet place within that was never overwhelmed to begin with.`;
  }

  // Default response
  return `Thank you for sharing this with me. What you're asking touches something important.

In my experience, the deepest answers often come not from external sources, but from sitting quietly with the question itself. Let it be there without rushing to resolve it.

If you'd like, we can explore this together. What feels most alive in this question for you right now?`;
}

/**
 * Get suggested questions based on context
 */
export function getSuggestedQuestions(): string[] {
  return [
    "What does it mean to be truly present?",
    "How can I quiet my anxious mind?",
    "What is the self that seeks enlightenment?",
    "How do I find peace amid daily chaos?",
    "What's the relationship between effort and surrender?",
    "How can I practice compassion for myself?",
  ];
}



