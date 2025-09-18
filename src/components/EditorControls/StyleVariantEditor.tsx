import React from 'react';
import SystemDrawer from './SystemDrawer';
import './StyleVariantEditor.css';

interface VariantStyles {
  // Label styling
  labelFontSize: number;
  labelFontWeight: string;
  labelColor: string;
  labelSpacing: number;
  
  // Option button styling
  optionFontSize: number;
  optionFontWeight: string;
  optionPadding: number;
  optionBorderRadius: number;
  optionSpacing: number;
  
  // Option colors
  optionBackgroundColor: string;
  optionBorderColor: string;
  optionTextColor: string;
  
  // Selected option colors
  selectedBackgroundColor: string;
  selectedBorderColor: string;
  selectedTextColor: string;
  
  // Hover colors
  hoverBorderColor: string;
  hoverBackgroundColor: string;
  
  // Layout
  layout: string; // 'horizontal' | 'vertical'
  sectionSpacing: number;
  
  // Color circle specific
  colorCircleSize: number;
  
  // Spacing between different variant types
  variantTypeSpacing: number;
}

interface StyleVariantEditorProps {
  isOpen: boolean;
  onClose: () => void;
  styles: VariantStyles;
  onStylesChange: (styles: VariantStyles) => void;
}

const StyleVariantEditor: React.FC<StyleVariantEditorProps> = ({
  isOpen,
  onClose,
  styles,
  onStylesChange
}) => {
  const [activeTab, setActiveTab] = React.useState<'color' | 'size'>('color');

  const updateStyles = (updates: Partial<VariantStyles>) => {
    onStylesChange({ ...styles, ...updates });
  };

  return (
    <SystemDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Variant Style Editor"
      width={400}
      position="right"
      pushContent={true}
    >
      {/* Tab Navigation */}
      <div className="variant-tabs" onClick={(e) => e.stopPropagation()}>
        <button
          className={`variant-tab ${activeTab === 'color' ? 'active' : ''}`}
          onClick={() => setActiveTab('color')}
        >
          Color
        </button>
        <button
          className={`variant-tab ${activeTab === 'size' ? 'active' : ''}`}
          onClick={() => setActiveTab('size')}
        >
          Size
        </button>
      </div>

      {/* Shared Layout Options - Always visible */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Layout</h4>
        <div className="layout-tabs">
          <button
            className={`layout-tab ${styles.layout === 'horizontal' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              updateStyles({ layout: 'horizontal' });
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 7h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" />
            </svg>
            Horizontal
          </button>
          <button
            className={`layout-tab ${styles.layout === 'vertical' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              updateStyles({ layout: 'vertical' });
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 3v18h2V3H7zm4 0v18h2V3h-2zm4 0v18h2V3h-2z" />
            </svg>
            Vertical
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'color' && (
        <>
          {/* Color Circle Settings */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Color Circle Settings</h4>
            
            {/* Color Circle Size */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Circle Size</span>
                <span className="drawer-range-value">{styles.colorCircleSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="60"
                value={styles.colorCircleSize}
                onChange={(e) => updateStyles({ colorCircleSize: Number(e.target.value) })}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Color Label Styling */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Color Label Style</h4>
            
            {/* Label Font Size */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Font Size</span>
                <span className="drawer-range-value">{styles.labelFontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="24"
                value={styles.labelFontSize}
                onChange={(e) => updateStyles({ labelFontSize: Number(e.target.value) })}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Label Font Weight */}
            <div className="drawer-form-group">
              <select
                value={styles.labelFontWeight}
                onChange={(e) => updateStyles({ labelFontWeight: e.target.value })}
                className="drawer-select"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </div>

            {/* Label Color */}
            <div className="drawer-form-group">
              <input
                type="color"
                value={styles.labelColor}
                onChange={(e) => updateStyles({ labelColor: e.target.value })}
                className="drawer-color-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Label Spacing */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Label Spacing</span>
                <span className="drawer-range-value">{styles.labelSpacing}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="20"
                value={styles.labelSpacing}
                onChange={(e) => updateStyles({ labelSpacing: Number(e.target.value) })}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Color Spacing */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Color Spacing</h4>
            
            {/* Option Spacing */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Between Colors</span>
                <span className="drawer-range-value">{styles.optionSpacing}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="20"
                value={styles.optionSpacing}
                onChange={(e) => updateStyles({ optionSpacing: Number(e.target.value) })}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Variant Type Spacing */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Between Color & Size</span>
                <span className="drawer-range-value">{styles.variantTypeSpacing}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={styles.variantTypeSpacing}
                onChange={(e) => updateStyles({ variantTypeSpacing: Number(e.target.value) })}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </>
      )}

      {activeTab === 'size' && (
        <>
          {/* Size Button Styling */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Size Button Style</h4>
            
            {/* Option Font Size */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Font Size</span>
                <span className="drawer-range-value">{styles.optionFontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="20"
                value={styles.optionFontSize}
                onChange={(e) => updateStyles({ optionFontSize: Number(e.target.value) })}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Option Font Weight */}
            <div className="drawer-form-group">
              <select
                value={styles.optionFontWeight}
                onChange={(e) => updateStyles({ optionFontWeight: e.target.value })}
                className="drawer-select"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </div>

            {/* Option Padding */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Padding</span>
                <span className="drawer-range-value">{styles.optionPadding}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="20"
                value={styles.optionPadding}
                onChange={(e) => updateStyles({ optionPadding: Number(e.target.value) })}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Option Border Radius */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Border Radius</span>
                <span className="drawer-range-value">{styles.optionBorderRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={styles.optionBorderRadius}
                onChange={(e) => updateStyles({ optionBorderRadius: Number(e.target.value) })}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Size Label Styling */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Size Label Style</h4>
            
            {/* Label Font Size */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Font Size</span>
                <span className="drawer-range-value">{styles.labelFontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="24"
                value={styles.labelFontSize}
                onChange={(e) => updateStyles({ labelFontSize: Number(e.target.value) })}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Label Font Weight */}
            <div className="drawer-form-group">
              <select
                value={styles.labelFontWeight}
                onChange={(e) => updateStyles({ labelFontWeight: e.target.value })}
                className="drawer-select"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </div>

            {/* Label Color */}
            <div className="drawer-form-group">
              <input
                type="color"
                value={styles.labelColor}
                onChange={(e) => updateStyles({ labelColor: e.target.value })}
                className="drawer-color-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Label Spacing */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Label Spacing</span>
                <span className="drawer-range-value">{styles.labelSpacing}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="20"
                value={styles.labelSpacing}
                onChange={(e) => updateStyles({ labelSpacing: Number(e.target.value) })}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Size Spacing */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Size Spacing</h4>
            
            {/* Option Spacing */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Between Sizes</span>
                <span className="drawer-range-value">{styles.optionSpacing}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="20"
                value={styles.optionSpacing}
                onChange={(e) => updateStyles({ optionSpacing: Number(e.target.value) })}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Variant Type Spacing */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Between Color & Size</span>
                <span className="drawer-range-value">{styles.variantTypeSpacing}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={styles.variantTypeSpacing}
                onChange={(e) => updateStyles({ variantTypeSpacing: Number(e.target.value) })}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Size Button Colors */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Size Button Colors</h4>
            
            {/* Normal State Colors */}
            <div className="drawer-form-group">
              <label className="drawer-form-label">Background Color</label>
              <input
                type="color"
                value={styles.optionBackgroundColor}
                onChange={(e) => updateStyles({ optionBackgroundColor: e.target.value })}
                className="drawer-color-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="drawer-form-group">
              <label className="drawer-form-label">Border Color</label>
              <input
                type="color"
                value={styles.optionBorderColor}
                onChange={(e) => updateStyles({ optionBorderColor: e.target.value })}
                className="drawer-color-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="drawer-form-group">
              <label className="drawer-form-label">Text Color</label>
              <input
                type="color"
                value={styles.optionTextColor}
                onChange={(e) => updateStyles({ optionTextColor: e.target.value })}
                className="drawer-color-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Selected State Colors */}
            <div className="drawer-form-group">
              <label className="drawer-form-label">Selected Background</label>
              <input
                type="color"
                value={styles.selectedBackgroundColor}
                onChange={(e) => updateStyles({ selectedBackgroundColor: e.target.value })}
                className="drawer-color-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="drawer-form-group">
              <label className="drawer-form-label">Selected Border</label>
              <input
                type="color"
                value={styles.selectedBorderColor}
                onChange={(e) => updateStyles({ selectedBorderColor: e.target.value })}
                className="drawer-color-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="drawer-form-group">
              <label className="drawer-form-label">Selected Text</label>
              <input
                type="color"
                value={styles.selectedTextColor}
                onChange={(e) => updateStyles({ selectedTextColor: e.target.value })}
                className="drawer-color-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Hover State Colors */}
            <div className="drawer-form-group">
              <label className="drawer-form-label">Hover Border</label>
              <input
                type="color"
                value={styles.hoverBorderColor}
                onChange={(e) => updateStyles({ hoverBorderColor: e.target.value })}
                className="drawer-color-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="drawer-form-group">
              <label className="drawer-form-label">Hover Background</label>
              <input
                type="color"
                value={styles.hoverBackgroundColor}
                onChange={(e) => updateStyles({ hoverBackgroundColor: e.target.value })}
                className="drawer-color-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </>
      )}

      {/* Section Spacing - Shared */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Section Spacing</h4>
        <div className="drawer-range-container">
          <div className="drawer-range-label">
            <span>Bottom Spacing</span>
            <span className="drawer-range-value">{styles.sectionSpacing}px</span>
          </div>
          <input
            type="range"
            min="8"
            max="40"
            value={styles.sectionSpacing}
            onChange={(e) => updateStyles({ sectionSpacing: Number(e.target.value) })}
            className="drawer-range"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </SystemDrawer>
  );
};

export default StyleVariantEditor;
