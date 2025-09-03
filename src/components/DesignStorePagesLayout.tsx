'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MobileSimulator from './MobileSimulator';
import StoreBar from './StoreBar';
import EditorBarDrawer from './EditorBarDrawer';
import PlatformBar from './PlatformBar';
import Footer from './Footer';
import './DesignStorePagesLayout.css';

interface DesignStorePagesLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  backUrl?: string;
  onBackClick?: () => void;
}

const DesignStorePagesLayout: React.FC<DesignStorePagesLayoutProps> = ({
  children,
  title,
  showBackButton = true,
  backUrl = '/profile',
  onBackClick
}) => {
  const router = useRouter();
  
  // State management for all layout components
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [storeLogo, setStoreLogo] = useState<string | null>(null);
  const [showLogoSettings, setShowLogoSettings] = useState(false);
  const [logoShape, setLogoShape] = useState<'circle' | 'rectangle'>('circle');
  const [logoWidth, setLogoWidth] = useState(64);
  const [logoHeight, setLogoHeight] = useState(64);
  const [horizontalPadding, setHorizontalPadding] = useState(16);
  const [verticalPadding, setVerticalPadding] = useState(16);
  const [showLanguageSettings, setShowLanguageSettings] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English']);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [showMobileSimulator, setShowMobileSimulator] = useState(false);
  const [storeName, setStoreName] = useState('yourstore');
  const [showCartDrawer, setShowCartDrawer] = useState(false);
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

  // Cart data and functions
  const [cartItems, setCartItems] = useState([
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

  const addToCart = (wishlistItem: any) => {
    // Add item to cart
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === wishlistItem.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === wishlistItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...wishlistItem, quantity: 1 }];
      }
    });
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
      collection: 'Basics',
      image: '👕',
      description: 'A comfortable and versatile white t-shirt.'
    },
    {
      id: '2',
      name: 'Denim Jeans',
      price: 59.99,
      category: 'Clothing',
      collection: 'Denim',
      image: '👖',
      description: 'Classic blue denim jeans with perfect fit.'
    },
    {
      id: '3',
      name: 'Running Shoes',
      price: 89.99,
      category: 'Footwear',
      collection: 'Sports',
      image: '👟',
      description: 'Lightweight running shoes for maximum comfort.'
    }
  ]);

  // Logo handling functions
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStoreLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSettingsClick = () => {
    setShowLogoSettings(true);
  };

  // Custom function to handle logo shape changes
  const handleLogoShapeChange = (shape: 'circle' | 'rectangle') => {
    setLogoShape(shape);
    // When switching to circle, sync height with width
    if (shape === 'circle') {
      setLogoHeight(logoWidth);
    }
  };

  // Custom function to handle logo width changes
  const handleLogoWidthChange = (width: number) => {
    setLogoWidth(width);
    // When in circle mode, sync height with width
    if (logoShape === 'circle') {
      setLogoHeight(width);
    }
  };

  // Search and auth functions
  const handleSearchClose = () => {
    setShowSearchBar(false);
    setSearchTerm('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    console.log('Search submitted:', searchTerm);
  };

  const handleAuthInputChange = (field: string, value: string | boolean) => {
    // Handle auth form input changes
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle auth submission
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  // Translation system
  const translations = {
    English: {
      store_pages: 'Store Pages',
      home: 'Home',
      product_page: 'Product Page',
      collections: 'Collections',
      catalog: 'Catalog',
      cart_page: 'Cart Page',
      shipping_pay: 'Shipping & Payment',
      general_pages: 'General Pages',
      language: 'Language',
      logout: 'Logout',
      select_language: 'Select Language',
      store_languages: 'Store Languages',
      subscribe_title: 'Stay Updated',
      subscribe_subtitle: 'Get the latest updates and exclusive offers',
      email_placeholder: 'Enter your email address',
      subscribe_btn: 'Subscribe',
      collection_page: 'Collection Page',
      product_page_detail: 'Product Page Detail',
      catalog_page: 'Catalog Page'
    },
    Arabic: {
      store_pages: 'صفحات المتجر',
      home: 'الرئيسية',
      product_page: 'صفحة المنتج',
      collections: 'المجموعات',
      catalog: 'الفهرس',
      cart_page: 'صفحة السلة',
      shipping_pay: 'الشحن والدفع',
      general_pages: 'الصفحات العامة',
      language: 'اللغة',
      logout: 'تسجيل الخروج',
      select_language: 'اختر اللغة',
      store_languages: 'لغات المتجر',
      subscribe_title: 'ابق محدثاً',
      subscribe_subtitle: 'احصل على آخر التحديثات والعروض الحصرية',
      email_placeholder: 'أدخل عنوان بريدك الإلكتروني',
      subscribe_btn: 'اشتراك',
      collection_page: 'صفحة المجموعة',
      product_page_detail: 'تفاصيل صفحة المنتج',
      catalog_page: 'صفحة الفهرس'
    },
    French: {
      store_pages: 'Pages du Magasin',
      home: 'Accueil',
      product_page: 'Page Produit',
      collections: 'Collections',
      catalog: 'Catalogue',
      cart_page: 'Page Panier',
      shipping_pay: 'Livraison & Paiement',
      general_pages: 'Pages Générales',
      language: 'Langue',
      logout: 'Déconnexion',
      select_language: 'Sélectionner la Langue',
      store_languages: 'Langues du Magasin',
      subscribe_title: 'Restez Informé',
      subscribe_subtitle: 'Recevez les dernières mises à jour et offres exclusives',
      email_placeholder: 'Entrez votre adresse email',
      subscribe_btn: 'S\'abonner',
      collection_page: 'Page Collection',
      product_page_detail: 'Détail Page Produit',
      catalog_page: 'Page Catalogue'
    },
    German: {
      store_pages: 'Shop-Seiten',
      home: 'Startseite',
      product_page: 'Produktseite',
      collections: 'Kollektionen',
      catalog: 'Katalog',
      cart_page: 'Warenkorb-Seite',
      shipping_pay: 'Versand & Zahlung',
      general_pages: 'Allgemeine Seiten',
      language: 'Sprache',
      logout: 'Abmelden',
      select_language: 'Sprache Auswählen',
      store_languages: 'Shop-Sprachen',
      subscribe_title: 'Bleiben Sie Informiert',
      subscribe_subtitle: 'Erhalten Sie die neuesten Updates und exklusive Angebote',
      email_placeholder: 'Geben Sie Ihre E-Mail-Adresse ein',
      subscribe_btn: 'Abonnieren',
      collection_page: 'Kollektionsseite',
      product_page_detail: 'Produktseiten-Detail',
      catalog_page: 'Katalogseite'
    },
    Portuguese: {
      store_pages: 'Páginas da Loja',
      home: 'Início',
      product_page: 'Página do Produto',
      collections: 'Coleções',
      catalog: 'Catálogo',
      cart_page: 'Página do Carrinho',
      shipping_pay: 'Envio & Pagamento',
      general_pages: 'Páginas Gerais',
      language: 'Idioma',
      logout: 'Sair',
      select_language: 'Selecionar Idioma',
      store_languages: 'Idiomas da Loja',
      subscribe_title: 'Mantenha-se Atualizado',
      subscribe_subtitle: 'Receba as últimas atualizações e ofertas exclusivas',
      email_placeholder: 'Digite seu endereço de email',
      subscribe_btn: 'Inscrever-se',
      collection_page: 'Página da Coleção',
      product_page_detail: 'Detalhe da Página do Produto',
      catalog_page: 'Página do Catálogo'
    },
    Turkish: {
      store_pages: 'Mağaza Sayfaları',
      home: 'Ana Sayfa',
      product_page: 'Ürün Sayfası',
      collections: 'Koleksiyonlar',
      catalog: 'Katalog',
      cart_page: 'Sepet Sayfası',
      shipping_pay: 'Kargo & Ödeme',
      general_pages: 'Genel Sayfalar',
      language: 'Dil',
      logout: 'Çıkış',
      select_language: 'Dil Seçin',
      store_languages: 'Mağaza Dilleri',
      subscribe_title: 'Güncel Kalın',
      subscribe_subtitle: 'En son güncellemeleri ve özel teklifleri alın',
      email_placeholder: 'E-posta adresinizi girin',
      subscribe_btn: 'Abone Ol',
      collection_page: 'Koleksiyon Sayfası',
      product_page_detail: 'Ürün Sayfası Detayı',
      catalog_page: 'Katalog Sayfası'
    },
    Hindi: {
      store_pages: 'स्टोर पेज',
      home: 'होम',
      product_page: 'प्रोडक्ट पेज',
      collections: 'कलेक्शन',
      catalog: 'कैटलॉग',
      cart_page: 'कार्ट पेज',
      shipping_pay: 'शिपिंग और भुगतान',
      general_pages: 'सामान्य पेज',
      language: 'भाषा',
      logout: 'लॉगआउट',
      select_language: 'भाषा चुनें',
      store_languages: 'स्टोर भाषाएं',
      subscribe_title: 'अपडेट रहें',
      subscribe_subtitle: 'नवीनतम अपडेट और विशेष ऑफर प्राप्त करें',
      email_placeholder: 'अपना ईमेल पता दर्ज करें',
      subscribe_btn: 'सदस्यता लें',
      collection_page: 'कलेक्शन पेज',
      product_page_detail: 'प्रोडक्ट पेज विवरण',
      catalog_page: 'कैटलॉग पेज'
    },
    Italian: {
      store_pages: 'Pagine del Negozio',
      home: 'Home',
      product_page: 'Pagina Prodotto',
      collections: 'Collezioni',
      catalog: 'Catalogo',
      cart_page: 'Pagina Carrello',
      shipping_pay: 'Spedizione & Pagamento',
      general_pages: 'Pagine Generali',
      language: 'Lingua',
      logout: 'Logout',
      select_language: 'Seleziona Lingua',
      store_languages: 'Lingue del Negozio',
      subscribe_title: 'Rimani Aggiornato',
      subscribe_subtitle: 'Ricevi gli ultimi aggiornamenti e offerte esclusive',
      email_placeholder: 'Inserisci il tuo indirizzo email',
      subscribe_btn: 'Iscriviti',
      collection_page: 'Pagina Collezione',
      product_page_detail: 'Dettaglio Pagina Prodotto',
      catalog_page: 'Pagina Catalogo'
    },
    Russian: {
      store_pages: 'Страницы Магазина',
      home: 'Главная',
      product_page: 'Страница Товара',
      collections: 'Коллекции',
      catalog: 'Каталог',
      cart_page: 'Страница Корзины',
      shipping_pay: 'Доставка и Оплата',
      general_pages: 'Общие Страницы',
      language: 'Язык',
      logout: 'Выйти',
      select_language: 'Выбрать Язык',
      store_languages: 'Языки Магазина',
      subscribe_title: 'Оставайтесь в Курсе',
      subscribe_subtitle: 'Получайте последние обновления и эксклюзивные предложения',
      email_placeholder: 'Введите ваш email адрес',
      subscribe_btn: 'Подписаться',
      collection_page: 'Страница Коллекции',
      product_page_detail: 'Детали Страницы Товара',
      catalog_page: 'Страница Каталога'
    },
    Japanese: {
      store_pages: 'ストアページ',
      home: 'ホーム',
      product_page: '商品ページ',
      collections: 'コレクション',
      catalog: 'カタログ',
      cart_page: 'カートページ',
      shipping_pay: '配送と支払い',
      general_pages: '一般ページ',
      language: '言語',
      logout: 'ログアウト',
      select_language: '言語を選択',
      store_languages: 'ストア言語',
      subscribe_title: '最新情報を入手',
      subscribe_subtitle: '最新のアップデートと限定オファーを受け取る',
      email_placeholder: 'メールアドレスを入力してください',
      subscribe_btn: '購読する',
      collection_page: 'コレクションページ',
      product_page_detail: '商品ページ詳細',
      catalog_page: 'カタログページ'
    }
  };

  const t = (key: string) => {
    return translations[currentLanguage]?.[key] || translations['English'][key] || key;
  };

  return (
    <div className="design-store-pages-layout">
      {/* Platform Bar - Fixed top navigation */}
      <PlatformBar
        title={title}
        showBackButton={showBackButton}
        backUrl={backUrl}
        onBackClick={onBackClick}
      />

      {/* Editor Bar and Drawer */}
      <EditorBarDrawer
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        storeLogo={storeLogo}
        logoShape={logoShape}
        logoWidth={logoWidth}
        logoHeight={logoHeight}
        horizontalPadding={horizontalPadding}
        verticalPadding={verticalPadding}
        onLogoShapeChange={handleLogoShapeChange}
        onLogoWidthChange={handleLogoWidthChange}
        onLogoHeightChange={setLogoHeight}
        onHorizontalPaddingChange={setHorizontalPadding}
        onVerticalPaddingChange={setVerticalPadding}
        showLogoSettings={showLogoSettings}
        onCloseLogoSettings={() => setShowLogoSettings(false)}
        onUpdateLogoSettings={() => setShowLogoSettings(false)}
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
        authForm={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          rememberMe: false
        }}
        allProducts={allProducts}
        onLogoUpload={handleLogoUpload}
        onSettingsClick={handleSettingsClick}
        onAuthModalOpen={() => setShowAuthModal(true)}
        onAuthModalClose={() => setShowAuthModal(false)}
        onCartDrawerOpen={() => setShowCartDrawer(true)}
        onCartDrawerClose={() => setShowCartDrawer(false)}
        onWishlistDrawerOpen={() => setShowWishlistDrawer(true)}
        onWishlistDrawerClose={() => setShowWishlistDrawer(false)}
        onSearchBarOpen={() => setShowSearchBar(true)}
        onSearchBarClose={handleSearchClose}
        onLanguageSelectorToggle={() => setShowLanguageSelector(!showLanguageSelector)}
        onLanguageChange={(language) => {
          setCurrentLanguage(language);
          setShowLanguageSelector(false);
          localStorage.setItem('currentLanguage', language);
        }}
        onSearchTermChange={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
        onAuthInputChange={handleAuthInputChange}
        onAuthSubmit={handleAuthSubmit}
        onSwitchAuthMode={switchAuthMode}
        onLogout={handleLogout}
        onUpdateQuantity={updateQuantity}
        onRemoveFromWishlist={removeFromWishlist}
        onAddToCart={addToCart}
        onGetTotalPrice={getTotalPrice}
        t={t}
      />

      {/* Main Content Area */}
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
            {children}
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
      <Footer />
    </div>
  );
};

export default DesignStorePagesLayout;
