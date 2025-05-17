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
    
    // Initialize package selector
    initializePackageSelector();
});

// Also call setupFAQ on window load as a fallback
window.addEventListener('load', () => {
    setupFAQ();
});

// Основні дані пакетів
const packages = [
    { id: 1, name: 'Etsy Ultimate', basePrice: 3999, icon: '🛍️', description: 'Повна автоматизація вашого Etsy магазину з AI-генерацією описів і аналітикою продажів.' },
    { id: 2, name: 'Shopify Ultimate', basePrice: 4999, icon: '🏪', description: 'Комплексна автоматизація Shopify з багатоканальними інтеграціями та маркетинговими інструментами.' },
    { id: 3, name: 'QuickBooks Ultimate', basePrice: 3799, icon: '📊', description: 'Фінансова автоматизація з розпізнаванням чеків та автоматичним виставленням рахунків.' },
    { id: 4, name: 'AI Chatbot Ultimate', basePrice: 4799, icon: '🤖', description: 'Омніканальний AI-чатбот для сайту, WhatsApp, та Instagram з навчанням на власних даних.' },
    { id: 5, name: 'Email Ultimate', basePrice: 2999, icon: '📧', description: 'Автоматизація email-маркетингу з сегментацією, персоналізацією та A/B тестуванням.' },
    { id: 6, name: 'Social Media Ultimate', basePrice: 3699, icon: '📱', description: 'Автоматизація всіх соцмереж з AI-контентом, аналітикою та планувальником.' },
];

// Таблиця знижок
const discountTable = [
    { packages: 1, baseDiscount: 0, communityDiscount: 30 },
    { packages: 2, baseDiscount: 15, communityDiscount: 25 },
    { packages: 3, baseDiscount: 20, communityDiscount: 25 },
    { packages: 4, baseDiscount: 25, communityDiscount: 22 },
    { packages: 5, baseDiscount: 30, communityDiscount: 20 },
    { packages: 6, baseDiscount: 35, communityDiscount: 20 },
];

// Initialize Package Selector
function initializePackageSelector() {
    const packageGrid = document.getElementById('packages-grid');
    const summaryPanel = document.getElementById('summary-panel');
    const emptyCart = document.getElementById('empty-cart');
    const communityToggle = document.getElementById('community-toggle');
    const toggleSlider = document.getElementById('toggle-slider');
    const selectedPackagesList = document.getElementById('selected-packages-list');
    const priceItems = document.getElementById('price-items');
    const nextDiscountAlert = document.getElementById('next-discount-alert');
    const finalPriceElement = document.getElementById('final-price');
    const savingsElement = document.getElementById('savings');
    
    if (!packageGrid) return;
    
    let selectedPackages = [];
    let isUkrainianCommunity = false;
    
    // Render package cards
    packages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = 'package-card';
        card.dataset.id = pkg.id;
        
        card.innerHTML = `
            <div class="package-content">
                <div class="package-icon">${pkg.icon}</div>
                <h3>${pkg.name}</h3>
                <div class="package-description">
                    ${pkg.description}
                </div>
                <div class="package-price">
                    $${pkg.basePrice}
                </div>
                <div class="package-selector-indicator">
                    <span></span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            togglePackage(pkg.id);
        });
        
        packageGrid.appendChild(card);
    });
    
    // Community toggle functionality
    communityToggle.addEventListener('change', () => {
        isUkrainianCommunity = communityToggle.checked;
        toggleSlider.classList.toggle('active', isUkrainianCommunity);
        updateSummary();
    });
    
    // Toggle package selection
    function togglePackage(packageId) {
        const index = selectedPackages.indexOf(packageId);
        
        if (index !== -1) {
            selectedPackages.splice(index, 1);
        } else {
            selectedPackages.push(packageId);
        }
        
        updateCardAppearance();
        updateSummary();
    }
    
    // Update card appearance
    function updateCardAppearance() {
        const cards = document.querySelectorAll('.package-card');
        
        cards.forEach(card => {
            const packageId = parseInt(card.dataset.id);
            const indicator = card.querySelector('.package-selector-indicator span');
            
            const isSelected = selectedPackages.includes(packageId);
            card.classList.toggle('selected', isSelected);
            indicator.classList.toggle('selected', isSelected);
            indicator.textContent = isSelected ? '✓' : '';
        });
    }
    
    // Update summary panel
    function updateSummary() {
        if (selectedPackages.length === 0) {
            summaryPanel.classList.remove('visible');
            emptyCart.style.display = 'block';
            return;
        }
        
        // Show summary panel, hide empty cart
        summaryPanel.classList.add('visible');
        emptyCart.style.display = 'none';
        
        // Update selected packages list
        selectedPackagesList.innerHTML = '';
        
        // Calculate base total
        let baseTotal = 0;
        selectedPackages.forEach(id => {
            const pkg = packages.find(p => p.id === id);
            baseTotal += pkg.basePrice;
            
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${pkg.icon} ${pkg.name}</span>
                <span>$${pkg.basePrice}</span>
            `;
            selectedPackagesList.appendChild(listItem);
        });
        
        // Apply discounts
        const packageCount = selectedPackages.length;
        const discountInfo = discountTable[packageCount - 1];
        
        // Price calculation HTML
        let priceCalculationHTML = `
            <div class="price-item">
                <span>Базова вартість:</span>
                <span>$${baseTotal}</span>
            </div>
        `;
        
        // Base discount calculation
        const baseDiscountAmount = Math.round(baseTotal * discountInfo.baseDiscount / 100);
        const afterBaseDiscount = baseTotal - baseDiscountAmount;
        
        if (packageCount > 1) {
            priceCalculationHTML += `
                <div class="price-item discount">
                    <span>Знижка за кількість пакетів (${discountInfo.baseDiscount}%):</span>
                    <span>-$${baseDiscountAmount}</span>
                </div>
            `;
        }
        
        // Community discount calculation
        let finalPrice = afterBaseDiscount;
        if (isUkrainianCommunity) {
            const communityDiscountAmount = Math.round(afterBaseDiscount * discountInfo.communityDiscount / 100);
            finalPrice = afterBaseDiscount - communityDiscountAmount;
            
            priceCalculationHTML += `
                <div class="price-item discount">
                    <span>Знижка для української спільноти (${discountInfo.communityDiscount}%):</span>
                    <span>-$${communityDiscountAmount}</span>
                </div>
            `;
        }
        
        priceItems.innerHTML = priceCalculationHTML;
        
        // Calculate savings and discount percentage
        const savings = baseTotal - finalPrice;
        const discountPercentage = Math.round((savings / baseTotal) * 1000) / 10; // Round to 1 decimal
        
        // Update totals
        finalPriceElement.textContent = `$${finalPrice}`;
        savingsElement.textContent = `$${savings} (${discountPercentage}%)`;
        
        // Next discount alert
        if (packageCount < 6) {
            const nextDiscount = discountTable[packageCount];
            nextDiscountAlert.style.display = 'block';
            nextDiscountAlert.innerHTML = `
                <p>
                    <strong>Додайте ще один пакет</strong> для отримання знижки ${nextDiscount.baseDiscount}% + 
                    ${isUkrainianCommunity ? `${nextDiscount.communityDiscount}%` : ''}!
                </p>
            `;
        } else {
            nextDiscountAlert.style.display = 'none';
        }
    }
    
    // Initial update
    updateSummary();
} 