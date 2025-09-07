'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './EditorBarDrawer.css';

interface EditorBarDrawerProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  storeLogo: string | null;
  logoShape: 'circle' | 'rectangle';
  logoWidth: number;
  logoHeight: number;
  horizontalPadding: number;
  verticalPadding: number;
  onLogoShapeChange: (shape: 'circle' | 'rectangle') => void;
  onLogoWidthChange: (width: number) => void;
  onLogoHeightChange: (height: number) => void;
  onHorizontalPaddingChange: (padding: number) => void;
  onVerticalPaddingChange: (padding: number) => void;
  showLogoSettings: boolean;
  onCloseLogoSettings: () => void;
  onUpdateLogoSettings: () => void;
  showLanguageSettings: boolean;
  onOpenLanguageSettings: () => void;
  onCloseLanguageSettings: () => void;
  selectedLanguages: string[];
  onSelectedLanguagesChange: (languages: string[]) => void;
  currentLanguage: string;
  onOpenMobileSimulator: () => void;
  t: (key: string) => string;
}

const EditorBarDrawer: React.FC<EditorBarDrawerProps> = ({
  sidebarOpen,
  onToggleSidebar,
  storeLogo,
  logoShape,
  logoWidth,
  logoHeight,
  horizontalPadding,
  verticalPadding,
  onLogoShapeChange,
  onLogoWidthChange,
  onLogoHeightChange,
  onHorizontalPaddingChange,
  onVerticalPaddingChange,
  showLogoSettings,
  onCloseLogoSettings,
  onUpdateLogoSettings,
  showLanguageSettings,
  onOpenLanguageSettings,
  onCloseLanguageSettings,
  selectedLanguages,
  onSelectedLanguagesChange,
  currentLanguage,
  onOpenMobileSimulator,
  t
}) => {
  const router = useRouter();

  return (
    <>
      {/* Editor Bar - Navy Blue */}
      <div className="editor-bar">
        <div className="editor-bar-content">
          <div className="editor-left">
            <button className={`editor-btn ${sidebarOpen ? 'active' : ''}`} onClick={onToggleSidebar}>
              <span className="editor-icon">☰</span>
              <span className="editor-text">{t('store_pages')}</span>
            </button>
          </div>
          <div className="editor-center">
            <button className="editor-btn" onClick={() => router.push('/products-management?showAddProduct=true')}>
              <span className="editor-icon">+</span>
              <span className="editor-text">{t('add_product')}</span>
            </button>
            <button className="editor-btn" onClick={() => router.push('/collections-management?showCreateCollection=true')}>
              <span className="editor-icon">⭕</span>
              <span className="editor-text">{t('add_collection')}</span>
            </button>
            <button className="editor-btn" onClick={() => router.push('/catalog-management?showCreateModal=true')}>
              <span className="editor-icon">📋</span>
              <span className="editor-text">{t('create_catalog')}</span>
            </button>
            <button className="editor-btn">
              <span className="editor-icon">📄</span>
              <span className="editor-text">{t('create_page')}</span>
            </button>
            <button className="editor-btn" onClick={onOpenMobileSimulator}>
              <span className="editor-icon">📱</span>
              <span className="editor-text">{t('mobile')}</span>
            </button>
          </div>
          <div className="editor-right">
            <button className="editor-btn publish-btn">
              <span className="editor-icon">⬆️</span>
              <span className="editor-text">{t('publish')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={onToggleSidebar}></div>
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
          <h3>{t('store_pages')}</h3>
        </div>
        <div className="sidebar-menu">
          <div className="menu-item active">
            <span className="menu-icon">🏠</span>
            <span className="menu-text">{t('home')}</span>
          </div>
          <div className="menu-item" onClick={() => router.push('/products-management')}>
            <span className="menu-icon">📦</span>
            <span className="menu-text">{t('product_page')}</span>
          </div>
          <div className="menu-item" onClick={() => router.push('/collections-management')}>
            <span className="menu-icon">🔴</span>
            <span className="menu-text">{t('collections')}</span>
          </div>
          <div className="menu-item" onClick={() => router.push('/catalog-management')}>
            <span className="menu-icon">📋</span>
            <span className="menu-text">{t('catalog')}</span>
          </div>
          <div className="menu-item">
            <span className="menu-icon">🛒</span>
            <span className="menu-text">{t('cart_page')}</span>
          </div>
          <div className="menu-item">
            <span className="menu-icon">🚚</span>
            <span className="menu-text">{t('shipping_pay')}</span>
          </div>
          <div className="menu-item">
            <span className="menu-icon">📄</span>
            <span className="menu-text">{t('general_pages')}</span>
          </div>
          <div className="menu-item" onClick={() => router.push('/system-control-assets')}>
            <span className="menu-icon">🎛️</span>
            <span className="menu-text">System Controls</span>
          </div>
          <div className="menu-item" onClick={onOpenLanguageSettings}>
            <span className="menu-icon">🌐</span>
            <span className="menu-text">{t('language')}</span>
          </div>
          <div className="menu-item logout">
            <span className="menu-icon">🚪</span>
            <span className="menu-text">{t('logout')}</span>
          </div>
        </div>
        <div className="sidebar-footer">
          <button className="preview-btn">
            <span className="preview-icon">👁️</span>
          </button>
        </div>
      </div>

      {/* Logo Settings Modal */}
      {showLogoSettings && (
        <div className="logo-settings-overlay" onClick={onCloseLogoSettings}>
          <div className="logo-settings-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="settings-header">
              <h3 className="settings-title">
                <span className="settings-icon">🎨</span>
                Logo Settings
              </h3>
              <button className="close-btn" onClick={onCloseLogoSettings}>✕</button>
            </div>
            <div className="settings-content">
              <div className="setting-section">
                <label className="setting-label">Logo Shape</label>
                <div className="shape-options">
                  <button 
                    className={`shape-btn ${logoShape === 'circle' ? 'active' : ''}`}
                    onClick={() => onLogoShapeChange('circle')}
                  >
                    <span className="shape-icon">⭕</span>
                    Circle
                  </button>
                  <button 
                    className={`shape-btn ${logoShape === 'rectangle' ? 'active' : ''}`}
                    onClick={() => onLogoShapeChange('rectangle')}
                  >
                    <span className="shape-icon">⬜</span>
                    Rectangle
                  </button>
                </div>
              </div>
              
              {logoShape === 'circle' ? (
                <>
                  <div className="setting-section">
                    <div className="slider-container">
                      <label className="setting-label">Logo Size</label>
                      <span className="slider-value">{logoWidth}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="120" 
                      value={logoWidth} 
                      onChange={(e) => onLogoWidthChange(Number(e.target.value))}
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
                      onChange={(e) => onHorizontalPaddingChange(Number(e.target.value))}
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
                      onChange={(e) => onVerticalPaddingChange(Number(e.target.value))}
                      className="slider"
                    />
                  </div>
                </>
              ) : (
                <>
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
                      onChange={(e) => onLogoWidthChange(Number(e.target.value))}
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
                      onChange={(e) => onLogoHeightChange(Number(e.target.value))}
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
                      onChange={(e) => onHorizontalPaddingChange(Number(e.target.value))}
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
                      onChange={(e) => onVerticalPaddingChange(Number(e.target.value))}
                      className="slider"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="settings-footer">
              <button className="close-action-btn" onClick={onCloseLogoSettings}>Close</button>
              <button className="update-btn" onClick={onUpdateLogoSettings}>Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Language Settings Modal */}
      {showLanguageSettings && (
        <div className="language-settings-overlay" onClick={onCloseLanguageSettings}>
          <div className="language-settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="language-settings-header">
              <h3 className="language-settings-title">
                <span className="language-settings-icon">🌐</span>
                {t('store_languages')}
              </h3>
              <button className="close-btn" onClick={onCloseLanguageSettings}>✕</button>
            </div>
            <div className="language-settings-content">
              <p className="language-settings-description">
                {t('language_description')}
              </p>
              <div className="language-grid">
                {[
                  { code: 'en', name: 'English', flag: '🇺🇸' },
                  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
                  { code: 'es', name: 'Español', flag: '🇪🇸' },
                  { code: 'fr', name: 'Français', flag: '🇫🇷' },
                  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
                  { code: 'pt', name: 'Português', flag: '🇵🇹' },
                  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
                  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
                  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
                  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
                  { code: 'ja', name: '日本語', flag: '🇯🇵' },
                  { code: 'zh', name: '中文', flag: '🇨🇳' },
                  { code: 'ko', name: '한국어', flag: '🇰🇷' }
                ].map((language) => (
                  <div 
                    key={language.code}
                    className={`language-option ${selectedLanguages.includes(language.name) ? 'selected' : ''}`}
                    onClick={() => {
                      if (selectedLanguages.includes(language.name)) {
                        onSelectedLanguagesChange(selectedLanguages.filter(lang => lang !== language.name));
                      } else {
                        onSelectedLanguagesChange([...selectedLanguages, language.name]);
                      }
                    }}
                  >
                    <span className="language-flag">{language.flag}</span>
                    <span className="language-name">{language.name}</span>
                    {selectedLanguages.includes(language.name) && (
                      <span className="language-check">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="language-settings-footer">
              <button className="close-action-btn" onClick={onCloseLanguageSettings}>{t('cancel')}</button>
              <button className="update-btn" onClick={() => {
                localStorage.setItem('storeLanguages', JSON.stringify(selectedLanguages));
                // Dispatch language change event to affect design pages
                if (selectedLanguages.length > 0) {
                  const primaryLanguage = selectedLanguages[0];
                  localStorage.setItem('currentLanguage', primaryLanguage);
                  localStorage.setItem('websiteLanguage', primaryLanguage);
                  window.dispatchEvent(new CustomEvent('languageChanged', { 
                    detail: { language: primaryLanguage } 
                  }));
                }
                onCloseLanguageSettings();
              }}>{t('save_languages')}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditorBarDrawer;
