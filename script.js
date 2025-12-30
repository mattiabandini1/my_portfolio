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
        // Preserve icon, update text
        const icon = el.querySelector('i');
        if (icon) {
            el.innerHTML = `<i class="${icon.className}"></i> ${SITE_CONFIG.email}`;
        } else {
            el.textContent = SITE_CONFIG.email;
        }
        el.title = SITE_CONFIG.email;
    });

    // Inject LinkedIn links
    const linkedinElements = document.querySelectorAll('#contact-linkedin, #footer-linkedin');
    linkedinElements.forEach(el => {
        el.href = SITE_CONFIG.linkedin_url;
        // Preserve icon, use fixed display name
        const icon = el.querySelector('i');
        if (icon) {
            el.innerHTML = `<i class="${icon.className}"></i> Mattia Bandini`;
        }
        el.title = 'LinkedIn Profile';
    });

    // Inject GitHub links
    const githubElements = document.querySelectorAll('#contact-github, #footer-github');
    githubElements.forEach(el => {
        el.href = SITE_CONFIG.github_url;
        // Preserve icon, extract username from URL
        const icon = el.querySelector('i');
        const username = SITE_CONFIG.github_url.split('.com/')[1]?.replace('/', '') || 'GitHub';
        if (icon) {
            el.innerHTML = `<i class="${icon.className}"></i> ${username}`;
        }
        el.title = 'GitHub Profile';
    });

    // Inject X (Twitter) links
    const xElements = document.querySelectorAll('#contact-x, #footer-x');
    xElements.forEach(el => {
        el.href = SITE_CONFIG.x_url;
        // Extract username
        const urlParts = (SITE_CONFIG.x_url || '').split('.com/');
        const username = urlParts[1] ? urlParts[1].replace(/\/$/, '') : 'X';

        // Always force the icon HTML to ensure it's present
        el.innerHTML = `<i class="fab fa-x-twitter"></i> ${username}`;
        el.title = 'X Profile';
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

// ========================================
// EmailJS Initialization
// ========================================

// Initialize EmailJS with Public Key
(function () {
    emailjs.init("j7mu18A8wbHzbIqXZ");
})();

/**
 * Handles form submission with EmailJS
 */
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent page reload

    const form = event.target;
    const submitButton = form.querySelector('.gui-submit');
    const statusDot = form.querySelector('.status-dot');
    const statusText = form.querySelector('.status-text');

    // Store original button text
    const originalBtnText = submitButton.innerHTML;

    // Update UI to "Sending..."
    if (statusText) statusText.textContent = 'Sending...';
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        submitButton.innerHTML = '<span>Sending...</span>';
    }

    // Send form using EmailJS
    // Service ID: service_xkz6z9g
    // Template ID: template_7am8ns9
    emailjs.sendForm('service_xkz6z9g', 'template_7am8ns9', form)
        .then(function () {
            // SUCCESS
            console.log('✅ Email sent successfully!');

            if (statusDot) {
                statusDot.classList.remove('ready');
                statusDot.style.background = '#28c840';
            }
            if (statusText) statusText.textContent = 'Sent!';
            if (submitButton) {
                submitButton.innerHTML = '<span>Sent!</span> <i class="fas fa-check"></i>';
            }

            alert('✅ Message sent successfully! I will get back to you soon.');

            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                updateCharacterCounter(); // Reset counter to 0

                if (statusText) statusText.textContent = 'Ready';
                if (statusDot) {
                    statusDot.classList.add('ready');
                    statusDot.style.background = '';
                }
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.style.opacity = '1';
                    submitButton.innerHTML = originalBtnText;
                }
            }, 3000);

        }, function (error) {
            // ERROR
            console.error('❌ EmailJS Error:', error);

            if (statusText) statusText.textContent = 'Error';
            if (submitButton) {
                submitButton.innerHTML = '<span>Error</span> <i class="fas fa-times"></i>';
            }

            alert('❌ Failed to send message. Please try again or email me directly at info@mattiabandini.com');

            // Re-enable button
            setTimeout(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.style.opacity = '1';
                    submitButton.innerHTML = originalBtnText;
                }
                if (statusText) statusText.textContent = 'Ready';
            }, 3000);
        });
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
