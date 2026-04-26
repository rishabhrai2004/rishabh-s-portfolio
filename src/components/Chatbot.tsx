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
};

const quickPrompts = [
  'Top projects summary',
  'What tools are used?',
  'Show experience highlights',
  'How to contact?',
];

const projectFacts = [
  {
    title: 'Retail Product Analytics',
    summary: 'Built an end-to-end retail analytics framework using Azure SQL and Power BI to track pricing strategy impact, margin trends, and product KPIs.',
    tools: ['Azure SQL', 'Power BI', 'DAX', 'Product KPIs'],
  },
  {
    title: 'Agri-Yield Prediction Hub',
    summary: 'Created an analytics pipeline using Snowflake and AWS S3 for geospatial productivity metrics and yield forecasting for product decisions.',
    tools: ['AWS S3', 'Snowflake', 'SQL', 'Predictive Analytics'],
  },
  {
    title: 'CareerOS - AI Product Intelligence',
    summary: 'Designed a product-led career platform using LLM APIs to forecast market demand, identify skill gaps, and generate growth pathways.',
    tools: ['LLM APIs', 'Product Strategy', 'User Metrics', 'Full Stack'],
  },
  {
    title: 'AI Startup Idea Validator',
    summary: 'Built a product validation engine for market sizing, competitor benchmarking, and PMF analysis to support founder go/no-go decisions.',
    tools: ['LLMs', 'Market Analysis', 'PMF Framework', 'Data Pipelines'],
  },
  {
    title: 'Craft Tea - Premium D2C Commerce',
    summary: 'Led brand positioning, pricing architecture, and conversion UX with an INR 299-INR 4,999 pricing funnel and trust-first commerce journey.',
    tools: ['Brand Positioning', 'Pricing Strategy', 'Conversion UX', 'D2C Commerce'],
  },
];

const experienceFacts = [
  'Indian Oil Corporation: Product & Data Analytics Intern focused on refinery bottlenecks, SQL/Python analysis, and Power BI KPI dashboards.',
  'MKTEA: HR Analytics Intern working on 20,000+ employee data to identify recruitment and retention patterns.',
  'KIIT Entrepreneurship Cell: Director - Growth & Analytics, scaled participation by 35% using data-driven campaigns and A/B-tested outreach.',
  'KIIT International Model United Nations: Deputy Director for large-scale operations and cross-functional process metrics.',
];

const certificationFacts = [
  'Cisco Data Science',
  'Google Generative AI',
  'Product & Data Analytics',
];

const skillFacts = [
  'Product and strategy: strategic research, market intelligence, project management, stakeholder communication.',
  'Founder office execution: executive reporting, cross-functional alignment, decision support, strategic planning.',
  'Data analysis: Python (Pandas), SQL, Excel, data modeling.',
  'Dashboards and storytelling: Power BI, dashboard development, presentation design, business narratives.',
  'Metrics and reporting: KPI design, operating metrics, performance reviews, executive reporting.',
];

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function getBotReply(input: string): BotResolution {
  const text = input.toLowerCase();

  if (hasAny(text, ['project', 'work', 'portfolio', 'case study'])) {
    const shortlist = projectFacts
      .slice(0, 3)
      .map((p, idx) => `${idx + 1}. ${p.title}: ${p.summary}`)
      .join(' ');

    return {
      reply: `Top project highlights: ${shortlist} If you want, ask for "all projects" and I will list every one.`,
    };
  }

  if (hasAny(text, ['all projects', 'every project', 'full project list'])) {
    const allProjects = projectFacts
      .map((p, idx) => `${idx + 1}. ${p.title}`)
      .join(' | ');
    return {
      reply: `Full project list: ${allProjects}. Ask any title and I will break it down by problem, approach, and outcome.`,
    };
  }

  if (hasAny(text, ['tools', 'tech stack', 'stack', 'technology'])) {
    const toolSet = Array.from(new Set(projectFacts.flatMap((p) => p.tools))).join(', ');
    return {
      reply: `Main tools used across projects: ${toolSet}. Core analysis stack is SQL + Python + Power BI.`,
    };
  }

  if (hasAny(text, ['skill', 'competency', 'strength'])) {
    return {
      reply: `Core competencies: ${skillFacts.join(' ')}`,
    };
  }

  if (hasAny(text, ['experience', 'background', 'internship', 'role'])) {
    return {
      reply: `Experience highlights: ${experienceFacts.join(' ')}`,
    };
  }

  if (hasAny(text, ['cert', 'certificate'])) {
    return {
      reply: `Certifications: ${certificationFacts.join(', ')}.`,
    };
  }

  if (hasAny(text, ['contact', 'email', 'hire', 'reach', 'linkedin', 'github'])) {
    return {
      reply: 'Best contact path is LinkedIn from the Contact section. GitHub is also available there for project proof. If you want, I can draft a concise outreach message.',
    };
  }

  if (hasAny(text, ['about', 'who are you', 'profile'])) {
    return {
      reply: 'Rishabh Rai works at the intersection of product strategy and data analytics, turning ambiguous product questions into measurable experiments, KPIs, dashboards, and roadmap-ready insights.',
    };
  }

  return {
    reply: 'Ask me something specific, for example: "Top projects summary", "What tools are used?", "Show experience highlights", or "How to contact?"',
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

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
  const isEmpty = messages.length === 0;

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-6 sm:right-6 z-[10001]">
      {isOpen && (
        <div className="mb-3 w-[92vw] max-w-[500px] h-[600px] md:h-[700px] rounded-3xl border border-white/8 bg-gradient-to-b from-[#0a0e18] to-[#070a14] backdrop-blur-2xl shadow-[0_25px_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <p className="text-sm font-semibold text-white/90">Rishabh's Assistant</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-white/50 hover:text-white/90 hover:bg-white/5 transition-all"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages or Welcome Screen */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-4 min-h-0">
            {isEmpty ? (
              // Welcome Screen (Gemini-style)
              <div className="flex flex-col items-center justify-center h-full pb-8">
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg">
                    <Sparkles size={28} className="text-black" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white/95 mb-2 text-center">Hi, I'm Rishabh's AI</h2>
                <p className="text-white/50 text-sm text-center mb-8 max-w-xs">
                  Ask me about his projects, skills, experience, or how to get in touch
                </p>
                
                <div className="grid grid-cols-2 gap-3 w-full">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="p-3 rounded-xl text-left text-xs text-white/70 bg-gradient-to-br from-white/8 to-white/3 border border-white/10 hover:border-accent/40 hover:text-accent hover:bg-white/12 transition-all group"
                    >
                      <div className="font-medium group-hover:translate-x-0.5 transition-transform">{prompt}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Messages
              <>
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-accent text-black font-medium rounded-br-none'
                          : 'bg-white/8 text-white/90 border border-white/10 rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/8 text-white/75 border border-white/10 rounded-2xl rounded-bl-none px-4 py-2.5 text-sm">
                      <div className="flex gap-1.5 items-center">
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input Footer */}
          <div className="px-5 py-4 border-t border-white/5 bg-gradient-to-t from-[#070a14] to-transparent shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-end gap-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent/50 focus:bg-white/8 transition-all resize-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="shrink-0 rounded-full bg-accent p-2.5 text-black hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative h-14 w-14 rounded-full bg-gradient-to-br from-accent to-accent/80 text-black shadow-[0_0_50px_rgba(198,255,0,0.4)] hover:scale-[1.06] hover:shadow-[0_0_60px_rgba(198,255,0,0.5)] transition-all"
        aria-label="Open portfolio chat assistant"
      >
        <MessageCircle className="mx-auto" size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-white text-black text-[10px] font-bold grid place-items-center border border-black/30 shadow-lg">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
