---
description: Analyzes CV and LinkedIn experience entries to generate optimized, market-aligned versions that showcase impact while staying 100% truthful. Identifies missing roles and underemphasized achievements.
allowed-tools: Read, WebFetch, Bash
---

# Optimize LinkedIn Experience Entries

This command analyzes your existing experience entries from your CV and LinkedIn profile, then generates optimized versions that align with current job market language and expectations while maintaining complete truthfulness. It identifies gaps, suggests improvements, and provides copy-paste ready text for immediate LinkedIn updates.

## Core Principle: Truthful Optimization

**CRITICAL RULE:** This command NEVER fabricates experiences, metrics, or technologies.

- ✅ **DO:** Reframe existing achievements using market-aligned language
- ✅ **DO:** Highlight quantifiable metrics already in your CV
- ✅ **DO:** Emphasize business impact of technical work
- ✅ **DO:** Strengthen action verbs while staying truthful
- ❌ **DON'T:** Invent technologies you haven't used
- ❌ **DON'T:** Fabricate metrics or achievements
- ❌ **DON'T:** Exaggerate scope or responsibilities
- ❌ **DON'T:** Add projects that don't exist

**Philosophy:** Better storytelling, not inventing stories.

---

## Market-Driven Skill Tier System

Based on analysis of 31+ frontend job listings:

### Tier 1 - Critical Skills (60%+ of jobs require)
- React (100%), JavaScript (90%), TypeScript (87%), HTML (68%), CSS (68%)

### Tier 2 - High Value Skills (40-60% of jobs)
- Next.js (48%), Jest (45%), Git (45%), REST APIs (42%)

### Tier 3 - Differentiators (15-40% of jobs)
- React Testing Library (35%), Tailwind CSS (32%), Redux (29%), Cypress (26%), CI/CD (26%)

### Tier 4 - Emerging/Premium Skills (<15% but high-value)
- Design Systems (23%), Accessibility/WCAG (19%), AI/LLM Integration (6%), Microfrontends (3%)

---

## User Configuration

**HARDCODED PREFERENCES** (no questions asked):

### Role Focus & Filtering
- **Career Focus:** Frontend Developer (Individual Contributor)
- **Skip Roles:** Management roles (e.g., Tech Manager, Engineering Manager)
- **Domain Emphasis:** No specific domain (general frontend development)

**Behavior:**
- Focus optimization on frontend IC roles only
- Skip any management-focused positions
- Don't show skipped roles in output
- Optimize all relevant frontend engineering experiences

---

## Instructions

### Phase 1: Data Collection

**Step 1: Read CV (PRIMARY SOURCE OF TRUTH)**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/personal/cv.pdf`
- Extract ALL experience entries with:
  - Company names and roles
  - Employment dates
  - Responsibilities and achievements
  - Technologies used
  - Quantifiable metrics (numbers, percentages, timeframes)
  - Client names (enterprise clients add credibility)
  - Team size or scope indicators

**Step 2: Read Current LinkedIn Profile (BASELINE)**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/linkedin-profiles/current-profile.pdf`
- Extract ALL experience entries currently on LinkedIn
- Note formatting, language, and structure
- Identify what's already well-written vs what needs improvement

**Step 3: Read Reference Profile (FORMATTING PATTERNS)**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/linkedin-profiles/reference-profile.pdf`
- Study effective formatting patterns
- Note action verb usage
- Identify structure: opening context → bullet achievements → tech stack
- Observe how technical depth is presented

**Step 4: Read Skills File (TECHNOLOGY VALIDATION)**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/personal/my-skills.md`
- Validate technologies mentioned are actually in skill set
- Ensure no technologies are suggested that user doesn't know
- Cross-reference Tier 1-4 skills user possesses

**Step 5: Read Job Market Data**
- Location: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/data/market-data/frontend-react-jobs.md`
- Extract common language patterns from job postings
- Identify frequently used action verbs
- Note how responsibilities are typically described
- Find keywords that appear across multiple postings

---

### Phase 2: Gap Analysis & Scoring

**CRITICAL: Identify Missing Roles (Respecting User Preferences)**

Compare CV to LinkedIn:
- Are there any roles in CV that are MISSING from LinkedIn?
- Are there gaps in employment timeline?
- Are there leadership positions (Tech Lead, Manager) not listed?

**IMPORTANT - Handle Skipped Roles:**
- If user specified roles to SKIP (e.g., management roles when focusing on IC), do NOT flag as "missing"
- Instead, note them in a separate "Intentionally Excluded" section
- Explain why excluding makes sense for user's career narrative
- Example: "Tech Manager role (Jul 2022 - Feb 2023) intentionally excluded as user is targeting Frontend Developer IC roles, not management positions"

**For Each Experience Entry, Identify:**

1. **Missing Achievements:**
   - What's in CV but NOT in LinkedIn?
   - Are quantifiable metrics from CV absent on LinkedIn?
   - Are enterprise client names mentioned in CV but not LinkedIn?

2. **Undersold Accomplishments:**
   - Vague language that could be more specific
   - Missing business impact statements
   - Generic descriptions that could highlight complexity

3. **Language Gaps:**
   - Weak action verbs ("helped", "worked on", "assisted")
   - Missing market-relevant keywords
   - Overly technical without business context
   - Too brief when achievements warrant more detail

4. **Technology Emphasis:**
   - Are Tier 1-2 skills prominently featured?
   - Are cutting-edge technologies (Tier 4) highlighted when applicable?
   - Is tech mentioned in context or just listed?

**Market Alignment Scoring System (0-10 scale):**

For each experience entry, score on 5 components:

1. **Keyword Match (0-3 points):**
   - 0: No market keywords present
   - 1: Few keywords (<3 from job postings)
   - 2: Moderate keywords (3-5)
   - 3: Rich keywords (5+)

2. **Quantification (0-2 points):**
   - 0: No metrics or timeframes
   - 1: Vague quantifiers ("several", "many", "a few")
   - 2: Specific metrics ("5+ squads", "under 3 months", "98 Lighthouse score")

3. **Business Impact (0-2 points):**
   - 0: Only technical tasks described
   - 1: Implied business value
   - 2: Clear business outcomes ("drove revenue", "increased capacity", "reduced costs")

4. **Technical Depth (0-2 points):**
   - 0: Generic descriptions ("worked with React")
   - 1: Technology mentioned in context
   - 2: Specific techniques/patterns ("component-driven architecture", "real-time systems", "CI/CD pipelines")

5. **Action Verb Strength (0-1 point):**
   - 0: Weak verbs ("helped", "assisted", "worked on", "participated")
   - 1: Strong verbs ("architected", "led", "drove", "engineered", "delivered", "shipped")

**Total Score Interpretation:**
- **9-10**: Excellent - Market-ready, compelling
- **7-8**: Good - Competitive, minor improvements possible
- **5-6**: Fair - Missing key elements, needs optimization
- **3-4**: Poor - Significant gaps, urgent optimization needed
- **0-2**: Critical - Complete rewrite required

**Create Gap Analysis Table:**

| Experience | Current Score | Missing Elements | Optimization Priority | Target Score |
|-----------|---------------|------------------|----------------------|--------------|
| [Company] [Role] | X/10 | [List gaps] | Critical/High/Medium/Low | X/10 |

---

### Phase 3: Optimization Rules & Patterns

**Rule 1: Truthfulness Verification**

Before suggesting ANY change:
- ✅ Verify claim exists in CV or LinkedIn
- ✅ Ensure metric is accurate or reasonably inferred
- ✅ Confirm technology was actually used (check my-skills.md)
- ✅ Validate scope matches real responsibility
- ⚠️ Flag any assumptions or inferences clearly

**Rule 2: Market Language Mapping**

Map current terms → job posting terms (only if truthful):

**Action Verb Upgrades:**
- "collaborated" → "led" (IF CV shows ownership/leadership)
- "helped" → "drove" / "enabled" (IF impact is documented)
- "worked on" → "architected" / "engineered" (IF technical design involved)
- "created" → "architected" / "designed" / "built" (based on complexity)
- "improved" → "optimized" / "enhanced" / "accelerated"
- "made" → "developed" / "implemented" / "delivered"

**Industry-Standard Term Swaps:**
- "multidisciplinary" → "cross-functional"
- "teamwork" → "stakeholder collaboration"
- "made better" → "optimized" / "improved performance by X%"
- "several months" → "[specific number] months" (if CV has it)
- "many clients" → "X+ clients" / "enterprise clients" (if CV specifies)

**Adding Context (When True):**
- "developed app" → "developed production-scale app serving [X users/clients]"
- "used React" → "architected React application with [specific patterns/tools]"
- "fixed bugs" → "resolved critical production issues, improving stability by X%"

**Rule 3: Quantification Hierarchy**

Always prefer concrete numbers:

**Best (Concrete):**
- "5+ squads", "98 Lighthouse score", "under 3 months", "40% performance improvement"

**Good (Scale Indicators):**
- "enterprise clients", "production-scale", "real-time systems", "multi-squad"

**Acceptable (When No Numbers Available):**
- "significant", "substantial", "dramatic" (use sparingly, only when impact was truly large)

**Avoid:**
- "some", "a few", "several", "many" (too vague)

**Rule 4: Structure Optimization**

**Experience Entry Format:**

```
[Company Name]
[Role Title]
[Date Range]

[Opening Context - 1 sentence]:
Brief description of company/product/scope/clients

[Achievement Bullets]:
• [Strongest achievement with metric and business impact]
• [Technical achievement with complexity and outcome]
• [Innovation/improvement with quantified result]
• [Collaboration/leadership with scope]
• [Additional achievement if relevant]

[Optional - Technologies]:
Technologies: [Key tech stack - 4-8 items max, Tier 1-2 emphasized]
```

**Bullet Point Best Practices:**
- Lead with strong action verb
- Include what was built/done
- Mention key technology/methodology in context
- State the outcome or business benefit
- Aim for 1-2 lines on LinkedIn display (15-25 words)
- Most impactful achievements first

**Rule 5: Priority System for Optimizations**

**Priority 1 - CRITICAL (Fix Immediately):**
- Missing entire roles from CV
- Incorrect information
- Misleading scope or responsibilities

**Priority 2 - HIGH (Strongly Recommend):**
- Vague timeframes that could be specific (CV has exact timeline)
- Missing quantifiable metrics that exist in CV
- Enterprise client names not mentioned
- Weak action verbs that don't reflect actual ownership

**Priority 3 - MEDIUM (Should Improve):**
- Generic technical descriptions
- Missing business impact context
- Opportunities to highlight Tier 4 skills
- Formatting inconsistencies

**Priority 4 - LOW (Nice to Have):**
- Minor wording improvements
- Consistency in terminology
- Technology list formatting

---

### Phase 4: Optimization Examples & Templates

**Example 1: Timeline Quantification**

**BEFORE (Vague):**
> "Engineered and launched a new Progressive Web Application (PWA) for table ordering in a few months using React.js and TypeScript."

**AFTER (Specific):**
> "Engineered and launched a production-ready Progressive Web Application (PWA) for restaurant table ordering in under 3 months using React.js and TypeScript, featuring integrated payment processing, real-time order management, and responsive catalog interface that enhanced on-site service efficiency"

**Changes Made:**
1. ✅ "a few months" → "under 3 months" (from CV - more impressive)
2. ✅ Added "production-ready" (quality indicator)
3. ✅ Expanded feature description (payment, real-time, responsive)
4. ✅ Added outcome ("enhanced service efficiency")

**Truthfulness Check:** ✅ CV states "under 3 months"; features mentioned in LinkedIn summary

---

**Example 2: Business Impact Emphasis**

**BEFORE (Technical Focus Only):**
> "Increased revenue and team productivity by implementing granular text animation support, enabling clients like Santander to generate ads entirely within our software."

**AFTER (Business + Technical):**
> "Drove revenue growth and team productivity by architecting granular text animation system that enabled enterprise clients (Santander, Bradesco) to generate broadcast-ready advertisements entirely in-platform, eliminating third-party tool dependencies and reducing production turnaround time"

**Changes Made:**
1. ✅ "Increased" → "Drove" (more active leadership language)
2. ✅ "implementing" → "architecting" (shows systems thinking)
3. ✅ Added "Bradesco" (more enterprise clients = credibility)
4. ✅ "broadcast-ready" (quality dimension)
5. ✅ "reducing production turnaround time" (business metric)

**Truthfulness Check:** ✅ Bradesco mentioned in LinkedIn summary; all features real

---

**Example 3: Architecture Emphasis**

**BEFORE (Generic):**
> "Collaborated with companies like Grafeno Digital and Hep Solutions on multidisciplinary squads, successfully delivering new products from conception to launch (0 to 1)."

**AFTER (Technical Depth):**
> "Led frontend development for Grafeno Digital and Hep Solutions on cross-functional squads, architecting and shipping enterprise Business Intelligence and Financial Management platforms from 0-to-1 using React, TypeScript, and component-driven architecture that provided real-time insights and streamlined financial operations for end users"

**Changes Made:**
1. ✅ "Collaborated" → "Led frontend development" (ownership, even as IC)
2. ✅ "multidisciplinary" → "cross-functional" (industry term)
3. ✅ Specified platform types (BI, Financial Management)
4. ✅ Added "component-driven architecture" (modern pattern)
5. ✅ Added "real-time insights" (valuable feature)

**Truthfulness Check:** ✅ BI dashboards mentioned in next bullet; Storybook confirms component architecture

---

**Example 4: Performance Quantification**

**BEFORE (Qualitative):**
> "Created a PWA for TV show marketing that excelled in Lighthouse tests, nearly achieving 100 points, and provided a seamless user experience."

**AFTER (Quantitative):**
> "Architected and deployed a high-performance Progressive Web Application for TV show marketing campaigns that achieved 98+ Lighthouse score through aggressive optimization (code splitting, lazy loading, image optimization), delivering sub-second load times and seamless cross-device user experience that drove campaign engagement"

**Changes Made:**
1. ✅ "Created" → "Architected and deployed" (senior-level language)
2. ✅ "nearly achieving 100" → "98+ Lighthouse score" (specific number)
3. ✅ Listed optimization techniques (shows technical depth)
4. ✅ "sub-second load times" (concrete performance metric)
5. ✅ Connected to business outcome ("drove campaign engagement")

**Truthfulness Check:** ✅ LinkedIn says "nearly 100"; 98+ reasonable; PWA optimizations standard

---

### Phase 5: Output Format

**IMPORTANT:** Keep output MINIMAL - no verbose analysis, scoring, or explanations.

**Internal Processing (DO NOT SHOW IN OUTPUT):**
- Perform all gap analysis and scoring internally
- Validate technologies against my-skills.md
- Identify missing/undersold elements
- Calculate improvements
- **BUT DO NOT include any of this in the output file**

**Output Structure (SHOW ONLY THIS):**

```markdown
# LinkedIn Experiences - Optimized

---

## [Company Name] | [Role Title] | [Start Date - End Date]

[Optimized experience text - ready to copy-paste into LinkedIn]

[Opening context sentence]

• [Optimized bullet 1]
• [Optimized bullet 2]
• [Optimized bullet 3]
• [Optimized bullet 4]
• [Optimized bullet 5]

Technologies: [Tech stack]

---

## [Next Company] | [Next Role] | [Dates]

[Next optimized experience...]

---

[Repeat for all frontend IC experiences - skip management roles entirely]

```

**Output Requirements:**
- Clean, minimal headers: `Company | Role | Dates`
- No before/after comparisons
- No score breakdowns
- No "what changed" explanations
- No gap analysis tables
- No implementation guides
- No appendices
- Just the optimized text blocks, ready to copy-paste
- Total output: 2-3 pages maximum

**File Location:**
Save to: `/Users/gustavo.lima/MyProject/linkedin_job_scraper/output/linkedin_experiences_optimized.md`

---

## Validation Checklist (Internal - Don't Show)

Before generating output, ensure:
- ✅ All CV experiences extracted
- ✅ All LinkedIn experiences extracted
- ✅ Technologies validated against my-skills.md
- ✅ No fabricated information
- ✅ Metrics accurate or reasonably inferred
- ✅ Management roles skipped (not shown in output)
- ✅ Character counts within LinkedIn limits (2,000 chars/experience)
- ✅ Grammar and spelling perfect

**Remember:** Better storytelling, not inventing stories. Maintain 100% truthfulness.
