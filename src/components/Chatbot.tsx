'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';

type Role = 'user' | 'bot';

type ChatMessage = {
  id: number;
  role: Role;
  text: string;
};

type BotResolution = {
  reply: string;
  targetSection?: 'projects' | 'skills' | 'contact' | 'certifications' | 'experience' | 'about';
};

const quickPrompts = [
  'Show recent projects',
  'What skills do you have?',
  'How can I contact you?',
  'Do you have certifications?',
];

function getBotReply(input: string): BotResolution {
  const text = input.toLowerCase();

  if (text.includes('project') || text.includes('work') || text.includes('portfolio')) {
    return {
      reply: 'Opening Projects for you. You can explore featured work across product strategy, analytics, dashboarding, and experimentation.',
      targetSection: 'projects',
    };
  }

  if (text.includes('skill') || text.includes('stack') || text.includes('tool')) {
    return {
      reply: 'Opening Skills. Core strengths include product thinking, SQL, Python, analytics, experimentation, and decision-focused dashboards.',
      targetSection: 'skills',
    };
  }

  if (text.includes('contact') || text.includes('email') || text.includes('hire') || text.includes('reach')) {
    return {
      reply: 'Taking you to Contact. If you want, I can also suggest a short outreach message format.',
      targetSection: 'contact',
    };
  }

  if (text.includes('cert') || text.includes('certificate')) {
    return {
      reply: 'Opening Certifications so you can review credentials and details quickly.',
      targetSection: 'certifications',
    };
  }

  if (text.includes('experience') || text.includes('background')) {
    return {
      reply: 'Opening Experience. You will see roles, outcomes, and impact across product and data work.',
      targetSection: 'experience',
    };
  }

  if (text.includes('about') || text.includes('who are you')) {
    return {
      reply: 'Opening About for a quick overview of profile and working style.',
      targetSection: 'about',
    };
  }

  return {
    reply: 'I can take you straight to Projects, Skills, Experience, Certifications, About, or Contact. Try asking: "Show projects".',
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'bot',
      text: 'Hi, I am Rishabh\'s portfolio assistant. Ask me about projects, skills, certifications, or contact details.',
    },
  ]);

  const listRef = useRef<HTMLDivElement>(null);

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

    const resolution = getBotReply(text);
    window.setTimeout(() => {
      if (resolution.targetSection) {
        const section = document.getElementById(resolution.targetSection);
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        role: 'bot',
        text: resolution.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 420);
  };

  const unreadCount = useMemo(() => (isOpen ? 0 : 1), [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[120]">
      {isOpen && (
        <div className="mb-3 w-[92vw] max-w-[380px] h-[70vh] max-h-[560px] rounded-2xl border border-white/10 bg-[#07101a]/95 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[linear-gradient(90deg,rgba(198,255,0,0.15),rgba(198,255,0,0.03))]">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-accent" />
              <p className="text-sm font-semibold tracking-[0.08em] text-white/95 uppercase">Portfolio Assistant</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1.5 text-white/75 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          <div ref={listRef} className="h-[calc(100%-126px)] overflow-y-auto px-3 py-3 space-y-2.5">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[86%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-accent text-black font-medium'
                      : 'bg-white/8 text-white/90 border border-white/10'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-3 py-2 text-[13px] text-white/75 border border-white/10 bg-white/8">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="px-3 pt-2 pb-3 border-t border-white/10 bg-[#060d16]">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] text-white/75 hover:text-accent hover:border-accent/45 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

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
                placeholder="Ask about work, skills, contact..."
                className="w-full rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent/50"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-accent p-2.5 text-black hover:brightness-105 transition"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative h-14 w-14 rounded-full bg-accent text-black shadow-[0_0_45px_rgba(198,255,0,0.35)] hover:scale-[1.04] transition-transform"
        aria-label="Open portfolio chat assistant"
      >
        <MessageCircle className="mx-auto" size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-white text-black text-[10px] font-bold grid place-items-center border border-black/20">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
