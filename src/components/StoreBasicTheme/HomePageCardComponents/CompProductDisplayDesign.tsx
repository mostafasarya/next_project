'use client';

import React, { useState } from 'react';
import { HiCog, HiViewfinderCircle, HiSelector } from 'react-icons/hi';
import SystemDrawer from '../../EditorControls/PropertiesManagement/SystemDrawer';
import ProductContainerDisplay from '../ProductContainer/ProductContainerDisplay';
import StyleTextUser from '../../EditorControls/PropertiesManagement/StyleTextUser';
import '../../EditorControls/PropertiesManagement/SystemControlIcons.css';
import './CompProductDisplayDesign.css';

interface ProductDisplaySettings {
  viewType: 'grid' | 'horizontal';
  mobileColumns: 1 | 2;
  webColumns: 2 | 3 | 4 | 5;
  productSpacing: number;
  showLoadMore: boolean;
  maxProducts: number;
}

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

interface CompProductDisplayDesignProps {
  title?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

const CompProductDisplayDesign: React.FC<CompProductDisplayDesignProps> = ({
  title = "Our Products",
  backgroundColor = "#ffffff",
  borderRadius = "16px"
}) => {
  const [titleText, setTitleText] = useState(title);
  const [titleStyles, setTitleStyles] = useState({
    fontSize: 32,
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#1f2937',
    fontWeight: '700',
    textAlign: 'center'
  });
  
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ProductDisplaySettings>({
    viewType: 'grid',
    mobileColumns: 2,
    webColumns: 3,
    productSpacing: 20,
    showLoadMore: true,
    maxProducts: 8
  });

  // Mock product data - in real app this would come from props or API
  const [allProducts] = useState<ProductData[]>([
    {
      id: '1',
      productName: 'iPhone 15 Pro Max',
      price: 1199,
      beforePrice: 1299,
      saveAmount: 100,
      productImage: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80',
      productImages: [
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80',
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80'
      ],
      rating: 4.8,
      reviews: 234,
      description: 'Latest iPhone with advanced features',
      inStock: true,
      variants: [
        { type: 'color', options: ['Natural Titanium', 'Blue Titanium', 'White Titanium'] },
        { type: 'storage', options: ['128GB', '256GB', '512GB', '1TB'] }
      ]
    },
    {
      id: '2',
      productName: 'MacBook Pro 16"',
      price: 2499,
      beforePrice: 2699,
      saveAmount: 200,
      productImage: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80',
      productImages: [
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80'
      ],
      rating: 4.9,
      reviews: 189,
      description: 'Professional laptop for creators',
      inStock: true,
      variants: [
        { type: 'color', options: ['Space Gray', 'Silver'] },
        { type: 'chip', options: ['M3 Pro', 'M3 Max'] }
      ]
    },
    {
      id: '3',
      productName: 'AirPods Pro 2',
      price: 249,
      beforePrice: 279,
      saveAmount: 30,
      productImage: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80',
      productImages: [
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80'
      ],
      rating: 4.7,
      reviews: 456,
      description: 'Premium wireless earbuds',
      inStock: true,
      variants: [
        { type: 'color', options: ['White'] }
      ]
    },
    {
      id: '4',
      productName: 'Apple Watch Series 9',
      price: 399,
      beforePrice: 429,
      saveAmount: 30,
      productImage: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80',
      productImages: [
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80'
      ],
      rating: 4.6,
      reviews: 321,
      description: 'Advanced smartwatch with health features',
      inStock: true,
      variants: [
        { type: 'case', options: ['Aluminum', 'Stainless Steel'] },
        { type: 'size', options: ['41mm', '45mm'] }
      ]
    },
    {
      id: '5',
      productName: 'iPad Pro 12.9"',
      price: 1099,
      beforePrice: 1199,
      saveAmount: 100,
      productImage: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80',
      productImages: [
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80'
      ],
      rating: 4.8,
      reviews: 167,
      description: 'Professional tablet for creativity',
      inStock: true,
      variants: [
        { type: 'storage', options: ['128GB', '256GB', '512GB', '1TB'] },
        { type: 'connectivity', options: ['Wi-Fi', 'Wi-Fi + Cellular'] }
      ]
    },
    {
      id: '6',
      productName: 'Magic Keyboard',
      price: 299,
      productImage: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80',
      productImages: [
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80'
      ],
      rating: 4.5,
      reviews: 89,
      description: 'Premium wireless keyboard',
      inStock: true,
      variants: [
        { type: 'layout', options: ['US English', 'International'] }
      ]
    }
  ]);

  const [displayedProducts, setDisplayedProducts] = useState<ProductData[]>(
    allProducts.slice(0, settings.maxProducts)
  );

  const updateSetting = (key: keyof ProductDisplaySettings, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      
      // Update displayed products when maxProducts changes
      if (key === 'maxProducts') {
        setDisplayedProducts(allProducts.slice(0, value));
      }
      
      return newSettings;
    });
  };

  const loadMoreProducts = () => {
    const currentCount = displayedProducts.length;
    const nextBatch = allProducts.slice(currentCount, currentCount + 4);
    setDisplayedProducts(prev => [...prev, ...nextBatch]);
  };

  const removeProduct = (productId: string) => {
    setDisplayedProducts(prev => prev.filter(product => product.id !== productId));
  };

  const addRandomProduct = () => {
    const availableProducts = allProducts.filter(
      product => !displayedProducts.find(dp => dp.id === product.id)
    );
    
    if (availableProducts.length > 0) {
      const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
      setDisplayedProducts(prev => [...prev, randomProduct]);
    }
  };

  const getGridStyles = () => {
    if (settings.viewType === 'horizontal') {
      return {
        display: 'flex',
        overflowX: 'auto' as const,
        gap: `${settings.productSpacing}px`,
        padding: '20px',
        scrollbarWidth: 'thin' as const
      };
    } else {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${settings.webColumns}, 1fr)`,
        gap: `${settings.productSpacing}px`,
        padding: '20px'
      };
    }
  };

  const getMobileGridClass = () => {
    if (settings.viewType === 'grid') {
      return settings.mobileColumns === 1 ? 'mobile-single-column' : 'mobile-double-column';
    }
    return '';
  };

  return (
    <div 
      className="comp-product-display-design"
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

      {/* Title Text Field */}
      <div style={{ padding: '20px 20px 0 20px' }}>
        <StyleTextUser
          value={titleText}
          onChange={setTitleText}
          styles={titleStyles}
          onStylesChange={setTitleStyles}
        />
      </div>

      {/* Toolbar Controls - Below Text Field */}
      <div 
        className="product-toolbar-tooltip"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px 20px',
          gap: '8px'
        }}
      >
        <div
          style={{
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
            title="Display settings"
            style={{ fontSize: '20px' }}
          >
            <HiCog />
          </button>
          <button
            onClick={addRandomProduct}
            className="system-control-icon add small"
            title="Add product"
            disabled={displayedProducts.length >= allProducts.length}
            style={{ fontSize: '20px' }}
          >
            🛍️
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div 
        className={`products-container ${settings.viewType} ${getMobileGridClass()}`}
        style={getGridStyles()}
      >

        {displayedProducts.map((product) => (
          <div key={product.id} className="product-wrapper">
            {/* Remove Product Button */}
            <button
              onClick={() => removeProduct(product.id)}
              className="remove-product-btn"
              title="Remove product"
            >
              ✕
            </button>
            
            {/* Product Container */}
            <div className="product-container-wrapper">
              <ProductContainerDisplay
                productData={{
                  name: product.productName,
                  price: product.price,
                  beforePrice: product.beforePrice,
                  saveAmount: product.saveAmount,
                  image: product.productImage,
                  rating: product.rating || 0,
                  reviewCount: product.reviews || 0,
                  description1: product.description || '',
                  description2: '',
                  variants: product.variants.map(variant => ({
                    name: variant.type,
                    options: variant.options
                  }))
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {settings.showLoadMore && displayedProducts.length < allProducts.length && (
        <div className="load-more-container">
          <button
            onClick={loadMoreProducts}
            className="load-more-btn"
          >
            Load More Products ({allProducts.length - displayedProducts.length} remaining)
          </button>
        </div>
      )}

      {/* Empty State */}
      {displayedProducts.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🛍️</div>
          <h3>No Products to Display</h3>
          <p>Click "Add Product" to start building your product showcase</p>
          <button
            onClick={addRandomProduct}
            className="add-first-product-btn"
          >
            Add Your First Product
          </button>
        </div>
      )}

      {/* Settings Drawer */}
      <SystemDrawer
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Product Display Settings"
        width={350}
        position="right"
        pushContent={true}
      >
        {/* View Type */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Display Type</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Layout Style</label>
            <div className="view-type-buttons">
              <button
                className={`view-type-btn ${settings.viewType === 'grid' ? 'active' : ''}`}
                onClick={() => updateSetting('viewType', 'grid')}
              >
                🔲 Grid
              </button>
              <button
                className={`view-type-btn ${settings.viewType === 'horizontal' ? 'active' : ''}`}
                onClick={() => updateSetting('viewType', 'horizontal')}
              >
                ↔️ Horizontal
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Columns (only for grid view) */}
        {settings.viewType === 'grid' && (
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Mobile Columns</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Columns on Mobile</label>
              <div className="mobile-columns-buttons">
                <button
                  className={`mobile-column-btn ${settings.mobileColumns === 1 ? 'active' : ''}`}
                  onClick={() => updateSetting('mobileColumns', 1)}
                >
                  1 Column
                </button>
                <button
                  className={`mobile-column-btn ${settings.mobileColumns === 2 ? 'active' : ''}`}
                  onClick={() => updateSetting('mobileColumns', 2)}
                >
                  2 Columns
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Web Columns (only for grid view) */}
        {settings.viewType === 'grid' && (
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Web Columns</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Columns on Desktop</label>
              <div className="web-columns-buttons">
                <button
                  className={`web-column-btn ${settings.webColumns === 2 ? 'active' : ''}`}
                  onClick={() => updateSetting('webColumns', 2)}
                >
                  2
                </button>
                <button
                  className={`web-column-btn ${settings.webColumns === 3 ? 'active' : ''}`}
                  onClick={() => updateSetting('webColumns', 3)}
                >
                  3
                </button>
                <button
                  className={`web-column-btn ${settings.webColumns === 4 ? 'active' : ''}`}
                  onClick={() => updateSetting('webColumns', 4)}
                >
                  4
                </button>
                <button
                  className={`web-column-btn ${settings.webColumns === 5 ? 'active' : ''}`}
                  onClick={() => updateSetting('webColumns', 5)}
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
              <span className="drawer-range-value">{settings.productSpacing}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={settings.productSpacing}
              onChange={(e) => updateSetting('productSpacing', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>

        {/* Max Products */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Maximum Products</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Max Products</span>
              <span className="drawer-range-value">{settings.maxProducts}</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              value={settings.maxProducts}
              onChange={(e) => updateSetting('maxProducts', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>

        {/* Show Load More */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Load More Button</h4>
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

export default CompProductDisplayDesign;
