/**
 * Voice Reflection Service
 * 
 * Generates AI-powered reflections after voice journal entries.
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase';

export interface AIReflection {
  summary: string;
  themes: string[];
  emotionalTone: string;
  reflectionQuestion: string;
  connection?: string; // Connection to current studies
  generatedAt: string;
}

const REFLECTION_PROMPT = `You are a compassionate journal reflection assistant. Analyze the following voice journal entry and provide:

1. A brief summary (2-3 sentences) of what the person shared
2. Key themes or topics they touched on (as a list)
3. The emotional tone of the entry
4. One gentle reflection question to help them go deeper

Be warm, non-judgmental, and supportive. Don't be preachy or prescriptive.`;

/**
 * Generate an AI reflection for a voice journal entry
 */
export async function generateAIReflection(transcript: string): Promise<{ reflection: AIReflection; isAI: boolean }> {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/hyper-processor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        type: 'voice-reflection',
        system: REFLECTION_PROMPT,
        message: transcript,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Parse the response - expecting structured data
    if (data.reflection) {
      return {
        reflection: { ...data.reflection, generatedAt: new Date().toISOString() },
        isAI: true,
      };
    }

    // If we get a text response, try to parse it
    const text = data.interpretation || data.response || '';
    return { reflection: parseReflectionFromText(text, transcript), isAI: true };
  } catch (error) {
    return { reflection: generateFallbackReflection(transcript), isAI: false };
  }
}

/**
 * Parse a text response into structured reflection
 */
function parseReflectionFromText(text: string, _transcript: string): AIReflection {
  // Simple extraction - look for common patterns
  const lines = text.split('\n').filter(l => l.trim());
  
  let summary = '';
  const themes: string[] = [];
  let emotionalTone = '';
  let reflectionQuestion = '';

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (lower.includes('summary') || summary === '') {
      summary = line.replace(/^(summary:?|1\.?)/i, '').trim();
    } else if (lower.includes('theme') || lower.includes('topic')) {
      const theme = line.replace(/^(themes?:?|topics?:?|[\-\*•]|\d\.?)/i, '').trim();
      if (theme) themes.push(theme);
    } else if (lower.includes('emotional') || lower.includes('tone')) {
      emotionalTone = line.replace(/^(emotional tone:?|tone:?)/i, '').trim();
    } else if (line.includes('?')) {
      reflectionQuestion = line.trim();
    }
  }

  // Fallback to extracting from text if parsing failed
  if (!summary) summary = text.slice(0, 200);
  if (themes.length === 0) themes.push('personal reflection');
  if (!emotionalTone) emotionalTone = 'contemplative';
  if (!reflectionQuestion) reflectionQuestion = 'What feels most important to you right now?';

  return {
    summary,
    themes,
    emotionalTone,
    reflectionQuestion,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Generate a fallback reflection when API is unavailable
 */
function generateFallbackReflection(transcript: string): AIReflection {
  const words = transcript.toLowerCase().split(/\s+/);
  const wordCount = words.length;

  // Detect emotional keywords
  const emotionKeywords: Record<string, string[]> = {
    hopeful: ['hope', 'better', 'forward', 'excited', 'looking forward'],
    peaceful: ['calm', 'peace', 'still', 'quiet', 'serene'],
    anxious: ['worried', 'anxious', 'nervous', 'stress', 'afraid'],
    grateful: ['grateful', 'thankful', 'blessed', 'appreciate'],
    reflective: ['thinking', 'wondering', 'pondering', 'considering'],
    sad: ['sad', 'miss', 'lonely', 'down', 'difficult'],
    joyful: ['happy', 'joy', 'wonderful', 'amazing', 'love'],
  };

  let detectedTone = 'contemplative';
  for (const [tone, keywords] of Object.entries(emotionKeywords)) {
    if (keywords.some(kw => transcript.toLowerCase().includes(kw))) {
      detectedTone = tone;
      break;
    }
  }

  // Extract potential themes based on common words
  const themeKeywords: Record<string, string[]> = {
    'relationships': ['friend', 'family', 'partner', 'love', 'people'],
    'work & purpose': ['work', 'job', 'career', 'purpose', 'meaning'],
    'health & wellness': ['health', 'sleep', 'energy', 'body', 'exercise'],
    'personal growth': ['learn', 'grow', 'change', 'better', 'improve'],
    'spirituality': ['god', 'spirit', 'soul', 'pray', 'meditate'],
    'daily life': ['today', 'morning', 'evening', 'day', 'routine'],
  };

  const themes: string[] = [];
  for (const [theme, keywords] of Object.entries(themeKeywords)) {
    if (keywords.some(kw => transcript.toLowerCase().includes(kw))) {
      themes.push(theme);
    }
  }
  if (themes.length === 0) themes.push('personal reflection');

  // Generate summary
  const summary = `You shared about ${themes[0].toLowerCase()}. ${
    wordCount > 100 
      ? 'This was a substantial entry exploring your thoughts in depth.'
      : 'A brief but meaningful moment of reflection.'
  }`;

  // Reflection questions based on themes
  const questions: Record<string, string> = {
    'relationships': 'What quality do you most value in the relationships you mentioned?',
    'work & purpose': 'What would make your work feel more aligned with who you are?',
    'health & wellness': 'What one small thing could you do today to support your wellbeing?',
    'personal growth': 'What growth have you noticed in yourself recently that you haven\'t acknowledged?',
    'spirituality': 'What spiritual practice feels most nourishing to you right now?',
    'daily life': 'What moment from today are you most grateful for?',
    'personal reflection': 'If you could send one message to your future self, what would it be?',
  };

  return {
    summary,
    themes: themes.slice(0, 3),
    emotionalTone: detectedTone,
    reflectionQuestion: questions[themes[0]] || questions['personal reflection'],
    generatedAt: new Date().toISOString(),
  };
}

