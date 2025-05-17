import React, { useState, useEffect } from 'react';
import './PackageSelector.css';

const PackageSelector = () => {
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

  // Стан
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [isUkrainianCommunity, setIsUkrainianCommunity] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const [effectiveDiscount, setEffectiveDiscount] = useState(0);
  const [nextDiscount, setNextDiscount] = useState(null);

  // Обробка вибору пакету
  const togglePackage = (packageId) => {
    if (selectedPackages.includes(packageId)) {
      setSelectedPackages(selectedPackages.filter(id => id !== packageId));
    } else {
      setSelectedPackages([...selectedPackages, packageId]);
    }
  };

  // Розрахунок цін при зміні вибраних пакетів
  useEffect(() => {
    if (selectedPackages.length === 0) {
      setTotalPrice(0);
      setSavings(0);
      setEffectiveDiscount(0);
      setNextDiscount(discountTable[0]);
      return;
    }

    // Базова вартість всіх вибраних пакетів
    const baseTotal = selectedPackages.reduce((sum, id) => {
      const pkg = packages.find(p => p.id === id);
      return sum + pkg.basePrice;
    }, 0);

    // Застосування знижок
    const packageCount = selectedPackages.length;
    const discountInfo = discountTable[packageCount - 1];
    
    // Проміжна ціна після базової знижки
    const afterBaseDiscount = baseTotal * (1 - discountInfo.baseDiscount / 100);
    
    // Кінцева ціна після знижки для спільноти
    const finalPrice = isUkrainianCommunity 
      ? afterBaseDiscount * (1 - discountInfo.communityDiscount / 100) 
      : afterBaseDiscount;
    
    // Загальна ефективна знижка
    const totalDiscount = ((baseTotal - finalPrice) / baseTotal) * 100;
    
    setTotalPrice(Math.round(finalPrice));
    setSavings(Math.round(baseTotal - finalPrice));
    setEffectiveDiscount(Math.round(totalDiscount * 10) / 10);
    
    // Інформація про наступний рівень знижки
    if (packageCount < 6) {
      setNextDiscount(discountTable[packageCount]);
    } else {
      setNextDiscount(null);
    }
  }, [selectedPackages, isUkrainianCommunity]);

  return (
    <div className="package-selector">
      <h2>Виберіть пакети автоматизації</h2>
      
      {/* Перемикач української спільноти */}
      <div className="community-toggle">
        <label className="toggle-label">
          <span>Українська бізнес-спільнота</span>
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
      
      {/* Картки пакетів */}
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
      
      {/* Інформаційна панель */}
      <div className={`summary-panel ${selectedPackages.length > 0 ? 'visible' : ''}`}>
        <div className="summary-content">
          <div className="summary-grid">
            <div className="selected-packages">
              <h3>Ваш вибір</h3>
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
                    <strong>Додайте ще один пакет</strong> для отримання знижки {nextDiscount.baseDiscount}% + 
                    {isUkrainianCommunity ? ` ${nextDiscount.communityDiscount}%` : ''}!
                  </p>
                </div>
              )}
            </div>
            
            <div className="price-calculation">
              <div className="price-items">
                <div className="price-item">
                  <span>Базова вартість:</span>
                  <span>${selectedPackages.reduce((sum, id) => {
                    const pkg = packages.find(p => p.id === id);
                    return sum + pkg.basePrice;
                  }, 0)}</span>
                </div>
                
                {selectedPackages.length > 1 && (
                  <div className="price-item discount">
                    <span>Знижка за кількість пакетів ({discountTable[selectedPackages.length-1].baseDiscount}%):</span>
                    <span>-${Math.round(selectedPackages.reduce((sum, id) => {
                      const pkg = packages.find(p => p.id === id);
                      return sum + pkg.basePrice;
                    }, 0) * discountTable[selectedPackages.length-1].baseDiscount / 100)}</span>
                  </div>
                )}
                
                {isUkrainianCommunity && (
                  <div className="price-item discount">
                    <span>Знижка для української спільноти ({discountTable[selectedPackages.length-1].communityDiscount}%):</span>
                    <span>-${Math.round(selectedPackages.reduce((sum, id) => {
                      const pkg = packages.find(p => p.id === id);
                      return sum + pkg.basePrice;
                    }, 0) * (1 - discountTable[selectedPackages.length-1].baseDiscount / 100) * discountTable[selectedPackages.length-1].communityDiscount / 100)}</span>
                  </div>
                )}
              </div>
              
              <div className="total-price">
                <div className="final-price">
                  <span>Фінальна ціна:</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="savings">
                  <span>Ви економите:</span>
                  <span>${savings} ({effectiveDiscount}%)</span>
                </div>
              </div>
              
              <button className="order-button">
                Оформити замовлення
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Пуста корзина */}
      {selectedPackages.length === 0 && (
        <div className="empty-cart">
          <div className="cart-icon">🛒</div>
          <p>Виберіть пакети автоматизації, щоб побачити ціну зі знижкою</p>
        </div>
      )}
    </div>
  );
};

export default PackageSelector; 