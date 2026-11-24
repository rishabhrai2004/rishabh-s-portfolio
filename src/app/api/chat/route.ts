import { NextRequest, NextResponse } from 'next/server';

const NVIDIA_API_URL = process.env.NVIDIA_API_URL || 'https://integrate.api.nvidia.com/v1/chat/completions';
const DEFAULT_MODEL = 'nvidia/nemotron-3.5-bolt-e4b';
const PROVIDER_TIMEOUT_MS = 2800;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_LENGTH = 10;

export const maxDuration = 5;

type ChatTurn = {
  role: 'user' | 'assistant';
  content: string;
};

function getModel() {
  const configuredModels = (process.env.NVIDIA_MODELS || '')
    .split(',')
    .map((model) => model.trim())
    .filter(Boolean);

  const preferredModel = (process.env.NVIDIA_MODEL || '').trim();
  return preferredModel || configuredModels[0] || DEFAULT_MODEL;
}

const systemPrompt = `You are Rishabh Rai's portfolio assistant. You represent a dedicated Product Manager focusing on Product Management, Product Sense, and Go-To-Market (GTM) Strategy. Here is the context:

Answer every message conversationally, including greetings and follow-up questions. Keep replies to 1-3 short sentences, usually under 70 words. Answer the question first. Use only the portfolio facts for claims about Rishabh; do not invent them. For unrelated questions, answer briefly using general knowledge. If unsure, say so plainly instead of making up an answer.

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

async function requestNvidiaChat(apiKey: string, conversation: ChatTurn[]) {
  const configuredModel = getModel();
  const models =
    configuredModel === DEFAULT_MODEL
      ? [DEFAULT_MODEL]
      : [configuredModel, DEFAULT_MODEL];
  const deadline = Date.now() + PROVIDER_TIMEOUT_MS;

  for (const model of models) {
    const remainingMs = deadline - Date.now();
    if (remainingMs <= 0) {
      return { reply: null, model, failure: 'timeout' as const };
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
          messages: [{ role: 'system', content: systemPrompt }, ...conversation],
        }),
      });

      if (!response.ok) {
        if ([404, 410].includes(response.status) && model !== DEFAULT_MODEL) continue;
        if ([401, 403].includes(response.status)) {
          return { reply: null, model, failure: 'credentials' as const };
        }
        if ([404, 410].includes(response.status)) {
          return { reply: null, model, failure: 'model' as const };
        }
        return { reply: null, model, failure: 'provider' as const, status: response.status };
      }

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text;

      if (typeof text === 'string' && text.trim().length > 0) {
        return { reply: text.trim(), model, failure: null };
      }

      return { reply: null, model, failure: 'empty' as const };
    } catch (error) {
      const failure =
        error instanceof Error && error.name === 'AbortError'
          ? 'timeout'
          : 'provider';
      return { reply: null, model, failure } as const;
    } finally {
      clearTimeout(timeout);
    }
  }

  return { reply: null, model: DEFAULT_MODEL, failure: 'model' as const };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || !('message' in body)) {
    return NextResponse.json({ error: 'A non-empty message is required' }, { status: 400 });
  }

  const rawMessage = body.message;
  if (typeof rawMessage !== 'string' || !rawMessage.trim()) {
    return NextResponse.json({ error: 'A non-empty message is required' }, { status: 400 });
  }

  const message = rawMessage.trim();
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` },
      { status: 413 }
    );
  }

  const rawHistory = 'history' in body ? body.history : [];
  if (!Array.isArray(rawHistory) || rawHistory.length > MAX_HISTORY_LENGTH) {
    return NextResponse.json(
      { error: `Conversation history must contain at most ${MAX_HISTORY_LENGTH} turns` },
      { status: 400 }
    );
  }

  const history: ChatTurn[] = [];
  for (const turn of rawHistory) {
    if (
      !turn ||
      typeof turn !== 'object' ||
      !('role' in turn) ||
      !('content' in turn) ||
      (turn.role !== 'user' && turn.role !== 'assistant') ||
      typeof turn.content !== 'string' ||
      !turn.content.trim() ||
      turn.content.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json(
        { error: 'Conversation history contains an invalid turn' },
        { status: 400 }
      );
    }

    history.push({ role: turn.role, content: turn.content.trim() });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Live AI is not configured. Add NVIDIA_API_KEY to the server environment.' },
      { status: 503 }
    );
  }

  const providerResult = await requestNvidiaChat(apiKey, [
    ...history,
    { role: 'user', content: message },
  ]);
  if (!providerResult.reply) {
    console.error('Live AI request failed', {
      model: providerResult.model,
      failure: providerResult.failure,
      status: 'status' in providerResult ? providerResult.status : undefined,
    });

    if (providerResult.failure === 'credentials') {
      return NextResponse.json(
        { error: 'NVIDIA rejected the API key or model access. Check NVIDIA_API_KEY and set NVIDIA_MODEL to a model enabled for your account.' },
        { status: 503 }
      );
    }
    if (providerResult.failure === 'model') {
      return NextResponse.json(
        { error: 'The configured live AI model is unavailable. Set NVIDIA_MODEL to a model enabled for your API account.' },
        { status: 503 }
      );
    }
    if (providerResult.failure === 'timeout') {
      return NextResponse.json(
        { error: 'The live AI took too long to respond. Please try again.' },
        { status: 504 }
      );
    }
    if (providerResult.failure === 'empty') {
      return NextResponse.json(
        { error: 'The live AI returned an empty response. Please try again.' },
        { status: 502 }
      );
    }
    return NextResponse.json(
      { error: 'The live AI provider is temporarily unavailable. Please try again.' },
      { status: 502 }
    );
  }

  return NextResponse.json({
    reply: providerResult.reply,
    model: providerResult.model,
  });
}
