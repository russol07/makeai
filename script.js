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
const automations = [];

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
    let platform = document.querySelector('.filter-btn.active')?.dataset.platform || 'all';
    let filtered = automations;
    if (platform !== 'all') {
        filtered = automations.filter(a => a.platform.split(' ').includes(platform));
    } else {
        // Only unique titles for 'all'
        const seen = new Set();
        filtered = automations.filter(a => {
            if (seen.has(a.title)) return false;
            seen.add(a.title);
            return true;
        });
    }
    automationGrid.innerHTML = filtered.map(createAutomationCard).join('');
    enableCardDragAndDrop();
    setupGetStartedButtons();
}

// Filter automations
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Reinitialize grid with new filter
        initializeAutomationGrid();
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
            if (typeof quickOrderModal !== 'undefined') {
                quickOrderModal.style.display = 'flex';
            }
        });
    });
}

// DRAG & DROP for automation cards
function enableCardDragAndDrop() {
    const cards = document.querySelectorAll('.automation-card');
    let dragged = null;
    let ghost = null;

    cards.forEach(card => {
        card.setAttribute('draggable', 'true');
        card.addEventListener('dragstart', (e) => {
            dragged = card;
            card.classList.add('dragging');
            // create ghost
            ghost = card.cloneNode(true);
            ghost.style.opacity = '0';
            document.body.appendChild(ghost);
            e.dataTransfer.setDragImage(ghost, 0, 0);
        });
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            if (ghost) ghost.remove();
            ghost = null;
            dragged = null;
            document.querySelectorAll('.automation-card.over').forEach(c => c.classList.remove('over'));
            document.querySelectorAll('.hero.drag-over').forEach(h => h.classList.remove('drag-over'));
        });
        card.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        card.addEventListener('dragenter', (e) => {
            if (card !== dragged) card.classList.add('over');
        });
        card.addEventListener('dragleave', (e) => {
            card.classList.remove('over');
        });
        card.addEventListener('drop', (e) => {
            e.preventDefault();
            if (card !== dragged) {
                card.parentNode.insertBefore(dragged, card.nextSibling);
            }
            card.classList.remove('over');
        });
    });
    // Hero as dropzone
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('dragover', (e) => {
            e.preventDefault();
            hero.classList.add('drag-over');
        });
        hero.addEventListener('dragleave', (e) => {
            hero.classList.remove('drag-over');
        });
        hero.addEventListener('drop', (e) => {
            e.preventDefault();
            hero.classList.remove('drag-over');
            if (dragged) {
                hero.appendChild(dragged);
                dragged.style.margin = '2rem auto';
                dragged.style.maxWidth = '400px';
            }
        });
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeAutomationGrid();
    setupFAQ();
    createQuickOrderButton();
    setupGetStartedButtons();
    enableCardDragAndDrop();
}); 