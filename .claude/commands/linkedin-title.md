---
description: Analyzes resume/CV and current frontend job market data to generate optimized LinkedIn profile titles with SEO keywords that attract recruiters. Use when user needs a compelling LinkedIn title for their profile.
allowed-tools: Read, WebFetch, Bash
---

# Generate LinkedIn Profile Title

This command analyzes the user's skills from my-skills.md and CV/resume, combined with current job market trends, to generate compelling, recruiter-friendly LinkedIn profile titles optimized for search visibility and maximum impact.

## Market-Driven Skill Tier System

Based on analysis of 31+ frontend job listings, skills are ranked by market demand:

### Tier 1 - Critical Skills (60%+ of jobs require)
**Must include in title for maximum visibility:**
- React (100%)
- JavaScript (90%)
- TypeScript (87%)
- HTML (68%)
- CSS (68%)

### Tier 2 - High Value Skills (40-60% of jobs)
**Strong differentiators, include 1-2:**
- Next.js (48%)
- Jest (45%)
- Git (45%)
- REST APIs (42%)

### Tier 3 - Differentiators (15-40% of jobs)
**Valuable specializations, include 1:**
- React Testing Library (35%)
- Tailwind CSS (32%)
- Redux (29%)
- Cypress (26%)
- CI/CD (26%)

### Tier 4 - Emerging/Premium Skills (<15% but high-value)
**Career accelerators, include if applicable:**
- Design Systems (23%)
- Accessibility/WCAG (19%)
- AI/LLM Integration (6% but rapidly growing)
- Microfrontends (3%)
- React Native (13%)

## Instructions

### 1. Data Collection Phase

**Step 1: Read my-skills.md (PRIMARY SOURCE for technical skills)**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/personal/my-skills.md`
- Extract ALL technical skills from all sections
- This is the authoritative source for current technical capabilities
- Organize skills by the categories present in the file

**Step 2: Read CV (SECONDARY SOURCE for context only)**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/personal/cv.pdf`
- Extract ONLY:
  - Years of experience
  - Seniority level (Junior/Mid/Senior/Staff/Principal/Lead)
  - Domain expertise (FinTech, AdTech, Healthcare, etc.)
  - Notable achievements or leadership experience
  - Certifications (AWS, etc.)
- DO NOT use CV for technical skills list - use my-skills.md instead

**Step 3: Read Job Market Data**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/market-data/frontend-react-jobs.md`
- This validates our tier system and identifies any emerging trends

### 2. Skill Mapping & Market Alignment Phase

**Map User Skills to Market Tiers:**

For each skill in my-skills.md, determine which tier it belongs to:
- Tier 1 skills = Mandatory for title inclusion
- Tier 2 skills = Strong candidates for inclusion (pick 1-2)
- Tier 3 skills = Differentiators (pick 1 if space allows)
- Tier 4 skills = Premium positioning (use if user has them)

**Calculate Market Alignment Score:**

Formula:
```
Alignment Score = (Tier 1 matches / 5) × 40% +
                  (Tier 2 matches / 4) × 30% +
                  (Tier 3 matches / 5) × 20% +
                  (Tier 4 matches / 4) × 10%
```

Example:
- User has: React, TypeScript, JavaScript, HTML, CSS (5/5 Tier 1) = 40%
- User has: Next.js, Jest (2/4 Tier 2) = 15%
- User has: Tailwind, Redux, Cypress (3/5 Tier 3) = 12%
- User has: AI/LLM Integration (1/4 Tier 4) = 2.5%
- **Total Alignment: 69.5%**

**Create Skill Tier Breakdown Table:**

Present user's skills organized by tier:

| Tier | User's Skills | Market Frequency |
|------|--------------|------------------|
| 1 (Critical) | React, TypeScript, JavaScript, HTML, CSS | 60-100% |
| 2 (High Value) | Next.js, Jest | 40-60% |
| 3 (Differentiators) | Tailwind CSS, Redux, Cypress | 15-40% |
| 4 (Emerging) | AI/LLM Integration | <15% |

### 3. Title Generation Phase

**Generate 5-7 Title Options** using tier-based prioritization:

**Title Prioritization Formula:**
```
[Seniority] + [Role] + | + [All Tier 1 Skills User Has] + [1-2 Tier 2 Skills] + [1 Tier 3/4 Skill]
```

**Title Construction Rules:**

1. **Always Include (if user has them):**
   - Seniority level (from CV)
   - React (Tier 1 - 100% of jobs)
   - TypeScript (Tier 1 - 87% of jobs)

2. **Strongly Include (priority order):**
   - Next.js (Tier 2 - 48% of jobs)
   - Jest or testing frameworks (Tier 2 - 45%)
   - REST APIs (Tier 2 - 42%)

3. **Differentiators (choose 1):**
   - Tailwind CSS (32%)
   - Redux (29%)
   - Cypress (26%)
   - CI/CD (26%)

4. **Premium Positioning (if applicable):**
   - AI/LLM Integration (emerging, high-value)
   - Design Systems (23%)
   - Accessibility (19%)

**Title Strategies (create one title for each):**

1. **ATS-Optimized**: Maximum Tier 1 + Tier 2 coverage
2. **Specialist**: Emphasize specific expertise (performance, testing, architecture)
3. **Full-Stack**: Highlight backend + frontend (Node.js, APIs)
4. **Domain Expert**: Focus on industry expertise (FinTech, AdTech, etc.)
5. **Tech Leadership**: Leadership, mentorship, architecture
6. **Emerging Tech**: Position for cutting-edge opportunities (AI/LLM, Microfrontends)
7. **Modern Stack**: Latest technologies (React 19+, Next.js 15+, Server Components)

**Requirements for Each Title:**
- Maximum 220 characters (LinkedIn limit)
- Optimal: 120-180 characters (visible in search results)
- Include 3-5 high-value keywords
- Natural, human-readable (not keyword stuffing)
- Reflects actual experience (no exaggeration)

### 4. Output Format

Present results in this structure:

```markdown
# LinkedIn Profile Title Recommendations

## Your Market Alignment

**Overall Alignment Score: [X]%**

[Brief interpretation: "Your skill set aligns with [X]% of current frontend job requirements, positioning you as [highly competitive/competitive/developing]"]

### Your Skills by Market Tier

| Tier | Your Skills | Market Demand | Impact |
|------|-------------|---------------|--------|
| 1 (Critical) | [list] | 60-100% | Mandatory for visibility |
| 2 (High Value) | [list] | 40-60% | Strong differentiators |
| 3 (Differentiators) | [list] | 15-40% | Specialization advantages |
| 4 (Emerging) | [list] | <15% | Premium positioning |

### Market Context

- Top 5 in-demand skills: [React, TypeScript, JavaScript, Next.js, Jest]
- Common title patterns: [Seniority + Role + Tech Stack]
- Your strongest alignments: [skills matching Tier 1-2]
- Your unique advantages: [Tier 4 or rare Tier 3 skills]

---

## Recommended Titles

### 🏆 Top Recommendation

**Title:** [The best-fit title]

**Characters:** X/220 | **Alignment:** [Tier 1: 100%] [Tier 2: 50%] [Tier 3: 40%]

**Strategy:** [Which positioning approach]

**Why This Works:**
- Includes [X] critical Tier 1 keywords (React, TypeScript)
- Features [X] high-value Tier 2 skills (Next.js)
- Emphasizes [unique differentiator from Tier 3/4]
- Targets [X]% of job postings based on keyword coverage
- SEO optimized for recruiter searches

**Keywords Used:** keyword1 (Tier 1), keyword2 (Tier 2), keyword3 (Tier 3)

**📋 IMPORTANT: After presenting this top recommendation, automatically copy the title text to clipboard using:**
```bash
echo "[The best-fit title]" | pbcopy
```
Then inform the user: "✅ Top recommendation copied to clipboard - ready to paste into LinkedIn!"

---

### Option 2: [Strategy Name]

**Title:** [Title text]

**Characters:** X/220 | **Alignment:** [Tier breakdown]

**Strategy & Rationale:**
- [Positioning approach]
- [Target audience]
- [Key differentiators]

**Keywords Used:** [List with tier indicators]

---

[Repeat for all 5-7 options]

---

## Quick Comparison

| # | Title | Chars | Strategy | Tier 1 | Tier 2 | Tier 3/4 | Best For |
|---|-------|-------|----------|--------|--------|----------|----------|
| 1 | [...] | 145 | ATS-Optimized | 5/5 | 2/4 | 1 | Maximum visibility |
| 2 | [...] | 167 | Specialist | 3/5 | 3/4 | 2 | Technical roles |
| 3 | [...] | 158 | Emerging Tech | 4/5 | 2/4 | 2 | Cutting-edge positions |
[etc.]

---

## Implementation Guide

### Next Steps:
1. ✅ **The top recommendation is already in your clipboard** - just Cmd+V to paste!
2. **Update** your LinkedIn profile headline immediately
3. **Monitor** profile views and recruiter messages for 2-4 weeks
4. **Test** by switching to option #2 if initial results plateau (ask to copy another option)
5. **Refresh** quarterly when you gain new significant skills

### Pro Tips:
- Put most important keywords first (left-to-right scan)
- Use "|" or "•" as clean separators
- Update after completing certifications or major projects
- A/B test different versions to see what resonates
- Keep my-skills.md updated for future regeneration
- To copy a different title option, just ask: "Copy option 3 to clipboard"
```

### 5. Validation Rules

Before presenting titles, ensure:
- ✅ All Tier 1 skills user has are considered for inclusion
- ✅ At least 1-2 Tier 2 skills are in each title
- ✅ All titles are under 220 characters
- ✅ No grammatical errors or typos
- ✅ Keywords are naturally integrated (not stuffed)
- ✅ Seniority level matches CV evidence
- ✅ Each title has clear strategic differentiation
- ✅ Market alignment score is calculated and displayed

### 6. Title Construction Best Practices

**Include in Titles:**
- Primary Tier 1 skills (React, TypeScript, JavaScript)
- Seniority level when 5+ years experience
- 1-2 Tier 2 technologies (Next.js, Jest, REST APIs)
- 1 specialization from Tier 3 or Tier 4
- Role clarity: "Developer" vs "Engineer" vs "Architect"

**Avoid in Titles:**
- Buzzwords without substance ("Ninja", "Rockstar", "Guru")
- Too many technologies (max 4-5 total)
- Vague terms ("Expert in everything")
- Outdated technologies unless highly relevant
- Emojis (keep professional)
- Skills not in my-skills.md

**Optimization Tips:**
- Lead with Tier 1 skills (highest SEO value)
- Use separators: "|" "•" "-" "+"
- Include both full names and abbreviations when space allows
- Match job posting language patterns
- Prioritize skills from higher tiers over lower tiers

## Examples

### Example 1: Senior Full-Stack Focus
**Input:**
- my-skills.md: React, TypeScript, JavaScript, Next.js, Node.js, Redux, Jest, Tailwind
- CV: 9+ years experience, FinTech background

**Market Alignment:** 92%
- Tier 1: React, TypeScript, JavaScript (100%)
- Tier 2: Next.js, Jest (100%)
- Tier 3: Redux, Tailwind (40%)

**Output:**
"Senior Frontend Engineer | React, TypeScript, Next.js | Full-Stack (Node.js) | FinTech"

**Rationale:**
- Includes all Tier 1 skills (implied: JS/TS)
- Features Next.js (Tier 2 - 48% market)
- Differentiates with Node.js full-stack capability
- Domain expertise adds context

---

### Example 2: Emerging Tech Focus
**Input:**
- my-skills.md: React, TypeScript, Next.js, AI/LLM Integration, Design Systems
- CV: 7+ years, Senior level

**Market Alignment:** 88%
- Tier 1: React, TypeScript (100%)
- Tier 2: Next.js (100%)
- Tier 4: AI/LLM Integration, Design Systems (50%)

**Output:**
"Senior Frontend Engineer | React, TypeScript, Next.js | AI/LLM Integration & Design Systems"

**Rationale:**
- Strong Tier 1 foundation
- Next.js for modern stack appeal
- AI/LLM as premium differentiator (emerging trend)
- Design Systems shows enterprise-level thinking

---

### Example 3: Testing Specialist
**Input:**
- my-skills.md: React, TypeScript, Jest, React Testing Library, Cypress, TDD
- CV: 6+ years, focus on quality assurance

**Market Alignment:** 85%
- Tier 1: React, TypeScript (100%)
- Tier 2: Jest (100%)
- Tier 3: RTL, Cypress (100%)

**Output:**
"Senior Frontend Developer | React & TypeScript | Testing Specialist (Jest, Cypress, TDD)"

**Rationale:**
- Emphasizes testing specialization (45% of jobs mention testing)
- Shows comprehensive testing approach (unit + E2E)
- TDD methodology adds professionalism

## Notes

- This command uses my-skills.md as the single source of truth for technical skills
- CV provides only contextual information (years, seniority, domain)
- Skill tiers are based on real market data from 31+ job listings
- Tier 1 skills should ALWAYS be prioritized in title construction
- The market heavily favors senior React + TypeScript developers with Next.js experience
- AI/LLM integration is emerging as a premium skill (6% now, growing rapidly)
- Testing proficiency is becoming standard (45% of jobs require it)
- Character limit strategy: Aim for 120-180 for maximum search result visibility
- Always validate against latest job market data URL for trend updates
