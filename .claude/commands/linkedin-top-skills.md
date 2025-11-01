---
description: Generates a prioritized, ranked list of top skills for LinkedIn Skills section, optimized for recruiter searches and skill endorsements based on market demand analysis.
allowed-tools: Read, WebFetch, Bash
---

# Generate LinkedIn Top Skills Ranking

This command analyzes your skills from my-skills.md against current job market data to generate a strategic, ranked list of top skills for your LinkedIn Skills section. The output is optimized for maximum recruiter visibility and endorsement strategy.

## Market-Driven Skill Tier System

Based on analysis of 31+ frontend job listings, skills are ranked by market demand:

### Tier 1 - Critical Skills (60%+ of jobs require)
**Foundation skills - showcase prominently:**
- React (100%)
- JavaScript (90%)
- TypeScript (87%)
- HTML (68%)
- CSS (68%)

### Tier 2 - High Value Skills (40-60% of jobs)
**Strong differentiators - prioritize in top 10:**
- Next.js (48%)
- Jest (45%)
- Git (45%)
- REST APIs (42%)

### Tier 3 - Differentiators (15-40% of jobs)
**Valuable specializations - include strategically:**
- React Testing Library (35%)
- Tailwind CSS (32%)
- Redux (29%)
- Cypress (26%)
- CI/CD (26%)

### Tier 4 - Emerging/Premium Skills (<15% but high-value)
**Career accelerators - showcase for premium positioning:**
- Design Systems (23%)
- Accessibility/WCAG (19%)
- AI/LLM Integration (6% but rapidly growing)
- Microfrontends (3%)
- React Native (13%)

## Instructions

### 1. Data Collection Phase

**Step 1: Read my-skills.md (PRIMARY SOURCE)**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/personal/my-skills.md`
- Extract ALL technical skills from all sections
- This is the authoritative source - user has 157+ skills
- Organize by categories: Frontend, Styling, State Management, Testing, Tools, APIs, etc.

**Step 2: Read Job Market Data**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/market-data/frontend-react-jobs.md`
- Extract skill mentions from job descriptions
- Count frequency of each skill across all jobs
- Identify trending/emerging skills

### 2. Skill Classification & Ranking Phase

**Classify User's Skills by Market Tier:**

For each skill in my-skills.md, determine:
1. Which tier does it belong to (based on market frequency)?
2. What's its search weight (how often do recruiters search for it)?
3. What's its endorsement value (how valuable for social proof)?

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
- User has: Next.js, Jest, Git (3/4 Tier 2) = 22.5%
- User has: Tailwind, Redux, Cypress, RTL (4/5 Tier 3) = 16%
- User has: AI/LLM Integration, Design Systems (2/4 Tier 4) = 5%
- **Total Alignment: 83.5%**

**Prioritization Criteria:**

When ranking skills for LinkedIn, prioritize in this order:
1. **SEO Weight**: Tier 1 > Tier 2 > Tier 3 > Tier 4 (recruiter search frequency)
2. **Differentiation Value**: Unique combinations (e.g., React + TypeScript + AI/LLM)
3. **Endorsement Strategy**: Skills most likely to get endorsements (Tier 1-2)
4. **Premium Positioning**: Tier 4 skills for cutting-edge appeal
5. **Recency**: Latest technologies signal active learning

### 3. Top Skills Generation Phase

**Generate Top 15 Skills List** (LinkedIn allows 50, but top 15 get most visibility)

**Ranking Strategy:**

**Positions 1-5: Tier 1 Foundation**
- Include ALL Tier 1 skills user has (React, TypeScript, JavaScript, HTML, CSS)
- These are mandatory for maximum recruiter search visibility
- Order by: Market frequency (100% → 68%)

**Positions 6-10: Tier 2 High-Value**
- Include top Tier 2 skills user has (Next.js, Jest, Git, REST APIs)
- These differentiate from junior developers
- Order by: Market demand + recency

**Positions 11-13: Tier 3 Specialization**
- Include strategic Tier 3 skills (RTL, Tailwind, Redux, Cypress, CI/CD)
- Choose skills that complement Tier 1-2 (e.g., Jest + RTL for testing)
- Order by: Differentiation value

**Positions 14-15: Tier 4 Premium**
- Include Tier 4 emerging skills (Design Systems, AI/LLM, Accessibility)
- These position user for cutting-edge roles
- Order by: Growth trajectory + uniqueness

**LinkedIn Skills Section Strategy:**

1. **Top 3 Skills**: Most critical for profile summary and search
   - LinkedIn shows these prominently
   - Must be Tier 1 skills (React, TypeScript, JavaScript)

2. **Skills 4-10**: Secondary visibility in search results
   - Mix of Tier 1 completion + top Tier 2
   - Balance technical depth with breadth

3. **Skills 11-15**: Specialization showcase
   - Tier 3 differentiators + Tier 4 emerging
   - Shows expertise beyond basics

4. **Skills 16-50**: Supporting skills
   - Tools, methodologies, soft skills
   - Lower search weight but good for endorsements

### 4. Output Format

Present results in this structure:

```markdown
# LinkedIn Top Skills Ranking

## Your Market Alignment

**Overall Alignment Score: [X]%**

[Brief interpretation: "Your skill set aligns with [X]% of current frontend job requirements, positioning you in the top [X]% of candidates"]

### Your Skills Distribution by Tier

| Tier | Your Skills Count | Market Impact | Strategy |
|------|-------------------|---------------|----------|
| 1 (Critical) | [X]/5 | 60-100% of jobs | **Showcase first** - Maximum SEO |
| 2 (High Value) | [X]/4 | 40-60% of jobs | **Differentiate** - Above average |
| 3 (Differentiators) | [X]/5 | 15-40% of jobs | **Specialize** - Unique value |
| 4 (Emerging) | [X]/4 | <15% of jobs | **Premium** - Cutting-edge positioning |

**Total Skills in my-skills.md: [X]**

### Market Context

- **Total Jobs Analyzed:** 58+ frontend/React positions
- **Top 5 In-Demand Skills:** React (100%), JavaScript (90%), TypeScript (87%), Next.js (48%), Jest (45%)
- **Your Strongest Alignments:** [List user's Tier 1-2 matches]
- **Your Unique Advantages:** [List user's rare Tier 3-4 skills]
- **Emerging Opportunities:** AI/LLM Integration (6% but growing), Design Systems (23%), Accessibility (19%)

---

## 🏆 Top 15 Skills for LinkedIn (Ranked by Impact)

**Optimized for:**
- ✅ Recruiter search visibility (SEO)
- ✅ Endorsement strategy (social proof)
- ✅ Premium positioning (emerging skills)
- ✅ ATS compatibility (job matching algorithms)

### Core Foundation (Positions 1-5)
**Strategy: Maximum Search Visibility**

1. **[Skill Name]** - Tier 1 (100% of jobs)
   - Why: [Rationale - e.g., "Universal requirement, highest SEO weight"]
   - Endorsements: [High/Medium/Low priority]

2. **[Skill Name]** - Tier 1 (90% of jobs)
   - Why: [Rationale]
   - Endorsements: [Priority level]

[Continue for all Tier 1 skills...]

---

### High-Value Differentiators (Positions 6-10)
**Strategy: Above-Average Positioning**

6. **[Skill Name]** - Tier 2 (48% of jobs)
   - Why: [Rationale - e.g., "Modern framework, growing demand"]
   - Endorsements: [Priority level]
   - Pair with: [Complementary skill from list]

[Continue for top Tier 2 skills...]

---

### Specialization Showcase (Positions 11-13)
**Strategy: Unique Value Proposition**

11. **[Skill Name]** - Tier 3 (35% of jobs)
    - Why: [Rationale - e.g., "Testing specialization, complements Jest"]
    - Endorsements: [Priority level]
    - Differentiates from: [X]% of candidates

[Continue for strategic Tier 3 skills...]

---

### Premium/Emerging Skills (Positions 14-15)
**Strategy: Cutting-Edge Positioning**

14. **[Skill Name]** - Tier 4 (23% of jobs)
    - Why: [Rationale - e.g., "Enterprise-level, high-value projects"]
    - Endorsements: [Priority level]
    - Premium factor: [Explains why this is valuable]

15. **[Skill Name]** - Tier 4 (6% but growing)
    - Why: [Rationale - e.g., "Emerging trend, future-focused"]
    - Endorsements: [Priority level]
    - Growth trajectory: [Explains trend]

---

## 📊 Complete Skills Analysis

### All Your Skills by Tier (Ranked Within Each Tier)

**Tier 1 - Critical (Lead with these):**
1. [Skill] (100% of jobs) - **Top 3 priority**
2. [Skill] (90% of jobs) - **Top 3 priority**
3. [Skill] (87% of jobs) - **Top 3 priority**
[Continue list...]

**Tier 2 - High Value (Positions 6-10):**
1. [Skill] (48% of jobs) - **Position 6 recommended**
2. [Skill] (45% of jobs) - **Position 7-8 recommended**
[Continue list...]

**Tier 3 - Differentiators (Positions 11-13):**
1. [Skill] (35% of jobs) - **Specialization showcase**
2. [Skill] (32% of jobs) - **Good for endorsements**
[Continue list...]

**Tier 4 - Emerging/Premium (Positions 14-15):**
1. [Skill] (23% of jobs) - **Premium positioning**
2. [Skill] (19% of jobs) - **Social responsibility angle**
3. [Skill] (6% but growing) - **Future-focused**
[Continue list...]

**Additional Valuable Skills (Positions 16-50):**
[List remaining skills organized by category:]
- Tools & Platforms: [Git, VS Code, Figma, etc.]
- State Management: [Redux, Zustand, Context API, etc.]
- Testing: [Additional testing frameworks]
- Styling: [Styling libraries and methodologies]
- Backend/Full-Stack: [Node.js, databases, etc.]
- Cloud/DevOps: [AWS, Docker, CI/CD tools]
- Soft Skills: [Agile, Mentoring, Problem Solving, etc.]

---

## 📋 Copy-Paste Ready List

**Top 15 Skills (in order):**
```
1. [Skill Name]
2. [Skill Name]
3. [Skill Name]
4. [Skill Name]
5. [Skill Name]
6. [Skill Name]
7. [Skill Name]
8. [Skill Name]
9. [Skill Name]
10. [Skill Name]
11. [Skill Name]
12. [Skill Name]
13. [Skill Name]
14. [Skill Name]
15. [Skill Name]
```

**📋 IMPORTANT: After presenting this list, automatically copy it to clipboard using:**
```bash
cat << 'EOF' | pbcopy
[Skill 1]
[Skill 2]
[Skill 3]
[...]
EOF
```
Then inform the user: "✅ Top 15 skills copied to clipboard - ready to add to LinkedIn!"

---

## 💡 Strategic Recommendations

### Endorsement Priority Strategy

**Ask for endorsements in this order:**

**Wave 1 - Critical Skills (Get to 99+ endorsements):**
- [Tier 1 skills] - These appear in most searches

**Wave 2 - Differentiation (Target 50+ endorsements):**
- [Tier 2 skills] - Shows depth beyond basics

**Wave 3 - Specialization (Target 20+ endorsements):**
- [Tier 3-4 skills] - Unique positioning

**Who to ask:**
- Former colleagues who worked with you on [specific projects using these skills]
- Managers who can vouch for [leadership/mentorship skills]
- Peers in [specific communities, e.g., React, testing, etc.]

### Skill Grouping for Impact

LinkedIn shows skills in categories. Organize like this:

**Category 1: Frontend Development**
- [All Tier 1-2 frontend skills]
- Shows core expertise

**Category 2: Testing & Quality**
- [Jest, RTL, Cypress, TDD, etc.]
- Demonstrates professionalism

**Category 3: Modern Stack**
- [Next.js, TypeScript, Server Components, etc.]
- Shows currency

**Category 4: Emerging Technologies**
- [AI/LLM, Design Systems, Accessibility, etc.]
- Future-focused positioning

### Skills to Add Next (Based on Gap Analysis)

**High ROI (Learn these to reach 90%+ market alignment):**
- [Missing Tier 2 skills from market data]

**Medium ROI (Nice to have):**
- [Missing Tier 3 skills]

**Strategic Bets (Emerging trends):**
- [Growing Tier 4 skills not yet in my-skills.md]

---

## 📈 Before & After Comparison

### Current State (if applicable)
- Top skills visible: [Current top 3 if you can infer]
- Market alignment: [Estimated based on current visibility]
- Search visibility: [Low/Medium/High]

### After Implementing This Ranking
- Top skills: [Recommended top 3]
- Market alignment: [X]%
- Search visibility: **High** (matches [X]% of job searches)
- Endorsement potential: **[X] skills** positioned for maximum endorsements
- Premium positioning: **Yes** ([Tier 4 skills] showcase cutting-edge expertise)

---

## 🎯 Implementation Guide

### Step-by-Step Update Process

1. **Go to LinkedIn Profile**
   - Navigate to "Skills" section
   - Click "Edit"

2. **Reorder Top 15 Skills**
   - Drag skills to match this ranking
   - OR delete all and re-add in this order (LinkedIn remembers order)

3. **Pin Top 3 Skills**
   - LinkedIn allows pinning 3 skills to profile summary
   - Pin: [Recommended top 3]

4. **Request Endorsements (Optional but powerful)**
   - Use Wave 1 strategy above
   - Personalized messages work best

5. **Add Missing Skills (If any)**
   - Review "Skills to Add Next" section
   - Add new skills as you learn them

### Validation Checklist

Before finalizing, verify:
- ✅ Top 3 skills are all Tier 1 (React, TypeScript, JavaScript recommended)
- ✅ Positions 4-10 include mix of Tier 1 completion + top Tier 2
- ✅ At least 1-2 Tier 4 emerging skills in top 15
- ✅ Skills are ordered by strategic impact (not alphabetically)
- ✅ All skills listed are actually in my-skills.md (truthfulness check)
- ✅ Testing skills are grouped together (if applicable)
- ✅ Modern framework skills are prominent (Next.js if applicable)

### Monitoring & Updates

**Track these metrics:**
- Profile views (should increase 20-40% within 2 weeks)
- Recruiter messages (quality + quantity)
- Endorsements received (target 10+ per month for top skills)
- Job match notifications (should be more relevant)

**Update schedule:**
- **Quarterly:** Review and adjust based on new skills learned
- **Bi-annually:** Refresh market data and realign
- **After major projects:** Add new specialized skills
- **When job searching:** Optimize for specific target roles

---

## 📚 Examples

### Example 1: Full-Stack React Developer (9+ years)

**Input Skills (from my-skills.md):**
- Frontend: React, TypeScript, JavaScript, HTML, CSS, Next.js, Redux, Tailwind
- Testing: Jest, RTL, Cypress, TDD
- Backend: Node.js, PostgreSQL, REST APIs, GraphQL
- Tools: Git, Docker, CI/CD, AWS
- Emerging: AI/LLM Integration, Design Systems

**Market Alignment:** 94%
- Tier 1: 5/5 (100%)
- Tier 2: 4/4 (100%)
- Tier 3: 5/5 (100%)
- Tier 4: 2/4 (50%)

**Top 15 Ranking:**
1. React (Tier 1, 100% of jobs)
2. TypeScript (Tier 1, 87% of jobs)
3. JavaScript (Tier 1, 90% of jobs)
4. HTML (Tier 1, 68% of jobs)
5. CSS (Tier 1, 68% of jobs)
6. Next.js (Tier 2, 48% of jobs)
7. Jest (Tier 2, 45% of jobs)
8. Git (Tier 2, 45% of jobs)
9. REST APIs (Tier 2, 42% of jobs)
10. React Testing Library (Tier 3, 35% of jobs)
11. Tailwind CSS (Tier 3, 32% of jobs)
12. Redux (Tier 3, 29% of jobs)
13. CI/CD (Tier 3, 26% of jobs)
14. Design Systems (Tier 4, 23% of jobs)
15. AI/LLM Integration (Tier 4, 6% but growing)

**Why This Works:**
- Covers 100% of Tier 1 critical skills
- Includes all high-value Tier 2 differentiators
- Balances testing (Jest, RTL) with styling (Tailwind)
- Premium positioning with Design Systems + AI/LLM
- Targets 94% of available jobs

---

### Example 2: Testing Specialist (6+ years)

**Input Skills (from my-skills.md):**
- Core: React, TypeScript, JavaScript, HTML, CSS
- Testing: Jest, RTL, Cypress, Playwright, Vitest, TDD
- Tools: Git, GitHub Actions, Docker
- Frameworks: Next.js, Redux

**Market Alignment:** 89%
- Tier 1: 5/5 (100%)
- Tier 2: 2/4 (50%)
- Tier 3: 3/5 (60%)
- Tier 4: 0/4 (0%)

**Top 15 Ranking:**
1. React (Tier 1, 100% of jobs)
2. TypeScript (Tier 1, 87% of jobs)
3. JavaScript (Tier 1, 90% of jobs)
4. Jest (Tier 2, 45% of jobs) - **Specialist focus**
5. React Testing Library (Tier 3, 35% of jobs) - **Specialist focus**
6. Cypress (Tier 3, 26% of jobs) - **Specialist focus**
7. HTML (Tier 1, 68% of jobs)
8. CSS (Tier 1, 68% of jobs)
9. Next.js (Tier 2, 48% of jobs)
10. Git (Tier 2, 45% of jobs)
11. Redux (Tier 3, 29% of jobs)
12. TDD (Methodology, high value)
13. Playwright (Emerging testing tool)
14. Vitest (Modern testing framework)
15. GitHub Actions (CI/CD automation)

**Why This Works:**
- Testing skills clustered in positions 4-6 for specialization visibility
- Tier 1 foundation still present (positions 1-3, 7-8)
- Shows comprehensive testing approach (unit, integration, E2E)
- TDD methodology signals professionalism
- Modern tools (Playwright, Vitest) show active learning

---

### Example 3: Emerging Tech Focus (7+ years, Senior)

**Input Skills (from my-skills.md):**
- Core: React, TypeScript, JavaScript, HTML, CSS
- Modern: Next.js, Server Components, React 19 features
- Advanced: AI/LLM Integration, Design Systems, Microfrontends
- Accessibility: WCAG, ARIA
- Tools: Git, Storybook, Figma

**Market Alignment:** 91%
- Tier 1: 5/5 (100%)
- Tier 2: 2/4 (50%)
- Tier 3: 2/5 (40%)
- Tier 4: 4/4 (100%) - **Premium positioning**

**Top 15 Ranking:**
1. React (Tier 1, 100% of jobs)
2. TypeScript (Tier 1, 87% of jobs)
3. JavaScript (Tier 1, 90% of jobs)
4. Next.js (Tier 2, 48% of jobs)
5. Design Systems (Tier 4, 23% of jobs) - **Premium early**
6. AI/LLM Integration (Tier 4, 6% but growing) - **Premium early**
7. Accessibility (WCAG) (Tier 4, 19% of jobs) - **Premium early**
8. HTML (Tier 1, 68% of jobs)
9. CSS (Tier 1, 68% of jobs)
10. Git (Tier 2, 45% of jobs)
11. React Server Components (Tier 4, emerging)
12. Microfrontends (Tier 4, 3% of jobs)
13. Storybook (Component development)
14. Figma (Design collaboration)
15. ARIA (Accessibility implementation)

**Why This Works:**
- Tier 4 skills elevated to positions 5-7 for premium positioning
- Targets cutting-edge roles and forward-thinking companies
- Still maintains Tier 1 foundation (positions 1-4, 8-9)
- Accessibility as both Tier 4 and social responsibility signal
- Modern React ecosystem (Server Components) shows currency
- Appeals to companies building design systems and scalable architectures

---

## Notes

- LinkedIn allows up to 50 skills, but top 15 get 90% of visibility and endorsements
- Skills can be reordered by dragging in LinkedIn's edit interface
- Recruiters search using Boolean logic: "React" AND "TypeScript" - having both in top 10 is critical
- Endorsements compound: more endorsements = higher search ranking for that skill
- This ranking is optimized for frontend/React roles - adjust if pivoting to backend or management
- Update my-skills.md regularly to keep this ranking current
- Market data is from 58+ jobs as of 11/1/2025 - refresh quarterly for trend updates
- Tier 4 skills are strategic bets - include 1-2 to differentiate, but don't oversaturate
- Skills with endorsements are weighted higher in LinkedIn search - prioritize getting endorsements for Tier 1-2 skills first

