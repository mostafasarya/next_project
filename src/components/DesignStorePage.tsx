'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './DesignStorePage.css';

const DesignStorePage: React.FC = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [storeLogo, setStoreLogo] = useState<string | null>(null);
  const [showLogoSettings, setShowLogoSettings] = useState(false);
  const [logoShape, setLogoShape] = useState<'circle' | 'rectangle'>('circle');
  const [logoWidth, setLogoWidth] = useState(64);
  const [logoHeight, setLogoHeight] = useState(64);
  const [horizontalPadding, setHorizontalPadding] = useState(16);
  const [verticalPadding, setVerticalPadding] = useState(16);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setStoreLogo(result);
        localStorage.setItem('storeLogo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSettingsClick = () => {
    setShowLogoSettings(true);
  };

  const handleCloseSettings = () => {
    setShowLogoSettings(false);
  };

  const handleUpdateSettings = () => {
    // Save settings to localStorage or state
    localStorage.setItem('logoSettings', JSON.stringify({
      shape: logoShape,
      width: logoWidth,
      height: logoHeight,
      horizontalPadding,
      verticalPadding
    }));
    setShowLogoSettings(false);
  };

  useEffect(() => {
    // Load saved logo from localStorage
    const savedLogo = localStorage.getItem('storeLogo');
    if (savedLogo) {
      setStoreLogo(savedLogo);
    }

    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('logoSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setLogoShape(settings.shape);
      setLogoWidth(settings.width);
      setLogoHeight(settings.height);
      setHorizontalPadding(settings.horizontalPadding);
      setVerticalPadding(settings.verticalPadding);
    }
  }, []);

  return (
    <div className="design-store-page">
      {/* Top App Bar */}
      <div className="app-bar">
        <div className="app-bar-content">
          <button className="back-btn" onClick={() => router.push('/profile')}>
            <span className="back-icon">←</span>
          </button>
          <div className="app-title">
            <img src="/logo.png" alt="Logo" className="app-logo" />
          </div>
          <div className="app-bar-actions">
            <button className="notification-btn">🔔</button>
            <button className="profile-menu-btn">👤</button>
          </div>
        </div>
      </div>

      {/* Editor Bar - Navy Blue */}
      <div className="editor-bar">
        <div className="editor-bar-content">
          <div className="editor-left">
            <button className={`editor-btn ${sidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}>
              <span className="editor-icon">☰</span>
              <span className="editor-text">Store Pages</span>
            </button>
          </div>
          <div className="editor-center">
            <button className="editor-btn">
              <span className="editor-icon">+</span>
              <span className="editor-text">Product</span>
            </button>
            <button className="editor-btn">
              <span className="editor-icon">⭕</span>
              <span className="editor-text">Collection</span>
            </button>
            <button className="editor-btn">
              <span className="editor-icon">📋</span>
              <span className="editor-text">Create Catalog</span>
            </button>
            <button className="editor-btn">
              <span className="editor-icon">📄</span>
              <span className="editor-text">Create Page</span>
            </button>
            <button className="editor-btn">
              <span className="editor-icon">📱</span>
              <span className="editor-text">Mobile</span>
            </button>
          </div>
          <div className="editor-right">
            <button className="editor-btn publish-btn">
              <span className="editor-icon">⬆️</span>
              <span className="editor-text">Publish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Store Bar - White with logo upload */}
      <div className="store-bar" style={{
        height: `${60 + (verticalPadding * 2)}px`,
        padding: `${verticalPadding}px 0`,
        marginLeft: showLogoSettings ? '300px' : '0',
        transition: 'margin-left 0.3s ease'
      }}>
        <div className="store-bar-content" style={{
          paddingLeft: `${horizontalPadding}px`,
          paddingRight: `${horizontalPadding}px`
        }}>
          <div className="store-logo-section">
            <div className="logo-container">
              <div className="logo-placeholder" style={{
                width: `${logoWidth}px`,
                height: `${logoHeight}px`,
                borderRadius: logoShape === 'circle' ? '50%' : '8px'
              }}>
                {storeLogo ? (
                  <img src={storeLogo} alt="Store Logo" className="store-logo-image" />
                ) : (
                  <div className="logo-icon">🖼️</div>
                )}
              </div>
              <button className="logo-control-btn upload-btn" onClick={handleUploadClick}>📷</button>
            </div>
            <button className="logo-control-btn settings-btn" onClick={handleSettingsClick}>⚙️</button>
          </div>
          <div className="store-bar-actions">
            <button className="store-action-btn">👤</button>
            <button className="store-action-btn">🔔</button>
            <button className="store-action-btn">A</button>
            <button className="store-action-btn">🛒</button>
            <button className="store-action-btn">❤️</button>
            <button className="store-action-btn">🔍</button>
          </div>
        </div>
      </div>

      {/* Logo Settings Modal */}
      {showLogoSettings && (
        <div className="logo-settings-overlay" onClick={handleCloseSettings}>
          <div className="logo-settings-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="settings-header">
              <h3 className="settings-title">
                <span className="settings-icon">🎨</span>
                Logo Settings
              </h3>
              <button className="close-btn" onClick={handleCloseSettings}>✕</button>
            </div>
            <div className="settings-content">
              <div className="setting-section">
                <label className="setting-label">Logo Shape</label>
                <div className="shape-options">
                  <button 
                    className={`shape-btn ${logoShape === 'circle' ? 'active' : ''}`}
                    onClick={() => setLogoShape('circle')}
                  >
                    <span className="shape-icon">⭕</span>
                    Circle
                  </button>
                  <button 
                    className={`shape-btn ${logoShape === 'rectangle' ? 'active' : ''}`}
                    onClick={() => setLogoShape('rectangle')}
                  >
                    <span className="shape-icon">⬜</span>
                    Rectangle
                  </button>
                </div>
              </div>
              <div className="setting-section">
                <div className="slider-container">
                  <label className="setting-label">Width</label>
                  <span className="slider-value">{logoWidth}px</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="120" 
                  value={logoWidth} 
                  onChange={(e) => setLogoWidth(Number(e.target.value))}
                  className="slider"
                />
              </div>
              <div className="setting-section">
                <div className="slider-container">
                  <label className="setting-label">Height</label>
                  <span className="slider-value">{logoHeight}px</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="120" 
                  value={logoHeight} 
                  onChange={(e) => setLogoHeight(Number(e.target.value))}
                  className="slider"
                />
              </div>
              <div className="setting-section">
                <div className="slider-container">
                  <label className="setting-label">Horizontal Padding</label>
                  <span className="slider-value">{horizontalPadding}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  value={horizontalPadding} 
                  onChange={(e) => setHorizontalPadding(Number(e.target.value))}
                  className="slider"
                />
              </div>
              <div className="setting-section">
                <div className="slider-container">
                  <label className="setting-label">Vertical Padding</label>
                  <span className="slider-value">{verticalPadding}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  value={verticalPadding} 
                  onChange={(e) => setVerticalPadding(Number(e.target.value))}
                  className="slider"
                />
              </div>
            </div>
            <div className="settings-footer">
              <button className="close-action-btn" onClick={handleCloseSettings}>Close</button>
              <button className="update-btn" onClick={handleUpdateSettings}>Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div 
        className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}
        style={{
          top: `120px`,
          height: `calc(100vh - 120px)`
        }}
      >
        <div className="sidebar-header">
          <h3>Store Pages</h3>
        </div>
        <div className="sidebar-menu">
          <div className="menu-item active">
            <span className="menu-icon">🏠</span>
            <span className="menu-text">Home</span>
          </div>
                      <div className="menu-item" onClick={() => router.push('/all-products')}>
              <span className="menu-icon">📦</span>
              <span className="menu-text">Product Page</span>
            </div>
                        <div className="menu-item" onClick={() => router.push('/collections')}>
              <span className="menu-icon">🔴</span>
              <span className="menu-text">Collections</span>
            </div>
            <div className="menu-item" onClick={() => router.push('/catalog')}>
              <span className="menu-icon">📋</span>
              <span className="menu-text">Catalog</span>
            </div>
            <div className="menu-item">
            <span className="menu-icon">🛒</span>
            <span className="menu-text">Cart Page</span>
          </div>
          <div className="menu-item">
            <span className="menu-icon">🚚</span>
            <span className="menu-text">Shipping & Pay</span>
          </div>
          <div className="menu-item">
            <span className="menu-icon">📄</span>
            <span className="menu-text">General Pages</span>
          </div>
          <div className="menu-item logout">
            <span className="menu-icon">🚪</span>
            <span className="menu-text">Log out</span>
          </div>
        </div>
        <div className="sidebar-footer">
          <button className="preview-btn">
            <span className="preview-icon">👁️</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}
        style={{
          marginTop: `${180 + (verticalPadding * 2)}px`,
          marginLeft: showLogoSettings ? '300px' : '0',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <div className="content-area">
          <div className="content-body">
            {/* Content area is now empty */}
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default DesignStorePage;
