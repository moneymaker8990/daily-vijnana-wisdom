/**
 * Semantic Tag Vocabulary
 * 
 * ~25 tags that work across all traditions, enabling cross-tradition
 * connections and thematic exploration.
 */

// Awareness & Consciousness
export const AWARENESS_TAGS = [
  'nonduality',      // Direct pointing to non-dual awareness
  'stillness',       // Resting in silence, cessation of movement
  'presence',        // Being here now, immediate awareness
  'witness',         // Observer consciousness, sakshi
] as const;

// Body & Breath
export const BODY_TAGS = [
  'breath',          // Pranayama, breath practices
  'body-awareness',  // Somatic presence, feeling the body
  'senses',          // Working with sense perceptions
] as const;

// Action & Discipline
export const ACTION_TAGS = [
  'action',          // Karma yoga, right action
  'discipline',      // Tapas, practice, consistency
  'courage',         // Facing fear, warrior spirit
  'strength',        // Inner and outer strength
] as const;

// Emotion & Heart
export const EMOTION_TAGS = [
  'love',            // Universal love, unconditional
  'devotion',        // Bhakti, surrender to the divine
  'compassion',      // Karuna, caring for all beings
  'anger',           // Working with anger, transmutation
  'fear',            // Facing and dissolving fear
] as const;

// Shadow & Depth
export const SHADOW_TAGS = [
  'shadow',          // Unconscious, hidden aspects
  'death',           // Mortality, impermanence, ego death
  'surrender',       // Letting go, giving up control
  'suffering',       // Dukkha, working with pain
] as const;

// Light & Joy
export const LIGHT_TAGS = [
  'joy',             // Ananda, bliss, happiness
  'play',            // Lila, divine play, lightness
  'vision',          // Seeing clearly, insight
  'mystery',         // Embracing the unknown
] as const;

// Practice & Method
export const PRACTICE_TAGS = [
  'meditation',      // Dhyana, sitting practice
  'mantra',          // Sacred sounds, repetition
  'inquiry',         // Self-inquiry, investigation
] as const;

/**
 * All available tags as a flat array
 */
export const ALL_TAGS = [
  ...AWARENESS_TAGS,
  ...BODY_TAGS,
  ...ACTION_TAGS,
  ...EMOTION_TAGS,
  ...SHADOW_TAGS,
  ...LIGHT_TAGS,
  ...PRACTICE_TAGS,
] as const;

export type Tag = typeof ALL_TAGS[number];

/**
 * Tag categories for UI grouping
 */
export const TAG_CATEGORIES = {
  'Awareness': AWARENESS_TAGS,
  'Body & Breath': BODY_TAGS,
  'Action': ACTION_TAGS,
  'Emotion': EMOTION_TAGS,
  'Shadow': SHADOW_TAGS,
  'Light': LIGHT_TAGS,
  'Practice': PRACTICE_TAGS,
} as const;

/**
 * Tag descriptions for tooltips/help
 */
export const TAG_DESCRIPTIONS: Record<Tag, string> = {
  'nonduality': 'Direct pointing to non-dual awareness - the recognition that observer and observed are one',
  'stillness': 'Resting in silence, the cessation of mental movement',
  'presence': 'Being fully here now, immediate awareness without past or future',
  'witness': 'The observing consciousness that watches all experience',
  'breath': 'Working with the breath as gateway to presence',
  'body-awareness': 'Somatic presence, feeling the living body',
  'senses': 'Using sense perceptions as doorways to awareness',
  'action': 'Right action, karma yoga, acting without attachment',
  'discipline': 'Consistent practice, tapas, the fire of transformation',
  'courage': 'Facing fear, the warrior spirit of the seeker',
  'strength': 'Cultivating inner and outer strength',
  'love': 'Universal, unconditional love for all beings',
  'devotion': 'Bhakti, surrender and love toward the divine',
  'compassion': 'Caring for all beings, including oneself',
  'anger': 'Working skillfully with anger, transmuting its energy',
  'fear': 'Facing and dissolving fear through awareness',
  'shadow': 'Meeting unconscious and hidden aspects of self',
  'death': 'Contemplating mortality, ego death, impermanence',
  'surrender': 'Letting go of control, trusting what is',
  'suffering': 'Working with pain as a doorway to freedom',
  'joy': 'Natural bliss, ananda, uncaused happiness',
  'play': 'Divine play (lila), lightness, not taking things too seriously',
  'vision': 'Clear seeing, insight, wisdom',
  'mystery': 'Embracing the unknown, wonder, awe',
  'meditation': 'Formal sitting practice, dhyana',
  'mantra': 'Sacred sounds, repetition, japa',
  'inquiry': 'Self-inquiry, investigation into the nature of self',
};




