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
    { id: 1, name: 'Etsy Ultimate', basePrice: 3300, icon: '🛍️', description: 'Complete automation of your Etsy store with AI-generated descriptions and sales analytics.' },
    { id: 2, name: 'Shopify Ultimate', basePrice: 5000, icon: '🏪', description: 'Comprehensive Shopify automation with multichannel integrations and marketing tools.' },
    { id: 3, name: 'QuickBooks Ultimate', basePrice: 3600, icon: '📊', description: 'Financial automation with receipt recognition and automatic invoice generation.' },
    { id: 4, name: 'AI Chatbot Ultimate', basePrice: 7800, icon: '🤖', description: 'Omnichannel AI chatbot for website, WhatsApp, and Instagram trained on your own data.' },
    { id: 5, name: 'Email Ultimate', basePrice: 3000, icon: '📧', description: 'Email marketing automation with segmentation, personalization, and A/B testing.' },
    { id: 6, name: 'Social Media Ultimate', basePrice: 4200, icon: '📱', description: 'Automation of all social networks with AI content, analytics, and scheduling.' },
];

// Таблиця знижок
const discountTable = [
    { packages: 1, baseDiscount: 0, communityDiscount: 30 },
    { packages: 2, baseDiscount: 10, communityDiscount: 30 },
    { packages: 3, baseDiscount: 14, communityDiscount: 30 },
    { packages: 4, baseDiscount: 18, communityDiscount: 30 },
    { packages: 5, baseDiscount: 22, communityDiscount: 30 },
    { packages: 6, baseDiscount: 25, communityDiscount: 30 },
];

// Initialize Package Selector
function initializePackageSelector() {
    const packageGrid = document.getElementById('packages-grid');
    const summaryPanel = document.getElementById('summary-panel');
    const emptyCart = document.getElementById('empty-cart');
    const selectedPackagesList = document.getElementById('selected-packages-list');
    const priceItems = document.getElementById('price-items');
    const nextDiscountAlert = document.getElementById('next-discount-alert');
    const finalPriceElement = document.getElementById('final-price');
    const savingsElement = document.getElementById('savings');
    
    if (!packageGrid) return;
    
    let selectedPackages = [];
    
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
                <span>Base price:</span>
                <span>$${baseTotal}</span>
            </div>
        `;
        
        // Base discount calculation
        const baseDiscountAmount = Math.round(baseTotal * discountInfo.baseDiscount / 100);
        const afterBaseDiscount = baseTotal - baseDiscountAmount;
        
        if (packageCount > 1) {
            priceCalculationHTML += `
                <div class="price-item discount">
                    <span>Package bundle discount (${discountInfo.baseDiscount}%):</span>
                    <span>-$${baseDiscountAmount}</span>
                </div>
            `;
        }
        
        // Set final price
        let finalPrice = afterBaseDiscount;
        
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
            
            let nextDiscountText = `
                <p>
                    <strong>Add one more package</strong> to get a ${nextDiscount.baseDiscount}% discount!
                </p>
            `;
            nextDiscountAlert.innerHTML = nextDiscountText;
        } else {
            nextDiscountAlert.style.display = 'none';
        }
    }
    
    // Initial update
    updateSummary();
}

// Svoi Mode Functionality
document.addEventListener('DOMContentLoaded', function() {
    const promoCodeInput = document.getElementById('promo-code');
    const applyPromoBtn = document.getElementById('apply-promo');
    const promoResetBtn = document.getElementById('product-reset-promo-builder');
    const promoMessage = document.getElementById('promo-message');
    const svoiModeIndicator = document.getElementById('svoi-mode-indicator');
    
    // Product promo elements
    const productPromoInput = document.getElementById('product-promo');
    const productApplyPromoBtn = document.getElementById('product-apply-promo');
    
    // Valid promo code
    const validPromoCode = 'SVOI';
    
    // Check if Svoi mode is active in cookie
    function checkSvoiModeCookie() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('svoi_mode=')) {
                return cookie.substring('svoi_mode='.length) === 'true';
            }
        }
        return false;
    }
    
    // Set Svoi mode cookie
    function setSvoiModeCookie(active) {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days
        document.cookie = `svoi_mode=${active}; expires=${expiryDate.toUTCString()}; path=/`;
    }
    
    // Apply discount to all prices
    // Функція для видалення знижки з місячної підтримки
    function removeDiscountFromSubscription() {
        const subscriptions = document.querySelectorAll('.subscription');
        subscriptions.forEach(subscription => {
            const originalPrice = subscription.querySelector('.original-price-display');
            const discountedPrice = subscription.querySelector('.discounted-price-display');
            
            if (originalPrice && discountedPrice) {
                originalPrice.textContent = "$149";
                originalPrice.style.textDecoration = "none";
                originalPrice.style.color = "inherit";
                originalPrice.classList.remove('original-price-crossed');
                discountedPrice.style.display = "none";
            }
        });
    }

    function applyDiscount(active) {
        const originalPriceDisplays = document.querySelectorAll('.original-price-display');
        const discountedPriceDisplays = document.querySelectorAll('.discounted-price-display');
        
        if (active) {
            originalPriceDisplays.forEach(element => {
                element.style.display = 'inline';
                element.classList.add('original-price-crossed');
            });
            
            discountedPriceDisplays.forEach(element => {
                element.style.display = 'inline';
                element.style.color = '#8B5CF6';
                element.style.fontWeight = 'bold';
                // Add the one-time setup text to the last discounted price in each price section
                const parentDiv = element.closest('.price-tag');
                if (parentDiv) {
                    const oneTimeSetupSpan = parentDiv.querySelector('span:not(.original-price-display):not(.discounted-price-display)');
                    if (oneTimeSetupSpan && oneTimeSetupSpan.textContent.includes('one-time setup')) {
                        oneTimeSetupSpan.style.display = 'inline';
                    }
                }
            });
            
            // Видаляємо знижку з місячної підтримки
            removeDiscountFromSubscription();
            
            // Show Svoi mode indicator
            svoiModeIndicator.classList.add('active');
            
            // Update all product promo fields
            function updatePromoField(inputId, applyBtnId, resetBtnId) {
                const inputElem = document.getElementById(inputId);
                const applyBtn = document.getElementById(applyBtnId);
                const resetBtn = document.getElementById(resetBtnId);
                
                if (inputElem && applyBtn && resetBtn) {
                    inputElem.value = validPromoCode;
                    inputElem.disabled = true;
                    applyBtn.textContent = "Applied";
                    applyBtn.disabled = true;
                    applyBtn.style.background = "#4CAF50";
                    resetBtn.classList.add('visible');
                }
            }
            
            // Update all product promo fields
            updatePromoField('product-promo', 'product-apply-promo', 'product-reset-promo');
            updatePromoField('shopify-promo', 'shopify-apply-promo', 'shopify-reset-promo');
            updatePromoField('chatbot-promo', 'chatbot-apply-promo', 'chatbot-reset-promo');
            updatePromoField('email-promo', 'email-apply-promo', 'email-reset-promo');
            updatePromoField('quickbooks-promo', 'quickbooks-apply-promo', 'quickbooks-reset-promo');
            updatePromoField('social-promo', 'social-apply-promo', 'social-reset-promo');
            
            // Update package builder promo code field
            if (promoCodeInput) {
                promoCodeInput.value = validPromoCode;
                promoCodeInput.disabled = true;
                applyPromoBtn.textContent = "Applied";
                applyPromoBtn.disabled = true;
                applyPromoBtn.style.background = "#4CAF50";
                if (promoResetBtn) {
                    promoResetBtn.classList.add('visible');
                }
                if (promoMessage) {
                    promoMessage.textContent = 'Promo code applied successfully!';
                    promoMessage.className = 'promo-message success';
                }
            }
        } else {
            originalPriceDisplays.forEach(element => {
                element.style.display = 'inline';
                element.classList.remove('original-price-crossed');
                element.style.color = '#8B5CF6';
                element.style.fontSize = '2rem';
            });
            
            discountedPriceDisplays.forEach(element => {
                element.style.display = 'none';
            });
            
            // Переконаємось, що місячна підтримка показує $149 без знижки
            removeDiscountFromSubscription();
            
            // Hide Svoi mode indicator
            svoiModeIndicator.classList.remove('active');
            
            // Function to reset promo fields
            function resetPromoField(inputId, applyBtnId, resetBtnId) {
                const inputElem = document.getElementById(inputId);
                const applyBtn = document.getElementById(applyBtnId);
                const resetBtn = document.getElementById(resetBtnId);
                
                if (inputElem && applyBtn && resetBtn) {
                    inputElem.value = "";
                    inputElem.disabled = false;
                    applyBtn.textContent = "Apply";
                    applyBtn.disabled = false;
                    applyBtn.style.background = "linear-gradient(to right, #ffd700, #ebc000)";
                    resetBtn.classList.remove('visible');
                }
            }
            
            // Reset all product promo fields
            resetPromoField('product-promo', 'product-apply-promo', 'product-reset-promo');
            resetPromoField('shopify-promo', 'shopify-apply-promo', 'shopify-reset-promo');
            resetPromoField('chatbot-promo', 'chatbot-apply-promo', 'chatbot-reset-promo');
            resetPromoField('email-promo', 'email-apply-promo', 'email-reset-promo');
            resetPromoField('quickbooks-promo', 'quickbooks-apply-promo', 'quickbooks-reset-promo');
            resetPromoField('social-promo', 'social-apply-promo', 'social-reset-promo');
            
            // Reset package builder promo field
            if (promoCodeInput) {
                promoCodeInput.value = "";
                promoCodeInput.disabled = false;
                applyPromoBtn.textContent = "Apply";
                applyPromoBtn.disabled = false;
                applyPromoBtn.style.background = "linear-gradient(to right, #ffd700, #ebc000)";
                if (promoResetBtn) {
                    promoResetBtn.classList.remove('visible');
                }
                if (promoMessage) {
                    promoMessage.textContent = '';
                }
            }
        }
    }
    
    // Toggle Svoi mode
    function setSvoiMode(active) {
        applyDiscount(active);
        setSvoiModeCookie(active);
        
        // Apply promo code discount if needed
        if (active && typeof applySvoiDiscount === 'function') {
            applySvoiDiscount();
        } else if (!active && typeof updateSummary === 'function') {
            updateSummary();
        }
    }
    
    // Function to apply the SVOI discount to the package builder
    function applySvoiDiscount() {
        // First get the needed elements
        const priceItems = document.getElementById('price-items');
        const finalPriceElement = document.getElementById('final-price');
        const savingsElement = document.getElementById('savings');
        const selectedPackages = Array.from(document.querySelectorAll('.package-card.selected')).map(card => parseInt(card.dataset.id));
        
        if (!priceItems || !finalPriceElement || !savingsElement || selectedPackages.length === 0) {
            return;
        }
        
        // Calculate base price
        let baseTotal = 0;
        selectedPackages.forEach(id => {
            const pkg = packages.find(p => p.id === id);
            if (pkg) baseTotal += pkg.basePrice;
        });
        
        // Calculate package bundle discount
        const packageCount = selectedPackages.length;
        const discountInfo = discountTable[packageCount - 1];
        const baseDiscountAmount = Math.round(baseTotal * discountInfo.baseDiscount / 100);
        const afterBaseDiscount = baseTotal - baseDiscountAmount;
        
        // Apply SVOI promo code discount
        // If 2+ packages selected, apply 40% discount instead of 30%
        const promoDiscountPercent = packageCount >= 2 ? 40 : 30;
        const svoiDiscountAmount = Math.round(afterBaseDiscount * promoDiscountPercent / 100);
        const finalPrice = afterBaseDiscount - svoiDiscountAmount;
        
        // Update the price calculation HTML
        let priceCalculationHTML = `
            <div class="price-item">
                <span>Base price:</span>
                <span>$${baseTotal}</span>
            </div>
        `;
        
        if (packageCount > 1) {
            priceCalculationHTML += `
                <div class="price-item discount">
                    <span>Package bundle discount (${discountInfo.baseDiscount}%):</span>
                    <span>-$${baseDiscountAmount}</span>
                </div>
            `;
        }
        
        priceCalculationHTML += `
            <div class="price-item discount">
                <span>Promo code discount (${promoDiscountPercent}%):</span>
                <span>-$${svoiDiscountAmount}</span>
            </div>
        `;
        
        priceItems.innerHTML = priceCalculationHTML;
        
        // Update final price and savings
        const savings = baseTotal - finalPrice;
        const discountPercentage = Math.round((savings / baseTotal) * 1000) / 10; // Round to 1 decimal
        
        finalPriceElement.textContent = `$${finalPrice}`;
        savingsElement.textContent = `$${savings} (${discountPercentage}%)`;
    }
    
    // Apply promo code from package builder section
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoCode = promoCodeInput.value.trim().toUpperCase();
            
            if (promoCode === validPromoCode || promoCode === 'СВОI' || promoCode === 'УКРАЇНА' || promoCode === 'UKRAINE') {
                if (promoMessage) {
                    promoMessage.textContent = 'Promo code applied successfully!';
                    promoMessage.className = 'promo-message success';
                }
                setSvoiMode(true);
                
                // Check if we have 2+ packages selected for the toast message
                const selectedPackages = document.querySelectorAll('.package-card.selected');
                const discountPercent = selectedPackages.length >= 2 ? 40 : 30;
                
                // Show a quick toast-style notification
                const toast = document.createElement('div');
                toast.className = 'promo-toast';
                toast.textContent = `${discountPercent}% discount applied successfully!`;
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.classList.add('show');
                }, 100);
                
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(toast);
                    }, 500);
                }, 3000);
            } else if (promoCode === '') {
                if (promoMessage) {
                    promoMessage.textContent = 'Please enter a promo code';
                    promoMessage.className = 'promo-message error';
                } else {
                    alert('Please enter a promo code');
                }
            } else {
                if (promoMessage) {
                    promoMessage.textContent = 'Invalid promo code';
                    promoMessage.className = 'promo-message error';
                } else {
                    alert('Invalid promo code');
                }
            }
        });
        
        // Enter key for promo code input
        if (promoCodeInput) {
            promoCodeInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    applyPromoBtn.click();
                }
            });
        }
    }
    
    // Reset promo button functionality for package builder
    if (promoResetBtn) {
        promoResetBtn.addEventListener('click', function() {
            setSvoiMode(false);
            
            // Ensure price calculation is updated correctly
            if (typeof updateSummary === 'function') {
                updateSummary();
            }
        });
    }
    
    // Product-level promo code application for all products
    function setupPromoCode(inputId, applyBtnId, resetBtnId) {
        const inputElem = document.getElementById(inputId);
        const applyBtn = document.getElementById(applyBtnId);
        const resetBtn = document.getElementById(resetBtnId);
        
        if (!inputElem || !applyBtn || !resetBtn) return;
        
        // Function to update reset button visibility
        function updateResetButtonVisibility() {
            if (inputElem.value.trim() !== '' || checkSvoiModeCookie()) {
                resetBtn.classList.add('visible');
            } else {
                resetBtn.classList.remove('visible');
            }
        }
        
        // Check on page load
        updateResetButtonVisibility();
        
        // Update on input change
        inputElem.addEventListener('input', updateResetButtonVisibility);
        
        // Reset promo button functionality
        resetBtn.addEventListener('click', function() {
            inputElem.value = '';
            inputElem.disabled = false;
            applyBtn.textContent = "Apply";
            applyBtn.disabled = false;
            applyBtn.style.background = "linear-gradient(to right, #ffd700, #ebc000)";
            setSvoiMode(false);
            resetBtn.classList.remove('visible');
        });
        
        // Apply promo button functionality
        applyBtn.addEventListener('click', function() {
            const promoCode = inputElem.value.trim().toUpperCase();
            
            if (promoCode === validPromoCode || promoCode === 'СВОI' || promoCode === 'УКРАЇНА' || promoCode === 'UKRAINE') {
                setSvoiMode(true);
                resetBtn.classList.add('visible');
                
                // Check if we have 2+ packages selected for the toast message
                const selectedPackages = document.querySelectorAll('.package-card.selected');
                const discountPercent = selectedPackages.length >= 2 ? 40 : 30;
                
                // Show a quick toast-style notification
                const toast = document.createElement('div');
                toast.className = 'promo-toast';
                toast.textContent = `${discountPercent}% discount applied successfully!`;
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.classList.add('show');
                }, 100);
                
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(toast);
                    }, 500);
                }, 3000);
            } else if (promoCode === '') {
                alert('Please enter a promo code');
            } else {
                alert('Invalid promo code');
            }
        });
        
        // Enter key for product promo code input
        inputElem.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyBtn.click();
            }
        });
    }
    
    // Setup promo code fields for all product cards
    setupPromoCode('product-promo', 'product-apply-promo', 'product-reset-promo'); // Etsy
    setupPromoCode('shopify-promo', 'shopify-apply-promo', 'shopify-reset-promo'); // Shopify
    setupPromoCode('chatbot-promo', 'chatbot-apply-promo', 'chatbot-reset-promo'); // Chatbot
    setupPromoCode('email-promo', 'email-apply-promo', 'email-reset-promo'); // Email
    setupPromoCode('quickbooks-promo', 'quickbooks-apply-promo', 'quickbooks-reset-promo'); // QuickBooks
    setupPromoCode('social-promo', 'social-apply-promo', 'social-reset-promo'); // Social Media
    
    // Check cookie on page load
    const isSvoiMode = checkSvoiModeCookie();
    if (isSvoiMode) {
        setSvoiMode(true);
    }
    
    // Update visibility of package builder promo code reset button
    if (promoCodeInput && promoResetBtn) {
        promoCodeInput.addEventListener('input', function() {
            if (promoCodeInput.value.trim() !== '' || checkSvoiModeCookie()) {
                promoResetBtn.classList.add('visible');
            } else {
                promoResetBtn.classList.remove('visible');
            }
        });
        
        // Check initial state
        if (promoCodeInput.value.trim() !== '' || checkSvoiModeCookie()) {
            promoResetBtn.classList.add('visible');
        } else {
            promoResetBtn.classList.remove('visible');
        }
    }
    
    // Видаляємо знижки з місячної підтримки при загрузці сторінки
    removeDiscountFromSubscription();
}); 