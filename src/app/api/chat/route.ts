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

const systemPrompt = `You are Rishabh Rai's portfolio assistant. You represent a dedicated Product Manager focusing on Product Management, Product Sense, and Go-To-Market (GTM) Strategy. Here is the context:

**About Rishabh:**
Rishabh Rai is a product management candidate pursuing a B.Tech in Electronics and Computer Science (2023–2027) at Kalinga Institute of Industrial Technology (KIIT University). He works on payment categorisation at Fineye and KYC/KYB verification at BeFiSc, with experience in product discovery, user research, GTM, and analytics-led decision making. He builds AI-enabled workflows using LLM APIs.

**Work Experience:**
1. Fineye | Product Intern (October 2026 – Present)
   Financial Data Intelligence Platform – Payment Categorisation & Bank Statement Analysis
   - Analysed bank narration patterns across 5 crore payment narrations from 67 banks and mapped transaction categories and subcategories, improving transaction categorisation by 28%.
   - Conducted product benchmarking, competitor analysis, and gap analysis to identify classification mismatches and improvement opportunities in banking data processing and financial insights.
   - Collaborated with Engineering and QA on categorisation logic, validation, testing, and refinement of transaction classification.

2. BeFiSc | Product Intern (August 2026 – Present, Noida, India)
   Fintech & RegTech, KYC/KYB Verification
   - Defined business logic and product requirements for a multi-provider API fallback system, collaborating with engineering to route requests during low-confidence scenarios, improving data accuracy by 23%.
   - Identified vendor cost inefficiencies and prioritised an API optimisation initiative, partnering with engineering to implement caching strategies that reduced API costs by 22% without impacting data freshness.
   - Led the 0-to-1 product lifecycle, including PRD development, for a merchant risk and KYB verification report, consolidating GST, credit health, and cross-entity ownership checks into a single automated underwriting flow.

3. MKTea | Data & Product Intern (May 2025 – June 2025, Doomdooma, Assam, India – B2B Tea FMCG)
   - Analysed 20,000+ operational entries to identify process bottlenecks, informed product requirement recommendations that drove 30% operational efficiency gains, and built Power BI KPI/OKR dashboards for leadership across 4 departments.

4. Indian Oil Corporation Limited (IOCL) | Data Analytics Intern (June 2025 – July 2025, Digboi Refinery, Assam, India)
   - Queried and cleaned operational datasets with SQL and Python (Pandas) and built Power BI KPI dashboards for 3 internal reporting tools, improving reporting accuracy by 25% and reducing manual effort by 15 hours weekly.

**Leadership & Extracurricular:**
- KIIT Entrepreneurship Cell | Chief Marketing Officer (2024 – Present): Lead growth strategy and A/B tests for a 10,000+ student ecosystem, mentoring 25+ startups and driving a 40% rise in event registrations.
- KIIT International MUN | Deputy Director – Operations & Strategy (2024 – 2025): Directed operations for one of Asia's largest MUN conferences: 200+ volunteers, 8 teams, 1,500+ delegates.

**Projects:**
1. Swiggy vs Eternal – Product Strategy Teardown:
   Conducted competitive analysis and user research on Swiggy and Eternal’s app architecture, building the Browse-Repeat framework to map each vertical to the right surface by usage frequency and funnel behaviour. Recommended threading District ticketing into Zomato’s 100M+ user base using RICE prioritisation, projecting District user growth at low CAC by removing the install wall at peak intent, with success metrics and an A/B testing plan.
2. MakeMyTrip – AI Travel Feature Suite:
   Wrote PRD specs, user flows, wireframes, and a phased V1/V2 roadmap for a 4-feature suite inside MMT’s checkout flow: eSIM Activation, AI Itinerary Engine, Crew Live Tracking, and SafeMode for Women. Modelled revenue growth from existing customers at zero acquisition cost: eSIM cross-sell projecting Rs 816 Cr GMV at a 15% attach rate, and women’s safety features lifting repeat bookings from 31% to 44%.

**Technical Skills:**
- Product: Product Lifecycle Management, Stakeholder Management, PRD Development, User Stories, Product Roadmap, User Research, Feature Prioritization, A/B Testing, Funnel Analysis, KPI Design, GTM Strategy, Agile, Scrum, UAT, API Integration, Customer Retention, CAC Optimisation, Revenue Growth
- Analytics & AI: Product Analytics, SQL, Python (Pandas), Power BI, Amplitude, Competitive Analysis, Gap Analysis, Payment Categorisation, JIRA, Notion, LLM APIs, Generative AI, Lovable, Claude Code

**Certifications:**
- IBM AI Product Manager Certificate – IBM
- Google Introduction to Generative AI – Google Cloud
- Cisco Data Science Certificate – Cisco Networking Academy
- Data Analyst Bootcamp – Udemy

**Contact:**
Email: rishabhraittt@gmail.com | LinkedIn: https://www.linkedin.com/in/rishabh-rai-961937280/`;

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function localFallbackReply(input: string) {
  const text = input.toLowerCase();

  if (hasAny(text, ['project', 'portfolio', 'work', 'case stud'])) {
    return 'Case studies: Swiggy vs Eternal (product strategy teardown with RICE-prioritized roadmap and A/B test plan), MakeMyTrip AI Travel Feature Suite (PRD specs + market-sizing projecting ₹816 Cr GMV for eSIM), and Craft Tea (product vision, GTM, and pricing architecture, prototyped with Claude Code). Plus product & AI builds: AI Startup Idea Validator, Retail Product Analytics (Azure SQL + Power BI), and Agri-Yield Prediction Hub (Snowflake + AWS S3). Ask about any one and I can break down the problem, approach, and outcomes.';
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
