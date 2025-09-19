'use client';

import React, { useState, useEffect } from 'react';
import { HiCamera, HiCog, HiMenuAlt3 } from 'react-icons/hi';
import StyleUploadImageFunction from '../../StyleUploadImageFunction';
import StoreBarIcons from './StoreBarIcons';
import TabsStoreBar from './TabsStoreBar';
import Cart from './Cart';
import { useGlobalDrawer } from '../../EditorControls/PropertiesManagement/GlobalDrawerProvider';
import { useStoreBarElementsPositions } from '../../EditorControls/PropertiesManagement/StoreBarElementsPositions';
import './StoreBar.css';
import '../../EditorControls/PropertiesManagement/SystemControlIcons.css';

interface StoreBarProps {
  storeLogo: string | null;
  logoShape: 'circle' | 'rectangle';
  logoWidth: number;
  logoHeight: number;
  horizontalPadding: number;
  verticalPadding: number;
  backgroundType: 'solid' | 'gradient';
  solidColor: string;
  gradientStart: string;
  gradientEnd: string;
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
  // Navigation tabs props
  activeTab: string;
  onTabChange: (tabId: string, subTabId?: string) => void;
}

const StoreBar: React.FC<StoreBarProps> = ({
  storeLogo,
  logoShape,
  logoWidth,
  logoHeight,
  horizontalPadding,
  verticalPadding,
  backgroundType,
  solidColor,
  gradientStart,
  gradientEnd,
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
  t,
  activeTab,
  onTabChange
}) => {
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const { openDrawer, closeDrawer } = useGlobalDrawer();
  
  
  // Get layout controls from the global provider (with fallback)
  let layoutControls, currentLayout;
  try {
    const layoutControlsData = useStoreBarElementsPositions();
    layoutControls = layoutControlsData.layoutControls;
  } catch (error) {
    // Fallback to default layout if provider is not available
    layoutControls = {
      desktop: {
        logoPosition: 10,    // Logo on the left
        tabsPosition: 30,    // Tabs at 30%
        account: { position: 85, visible: true, iconType: 'profile' },      // 👨‍💼 Account: 85% (Professional look)
        notifications: { position: 87, visible: true, iconType: 'bell' },   // 🔔 Notifications: 87% (Classic bell)
        language: { position: 89, visible: true, iconType: 'world' },       // 🌍 Language: 89% (World globe)
        cart: { position: 91, visible: true, iconType: 'shopping' },        // 🛍️ Cart: 91% (Shopping bags)
        wishlist: { position: 93, visible: true, iconType: 'favorite' },    // ⭐ Wishlist: 93% (Star favorite)
        search: { position: 95, visible: true, iconType: 'magnifier' }      // 🔎 Search: 95% (Magnifying glass)
      },
      mobile: {
        logoPosition: 15,    // Logo on the left for mobile
        drawerPosition: 'left' as 'left' | 'right',
        account: { position: 80, visible: true, iconType: 'profile' },      // 👨‍💼 Mobile icons with proportional spacing
        notifications: { position: 83, visible: true, iconType: 'bell' },   // 🔔 Classic bell for notifications
        language: { position: 86, visible: true, iconType: 'world' },       // 🌍 World for language selection
        cart: { position: 89, visible: true, iconType: 'shopping' },        // 🛍️ Shopping bags for cart
        wishlist: { position: 92, visible: true, iconType: 'favorite' },    // ⭐ Star for favorites/wishlist
        search: { position: 95, visible: true, iconType: 'magnifier' }      // 🔎 Magnifying glass for search
      }
    };
  }
  
  // Determine which layout settings to use based on screen size
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Get the current layout settings
  currentLayout = isMobile ? layoutControls.mobile : layoutControls.desktop;


  // Function to get icon emoji from iconType
  const getIconEmoji = (iconType: string, action: string) => {
    const iconOptions: Record<string, Record<string, string>> = {
      account: {
        user: '👤', person: '🧑', profile: '👨‍💼', avatar: '🙋‍♂️', admin: '👨‍💻', customer: '🛍️'
      },
      notifications: {
        bell: '🔔', notification: '📢', alert: '⚠️', message: '💬', inbox: '📥', mail: '📬'
      },
      language: {
        globe: '🌐', world: '🌍', translate: '🔄', language: '🗣️', flag: '🏳️', earth: '🌎'
      },
      cart: {
        cart: '🛒', shopping: '🛍️', basket: '🧺', bag: '👜', trolley: '🛒', purchase: '💳'
      },
      wishlist: {
        heart: '❤️', love: '💖', favorite: '⭐', like: '👍', bookmark: '🔖', star: '✨'
      },
      search: {
        search: '🔍', magnifier: '🔎', find: '🕵️', explore: '🗺️', discover: '🔭', lookup: '📊'
      }
    };
    
    return iconOptions[action]?.[iconType] || iconOptions[action]?.user || '❓';
  };

  return (
    <div className="store-bar" style={{
      height: `${60 + (verticalPadding * 2)}px`,
      padding: `${verticalPadding}px 0`,
      marginLeft: showLogoSettings ? '300px' : '0',
      transition: 'margin-left 0.3s ease',
      background: backgroundType === 'solid' 
        ? solidColor 
        : `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`
    }}>
      <div className="store-bar-content" style={{
        paddingLeft: `${horizontalPadding}px`,
        paddingRight: `${horizontalPadding}px`,
        position: 'relative'
      }}>
        <div className="store-logo-section" style={{
          position: 'absolute',
          left: `${currentLayout.logoPosition}%`,
          transform: 'translateX(-50%)',
          zIndex: 10
        }}>
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setShowMobileDrawer(true)}
            aria-label="Open navigation menu"
          >
            <HiMenuAlt3 />
          </button>
          
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
            <StyleUploadImageFunction
              onImageUpload={onLogoUpload}
              buttonTitle="Upload Store Logo"
            />
            <button className="system-control-icon settings medium" onClick={onSettingsClick}>
              <HiCog />
            </button>
          </div>
        </div>
        
        {/* Tabs Store Bar */}
        <div 
          className="tabs-store-bar-container"
          style={{
            position: 'absolute',
            left: `${'tabsPosition' in currentLayout ? currentLayout.tabsPosition : 30}%`,
            transform: 'translateX(-50%)',
            zIndex: 9
          }}
        >
          <TabsStoreBar
            activeTab={activeTab}
            onTabChange={onTabChange}
            backgroundType={backgroundType}
            solidColor={solidColor}
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
          />
        </div>
        
        {/* Account Button */}
        {currentLayout.account.visible && (
          <button 
            className="store-action-btn account-btn" 
            onClick={onAuthModalOpen}
            style={{
              position: 'absolute',
              left: `${currentLayout.account.position}%`,
              transform: 'translateX(-50%)',
              zIndex: 8
            }}
          >
            {isLoggedIn && userData ? (
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="user-avatar"
              />
            ) : (
              <span>{getIconEmoji(currentLayout.account.iconType, 'account')}</span>
            )}
          </button>
        )}

        {/* Notifications Button */}
        {currentLayout.notifications.visible && (
          <button 
            className="store-action-btn"
            style={{
              position: 'absolute',
              left: `${currentLayout.notifications.position}%`,
              transform: 'translateX(-50%)',
              zIndex: 7
            }}
          >
            <span>{getIconEmoji(currentLayout.notifications.iconType, 'notifications')}</span>
          </button>
        )}

        {/* Language Button */}
        {currentLayout.language.visible && (
          <div 
            className="language-btn-container"
            style={{
              position: 'absolute',
              left: `${currentLayout.language.position}%`,
              transform: 'translateX(-50%)',
              zIndex: 6
            }}
          >
            <button 
              className="store-action-btn language-btn" 
              onClick={onLanguageSelectorToggle}
            >
              <span>{getIconEmoji(currentLayout.language.iconType, 'language')}</span>
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
                    {selectedLanguages.map((language) => {
                      // Map native script names to display names
                      const getDisplayName = (lang: string) => {
                        const mapping: { [key: string]: string } = {
                          'English': 'English',
                          'العربية': 'العربية',
                          'Español': 'Español',
                          'Français': 'Français',
                          'Deutsch': 'Deutsch',
                          'Português': 'Português',
                          'Türkçe': 'Türkçe',
                          'हिन्दी': 'हिन्दी',
                          'Italiano': 'Italiano',
                          'Русский': 'Русский',
                          '日本語': '日本語',
                          '中文': '中文',
                          '한국어': '한국어'
                        };
                        return mapping[lang] || lang;
                      };

                      return (
                        <div 
                          key={language}
                          className={`language-selector-option ${currentLanguage === language ? 'active' : ''}`}
                          onClick={() => onLanguageChange(language)}
                        >
                          <span className="language-selector-flag">
                            <StoreBarIcons iconType="flag" language={language} />
                          </span>
                          <span className="language-selector-name">{getDisplayName(language)}</span>
                          {currentLanguage === language && (
                            <span className="language-selector-check">✓</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cart Button */}
        {currentLayout.cart.visible && (
          <button 
            className="store-action-btn cart-btn" 
            onClick={onCartDrawerOpen}
            style={{
              position: 'absolute',
              left: `${currentLayout.cart.position}%`,
              transform: 'translateX(-50%)',
              zIndex: 5
            }}
          >
            <span>{getIconEmoji(currentLayout.cart.iconType, 'cart')}</span>
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
            )}
          </button>
        )}

        {/* Wishlist Button */}
        {currentLayout.wishlist.visible && (
          <button 
            className="store-action-btn wishlist-btn" 
            onClick={onWishlistDrawerOpen}
            style={{
              position: 'absolute',
              left: `${currentLayout.wishlist.position}%`,
              transform: 'translateX(-50%)',
              zIndex: 4
            }}
          >
            <span>{getIconEmoji(currentLayout.wishlist.iconType, 'wishlist')}</span>
            {wishlistItems.length > 0 && (
              <span className="wishlist-badge">{wishlistItems.length}</span>
            )}
          </button>
        )}

        {/* Search Button */}
        {currentLayout.search.visible && (
          <button 
            className="store-action-btn search-btn" 
            onClick={onSearchBarOpen}
            style={{
              position: 'absolute',
              left: `${currentLayout.search.position}%`,
              transform: 'translateX(-50%)',
              zIndex: 3
            }}
          >
            <span>{getIconEmoji(currentLayout.search.iconType, 'search')}</span>
          </button>
        )}
      </div>


      {/* Cart Drawer */}
      <Cart
        showCartDrawer={showCartDrawer}
        cartItems={cartItems}
        onCartDrawerClose={onCartDrawerClose}
        onUpdateQuantity={onUpdateQuantity}
        onGetTotalPrice={onGetTotalPrice}
      />

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
                  <span className="empty-wishlist-icon">
                    <StoreBarIcons iconType="empty-wishlist" />
                  </span>
                  <p>Your wishlist is empty</p>
                  <button className="start-shopping-btn" onClick={() => {
                    onWishlistDrawerClose();
                    window.location.href = '/products-management';
                  }}>
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
                    <button className="view-all-btn" onClick={() => {
                      onWishlistDrawerClose();
                      window.location.href = '/products-management';
                    }}>
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
                <span className="search-icon">
                  <StoreBarIcons iconType="search" />
                </span>
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
                      <span className="no-results-icon">
                        <StoreBarIcons iconType="no-results" />
                      </span>
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
                              <StoreBarIcons iconType="wishlist" />
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

      {/* Mobile Navigation Drawer */}
      {showMobileDrawer && (
        <div className="mobile-drawer-overlay" onClick={() => setShowMobileDrawer(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <h3>Navigation</h3>
              <button 
                className="close-mobile-drawer-btn" 
                onClick={() => setShowMobileDrawer(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="mobile-drawer-content">
              <TabsStoreBar
                activeTab={activeTab}
                onTabChange={(tabId, subTabId) => {
                  onTabChange(tabId, subTabId);
                  setShowMobileDrawer(false);
                }}
                isMobile={true}
                backgroundType={backgroundType}
                solidColor={solidColor}
                gradientStart={gradientStart}
                gradientEnd={gradientEnd}
              />
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
                <span className="action-icon">
                  <StoreBarIcons iconType="profile" />
                </span>
                My Profile
              </button>
              <button className="profile-action-btn">
                <span className="action-icon">
                  <StoreBarIcons iconType="orders" />
                </span>
                My Orders
              </button>
              <button className="profile-action-btn">
                <span className="action-icon">
                  <StoreBarIcons iconType="wishlist" />
                </span>
                My Wishlist
              </button>
              <button className="profile-action-btn">
                <span className="action-icon">
                  <StoreBarIcons iconType="settings" />
                </span>
                Settings
              </button>
              <button className="profile-action-btn logout-btn" onClick={onLogout}>
                <span className="action-icon">
                  <StoreBarIcons iconType="logout" />
                </span>
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
