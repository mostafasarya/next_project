import React from 'react';
import SystemDrawer from './SystemDrawer';

interface QuantityStyles {
  theme: string;
  buttonColor: string;
  buttonTextColor: string;
  textColor: string;
  fontSize: number;
  fontWeight: string;
  borderRadius: number;
  buttonSize: number;
  spacing: number;
  layout: string;
  bottomSpacing: number;
}

interface StyleQuantityCounterEditorProps {
  isOpen: boolean;
  onClose: () => void;
  styles: QuantityStyles;
  onStylesChange: (styles: QuantityStyles) => void;
}

const StyleQuantityCounterEditor: React.FC<StyleQuantityCounterEditorProps> = ({
  isOpen,
  onClose,
  styles,
  onStylesChange
}) => {
  const updateStyles = (updates: Partial<QuantityStyles>) => {
    onStylesChange({ ...styles, ...updates });
  };

  return (
    <SystemDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Quantity Counter Editor"
      width={400}
      position="right"
      pushContent={true}
    >
      {/* Counter Types */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Counter Types</h4>
        <div className="theme-grid">
          <button
            className={`theme-card ${styles.theme === 'default' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              updateStyles({
                theme: 'default',
                buttonColor: '#f3f4f6',
                buttonTextColor: '#374151',
                textColor: '#374151',
                borderRadius: 4,
                buttonSize: 40
              });
            }}
          >
            <div className="theme-preview">
              <div className="theme-counter">[- 1 +]</div>
              <div className="theme-text">Standard</div>
            </div>
          </button>
          
          <button
            className={`theme-card ${styles.theme === 'rounded' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              updateStyles({
                theme: 'rounded',
                buttonColor: '#3b82f6',
                buttonTextColor: '#ffffff',
                textColor: '#1e40af',
                borderRadius: 20,
                buttonSize: 40
              });
            }}
          >
            <div className="theme-preview">
              <div className="theme-counter">( 1 )</div>
              <div className="theme-text">Rounded</div>
            </div>
          </button>
          
          <button
            className={`theme-card ${styles.theme === 'minimal' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              updateStyles({
                theme: 'minimal',
                buttonColor: '#f3f4f6',
                buttonTextColor: '#374151',
                textColor: '#374151',
                borderRadius: 4,
                buttonSize: 36
              });
            }}
          >
            <div className="theme-preview">
              <div className="theme-counter">- 1 +</div>
              <div className="theme-text">Minimal</div>
            </div>
          </button>
          
          <button
            className={`theme-card ${styles.theme === 'bold' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              updateStyles({
                theme: 'bold',
                buttonColor: '#1f2937',
                buttonTextColor: '#ffffff',
                textColor: '#1f2937',
                borderRadius: 8,
                buttonSize: 44,
                fontWeight: '700'
              });
            }}
          >
            <div className="theme-preview">
              <div className="theme-counter">[- 1 +]</div>
              <div className="theme-text">Bold</div>
            </div>
          </button>
          
          <button
            className={`theme-card ${styles.theme === 'outlined' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              updateStyles({
                theme: 'outlined',
                buttonColor: 'transparent',
                buttonTextColor: '#ef4444',
                textColor: '#374151',
                borderRadius: 8,
                buttonSize: 40
              });
            }}
          >
            <div className="theme-preview">
              <div className="theme-counter">[- 1 +]</div>
              <div className="theme-text">Outlined</div>
            </div>
          </button>
          
          <button
            className={`theme-card ${styles.theme === 'compact' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              updateStyles({
                theme: 'compact',
                buttonColor: '#ef4444',
                buttonTextColor: '#ffffff',
                textColor: '#374151',
                borderRadius: 6,
                buttonSize: 32,
                fontSize: 14
              });
            }}
          >
            <div className="theme-preview">
              <div className="theme-counter">-1+</div>
              <div className="theme-text">Compact</div>
            </div>
          </button>
        </div>
      </div>

      {/* Button Color Custom */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Button Color</h4>
        <div className="drawer-form-group">
          <input
            type="color"
            value={styles.buttonColor}
            onChange={(e) => updateStyles({ buttonColor: e.target.value })}
            className="drawer-color-input"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Button Text Color */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Button Text Color</h4>
        <div className="drawer-form-group">
          <input
            type="color"
            value={styles.buttonTextColor}
            onChange={(e) => updateStyles({ buttonTextColor: e.target.value })}
            className="drawer-color-input"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Text Color */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Text Color</h4>
        <div className="drawer-form-group">
          <input
            type="color"
            value={styles.textColor}
            onChange={(e) => updateStyles({ textColor: e.target.value })}
            className="drawer-color-input"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

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
            max="24"
            value={styles.fontSize}
            onChange={(e) => updateStyles({ fontSize: Number(e.target.value) })}
            className="drawer-range"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Font Weight */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Font Weight</h4>
        <div className="drawer-form-group">
          <select
            value={styles.fontWeight}
            onChange={(e) => updateStyles({ fontWeight: e.target.value })}
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
      </div>

      {/* Border Radius */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Border Radius</h4>
        <div className="drawer-range-container">
          <div className="drawer-range-label">
            <span>Radius</span>
            <span className="drawer-range-value">{styles.borderRadius}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={styles.borderRadius}
            onChange={(e) => updateStyles({ borderRadius: Number(e.target.value) })}
            className="drawer-range"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Button Size */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Button Size</h4>
        <div className="drawer-range-container">
          <div className="drawer-range-label">
            <span>Size</span>
            <span className="drawer-range-value">{styles.buttonSize}px</span>
          </div>
          <input
            type="range"
            min="32"
            max="60"
            value={styles.buttonSize}
            onChange={(e) => updateStyles({ buttonSize: Number(e.target.value) })}
            className="drawer-range"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Spacing */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Spacing</h4>
        <div className="drawer-range-container">
          <div className="drawer-range-label">
            <span>Gap</span>
            <span className="drawer-range-value">{styles.spacing}px</span>
          </div>
          <input
            type="range"
            min="4"
            max="20"
            value={styles.spacing}
            onChange={(e) => updateStyles({ spacing: Number(e.target.value) })}
            className="drawer-range"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Layout */}
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

      {/* Bottom Spacing */}
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Bottom Spacing</h4>
        <div className="drawer-range-container">
          <div className="drawer-range-label">
            <span>Bottom Margin</span>
            <span className="drawer-range-value">{styles.bottomSpacing}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            value={styles.bottomSpacing}
            onChange={(e) => updateStyles({ bottomSpacing: Number(e.target.value) })}
            className="drawer-range"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </SystemDrawer>
  );
};

export default StyleQuantityCounterEditor;
