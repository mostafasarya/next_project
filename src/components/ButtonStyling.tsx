'use client';

import React from 'react';
import SystemDrawer from './SystemDrawer';
import SearchDropdown from './SearchDropdown';

export interface ButtonStyles {
  type: 'text' | 'icon' | 'text-icon';
  text: string;
  iconType: 'plus' | 'cart' | 'heart' | 'check' | 'arrow-right' | 'arrow-left' | 'download' | 'upload' | 'star' | 'bookmark' | 'user' | 'settings' | 'search' | 'filter' | 'edit' | 'delete' | 'save' | 'share' | 'email' | 'phone';
  iconPosition: 'left' | 'right';
  fontSize: number;
  fontFamily: string;
  textColor: string;
  fontWeight: string;
  isBold: boolean;
  backgroundColor: string;
  backgroundType: 'solid' | 'gradient';
  gradientStart: string;
  gradientEnd: string;
  gradientDirection: 'to-right' | 'to-bottom' | 'to-bottom-right';
  borderWidth: number;
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'dotted';
  height: number;
  width: 'auto' | 'full' | 'custom';
  customWidth: number;
  borderRadius: number;
  alignment: 'left' | 'center' | 'right';
  hoverBackgroundColor: string;
  hoverTextColor: string;
  transitionDuration: number;
  // Link/Action properties
  linkType: 'add-to-cart' | 'add-to-wishlist' | 'product-page' | 'collection-page' | 'catalog-page' | 'custom-url';
  productId?: string;
  collectionId?: string;
  catalogId?: string;
  customUrl?: string;
  openInNewTab: boolean;
}

export interface ButtonStylingProps {
  isOpen: boolean;
  onClose: () => void;
  buttonStyles: ButtonStyles;
  onStylesChange: (styles: ButtonStyles) => void;
  title?: string;
  width?: number;
  position?: 'left' | 'right';
}

const ButtonStyling: React.FC<ButtonStylingProps> = ({
  isOpen,
  onClose,
  buttonStyles,
  onStylesChange,
  title = "Button Style Editor",
  width = 400,
  position = 'right'
}) => {
  const [activeTab, setActiveTab] = React.useState('type');

  const updateButtonStyle = (property: string, value: any) => {
    onStylesChange({
      ...buttonStyles,
      [property]: value
    });
  };

  return (
    <SystemDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      width={width}
      position={position}
      pushContent={true}
    >
      {/* Button Type Selection - Always visible, not collapsible */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Button Type</h4>
        <div className="button-type-tabs">
          <button
            className={`system-control-tab ${buttonStyles.type === 'text' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); updateButtonStyle('type', 'text'); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17h18v2H3v-2zm0-4h18v2H3v-2zm0-4h18v2H3v-2zm0-4h18v2H3v-2z"/>
            </svg>
            Text Only
          </button>
          <button
            className={`system-control-tab ${buttonStyles.type === 'icon' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); updateButtonStyle('type', 'icon'); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Icon Only
          </button>
          <button
            className={`system-control-tab ${buttonStyles.type === 'text-icon' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); updateButtonStyle('type', 'text-icon'); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              <rect x="2" y="18" width="20" height="2"/>
            </svg>
            Text & Icon
          </button>
        </div>
      </div>

      {/* Text Controls - Show when type includes text */}
      {(buttonStyles.type === 'text' || buttonStyles.type === 'text-icon') && (
        <div className="drawer-section collapsible-section" onClick={(e) => e.stopPropagation()}>
          <div className="collapsible-header" onClick={() => setActiveTab(activeTab === 'text' ? '' : 'text')}>
            <h4 className="drawer-section-title">Text Controls</h4>
            <svg className={`collapsible-icon ${activeTab === 'text' ? 'open' : ''}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
          {activeTab === 'text' && (
            <div className="collapsible-content">
              {/* Button Text */}
              <div className="drawer-form-group">
                <label className="drawer-form-label">Button Text</label>
                <input
                  type="text"
                  value={buttonStyles.text}
                  onChange={(e) => updateButtonStyle('text', e.target.value)}
                  className="drawer-form-input"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Font Size */}
              <div className="drawer-range-container">
                <div className="drawer-range-label">
                  <span>Font Size</span>
                  <span className="drawer-range-value">{buttonStyles.fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="12" max="24" value={buttonStyles.fontSize}
                  onChange={(e) => updateButtonStyle('fontSize', Number(e.target.value))}
                  className="drawer-range" onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Font Family */}
              <div className="drawer-form-group">
                <label className="drawer-form-label">Font Family</label>
                <select
                  value={buttonStyles.fontFamily}
                  onChange={(e) => updateButtonStyle('fontFamily', e.target.value)}
                  className="drawer-form-select" onClick={(e) => e.stopPropagation()}
                >
                  <option value="Inter">Inter</option>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                </select>
              </div>

              {/* Text Color */}
              <div className="drawer-form-group">
                <label className="drawer-form-label">Text Color</label>
                <input
                  type="color"
                  value={buttonStyles.textColor}
                  onChange={(e) => updateButtonStyle('textColor', e.target.value)}
                  className="drawer-color-input" onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Bold Toggle */}
              <div className="drawer-form-group">
                <label className="toggle-label">
                  <span>Bold Text</span>
                  <div 
                    className={`system-control-toggle ${buttonStyles.isBold ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateButtonStyle('isBold', !buttonStyles.isBold);
                    }}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Icon Controls - Show when type includes icon */}
      {(buttonStyles.type === 'icon' || buttonStyles.type === 'text-icon') && (
        <div className="drawer-section collapsible-section" onClick={(e) => e.stopPropagation()}>
          <div className="collapsible-header" onClick={() => setActiveTab(activeTab === 'icon' ? '' : 'icon')}>
            <h4 className="drawer-section-title">Icon Controls</h4>
            <svg className={`collapsible-icon ${activeTab === 'icon' ? 'open' : ''}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
          {activeTab === 'icon' && (
            <div className="collapsible-content">
              {/* Icon Type */}
              <div className="drawer-form-group">
                <label className="drawer-form-label">Icon Type</label>
                <div className="icon-type-grid-large">
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'plus' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'plus'); }} title="Plus"><span>+</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'cart' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'cart'); }} title="Shopping Cart"><span>🛒</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'heart' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'heart'); }} title="Heart"><span>♥</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'check' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'check'); }} title="Check"><span>✓</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'arrow-right' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'arrow-right'); }} title="Arrow Right"><span>→</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'arrow-left' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'arrow-left'); }} title="Arrow Left"><span>←</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'download' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'download'); }} title="Download"><span>⬇</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'upload' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'upload'); }} title="Upload"><span>⬆</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'star' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'star'); }} title="Star"><span>★</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'bookmark' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'bookmark'); }} title="Bookmark"><span>🔖</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'user' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'user'); }} title="User"><span>👤</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'settings' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'settings'); }} title="Settings"><span>⚙️</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'search' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'search'); }} title="Search"><span>🔍</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'filter' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'filter'); }} title="Filter"><span>🔽</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'edit' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'edit'); }} title="Edit"><span>✏️</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'delete' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'delete'); }} title="Delete"><span>🗑️</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'save' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'save'); }} title="Save"><span>💾</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'share' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'share'); }} title="Share"><span>📤</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'email' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'email'); }} title="Email"><span>📧</span></button>
                  <button className={`icon-type-btn ${buttonStyles.iconType === 'phone' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconType', 'phone'); }} title="Phone"><span>📞</span></button>
                </div>
              </div>

              {/* Icon Position - Only show for text-icon type */}
              {buttonStyles.type === 'text-icon' && (
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Icon Position</label>
                  <div className="alignment-tabs">
                    <button
                      className={`alignment-tab ${buttonStyles.iconPosition === 'left' ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconPosition', 'left'); }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/>
                      </svg>
                      Left
                    </button>
                    <button
                      className={`alignment-tab ${buttonStyles.iconPosition === 'right' ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); updateButtonStyle('iconPosition', 'right'); }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/>
                      </svg>
                      Right
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Background Controls */}
      <div className="drawer-section collapsible-section" onClick={(e) => e.stopPropagation()}>
        <div className="collapsible-header" onClick={() => setActiveTab(activeTab === 'background' ? '' : 'background')}>
          <h4 className="drawer-section-title">Background</h4>
          <svg className={`collapsible-icon ${activeTab === 'background' ? 'open' : ''}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
        {activeTab === 'background' && (
          <div className="collapsible-content">
            {/* Background Type */}
            <div className="drawer-form-group">
              <label className="drawer-form-label">Background Type</label>
              <div className="background-type-tabs">
                <button
                  className={`system-control-tab ${buttonStyles.backgroundType === 'solid' ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); updateButtonStyle('backgroundType', 'solid'); }}
                >
                  Solid
                </button>
                <button
                  className={`system-control-tab ${buttonStyles.backgroundType === 'gradient' ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); updateButtonStyle('backgroundType', 'gradient'); }}
                >
                  Gradient
                </button>
              </div>
            </div>

            {buttonStyles.backgroundType === 'solid' ? (
              <div className="drawer-form-group">
                <label className="drawer-form-label">Background Color</label>
                <input
                  type="color"
                  value={buttonStyles.backgroundColor}
                  onChange={(e) => updateButtonStyle('backgroundColor', e.target.value)}
                  className="drawer-color-input" onClick={(e) => e.stopPropagation()}
                />
              </div>
            ) : (
              <>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Gradient Start</label>
                  <input
                    type="color"
                    value={buttonStyles.gradientStart}
                    onChange={(e) => updateButtonStyle('gradientStart', e.target.value)}
                    className="drawer-color-input" onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Gradient End</label>
                  <input
                    type="color"
                    value={buttonStyles.gradientEnd}
                    onChange={(e) => updateButtonStyle('gradientEnd', e.target.value)}
                    className="drawer-color-input" onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Direction</label>
                  <select
                    value={buttonStyles.gradientDirection}
                    onChange={(e) => updateButtonStyle('gradientDirection', e.target.value)}
                    className="drawer-form-select" onClick={(e) => e.stopPropagation()}
                  >
                    <option value="to-right">Left to Right</option>
                    <option value="to-bottom">Top to Bottom</option>
                    <option value="to-bottom-right">Top-Left to Bottom-Right</option>
                  </select>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Border Controls */}
      <div className="drawer-section collapsible-section" onClick={(e) => e.stopPropagation()}>
        <div className="collapsible-header" onClick={() => setActiveTab(activeTab === 'border' ? '' : 'border')}>
          <h4 className="drawer-section-title">Border</h4>
          <svg className={`collapsible-icon ${activeTab === 'border' ? 'open' : ''}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
        {activeTab === 'border' && (
          <div className="collapsible-content">
            {/* Border Width */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Border Width</span>
                <span className="drawer-range-value">{buttonStyles.borderWidth}px</span>
              </div>
              <input
                type="range"
                min="0" max="5" value={buttonStyles.borderWidth}
                onChange={(e) => updateButtonStyle('borderWidth', Number(e.target.value))}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>

            {buttonStyles.borderWidth > 0 && (
              <>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Border Color</label>
                  <input
                    type="color"
                    value={buttonStyles.borderColor}
                    onChange={(e) => updateButtonStyle('borderColor', e.target.value)}
                    className="drawer-color-input" onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Border Style</label>
                  <select
                    value={buttonStyles.borderStyle}
                    onChange={(e) => updateButtonStyle('borderStyle', e.target.value)}
                    className="drawer-form-select" onClick={(e) => e.stopPropagation()}
                  >
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                  </select>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Dimensions Controls */}
      <div className="drawer-section collapsible-section" onClick={(e) => e.stopPropagation()}>
        <div className="collapsible-header" onClick={() => setActiveTab(activeTab === 'dimensions' ? '' : 'dimensions')}>
          <h4 className="drawer-section-title">Dimensions</h4>
          <svg className={`collapsible-icon ${activeTab === 'dimensions' ? 'open' : ''}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
        {activeTab === 'dimensions' && (
          <div className="collapsible-content">
            {/* Height */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Height</span>
                <span className="drawer-range-value">{buttonStyles.height}px</span>
              </div>
              <input
                type="range"
                min="32" max="80" value={buttonStyles.height}
                onChange={(e) => updateButtonStyle('height', Number(e.target.value))}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Width Type */}
            <div className="drawer-form-group">
              <label className="drawer-form-label">Width</label>
              <select
                value={buttonStyles.width}
                onChange={(e) => updateButtonStyle('width', e.target.value)}
                className="drawer-form-select" onClick={(e) => e.stopPropagation()}
              >
                <option value="auto">Auto</option>
                <option value="full">Full Width</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Custom Width */}
            {buttonStyles.width === 'custom' && (
              <div className="drawer-range-container">
                <div className="drawer-range-label">
                  <span>Custom Width</span>
                  <span className="drawer-range-value">{buttonStyles.customWidth}px</span>
                </div>
                <input
                  type="range"
                  min="100" max="400" value={buttonStyles.customWidth}
                  onChange={(e) => updateButtonStyle('customWidth', Number(e.target.value))}
                  className="drawer-range" onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Border Radius */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Border Radius</span>
                <span className="drawer-range-value">{buttonStyles.borderRadius}px</span>
              </div>
              <input
                type="range"
                min="0" max="25" value={buttonStyles.borderRadius}
                onChange={(e) => updateButtonStyle('borderRadius', Number(e.target.value))}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Button Alignment */}
            <div className="drawer-form-group">
              <label className="drawer-form-label">Button Alignment</label>
              <div className="alignment-tabs">
                <button
                  className={`alignment-tab ${buttonStyles.alignment === 'left' ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); updateButtonStyle('alignment', 'left'); }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/>
                  </svg>
                  Left
                </button>
                <button
                  className={`alignment-tab ${buttonStyles.alignment === 'center' ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); updateButtonStyle('alignment', 'center'); }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 19h18v2H3v-2zm3-6h12v2H6v-2zm-3-6h18v2H3v-2zm3-6h12v2H6v-2z"/>
                  </svg>
                  Center
                </button>
                <button
                  className={`alignment-tab ${buttonStyles.alignment === 'right' ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); updateButtonStyle('alignment', 'right'); }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/>
                  </svg>
                  Right
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hover Effects */}
      <div className="drawer-section collapsible-section" onClick={(e) => e.stopPropagation()}>
        <div className="collapsible-header" onClick={() => setActiveTab(activeTab === 'hover' ? '' : 'hover')}>
          <h4 className="drawer-section-title">Hover Effects</h4>
          <svg className={`collapsible-icon ${activeTab === 'hover' ? 'open' : ''}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
        {activeTab === 'hover' && (
          <div className="collapsible-content">
            <div className="drawer-form-group">
              <label className="drawer-form-label">Hover Background</label>
              <input
                type="color"
                value={buttonStyles.hoverBackgroundColor}
                onChange={(e) => updateButtonStyle('hoverBackgroundColor', e.target.value)}
                className="drawer-color-input" onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Hover Text Color</label>
              <input
                type="color"
                value={buttonStyles.hoverTextColor}
                onChange={(e) => updateButtonStyle('hoverTextColor', e.target.value)}
                className="drawer-color-input" onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Transition Duration</span>
                <span className="drawer-range-value">{buttonStyles.transitionDuration}ms</span>
              </div>
              <input
                type="range"
                min="100" max="500" value={buttonStyles.transitionDuration}
                onChange={(e) => updateButtonStyle('transitionDuration', Number(e.target.value))}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>

      {/* Button Link/Action Controls */}
      <div className="drawer-section collapsible-section" onClick={(e) => e.stopPropagation()}>
        <div className="collapsible-header" onClick={() => setActiveTab(activeTab === 'link' ? '' : 'link')}>
          <h4 className="drawer-section-title">Button Link</h4>
          <svg className={`collapsible-icon ${activeTab === 'link' ? 'open' : ''}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
        {activeTab === 'link' && (
          <div className="collapsible-content">
            {/* Link Type */}
            <div className="drawer-form-group">
              <label className="drawer-form-label">Button Action</label>
              <select
                value={buttonStyles.linkType}
                onChange={(e) => updateButtonStyle('linkType', e.target.value)}
                className="drawer-form-select" onClick={(e) => e.stopPropagation()}
              >
                <option value="add-to-cart">Add to Cart</option>
                <option value="add-to-wishlist">Add to Wishlist</option>
                <option value="product-page">Go to Product Page</option>
                <option value="collection-page">Go to Collection Page</option>
                <option value="catalog-page">Go to Catalog Page</option>
                <option value="custom-url">Go to Custom URL</option>
              </select>
            </div>

            {/* Product Search - Show when linkType is 'product-page' */}
            {buttonStyles.linkType === 'product-page' && (
              <div className="drawer-form-group">
                <label className="drawer-form-label">Search Product</label>
                <SearchDropdown
                  searchType="product"
                  value={buttonStyles.productId || ''}
                  onChange={(value) => updateButtonStyle('productId', value)}
                  placeholder="Search by product name or ID..."
                  className="product-search"
                />
              </div>
            )}

            {/* Collection Search - Show when linkType is 'collection-page' */}
            {buttonStyles.linkType === 'collection-page' && (
              <div className="drawer-form-group">
                <label className="drawer-form-label">Search Collection</label>
                <SearchDropdown
                  searchType="collection"
                  value={buttonStyles.collectionId || ''}
                  onChange={(value) => updateButtonStyle('collectionId', value)}
                  placeholder="Search by collection name or ID..."
                  className="collection-search"
                />
              </div>
            )}

            {/* Catalog Search - Show when linkType is 'catalog-page' */}
            {buttonStyles.linkType === 'catalog-page' && (
              <div className="drawer-form-group">
                <label className="drawer-form-label">Search Catalog</label>
                <SearchDropdown
                  searchType="catalog"
                  value={buttonStyles.catalogId || ''}
                  onChange={(value) => updateButtonStyle('catalogId', value)}
                  placeholder="Search by catalog name or ID..."
                  className="catalog-search"
                />
              </div>
            )}

            {/* Custom URL - Show when linkType is 'custom-url' */}
            {buttonStyles.linkType === 'custom-url' && (
              <div className="drawer-form-group">
                <label className="drawer-form-label">Custom URL</label>
                <input
                  type="url"
                  value={buttonStyles.customUrl || ''}
                  onChange={(e) => updateButtonStyle('customUrl', e.target.value)}
                  className="drawer-form-input"
                  placeholder="https://example.com"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Open in New Tab - Show for page links */}
            {(buttonStyles.linkType === 'product-page' || 
              buttonStyles.linkType === 'collection-page' || 
              buttonStyles.linkType === 'catalog-page' || 
              buttonStyles.linkType === 'custom-url') && (
              <div className="drawer-form-group">
                <label className="toggle-label">
                  <span>Open in New Tab</span>
                  <div 
                    className={`system-control-toggle ${buttonStyles.openInNewTab ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateButtonStyle('openInNewTab', !buttonStyles.openInNewTab);
                    }}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </label>
              </div>
            )}

            {/* Link Preview */}
            <div className="drawer-form-group">
              <label className="drawer-form-label">Action Preview</label>
              <div className="link-preview">
                {buttonStyles.linkType === 'add-to-cart' && <span>🛒 Add to Cart Action</span>}
                {buttonStyles.linkType === 'add-to-wishlist' && <span>♥ Add to Wishlist Action</span>}
                {buttonStyles.linkType === 'product-page' && <span>📄 Product: {buttonStyles.productId || 'No ID set'}</span>}
                {buttonStyles.linkType === 'collection-page' && <span>📁 Collection: {buttonStyles.collectionId || 'No ID set'}</span>}
                {buttonStyles.linkType === 'catalog-page' && <span>📚 Catalog: {buttonStyles.catalogId || 'No ID set'}</span>}
                {buttonStyles.linkType === 'custom-url' && <span>🔗 URL: {buttonStyles.customUrl || 'No URL set'}</span>}
                {buttonStyles.openInNewTab && (buttonStyles.linkType === 'product-page' || buttonStyles.linkType === 'collection-page' || buttonStyles.linkType === 'catalog-page' || buttonStyles.linkType === 'custom-url') && <span> (New Tab)</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </SystemDrawer>
  );
};

export default ButtonStyling;
