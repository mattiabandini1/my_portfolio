# 🎓 Mattia Bandini - Portfolio Website

A clean, modern, and secure portfolio website showcasing my skills and projects as a Computer Science & Engineering student at the University of Bologna.

## 🌟 Features

- **Modern Dark Mode Design** - Terminal-inspired aesthetics with cyan accents
- **Responsive Layout** - Works seamlessly on all devices
- **Secure Configuration** - Sensitive data separated from source code
- **Terminal-Style Contact Form** - Professional contact interface with EmailJS integration ready
- **Smooth Animations** - Subtle transitions and hover effects
- **Clean Code** - Pure HTML, CSS, and JavaScript (no frameworks)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Set Up Configuration

Create your `config.js` file with your personal information:

```javascript
const SITE_CONFIG = {
    email: 'your.email@example.com',
    linkedin_url: 'https://linkedin.com/in/yourprofile',
    github_url: 'https://github.com/yourusername'
};
```

**⚠️ IMPORTANT:** The `config.js` file is excluded from Git via `.gitignore` to protect your privacy. Never commit this file to a public repository.

### 3. Open the Website

Simply open `index.html` in your web browser:

```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or use a local development server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML structure
├── style.css           # Styling and design
├── script.js           # JavaScript functionality
├── config.js           # Your personal configuration (NOT in Git)
├── .gitignore          # Git exclusion rules
└── README.md           # This file
```

## 🔒 Security Best Practices

### Why Separate Configuration?

This portfolio implements a secure approach to handling sensitive data:

1. **Separation of Concerns** - Personal information is kept in `config.js`, separate from the codebase
2. **Git Exclusion** - `.gitignore` prevents `config.js` from being committed
3. **Easy Updates** - Change your contact info without modifying the main code
4. **Privacy Protection** - Your email and social links stay private until you choose to deploy

### What's Protected?

- Email address
- LinkedIn profile URL
- GitHub profile URL

### Deployment Considerations

When deploying to production:

1. **Option A - Public Contact Info:** Include your `config.js` in the deployment
2. **Option B - Environment Variables:** Use your hosting provider's environment variables feature
3. **Option C - Build Process:** Inject values during build time

## 📧 EmailJS Integration

The contact form is currently a **placeholder** that simulates sending emails. To enable real email functionality:

### Step 1: Sign Up for EmailJS

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account
3. Note your **Public Key** from the dashboard

### Step 2: Create Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Add a new service (Gmail, Outlook, etc.)
3. Note your **Service ID**

### Step 3: Create Email Template

1. Go to **Email Templates**
2. Create a new template with these variables:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{service_type}}` - Selected service type
   - `{{project_details}}` - Project description
3. Note your **Template ID**

### Step 4: Update Your Code

1. Add EmailJS SDK to `index.html` (before `script.js`):

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

2. In `script.js`, find the `handleFormSubmit()` function and replace it with:

```javascript
function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('.terminal-submit');
    const statusIndicator = submitButton.querySelector('.status-indicator');
    const statusText = submitButton.querySelector('.status-text');
    
    statusIndicator.style.background = 'var(--terminal-yellow)';
    statusText.textContent = 'SENDING...';
    submitButton.disabled = true;
    
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', event.target)
        .then(() => {
            statusIndicator.style.background = 'var(--terminal-green)';
            statusText.textContent = 'SENT!';
            alert('Message sent successfully!');
            event.target.reset();
            populateFormWithExampleData();
            setTimeout(() => {
                statusText.textContent = 'READY';
                submitButton.disabled = false;
            }, 2000);
        })
        .catch((error) => {
            statusIndicator.style.background = 'var(--terminal-red)';
            statusText.textContent = 'ERROR';
            alert('Failed to send message. Please try again.');
            console.error('EmailJS Error:', error);
            setTimeout(() => {
                statusIndicator.style.background = 'var(--terminal-green)';
                statusText.textContent = 'READY';
                submitButton.disabled = false;
            }, 2000);
        });
}
```

3. Initialize EmailJS by adding this at the top of `script.js`:

```javascript
// Initialize EmailJS with your public key
emailjs.init('YOUR_PUBLIC_KEY');
```

## 🎨 Customization

### Colors

Edit CSS variables in `style.css`:

```css
:root {
    --accent-primary: #00f0ff;     /* Main accent color */
    --accent-secondary: #00d9ff;   /* Secondary accent */
    --bg-primary: #0a0e27;         /* Main background */
    /* ... more variables ... */
}
```

### Content

1. **Personal Information** - Edit text directly in `index.html`
2. **Projects** - Replace placeholder project cards with your actual projects
3. **Skills** - Modify skill cards and progress bars in the Skills section
4. **About Me** - Update your bio in the About section

### Fonts

The site uses:
- **Inter** - Main text font
- **JetBrains Mono** - Monospace font for code/terminal elements

Change fonts by editing the Google Fonts import in `index.html`.

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints at:
- **Desktop:** > 968px
- **Tablet:** 768px - 968px
- **Mobile:** < 768px

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Vanilla JS for interactivity
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📄 License

This project is open source and available for personal use. Feel free to fork and customize it for your own portfolio!

## 🤝 Contributing

This is a personal portfolio, but suggestions and improvements are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📞 Contact

- **Email:** [Your email from config.js]
- **LinkedIn:** [Your LinkedIn from config.js]
- **GitHub:** [Your GitHub from config.js]

---

**Built with clean code and engineering precision** 🚀

*Computer Science & Engineering Student @ University of Bologna*
