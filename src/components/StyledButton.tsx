'use client';

import React from 'react';
import { ButtonStyles } from './StyleButton';

export interface StyledButtonProps {
  styles: ButtonStyles;
  onClick?: () => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  styles,
  onClick,
  onMouseDown,
  className = '',
  children
}) => {
  const getButtonBackground = () => {
    if (styles.backgroundType === 'gradient') {
      const direction = styles.gradientDirection.replace('to-', '');
      return `linear-gradient(${direction === 'right' ? 'to right' : 
                             direction === 'bottom' ? 'to bottom' : 
                             direction === 'bottom-right' ? 'to bottom right' : 'to right'}, ${styles.gradientStart}, ${styles.gradientEnd})`;
    }
    return styles.backgroundColor;
  };

  const renderButtonContent = () => {
    const iconMap = {
      plus: '+',
      cart: '🛒',
      heart: '♥',
      check: '✓',
      'arrow-right': '→',
      'arrow-left': '←',
      download: '⬇',
      upload: '⬆',
      star: '★',
      bookmark: '🔖',
      user: '👤',
      settings: '⚙️',
      search: '🔍',
      filter: '🔽',
      edit: '✏️',
      delete: '🗑️',
      save: '💾',
      share: '📤',
      email: '📧',
      phone: '📞'
    };

    const icon = iconMap[styles.iconType as keyof typeof iconMap];
    
    if (styles.type === 'text') {
      return children || styles.text;
    } else if (styles.type === 'icon') {
      return (
        <span className="button-icon">
          {icon}
        </span>
      );
    } else if (styles.type === 'text-icon') {
      return (
        <>
          {styles.iconPosition === 'left' && (
            <span className="button-icon">
              {icon}
            </span>
          )}
          <span className="button-text">{children || styles.text}</span>
          {styles.iconPosition === 'right' && (
            <span className="button-icon">
              {icon}
            </span>
          )}
        </>
      );
    }
    return children || styles.text;
  };

  return (
    <button 
      className={`styled-button ${className}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      style={{
        fontSize: `${styles.fontSize}px`,
        fontFamily: styles.fontFamily,
        color: styles.textColor,
        fontWeight: styles.isBold ? '700' : styles.fontWeight,
        background: getButtonBackground(),
        border: styles.borderWidth > 0 ? `${styles.borderWidth}px ${styles.borderStyle} ${styles.borderColor}` : 'none',
        height: `${styles.height}px`,
        width: styles.width === 'full' ? '100%' : 
               styles.width === 'custom' ? `${styles.customWidth}px` : 'auto',
        borderRadius: `${styles.borderRadius}px`,
        transition: `all ${styles.transitionDuration}ms ease`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: styles.type === 'text-icon' ? '8px' : '0',
        cursor: 'pointer',
        padding: '16px 24px',
        // CSS custom properties for icon styling
        '--icon-size': `${styles.iconSize}px`,
        '--icon-color': styles.iconColor
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        const target = e.target as HTMLButtonElement;
        target.style.backgroundColor = styles.hoverBackgroundColor;
        target.style.color = styles.hoverTextColor;
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLButtonElement;
        target.style.background = getButtonBackground();
        target.style.color = styles.textColor;
      }}
    >
      {renderButtonContent()}
    </button>
  );
};

export default StyledButton;
