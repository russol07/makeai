// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
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
    
    // Package selector removed
});

// Also call setupFAQ on window load as a fallback
window.addEventListener('load', () => {
    setupFAQ();
});

// Package data removed

// Package Selector functionality removed

// Svoi Mode Functionality
document.addEventListener('DOMContentLoaded', function() {
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

// Mobile collapsible sections functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile collapsible sections
    const mobileToggles = document.querySelectorAll('.mobile-toggle');
    
    mobileToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const parent = this.closest('.mobile-collapsible');
            
            // Close other open sections
            document.querySelectorAll('.mobile-collapsible.active').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle active class on parent
            parent.classList.toggle('active');
            
            // Toggle active class on toggle
            this.classList.toggle('active');
        });
    });
    
    // Auto-collapse sections on mobile when not in viewport
    if (window.innerWidth <= 768) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When element is off screen for more than 50%
                if (!entry.isIntersecting && entry.intersectionRatio < 0.5) {
                    const mobileCollapsible = entry.target.closest('.mobile-collapsible');
                    if (mobileCollapsible && mobileCollapsible.classList.contains('active')) {
                        mobileCollapsible.classList.remove('active');
                    }
                }
            });
        }, { threshold: 0.5 });
        
        // Observe all collapsible content
        document.querySelectorAll('.mobile-collapsible-content').forEach(content => {
            observer.observe(content);
        });
    }
});

// Gallery slider without animations
function initializeGallerySliders() {
    const galleries = document.querySelectorAll('.gallery-slider');
    
    galleries.forEach(gallery => {
        const slides = gallery.querySelectorAll('img');
        const dotsContainer = gallery.parentElement.querySelector('.gallery-dots');
        const prevBtn = gallery.parentElement.querySelector('.gallery-prev');
        const nextBtn = gallery.parentElement.querySelector('.gallery-next');
        
        if (!slides.length) return;
        
        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('gallery-dot');
                if (index === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            });
        }
        
        // Show first slide
        slides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'block' : 'none';
        });
        
        // Simple non-animated slide change
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
            
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.gallery-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        }
        
        // Navigation
        let currentIndex = 0;
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(currentIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            });
        }
        
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.gallery-dot');
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    showSlide(currentIndex);
                });
            });
        }
    });
}

// Package Builder functionality removed

// Initialize and render accordion sections (no animations)
function initializeAccordions() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon');
        
        // Skip if elements don't exist
        if (!header || !content || !icon) return;
        
        // Set initial state - if item has 'active' class, show content
        if (item.classList.contains('active')) {
            content.style.display = 'block';
            icon.textContent = '-';
        } else {
            content.style.display = 'none';
            icon.textContent = '+';
        }
        
        header.addEventListener('click', () => {
            // Toggle active state
            const isActive = item.classList.contains('active');
            
            if (isActive) {
                item.classList.remove('active');
                content.style.display = 'none';
                icon.textContent = '+';
            } else {
                item.classList.add('active');
                content.style.display = 'block';
                icon.textContent = '-';
            }
        });
    });
}

// Mobile navigation menu toggle
function initializeMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Mobile collapsible sections
function initializeMobileCollapsible() {
    const toggleBtns = document.querySelectorAll('.mobile-toggle');
    
    toggleBtns.forEach(btn => {
        const content = btn.closest('.mobile-collapsible').querySelector('.mobile-collapsible-content');
        
        if (!content) return;
        
        // Set initial state
        content.style.display = 'none';
        
        btn.addEventListener('click', () => {
            const isVisible = content.style.display === 'block';
            content.style.display = isVisible ? 'none' : 'block';
        });
    });
}

// Questionnaire modal functionality
function initializeQuestionnaire() {
    const questionnaireBtns = document.querySelectorAll('.questionnaire-btn');
    const modal = document.getElementById('questionnaire-modal');
    const closeModal = document.querySelector('.close-modal');
    const iframe = document.getElementById('questionnaire-frame');
    
    if (!modal || !closeModal || !iframe) return;
    
    questionnaireBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category || 'general';
            const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfFJ8eX7Wln13MILIXsdSGmD3FQ5M9mip0j-5j7zTqbZyf61w/viewform?embedded=true&entry.1728962477=${category}`;
            iframe.src = formUrl;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGallerySliders();
    // Package Builder removed
    initializeAccordions();
    initializeMobileNav();
    initializeMobileCollapsible();
    initializeQuestionnaire();
    
    // Initialize category tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const categoryContents = document.querySelectorAll('.category-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Update active tab
            tabBtns.forEach(tab => tab.classList.remove('active'));
            btn.classList.add('active');
            
            // Update content visibility
            categoryContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${category}-content`) {
                    content.classList.add('active');
                }
            });
        });
    });
}); 