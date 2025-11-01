# LinkedIn Profile Optimizer

A comprehensive toolkit for optimizing your LinkedIn profile using AI-powered analysis of job market data and your professional experience. This project combines job market research with intelligent profile generation to help you stand out to recruiters.

## Features

### 🎯 LinkedIn Profile Optimization Commands

- **Profile Title Generator** (`/linkedin-title`) - Creates SEO-optimized LinkedIn titles based on your CV and market demand
- **About Section Generator** (`/linkedin-about`) - Generates compelling "About" sections optimized for recruiter engagement
- **Experience Optimizer** (`/linkedin-experiences`) - Analyzes and rewrites your experience entries to highlight impact
- **Skills Analyzer** (`/linkedin-top-skills`) - Prioritizes and ranks your skills based on market demand
- **Skills Comparison** (`/compare-skills`) - Compares your skills against available marketing/frontend jobs

### 📊 Job Market Intelligence

- Browser-based LinkedIn job scraper for data collection
- Market demand analysis for skills prioritization
- Real-time job listing aggregation
- Data-driven profile optimization recommendations

## Project Structure

```
linkedin-profile-optimizer/
├── .claude/
│   └── commands/          # AI-powered optimization commands
├── data/                  # Your professional data
│   ├── cv/               # Your CV files
│   ├── jobs/             # Scraped job listings
│   └── skills/           # Skills inventory
├── docs/                  # Documentation
├── output/                # Generated optimized content
└── scripts/               # Job scraping tools
    ├── linkedin-job-scraper.js
    └── settings-panel.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Claude Code CLI
- Access to LinkedIn (for job scraping)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tavoli/linkedin-profile-optimizer.git
cd linkedin-profile-optimizer
```

2. Install dependencies:
```bash
npm install
```

### Usage

#### Using Claude Code Commands

This project is designed to work with Claude Code. Use the following slash commands:

```bash
# Generate an optimized LinkedIn title
/linkedin-title

# Create a compelling About section
/linkedin-about

# Optimize your experience entries
/linkedin-experiences

# Get prioritized skills list
/linkedin-top-skills

# Compare your skills with job market
/compare-skills
```

#### Scraping Job Data

1. Open your browser's developer console on LinkedIn job search page
2. Load the job scraper script from `scripts/linkedin-job-scraper.js`
3. Use the settings panel to configure scraping parameters
4. Save collected data to `data/jobs/`

### Data Files

Place your professional information in the `data/` directory:

- `data/cv/` - Your resume/CV files
- `data/skills/my-skills.md` - Your skills inventory
- `data/jobs/` - LinkedIn job listings (JSON format)

## How It Works

1. **Data Collection**: Uses browser automation to scrape LinkedIn job listings
2. **Market Analysis**: Analyzes collected data to identify high-demand skills and keywords
3. **Profile Generation**: Uses AI to generate optimized profile content based on:
   - Your actual experience and skills
   - Market demand data
   - Recruiter search patterns
   - SEO best practices

## Skills Tier System

The optimizer uses a market-driven tier system based on job listing analysis:

- **Tier 1 - Critical Skills** (60%+ of jobs require)
- **Tier 2 - High Value Skills** (40-60% of jobs)
- **Tier 3 - Differentiators** (15-40% of jobs)
- **Tier 4 - Specialized/Emerging** (<15% of jobs)

## Output

Generated content is saved to the `output/` directory and automatically copied to your clipboard for easy pasting into LinkedIn.

## Development

### Build Scripts

```bash
# Minify the job scraper
npm run build

# Run tests
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

Built with Claude Code for automated LinkedIn profile optimization using real job market data.
