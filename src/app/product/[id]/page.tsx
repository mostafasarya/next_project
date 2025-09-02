'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import './ProductPage.css';

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  beforePrice: number;
  saveAmount: number;
  count: number;
  editCount: number;
  ifSoldOut: 'keep selling' | 'stop selling';
  isTracking: boolean;
}

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  price: number;
  beforePrice: number;
  saveAmount: number;
  variants: ProductVariant[];
  count: number;
  editCount: number;
  ifSoldOut: 'keep selling' | 'stop selling';
  isTracking: boolean;
}

const ProductPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockProducts: Product[] = [
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
        variants: [
          {
            id: '3-1',
            name: 'small',
            price: 34.99,
            beforePrice: 44.99,
            saveAmount: 10.00,
            count: 20,
            editCount: 0,
            ifSoldOut: 'keep selling',
            isTracking: true
          },
          {
            id: '3-2',
            name: 'medium',
            price: 34.99,
            beforePrice: 44.99,
            saveAmount: 10.00,
            count: 10,
            editCount: 0,
            ifSoldOut: 'keep selling',
            isTracking: true
          }
        ]
      }
    ];

    const productName = decodeURIComponent(params.id as string);
    const foundProduct = mockProducts.find(p => p.name === productName);
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.variants.length > 0) {
        setSelectedVariant(foundProduct.variants[0].id);
      }
    }
  }, [params.id]);

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(quantity + value, product?.count || 1));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // In a real app, this would add to cart
    alert(`Added ${quantity} ${product?.name} to cart!`);
  };

  const getCurrentPrice = () => {
    if (selectedVariant && product) {
      const variant = product.variants.find(v => v.id === selectedVariant);
      return variant ? variant.price : product.price;
    }
    return product?.price || 0;
  };

  const getCurrentCount = () => {
    if (selectedVariant && product) {
      const variant = product.variants.find(v => v.id === selectedVariant);
      return variant ? variant.count : product.count;
    }
    return product?.count || 0;
  };

  if (!product) {
    return (
      <div className="product-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="product-page">
      {/* Header */}
      <div className="product-header">
        <button className="back-btn" onClick={() => router.push('/all-products')}>
          <span className="back-icon">←</span>
          Back to Products
        </button>
      </div>

      <div className="product-container">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img 
              src={product.images[selectedImage] || product.image} 
              alt={product.name}
              className="product-main-image"
            />
          </div>
          {product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-price">
            <span className="current-price">${getCurrentPrice()}</span>
            {product.beforePrice > getCurrentPrice() && (
              <span className="before-price">${product.beforePrice}</span>
            )}
            {product.saveAmount > 0 && (
              <span className="save-amount">Save ${product.saveAmount}</span>
            )}
          </div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="product-variants">
              <h3>Select Variant</h3>
              <div className="variant-options">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`variant-option ${selectedVariant === variant.id ? 'selected' : ''}`}
                    onClick={() => setSelectedVariant(variant.id)}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="product-quantity">
            <h3>Quantity</h3>
            <div className="quantity-controls">
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= getCurrentCount()}
              >
                +
              </button>
            </div>
            <span className="stock-info">
              {getCurrentCount()} in stock
            </span>
          </div>

          {/* Add to Cart */}
          <div className="add-to-cart">
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={getCurrentCount() === 0}
            >
              {getCurrentCount() === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
