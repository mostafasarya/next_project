'use client';

import React from 'react';
import './SystemDrawer.css';

interface SystemDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  width?: number;
  position?: 'left' | 'right';
  pushContent?: boolean;
}

const SystemDrawer: React.FC<SystemDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = 300,
  position = 'left',
  pushContent = true
}) => {
  const [startY, setStartY] = React.useState<number>(0);
  const [currentY, setCurrentY] = React.useState<number>(0);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const drawerRef = React.useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaY = currentY - startY;
    
    // If dragged down more than 100px, close the drawer
    if (deltaY > 100) {
      onClose();
    }
    
    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  // Handle click outside to close drawer
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        pushContent &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        window.innerWidth >= 769 // Only on desktop
      ) {
        onClose();
      }
    };

    if (isOpen && pushContent) {
      // Add event listener with a slight delay to avoid immediate closure
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, pushContent, onClose]);

  // Add body class for push content effect on desktop
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      if (isOpen && pushContent) {
        body.classList.add('drawer-push-content');
        body.style.setProperty('--drawer-width', `${width}px`);
        body.style.setProperty('--drawer-position', position);
      } else {
        body.classList.remove('drawer-push-content');
        body.style.removeProperty('--drawer-width');
        body.style.removeProperty('--drawer-position');
      }
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        const body = document.body;
        body.classList.remove('drawer-push-content');
        body.style.removeProperty('--drawer-width');
        body.style.removeProperty('--drawer-position');
      }
    };
  }, [isOpen, pushContent, width, position]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - only show if not pushing content */}
      {!pushContent && <div className="system-drawer-overlay" onClick={onClose}></div>}
      
      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={`system-drawer ${position} ${pushContent ? 'push-mode' : ''}`}
        style={{
          width: `${width}px`,
          [position]: 0,
          transform: isDragging ? `translateY(${Math.max(0, currentY - startY)}px)` : 'none'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="system-drawer-header">
          <h3 className="system-drawer-title">
            <span className="drawer-icon">⚙️</span>
            {title}
          </h3>
          <button className="system-drawer-close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="system-drawer-content">
          {children || (
            <div className="empty-drawer-content">
              <div className="empty-icon">📋</div>
              <p>Drawer content goes here</p>
              <p className="empty-subtitle">Add your custom content to this reusable drawer component.</p>
            </div>
          )}
        </div>
        
        <div className="system-drawer-footer">
          <button className="drawer-action-btn secondary" onClick={onClose}>Close</button>
          <button className="drawer-action-btn primary">Apply</button>
        </div>
      </div>
    </>
  );
};

export default SystemDrawer;
