'use client';

import React, { useState, useRef } from 'react';
import ProductContainerDisplay from './ProductContainerDisplay';
import './CompCollageDesign.css';

interface CompCollageDesignProps {
  title?: string;
  layout?: 'image-left' | 'image-right';
  backgroundColor?: string;
  borderRadius?: string;
}

const CompCollageDesign: React.FC<CompCollageDesignProps> = ({
  title = "Product Showcase",
  layout = 'image-left',
  backgroundColor = "#ffffff",
  borderRadius = "16px"
}) => {
  const [collageTitle, setCollageTitle] = useState(title);
  const [selectedProduct, setSelectedProduct] = useState({
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    beforePrice: 249.99,
    saveAmount: 50.00,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop&crop=center'
    ],
    rating: 4.8,
    reviews: 156,
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    inStock: true,
    variants: [
      { name: 'Color', type: 'color', options: ['Black', 'White', 'Silver'] },
      { name: 'Size', type: 'size', options: ['Standard'] }
    ]
  });
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [currentLayout, setCurrentLayout] = useState(layout);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock product data for selection
  const mockProducts = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      beforePrice: 249.99,
      saveAmount: 50.00,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop&crop=center'
      ],
      rating: 4.8,
      reviews: 156,
      description: 'High-quality wireless headphones with noise cancellation.',
      inStock: true,
      variants: [
        { name: 'Color', type: 'color', options: ['Black', 'White', 'Silver'] },
        { name: 'Size', type: 'size', options: ['Standard'] }
      ]
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 299.99,
      beforePrice: 349.99,
      saveAmount: 50.00,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center'
      ],
      rating: 4.6,
      reviews: 89,
      description: 'Advanced fitness tracking with heart rate monitoring.',
      inStock: true,
      variants: [
        { name: 'Color', type: 'color', options: ['Black', 'Rose Gold', 'Silver'] },
        { name: 'Band', type: 'size', options: ['Sport', 'Leather', 'Metal'] }
      ]
    },
    {
      id: '3',
      name: 'Professional Camera',
      price: 1299.99,
      beforePrice: 1499.99,
      saveAmount: 200.00,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop&crop=center'
      ],
      rating: 4.9,
      reviews: 234,
      description: 'Professional DSLR camera with 4K video recording.',
      inStock: true,
      variants: [
        { name: 'Kit', type: 'size', options: ['Body Only', 'With Lens', 'Pro Kit'] }
      ]
    }
  ];

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setShowProductSelector(false);
  };

  const handleTitleEdit = (newTitle: string) => {
    setCollageTitle(newTitle);
  };

  const toggleLayout = () => {
    setCurrentLayout(prev => prev === 'image-left' ? 'image-right' : 'image-left');
  };

  return (
    <div 
      className="comp-collage-design"
      style={{ 
        backgroundColor,
        borderRadius,
        border: '1px solid #e5e7eb',
        margin: '20px 0',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Header Section */}
      <div className="collage-header">
        <div className="title-container">
          {editingTitle ? (
            <input
              type="text"
              value={collageTitle}
              onChange={(e) => handleTitleEdit(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditingTitle(false);
                }
              }}
              className="title-input"
              autoFocus
            />
          ) : (
            <h2 
              className="collage-title"
              onClick={() => setEditingTitle(true)}
            >
              {collageTitle}
            </h2>
          )}
          <button
            className="edit-btn title-edit-btn"
            onClick={() => setEditingTitle(true)}
            title="Edit title"
          >
            ✏️
          </button>
        </div>

        {/* Layout Controls */}
        <div className="collage-controls">
          <button
            onClick={toggleLayout}
            className="layout-btn"
            title="Switch layout"
          >
            {currentLayout === 'image-left' ? '⇄ Image Right' : '⇄ Image Left'}
          </button>
          <button
            onClick={() => setShowProductSelector(!showProductSelector)}
            className="product-btn"
            title="Change product"
          >
            🛍️ Change Product
          </button>
        </div>
      </div>

      {/* Product Selector Dropdown */}
      {showProductSelector && (
        <div className="product-selector">
          <h4>Select Product:</h4>
          <div className="product-options">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className={`product-option ${selectedProduct.id === product.id ? 'selected' : ''}`}
                onClick={() => handleProductSelect(product)}
              >
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`collage-content ${currentLayout}`}>
        {/* Image Upload Section */}
        <div className="image-section">
          <div 
            className={`image-upload-area ${isDragging ? 'dragging' : ''} ${uploadedImage ? 'has-image' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !uploadedImage && fileInputRef.current?.click()}
          >
            {uploadedImage ? (
              <div className="uploaded-image-container">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded content" 
                  className="uploaded-image"
                />
                <div className="image-overlay">
                  <button
                    className="change-image-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    title="Change image"
                  >
                    📷 Change
                  </button>
                  <button
                    className="remove-image-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    title="Remove image"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">📷</div>
                <div className="upload-text">
                  <strong>Click to upload</strong> or drag and drop
                </div>
                <div className="upload-subtext">
                  PNG, JPG, GIF up to 10MB
                </div>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="file-input"
            style={{ display: 'none' }}
          />
        </div>

        {/* Product Section */}
        <div className="product-section">
          <ProductContainerDisplay
            productData={{
              productName: selectedProduct.name,
              price: selectedProduct.price,
              beforePrice: selectedProduct.beforePrice,
              saveAmount: selectedProduct.saveAmount,
              productImage: selectedProduct.image,
              productImages: selectedProduct.images,
              rating: selectedProduct.rating,
              reviews: selectedProduct.reviews,
              description: selectedProduct.description,
              inStock: selectedProduct.inStock,
              variants: selectedProduct.variants
            }}
            isChildComponent={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CompCollageDesign;
