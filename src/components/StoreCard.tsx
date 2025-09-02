'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './StoreCard.css';

interface Store {
  id: string;
  name: string;
  storeType: string;
  country: string;
  city: string;
  currency: string;
  category: string;
  description: string;
  url: string;
  status: 'active' | 'inactive';
  logo?: string;
}

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Calculate available space and set position
    if (settingsRef.current) {
      const rect = settingsRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const dropdownHeight = 280; // Approximate height of dropdown
      
      if (rect.bottom + dropdownHeight > windowHeight) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
    
    setShowDropdown(!showDropdown);
  };

  const features = [
    { name: 'Design your store', icon: '🧠', color: '#20bf6b' },
    { name: 'Store Wallet', icon: '💰', color: '#26de81', value: '0 USD' },
    { name: 'Marketing', icon: '📢', color: '#ff4757' },
    { name: 'Payment Method', icon: '💳', color: '#26de81' },
    { name: 'My orders', icon: '📋', color: '#3742fa' },
    { name: 'Inventory', icon: '📦', color: '#a55eea' },
    { name: 'Shipping', icon: '🚚', color: '#20bf6b' },
    { name: 'Customers', icon: '👥', color: '#ffa502' },
    { name: 'Store Permissions', icon: '🔐', color: '#26de81' },
    { name: 'Messages', icon: '💬', color: '#ff4757' }
  ];

  const dropdownOptions = [
    { icon: '✏️', text: 'EDIT INFO', action: () => console.log('Edit Info clicked') },
    { icon: '⏸️', text: 'Deactivate', action: () => console.log('Deactivate clicked') },
    { icon: '⏸️', text: 'Reset', action: () => console.log('Reset clicked') },
    { icon: '📋', text: 'Subscription', action: () => console.log('Subscription clicked') },
    { icon: '🗑️', text: 'Delete', action: () => console.log('Delete clicked') },
    { icon: '💳', text: 'Billing', action: () => console.log('Billing clicked'), highlight: true },
    { icon: '👥', text: 'Store members', action: () => console.log('Store members clicked') }
  ];

  const handleOptionClick = (action: () => void) => {
    action();
    setShowDropdown(false);
  };

  const handleDesignStore = () => {
    router.push('/design');
  };

  return (
    <div className="store-card">
      <div className="store-header">
        <div className="store-info">
          <div className="store-name">
            <div className="store-logo">
              {store.logo ? (
                <img src={store.logo} alt={`${store.name} logo`} className="store-logo-img" />
              ) : (
                <div className="store-logo-default">🏪</div>
              )}
            </div>
            <span className="store-link">{store.name}</span>
            <span className={`status-badge ${store.status}`}>
              {store.status}
            </span>
          </div>
          <div className="store-url">
            <span className="url-text">{store.url}</span>
          </div>
        </div>
        <div className="settings-container" ref={dropdownRef}>
          <div ref={settingsRef}>
            <button className="settings-btn" onClick={handleSettingsClick}>⚙️</button>
          </div>
          {showDropdown && (
            <div className={`settings-dropdown ${dropdownPosition}`}>
              {dropdownOptions.map((option, index) => (
                <div
                  key={index}
                  className={`dropdown-option ${option.highlight ? 'highlighted' : ''}`}
                  onClick={() => handleOptionClick(option.action)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-text">{option.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="store-features">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`feature-card ${feature.name === 'Design your store' ? 'design-feature' : ''}`}
            onClick={feature.name === 'Design your store' ? handleDesignStore : undefined}
          >
            <div 
              className="feature-icon"
              style={{ backgroundColor: feature.color + '20' }}
            >
              <span style={{ color: feature.color }}>{feature.icon}</span>
            </div>
            <div className="feature-info">
              <span className="feature-name">{feature.name}</span>
              {feature.value && (
                <span className="feature-value">{feature.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreCard;

