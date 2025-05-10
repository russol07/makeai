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
    {
        platform: 'shopify',
        title: 'Shopify Order Automation',
        description: 'Automate order processing and inventory management',
        price: '$49/month'
    },
    {
        platform: 'etsy',
        title: 'Etsy Listing Manager',
        description: 'Automate product listings and inventory sync',
        price: '$39/month'
    },
    {
        platform: 'make',
        title: 'Make.com Integration',
        description: 'Connect your apps and automate workflows',
        price: '$59/month'
    },
    {
        platform: 'monday',
        title: 'Monday.com Task Automation',
        description: 'Automate task assignments and project management',
        price: '$29/month'
    },
    {
        platform: 'telegram',
        title: 'Telegram Notification Bot',
        description: 'Get instant notifications for important events',
        price: '$19/month'
    }
];

// Function to create automation cards
function createAutomationCard(automation) {
    return `
        <div class="automation-card" data-platform="${automation.platform}">
            <h3>${automation.title}</h3>
            <p>${automation.description}</p>
            <div class="automation-price">${automation.price}</div>
            <button class="primary-button">Get Started</button>
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
}); 