'use client';

import React, { useState, useRef } from 'react';
import { HiCamera, HiTrash, HiPencil, HiSwitchHorizontal, HiSelector } from 'react-icons/hi';
import { HiShoppingBag } from 'react-icons/hi2';
import ProductContainerDisplay from '../ProductContainer/ProductContainerDisplay';
import '../../EditorControls/PropertiesManagement/SystemControlIcons.css';
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

      {/* Control Icons Tooltip - Top Center */}
      <div
        className="collage-toolbar-tooltip"
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
          onClick={toggleLayout}
          className="system-control-icon switch small"
          title="Switch layout"
          style={{ fontSize: '20px' }}
        >
          <HiSwitchHorizontal />
        </button>
        <button
          onClick={() => setShowProductSelector(!showProductSelector)}
          className="system-control-icon product small"
          title="Change product"
          style={{ fontSize: '20px' }}
        >
          <HiShoppingBag />
        </button>
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
                    className="system-control-icon camera small"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    title="Change image"
                  >
                    <HiCamera />
                  </button>
                  <button
                    className="system-control-icon delete small"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    title="Remove image"
                  >
                    <HiTrash />
                  </button>
                </div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">
                  <HiCamera />
                </div>
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
