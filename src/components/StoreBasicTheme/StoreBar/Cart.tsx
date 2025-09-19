'use client';

import React, { useState, useEffect } from 'react';
import StoreBarIcons from './StoreBarIcons';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartProps {
  showCartDrawer: boolean;
  cartItems: CartItem[];
  onCartDrawerClose: () => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onGetTotalPrice: () => number;
}

export interface CartState {
  cartItems: CartItem[];
  showCartDrawer: boolean;
}

export const useCart = (): CartState & {
  updateQuantity: (id: string, newQuantity: number) => void;
  getTotalPrice: () => number;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
} => {
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Hat',
      price: 29.99,
      quantity: 2,
      image: '🦴'
    },
    {
      id: '2',
      name: 'Shirt',
      price: 34.99,
      quantity: 1,
      image: '👕'
    },
    {
      id: '3',
      name: 'Trouser',
      price: 49.99,
      quantity: 1,
      image: '👖'
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const openCartDrawer = () => {
    setShowCartDrawer(true);
  };

  const closeCartDrawer = () => {
    setShowCartDrawer(false);
  };

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return {
    cartItems,
    showCartDrawer,
    updateQuantity,
    getTotalPrice,
    openCartDrawer,
    closeCartDrawer,
    addToCart,
    removeFromCart,
    clearCart,
  };
};

const Cart: React.FC<CartProps> = ({
  showCartDrawer,
  cartItems,
  onCartDrawerClose,
  onUpdateQuantity,
  onGetTotalPrice,
}) => {
  if (!showCartDrawer) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onCartDrawerClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h3>Shopping Cart</h3>
          <button className="close-cart-btn" onClick={onCartDrawerClose}>✕</button>
        </div>
        
        <div className="cart-drawer-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-cart-icon">
                <StoreBarIcons iconType="empty-cart" />
              </span>
              <p>Your cart is empty</p>
              <button className="start-shopping-btn" onClick={() => {
                onCartDrawerClose();
                window.location.href = '/products-management';
              }}>
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">{item.image}</div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">${item.price}</p>
                    </div>
                    <div className="cart-item-quantity">
                      <button 
                        className="quantity-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-drawer-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-price">${onGetTotalPrice().toFixed(2)}</span>
                </div>
                <button className="checkout-btn" onClick={() => {
                  onCartDrawerClose();
                  window.location.href = '/checkout';
                }}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
