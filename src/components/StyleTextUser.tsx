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
    isBold: boolean;
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

  const updateStyle = (property: string, value: any) => {
    onStylesChange({
      ...styles,
      [property]: value
    });
  };

  return (
    <div className={`style-text-control ${className}`}>
      <div className="text-control-container">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`text-control-input ${styles.isBold ? 'bold-text' : ''}`}
          style={{
            fontSize: `${styles.fontSize}px`,
            fontFamily: styles.fontFamily,
            color: styles.color,
            fontWeight: styles.isBold ? '700' : styles.fontWeight,
            marginBottom: `${styles.bottomSpacing}px`,
            textAlign: styles.textAlign as any,
            // CSS custom properties for more reliable styling
            '--text-align': styles.textAlign,
            '--font-weight': styles.isBold ? '700' : styles.fontWeight,
            '--is-bold': styles.isBold ? '1' : '0'
          } as React.CSSProperties}
        />
        <button 
          className="text-control-edit-icon"
          onClick={() => setShowEditor(!showEditor)}
          title="Edit Text Style"
          disabled={disabled}
        >
          <HiPencil />
        </button>
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
              <option value="Inter">Inter</option>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
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

        {/* Bold Toggle */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Bold Text</h4>
          <div className="drawer-form-group">
            <label className="toggle-label">
              <span>Enable Bold</span>
              <div 
                className={`system-control-toggle ${styles.isBold ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  updateStyle('isBold', !styles.isBold);
                  updateStyle('fontWeight', !styles.isBold ? '700' : '400');
                }}
              >
                <div className="toggle-slider"></div>
              </div>
            </label>
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
