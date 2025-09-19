'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MobileSimulator from './EditorControls/PropertiesManagement/MobileSimulator';
import StoreBar from './StoreBasicTheme/StoreBar/StoreBar';
import EditorBarDrawer from './EditorControls/PropertiesManagement/EditorBarDrawer';
import { StoreBarElementsPositionsProvider } from './EditorControls/PropertiesManagement/StoreBarElementsPositions';
import PlatformBar from './PlatformBar';
import Footer from './StoreBasicTheme/Footer/Footer';
import { useLogoControls } from './StoreBasicTheme/StoreBar/LogoControls';
import { useCart } from './StoreBasicTheme/StoreBar/Cart';
import { useTranslation } from './EditorControls/TranslationComponent';
import './StoreHomePage.css';
import './EditorControls/PropertiesManagement/SystemControlIcons.css';

const StoreHomePage: React.FC = () => {
  const router = useRouter();
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Use the extracted logo controls hook
  const {
    storeLogo,
    logoShape,
    logoWidth,
    logoHeight,
    horizontalPadding,
    verticalPadding,
    showLogoSettings,
    handleLogoShapeChange,
    handleLogoWidthChange,
    handleLogoHeightChange,
    handleHorizontalPaddingChange,
    handleVerticalPaddingChange,
    handleCloseSettings,
    handleUpdateSettings,
    handleSettingsClick,
    setStoreLogo,
  } = useLogoControls();
  const [backgroundType, setBackgroundType] = useState<'solid' | 'gradient'>('solid');
  const [solidColor, setSolidColor] = useState('#ffffff');
  const [gradientStart, setGradientStart] = useState('#ff6b9d');
  const [gradientEnd, setGradientEnd] = useState('#c44569');
  const [showLanguageSettings, setShowLanguageSettings] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English']);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  // Use the centralized translation system
  const { t, currentLanguage, changeLanguage, translations } = useTranslation();
  const [showMobileSimulator, setShowMobileSimulator] = useState(false);
  const [storeName, setStoreName] = useState('yourstore');
  const [activeTab, setActiveTab] = useState('home');
  
  // Tab Navigation Handler
  const handleTabChange = (tabId: string, subTabId?: string) => {
    if (subTabId) {
      setActiveTab(`${tabId}-${subTabId}`);
    } else {
      setActiveTab(tabId);
    }
    
    // Handle navigation based on tab type
    console.log('Tab changed:', { tabId, subTabId });
  };
  // Use the extracted cart controls hook
  const {
    cartItems,
    showCartDrawer,
    updateQuantity,
    getTotalPrice,
    openCartDrawer,
    closeCartDrawer,
    addToCart,
  } = useCart();
  const [showWishlistDrawer, setShowWishlistDrawer] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    avatar?: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load store name from localStorage if available
  useEffect(() => {
    const savedStoreName = localStorage.getItem('currentStoreName');
    if (savedStoreName) {
      setStoreName(savedStoreName);
      // Clear the localStorage after loading
      localStorage.removeItem('currentStoreName');
    }
  }, []);

  // Cart functionality is now handled by the useCart hook

  // Wishlist data and functions
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: '4',
      name: 'Premium Leather Jacket',
      price: 199.99,
      image: '🧥',
      originalPrice: 249.99
    },
    {
      id: '5',
      name: 'Wireless Headphones',
      price: 89.99,
      image: '🎧',
      originalPrice: 119.99
    },
    {
      id: '6',
      name: 'Smart Watch',
      price: 299.99,
      image: '⌚',
      originalPrice: 399.99
    },
    {
      id: '7',
      name: 'Designer Sunglasses',
      price: 149.99,
      image: '🕶️',
      originalPrice: 199.99
    }
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const addToCartFromWishlist = (wishlistItem: any) => {
    // Add item to cart using the Cart hook
    addToCart(wishlistItem);
    
    // Remove from wishlist
    removeFromWishlist(wishlistItem.id);
  };

  // Search functionality
  const [allProducts] = useState([
    {
      id: '1',
      name: 'Classic White T-Shirt',
      price: 29.99,
      category: 'Clothing',
      collection: 'Summer Collection',
      image: '👕',
      description: 'Comfortable cotton t-shirt'
    },
    {
      id: '2',
      name: 'Denim Jeans',
      price: 79.99,
      category: 'Clothing',
      collection: 'Casual Wear',
      image: '👖',
      description: 'Classic blue denim jeans'
    },
    {
      id: '3',
      name: 'Running Shoes',
      price: 89.99,
      category: 'Footwear',
      collection: 'Sports Collection',
      image: '👟',
      description: 'Lightweight running shoes'
    },
    {
      id: '4',
      name: 'Premium Leather Jacket',
      price: 199.99,
      category: 'Clothing',
      collection: 'Winter Collection',
      image: '🧥',
      description: 'High-quality leather jacket'
    },
    {
      id: '5',
      name: 'Wireless Headphones',
      price: 89.99,
      category: 'Electronics',
      collection: 'Tech Collection',
      image: '🎧',
      description: 'Noise-cancelling headphones'
    },
    {
      id: '6',
      name: 'Smart Watch',
      price: 299.99,
      category: 'Electronics',
      collection: 'Tech Collection',
      image: '⌚',
      description: 'Feature-rich smartwatch'
    },
    {
      id: '7',
      name: 'Designer Sunglasses',
      price: 149.99,
      category: 'Accessories',
      collection: 'Summer Collection',
      image: '🕶️',
      description: 'Stylish designer sunglasses'
    },
    {
      id: '8',
      name: 'Backpack',
      price: 59.99,
      category: 'Accessories',
      collection: 'Casual Wear',
      image: '🎒',
      description: 'Durable everyday backpack'
    },
    {
      id: '9',
      name: 'Yoga Mat',
      price: 39.99,
      category: 'Sports',
      collection: 'Sports Collection',
      image: '🧘',
      description: 'Non-slip yoga mat'
    },
    {
      id: '10',
      name: 'Coffee Mug',
      price: 19.99,
      category: 'Home',
      collection: 'Kitchen Collection',
      image: '☕',
      description: 'Ceramic coffee mug'
    }
  ]);

  const filteredProducts = searchTerm
    ? allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.collection.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // In a real app, this would navigate to a search results page
      console.log('Searching for:', searchTerm);
      setShowSearchBar(false);
      setSearchTerm('');
    }
  };

  const handleSearchClose = () => {
    setShowSearchBar(false);
    setSearchTerm('');
  };

  // Authentication state and functions
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });

  const handleAuthInputChange = (field: string, value: string | boolean) => {
    setAuthForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authMode === 'signup') {
      // Validate signup form
      if (authForm.password !== authForm.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      if (authForm.password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
      }
      
      // Simulate signup
      console.log('Signing up:', authForm);
      setIsLoggedIn(true);
      setUserData({
        name: authForm.name,
        email: authForm.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authForm.name)}&background=667eea&color=fff`
      });
      setShowAuthModal(false);
      setAuthForm({ name: '', email: '', password: '', confirmPassword: '', rememberMe: false });
    } else {
      // Simulate signin
      console.log('Signing in:', authForm);
      setIsLoggedIn(true);
      setUserData({
        name: 'John Doe',
        email: authForm.email,
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff'
      });
      setShowAuthModal(false);
      setAuthForm({ name: '', email: '', password: '', confirmPassword: '', rememberMe: false });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    setAuthForm({ name: '', email: '', password: '', confirmPassword: '', rememberMe: false });
  };

  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setStoreLogo(result);
        localStorage.setItem('storeLogo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };


  useEffect(() => {
    // Logo settings are now handled by the useLogoControls hook

    // Load saved languages from localStorage
    const savedLanguages = localStorage.getItem('storeLanguages');
    if (savedLanguages) {
      setSelectedLanguages(JSON.parse(savedLanguages));
    } else {
      // If no saved languages, use the language selected from landing page
      const websiteLanguage = localStorage.getItem('websiteLanguage');
      if (websiteLanguage) {
        setSelectedLanguages([websiteLanguage]);
      }
    }

    // Language loading is now handled by TranslationComponent
  }, []);

  // Language change handling is now managed by TranslationComponent

  return (
    <StoreBarElementsPositionsProvider>
      <div className="design-store-page">
      {/* Top App Bar */}
      <PlatformBar />

      {/* Editor Bar and Drawer Component */}
      <EditorBarDrawer
        key={currentLanguage}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
        storeLogo={storeLogo}
        logoShape={logoShape}
        logoWidth={logoWidth}
        logoHeight={logoHeight}
        horizontalPadding={horizontalPadding}
        verticalPadding={verticalPadding}
        backgroundType={backgroundType}
        solidColor={solidColor}
        gradientStart={gradientStart}
        gradientEnd={gradientEnd}
        onLogoShapeChange={handleLogoShapeChange}
        onLogoWidthChange={handleLogoWidthChange}
        onLogoHeightChange={handleLogoHeightChange}
        onHorizontalPaddingChange={handleHorizontalPaddingChange}
        onVerticalPaddingChange={handleVerticalPaddingChange}
        onBackgroundTypeChange={setBackgroundType}
        onSolidColorChange={setSolidColor}
        onGradientStartChange={setGradientStart}
        onGradientEndChange={setGradientEnd}
        showLogoSettings={showLogoSettings}
        onCloseLogoSettings={handleCloseSettings}
        onUpdateLogoSettings={handleUpdateSettings}
        showLanguageSettings={showLanguageSettings}
        onOpenLanguageSettings={() => setShowLanguageSettings(true)}
        onCloseLanguageSettings={() => setShowLanguageSettings(false)}
        selectedLanguages={selectedLanguages}
        onSelectedLanguagesChange={setSelectedLanguages}
        currentLanguage={currentLanguage}
        onOpenMobileSimulator={() => setShowMobileSimulator(true)}
        t={t}
      />

      {/* Store Bar Component */}
      <StoreBar
        storeLogo={storeLogo}
        logoShape={logoShape}
        logoWidth={logoWidth}
        logoHeight={logoHeight}
        horizontalPadding={horizontalPadding}
        verticalPadding={verticalPadding}
        backgroundType={backgroundType}
        solidColor={solidColor}
        gradientStart={gradientStart}
        gradientEnd={gradientEnd}
        isLoggedIn={isLoggedIn}
        userData={userData}
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        currentLanguage={currentLanguage}
        selectedLanguages={selectedLanguages}
        showLanguageSelector={showLanguageSelector}
        showLogoSettings={showLogoSettings}
        showCartDrawer={showCartDrawer}
        showWishlistDrawer={showWishlistDrawer}
        showSearchBar={showSearchBar}
        showAuthModal={showAuthModal}
        searchTerm={searchTerm}
        authMode={authMode}
        authForm={authForm}
        allProducts={allProducts}
        onLogoUpload={handleLogoUpload}
        onSettingsClick={handleSettingsClick}
        onAuthModalOpen={() => setShowAuthModal(true)}
        onAuthModalClose={() => setShowAuthModal(false)}
        onCartDrawerOpen={openCartDrawer}
        onCartDrawerClose={closeCartDrawer}
        onWishlistDrawerOpen={() => setShowWishlistDrawer(true)}
        onWishlistDrawerClose={() => setShowWishlistDrawer(false)}
        onSearchBarOpen={() => setShowSearchBar(true)}
        onSearchBarClose={handleSearchClose}
        onLanguageSelectorToggle={() => setShowLanguageSelector(!showLanguageSelector)}
        onLanguageChange={(language) => {
          changeLanguage(language);
          setShowLanguageSelector(false);
        }}
        onSearchTermChange={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
        onAuthInputChange={handleAuthInputChange}
        onAuthSubmit={handleAuthSubmit}
        onSwitchAuthMode={switchAuthMode}
        onLogout={handleLogout}
        onUpdateQuantity={updateQuantity}
        onRemoveFromWishlist={removeFromWishlist}
        onAddToCart={addToCartFromWishlist}
        onGetTotalPrice={getTotalPrice}
        t={t}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />





      {/* Main Content */}
      <div 
        className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}
        style={{
          marginTop: `${180 + (verticalPadding * 2)}px`,
          marginLeft: showLogoSettings ? '300px' : '0',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <div className="content-area">
          <div className="content-body">
            {/* Sample Store Content */}
            <div className="store-content">
              <h1 style={{ fontSize: '32px', color: '#333', marginBottom: '20px', textAlign: 'center' }}>
                {t('welcome_title')}
              </h1>
              <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', maxWidth: '600px', lineHeight: '1.6', marginBottom: '30px' }}>
                {t('welcome_description')}
              </p>
              
            </div>
          </div>
        </div>
      </div>



      {/* Mobile Simulator */}
      <MobileSimulator 
        isOpen={showMobileSimulator} 
        onClose={() => setShowMobileSimulator(false)}
        storeLogo={storeLogo || undefined}
        currentLanguage={currentLanguage}
        translations={translations}
        storeName={storeName}
      />

      {/* Footer Component */}
      <Footer 
        currentLanguage={currentLanguage}
        translations={translations}
        t={t}
      />

      </div>
    </StoreBarElementsPositionsProvider>
  );
};

export default StoreHomePage;
