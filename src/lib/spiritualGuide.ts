/**
 * Spiritual Guide AI Service
 * 
 * Provides AI-powered spiritual guidance using the Supabase Edge Function.
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const CHAT_STORAGE_KEY = 'stillpoint_chat_history';

/**
 * Load chat history from localStorage
 */
export function loadChatHistory(): ChatMessage[] {
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
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
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
}

/**
 * Clear chat history
 */
export function clearChatHistory(): void {
  localStorage.removeItem(CHAT_STORAGE_KEY);
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
): Promise<string> {
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
    return data.interpretation || data.response || generateFallbackResponse(userMessage);
  } catch (error) {
    console.error('Failed to get spiritual guidance:', error);
    return generateFallbackResponse(userMessage);
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

