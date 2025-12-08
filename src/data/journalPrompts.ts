// Spiritual and reflective journal prompts

export type PromptCategory = 
  | 'gratitude' 
  | 'reflection' 
  | 'growth' 
  | 'mindfulness' 
  | 'wisdom' 
  | 'intention' 
  | 'connection' 
  | 'challenge';

export type JournalPrompt = {
  id: string;
  text: string;
  category: PromptCategory;
  followUp?: string;
};

export const journalPrompts: JournalPrompt[] = [
  // Gratitude
  {
    id: 'grat-1',
    text: "What simple pleasure brought you joy today that you might normally overlook?",
    category: 'gratitude',
    followUp: "How might you create more space for these moments?"
  },
  {
    id: 'grat-2',
    text: "Who in your life are you most grateful for right now, and why?",
    category: 'gratitude',
    followUp: "Consider reaching out to express this appreciation."
  },
  {
    id: 'grat-3',
    text: "What challenge from your past are you now grateful for? What did it teach you?",
    category: 'gratitude'
  },
  {
    id: 'grat-4',
    text: "What part of your body served you well today? Send it gratitude.",
    category: 'gratitude'
  },
  {
    id: 'grat-5',
    text: "What technology, tool, or modern convenience made your life easier today?",
    category: 'gratitude'
  },
  
  // Reflection
  {
    id: 'ref-1',
    text: "What emotion visited you most frequently today? What might it be trying to tell you?",
    category: 'reflection'
  },
  {
    id: 'ref-2',
    text: "If you could have a conversation with your younger self, what would you say?",
    category: 'reflection'
  },
  {
    id: 'ref-3',
    text: "What story are you telling yourself that might not be true?",
    category: 'reflection',
    followUp: "What would change if you let go of this story?"
  },
  {
    id: 'ref-4',
    text: "What did you learn about yourself today that surprised you?",
    category: 'reflection'
  },
  {
    id: 'ref-5',
    text: "Where in your life are you holding on too tightly? What would release feel like?",
    category: 'reflection'
  },
  
  // Growth
  {
    id: 'grow-1',
    text: "What fear is currently holding you back from your fullest expression?",
    category: 'growth',
    followUp: "What small step could you take toward facing it?"
  },
  {
    id: 'grow-2',
    text: "What habit would transform your life if you could maintain it consistently?",
    category: 'growth'
  },
  {
    id: 'grow-3',
    text: "What skill or quality do you admire in others that you'd like to develop?",
    category: 'growth'
  },
  {
    id: 'grow-4',
    text: "How are you different from who you were a year ago?",
    category: 'growth'
  },
  {
    id: 'grow-5',
    text: "What comfort zone are you being called to expand?",
    category: 'growth'
  },
  
  // Mindfulness
  {
    id: 'mind-1',
    text: "Describe a moment today when you were fully present. What made it special?",
    category: 'mindfulness'
  },
  {
    id: 'mind-2',
    text: "What sounds can you hear right now? Let each one anchor you to this moment.",
    category: 'mindfulness'
  },
  {
    id: 'mind-3',
    text: "How does your body feel right now? Scan from head to toe and describe what you notice.",
    category: 'mindfulness'
  },
  {
    id: 'mind-4',
    text: "What thoughts kept pulling your attention away today? Observe them without judgment.",
    category: 'mindfulness'
  },
  {
    id: 'mind-5',
    text: "Describe your current breath. Is it deep or shallow? Fast or slow?",
    category: 'mindfulness'
  },
  
  // Wisdom
  {
    id: 'wis-1',
    text: "What ancient wisdom or quote has been resonating with you lately?",
    category: 'wisdom',
    followUp: "How does it apply to your current situation?"
  },
  {
    id: 'wis-2',
    text: "What would your wisest self advise you about your current challenges?",
    category: 'wisdom'
  },
  {
    id: 'wis-3',
    text: "What truth have you been avoiding that you're ready to acknowledge?",
    category: 'wisdom'
  },
  {
    id: 'wis-4',
    text: "If this situation is a teacher, what lesson is it offering you?",
    category: 'wisdom'
  },
  {
    id: 'wis-5',
    text: "What would love do in your current situation?",
    category: 'wisdom'
  },
  
  // Intention
  {
    id: 'int-1',
    text: "What energy or quality do you want to embody tomorrow?",
    category: 'intention'
  },
  {
    id: 'int-2',
    text: "What is one thing you commit to doing differently tomorrow?",
    category: 'intention'
  },
  {
    id: 'int-3',
    text: "What would make tomorrow feel meaningful and well-lived?",
    category: 'intention'
  },
  {
    id: 'int-4',
    text: "What boundaries do you need to set to protect your peace?",
    category: 'intention'
  },
  {
    id: 'int-5',
    text: "What are you calling into your life right now?",
    category: 'intention'
  },
  
  // Connection
  {
    id: 'conn-1',
    text: "Who needs your compassion right now—including yourself?",
    category: 'connection'
  },
  {
    id: 'conn-2',
    text: "How did you show up for someone today? How did someone show up for you?",
    category: 'connection'
  },
  {
    id: 'conn-3',
    text: "What conversation do you need to have that you've been avoiding?",
    category: 'connection'
  },
  {
    id: 'conn-4',
    text: "How are you connected to something larger than yourself?",
    category: 'connection'
  },
  {
    id: 'conn-5',
    text: "What relationship in your life could use more attention?",
    category: 'connection'
  },
  
  // Challenge
  {
    id: 'chal-1',
    text: "What struggle are you facing right now? How might it be serving your growth?",
    category: 'challenge'
  },
  {
    id: 'chal-2',
    text: "What would you do if you weren't afraid of failing?",
    category: 'challenge'
  },
  {
    id: 'chal-3',
    text: "What limiting belief is ready to be released?",
    category: 'challenge'
  },
  {
    id: 'chal-4',
    text: "Where are you playing small when you're meant to play bigger?",
    category: 'challenge'
  },
  {
    id: 'chal-5',
    text: "What part of yourself are you being called to integrate or accept?",
    category: 'challenge'
  },
];

export function getRandomPrompt(): JournalPrompt {
  return journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
}

export function getPromptsByCategory(category: PromptCategory): JournalPrompt[] {
  return journalPrompts.filter(p => p.category === category);
}

export function getDailyPrompt(): JournalPrompt {
  // Use the date to deterministically select a prompt (same prompt all day)
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return journalPrompts[dayOfYear % journalPrompts.length];
}

export const categoryInfo: Record<PromptCategory, { label: string; icon: string; color: string }> = {
  gratitude: { label: 'Gratitude', icon: '🙏', color: 'from-amber-500/20 to-orange-500/20' },
  reflection: { label: 'Reflection', icon: '🪞', color: 'from-blue-500/20 to-cyan-500/20' },
  growth: { label: 'Growth', icon: '🌱', color: 'from-emerald-500/20 to-green-500/20' },
  mindfulness: { label: 'Mindfulness', icon: '🧘', color: 'from-purple-500/20 to-violet-500/20' },
  wisdom: { label: 'Wisdom', icon: '📿', color: 'from-indigo-500/20 to-blue-500/20' },
  intention: { label: 'Intention', icon: '🎯', color: 'from-rose-500/20 to-pink-500/20' },
  connection: { label: 'Connection', icon: '💫', color: 'from-teal-500/20 to-cyan-500/20' },
  challenge: { label: 'Challenge', icon: '⚡', color: 'from-red-500/20 to-orange-500/20' },
};

export const moodInfo: Record<string, { label: string; icon: string; color: string }> = {
  peaceful: { label: 'Peaceful', icon: '😌', color: 'bg-teal-500/20 border-teal-400/30' },
  grateful: { label: 'Grateful', icon: '🙏', color: 'bg-amber-500/20 border-amber-400/30' },
  inspired: { label: 'Inspired', icon: '✨', color: 'bg-violet-500/20 border-violet-400/30' },
  reflective: { label: 'Reflective', icon: '🤔', color: 'bg-blue-500/20 border-blue-400/30' },
  anxious: { label: 'Anxious', icon: '😰', color: 'bg-orange-500/20 border-orange-400/30' },
  sad: { label: 'Sad', icon: '😢', color: 'bg-indigo-500/20 border-indigo-400/30' },
  joyful: { label: 'Joyful', icon: '😊', color: 'bg-yellow-500/20 border-yellow-400/30' },
  neutral: { label: 'Neutral', icon: '😐', color: 'bg-slate-500/20 border-slate-400/30' },
};

