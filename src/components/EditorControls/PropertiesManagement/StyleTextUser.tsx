'use client';

import React from 'react';
import { HiPencil } from 'react-icons/hi';
import { useGlobalDrawer } from './GlobalDrawerProvider';
import './StyleTextUser.css';

interface StyleTextUserProps {
  value: string;
  onChange: (value: string) => void;
  styles: {
    fontSize: number;
    fontFamily: string;
    color: string;
    fontWeight: string;
    bottomSpacing?: number;
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
  const { openDrawer, closeDrawer } = useGlobalDrawer();
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

  const openStyleEditor = () => {
    const drawerContent = (
      <div>
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
              max="72"
              value={styles.fontSize}
              onChange={(e) => updateStyle('fontSize', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>

        {/* Font Family */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Font Family</h4>
          <div className="drawer-form-group">
            <select
              value={styles.fontFamily}
              onChange={(e) => updateStyle('fontFamily', e.target.value)}
              className="drawer-select"
            >
              <option value="Inter, system-ui, sans-serif">Inter</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Times New Roman, serif">Times New Roman</option>
              <option value="Courier New, monospace">Courier New</option>
              <option value="Helvetica, sans-serif">Helvetica</option>
              <option value="Verdana, sans-serif">Verdana</option>
            </select>
          </div>
        </div>

        {/* Font Weight */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Font Weight</h4>
          <div className="drawer-form-group">
            <select
              value={styles.fontWeight}
              onChange={(e) => updateStyle('fontWeight', e.target.value)}
              className="drawer-select"
            >
              <option value="300">Light</option>
              <option value="400">Normal</option>
              <option value="500">Medium</option>
              <option value="600">Semi Bold</option>
              <option value="700">Bold</option>
              <option value="800">Extra Bold</option>
              <option value="900">Black</option>
            </select>
          </div>
        </div>

        {/* Text Color */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Text Color</h4>
          <div className="drawer-form-group">
            <input
              type="color"
              value={styles.color}
              onChange={(e) => updateStyle('color', e.target.value)}
              className="drawer-color-input"
            />
            <input
              type="text"
              value={styles.color}
              onChange={(e) => updateStyle('color', e.target.value)}
              className="drawer-text-input"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Text Alignment */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Text Alignment</h4>
          <div className="drawer-button-group">
            <button
              className={`drawer-btn ${styles.textAlign === 'left' ? 'active' : ''}`}
              onClick={() => updateStyle('textAlign', 'left')}
            >
              Left
            </button>
            <button
              className={`drawer-btn ${styles.textAlign === 'center' ? 'active' : ''}`}
              onClick={() => updateStyle('textAlign', 'center')}
            >
              Center
            </button>
            <button
              className={`drawer-btn ${styles.textAlign === 'right' ? 'active' : ''}`}
              onClick={() => updateStyle('textAlign', 'right')}
            >
              Right
            </button>
          </div>
        </div>

        {/* Bottom Spacing */}
        {styles.bottomSpacing !== undefined && (
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
                max="100"
                value={styles.bottomSpacing}
                onChange={(e) => updateStyle('bottomSpacing', Number(e.target.value))}
                className="drawer-range"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-actions">
            <button 
              className="drawer-action-btn reset"
              onClick={() => {
                onStylesChange({
                  fontSize: 16,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: '#374151',
                  fontWeight: '400',
                  textAlign: 'left',
                  bottomSpacing: styles.bottomSpacing || 0
                });
              }}
            >
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    );

    openDrawer('text-style-editor', 'Text Style Editor', drawerContent, 350, closeDrawer);
  };

  React.useEffect(() => {
    autoResize();
  }, [value]);

  const handleTextClick = () => {
    if (!disabled) {
      setIsEditMode(true);
    }
  };

  const handleTextBlur = () => {
    setIsEditMode(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsEditMode(false);
    }
  };

  return (
    <div className={`text-control ${className} ${disabled ? 'disabled' : ''}`}>
      <div className="text-control-container">
        <div className="text-control-content">
          {isEditMode ? (
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={handleTextBlur}
              onKeyDown={handleKeyDown}
              style={{
                ...styles,
                whiteSpace: 'pre-wrap',
                resize: 'none',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                width: '100%',
                fontFamily: styles.fontFamily,
                fontSize: `${styles.fontSize}px`,
                color: styles.color,
                fontWeight: styles.fontWeight,
                textAlign: styles.textAlign as any,
                marginBottom: styles.bottomSpacing ? `${styles.bottomSpacing}px` : undefined
              }}
              className="text-control-input"
              autoFocus
              placeholder={placeholder}
            />
          ) : (
            <div
              onClick={handleTextClick}
              style={{
                ...styles,
                whiteSpace: 'pre-wrap',
                cursor: disabled ? 'default' : 'pointer',
                minHeight: '1.2em',
                fontFamily: styles.fontFamily,
                fontSize: `${styles.fontSize}px`,
                color: styles.color,
                fontWeight: styles.fontWeight,
                textAlign: styles.textAlign as any,
                marginBottom: styles.bottomSpacing ? `${styles.bottomSpacing}px` : undefined
              }}
              className="text-control-display"
              title="Click to edit"
            >
              {value || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>{placeholder}</span>}
            </div>
          )}
          <button 
            className="text-control-edit-icon inline-icon"
            onClick={openStyleEditor}
            title="Edit Text Style"
            disabled={disabled}
          >
            <HiPencil />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StyleTextUser;