'use client';

import React, { useRef } from 'react';
import './StoreBar.css';

interface StoreBarProps {
  storeLogo: string | null;
  logoShape: 'circle' | 'rectangle';
  logoWidth: number;
  logoHeight: number;
  horizontalPadding: number;
  verticalPadding: number;
  isLoggedIn: boolean;
  userData: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  wishlistItems: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    originalPrice?: number;
  }>;
  currentLanguage: string;
  selectedLanguages: string[];
  showLanguageSelector: boolean;
  showLogoSettings: boolean;
  showCartDrawer: boolean;
  showWishlistDrawer: boolean;
  showSearchBar: boolean;
  showAuthModal: boolean;
  searchTerm: string;
  authMode: 'signin' | 'signup';
  authForm: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    rememberMe: boolean;
  };
  allProducts: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
    collection: string;
    image: string;
    description: string;
  }>;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSettingsClick: () => void;
  onAuthModalOpen: () => void;
  onAuthModalClose: () => void;
  onCartDrawerOpen: () => void;
  onCartDrawerClose: () => void;
  onWishlistDrawerOpen: () => void;
  onWishlistDrawerClose: () => void;
  onSearchBarOpen: () => void;
  onSearchBarClose: () => void;
  onLanguageSelectorToggle: () => void;
  onLanguageChange: (language: string) => void;
  onSearchTermChange: (term: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onAuthInputChange: (field: string, value: string | boolean) => void;
  onAuthSubmit: (e: React.FormEvent) => void;
  onSwitchAuthMode: () => void;
  onLogout: () => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (wishlistItem: any) => void;
  onGetTotalPrice: () => number;
  t: (key: string) => string;
}

const StoreBar: React.FC<StoreBarProps> = ({
  storeLogo,
  logoShape,
  logoWidth,
  logoHeight,
  horizontalPadding,
  verticalPadding,
  isLoggedIn,
  userData,
  cartItems,
  wishlistItems,
  currentLanguage,
  selectedLanguages,
  showLanguageSelector,
  showLogoSettings,
  showCartDrawer,
  showWishlistDrawer,
  showSearchBar,
  showAuthModal,
  searchTerm,
  authMode,
  authForm,
  allProducts,
  onLogoUpload,
  onSettingsClick,
  onAuthModalOpen,
  onAuthModalClose,
  onCartDrawerOpen,
  onCartDrawerClose,
  onWishlistDrawerOpen,
  onWishlistDrawerClose,
  onSearchBarOpen,
  onSearchBarClose,
  onLanguageSelectorToggle,
  onLanguageChange,
  onSearchTermChange,
  onSearchSubmit,
  onAuthInputChange,
  onAuthSubmit,
  onSwitchAuthMode,
  onLogout,
  onUpdateQuantity,
  onRemoveFromWishlist,
  onAddToCart,
  onGetTotalPrice,
  t
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="store-bar" style={{
      height: `${60 + (verticalPadding * 2)}px`,
      padding: `${verticalPadding}px 0`,
      marginLeft: showLogoSettings ? '300px' : '0',
      transition: 'margin-left 0.3s ease'
    }}>
      <div className="store-bar-content" style={{
        paddingLeft: `${horizontalPadding}px`,
        paddingRight: `${horizontalPadding}px`
      }}>
        <div className="store-logo-section">
          <div className="logo-container">
            <div className={`logo-placeholder ${logoShape === 'circle' ? 'circular' : ''}`} style={{
              width: logoShape === 'circle' ? `${logoWidth}px` : `${logoWidth}px`,
              height: logoShape === 'circle' ? `${logoWidth}px` : `${logoHeight}px`,
              borderRadius: logoShape === 'circle' ? '50%' : '8px'
            }}>
              {storeLogo ? (
                <img src={storeLogo} alt="Store Logo" className="store-logo-image" />
              ) : (
                <div className="logo-icon">🖼️</div>
              )}
            </div>
            <button className="logo-control-btn upload-btn" onClick={handleUploadClick}>📷</button>
          </div>
          <button className="logo-control-btn settings-btn" onClick={onSettingsClick}>⚙️</button>
        </div>
        <div className="store-bar-actions">
          <button 
            className="store-action-btn account-btn" 
            onClick={onAuthModalOpen}
          >
            {isLoggedIn && userData ? (
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="user-avatar"
              />
            ) : (
              '👤'
            )}
          </button>
          <button className="store-action-btn">🔔</button>
          <div className="language-btn-container">
            <button 
              className="store-action-btn language-btn" 
              onClick={onLanguageSelectorToggle}
            >
              {currentLanguage === 'English' ? 'A' : '🌐'}
            </button>
            {showLanguageSelector && (
              <div className="language-selector-popup">
                <div className="language-selector-content">
                  <div className="language-selector-header">
                    <h4>{t('select_language')}</h4>
                    <button 
                      className="close-language-btn" 
                      onClick={onLanguageSelectorToggle}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="language-selector-list">
                    {selectedLanguages.map((language) => (
                      <div 
                        key={language}
                        className={`language-selector-option ${currentLanguage === language ? 'active' : ''}`}
                        onClick={() => onLanguageChange(language)}
                      >
                        <span className="language-selector-flag">
                          {language === 'English' ? '🇺🇸' : 
                           language === 'Spanish' ? '🇪🇸' :
                           language === 'French' ? '🇫🇷' :
                           language === 'German' ? '🇩🇪' :
                           language === 'Italian' ? '🇮🇹' :
                           language === 'Portuguese' ? '🇵🇹' :
                           language === 'Russian' ? '🇷🇺' :
                           language === 'Chinese' ? '🇨🇳' :
                           language === 'Japanese' ? '🇯🇵' :
                           language === 'Korean' ? '🇰🇷' :
                           language === 'Arabic' ? '🇸🇦' :
                           language === 'Hindi' ? '🇮🇳' :
                           language === 'Turkish' ? '🇹🇷' : '🌐'}
                        </span>
                        <span className="language-selector-name">{language}</span>
                        {currentLanguage === language && (
                          <span className="language-selector-check">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <button className="store-action-btn cart-btn" onClick={onCartDrawerOpen}>
            🛒
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
            )}
          </button>
          <button className="store-action-btn wishlist-btn" onClick={onWishlistDrawerOpen}>
            ❤️
            {wishlistItems.length > 0 && (
              <span className="wishlist-badge">{wishlistItems.length}</span>
            )}
          </button>
          <button className="store-action-btn search-btn" onClick={onSearchBarOpen}>
            🔍
          </button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onLogoUpload}
        style={{ display: 'none' }}
      />

      {/* Cart Drawer */}
      {showCartDrawer && (
        <div className="cart-drawer-overlay" onClick={onCartDrawerClose}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <h3>Shopping Cart</h3>
              <button className="close-cart-btn" onClick={onCartDrawerClose}>✕</button>
            </div>
            
            <div className="cart-drawer-content">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <span className="empty-cart-icon">🛒</span>
                  <p>Your cart is empty</p>
                  <button className="start-shopping-btn" onClick={onCartDrawerClose}>
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
                    <button className="checkout-btn" onClick={onCartDrawerClose}>
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      {showWishlistDrawer && (
        <div className="wishlist-drawer-overlay" onClick={onWishlistDrawerClose}>
          <div className="wishlist-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="wishlist-drawer-header">
              <h3>Wishlist</h3>
              <button className="close-wishlist-btn" onClick={onWishlistDrawerClose}>✕</button>
            </div>
            
            <div className="wishlist-drawer-content">
              {wishlistItems.length === 0 ? (
                <div className="empty-wishlist">
                  <span className="empty-wishlist-icon">❤️</span>
                  <p>Your wishlist is empty</p>
                  <button className="start-shopping-btn" onClick={onWishlistDrawerClose}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="wishlist-items">
                    {wishlistItems.map(item => (
                      <div key={item.id} className="wishlist-item">
                        <div className="wishlist-item-image">{item.image}</div>
                        <div className="wishlist-item-details">
                          <h4>{item.name}</h4>
                          <div className="wishlist-item-price">
                            <span className="current-price">${item.price}</span>
                            {item.originalPrice && (
                              <span className="original-price">${item.originalPrice}</span>
                            )}
                          </div>
                        </div>
                        <div className="wishlist-item-actions">
                          <button 
                            className="add-to-cart-btn"
                            onClick={() => onAddToCart(item)}
                          >
                            Add to Cart
                          </button>
                          <button 
                            className="remove-wishlist-btn"
                            onClick={() => onRemoveFromWishlist(item.id)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="wishlist-drawer-footer">
                    <div className="wishlist-total">
                      <span>Items in wishlist:</span>
                      <span className="total-count">{wishlistItems.length}</span>
                    </div>
                    <button className="view-all-btn" onClick={onWishlistDrawerClose}>
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Bar Overlay */}
      {showSearchBar && (
        <div className="search-overlay" onClick={onSearchBarClose}>
          <div className="search-container" onClick={(e) => e.stopPropagation()}>
            <div className="search-header">
              <h3>Search Products</h3>
              <button className="close-search-btn" onClick={onSearchBarClose}>✕</button>
            </div>
            
            <form onSubmit={onSearchSubmit} className="search-form">
              <div className="search-input-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search products, categories, collections..."
                  value={searchTerm}
                  onChange={(e) => onSearchTermChange(e.target.value)}
                  className="search-input"
                  autoFocus
                />
                {searchTerm && (
                  <button 
                    type="button" 
                    className="clear-search-btn"
                    onClick={() => onSearchTermChange('')}
                  >
                    ✕
                  </button>
                )}
              </div>
            </form>

            <div className="search-results">
              {searchTerm && (
                <>
                  <div className="search-results-header">
                    <h4>Search Results</h4>
                    <span className="results-count">
                      {allProducts.filter(product =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.collection.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length} {allProducts.filter(product =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.collection.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length === 1 ? 'result' : 'results'}
                    </span>
                  </div>
                  
                  {allProducts.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.collection.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length === 0 ? (
                    <div className="no-results">
                      <span className="no-results-icon">🔍</span>
                      <p>No products found for "{searchTerm}"</p>
                      <p className="search-suggestions">
                        Try searching for: clothing, electronics, accessories, sports
                      </p>
                    </div>
                  ) : (
                    <div className="search-products">
                      {allProducts.filter(product =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.collection.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map(product => (
                        <div key={product.id} className="search-product-item">
                          <div className="search-product-image">{product.image}</div>
                          <div className="search-product-details">
                            <h5>{product.name}</h5>
                            <p className="search-product-category">
                              {product.category} • {product.collection}
                            </p>
                            <p className="search-product-description">{product.description}</p>
                            <div className="search-product-price">${product.price}</div>
                          </div>
                          <div className="search-product-actions">
                            <button 
                              className="add-to-cart-search-btn"
                              onClick={() => {
                                // Add to cart logic here
                                console.log('Adding to cart:', product.name);
                              }}
                            >
                              Add to Cart
                            </button>
                            <button 
                              className="add-to-wishlist-search-btn"
                              onClick={() => {
                                // Add to wishlist logic here
                                console.log('Adding to wishlist:', product.name);
                              }}
                            >
                              ❤️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              
              {!searchTerm && (
                <div className="search-suggestions-container">
                  <h4>Popular Searches</h4>
                  <div className="popular-searches">
                    <button 
                      className="search-suggestion-btn"
                      onClick={() => onSearchTermChange('clothing')}
                    >
                      Clothing
                    </button>
                    <button 
                      className="search-suggestion-btn"
                      onClick={() => onSearchTermChange('electronics')}
                    >
                      Electronics
                    </button>
                    <button 
                      className="search-suggestion-btn"
                      onClick={() => onSearchTermChange('accessories')}
                    >
                      Accessories
                    </button>
                    <button 
                      className="search-suggestion-btn"
                      onClick={() => onSearchTermChange('sports')}
                    >
                      Sports
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="auth-overlay" onClick={onAuthModalClose}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="auth-header">
              <h3>{authMode === 'signin' ? 'Sign In' : 'Sign Up'}</h3>
              <button className="close-auth-btn" onClick={onAuthModalClose}>✕</button>
            </div>
            
            <form onSubmit={onAuthSubmit} className="auth-form">
              {authMode === 'signup' && (
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={authForm.name}
                    onChange={(e) => onAuthInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => onAuthInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) => onAuthInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {authMode === 'signup' && (
                <div className="form-group">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    value={authForm.confirmPassword}
                    onChange={(e) => onAuthInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}
              
              {authMode === 'signin' && (
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={authForm.rememberMe}
                      onChange={(e) => onAuthInputChange('rememberMe', e.target.checked)}
                    />
                    Remember me
                  </label>
                </div>
              )}
              
              <button type="submit" className="auth-submit-btn">
                {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>
                {authMode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button" 
                  className="switch-auth-btn"
                  onClick={onSwitchAuthMode}
                >
                  {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Dropdown */}
      {isLoggedIn && userData && (
        <div className="user-profile-dropdown">
          <div className="user-profile-content">
            <div className="user-profile-header">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="user-profile-avatar"
              />
              <div className="user-profile-info">
                <h4>{userData.name}</h4>
                <p>{userData.email}</p>
              </div>
            </div>
            <div className="user-profile-actions">
              <button className="profile-action-btn">
                <span className="action-icon">👤</span>
                My Profile
              </button>
              <button className="profile-action-btn">
                <span className="action-icon">📦</span>
                My Orders
              </button>
              <button className="profile-action-btn">
                <span className="action-icon">❤️</span>
                My Wishlist
              </button>
              <button className="profile-action-btn">
                <span className="action-icon">⚙️</span>
                Settings
              </button>
              <button className="profile-action-btn logout-btn" onClick={onLogout}>
                <span className="action-icon">🚪</span>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreBar;
