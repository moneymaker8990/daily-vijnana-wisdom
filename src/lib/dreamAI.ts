// Dream AI Interpretation Service
// This will call the Supabase Edge Function for Claude AI interpretation

import type { DreamInterpretation } from './dreamStorage';

// Supabase configuration
// Your Wisdom App project credentials
const SUPABASE_URL = 'https://coihujjfdhpqfwmibfbi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvaWh1ampmZGhwcWZ3bWliZmJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTY4MzgsImV4cCI6MjA4MDYzMjgzOH0.tU3rtto0eb61Z6vBFuJMp0OqlQU1UkM1g9UqksSGOYo';

export async function interpretDream(
  dreamContent: string,
  mood?: string
): Promise<DreamInterpretation> {
  // If Supabase is not configured, use mock interpretation
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.log('Supabase not configured, using mock interpretation');
    return generateMockInterpretation(dreamContent, mood);
  }

  try {
    // Using the "hyper-processor" function (can be renamed to "interpret-dream" if preferred)
    const response = await fetch(`${SUPABASE_URL}/functions/v1/hyper-processor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        dream: dreamContent + (mood ? ` (Mood: ${mood})` : ''),
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // The Edge Function returns { interpretation: string }
    // We need to parse it into our DreamInterpretation format
    if (data.interpretation) {
      return parseInterpretation(data.interpretation, dreamContent, mood);
    }
    
    return {
      ...data,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to get AI interpretation:', error);
    // Fallback to mock interpretation
    return generateMockInterpretation(dreamContent, mood);
  }
}

// Parse AI interpretation into structured format
function parseInterpretation(aiResponse: string, dreamContent: string, mood?: string): DreamInterpretation {
  // The AI returns a prose interpretation, we'll structure it
  const paragraphs = aiResponse.split('\n\n').filter(p => p.trim());
  
  return {
    summary: paragraphs[0] || 'Your dream reflects the ongoing work of your psyche.',
    symbols: extractSymbols(dreamContent),
    psychologicalInsight: paragraphs[1] || paragraphs[0] || '',
    spiritualConnection: paragraphs[2] || 'Dreams serve as bridges between conscious and unconscious awareness.',
    actionSuggestion: paragraphs[3] || 'Sit quietly with this dream and notice what feelings arise without judgment.',
    generatedAt: new Date().toISOString(),
  };
}

// Extract potential symbols from dream content
function extractSymbols(content: string): Array<{ symbol: string; meaning: string }> {
  const commonSymbols = [
    { word: 'water', meaning: 'Emotions, the unconscious mind, purification, or transformation' },
    { word: 'flying', meaning: 'Freedom, transcendence, or escape from limitations' },
    { word: 'falling', meaning: 'Loss of control, anxiety, or letting go' },
    { word: 'house', meaning: 'The self, the psyche, or aspects of your identity' },
    { word: 'door', meaning: 'Opportunity, transition, or new possibilities' },
    { word: 'light', meaning: 'Awareness, insight, divine presence, or truth' },
    { word: 'dark', meaning: 'The unknown, the unconscious, or hidden aspects of self' },
    { word: 'snake', meaning: 'Transformation, healing, kundalini energy, or hidden fears' },
    { word: 'ocean', meaning: 'Vastness of consciousness, emotions, or the infinite' },
    { word: 'fire', meaning: 'Transformation, passion, purification, or destruction' },
  ];
  
  const lowerContent = content.toLowerCase();
  const found = commonSymbols.filter(s => lowerContent.includes(s.word));
  
  return found.length > 0 
    ? found.slice(0, 3).map(s => ({ symbol: s.word, meaning: s.meaning }))
    : [{ symbol: 'Personal Imagery', meaning: 'Your dream contains unique symbols specific to your experience.' }];
}

// Mock interpretation for when Supabase is not configured
function generateMockInterpretation(content: string, mood?: string): DreamInterpretation {
  // Extract potential symbols from the dream content
  const commonSymbols = [
    { word: 'water', meaning: 'Emotions, the unconscious mind, purification, or transformation' },
    { word: 'flying', meaning: 'Freedom, transcendence, or escape from limitations' },
    { word: 'falling', meaning: 'Loss of control, anxiety, or letting go' },
    { word: 'house', meaning: 'The self, the psyche, or aspects of your identity' },
    { word: 'door', meaning: 'Opportunity, transition, or new possibilities' },
    { word: 'light', meaning: 'Awareness, insight, divine presence, or truth' },
    { word: 'dark', meaning: 'The unknown, the unconscious, or hidden aspects of self' },
    { word: 'running', meaning: 'Escape, pursuit of goals, or avoidance' },
    { word: 'animal', meaning: 'Instincts, natural wisdom, or primal energy' },
    { word: 'path', meaning: 'Life direction, choices, or spiritual journey' },
    { word: 'mountain', meaning: 'Challenge, achievement, or spiritual ascent' },
    { word: 'ocean', meaning: 'Vastness of consciousness, emotions, or the infinite' },
    { word: 'tree', meaning: 'Growth, rootedness, connection between earth and sky' },
    { word: 'fire', meaning: 'Transformation, passion, purification, or destruction' },
    { word: 'snake', meaning: 'Transformation, healing, kundalini energy, or hidden fears' },
  ];

  const lowerContent = content.toLowerCase();
  const foundSymbols = commonSymbols.filter(s => lowerContent.includes(s.word));

  // Generate mood-based insights
  const moodInsights: Record<string, string> = {
    peaceful: 'The peaceful quality of this dream suggests your psyche is in a state of integration. The unconscious is communicating harmony.',
    anxious: 'The anxious energy in this dream points to unprocessed concerns. Your psyche is bringing attention to what needs to be addressed.',
    confused: 'The confusion in this dream reflects a period of transition. Your mind is reorganizing patterns and seeking new clarity.',
    joyful: 'The joy in this dream indicates positive psychological integration. Your unconscious is celebrating growth or resolution.',
    mysterious: 'The mysterious quality suggests deep archetypal material is surfacing. Pay attention to symbolic meanings.',
    neutral: 'The neutral tone suggests your psyche is processing everyday experiences, integrating them into your deeper understanding.',
  };

  const spiritualConnections = [
    'From the Vijnana Bhairava perspective, dreams are another form of consciousness to be witnessed. The space between dreaming and waking is a doorway to presence.',
    'The Upanishads teach that the dreamer and the dreamed are one. In deep sleep beyond dreams, pure awareness remains.',
    'In Taoist understanding, dreams flow like water—not to be grasped but observed. The dream dissolves into wakefulness as clouds dissolve into sky.',
    'The Yoga Sutras recognize dreams as a valid state of consciousness. What appears in dreams often reflects the vrittis (fluctuations) we carry.',
    'Kashmir Shaivism sees dreams as the creative play of consciousness. Every dream figure is an expression of the same awareness that dreams.',
  ];

  const practices = [
    'Before sleep tonight, set the intention to remain aware as you dream. Notice the moment you transition from waking to sleeping.',
    'Sit quietly and recall your dream. Notice what feelings arise without trying to change them. Let the dream\'s energy complete itself.',
    'Write down any recurring symbols and contemplate them during meditation. Ask "What are you showing me?" without forcing an answer.',
    'Practice witnessing your thoughts today as you witnessed your dream—same awareness, different content.',
    'Consider what in your waking life mirrors this dream. The unconscious often reflects what the conscious mind overlooks.',
  ];

  return {
    summary: `This dream appears to be processing ${mood || 'significant'} emotional material through symbolic imagery. ${
      foundSymbols.length > 0
        ? `Key symbols like ${foundSymbols.map(s => s.word).join(', ')} suggest themes of transformation and inner exploration.`
        : 'The unique imagery in your dream reflects your personal symbolic language.'
    } Dreams often serve as a bridge between conscious and unconscious aspects of the psyche.`,
    symbols: foundSymbols.length > 0 
      ? foundSymbols.slice(0, 4).map(s => ({ symbol: s.word, meaning: s.meaning }))
      : [{ symbol: 'Personal Imagery', meaning: 'Your dream contains unique symbols specific to your life experience. Contemplate what these images mean to you personally.' }],
    psychologicalInsight: mood && moodInsights[mood] 
      ? moodInsights[mood]
      : 'This dream reflects the ongoing work of your psyche to integrate experiences and emotions. The imagery serves as a mirror for aspects of yourself seeking expression or resolution.',
    spiritualConnection: spiritualConnections[Math.floor(Math.random() * spiritualConnections.length)],
    actionSuggestion: practices[Math.floor(Math.random() * practices.length)],
    generatedAt: new Date().toISOString(),
  };
}


