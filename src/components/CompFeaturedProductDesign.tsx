'use client';

import React, { useState, useEffect } from 'react';
import ProductContainerDisplay from './ProductContainerDisplay';
import './CompFeaturedProductDesign.css';

interface Product {
  id: string;
  name: string;
  price: number;
  beforePrice?: number;
  saveAmount?: number;
  image: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  description?: string;
  inStock: boolean;
  variants?: Array<{
    type: string;
    options: string[];
  }>;
}

interface CompFeaturedProductDesignProps {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  selectedProductId?: string;
}

const CompFeaturedProductDesign: React.FC<CompFeaturedProductDesignProps> = ({
  title = "Featured Product",
  subtitle = "Check out our top pick for you",
  backgroundColor = "#ffffff",
  selectedProductId
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductSelector, setShowProductSelector] = useState(false);

  // Mock products data - In real app, this would come from an API or props
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 299.99,
      beforePrice: 399.99,
      saveAmount: 100.00,
      image: "/api/placeholder/300/300",
      images: ["/api/placeholder/300/300", "/api/placeholder/300/300"],
      rating: 4.8,
      reviews: 1250,
      description: "High-quality wireless headphones with noise cancellation",
      inStock: true,
      variants: [
        { type: "Color", options: ["Black", "White", "Silver"] },
        { type: "Size", options: ["Regular", "Large"] }
      ]
    },
    {
      id: "2", 
      name: "Smart Fitness Watch",
      price: 199.99,
      beforePrice: 249.99,
      saveAmount: 50.00,
      image: "/api/placeholder/300/300",
      images: ["/api/placeholder/300/300"],
      rating: 4.6,
      reviews: 890,
      description: "Track your fitness goals with this advanced smartwatch",
      inStock: true,
      variants: [
        { type: "Color", options: ["Black", "Rose Gold", "Silver"] },
        { type: "Band", options: ["Sport", "Leather", "Metal"] }
      ]
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      price: 79.99,
      beforePrice: 99.99,
      saveAmount: 20.00,
      image: "/api/placeholder/300/300",
      images: ["/api/placeholder/300/300"],
      rating: 4.4,
      reviews: 567,
      description: "Portable speaker with amazing sound quality",
      inStock: true,
      variants: [
        { type: "Color", options: ["Blue", "Red", "Black"] }
      ]
    }
  ];

  useEffect(() => {
    // Load products (in real app, this would be an API call)
    setAllProducts(mockProducts);
    
    // Set initial selected product
    if (selectedProductId) {
      const product = mockProducts.find(p => p.id === selectedProductId);
      setSelectedProduct(product || mockProducts[0]);
    } else {
      setSelectedProduct(mockProducts[0]);
    }
  }, [selectedProductId]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setShowProductSelector(false);
  };

  return (
    <div 
      className="comp-featured-product-design"
      style={{ 
        backgroundColor,
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        margin: '20px 0',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Product Selector Button - Top Right */}
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        right: '10px', 
        zIndex: 5 
      }}>
        <button
          onClick={() => setShowProductSelector(!showProductSelector)}
          style={{
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e5e7eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
        >
          📝 Change Product
        </button>
      </div>

      {/* Product Selector Dropdown */}
      {showProductSelector && (
        <div style={{
          padding: '20px',
          backgroundColor: '#f9fafb',
          borderBottom: '1px solid #e5e7eb',
          marginTop: '50px'
        }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#374151' }}>
            Select a Product to Feature:
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {allProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product)}
                style={{
                  padding: '12px',
                  backgroundColor: selectedProduct?.id === product.id ? '#dbeafe' : '#ffffff',
                  border: selectedProduct?.id === product.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedProduct?.id !== product.id) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedProduct?.id !== product.id) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                  {product.name}
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>
                  ${product.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Product Display */}
      <div className="featured-product-container">
        {selectedProduct ? (
          <ProductContainerDisplay
            productData={{
              name: selectedProduct.name,
              price: selectedProduct.price,
              beforePrice: selectedProduct.beforePrice,
              saveAmount: selectedProduct.saveAmount,
              rating: selectedProduct.rating || 0,
              reviewCount: selectedProduct.reviews || 0,
              description1: selectedProduct.description || "",
              description2: "",
              image: selectedProduct.image,
              variants: selectedProduct.variants?.map(v => ({
                name: v.type,
                options: v.options
              })) || []
            }}
          />
        ) : (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <p>No product selected</p>
            <button
              onClick={() => setShowProductSelector(true)}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Select Product
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="featured-product-footer">
        <div style={{
          fontSize: '12px',
          color: '#6b7280',
          textAlign: 'center',
          padding: '10px'
        }}>
          ✨ This product is highlighted as a featured item
        </div>
      </div>
    </div>
  );
};

export default CompFeaturedProductDesign;