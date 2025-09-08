'use client';

import React, { useState } from 'react';
import { HiStar, HiMinus, HiPlus, HiPencil, HiEye, HiChevronDown } from 'react-icons/hi';
import StyleTextUser from './StyleTextUser';
import StyleButton, { ButtonStyles, defaultButtonStyles } from './StyleButton';
import StyledButton from './StyledButton';
import SystemDrawer from './SystemDrawer';
import './ProductContainerDisplay.css';
import './SystemControlIcons.css';

interface ProductContainerDisplayProps {
  className?: string;
}

interface ProductData {
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description1: string;
  description2: string;
  imageUrl: string;
  sizes: Array<{
    id: string;
    name: string;
    available: boolean;
  }>;
}

const ProductContainerDisplay: React.FC<ProductContainerDisplayProps> = ({ 
  className = ''
}) => {
  // Product data
  const [product] = useState<ProductData>({
    name: 'Julie Ø12 Planter & Saucer',
    price: 21.00,
    originalPrice: 28.00,
    rating: 5,
    reviewCount: 42,
    description1: 'Handcrafted ceramic planter with natural speckled finish',
    description2: 'Perfect for small plants and succulents. Includes matching saucer.',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80',
    sizes: [
      { id: 'small', name: 'Small', available: true },
      { id: 'medium', name: 'Medium', available: true },
      { id: 'large', name: 'Large', available: false }
    ]
  });

  // Component state
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  // Editor states
  const [showProductNameEditor, setShowProductNameEditor] = useState(false);
  const [productNameStyles, setProductNameStyles] = useState({
    fontSize: 18,
    fontFamily: 'Inter',
    color: '#111827',
    fontWeight: '600',
    bottomSpacing: 0,
    isBold: true,
    textAlign: 'left'
  });

  const [showDescriptionEditor, setShowDescriptionEditor] = useState(false);
  const [descriptionStyles, setDescriptionStyles] = useState({
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#374151',
    fontWeight: '500',
    bottomSpacing: 0,
    isBold: false,
    textAlign: 'left'
  });

  const [showDescription2Editor, setShowDescription2Editor] = useState(false);
  const [description2Styles, setDescription2Styles] = useState({
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#6b7280',
    fontWeight: '400',
    bottomSpacing: 0,
    isBold: false,
    textAlign: 'left'
  });

  const [showPriceEditor, setShowPriceEditor] = useState(false);
  const [priceStyles, setPriceStyles] = useState({
    currentPrice: {
      show: true,
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'left',
      color: '#111827'
    },
    beforePrice: {
      show: true,
      fontSize: 16,
      fontWeight: '400',
      textAlign: 'left',
      color: '#9ca3af'
    },
    horizontalSpacing: 8,
    bottomSpacing: 0
  });

  const [showReviewEditor, setShowReviewEditor] = useState(false);
  const [reviewStyles, setReviewStyles] = useState({
    theme: 'default',
    starColor: '#fbbf24',
    starSize: 14,
    textColor: '#6b7280',
    fontSize: 14,
    fontWeight: '400',
    spacing: 6,
    layout: 'horizontal',
    bottomSpacing: 0
  });

  const [showQuantityEditor, setShowQuantityEditor] = useState(false);
  const [quantityStyles, setQuantityStyles] = useState({
    theme: 'default',
    buttonColor: '#ffffff',
    buttonTextColor: '#374151',
    textColor: '#111827',
    fontSize: 14,
    fontWeight: '600',
    borderRadius: 4,
    buttonSize: 28,
    spacing: 8,
    layout: 'horizontal',
    bottomSpacing: 0
  });

  const [showSizeEditor, setShowSizeEditor] = useState(false);
  const [sizeStyles, setSizeStyles] = useState({
    fontSize: 14,
    fontWeight: '500',
    buttonColor: '#ffffff',
    textColor: '#374151',
    selectedColor: '#eff6ff',
    selectedTextColor: '#1e40af',
    borderColor: '#e5e7eb',
    selectedBorderColor: '#3b82f6',
    borderRadius: 6,
    padding: 8,
    spacing: 6,
    bottomSpacing: 0
  });

  const [showAddToCartEditor, setShowAddToCartEditor] = useState(false);
  const [buttonStyles, setButtonStyles] = useState<ButtonStyles>({
    ...defaultButtonStyles,
    text: 'Add to Cart',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: '#111827',
    textColor: '#ffffff',
    borderRadius: 6,
    height: 48,
    width: 'full'
  });

  // Editable text states
  const [editableProductName, setEditableProductName] = useState(product.name);
  const [editableDescription1, setEditableDescription1] = useState(product.description1);
  const [editableDescription2, setEditableDescription2] = useState(product.description2);
  const [editablePrice, setEditablePrice] = useState(product.price);
  const [editableOriginalPrice, setEditableOriginalPrice] = useState(product.originalPrice || 0);

  // Visibility control state
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
  const [elementVisibility, setElementVisibility] = useState({
    productName: true,
    price: true,
    rating: true,
    description1: true,
    description2: true,
    sizeVariants: true,
    quantity: true,
    addToCart: true
  });

  // Handlers
  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', {
      product: product.name,
      size: selectedSize.name,
      quantity: quantity
    });
  };

  const toggleElementVisibility = (elementKey: keyof typeof elementVisibility) => {
    setElementVisibility(prev => ({
      ...prev,
      [elementKey]: !prev[elementKey]
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <HiStar 
        key={index} 
        className={`star ${index < rating ? 'filled' : 'empty'}`}
        style={{
          width: `${reviewStyles.starSize}px`,
          height: `${reviewStyles.starSize}px`,
          color: index < rating ? reviewStyles.starColor : '#e5e7eb'
        }}
      />
    ));
  };

  return (
    <div className={`product-container-display ${className}`}>
      <div className="product-card-merged">
        {/* Product Image Section */}
        <div className="product-image-section">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="product-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/457x457/f3f4f6/9ca3af?text=Product+Image';
            }}
          />
          
          {/* Visibility Control Section */}
          <div className="visibility-control-section">
            <button 
              className="system-control-icon visibility medium"
              onClick={() => setShowVisibilityDropdown(!showVisibilityDropdown)}
              title="Control Element Visibility"
            >
              <HiEye />
            </button>
            
            {showVisibilityDropdown && (
              <div className="visibility-dropdown">
                <div className="visibility-dropdown-header">
                  <span>Show/Hide Elements</span>
                </div>
                <div className="visibility-options">
                  <label className="visibility-option">
                    <input
                      type="checkbox"
                      checked={elementVisibility.productName}
                      onChange={() => toggleElementVisibility('productName')}
                    />
                    <span>Product Name</span>
                  </label>
                  <label className="visibility-option">
                    <input
                      type="checkbox"
                      checked={elementVisibility.price}
                      onChange={() => toggleElementVisibility('price')}
                    />
                    <span>Price</span>
                  </label>
                  <label className="visibility-option">
                    <input
                      type="checkbox"
                      checked={elementVisibility.rating}
                      onChange={() => toggleElementVisibility('rating')}
                    />
                    <span>Rating & Reviews</span>
                  </label>
                  <label className="visibility-option">
                    <input
                      type="checkbox"
                      checked={elementVisibility.description1}
                      onChange={() => toggleElementVisibility('description1')}
                    />
                    <span>Description 1</span>
                  </label>
                  <label className="visibility-option">
                    <input
                      type="checkbox"
                      checked={elementVisibility.description2}
                      onChange={() => toggleElementVisibility('description2')}
                    />
                    <span>Description 2</span>
                  </label>
                  <label className="visibility-option">
                    <input
                      type="checkbox"
                      checked={elementVisibility.sizeVariants}
                      onChange={() => toggleElementVisibility('sizeVariants')}
                    />
                    <span>Size Variants</span>
                  </label>
                  <label className="visibility-option">
                    <input
                      type="checkbox"
                      checked={elementVisibility.quantity}
                      onChange={() => toggleElementVisibility('quantity')}
                    />
                    <span>Quantity Counter</span>
                  </label>
                  <label className="visibility-option">
                    <input
                      type="checkbox"
                      checked={elementVisibility.addToCart}
                      onChange={() => toggleElementVisibility('addToCart')}
                    />
                    <span>Add to Cart Button</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="product-details-section">
          {/* Product Name with Editor */}
          {elementVisibility.productName && (
            <div 
              className="product-name-container"
              style={{ marginBottom: `${productNameStyles.bottomSpacing}px` }}
            >
              <StyleTextUser
                value={editableProductName}
                onChange={setEditableProductName}
                styles={productNameStyles}
                onStylesChange={setProductNameStyles}
                placeholder="Enter product name..."
                className="product-name-editor"
              />
            </div>
          )}
          
          {/* Price with Editor */}
          {elementVisibility.price && (
            <div 
              className="product-price-container"
              style={{ marginBottom: `${priceStyles.bottomSpacing}px` }}
            >
              <div className="product-price-section">
                <span 
                  className="current-price"
                  style={{
                    fontSize: `${priceStyles.currentPrice.fontSize}px`,
                    fontWeight: priceStyles.currentPrice.fontWeight,
                    color: priceStyles.currentPrice.color,
                    textAlign: priceStyles.currentPrice.textAlign as any,
                    marginRight: `${priceStyles.horizontalSpacing}px`
                  }}
                >
                  ${editablePrice.toFixed(2)}
                </span>
                {priceStyles.beforePrice.show && editableOriginalPrice > 0 && (
                  <span 
                    className="original-price"
                    style={{
                      fontSize: `${priceStyles.beforePrice.fontSize}px`,
                      fontWeight: priceStyles.beforePrice.fontWeight,
                      color: priceStyles.beforePrice.color,
                      textAlign: priceStyles.beforePrice.textAlign as any
                    }}
                  >
                    ${editableOriginalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <button 
                className="product-price-edit-icon"
                onClick={() => setShowPriceEditor(!showPriceEditor)}
                title="Edit Price Style"
              >
                <HiPencil />
              </button>
            </div>
          )}
          
          {/* Rating with Editor */}
          {elementVisibility.rating && (
            <div 
              className="product-rating-container"
              style={{ marginBottom: `${reviewStyles.bottomSpacing}px` }}
            >
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span 
                  className="review-count"
                  style={{
                    color: reviewStyles.textColor,
                    fontSize: `${reviewStyles.fontSize}px`,
                    fontWeight: reviewStyles.fontWeight,
                    marginLeft: `${reviewStyles.spacing}px`
                  }}
                >
                  ({product.reviewCount})
                </span>
              </div>
              <button 
                className="product-review-edit-icon"
                onClick={() => setShowReviewEditor(!showReviewEditor)}
                title="Edit Review Style"
              >
                <HiPencil />
              </button>
            </div>
          )}
          
          {/* Description 1 with Editor */}
          {elementVisibility.description1 && (
            <div 
              className="product-description-container"
              style={{ marginBottom: `${descriptionStyles.bottomSpacing}px` }}
            >
              <StyleTextUser
                value={editableDescription1}
                onChange={setEditableDescription1}
                styles={descriptionStyles}
                onStylesChange={setDescriptionStyles}
                placeholder="Enter primary description..."
                className="product-description-editor primary"
              />
            </div>
          )}
          
          {/* Description 2 with Editor */}
          {elementVisibility.description2 && (
            <div 
              className="product-description-container"
              style={{ marginBottom: `${description2Styles.bottomSpacing}px` }}
            >
              <StyleTextUser
                value={editableDescription2}
                onChange={setEditableDescription2}
                styles={description2Styles}
                onStylesChange={setDescription2Styles}
                placeholder="Enter secondary description..."
                className="product-description-editor secondary"
              />
            </div>
          )}
          
          {/* Size Variants with Editor */}
          {elementVisibility.sizeVariants && (
            <div 
              className="product-sizes-container"
              style={{ marginBottom: `${sizeStyles.bottomSpacing}px` }}
            >
              <div className="product-sizes">
                <h4 className="sizes-title">Size</h4>
                <div 
                  className="sizes-list"
                  style={{ gap: `${sizeStyles.spacing}px` }}
                >
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      className={`size-option ${selectedSize.id === size.id ? 'selected' : ''} ${!size.available ? 'unavailable' : ''}`}
                      onClick={() => size.available && setSelectedSize(size)}
                      disabled={!size.available}
                      style={{
                        fontSize: `${sizeStyles.fontSize}px`,
                        fontWeight: sizeStyles.fontWeight,
                        backgroundColor: selectedSize.id === size.id ? sizeStyles.selectedColor : sizeStyles.buttonColor,
                        color: selectedSize.id === size.id ? sizeStyles.selectedTextColor : sizeStyles.textColor,
                        borderColor: selectedSize.id === size.id ? sizeStyles.selectedBorderColor : sizeStyles.borderColor,
                        borderRadius: `${sizeStyles.borderRadius}px`,
                        padding: `${sizeStyles.padding}px ${sizeStyles.padding * 1.5}px`
                      }}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                className="product-size-edit-icon"
                onClick={() => setShowSizeEditor(!showSizeEditor)}
                title="Edit Size Style"
              >
                <HiPencil />
              </button>
            </div>
          )}
          
          {/* Quantity Counter with Editor */}
          {elementVisibility.quantity && (
            <div 
              className="quantity-container-editor"
              style={{ marginBottom: `${quantityStyles.bottomSpacing}px` }}
            >
              <div className="quantity-container">
                <h4 className="quantity-title">Quantity</h4>
                <div 
                  className="quantity-controls"
                  style={{ gap: `${quantityStyles.spacing}px` }}
                >
                  <button 
                    className="quantity-btn minus"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    style={{
                      width: `${quantityStyles.buttonSize}px`,
                      height: `${quantityStyles.buttonSize}px`,
                      borderRadius: `${quantityStyles.borderRadius}px`,
                      backgroundColor: quantityStyles.buttonColor,
                      color: quantityStyles.buttonTextColor
                    }}
                  >
                    <HiMinus />
                  </button>
                  <span 
                    className="quantity-value"
                    style={{
                      color: quantityStyles.textColor,
                      fontSize: `${quantityStyles.fontSize}px`,
                      fontWeight: quantityStyles.fontWeight
                    }}
                  >
                    {quantity}
                  </span>
                  <button 
                    className="quantity-btn plus"
                    onClick={() => handleQuantityChange(1)}
                    style={{
                      width: `${quantityStyles.buttonSize}px`,
                      height: `${quantityStyles.buttonSize}px`,
                      borderRadius: `${quantityStyles.borderRadius}px`,
                      backgroundColor: quantityStyles.buttonColor,
                      color: quantityStyles.buttonTextColor
                    }}
                  >
                    <HiPlus />
                  </button>
                </div>
              </div>
              <button 
                className="quantity-edit-icon"
                onClick={() => setShowQuantityEditor(!showQuantityEditor)}
                title="Edit Quantity Style"
              >
                <HiPencil />
              </button>
            </div>
          )}
          
          {/* Add to Cart Button with Editor */}
          {elementVisibility.addToCart && (
            <div className="add-to-cart-container">
              <StyledButton
                styles={buttonStyles}
                onClick={handleAddToCart}
                className="add-to-cart-styled-btn"
              />
              <button 
                className="add-to-cart-edit-icon"
                onClick={() => setShowAddToCartEditor(!showAddToCartEditor)}
                title="Edit Button Style"
              >
                <HiPencil />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Price Editor Drawer */}
      <SystemDrawer
        isOpen={showPriceEditor}
        onClose={() => setShowPriceEditor(false)}
        title="Price Style Editor"
        width={350}
        position="right"
        pushContent={true}
      >
        {/* Current Price Section */}
        <div className="drawer-section">
          <h4 className="drawer-section-title">Current Price</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Font Size</span>
              <span className="drawer-range-value">{priceStyles.currentPrice.fontSize}px</span>
            </div>
            <input
              type="range"
              min="12" max="32"
              value={priceStyles.currentPrice.fontSize}
              onChange={(e) => setPriceStyles({
                ...priceStyles,
                currentPrice: { ...priceStyles.currentPrice, fontSize: Number(e.target.value) }
              })}
              className="drawer-range"
            />
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Price Color</label>
            <input
              type="color"
              value={priceStyles.currentPrice.color}
              onChange={(e) => setPriceStyles({
                ...priceStyles,
                currentPrice: { ...priceStyles.currentPrice, color: e.target.value }
              })}
              className="drawer-form-input"
            />
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Price Value</label>
            <input
              type="number"
              step="0.01"
              value={editablePrice}
              onChange={(e) => setEditablePrice(Number(e.target.value) || 0)}
              className="drawer-form-input"
            />
          </div>
        </div>

        {/* Original Price Section */}
        <div className="drawer-section">
          <h4 className="drawer-section-title">Original Price</h4>
          <div className="drawer-form-group">
            <label className="toggle-label">
              <span>Show Original Price</span>
              <div 
                className={`system-control-toggle ${priceStyles.beforePrice.show ? 'active' : ''}`}
                onClick={() => setPriceStyles({
                  ...priceStyles,
                  beforePrice: { ...priceStyles.beforePrice, show: !priceStyles.beforePrice.show }
                })}
              >
                <div className="toggle-slider"></div>
              </div>
            </label>
          </div>
          {priceStyles.beforePrice.show && (
            <>
              <div className="drawer-range-container">
                <div className="drawer-range-label">
                  <span>Font Size</span>
                  <span className="drawer-range-value">{priceStyles.beforePrice.fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="10" max="24"
                  value={priceStyles.beforePrice.fontSize}
                  onChange={(e) => setPriceStyles({
                    ...priceStyles,
                    beforePrice: { ...priceStyles.beforePrice, fontSize: Number(e.target.value) }
                  })}
                  className="drawer-range"
                />
              </div>
              <div className="drawer-form-group">
                <label className="drawer-form-label">Original Price Color</label>
                <input
                  type="color"
                  value={priceStyles.beforePrice.color}
                  onChange={(e) => setPriceStyles({
                    ...priceStyles,
                    beforePrice: { ...priceStyles.beforePrice, color: e.target.value }
                  })}
                  className="drawer-form-input"
                />
              </div>
              <div className="drawer-form-group">
                <label className="drawer-form-label">Original Price Value</label>
                <input
                  type="number"
                  step="0.01"
                  value={editableOriginalPrice}
                  onChange={(e) => setEditableOriginalPrice(Number(e.target.value) || 0)}
                  className="drawer-form-input"
                />
              </div>
            </>
          )}
        </div>

        {/* Spacing */}
        <div className="drawer-section">
          <h4 className="drawer-section-title">Spacing</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Horizontal Spacing</span>
              <span className="drawer-range-value">{priceStyles.horizontalSpacing}px</span>
            </div>
            <input
              type="range"
              min="4" max="24"
              value={priceStyles.horizontalSpacing}
              onChange={(e) => setPriceStyles({
                ...priceStyles,
                horizontalSpacing: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Bottom Spacing</span>
              <span className="drawer-range-value">{priceStyles.bottomSpacing}px</span>
            </div>
            <input
              type="range"
              min="0" max="32"
              value={priceStyles.bottomSpacing}
              onChange={(e) => setPriceStyles({
                ...priceStyles,
                bottomSpacing: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
        </div>
      </SystemDrawer>

      {/* Review Editor Drawer */}
      <SystemDrawer
        isOpen={showReviewEditor}
        onClose={() => setShowReviewEditor(false)}
        title="Review Style Editor"
        width={350}
        position="right"
        pushContent={true}
      >
        <div className="drawer-section">
          <h4 className="drawer-section-title">Star Settings</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Star Size</span>
              <span className="drawer-range-value">{reviewStyles.starSize}px</span>
            </div>
            <input
              type="range"
              min="12" max="24"
              value={reviewStyles.starSize}
              onChange={(e) => setReviewStyles({
                ...reviewStyles,
                starSize: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Star Color</label>
            <input
              type="color"
              value={reviewStyles.starColor}
              onChange={(e) => setReviewStyles({
                ...reviewStyles,
                starColor: e.target.value
              })}
              className="drawer-form-input"
            />
          </div>
        </div>

        <div className="drawer-section">
          <h4 className="drawer-section-title">Text Settings</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Font Size</span>
              <span className="drawer-range-value">{reviewStyles.fontSize}px</span>
            </div>
            <input
              type="range"
              min="10" max="18"
              value={reviewStyles.fontSize}
              onChange={(e) => setReviewStyles({
                ...reviewStyles,
                fontSize: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Text Color</label>
            <input
              type="color"
              value={reviewStyles.textColor}
              onChange={(e) => setReviewStyles({
                ...reviewStyles,
                textColor: e.target.value
              })}
              className="drawer-form-input"
            />
          </div>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Spacing</span>
              <span className="drawer-range-value">{reviewStyles.spacing}px</span>
            </div>
            <input
              type="range"
              min="2" max="16"
              value={reviewStyles.spacing}
              onChange={(e) => setReviewStyles({
                ...reviewStyles,
                spacing: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Bottom Spacing</span>
              <span className="drawer-range-value">{reviewStyles.bottomSpacing}px</span>
            </div>
            <input
              type="range"
              min="0" max="32"
              value={reviewStyles.bottomSpacing}
              onChange={(e) => setReviewStyles({
                ...reviewStyles,
                bottomSpacing: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
        </div>
      </SystemDrawer>

      {/* Quantity Editor Drawer */}
      <SystemDrawer
        isOpen={showQuantityEditor}
        onClose={() => setShowQuantityEditor(false)}
        title="Quantity Style Editor"
        width={350}
        position="right"
        pushContent={true}
      >
        <div className="drawer-section">
          <h4 className="drawer-section-title">Button Settings</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Button Size</span>
              <span className="drawer-range-value">{quantityStyles.buttonSize}px</span>
            </div>
            <input
              type="range"
              min="24" max="48"
              value={quantityStyles.buttonSize}
              onChange={(e) => setQuantityStyles({
                ...quantityStyles,
                buttonSize: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Button Color</label>
            <input
              type="color"
              value={quantityStyles.buttonColor}
              onChange={(e) => setQuantityStyles({
                ...quantityStyles,
                buttonColor: e.target.value
              })}
              className="drawer-form-input"
            />
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Button Text Color</label>
            <input
              type="color"
              value={quantityStyles.buttonTextColor}
              onChange={(e) => setQuantityStyles({
                ...quantityStyles,
                buttonTextColor: e.target.value
              })}
              className="drawer-form-input"
            />
          </div>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Border Radius</span>
              <span className="drawer-range-value">{quantityStyles.borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0" max="16"
              value={quantityStyles.borderRadius}
              onChange={(e) => setQuantityStyles({
                ...quantityStyles,
                borderRadius: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
        </div>

        <div className="drawer-section">
          <h4 className="drawer-section-title">Text Settings</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Font Size</span>
              <span className="drawer-range-value">{quantityStyles.fontSize}px</span>
            </div>
            <input
              type="range"
              min="12" max="20"
              value={quantityStyles.fontSize}
              onChange={(e) => setQuantityStyles({
                ...quantityStyles,
                fontSize: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Text Color</label>
            <input
              type="color"
              value={quantityStyles.textColor}
              onChange={(e) => setQuantityStyles({
                ...quantityStyles,
                textColor: e.target.value
              })}
              className="drawer-form-input"
            />
          </div>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Spacing</span>
              <span className="drawer-range-value">{quantityStyles.spacing}px</span>
            </div>
            <input
              type="range"
              min="4" max="16"
              value={quantityStyles.spacing}
              onChange={(e) => setQuantityStyles({
                ...quantityStyles,
                spacing: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Bottom Spacing</span>
              <span className="drawer-range-value">{quantityStyles.bottomSpacing}px</span>
            </div>
            <input
              type="range"
              min="0" max="32"
              value={quantityStyles.bottomSpacing}
              onChange={(e) => setQuantityStyles({
                ...quantityStyles,
                bottomSpacing: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
        </div>
      </SystemDrawer>

      {/* Size Editor Drawer */}
      <SystemDrawer
        isOpen={showSizeEditor}
        onClose={() => setShowSizeEditor(false)}
        title="Size Style Editor"
        width={350}
        position="right"
        pushContent={true}
      >
        <div className="drawer-section">
          <h4 className="drawer-section-title">Button Settings</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Font Size</span>
              <span className="drawer-range-value">{sizeStyles.fontSize}px</span>
            </div>
            <input
              type="range"
              min="10" max="18"
              value={sizeStyles.fontSize}
              onChange={(e) => setSizeStyles({
                ...sizeStyles,
                fontSize: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Button Color</label>
            <input
              type="color"
              value={sizeStyles.buttonColor}
              onChange={(e) => setSizeStyles({
                ...sizeStyles,
                buttonColor: e.target.value
              })}
              className="drawer-form-input"
            />
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Text Color</label>
            <input
              type="color"
              value={sizeStyles.textColor}
              onChange={(e) => setSizeStyles({
                ...sizeStyles,
                textColor: e.target.value
              })}
              className="drawer-form-input"
            />
          </div>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Border Radius</span>
              <span className="drawer-range-value">{sizeStyles.borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0" max="16"
              value={sizeStyles.borderRadius}
              onChange={(e) => setSizeStyles({
                ...sizeStyles,
                borderRadius: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
        </div>

        <div className="drawer-section">
          <h4 className="drawer-section-title">Selected State</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Selected Background</label>
            <input
              type="color"
              value={sizeStyles.selectedColor}
              onChange={(e) => setSizeStyles({
                ...sizeStyles,
                selectedColor: e.target.value
              })}
              className="drawer-form-input"
            />
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Selected Text Color</label>
            <input
              type="color"
              value={sizeStyles.selectedTextColor}
              onChange={(e) => setSizeStyles({
                ...sizeStyles,
                selectedTextColor: e.target.value
              })}
              className="drawer-form-input"
            />
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Border Color</label>
            <input
              type="color"
              value={sizeStyles.borderColor}
              onChange={(e) => setSizeStyles({
                ...sizeStyles,
                borderColor: e.target.value
              })}
              className="drawer-form-input"
            />
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Selected Border Color</label>
            <input
              type="color"
              value={sizeStyles.selectedBorderColor}
              onChange={(e) => setSizeStyles({
                ...sizeStyles,
                selectedBorderColor: e.target.value
              })}
              className="drawer-form-input"
            />
          </div>
        </div>

        <div className="drawer-section">
          <h4 className="drawer-section-title">Spacing</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Button Spacing</span>
              <span className="drawer-range-value">{sizeStyles.spacing}px</span>
            </div>
            <input
              type="range"
              min="2" max="16"
              value={sizeStyles.spacing}
              onChange={(e) => setSizeStyles({
                ...sizeStyles,
                spacing: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Padding</span>
              <span className="drawer-range-value">{sizeStyles.padding}px</span>
            </div>
            <input
              type="range"
              min="4" max="16"
              value={sizeStyles.padding}
              onChange={(e) => setSizeStyles({
                ...sizeStyles,
                padding: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Bottom Spacing</span>
              <span className="drawer-range-value">{sizeStyles.bottomSpacing}px</span>
            </div>
            <input
              type="range"
              min="0" max="32"
              value={sizeStyles.bottomSpacing}
              onChange={(e) => setSizeStyles({
                ...sizeStyles,
                bottomSpacing: Number(e.target.value)
              })}
              className="drawer-range"
            />
          </div>
        </div>
      </SystemDrawer>

      {/* Add to Cart Button Editor */}
      <StyleButton
        isOpen={showAddToCartEditor}
        onClose={() => setShowAddToCartEditor(false)}
        buttonStyles={buttonStyles}
        onStylesChange={setButtonStyles}
        title="Add to Cart Button Editor"
      />
    </div>
  );
};

export default ProductContainerDisplay;
