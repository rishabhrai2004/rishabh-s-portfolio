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
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-6 sm:right-6 z-[10001]">
      {isOpen && (
        <div className="mb-3 w-[92vw] max-w-[420px] h-[520px] md:h-[620px] rounded-2xl border border-white/10 bg-[#07101a]/95 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[linear-gradient(90deg,rgba(198,255,0,0.15),rgba(198,255,0,0.03)] shrink-0">
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

          <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 min-h-0">
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

          <div className="px-3 pt-2 pb-3 border-t border-white/10 bg-[#060d16] shrink-0 space-y-2.5">
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-white/12 bg-white/5 px-2 py-0.5 text-[10px] text-white/75 hover:text-accent hover:border-accent/45 transition-colors"
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
                placeholder="Ask..."
                className="w-full rounded-lg border border-white/12 bg-white/5 px-2.5 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent/50"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-accent p-2 text-black hover:brightness-105 transition"
                aria-label="Send message"
              >
                <Send size={16} />
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
