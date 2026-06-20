import { NextRequest, NextResponse } from 'next/server';

const NVIDIA_API_URL = process.env.NVIDIA_API_URL || 'https://integrate.api.nvidia.com/v1/chat/completions';
const DEFAULT_MODELS = 'meta/llama-3.3-70b-instruct,meta/llama-3.1-70b-instruct,mistralai/mixtral-8x7b-instruct-v0.1,meta/llama-3.1-8b-instruct';

function getCandidateModels() {
  const configuredModels = (process.env.NVIDIA_MODELS || '')
    .split(',')
    .map((model) => model.trim())
    .filter(Boolean);

  const preferredModel = (process.env.NVIDIA_MODEL || '').trim();

  const defaultModels = DEFAULT_MODELS.split(',')
    .map((model) => model.trim())
    .filter(Boolean);

  return Array.from(new Set([...configuredModels, preferredModel, ...defaultModels].filter(Boolean)));
}

const systemPrompt = `You are Rishabh Rai's portfolio assistant. You represent an aspiring Product Manager with strong analytics and AI-product depth. Here's the context:

**About Rishabh:**
Rishabh Rai is a Product Management candidate at Kalinga Institute of Industrial Technology (KIIT University), pursuing a B.Tech in Electronics & Computer Science (2023–2027). He has experience across product discovery, user research, and analytics-led decision making through internships and AI product projects, and has built and validated AI-enabled workflows using LLM APIs and rapid prototyping tools. He's focused on building technology products with measurable user and business impact.

**Projects (case studies):**
1. Swiggy vs Eternal — Product Strategy Teardown: Competitive analysis and user research on both apps' architecture; built a product framework mapping each vertical to the right surface by usage frequency and funnel behaviour. Recommended a RICE-prioritized roadmap to thread ticketing into the core app, with success metrics and an A/B testing plan to recover conversion at the point of highest intent.
2. MakeMyTrip — AI Travel Feature Suite: Problem discovery and PRD specs for a 4-feature suite in MMT's checkout flow (eSIM Activation, AI Itinerary Engine, Crew Live Tracking, SafeMode for Women), with user flows, wireframes, and a phased V1/V2 roadmap. Market-sizing and business-impact models projected ₹816 Cr GMV for eSIM, 4.1x session uplift, and 74% women rebook loyalty improvement.
3. Craft Tea — AI-Assisted Premium Consumer Commerce Brand: Defined product vision, GTM strategy, and pricing architecture (₹299–₹4,999); rapidly prototyped and iterated using Claude Code and OpenAI Codex based on user testing and structured experimentation.

**Experience:**
- Indian Oil Corporation (IOCL), Data Analytics Intern (Digboi Refinery, Assam; Jun–Jul 2025): Analysed operational datasets with SQL and Python (Pandas) to support 3 internal analytics tools, improving reporting accuracy by 25% and reducing manual effort by 15 hours/week; built Power BI KPI dashboards and supported UAT, sprint planning, and product reviews.
- MKTea, Data & Product Intern (Doomdooma, Assam, B2B Tea FMCG; May–Jun 2025): Analysed 20,000+ entries to identify bottlenecks informing product requirements, driving 30% operational efficiency gains; built KPI/OKR dashboards and ran competitive analysis to prioritise backlog across 4 departments.
- KIIT Entrepreneurship Cell, Chief Marketing Officer (2024–Present): Lead growth and startup mentorship for a 10,000+ student ecosystem, mentoring 25+ startups and driving a 40% rise in event registrations across 12+ annual events via A/B-tested campaigns.
- KIIT International MUN, Deputy Director — Operations & Strategy (2024–2025): Directed operations for one of Asia's largest MUN conferences, coordinating 200+ volunteers across 8 teams for 1,500+ delegates over 3 days.

**Certifications:**
- IBM AI Product Manager (IBM)
- Introduction to Generative AI (Google Cloud)
- Data Science (Cisco Networking Academy)
- Data Analyst Bootcamp (Udemy)

**Skills:**
- Product: Product Roadmap, PRDs, User Stories, User Research, Feature Prioritization (RICE), A/B Testing, Funnel Analysis, KPI Design, GTM Strategy, Agile, Scrum, UAT
- Analytics & AI: SQL, Python (Pandas), Power BI, Amplitude, Competitive Analysis, JIRA, Notion, LLM APIs, Generative AI, Lovable, Claude Code

**Contact:**
Email: rishabhraittt@gmail.com | LinkedIn: https://www.linkedin.com/in/rishabh-rai-961937280/

When users ask about Rishabh's work, experience, projects, skills, education, or certifications, give detailed, contextual answers grounded in this information. Be conversational, professional, and concise. If asked how to contact him, share his email and LinkedIn.`;

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function localFallbackReply(input: string) {
  const text = input.toLowerCase();

  if (hasAny(text, ['project', 'portfolio', 'work', 'case stud'])) {
    return 'Selected case studies: Swiggy vs Eternal (product strategy teardown with RICE-prioritized roadmap and A/B test plan), MakeMyTrip AI Travel Feature Suite (PRD specs + market-sizing projecting ₹816 Cr GMV for eSIM), and Craft Tea (product vision, GTM, and pricing architecture, prototyped with Claude Code). Ask about any one and I can break down the problem, approach, and outcomes.';
  }

  if (hasAny(text, ['skill', 'tools', 'stack', 'technology'])) {
    return 'Product: roadmaps, PRDs, user research, RICE prioritization, A/B testing, funnel analysis, KPI design, GTM. Analytics & AI: SQL, Python (Pandas), Power BI, Amplitude, JIRA, Notion, LLM APIs, Generative AI, plus rapid prototyping with Lovable and Claude Code.';
  }

  if (hasAny(text, ['experience', 'intern', 'role', 'background'])) {
    return 'Experience: Indian Oil Corporation (Data Analytics Intern — 25% better reporting accuracy, 15 hrs/week saved), MKTea (Data & Product Intern across 20,000+ entries, 30% efficiency gains), KIIT E-Cell (Chief Marketing Officer for a 10,000+ student ecosystem, 40% rise in registrations), and KIIT International MUN (Deputy Director, Operations & Strategy for 1,500+ delegates).';
  }

  if (hasAny(text, ['education', 'college', 'university', 'degree', 'kiit', 'study'])) {
    return 'Rishabh is pursuing a B.Tech in Electronics & Computer Science at KIIT University (2023–2027) as a Product Management candidate.';
  }

  if (hasAny(text, ['cert', 'certificate'])) {
    return 'Certifications: IBM AI Product Manager, Google Cloud Introduction to Generative AI, Cisco Data Science, and a Udemy Data Analyst Bootcamp.';
  }

  if (hasAny(text, ['contact', 'linkedin', 'hire', 'reach', 'email', 'mail'])) {
    return 'Reach Rishabh by email at rishabhraittt@gmail.com or on LinkedIn: https://www.linkedin.com/in/rishabh-rai-961937280/';
  }

  return 'I can help with projects, skills, experience, education, certifications, and contact details. Try asking: summarize the case studies, the product toolkit, or how to get in touch.';
}

async function requestNvidiaChat(apiKey: string, userMessage: string) {
  const models = getCandidateModels();
  let lastError = 'Unknown provider error';

  for (const model of models) {
    try {
      const response = await fetch(NVIDIA_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          temperature: 0.3,
          top_p: 0.9,
          max_tokens: 700,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        lastError = `Model ${model}: ${errorText}`;
        continue;
      }

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text;

      if (typeof text === 'string' && text.trim().length > 0) {
        return { reply: text.trim(), model, error: null };
      }

      lastError = `Model ${model}: Empty response payload`;
    } catch (error) {
      lastError = `Model ${model}: ${String(error)}`;
    }
  }

  return { reply: null, model: null, error: lastError };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NVIDIA_API_KEY || process.env.GOOGLE_GENERATIVE_AI_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: localFallbackReply(message),
        source: 'local-fallback',
      });
    }

    const providerResult = await requestNvidiaChat(apiKey, message);

    if (!providerResult.reply) {
      console.error('NVIDIA provider failed. Falling back locally:', providerResult.error);
      return NextResponse.json({
        reply: localFallbackReply(message),
        source: 'local-fallback',
      });
    }

    return NextResponse.json({
      reply: providerResult.reply,
      source: 'nvidia',
      model: providerResult.model,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      reply: localFallbackReply(''),
      source: 'local-fallback',
    });
  }
}
