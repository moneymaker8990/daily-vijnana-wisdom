/**
 * Text Explain Service
 *
 * AI-powered explanations of sacred texts using Supabase Edge Function.
 * Caches explanations in localStorage to avoid repeat API calls.
 */

import { STORAGE_KEYS } from '@lib/constants';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase';

export interface TextExplanation {
  meaning: string;
  context: string;
  practicalApplication: string;
  generatedAt: string;
}

interface ExplanationCache {
  [key: string]: TextExplanation;
}

/**
 * Generate a cache key for a verse
 */
function getCacheKey(text: string, source: string): string {
  // Use first 100 chars of text + source as key
  const textKey = text.substring(0, 100).replace(/[^a-zA-Z0-9]/g, '');
  return `${source}_${textKey}`;
}

/**
 * Load cached explanations from localStorage
 */
function loadCache(): ExplanationCache {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.TEXT_EXPLANATIONS);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}

/**
 * Save explanation to cache
 */
function saveToCache(key: string, explanation: TextExplanation): void {
  try {
    const cache = loadCache();
    cache[key] = explanation;
    localStorage.setItem(STORAGE_KEYS.TEXT_EXPLANATIONS, JSON.stringify(cache));
  } catch (error) {
    // Cache save failed silently
  }
}

/**
 * Get cached explanation if available
 */
function getFromCache(key: string): TextExplanation | null {
  const cache = loadCache();
  return cache[key] || null;
}

/**
 * Get AI explanation for a sacred text
 */
export async function explainText(
  text: string,
  source: string
): Promise<{ explanation: TextExplanation; isAI: boolean }> {
  // Check cache first
  const cacheKey = getCacheKey(text, source);
  const cached = getFromCache(cacheKey);
  if (cached) {
    return { explanation: cached, isAI: true }; // cached result was originally AI
  }

  // If Supabase is not configured, use mock explanation
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const mock = generateMockExplanation(text, source);
    saveToCache(cacheKey, mock);
    return { explanation: mock, isAI: false };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/hyper-processor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        type: 'explain',
        text: text,
        source: source,
        prompt: `You are a wise spiritual teacher explaining sacred texts. Explain this passage from ${source} in a way that is accessible yet preserves its depth:

"${text}"

Please provide:
1. MEANING: A clear explanation of what this passage means (2-3 sentences)
2. CONTEXT: The traditional or historical context that helps understand it (1-2 sentences)
3. PRACTICAL APPLICATION: How someone might apply this teaching in daily life (1-2 sentences)

Keep the tone warm, insightful, and non-dogmatic. Speak as a guide, not an authority.`,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Parse the AI response
    const explanation = parseExplanation(data.interpretation || data.response || '', text, source);
    saveToCache(cacheKey, explanation);
    return { explanation, isAI: true };
  } catch (error) {
    // Fallback to mock explanation
    const mock = generateMockExplanation(text, source);
    saveToCache(cacheKey, mock);
    return { explanation: mock, isAI: false };
  }
}

/**
 * Parse AI response into structured explanation
 */
function parseExplanation(aiResponse: string, text: string, source: string): TextExplanation {
  // Try to parse structured response
  const meaningMatch = aiResponse.match(/MEANING[:\s]*([^\n]+(?:\n(?![A-Z]+:)[^\n]+)*)/i);
  const contextMatch = aiResponse.match(/CONTEXT[:\s]*([^\n]+(?:\n(?![A-Z]+:)[^\n]+)*)/i);
  const practicalMatch = aiResponse.match(/PRACTICAL[^:]*[:\s]*([^\n]+(?:\n(?![A-Z]+:)[^\n]+)*)/i);

  if (meaningMatch || contextMatch || practicalMatch) {
    return {
      meaning: (meaningMatch?.[1] || '').trim() || generateMockMeaning(text, source),
      context: (contextMatch?.[1] || '').trim() || generateMockContext(source),
      practicalApplication: (practicalMatch?.[1] || '').trim() || generateMockPractical(),
      generatedAt: new Date().toISOString(),
    };
  }

  // Fallback: split response into paragraphs
  const paragraphs = aiResponse.split('\n\n').filter(p => p.trim());
  return {
    meaning: paragraphs[0] || generateMockMeaning(text, source),
    context: paragraphs[1] || generateMockContext(source),
    practicalApplication: paragraphs[2] || generateMockPractical(),
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Generate mock meaning based on text content
 */
function generateMockMeaning(text: string, source: string): string {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('self') || lowerText.includes('atman')) {
    return `This passage points to the recognition of your true nature beyond the limited sense of "I". ${source} teaches that what you truly are is not the body or mind, but the awareness in which all experience appears.`;
  }
  if (lowerText.includes('mind') || lowerText.includes('thought')) {
    return `This verse addresses the nature of mind and thought. It invites us to recognize that we are not our thoughts—we are the awareness that witnesses them come and go.`;
  }
  if (lowerText.includes('love') || lowerText.includes('heart')) {
    return `This teaching speaks to the transformative power of love and the opening of the heart. Love here is not merely emotion but a recognition of our fundamental connection to all beings.`;
  }
  if (lowerText.includes('peace') || lowerText.includes('still')) {
    return `This passage points to the peace that exists beneath all mental activity—not a peace we create, but one we recognize when the noise of the mind settles.`;
  }
  
  return `This passage from ${source} invites deep contemplation. It points beyond intellectual understanding toward direct recognition of a truth that cannot be fully captured in words.`;
}

/**
 * Generate mock context based on source
 */
function generateMockContext(source: string): string {
  const contexts: Record<string, string> = {
    'Bhagavad Gita': 'Spoken on the battlefield of Kurukshetra, this teaching addresses the fundamental human dilemma of how to act rightly in a world of complexity and moral challenge.',
    'Tao Te Ching': 'Written by Lao Tzu in ancient China, this wisdom emerged from Taoist understanding of natural harmony and the art of living in accord with the Way.',
    'Upanishads': 'These forest teachings were transmitted from guru to student in ancient India, exploring the deepest questions of existence and the nature of the Self.',
    'Ashtavakra Gita': 'This radical text presents the most direct teaching of non-duality—nothing to practice, nothing to attain, just recognition of what already is.',
    'Dhammapada': 'These verses contain the essential teachings of the Buddha, offering practical guidance for liberation from suffering through understanding the mind.',
    'Rumi': 'These poems emerged from Rumi\'s mystical experiences and his deep love for his teacher Shams—they speak the language of divine intoxication.',
    'Cloud of Unknowing': 'Written by an anonymous 14th-century Christian mystic, this work teaches contemplative prayer through loving attention rather than intellectual effort.',
    'Zen Koans': 'These paradoxical teachings are designed to break through conceptual thinking and catalyze direct awakening beyond words and ideas.',
  };
  
  return contexts[source] || `This teaching comes from ${source}, a sacred text that has guided seekers for generations toward deeper understanding and awakening.`;
}

/**
 * Generate mock practical application
 */
function generateMockPractical(): string {
  const practices = [
    'Sit quietly with this teaching. Let it settle beyond the mind. Notice what opens when you stop trying to understand and simply rest in awareness.',
    'Throughout today, pause and ask: "What is aware right now?" Don\'t seek an answer—just notice the aliveness of the question.',
    'When you find yourself lost in thought, gently return to this teaching. Let it be a reminder of what you already are beneath the stories.',
    'Practice holding this wisdom lightly—not as something to grasp, but as a pointer that dissolves as you recognize what it points to.',
    'Before sleep tonight, recall this teaching. Let it be the last thought before silence, and the first recognition upon waking.',
  ];
  
  return practices[Math.floor(Math.random() * practices.length)];
}

/**
 * Generate complete mock explanation
 */
function generateMockExplanation(text: string, source: string): TextExplanation {
  return {
    meaning: generateMockMeaning(text, source),
    context: generateMockContext(source),
    practicalApplication: generateMockPractical(),
    generatedAt: new Date().toISOString(),
  };
}



