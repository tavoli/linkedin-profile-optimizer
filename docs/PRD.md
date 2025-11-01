# Product Requirements Document: LinkedIn Job Scraper Automation Tool

## Executive Summary

### Product Name
LinkedIn Job Description Aggregator (LJDA)

### Version
1.0.0

### Document Status
Initial Release

### Last Updated
November 2024

### Product Vision
A sophisticated, browser-based JavaScript automation tool that systematically extracts and aggregates job information from LinkedIn job listings, providing users with a one-click solution to collect comprehensive job data for research, analysis, or documentation purposes.

## Product Overview

### Problem Statement
Manually copying job descriptions from LinkedIn is time-consuming and error-prone, requiring users to:
- Click through dozens or hundreds of job listings individually
- Copy each description separately
- Format and organize the data manually
- Risk missing important information
- Spend hours on repetitive tasks

### Solution
A client-side JavaScript automation tool that:
- Runs entirely in the browser's developer console
- Automatically navigates through all job listings
- Extracts and aggregates job information systematically
- Provides one-click export of all collected data
- Maintains human-like behavior patterns to avoid detection

### Key Benefits
- **Time Savings**: Reduces hours of manual work to minutes
- **Completeness**: Captures all available job information systematically
- **Consistency**: Maintains uniform formatting across all entries
- **Flexibility**: Multiple export formats for different use cases
- **Simplicity**: Single console command execution

## Technical Architecture

### System Components

```javascript
// Core Module Structure
const LinkedInJobScraper = {
    // Configuration Management
    config: {
        maxJobs: 100,
        maxPages: 10,
        delayRange: [1500, 3500],
        formatOutput: 'markdown',
        antiDetection: true,
        autoSave: true,
        saveInterval: 10
    },
    
    // State Management
    state: {
        isRunning: false,
        isPaused: false,
        currentJob: 0,
        currentPage: 1,
        totalJobs: 0,
        startTime: null,
        errors: [],
        checkpoints: []
    },
    
    // Data Storage
    data: {
        metadata: {},
        jobs: [],
        aggregatedText: '',
        sessionId: null
    },
    
    // UI Components
    ui: {
        panel: null,
        progressBar: null,
        statusDisplay: null,
        controls: null,
        log: null
    },
    
    // Core Modules
    navigator: {},    // Handles page navigation
    extractor: {},    // Extracts job data
    aggregator: {},   // Aggregates and formats data
    exporter: {},     // Handles data export
    storage: {},      // Manages local storage
    antiDetect: {}    // Anti-detection measures
};
```

### DOM Selectors Reference

```javascript
const SELECTORS = {
    // Job Card Elements
    jobCard: '.job-card-container--clickable',
    jobCardActive: '.job-card-container--clickable.job-card-container--is-selected',
    
    // Job Details
    jobTitle: '.job-details-jobs-unified-top-card__job-title h1',
    companyName: '.job-details-jobs-unified-top-card__company-name',
    jobLocation: '.job-details-jobs-unified-top-card__bullet',
    jobDescription: '.jobs-description-content__text--stretch',
    postedTime: '.jobs-unified-top-card__posted-date',
    
    // Pagination
    paginationContainer: 'ul.jobs-search-pagination__pages',
    pageButtons: '.jobs-search-pagination__indicator-button',
    activePage: '.jobs-search-pagination__indicator-button--active',
    nextButton: 'button[aria-label="Next Page"]',
    
    // Additional Info
    jobInsights: '.jobs-unified-top-card__job-insight',
    applicationCount: '.jobs-unified-top-card__applicant-count',
    skillsMatch: '.jobs-unified-top-card__skills-match'
};
```

## Core Features

### 1. User Interface Component

#### Control Panel Design

```html
<!-- Fixed Position Control Panel -->
<div id="ljda-control-panel" style="
    position: fixed;
    top: 20px;
    right: 20px;
    width: 350px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 99999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
">
    <!-- Header -->
    <div class="ljda-header">
        <h3>LinkedIn Job Scraper</h3>
        <button class="ljda-minimize">_</button>
    </div>
    
    <!-- Status Display -->
    <div class="ljda-status">
        <div class="ljda-progress-text">Processing Job 15 of 125 (Page 2 of 5)</div>
        <div class="ljda-progress-bar">
            <div class="ljda-progress-fill" style="width: 12%"></div>
        </div>
        <div class="ljda-eta">Est. time remaining: 8 min</div>
    </div>
    
    <!-- Controls -->
    <div class="ljda-controls">
        <button class="ljda-btn ljda-start">▶ Start</button>
        <button class="ljda-btn ljda-pause">⏸ Pause</button>
        <button class="ljda-btn ljda-stop">⏹ Stop</button>
        <button class="ljda-btn ljda-settings">⚙ Settings</button>
    </div>
    
    <!-- Quick Stats -->
    <div class="ljda-stats">
        <span>Jobs: <strong>47</strong></span>
        <span>Errors: <strong>2</strong></span>
        <span>Time: <strong>5:32</strong></span>
    </div>
    
    <!-- Activity Log -->
    <div class="ljda-log">
        <div class="ljda-log-entry success">✓ Extracted: Senior Engineer</div>
        <div class="ljda-log-entry">→ Loading: Product Manager</div>
        <div class="ljda-log-entry warning">⚠ Retry: Data Analyst (1/3)</div>
    </div>
    
    <!-- Export Options -->
    <div class="ljda-export">
        <button class="ljda-btn ljda-copy-text">📋 Copy Text</button>
        <button class="ljda-btn ljda-copy-markdown">📝 Copy Markdown</button>
        <button class="ljda-btn ljda-copy-json">{ } Copy JSON</button>
        <button class="ljda-btn ljda-download">⬇ Download All</button>
    </div>
</div>
```

#### Settings Panel

```javascript
const settingsSchema = {
    general: {
        maxJobs: { type: 'number', default: 100, min: 1, max: 1000 },
        maxPages: { type: 'number', default: 10, min: 1, max: 50 },
        skipDuplicates: { type: 'boolean', default: true },
        autoStart: { type: 'boolean', default: false }
    },
    timing: {
        minDelay: { type: 'number', default: 1500, min: 500 },
        maxDelay: { type: 'number', default: 3500, max: 10000 },
        pageDelay: { type: 'number', default: 4000 },
        coffeeBreakInterval: { type: 'number', default: 30 },
        coffeeBreakDuration: { type: 'number', default: 10000 }
    },
    extraction: {
        includeCompanyInfo: { type: 'boolean', default: true },
        includeLocation: { type: 'boolean', default: true },
        includePostedDate: { type: 'boolean', default: true },
        includeApplicationCount: { type: 'boolean', default: false },
        includeSkillsMatch: { type: 'boolean', default: false }
    },
    output: {
        format: { type: 'select', options: ['plain', 'markdown', 'json', 'csv'], default: 'markdown' },
        includeMetadata: { type: 'boolean', default: true },
        includeTimestamps: { type: 'boolean', default: true },
        separatorStyle: { type: 'select', options: ['dashes', 'equals', 'stars'], default: 'equals' }
    },
    advanced: {
        antiDetection: { type: 'boolean', default: true },
        randomizeActions: { type: 'boolean', default: true },
        simulateMouseMovements: { type: 'boolean', default: false },
        autoSave: { type: 'boolean', default: true },
        saveInterval: { type: 'number', default: 10 },
        debugMode: { type: 'boolean', default: false }
    }
};
```

### 2. Automation Engine

#### Navigation Controller

```javascript
class NavigationController {
    constructor(config) {
        this.config = config;
        this.currentPage = 1;
        this.currentJobIndex = 0;
        this.jobsOnPage = [];
    }
    
    async initialize() {
        // Scan current page structure
        this.jobsOnPage = document.querySelectorAll(SELECTORS.jobCard);
        this.totalPages = this.detectTotalPages();
        this.totalJobsEstimate = this.estimateTotalJobs();
        
        return {
            jobsOnCurrentPage: this.jobsOnPage.length,
            totalPages: this.totalPages,
            estimatedTotal: this.totalJobsEstimate
        };
    }
    
    async navigateToJob(index) {
        const jobCard = this.jobsOnPage[index];
        if (!jobCard) return null;
        
        // Simulate human-like scrolling
        await this.smoothScrollTo(jobCard);
        await this.randomDelay();
        
        // Click with random offset
        await this.simulateClick(jobCard);
        
        // Wait for content to load
        await this.waitForJobDetails();
        
        return true;
    }
    
    async navigateToNextPage() {
        const nextButton = document.querySelector(SELECTORS.nextButton);
        if (!nextButton || nextButton.disabled) return false;
        
        // Long pause between pages
        await this.delay(this.config.pageDelay);
        
        // Click next page
        await this.simulateClick(nextButton);
        
        // Wait for new jobs to load
        await this.waitForPageLoad();
        
        // Refresh job list
        this.jobsOnPage = document.querySelectorAll(SELECTORS.jobCard);
        this.currentJobIndex = 0;
        this.currentPage++;
        
        return true;
    }
    
    async smoothScrollTo(element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop - 100;
        
        // Simulate human-like scrolling
        const duration = 500 + Math.random() * 500;
        const start = performance.now();
        const startY = scrollTop;
        
        const scroll = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const easing = 1 - Math.pow(1 - progress, 3); // Cubic easing
            
            window.scrollTo(0, startY + (targetY - startY) * easing);
            
            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };
        
        requestAnimationFrame(scroll);
        await this.delay(duration);
    }
    
    simulateClick(element) {
        // Random position within element
        const rect = element.getBoundingClientRect();
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        
        // Create and dispatch mouse events
        const mousedown = new MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y
        });
        
        const mouseup = new MouseEvent('mouseup', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y
        });
        
        const click = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y
        });
        
        element.dispatchEvent(mousedown);
        setTimeout(() => element.dispatchEvent(mouseup), 50 + Math.random() * 100);
        setTimeout(() => element.dispatchEvent(click), 100 + Math.random() * 100);
    }
    
    waitForJobDetails(timeout = 5000) {
        return new Promise((resolve) => {
            const observer = new MutationObserver((mutations, obs) => {
                const jobTitle = document.querySelector(SELECTORS.jobTitle);
                const jobDescription = document.querySelector(SELECTORS.jobDescription);
                
                if (jobTitle && jobDescription) {
                    obs.disconnect();
                    resolve(true);
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            // Timeout fallback
            setTimeout(() => {
                observer.disconnect();
                resolve(false);
            }, timeout);
        });
    }
    
    randomDelay() {
        const min = this.config.timing.minDelay;
        const max = this.config.timing.maxDelay;
        const delay = min + Math.random() * (max - min);
        return this.delay(delay);
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
```

#### Data Extractor

```javascript
class DataExtractor {
    constructor(config) {
        this.config = config;
        this.extractionAttempts = {};
    }
    
    async extractJobData(jobIndex) {
        try {
            // Wait for elements to be ready
            await this.waitForElements();
            
            // Extract core information
            const jobData = {
                index: jobIndex,
                title: this.extractText(SELECTORS.jobTitle),
                company: this.extractText(SELECTORS.companyName),
                location: this.extractText(SELECTORS.jobLocation),
                description: this.extractJobDescription(),
                timestamp: new Date().toISOString(),
                pageNumber: Math.ceil(jobIndex / 25) // Assuming 25 jobs per page
            };
            
            // Extract optional information based on config
            if (this.config.extraction.includePostedDate) {
                jobData.postedDate = this.extractText(SELECTORS.postedTime);
            }
            
            if (this.config.extraction.includeApplicationCount) {
                jobData.applicationCount = this.extractText(SELECTORS.applicationCount);
            }
            
            if (this.config.extraction.includeSkillsMatch) {
                jobData.skillsMatch = this.extractText(SELECTORS.skillsMatch);
            }
            
            // Extract additional insights
            jobData.insights = this.extractInsights();
            
            // Validate extracted data
            if (!this.validateJobData(jobData)) {
                throw new Error('Invalid job data extracted');
            }
            
            return jobData;
            
        } catch (error) {
            return this.handleExtractionError(jobIndex, error);
        }
    }
    
    extractJobDescription() {
        const descElement = document.querySelector(SELECTORS.jobDescription);
        if (!descElement) return null;
        
        // Clone to preserve original
        const clone = descElement.cloneNode(true);
        
        // Remove script tags and unwanted elements
        clone.querySelectorAll('script, style, .jobs-description__see-more').forEach(el => el.remove());
        
        // Extract text while preserving some structure
        const lines = [];
        const walker = document.createTreeWalker(
            clone,
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent.trim();
                if (text) lines.push(text);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (['BR', 'P', 'DIV', 'LI'].includes(node.tagName)) {
                    lines.push('\n');
                }
            }
        }
        
        return lines.join(' ').replace(/\s+/g, ' ').trim();
    }
    
    extractInsights() {
        const insights = [];
        const insightElements = document.querySelectorAll(SELECTORS.jobInsights);
        
        insightElements.forEach(el => {
            const text = el.textContent.trim();
            if (text) insights.push(text);
        });
        
        return insights;
    }
    
    extractText(selector) {
        const element = document.querySelector(selector);
        return element ? element.textContent.trim() : null;
    }
    
    validateJobData(jobData) {
        // Must have at least title and description
        return jobData.title && jobData.description;
    }
    
    async handleExtractionError(jobIndex, error) {
        const attempts = this.extractionAttempts[jobIndex] || 0;
        
        if (attempts < 3) {
            // Retry with exponential backoff
            this.extractionAttempts[jobIndex] = attempts + 1;
            await this.delay(Math.pow(2, attempts) * 1000);
            return this.extractJobData(jobIndex);
        }
        
        // Mark as failed after max retries
        return {
            index: jobIndex,
            error: true,
            errorMessage: error.message,
            timestamp: new Date().toISOString()
        };
    }
    
    waitForElements(timeout = 3000) {
        return new Promise((resolve) => {
            const checkElements = () => {
                const title = document.querySelector(SELECTORS.jobTitle);
                const description = document.querySelector(SELECTORS.jobDescription);
                
                if (title && description) {
                    resolve(true);
                    return;
                }
                
                timeout -= 100;
                if (timeout > 0) {
                    setTimeout(checkElements, 100);
                } else {
                    resolve(false);
                }
            };
            
            checkElements();
        });
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
```

### 3. Data Aggregation System

#### Aggregator Module

```javascript
class DataAggregator {
    constructor(config) {
        this.config = config;
        this.jobs = [];
        this.metadata = {};
        this.duplicateCheck = new Set();
    }
    
    initialize() {
        this.metadata = {
            searchQuery: this.extractSearchQuery(),
            location: this.extractLocationFilter(),
            collectionDate: new Date().toISOString(),
            totalJobs: 0,
            successfulExtractions: 0,
            failedExtractions: 0,
            duplicatesSkipped: 0,
            timeElapsed: 0,
            version: '1.0.0'
        };
    }
    
    addJob(jobData) {
        // Check for duplicates
        const jobKey = `${jobData.title}_${jobData.company}`.toLowerCase();
        
        if (this.config.skipDuplicates && this.duplicateCheck.has(jobKey)) {
            this.metadata.duplicatesSkipped++;
            return false;
        }
        
        // Add to collection
        this.jobs.push(jobData);
        this.duplicateCheck.add(jobKey);
        
        // Update metadata
        this.metadata.totalJobs++;
        if (jobData.error) {
            this.metadata.failedExtractions++;
        } else {
            this.metadata.successfulExtractions++;
        }
        
        return true;
    }
    
    generateAggregatedText() {
        const format = this.config.output.format;
        
        switch (format) {
            case 'plain':
                return this.formatPlainText();
            case 'markdown':
                return this.formatMarkdown();
            case 'json':
                return this.formatJSON();
            case 'csv':
                return this.formatCSV();
            default:
                return this.formatPlainText();
        }
    }
    
    formatPlainText() {
        let output = [];
        
        // Header
        output.push('LinkedIn Job Search Results');
        output.push('='.repeat(50));
        output.push(`Collected: ${new Date().toLocaleString()}`);
        output.push(`Total Jobs: ${this.metadata.totalJobs}`);
        output.push(`Successful: ${this.metadata.successfulExtractions}`);
        output.push(`Failed: ${this.metadata.failedExtractions}`);
        output.push('='.repeat(50));
        output.push('');
        
        // Jobs
        this.jobs.forEach((job, index) => {
            if (job.error) {
                output.push(`JOB #${index + 1} - EXTRACTION FAILED`);
                output.push(`Error: ${job.errorMessage}`);
            } else {
                output.push(`${'='.repeat(20)} JOB #${index + 1} ${'='.repeat(20)}`);
                output.push(`Title: ${job.title}`);
                output.push(`Company: ${job.company}`);
                output.push(`Location: ${job.location || 'Not specified'}`);
                if (job.postedDate) output.push(`Posted: ${job.postedDate}`);
                output.push('');
                output.push('DESCRIPTION:');
                output.push(job.description);
            }
            output.push('');
            output.push('');
        });
        
        return output.join('\n');
    }
    
    formatMarkdown() {
        let output = [];
        
        // Header
        output.push('# LinkedIn Job Search Results');
        output.push('');
        output.push('## Metadata');
        output.push(`- **Collected**: ${new Date().toLocaleString()}`);
        output.push(`- **Search Query**: ${this.metadata.searchQuery || 'Not specified'}`);
        output.push(`- **Location**: ${this.metadata.location || 'All locations'}`);
        output.push(`- **Total Jobs**: ${this.metadata.totalJobs}`);
        output.push(`- **Successful**: ${this.metadata.successfulExtractions}`);
        output.push(`- **Failed**: ${this.metadata.failedExtractions}`);
        output.push('');
        output.push('---');
        output.push('');
        
        // Jobs
        this.jobs.forEach((job, index) => {
            if (job.error) {
                output.push(`## Job #${index + 1} - ❌ Extraction Failed`);
                output.push(`> Error: ${job.errorMessage}`);
            } else {
                output.push(`## Job #${index + 1}: ${job.title}`);
                output.push('');
                output.push(`**Company**: ${job.company}`  );
                output.push(`**Location**: ${job.location || 'Not specified'}`);
                if (job.postedDate) output.push(`**Posted**: ${job.postedDate}`);
                if (job.applicationCount) output.push(`**Applications**: ${job.applicationCount}`);
                output.push('');
                output.push('### Description');
                output.push('');
                output.push(job.description);
                
                if (job.insights && job.insights.length > 0) {
                    output.push('');
                    output.push('### Insights');
                    job.insights.forEach(insight => {
                        output.push(`- ${insight}`);
                    });
                }
            }
            output.push('');
            output.push('---');
            output.push('');
        });
        
        return output.join('\n');
    }
    
    formatJSON() {
        return JSON.stringify({
            metadata: this.metadata,
            jobs: this.jobs
        }, null, 2);
    }
    
    formatCSV() {
        const headers = [
            'Index',
            'Title',
            'Company', 
            'Location',
            'Posted Date',
            'Application Count',
            'Description (First 500 chars)'
        ];
        
        const rows = [headers.join('\t')];
        
        this.jobs.forEach((job, index) => {
            if (!job.error) {
                const row = [
                    index + 1,
                    this.escapeCSV(job.title),
                    this.escapeCSV(job.company),
                    this.escapeCSV(job.location || ''),
                    this.escapeCSV(job.postedDate || ''),
                    this.escapeCSV(job.applicationCount || ''),
                    this.escapeCSV((job.description || '').substring(0, 500))
                ];
                rows.push(row.join('\t'));
            }
        });
        
        return rows.join('\n');
    }
    
    escapeCSV(text) {
        if (!text) return '';
        // Escape quotes and wrap in quotes if contains tab, newline, or comma
        text = text.replace(/"/g, '""');
        if (text.includes('\t') || text.includes('\n') || text.includes(',')) {
            text = `"${text}"`;
        }
        return text;
    }
    
    extractSearchQuery() {
        // Try to extract from URL or page
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('keywords') || document.querySelector('.jobs-search-box__text-input')?.value || null;
    }
    
    extractLocationFilter() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('location') || document.querySelector('.jobs-search-box__location-input')?.value || null;
    }
}
```

### 4. Export & Storage System

#### Export Manager

```javascript
class ExportManager {
    constructor(aggregator) {
        this.aggregator = aggregator;
    }
    
    async copyToClipboard(format = 'markdown') {
        const text = this.aggregator.generateAggregatedText(format);
        
        try {
            // Modern clipboard API
            await navigator.clipboard.writeText(text);
            return { success: true, message: 'Copied to clipboard!' };
        } catch (err) {
            // Fallback method
            return this.fallbackCopy(text);
        }
    }
    
    fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return { success: true, message: 'Copied to clipboard!' };
        } catch (err) {
            document.body.removeChild(textarea);
            return { success: false, message: 'Failed to copy. Please try again.' };
        }
    }
    
    downloadAsFile(filename = 'linkedin_jobs', format = 'txt') {
        const text = this.aggregator.generateAggregatedText(format);
        const blob = new Blob([text], { type: this.getMimeType(format) });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}_${new Date().getTime()}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }
    
    getMimeType(format) {
        const mimeTypes = {
            'txt': 'text/plain',
            'md': 'text/markdown',
            'json': 'application/json',
            'csv': 'text/csv'
        };
        return mimeTypes[format] || 'text/plain';
    }
}
```

#### Session Storage

```javascript
class SessionStorage {
    constructor() {
        this.storageKey = 'ljda_session';
        this.checkpointKey = 'ljda_checkpoint';
    }
    
    saveSession(data) {
        try {
            const session = {
                id: data.sessionId || this.generateSessionId(),
                timestamp: new Date().toISOString(),
                metadata: data.metadata,
                jobs: data.jobs,
                config: data.config,
                state: data.state
            };
            
            localStorage.setItem(this.storageKey, JSON.stringify(session));
            return true;
        } catch (error) {
            console.error('Failed to save session:', error);
            return false;
        }
    }
    
    loadSession() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return null;
            
            const session = JSON.parse(stored);
            
            // Check if session is recent (within 24 hours)
            const sessionDate = new Date(session.timestamp);
            const now = new Date();
            const hoursDiff = (now - sessionDate) / (1000 * 60 * 60);
            
            if (hoursDiff > 24) {
                this.clearSession();
                return null;
            }
            
            return session;
        } catch (error) {
            console.error('Failed to load session:', error);
            return null;
        }
    }
    
    saveCheckpoint(data) {
        try {
            const checkpoint = {
                timestamp: new Date().toISOString(),
                lastJobIndex: data.lastJobIndex,
                lastPageNumber: data.lastPageNumber,
                jobsCollected: data.jobs.length,
                jobs: data.jobs.slice(-10) // Save last 10 jobs
            };
            
            localStorage.setItem(this.checkpointKey, JSON.stringify(checkpoint));
            return true;
        } catch (error) {
            console.error('Failed to save checkpoint:', error);
            return false;
        }
    }
    
    loadCheckpoint() {
        try {
            const stored = localStorage.getItem(this.checkpointKey);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Failed to load checkpoint:', error);
            return null;
        }
    }
    
    clearSession() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.checkpointKey);
    }
    
    generateSessionId() {
        return `ljda_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}
```

### 5. Anti-Detection System

```javascript
class AntiDetectionModule {
    constructor(config) {
        this.config = config;
        this.actionCount = 0;
        this.lastActionTime = Date.now();
    }
    
    async beforeAction() {
        if (!this.config.antiDetection) return;
        
        // Implement variable delays
        await this.humanDelay();
        
        // Coffee break logic
        if (this.shouldTakeCoffeeBreak()) {
            await this.takeCoffeeBreak();
        }
        
        // Random mouse movement (optional)
        if (this.config.simulateMouseMovements) {
            this.simulateMouseMovement();
        }
        
        this.actionCount++;
        this.lastActionTime = Date.now();
    }
    
    async humanDelay() {
        // Base delay with randomization
        const baseDelay = this.config.timing.minDelay;
        const variance = this.config.timing.maxDelay - baseDelay;
        
        // Add fatigue factor (slower over time)
        const fatigueFactor = 1 + (this.actionCount / 100) * 0.5;
        
        // Random delay with normal distribution
        const randomFactor = this.gaussianRandom();
        const delay = baseDelay + (variance * randomFactor) * fatigueFactor;
        
        await this.sleep(delay);
    }
    
    shouldTakeCoffeeBreak() {
        return this.actionCount > 0 && 
               this.actionCount % this.config.timing.coffeeBreakInterval === 0;
    }
    
    async takeCoffeeBreak() {
        const duration = this.config.timing.coffeeBreakDuration;
        const variance = duration * 0.3;
        const actualDuration = duration + (Math.random() - 0.5) * variance;
        
        // Update UI to show coffee break
        this.updateStatus('Taking a break to avoid detection...');
        
        await this.sleep(actualDuration);
    }
    
    simulateMouseMovement() {
        // Create invisible div to track mouse
        const mouseTracker = document.createElement('div');
        mouseTracker.style.position = 'fixed';
        mouseTracker.style.width = '1px';
        mouseTracker.style.height = '1px';
        mouseTracker.style.pointerEvents = 'none';
        mouseTracker.style.zIndex = '99999';
        document.body.appendChild(mouseTracker);
        
        // Simulate smooth mouse movement
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * window.innerHeight;
        
        const steps = 20;
        let step = 0;
        
        const moveInterval = setInterval(() => {
            const progress = step / steps;
            const x = startX + (endX - startX) * progress;
            const y = startY + (endY - startY) * progress;
            
            mouseTracker.style.left = x + 'px';
            mouseTracker.style.top = y + 'px';
            
            // Dispatch mouse move event
            const event = new MouseEvent('mousemove', {
                clientX: x,
                clientY: y,
                bubbles: true
            });
            document.dispatchEvent(event);
            
            step++;
            if (step > steps) {
                clearInterval(moveInterval);
                document.body.removeChild(mouseTracker);
            }
        }, 50);
    }
    
    gaussianRandom() {
        // Box-Muller transform for normal distribution
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return (num + 3) / 6; // Normalize to 0-1
    }
    
    detectRateLimiting() {
        // Check for rate limiting indicators
        const errorMessages = [
            'too many requests',
            'rate limit',
            'slow down',
            'try again later'
        ];
        
        const pageContent = document.body.textContent.toLowerCase();
        return errorMessages.some(msg => pageContent.includes(msg));
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    updateStatus(message) {
        // Update UI status display
        const statusEl = document.querySelector('.ljda-status-message');
        if (statusEl) statusEl.textContent = message;
    }
}
```

## Main Application Controller

```javascript
class LinkedInJobScraperApp {
    constructor() {
        this.config = this.loadConfig();
        this.navigator = new NavigationController(this.config);
        this.extractor = new DataExtractor(this.config);
        this.aggregator = new DataAggregator(this.config);
        this.exporter = new ExportManager(this.aggregator);
        this.storage = new SessionStorage();
        this.antiDetect = new AntiDetectionModule(this.config);
        this.ui = new UIManager(this);
        
        this.state = {
            isRunning: false,
            isPaused: false,
            currentJob: 0,
            totalJobs: 0,
            startTime: null,
            errors: []
        };
    }
    
    async initialize() {
        // Check for existing session
        const existingSession = this.storage.loadSession();
        if (existingSession) {
            const resume = await this.ui.promptResumeSession();
            if (resume) {
                this.restoreSession(existingSession);
            }
        }
        
        // Initialize UI
        this.ui.create();
        
        // Initialize navigation
        const navInfo = await this.navigator.initialize();
        this.state.totalJobs = navInfo.estimatedTotal;
        
        // Initialize aggregator
        this.aggregator.initialize();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Auto-start if configured
        if (this.config.autoStart) {
            this.start();
        }
    }
    
    async start() {
        if (this.state.isRunning) return;
        
        this.state.isRunning = true;
        this.state.isPaused = false;
        this.state.startTime = Date.now();
        
        this.ui.updateStatus('Starting extraction...');
        
        try {
            await this.runExtractionLoop();
        } catch (error) {
            this.handleError(error);
        } finally {
            this.complete();
        }
    }
    
    async runExtractionLoop() {
        const maxJobs = Math.min(this.config.maxJobs, this.state.totalJobs);
        const maxPages = this.config.maxPages;
        let currentPage = 1;
        let jobsProcessed = 0;
        
        while (jobsProcessed < maxJobs && currentPage <= maxPages) {
            // Get jobs on current page
            const jobsOnPage = document.querySelectorAll(SELECTORS.jobCard);
            
            for (let i = 0; i < jobsOnPage.length && jobsProcessed < maxJobs; i++) {
                // Check if paused or stopped
                if (!this.state.isRunning) return;
                if (this.state.isPaused) {
                    await this.waitForResume();
                }
                
                // Anti-detection measures
                await this.antiDetect.beforeAction();
                
                // Navigate to job
                this.ui.updateProgress(jobsProcessed + 1, maxJobs, currentPage);
                await this.navigator.navigateToJob(i);
                
                // Extract data
                const jobData = await this.extractor.extractJobData(jobsProcessed + 1);
                
                // Add to aggregator
                this.aggregator.addJob(jobData);
                
                // Update UI
                this.ui.logActivity(jobData.error ? 'error' : 'success', 
                                   jobData.title || 'Unknown Job');
                
                jobsProcessed++;
                this.state.currentJob = jobsProcessed;
                
                // Auto-save checkpoint
                if (jobsProcessed % this.config.saveInterval === 0) {
                    this.saveCheckpoint();
                }
            }
            
            // Move to next page if needed
            if (jobsProcessed < maxJobs && currentPage < maxPages) {
                const hasNextPage = await this.navigator.navigateToNextPage();
                if (!hasNextPage) break;
                currentPage++;
            } else {
                break;
            }
        }
    }
    
    pause() {
        this.state.isPaused = true;
        this.ui.updateStatus('Paused');
    }
    
    resume() {
        this.state.isPaused = false;
        this.ui.updateStatus('Resuming...');
    }
    
    stop() {
        this.state.isRunning = false;
        this.state.isPaused = false;
        this.ui.updateStatus('Stopped');
    }
    
    async complete() {
        const timeElapsed = Date.now() - this.state.startTime;
        this.aggregator.metadata.timeElapsed = timeElapsed;
        
        // Save final session
        this.storage.saveSession({
            metadata: this.aggregator.metadata,
            jobs: this.aggregator.jobs,
            config: this.config,
            state: this.state
        });
        
        // Show completion summary
        this.ui.showCompletionSummary({
            totalJobs: this.aggregator.metadata.totalJobs,
            successful: this.aggregator.metadata.successfulExtractions,
            failed: this.aggregator.metadata.failedExtractions,
            timeElapsed: this.formatTime(timeElapsed),
            duplicates: this.aggregator.metadata.duplicatesSkipped
        });
        
        // Enable export buttons
        this.ui.enableExportButtons();
    }
    
    async copyText() {
        const result = await this.exporter.copyToClipboard('plain');
        this.ui.showNotification(result.message);
    }
    
    async copyMarkdown() {
        const result = await this.exporter.copyToClipboard('markdown');
        this.ui.showNotification(result.message);
    }
    
    async copyJSON() {
        const result = await this.exporter.copyToClipboard('json');
        this.ui.showNotification(result.message);
    }
    
    async downloadAll() {
        this.exporter.downloadAsFile('linkedin_jobs', 'txt');
        this.ui.showNotification('Download started');
    }
    
    saveCheckpoint() {
        this.storage.saveCheckpoint({
            lastJobIndex: this.state.currentJob,
            lastPageNumber: this.navigator.currentPage,
            jobs: this.aggregator.jobs
        });
    }
    
    restoreSession(session) {
        this.aggregator.jobs = session.jobs;
        this.aggregator.metadata = session.metadata;
        this.config = session.config;
        this.state = session.state;
    }
    
    waitForResume() {
        return new Promise(resolve => {
            const checkInterval = setInterval(() => {
                if (!this.state.isPaused) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        });
    }
    
    handleError(error) {
        console.error('Scraper error:', error);
        this.state.errors.push({
            timestamp: new Date().toISOString(),
            message: error.message,
            stack: error.stack
        });
        this.ui.showError(error.message);
    }
    
    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }
    
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.stop();
            } else if (e.key === ' ' && e.ctrlKey) {
                if (this.state.isPaused) {
                    this.resume();
                } else {
                    this.pause();
                }
            }
        });
        
        // Detect page navigation away
        window.addEventListener('beforeunload', (e) => {
            if (this.state.isRunning) {
                e.preventDefault();
                e.returnValue = 'Scraping in progress. Are you sure you want to leave?';
            }
        });
    }
    
    loadConfig() {
        // Load from localStorage or use defaults
        const stored = localStorage.getItem('ljda_config');
        if (stored) {
            return JSON.parse(stored);
        }
        
        return {
            maxJobs: 100,
            maxPages: 10,
            skipDuplicates: true,
            autoStart: false,
            timing: {
                minDelay: 1500,
                maxDelay: 3500,
                pageDelay: 4000,
                coffeeBreakInterval: 30,
                coffeeBreakDuration: 10000
            },
            extraction: {
                includeCompanyInfo: true,
                includeLocation: true,
                includePostedDate: true,
                includeApplicationCount: false,
                includeSkillsMatch: false
            },
            output: {
                format: 'markdown',
                includeMetadata: true,
                includeTimestamps: true,
                separatorStyle: 'equals'
            },
            antiDetection: true,
            simulateMouseMovements: false,
            autoSave: true,
            saveInterval: 10,
            debugMode: false
        };
    }
}

// Initialize and start the application
(function() {
    'use strict';
    
    // Check if we're on LinkedIn jobs page
    if (!window.location.href.includes('linkedin.com/jobs')) {
        console.error('This script must be run on LinkedIn Jobs pages');
        return;
    }
    
    // Prevent multiple instances
    if (window.LinkedInJobScraperInstance) {
        console.warn('LinkedIn Job Scraper is already running');
        return;
    }
    
    // Create and initialize application
    window.LinkedInJobScraperInstance = new LinkedInJobScraperApp();
    window.LinkedInJobScraperInstance.initialize().then(() => {
        console.log('LinkedIn Job Scraper initialized successfully');
    }).catch(error => {
        console.error('Failed to initialize LinkedIn Job Scraper:', error);
    });
})();
```

## Testing Strategy

### Test Scenarios

1. **Basic Functionality**
   - Single job extraction
   - Multi-page navigation
   - Complete 100-job extraction

2. **Error Handling**
   - Network failures
   - DOM structure changes
   - Rate limiting detection

3. **Performance Testing**
   - Memory usage monitoring
   - Large dataset handling (500+ jobs)
   - Browser resource consumption

4. **Anti-Detection Validation**
   - Pattern analysis
   - Timing consistency
   - Human-like behavior verification

## Risk Management

### Legal Considerations

```javascript
// Disclaimer to include in the tool
const LEGAL_DISCLAIMER = `
IMPORTANT LEGAL NOTICE:

This tool is provided for educational and research purposes only. By using this tool, you acknowledge and agree that:

1. You will comply with LinkedIn's Terms of Service and robots.txt
2. You will not use this tool for commercial purposes without authorization
3. You will respect rate limits and not overload LinkedIn's servers
4. You understand that excessive use may result in account restrictions
5. The developers are not responsible for any consequences of misuse

This tool should be used responsibly and ethically. Consider using LinkedIn's official API for commercial applications.

Do you accept these terms? (Type 'yes' to continue)
`;
```

### Technical Risks

1. **DOM Structure Changes**
   - Mitigation: Flexible selector system with fallbacks
   - Regular updates based on LinkedIn changes

2. **Rate Limiting**
   - Mitigation: Adaptive delays and coffee breaks
   - Detection and graceful handling

3. **Account Restrictions**
   - Mitigation: Human-like behavior patterns
   - Conservative default settings

## Deployment Instructions

### Installation

```javascript
// Minified version for easy console paste
// Copy the entire minified code and paste into browser console
// Full source available at: [repository URL]
```

### Configuration

Users can modify settings before starting:
```javascript
// Example: Modify settings before initialization
window.LJDA_CONFIG = {
    maxJobs: 50,
    maxPages: 5,
    timing: {
        minDelay: 2000,
        maxDelay: 5000
    }
};
```

## Support & Maintenance

### Known Issues
- May not work with LinkedIn's mobile view
- Some dynamic content may require longer wait times
- Premium job postings might have different selectors

### Troubleshooting Guide
1. **Script won't start**: Ensure you're on LinkedIn jobs search page
2. **No jobs extracted**: Check if selectors have changed
3. **Rate limiting**: Increase delays in configuration
4. **Memory issues**: Reduce batch size

### Update Schedule
- Weekly selector validation
- Monthly feature updates
- Immediate patches for critical issues

## Conclusion

This LinkedIn Job Scraper tool provides a comprehensive solution for automated job data extraction while maintaining a balance between efficiency and detection avoidance. The modular architecture allows for easy updates and customization, while the robust error handling ensures reliable operation even in challenging conditions.

## Appendices

### A. Complete Selector Reference
[Detailed list of all LinkedIn selectors]

### B. Configuration Schema
[Full JSON schema for configuration options]

### C. Error Codes Reference
[Complete list of error codes and meanings]

### D. Performance Metrics
[Benchmark results and optimization tips]

---

*End of Product Requirements Document*
