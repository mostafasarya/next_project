'use client';

import React, { useState } from 'react';
import { HiPlus, HiCog, HiTrash, HiX, HiSelector } from 'react-icons/hi';
import { HiShoppingBag } from 'react-icons/hi2';
import SystemDrawer from '../../EditorControls/PropertiesManagement/SystemDrawer';
import StyleTextUser from '../../EditorControls/PropertiesManagement/StyleTextUser';
import ProductContainerDisplay from '../ProductContainer/ProductContainerDisplay';
import '../../EditorControls/PropertiesManagement/SystemControlIcons.css';
import './CompNavigationBarwithProductsDesign.css';

interface ProductData {
  id: string;
  productName: string;
  price: number;
  beforePrice?: number;
  saveAmount?: number;
  productImage: string;
  productImages: string[];
  rating?: number;
  reviews?: number;
  description?: string;
  inStock: boolean;
  variants: Array<{
    type: string;
    options: string[];
  }>;
}

interface TabData {
  id: string;
  name: string;
  products: ProductData[];
}

interface NavigationSettings {
  tabStyle: 'underline' | 'pills' | 'minimal';
  productSpacing: number;
  gridColumns: number;
  showLoadMore: boolean;
  maxProductsPerTab: number;
}

interface CompNavigationBarwithProductsDesignProps {
  title?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

const CompNavigationBarwithProductsDesign: React.FC<CompNavigationBarwithProductsDesignProps> = ({
  title = "Product Categories",
  backgroundColor = "#ffffff",
  borderRadius = "16px"
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  
  // Title text and styles state
  const [titleText, setTitleText] = useState(title);
  const [titleStyles, setTitleStyles] = useState({
    fontSize: 32,
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#1f2937',
    fontWeight: '700',
    textAlign: 'left' as const
  });
  
  const [settings, setSettings] = useState<NavigationSettings>({
    tabStyle: 'underline',
    productSpacing: 20,
    gridColumns: 3,
    showLoadMore: true,
    maxProductsPerTab: 8
  });

  // Mock product data pool - in real app this would come from API
  const [allProducts] = useState<ProductData[]>([
    {
      id: '1',
      productName: 'Modern Spellbound Lace Dress',
      price: 138,
      beforePrice: 158,
      saveAmount: 20,
      productImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop&crop=center',
      productImages: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop&crop=center'
      ],
      rating: 4.8,
      reviews: 24,
      description: 'Elegant lace dress perfect for special occasions',
      inStock: true,
      variants: [
        { type: 'color', options: ['Black', 'Navy', 'White'] },
        { type: 'size', options: ['XS', 'S', 'M', 'L', 'XL'] }
      ]
    },
    {
      id: '2',
      productName: 'Modern Carreira Slip Skirt',
      price: 85,
      productImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d24?w=300&h=300&fit=crop&crop=center',
      productImages: [
        'https://images.unsplash.com/photo-1583496661160-fb5886a13d24?w=300&h=300&fit=crop&crop=center'
      ],
      rating: 4.6,
      reviews: 18,
      description: 'Versatile slip skirt for any occasion',
      inStock: true,
      variants: [
        { type: 'color', options: ['Brown', 'Black', 'Cream'] },
        { type: 'size', options: ['XS', 'S', 'M', 'L'] }
      ]
    },
    {
      id: '3',
      productName: 'Modern Toffee Cake Sweater',
      price: 85,
      productImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&h=300&fit=crop&crop=center',
      productImages: [
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&h=300&fit=crop&crop=center'
      ],
      rating: 4.7,
      reviews: 31,
      description: 'Cozy sweater perfect for fall and winter',
      inStock: true,
      variants: [
        { type: 'color', options: ['Toffee', 'Cream', 'Grey'] },
        { type: 'size', options: ['S', 'M', 'L', 'XL'] }
      ]
    },
    {
      id: '4',
      productName: 'Classic Denim Jacket',
      price: 95,
      beforePrice: 120,
      saveAmount: 25,
      productImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop&crop=center',
      productImages: [
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop&crop=center'
      ],
      rating: 4.5,
      reviews: 42,
      description: 'Timeless denim jacket for layering',
      inStock: true,
      variants: [
        { type: 'color', options: ['Light Blue', 'Dark Blue', 'Black'] },
        { type: 'size', options: ['XS', 'S', 'M', 'L', 'XL'] }
      ]
    },
    {
      id: '5',
      productName: 'Elegant Midi Dress',
      price: 110,
      productImage: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=300&h=300&fit=crop&crop=center',
      productImages: [
        'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=300&h=300&fit=crop&crop=center'
      ],
      rating: 4.9,
      reviews: 19,
      description: 'Sophisticated midi dress for professional settings',
      inStock: true,
      variants: [
        { type: 'color', options: ['Black', 'Navy', 'Burgundy'] },
        { type: 'size', options: ['XS', 'S', 'M', 'L'] }
      ]
    },
    {
      id: '6',
      productName: 'Casual Cotton Tee',
      price: 35,
      productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center',
      productImages: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center'
      ],
      rating: 4.4,
      reviews: 67,
      description: 'Comfortable cotton tee for everyday wear',
      inStock: true,
      variants: [
        { type: 'color', options: ['White', 'Black', 'Grey', 'Navy'] },
        { type: 'size', options: ['XS', 'S', 'M', 'L', 'XL'] }
      ]
    }
  ]);

  const [tabs, setTabs] = useState<TabData[]>([
    {
      id: '1',
      name: 'New!',
      products: [allProducts[0], allProducts[1]]
    },
    {
      id: '2',
      name: 'Dresses',
      products: [allProducts[0], allProducts[4]]
    },
    {
      id: '3',
      name: 'Tops',
      products: [allProducts[2], allProducts[5]]
    }
  ]);

  const updateSetting = (key: keyof NavigationSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const addNewTab = () => {
    const newTab: TabData = {
      id: Date.now().toString(),
      name: `Tab ${tabs.length + 1}`,
      products: []
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(tabs.length);
  };

  const deleteTab = (tabId: string) => {
    if (tabs.length <= 1) return;
    
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    setTabs(prev => prev.filter(tab => tab.id !== tabId));
    
    // Adjust active tab if necessary
    if (activeTab >= tabs.length - 1) {
      setActiveTab(Math.max(0, tabs.length - 2));
    } else if (tabIndex <= activeTab) {
      setActiveTab(Math.max(0, activeTab - 1));
    }
  };

  const updateTabName = (tabId: string, newName: string) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, name: newName } : tab
    ));
  };

  const addProductToTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;

    const availableProducts = allProducts.filter(
      product => !tab.products.find(tp => tp.id === product.id)
    );
    
    if (availableProducts.length > 0 && tab.products.length < settings.maxProductsPerTab) {
      const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
      setTabs(prev => prev.map(t => 
        t.id === tabId 
          ? { ...t, products: [...t.products, randomProduct] }
          : t
      ));
    }
  };

  const removeProductFromTab = (tabId: string, productId: string) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId 
        ? { ...tab, products: tab.products.filter(p => p.id !== productId) }
        : tab
    ));
  };

  const getTabClassName = () => {
    return `nav-tab nav-tab-${settings.tabStyle}`;
  };

  const getGridStyles = () => {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${settings.gridColumns}, 1fr)`,
      gap: `${settings.productSpacing}px`,
      padding: '20px'
    };
  };

  const currentTab = tabs[activeTab];

  return (
    <div 
      className="comp-navigation-products"
      style={{ 
        backgroundColor,
        borderRadius,
        border: '1px solid #e5e7eb',
        margin: '20px 0',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}
    >
      {/* Drag Handle - Top Left */}
      <button
        className="system-control-icon drag small"
        title="Drag to reorder"
        style={{ 
          cursor: 'grab',
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 10
        }}
      >
        <HiSelector />
      </button>

      {/* Toolbar Controls - Top Center */}
      <div 
        className="navigation-toolbar-tooltip"
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '8px',
          backgroundColor: '#2c3e50',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="system-control-icon settings small"
          title="Settings"
        >
          <HiCog />
        </button>
        <button
          onClick={addNewTab}
          className="system-control-icon add small"
          title="Add new tab"
        >
          <HiPlus />
        </button>
        <button
          onClick={() => addProductToTab(currentTab?.id)}
          className="system-control-icon add small"
          title="Add product to current tab"
          disabled={!currentTab || currentTab.products.length >= settings.maxProductsPerTab}
        >
          <HiShoppingBag />
        </button>
      </div>

      {/* Title Text Field */}
      <div style={{ padding: '20px 20px 0 20px' }}>
        <StyleTextUser
          value={titleText}
          onChange={setTitleText}
          styles={titleStyles}
          onStylesChange={setTitleStyles}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="navigation-tabs">
        <div className="tabs-container">
          {tabs.map((tab, index) => (
            <div key={tab.id} className="tab-wrapper">
              <button
                onClick={() => setActiveTab(index)}
                className={`${getTabClassName()} ${index === activeTab ? 'active' : ''}`}
              >
                {editingTabId === tab.id ? (
                  <input
                    type="text"
                    value={tab.name}
                    onChange={(e) => updateTabName(tab.id, e.target.value)}
                    onBlur={() => setEditingTabId(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setEditingTabId(null);
                      }
                    }}
                    className="tab-name-input"
                    autoFocus
                  />
                ) : (
                  <span 
                    onDoubleClick={() => setEditingTabId(tab.id)}
                    className="tab-name"
                  >
                    {tab.name}
                  </span>
                )}
                
                <span className="product-count">({tab.products.length})</span>
              </button>
              
              {tabs.length > 1 && (
                <button
                  onClick={() => deleteTab(tab.id)}
                  className="system-control-icon delete small"
                  title="Delete tab"
                >
                  <HiX />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-content">
        {currentTab && (
          <>
            {currentTab.products.length > 0 ? (
              <div 
                className="products-grid"
                style={getGridStyles()}
              >
                {currentTab.products.map((product) => (
                  <div key={product.id} className="product-wrapper">
                    {/* Remove Product Button */}
                    <button
                      onClick={() => removeProductFromTab(currentTab.id, product.id)}
                      className="remove-product-btn"
                      title="Remove from tab"
                    >
                      ✕
                    </button>
                    
                    {/* Product Container */}
                    <div className="product-container-wrapper">
                      <ProductContainerDisplay
                        productData={{
                          productName: product.productName,
                          price: product.price,
                          beforePrice: product.beforePrice,
                          saveAmount: product.saveAmount,
                          productImage: product.productImage,
                          productImages: product.productImages,
                          rating: product.rating,
                          reviews: product.reviews,
                          description: product.description,
                          inStock: product.inStock,
                          variants: product.variants.map(variant => ({
                            name: variant.type,
                            options: variant.options
                          }))
                        }}
                        isChildComponent={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-tab">
                <div className="empty-icon">
                  <HiShoppingBag />
                </div>
                <h3>No Products in "{currentTab.name}"</h3>
                <p>Click "Add Product" to start adding products to this tab</p>
                <button
                  onClick={() => addProductToTab(currentTab.id)}
                  className="add-first-product-btn"
                >
                  <HiPlus /> Add Your First Product
                </button>
              </div>
            )}

            {/* Tab Info */}
            <div className="tab-info">
              <div className="tab-stats">
                <span className="current-tab">Tab: {currentTab.name}</span>
                <span className="product-stats">
                  {currentTab.products.length}/{settings.maxProductsPerTab} products
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Settings Drawer */}
      <SystemDrawer
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Navigation & Products Settings"
        width={350}
        position="right"
        pushContent={true}
      >
        {/* Tab Style */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Tab Style</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Navigation Style</label>
            <div className="tab-style-buttons">
              <button
                className={`tab-style-btn ${settings.tabStyle === 'underline' ? 'active' : ''}`}
                onClick={() => updateSetting('tabStyle', 'underline')}
              >
                Underline
              </button>
              <button
                className={`tab-style-btn ${settings.tabStyle === 'pills' ? 'active' : ''}`}
                onClick={() => updateSetting('tabStyle', 'pills')}
              >
                Pills
              </button>
              <button
                className={`tab-style-btn ${settings.tabStyle === 'minimal' ? 'active' : ''}`}
                onClick={() => updateSetting('tabStyle', 'minimal')}
              >
                Minimal
              </button>
            </div>
          </div>
        </div>

        {/* Grid Columns */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Grid Layout</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Columns</span>
              <span className="drawer-range-value">{settings.gridColumns}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={settings.gridColumns}
              onChange={(e) => updateSetting('gridColumns', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>

        {/* Product Spacing */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Product Spacing</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Spacing</span>
              <span className="drawer-range-value">{settings.productSpacing}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={settings.productSpacing}
              onChange={(e) => updateSetting('productSpacing', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>

        {/* Max Products Per Tab */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Products Per Tab</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Max Products</span>
              <span className="drawer-range-value">{settings.maxProductsPerTab}</span>
            </div>
            <input
              type="range"
              min="4"
              max="20"
              value={settings.maxProductsPerTab}
              onChange={(e) => updateSetting('maxProductsPerTab', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>

        {/* Show Load More */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Load More</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">
              <input
                type="checkbox"
                checked={settings.showLoadMore}
                onChange={(e) => updateSetting('showLoadMore', e.target.checked)}
                className="drawer-checkbox"
              />
              Show "Load More" button
            </label>
          </div>
        </div>
      </SystemDrawer>
    </div>
  );
};

export default CompNavigationBarwithProductsDesign;
