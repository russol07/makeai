import React, { useState, useEffect } from 'react';
import './PackageSelector.css';

const PackageSelector = () => {
  // Package data
  const packages = [
    { id: 1, name: 'Etsy Ultimate', basePrice: 3999, icon: '🛍️', description: 'Complete automation of your Etsy store with AI-generated descriptions and sales analytics.' },
    { id: 2, name: 'Shopify Ultimate', basePrice: 4999, icon: '🏪', description: 'Comprehensive Shopify automation with multichannel integrations and marketing tools.' },
    { id: 3, name: 'QuickBooks Ultimate', basePrice: 3799, icon: '📊', description: 'Financial automation with receipt recognition and automatic invoice generation.' },
    { id: 4, name: 'AI Chatbot Ultimate', basePrice: 4799, icon: '🤖', description: 'Omnichannel AI chatbot for website, WhatsApp, and Instagram trained on your own data.' },
    { id: 5, name: 'Email Ultimate', basePrice: 2999, icon: '📧', description: 'Email marketing automation with segmentation, personalization, and A/B testing.' },
    { id: 6, name: 'Social Media Ultimate', basePrice: 3699, icon: '📱', description: 'Automation of all social networks with AI content, analytics, and scheduling.' },
  ];

  // Discount table
  const discountTable = [
    { packages: 1, baseDiscount: 0, communityDiscount: 30 },
    { packages: 2, baseDiscount: 15, communityDiscount: 25 },
    { packages: 3, baseDiscount: 20, communityDiscount: 25 },
    { packages: 4, baseDiscount: 25, communityDiscount: 22 },
    { packages: 5, baseDiscount: 30, communityDiscount: 20 },
    { packages: 6, baseDiscount: 35, communityDiscount: 20 },
  ];

  // State
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [isUkrainianCommunity, setIsUkrainianCommunity] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const [effectiveDiscount, setEffectiveDiscount] = useState(0);
  const [nextDiscount, setNextDiscount] = useState(null);

  // Handle package selection
  const togglePackage = (packageId) => {
    if (selectedPackages.includes(packageId)) {
      setSelectedPackages(selectedPackages.filter(id => id !== packageId));
    } else {
      setSelectedPackages([...selectedPackages, packageId]);
    }
  };

  // Calculate prices when selected packages change
  useEffect(() => {
    if (selectedPackages.length === 0) {
      setTotalPrice(0);
      setSavings(0);
      setEffectiveDiscount(0);
      setNextDiscount(discountTable[0]);
      return;
    }

    // Base total of all selected packages
    const baseTotal = selectedPackages.reduce((sum, id) => {
      const pkg = packages.find(p => p.id === id);
      return sum + pkg.basePrice;
    }, 0);

    // Apply discounts
    const packageCount = selectedPackages.length;
    const discountInfo = discountTable[packageCount - 1];
    
    // Intermediate price after base discount
    const afterBaseDiscount = baseTotal * (1 - discountInfo.baseDiscount / 100);
    
    // Final price after community discount
    const finalPrice = isUkrainianCommunity 
      ? afterBaseDiscount * (1 - discountInfo.communityDiscount / 100) 
      : afterBaseDiscount;
    
    // Total effective discount
    const totalDiscount = ((baseTotal - finalPrice) / baseTotal) * 100;
    
    setTotalPrice(Math.round(finalPrice));
    setSavings(Math.round(baseTotal - finalPrice));
    setEffectiveDiscount(Math.round(totalDiscount * 10) / 10);
    
    // Information about next discount level
    if (packageCount < 6) {
      setNextDiscount(discountTable[packageCount]);
    } else {
      setNextDiscount(null);
    }
  }, [selectedPackages, isUkrainianCommunity]);

  return (
    <div className="package-selector">
      <h2>Select Automation Packages</h2>
      
      {/* Ukrainian community toggle */}
      <div className="community-toggle">
        <label className="toggle-label">
          <span>Ukrainian Business Community</span>
          <div className="toggle-switch">
            <input 
              type="checkbox" 
              checked={isUkrainianCommunity}
              onChange={() => setIsUkrainianCommunity(!isUkrainianCommunity)}
            />
            <div className={`toggle-slider ${isUkrainianCommunity ? 'active' : ''}`}></div>
          </div>
        </label>
      </div>
      
      {/* Package cards */}
      <div className="packages-grid">
        {packages.map((pkg) => (
          <div 
            key={pkg.id}
            onClick={() => togglePackage(pkg.id)}
            className={`package-card ${selectedPackages.includes(pkg.id) ? 'selected' : ''}`}
          >
            <div className="package-content">
              <div className="package-icon">{pkg.icon}</div>
              <h3>{pkg.name}</h3>
              <div className="package-description">
                {pkg.description}
              </div>
              <div className="package-price">
                ${pkg.basePrice}
              </div>
              <div className="package-selector-indicator">
                <span className={selectedPackages.includes(pkg.id) ? 'selected' : ''}>
                  {selectedPackages.includes(pkg.id) ? '✓' : ''}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary panel */}
      <div className={`summary-panel ${selectedPackages.length > 0 ? 'visible' : ''}`}>
        <div className="summary-content">
          <div className="summary-grid">
            <div className="selected-packages">
              <h3>Your Selection</h3>
              <ul>
                {selectedPackages.map(id => {
                  const pkg = packages.find(p => p.id === id);
                  return (
                    <li key={id}>
                      <span>{pkg.icon} {pkg.name}</span>
                      <span>${pkg.basePrice}</span>
                    </li>
                  );
                })}
              </ul>
              {nextDiscount && (
                <div className="next-discount-alert">
                  <p>
                    <strong>Add one more package</strong> to get a {nextDiscount.baseDiscount}% discount
                    {isUkrainianCommunity ? ` + ${nextDiscount.communityDiscount}%` : ''}!
                  </p>
                </div>
              )}
            </div>
            
            <div className="price-calculation">
              <div className="price-items">
                <div className="price-item">
                  <span>Base price:</span>
                  <span>${selectedPackages.reduce((sum, id) => {
                    const pkg = packages.find(p => p.id === id);
                    return sum + pkg.basePrice;
                  }, 0)}</span>
                </div>
                
                {selectedPackages.length > 1 && (
                  <div className="price-item discount">
                    <span>Package bundle discount ({discountTable[selectedPackages.length-1].baseDiscount}%):</span>
                    <span>-${Math.round(selectedPackages.reduce((sum, id) => {
                      const pkg = packages.find(p => p.id === id);
                      return sum + pkg.basePrice;
                    }, 0) * discountTable[selectedPackages.length-1].baseDiscount / 100)}</span>
                  </div>
                )}
                
                {isUkrainianCommunity && (
                  <div className="price-item discount">
                    <span>Ukrainian business community discount ({discountTable[selectedPackages.length-1].communityDiscount}%):</span>
                    <span>-${Math.round(selectedPackages.reduce((sum, id) => {
                      const pkg = packages.find(p => p.id === id);
                      return sum + pkg.basePrice;
                    }, 0) * (1 - discountTable[selectedPackages.length-1].baseDiscount / 100) * discountTable[selectedPackages.length-1].communityDiscount / 100)}</span>
                  </div>
                )}
              </div>
              
              <div className="total-price">
                <div className="final-price">
                  <span>Final price:</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="savings">
                  <span>You save:</span>
                  <span>${savings} ({effectiveDiscount}%)</span>
                </div>
              </div>
              
              <button className="order-button">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Empty cart */}
      {selectedPackages.length === 0 && (
        <div className="empty-cart">
          <div className="cart-icon">🛒</div>
          <p>Select automation packages to see discounted price</p>
        </div>
      )}
    </div>
  );
};

export default PackageSelector; 