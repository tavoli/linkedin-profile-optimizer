# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LinkedIn Job Description Aggregator (LJDA)** - A browser-based JavaScript automation tool that extracts and aggregates job information from LinkedIn job listings. The tool runs entirely in the browser's developer console.

## Architecture

The application follows a modular architecture with the following core components:

### Core Modules

1. **NavigationController** - Handles page navigation and job card interactions
   - Manages smooth scrolling and human-like click simulation
   - Controls pagination and page transitions
   - Implements wait mechanisms for dynamic content loading

2. **DataExtractor** - Extracts job data from LinkedIn's DOM
   - Parses job title, company, location, description
   - Handles optional fields (posted date, application count, skills match)
   - Implements retry logic with exponential backoff

3. **DataAggregator** - Aggregates and formats extracted data
   - Manages duplicate detection
   - Generates output in multiple formats (plain text, markdown, JSON, CSV)
   - Tracks extraction metadata

4. **ExportManager** - Handles data export operations
   - Clipboard operations with fallback support
   - File download generation

5. **SessionStorage** - Manages persistence and checkpoints
   - Saves session data to localStorage
   - Implements checkpoint system for recovery
   - Session expiration (24 hours)

6. **AntiDetectionModule** - Implements human-like behavior patterns
   - Variable delays with Gaussian randomization
   - Coffee break intervals to avoid detection
   - Optional mouse movement simulation
   - Fatigue factor (slower actions over time)

7. **UIManager** - Manages the control panel interface
   - Real-time progress tracking
   - Activity logging
   - Export controls

8. **LinkedInJobScraperApp** - Main application controller
   - Orchestrates all modules
   - Manages application lifecycle
   - Handles state management

### State Management

The application maintains state in a centralized object:
- `isRunning`, `isPaused` - Control flags
- `currentJob`, `totalJobs` - Progress tracking
- `startTime` - Session timing
- `errors` - Error collection

### Configuration System

Configuration is stored in localStorage and includes:
- **General**: maxJobs, maxPages, skipDuplicates, autoStart
- **Timing**: minDelay, maxDelay, pageDelay, coffeeBreakInterval
- **Extraction**: toggles for optional fields
- **Output**: format selection, metadata options
- **Advanced**: antiDetection, simulateMouseMovements, autoSave

## DOM Selectors

LinkedIn DOM selectors are defined in a centralized `SELECTORS` object:
- Job card elements: `.job-card-container--clickable`
- Job details: `.job-details-jobs-unified-top-card__job-title h1`
- Company info: `.job-details-jobs-unified-top-card__company-name`
- Description: `.jobs-description-content__text--stretch`
- Pagination: `.jobs-search-pagination__indicator-button`

**Important**: LinkedIn may change their DOM structure. Selectors should be flexible with fallback mechanisms.

## Development Guidelines

### Anti-Detection Patterns

The tool implements several anti-detection measures:
- **Gaussian Random Delays**: Uses Box-Muller transform for natural timing variation
- **Fatigue Simulation**: Actions slow down over time (1 + actionCount/100 * 0.5)
- **Coffee Breaks**: Periodic pauses every N actions (default: 30)
- **Smooth Scrolling**: Cubic easing for natural scroll behavior
- **Random Click Positions**: Clicks at random positions within elements

### Error Handling

- **Retry Logic**: 3 attempts with exponential backoff (2^attempts * 1000ms)
- **Validation**: Job data must have at minimum title and description
- **Graceful Degradation**: Failed extractions are logged but don't stop the process
- **State Preservation**: Auto-save checkpoints every N jobs (default: 10)

### Memory Management

- **Checkpoint System**: Only saves last 10 jobs in checkpoint to reduce storage
- **Session Expiration**: Sessions expire after 24 hours
- **Large Datasets**: Consider memory consumption when processing 500+ jobs

## Code Organization

All code is contained in a single self-executing anonymous function (IIFE) to:
- Avoid global namespace pollution
- Prevent multiple instances
- Ensure clean initialization

## Testing Approach

When implementing or testing:
1. **Single Job Test**: Verify extraction works for one job
2. **Pagination Test**: Confirm multi-page navigation
3. **Error Scenarios**: Test with rate limiting, network failures, DOM changes
4. **Memory Profiling**: Monitor usage with large datasets
5. **Anti-Detection**: Validate timing patterns appear human-like

## Known Limitations

- Only works on LinkedIn desktop jobs pages (`linkedin.com/jobs`)
- May not work with LinkedIn mobile view
- Premium job postings might use different selectors
- Dynamic content requires MutationObserver with timeouts

## Legal and Ethical Considerations

This tool must include a legal disclaimer and:
- Respect LinkedIn's Terms of Service
- Implement conservative default timing (1500-3500ms delays)
- Not be used for commercial purposes without authorization
- Include rate limiting and detection avoidance as ethical guardrails

## Browser Console Deployment

The tool is designed to be:
1. Minified into a single paste-able console command
2. Executed on LinkedIn job search pages
3. Configured before or during runtime via settings panel

## Key Implementation Notes

- All async operations use Promises
- MutationObserver watches for dynamic content loading (5s timeout)
- Event delegation for UI controls
- Keyboard shortcuts: ESC to stop, Ctrl+Space to pause/resume
- beforeunload event warns if scraping in progress
