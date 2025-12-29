/**
 * Portfolio Website - Main JavaScript
 * 
 * This script handles:
 * 1. Dynamic data injection from config.js (secure contact info)
 * 2. Contact form pre-population with example data
 * 3. Form submission simulation (EmailJS placeholder)
 * 4. Character counter for textarea
 * 5. Smooth scroll behavior
 */

// ========================================
// Configuration & Data Injection
// ========================================

/**
 * Injects contact information from config.js into the DOM
 * Falls back to placeholder values if config.js is not loaded
 */
function injectContactData() {
    // Check if SITE_CONFIG is available (loaded from config.js)
    if (typeof SITE_CONFIG === 'undefined') {
        console.warn('⚠️ config.js not found. Using placeholder contact information.');
        console.warn('📝 Create config.js to add your real contact details.');

        // Use placeholder data
        SITE_CONFIG = {
            email: 'your.email@example.com',
            linkedin_url: 'https://linkedin.com/in/yourprofile',
            github_url: 'https://github.com/yourusername'
        };
    }

    // Inject email links
    const emailElements = document.querySelectorAll('#contact-email, #footer-email');
    emailElements.forEach(el => {
        el.href = `mailto:${SITE_CONFIG.email}`;
        el.textContent = el.id === 'contact-email' ? SITE_CONFIG.email : '';
        el.title = SITE_CONFIG.email;
    });

    // Inject LinkedIn links
    const linkedinElements = document.querySelectorAll('#contact-linkedin, #footer-linkedin');
    linkedinElements.forEach(el => {
        el.href = SITE_CONFIG.linkedin_url;
        el.title = 'LinkedIn Profile';
    });

    // Inject GitHub links
    const githubElements = document.querySelectorAll('#contact-github, #footer-github');
    githubElements.forEach(el => {
        el.href = SITE_CONFIG.github_url;
        el.title = 'GitHub Profile';
    });

    console.log('✅ Contact data injected successfully');
}

// ========================================
// Contact Form Management
// ========================================

/**
 * Pre-populates the contact form with example data
 * This helps demonstrate the form's functionality
 */
function populateFormWithExampleData() {
    const form = document.getElementById('contact-form');

    if (form) {
        // Set placeholders (not values) for better UX
        document.getElementById('name').placeholder = 'Guest User';
        document.getElementById('name').value = ''; // Ensure empty to show placeholder

        document.getElementById('email').placeholder = 'guest@example.com';
        document.getElementById('email').value = '';

        // Select stays as is or default
        document.getElementById('service_type').value = 'web-development';

        document.getElementById('project_details').placeholder = 'I\'m interested in collaborating on a project. Looking forward to discussing the details with you!';
        document.getElementById('project_details').value = '';

        // Update character counter (will be 0)
        updateCharacterCounter();

        console.log('✅ Form initialized with placeholders');
    }
}

/**
 * Updates the character counter for the project_details textarea
 */
function updateCharacterCounter() {
    const textarea = document.getElementById('project_details');
    const charCount = document.getElementById('char-count');

    if (textarea && charCount) {
        const currentLength = textarea.value.length;
        charCount.textContent = currentLength;

        // Change color when approaching limit
        if (currentLength > 900) {
            charCount.style.color = '#febc2e'; // Yellow warning
        } else if (currentLength === 1000) {
            charCount.style.color = '#ff5f57'; // Red limit
        } else {
            charCount.style.color = 'inherit';
        }
    }
}

/**
 * Handles form submission (EmailJS simulation)
 * Replace this with actual EmailJS integration when ready
 */
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent actual form submission

    const submitButton = event.target.querySelector('.gui-submit');
    const statusDot = event.target.querySelector('.status-dot');
    const statusText = event.target.querySelector('.status-text');

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service_type: document.getElementById('service_type').value,
        project_details: document.getElementById('project_details').value
    };

    // Simulate sending state
    if (statusText) statusText.textContent = 'Sending...';
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
    }

    console.log('📧 EmailJS Simulation - Form Data:', formData);

    // Simulate network delay
    setTimeout(() => {
        // Success simulation
        if (statusDot) {
            statusDot.classList.remove('ready');
            statusDot.style.background = '#28c840';
        }
        if (statusText) statusText.textContent = 'Sent!';

        // Show success message
        alert('✅ Application Simulation: Message sent successfully!\n\n(Configure EmailJS to make this functional)');

        console.log('✅ EmailJS simulation complete');

        // Reset form after delay
        setTimeout(() => {
            event.target.reset();
            populateFormWithExampleData();
            if (statusText) statusText.textContent = 'Ready';
            if (statusDot) statusDot.classList.add('ready');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }
        }, 2000);

    }, 1500);
}

// ========================================
// Smooth Scroll Enhancement
// ========================================

/**
 * Adds smooth scrolling to all anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// Initialization
// ========================================

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio website initialized');

    // Inject contact data from config.js
    injectContactData();

    // Pre-populate form with example data
    populateFormWithExampleData();

    // Set up form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Set up character counter
    const textarea = document.getElementById('project_details');
    if (textarea) {
        textarea.addEventListener('input', updateCharacterCounter);
    }

    // Initialize smooth scrolling
    initSmoothScroll();

    console.log('✅ All features initialized successfully');
});

// ========================================
// Utility: Console Welcome Message
// ========================================

console.log('%c👋 Welcome to Mattia\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cDesigned with Dark Premium Aesthetics', 'font-size: 12px; color: #a1a1aa;');
