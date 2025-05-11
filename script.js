// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Platform Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const automationGrid = document.querySelector('.automation-grid');

// Sample automation data
const automations = [
    // Shopify Automations
    {
        platform: 'shopify',
        title: 'Shopify Listing Creation',
        description: 'Automatically create product listings on Shopify from photos.',
        price: '$69.99'
    },
    {
        platform: 'shopify etsy',
        title: 'Shopify to Etsy Sync',
        description: 'Create listings on Shopify with automatic updates to Etsy. (Requires a paid tunnel for product export from Shopify.)',
        price: '$99.99'
    },
    {
        platform: 'shopify',
        title: 'Shopify Bulk Update',
        description: 'Update titles, descriptions, and tags for all Shopify products.',
        price: '$69.99'
    },
    {
        platform: 'shopify',
        title: 'Personalized Automation & Prompt Engineering',
        description: 'Custom automation setup and prompt engineering for your business. Tailored solutions for your unique workflows and AI needs.',
        price: '$69.99/hour'
    },
    // Etsy Automations
    {
        platform: 'etsy',
        title: 'Etsy Listing Creation',
        description: 'Automatically create product listings on Etsy from photos.',
        price: '$69.99'
    },
    {
        platform: 'etsy',
        title: 'Etsy Tag Update from Google Sheets',
        description: 'Bulk tag updates for Etsy listings from Google Sheets.',
        price: '$69.99'
    },
    {
        platform: 'etsy',
        title: 'Etsy Bulk Listing Update',
        description: 'Update titles, descriptions, and tags for multiple Etsy listings.',
        price: '$69.99'
    },
    {
        platform: 'etsy',
        title: 'Personalized Automation & Prompt Engineering',
        description: 'Custom automation setup and prompt engineering for your business. Tailored solutions for your unique workflows and AI needs.',
        price: '$69.99/hour'
    },
    // Integrations and Custom Workflows
    {
        platform: 'etsy shopify',
        title: 'Etsy to Shopify Sync',
        description: 'Automatically create Shopify listings with real-time updates from Etsy.',
        price: '$99.99'
    },
    {
        platform: 'custom',
        title: 'Custom Automation Setup',
        description: 'Fully custom automation scripts tailored to your business needs.',
        price: 'Starting at $399.99'
    },
    {
        platform: 'custom',
        title: 'Personalized Automation & Prompt Engineering',
        description: 'Custom automation setup and prompt engineering for your business. Tailored solutions for your unique workflows and AI needs.',
        price: '$69.99/hour'
    },
    // Additional Services
    {
        platform: 'custom',
        title: 'Prompt Engineering',
        description: 'Custom prompt development for AI automation tasks.',
        price: '$69.99/hour'
    },
    {
        platform: 'custom',
        title: 'Remote Scenario Setup and Consultation',
        description: 'Personalized remote setup and consultation for automation scripts.',
        price: '$69.99/hour'
    },
    {
        platform: 'custom',
        title: 'Personalized Automation & Prompt Engineering',
        description: 'Custom automation setup and prompt engineering for your business. Tailored solutions for your unique workflows and AI needs.',
        price: '$69.99/hour'
    }
];

// Function to create automation cards
function createAutomationCard(automation) {
    return `
        <div class="automation-card" data-platform="${automation.platform}" style="display:flex;flex-direction:column;height:100%;">
            <div style="flex-grow:1;">
                <h3>${automation.title}</h3>
                <p>${automation.description}</p>
                <div class="automation-price">${automation.price}</div>
            </div>
            <button class="primary-button" style="margin-top:auto;">Get Started</button>
        </div>
    `;
}

// Initialize automation grid
function initializeAutomationGrid() {
    automationGrid.innerHTML = automations.map(createAutomationCard).join('');
}

// Filter automations
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const platform = button.dataset.platform;
        const cards = document.querySelectorAll('.automation-card');

        cards.forEach(card => {
            if (platform === 'all' || card.dataset.platform === platform) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// FAQ Accordion
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

// Quick Order Button & Modal
let quickOrderModal;
function createQuickOrderButton() {
    const btn = document.createElement('button');
    btn.className = 'quick-order-btn';
    btn.innerHTML = 'Quick Order 🚀';
    document.body.appendChild(btn);

    // Modal
    quickOrderModal = document.createElement('div');
    quickOrderModal.style.display = 'none';
    quickOrderModal.style.position = 'fixed';
    quickOrderModal.style.top = '0';
    quickOrderModal.style.left = '0';
    quickOrderModal.style.width = '100vw';
    quickOrderModal.style.height = '100vh';
    quickOrderModal.style.background = 'rgba(36, 16, 61, 0.25)';
    quickOrderModal.style.zIndex = '3000';
    quickOrderModal.style.justifyContent = 'center';
    quickOrderModal.style.alignItems = 'center';
    quickOrderModal.innerHTML = `
      <div style="background:#fff; border-radius:1.2rem; padding:2.5rem 2rem; min-width:320px; max-width:90vw; box-shadow:0 8px 32px rgba(124,58,237,0.16); position:relative;">
        <button id="closeQuickOrder" style="position:absolute;top:1rem;right:1rem;font-size:1.5rem;background:none;border:none;cursor:pointer;color:#7c3aed;">&times;</button>
        <h3 style="margin-bottom:1rem;">Quick Order</h3>
        <form id="quickOrderForm" style="display:flex;flex-direction:column;gap:1rem;">
          <input type="text" placeholder="Your Name" required style="padding:0.8rem;border-radius:0.5rem;border:1px solid #e5e7eb;">
          <input type="email" placeholder="Email" required style="padding:0.8rem;border-radius:0.5rem;border:1px solid #e5e7eb;">
          <input type="text" placeholder="What do you want to automate?" required style="padding:0.8rem;border-radius:0.5rem;border:1px solid #e5e7eb;">
          <button type="submit" class="primary-button" style="width:100%;">Send Order</button>
        </form>
      </div>
    `;
    document.body.appendChild(quickOrderModal);

    btn.addEventListener('click', () => {
        quickOrderModal.style.display = 'flex';
    });
    quickOrderModal.addEventListener('click', (e) => {
        if (e.target === quickOrderModal) quickOrderModal.style.display = 'none';
    });
    quickOrderModal.querySelector('#closeQuickOrder').onclick = () => {
        quickOrderModal.style.display = 'none';
    };
    quickOrderModal.querySelector('#quickOrderForm').onsubmit = (e) => {
        e.preventDefault();
        alert('Thank you! We will contact you soon.');
        quickOrderModal.style.display = 'none';
    };

    // Customization button logic
    setTimeout(() => {
        document.querySelectorAll('.order-customization-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                quickOrderModal.style.display = 'flex';
            });
        });
    }, 500);
}

// Show Quick Order modal on 'Get Started' button click
function setupGetStartedButtons() {
    document.querySelectorAll('.primary-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const card = btn.closest('.automation-card');
            const title = card ? card.querySelector('h3, h4')?.textContent?.trim() : '';
            if (title === 'Etsy Listing Creation') {
                window.open('https://square.link/u/IRjPM1ja', '_blank');
                return;
            }
            if (typeof quickOrderModal !== 'undefined') {
                quickOrderModal.style.display = 'flex';
            }
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeAutomationGrid();
    
    // Add scroll event listener for navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'var(--background)';
            navbar.style.boxShadow = 'none';
        }
    });
    setupFAQ();
    createQuickOrderButton();
    setupGetStartedButtons();
}); 