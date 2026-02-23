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
  {
    id: 'grat-6',
    text: "What hidden blessing has been quietly supporting you that you rarely acknowledge?",
    category: 'gratitude',
    followUp: "How would your day feel different if you held this blessing in awareness?"
  },
  {
    id: 'grat-7',
    text: "Think of an ancestor or someone from the past whose choices made your life possible. What would you say to them?",
    category: 'gratitude'
  },
  {
    id: 'grat-8',
    text: "What element of the natural world brought you a moment of awe or peace recently?",
    category: 'gratitude'
  },
  {
    id: 'grat-9',
    text: "What mistake or failure from your past are you now able to see as a gift? What did it redirect you toward?",
    category: 'gratitude',
    followUp: "How does this shift your relationship with current difficulties?"
  },
  {
    id: 'grat-10',
    text: "Choose one of your five senses. What is one thing it allowed you to experience today that you're grateful for?",
    category: 'gratitude'
  },
  {
    id: 'grat-11',
    text: "When did a stranger's kindness — even a small gesture — unexpectedly brighten your day?",
    category: 'gratitude'
  },
  {
    id: 'grat-12',
    text: "What opportunity to rest or slow down appeared recently? Did you take it?",
    category: 'gratitude'
  },
  {
    id: 'grat-13',
    text: "What creative ability or talent do you possess that you sometimes take for granted?",
    category: 'gratitude'
  },
  {
    id: 'grat-14',
    text: "Think of a difficult person in your life. What unexpected lesson have they taught you?",
    category: 'gratitude',
    followUp: "Can you hold gratitude for the teaching even if the experience was painful?"
  },
  {
    id: 'grat-15',
    text: "Write a brief note of gratitude to the person you will be one year from now. What do you appreciate about your future self's journey?",
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
  {
    id: 'ref-6',
    text: "What recurring dream or daydream keeps visiting you? What might your unconscious be trying to communicate?",
    category: 'reflection'
  },
  {
    id: 'ref-7',
    text: "What patterns do you notice repeating in your relationships? What role do you consistently play?",
    category: 'reflection',
    followUp: "Is this role one you've chosen, or one you've inherited?"
  },
  {
    id: 'ref-8',
    text: "What does your inner critic most often say to you? Whose voice does it sound like?",
    category: 'reflection'
  },
  {
    id: 'ref-9',
    text: "What piece of wisdom did you understand as a child that you've since forgotten or overcomplicated?",
    category: 'reflection'
  },
  {
    id: 'ref-10',
    text: "What activities or situations quietly drain your energy without you fully realizing it?",
    category: 'reflection',
    followUp: "What would your days look like with even one of these removed?"
  },
  {
    id: 'ref-11',
    text: "If you were to teach a young person the single most important thing you've learned, what would it be?",
    category: 'reflection'
  },
  {
    id: 'ref-12',
    text: "Recall a moment when you acted with genuine courage. What made that possible?",
    category: 'reflection'
  },
  {
    id: 'ref-13',
    text: "What truths about yourself or your life have you left unspoken? What keeps them silent?",
    category: 'reflection'
  },
  {
    id: 'ref-14',
    text: "When you are silent and still, what arises? What does silence reveal that noise conceals?",
    category: 'reflection'
  },
  {
    id: 'ref-15',
    text: "How would you describe your current relationship with time? Do you feel you have enough, too little, or that it moves differently than you expect?",
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
  {
    id: 'grow-6',
    text: "Where are you standing at the edge of your comfort zone right now? What would one small step beyond it look like?",
    category: 'growth',
    followUp: "What is the worst that could realistically happen if you took that step?"
  },
  {
    id: 'grow-7',
    text: "What belief, habit, or assumption are you ready to unlearn? What would replace it?",
    category: 'growth'
  },
  {
    id: 'grow-8',
    text: "Who or what are you withholding forgiveness from — including yourself? What would it take to begin releasing that?",
    category: 'growth'
  },
  {
    id: 'grow-9',
    text: "When was the last time you allowed yourself to be truly vulnerable? What did you discover?",
    category: 'growth'
  },
  {
    id: 'grow-10',
    text: "What boundary have you been reluctant to set? What fear underlies that reluctance?",
    category: 'growth'
  },
  {
    id: 'grow-11',
    text: "What form of creative expression calls to you that you've been neglecting or dismissing?",
    category: 'growth'
  },
  {
    id: 'grow-12',
    text: "What is your body trying to tell you right now that your mind has been ignoring?",
    category: 'growth'
  },
  {
    id: 'grow-13',
    text: "What has grief or loss taught you that nothing else could have? How has sorrow deepened your capacity for life?",
    category: 'growth'
  },
  {
    id: 'grow-14',
    text: "Where in your life is imperfection actually serving you well? What beauty lives in the unfinished?",
    category: 'growth'
  },
  {
    id: 'grow-15',
    text: "Have you experienced spiritual doubt recently? What might that doubt be protecting or revealing?",
    category: 'growth',
    followUp: "Can doubt and faith coexist?"
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
  {
    id: 'mind-6',
    text: "Notice the transitions in your day — waking to rising, indoors to outdoors, work to rest. What happens in those in-between moments?",
    category: 'mindfulness'
  },
  {
    id: 'mind-7',
    text: "Eat your next meal with complete attention. Describe one bite — the texture, taste, temperature, and the miracle of nourishment.",
    category: 'mindfulness'
  },
  {
    id: 'mind-8',
    text: "The next time someone speaks to you, listen with your whole body. What do you hear beyond their words?",
    category: 'mindfulness',
    followUp: "What changes in the conversation when you listen this way?"
  },
  {
    id: 'mind-9',
    text: "Take a slow, mindful walk — even just across the room. What do you notice about the sensation of each step?",
    category: 'mindfulness'
  },
  {
    id: 'mind-10',
    text: "Where is pain or discomfort present in your body right now? Can you simply be with it without trying to fix it?",
    category: 'mindfulness'
  },
  {
    id: 'mind-11',
    text: "When was the last time you sat with boredom without reaching for distraction? What might boredom be inviting you toward?",
    category: 'mindfulness'
  },
  {
    id: 'mind-12',
    text: "Rest in the space between two thoughts. What lives there? Can you linger?",
    category: 'mindfulness'
  },
  {
    id: 'mind-13',
    text: "Notice one judgment that arose today — about yourself, another, or a situation. Can you observe it without believing it?",
    category: 'mindfulness'
  },
  {
    id: 'mind-14',
    text: "Take three conscious breaths right now. With each exhale, silently say 'thank you.' What shifts?",
    category: 'mindfulness'
  },
  {
    id: 'mind-15',
    text: "Can you become aware of your own awareness? What is it like to notice that you are noticing?",
    category: 'mindfulness',
    followUp: "Who or what is doing the noticing?"
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
  {
    id: 'wis-6',
    text: "If you knew you would die in one year, what would you change about how you're living today?",
    category: 'wisdom',
    followUp: "Why wait?"
  },
  {
    id: 'wis-7',
    text: "What pattern does your ego most frequently use to protect you? What is it protecting you from?",
    category: 'wisdom'
  },
  {
    id: 'wis-8',
    text: "Where in your life are you confusing surrender with giving up? What is the difference between the two?",
    category: 'wisdom'
  },
  {
    id: 'wis-9',
    text: "What paradox are you currently living inside of? Can two contradictory things both be true?",
    category: 'wisdom'
  },
  {
    id: 'wis-10',
    text: "What has nature taught you recently that no book or teacher could?",
    category: 'wisdom'
  },
  {
    id: 'wis-11',
    text: "How do you understand suffering's role in your life? Is it punishment, teacher, or something else entirely?",
    category: 'wisdom'
  },
  {
    id: 'wis-12',
    text: "What exists beyond the categories of right and wrong? Can you touch that space?",
    category: 'wisdom',
    followUp: "Rumi wrote: 'Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there.'"
  },
  {
    id: 'wis-13',
    text: "What ordinary, everyday activity feels secretly sacred to you? What makes it so?",
    category: 'wisdom'
  },
  {
    id: 'wis-14',
    text: "What is the relationship between emptiness and fullness in your experience? Can something be both?",
    category: 'wisdom'
  },
  {
    id: 'wis-15',
    text: "What truth or experience in your life lies beyond words? What happens when you try to speak the unspeakable?",
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
  {
    id: 'int-6',
    text: "Before rising tomorrow, do a slow body scan from crown to toes. Set one intention based on what your body needs.",
    category: 'intention'
  },
  {
    id: 'int-7',
    text: "At the end of today, review: Where did I act with integrity? Where did I fall short? Hold both with compassion.",
    category: 'intention'
  },
  {
    id: 'int-8',
    text: "Dedicate the merit of today's practice to someone who is suffering. Who comes to mind, and what do you wish for them?",
    category: 'intention'
  },
  {
    id: 'int-9',
    text: "Commit to one act of service today — however small. What will it be, and for whom?",
    category: 'intention'
  },
  {
    id: 'int-10',
    text: "Set an intention for a digital sabbath — even for one hour. What will you do with that reclaimed attention?",
    category: 'intention'
  },
  {
    id: 'int-11',
    text: "Choose three moments today where you will pause before responding. What happens in that sacred pause?",
    category: 'intention',
    followUp: "Notice the difference between reacting and responding."
  },
  {
    id: 'int-12',
    text: "Set an intention to speak with care today. Before each conversation, silently ask: 'Is it true? Is it kind? Is it necessary?'",
    category: 'intention'
  },
  {
    id: 'int-13',
    text: "Practice generous listening today — giving someone your full, undivided presence. What do you notice?",
    category: 'intention'
  },
  {
    id: 'int-14',
    text: "Create a small release ritual tonight: write down something you're ready to let go of and tear it up, burn it, or dissolve it in water.",
    category: 'intention'
  },
  {
    id: 'int-15',
    text: "Write a brief letter of gratitude to someone — even if you never send it. Let the writing itself be the practice.",
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
  {
    id: 'conn-6',
    text: "Think of your ancestors — known or unknown. What strength or quality do you carry that they passed down?",
    category: 'connection'
  },
  {
    id: 'conn-7',
    text: "Step outside and place your bare feet on the earth, or touch a tree. What do you feel? What does connection to the earth mean to you?",
    category: 'connection'
  },
  {
    id: 'conn-8',
    text: "Who are the unseen helpers in your life — the people whose labor you benefit from but rarely acknowledge?",
    category: 'connection'
  },
  {
    id: 'conn-9',
    text: "Write a forgiveness letter to someone who hurt you. You don't need to send it. What does the writing release?",
    category: 'connection',
    followUp: "Forgiveness is not condoning — it is freeing yourself."
  },
  {
    id: 'conn-10',
    text: "Choose someone you disagree with. Try to see the world entirely through their eyes for five minutes. What do you discover?",
    category: 'connection'
  },
  {
    id: 'conn-11',
    text: "Imagine the inner life of a stranger you saw today. What joys, fears, and hopes might they carry?",
    category: 'connection'
  },
  {
    id: 'conn-12',
    text: "Where do you feel a sense of genuine belonging? What makes those spaces feel like home?",
    category: 'connection'
  },
  {
    id: 'conn-13',
    text: "If you have an animal companion, what have they taught you about presence, loyalty, or joy?",
    category: 'connection'
  },
  {
    id: 'conn-14',
    text: "What piece of art, music, or poetry has moved you deeply? What connection did it create within you?",
    category: 'connection'
  },
  {
    id: 'conn-15',
    text: "Offer a silent prayer or good wish for someone you'll never meet. What does this act of distant compassion feel like?",
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
  {
    id: 'chal-6',
    text: "Sit with a feeling of discomfort for five minutes without trying to fix, explain, or escape it. What happens?",
    category: 'challenge'
  },
  {
    id: 'chal-7',
    text: "Examine your anger. What deeper emotion — hurt, fear, grief — is it protecting? What happens when you look beneath it?",
    category: 'challenge',
    followUp: "Anger is often the bodyguard of more vulnerable feelings."
  },
  {
    id: 'chal-8',
    text: "When you feel jealousy or envy, what unmet desire is it pointing to? Can jealousy become a compass?",
    category: 'challenge'
  },
  {
    id: 'chal-9',
    text: "When loneliness visits, what is it actually asking for — connection with others, or connection with yourself?",
    category: 'challenge'
  },
  {
    id: 'chal-10',
    text: "What uncertainty are you currently living with? Can you practice trusting the not-knowing?",
    category: 'challenge'
  },
  {
    id: 'chal-11',
    text: "Examine an area where you have privilege. How does acknowledging it change your relationship with gratitude and responsibility?",
    category: 'challenge'
  },
  {
    id: 'chal-12',
    text: "If you fully accepted your own mortality today, what would become urgent? What would become irrelevant?",
    category: 'challenge'
  },
  {
    id: 'chal-13',
    text: "What part of your shadow — the disowned, hidden self — is asking to be seen? Can you turn toward it with curiosity rather than fear?",
    category: 'challenge'
  },
  {
    id: 'chal-14',
    text: "Where in your life are you meeting inner resistance? What would it look like to stop fighting and start listening to it?",
    category: 'challenge'
  },
  {
    id: 'chal-15',
    text: "Practice radical acceptance for one hour: whatever arises, meet it with 'This too.' What shifts in your experience?",
    category: 'challenge',
    followUp: "Acceptance is not passivity — it is the ground from which wise action grows."
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



