---
description: Generates compelling LinkedIn "About" sections based on skills, CV, and market data. Optimized for recruiter engagement with ready-to-paste output automatically copied to clipboard.
allowed-tools: Read, WebFetch, Bash
---

# Generate LinkedIn "About" Section

This command analyzes your skills from my-skills.md, experience from your CV, and current job market trends to generate compelling, recruiter-friendly LinkedIn "About" sections that showcase your expertise, achievements, and unique value proposition.

## Market-Driven Skill Tier System

Based on analysis of 31+ frontend job listings, skills are ranked by market demand:

### Tier 1 - Critical Skills (60%+ of jobs require)
**Foundation for credibility:**
- React (100%)
- JavaScript (90%)
- TypeScript (87%)
- HTML (68%)
- CSS (68%)

### Tier 2 - High Value Skills (40-60% of jobs)
**Strong differentiators:**
- Next.js (48%)
- Jest (45%)
- Git (45%)
- REST APIs (42%)

### Tier 3 - Differentiators (15-40% of jobs)
**Valuable specializations:**
- React Testing Library (35%)
- Tailwind CSS (32%)
- Redux (29%)
- Cypress (26%)
- CI/CD (26%)

### Tier 4 - Emerging/Premium Skills (<15% but high-value)
**Career accelerators:**
- Design Systems (23%)
- Accessibility/WCAG (19%)
- AI/LLM Integration (6% but rapidly growing)
- Microfrontends (3%)
- React Native (13%)

## Instructions

### Phase 1: Data Collection

**Step 1: Read my-skills.md (PRIMARY SOURCE)**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/personal/my-skills.md`
- Extract ALL technical skills from all sections
- Organize skills by tier based on market data
- This is the authoritative source for technical capabilities

**Step 2: Read CV (CONTEXT + ACHIEVEMENTS)**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/personal/cv.pdf`
- Extract:
  - Total years of experience
  - Seniority level (Junior/Mid/Senior/Staff/Principal/Lead)
  - Key achievements with quantifiable impact
  - Domain expertise (FinTech, AdTech, Healthcare, etc.)
  - Notable projects (0-to-1 launches, performance wins, revenue impact)
  - Enterprise client experience
  - Certifications (AWS, etc.)

**IMPORTANT - Experience Filtering:**
- ❌ **EXCLUDE Tech Manager roles** (not frontend-focused, management work)
- ❌ **EXCLUDE management experience** (team support, DORA metrics, stakeholder reporting)
- ❌ **EXCLUDE leadership positioning** unless explicitly requested by user
- ✅ **INCLUDE only Individual Contributor (IC)** frontend engineering roles
- ✅ **INCLUDE hands-on technical achievements** (code, architecture, performance)
- ✅ **INCLUDE mentoring/code review** as soft skills (not leadership focus)

**Step 3: Read Personal Contact Data**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/personal/personal-info.md`
- Extract contact information to include at end of About section

**Step 4: Read Job Market Data**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/market-data/frontend-react-jobs.md`
- Validate tier system and identify emerging trends

### Phase 2: Profile Analysis & Market Alignment

**Calculate Market Alignment Score:**

Formula:
```
Alignment Score = (Tier 1 matches / 5) × 40% +
                  (Tier 2 matches / 4) × 30% +
                  (Tier 3 matches / 5) × 20% +
                  (Tier 4 matches / 4) × 10%
```

**Skill Tier Breakdown:**

Create a table showing user's skills organized by tier:

| Tier | User's Skills | Market Frequency | Priority |
|------|--------------|------------------|----------|
| 1 (Critical) | [list from my-skills.md] | 60-100% | Must mention |
| 2 (High Value) | [list] | 40-60% | Should mention |
| 3 (Differentiators) | [list] | 15-40% | Nice to have |
| 4 (Emerging) | [list] | <15% | Premium positioning |

**Identify Key Achievements:**

From CV, extract 3-5 achievements with:
- Quantifiable impact (revenue, performance, team size, timeline)
- Business value delivered
- Technical innovation
- Problem-solving examples

### Phase 3: Content Generation Strategy

Generate **3-4 "About" section variations** with different strategic focuses:

#### Strategy 1: Achievement-Focused
**Target Audience:** Recruiters seeking proven impact
**Structure:**
- Opening: Lead with years of experience + current role + major clients/companies
- Achievement highlights: 2-3 quantifiable wins (revenue, performance, launches)
- Technical expertise: Bullet list with Tier 1-2 skills prominent
- Leadership/soft skills: Collaboration, mentoring, architecture
- Closing: Certification + availability/focus

**Character Target:** 900-1,200 characters (concise template style)

---

#### Strategy 2: Technical Excellence
**Target Audience:** Tech-savvy hiring managers, startup CTOs
**Structure:**
- Opening: Lead with cutting-edge tech stack (AI/LLM, Next.js 15+, Server Components)
- Deep expertise: Checkmark bullet list emphasizing Tier 4 + Tier 1 skills
- Technical achievements: Performance optimization, architecture decisions (single paragraph)
- Innovation: Emerging tech adoption, custom solutions
- Closing: Certification + availability + contact

**Character Target:** 900-1,200 characters (concise template style)

---

#### Strategy 3: Problem-Solver & Business Value
**Target Audience:** Product-focused companies, consultancies
**Structure:**
- Opening: Frame as problem-solver who delivers business outcomes
- Business impact: Checkmark bullet list with skills as business enablers
- Technical enablers: Skills presented as tools to solve problems
- Domain expertise: Industry knowledge (FinTech, AdTech, etc.) in achievements
- Closing: Availability + contact

**Character Target:** 900-1,200 characters (concise template style)

---

#### Strategy 4: Ultra-Concise (Optional)
**Target Audience:** Speed readers, mobile-first recruiters
**Structure:**
- Opening: Years + current role + enterprise clients (1 sentence)
- Core skills: Checkmark bullet list (8-10 items, grouped)
- Achievements: Single sentence with 2-3 key wins
- Closing: Certification + availability + contact

**Character Target:** 800-1,000 characters (minimal viable About section)

---

### Concise Template Style Requirements

**IMPORTANT:** All About sections must follow this concise template format:

**Structure:**
1. **Opening paragraph** (2-3 sentences, 150-200 chars)
   - Years + role + core tech stack
   - Current company + enterprise clients
2. **"My experience includes:" heading**
3. **Checkmark bullet list** (✓) with 8-10 skill items
4. **Achievement paragraph** (single paragraph, 50-75 words)
5. **Closing line** (certification + availability)
6. **Contact info** (email, phone, WhatsApp)

**Formatting Rules:**
- ✅ Use checkmarks (✓) not bullets (•)
- ✅ Keep 2 main paragraphs + bullet list
- ✅ Single achievement paragraph (not multiple bullets)
- ✅ Target 900-1,200 characters for main option
- ✅ Remove verbose phrases ("My expertise spans", "My background includes")
- ✅ Front-load enterprise client names for credibility

**Reading Time Target:** 25-30 seconds (vs 45+ for verbose versions)

---

### Phase 4: About Section Components

Each "About" section must include:

**1. Opening Hook (1-2 sentences, 100-200 chars):**
- Years of experience + primary role
- Core technologies (Tier 1 skills)
- Current company/position OR unique positioning
- Domain expertise OR standout achievement

**Examples:**
- "Senior Frontend Engineer with 10+ years building scalable web applications using React, TypeScript, and Next.js. Currently developing enterprise-grade advertising platforms at [Company], serving major clients including [ClientA], [ClientB], and [ClientC]."
- "Full-stack JavaScript developer specializing in React, TypeScript, and Node.js with 8+ years delivering high-impact products for FinTech and AdTech companies."

**2. Core Competencies Section:**

**Format Options:**

**Option A: Checkmark Bullet List (Preferred for scanability - matches reference template)**
```
My experience includes:

✓ Development with React / Next.js / TypeScript
✓ Performance optimization and scalable architecture (SPAs, PWAs, microfrontends)
✓ Testing (Jest, Cypress, Playwright, React Testing Library, TDD)
✓ Design Systems (Storybook, Tailwind CSS, Radix UI, Design Tokens)
✓ State management (Redux, Zustand, Context API, custom hooks)
✓ AI/LLM integration and agentic development
✓ Full-stack capabilities (Node.js, REST APIs, GraphQL)
✓ Cloud infrastructure (AWS Certified, Docker, Kubernetes, CI/CD)
✓ Clean architecture, SOLID principles, and accessibility (WCAG)
```

**Option B: Paragraph with Skill Clusters**
```
I specialize in modern React development (TypeScript, Next.js, Server Components) with deep expertise in performance optimization, accessibility (WCAG), and design systems. My technical toolkit includes comprehensive testing strategies (Jest, Cypress, TDD), CI/CD pipelines, and cloud infrastructure (AWS Certified). I'm particularly excited about AI/LLM integration and building agentic development workflows.
```

**Requirements:**
- Use checkmarks (✓) not standard bullets (•) to match reference template
- Include 8-10 skill items (concise, grouped by category)
- Each line combines related technologies
- Prioritize Tier 1-2 skills, feature 1-2 Tier 4 skills
- Use parentheses for specific tech within clusters
- Keep each bullet focused (8-12 words for faster scanning)

**3. Achievement Highlights (2-3 achievements in single paragraph):**

**Format:**
- **Condense into ONE paragraph** (3-4 lines max) instead of separate bullets
- Start with action verbs (Built, Developed, Increased, Reduced, Delivered)
- Include quantifiable metrics when possible
- Focus on business/user impact, not just tech
- Keep entire paragraph to 50-75 words

**Example (Concise Template Style):**
"Built Node.js API for Figma integration boosting creative capacity, refactored critical React components resolving performance bottlenecks, implemented features increasing revenue for enterprise clients, and delivered 0-to-1 products (BI dashboards, PWAs) in under 3 months."

**What to EXCLUDE:**
- ❌ NO Tech Manager achievements (team support, DORA metrics, reporting)
- ❌ NO management-focused language (Led squads, supported teams)
- ✅ ONLY hands-on technical contributions

**4. Soft Skills / Leadership (1-2 sentences):**
- Clean architecture, SOLID principles, design patterns
- Code review, mentoring, knowledge sharing
- Cross-functional collaboration
- Agile methodologies (Scrum, Kanban)
- Problem-solving mindset

**5. Closing Statement (1-2 sentences):**
- Current focus or learning
- Availability (open to opportunities, remote work, etc.)
- Call-to-action
- Certification highlight

**Examples:**
- "AWS Certified Cloud Practitioner | Open to remote Frontend/Full-Stack opportunities"
- "Passionate about building accessible, performant web experiences | Available for consulting"
- "Currently exploring AI/LLM integration in modern web apps | Let's connect!"

**6. Contact Information:**
Use data from personal_data.md:
```
📧 [email]
📱 [phone]
💬 [WhatsApp link]
```

Or simplified:
```
Email: [email]
Phone: [phone]
WhatsApp: [WhatsApp link]
```

### Phase 5: Output Format

Present results in this structure:

```markdown
# LinkedIn "About" Section - Generated Options

## Your Market Alignment

**Overall Alignment Score: [X]%**

[1-2 sentence interpretation of alignment]

### Your Skills by Market Tier

| Tier | Your Skills | Market Demand | Impact on About Section |
|------|-------------|---------------|------------------------|
| 1 (Critical) | [list from my-skills.md] | 60-100% | Lead with these in opening |
| 2 (High Value) | [list] | 40-60% | Feature prominently in bullets |
| 3 (Differentiators) | [list] | 15-40% | Use for specialization positioning |
| 4 (Emerging) | [list] | <15% | Premium differentiator (1-2 max) |

**Key CV Highlights:**
- [X] years of experience | [Seniority Level]
- Notable achievements: [top 3 quantifiable wins]
- Domain expertise: [FinTech, AdTech, etc.]
- Leadership: [team management, mentoring experience if applicable]
- Certifications: [AWS, etc.]

---

## 🏆 Top Recommendation: [Strategy Name]

### Ready to Copy (Auto-copied to clipboard)

```
[Complete About section text - formatted and ready to paste]
```

**Character Count:** [X]/2,600 | **Alignment:** Tier 1: [X]% | Tier 2: [X]% | Tier 3/4: [X]%

**Why This Works:**
- ✅ [Reason 1 - e.g., "Leads with quantifiable achievements that immediately demonstrate value"]
- ✅ [Reason 2 - e.g., "Features all critical Tier 1 skills (React, TypeScript, Next.js) in first paragraph"]
- ✅ [Reason 3 - e.g., "Highlights premium skills (AI/LLM) for cutting-edge positioning"]
- ✅ [Reason 4 - e.g., "Includes AWS certification and enterprise client experience for credibility"]
- ✅ [Reason 5 - e.g., "Natural, conversational tone that's scannable with bullet points"]

**Keywords Used:**
- Tier 1: [React, TypeScript, JavaScript, etc.]
- Tier 2: [Next.js, Jest, etc.]
- Tier 3/4: [AI/LLM Integration, Design Systems, etc.]

**Best For:** [Target audience - e.g., "Enterprise companies seeking senior engineers with proven impact"]

---

## Option 2: [Strategy Name]

```
[Complete About section text]
```

**Character Count:** [X]/2,600 | **Strategy:** [Achievement/Technical/Problem-Solver/Leadership]

**Why This Approach:**
- [Strategic reasoning]
- [Target audience fit]
- [Key differentiators]

**Keywords Used:** [List with tier indicators]

**Best For:** [Target audience]

---

## Option 3: [Strategy Name]

```
[Complete About section text]
```

**Character Count:** [X]/2,600 | **Strategy:** [Strategy type]

**Why This Approach:**
- [Strategic reasoning]
- [Target audience fit]
- [Key differentiators]

**Keywords Used:** [List with tier indicators]

**Best For:** [Target audience]

---

## Option 4: [Strategy Name] (if applicable)

```
[Complete About section text]
```

**Character Count:** [X]/2,600 | **Strategy:** [Strategy type]

**Why This Approach:**
- [Strategic reasoning]
- [Target audience fit]
- [Key differentiators]

**Keywords Used:** [List with tier indicators]

**Best For:** [Target audience]

---

## Quick Comparison Table

| # | Strategy | Characters | Tier 1 Coverage | Tier 4 Skills | Achievements | Best For |
|---|----------|-----------|-----------------|---------------|--------------|----------|
| 1 | Achievement-Focused | [X] | 5/5 | 2 | 3 prominent | Impact-driven recruiters |
| 2 | Technical Excellence | [X] | 5/5 | 3 | 1-2 | Tech-savvy hiring managers |
| 3 | Problem-Solver | [X] | 4/5 | 1 | 2-3 | Product-focused companies |
| 4 | Leadership Track | [X] | 3/5 | 1 | 2 + leadership | Senior IC/Lead roles |

---

## Implementation Guide

### Next Steps:
1. ✅ **Top recommendation has been copied to your clipboard**
2. 📝 Go to LinkedIn.com/in/[your-profile]/edit/about
3. 📋 Paste the copied content (Ctrl+V / Cmd+V)
4. 🔍 Review formatting - LinkedIn preserves line breaks
5. 💾 Save and publish
6. 📊 Monitor profile views over 2-4 weeks
7. 🔄 Test Option #2 or #3 if you want to A/B test different positioning

### Pro Tips:
- **Checkmark Bullets:** Use ✓ instead of • to match professional template style
- **Emojis:** Optional for contact info (📧 📱 💬) but keep professional
- **Length Sweet Spot:** 900-1,200 characters gets read fastest; 1,200-1,600 for detailed
- **Update Triggers:**
  - New certification earned
  - Major project launched
  - Skill tier changes (check market data quarterly)
  - Career focus shift (IC to lead, or vice versa)
- **A/B Testing:** Switch between concise and ultra-concise every 4-6 weeks
- **Profile Completeness:** About section is weighted heavily in LinkedIn SEO
- **Keywords for Search:** Recruiters search for Tier 1-2 skills - front-load them
- **Tech Manager Experience:** Exclude unless applying for leadership roles

### Optimization Tips:
- **First 200 characters** are visible without "see more" click - front-load impact
- **Paragraph breaks** every 2-3 sentences for mobile readability
- **Active voice** over passive ("Built" not "Was responsible for building")
- **Quantify** achievements whenever possible (%, $, time, scale)
- **Update my-skills.md** whenever you learn new skills to regenerate About section
```

---

## Validation Rules

Before presenting About sections, ensure:
- ✅ All skills mentioned exist in my-skills.md (no fabrication)
- ✅ All achievements are from CV or verifiable experience
- ✅ **Character count is between 900-1,200 for main option** (concise template style)
- ✅ Contact information matches personal_data.md exactly
- ✅ No grammatical errors or typos
- ✅ Tier 1 skills are prominent in all versions
- ✅ At least 1 Tier 4 skill featured for premium positioning
- ✅ Each option has clear strategic differentiation
- ✅ Market alignment score is calculated accurately
- ✅ Tone is professional yet personable (not robotic)
- ✅ Opening hook is compelling (would you keep reading?)
- ✅ Achievements have quantifiable impact when possible
- ✅ **Formatting uses checkmarks (✓) matching reference template**
- ✅ **NO Tech Manager experience included** (IC roles only)
- ✅ **Achievement section is single paragraph** (not multiple bullets)

---

## Writing Best Practices

### Include in About Sections:
- ✅ Years of experience (if 3+)
- ✅ Seniority level (if Mid-Senior+)
- ✅ Core Tier 1 technologies (React, TypeScript, etc.)
- ✅ 1-2 Tier 2 skills (Next.js, Jest)
- ✅ 1-2 Tier 4 skills for differentiation (AI/LLM, Design Systems)
- ✅ Quantifiable achievements from CV
- ✅ Domain expertise (FinTech, AdTech, etc.)
- ✅ Current company/notable past companies
- ✅ Certifications (AWS, etc.)
- ✅ Availability/focus statement
- ✅ Contact information

### Avoid in About Sections:
- ❌ Generic buzzwords ("passionate", "dedicated", "team player" without context)
- ❌ Vague statements ("expert in everything", "fast learner")
- ❌ Technology laundry list (mention 8-12 max, organized in clusters)
- ❌ Outdated technologies (unless still relevant to target roles)
- ❌ Overly formal or stiff language
- ❌ Too much personal information (hobbies, unless directly relevant)
- ❌ Negative language ("looking for a job", "unemployed")
- ❌ Skills not in my-skills.md
- ❌ Exaggerated claims not backed by CV

### Tone Guidelines:
- **Professional but personable** - approachable, not corporate-speak
- **Confident but humble** - showcase wins without bragging
- **Active voice** - "Built", "Led", "Delivered" not "Was responsible for"
- **Present tense for current role** - "Currently developing" not "Currently develop"
- **Scannable** - short paragraphs, bullet points, clear structure
- **Story arc** - who you are → what you've done → what you offer → how to connect

---

## Clipboard Copy Implementation

**IMPORTANT:** After generating all options, automatically copy the top recommendation to the clipboard using the Bash tool:

```bash
# Copy to clipboard (macOS)
echo "[top recommendation text]" | pbcopy

# Confirm to user
echo "✅ Top recommendation copied to clipboard! Ready to paste into LinkedIn."
```

**Fallback for other systems:**
```bash
# Linux with xclip
echo "[text]" | xclip -selection clipboard

# Linux with xsel
echo "[text]" | xsel --clipboard --input
```

---

## Examples

### Example 1: Achievement-Focused (10+ years, FinTech)

**Input:**
- my-skills.md: React, TypeScript, JavaScript, Next.js, Node.js, Redux, Jest, Tailwind, AI/LLM, AWS
- CV: 10+ years, Senior Frontend Engineer, Stormx Data&Tech, FinTech/AdTech background
- Key achievements: Figma API integration, performance optimization, 0-to-1 product launches
- Certifications: AWS Certified Cloud Practitioner

**Market Alignment:** 95%
- Tier 1: React, TypeScript, JavaScript (100%)
- Tier 2: Next.js, Jest (100%)
- Tier 3: Redux, Tailwind (40%)
- Tier 4: AI/LLM Integration, Design Systems (50%)

**Output (Concise Template Style):**
```
Frontend Engineer with 10+ years building scalable web applications using React, TypeScript, and Next.js. Currently developing enterprise advertising platforms at Stormx Data&Tech for clients like Santander, NuBank, Bradesco, and O Boticário.

My experience includes:

✓ Development with React / Next.js / TypeScript
✓ Performance optimization and scalable architecture (SPAs, PWAs, microfrontends)
✓ Testing (Jest, Cypress, Playwright, React Testing Library, TDD)
✓ Design Systems (Storybook, Tailwind CSS, Radix UI, Design Tokens)
✓ State management (Redux, Zustand, Context API, custom hooks)
✓ AI/LLM integration and agentic development
✓ Full-stack capabilities (Node.js, REST APIs, GraphQL)
✓ Cloud infrastructure (AWS Certified, Docker, Kubernetes, CI/CD)
✓ Clean architecture, SOLID principles, and accessibility (WCAG)

Recent achievements: Built Node.js API for Figma integration boosting creative capacity, refactored critical React components resolving performance bottlenecks, implemented features increasing revenue for enterprise clients, and delivered 0-to-1 products (BI dashboards, PWAs) in under 3 months.

AWS Certified Cloud Practitioner | Open to remote Frontend/Full-Stack opportunities

📧 gustavojnt@gmail.com
📱 +55 (33) 99822-9942
💬 https://wa.me/5533998229942
```

**Character Count:** 1,195/2,600 (Concise - 27% shorter than verbose version)
**Reading Time:** ~30 seconds (vs 45+ for verbose)
**Keywords:** React (Tier 1), TypeScript (Tier 1), Next.js (Tier 2), Jest (Tier 2), AI/LLM (Tier 4), Design Systems (Tier 4), Performance Optimization, AWS (Tier 2)
**Note:** Tech Manager experience excluded - IC focus only

---

### Example 2: Ultra-Concise Style (Minimal, Speed Readers)

**Input:**
- Target: Mobile-first recruiters, speed readers
- Strategy: Absolute minimum viable About section

**Output (Ultra-Concise):**
```
Senior Frontend Engineer with 10+ years specializing in React, TypeScript, and Next.js. Building enterprise advertising platforms at Stormx Data&Tech for Santander, NuBank, Bradesco, and O Boticário.

My experience includes:

✓ React 19+ / Next.js 15+ / TypeScript / Server Components
✓ Mobile development with React Native
✓ State management (Redux, Zustand, Context API, custom hooks)
✓ Testing (Jest, Cypress, Playwright, React Testing Library, TDD)
✓ Design Systems (Storybook, Tailwind CSS, Styled Components)
✓ AI/LLM integration (GPT, Claude APIs)
✓ Full-stack (Node.js, REST APIs, GraphQL, PostgreSQL, MongoDB)
✓ Cloud (AWS Certified, Docker, Kubernetes, CI/CD)
✓ Performance optimization, clean architecture, accessibility (WCAG)
✓ Agile methodologies (Scrum, Kanban)

Delivered: Figma API integration for enterprise clients, performance-optimized React components, 0-to-1 PWAs and BI dashboards launched in under 3 months.

AWS Certified Cloud Practitioner | Open to remote opportunities

📧 gustavojnt@gmail.com
📱 +55 (33) 99822-9942
💬 https://wa.me/5533998229942
```

**Character Count:** 978/2,600 (Ultra-concise)
**Reading Time:** ~25 seconds
**Strategy:** Maximum information density, fastest scanning

---

## Notes

- **Primary Source:** my-skills.md is the single source of truth for technical skills
- **CV Purpose:** Context, achievements, years, domain expertise only
- **About Section SEO:** LinkedIn indexes About text for recruiter searches - keyword placement matters
- **Character Limit:** 2,600 max, but 1,200-1,800 is optimal for engagement
- **First 200 Characters:** Most critical - visible without "see more" expansion
- **Mobile Optimization:** 60%+ of LinkedIn users are on mobile - short paragraphs and bullets
- **Update Frequency:** Refresh About section when:
  - You gain a new significant skill (especially Tier 1-2)
  - You complete a major achievement/project
  - You earn a certification
  - Market trends shift (check quarterly)
  - You change career focus/availability
- **A/B Testing:** Switch between options every 4-6 weeks to optimize for profile views
- **Profile Completeness:** About section contributes ~20% to LinkedIn profile strength score
- **Recruiter Behavior:** Recruiters spend 6-8 seconds scanning profiles - make those seconds count

---

## Auto-Copy Feature

After generating all options, this command will:
1. Present 3-4 complete About section variations
2. Identify the top recommendation based on market alignment and user profile
3. **Automatically copy the top recommendation to clipboard** using pbcopy (macOS) or equivalent
4. Notify user that content is ready to paste
5. Provide all other options for comparison and future use

This eliminates the manual copy step and makes implementation instant!
