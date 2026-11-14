'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X, ChevronRight, MessageSquare } from 'lucide-react';

type Role = 'user' | 'bot';

type ChatMessage = {
  id: number;
  role: Role;
  text: string;
};

interface ChatbotProps {
  isLoading?: boolean;
}

const quickPrompts = [
  'Walk me through the Swiggy vs Eternal teardown',
  'Tell me about Fineye payment categorisation',
  'What were the outcomes at BeFiSc and IOCL?',
  'What is Rishabh’s PM & GTM toolkit?',
];

export default function Chatbot({ isLoading = false }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showLauncher, setShowLauncher] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) {
      setShowLauncher(false);
      return;
    }

    const timer = setTimeout(() => setShowLauncher(true), 300);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isTyping]);

  const sendMessage = (rawText: string) => {
    const text = rawText.trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || 'Chat request failed');
        }
        return data;
      })
      .then((data) => {
        const botMessage: ChatMessage = {
          id: Date.now() + 1,
          role: 'bot',
          text:
            data.reply ||
            'I could not retrieve an AI reply right now, but I can answer about projects, skills, experience, certifications, and contact details.',
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      })
      .catch((error) => {
        console.error('Chat error:', error);
        const errorMessage: ChatMessage = {
          id: Date.now() + 1,
          role: 'bot',
          text:
            'Live AI is temporarily offline. Rishabh is open to APM roles—ask about his projects, skills, experience, or contact information.',
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsTyping(false);
      });
  };

  const unreadCount = useMemo(() => (isOpen ? 0 : 1), [isOpen]);
  const isEmpty = messages.length === 0;

  return (
    <AnimatePresence>
      {showLauncher && (
        <motion.div
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[120]"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="mb-3 w-[92vw] max-w-[420px] h-[520px] sm:h-[580px] rounded-[28px] border border-white/[0.12] bg-[#161617]/95 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Apple Intelligence Style Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-black/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white tracking-tight flex items-center gap-1.5">
                      <span>Rishabh&apos;s PM Assistant</span>
                    </h3>
                    <p className="text-[10px] text-neutral-400">
                      Grounded in PRDs, analytics &amp; experience
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                  aria-label="Close chat assistant"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Chat Message List */}
              <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3.5 min-h-0">
                {isEmpty ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-2 py-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mb-4 text-accent">
                      <MessageSquare className="w-6 h-6" />
                    </div>

                    <h4 className="text-base font-semibold text-white tracking-tight">
                      How can I help you today?
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 mb-6 max-w-xs leading-relaxed">
                      Ask anything about Rishabh&apos;s product management journey, PRDs, analytics telemetry, or credentials.
                    </p>

                    <div className="flex flex-col gap-2 w-full">
                      {quickPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => sendMessage(prompt)}
                          className="px-3.5 py-2.5 rounded-xl text-left text-xs text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.15] transition-all flex items-center justify-between group"
                        >
                          <span className="line-clamp-1">{prompt}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-apple-blue group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                            m.role === 'user'
                              ? 'bg-apple-blue text-white rounded-br-sm'
                              : 'bg-[#242426] text-neutral-100 border border-white/[0.08] rounded-bl-sm'
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-[#242426] border border-white/[0.08] rounded-2xl rounded-bl-sm px-4 py-3">
                          <div className="flex gap-1.5 items-center">
                            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Input Bar */}
              <div className="p-3 border-t border-white/[0.08] bg-black/40">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects, PRDs, skills..."
                    className="flex-1 rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-apple-blue/60 focus:bg-white/[0.09] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="w-8 h-8 rounded-full bg-apple-blue hover:bg-apple-blueHover text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Floating PM Assistant Trigger Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111827] hover:bg-[#1f2937] text-white border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Open portfolio assistant"
          >
            <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <MessageSquare className="w-3 h-3" />
            </div>
            <span className="text-xs font-semibold text-white/90 group-hover:text-accent tracking-wide">
              PM Chat
            </span>

            {unreadCount > 0 && !isOpen && (
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}