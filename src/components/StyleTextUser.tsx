'use client';

import React from 'react';
import { HiPencil } from 'react-icons/hi';
import SystemDrawer from './SystemDrawer';
import './StyleTextUser.css';

interface StyleTextUserProps {
  value: string;
  onChange: (value: string) => void;
  styles: {
    fontSize: number;
    fontFamily: string;
    color: string;
    fontWeight: string;
    bottomSpacing: number;
    textAlign: string;
  };
  onStylesChange: (styles: any) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const StyleTextUser: React.FC<StyleTextUserProps> = ({
  value,
  onChange,
  styles,
  onStylesChange,
  placeholder = "Enter text...",
  className = "",
  disabled = false
}) => {
  const [showEditor, setShowEditor] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const updateStyle = (property: string, value: any) => {
    onStylesChange({
      ...styles,
      [property]: value
    });
  };

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  React.useEffect(() => {
    autoResize();
  }, [value]);



  return (
    <div className={`style-text-control ${className}`}>
      <div 
        className="text-control-container"
        style={{
          '--dynamic-font-size': `${styles.fontSize}px`,
          '--dynamic-font-family': styles.fontFamily,
          '--dynamic-color': styles.color,
          '--dynamic-font-weight': styles.fontWeight,
          '--dynamic-text-align': styles.textAlign,
        } as React.CSSProperties}
      >
        <div className="text-content-wrapper">
          {isEditMode ? (
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onInput={autoResize}
              placeholder={placeholder}
              disabled={disabled}
              className="text-control-input dynamic-text-styling"
              style={{
                marginBottom: `${styles.bottomSpacing}px`,
                resize: 'vertical',
                minHeight: '80px',
                paddingRight: '32px',
              }}
              rows={3}
              onBlur={() => setIsEditMode(false)}
              autoFocus
            />
          ) : (
            <div
              className={`text-control-display dynamic-text-styling ${!value ? 'empty' : ''}`}
              style={{
                marginBottom: `${styles.bottomSpacing}px`,
                padding: '1px 1px',
                border: '1px solid transparent',
                borderRadius: '6px',
                background: 'transparent',
                cursor: 'pointer',
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                overflowWrap: 'break-word',
              display: 'block',
              width: '100%',
              paddingRight: '32px',
              }}
              onClick={() => setIsEditMode(true)}
              onDoubleClick={() => setIsEditMode(true)}
              title="Click to edit"
            >
              {value || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>{placeholder}</span>}
            </div>
          )}
          <button 
            className="text-control-edit-icon inline-icon"
            onClick={() => setShowEditor(!showEditor)}
            title="Edit Text Style"
            disabled={disabled}
          >
            <HiPencil />
          </button>
        </div>
      </div>

      {/* Text Style Editor Drawer */}
      <SystemDrawer
        isOpen={showEditor}
        onClose={() => setShowEditor(false)}
        title="Text Style Editor"
        width={350}
        position="right"
        pushContent={true}
      >
        {/* Font Size */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Font Size</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Size</span>
              <span className="drawer-range-value">{styles.fontSize}px</span>
            </div>
            <input
              type="range"
              min="12"
              max="48"
              value={styles.fontSize}
              onChange={(e) => updateStyle('fontSize', Number(e.target.value))}
              className="drawer-range"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>

        {/* Font Family */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Font Family</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Choose Font</label>
            <select
              value={styles.fontFamily}
              onChange={(e) => updateStyle('fontFamily', e.target.value)}
              className="drawer-form-select"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modern Sans-Serif Fonts */}
              <optgroup label="Modern Sans-Serif">
                <option value="Inter, sans-serif">Inter</option>
                <option value="Poppins, sans-serif">Poppins</option>
                <option value="Montserrat, sans-serif">Montserrat</option>
                <option value="Nunito, sans-serif">Nunito</option>
                <option value="Source Sans 3, sans-serif">Source Sans 3</option>
                <option value="Work Sans, sans-serif">Work Sans</option>
                <option value="DM Sans, sans-serif">DM Sans</option>
                <option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans</option>
              </optgroup>
              
              {/* Classic Sans-Serif Fonts */}
              <optgroup label="Classic Sans-Serif">
                <option value="Roboto, sans-serif">Roboto</option>
                <option value="Open Sans, sans-serif">Open Sans</option>
                <option value="Lato, sans-serif">Lato</option>
                <option value="Helvetica, Arial, sans-serif">Helvetica</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Verdana, sans-serif">Verdana</option>
                <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
              </optgroup>
              
              {/* Serif Fonts */}
              <optgroup label="Serif Fonts">
                <option value="Playfair Display, serif">Playfair Display</option>
                <option value="Merriweather, serif">Merriweather</option>
                <option value="Crimson Text, serif">Crimson Text</option>
                <option value="Libre Baskerville, serif">Libre Baskerville</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Times New Roman, serif">Times New Roman</option>
                <option value="Baskerville, serif">Baskerville</option>
                <option value="Garamond, serif">Garamond</option>
              </optgroup>
              
              {/* Display Fonts */}
              <optgroup label="Display Fonts">
                <option value="Oswald, sans-serif">Oswald</option>
                <option value="Bebas Neue, sans-serif">Bebas Neue</option>
                <option value="Raleway, sans-serif">Raleway</option>
                <option value="Fjalla One, sans-serif">Fjalla One</option>
                <option value="Anton, sans-serif">Anton</option>
                <option value="Russo One, sans-serif">Russo One</option>
              </optgroup>
              
              {/* Monospace Fonts */}
              <optgroup label="Monospace Fonts">
                <option value="JetBrains Mono, monospace">JetBrains Mono</option>
                <option value="Source Code Pro, monospace">Source Code Pro</option>
                <option value="Fira Code, monospace">Fira Code</option>
                <option value="Monaco, monospace">Monaco</option>
                <option value="Consolas, monospace">Consolas</option>
                <option value="Courier New, monospace">Courier New</option>
              </optgroup>
              
              {/* Script & Decorative Fonts */}
              <optgroup label="Script & Decorative">
                <option value="Dancing Script, cursive">Dancing Script</option>
                <option value="Great Vibes, cursive">Great Vibes</option>
                <option value="Pacifico, cursive">Pacifico</option>
                <option value="Lobster, cursive">Lobster</option>
                <option value="Comfortaa, sans-serif">Comfortaa</option>
                <option value="Righteous, sans-serif">Righteous</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Color */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Text Color</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Choose Color</label>
            <input
              type="color"
              value={styles.color}
              onChange={(e) => updateStyle('color', e.target.value)}
              className="drawer-form-input"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>

        {/* Font Weight */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Font Weight</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Choose Weight</label>
            <select
              value={styles.fontWeight}
              onChange={(e) => updateStyle('fontWeight', e.target.value)}
              className="drawer-form-select"
              onClick={(e) => e.stopPropagation()}
            >
              <option value="300">Light (300)</option>
              <option value="400">Normal (400)</option>
              <option value="500">Medium (500)</option>
              <option value="600">Semi Bold (600)</option>
              <option value="700">Bold (700)</option>
              <option value="800">Extra Bold (800)</option>
            </select>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Bottom Spacing</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Spacing</span>
              <span className="drawer-range-value">{styles.bottomSpacing}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={styles.bottomSpacing}
              onChange={(e) => updateStyle('bottomSpacing', Number(e.target.value))}
              className="drawer-range"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>


        {/* Text Alignment */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Text Alignment</h4>
          <div className="alignment-tabs">
            <button
              className={`alignment-tab ${styles.textAlign === 'left' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                updateStyle('textAlign', 'left');
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/>
              </svg>
              Left
            </button>
            <button
              className={`alignment-tab ${styles.textAlign === 'center' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                updateStyle('textAlign', 'center');
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 19h18v2H3v-2zm3-6h12v2H6v-2zm-3-6h18v2H3v-2zm3-6h12v2H6v-2z"/>
              </svg>
              Center
            </button>
            <button
              className={`alignment-tab ${styles.textAlign === 'right' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                updateStyle('textAlign', 'right');
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/>
              </svg>
              Right
            </button>
          </div>
        </div>
      </SystemDrawer>
    </div>
  );
};

export default StyleTextUser;
