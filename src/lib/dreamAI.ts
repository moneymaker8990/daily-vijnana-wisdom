// Dream AI Interpretation Service
// This will call the Supabase Edge Function for Claude AI interpretation

import type { DreamInterpretation } from './dreamStorage';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase';

// Shared dream symbol dictionary — 100 entries
const DREAM_SYMBOLS: Array<{ word: string; meaning: string }> = [
  // Original symbols
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

  // People / Beings
  { word: 'baby', meaning: 'New beginnings, innocence, vulnerability, or a developing aspect of self' },
  { word: 'child', meaning: 'Inner child, playfulness, unprocessed childhood experiences' },
  { word: 'stranger', meaning: 'Unknown aspects of the self, new possibilities, or the shadow' },
  { word: 'elder', meaning: 'Wisdom, guidance, the higher self, or ancestral connection' },
  { word: 'mother', meaning: 'Nurturing, the feminine principle, creation, or emotional needs' },
  { word: 'father', meaning: 'Authority, the masculine principle, protection, or structure' },
  { word: 'friend', meaning: 'Aspects of yourself you accept, support, or companionship needs' },
  { word: 'crowd', meaning: 'Social pressure, collective consciousness, or feeling overwhelmed' },
  { word: 'shadow figure', meaning: 'The Jungian shadow — repressed qualities seeking integration' },
  { word: 'angel', meaning: 'Divine guidance, higher awareness, protection, or spiritual message' },
  { word: 'ghost', meaning: 'Unresolved past, lingering emotions, or fear of the unknown' },
  { word: 'twin', meaning: 'Duality within the self, balance, or a mirrored aspect of identity' },

  // Body
  { word: 'teeth', meaning: 'Anxiety about appearance, powerlessness, transition, or communication' },
  { word: 'eyes', meaning: 'Perception, insight, awareness, or spiritual vision' },
  { word: 'hands', meaning: 'Capability, creativity, connection, or taking action' },
  { word: 'hair', meaning: 'Identity, vitality, sensuality, or personal power' },
  { word: 'blood', meaning: 'Life force, passion, sacrifice, or emotional wounds' },
  { word: 'bones', meaning: 'Core structure, deepest truth, ancestry, or what endures' },
  { word: 'wings', meaning: 'Spiritual aspiration, freedom, transcendence, or elevated perspective' },
  { word: 'naked', meaning: 'Vulnerability, authenticity, exposure, or shame' },

  // Nature
  { word: 'rain', meaning: 'Emotional release, cleansing, renewal, or sadness giving way to growth' },
  { word: 'storm', meaning: 'Emotional turmoil, dramatic change, suppressed feelings erupting' },
  { word: 'wind', meaning: 'Change, the breath of spirit, invisible forces, or restlessness' },
  { word: 'moon', meaning: 'The feminine, intuition, cycles, the unconscious mind' },
  { word: 'sun', meaning: 'Consciousness, vitality, clarity, the masculine principle' },
  { word: 'stars', meaning: 'Guidance, destiny, hope, connection to the cosmos' },
  { word: 'flower', meaning: 'Beauty, impermanence, unfolding potential, or love' },
  { word: 'garden', meaning: 'Inner life cultivation, growth, paradise, or the soul' },
  { word: 'river', meaning: 'The flow of life, time passing, emotional current, or transition' },
  { word: 'cave', meaning: 'The unconscious, retreat, womb-like safety, or hidden knowledge' },
  { word: 'desert', meaning: 'Spiritual aridity, simplicity, testing, or vast inner emptiness' },
  { word: 'island', meaning: 'Isolation, self-sufficiency, refuge, or individuality' },

  // Animals
  { word: 'bird', meaning: 'Freedom, spiritual messenger, perspective, or the soul' },
  { word: 'fish', meaning: 'Unconscious insights, fertility, spiritual nourishment' },
  { word: 'cat', meaning: 'Independence, intuition, feminine mystery, or sensuality' },
  { word: 'dog', meaning: 'Loyalty, companionship, unconditional love, or instinct' },
  { word: 'horse', meaning: 'Personal power, freedom, vitality, or the body' },
  { word: 'wolf', meaning: 'Instinct, intelligence, appetite, or the wild self' },
  { word: 'spider', meaning: 'Creativity, patience, fate-weaving, or feeling trapped' },
  { word: 'butterfly', meaning: 'Transformation, the soul, beauty, or impermanence' },
  { word: 'eagle', meaning: 'Spiritual vision, sovereignty, courage, or higher perspective' },
  { word: 'dolphin', meaning: 'Joy, intelligence, playfulness, or emotional healing' },

  // Structures
  { word: 'bridge', meaning: 'Transition, connection between states, overcoming obstacles' },
  { word: 'stairs', meaning: 'Progress, spiritual ascent or descent, levels of consciousness' },
  { word: 'tower', meaning: 'Ambition, isolation, higher perspective, or ego structures' },
  { word: 'temple', meaning: 'Sacred inner space, devotion, spiritual aspiration' },
  { word: 'prison', meaning: 'Self-imposed limitations, guilt, restriction, or trapped feelings' },
  { word: 'window', meaning: 'Perspective, opportunity, barrier between inner and outer' },
  { word: 'mirror', meaning: 'Self-reflection, truth, confronting your true nature' },
  { word: 'wall', meaning: 'Obstacles, boundaries, defenses, or emotional barriers' },
  { word: 'gate', meaning: 'Threshold, initiation, passage to new understanding' },
  { word: 'tunnel', meaning: 'Transition, passage through difficulty, birth/rebirth' },

  // Vehicles / Travel
  { word: 'car', meaning: 'Personal direction, control over life path, the ego vehicle' },
  { word: 'boat', meaning: 'Navigating emotions, the journey of life, spiritual vessel' },
  { word: 'train', meaning: 'Life journey on a set path, collective movement, destiny' },
  { word: 'road', meaning: 'Life path, direction, choices ahead, or the journey itself' },
  { word: 'crossroads', meaning: 'Decision point, choice, diverging possibilities' },
  { word: 'map', meaning: 'Seeking direction, life planning, or needing guidance' },
  { word: 'key', meaning: 'Solution, access, secret knowledge, or unlocking potential' },
  { word: 'flying vehicle', meaning: 'Elevated ambitions, transcending limitations, rapid change' },

  // Elements
  { word: 'ice', meaning: 'Frozen emotions, rigidity, preservation, or emotional coldness' },
  { word: 'flood', meaning: 'Overwhelming emotions, loss of control, or emotional purging' },
  { word: 'earthquake', meaning: 'Foundational upheaval, shocking change, or insecurity' },
  { word: 'lightning', meaning: 'Sudden insight, divine power, destruction and illumination' },
  { word: 'fog', meaning: 'Confusion, uncertainty, the liminal, or hidden truths' },
  { word: 'shadow', meaning: 'The unconscious, repressed self, fear, or hidden truth' },
  { word: 'void', meaning: 'The absolute, emptiness, potential, or existential confrontation' },
  { word: 'crystal', meaning: 'Clarity, purity, healing energy, or spiritual attainment' },

  // Objects
  { word: 'book', meaning: 'Knowledge, memory, life story, or wisdom seeking' },
  { word: 'clock', meaning: 'Time awareness, urgency, mortality, or life phases' },
  { word: 'ring', meaning: 'Commitment, wholeness, cycles, or eternal connection' },
  { word: 'sword', meaning: 'Discernment, cutting through illusion, truth, or conflict' },
  { word: 'food', meaning: 'Nourishment, sustenance, emotional or spiritual hunger' },
  { word: 'mask', meaning: 'Persona, hidden identity, social roles, or deception' },
  { word: 'treasure', meaning: 'Hidden value, self-worth, spiritual riches, or inner gifts' },
  { word: 'rope', meaning: 'Connection, bondage, lifeline, or spiritual binding' },

  // States / Actions (multi-word phrases matched first)
  { word: 'drowning', meaning: 'Overwhelmed by emotions, loss of control, or feeling submerged' },
  { word: 'being chased', meaning: 'Avoidance, running from an aspect of self, or unresolved fear' },
  { word: 'being lost', meaning: 'Disorientation in life, searching for purpose, or identity confusion' },
  { word: 'dying', meaning: 'Transformation, ending of one phase, ego death, or rebirth' },
  { word: 'wedding', meaning: 'Union of opposites, commitment, integration, or new partnership' },
  { word: 'exam', meaning: 'Self-evaluation, fear of judgment, testing, or readiness anxiety' },
  { word: 'searching', meaning: 'Seeking meaning, lost aspects of self, or unfulfilled desire' },
  { word: 'transformation', meaning: 'Deep change, spiritual evolution, or metamorphosis of identity' },
  { word: 'trapped', meaning: 'Feeling stuck, powerlessness, or need for liberation' },
];

export async function interpretDream(
  dreamContent: string,
  mood?: string
): Promise<{ interpretation: DreamInterpretation; isAI: boolean }> {

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
      return { interpretation: parseInterpretation(data.interpretation, dreamContent, mood), isAI: true };
    }

    return {
      interpretation: { ...data, generatedAt: new Date().toISOString() },
      isAI: true,
    };
  } catch (error) {
    // Fallback to mock interpretation
    return { interpretation: generateMockInterpretation(dreamContent, mood), isAI: false };
  }
}

// Parse AI interpretation into structured format
function parseInterpretation(aiResponse: string, dreamContent: string, _mood?: string): DreamInterpretation {
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

// Extract potential symbols from dream content — multi-word phrases first, then single words
function extractSymbols(content: string): Array<{ symbol: string; meaning: string }> {
  const lowerContent = content.toLowerCase();

  // Sort by word length descending so multi-word phrases match before single words
  const sorted = [...DREAM_SYMBOLS].sort((a, b) => b.word.length - a.word.length);
  const found = sorted.filter(s => lowerContent.includes(s.word));

  return found.length > 0
    ? found.slice(0, 5).map(s => ({ symbol: s.word, meaning: s.meaning }))
    : [{ symbol: 'Personal Imagery', meaning: 'Your dream contains unique symbols specific to your experience.' }];
}

// Mock interpretation for when Supabase is not configured
function generateMockInterpretation(content: string, mood?: string): DreamInterpretation {
  // Extract potential symbols from the dream content using the shared dictionary
  const lowerContent = content.toLowerCase();
  const sorted = [...DREAM_SYMBOLS].sort((a, b) => b.word.length - a.word.length);
  const foundSymbols = sorted.filter(s => lowerContent.includes(s.word));

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
      ? foundSymbols.slice(0, 5).map(s => ({ symbol: s.word, meaning: s.meaning }))
      : [{ symbol: 'Personal Imagery', meaning: 'Your dream contains unique symbols specific to your life experience. Contemplate what these images mean to you personally.' }],
    psychologicalInsight: mood && moodInsights[mood] 
      ? moodInsights[mood]
      : 'This dream reflects the ongoing work of your psyche to integrate experiences and emotions. The imagery serves as a mirror for aspects of yourself seeking expression or resolution.',
    spiritualConnection: spiritualConnections[Math.floor(Math.random() * spiritualConnections.length)],
    actionSuggestion: practices[Math.floor(Math.random() * practices.length)],
    generatedAt: new Date().toISOString(),
  };
}


