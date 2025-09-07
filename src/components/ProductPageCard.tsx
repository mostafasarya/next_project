'use client';

import React from 'react';
import { HiArrowsExpand, HiRefresh, HiEye, HiPencil } from 'react-icons/hi';
import SystemDrawer from './SystemDrawer';
import StyleButton, { ButtonStyles, defaultButtonStyles } from './StyleButton';
import StyledButton from './StyledButton';
import './ProductPageCard.css';

interface ProductPageCardProps {
  productName: string;
  price: number;
  description: string;
  images: string[];
  variants?: { name: string; options: string[] }[];
  rating?: number; // Rating out of 5 (e.g., 4.3)
  reviewCount?: number; // Number of reviews (e.g., 4325)
}

const ProductPageCard: React.FC<ProductPageCardProps> = ({ 
  productName, 
  price, 
  description, 
  images, 
  variants = [],
  rating = 4.3,
  reviewCount = 4325
}) => {
  const [selectedVariants, setSelectedVariants] = React.useState<{[key: string]: string}>({});
  const [quantity, setQuantity] = React.useState(1);
  
  // Control states
  const [showDimensionsControl, setShowDimensionsControl] = React.useState(false);
  const [showColorControl, setShowColorControl] = React.useState(false);
  const [cardWidth, setCardWidth] = React.useState(100);
  const [cardHeight, setCardHeight] = React.useState(100);
  const [parentCardColor, setParentCardColor] = React.useState('#ffffff');
  const [childrenCardColor, setChildrenCardColor] = React.useState('#f8f9fa');
  
  // Children cards dimensions
  const [imageCardWidth, setImageCardWidth] = React.useState(50);
  const [detailsCardWidth, setDetailsCardWidth] = React.useState(50);
  const [cardsSpacing, setCardsSpacing] = React.useState(24); // Gap between children cards
  const [cardsFlipped, setCardsFlipped] = React.useState(false); // Whether cards are flipped
  
  // Image layout control
  const [imageLayout, setImageLayout] = React.useState('list'); // 'list', 'carousel', 'column', 'grid'
  
  // Drag and drop state
  const [draggedElement, setDraggedElement] = React.useState<string | null>(null);
  const [elementOrder, setElementOrder] = React.useState([
    'name',
    'rating', 
    'price',
    'description',
    'description2',
    'variants',
    'quantity',
    'addToCart'
  ]);
  
  // Visibility control state
  const [showVisibilityControl, setShowVisibilityControl] = React.useState(false);
  const [elementVisibility, setElementVisibility] = React.useState({
    name: true,
    rating: true,
    price: true,
    description: true,
    description2: false,
    variants: true,
    quantity: true,
    addToCart: true
  });
  
  // Dimensions control state for product description card
  const [showDescriptionDimensionsControl, setShowDescriptionDimensionsControl] = React.useState(false);
  const [elementSpacing, setElementSpacing] = React.useState(16); // Spacing between elements
  const [horizontalPadding, setHorizontalPadding] = React.useState(8); // Horizontal padding of all elements
  const [verticalPadding, setVerticalPadding] = React.useState(8); // Vertical padding of all elements
  
  // Product name editor state
  const [showProductNameEditor, setShowProductNameEditor] = React.useState(false);
  const [productNameStyles, setProductNameStyles] = React.useState({
    fontSize: 28,
    fontFamily: 'Inter',
    color: '#212529',
    fontWeight: '600',
    bottomSpacing: 16,
    isBold: true,
    textAlign: 'left'
  });
  
  // Product description editor state
  const [showDescriptionEditor, setShowDescriptionEditor] = React.useState(false);
  const [descriptionStyles, setDescriptionStyles] = React.useState({
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#6b7280',
    fontWeight: '400',
    bottomSpacing: 16,
    isBold: false,
    textAlign: 'left'
  });
  
  // Second product description editor state
  const [showDescription2Editor, setShowDescription2Editor] = React.useState(false);
  const [description2Styles, setDescription2Styles] = React.useState({
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#9ca3af',
    fontWeight: '400',
    bottomSpacing: 12,
    isBold: false,
    textAlign: 'left'
  });
  
  // Editable description text state
  const [editableDescription, setEditableDescription] = React.useState(description);
  const [isEditingDescription, setIsEditingDescription] = React.useState(false);
  
  // Second editable description text state
  const [editableDescription2, setEditableDescription2] = React.useState("Additional product details and specifications can be added here. This is a secondary description field that provides more detailed information about the product.");
  const [isEditingDescription2, setIsEditingDescription2] = React.useState(false);
  
  // Review editor state
  const [showReviewEditor, setShowReviewEditor] = React.useState(false);
  const [reviewStyles, setReviewStyles] = React.useState({
    theme: 'default',
    starColor: '#fbbf24',
    starSize: 16,
    textColor: '#6b7280',
    fontSize: 14,
    fontWeight: '400',
    spacing: 8,
    layout: 'horizontal'
  });
  
  // Quantity counter editor state
  const [showQuantityEditor, setShowQuantityEditor] = React.useState(false);
  const [quantityStyles, setQuantityStyles] = React.useState({
    theme: 'default',
    buttonColor: '#ef4444',
    buttonTextColor: '#ffffff',
    textColor: '#374151',
    fontSize: 16,
    fontWeight: '500',
    borderRadius: 8,
    buttonSize: 40,
    spacing: 8,
    layout: 'horizontal'
  });
  
  // Price editor state
  const [showPriceEditor, setShowPriceEditor] = React.useState(false);
  const [activePriceTab, setActivePriceTab] = React.useState('current');
  const [priceStyles, setPriceStyles] = React.useState({
    currentPrice: {
      show: true,
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'left',
      color: '#28a745'
    },
    beforePrice: {
      show: false,
      fontSize: 18,
      fontWeight: '400',
      textAlign: 'left',
      color: '#6c757d'
    },
    save: {
      show: false,
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'left',
      color: '#dc3545'
    },
    horizontalSpacing: 12
  });

  // Add to Cart Button editor state
  const [showAddToCartEditor, setShowAddToCartEditor] = React.useState(false);
  const [buttonStyles, setButtonStyles] = React.useState<ButtonStyles>(defaultButtonStyles);

  const handleVariantChange = (variantName: string, option: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: option
    }));
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', {
      productName,
      price,
      quantity,
      selectedVariants
    });
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, elementId: string) => {
    setDraggedElement(elementId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetElementId: string) => {
    e.preventDefault();
    
    if (!draggedElement || draggedElement === targetElementId) {
      setDraggedElement(null);
      return;
    }

    const newOrder = [...elementOrder];
    const draggedIndex = newOrder.indexOf(draggedElement);
    const targetIndex = newOrder.indexOf(targetElementId);

    // Remove dragged element and insert at target position
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedElement);

    setElementOrder(newOrder);
    setDraggedElement(null);
  };

  const handleDragEnd = () => {
    setDraggedElement(null);
  };

  // Toggle element visibility
  const toggleElementVisibility = (elementId: string) => {
    setElementVisibility(prev => ({
      ...prev,
      [elementId]: !prev[elementId as keyof typeof prev]
    }));
  };

  // Update product name styles
  const updateProductNameStyle = (property: string, value: any) => {
    console.log(`Updating ${property} to:`, value);
    setProductNameStyles(prev => ({
      ...prev,
      [property]: value
    }));
  };

  // Render star rating component
  const renderStarRating = (starColor = '#fbbf24') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star full" style={{ color: starColor }}>
          ★
        </span>
      );
    }
    
    // Render half star if needed
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half" style={{ color: starColor }}>
          ★
        </span>
      );
    }
    
    // Render empty stars to complete 5 stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty" style={{ color: '#d1d5db' }}>
          ★
        </span>
      );
    }
    
    return stars;
  };

  // Render individual elements for drag and drop
  const renderElement = (elementId: string) => {
    const isDragging = draggedElement === elementId;
    const isVisible = elementVisibility[elementId as keyof typeof elementVisibility];
    
    // Don't render if element is hidden
    if (!isVisible) return null;
    
    const elementStyle = {
      padding: `${verticalPadding}px ${horizontalPadding}px`,
      marginBottom: `${elementSpacing}px`
    };
    
    switch (elementId) {
      case 'name':
  return (
          <div
            key="name"
            draggable
            onDragStart={(e) => handleDragStart(e, 'name')}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'name')}
            onDragEnd={handleDragEnd}
            className={`draggable-element ${isDragging ? 'dragging' : ''}`}
            style={elementStyle}
          >
            <div className="product-name-wrapper">
              {/* Control Buttons Above Product Name */}
              <div className="description-control-buttons">
                {/* Visibility Control Button */}
                <button 
                  className="system-control-icon visibility" 
                  onClick={() => setShowVisibilityControl(!showVisibilityControl)}
                  title="Control Element Visibility"
                >
                  <HiEye />
                </button>
                
                {/* Dimensions Control Button */}
                <button 
                  className="system-control-icon dimensions" 
                  onClick={() => setShowDescriptionDimensionsControl(!showDescriptionDimensionsControl)}
                  title="Control Element Spacing & Padding"
                >
                  <HiArrowsExpand />
                </button>
              </div>
              
              <div className="product-name-container">
                <h1 
                  className="product-title"
                  style={{
                    fontSize: `${productNameStyles.fontSize}px`,
                    fontFamily: productNameStyles.fontFamily,
                    color: productNameStyles.color,
                    fontWeight: productNameStyles.fontWeight,
                    marginBottom: `${productNameStyles.bottomSpacing}px`,
                    textAlign: productNameStyles.textAlign as any,
                    // CSS custom properties for more reliable styling
                    '--text-align': productNameStyles.textAlign
                  } as React.CSSProperties}
                >
                  {productName}
                </h1>
                <button 
                  className="product-name-edit-icon"
                  onClick={() => setShowProductNameEditor(!showProductNameEditor)}
                  title="Edit Product Name Style"
                >
                  <HiPencil />
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'rating':
        return (
          <div
            key="rating"
            draggable
            onDragStart={(e) => handleDragStart(e, 'rating')}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'rating')}
            onDragEnd={handleDragEnd}
            className={`draggable-element ${isDragging ? 'dragging' : ''}`}
            style={elementStyle}
          >
            <div className="product-rating-container">
              <div 
                className="product-rating"
                style={{
                  color: reviewStyles.textColor,
                  fontSize: `${reviewStyles.fontSize}px`,
                  fontWeight: reviewStyles.fontWeight,
                  gap: `${reviewStyles.spacing}px`,
                  flexDirection: reviewStyles.layout === 'vertical' ? 'column' : 'row'
                }}
              >
                <div 
                  className="star-rating"
                  style={{
                    fontSize: `${reviewStyles.starSize}px`
                  }}
                >
                  {renderStarRating(reviewStyles.starColor)}
                </div>
                <span className="review-count">{reviewCount.toLocaleString()} reviews</span>
              </div>
              <button 
                className="product-rating-edit-icon"
                onClick={() => setShowReviewEditor(!showReviewEditor)}
                title="Edit Review Style"
              >
                <HiPencil />
              </button>
            </div>
          </div>
        );
      
      case 'price':
        return (
          <div
            key="price"
            draggable
            onDragStart={(e) => handleDragStart(e, 'price')}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'price')}
            onDragEnd={handleDragEnd}
            className={`draggable-element ${isDragging ? 'dragging' : ''}`}
            style={elementStyle}
          >
            <div className="product-price-container">
              <div 
                className="product-price-section"
                style={{
                  gap: `${priceStyles.horizontalSpacing}px`,
                  justifyContent: priceStyles.currentPrice.textAlign === 'center' ? 'center' : 
                                 priceStyles.currentPrice.textAlign === 'right' ? 'flex-end' : 'flex-start'
                }}
              >
                {priceStyles.currentPrice.show && (
                  <div 
                    className="product-price"
                    style={{
                      fontSize: `${priceStyles.currentPrice.fontSize}px`,
                      fontWeight: priceStyles.currentPrice.fontWeight,
                      color: priceStyles.currentPrice.color,
                      textAlign: priceStyles.currentPrice.textAlign as any
                    }}
                  >
                    ${price.toFixed(2)}
              </div>
            )}
                {priceStyles.beforePrice.show && (
                  <div 
                    className="product-before-price"
                    style={{
                      fontSize: `${priceStyles.beforePrice.fontSize}px`,
                      fontWeight: priceStyles.beforePrice.fontWeight,
                      color: priceStyles.beforePrice.color,
                      textAlign: priceStyles.beforePrice.textAlign as any
                    }}
                  >
                    ${(price * 1.2).toFixed(2)}
          </div>
                )}
                {priceStyles.save.show && (
                  <div 
                    className="product-save"
                    style={{
                      fontSize: `${priceStyles.save.fontSize}px`,
                      fontWeight: priceStyles.save.fontWeight,
                      color: priceStyles.save.color,
                      textAlign: priceStyles.save.textAlign as any
                    }}
                  >
                    Save ${((price * 1.2) - price).toFixed(2)}
            </div>
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
          </div>
        );
      
      case 'description':
        return (
          <div
            key="description"
            draggable
            onDragStart={(e) => handleDragStart(e, 'description')}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'description')}
            onDragEnd={handleDragEnd}
            className={`draggable-element ${isDragging ? 'dragging' : ''}`}
            style={elementStyle}
          >
            <div className="product-description-container">
              {isEditingDescription ? (
                <textarea
                  value={editableDescription}
                  onChange={(e) => setEditableDescription(e.target.value)}
                  onBlur={() => setIsEditingDescription(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      setIsEditingDescription(false);
                    }
                    if (e.key === 'Escape') {
                      setEditableDescription(description);
                      setIsEditingDescription(false);
                    }
                  }}
                  className={`product-description-textarea ${descriptionStyles.isBold ? 'bold' : ''}`}
                  style={{
                    fontSize: `${descriptionStyles.fontSize}px`,
                    fontFamily: descriptionStyles.fontFamily,
                    color: descriptionStyles.color,
                    fontWeight: descriptionStyles.isBold ? '700' : descriptionStyles.fontWeight,
                    marginBottom: `${descriptionStyles.bottomSpacing}px`,
                    textAlign: descriptionStyles.textAlign as any,
                    '--text-align': descriptionStyles.textAlign
                  } as React.CSSProperties}
                  autoFocus
                />
              ) : (
                <p 
                  className={`product-description ${descriptionStyles.isBold ? 'bold' : ''}`}
                  onClick={() => setIsEditingDescription(true)}
                  style={{
                    fontSize: `${descriptionStyles.fontSize}px`,
                    fontFamily: descriptionStyles.fontFamily,
                    color: descriptionStyles.color,
                    fontWeight: descriptionStyles.isBold ? '700' : descriptionStyles.fontWeight,
                    marginBottom: `${descriptionStyles.bottomSpacing}px`,
                    textAlign: descriptionStyles.textAlign as any,
                    '--text-align': descriptionStyles.textAlign
                  } as React.CSSProperties}
                  data-bold={descriptionStyles.isBold}
                  data-fontweight={descriptionStyles.fontWeight}
                >
                  {editableDescription}
                </p>
              )}
              <button 
                className="product-description-edit-icon"
                onClick={() => setShowDescriptionEditor(!showDescriptionEditor)}
                title="Edit Description Style"
              >
                <HiPencil />
              </button>
          </div>
          </div>
        );
      
      case 'description2':
        return (
          <div
            key="description2"
            draggable
            onDragStart={(e) => handleDragStart(e, 'description2')}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'description2')}
            onDragEnd={handleDragEnd}
            className={`draggable-element ${isDragging ? 'dragging' : ''}`}
            style={elementStyle}
          >
            <div className="product-description-container">
              {isEditingDescription2 ? (
                <textarea
                  value={editableDescription2}
                  onChange={(e) => setEditableDescription2(e.target.value)}
                  onBlur={() => setIsEditingDescription2(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      setIsEditingDescription2(false);
                    }
                    if (e.key === 'Escape') {
                      setEditableDescription2("Additional product details and specifications can be added here. This is a secondary description field that provides more detailed information about the product.");
                      setIsEditingDescription2(false);
                    }
                  }}
                  className={`product-description-textarea ${description2Styles.isBold ? 'bold' : ''}`}
                  style={{
                    fontSize: `${description2Styles.fontSize}px`,
                    fontFamily: description2Styles.fontFamily,
                    color: description2Styles.color,
                    fontWeight: description2Styles.isBold ? '700' : description2Styles.fontWeight,
                    marginBottom: `${description2Styles.bottomSpacing}px`,
                    textAlign: description2Styles.textAlign as any
                  }}
                  autoFocus
                />
              ) : (
                <p 
                  className={`product-description ${description2Styles.isBold ? 'bold' : ''}`}
                  onClick={() => setIsEditingDescription2(true)}
                  style={{
                    fontSize: `${description2Styles.fontSize}px`,
                    fontFamily: description2Styles.fontFamily,
                    color: description2Styles.color,
                    fontWeight: description2Styles.isBold ? '700' : description2Styles.fontWeight,
                    marginBottom: `${description2Styles.bottomSpacing}px`,
                    textAlign: description2Styles.textAlign as any
                  }}
                  data-bold={description2Styles.isBold}
                  data-fontweight={description2Styles.fontWeight}
                >
                  {editableDescription2}
                </p>
              )}
              <button 
                className="product-description-edit-icon"
                onClick={() => setShowDescription2Editor(!showDescription2Editor)}
                title="Edit Description Style"
              >
                <HiPencil />
              </button>
          </div>
          </div>
        );
      
      case 'variants':
        return (
          <div
            key="variants"
            draggable
            onDragStart={(e) => handleDragStart(e, 'variants')}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'variants')}
            onDragEnd={handleDragEnd}
            className={`draggable-element ${isDragging ? 'dragging' : ''}`}
            style={elementStyle}
          >
          {variants.map((variant) => (
            <div key={variant.name} className="variant-section">
              <label className="variant-label">{variant.name}:</label>
              <div className="variant-options">
                {variant.options.map((option) => (
                  <button
                    key={option}
                    className={`variant-option ${selectedVariants[variant.name] === option ? 'selected' : ''}`}
                    onClick={() => handleVariantChange(variant.name, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          </div>
        );
      
      case 'quantity':
        return (
          <div
            key="quantity"
            draggable
            onDragStart={(e) => handleDragStart(e, 'quantity')}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'quantity')}
            onDragEnd={handleDragEnd}
            className={`draggable-element ${isDragging ? 'dragging' : ''}`}
            style={elementStyle}
          >
            <div className="quantity-section-container">
              <div 
                className="quantity-section"
                style={{
                  flexDirection: quantityStyles.layout === 'vertical' ? 'column' : 'row',
                  gap: `${quantityStyles.spacing}px`
                }}
              >
                <label 
                  className="quantity-label"
                  style={{
                    color: quantityStyles.textColor,
                    fontSize: `${quantityStyles.fontSize}px`,
                    fontWeight: quantityStyles.fontWeight
                  }}
                >
                  Quantity:
                </label>
            <div className="quantity-counter">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                    style={{
                      backgroundColor: quantityStyles.buttonColor,
                      color: quantityStyles.buttonTextColor,
                      borderRadius: `${quantityStyles.borderRadius}px`,
                      width: `${quantityStyles.buttonSize}px`,
                      height: `${quantityStyles.buttonSize}px`,
                      fontSize: `${quantityStyles.fontSize}px`,
                      border: quantityStyles.theme === 'outlined' ? `2px solid ${quantityStyles.buttonTextColor}` : 'none'
                    }}
                  >
                    -
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
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                    style={{
                      backgroundColor: quantityStyles.buttonColor,
                      color: quantityStyles.buttonTextColor,
                      borderRadius: `${quantityStyles.borderRadius}px`,
                      width: `${quantityStyles.buttonSize}px`,
                      height: `${quantityStyles.buttonSize}px`,
                      fontSize: `${quantityStyles.fontSize}px`,
                      border: quantityStyles.theme === 'outlined' ? `2px solid ${quantityStyles.buttonTextColor}` : 'none'
                    }}
                  >
                    +
                  </button>
            </div>
          </div>
              <button 
                className="quantity-edit-icon"
                onClick={() => setShowQuantityEditor(!showQuantityEditor)}
                title="Edit Quantity Counter Style"
              >
                <HiPencil />
              </button>
            </div>
          </div>
        );
      
      case 'addToCart':
        return (
          <div
            key="addToCart"
            draggable
            onDragStart={(e) => handleDragStart(e, 'addToCart')}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'addToCart')}
            onDragEnd={handleDragEnd}
            className={`draggable-element ${isDragging ? 'dragging' : ''}`}
            style={elementStyle}
          >
            <div 
              className="add-to-cart-container"
              style={{
                justifyContent: buttonStyles.alignment === 'center' ? 'center' : 
                               buttonStyles.alignment === 'right' ? 'flex-end' : 'flex-start'
              }}
            >
              <StyledButton
                styles={buttonStyles}
                onClick={() => handleAddToCart()}
                onMouseDown={(e) => e.stopPropagation()}
                className="add-to-cart-btn"
              />
              <button 
                className="add-to-cart-edit-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAddToCartEditor(!showAddToCartEditor);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                title="Edit Button Style"
              >
                <HiPencil />
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Handle clicking outside control panels to close them
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Check if click is outside control panels and buttons
      if (!target.closest('.control-panel') && 
          !target.closest('.system-control-icon') && 
          !target.closest('[data-drawer]') &&
          !target.closest('.drawer-section') &&
          !target.closest('.drawer-form-group') &&
          !target.closest('.drawer-range-container') &&
          !target.closest('.system-control-toggle') &&
          !target.closest('.system-control-tabs') &&
          !target.closest('.alignment-tab')) {
        setShowDimensionsControl(false);
        setShowColorControl(false);
        setShowVisibilityControl(false);
        setShowDescriptionDimensionsControl(false);
        setShowProductNameEditor(false);
        setShowDescriptionEditor(false);
        setShowDescription2Editor(false);
        setShowReviewEditor(false);
        setShowQuantityEditor(false);
        setShowPriceEditor(false);
        setShowAddToCartEditor(false);
      }
    };

    if (showDimensionsControl || showColorControl || showVisibilityControl || showDescriptionDimensionsControl || showProductNameEditor || showDescriptionEditor || showDescription2Editor || showReviewEditor || showQuantityEditor || showPriceEditor || showAddToCartEditor) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDimensionsControl, showColorControl, showVisibilityControl, showDescriptionDimensionsControl, showProductNameEditor, showDescriptionEditor, showDescription2Editor, showReviewEditor, showQuantityEditor, showPriceEditor, showAddToCartEditor]);

  return (
    <div className="product-page-card" style={{ 
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
        <button 
          className="system-control-icon flip"
          onClick={() => setCardsFlipped(!cardsFlipped)}
          title="Flip Cards Position"
        >
          <HiRefresh />
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
            <label>Image Card Width: {imageCardWidth}%</label>
            <input
              type="range"
              min="20"
              max="80"
              value={imageCardWidth}
              onChange={(e) => setImageCardWidth(parseInt(e.target.value))}
            />
          </div>
          <div className="control-group">
            <label>Details Card Width: {detailsCardWidth}%</label>
            <input
              type="range"
              min="20"
              max="80"
              value={detailsCardWidth}
              onChange={(e) => setDetailsCardWidth(parseInt(e.target.value))}
            />
          </div>
          <div className="control-group">
            <label>Cards Spacing: {cardsSpacing}px</label>
            <input
              type="range"
              min="0"
              max="48"
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

      <div className="product-page-card-content" style={{ gap: `${cardsSpacing}px` }}>
        {/* Product Images Card */}
        <div className="product-images-card" style={{ 
          backgroundColor: childrenCardColor,
          flex: `${imageCardWidth}%`,
          order: cardsFlipped ? 2 : 1
        }}>
          {/* Image Layout Control */}
          <div className="image-layout-control">
            <button 
              className={`layout-btn ${imageLayout === 'list' ? 'active' : ''}`}
              onClick={() => setImageLayout('list')}
              title="List Layout"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="4" width="18" height="2" rx="1"/>
                <rect x="3" y="11" width="12" height="2" rx="1"/>
                <rect x="3" y="18" width="18" height="2" rx="1"/>
              </svg>
            </button>
            <button 
              className={`layout-btn ${imageLayout === 'carousel' ? 'active' : ''}`}
              onClick={() => setImageLayout('carousel')}
              title="Carousel Layout"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="6" width="4" height="12" rx="1"/>
                <rect x="10" y="4" width="4" height="16" rx="1"/>
                <rect x="17" y="8" width="4" height="8" rx="1"/>
              </svg>
            </button>
            <button 
              className={`layout-btn ${imageLayout === 'column' ? 'active' : ''}`}
              onClick={() => setImageLayout('column')}
              title="Column Layout"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="4" width="4" height="16" rx="1"/>
                <rect x="10" y="4" width="4" height="16" rx="1"/>
                <rect x="17" y="4" width="4" height="16" rx="1"/>
              </svg>
            </button>
            <button 
              className={`layout-btn ${imageLayout === 'grid' ? 'active' : ''}`}
              onClick={() => setImageLayout('grid')}
              title="Grid Layout"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="8" height="8" rx="1"/>
                <rect x="13" y="3" width="8" height="8" rx="1"/>
                <rect x="3" y="13" width="8" height="8" rx="1"/>
                <rect x="13" y="13" width="8" height="8" rx="1"/>
              </svg>
            </button>
          </div>

          <div className="main-image">
            {images.length > 0 ? (
              <img src={images[0]} alt={productName} />
            ) : (
              <div className="no-image-placeholder">
                <span>📷</span>
                <p>No image available</p>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className={`thumbnail-images ${imageLayout}`}>
              {images.slice(1, 5).map((image, index) => (
                <img key={index} src={image} alt={`${productName} ${index + 2}`} />
              ))}
            </div>
          )}
        </div>

        {/* Product Details Card */}
        <div className="product-details-card" style={{ 
          backgroundColor: childrenCardColor,
          flex: `${detailsCardWidth}%`,
          order: cardsFlipped ? 1 : 2
        }}>

          {/* Visibility Control Panel */}
          {showVisibilityControl && (
            <div className="control-panel visibility-panel">
              <h4>Element Visibility</h4>
              <div className="visibility-controls">
                {Object.entries(elementVisibility).map(([elementId, isVisible]) => (
                  <div key={elementId} className="visibility-item">
                    <label className="visibility-label">
                      <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={() => toggleElementVisibility(elementId)}
                      />
                      <span className="visibility-text">
                        {elementId === 'name' ? 'Product Name' :
                         elementId === 'rating' ? 'Star Rating' :
                         elementId === 'price' ? 'Price' :
                         elementId === 'description' ? 'Description' :
                         elementId === 'description2' ? 'Description 2' :
                         elementId === 'variants' ? 'Variants' :
                         elementId === 'quantity' ? 'Quantity' :
                         elementId === 'addToCart' ? 'Add to Cart' : elementId}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dimensions Control Panel */}
          {showDescriptionDimensionsControl && (
            <div className="control-panel dimensions-panel">
              <h4>Element Dimensions</h4>
              <div className="dimensions-controls">
                <div className="control-item">
                  <label className="control-label">
                    Element Spacing: {elementSpacing}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={elementSpacing}
                    onChange={(e) => setElementSpacing(Number(e.target.value))}
                    className="control-range"
                  />
                </div>
                
                <div className="control-item">
                  <label className="control-label">
                    Horizontal Padding: {horizontalPadding}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={horizontalPadding}
                    onChange={(e) => setHorizontalPadding(Number(e.target.value))}
                    className="control-range"
                  />
                </div>
                
                <div className="control-item">
                  <label className="control-label">
                    Vertical Padding: {verticalPadding}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={verticalPadding}
                    onChange={(e) => setVerticalPadding(Number(e.target.value))}
                    className="control-range"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="product-info">
            {elementOrder.map((elementId) => renderElement(elementId))}
          </div>
        </div>

        {/* Product Name Editor Drawer */}
        <SystemDrawer
          isOpen={showProductNameEditor}
          onClose={() => setShowProductNameEditor(false)}
          title="Product Name Editor"
          width={350}
          position="right"
          pushContent={true}
        >
          {/* Font Size */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Size</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Size</span>
                <span className="drawer-range-value">{productNameStyles.fontSize}px</span>
              </div>
              <input
                type="range"
                min="16"
                max="48"
                value={productNameStyles.fontSize}
                onChange={(e) => updateProductNameStyle('fontSize', Number(e.target.value))}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Font Family */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Family</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Choose Font</label>
              <select
                value={productNameStyles.fontFamily}
                onChange={(e) => updateProductNameStyle('fontFamily', e.target.value)}
                className="drawer-form-select"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="Inter">Inter</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
              </select>
            </div>
          </div>

          {/* Color */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Text Color</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Choose Color</label>
              <input
                type="color"
                value={productNameStyles.color}
                onChange={(e) => updateProductNameStyle('color', e.target.value)}
                className="drawer-form-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Font Weight */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Weight</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Choose Weight</label>
              <select
                value={productNameStyles.fontWeight}
                onChange={(e) => updateProductNameStyle('fontWeight', e.target.value)}
                className="drawer-form-select"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
              </select>
            </div>
          </div>

          {/* Bottom Spacing */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Bottom Spacing</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Spacing</span>
                <span className="drawer-range-value">{productNameStyles.bottomSpacing}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={productNameStyles.bottomSpacing}
                onChange={(e) => updateProductNameStyle('bottomSpacing', Number(e.target.value))}
                className="drawer-range"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Bold Toggle */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Bold Text</h4>
            <div className="drawer-form-group">
              <label className="toggle-label">
                <span>Enable Bold</span>
                <div 
                  className={`system-control-toggle ${productNameStyles.isBold ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateProductNameStyle('isBold', !productNameStyles.isBold);
                    updateProductNameStyle('fontWeight', !productNameStyles.isBold ? '700' : '400');
                  }}
                >
                  <div className="toggle-slider"></div>
                </div>
              </label>
            </div>
          </div>

          {/* Text Alignment */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Text Alignment</h4>
            <div className="alignment-tabs">
              <button
                className={`alignment-tab ${productNameStyles.textAlign === 'left' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  updateProductNameStyle('textAlign', 'left');
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/>
                </svg>
                Left
              </button>
              <button
                className={`alignment-tab ${productNameStyles.textAlign === 'center' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  updateProductNameStyle('textAlign', 'center');
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 19h18v2H3v-2zm3-6h12v2H6v-2zm-3-6h18v2H3v-2zm3-6h12v2H6v-2z"/>
                </svg>
                Center
              </button>
              <button
                className={`alignment-tab ${productNameStyles.textAlign === 'right' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  updateProductNameStyle('textAlign', 'right');
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/>
                </svg>
                Right
              </button>
            </div>
          </div>
        </SystemDrawer>

        {/* Product Description Editor Drawer */}
        <SystemDrawer
          isOpen={showDescriptionEditor}
          onClose={() => setShowDescriptionEditor(false)}
          title="Product Description Editor"
          width={350}
          position="right"
          pushContent={true}
        >
          {/* Font Size */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Size</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Size</span>
                <span className="drawer-range-value">{descriptionStyles.fontSize}px</span>
              </div>
              <input
                type="range"
                min="12" max="32" value={descriptionStyles.fontSize}
                onChange={(e) => setDescriptionStyles({...descriptionStyles, fontSize: Number(e.target.value)})}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Font Family */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Family</h4>
            <div className="drawer-form-group">
              <select
                value={descriptionStyles.fontFamily}
                onChange={(e) => setDescriptionStyles({...descriptionStyles, fontFamily: e.target.value})}
                className="drawer-select" onClick={(e) => e.stopPropagation()}
              >
                <option value="Inter">Inter</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
              </select>
            </div>
          </div>

          {/* Text Color */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Text Color</h4>
            <div className="drawer-form-group">
              <input
                type="color"
                value={descriptionStyles.color}
                onChange={(e) => setDescriptionStyles({...descriptionStyles, color: e.target.value})}
                className="drawer-color-input" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Font Weight */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Weight</h4>
            <div className="drawer-form-group">
              <select
                value={descriptionStyles.fontWeight}
                onChange={(e) => setDescriptionStyles({...descriptionStyles, fontWeight: e.target.value})}
                className="drawer-select" onClick={(e) => e.stopPropagation()}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
              </select>
            </div>
          </div>

          {/* Bottom Spacing */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Bottom Spacing</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Spacing</span>
                <span className="drawer-range-value">{descriptionStyles.bottomSpacing}px</span>
              </div>
              <input
                type="range"
                min="0" max="40" value={descriptionStyles.bottomSpacing}
                onChange={(e) => setDescriptionStyles({...descriptionStyles, bottomSpacing: Number(e.target.value)})}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Bold Toggle */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Bold Text</h4>
            <div 
              className="system-control-toggle"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Bold toggle changed:', !descriptionStyles.isBold);
                setDescriptionStyles({...descriptionStyles, isBold: !descriptionStyles.isBold});
              }}
            >
              <div className={`toggle-slider ${descriptionStyles.isBold ? 'active' : ''}`}></div>
              <span className="toggle-text">{descriptionStyles.isBold ? 'Bold' : 'Normal'}</span>
            </div>
          </div>

          {/* Text Alignment */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Text Alignment</h4>
            <div className="alignment-tabs">
              <button
                className={`alignment-tab ${descriptionStyles.textAlign === 'left' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setDescriptionStyles({...descriptionStyles, textAlign: 'left'}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/></svg>
                Left
              </button>
              <button
                className={`alignment-tab ${descriptionStyles.textAlign === 'center' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setDescriptionStyles({...descriptionStyles, textAlign: 'center'}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm3-6h12v2H6v-2zm-3-6h18v2H3v-2zm3-6h12v2H6v-2z"/></svg>
                Center
              </button>
              <button
                className={`alignment-tab ${descriptionStyles.textAlign === 'right' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setDescriptionStyles({...descriptionStyles, textAlign: 'right'}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/></svg>
                Right
              </button>
            </div>
          </div>
        </SystemDrawer>

        {/* Second Product Description Editor Drawer */}
        <SystemDrawer
          isOpen={showDescription2Editor}
          onClose={() => setShowDescription2Editor(false)}
          title="Second Description Editor"
          width={350}
          position="right"
          pushContent={true}
        >
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Size</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Size</span>
                <span className="drawer-range-value">{description2Styles.fontSize}px</span>
              </div>
              <input
                type="range"
                min="12" max="24" value={description2Styles.fontSize}
                onChange={(e) => setDescription2Styles({...description2Styles, fontSize: Number(e.target.value)})}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Family</h4>
            <div className="drawer-form-group">
              <select
                value={description2Styles.fontFamily}
                onChange={(e) => setDescription2Styles({...description2Styles, fontFamily: e.target.value})}
                className="drawer-select" onClick={(e) => e.stopPropagation()}
              >
                <option value="Inter">Inter</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
              </select>
            </div>
          </div>

          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Text Color</h4>
            <div className="drawer-form-group">
              <input
                type="color"
                value={description2Styles.color}
                onChange={(e) => setDescription2Styles({...description2Styles, color: e.target.value})}
                className="drawer-color-input" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Weight</h4>
            <div className="drawer-form-group">
              <select
                value={description2Styles.fontWeight}
                onChange={(e) => setDescription2Styles({...description2Styles, fontWeight: e.target.value})}
                className="drawer-select" onClick={(e) => e.stopPropagation()}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
              </select>
            </div>
          </div>

          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Bottom Spacing</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Spacing</span>
                <span className="drawer-range-value">{description2Styles.bottomSpacing}px</span>
              </div>
              <input
                type="range"
                min="0" max="32" value={description2Styles.bottomSpacing}
                onChange={(e) => setDescription2Styles({...description2Styles, bottomSpacing: Number(e.target.value)})}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Bold Text</h4>
            <div className="system-control-toggle">
              <div 
                className={`toggle-slider ${description2Styles.isBold ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setDescription2Styles({...description2Styles, isBold: !description2Styles.isBold});
                }}
              ></div>
              <span className="toggle-text">{description2Styles.isBold ? 'Bold' : 'Normal'}</span>
            </div>
          </div>

          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Text Alignment</h4>
            <div className="alignment-tabs">
              <button
                className={`alignment-tab ${description2Styles.textAlign === 'left' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setDescription2Styles({...description2Styles, textAlign: 'left'}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/></svg>
                Left
              </button>
              <button
                className={`alignment-tab ${description2Styles.textAlign === 'center' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setDescription2Styles({...description2Styles, textAlign: 'center'}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm3-6h12v2H6v-2zm-3-6h18v2H3v-2zm3-6h12v2H6v-2z"/></svg>
                Center
              </button>
              <button
                className={`alignment-tab ${description2Styles.textAlign === 'right' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setDescription2Styles({...description2Styles, textAlign: 'right'}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/></svg>
                Right
              </button>
            </div>
          </div>
        </SystemDrawer>

        {/* Review Editor Drawer */}
        <SystemDrawer
          isOpen={showReviewEditor}
          onClose={() => setShowReviewEditor(false)}
          title="Review Style Editor"
          width={400}
          position="right"
          pushContent={true}
        >
          {/* Theme Selection */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Review Themes</h4>
            <div className="theme-grid">
              <button
                className={`theme-card ${reviewStyles.theme === 'default' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setReviewStyles({...reviewStyles, theme: 'default', starColor: '#fbbf24', textColor: '#6b7280'});
                }}
              >
                <div className="theme-preview">
                  <div className="theme-stars" style={{color: '#fbbf24'}}>★★★★★</div>
                  <div className="theme-text" style={{color: '#6b7280'}}>Default</div>
                </div>
              </button>
              
              <button
                className={`theme-card ${reviewStyles.theme === 'gold' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setReviewStyles({...reviewStyles, theme: 'gold', starColor: '#f59e0b', textColor: '#92400e'});
                }}
              >
                <div className="theme-preview">
                  <div className="theme-stars" style={{color: '#f59e0b'}}>★★★★★</div>
                  <div className="theme-text" style={{color: '#92400e'}}>Gold</div>
                </div>
              </button>
              
              <button
                className={`theme-card ${reviewStyles.theme === 'red' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setReviewStyles({...reviewStyles, theme: 'red', starColor: '#ef4444', textColor: '#dc2626'});
                }}
              >
                <div className="theme-preview">
                  <div className="theme-stars" style={{color: '#ef4444'}}>★★★★★</div>
                  <div className="theme-text" style={{color: '#dc2626'}}>Red</div>
                </div>
              </button>
              
              <button
                className={`theme-card ${reviewStyles.theme === 'green' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setReviewStyles({...reviewStyles, theme: 'green', starColor: '#10b981', textColor: '#059669'});
                }}
              >
                <div className="theme-preview">
                  <div className="theme-stars" style={{color: '#10b981'}}>★★★★★</div>
                  <div className="theme-text" style={{color: '#059669'}}>Green</div>
                </div>
              </button>
              
              <button
                className={`theme-card ${reviewStyles.theme === 'blue' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setReviewStyles({...reviewStyles, theme: 'blue', starColor: '#3b82f6', textColor: '#2563eb'});
                }}
              >
                <div className="theme-preview">
                  <div className="theme-stars" style={{color: '#3b82f6'}}>★★★★★</div>
                  <div className="theme-text" style={{color: '#2563eb'}}>Blue</div>
                </div>
              </button>
              
              <button
                className={`theme-card ${reviewStyles.theme === 'purple' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setReviewStyles({...reviewStyles, theme: 'purple', starColor: '#8b5cf6', textColor: '#7c3aed'});
                }}
              >
                <div className="theme-preview">
                  <div className="theme-stars" style={{color: '#8b5cf6'}}>★★★★★</div>
                  <div className="theme-text" style={{color: '#7c3aed'}}>Purple</div>
                </div>
              </button>
            </div>
          </div>

          {/* Star Color Custom */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Custom Star Color</h4>
            <div className="drawer-form-group">
              <input
                type="color"
                value={reviewStyles.starColor}
                onChange={(e) => setReviewStyles({...reviewStyles, starColor: e.target.value})}
                className="drawer-color-input" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Star Size */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Star Size</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Size</span>
                <span className="drawer-range-value">{reviewStyles.starSize}px</span>
              </div>
              <input
                type="range"
                min="12" max="32" value={reviewStyles.starSize}
                onChange={(e) => setReviewStyles({...reviewStyles, starSize: Number(e.target.value)})}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Text Color */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Text Color</h4>
            <div className="drawer-form-group">
              <input
                type="color"
                value={reviewStyles.textColor}
                onChange={(e) => setReviewStyles({...reviewStyles, textColor: e.target.value})}
                className="drawer-color-input" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Font Size */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Size</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Size</span>
                <span className="drawer-range-value">{reviewStyles.fontSize}px</span>
              </div>
              <input
                type="range"
                min="10" max="20" value={reviewStyles.fontSize}
                onChange={(e) => setReviewStyles({...reviewStyles, fontSize: Number(e.target.value)})}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Font Weight */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Weight</h4>
            <div className="drawer-form-group">
              <select
                value={reviewStyles.fontWeight}
                onChange={(e) => setReviewStyles({...reviewStyles, fontWeight: e.target.value})}
                className="drawer-select" onClick={(e) => e.stopPropagation()}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </div>
          </div>

          {/* Spacing */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Spacing</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Gap</span>
                <span className="drawer-range-value">{reviewStyles.spacing}px</span>
              </div>
              <input
                type="range"
                min="4" max="20" value={reviewStyles.spacing}
                onChange={(e) => setReviewStyles({...reviewStyles, spacing: Number(e.target.value)})}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Layout */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Layout</h4>
            <div className="layout-tabs">
              <button
                className={`layout-tab ${reviewStyles.layout === 'horizontal' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setReviewStyles({...reviewStyles, layout: 'horizontal'}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 7h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/></svg>
                Horizontal
              </button>
              <button
                className={`layout-tab ${reviewStyles.layout === 'vertical' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setReviewStyles({...reviewStyles, layout: 'vertical'}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 3v18h2V3H7zm4 0v18h2V3h-2zm4 0v18h2V3h-2z"/></svg>
                Vertical
              </button>
            </div>
          </div>
        </SystemDrawer>

        {/* Quantity Counter Editor Drawer */}
        <SystemDrawer
          isOpen={showQuantityEditor}
          onClose={() => setShowQuantityEditor(false)}
          title="Quantity Counter Editor"
          width={400}
          position="right"
          pushContent={true}
        >
          {/* Counter Types */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Counter Types</h4>
            <div className="theme-grid">
              <button
                className={`theme-card ${quantityStyles.theme === 'default' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantityStyles({...quantityStyles, theme: 'default', buttonColor: '#ef4444', buttonTextColor: '#ffffff', textColor: '#374151', borderRadius: 8, buttonSize: 40});
                }}
              >
                <div className="theme-preview">
                  <div className="theme-counter">[- 1 +]</div>
                  <div className="theme-text">Standard</div>
                </div>
              </button>
              
              <button
                className={`theme-card ${quantityStyles.theme === 'rounded' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantityStyles({...quantityStyles, theme: 'rounded', buttonColor: '#3b82f6', buttonTextColor: '#ffffff', textColor: '#1e40af', borderRadius: 20, buttonSize: 40});
                }}
              >
                <div className="theme-preview">
                  <div className="theme-counter">( 1 )</div>
                  <div className="theme-text">Rounded</div>
                </div>
              </button>
              
              <button
                className={`theme-card ${quantityStyles.theme === 'minimal' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantityStyles({...quantityStyles, theme: 'minimal', buttonColor: '#f3f4f6', buttonTextColor: '#374151', textColor: '#374151', borderRadius: 4, buttonSize: 36});
                }}
              >
                <div className="theme-preview">
                  <div className="theme-counter">- 1 +</div>
                  <div className="theme-text">Minimal</div>
                </div>
              </button>
              
              <button
                className={`theme-card ${quantityStyles.theme === 'bold' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantityStyles({...quantityStyles, theme: 'bold', buttonColor: '#1f2937', buttonTextColor: '#ffffff', textColor: '#1f2937', borderRadius: 8, buttonSize: 44, fontWeight: '700'});
                }}
              >
                <div className="theme-preview">
                  <div className="theme-counter">[- 1 +]</div>
                  <div className="theme-text">Bold</div>
                </div>
              </button>
              
              <button
                className={`theme-card ${quantityStyles.theme === 'outlined' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantityStyles({...quantityStyles, theme: 'outlined', buttonColor: 'transparent', buttonTextColor: '#ef4444', textColor: '#374151', borderRadius: 8, buttonSize: 40});
                }}
              >
                <div className="theme-preview">
                  <div className="theme-counter">[- 1 +]</div>
                  <div className="theme-text">Outlined</div>
                </div>
              </button>
              
              <button
                className={`theme-card ${quantityStyles.theme === 'compact' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantityStyles({...quantityStyles, theme: 'compact', buttonColor: '#ef4444', buttonTextColor: '#ffffff', textColor: '#374151', borderRadius: 6, buttonSize: 32, fontSize: 14});
                }}
              >
                <div className="theme-preview">
                  <div className="theme-counter">-1+</div>
                  <div className="theme-text">Compact</div>
                </div>
              </button>
            </div>
          </div>

          {/* Button Color Custom */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Button Color</h4>
            <div className="drawer-form-group">
              <input
                type="color"
                value={quantityStyles.buttonColor}
                onChange={(e) => setQuantityStyles({...quantityStyles, buttonColor: e.target.value})}
                className="drawer-color-input" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Button Text Color */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Button Text Color</h4>
            <div className="drawer-form-group">
              <input
                type="color"
                value={quantityStyles.buttonTextColor}
                onChange={(e) => setQuantityStyles({...quantityStyles, buttonTextColor: e.target.value})}
                className="drawer-color-input" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Text Color */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Text Color</h4>
            <div className="drawer-form-group">
              <input
                type="color"
                value={quantityStyles.textColor}
                onChange={(e) => setQuantityStyles({...quantityStyles, textColor: e.target.value})}
                className="drawer-color-input" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Font Size */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Size</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Size</span>
                <span className="drawer-range-value">{quantityStyles.fontSize}px</span>
              </div>
              <input
                type="range"
                min="12" max="24" value={quantityStyles.fontSize}
                onChange={(e) => setQuantityStyles({...quantityStyles, fontSize: Number(e.target.value)})}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Font Weight */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Font Weight</h4>
            <div className="drawer-form-group">
              <select
                value={quantityStyles.fontWeight}
                onChange={(e) => setQuantityStyles({...quantityStyles, fontWeight: e.target.value})}
                className="drawer-select" onClick={(e) => e.stopPropagation()}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </div>
          </div>

          {/* Border Radius */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Border Radius</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Radius</span>
                <span className="drawer-range-value">{quantityStyles.borderRadius}px</span>
              </div>
              <input
                type="range"
                min="0" max="20" value={quantityStyles.borderRadius}
                onChange={(e) => setQuantityStyles({...quantityStyles, borderRadius: Number(e.target.value)})}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Button Size */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Button Size</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Size</span>
                <span className="drawer-range-value">{quantityStyles.buttonSize}px</span>
              </div>
              <input
                type="range"
                min="32" max="60" value={quantityStyles.buttonSize}
                onChange={(e) => setQuantityStyles({...quantityStyles, buttonSize: Number(e.target.value)})}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Spacing */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Spacing</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Gap</span>
                <span className="drawer-range-value">{quantityStyles.spacing}px</span>
              </div>
              <input
                type="range"
                min="4" max="20" value={quantityStyles.spacing}
                onChange={(e) => setQuantityStyles({...quantityStyles, spacing: Number(e.target.value)})}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Layout */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Layout</h4>
            <div className="layout-tabs">
              <button
                className={`layout-tab ${quantityStyles.layout === 'horizontal' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setQuantityStyles({...quantityStyles, layout: 'horizontal'}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 7h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/></svg>
                Horizontal
              </button>
              <button
                className={`layout-tab ${quantityStyles.layout === 'vertical' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setQuantityStyles({...quantityStyles, layout: 'vertical'}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 3v18h2V3H7zm4 0v18h2V3h-2zm4 0v18h2V3h-2z"/></svg>
                Vertical
              </button>
            </div>
          </div>
        </SystemDrawer>

        {/* Price Editor Drawer */}
        <SystemDrawer
          isOpen={showPriceEditor}
          onClose={() => setShowPriceEditor(false)}
          title="Price Style Editor"
          width={400}
          position="right"
          pushContent={true}
        >
          {/* Price Tabs */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <div className="system-control-tabs">
              <button
                className={`system-control-tab ${activePriceTab === 'current' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setActivePriceTab('current'); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                Current Price
              </button>
              <button
                className={`system-control-tab ${activePriceTab === 'before' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setActivePriceTab('before'); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                Before Price
              </button>
              <button
                className={`system-control-tab ${activePriceTab === 'save' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setActivePriceTab('save'); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Save
              </button>
            </div>
          </div>

          {/* Current Price Controls */}
          {activePriceTab === 'current' && (
            <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
              <h4 className="drawer-section-title">Current Price</h4>
            
            {/* Show/Hide Toggle */}
            <div className="system-control-toggle">
              <div 
                className={`toggle-slider ${priceStyles.currentPrice.show ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPriceStyles({
                    ...priceStyles,
                    currentPrice: { ...priceStyles.currentPrice, show: !priceStyles.currentPrice.show }
                  });
                }}
              ></div>
              <span className="toggle-text">{priceStyles.currentPrice.show ? 'Show' : 'Hide'}</span>
            </div>

            {/* Font Size */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Font Size</span>
                <span className="drawer-range-value">{priceStyles.currentPrice.fontSize}px</span>
              </div>
              <input
                type="range"
                min="16" max="36" value={priceStyles.currentPrice.fontSize}
                onChange={(e) => setPriceStyles({
                  ...priceStyles,
                  currentPrice: { ...priceStyles.currentPrice, fontSize: Number(e.target.value) }
                })}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Font Weight */}
            <div className="drawer-form-group">
              <select
                value={priceStyles.currentPrice.fontWeight}
                onChange={(e) => setPriceStyles({
                  ...priceStyles,
                  currentPrice: { ...priceStyles.currentPrice, fontWeight: e.target.value }
                })}
                className="drawer-select" onClick={(e) => e.stopPropagation()}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
              </select>
            </div>

            {/* Text Alignment */}
            <div className="alignment-tabs">
              <button
                className={`alignment-tab ${priceStyles.currentPrice.textAlign === 'left' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, currentPrice: {...priceStyles.currentPrice, textAlign: 'left'}}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/></svg>
                Left
              </button>
              <button
                className={`alignment-tab ${priceStyles.currentPrice.textAlign === 'center' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, currentPrice: {...priceStyles.currentPrice, textAlign: 'center'}}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm3-6h12v2H6v-2zm-3-6h18v2H3v-2zm3-6h12v2H6v-2z"/></svg>
                Center
              </button>
              <button
                className={`alignment-tab ${priceStyles.currentPrice.textAlign === 'right' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, currentPrice: {...priceStyles.currentPrice, textAlign: 'right'}}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/></svg>
                Right
              </button>
            </div>

            {/* Text Color */}
            <div className="drawer-form-group">
              <input
                type="color"
                value={priceStyles.currentPrice.color}
                onChange={(e) => setPriceStyles({
                  ...priceStyles,
                  currentPrice: { ...priceStyles.currentPrice, color: e.target.value }
                })}
                className="drawer-color-input" onClick={(e) => e.stopPropagation()}
              />
            </div>
            </div>
          )}

          {/* Before Price Controls */}
          {activePriceTab === 'before' && (
            <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
              <h4 className="drawer-section-title">Before Price</h4>
            
            {/* Show/Hide Toggle */}
            <div className="system-control-toggle">
              <div 
                className={`toggle-slider ${priceStyles.beforePrice.show ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPriceStyles({
                    ...priceStyles,
                    beforePrice: { ...priceStyles.beforePrice, show: !priceStyles.beforePrice.show }
                  });
                }}
              ></div>
              <span className="toggle-text">{priceStyles.beforePrice.show ? 'Show' : 'Hide'}</span>
            </div>

            {/* Font Size */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Font Size</span>
                <span className="drawer-range-value">{priceStyles.beforePrice.fontSize}px</span>
              </div>
              <input
                type="range"
                min="12" max="28" value={priceStyles.beforePrice.fontSize}
                onChange={(e) => setPriceStyles({
                  ...priceStyles,
                  beforePrice: { ...priceStyles.beforePrice, fontSize: Number(e.target.value) }
                })}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Font Weight */}
            <div className="drawer-form-group">
              <select
                value={priceStyles.beforePrice.fontWeight}
                onChange={(e) => setPriceStyles({
                  ...priceStyles,
                  beforePrice: { ...priceStyles.beforePrice, fontWeight: e.target.value }
                })}
                className="drawer-select" onClick={(e) => e.stopPropagation()}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
              </select>
            </div>

            {/* Text Alignment */}
            <div className="alignment-tabs">
              <button
                className={`alignment-tab ${priceStyles.beforePrice.textAlign === 'left' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, beforePrice: {...priceStyles.beforePrice, textAlign: 'left'}}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/></svg>
                Left
              </button>
              <button
                className={`alignment-tab ${priceStyles.beforePrice.textAlign === 'center' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, beforePrice: {...priceStyles.beforePrice, textAlign: 'center'}}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm3-6h12v2H6v-2zm-3-6h18v2H3v-2zm3-6h12v2H6v-2z"/></svg>
                Center
              </button>
              <button
                className={`alignment-tab ${priceStyles.beforePrice.textAlign === 'right' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, beforePrice: {...priceStyles.beforePrice, textAlign: 'right'}}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/></svg>
                Right
              </button>
            </div>

            {/* Text Color */}
            <div className="drawer-form-group">
              <input
                type="color"
                value={priceStyles.beforePrice.color}
                onChange={(e) => setPriceStyles({
                  ...priceStyles,
                  beforePrice: { ...priceStyles.beforePrice, color: e.target.value }
                })}
                className="drawer-color-input" onClick={(e) => e.stopPropagation()}
              />
            </div>
            </div>
          )}

          {/* Save Controls */}
          {activePriceTab === 'save' && (
            <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
              <h4 className="drawer-section-title">Save</h4>
            
            {/* Show/Hide Toggle */}
            <div className="system-control-toggle">
              <div 
                className={`toggle-slider ${priceStyles.save.show ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPriceStyles({
                    ...priceStyles,
                    save: { ...priceStyles.save, show: !priceStyles.save.show }
                  });
                }}
              ></div>
              <span className="toggle-text">{priceStyles.save.show ? 'Show' : 'Hide'}</span>
            </div>

            {/* Font Size */}
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Font Size</span>
                <span className="drawer-range-value">{priceStyles.save.fontSize}px</span>
              </div>
              <input
                type="range"
                min="10" max="20" value={priceStyles.save.fontSize}
                onChange={(e) => setPriceStyles({
                  ...priceStyles,
                  save: { ...priceStyles.save, fontSize: Number(e.target.value) }
                })}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Font Weight */}
            <div className="drawer-form-group">
              <select
                value={priceStyles.save.fontWeight}
                onChange={(e) => setPriceStyles({
                  ...priceStyles,
                  save: { ...priceStyles.save, fontWeight: e.target.value }
                })}
                className="drawer-select" onClick={(e) => e.stopPropagation()}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
              </select>
            </div>

            {/* Text Alignment */}
            <div className="alignment-tabs">
              <button
                className={`alignment-tab ${priceStyles.save.textAlign === 'left' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, save: {...priceStyles.save, textAlign: 'left'}}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/></svg>
                Left
              </button>
              <button
                className={`alignment-tab ${priceStyles.save.textAlign === 'center' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, save: {...priceStyles.save, textAlign: 'center'}}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm3-6h12v2H6v-2zm-3-6h18v2H3v-2zm3-6h12v2H6v-2z"/></svg>
                Center
              </button>
              <button
                className={`alignment-tab ${priceStyles.save.textAlign === 'right' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setPriceStyles({...priceStyles, save: {...priceStyles.save, textAlign: 'right'}}); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/></svg>
                Right
              </button>
            </div>

            {/* Text Color */}
            <div className="drawer-form-group">
              <input
                type="color"
                value={priceStyles.save.color}
                onChange={(e) => setPriceStyles({
                  ...priceStyles,
                  save: { ...priceStyles.save, color: e.target.value }
                })}
                className="drawer-color-input" onClick={(e) => e.stopPropagation()}
              />
            </div>
            </div>
          )}

          {/* Horizontal Spacing */}
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Horizontal Spacing</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Spacing</span>
                <span className="drawer-range-value">{priceStyles.horizontalSpacing}px</span>
              </div>
              <input
                type="range"
                min="4" max="24" value={priceStyles.horizontalSpacing}
                onChange={(e) => setPriceStyles({...priceStyles, horizontalSpacing: Number(e.target.value)})}
                className="drawer-range" onClick={(e) => e.stopPropagation()}
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
    </div>
  );
};

export default ProductPageCard;
