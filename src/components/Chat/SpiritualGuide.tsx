/**
 * SpiritualGuide - Main chat interface for AI spiritual guidance
 * 
 * A conversational AI that provides wise, non-dogmatic spiritual guidance.
 * Available 24/7 for those 3am questions.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  type ChatMessage as ChatMessageType,
  loadChatHistory,
  saveChatHistory,
  clearChatHistory,
  generateMessageId,
  sendToSpiritualGuide,
  getSuggestedQuestions,
} from '../../lib/spiritualGuide';
import { ChatMessage } from './ChatMessage';
import { VoiceDictationButtonCompact } from '../VoiceDictation';

type SpiritualGuideProps = {
  onClose: () => void;
};

export function SpiritualGuide({ onClose }: SpiritualGuideProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history on mount
  useEffect(() => {
    const history = loadChatHistory();
    setMessages(history);
    if (history.length > 0) {
      setShowSuggestions(false);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      id: generateMessageId(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      const response = await sendToSpiritualGuide(userMessage.content, messages);
      
      const assistantMessage: ChatMessageType = {
        id: generateMessageId(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handleClearHistory = () => {
    if (confirm('Clear all chat history? This cannot be undone.')) {
      clearChatHistory();
      setMessages([]);
      setShowSuggestions(true);
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setInput(prev => prev + (prev ? ' ' : '') + text);
  };

  const suggestedQuestions = getSuggestedQuestions();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 bg-black/20 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🙏</span>
          <div>
            <h2 className="text-lg font-serif text-white">Spiritual Guide</h2>
            <p className="text-xs text-white/50">Ask anything, anytime</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
              title="Clear history"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome message if no history */}
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🕯️</div>
            <h3 className="text-xl font-serif text-white mb-2">Welcome, Seeker</h3>
            <p className="text-white/60 max-w-md mx-auto text-sm leading-relaxed">
              I'm here whenever you need guidance—at 3am when sleep won't come, 
              during moments of doubt, or when insight needs a companion. 
              Ask whatever weighs on your heart.
            </p>
          </div>
        )}

        {/* Suggested questions */}
        {showSuggestions && (
          <div className="space-y-2">
            <p className="text-xs text-white/40 text-center">Or try asking...</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedQuestions.slice(0, 4).map((question, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(question)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message list */}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🙏</span>
                <span className="text-xs text-violet-300/70">Spiritual Guide</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-violet-400/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-violet-400/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-violet-400/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-white/40">Contemplating...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 p-4 bg-black/20 border-t border-white/10">
        <div className="flex items-end gap-2">
          {/* Voice input */}
          <VoiceDictationButtonCompact onTranscript={handleVoiceTranscript} />
          
          {/* Text input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your question..."
              rows={1}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all resize-none"
            />
          </div>
          
          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-violet-500 hover:bg-violet-400 disabled:bg-white/10 disabled:text-white/30 rounded-xl text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        <p className="mt-2 text-xs text-white/30 text-center">
          Shift+Enter for new line • Enter to send
        </p>
      </div>
    </div>
  );
}

