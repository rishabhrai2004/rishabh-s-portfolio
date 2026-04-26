import { NextRequest, NextResponse } from 'next/server';

const NVIDIA_API_URL = process.env.NVIDIA_API_URL || 'https://integrate.api.nvidia.com/v1/chat/completions';
const DEFAULT_MODELS = 'NVIDIABuild-Autogen-82,meta/llama-3.1-70b-instruct,mistralai/mixtral-8x7b-instruct-v0.1';

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

const systemPrompt = `You are Rishabh Rai's portfolio assistant. You represent a product-focused data analyst and strategist. Here's the context:

**About Rishabh:**
Rishabh Rai works at the intersection of product strategy and data analytics, turning ambiguous product questions into measurable experiments, KPIs, dashboards, and roadmap-ready insights.

**Projects:**
1. Retail Product Analytics - Built an end-to-end retail analytics framework using Azure SQL and Power BI to track pricing strategy impact, margin trends, and product KPIs.
2. Agri-Yield Prediction Hub - Created an analytics pipeline using Snowflake and AWS S3 for geospatial productivity metrics and yield forecasting for product decisions.
3. CareerOS - AI Product Intelligence - Designed a product-led career platform using LLM APIs to forecast market demand, identify skill gaps, and generate growth pathways.
4. AI Startup Idea Validator - Built a product validation engine for market sizing, competitor benchmarking, and PMF analysis to support founder go/no-go decisions.
5. Craft Tea - Premium D2C Commerce - Led brand positioning, pricing architecture, and conversion UX with an INR 299-INR 4,999 pricing funnel and trust-first commerce journey.

**Experience:**
- Indian Oil Corporation: Product & Data Analytics Intern focused on refinery bottlenecks, SQL/Python analysis, and Power BI KPI dashboards.
- MKTEA: HR Analytics Intern working on 20,000+ employee data to identify recruitment and retention patterns.
- KIIT Entrepreneurship Cell: Director - Growth & Analytics, scaled participation by 35% using data-driven campaigns and A/B-tested outreach.
- KIIT International Model United Nations: Deputy Director for large-scale operations and cross-functional process metrics.

**Certifications:**
- Cisco Data Science
- Google Generative AI
- Product & Data Analytics

**Skills:**
- Product & Strategy: strategic research, market intelligence, project management, stakeholder communication
- Founder Office Execution: executive reporting, cross-functional alignment, decision support, strategic planning
- Data Analysis: Python (Pandas), SQL, Excel, data modeling
- Dashboards & Storytelling: Power BI, dashboard development, presentation design, business narratives
- Metrics & Reporting: KPI design, operating metrics, performance reviews, executive reporting

**Contact:**
LinkedIn: https://www.linkedin.com/in/rishabh-rai-961937280/

When users ask about Rishabh's work, experience, projects, skills, or certifications, provide detailed, contextual answers based on this information. Be conversational, professional, and concise. If asked about how to contact, direct them to LinkedIn.`;

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function localFallbackReply(input: string) {
  const text = input.toLowerCase();

  if (hasAny(text, ['project', 'portfolio', 'work'])) {
    return 'Top projects include Retail Product Analytics (Azure SQL + Power BI), Agri-Yield Prediction Hub (Snowflake + AWS S3), CareerOS AI Product Intelligence, AI Startup Idea Validator, and Craft Tea D2C Commerce. Ask for any one project and I can summarize problem, approach, and outcomes.';
  }

  if (hasAny(text, ['skill', 'tools', 'stack', 'technology'])) {
    return 'Core stack and capabilities: SQL, Python (Pandas), Excel, Power BI, KPI design, dashboard storytelling, product strategy, market intelligence, and cross-functional execution.';
  }

  if (hasAny(text, ['experience', 'intern', 'role', 'background'])) {
    return 'Experience highlights: Indian Oil Corporation (Product & Data Analytics), MKTEA (HR Analytics on 20,000+ records), KIIT E-Cell (Growth & Analytics leadership), and KIIT International MUN (operations and process metrics).';
  }

  if (hasAny(text, ['cert', 'certificate'])) {
    return 'Certifications include Cisco Data Science, Google Generative AI, and Product & Data Analytics.';
  }

  if (hasAny(text, ['contact', 'linkedin', 'hire', 'reach'])) {
    return 'You can connect directly on LinkedIn: https://www.linkedin.com/in/rishabh-rai-961937280/';
  }

  return 'I can help with projects, skills, experience, certifications, and contact details. Try asking: Top projects summary, tech stack, or how to contact.';
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
