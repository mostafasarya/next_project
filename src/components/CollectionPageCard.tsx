'use client';

import React from 'react';
import { HiArrowsExpand, HiCamera, HiX, HiTrash, HiPencil } from 'react-icons/hi';
import SystemDrawer from './SystemDrawer';
import StyleTextUser from './StyleTextUser';
import './CollectionPageCard.css';

interface CollectionPageCardProps {
  collectionId: string;
  collectionName?: string;
  collectionDescription?: string;
}

const CollectionPageCard: React.FC<CollectionPageCardProps> = ({ 
  collectionId,
  collectionName = `Collection ${collectionId}`,
  collectionDescription = "Parent card layout ready. Children cards and controls will be added in the next step."
}) => {
  // Control states similar to ProductPageCard
  const [showDimensionsControl, setShowDimensionsControl] = React.useState(false);
  const [showColorControl, setShowColorControl] = React.useState(false);
  const [cardWidth, setCardWidth] = React.useState(100);
  const [cardHeight, setCardHeight] = React.useState(100);
  const [parentCardColor, setParentCardColor] = React.useState('#ffffff');
  const [childrenCardColor, setChildrenCardColor] = React.useState('#f8f9fa');
  
  // Children cards dimensions
  const [headerCardHeight, setHeaderCardHeight] = React.useState(200); // Height in pixels
  const [filterCardWidth, setFilterCardWidth] = React.useState(25); // 25% of parent width
  const [productsCardWidth, setProductsCardWidth] = React.useState(75); // 75% of parent width
  const [cardsSpacing, setCardsSpacing] = React.useState(16); // Gap between cards
  
  // Layout control
  const [layoutOrientation, setLayoutOrientation] = React.useState('vertical'); // 'vertical', 'horizontal'
  
  // Header background image control
  const [headerBackgroundImage, setHeaderBackgroundImage] = React.useState<string | null>(null);
  const [showHeaderDimensionsControl, setShowHeaderDimensionsControl] = React.useState(false);
  
  // Header text control
  const [headerText, setHeaderText] = React.useState(collectionName || `Collection ${collectionId}`);
  const [showHeaderTextEditor, setShowHeaderTextEditor] = React.useState(false);
  const [headerTextStyles, setHeaderTextStyles] = React.useState({
    fontSize: 28,
    fontFamily: 'Inter',
    color: '#000000',
    fontWeight: '600',
    bottomSpacing: 8,
    isBold: true,
    textAlign: 'center'
  });
  
  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setHeaderBackgroundImage(result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle image removal
  const handleImageRemove = () => {
    setHeaderBackgroundImage(null);
  };

  // Handle clicking outside control panels to close them
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Check if click is outside control panels and buttons
      if (!target.closest('.control-panel') && 
          !target.closest('.system-control-icon') &&
          !target.closest('.header-image-controls') &&
          !target.closest('[data-drawer]') &&
          !target.closest('.drawer-section')) {
        setShowDimensionsControl(false);
        setShowColorControl(false);
        setShowHeaderDimensionsControl(false);
        setShowHeaderTextEditor(false);
      }
    };

    if (showDimensionsControl || showColorControl || showHeaderDimensionsControl || showHeaderTextEditor) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDimensionsControl, showColorControl, showHeaderDimensionsControl, showHeaderTextEditor]);

  return (
    <div className="collection-page-card" style={{ 
      width: `${cardWidth}%`, 
      minHeight: `${cardHeight}vh`,
      backgroundColor: parentCardColor 
    }}>
        {/* System Control Buttons */}
        <div className="system-control-buttons">
          <button 
            className="system-control-icon dimensions"
            onClick={() => setShowDimensionsControl(!showDimensionsControl)}
            title="Control Dimensions"
          >
            <HiArrowsExpand />
          </button>
          <button 
            className="system-control-icon color-control"
            onClick={() => setShowColorControl(!showColorControl)}
            title="Control Colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="8" cy="8" r="2" fill="#ef4444"/>
              <circle cx="16" cy="8" r="2" fill="#3b82f6"/>
              <circle cx="8" cy="16" r="2" fill="#10b981"/>
              <circle cx="16" cy="16" r="2" fill="#f59e0b"/>
              <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
            </svg>
          </button>
        </div>

        {/* Dimensions Control Panel */}
        {showDimensionsControl && (
          <div className="control-panel dimensions-panel">
            <h4>Dimensions Control</h4>
            <div className="control-group">
              <label>Parent Width: {cardWidth}%</label>
              <input
                type="range"
                min="50"
                max="100"
                value={cardWidth}
                onChange={(e) => setCardWidth(parseInt(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Parent Height: {cardHeight}vh</label>
              <input
                type="range"
                min="50"
                max="100"
                value={cardHeight}
                onChange={(e) => setCardHeight(parseInt(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Header Card Height: {headerCardHeight}px</label>
              <input
                type="range"
                min="120"
                max="400"
                value={headerCardHeight}
                onChange={(e) => setHeaderCardHeight(parseInt(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Filter Card Width: {filterCardWidth}%</label>
              <input
                type="range"
                min="20"
                max="40"
                value={filterCardWidth}
                onChange={(e) => setFilterCardWidth(parseInt(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Products Card Width: {productsCardWidth}%</label>
              <input
                type="range"
                min="60"
                max="80"
                value={productsCardWidth}
                onChange={(e) => setProductsCardWidth(parseInt(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Cards Spacing: {cardsSpacing}px</label>
              <input
                type="range"
                min="8"
                max="32"
                value={cardsSpacing}
                onChange={(e) => setCardsSpacing(parseInt(e.target.value))}
              />
            </div>
          </div>
        )}

        {/* Color Control Panel */}
        {showColorControl && (
          <div className="control-panel color-panel">
            <h4>Color Control</h4>
            <div className="control-group">
              <label>Parent Card Color</label>
              <input
                type="color"
                value={parentCardColor}
                onChange={(e) => setParentCardColor(e.target.value)}
              />
            </div>
            <div className="control-group">
              <label>Children Cards Color</label>
              <input
                type="color"
                value={childrenCardColor}
                onChange={(e) => setChildrenCardColor(e.target.value)}
              />
            </div>
          </div>
        )}


        {/* Collection Page Content with 3 Children Cards */}
        <div className="collection-page-card-content" style={{ gap: `${cardsSpacing}px` }}>
          
          {/* Collection Header Card */}
          <div 
            className="collection-header-card" 
            style={{ 
              backgroundColor: headerBackgroundImage ? 'transparent' : childrenCardColor,
              backgroundImage: headerBackgroundImage ? `url(${headerBackgroundImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: `${headerCardHeight}px`, // Use pixel height for reliable sizing
              position: 'relative'
            }}
          >
            {/* Background Image Overlay for better text readability */}
            {headerBackgroundImage && (
              <div className="header-background-overlay"></div>
            )}
            
            {/* Header Image Controls */}
            <div className="header-image-controls">
              {!headerBackgroundImage ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="header-image-input"
                    id="header-bg-upload"
                  />
                  <label htmlFor="header-bg-upload" className="header-image-btn upload-btn" title="Upload Background Image">
                    <HiCamera />
                  </label>
                </>
              ) : (
                <button 
                  className="header-image-btn remove-btn"
                  onClick={handleImageRemove}
                  title="Remove Background Image"
                >
                  <HiTrash />
                </button>
              )}
              
              {/* Header Dimensions Control */}
              <button 
                className="header-image-btn dimensions-btn"
                onClick={() => setShowHeaderDimensionsControl(!showHeaderDimensionsControl)}
                title="Control Header Height"
              >
                <HiArrowsExpand />
              </button>
            </div>


            <div className="header-card-content">
              <div className="header-text-container">
                <input
                  type="text"
                  value={headerText}
                  onChange={(e) => setHeaderText(e.target.value)}
                  className="header-text-input"
                  style={{
                    fontSize: `${headerTextStyles.fontSize}px`,
                    fontFamily: headerTextStyles.fontFamily,
                    color: headerTextStyles.color,
                    fontWeight: headerTextStyles.isBold ? '700' : headerTextStyles.fontWeight,
                    textAlign: headerTextStyles.textAlign as any,
                    marginBottom: `${headerTextStyles.bottomSpacing}px`
                  }}
                  placeholder="Enter collection title..."
                />
                <button 
                  className="header-text-edit-icon"
                  onClick={() => setShowHeaderTextEditor(!showHeaderTextEditor)}
                  title="Edit Header Text Style"
                >
                  <HiPencil />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section with Filter and Products Cards */}
          <div 
            className="collection-bottom-section" 
            style={{ 
              gap: `${cardsSpacing}px`
            }}
          >
            
            {/* Filter Card */}
            <div 
              className="collection-filter-card" 
              style={{ 
                backgroundColor: childrenCardColor,
                width: `${filterCardWidth}%`
              }}
            >
              <div className="filter-card-content">
                <h3 className="filter-title">Filters</h3>
                
                <div className="filter-section">
                  <h4 className="filter-section-title">Categories</h4>
                  <div className="filter-options">
                    <label className="filter-option">
                      <input type="checkbox" /> Clothing
                    </label>
                    <label className="filter-option">
                      <input type="checkbox" /> Accessories
                    </label>
                    <label className="filter-option">
                      <input type="checkbox" /> Footwear
                    </label>
                  </div>
                </div>

                <div className="filter-section">
                  <h4 className="filter-section-title">Price Range</h4>
                  <div className="price-range">
                    <input type="range" min="0" max="200" className="price-slider" />
                    <div className="price-labels">
                      <span>$0</span>
                      <span>$200</span>
                    </div>
                  </div>
                </div>

                <div className="filter-section">
                  <h4 className="filter-section-title">Availability</h4>
                  <div className="filter-options">
                    <label className="filter-option">
                      <input type="checkbox" /> In Stock
                    </label>
                    <label className="filter-option">
                      <input type="checkbox" /> On Sale
                    </label>
                  </div>
                </div>

                <button className="apply-filters-btn">Apply Filters</button>
              </div>
            </div>

            {/* Products Display Card */}
            <div 
              className="collection-products-card" 
              style={{ 
                backgroundColor: childrenCardColor,
                width: `${productsCardWidth}%`
              }}
            >
              <div className="products-card-content">
                <div className="products-header">
                  <h3 className="products-title">Products in Collection</h3>
                  <div className="products-controls">
                    <select className="sort-select">
                      <option value="name">Sort by Name</option>
                      <option value="price">Sort by Price</option>
                      <option value="date">Sort by Date</option>
                    </select>
                    <div className="view-toggle">
                      <button className="view-btn grid-view active">Grid</button>
                      <button className="view-btn list-view">List</button>
                    </div>
                  </div>
                </div>

                <div className="products-grid">
                  {/* Sample Product Cards */}
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="product-card-mini">
                      <div className="product-image-mini">🦴</div>
                      <div className="product-info-mini">
                        <h4 className="product-name-mini">Product {item}</h4>
                        <p className="product-price-mini">$29.99</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="products-pagination">
                  <button className="pagination-btn">← Previous</button>
                  <span className="pagination-info">Page 1 of 3</span>
                  <button className="pagination-btn">Next →</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Header Dimensions Control Drawer */}
        <SystemDrawer
          isOpen={showHeaderDimensionsControl}
          onClose={() => setShowHeaderDimensionsControl(false)}
          title="Header Height Control"
          width={350}
          position="right"
          pushContent={true}
        >
          {/* Header Height Control */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Header Dimensions</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Header Height</span>
                <span className="drawer-range-value">{headerCardHeight}px</span>
              </div>
              <input
                type="range"
                min="120"
                max="400"
                value={headerCardHeight}
                onChange={(e) => setHeaderCardHeight(parseInt(e.target.value))}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Header Layout Information */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Layout Information</h4>
            <div className="layout-info">
              <div className="info-item">
                <span className="info-label">Current Height:</span>
                <span className="info-value">{headerCardHeight}px</span>
              </div>
              <div className="info-item">
                <span className="info-label">Min Height:</span>
                <span className="info-value">120px</span>
              </div>
              <div className="info-item">
                <span className="info-label">Max Height:</span>
                <span className="info-value">400px</span>
              </div>
              <div className="info-item">
                <span className="info-label">Recommended:</span>
                <span className="info-value">180-250px</span>
              </div>
            </div>
          </div>

          {/* Quick Preset Heights */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Quick Presets</h4>
            <div className="preset-buttons">
              <button
                className="preset-btn"
                onClick={(e) => { e.stopPropagation(); setHeaderCardHeight(150); }}
              >
                Compact (150px)
              </button>
              <button
                className="preset-btn"
                onClick={(e) => { e.stopPropagation(); setHeaderCardHeight(200); }}
              >
                Standard (200px)
              </button>
              <button
                className="preset-btn"
                onClick={(e) => { e.stopPropagation(); setHeaderCardHeight(280); }}
              >
                Large (280px)
              </button>
              <button
                className="preset-btn"
                onClick={(e) => { e.stopPropagation(); setHeaderCardHeight(350); }}
              >
                Extra Large (350px)
              </button>
            </div>
          </div>
        </SystemDrawer>

        {/* Header Text Editor Drawer */}
        <SystemDrawer
          isOpen={showHeaderTextEditor}
          onClose={() => setShowHeaderTextEditor(false)}
          title="Header Text Editor"
          width={350}
          position="right"
          pushContent={true}
        >
          {/* StyleTextUser Integration */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Header Text Content</h4>
            <StyleTextUser
              value={headerText}
              onChange={setHeaderText}
              styles={headerTextStyles}
              onStylesChange={setHeaderTextStyles}
              placeholder="Enter header text..."
              className="header-text-styler"
            />
          </div>

          {/* Header Text Preview */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Text Preview</h4>
            <div className="text-preview-container">
              <div 
                className="text-preview"
                style={{
                  fontSize: `${headerTextStyles.fontSize}px`,
                  fontFamily: headerTextStyles.fontFamily,
                  color: headerTextStyles.color,
                  fontWeight: headerTextStyles.isBold ? '700' : headerTextStyles.fontWeight,
                  textAlign: headerTextStyles.textAlign as any,
                  background: headerBackgroundImage ? 'rgba(0, 0, 0, 0.4)' : '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}
              >
                {headerText || 'Preview text will appear here...'}
              </div>
            </div>
          </div>
        </SystemDrawer>
    </div>
  );
};

export default CollectionPageCard;
