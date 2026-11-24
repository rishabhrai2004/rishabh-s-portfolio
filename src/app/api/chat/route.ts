import { NextRequest, NextResponse } from 'next/server';

const NVIDIA_API_URL = process.env.NVIDIA_API_URL || 'https://integrate.api.nvidia.com/v1/chat/completions';
const DEFAULT_MODEL = 'nvidia/nemotron-3.5-bolt-e4b';
const PROVIDER_TIMEOUT_MS = 2800;
const MAX_MESSAGE_LENGTH = 1000;
const RESPONSE_CACHE_TTL_MS = 10 * 60 * 1000;
const MAX_CACHED_RESPONSES = 100;
const GENERIC_FALLBACK_REPLY =
  'I can help with projects, skills, experience, education, certifications, and contact details. Try asking: summarize the case studies, the product toolkit, or how to get in touch.';

export const maxDuration = 4;

const responseCache = new Map<string, { reply: string; expiresAt: number }>();

function getModel() {
  const configuredModels = (process.env.NVIDIA_MODELS || '')
    .split(',')
    .map((model) => model.trim())
    .filter(Boolean);

  const preferredModel = (process.env.NVIDIA_MODEL || '').trim();
  return preferredModel || configuredModels[0] || DEFAULT_MODEL;
}

const systemPrompt = `You are Rishabh Rai's portfolio assistant. You represent a dedicated Product Manager focusing on Product Management, Product Sense, and Go-To-Market (GTM) Strategy. Here is the context:

Answer in a friendly, direct voice. Keep replies to 1-3 short sentences, usually under 70 words. Answer the question first. Use only these facts and do not invent details. If a fact is missing, say so and offer the closest relevant information.

ABOUT: Rishabh Rai is pursuing a B.Tech in Electronics and Computer Science at KIIT University (2023–2027). Product experience spans fintech, payment categorisation, KYC/KYB, discovery, research, analytics, GTM, and AI-enabled workflows.

EXPERIENCE:
- Fineye, Product Intern (Oct 2026–present): analysed 5 crore payment narrations across 67 banks; improved categorisation by 28%; worked with Engineering and QA on classification logic and validation.
- BeFiSc, Product Intern (Aug 2026–present): specified multi-provider API fallback, improving data accuracy by 23%; caching reduced API costs by 22%; wrote PRDs for a merchant-risk/KYB report combining GST, credit health, and ownership checks.
- MKTea, Data & Product Intern (May–Jun 2025): analysed 20,000+ records; recommendations improved operational efficiency by 30%; built Power BI dashboards.
- IOCL, Data Analytics Intern (Jun–Jul 2025): SQL/Python and Power BI reporting; improved accuracy by 25% and saved 15 hours weekly.
- KIIT E-Cell CMO: growth and A/B tests for a 10,000+ student ecosystem; 40% rise in event registrations. KIIT International MUN Deputy Director: operations for 1,500+ delegates.

PROJECTS:
- Swiggy vs Eternal: competitive teardown and Browse-Repeat framework; recommended surfacing District ticketing in Zomato using RICE, with success metrics and A/B test plan.
- MakeMyTrip AI Travel Feature Suite: four checkout features (eSIM, AI itinerary, crew tracking, SafeMode); eSIM model projects ₹816 Cr GMV at 15% attach rate; safety features target repeat bookings rising from 31% to 44%.

SKILLS: PRDs, roadmaps, user research, RICE, A/B testing, funnel/KPI analysis, GTM, SQL, Python/Pandas, Power BI, Amplitude, JIRA, Notion, LLM APIs.
CERTIFICATIONS: IBM AI Product Manager, Google Cloud Generative AI, Cisco Data Science, Udemy Data Analyst Bootcamp.
CONTACT: rishabhraittt@gmail.com; https://www.linkedin.com/in/rishabh-rai-961937280/.`;

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function localFallbackReply(input: string) {
  const text = input.toLowerCase();

  if (hasAny(text, ['befisc', 'kyc', 'kyb']) && hasAny(text, ['iocl', 'indian oil'])) {
    return 'At BeFiSc, API fallback improved verification accuracy by 23% and caching cut API costs by 22%. At IOCL, SQL/Python analysis and Power BI reporting improved accuracy by 25% and saved 15 hours of manual work each week.';
  }

  if (hasAny(text, ['toolkit', 'skill', 'tools', 'stack', 'technology', 'gtm'])) {
    return 'Rishabh’s toolkit combines product discovery, user research, PRDs, roadmaps, RICE prioritization, A/B testing, funnel analysis, KPI design, and GTM. For analytics and prototyping, he uses SQL, Python, Power BI, Amplitude, JIRA, Notion, and LLM APIs.';
  }

  if (hasAny(text, ['leadership', 'e-cell', 'mun', 'extracurricular'])) {
    return 'Rishabh is CMO at KIIT Entrepreneurship Cell, where growth strategy and A/B tests helped increase event registrations by 40% across a 10,000+ student ecosystem. He also served as Deputy Director for KIIT International MUN operations, supporting 1,500+ delegates.';
  }

  if (hasAny(text, ['fineye', 'payment narration', 'payment categor', 'bank narration'])) {
    return 'At Fineye, Rishabh analysed 5 crore payment narrations from 67 banks and helped improve transaction categorisation by 28%, working with Engineering and QA on classification logic and validation.';
  }

  if (hasAny(text, ['befisc', 'kyc', 'kyb', 'api fallback', 'api cost', 'caching'])) {
    return 'At BeFiSc, Rishabh worked on KYC/KYB products. A multi-provider API fallback improved data accuracy by 23%, while caching reduced API costs by 22%; he also wrote the PRD for a merchant-risk verification report.';
  }

  if (hasAny(text, ['swiggy', 'eternal', 'browse-repeat', 'district ticket'])) {
    return 'The Swiggy vs Eternal teardown introduced a Browse-Repeat framework to map product surfaces to user intent. It recommended bringing District ticketing into Zomato, prioritized with RICE and supported by success metrics and an A/B test plan.';
  }

  if (hasAny(text, ['makemytrip', 'make my trip', 'mmt', 'travel feature', '816'])) {
    return 'The MakeMyTrip case study proposes four checkout features: eSIM activation, an AI itinerary, crew tracking, and SafeMode for Women. The eSIM model projects ₹816 Cr GMV at a 15% attach rate; the safety feature targets repeat bookings rising from 31% to 44%.';
  }

  if (hasAny(text, ['strategy', 'priorit', 'approach', 'impact', 'outcome'])) {
    return 'Rishabh starts with user needs and funnel evidence, then defines measurable outcomes, prioritizes with RICE, and validates through experiments. Examples include a 28% lift in payment categorisation at Fineye and 23% higher verification accuracy at BeFiSc.';
  }

  if (hasAny(text, ['project', 'portfolio', 'work', 'case stud'])) {
    return 'Featured case studies are the Swiggy vs Eternal product teardown and MakeMyTrip AI Travel Feature Suite. The first uses a Browse-Repeat framework and RICE prioritization; the second defines four checkout features and models eSIM revenue at ₹816 Cr GMV. Ask about either for details.';
  }

  if (hasAny(text, ['experience', 'intern', 'role', 'background'])) {
    return 'Rishabh has product internships at Fineye and BeFiSc, plus earlier analytics/product roles at MKTea and IOCL. Outcomes include 28% better payment categorisation, 23% higher verification accuracy, 22% lower API costs, and 30% operational efficiency gains.';
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

  return GENERIC_FALLBACK_REPLY;
}

async function requestNvidiaChat(apiKey: string, userMessage: string) {
  const configuredModel = getModel();
  const models =
    configuredModel === DEFAULT_MODEL
      ? [DEFAULT_MODEL]
      : [configuredModel, DEFAULT_MODEL];
  const deadline = Date.now() + PROVIDER_TIMEOUT_MS;

  for (const model of models) {
    const remainingMs = deadline - Date.now();
    if (remainingMs <= 0) {
      return { reply: null, model, error: `Provider timed out after ${PROVIDER_TIMEOUT_MS}ms` };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), remainingMs);

    try {
      const response = await fetch(NVIDIA_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          temperature: 0.2,
          top_p: 0.85,
          max_tokens: 220,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        if (response.status === 404 && model !== DEFAULT_MODEL) continue;
        return { reply: null, model, error: `Provider returned HTTP ${response.status}` };
      }

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text;

      if (typeof text === 'string' && text.trim().length > 0) {
        return { reply: text.trim(), model, error: null };
      }

      return { reply: null, model, error: 'Provider returned an empty response' };
    } catch (error) {
      const reason =
        error instanceof Error && error.name === 'AbortError'
          ? `Provider timed out after ${PROVIDER_TIMEOUT_MS}ms`
          : 'Provider request failed';
      return { reply: null, model, error: reason };
    } finally {
      clearTimeout(timeout);
    }
  }

  return { reply: null, model: DEFAULT_MODEL, error: 'No inference model available' };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== 'object' ||
    !('message' in body) ||
    typeof body.message !== 'string' ||
    !body.message.trim()
  ) {
    return NextResponse.json({ error: 'A non-empty message is required' }, { status: 400 });
  }

  const message = body.message.trim();
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` },
      { status: 413 }
    );
  }

  const cacheKey = message.toLowerCase().replace(/\s+/g, ' ');
  const cached = responseCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json({ reply: cached.reply, source: 'cache' });
  }
  if (cached) responseCache.delete(cacheKey);

  const cacheReply = (reply: string) => {
    if (responseCache.size >= MAX_CACHED_RESPONSES) {
      const oldestKey = responseCache.keys().next().value;
      if (oldestKey) responseCache.delete(oldestKey);
    }
    responseCache.set(cacheKey, {
      reply,
      expiresAt: Date.now() + RESPONSE_CACHE_TTL_MS,
    });
  };

  const instantReply = localFallbackReply(message);
  if (instantReply !== GENERIC_FALLBACK_REPLY) {
    cacheReply(instantReply);
    return NextResponse.json({ reply: instantReply, source: 'local-knowledge' });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    cacheReply(instantReply);
    return NextResponse.json({ reply: instantReply, source: 'local-fallback' });
  }

  const providerResult = await requestNvidiaChat(apiKey, message);
  if (!providerResult.reply) {
    console.error('NVIDIA provider failed. Returning a local answer:', providerResult.error);
    cacheReply(instantReply);
    return NextResponse.json({ reply: instantReply, source: 'local-fallback' });
  }

  cacheReply(providerResult.reply);
  return NextResponse.json({
    reply: providerResult.reply,
    source: 'nvidia',
    model: providerResult.model,
  });
}
