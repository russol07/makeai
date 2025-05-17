// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
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

// Accordion functionality
function setupAccordions() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    // Set all accordion items as active by default
    accordionItems.forEach(item => {
        if (!item.classList.contains('active')) {
            item.classList.add('active');
        }
        
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Toggle active class on the clicked item
            const isActive = item.classList.contains('active');
            
            // If the item is active, make it inactive
            if (isActive) {
                item.classList.remove('active');
            } else {
                // Otherwise make it active
                item.classList.add('active');
            }
        });
    });
}

// Category Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const categoryContents = document.querySelectorAll('.category-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        const targetContent = document.getElementById(`${category}-content`);
        
        // Deactivate all tabs and content
        tabButtons.forEach(tab => tab.classList.remove('active'));
        categoryContents.forEach(content => content.classList.remove('active'));
        
        // Activate selected tab and content
        btn.classList.add('active');
        targetContent.classList.add('active');
        
        // Initialize gallery for this category
        initializeGallery(targetContent);
        
        // Initialize accordions for this category
        setupAccordions();
    });
});

// Gallery Functionality
function initializeGallery(container) {
    const gallerySlider = container.querySelector('.gallery-slider');
    const slides = container.querySelectorAll('.gallery-slider img');
    const dotsContainer = container.querySelector('.gallery-dots');
    const prevBtn = container.querySelector('.gallery-prev');
    const nextBtn = container.querySelector('.gallery-next');
    
    if (!gallerySlider || slides.length === 0) return;
    
    // Create dots if needed
    if (dotsContainer && dotsContainer.children.length === 0) {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('gallery-dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    let currentSlide = 0;
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentSlide = index;
        gallerySlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        const dots = container.querySelectorAll('.gallery-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Previous slide
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
    }
    
    // Next slide
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
    }
    
    // Initialize first slide
    goToSlide(0);
}

// Initialize all galleries on page load
function initializeAllGalleries() {
    const activeContent = document.querySelector('.category-content.active');
    if (activeContent) {
        initializeGallery(activeContent);
    }
}

// Automation Process Diagram Interactivity
function initializeProcessDiagram() {
    const startAutomationBtn = document.querySelector('.start-automation-btn');
    const processStepsLinear = document.querySelectorAll('.process-step-linear');
    const stepConnectors = document.querySelectorAll('.step-connector');
    
    if (!startAutomationBtn) return;
    
    // Функція для анімації процесу
    function animateProcess() {
        // Спочатку скинемо всі активні стани
        processStepsLinear.forEach(step => {
            step.classList.remove('active');
            step.querySelector('.step-icon').style.transform = '';
        });
        
        stepConnectors.forEach(connector => {
            connector.classList.remove('active-connector');
        });
        
        // Анімація виконання кроків
        let stepIndex = 0;
        const animateStep = () => {
            if (stepIndex < processStepsLinear.length) {
                // Активація кроку
                processStepsLinear[stepIndex].classList.add('active');
                processStepsLinear[stepIndex].querySelector('.step-icon').style.transform = 'translateY(-5px)';
                
                // Активація конектора після кроку
                if (stepIndex < stepConnectors.length) {
                    setTimeout(() => {
                        stepConnectors[stepIndex].classList.add('active-connector');
                    }, 300);
                }
                
                // Перехід до наступного кроку
                stepIndex++;
                setTimeout(animateStep, 800);
            }
        };
        
        // Початок анімації
        animateStep();
    }
    
    // Додаємо подію до кнопки
    startAutomationBtn.addEventListener('click', function() {
        this.disabled = true;
        this.textContent = 'Автоматизація запущена...';
        this.style.backgroundColor = '#4338ca';
        
        // Запуск анімації
        animateProcess();
        
        // Повернення кнопки до початкового стану
        setTimeout(() => {
            this.disabled = false;
            this.textContent = 'Запустити автоматизацію';
            this.style.backgroundColor = '';
        }, 5000); // Час повного циклу анімації
    });
    
    // Ефект наведення для кроків
    processStepsLinear.forEach(step => {
        step.addEventListener('mouseenter', () => {
            if (!step.classList.contains('active')) {
                step.querySelector('.step-icon').style.transform = 'translateY(-5px)';
            }
        });
        
        step.addEventListener('mouseleave', () => {
            if (!step.classList.contains('active')) {
                step.querySelector('.step-icon').style.transform = '';
            }
        });
    });
}

// Questionnaire Modal
const modal = document.getElementById('questionnaire-modal');
const questionnaireBtns = document.querySelectorAll('.questionnaire-btn');
const closeModal = document.querySelector('.close-modal');
const questFrame = document.getElementById('questionnaire-frame');

// Map of category to form URLs
const formUrls = {
    'etsy': 'https://docs.google.com/forms/d/e/1FAIpQLSfFJ8eX7Wln13MILIXsdSGmD3FQ5M9mip0j-5j7zTqbZyf61w/viewform?embedded=true',
    'shopify': 'https://docs.google.com/forms/d/e/1FAIpQLSfFJ8eX7Wln13MILIXsdSGmD3FQ5M9mip0j-5j7zTqbZyf61w/viewform?embedded=true',
    'chatbots': 'https://docs.google.com/forms/d/e/1FAIpQLSfFJ8eX7Wln13MILIXsdSGmD3FQ5M9mip0j-5j7zTqbZyf61w/viewform?embedded=true',
    'email': 'https://docs.google.com/forms/d/e/1FAIpQLSfFJ8eX7Wln13MILIXsdSGmD3FQ5M9mip0j-5j7zTqbZyf61w/viewform?embedded=true',
    'quickbooks': 'https://docs.google.com/forms/d/e/1FAIpQLSfFJ8eX7Wln13MILIXsdSGmD3FQ5M9mip0j-5j7zTqbZyf61w/viewform?embedded=true',
    'social': 'https://docs.google.com/forms/d/e/1FAIpQLSfFJ8eX7Wln13MILIXsdSGmD3FQ5M9mip0j-5j7zTqbZyf61w/viewform?embedded=true',
    'template': 'https://docs.google.com/forms/d/e/1FAIpQLSfFJ8eX7Wln13MILIXsdSGmD3FQ5M9mip0j-5j7zTqbZyf61w/viewform?embedded=true'
};

questionnaireBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        const formUrl = formUrls[category] || formUrls['etsy']; // Default to etsy form if not found
        
        // Set the iframe source
        questFrame.src = formUrl;
        
        // Display modal
        modal.style.display = 'flex';
    });
});

// Template buttons functionality
function setupTemplateButtons() {
    const templateButtons = document.querySelectorAll('.template-button');
    
    templateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Get template name from parent card
            const card = btn.closest('.mini-template-card');
            const templateName = card.querySelector('h5').textContent;
            const templatePrice = card.querySelector('.template-price').textContent;
            const isWithSetup = btn.classList.contains('with-setup');
            
            // Open the same modal but with template info
            if (questFrame) {
                let queryParams = '&template=' + encodeURIComponent(templateName);
                
                // Add setup parameter if the button is for template + setup
                if (isWithSetup) {
                    queryParams += '&setup=true';
                }
                
                questFrame.src = formUrls['template'] + queryParams;
                
                // Display a small alert with template name and type
                const setupText = isWithSetup ? " with setup" : "";
                const price = isWithSetup ? "$129" : "$59";
                alert(`You're about to order the "${templateName}" template${setupText} for ${price}`);
                
                // Display modal
                modal.style.display = 'flex';
            }
        });
    });
}

// Setup mini-template cards hover effect
function setupCardHoverEffects() {
    const miniTemplateCards = document.querySelectorAll('.mini-template-card');
    
    miniTemplateCards.forEach(card => {
        const description = card.querySelector('p');
        const title = card.querySelector('h5');
        
        card.addEventListener('mouseenter', () => {
            // Make the card grow slightly and show full description
            card.style.zIndex = '10';
            description.style.maxHeight = '300px'; // Ensure full description is visible
            description.style.opacity = '1';
            
            // Show full title without line clamp
            title.style.webkitLineClamp = 'unset';
            title.style.maxHeight = '100px';
            title.style.minHeight = 'auto';
        });
        
        card.addEventListener('mouseleave', () => {
            // Return card to normal state
            card.style.zIndex = '1';
            
            // Reset title to default (2 lines)
            title.style.webkitLineClamp = '2';
            title.style.minHeight = '3em';
        });
    });
}

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// FAQ functionality
function setupFAQ() {
    console.log("Setting up FAQ functionality");
    const faqItems = document.querySelectorAll('.faq-item');
    console.log("Found FAQ items:", faqItems.length);
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const span = question.querySelector('span');
        
        // Ensure initial state
        if (answer) {
            // Force display none initially
            answer.style.display = 'none';
            
            question.addEventListener('click', () => {
                console.log("FAQ question clicked");
                const isOpen = answer.style.display === 'block';
                
                // Toggle this answer's visibility
                answer.style.display = isOpen ? 'none' : 'block';
                
                // Toggle plus/minus sign
                if (span) {
                    span.textContent = isOpen ? '+' : '-';
                }
                
                // Toggle active class for styling
                item.classList.toggle('active', !isOpen);
            });
        }
    });
}

// Document Ready Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all galleries
    initializeAllGalleries();
    
    // Initialize template buttons
    setupTemplateButtons();
    
    // Initialize card hover effects
    setupCardHoverEffects();
    
    // Initialize accordions
    setupAccordions();
    
    // Initialize automation process diagram
    initializeProcessDiagram();
    
    // Setup FAQ functionality
    setupFAQ();
});

// Also call setupFAQ on window load as a fallback
window.addEventListener('load', () => {
    setupFAQ();
}); 