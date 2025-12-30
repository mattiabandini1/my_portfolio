/**
 * SITE CONFIGURATION FILE
 * 
 * ⚠️ SECURITY WARNING: This file contains sensitive information!
 * 
 * This file is excluded from Git via .gitignore to protect your privacy.
 * Never commit this file to a public repository.
 * 
 * INSTRUCTIONS:
 * 1. Copy this file to create your own config.js
 * 2. Replace the placeholder values with your real information
 * 3. Keep this file in your local project directory only
 * 4. The .gitignore file will prevent it from being tracked by Git
 */

// Global configuration object
// This will be accessed by script.js to populate contact information
const SITE_CONFIG = {
    // Your email address (will be used for mailto: links)
    email: 'info@mattiabandini.com',

    // Your LinkedIn profile URL
    linkedin_url: 'https://www.linkedin.com/in/mattia-bandini-19784017b',

    // Your GitHub profile URL
    github_url: 'https://github.com/mattiabandini1',

    // X profile URL
    x_url: 'https://x.com/mattiabandinii_'
};

/**
 * USAGE NOTES:
 * 
 * - This file is loaded before script.js in index.html
 * - The SITE_CONFIG object is globally accessible
 * - script.js will automatically inject these values into the appropriate DOM elements
 * - If this file is missing, the site will use placeholder values and show a console warning
 * 
 * EXAMPLE CONFIGURATION:
 * 
 * const SITE_CONFIG = {
 *     email: 'mattia.bandini@studio.unibo.it',
 *     linkedin_url: 'https://linkedin.com/in/mattiabandini',
 *     github_url: 'https://github.com/mattiabandini'
 * };
 */
