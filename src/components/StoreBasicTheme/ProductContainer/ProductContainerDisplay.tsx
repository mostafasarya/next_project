'use client';

import React, { useState } from 'react';
import { HiStar, HiMinus, HiPlus, HiPencil, HiEye, HiChevronDown, HiViewBoards, HiArrowsExpand } from 'react-icons/hi';
import StyleTextUser from '../../EditorControls/PropertiesManagement/StyleTextUser';
import StyleButton, { ButtonStyles, defaultButtonStyles } from '../../EditorControls/PropertiesManagement/StyleButton';
import StyledButton from '../../StyledButton';
import SystemDrawer from '../../EditorControls/PropertiesManagement/SystemDrawer';
import StylePriceEditor from '../../EditorControls/PropertiesManagement/StylePriceEditor';
import StyleQuantityCounterEditor from '../../EditorControls/PropertiesManagement/StyleQuantityCounterEditor';
import StyleVariantEditor from '../../EditorControls/PropertiesManagement/StyleVariantEditor';
import { useGlobalDrawer } from '../../EditorControls/PropertiesManagement/GlobalDrawerProvider';
import './ProductContainerDisplay.css';
import '../../EditorControls/PropertiesManagement/SystemControlIcons.css';

interface ProductContainerDisplayProps {
  className?: string;
  productData?: {
    name: string;
    price: number;
    beforePrice?: number;
    saveAmount?: number;
    rating: number;
    reviewCount: number;
    description1: string;
    description2: string;
    image?: string;
    variants: Array<{
      name: string;
      options: string[];
    }>;
  };
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
  variants: Array<{
    name: string;
    options: string[];
  }>;
}

const ProductContainerDisplay: React.FC<ProductContainerDisplayProps> = ({ 
  className = '',
  productData
}) => {
  // Global drawer hook
  const { openDrawer, closeDrawer } = useGlobalDrawer();
  // Default product data
  const defaultProductData = {
    name: 'Julie Ø12 Planter & Saucer',
    price: 21.00,
    originalPrice: 28.00,
    rating: 5,
    reviewCount: 42,
    description1: 'Handcrafted ceramic planter with natural speckled finish',
    description2: 'Perfect for small plants and succulents. Includes matching saucer.',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80',
    variants: [
      { name: 'Color', options: ['Red', 'Blue', 'Green', 'Yellow'] },
      { name: 'Size', options: ['XS', 'S', 'M', 'L', 'XL'] }
    ]
  };

  // Product data - use external data if provided, otherwise use default
  const [product] = useState<ProductData>({
    name: productData?.name || defaultProductData.name,
    price: productData?.price || defaultProductData.price,
    originalPrice: productData?.beforePrice || defaultProductData.originalPrice,
    rating: productData?.rating || defaultProductData.rating,
    reviewCount: productData?.reviewCount || defaultProductData.reviewCount,
    description1: productData?.description1 || defaultProductData.description1,
    description2: productData?.description2 || defaultProductData.description2,
    imageUrl: productData?.image || defaultProductData.imageUrl,
    variants: productData?.variants || defaultProductData.variants
  });

  // Component state
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{[key: string]: string}>({});

  // Initialize selected variants with first option of each variant
  React.useEffect(() => {
    const initialVariants: {[key: string]: string} = {};
    product.variants.forEach(variant => {
      if (variant.options.length > 0) {
        initialVariants[variant.name] = variant.options[0];
      }
    });
    setSelectedVariants(initialVariants);
  }, [product.variants]);

  // Editor states  
  const [editableProductName, setEditableProductName] = useState(product.name);
  const [productNameStyles, setProductNameStyles] = useState({
    fontSize: 18,
    fontFamily: 'Inter, sans-serif',
    color: '#111827',
    fontWeight: '600',
    bottomSpacing: 0,
    textAlign: 'left'
  });

  const [descriptionStyles, setDescriptionStyles] = useState({
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    color: '#374151',
    fontWeight: '500',
    bottomSpacing: 0,
    textAlign: 'left'
  });

  const [description2Styles, setDescription2Styles] = useState({
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    color: '#6b7280',
    fontWeight: '400',
    bottomSpacing: 0,
    textAlign: 'left'
  });

  // Drag and Drop state for all elements
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  const [elementOrder, setElementOrder] = useState([
    'productName', 
    'price', 
    'rating', 
    'description1', 
    'description2', 
    'quantity', 
    'sizeVariants', 
    'addToCartButton'
  ]);

  const [priceStyles, setPriceStyles] = useState({
    currentPrice: {
      show: true,
      fontSize: 24,
      fontWeight: '700',
      fontFamily: 'Inter, sans-serif',
      textAlign: 'left',
      color: '#28a745'
    },
    beforePrice: {
      show: false,
      fontSize: 18,
      fontWeight: '400',
      fontFamily: 'Inter, sans-serif',
      textAlign: 'left',
      color: '#6c757d'
    },
    save: {
      show: false,
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Inter, sans-serif',
      textAlign: 'left',
      color: '#dc3545'
    },
    horizontalSpacing: 12,
    bottomSpacing: 0
  });

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

  const [quantityStyles, setQuantityStyles] = useState({
    theme: 'default',
    buttonColor: '#f3f4f6',
    buttonTextColor: '#374151',
    textColor: '#374151',
    fontSize: 16,
    fontWeight: '500',
    borderRadius: 4,
    buttonSize: 40,
    spacing: 8,
    layout: 'horizontal',
    bottomSpacing: 0
  });

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

  // Variant editor state  
  const [variantStyles, setVariantStyles] = useState({
    labelFontSize: 16,
    labelFontWeight: '600',
    labelColor: '#374151',
    labelSpacing: 8,
    optionFontSize: 10,
    optionFontWeight: '400',
    optionPadding: 4,
    optionBorderRadius: 20,
    optionSpacing: 8,
    optionBackgroundColor: '#ffffff',
    optionBorderColor: '#e5e7eb',
    optionTextColor: '#374151',
    selectedBackgroundColor: '#a81313',
    selectedBorderColor: '#a81313',
    selectedTextColor: '#ffffff',
    hoverBorderColor: '#a81313',
    hoverBackgroundColor: '#ffffff',
    layout: 'horizontal',
    sectionSpacing: 8,
    colorCircleSize: 24,
    variantTypeSpacing: 16
  });

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
  const [editableDescription1, setEditableDescription1] = useState(product.description1);
  const [editableDescription2, setEditableDescription2] = useState(product.description2);
  const [editablePrice, setEditablePrice] = useState(product.price);
  const [editableOriginalPrice, setEditableOriginalPrice] = useState(product.originalPrice || 0);

  // Visibility control state
  const [elementVisibility, setElementVisibility] = useState({
    productName: true,
    price: true,
    rating: true,
    description1: true,
    description2: true,
    sizeVariants: true,
    quantity: true,
    addToCartButton: true,
    badges: true
  });

  // Card control state
  const [cardSettings, setCardSettings] = useState({
    width: 475,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    showBorder: true,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    showShadow: true,
    shadowIntensity: 0.1,
    shadowBlur: 3,
    shadowSpread: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 1
  });

  // Image dimension control state
  const [imageHeight, setImageHeight] = useState(457);
  const [imageWidth, setImageWidth] = useState(cardSettings.width);

  // Badge settings state
  const [badgeSettings, setBadgeSettings] = useState({
    showBadges: true,
    badges: [
      { id: '1', text: 'NEW', type: 'new', color: '#ffffff', backgroundColor: '#10b981', position: 'top-right' }
    ],
    fontSize: 12,
    fontWeight: '600',
    borderRadius: 4,
    padding: '4px 8px'
  });

  // Handlers
  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', {
      product: product.name,
      quantity: quantity,
      selectedVariants: selectedVariants
    });
  };

  const handleVariantChange = (variantName: string, option: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: option
    }));
  };

  const toggleElementVisibility = (elementKey: keyof typeof elementVisibility) => {
    setElementVisibility(prev => ({
      ...prev,
      [elementKey]: !prev[elementKey]
    }));
  };

  // Check if all elements in the product details section are hidden
  const areAllElementsHidden = React.useMemo(() => {
    return Object.values(elementVisibility).every(isVisible => !isVisible);
  }, [elementVisibility]);

  // Drag and Drop handlers for descriptions
  const handleDragStart = (e: React.DragEvent, elementId: string) => {
    setDraggedItem(elementId);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', elementId);
  };

  const handleDragOver = (e: React.DragEvent, elementId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(elementId);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetElementId: string) => {
    e.preventDefault();
    
    if (draggedItem && draggedItem !== targetElementId) {
      const newOrder = [...elementOrder];
      const draggedIndex = newOrder.indexOf(draggedItem);
      const targetIndex = newOrder.indexOf(targetElementId);
      
      // Remove dragged item and insert at target position
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedItem);
      
      setElementOrder(newOrder);
    }
    
    setDraggedItem(null);
    setDragOverItem(null);
    setIsDragging(false);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
    setIsDragging(false);
  };

  // Render individual draggable element
  const renderElement = (elementType: string) => {
    const elementStyle = {
      opacity: draggedItem === elementType ? 0.5 : 1,
      transform: dragOverItem === elementType ? 'scale(1.01)' : 'scale(1)',
      transition: 'all 0.2s ease',
      border: dragOverItem === elementType ? '2px dashed #a81313' : '2px solid transparent',
      borderRadius: '4px',
      position: 'relative' as const,
      padding: '2px',
      cursor: isDragging ? 'grabbing' : 'grab'
    };

    const dragProps = {
      draggable: true,
      onDragStart: (e: React.DragEvent) => handleDragStart(e, elementType),
      onDragOver: (e: React.DragEvent) => handleDragOver(e, elementType),
      onDragLeave: handleDragLeave,
      onDrop: (e: React.DragEvent) => handleDrop(e, elementType),
      onDragEnd: handleDragEnd,
      style: elementStyle
    };

    switch (elementType) {
      case 'productName':
        return (
          <div 
            {...dragProps}
            className="draggable-element-item"
          >
            <div 
              className="product-name-container"
              style={{ marginBottom: `${productNameStyles.bottomSpacing}px` }}
            >
              <div 
                className="product-name-display dynamic-text-style"
                style={{
                  '--dynamic-font-size': `${productNameStyles.fontSize}px`,
                  '--dynamic-font-family': productNameStyles.fontFamily,
                  '--dynamic-color': productNameStyles.color,
                  '--dynamic-font-weight': productNameStyles.fontWeight,
                  '--dynamic-text-align': productNameStyles.textAlign,
                  userSelect: 'none',
                  cursor: 'default'
                } as any}
              >
                {editableProductName}
              </div>
              <button 
                className="product-name-edit-icon"
                onClick={() => openDrawer(
                  'product-name-editor',
                  'Product Name Style Editor',
                  <StyleTextUser
                    value={editableProductName}
                    onChange={setEditableProductName}
                    styles={productNameStyles}
                    onStylesChange={setProductNameStyles}
                    placeholder="Enter product name..."
                    className="product-name-style-editor"
                  />,
                  350
                )}
                title="Edit Product Name Style"
              >
                <HiPencil />
              </button>
            </div>
          </div>
        );
        
      case 'price':
        return (
          <div 
            {...dragProps}
            className="draggable-element-item"
          >
            <div 
              className="product-price-container"
              style={{ marginBottom: `${priceStyles.bottomSpacing}px` }}
            >
              <div className="product-price-section">
                {priceStyles.currentPrice.show && (
                  <span 
                    className="product-price dynamic-price-current"
                    style={{
                      '--dynamic-font-size': `${priceStyles.currentPrice.fontSize}px`,
                      '--dynamic-font-family': priceStyles.currentPrice.fontFamily,
                      '--dynamic-color': priceStyles.currentPrice.color,
                      '--dynamic-font-weight': priceStyles.currentPrice.fontWeight
                    } as any}
                  >
                    ${editablePrice}
                  </span>
                )}
                {priceStyles.beforePrice.show && (
                  <span 
                    className="product-before-price dynamic-price-before"
                    style={{
                      '--dynamic-font-size': `${priceStyles.beforePrice.fontSize}px`,
                      '--dynamic-font-family': priceStyles.beforePrice.fontFamily,
                      '--dynamic-color': priceStyles.beforePrice.color,
                      '--dynamic-font-weight': priceStyles.beforePrice.fontWeight
                    } as any}
                  >
                    ${(editablePrice * 1.2).toFixed(2)}
                  </span>
                )}
                {priceStyles.save.show && (
                  <span 
                    className="product-save dynamic-price-save"
                    style={{
                      '--dynamic-font-size': `${priceStyles.save.fontSize}px`,
                      '--dynamic-font-family': priceStyles.save.fontFamily,
                      '--dynamic-color': priceStyles.save.color,
                      '--dynamic-font-weight': priceStyles.save.fontWeight
                    } as any}
                  >
                    Save ${((editablePrice * 1.2) - editablePrice).toFixed(2)}
                  </span>
                )}
              </div>
              <button 
                className="product-price-edit-icon"
                onClick={() => openDrawer(
                  'price-editor',
                  'Price Style Editor',
                  <StylePriceEditor
                    isOpen={true}
                    onClose={() => {}}
                    priceStyles={priceStyles}
                    onStylesChange={setPriceStyles}
                    title="Price Style Editor"
                  />,
                  400
                )}
                title="Edit Price Style"
              >
                <HiPencil />
              </button>
            </div>
          </div>
        );
        
      case 'rating':
        return (
          <div 
            {...dragProps}
            className="draggable-element-item"
          >
            <div 
              className="product-rating-container"
              style={{ marginBottom: `${reviewStyles.bottomSpacing}px` }}
            >
              <div className="product-rating" style={{ fontSize: `${reviewStyles.fontSize}px` }}>
                {renderStars(product.rating)}
                <span style={{ marginLeft: '8px', color: '#6b7280' }}>
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <button 
                className="product-rating-edit-icon"
                onClick={() => openDrawer(
                  'review-editor',
                  'Review Style Editor',
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
                  </div>,
                  350
                )}
                title="Edit Rating Style"
              >
                <HiPencil />
              </button>
            </div>
          </div>
        );
        
      case 'description1':
        return (
          <div 
            {...dragProps}
            className="draggable-element-item"
          >
            <div 
              className="product-description-container"
              style={{ marginBottom: `${descriptionStyles.bottomSpacing}px` }}
            >
              <div 
                className="product-description-display primary dynamic-text-style"
                style={{
                  '--dynamic-font-size': `${descriptionStyles.fontSize}px`,
                  '--dynamic-font-family': descriptionStyles.fontFamily,
                  '--dynamic-color': descriptionStyles.color,
                  '--dynamic-font-weight': descriptionStyles.fontWeight,
                  '--dynamic-text-align': descriptionStyles.textAlign,
                  userSelect: 'none',
                  cursor: 'default'
                } as any}
              >
                {editableDescription1}
              </div>
              <button 
                className="product-description-edit-icon"
                onClick={() => openDrawer(
                  'description-editor',
                  'Description Style Editor',
                  <StyleTextUser
                    value={editableDescription1}
                    onChange={setEditableDescription1}
                    styles={descriptionStyles}
                    onStylesChange={setDescriptionStyles}
                    placeholder="Enter primary description..."
                    className="description-style-editor primary"
                  />,
                  350
                )}
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
            {...dragProps}
            className="draggable-element-item"
          >
            <div 
              className="product-description-container"
              style={{ marginBottom: `${description2Styles.bottomSpacing}px` }}
            >
              <div 
                className="product-description-display secondary dynamic-text-style"
                style={{
                  '--dynamic-font-size': `${description2Styles.fontSize}px`,
                  '--dynamic-font-family': description2Styles.fontFamily,
                  '--dynamic-color': description2Styles.color,
                  '--dynamic-font-weight': description2Styles.fontWeight,
                  '--dynamic-text-align': description2Styles.textAlign,
                  userSelect: 'none',
                  cursor: 'default'
                } as any}
              >
                {editableDescription2}
              </div>
              <button 
                className="product-description2-edit-icon"
                onClick={() => openDrawer(
                  'description2-editor',
                  'Description 2 Style Editor',
                  <StyleTextUser
                    value={editableDescription2}
                    onChange={setEditableDescription2}
                    styles={description2Styles}
                    onStylesChange={setDescription2Styles}
                    placeholder="Enter secondary description..."
                    className="description-style-editor secondary"
                  />,
                  350
                )}
                title="Edit Description 2 Style"
              >
                <HiPencil />
              </button>
            </div>
          </div>
        );
        
      case 'quantity':
        return (
          <div 
            {...dragProps}
            className="draggable-element-item"
          >
            <div 
              className="product-quantity-container"
              style={{ marginBottom: `${quantityStyles.bottomSpacing}px` }}
            >
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
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      backgroundColor: quantityStyles.buttonColor,
                      color: quantityStyles.buttonTextColor,
                      borderRadius: `${quantityStyles.borderRadius}px`,
                      width: `${quantityStyles.buttonSize}px`,
                      height: `${quantityStyles.buttonSize}px`,
                      fontSize: `${quantityStyles.fontSize}px`,
                      border: quantityStyles.theme === 'outlined' ? `2px solid ${quantityStyles.buttonTextColor}` : quantityStyles.theme === 'default' ? '1px solid #d1d5db' : 'none'
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
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      backgroundColor: quantityStyles.buttonColor,
                      color: quantityStyles.buttonTextColor,
                      borderRadius: `${quantityStyles.borderRadius}px`,
                      width: `${quantityStyles.buttonSize}px`,
                      height: `${quantityStyles.buttonSize}px`,
                      fontSize: `${quantityStyles.fontSize}px`,
                      border: quantityStyles.theme === 'outlined' ? `2px solid ${quantityStyles.buttonTextColor}` : quantityStyles.theme === 'default' ? '1px solid #d1d5db' : 'none'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                className="product-quantity-edit-icon"
                onClick={() => openDrawer(
                  'quantity-editor',
                  'Quantity Style Editor',
                  <StyleQuantityCounterEditor
                    isOpen={true}
                    onClose={() => {}}
                    styles={quantityStyles}
                    onStylesChange={setQuantityStyles}
                  />,
                  350
                )}
                title="Edit Quantity Style"
              >
                <HiPencil />
              </button>
            </div>
          </div>
        );
        
      case 'sizeVariants':
        return (
          <div 
            {...dragProps}
            className="draggable-element-item"
          >
            <div 
              className="product-variants-container"
              style={{ 
                marginBottom: `${variantStyles.sectionSpacing}px`,
                position: 'relative'
              }}
            >
              <button 
                className="system-control-icon edit small variant-edit-icon-positioned"
                onClick={() => openDrawer(
                  'variant-editor',
                  'Variant Style Editor',
                  <StyleVariantEditor
                    isOpen={true}
                    onClose={() => {}}
                    styles={variantStyles}
                    onStylesChange={setVariantStyles}
                  />,
                  350
                )}
                title="Edit Variant Style"
              >
                <HiPencil />
              </button>
              {product.variants.map((variant, variantIndex) => (
                <div 
                  key={variantIndex}
                  className="variant-section"
                  style={{
                    marginBottom: variantIndex === product.variants.length - 1 ? `${variantStyles.sectionSpacing}px` : `${variantStyles.variantTypeSpacing}px`,
                    flexDirection: variantStyles.layout === 'vertical' ? 'column' : 'row',
                    alignItems: variantStyles.layout === 'vertical' ? 'flex-start' : 'center',
                    gap: variantStyles.layout === 'vertical' ? `${variantStyles.labelSpacing}px` : `${variantStyles.optionSpacing}px`
                  }}
                >
                  <label 
                    className="variant-label"
                    style={{ 
                      fontSize: `${variantStyles.labelFontSize}px`,
                      fontWeight: variantStyles.labelFontWeight,
                      color: variantStyles.labelColor,
                      marginBottom: variantStyles.layout === 'horizontal' ? '0' : `${variantStyles.labelSpacing}px`,
                      marginRight: variantStyles.layout === 'horizontal' ? `${variantStyles.labelSpacing}px` : '0',
                      display: 'block'
                    }}
                  >
                    {variant.name}:
                  </label>
                  <div 
                    className="variant-options"
                    style={{
                      gap: `${variantStyles.optionSpacing}px`,
                      flexDirection: variantStyles.layout === 'vertical' ? 'column' : 'row',
                      alignItems: variantStyles.layout === 'vertical' ? 'flex-start' : 'center'
                    }}
                  >
                    {variant.options.map((option) => {
                      const isColor = isColorVariant(variant.name);
                      const colorValue = isColor ? getColorValue(option) : null;
                      
                      return (
                        <button
                          key={option}
                          className={`variant-option ${isColor ? 'color-variant' : ''} ${selectedVariants[variant.name] === option ? 'selected' : ''}`}
                          onClick={() => handleVariantChange(variant.name, option)}
                          title={option}
                          style={{
                            fontSize: isColor ? '0' : `${variantStyles.optionFontSize}px`,
                            fontWeight: variantStyles.optionFontWeight,
                            padding: isColor ? '0' : `${variantStyles.optionPadding}px ${variantStyles.optionPadding * 2}px`,
                            borderRadius: isColor ? '50%' : `${variantStyles.optionBorderRadius}px`,
                            width: isColor ? `${variantStyles.colorCircleSize}px` : 'auto',
                            height: isColor ? `${variantStyles.colorCircleSize}px` : 'auto',
                            backgroundColor: isColor ? (colorValue || variantStyles.optionBackgroundColor) : (selectedVariants[variant.name] === option 
                              ? variantStyles.selectedBackgroundColor 
                              : variantStyles.optionBackgroundColor),
                            borderColor: selectedVariants[variant.name] === option 
                              ? variantStyles.selectedBorderColor 
                              : variantStyles.optionBorderColor,
                            borderWidth: selectedVariants[variant.name] === option ? '3px' : '2px',
                            color: isColor ? 'transparent' : (selectedVariants[variant.name] === option 
                              ? variantStyles.selectedTextColor 
                              : variantStyles.optionTextColor),
                            boxShadow: isColor && selectedVariants[variant.name] === option 
                              ? `0 0 0 2px ${variantStyles.selectedBorderColor}` 
                              : 'none',
                            cursor: 'pointer',
                            border: `2px solid ${selectedVariants[variant.name] === option 
                              ? variantStyles.selectedBorderColor 
                              : variantStyles.optionBorderColor}`
                          }}
                          onMouseEnter={(e) => {
                            if (selectedVariants[variant.name] !== option && !isColor) {
                              e.currentTarget.style.borderColor = variantStyles.hoverBorderColor;
                              e.currentTarget.style.backgroundColor = variantStyles.hoverBackgroundColor;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedVariants[variant.name] !== option && !isColor) {
                              e.currentTarget.style.borderColor = variantStyles.optionBorderColor;
                              e.currentTarget.style.backgroundColor = variantStyles.optionBackgroundColor;
                            }
                          }}
                        >
                          {isColor ? '' : option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'addToCartButton':
        return (
          <div 
            {...dragProps}
            className="draggable-element-item"
          >
            <div 
              className="add-to-cart-container"
              style={{ marginBottom: '0px' }}
            >
              <StyledButton 
                onClick={handleAddToCart}
                styles={buttonStyles}
                className="add-to-cart-btn"
              >
                Add to Cart
              </StyledButton>
              <button 
                className="add-to-cart-edit-icon"
                onClick={() => openDrawer(
                  'add-to-cart-editor',
                  'Add to Cart Button Editor',
                  <StyleButton
                    isOpen={true}
                    onClose={() => {}}
                    buttonStyles={buttonStyles}
                    onStylesChange={setButtonStyles}
                    title="Add to Cart Button Editor"
                  />,
                  350
                )}
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

  const handleCardSettingChange = (setting: keyof typeof cardSettings, value: any) => {
    setCardSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    // Automatically sync image width with card width
    if (setting === 'width') {
      setImageWidth(value);
    }
  };

  const handleImageHeightChange = (height: number) => {
    setImageHeight(Math.max(200, Math.min(800, height)));
  };

  const handleImageWidthChange = (width: number) => {
    const newWidth = Math.max(200, Math.min(800, width));
    setImageWidth(newWidth);
    // Also sync the card width to match the image width
    setCardSettings(prev => ({
      ...prev,
      width: newWidth
    }));
  };

  // Helper function to determine if a variant is a color variant
  const isColorVariant = (variantName: string) => {
    if (!variantName) return false;
    return variantName.toLowerCase().includes('color') || variantName.toLowerCase().includes('colour');
  };

  // Helper function to get color value from color name
  const getColorValue = (colorName: string) => {
    if (!colorName) return null;
    const colorMap: { [key: string]: string } = {
      // Basic colors
      'red': '#a81313',
      'blue': '#3b82f6',
      'green': '#10b981',
      'yellow': '#f59e0b',
      'orange': '#f97316',
      'purple': '#8b5cf6',
      'pink': '#ec4899',
      'gray': '#6b7280',
      'grey': '#6b7280',
      'black': '#000000',
      'white': '#ffffff',
      'brown': '#92400e',
      'beige': '#f5f5dc',
      'navy': '#1e3a8a',
      'teal': '#14b8a6',
      'lime': '#84cc16',
      'indigo': '#6366f1',
      'cyan': '#06b6d4',
      'rose': '#f43f5e',
      'amber': '#f59e0b',
      'emerald': '#059669',
      'violet': '#7c3aed',
      'fuchsia': '#d946ef',
      'sky': '#0ea5e9',
      'slate': '#64748b',
      'zinc': '#71717a',
      'neutral': '#737373',
      'stone': '#78716c',
      // Specific shades
      'light gray': '#d1d5db',
      'dark gray': '#374151',
      'light blue': '#93c5fd',
      'dark blue': '#1e40af',
      'light green': '#86efac',
      'dark green': '#047857',
      'maroon': '#7f1d1d',
      'olive': '#65a30d',
      'silver': '#c0c0c0',
      'gold': '#fbbf24',
      'coral': '#ff7f50',
      'salmon': '#fa8072',
      'khaki': '#f0e68c',
      'plum': '#dda0dd',
      'turquoise': '#40e0d0',
      'crimson': '#dc143c',
      'ivory': '#fffff0',
      'azure': '#f0ffff',
      'lavender': '#e6e6fa'
    };
    
    const lowerColorName = colorName.toLowerCase().trim();
    return colorMap[lowerColorName] || colorName; // Return original if not found
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
    <div 
      className={`product-container-display ${className}`}
      style={{
        width: `${cardSettings.width}px`,
        padding: `${cardSettings.padding}px`,
      }}
    >
      {/* Card Control Icon */}
      <div className="card-control-container">
        <button 
          className="system-control-icon card-control small"
          onClick={() => openDrawer(
            'card-settings',
            'Card Settings',
        <div className="drawer-content">
          {/* Dimensions Section */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">Dimensions</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Width</label>
              <div className="drawer-range-container">
                <input
                  type="range"
                  min="200" max="800"
                  value={cardSettings.width}
                  onChange={(e) => handleCardSettingChange('width', Number(e.target.value))}
                  className="drawer-range"
                />
                <span className="drawer-range-value">{cardSettings.width}px</span>
              </div>
            </div>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Padding</label>
              <div className="drawer-range-container">
                <input
                  type="range"
                  min="0" max="50"
                  value={cardSettings.padding}
                  onChange={(e) => handleCardSettingChange('padding', Number(e.target.value))}
                  className="drawer-range"
                />
                <span className="drawer-range-value">{cardSettings.padding}px</span>
              </div>
            </div>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Border Radius</label>
              <div className="drawer-range-container">
                <input
                  type="range"
                  min="0" max="30"
                  value={cardSettings.borderRadius}
                  onChange={(e) => handleCardSettingChange('borderRadius', Number(e.target.value))}
                  className="drawer-range"
                />
                <span className="drawer-range-value">{cardSettings.borderRadius}px</span>
              </div>
            </div>
          </div>

          {/* Colors Section */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">Colors</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Background Color</label>
              <input
                type="color"
                value={cardSettings.backgroundColor}
                onChange={(e) => handleCardSettingChange('backgroundColor', e.target.value)}
                className="drawer-form-input"
              />
            </div>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Border Color</label>
              <input
                type="color"
                value={cardSettings.borderColor}
                onChange={(e) => handleCardSettingChange('borderColor', e.target.value)}
                className="drawer-form-input"
              />
            </div>
          </div>

          {/* Border Section */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">Border</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Show Border</label>
              <div className="drawer-toggle-container">
                <label className="drawer-toggle">
                  <input
                    type="checkbox"
                    checked={cardSettings.showBorder}
                    onChange={(e) => handleCardSettingChange('showBorder', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${cardSettings.showBorder ? 'active' : ''}`}>
                  {cardSettings.showBorder ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>
            {cardSettings.showBorder && (
              <div className="drawer-form-group">
                <label className="drawer-form-label">Border Width</label>
                <div className="drawer-range-container">
                  <input
                    type="range"
                    min="1" max="10"
                    value={cardSettings.borderWidth}
                    onChange={(e) => handleCardSettingChange('borderWidth', Number(e.target.value))}
                    className="drawer-range"
                  />
                  <span className="drawer-range-value">{cardSettings.borderWidth}px</span>
                </div>
              </div>
            )}
          </div>

          {/* Shadow Section */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">Shadow</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Show Shadow</label>
              <div className="drawer-toggle-container">
                <label className="drawer-toggle">
                  <input
                    type="checkbox"
                    checked={cardSettings.showShadow}
                    onChange={(e) => handleCardSettingChange('showShadow', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${cardSettings.showShadow ? 'active' : ''}`}>
                  {cardSettings.showShadow ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>
            {cardSettings.showShadow && (
              <>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Shadow Intensity</label>
                  <div className="drawer-range-container">
                    <input
                      type="range"
                      min="0" max="1" step="0.05"
                      value={cardSettings.shadowIntensity}
                      onChange={(e) => handleCardSettingChange('shadowIntensity', Number(e.target.value))}
                      className="drawer-range"
                    />
                    <span className="drawer-range-value">{Math.round(cardSettings.shadowIntensity * 100)}%</span>
                  </div>
                </div>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Shadow Blur</label>
                  <div className="drawer-range-container">
                    <input
                      type="range"
                      min="0" max="20"
                      value={cardSettings.shadowBlur}
                      onChange={(e) => handleCardSettingChange('shadowBlur', Number(e.target.value))}
                      className="drawer-range"
                    />
                    <span className="drawer-range-value">{cardSettings.shadowBlur}px</span>
                  </div>
                </div>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Shadow Spread</label>
                  <div className="drawer-range-container">
                    <input
                      type="range"
                      min="-10" max="10"
                      value={cardSettings.shadowSpread}
                      onChange={(e) => handleCardSettingChange('shadowSpread', Number(e.target.value))}
                      className="drawer-range"
                    />
                    <span className="drawer-range-value">{cardSettings.shadowSpread}px</span>
                  </div>
                </div>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Shadow Offset X</label>
                  <div className="drawer-range-container">
                    <input
                      type="range"
                      min="-20" max="20"
                      value={cardSettings.shadowOffsetX}
                      onChange={(e) => handleCardSettingChange('shadowOffsetX', Number(e.target.value))}
                      className="drawer-range"
                    />
                    <span className="drawer-range-value">{cardSettings.shadowOffsetX}px</span>
                  </div>
                </div>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Shadow Offset Y</label>
                  <div className="drawer-range-container">
                    <input
                      type="range"
                      min="-20" max="20"
                      value={cardSettings.shadowOffsetY}
                      onChange={(e) => handleCardSettingChange('shadowOffsetY', Number(e.target.value))}
                      className="drawer-range"
                    />
                    <span className="drawer-range-value">{cardSettings.shadowOffsetY}px</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Badge Settings Section */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">Product Badges</h4>
            
            <div className="drawer-form-group">
              <label className="drawer-form-label">Show Badges</label>
              <div className="drawer-toggle-container">
                <label className="drawer-toggle">
                  <input
                    type="checkbox"
                    checked={badgeSettings.showBadges}
                    onChange={(e) => setBadgeSettings(prev => ({ ...prev, showBadges: e.target.checked }))}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${badgeSettings.showBadges ? 'active' : ''}`}>
                  {badgeSettings.showBadges ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {badgeSettings.showBadges && (
              <>
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Font Size</label>
                  <div className="drawer-range-container">
                    <input
                      type="range"
                      min="8" max="20"
                      value={badgeSettings.fontSize}
                      onChange={(e) => setBadgeSettings(prev => ({ ...prev, fontSize: Number(e.target.value) }))}
                      className="drawer-range"
                    />
                    <span className="drawer-range-value">{badgeSettings.fontSize}px</span>
                  </div>
                </div>

                <div className="drawer-form-group">
                  <label className="drawer-form-label">Font Weight</label>
                  <select
                    value={badgeSettings.fontWeight}
                    onChange={(e) => setBadgeSettings(prev => ({ ...prev, fontWeight: e.target.value }))}
                    className="drawer-select"
                  >
                    <option value="400">Normal</option>
                    <option value="500">Medium</option>
                    <option value="600">Semi Bold</option>
                    <option value="700">Bold</option>
                  </select>
                </div>

                <div className="drawer-form-group">
                  <label className="drawer-form-label">Border Radius</label>
                  <div className="drawer-range-container">
                    <input
                      type="range"
                      min="0" max="20"
                      value={badgeSettings.borderRadius}
                      onChange={(e) => setBadgeSettings(prev => ({ ...prev, borderRadius: Number(e.target.value) }))}
                      className="drawer-range"
                    />
                    <span className="drawer-range-value">{badgeSettings.borderRadius}px</span>
                  </div>
                </div>

                {/* Badge List */}
                <div className="drawer-form-group">
                  <label className="drawer-form-label">Badge List</label>
                  <div className="badge-list">
                    {badgeSettings.badges.map((badge, index) => (
                      <div key={badge.id} className="badge-item">
                        <div className="badge-preview" style={{
                          backgroundColor: badge.backgroundColor,
                          color: badge.color,
                          fontSize: `${badgeSettings.fontSize}px`,
                          fontWeight: badgeSettings.fontWeight,
                          borderRadius: `${badgeSettings.borderRadius}px`,
                          padding: badgeSettings.padding
                        }}>
                          {badge.text}
                        </div>
                        <div className="badge-controls">
                          <input
                            type="text"
                            value={badge.text}
                            onChange={(e) => {
                              const newBadges = [...badgeSettings.badges];
                              newBadges[index].text = e.target.value;
                              setBadgeSettings(prev => ({ ...prev, badges: newBadges }));
                            }}
                            className="drawer-form-input"
                            placeholder="Badge text"
                          />
                          <input
                            type="color"
                            value={badge.backgroundColor}
                            onChange={(e) => {
                              const newBadges = [...badgeSettings.badges];
                              newBadges[index].backgroundColor = e.target.value;
                              setBadgeSettings(prev => ({ ...prev, badges: newBadges }));
                            }}
                            className="drawer-form-input"
                            style={{ width: '40px', height: '32px' }}
                          />
                          <input
                            type="color"
                            value={badge.color}
                            onChange={(e) => {
                              const newBadges = [...badgeSettings.badges];
                              newBadges[index].color = e.target.value;
                              setBadgeSettings(prev => ({ ...prev, badges: newBadges }));
                            }}
                            className="drawer-form-input"
                            style={{ width: '40px', height: '32px' }}
                          />
                          <select
                            value={badge.position}
                            onChange={(e) => {
                              const newBadges = [...badgeSettings.badges];
                              newBadges[index].position = e.target.value as any;
                              setBadgeSettings(prev => ({ ...prev, badges: newBadges }));
                            }}
                            className="drawer-select"
                            style={{ fontSize: '12px' }}
                          >
                            <option value="top-left">Top Left</option>
                            <option value="top-right">Top Right</option>
                            <option value="bottom-left">Bottom Left</option>
                            <option value="bottom-right">Bottom Right</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
            </div>,
            450
          )}
          type="button"
          title="Control Card Settings"
        >
          <HiViewBoards />
        </button>
        </div>

        <div 
          className="product-card-merged"
          style={{
            borderRadius: `${cardSettings.borderRadius}px`,
            backgroundColor: cardSettings.backgroundColor,
            border: cardSettings.showBorder ? `${cardSettings.borderWidth}px solid ${cardSettings.borderColor}` : 'none',
            boxShadow: cardSettings.showShadow ? 
              `${cardSettings.shadowOffsetX}px ${cardSettings.shadowOffsetY}px ${cardSettings.shadowBlur}px ${cardSettings.shadowSpread}px rgba(0, 0, 0, ${cardSettings.shadowIntensity})` : 
              'none'
          }}
      >
        {/* Product Image Section */}
        <div 
          className="product-image-section"
          style={{
            height: `${imageHeight}px`
          }}
        >
          {/* Image Dimension Control */}
          <div className="image-dimension-control">
            <button 
              className="system-control-icon dimensions small"
              onClick={() => openDrawer(
                'image-dimensions',
                'Image & Card Dimensions',
        <div className="drawer-content">
                  {/* Image Dimensions Section */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">Image Dimensions</h4>
                    <div className="drawer-form-group">
                      <label className="drawer-form-label">Width</label>
                      <div style={{ marginBottom: '8px', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                        ⚡ Syncs with card width (two-way)
                      </div>
                      <div className="drawer-range-container">
                        <input
                          type="range"
                          min="200" max="800"
                          value={imageWidth}
                          onChange={(e) => handleImageWidthChange(Number(e.target.value))}
                          className="drawer-range"
                        />
                        <span className="drawer-range-value">{imageWidth}px</span>
                      </div>
                    </div>
                    <div className="drawer-form-group">
                      <label className="drawer-form-label">Width Direct Input</label>
                      <input
                        type="number"
                        value={imageWidth}
                        onChange={(e) => handleImageWidthChange(Number(e.target.value))}
                        min="200"
                        max="800"
                        className="drawer-form-input"
                        style={{ width: '80px', textAlign: 'center' }}
                      />
                      <span style={{ marginLeft: '8px', fontSize: '12px', color: '#6b7280' }}>px</span>
                    </div>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Height</label>
              <div className="drawer-range-container">
                <input
                  type="range"
                  min="200" max="800"
                  value={imageHeight}
                  onChange={(e) => handleImageHeightChange(Number(e.target.value))}
                  className="drawer-range"
                />
                <span className="drawer-range-value">{imageHeight}px</span>
              </div>
            </div>
            <div className="drawer-form-group">
                      <label className="drawer-form-label">Height Direct Input</label>
              <input
                type="number"
                value={imageHeight}
                onChange={(e) => handleImageHeightChange(Number(e.target.value))}
                min="200"
                max="800"
                className="drawer-form-input"
                style={{ width: '80px', textAlign: 'center' }}
              />
              <span style={{ marginLeft: '8px', fontSize: '12px', color: '#6b7280' }}>px</span>
            </div>
          </div>

          {/* Card Width Section */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">Card Dimensions</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Width</label>
              <div className="drawer-range-container">
                <input
                  type="range"
                  min="200" max="800"
                  value={cardSettings.width}
                  onChange={(e) => handleCardSettingChange('width', Number(e.target.value))}
                  className="drawer-range"
                />
                <span className="drawer-range-value">{cardSettings.width}px</span>
              </div>
            </div>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Direct Input</label>
              <input
                type="number"
                value={cardSettings.width}
                onChange={(e) => handleCardSettingChange('width', Number(e.target.value))}
                min="200"
                max="800"
                className="drawer-form-input"
                style={{ width: '80px', textAlign: 'center' }}
              />
              <span style={{ marginLeft: '8px', fontSize: '12px', color: '#6b7280' }}>px</span>
            </div>
          </div>
                </div>,
                400
              )}
              type="button"
              title="Control Image & Card Dimensions"
            >
              <HiArrowsExpand />
            </button>
        </div>

          <div className="product-image-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="product-image"
              style={{
                width: `${imageWidth}px`,
                height: '100%',
                objectFit: 'cover',
                maxWidth: '100%'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/457x457/f3f4f6/9ca3af?text=Product+Image';
              }}
            />
            
            {/* Product Badges */}
            {elementVisibility.badges && badgeSettings.showBadges && badgeSettings.badges.map((badge) => (
              <div
                key={badge.id}
                className={`product-badge badge-${badge.position}`}
                style={{
                  position: 'absolute',
                  backgroundColor: badge.backgroundColor,
                  color: badge.color,
                  fontSize: `${badgeSettings.fontSize}px`,
                  fontWeight: badgeSettings.fontWeight,
                  borderRadius: `${badgeSettings.borderRadius}px`,
                  padding: badgeSettings.padding,
                  border: '1px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  zIndex: 10,
                  ...(badge.position === 'top-left' && { top: '8px', left: '8px' }),
                  ...(badge.position === 'top-right' && { top: '8px', right: '8px' }),
                  ...(badge.position === 'bottom-left' && { bottom: '8px', left: '8px' }),
                  ...(badge.position === 'bottom-right' && { bottom: '8px', right: '8px' })
                }}
              >
                {badge.text}
              </div>
            ))}
          </div>
          
          {/* Visibility Control Section */}
          <div className="visibility-control-section">
            <button 
              className="system-control-icon visibility small"
              onClick={() => openDrawer(
                'element-visibility',
                'Element Visibility',
        <div className="drawer-content">
          <div className="drawer-section">
            <h4 className="drawer-section-title">Show/Hide Elements</h4>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Product Name</label>
              <div className="drawer-toggle-container">
                <label className="drawer-toggle">
                  <input
                    type="checkbox"
                    checked={elementVisibility.productName}
                    onChange={() => toggleElementVisibility('productName')}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${elementVisibility.productName ? 'active' : ''}`}>
                  {elementVisibility.productName ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>
            <div className="drawer-form-group">
              <label className="drawer-form-label">Price</label>
              <div className="drawer-toggle-container">
                <label className="drawer-toggle">
                  <input
                    type="checkbox"
                    checked={elementVisibility.price}
                    onChange={() => toggleElementVisibility('price')}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${elementVisibility.price ? 'active' : ''}`}>
                  {elementVisibility.price ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>

            <div className="drawer-form-group">
              <label className="drawer-form-label">Description 1</label>
              <div className="drawer-toggle-container">
                <label className="drawer-toggle">
                  <input
                    type="checkbox"
                    checked={elementVisibility.description1}
                    onChange={() => toggleElementVisibility('description1')}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${elementVisibility.description1 ? 'active' : ''}`}>
                  {elementVisibility.description1 ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>

            <div className="drawer-form-group">
              <label className="drawer-form-label">Description 2</label>
              <div className="drawer-toggle-container">
                <label className="drawer-toggle">
                  <input
                    type="checkbox"
                    checked={elementVisibility.description2}
                    onChange={() => toggleElementVisibility('description2')}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${elementVisibility.description2 ? 'active' : ''}`}>
                  {elementVisibility.description2 ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>

            <div className="drawer-form-group">
              <label className="drawer-form-label">Variants</label>
              <div className="drawer-toggle-container">
                <label className="drawer-toggle">
                  <input
                    type="checkbox"
                    checked={elementVisibility.sizeVariants}
                    onChange={() => toggleElementVisibility('sizeVariants')}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${elementVisibility.sizeVariants ? 'active' : ''}`}>
                  {elementVisibility.sizeVariants ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>

            <div className="drawer-form-group">
              <label className="drawer-form-label">Quantity Counter</label>
              <div className="drawer-toggle-container">
                <label className="drawer-toggle">
                  <input
                    type="checkbox"
                    checked={elementVisibility.quantity}
                    onChange={() => toggleElementVisibility('quantity')}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${elementVisibility.quantity ? 'active' : ''}`}>
                  {elementVisibility.quantity ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>

            <div className="drawer-form-group">
              <label className="drawer-form-label">Add to Cart Button</label>
              <div className="drawer-toggle-container">
                <label className="drawer-toggle">
                  <input
                    type="checkbox"
                    checked={elementVisibility.addToCartButton}
                    onChange={() => toggleElementVisibility('addToCartButton')}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${elementVisibility.addToCartButton ? 'active' : ''}`}>
                  {elementVisibility.addToCartButton ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>

            <div className="drawer-form-group">
              <label className="drawer-form-label">Product Badges</label>
              <div className="drawer-toggle-container">
                <label className="drawer-toggle">
                  <input
                    type="checkbox"
                    checked={elementVisibility.badges}
                    onChange={() => toggleElementVisibility('badges')}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className={`toggle-label ${elementVisibility.badges ? 'active' : ''}`}>
                  {elementVisibility.badges ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>
              </div>
                </div>,
                350
              )}
              title="Control Element Visibility"
            >
              <HiEye />
            </button>
              </div>
            </div>
            
        {/* Product Details Section - Only show if at least one element is visible */}
        {!areAllElementsHidden && (
          <div className="product-details-section">
            
            
            
            {/* Draggable Elements - Rendered Based on Order */}
            <div 
              className="elements-drag-container"
              style={{ 
                userSelect: isDragging ? 'none' : 'auto',
                pointerEvents: isDragging ? 'none' : 'auto'
              }}
            >
              {elementOrder
                .filter(elementType => elementVisibility[elementType as keyof typeof elementVisibility])
                .map((elementType) => (
                  <div key={elementType} className="element-wrapper">
                    {renderElement(elementType)}
              </div>
                ))}
            </div>
            
            
            
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductContainerDisplay;
