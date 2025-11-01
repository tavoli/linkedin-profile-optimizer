/**
 * Settings Panel for LinkedIn Job Scraper
 * Advanced configuration interface
 */

class SettingsPanel {
    constructor(app) {
        this.app = app;
        this.panel = null;
        this.isOpen = false;
    }

    /**
     * Create settings panel
     */
    create() {
        if (this.panel) return;

        this.panel = document.createElement('div');
        this.panel.id = 'ljda-settings-panel';
        this.panel.innerHTML = this.getHTML();
        this.injectStyles();

        document.body.appendChild(this.panel);
        this.attachEventListeners();
        this.populateValues();
    }

    /**
     * Get settings panel HTML
     */
    getHTML() {
        return `
            <div class="ljda-settings-overlay"></div>
            <div class="ljda-settings-modal">
                <div class="ljda-settings-header">
                    <h3>⚙ Settings</h3>
                    <button class="ljda-settings-close">×</button>
                </div>

                <div class="ljda-settings-content">
                    <!-- General Settings -->
                    <div class="ljda-settings-section">
                        <h4>General</h4>
                        <div class="ljda-setting-row">
                            <label>Max Jobs</label>
                            <input type="number" id="ljda-max-jobs" min="1" max="1000" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Max Pages</label>
                            <input type="number" id="ljda-max-pages" min="1" max="50" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Skip Duplicates</label>
                            <input type="checkbox" id="ljda-skip-duplicates" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Auto Start</label>
                            <input type="checkbox" id="ljda-auto-start" />
                        </div>
                    </div>

                    <!-- Timing Settings -->
                    <div class="ljda-settings-section">
                        <h4>Timing & Anti-Detection</h4>
                        <div class="ljda-setting-row">
                            <label>Min Delay (ms)</label>
                            <input type="number" id="ljda-min-delay" min="500" step="100" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Max Delay (ms)</label>
                            <input type="number" id="ljda-max-delay" max="10000" step="100" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Page Delay (ms)</label>
                            <input type="number" id="ljda-page-delay" step="100" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Coffee Break Interval</label>
                            <input type="number" id="ljda-coffee-interval" min="10" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Coffee Break Duration (ms)</label>
                            <input type="number" id="ljda-coffee-duration" step="1000" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Anti-Detection</label>
                            <input type="checkbox" id="ljda-anti-detection" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Simulate Mouse Movements</label>
                            <input type="checkbox" id="ljda-mouse-movements" />
                        </div>
                    </div>

                    <!-- Extraction Settings -->
                    <div class="ljda-settings-section">
                        <h4>Data Extraction</h4>
                        <div class="ljda-setting-row">
                            <label>Include Company Info</label>
                            <input type="checkbox" id="ljda-include-company" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Include Location</label>
                            <input type="checkbox" id="ljda-include-location" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Include Posted Date</label>
                            <input type="checkbox" id="ljda-include-posted" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Include Application Count</label>
                            <input type="checkbox" id="ljda-include-applications" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Include Skills Match</label>
                            <input type="checkbox" id="ljda-include-skills" />
                        </div>
                    </div>

                    <!-- Output Settings -->
                    <div class="ljda-settings-section">
                        <h4>Output Format</h4>
                        <div class="ljda-setting-row">
                            <label>Default Format</label>
                            <select id="ljda-output-format">
                                <option value="plain">Plain Text</option>
                                <option value="markdown">Markdown</option>
                                <option value="json">JSON</option>
                                <option value="csv">CSV</option>
                            </select>
                        </div>
                        <div class="ljda-setting-row">
                            <label>Include Metadata</label>
                            <input type="checkbox" id="ljda-include-metadata" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Include Timestamps</label>
                            <input type="checkbox" id="ljda-include-timestamps" />
                        </div>
                    </div>

                    <!-- Advanced Settings -->
                    <div class="ljda-settings-section">
                        <h4>Advanced</h4>
                        <div class="ljda-setting-row">
                            <label>Auto Save</label>
                            <input type="checkbox" id="ljda-auto-save" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Save Interval (jobs)</label>
                            <input type="number" id="ljda-save-interval" min="1" />
                        </div>
                        <div class="ljda-setting-row">
                            <label>Debug Mode</label>
                            <input type="checkbox" id="ljda-debug-mode" />
                        </div>
                    </div>
                </div>

                <div class="ljda-settings-footer">
                    <button class="ljda-btn ljda-settings-save">Save Settings</button>
                    <button class="ljda-btn ljda-settings-reset">Reset to Defaults</button>
                    <button class="ljda-btn ljda-settings-cancel">Cancel</button>
                </div>
            </div>
        `;
    }

    /**
     * Inject CSS styles
     */
    injectStyles() {
        const styleId = 'ljda-settings-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            #ljda-settings-panel {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999999;
            }

            #ljda-settings-panel.open {
                display: block;
            }

            .ljda-settings-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
            }

            .ljda-settings-modal {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 600px;
                max-width: 90%;
                max-height: 90vh;
                background: white;
                border-radius: 8px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
            }

            .ljda-settings-header {
                padding: 16px 20px;
                background: linear-gradient(135deg, #0077b5 0%, #005582 100%);
                color: white;
                border-radius: 8px 8px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .ljda-settings-header h3 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
            }

            .ljda-settings-close {
                background: none;
                border: none;
                color: white;
                font-size: 32px;
                line-height: 1;
                cursor: pointer;
                padding: 0;
                width: 32px;
                height: 32px;
            }

            .ljda-settings-close:hover {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
            }

            .ljda-settings-content {
                padding: 20px;
                overflow-y: auto;
                flex: 1;
            }

            .ljda-settings-section {
                margin-bottom: 24px;
            }

            .ljda-settings-section h4 {
                margin: 0 0 12px 0;
                font-size: 14px;
                font-weight: 600;
                color: #0077b5;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .ljda-setting-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px solid #f0f0f0;
            }

            .ljda-setting-row label {
                font-size: 14px;
                color: #333;
                flex: 1;
            }

            .ljda-setting-row input[type="number"],
            .ljda-setting-row select {
                width: 150px;
                padding: 6px 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 14px;
            }

            .ljda-setting-row input[type="checkbox"] {
                width: 20px;
                height: 20px;
                cursor: pointer;
            }

            .ljda-settings-footer {
                padding: 16px 20px;
                border-top: 1px solid #e0e0e0;
                display: flex;
                gap: 10px;
                justify-content: flex-end;
            }

            .ljda-settings-footer .ljda-btn {
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
            }

            .ljda-settings-save {
                background: #28a745;
                color: white;
            }

            .ljda-settings-save:hover {
                background: #218838;
            }

            .ljda-settings-reset {
                background: #ffc107;
                color: #333;
            }

            .ljda-settings-reset:hover {
                background: #e0a800;
            }

            .ljda-settings-cancel {
                background: #6c757d;
                color: white;
            }

            .ljda-settings-cancel:hover {
                background: #5a6268;
            }
        `;

        document.head.appendChild(style);
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Close buttons
        this.panel.querySelector('.ljda-settings-close').addEventListener('click', () => this.close());
        this.panel.querySelector('.ljda-settings-cancel').addEventListener('click', () => this.close());
        this.panel.querySelector('.ljda-settings-overlay').addEventListener('click', () => this.close());

        // Save button
        this.panel.querySelector('.ljda-settings-save').addEventListener('click', () => this.save());

        // Reset button
        this.panel.querySelector('.ljda-settings-reset').addEventListener('click', () => this.reset());
    }

    /**
     * Populate current values
     */
    populateValues() {
        const config = this.app.config;

        // General
        document.getElementById('ljda-max-jobs').value = config.maxJobs;
        document.getElementById('ljda-max-pages').value = config.maxPages;
        document.getElementById('ljda-skip-duplicates').checked = config.skipDuplicates;
        document.getElementById('ljda-auto-start').checked = config.autoStart;

        // Timing
        document.getElementById('ljda-min-delay').value = config.timing.minDelay;
        document.getElementById('ljda-max-delay').value = config.timing.maxDelay;
        document.getElementById('ljda-page-delay').value = config.timing.pageDelay;
        document.getElementById('ljda-coffee-interval').value = config.timing.coffeeBreakInterval;
        document.getElementById('ljda-coffee-duration').value = config.timing.coffeeBreakDuration;
        document.getElementById('ljda-anti-detection').checked = config.antiDetection;
        document.getElementById('ljda-mouse-movements').checked = config.simulateMouseMovements;

        // Extraction
        document.getElementById('ljda-include-company').checked = config.extraction.includeCompanyInfo;
        document.getElementById('ljda-include-location').checked = config.extraction.includeLocation;
        document.getElementById('ljda-include-posted').checked = config.extraction.includePostedDate;
        document.getElementById('ljda-include-applications').checked = config.extraction.includeApplicationCount;
        document.getElementById('ljda-include-skills').checked = config.extraction.includeSkillsMatch;

        // Output
        document.getElementById('ljda-output-format').value = config.output.format;
        document.getElementById('ljda-include-metadata').checked = config.output.includeMetadata;
        document.getElementById('ljda-include-timestamps').checked = config.output.includeTimestamps;

        // Advanced
        document.getElementById('ljda-auto-save').checked = config.autoSave;
        document.getElementById('ljda-save-interval').value = config.saveInterval;
        document.getElementById('ljda-debug-mode').checked = config.debugMode;
    }

    /**
     * Save settings
     */
    save() {
        const newConfig = {
            // General
            maxJobs: parseInt(document.getElementById('ljda-max-jobs').value),
            maxPages: parseInt(document.getElementById('ljda-max-pages').value),
            skipDuplicates: document.getElementById('ljda-skip-duplicates').checked,
            autoStart: document.getElementById('ljda-auto-start').checked,

            // Timing
            timing: {
                minDelay: parseInt(document.getElementById('ljda-min-delay').value),
                maxDelay: parseInt(document.getElementById('ljda-max-delay').value),
                pageDelay: parseInt(document.getElementById('ljda-page-delay').value),
                coffeeBreakInterval: parseInt(document.getElementById('ljda-coffee-interval').value),
                coffeeBreakDuration: parseInt(document.getElementById('ljda-coffee-duration').value)
            },

            antiDetection: document.getElementById('ljda-anti-detection').checked,
            simulateMouseMovements: document.getElementById('ljda-mouse-movements').checked,

            // Extraction
            extraction: {
                includeCompanyInfo: document.getElementById('ljda-include-company').checked,
                includeLocation: document.getElementById('ljda-include-location').checked,
                includePostedDate: document.getElementById('ljda-include-posted').checked,
                includeApplicationCount: document.getElementById('ljda-include-applications').checked,
                includeSkillsMatch: document.getElementById('ljda-include-skills').checked
            },

            // Output
            output: {
                format: document.getElementById('ljda-output-format').value,
                includeMetadata: document.getElementById('ljda-include-metadata').checked,
                includeTimestamps: document.getElementById('ljda-include-timestamps').checked,
                separatorStyle: 'equals'
            },

            // Advanced
            autoSave: document.getElementById('ljda-auto-save').checked,
            saveInterval: parseInt(document.getElementById('ljda-save-interval').value),
            debugMode: document.getElementById('ljda-debug-mode').checked
        };

        // Update app config
        this.app.config = { ...this.app.config, ...newConfig };

        // Save to localStorage
        localStorage.setItem('ljda_config', JSON.stringify(newConfig));

        // Update modules with new config
        this.app.navigator.config = this.app.config;
        this.app.extractor.config = this.app.config;
        this.app.aggregator.config = this.app.config;
        this.app.antiDetect.config = this.app.config;

        console.log('✓ Settings saved');
        alert('Settings saved successfully!');
        this.close();
    }

    /**
     * Reset to defaults
     */
    reset() {
        if (confirm('Reset all settings to defaults?')) {
            localStorage.removeItem('ljda_config');
            location.reload();
        }
    }

    /**
     * Open panel
     */
    open() {
        if (!this.panel) this.create();
        this.panel.classList.add('open');
        this.isOpen = true;
        this.populateValues();
    }

    /**
     * Close panel
     */
    close() {
        this.panel.classList.remove('open');
        this.isOpen = false;
    }

    /**
     * Toggle panel
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SettingsPanel;
}
