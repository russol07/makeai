// Cleanup script for Automation Hub website
// This script will remove unwanted elements and standardize content

document.addEventListener('DOMContentLoaded', function() {
    // Set approved prices for all products
    const approvedPrices = {
        'etsy': 3300,
        'shopify': 5000,
        'chatbots': 5500,
        'email': 3000,
        'quickbooks': 3600,
        'social': 4200
    };
    
    // Set approved monthly subscription prices
    const approvedMonthlyPrice = 149;
    
    // Approved images for products
    const approvedImages = {
        'etsy': 'images/image987.png',
        'shopify': 'images/3244fff.png',
        'chatbots': 'images/4455qwqw.webp',
        'email': 'images/909011.png',
        'quickbooks': 'images/445555ddfd.webp',
        'social': 'images/4343dddss.png'
    };
    
    // Clean up the website
    cleanupWebsite();
    
    function cleanupWebsite() {
        // 1. Remove all promo code sections
        removePromoCodeSections();
        
        // 2. Standardize prices
        standardizePrices();
        
        // 3. Remove unnecessary images and keep only approved ones
        cleanupImages();
        
        // 4. Remove "Coming Soon" labels
        removeComingSoonLabels();
        
        // 5. Remove Ukrainian text and standardize language
        standardizeLanguage();
        
        // 6. Remove Svoi mode indicator and related elements
        removeSvoiModeElements();
        
        // 7. Clean up styling inconsistencies
        cleanupStyles();
    }
    
    function removePromoCodeSections() {
        // Remove all promo code containers
        const promoContainers = document.querySelectorAll('.product-promo-code, .ua-promo-container');
        promoContainers.forEach(container => {
            container.remove();
        });
        
        // Remove discount price displays
        const discountedPriceDisplays = document.querySelectorAll('.discounted-price-display');
        discountedPriceDisplays.forEach(element => {
            element.remove();
        });
    }
    
    function standardizePrices() {
        // Get all category content sections
        const categoryContents = document.querySelectorAll('.category-content');
        
        categoryContents.forEach(content => {
            const categoryId = content.id;
            const category = categoryId.replace('-content', '');
            
            // Find the price tag in this category
            const priceTag = content.querySelector('.price-tag .original-price-display');
            if (priceTag && approvedPrices[category]) {
                priceTag.textContent = '$' + approvedPrices[category];
                priceTag.style.textDecoration = 'none';
                priceTag.style.color = '#8B5CF6';
            }
            
            // Find the subscription price
            const subscriptionPrice = content.querySelector('.subscription .original-price-display');
            if (subscriptionPrice) {
                subscriptionPrice.textContent = '$' + approvedMonthlyPrice;
                subscriptionPrice.style.textDecoration = 'none';
                subscriptionPrice.style.color = 'inherit';
            }
        });
        
        // Update mini template prices
        const templatePrices = document.querySelectorAll('.template-price');
        templatePrices.forEach(price => {
            price.textContent = '$59';
        });
        
        const setupPrices = document.querySelectorAll('.setup-price');
        setupPrices.forEach(price => {
            const originalPrice = price.querySelector('.original-price-display');
            if (originalPrice) {
                originalPrice.textContent = '$129';
                originalPrice.style.textDecoration = 'none';
            } else {
                price.textContent = 'Setup price: $129';
            }
        });
    }
    
    function cleanupImages() {
        // Keep only the first approved image for each product
        Object.keys(approvedImages).forEach(category => {
            const content = document.getElementById(`${category}-content`);
            if (!content) return;
            
            const gallerySlider = content.querySelector('.gallery-slider');
            if (!gallerySlider) return;
            
            // Remove all images
            const allImages = gallerySlider.querySelectorAll('img');
            allImages.forEach(img => {
                img.remove();
            });
            
            // Add the approved image
            const approvedImg = document.createElement('img');
            approvedImg.src = approvedImages[category];
            approvedImg.alt = `${category.charAt(0).toUpperCase() + category.slice(1)} Automation`;
            approvedImg.style.maxHeight = '600px';
            approvedImg.style.objectFit = 'contain';
            gallerySlider.appendChild(approvedImg);
        });
        
        // Clean up mini template images
        const miniTemplateImages = document.querySelectorAll('.mini-template-card .template-image img');
        miniTemplateImages.forEach(img => {
            // Ensure each image has proper fallback
            img.onerror = "this.src='https://via.placeholder.com/150x150/f0f0f0/888888?text=Template'; this.onerror='';";
        });
    }
    
    function removeComingSoonLabels() {
        const comingSoonLabels = document.querySelectorAll('.coming-soon-label');
        comingSoonLabels.forEach(label => {
            label.remove();
        });
    }
    
    function standardizeLanguage() {
        // Change Ukrainian buttons to English
        document.querySelectorAll('.mobile-toggle').forEach(button => {
            if (button.textContent === 'Опис') {
                button.textContent = 'Description';
            } else if (button.textContent === 'Деталі') {
                button.textContent = 'Details';
            }
        });
        
        // Update other Ukrainian text if any
        const benefitsHeading = document.querySelector('#benefits h2');
        if (benefitsHeading && benefitsHeading.textContent === 'Переваги Автоматизації') {
            benefitsHeading.textContent = 'Automation Benefits';
        }
        
        const processHeading = document.querySelector('#automation-process h2');
        if (processHeading && processHeading.textContent === 'Автоматизований робочий процес') {
            processHeading.textContent = 'Automated Workflow';
        }
        
        const processDescription = document.querySelector('.process-description');
        if (processDescription && processDescription.textContent === 'Побачте, як працює автоматизація в реальному часі. Жодних ручних дій не потрібно!') {
            processDescription.textContent = 'See how automation works in real-time. No manual actions required!';
        }
    }
    
    function removeSvoiModeElements() {
        // Remove Svoi mode indicator
        const svoiModeIndicator = document.getElementById('svoi-mode-indicator');
        if (svoiModeIndicator) {
            svoiModeIndicator.remove();
        }
        
        // Remove original-price-display classes which may have special styling
        document.querySelectorAll('.original-price-display').forEach(element => {
            element.className = '';
        });
    }
    
    function cleanupStyles() {
        // Remove any inline styles that may interfere with clean presentation
        document.querySelectorAll('[style*="text-decoration"]').forEach(element => {
            element.style.textDecoration = '';
        });
        
        // Ensure consistent font sizes
        document.querySelectorAll('.price-tag span').forEach(element => {
            element.style.fontSize = '1.8rem';
        });
        
        // Make sure all cards have consistent height
        document.querySelectorAll('.feature-card').forEach(card => {
            card.style.height = 'auto';
        });
    }
}); 