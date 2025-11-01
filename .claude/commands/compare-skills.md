---
description: Compare my skills against available marketing/frontend jobs
argument-hint: (no arguments needed)
---

Analyze my skills against the available frontend/React marketing jobs and show me ONLY the skills I'm missing.

**Instructions:**

1. Read my current skills from @data/personal/my-skills.md

2. Read the job listings from @data/market-data/frontend-react-jobs.md

3. Extract all unique technical skills from all job listings and identify which ones are MISSING from my-skills.md

4. Update the @data/skills-checker.html file with ONLY the missing skills sorted by frequency

5. Output ONLY missing skills in this simple format:

   ## 🔴 Missing Required Skills
   (sorted by frequency - learn these first!)
   - Skill name (X jobs need this)

   ## 🟡 Missing Preferred Skills
   (sorted by frequency - nice to have)
   - Skill name (X jobs want this)

   ## 📊 Quick Stats
   - Jobs you fully qualify for: X
   - Jobs you almost qualify for: X
   - Total jobs analyzed: X

6. **Important:**
   - Show ONLY skills that are NOT in my-skills.md
   - No duplicates
   - Higher frequency = higher priority
   - Keep it scannable - I need to quickly decide: "Do I know this (update my-skills.md) or should I study it?"

**After completing the analysis, remind the user:**
"📋 Next step: Open skills-checker.html in your browser, check the skills you already know, copy them, and paste here so I can update your my-skills.md file."
