'use client';

import React, { useState, useEffect } from 'react';
import { HiPlus, HiX, HiPencil, HiTrash, HiShoppingBag, HiCog, HiCamera, HiArrowsExpand } from 'react-icons/hi';
import ProductContainerDisplay from '../ProductContainer/ProductContainerDisplay';
import SystemDrawer from '../../EditorControls/PropertiesManagement/SystemDrawer';
import StyleTextUser from '../../EditorControls/PropertiesManagement/StyleTextUser';
import { useGlobalDrawer } from '../../EditorControls/PropertiesManagement/GlobalDrawerProvider';
import './CatalogPage.css';

interface AllProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  price: number;
  beforePrice: number;
  saveAmount: number;
  variants: any[];
  count: number;
  editCount: number;
  ifSoldOut: 'keep selling' | 'stop selling';
  isTracking: boolean;
}

interface TabProduct {
  id: string;
  productId: string; // Reference to the original product
}

interface Tab {
  id: string;
  name: string;
  products: TabProduct[];
}

interface ProductDisplaySettings {
  viewType: 'grid' | 'horizontal';
  mobileColumns: 1 | 2;
  webColumns: 2 | 3 | 4 | 5;
  productSpacing: number;
}

interface CatalogPageProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  catalogSlug?: string;
}

const CatalogPage: React.FC<CatalogPageProps> = ({
  children,
  title = "Catalog",
  description = "Discover our collection",
  catalogSlug = "default"
}) => {
  const [allProducts, setAllProducts] = useState<AllProduct[]>([]);
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'tab-1',
      name: 'All Products',
      products: []
    }
  ]);
  
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingTabName, setEditingTabName] = useState<string>('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [displaySettings, setDisplaySettings] = useState<ProductDisplaySettings>({
    viewType: 'grid',
    mobileColumns: 2,
    webColumns: 3,
    productSpacing: 24
  });

  // Global drawer
  const { openDrawer } = useGlobalDrawer();

  // Header control states (keeping data, removing show states)
  const [headerHeight, setHeaderHeight] = useState(200);
  const [headerBackgroundImage, setHeaderBackgroundImage] = useState<string | null>(null);
  const [headerText, setHeaderText] = useState(title || "Catalog");
  const [headerDescription, setHeaderDescription] = useState(description || "Discover our collection");
  const [headerTextStyles, setHeaderTextStyles] = useState({
    fontSize: 32,
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#1f2937',
    fontWeight: '700',
    textAlign: 'center' as const,
    bottomSpacing: 8
  });
  const [headerDescriptionStyles, setHeaderDescriptionStyles] = useState({
    fontSize: 16,
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#6b7280',
    fontWeight: '400',
    textAlign: 'center' as const,
    bottomSpacing: 0
  });

  // Load all products from localStorage on component mount
  useEffect(() => {
    try {
      // Try to load products from localStorage first
      const savedProducts = localStorage.getItem('allProducts');
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
        setAllProducts(products);
      } else {
        // Fallback to mock products if none exist
        const mockProducts: AllProduct[] = [
          {
            id: '1',
            name: 'Hat',
            category: 'women',
            image: '🦴',
            images: ['🦴', '👒', '🎩'],
            description: 'Stylish and comfortable hat for all occasions',
            price: 29.99,
            beforePrice: 39.99,
            saveAmount: 10.00,
            count: 15,
            editCount: 0,
            ifSoldOut: 'stop selling',
            isTracking: true,
            variants: []
          },
          {
            id: '2',
            name: 'Trouser',
            category: 'women',
            image: '🦴',
            images: ['🦴', '👖', '👗'],
            description: 'Elegant trousers perfect for professional and casual wear',
            price: 49.99,
            beforePrice: 59.99,
            saveAmount: 10.00,
            count: 15,
            editCount: 0,
            ifSoldOut: 'stop selling',
            isTracking: true,
            variants: []
          },
          {
            id: '3',
            name: 'Shirt',
            category: 'MEN',
            image: '🦴',
            images: ['🦴', '👕', '🎽'],
            description: 'Classic shirt design with modern comfort',
            price: 34.99,
            beforePrice: 44.99,
            saveAmount: 10.00,
            count: 30,
            editCount: 0,
            ifSoldOut: 'keep selling',
            isTracking: true,
            variants: []
          }
        ];
        
        setAllProducts(mockProducts);
        // Save mock products to localStorage for future use
        localStorage.setItem('allProducts', JSON.stringify(mockProducts));
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setAllProducts([]);
    }
  }, []);

  // Load catalog data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(`catalog-${catalogSlug}`);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.tabs && parsedData.tabs.length > 0) {
          setTabs(parsedData.tabs);
          setActiveTabId(parsedData.activeTabId || parsedData.tabs[0].id);
        }
      } catch (error) {
        console.error('Error loading catalog data:', error);
      }
    }
  }, [catalogSlug]);

  // Save data to localStorage whenever tabs change
  useEffect(() => {
    const dataToSave = {
      tabs,
      activeTabId
    };
    localStorage.setItem(`catalog-${catalogSlug}`, JSON.stringify(dataToSave));
  }, [tabs, activeTabId, catalogSlug]);

  // Add new tab
  const addTab = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      name: 'New Category',
      products: []
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
    setEditingTabId(newTab.id);
    setEditingTabName(newTab.name);
  };

  // Remove tab
  const removeTab = (tabId: string) => {
    if (tabs.length <= 1) return; // Don't allow removing the last tab
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
    }
  };

  // Start editing tab name
  const startEditingTab = (tabId: string, currentName: string) => {
    setEditingTabId(tabId);
    setEditingTabName(currentName);
  };

  // Save tab name
  const saveTabName = () => {
    if (editingTabId && editingTabName.trim()) {
      setTabs(prev => prev.map(tab => 
        tab.id === editingTabId 
          ? { ...tab, name: editingTabName.trim() }
          : tab
      ));
    }
    setEditingTabId(null);
    setEditingTabName('');
  };

  // Cancel tab editing
  const cancelTabEditing = () => {
    setEditingTabId(null);
    setEditingTabName('');
  };

  // Add selected products to active tab
  const addSelectedProducts = () => {
    if (selectedProductIds.length > 0) {
      const newTabProducts: TabProduct[] = selectedProductIds.map(productId => ({
        id: `tab-product-${Date.now()}-${productId}`,
        productId: productId
      }));

      setTabs(prev => prev.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, products: [...tab.products, ...newTabProducts] }
          : tab
      ));

      // Reset form
      setSelectedProductIds([]);
      setShowAddProductModal(false);
    }
  };

  // Remove product
  const removeProduct = (tabProductId: string) => {
    setTabs(prev => prev.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, products: tab.products.filter(p => p.id !== tabProductId) }
        : tab
    ));
  };

  // Get products for display with full product data
  const getProductsForActiveTab = () => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (!activeTab) return [];
    
    return activeTab.products.map(tabProduct => {
      const fullProduct = allProducts.find(p => p.id === tabProduct.productId);
      return fullProduct ? { ...fullProduct, tabProductId: tabProduct.id } : null;
    }).filter(Boolean);
  };

  // Helper functions for display settings
  const updateDisplaySetting = (key: keyof ProductDisplaySettings, value: any) => {
    setDisplaySettings(prev => ({ ...prev, [key]: value }));
  };

  const getGridStyles = () => {
    if (displaySettings.viewType === 'horizontal') {
      return {
        display: 'flex',
        overflowX: 'auto' as const,
        gap: `${displaySettings.productSpacing}px`,
        padding: '20px',
        scrollbarWidth: 'thin' as const
      };
    } else {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${displaySettings.webColumns}, 1fr)`,
        gap: `${displaySettings.productSpacing}px`,
        padding: '20px'
      };
    }
  };

  const getMobileGridClass = () => {
    if (displaySettings.viewType === 'grid') {
      return displaySettings.mobileColumns === 1 ? 'mobile-single-column' : 'mobile-double-column';
    }
    return '';
  };

  // Image upload handlers
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

  const handleImageRemove = () => {
    setHeaderBackgroundImage(null);
  };

  // Global drawer functions
  const openDisplaySettings = () => {
    openDrawer('display-settings', 'Display Settings', (
      <>
        {/* View Type */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">View Type</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Layout Style</label>
            <div className="view-type-buttons">
              <button
                className={`view-type-btn ${displaySettings.viewType === 'grid' ? 'active' : ''}`}
                onClick={() => updateDisplaySetting('viewType', 'grid')}
              >
                Grid
              </button>
              <button
                className={`view-type-btn ${displaySettings.viewType === 'horizontal' ? 'active' : ''}`}
                onClick={() => updateDisplaySetting('viewType', 'horizontal')}
              >
                Horizontal
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Columns (only for grid view) */}
        {displaySettings.viewType === 'grid' && (
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Mobile Columns</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Columns on Mobile</label>
              <div className="mobile-columns-buttons">
                <button
                  className={`mobile-column-btn ${displaySettings.mobileColumns === 1 ? 'active' : ''}`}
                  onClick={() => updateDisplaySetting('mobileColumns', 1)}
                >
                  1 Column
                </button>
                <button
                  className={`mobile-column-btn ${displaySettings.mobileColumns === 2 ? 'active' : ''}`}
                  onClick={() => updateDisplaySetting('mobileColumns', 2)}
                >
                  2 Columns
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Web Columns (only for grid view) */}
        {displaySettings.viewType === 'grid' && (
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Web Columns</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Columns on Desktop</label>
              <div className="web-columns-buttons">
                <button
                  className={`web-column-btn ${displaySettings.webColumns === 2 ? 'active' : ''}`}
                  onClick={() => updateDisplaySetting('webColumns', 2)}
                >
                  2
                </button>
                <button
                  className={`web-column-btn ${displaySettings.webColumns === 3 ? 'active' : ''}`}
                  onClick={() => updateDisplaySetting('webColumns', 3)}
                >
                  3
                </button>
                <button
                  className={`web-column-btn ${displaySettings.webColumns === 4 ? 'active' : ''}`}
                  onClick={() => updateDisplaySetting('webColumns', 4)}
                >
                  4
                </button>
                <button
                  className={`web-column-btn ${displaySettings.webColumns === 5 ? 'active' : ''}`}
                  onClick={() => updateDisplaySetting('webColumns', 5)}
                >
                  5
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Spacing */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Product Spacing</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Spacing</span>
              <span className="drawer-range-value">{displaySettings.productSpacing}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={displaySettings.productSpacing}
              onChange={(e) => updateDisplaySetting('productSpacing', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>
      </>
    ));
  };

  const openHeaderDimensions = () => {
    openDrawer('header-dimensions', 'Header Dimensions Control', (
      <>
        {/* Header Height Control */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Header Dimensions</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Header Height</span>
              <span className="drawer-range-value">{headerHeight}px</span>
            </div>
            <input
              type="range"
              min="120"
              max="500"
              value={headerHeight}
              onChange={(e) => setHeaderHeight(parseInt(e.target.value))}
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
              <span className="info-value">{headerHeight}px</span>
            </div>
            <div className="info-item">
              <span className="info-label">Min Height:</span>
              <span className="info-value">120px</span>
            </div>
            <div className="info-item">
              <span className="info-label">Max Height:</span>
              <span className="info-value">500px</span>
            </div>
            <div className="info-item">
              <span className="info-label">Recommended:</span>
              <span className="info-value">180-250px</span>
            </div>
          </div>
        </div>
      </>
    ));
  };

  const openHeaderTextEditor = () => {
    openDrawer('header-text-editor', 'Header Text Editor', (
      <>
        {/* Title Text Editor */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Title Settings</h4>
          <div className="text-editor-preview">
            <div 
              className="text-preview"
              style={{
                fontSize: `${headerTextStyles.fontSize}px`,
                fontFamily: headerTextStyles.fontFamily,
                color: headerTextStyles.color,
                fontWeight: headerTextStyles.fontWeight,
                textAlign: headerTextStyles.textAlign,
                background: headerBackgroundImage ? 'rgba(0, 0, 0, 0.4)' : '#f8f9fa',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}
            >
              {headerText || 'Preview title will appear here...'}
            </div>
          </div>
        </div>

        {/* Description Text Editor */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Description Settings</h4>
          <div className="text-editor-preview">
            <div 
              className="text-preview"
              style={{
                fontSize: `${headerDescriptionStyles.fontSize}px`,
                fontFamily: headerDescriptionStyles.fontFamily,
                color: headerDescriptionStyles.color,
                fontWeight: headerDescriptionStyles.fontWeight,
                textAlign: headerDescriptionStyles.textAlign,
                background: headerBackgroundImage ? 'rgba(0, 0, 0, 0.4)' : '#f8f9fa',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}
            >
              {headerDescription || 'Preview description will appear here...'}
            </div>
          </div>
        </div>
      </>
    ));
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const displayProducts = getProductsForActiveTab();

  return (
    <div className="catalog-page-container">
      <div className="catalog-page-card">
        {/* Header Section */}
        <div 
          className="catalog-header"
          style={{
            backgroundColor: headerBackgroundImage ? 'transparent' : undefined,
            backgroundImage: headerBackgroundImage ? `url(${headerBackgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: `${headerHeight}px`,
            position: 'relative',
            minHeight: `${headerHeight}px`
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
              onClick={openHeaderDimensions}
              title="Control Header Height"
            >
              <HiArrowsExpand />
            </button>

            {/* Header Text Editor */}
            <button 
              className="header-image-btn text-btn"
              onClick={openHeaderTextEditor}
              title="Edit Header Text"
            >
              <HiPencil />
            </button>
          </div>

          <div className="header-content">
            <StyleTextUser
              value={headerText}
              onChange={setHeaderText}
              styles={headerTextStyles}
              onStylesChange={setHeaderTextStyles}
              placeholder="Enter catalog title..."
            />
            {headerDescription && (
              <StyleTextUser
                value={headerDescription}
                onChange={setHeaderDescription}
                styles={headerDescriptionStyles}
                onStylesChange={setHeaderDescriptionStyles}
                placeholder="Enter catalog description..."
              />
            )}
          </div>
        </div>

        {/* Tab System */}
        <div className="catalog-tab-system">
          <div className="tab-navigation">
            <div className="tab-list">
              {tabs.map((tab) => (
                <div key={tab.id} className="tab-item">
                  {editingTabId === tab.id ? (
                    <div className="tab-edit-form">
                      <input
                        type="text"
                        value={editingTabName}
                        onChange={(e) => setEditingTabName(e.target.value)}
                        onBlur={saveTabName}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveTabName();
                          if (e.key === 'Escape') cancelTabEditing();
                        }}
                        className="tab-name-input"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <>
                      <button
                        className={`tab-button ${activeTabId === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTabId(tab.id)}
                      >
                        {tab.name}
                        <span className="product-count">({tab.products.length})</span>
                      </button>
                      <div className="tab-controls">
                        <button
                          className="tab-control-btn edit-tab"
                          onClick={() => startEditingTab(tab.id, tab.name)}
                          title="Edit tab name"
                        >
                          <HiPencil />
                        </button>
                        {tabs.length > 1 && (
                          <button
                            className="tab-control-btn remove-tab"
                            onClick={() => removeTab(tab.id)}
                            title="Remove tab"
                          >
                            <HiX />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
              <button className="add-tab-btn" onClick={addTab} title="Add new category">
                <HiPlus />
                <span>Add Category</span>
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="tab-content">
            {activeTab && (
              <div className="products-section">
                <div className="products-header">
                  <h3 className="section-title">{activeTab.name}</h3>
                  <div className="products-header-actions">
                    <button 
                      className="display-settings-btn"
                      onClick={openDisplaySettings}
                      title="Display Settings"
                    >
                      <HiCog />
                      <span>Display</span>
                    </button>
                    <button 
                      className="add-product-btn"
                      onClick={() => setShowAddProductModal(true)}
                    >
                      <HiShoppingBag />
                      <span>Add Product</span>
                    </button>
                  </div>
                </div>

                <div 
                  className={`products-grid ${displaySettings.viewType} ${getMobileGridClass()}`}
                  style={getGridStyles()}
                >
                  {displayProducts.length === 0 ? (
                    <div className="empty-products">
                      <div className="empty-icon">📦</div>
                      <h4>No products in this category</h4>
                      <p>Add your first product to get started.</p>
                      <button 
                        className="add-first-product-btn"
                        onClick={() => setShowAddProductModal(true)}
                      >
                        Add Product
                      </button>
                    </div>
                  ) : (
                    displayProducts.map((product: any) => (
                      <div key={product.tabProductId} className="product-container-wrapper">
                        <ProductContainerDisplay
                          className="catalog-product"
                          productData={{
                            name: product.name,
                            price: product.price,
                            beforePrice: product.beforePrice,
                            saveAmount: product.saveAmount,
                            rating: 4.5,
                            reviewCount: 42,
                            description1: product.description,
                            description2: `Category: ${product.category}`,
                            image: product.images?.[0] || product.image,
                            variants: product.variants || []
                          }}
                        />
                        <button
                          className="remove-catalog-product-btn"
                          onClick={() => removeProduct(product.tabProductId)}
                          title="Remove from catalog"
                        >
                          <HiTrash />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Selection Modal */}
        {showAddProductModal && (
          <div className="modal-overlay" onClick={() => setShowAddProductModal(false)}>
            <div className="modal-content product-selection-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Select Products from Store</h3>
                <button 
                  className="modal-close-btn"
                  onClick={() => setShowAddProductModal(false)}
                >
                  <HiX />
                </button>
              </div>
              <div className="modal-body">
                <div className="products-selection-grid">
                  {allProducts.map((product) => {
                    const isSelected = selectedProductIds.includes(product.id);
                    return (
                      <div 
                        key={product.id} 
                        className={`product-selection-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedProductIds(prev => 
                            isSelected 
                              ? prev.filter(id => id !== product.id)
                              : [...prev, product.id]
                          );
                        }}
                      >
                        <div className="product-selection-image">
                          <span className="product-emoji">{product.image}</span>
                          {isSelected && (
                            <div className="selection-indicator">
                              <HiShoppingBag />
                            </div>
                          )}
                        </div>
                        <div className="product-selection-info">
                          <h4 className="product-selection-name">{product.name}</h4>
                          <p className="product-selection-category">{product.category}</p>
                          <div className="product-selection-pricing">
                            <span className="current-price">${product.price}</span>
                            {product.beforePrice > product.price && (
                              <span className="original-price">${product.beforePrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {allProducts.length === 0 && (
                  <div className="no-products-available">
                    <div className="empty-icon">📦</div>
                    <h4>No products available</h4>
                    <p>Create products in the Products Management section first.</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  className="cancel-btn"
                  onClick={() => {
                    setSelectedProductIds([]);
                    setShowAddProductModal(false);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="save-btn"
                  onClick={addSelectedProducts}
                  disabled={selectedProductIds.length === 0}
                >
                  Add {selectedProductIds.length} Product{selectedProductIds.length !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
