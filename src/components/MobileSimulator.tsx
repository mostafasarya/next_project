'use client';

import React, { useState } from 'react';
import './MobileSimulator.css';

interface MobileSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  storeLogo?: string;
  currentLanguage: string;
  translations: any;
  storeName?: string;
}

const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  isOpen,
  onClose,
  storeLogo,
  currentLanguage,
  translations,
  storeName = 'yourstore'
}) => {
  const storeUrl = `/design?mobile=true`;

  const t = (key: string) => {
    return translations[currentLanguage]?.[key] || translations['English'][key] || key;
  };

  if (!isOpen) return null;

  return (
    <div className="mobile-simulator-overlay" onClick={onClose}>
      <div className="mobile-simulator-container" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-simulator-header">
          <h3>Mobile Preview</h3>
          <button className="close-simulator-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="mobile-phone-frame">
          <div className="phone-notch"></div>
          <div className="phone-screen">
            {/* Store URL Display */}
            <div className="mobile-url-bar">
              <span className="mobile-url-text">{storeUrl}</span>
            </div>
            
            {/* Real Store iframe */}
            <iframe
              src={storeUrl}
              className="mobile-store-iframe"
              title="Mobile Store Preview"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSimulator;
