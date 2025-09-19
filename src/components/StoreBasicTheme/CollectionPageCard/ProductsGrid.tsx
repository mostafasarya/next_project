'use client';

import React from 'react';
import { HiX, HiViewGrid, HiPlus } from 'react-icons/hi';
import ProductContainerDisplay from '../ProductContainer/ProductContainerDisplay';
import SystemDrawer from '../../EditorControls/PropertiesManagement/SystemDrawer';
import './ProductsGrid.css';

// Product interface
interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  beforePrice?: string;
  saveAmount?: string;
  description: string;
  image: string;
  variants?: Array<{
    type: string;
    options: string[];
  }>;
}

// Grid layout interface
interface GridLayout {
  columns: string;
  minColumnWidth: number;
  gap: number;
  horizontalAlignment: string;
  verticalAlignment: string;
}

// Mobile layout interface
interface MobileLayout {
  columns: number;
}

interface ProductsGridProps {
  products: Product[];
  onProductRemove?: (productId: string) => void;
  onProductAdd?: () => void;
  showAddButton?: boolean;
  showLayoutControl?: boolean;
  showRemoveButtons?: boolean;
  enableDragAndDrop?: boolean;
  onProductReorder?: (reorderedProducts: Product[]) => void;
  gridLayout?: GridLayout;
  mobileLayout?: MobileLayout;
  onGridLayoutChange?: (layout: GridLayout) => void;
  onMobileLayoutChange?: (layout: MobileLayout) => void;
  className?: string;
  emptyStateTitle?: string;
  emptyStateSubtitle?: string;
  emptyStateIcon?: string;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  onProductRemove,
  onProductAdd,
  showAddButton = true,
  showLayoutControl = true,
  showRemoveButtons = true,
  enableDragAndDrop = true,
  onProductReorder,
  gridLayout: externalGridLayout,
  mobileLayout: externalMobileLayout,
  onGridLayoutChange,
  onMobileLayoutChange,
  className = '',
  emptyStateTitle = 'No products yet',
  emptyStateSubtitle = 'Add products to get started',
  emptyStateIcon = '📦'
}) => {
  // Internal state for layout if not provided externally
  const [internalGridLayout, setInternalGridLayout] = React.useState<GridLayout>({
    columns: 'auto-fill',
    minColumnWidth: 475,
    gap: 20,
    horizontalAlignment: 'center',
    verticalAlignment: 'start'
  });
  
  const [internalMobileLayout, setInternalMobileLayout] = React.useState<MobileLayout>({
    columns: 1
  });

  // Layout control state
  const [showLayoutControlDrawer, setShowLayoutControlDrawer] = React.useState(false);
  const [layoutTab, setLayoutTab] = React.useState<'desktop' | 'mobile'>('desktop');
  const [viewMode, setViewMode] = React.useState<'grid' | 'horizontal'>('grid');

  // Drag and drop state
  const [draggedProductId, setDraggedProductId] = React.useState<string | null>(null);
  const [dragOverProductId, setDragOverProductId] = React.useState<string | null>(null);
  
  // Container ref for overflow detection
  const gridContainerRef = React.useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = React.useState(1);

  // Use external layout if provided, otherwise use internal
  const gridLayout = externalGridLayout || internalGridLayout;
  const mobileLayout = externalMobileLayout || internalMobileLayout;

  // Safe tab switching function
  const switchTab = React.useCallback((newTab: 'desktop' | 'mobile') => {
    requestAnimationFrame(() => {
      setLayoutTab(newTab);
    });
  }, []);

  // Calculate scale factor to prevent overflow
  const calculateScaleFactor = React.useCallback(() => {
    if (!gridContainerRef.current || viewMode === 'horizontal') return;

    const container = gridContainerRef.current;
    const containerWidth = container.clientWidth;
    const containerPadding = 20; // Account for padding
    const availableWidth = containerWidth - containerPadding;

    let actualColumns = 1;
    let minColumnWidth = gridLayout.minColumnWidth;

    if (gridLayout.columns === 'auto-fill') {
      // Calculate how many columns would actually fit
      actualColumns = Math.floor(availableWidth / (minColumnWidth + gridLayout.gap));
      actualColumns = Math.max(1, actualColumns);
    } else {
      actualColumns = parseInt(gridLayout.columns);
    }

    // Calculate total width needed
    const totalGapWidth = (actualColumns - 1) * gridLayout.gap;
    const totalNeededWidth = (actualColumns * minColumnWidth) + totalGapWidth;

    // Calculate scale factor if content would overflow
    if (totalNeededWidth > availableWidth) {
      const newScaleFactor = availableWidth / totalNeededWidth;
      setScaleFactor(Math.max(0.5, newScaleFactor)); // Minimum scale of 50%
    } else {
      setScaleFactor(1);
    }
  }, [gridLayout, viewMode]);

  // Update scale factor when layout changes or container resizes
  React.useEffect(() => {
    calculateScaleFactor();
    
    const handleResize = () => {
      setTimeout(calculateScaleFactor, 100); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateScaleFactor]);

  // Recalculate when grid layout changes
  React.useEffect(() => {
    setTimeout(calculateScaleFactor, 50);
  }, [gridLayout, mobileLayout, viewMode, products.length, calculateScaleFactor]);

  // Layout change handlers
  const handleGridLayoutChange = (newLayout: GridLayout) => {
    if (onGridLayoutChange) {
      onGridLayoutChange(newLayout);
    } else {
      setInternalGridLayout(newLayout);
    }
  };

  const handleMobileLayoutChange = (newLayout: MobileLayout) => {
    if (onMobileLayoutChange) {
      onMobileLayoutChange(newLayout);
    } else {
      setInternalMobileLayout(newLayout);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, productId: string) => {
    if (!enableDragAndDrop) return;
    
    setDraggedProductId(productId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', productId);
    
    // Add drag styling
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '0.5';
  };

  const handleDragOver = (e: React.DragEvent, productId: string) => {
    if (!enableDragAndDrop) return;
    
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedProductId && draggedProductId !== productId) {
      setDragOverProductId(productId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!enableDragAndDrop) return;
    
    e.preventDefault();
    setDragOverProductId(null);
  };

  const handleDrop = (e: React.DragEvent, targetProductId: string) => {
    if (!enableDragAndDrop) return;
    
    e.preventDefault();
    
    if (!draggedProductId || draggedProductId === targetProductId) {
      return;
    }

    // Find indices
    const draggedIndex = products.findIndex(p => p.id === draggedProductId);
    const targetIndex = products.findIndex(p => p.id === targetProductId);
    
    if (draggedIndex === -1 || targetIndex === -1) {
      return;
    }

    // Reorder products
    const newProducts = [...products];
    const [draggedProduct] = newProducts.splice(draggedIndex, 1);
    newProducts.splice(targetIndex, 0, draggedProduct);
    
    if (onProductReorder) {
      onProductReorder(newProducts);
    }
    
    // Reset drag state
    setDraggedProductId(null);
    setDragOverProductId(null);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (!enableDragAndDrop) return;
    
    // Reset styling
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '1';
    
    // Reset drag state
    setDraggedProductId(null);
    setDragOverProductId(null);
  };

  return (
    <div className={`products-grid-container ${className}`}>
      {/* Products Controls */}
      {(showAddButton || showLayoutControl) && (
        <div className="products-controls">
          {showLayoutControl && (
            <button
              className="layout-control-btn"
              onClick={() => setShowLayoutControlDrawer(true)}
              title="Layout Control"
            >
              <HiViewGrid />
            </button>
          )}
          {showAddButton && (
            <button
              className="add-products-btn"
              onClick={onProductAdd}
              title="Add Products"
            >
              <HiPlus />
              Add Products
            </button>
          )}
        </div>
      )}

      {/* Products Grid */}
      <div 
        ref={gridContainerRef}
        className={`collection-products-grid ${viewMode === 'horizontal' ? 'horizontal-view' : ''} ${viewMode === 'grid' && gridLayout.columns !== 'auto-fill' ? 'grid-mode' : ''}`}
        style={viewMode === 'grid' && gridLayout.columns !== 'auto-fill' ? {
          gridTemplateColumns: `repeat(${gridLayout.columns}, 1fr)`,
          gap: `${gridLayout.gap * scaleFactor}px`,
          justifyItems: gridLayout.horizontalAlignment,
          alignItems: gridLayout.verticalAlignment,
          transform: scaleFactor < 1 ? `scale(${scaleFactor})` : 'none',
          transformOrigin: 'top left',
          // Mobile responsive columns
          '--mobile-columns': mobileLayout.columns,
          '--scale-factor': scaleFactor
        } as React.CSSProperties : viewMode === 'horizontal' ? {
          display: 'flex',
          flexDirection: 'row',
          gap: `${gridLayout.gap}px`,
          overflowX: 'auto',
          paddingBottom: '20px',
          flexWrap: 'nowrap'
        } : {
          '--grid-gap': `${gridLayout.gap}px`,
          justifyContent: gridLayout.horizontalAlignment === 'center' ? 'center' : 
                         gridLayout.horizontalAlignment === 'end' ? 'flex-end' : 'flex-start'
        } as React.CSSProperties}
      >
        {products.length === 0 ? (
          <div className="empty-products-state">
            <div className="empty-icon">{emptyStateIcon}</div>
            <p>{emptyStateTitle}</p>
            {showAddButton && onProductAdd && (
              <button 
                className="add-first-product-btn"
                onClick={onProductAdd}
              >
                {emptyStateSubtitle}
              </button>
            )}
          </div>
        ) : (
          products.map(product => (
            <div 
              key={product.id} 
              className={`collection-product-container ${dragOverProductId === product.id ? 'drag-over' : ''} ${draggedProductId === product.id ? 'dragging' : ''} ${viewMode === 'horizontal' ? 'horizontal-item' : ''}`}
              draggable={enableDragAndDrop}
              onDragStart={(e) => handleDragStart(e, product.id)}
              onDragOver={(e) => handleDragOver(e, product.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, product.id)}
              onDragEnd={handleDragEnd}
              style={viewMode === 'horizontal' ? { 
                minWidth: `${gridLayout.minColumnWidth}px`,
                flexShrink: 0
              } : {}}
            >
              <div className="product-container-wrapper">
                <ProductContainerDisplay 
                  key={`product-${product.id}`}
                  productData={{
                    name: product.name,
                    price: product.price,
                    beforePrice: product.beforePrice,
                    saveAmount: product.saveAmount,
                    rating: 4.5, // Default rating
                    reviewCount: Math.floor(Math.random() * 200) + 10, // Random review count
                    description1: product.description,
                    description2: `Category: ${product.category}`,
                    image: product.image,
                    variants: product.variants || []
                  }}
                />
                
                {showRemoveButtons && onProductRemove && (
                  <button 
                    className="remove-product-overlay-btn"
                    onClick={() => onProductRemove(product.id)}
                    title="Remove product"
                  >
                    <HiX />
                  </button>
                )}
                
              </div>
            </div>
          ))
        )}
      </div>

      {/* Layout Control Drawer */}
      {showLayoutControl && (
        <SystemDrawer
          isOpen={showLayoutControlDrawer}
          onClose={() => setShowLayoutControlDrawer(false)}
          title="Grid Layout Control"
          width={400}
          position="right"
          pushContent={true}
          disableClickOutside={true}
        >
          {/* Layout Tabs */}
          <div className="layout-tabs" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={`layout-tab ${layoutTab === 'desktop' ? 'active' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                switchTab('desktop');
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              Desktop
            </button>
            <button
              type="button"
              className={`layout-tab ${layoutTab === 'mobile' ? 'active' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                switchTab('mobile');
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              Mobile
            </button>
          </div>

          {/* Desktop Tab Content */}
          {layoutTab === 'desktop' && (
            <>
              {/* View Mode Toggle */}
              <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
                <h4 className="drawer-section-title">View Mode</h4>
                <div className="view-mode-toggle">
                  <button
                    className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    Grid View
                  </button>
                  <button
                    className={`view-mode-btn ${viewMode === 'horizontal' ? 'active' : ''}`}
                    onClick={() => setViewMode('horizontal')}
                  >
                    Horizontal View
                  </button>
                </div>
              </div>

              {/* Grid Controls - Only show when Grid view is active */}
              {viewMode === 'grid' && (
                <>
                  {/* Grid Columns */}
              <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
                <h4 className="drawer-section-title">Grid Columns</h4>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Column Type</label>
                  <select
                    value={gridLayout.columns}
                    onChange={(e) => handleGridLayoutChange({ ...gridLayout, columns: e.target.value })}
                    className="drawer-select"
                  >
                    <option value="auto-fill">Auto Fill</option>
                    <option value="1">1 Column</option>
                    <option value="2">2 Columns</option>
                    <option value="3">3 Columns</option>
                    <option value="4">4 Columns</option>
                    <option value="5">5 Columns</option>
                  </select>
                </div>
                {gridLayout.columns === 'auto-fill' && (
                  <div className="drawer-range-container">
                    <div className="drawer-range-label">
                      <span>Min Column Width</span>
                      <span className="drawer-range-value">{gridLayout.minColumnWidth}px</span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="600"
                      value={gridLayout.minColumnWidth}
                      onChange={(e) => handleGridLayoutChange({ ...gridLayout, minColumnWidth: Number(e.target.value) })}
                      className="drawer-range"
                    />
                  </div>
                )}
              </div>

              {/* Grid Spacing */}
              <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
                <h4 className="drawer-section-title">Grid Spacing</h4>
                <div className="drawer-range-container">
                  <div className="drawer-range-label">
                    <span>Gap</span>
                    <span className="drawer-range-value">{gridLayout.gap}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={gridLayout.gap}
                    onChange={(e) => handleGridLayoutChange({ ...gridLayout, gap: Number(e.target.value) })}
                    className="drawer-range"
                  />
                </div>
              </div>

              {/* Alignment Controls */}
              <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
                <h4 className="drawer-section-title">Alignment</h4>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Horizontal Alignment</label>
                  <select
                    value={gridLayout.horizontalAlignment}
                    onChange={(e) => handleGridLayoutChange({ ...gridLayout, horizontalAlignment: e.target.value })}
                    className="drawer-select"
                  >
                    <option value="start">Start</option>
                    <option value="center">Center</option>
                    <option value="end">End</option>
                    <option value="stretch">Stretch</option>
                  </select>
                </div>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Vertical Alignment</label>
                  <select
                    value={gridLayout.verticalAlignment}
                    onChange={(e) => handleGridLayoutChange({ ...gridLayout, verticalAlignment: e.target.value })}
                    className="drawer-select"
                  >
                    <option value="start">Start</option>
                    <option value="center">Center</option>
                    <option value="end">End</option>
                    <option value="stretch">Stretch</option>
                  </select>
                </div>
              </div>

              {/* Layout Presets */}
              <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
                <h4 className="drawer-section-title">Quick Presets</h4>
                <div className="preset-buttons">
                  <button
                    className="preset-btn"
                    onClick={() => handleGridLayoutChange({
                      columns: 'auto-fill',
                      minColumnWidth: 475,
                      gap: 20,
                      horizontalAlignment: 'center',
                      verticalAlignment: 'start'
                    })}
                  >
                    Default
                  </button>
                  <button
                    className="preset-btn"
                    onClick={() => handleGridLayoutChange({
                      columns: 'auto-fill',
                      minColumnWidth: 300,
                      gap: 16,
                      horizontalAlignment: 'center',
                      verticalAlignment: 'start'
                    })}
                  >
                    Compact
                  </button>
                  <button
                    className="preset-btn"
                    onClick={() => handleGridLayoutChange({
                      columns: '2',
                      minColumnWidth: 475,
                      gap: 30,
                      horizontalAlignment: 'center',
                      verticalAlignment: 'start'
                    })}
                  >
                    Two Columns
                  </button>
                  <button
                    className="preset-btn"
                    onClick={() => handleGridLayoutChange({
                      columns: '1',
                      minColumnWidth: 475,
                      gap: 24,
                      horizontalAlignment: 'center',
                      verticalAlignment: 'start'
                    })}
                  >
                    Single Column
                  </button>
                </div>
              </div>

              {/* Layout Information */}
              <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
                <h4 className="drawer-section-title">Layout Information</h4>
                <div className="layout-info">
                  <div className="info-item">
                    <span className="info-label">Columns:</span>
                    <span className="info-value">{gridLayout.columns}</span>
                  </div>
                  {gridLayout.columns === 'auto-fill' && (
                    <div className="info-item">
                      <span className="info-label">Min Width:</span>
                      <span className="info-value">{gridLayout.minColumnWidth}px</span>
                    </div>
                  )}
                  <div className="info-item">
                    <span className="info-label">Gap:</span>
                    <span className="info-value">{gridLayout.gap}px</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">H-Align:</span>
                    <span className="info-value">{gridLayout.horizontalAlignment}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">V-Align:</span>
                    <span className="info-value">{gridLayout.verticalAlignment}</span>
                  </div>
                </div>
              </div>
                </>
              )}
            </>
          )}

          {/* Mobile Tab Content */}
          {layoutTab === 'mobile' && (
            <>
              {/* View Mode Toggle */}
              <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
                <h4 className="drawer-section-title">View Mode</h4>
                <div className="view-mode-toggle">
                  <button
                    className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    Grid View
                  </button>
                  <button
                    className={`view-mode-btn ${viewMode === 'horizontal' ? 'active' : ''}`}
                    onClick={() => setViewMode('horizontal')}
                  >
                    Horizontal View
                  </button>
                </div>
              </div>

              {/* Mobile Grid Controls - Only show when Grid view is active */}
              {viewMode === 'grid' && (
                <>
                  {/* Mobile Column Control */}
              <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
                <h4 className="drawer-section-title">Mobile Layout</h4>
                <div className="mobile-column-buttons">
                  <button
                    type="button"
                    className={`mobile-column-btn ${mobileLayout.columns === 1 ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      handleMobileLayoutChange({ columns: 1 });
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <div className="column-preview">
                      <div className="column-item single"></div>
                    </div>
                    <span>1 Column</span>
                  </button>
                  <button
                    type="button"
                    className={`mobile-column-btn ${mobileLayout.columns === 2 ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      handleMobileLayoutChange({ columns: 2 });
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <div className="column-preview">
                      <div className="column-item double"></div>
                      <div className="column-item double"></div>
                    </div>
                    <span>2 Columns</span>
                  </button>
                </div>
              </div>

              {/* Mobile Layout Information */}
              <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
                <h4 className="drawer-section-title">Mobile Layout Info</h4>
                <div className="layout-info">
                  <div className="info-item">
                    <span className="info-label">Mobile Columns:</span>
                    <span className="info-value">{mobileLayout.columns}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Responsive:</span>
                    <span className="info-value">Auto-adapts on mobile devices</span>
                  </div>
                </div>
              </div>
                </>
              )}
            </>
          )}
        </SystemDrawer>
      )}
    </div>
  );
};

export default ProductsGrid;
