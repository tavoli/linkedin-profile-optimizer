/**
 * LinkedIn Job Description Aggregator (LJDA)
 * Version: 1.0.0
 *
 * A sophisticated browser-based automation tool for extracting LinkedIn job listings
 *
 * LEGAL DISCLAIMER:
 * This tool is provided for educational and research purposes only.
 * Use responsibly and in compliance with LinkedIn's Terms of Service.
 */

(function() {
    'use strict';

    // ========================================================================
    // CONFIGURATION & CONSTANTS
    // ========================================================================

    /**
     * DOM Selectors for LinkedIn job pages
     * These may need updates if LinkedIn changes their structure
     */
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
        nextButton: '.jobs-search-pagination__button--next',

        // Additional Info
        jobInsights: '.jobs-unified-top-card__job-insight',
        applicationCount: '.jobs-unified-top-card__applicant-count',
        skillsMatch: '.jobs-unified-top-card__skills-match',

        // Page Elements
        footer: '.global-footer-compact__content'
    };

    /**
     * Default configuration settings
     */
    const DEFAULT_CONFIG = {
        maxJobs: 9999,  // Effectively unlimited (as-we-go approach)
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

    const LEGAL_DISCLAIMER = `
╔════════════════════════════════════════════════════════════════════╗
║                     IMPORTANT LEGAL NOTICE                         ║
╚════════════════════════════════════════════════════════════════════╝

This tool is provided for educational and research purposes only.

By using this tool, you acknowledge and agree that:

1. You will comply with LinkedIn's Terms of Service and robots.txt
2. You will not use this tool for commercial purposes without authorization
3. You will respect rate limits and not overload LinkedIn's servers
4. You understand that excessive use may result in account restrictions
5. The developers are not responsible for any consequences of misuse

This tool should be used responsibly and ethically. Consider using
LinkedIn's official API for commercial applications.

Type 'window.LJDA_ACCEPT_TERMS = true' and re-run to continue.
    `;

    // ========================================================================
    // NAVIGATION CONTROLLER
    // ========================================================================

    /**
     * Handles page navigation and job card interactions
     */
    class NavigationController {
        constructor(config) {
            this.config = config;
            this.currentPage = 1;
            this.currentJobIndex = 0;
            this.jobsOnPage = [];
        }

        /**
         * Initialize navigation by scanning current page
         */
        async initialize() {
            this.jobsOnPage = Array.from(document.querySelectorAll(SELECTORS.jobCard));
            this.totalPages = this.detectTotalPages();
            this.totalJobsEstimate = this.estimateTotalJobs();

            return {
                jobsOnCurrentPage: this.jobsOnPage.length,
                totalPages: this.totalPages,
                estimatedTotal: this.totalJobsEstimate
            };
        }

        /**
         * Generate unique identifier for a job card element
         * Used to track which cards have been processed
         */
        getCardIdentifier(cardElement) {
            // Try LinkedIn data attribute
            const jobId = cardElement.getAttribute('data-job-id') ||
                          cardElement.getAttribute('data-occludable-job-id') ||
                          cardElement.getAttribute('data-entity-urn');

            if (jobId) return `id_${jobId}`;

            // Try extracting from link href
            const link = cardElement.querySelector('a[href*="/jobs/view/"]');
            if (link && link.href) {
                const match = link.href.match(/\/jobs\/view\/(\d+)/);
                if (match) return `view_${match[1]}`;
            }

            // Fallback: Composite key from visible content
            const titleEl = cardElement.querySelector('.job-card-list__title, .job-card-container__link');
            const companyEl = cardElement.querySelector('.job-card-container__company-name, .artdeco-entity-lockup__subtitle');

            if (titleEl && companyEl) {
                const title = titleEl.textContent.trim().substring(0, 50);
                const company = companyEl.textContent.trim().substring(0, 30);
                return `${title}_${company}`.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
            }

            // Last resort: DOM position
            const siblings = Array.from(cardElement.parentNode?.children || []);
            return `pos_${siblings.indexOf(cardElement)}`;
        }

        /**
         * Navigate to a specific job card element (click-as-we-go approach)
         */
        async navigateToJobCard(cardElement) {
            if (!cardElement || !cardElement.isConnected) {
                console.warn('Card element no longer in DOM');
                return false;
            }

            // Simulate human-like scrolling
            await this.smoothScrollTo(cardElement);
            await this.delay(800 + Math.random() * 400);

            // Click with random offset
            await this.simulateClick(cardElement);

            // Wait for content to load
            const loaded = await this.waitForJobDetails();

            return loaded;
        }

        /**
         * @deprecated Use navigateToJobCard() instead
         * Navigate to a specific job by index on current page
         */
        async navigateToJob(index) {
            const jobCard = this.jobsOnPage[index];
            if (!jobCard) return null;
            return await this.navigateToJobCard(jobCard);
        }

        /**
         * Ensure all job cards are loaded by scrolling to next page button
         * This activates lazy-loaded cards in LinkedIn's DOM
         */
        async ensureAllCardsLoaded() {
            // Scroll to next page button to activate all lazy-loaded cards
            const nextButton = document.querySelector('[aria-label="View next page"]');
            if (nextButton) {
                nextButton.scrollIntoView();
                // Wait for lazy loading to complete
                await this.delay(1000 + Math.random() * 500);
            }

            // Scroll back to first job card for consistent positioning
            const firstJobCard = document.querySelector(SELECTORS.jobCard);
            if (firstJobCard) {
                firstJobCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                await this.delay(500);
            }

            // Return fresh card count
            const cards = Array.from(document.querySelectorAll(SELECTORS.jobCard));
            return cards.length;
        }

        /**
         * Navigate to next page
         */
        async navigateToNextPage() {
            const nextButton = document.querySelector(SELECTORS.nextButton);
            if (!nextButton || nextButton.disabled) return false;

            // Long pause between pages
            await this.delay(this.config.timing.pageDelay);

            // Click next page
            await this.simulateClick(nextButton);

            // Wait for new jobs to load
            await this.waitForPageLoad();

            // Refresh job list
            this.jobsOnPage = Array.from(document.querySelectorAll(SELECTORS.jobCard));
            this.currentJobIndex = 0;
            this.currentPage++;

            return true;
        }

        /**
         * Smooth scroll to element with cubic easing
         */
        async smoothScrollTo(element) {
            // First, ensure the element is visible using scrollIntoView
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Wait for smooth scroll to complete
            await this.delay(300);

            // Then do our custom scroll for more control
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = rect.top + scrollTop - 150; // More offset for better visibility

            const duration = 500 + Math.random() * 500;
            const start = performance.now();
            const startY = scrollTop;

            return new Promise(resolve => {
                const scroll = (now) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const easing = 1 - Math.pow(1 - progress, 3); // Cubic easing

                    window.scrollTo(0, startY + (targetY - startY) * easing);

                    if (progress < 1) {
                        requestAnimationFrame(scroll);
                    } else {
                        resolve();
                    }
                };

                requestAnimationFrame(scroll);
            });
        }

        /**
         * Simulate human-like click with random position
         */
        async simulateClick(element) {
            const rect = element.getBoundingClientRect();
            const x = rect.left + rect.width * (0.3 + Math.random() * 0.4);
            const y = rect.top + rect.height * (0.3 + Math.random() * 0.4);

            // Create mouse events
            const events = ['mousedown', 'mouseup', 'click'];

            for (const eventType of events) {
                const event = new MouseEvent(eventType, {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: x,
                    clientY: y
                });

                element.dispatchEvent(event);

                if (eventType !== 'click') {
                    await this.delay(50 + Math.random() * 100);
                }
            }
        }

        /**
         * Wait for job details to load using MutationObserver
         */
        waitForJobDetails(timeout = 10000) {
            return new Promise((resolve) => {
                const startTime = Date.now();

                const checkElements = () => {
                    const jobTitle = document.querySelector(SELECTORS.jobTitle);
                    const jobDescription = document.querySelector(SELECTORS.jobDescription);

                    if (jobTitle && jobDescription) {
                        resolve(true);
                        return;
                    }

                    if (Date.now() - startTime > timeout) {
                        resolve(false);
                        return;
                    }

                    setTimeout(checkElements, 100);
                };

                checkElements();
            });
        }

        /**
         * Wait for page to load after navigation
         */
        waitForPageLoad(timeout = 5000) {
            return new Promise((resolve) => {
                const startTime = Date.now();

                const checkLoaded = () => {
                    const jobCards = document.querySelectorAll(SELECTORS.jobCard);

                    if (jobCards.length > 0) {
                        resolve(true);
                        return;
                    }

                    if (Date.now() - startTime > timeout) {
                        resolve(false);
                        return;
                    }

                    setTimeout(checkLoaded, 200);
                };

                checkLoaded();
            });
        }

        /**
         * Detect total number of pages
         */
        detectTotalPages() {
            const pageButtons = document.querySelectorAll(SELECTORS.pageButtons);
            if (pageButtons.length === 0) return 1;

            let maxPage = 1;
            pageButtons.forEach(button => {
                const pageNum = parseInt(button.textContent.trim());
                if (!isNaN(pageNum) && pageNum > maxPage) {
                    maxPage = pageNum;
                }
            });

            return maxPage;
        }

        /**
         * Estimate total jobs based on page count
         */
        estimateTotalJobs() {
            return this.totalPages * 25; // LinkedIn typically shows 25 jobs per page
        }

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    // ========================================================================
    // DATA EXTRACTOR
    // ========================================================================

    /**
     * Extracts job data from LinkedIn's DOM
     */
    class DataExtractor {
        constructor(config) {
            this.config = config;
            this.extractionAttempts = {};
        }

        /**
         * Extract all job data for current job
         */
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
                    url: window.location.href
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

                // Extract insights
                jobData.insights = this.extractInsights();

                // Validate extracted data
                if (!this.validateJobData(jobData)) {
                    throw new Error('Invalid job data: missing title or description');
                }

                return jobData;

            } catch (error) {
                return this.handleExtractionError(jobIndex, error);
            }
        }

        /**
         * Extract job description with preserved structure
         */
        extractJobDescription() {
            const descElement = document.querySelector(SELECTORS.jobDescription);
            if (!descElement) return null;

            // Clone to preserve original
            const clone = descElement.cloneNode(true);

            // Remove unwanted elements
            clone.querySelectorAll('script, style, .jobs-description__see-more').forEach(el => el.remove());

            // Extract text with basic structure preservation
            let text = clone.textContent || '';

            // Clean up whitespace
            text = text.replace(/\s+/g, ' ').trim();

            return text;
        }

        /**
         * Extract job insights
         */
        extractInsights() {
            const insights = [];
            const insightElements = document.querySelectorAll(SELECTORS.jobInsights);

            insightElements.forEach(el => {
                const text = el.textContent.trim();
                if (text) insights.push(text);
            });

            return insights;
        }

        /**
         * Extract text from selector
         */
        extractText(selector) {
            const element = document.querySelector(selector);
            return element ? element.textContent.trim() : null;
        }

        /**
         * Validate job data has minimum requirements
         */
        validateJobData(jobData) {
            return jobData.title && jobData.description && jobData.description.length > 50;
        }

        /**
         * Handle extraction errors with retry logic
         */
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

        /**
         * Wait for required elements to be present
         */
        waitForElements(timeout = 3000) {
            return new Promise((resolve) => {
                const startTime = Date.now();

                const checkElements = () => {
                    const title = document.querySelector(SELECTORS.jobTitle);
                    const description = document.querySelector(SELECTORS.jobDescription);

                    if (title && description) {
                        resolve(true);
                        return;
                    }

                    if (Date.now() - startTime > timeout) {
                        resolve(false);
                        return;
                    }

                    setTimeout(checkElements, 100);
                };

                checkElements();
            });
        }

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    // ========================================================================
    // DATA AGGREGATOR
    // ========================================================================

    /**
     * Aggregates and formats extracted job data
     */
    class DataAggregator {
        constructor(config) {
            this.config = config;
            this.jobs = [];
            this.metadata = {};
            this.duplicateCheck = new Set();
        }

        /**
         * Initialize metadata
         */
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

        /**
         * Add job to collection with duplicate checking
         */
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

        /**
         * Generate aggregated text in specified format
         */
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
                    return this.formatMarkdown();
            }
        }

        /**
         * Format as plain text
         */
        formatPlainText() {
            const output = [];

            // Header
            output.push('LinkedIn Job Search Results');
            output.push('='.repeat(80));
            output.push(`Collected: ${new Date().toLocaleString()}`);
            output.push(`Total Jobs: ${this.metadata.totalJobs}`);
            output.push(`Successful: ${this.metadata.successfulExtractions}`);
            output.push(`Failed: ${this.metadata.failedExtractions}`);
            output.push('='.repeat(80));
            output.push('');

            // Jobs
            this.jobs.forEach((job, index) => {
                if (job.error) {
                    output.push(`JOB #${index + 1} - EXTRACTION FAILED`);
                    output.push(`Error: ${job.errorMessage}`);
                } else {
                    output.push(`${'='.repeat(30)} JOB #${index + 1} ${'='.repeat(30)}`);
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

        /**
         * Format as Markdown
         */
        formatMarkdown() {
            const output = [];

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
            if (this.metadata.duplicatesSkipped > 0) {
                output.push(`- **Duplicates Skipped**: ${this.metadata.duplicatesSkipped}`);
            }
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
                    output.push(`**Company**: ${job.company}`);
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

        /**
         * Format as JSON
         */
        formatJSON() {
            return JSON.stringify({
                metadata: this.metadata,
                jobs: this.jobs
            }, null, 2);
        }

        /**
         * Format as CSV (tab-delimited)
         */
        formatCSV() {
            const headers = [
                'Index',
                'Title',
                'Company',
                'Location',
                'Posted Date',
                'Application Count',
                'Description Preview'
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

        /**
         * Escape CSV field
         */
        escapeCSV(text) {
            if (!text) return '';
            text = String(text).replace(/"/g, '""');
            if (text.includes('\t') || text.includes('\n') || text.includes(',')) {
                text = `"${text}"`;
            }
            return text;
        }

        /**
         * Extract search query from URL or page
         */
        extractSearchQuery() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('keywords') ||
                   document.querySelector('.jobs-search-box__text-input')?.value ||
                   null;
        }

        /**
         * Extract location filter from URL or page
         */
        extractLocationFilter() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('location') ||
                   document.querySelector('.jobs-search-box__location-input')?.value ||
                   null;
        }
    }

    // ========================================================================
    // ANTI-DETECTION MODULE
    // ========================================================================

    /**
     * Implements human-like behavior patterns to avoid detection
     */
    class AntiDetectionModule {
        constructor(config) {
            this.config = config;
            this.actionCount = 0;
            this.lastActionTime = Date.now();
        }

        /**
         * Execute anti-detection measures before action
         */
        async beforeAction() {
            if (!this.config.antiDetection) return;

            // Implement variable delays
            await this.humanDelay();

            // Coffee break logic
            if (this.shouldTakeCoffeeBreak()) {
                await this.takeCoffeeBreak();
            }

            this.actionCount++;
            this.lastActionTime = Date.now();
        }

        /**
         * Human-like delay with Gaussian randomization
         */
        async humanDelay() {
            const baseDelay = this.config.timing.minDelay;
            const variance = this.config.timing.maxDelay - baseDelay;

            // Add fatigue factor (slower over time)
            const fatigueFactor = 1 + (this.actionCount / 100) * 0.5;

            // Random delay with normal distribution
            const randomFactor = this.gaussianRandom();
            const delay = (baseDelay + (variance * randomFactor)) * fatigueFactor;

            await this.sleep(delay);
        }

        /**
         * Check if should take coffee break
         */
        shouldTakeCoffeeBreak() {
            return this.actionCount > 0 &&
                   this.actionCount % this.config.timing.coffeeBreakInterval === 0;
        }

        /**
         * Take a coffee break to avoid detection
         */
        async takeCoffeeBreak() {
            const duration = this.config.timing.coffeeBreakDuration;
            const variance = duration * 0.3;
            const actualDuration = duration + (Math.random() - 0.5) * variance;

            console.log(`☕ Taking a coffee break (${Math.round(actualDuration/1000)}s) to avoid detection...`);

            await this.sleep(actualDuration);
        }

        /**
         * Generate Gaussian random number (0-1)
         * Uses Box-Muller transform
         */
        gaussianRandom() {
            let u = 0, v = 0;
            while (u === 0) u = Math.random();
            while (v === 0) v = Math.random();
            const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            return Math.max(0, Math.min(1, (num + 3) / 6)); // Normalize to 0-1
        }

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    // ========================================================================
    // SESSION STORAGE
    // ========================================================================

    /**
     * Manages persistence and checkpoints using localStorage
     */
    class SessionStorage {
        constructor() {
            this.storageKey = 'ljda_session';
            this.checkpointKey = 'ljda_checkpoint';
        }

        /**
         * Save session data
         */
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

        /**
         * Load session data
         */
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

        /**
         * Save checkpoint for recovery
         */
        saveCheckpoint(data) {
            try {
                const checkpoint = {
                    timestamp: new Date().toISOString(),
                    lastJobIndex: data.lastJobIndex,
                    lastPageNumber: data.lastPageNumber,
                    jobsCollected: data.jobs.length,
                    jobs: data.jobs.slice(-10) // Save last 10 jobs only
                };

                localStorage.setItem(this.checkpointKey, JSON.stringify(checkpoint));
                return true;
            } catch (error) {
                console.error('Failed to save checkpoint:', error);
                return false;
            }
        }

        /**
         * Load checkpoint
         */
        loadCheckpoint() {
            try {
                const stored = localStorage.getItem(this.checkpointKey);
                return stored ? JSON.parse(stored) : null;
            } catch (error) {
                console.error('Failed to load checkpoint:', error);
                return null;
            }
        }

        /**
         * Clear all session data
         */
        clearSession() {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.checkpointKey);
        }

        /**
         * Generate unique session ID
         */
        generateSessionId() {
            return `ljda_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }
    }

    // ========================================================================
    // EXPORT MANAGER
    // ========================================================================

    /**
     * Handles data export operations
     */
    class ExportManager {
        constructor(aggregator) {
            this.aggregator = aggregator;
        }

        /**
         * Copy to clipboard
         */
        async copyToClipboard(format = 'markdown') {
            // Generate text in requested format
            const originalFormat = this.aggregator.config.output.format;
            this.aggregator.config.output.format = format;
            const text = this.aggregator.generateAggregatedText();
            this.aggregator.config.output.format = originalFormat;

            try {
                // Modern clipboard API
                await navigator.clipboard.writeText(text);
                return { success: true, message: `Copied ${format} to clipboard!` };
            } catch (err) {
                // Fallback method
                return this.fallbackCopy(text, format);
            }
        }

        /**
         * Fallback copy method
         */
        fallbackCopy(text, format) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();

            try {
                document.execCommand('copy');
                document.body.removeChild(textarea);
                return { success: true, message: `Copied ${format} to clipboard!` };
            } catch (err) {
                document.body.removeChild(textarea);
                return { success: false, message: 'Failed to copy. Please try again.' };
            }
        }

        /**
         * Download as file
         */
        downloadAsFile(filename = 'linkedin_jobs', format = 'txt') {
            const text = this.aggregator.generateAggregatedText();
            const blob = new Blob([text], { type: this.getMimeType(format) });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `${filename}_${new Date().getTime()}.${format}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);

            return { success: true, message: 'Download started!' };
        }

        /**
         * Get MIME type for format
         */
        getMimeType(format) {
            const mimeTypes = {
                'txt': 'text/plain',
                'plain': 'text/plain',
                'md': 'text/markdown',
                'markdown': 'text/markdown',
                'json': 'application/json',
                'csv': 'text/csv'
            };
            return mimeTypes[format] || 'text/plain';
        }
    }

    // ========================================================================
    // UI MANAGER
    // ========================================================================

    /**
     * Manages the control panel interface
     */
    class UIManager {
        constructor(app) {
            this.app = app;
            this.panel = null;
        }

        /**
         * Create and inject UI panel
         */
        create() {
            // Remove existing panel if any
            const existing = document.getElementById('ljda-control-panel');
            if (existing) existing.remove();

            // Create panel
            this.panel = document.createElement('div');
            this.panel.id = 'ljda-control-panel';
            this.panel.innerHTML = this.getPanelHTML();
            this.injectStyles();

            document.body.appendChild(this.panel);
            this.attachEventListeners();

            console.log('✓ UI Panel created');
        }

        /**
         * Get panel HTML
         */
        getPanelHTML() {
            return `
                <div class="ljda-header">
                    <h3>LinkedIn Job Scraper</h3>
                    <button class="ljda-minimize" title="Minimize">_</button>
                </div>

                <div class="ljda-content">
                    <div class="ljda-status">
                        <div class="ljda-progress-text">Ready to start</div>
                        <div class="ljda-progress-bar">
                            <div class="ljda-progress-fill" style="width: 0%"></div>
                        </div>
                        <div class="ljda-eta"></div>
                    </div>

                    <div class="ljda-controls">
                        <button class="ljda-btn ljda-start" title="Start scraping">▶ Start</button>
                        <button class="ljda-btn ljda-pause" disabled title="Pause">⏸ Pause</button>
                        <button class="ljda-btn ljda-stop" disabled title="Stop">⏹ Stop</button>
                        <button class="ljda-btn ljda-try-again" style="display: none;" title="Try again from where it stopped">🔄 Try Again</button>
                    </div>

                    <div class="ljda-stats">
                        <span>Jobs: <strong class="ljda-stat-jobs">0</strong></span>
                        <span>Errors: <strong class="ljda-stat-errors">0</strong></span>
                        <span>Time: <strong class="ljda-stat-time">0:00</strong></span>
                    </div>

                    <div class="ljda-log">
                        <div class="ljda-log-entry">Waiting to start...</div>
                    </div>

                    <div class="ljda-export">
                        <button class="ljda-btn ljda-copy-text">📋 Copy Text</button>
                        <button class="ljda-btn ljda-copy-markdown">📝 Copy Markdown</button>
                        <button class="ljda-btn ljda-copy-json">{ } Copy JSON</button>
                        <button class="ljda-btn ljda-download">⬇ Download</button>
                        <button class="ljda-btn ljda-copy-current" title="Copy current job description only">📄 Copy Current</button>
                    </div>
                </div>
            `;
        }

        /**
         * Inject CSS styles
         */
        injectStyles() {
            const styleId = 'ljda-styles';
            if (document.getElementById(styleId)) return;

            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                #ljda-control-panel {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    width: 350px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 999999;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 14px;
                }

                .ljda-header {
                    background: linear-gradient(135deg, #0077b5 0%, #005582 100%);
                    color: white;
                    padding: 12px 16px;
                    border-radius: 8px 8px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .ljda-header h3 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                }

                .ljda-minimize {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 18px;
                    line-height: 1;
                }

                .ljda-minimize:hover {
                    background: rgba(255,255,255,0.3);
                }

                .ljda-content {
                    padding: 16px;
                }

                .ljda-status {
                    margin-bottom: 16px;
                }

                .ljda-progress-text {
                    font-size: 13px;
                    color: #333;
                    margin-bottom: 8px;
                }

                .ljda-progress-bar {
                    height: 8px;
                    background: #e0e0e0;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .ljda-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #0077b5 0%, #00a0dc 100%);
                    transition: width 0.3s ease;
                }

                .ljda-eta {
                    font-size: 12px;
                    color: #666;
                    margin-top: 4px;
                }

                .ljda-controls {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 12px;
                }

                .ljda-btn {
                    flex: 1;
                    padding: 8px 12px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 500;
                    transition: all 0.2s;
                }

                .ljda-start {
                    background: #28a745;
                    color: white;
                }

                .ljda-start:hover:not(:disabled) {
                    background: #218838;
                }

                .ljda-pause {
                    background: #ffc107;
                    color: #333;
                }

                .ljda-pause:hover:not(:disabled) {
                    background: #e0a800;
                }

                .ljda-stop {
                    background: #dc3545;
                    color: white;
                }

                .ljda-stop:hover:not(:disabled) {
                    background: #c82333;
                }

                .ljda-try-again {
                    background: #17a2b8;
                    color: white;
                    grid-column: 1 / -1;
                }

                .ljda-try-again:hover:not(:disabled) {
                    background: #138496;
                }

                .ljda-controls:has(.ljda-try-again:not([style*="display: none"])) {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                }

                .ljda-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .ljda-stats {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px;
                    background: #f8f9fa;
                    border-radius: 4px;
                    margin-bottom: 12px;
                    font-size: 13px;
                }

                .ljda-stats strong {
                    color: #0077b5;
                    font-weight: 600;
                }

                .ljda-log {
                    max-height: 120px;
                    overflow-y: auto;
                    background: #f8f9fa;
                    border-radius: 4px;
                    padding: 8px;
                    margin-bottom: 12px;
                    font-size: 12px;
                }

                .ljda-log-entry {
                    padding: 4px 0;
                    color: #666;
                }

                .ljda-log-entry.success {
                    color: #28a745;
                }

                .ljda-log-entry.error {
                    color: #dc3545;
                }

                .ljda-log-entry.warning {
                    color: #ffc107;
                }

                .ljda-export {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                }

                .ljda-copy-current {
                    grid-column: 1 / -1;
                }

                .ljda-export .ljda-btn {
                    background: #6c757d;
                    color: white;
                    font-size: 12px;
                }

                .ljda-export .ljda-btn:hover {
                    background: #5a6268;
                }

                .ljda-copy-current {
                    background: #28a745;
                }

                .ljda-copy-current:hover {
                    background: #218838;
                }

                .ljda-minimized .ljda-content {
                    display: none;
                }
            `;

            document.head.appendChild(style);
        }

        /**
         * Attach event listeners
         */
        attachEventListeners() {
            // Minimize button
            this.panel.querySelector('.ljda-minimize').addEventListener('click', () => {
                this.panel.classList.toggle('ljda-minimized');
            });

            // Control buttons
            this.panel.querySelector('.ljda-start').addEventListener('click', () => {
                this.app.start();
            });

            this.panel.querySelector('.ljda-pause').addEventListener('click', () => {
                if (this.app.state.isPaused) {
                    this.app.resume();
                } else {
                    this.app.pause();
                }
            });

            this.panel.querySelector('.ljda-stop').addEventListener('click', () => {
                this.app.stop();
            });

            this.panel.querySelector('.ljda-try-again').addEventListener('click', () => {
                this.app.tryAgain();
            });

            // Export buttons
            this.panel.querySelector('.ljda-copy-text').addEventListener('click', () => {
                this.app.copyText();
            });

            this.panel.querySelector('.ljda-copy-markdown').addEventListener('click', () => {
                this.app.copyMarkdown();
            });

            this.panel.querySelector('.ljda-copy-json').addEventListener('click', () => {
                this.app.copyJSON();
            });

            this.panel.querySelector('.ljda-download').addEventListener('click', () => {
                this.app.downloadAll();
            });

            this.panel.querySelector('.ljda-copy-current').addEventListener('click', () => {
                this.app.copyCurrentDescription();
            });
        }

        /**
         * Update progress display
         */
        updateProgress(current, page, maxPages) {
            // Calculate progress based on pages, not pre-calculated job count
            const pagePercent = Math.round((page / maxPages) * 100);
            this.panel.querySelector('.ljda-progress-fill').style.width = `${pagePercent}%`;
            this.panel.querySelector('.ljda-progress-text').textContent =
                `Page ${page}/${maxPages} - ${current} jobs processed`;
        }

        /**
         * Update status message
         */
        updateStatus(message) {
            this.panel.querySelector('.ljda-progress-text').textContent = message;
        }

        /**
         * Log activity
         */
        logActivity(type, message) {
            const log = this.panel.querySelector('.ljda-log');
            const entry = document.createElement('div');
            entry.className = `ljda-log-entry ${type}`;

            const icons = {
                success: '✓',
                error: '✗',
                warning: '⚠',
                info: '→'
            };

            entry.textContent = `${icons[type] || '→'} ${message}`;
            log.insertBefore(entry, log.firstChild);

            // Keep only last 20 entries
            while (log.children.length > 20) {
                log.removeChild(log.lastChild);
            }
        }

        /**
         * Update statistics
         */
        updateStats(stats) {
            if (stats.jobs !== undefined) {
                this.panel.querySelector('.ljda-stat-jobs').textContent = stats.jobs;
            }
            if (stats.errors !== undefined) {
                this.panel.querySelector('.ljda-stat-errors').textContent = stats.errors;
            }
            if (stats.time !== undefined) {
                this.panel.querySelector('.ljda-stat-time').textContent = stats.time;
            }
        }

        /**
         * Enable/disable buttons
         */
        setButtonsState(running) {
            this.panel.querySelector('.ljda-start').disabled = running;
            this.panel.querySelector('.ljda-pause').disabled = !running;
            this.panel.querySelector('.ljda-stop').disabled = !running;

            if (running) {
                this.panel.querySelector('.ljda-pause').textContent = '⏸ Pause';
            }
        }

        /**
         * Update pause button state
         */
        updatePauseButton(isPaused) {
            const pauseBtn = this.panel.querySelector('.ljda-pause');
            pauseBtn.textContent = isPaused ? '▶ Resume' : '⏸ Pause';
        }

        /**
         * Enable export buttons
         */

        /**
         * Show try again button
         */
        showTryAgainButton() {
            const tryAgainBtn = this.panel.querySelector('.ljda-try-again');
            if (tryAgainBtn) {
                tryAgainBtn.style.display = 'block';
            }
        }

        /**
         * Hide try again button
         */
        hideTryAgainButton() {
            const tryAgainBtn = this.panel.querySelector('.ljda-try-again');
            if (tryAgainBtn) {
                tryAgainBtn.style.display = 'none';
            }
        }

        /**
         * Show notification
         */
        showNotification(message, type = 'info') {
            this.logActivity(type, message);
        }

        /**
         * Show completion summary
         */
        showCompletionSummary(summary) {
            const message = `✓ Complete! ${summary.successful} jobs in ${summary.timeElapsed}`;
            this.updateStatus(message);
            this.logActivity('success', message);
        }
    }

    // ========================================================================
    // MAIN APPLICATION CONTROLLER
    // ========================================================================

    /**
     * Main application controller that orchestrates all modules
     */
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
                currentPage: 1,
                processedCardIds: new Set(),  // Track which cards have been processed (click-as-we-go)
                totalJobs: 0,
                startTime: null,
                errors: [],
                sessionId: null
            };

            this.timerInterval = null;
        }

        /**
         * Initialize application
         */
        async initialize() {
            console.log('Initializing LinkedIn Job Scraper...');

            // Check for existing session
            const existingSession = this.storage.loadSession();
            if (existingSession) {
                const resume = confirm('Found existing session. Resume?');
                if (resume) {
                    this.restoreSession(existingSession);
                } else {
                    this.storage.clearSession();
                }
            }

            // Initialize UI
            this.ui.create();

            // Initialize navigation
            const navInfo = await this.navigator.initialize();
            this.state.totalJobs = null; // Don't limit by pre-calculated total (as-we-go approach)

            // Initialize aggregator
            this.aggregator.initialize();

            // Set up event listeners
            this.setupEventListeners();

            console.log(`✓ Initialized. Found ${navInfo.jobsOnCurrentPage} jobs on page, ${navInfo.totalPages} pages total`);
        }

        /**
         * Start scraping
         */
        async start() {
            if (this.state.isRunning) return;

            this.state.isRunning = true;
            this.state.isPaused = false;

            // Hide try-again button when starting
            this.ui.hideTryAgainButton();

            // Only reset start time if starting fresh (not continuing)
            if (!this.state.startTime || this.state.currentJob === 0) {
                this.state.startTime = Date.now();
                this.state.sessionId = this.storage.generateSessionId();
                this.ui.logActivity('info', 'Scraping started');
            } else {
                this.ui.logActivity('info', 'Continuing from job ' + this.state.currentJob);
            }

            this.ui.setButtonsState(true);
            this.ui.updateStatus('Starting extraction...');

            // Start timer
            this.startTimer();

            let completed = false;
            try {
                completed = await this.runExtractionLoop();
            } catch (error) {
                this.handleError(error);
            }

            // Only call complete if we actually finished all jobs
            if (completed) {
                this.complete();
            } else {
                // Just update UI, don't reset state
                this.state.isRunning = false;
                this.stopTimer();
                this.ui.setButtonsState(false);

                // Show try-again button if we have progress
                if (this.state.currentJob > 0 && this.state.currentJob < this.config.maxJobs) {
                    this.ui.showTryAgainButton();
                    this.ui.updateStatus(`Stopped at job ${this.state.currentJob} - Click Try Again to continue`);
                }
            }
        }

        /**
         * Try again - resume from where it stopped
         */
        async tryAgain() {
            this.ui.hideTryAgainButton();
            this.ui.logActivity('info', '🔄 Trying again from job ' + this.state.currentJob);
            await this.start();
        }

        /**
         * Main extraction loop
         * Returns true if completed all jobs, false if stopped early
         */
        async runExtractionLoop() {
            const maxPages = this.config.maxPages;
            let currentPage = this.state.currentPage || 1;
            let jobsProcessed = this.state.currentJob || 0;
            let processedCardIds = this.state.processedCardIds || new Set();

            // Continue until we run out of pages (as-we-go, no job count limit)
            while (currentPage <= maxPages) {
                this.ui.logActivity('info', `Scanning page ${currentPage} for job cards...`);

                let consecutiveNoNewCards = 0;
                const MAX_ATTEMPTS = 3;

                // Inner loop: Process all cards on current page (click-as-we-go)
                while (consecutiveNoNewCards < MAX_ATTEMPTS) {
                    // Check if stopped
                    if (!this.state.isRunning) {
                        this.ui.logActivity('warning', 'Stopped by user');
                        return false;
                    }

                    // Check if paused
                    if (this.state.isPaused) {
                        await this.waitForResume();
                    }

                    // Query cards EVERY iteration (dynamic discovery)
                    const currentCards = Array.from(document.querySelectorAll(SELECTORS.jobCard));

                    if (currentCards.length === 0) {
                        this.ui.logActivity('warning', 'No job cards found on page');
                        consecutiveNoNewCards++;
                        await this.delay(2000);
                        continue;
                    }

                    // Find first unprocessed card
                    let foundNewCard = false;
                    for (const card of currentCards) {
                        const cardId = this.navigator.getCardIdentifier(card);

                        if (!processedCardIds.has(cardId)) {
                            // Anti-detection measures
                            await this.antiDetect.beforeAction();

                            // Update progress
                            this.ui.updateProgress(jobsProcessed + 1, currentPage, maxPages);
                            this.ui.logActivity('info', `Processing card ${processedCardIds.size + 1} (ID: ${cardId.substring(0, 20)}...)`);

                            // Navigate to card element
                            const success = await this.navigator.navigateToJobCard(card);
                            if (!success) {
                                this.ui.logActivity('warning', 'Failed to navigate to card, skipping...');
                                processedCardIds.add(cardId); // Mark as attempted
                                continue;
                            }

                            // Extract data
                            const jobData = await this.extractor.extractJobData(jobsProcessed + 1);

                            // Add to aggregator
                            const added = this.aggregator.addJob(jobData);

                            // Update UI
                            if (jobData.error) {
                                this.state.errors.push(jobData);
                                this.ui.logActivity('error', `Failed: ${jobData.errorMessage}`);
                            } else {
                                this.ui.logActivity('success', `Extracted: ${jobData.title}`);
                            }

                            this.ui.updateStats({
                                jobs: this.aggregator.metadata.successfulExtractions,
                                errors: this.aggregator.metadata.failedExtractions
                            });

                            // Mark as processed
                            processedCardIds.add(cardId);
                            jobsProcessed++;
                            this.state.currentJob = jobsProcessed;
                            this.state.currentPage = currentPage;
                            this.state.processedCardIds = processedCardIds;

                            foundNewCard = true;
                            consecutiveNoNewCards = 0;

                            // Auto-save checkpoint
                            if (this.config.autoSave && jobsProcessed % this.config.saveInterval === 0) {
                                this.saveCheckpoint();
                                this.ui.logActivity('info', 'Checkpoint saved');
                            }

                            break; // Exit to re-query cards (new ones may have loaded)
                        }
                    }

                    if (!foundNewCard) {
                        this.ui.logActivity('info', `No new cards found (attempt ${consecutiveNoNewCards + 1}/${MAX_ATTEMPTS})`);
                        consecutiveNoNewCards++;

                        // Wait for potential lazy loading
                        if (consecutiveNoNewCards < MAX_ATTEMPTS) {
                            await this.delay(1500 + Math.random() * 500);
                        }
                    }
                }

                // Move to next page if needed
                if (currentPage < maxPages) {
                    this.ui.logActivity('info', `Moving to page ${currentPage + 1}`);
                    const hasNextPage = await this.navigator.navigateToNextPage();
                    if (!hasNextPage) {
                        const nextButton = document.querySelector(SELECTORS.nextButton);
                        if (!nextButton || nextButton.disabled) {
                            this.ui.logActivity('warning', 'No more pages available');
                        }
                        break;
                    }
                    currentPage++;
                    this.state.currentPage = currentPage;
                    consecutiveNoNewCards = 0; // Reset for new page
                } else {
                    break;
                }
            }

            // Return true if we exhausted all available pages
            const nextButton = document.querySelector(SELECTORS.nextButton);
            return currentPage > maxPages || !nextButton || nextButton.disabled;
        }

        /**
         * Delay helper
         */
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        /**
         * Pause scraping
         */
        pause() {
            this.state.isPaused = true;
            this.ui.updateStatus('Paused');
            this.ui.updatePauseButton(true);
            this.ui.logActivity('warning', 'Paused');
        }

        /**
         * Resume scraping
         */
        resume() {
            this.state.isPaused = false;
            this.ui.updateStatus('Resuming...');
            this.ui.updatePauseButton(false);
            this.ui.logActivity('info', 'Resumed');
        }

        /**
         * Stop scraping
         */
        stop() {
            this.state.isRunning = false;
            this.state.isPaused = false;
            this.stopTimer();
            this.ui.setButtonsState(false);
            this.ui.updateStatus('Stopped - Click Start to continue');

            // Save checkpoint so we can resume
            if (this.aggregator.jobs.length > 0) {
                this.saveCheckpoint();
                this.ui.logActivity('info', `Stopped at job ${this.state.currentJob}. Click Start to continue.`);
            }
        }

        /**
         * Complete scraping
         */
        complete() {
            this.state.isRunning = false;
            this.stopTimer();

            const timeElapsed = Date.now() - this.state.startTime;
            this.aggregator.metadata.timeElapsed = timeElapsed;

            // Save final session
            this.storage.saveSession({
                sessionId: this.state.sessionId,
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

            this.ui.setButtonsState(false);

            console.log('✓ Scraping completed!');
            console.log(`Jobs: ${this.aggregator.metadata.successfulExtractions}, Errors: ${this.aggregator.metadata.failedExtractions}, Time: ${this.formatTime(timeElapsed)}`);
        }

        /**
         * Export methods
         */
        async copyText() {
            const result = await this.exporter.copyToClipboard('plain');
            this.ui.showNotification(result.message, result.success ? 'success' : 'error');
        }

        async copyMarkdown() {
            const result = await this.exporter.copyToClipboard('markdown');
            this.ui.showNotification(result.message, result.success ? 'success' : 'error');
        }

        async copyJSON() {
            const result = await this.exporter.copyToClipboard('json');
            this.ui.showNotification(result.message, result.success ? 'success' : 'error');
        }

        async copyCurrentDescription() {
            // Get the currently displayed job description
            const descriptionElement = document.querySelector(SELECTORS.jobDescription);
            const titleElement = document.querySelector(SELECTORS.jobTitle);

            if (!descriptionElement || !titleElement) {
                this.ui.showNotification('No job currently selected. Click on a job first.', 'error');
                return;
            }

            // Extract current job data (similar to extractor.extractJobData)
            const jobData = await this.extractor.extractJobData(this.aggregator.jobs.length + 1);

            if (jobData.error) {
                this.ui.showNotification('Failed to extract current job data', 'error');
                return;
            }

            // Add to aggregator (this concatenates with previous jobs)
            const added = this.aggregator.addJob(jobData);

            if (added) {
                this.ui.logActivity('success', `Manually added: ${jobData.title}`);
                this.ui.showNotification(`Added "${jobData.title}" to collection!`, 'success');

                // Update stats
                this.ui.updateStats({
                    jobs: this.aggregator.metadata.successfulExtractions,
                    errors: this.aggregator.metadata.failedExtractions
                });
            } else {
                this.ui.showNotification('Job already exists in collection (duplicate)', 'warning');
            }
        }

        async downloadAll() {
            const format = this.config.output.format === 'markdown' ? 'md' :
                         this.config.output.format === 'json' ? 'json' :
                         this.config.output.format === 'csv' ? 'csv' : 'txt';
            const result = this.exporter.downloadAsFile('linkedin_jobs', format);
            this.ui.showNotification(result.message, 'success');
        }

        /**
         * Save checkpoint
         */
        saveCheckpoint() {
            this.storage.saveCheckpoint({
                lastJobIndex: this.state.currentJob,
                lastPageNumber: this.state.currentPage,
                processedCardIds: Array.from(this.state.processedCardIds || []),
                jobs: this.aggregator.jobs
            });
        }

        /**
         * Restore session
         */
        restoreSession(session) {
            this.aggregator.jobs = session.jobs || [];
            this.aggregator.metadata = session.metadata || this.aggregator.metadata;
            this.config = { ...this.config, ...session.config };
            this.state = { ...this.state, ...session.state };

            // Restore processedCardIds as Set (from checkpoint array)
            if (session.state && session.state.processedCardIds) {
                this.state.processedCardIds = new Set(session.state.processedCardIds);
            } else {
                this.state.processedCardIds = new Set();
            }

            console.log(`Restored session with ${this.aggregator.jobs.length} jobs and ${this.state.processedCardIds.size} processed cards`);
        }

        /**
         * Wait for resume
         */
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

        /**
         * Handle error
         */
        handleError(error) {
            console.error('Scraper error:', error);
            this.state.errors.push({
                timestamp: new Date().toISOString(),
                message: error.message,
                stack: error.stack
            });
            this.ui.logActivity('error', `Error: ${error.message}`);
        }

        /**
         * Format time duration
         */
        formatTime(ms) {
            const seconds = Math.floor(ms / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);

            if (hours > 0) {
                return `${hours}h ${minutes % 60}m`;
            } else if (minutes > 0) {
                return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
            } else {
                return `0:${String(seconds).padStart(2, '0')}`;
            }
        }

        /**
         * Start timer
         */
        startTimer() {
            this.timerInterval = setInterval(() => {
                if (this.state.startTime && !this.state.isPaused) {
                    const elapsed = Date.now() - this.state.startTime;
                    this.ui.updateStats({ time: this.formatTime(elapsed) });
                }
            }, 1000);
        }

        /**
         * Stop timer
         */
        stopTimer() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
        }

        /**
         * Setup keyboard shortcuts and event listeners
         */
        setupEventListeners() {
            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.stop();
                } else if (e.key === ' ' && e.ctrlKey) {
                    e.preventDefault();
                    if (this.state.isRunning) {
                        if (this.state.isPaused) {
                            this.resume();
                        } else {
                            this.pause();
                        }
                    }
                }
            });

            // Warn before leaving
            window.addEventListener('beforeunload', (e) => {
                if (this.state.isRunning) {
                    e.preventDefault();
                    e.returnValue = 'Scraping in progress. Are you sure you want to leave?';
                }
            });
        }

        /**
         * Load configuration
         */
        loadConfig() {
            // Check for user-provided config
            if (window.LJDA_CONFIG) {
                return { ...DEFAULT_CONFIG, ...window.LJDA_CONFIG };
            }

            // Load from localStorage
            const stored = localStorage.getItem('ljda_config');
            if (stored) {
                try {
                    return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
                } catch (e) {
                    console.warn('Failed to parse stored config, using defaults');
                }
            }

            return { ...DEFAULT_CONFIG };
        }
    }

    // ========================================================================
    // INITIALIZATION
    // ========================================================================

    // Check if we're on LinkedIn jobs page
    if (!window.location.href.includes('linkedin.com/jobs')) {
        console.error('❌ This script must be run on LinkedIn Jobs pages (linkedin.com/jobs)');
        alert('This script must be run on a LinkedIn Jobs search page.\n\nNavigate to linkedin.com/jobs and try again.');
        return;
    }

    // Prevent multiple instances
    if (window.LinkedInJobScraperInstance) {
        console.warn('⚠ LinkedIn Job Scraper is already running');
        return;
    }

    // Create and initialize application
    window.LinkedInJobScraperInstance = new LinkedInJobScraperApp();
    window.LinkedInJobScraperInstance.initialize().then(() => {
        console.log('✓ LinkedIn Job Scraper initialized successfully');
        console.log('Press the Start button in the control panel to begin');
        console.log('Keyboard shortcuts: ESC = Stop, Ctrl+Space = Pause/Resume');
    }).catch(error => {
        console.error('❌ Failed to initialize LinkedIn Job Scraper:', error);
    });

})();
