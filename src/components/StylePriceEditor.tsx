'use client';

import React from 'react';
import SystemDrawer from './SystemDrawer';
import './StylePriceEditor.css';
import '../app/system-control-assets/SystemControlAssets.css';

interface PriceStyles {
  currentPrice: {
    show: boolean;
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
    textAlign: string;
    color: string;
  };
  beforePrice: {
    show: boolean;
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
    textAlign: string;
    color: string;
  };
  save: {
    show: boolean;
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
    textAlign: string;
    color: string;
  };
  horizontalSpacing: number;
  bottomSpacing: number;
}

interface StylePriceEditorProps {
  isOpen: boolean;
  onClose: () => void;
  priceStyles: PriceStyles;
  onStylesChange: (styles: PriceStyles) => void;
  title?: string;
  width?: number;
  position?: 'left' | 'right';
  pushContent?: boolean;
}

const StylePriceEditor: React.FC<StylePriceEditorProps> = ({
  isOpen,
  onClose,
  priceStyles,
  onStylesChange,
  title = "Price Style Editor",
  width = 400,
  position = "right",
  pushContent = true
}) => {
  const [activePriceTab, setActivePriceTab] = React.useState('current');

  const setPriceStyles = (newStyles: PriceStyles) => {
    onStylesChange(newStyles);
  };

  return (
    <SystemDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      width={width}
      position={position}
      pushContent={pushContent}
    >
      {/* Price Tabs */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <div className="system-control-tabs">
          <button
            className={`system-control-tab ${activePriceTab === 'current' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setActivePriceTab('current'); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            Current Price
          </button>
          <button
            className={`system-control-tab ${activePriceTab === 'before' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setActivePriceTab('before'); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
            Before Price
          </button>
          <button
            className={`system-control-tab ${activePriceTab === 'save' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setActivePriceTab('save'); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Save
          </button>
        </div>
      </div>

      {/* Current Price Controls */}
      {activePriceTab === 'current' && (
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Current Price</h4>
        
        {/* Show/Hide Toggle */}
        <div className="system-control-toggle">
          <div 
            className={`toggle-slider ${priceStyles.currentPrice.show ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setPriceStyles({
                ...priceStyles,
                currentPrice: { ...priceStyles.currentPrice, show: !priceStyles.currentPrice.show }
              });
            }}
          ></div>
          <span className="toggle-text">{priceStyles.currentPrice.show ? 'Show' : 'Hide'}</span>
        </div>

        {/* Font Size */}
        <div className="drawer-range-container">
          <div className="drawer-range-label">
            <span>Font Size</span>
            <span className="drawer-range-value">{priceStyles.currentPrice.fontSize}px</span>
          </div>
          <input
            type="range"
            min="16" max="36" value={priceStyles.currentPrice.fontSize}
            onChange={(e) => setPriceStyles({
              ...priceStyles,
              currentPrice: { ...priceStyles.currentPrice, fontSize: Number(e.target.value) }
            })}
            className="drawer-range" onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Text Color */}
        <div className="drawer-form-group">
          <input
            type="color"
            value={priceStyles.currentPrice.color}
            onChange={(e) => setPriceStyles({
              ...priceStyles,
              currentPrice: { ...priceStyles.currentPrice, color: e.target.value }
            })}
            className="drawer-color-input" onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Font Family */}
        <div className="drawer-form-group">
          <select
            value={priceStyles.currentPrice.fontFamily}
            onChange={(e) => setPriceStyles({
              ...priceStyles,
              currentPrice: { ...priceStyles.currentPrice, fontFamily: e.target.value }
            })}
            className="drawer-select" onClick={(e) => e.stopPropagation()}
          >
            <optgroup label="Modern Sans-Serif">
              <option value="Inter, sans-serif">Inter</option>
              <option value="Poppins, sans-serif">Poppins</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Nunito, sans-serif">Nunito</option>
              <option value="'Source Sans 3', sans-serif">Source Sans 3</option>
              <option value="'Work Sans', sans-serif">Work Sans</option>
              <option value="'DM Sans', sans-serif">DM Sans</option>
              <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans</option>
            </optgroup>
            <optgroup label="Classic Sans-Serif">
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="Lato, sans-serif">Lato</option>
            </optgroup>
            <optgroup label="Serif">
              <option value="'Playfair Display', serif">Playfair Display</option>
              <option value="Merriweather, serif">Merriweather</option>
              <option value="'Crimson Text', serif">Crimson Text</option>
              <option value="'Libre Baskerville', serif">Libre Baskerville</option>
            </optgroup>
            <optgroup label="Display">
              <option value="Oswald, sans-serif">Oswald</option>
              <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
              <option value="Raleway, sans-serif">Raleway</option>
              <option value="'Fjalla One', sans-serif">Fjalla One</option>
              <option value="Anton, sans-serif">Anton</option>
              <option value="'Russo One', sans-serif">Russo One</option>
            </optgroup>
            <optgroup label="Monospace">
              <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
              <option value="'Fira Code', monospace">Fira Code</option>
              <option value="'Source Code Pro', monospace">Source Code Pro</option>
              <option value="'IBM Plex Mono', monospace">IBM Plex Mono</option>
            </optgroup>
            <optgroup label="Script & Decorative">
              <option value="'Dancing Script', cursive">Dancing Script</option>
              <option value="'Pacifico', cursive">Pacifico</option>
              <option value="'Great Vibes', cursive">Great Vibes</option>
              <option value="'Lobster', cursive">Lobster</option>
            </optgroup>
          </select>
        </div>

        {/* Font Weight */}
        <div className="drawer-form-group">
          <select
            value={priceStyles.currentPrice.fontWeight}
            onChange={(e) => setPriceStyles({
              ...priceStyles,
              currentPrice: { ...priceStyles.currentPrice, fontWeight: e.target.value }
            })}
            className="drawer-select" onClick={(e) => e.stopPropagation()}
          >
            <option value="300">Light (300)</option>
            <option value="400">Normal (400)</option>
            <option value="500">Medium (500)</option>
            <option value="600">Semi Bold (600)</option>
            <option value="700">Bold (700)</option>
            <option value="800">Extra Bold (800)</option>
          </select>
        </div>

        {/* Text Alignment */}
        <div className="alignment-tabs">
          <button
            className={`alignment-tab ${priceStyles.currentPrice.textAlign === 'left' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, currentPrice: {...priceStyles.currentPrice, textAlign: 'left'}}); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/></svg>
            Left
          </button>
          <button
            className={`alignment-tab ${priceStyles.currentPrice.textAlign === 'center' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, currentPrice: {...priceStyles.currentPrice, textAlign: 'center'}}); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm3-6h12v2H6v-2zm-3-6h18v2H3v-2zm3-6h12v2H6v-2z"/></svg>
            Center
          </button>
          <button
            className={`alignment-tab ${priceStyles.currentPrice.textAlign === 'right' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, currentPrice: {...priceStyles.currentPrice, textAlign: 'right'}}); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/></svg>
            Right
          </button>
        </div>
        </div>
      )}

      {/* Before Price Controls */}
      {activePriceTab === 'before' && (
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Before Price</h4>
        
        {/* Show/Hide Toggle */}
        <div className="system-control-toggle">
          <div 
            className={`toggle-slider ${priceStyles.beforePrice.show ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setPriceStyles({
                ...priceStyles,
                beforePrice: { ...priceStyles.beforePrice, show: !priceStyles.beforePrice.show }
              });
            }}
          ></div>
          <span className="toggle-text">{priceStyles.beforePrice.show ? 'Show' : 'Hide'}</span>
        </div>

        {/* Font Size */}
        <div className="drawer-range-container">
          <div className="drawer-range-label">
            <span>Font Size</span>
            <span className="drawer-range-value">{priceStyles.beforePrice.fontSize}px</span>
          </div>
          <input
            type="range"
            min="12" max="28" value={priceStyles.beforePrice.fontSize}
            onChange={(e) => setPriceStyles({
              ...priceStyles,
              beforePrice: { ...priceStyles.beforePrice, fontSize: Number(e.target.value) }
            })}
            className="drawer-range" onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Text Color */}
        <div className="drawer-form-group">
          <input
            type="color"
            value={priceStyles.beforePrice.color}
            onChange={(e) => setPriceStyles({
              ...priceStyles,
              beforePrice: { ...priceStyles.beforePrice, color: e.target.value }
            })}
            className="drawer-color-input" onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Font Family */}
        <div className="drawer-form-group">
          <select
            value={priceStyles.beforePrice.fontFamily}
            onChange={(e) => setPriceStyles({
              ...priceStyles,
              beforePrice: { ...priceStyles.beforePrice, fontFamily: e.target.value }
            })}
            className="drawer-select" onClick={(e) => e.stopPropagation()}
          >
            <optgroup label="Modern Sans-Serif">
              <option value="Inter, sans-serif">Inter</option>
              <option value="Poppins, sans-serif">Poppins</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Nunito, sans-serif">Nunito</option>
              <option value="'Source Sans 3', sans-serif">Source Sans 3</option>
              <option value="'Work Sans', sans-serif">Work Sans</option>
              <option value="'DM Sans', sans-serif">DM Sans</option>
              <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans</option>
            </optgroup>
            <optgroup label="Classic Sans-Serif">
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="Lato, sans-serif">Lato</option>
            </optgroup>
            <optgroup label="Serif">
              <option value="'Playfair Display', serif">Playfair Display</option>
              <option value="Merriweather, serif">Merriweather</option>
              <option value="'Crimson Text', serif">Crimson Text</option>
              <option value="'Libre Baskerville', serif">Libre Baskerville</option>
            </optgroup>
            <optgroup label="Display">
              <option value="Oswald, sans-serif">Oswald</option>
              <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
              <option value="Raleway, sans-serif">Raleway</option>
              <option value="'Fjalla One', sans-serif">Fjalla One</option>
              <option value="Anton, sans-serif">Anton</option>
              <option value="'Russo One', sans-serif">Russo One</option>
            </optgroup>
            <optgroup label="Monospace">
              <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
              <option value="'Fira Code', monospace">Fira Code</option>
              <option value="'Source Code Pro', monospace">Source Code Pro</option>
              <option value="'IBM Plex Mono', monospace">IBM Plex Mono</option>
            </optgroup>
            <optgroup label="Script & Decorative">
              <option value="'Dancing Script', cursive">Dancing Script</option>
              <option value="'Pacifico', cursive">Pacifico</option>
              <option value="'Great Vibes', cursive">Great Vibes</option>
              <option value="'Lobster', cursive">Lobster</option>
            </optgroup>
          </select>
        </div>

        {/* Font Weight */}
        <div className="drawer-form-group">
          <select
            value={priceStyles.beforePrice.fontWeight}
            onChange={(e) => setPriceStyles({
              ...priceStyles,
              beforePrice: { ...priceStyles.beforePrice, fontWeight: e.target.value }
            })}
            className="drawer-select" onClick={(e) => e.stopPropagation()}
          >
            <option value="300">Light (300)</option>
            <option value="400">Normal (400)</option>
            <option value="500">Medium (500)</option>
            <option value="600">Semi Bold (600)</option>
            <option value="700">Bold (700)</option>
            <option value="800">Extra Bold (800)</option>
          </select>
        </div>

        {/* Text Alignment */}
        <div className="alignment-tabs">
          <button
            className={`alignment-tab ${priceStyles.beforePrice.textAlign === 'left' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, beforePrice: {...priceStyles.beforePrice, textAlign: 'left'}}); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/></svg>
            Left
          </button>
          <button
            className={`alignment-tab ${priceStyles.beforePrice.textAlign === 'center' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, beforePrice: {...priceStyles.beforePrice, textAlign: 'center'}}); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm3-6h12v2H6v-2zm-3-6h18v2H3v-2zm3-6h12v2H6v-2z"/></svg>
            Center
          </button>
          <button
            className={`alignment-tab ${priceStyles.beforePrice.textAlign === 'right' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, beforePrice: {...priceStyles.beforePrice, textAlign: 'right'}}); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/></svg>
            Right
          </button>
        </div>
        </div>
      )}

      {/* Save Controls */}
      {activePriceTab === 'save' && (
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Save</h4>
        
        {/* Show/Hide Toggle */}
        <div className="system-control-toggle">
          <div 
            className={`toggle-slider ${priceStyles.save.show ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setPriceStyles({
                ...priceStyles,
                save: { ...priceStyles.save, show: !priceStyles.save.show }
              });
            }}
          ></div>
          <span className="toggle-text">{priceStyles.save.show ? 'Show' : 'Hide'}</span>
        </div>

        {/* Font Size */}
        <div className="drawer-range-container">
          <div className="drawer-range-label">
            <span>Font Size</span>
            <span className="drawer-range-value">{priceStyles.save.fontSize}px</span>
          </div>
          <input
            type="range"
            min="10" max="20" value={priceStyles.save.fontSize}
            onChange={(e) => setPriceStyles({
              ...priceStyles,
              save: { ...priceStyles.save, fontSize: Number(e.target.value) }
            })}
            className="drawer-range" onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Text Color */}
        <div className="drawer-form-group">
          <input
            type="color"
            value={priceStyles.save.color}
            onChange={(e) => setPriceStyles({
              ...priceStyles,
              save: { ...priceStyles.save, color: e.target.value }
            })}
            className="drawer-color-input" onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Font Family */}
        <div className="drawer-form-group">
          <select
            value={priceStyles.save.fontFamily}
            onChange={(e) => setPriceStyles({
              ...priceStyles,
              save: { ...priceStyles.save, fontFamily: e.target.value }
            })}
            className="drawer-select" onClick={(e) => e.stopPropagation()}
          >
            <optgroup label="Modern Sans-Serif">
              <option value="Inter, sans-serif">Inter</option>
              <option value="Poppins, sans-serif">Poppins</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Nunito, sans-serif">Nunito</option>
              <option value="'Source Sans 3', sans-serif">Source Sans 3</option>
              <option value="'Work Sans', sans-serif">Work Sans</option>
              <option value="'DM Sans', sans-serif">DM Sans</option>
              <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans</option>
            </optgroup>
            <optgroup label="Classic Sans-Serif">
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="Lato, sans-serif">Lato</option>
            </optgroup>
            <optgroup label="Serif">
              <option value="'Playfair Display', serif">Playfair Display</option>
              <option value="Merriweather, serif">Merriweather</option>
              <option value="'Crimson Text', serif">Crimson Text</option>
              <option value="'Libre Baskerville', serif">Libre Baskerville</option>
            </optgroup>
            <optgroup label="Display">
              <option value="Oswald, sans-serif">Oswald</option>
              <option value="'Bebas Neue', sans-serif">Bebas Neue</option>
              <option value="Raleway, sans-serif">Raleway</option>
              <option value="'Fjalla One', sans-serif">Fjalla One</option>
              <option value="Anton, sans-serif">Anton</option>
              <option value="'Russo One', sans-serif">Russo One</option>
            </optgroup>
            <optgroup label="Monospace">
              <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
              <option value="'Fira Code', monospace">Fira Code</option>
              <option value="'Source Code Pro', monospace">Source Code Pro</option>
              <option value="'IBM Plex Mono', monospace">IBM Plex Mono</option>
            </optgroup>
            <optgroup label="Script & Decorative">
              <option value="'Dancing Script', cursive">Dancing Script</option>
              <option value="'Pacifico', cursive">Pacifico</option>
              <option value="'Great Vibes', cursive">Great Vibes</option>
              <option value="'Lobster', cursive">Lobster</option>
            </optgroup>
          </select>
        </div>

        {/* Font Weight */}
        <div className="drawer-form-group">
          <select
            value={priceStyles.save.fontWeight}
            onChange={(e) => setPriceStyles({
              ...priceStyles,
              save: { ...priceStyles.save, fontWeight: e.target.value }
            })}
            className="drawer-select" onClick={(e) => e.stopPropagation()}
          >
            <option value="300">Light (300)</option>
            <option value="400">Normal (400)</option>
            <option value="500">Medium (500)</option>
            <option value="600">Semi Bold (600)</option>
            <option value="700">Bold (700)</option>
            <option value="800">Extra Bold (800)</option>
          </select>
        </div>

        {/* Text Alignment */}
        <div className="alignment-tabs">
          <button
            className={`alignment-tab ${priceStyles.save.textAlign === 'left' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, save: {...priceStyles.save, textAlign: 'left'}}); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/></svg>
            Left
          </button>
          <button
            className={`alignment-tab ${priceStyles.save.textAlign === 'center' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, save: {...priceStyles.save, textAlign: 'center'}}); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm3-6h12v2H6v-2zm-3-6h18v2H3v-2zm3-6h12v2H6v-2z"/></svg>
            Center
          </button>
          <button
            className={`alignment-tab ${priceStyles.save.textAlign === 'right' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, save: {...priceStyles.save, textAlign: 'right'}}); }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/></svg>
            Right
          </button>
        </div>
        </div>
      )}

      {/* Horizontal Spacing */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Horizontal Spacing</h4>
        <div className="range-container">
          <label className="range-label">
            Spacing: {priceStyles.horizontalSpacing}px
          </label>
          <input
            type="range"
            min="4" max="24" value={priceStyles.horizontalSpacing}
            onChange={(e) => setPriceStyles({...priceStyles, horizontalSpacing: Number(e.target.value)})}
            className="system-range" onClick={(e) => e.stopPropagation()}
          />
          <div className="range-markers">
            <span>4px</span>
            <span>14px</span>
            <span>24px</span>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Bottom Spacing</h4>
        <div className="range-container">
          <label className="range-label">
            Spacing: {priceStyles.bottomSpacing}px
          </label>
          <input
            type="range"
            min="0" max="32" value={priceStyles.bottomSpacing}
            onChange={(e) => setPriceStyles({...priceStyles, bottomSpacing: Number(e.target.value)})}
            className="system-range" onClick={(e) => e.stopPropagation()}
          />
          <div className="range-markers">
            <span>0px</span>
            <span>16px</span>
            <span>32px</span>
          </div>
        </div>
      </div>
    </SystemDrawer>
  );
};

export default StylePriceEditor;
