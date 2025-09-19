'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MobileSimulator from './EditorControls/PropertiesManagement/MobileSimulator';
import StoreBar from './StoreBasicTheme/StoreBar/StoreBar';
import EditorBarDrawer from './EditorControls/PropertiesManagement/EditorBarDrawer';
import { StoreBarElementsPositionsProvider } from './EditorControls/PropertiesManagement/StoreBarElementsPositions';
import PlatformBar from './PlatformBar';
import Footer from './StoreBasicTheme/Footer/Footer';
import HomePageCard from './StoreBasicTheme/HomePageCardComponents/HomePageCard';
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
  
  // Tab Navigation States
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

  // Translation functionality is now handled by the TranslationComponent
  /*
  const translations = {
    'English': {
      'subscribe_title': 'Subscribe to our emails',
      'subscribe_subtitle': 'Be the first to know about new collections exclusive offers',
      'email_placeholder': 'Email',
      'select_language': 'Select Language',
      'store_languages': 'Store Languages',
      'language_description': 'Select the languages in which your store will be displayed. Customers can switch between these languages using the language icon in the store bar.',
      'save_languages': 'Save Languages',
      'cancel': 'Cancel',
      'close': 'Close',
      'update': 'Update',
      'logo_settings': 'Logo Settings',
      'store_pages': 'Store Pages',
      'home': 'Home',
      'product_page': 'Product Page',
      'collections': 'Collections',
      'catalog': 'Catalog',
      'cart_page': 'Cart Page',
      'shipping_pay': 'Shipping & Pay',
      'general_pages': 'General Pages',
      'collection_page': 'Collection Page',
      'product_page_detail': 'Product Page',
      'catalog_page': 'Catalog Page',
      'language': 'Language',
      'logout': 'Log out',
      'welcome_title': 'Welcome to Your Store',
      'welcome_description': 'This is your store\'s main content area. Here you can add your products, collections, and other store content. The footer below will always stay at the bottom of the page.',
      'free_shipping': 'Free Shipping',
      'free_shipping_description': 'Kirrin Finch is proud to offer free shipping in the US on all orders of $200 and above. We also offer low rates to international destinations.',
      'about': 'About',
      'our_story': 'Our Story',
      'press_media': 'Press & Media',
      'careers': 'Careers',
      'sustainability': 'Sustainability',
      'social_giveback': 'Social Giveback',
      'resources': 'Resources',
      'blog': 'Blog',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': 'Garment Care',
      'fit_size_guide': 'Fit & Size Guide',
      'support': 'Support',
      'help_center': 'Help Center',
      'contact_us': 'Contact Us',
      'shipping_returns': 'Shipping & Returns',
      'start_return_exchange': 'Start A Return or Exchange',
      'add_product': 'Product',
      'add_collection': 'Collection',
      'create_catalog': 'Create Catalog',
      'create_page': 'Create Page',
      'mobile': 'Mobile',
      'publish': 'Publish'
    },
    'Chinese': {
      'subscribe_title': '订阅我们的邮件',
      'subscribe_subtitle': '第一时间了解新系列和独家优惠',
      'email_placeholder': '电子邮件',
      'select_language': '选择语言',
      'store_languages': '商店语言',
      'language_description': '选择您的商店将显示的语言。客户可以使用商店栏中的语言图标在这些语言之间切换。',
      'save_languages': '保存语言',
      'cancel': '取消',
      'close': '关闭',
      'update': '更新',
      'logo_settings': '标志设置',
      'store_pages': '商店页面',
      'home': '首页',
      'product_page': '产品页面',
      'collections': '系列',
      'catalog': '目录',
      'cart_page': '购物车页面',
      'shipping_pay': '配送和支付',
      'general_pages': '通用页面',
      'collection_page': '系列页面',
      'product_page_detail': '产品页面',
      'catalog_page': '目录页面',
      'language': '语言',
      'logout': '退出登录',
      'welcome_title': '欢迎来到您的商店',
      'welcome_description': '这是您商店的主要内容区域。在这里您可以添加您的产品、系列和其他商店内容。下面的页脚将始终保持在页面底部。',
      'free_shipping': '免费配送',
      'free_shipping_description': 'Kirrin Finch 很自豪为美国所有200美元及以上的订单提供免费配送。我们还为国际目的地提供低费率。',
      'about': '关于我们',
      'our_story': '我们的故事',
      'press_media': '新闻和媒体',
      'careers': '职业',
      'sustainability': '可持续性',
      'social_giveback': '社会回馈',
      'resources': '资源',
      'blog': '博客',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': '服装护理',
      'fit_size_guide': '尺码指南',
      'support': '支持',
      'help_center': '帮助中心',
      'contact_us': '联系我们',
      'shipping_returns': '配送和退货',
      'start_return_exchange': '开始退货或换货',
      'add_product': '产品',
      'add_collection': '系列',
      'create_catalog': '创建目录',
      'create_page': '创建页面',
      'mobile': '移动端',
      'publish': '发布'
    },
    'Korean': {
      'subscribe_title': '이메일 구독',
      'subscribe_subtitle': '새로운 컬렉션과 독점 오퍼를 가장 먼저 알아보세요',
      'email_placeholder': '이메일',
      'select_language': '언어 선택',
      'store_languages': '스토어 언어',
      'language_description': '스토어가 표시될 언어를 선택하세요. 고객은 스토어 바의 언어 아이콘을 사용하여 이러한 언어 간에 전환할 수 있습니다.',
      'save_languages': '언어 저장',
      'cancel': '취소',
      'close': '닫기',
      'update': '업데이트',
      'logo_settings': '로고 설정',
      'store_pages': '스토어 페이지',
      'home': '홈',
      'product_page': '제품 페이지',
      'collections': '컬렉션',
      'catalog': '카탈로그',
      'cart_page': '장바구니 페이지',
      'shipping_pay': '배송 및 결제',
      'general_pages': '일반 페이지',
      'collection_page': '컬렉션 페이지',
      'product_page_detail': '제품 페이지',
      'catalog_page': '카탈로그 페이지',
      'language': '언어',
      'logout': '로그아웃',
      'welcome_title': '스토어에 오신 것을 환영합니다',
      'welcome_description': '이것은 스토어의 주요 콘텐츠 영역입니다. 여기에서 제품, 컬렉션 및 기타 스토어 콘텐츠를 추가할 수 있습니다. 아래 푸터는 항상 페이지 하단에 유지됩니다.',
      'free_shipping': '무료 배송',
      'free_shipping_description': 'Kirrin Finch는 미국에서 $200 이상의 모든 주문에 대해 무료 배송을 제공하는 것을 자랑스럽게 생각합니다. 국제 목적지에도 낮은 요금을 제공합니다.',
      'about': '회사 소개',
      'our_story': '우리의 이야기',
      'press_media': '언론 및 미디어',
      'careers': '채용',
      'sustainability': '지속가능성',
      'social_giveback': '사회적 기여',
      'resources': '리소스',
      'blog': '블로그',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': '의류 관리',
      'fit_size_guide': '사이즈 가이드',
      'support': '지원',
      'help_center': '도움말 센터',
      'contact_us': '문의하기',
      'shipping_returns': '배송 및 반품',
      'start_return_exchange': '반품 또는 교환 시작',
      'add_product': '제품',
      'add_collection': '컬렉션',
      'create_catalog': '카탈로그 만들기',
      'create_page': '페이지 만들기',
      'mobile': '모바일',
      'publish': '게시'
    },
    'Arabic': {
      'subscribe_title': 'اشترك في رسائلنا الإلكترونية',
      'subscribe_subtitle': 'كن أول من يعرف عن المجموعات الجديدة والعروض الحصرية',
      'email_placeholder': 'البريد الإلكتروني',
      'select_language': 'اختر اللغة',
      'store_languages': 'لغات المتجر',
      'language_description': 'اختر اللغات التي سيتم عرض متجرك بها. يمكن للعملاء التبديل بين هذه اللغات باستخدام أيقونة اللغة في شريط المتجر.',
      'save_languages': 'حفظ اللغات',
      'cancel': 'إلغاء',
      'close': 'إغلاق',
      'update': 'تحديث',
      'logo_settings': 'إعدادات الشعار',
      'store_pages': 'صفحات المتجر',
      'home': 'الرئيسية',
      'product_page': 'صفحة المنتج',
      'collections': 'المجموعات',
      'catalog': 'الكاتالوج',
      'cart_page': 'صفحة السلة',
      'shipping_pay': 'الشحن والدفع',
      'general_pages': 'الصفحات العامة',
      'collection_page': 'صفحة المجموعة',
      'product_page_detail': 'صفحة المنتج',
      'catalog_page': 'صفحة الكاتالوج',
      'language': 'اللغة',
      'logout': 'تسجيل الخروج'
    },
    'العربية': {
      'subscribe_title': 'اشترك في رسائلنا الإلكترونية',
      'subscribe_subtitle': 'كن أول من يعرف عن المجموعات الجديدة والعروض الحصرية',
      'email_placeholder': 'البريد الإلكتروني',
      'select_language': 'اختر اللغة',
      'store_languages': 'لغات المتجر',
      'language_description': 'اختر اللغات التي سيتم عرض متجرك بها. يمكن للعملاء التبديل بين هذه اللغات باستخدام أيقونة اللغة في شريط المتجر.',
      'save_languages': 'حفظ اللغات',
      'cancel': 'إلغاء',
      'close': 'إغلاق',
      'update': 'تحديث',
      'logo_settings': 'إعدادات الشعار',
      'store_pages': 'صفحات المتجر',
      'home': 'الرئيسية',
      'product_page': 'صفحة المنتج',
      'collections': 'المجموعات',
      'catalog': 'الكاتالوج',
      'cart_page': 'صفحة السلة',
      'shipping_pay': 'الشحن والدفع',
      'general_pages': 'الصفحات العامة',
      'collection_page': 'صفحة المجموعة',
      'product_page_detail': 'صفحة المنتج',
      'catalog_page': 'صفحة الكاتالوج',
      'language': 'اللغة',
      'logout': 'تسجيل الخروج',
      'welcome_title': 'مرحباً بك في متجرك',
      'welcome_description': 'هذه هي المنطقة الرئيسية لمحتوى متجرك. يمكنك هنا إضافة منتجاتك ومجموعاتك ومحتوى المتجر الآخر. التذييل أدناه سيبقى دائماً في أسفل الصفحة.',
      'free_shipping': 'شحن مجاني',
      'free_shipping_description': 'كيرين فينش فخور بتقديم شحن مجاني في الولايات المتحدة لجميع الطلبات بقيمة 200 دولار وأكثر. نقدم أيضاً أسعار منخفضة للوجهات الدولية.',
      'about': 'حولنا',
      'our_story': 'قصتنا',
      'press_media': 'الصحافة والإعلام',
      'careers': 'الوظائف',
      'sustainability': 'الاستدامة',
      'social_giveback': 'العطاء الاجتماعي',
      'resources': 'الموارد',
      'blog': 'المدونة',
      'dapper_scouts': 'دابر سكاوتس',
      'garment_care': 'العناية بالملابس',
      'fit_size_guide': 'دليل المقاسات',
      'support': 'الدعم',
      'help_center': 'مركز المساعدة',
      'contact_us': 'اتصل بنا',
      'shipping_returns': 'الشحن والإرجاع',
      'start_return_exchange': 'بدء إرجاع أو استبدال',
      'add_product': 'منتج',
      'add_collection': 'مجموعة',
      'create_catalog': 'إنشاء كتالوج',
      'create_page': 'إنشاء صفحة',
      'mobile': 'موبايل',
      'publish': 'نشر'
    },
    'Spanish': {
      'subscribe_title': 'Suscríbete a nuestros correos',
      'subscribe_subtitle': 'Sé el primero en conocer nuevas colecciones y ofertas exclusivas',
      'email_placeholder': 'Correo electrónico',
      'select_language': 'Seleccionar idioma',
      'store_languages': 'Idiomas de la tienda',
      'language_description': 'Selecciona los idiomas en los que se mostrará tu tienda. Los clientes pueden cambiar entre estos idiomas usando el ícono de idioma en la barra de la tienda.',
      'save_languages': 'Guardar idiomas',
      'cancel': 'Cancelar',
      'close': 'Cerrar',
      'update': 'Actualizar',
      'logo_settings': 'Configuración del logo',
      'store_pages': 'Páginas de la tienda',
      'home': 'Inicio',
      'product_page': 'Página de producto',
      'collections': 'Colecciones',
      'catalog': 'Catálogo',
      'cart_page': 'Página del carrito',
      'shipping_pay': 'Envío y pago',
      'general_pages': 'Páginas generales',
      'collection_page': 'Página de colección',
      'product_page_detail': 'Página de producto',
      'catalog_page': 'Página de catálogo',
      'language': 'Idioma',
      'logout': 'Cerrar sesión',
      'welcome_title': 'Bienvenido a tu tienda',
      'welcome_description': 'Esta es el área principal de contenido de tu tienda. Aquí puedes agregar tus productos, colecciones y otro contenido de la tienda. El pie de página de abajo siempre permanecerá en la parte inferior de la página.',
      'free_shipping': 'Envío gratis',
      'free_shipping_description': 'Kirrin Finch se enorgullece de ofrecer envío gratis en EE.UU. en todos los pedidos de $200 y más. También ofrecemos tarifas bajas a destinos internacionales.',
      'about': 'Acerca de',
      'our_story': 'Nuestra historia',
      'press_media': 'Prensa y medios',
      'careers': 'Carreras',
      'sustainability': 'Sostenibilidad',
      'social_giveback': 'Retribución social',
      'resources': 'Recursos',
      'blog': 'Blog',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': 'Cuidado de prendas',
      'fit_size_guide': 'Guía de tallas',
      'support': 'Soporte',
      'help_center': 'Centro de ayuda',
      'contact_us': 'Contáctanos',
      'shipping_returns': 'Envíos y devoluciones',
      'start_return_exchange': 'Iniciar devolución o intercambio',
      'add_product': 'Producto',
      'add_collection': 'Colección',
      'create_catalog': 'Crear catálogo',
      'create_page': 'Crear página',
      'mobile': 'Móvil',
      'publish': 'Publicar'
    },
    'Español': {
      'subscribe_title': 'Suscríbete a nuestros correos',
      'subscribe_subtitle': 'Sé el primero en conocer nuevas colecciones y ofertas exclusivas',
      'email_placeholder': 'Correo electrónico',
      'select_language': 'Seleccionar idioma',
      'store_languages': 'Idiomas de la tienda',
      'language_description': 'Selecciona los idiomas en los que se mostrará tu tienda. Los clientes pueden cambiar entre estos idiomas usando el ícono de idioma en la barra de la tienda.',
      'save_languages': 'Guardar idiomas',
      'cancel': 'Cancelar',
      'close': 'Cerrar',
      'update': 'Actualizar',
      'logo_settings': 'Configuración del logo',
      'store_pages': 'Páginas de la tienda',
      'home': 'Inicio',
      'product_page': 'Página de producto',
      'collections': 'Colecciones',
      'catalog': 'Catálogo',
      'cart_page': 'Página del carrito',
      'shipping_pay': 'Envío y pago',
      'general_pages': 'Páginas generales',
      'collection_page': 'Página de colección',
      'product_page_detail': 'Página de producto',
      'catalog_page': 'Página de catálogo',
      'language': 'Idioma',
      'logout': 'Cerrar sesión',
      'welcome_title': 'Bienvenido a tu tienda',
      'welcome_description': 'Esta es el área principal de contenido de tu tienda. Aquí puedes agregar tus productos, colecciones y otro contenido de la tienda. El pie de página de abajo siempre permanecerá en la parte inferior de la página.',
      'free_shipping': 'Envío gratis',
      'free_shipping_description': 'Kirrin Finch se enorgullece de ofrecer envío gratis en EE.UU. en todos los pedidos de $200 y más. También ofrecemos tarifas bajas a destinos internacionales.',
      'about': 'Acerca de',
      'our_story': 'Nuestra historia',
      'press_media': 'Prensa y medios',
      'careers': 'Carreras',
      'sustainability': 'Sostenibilidad',
      'social_giveback': 'Retribución social',
      'resources': 'Recursos',
      'blog': 'Blog',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': 'Cuidado de prendas',
      'fit_size_guide': 'Guía de tallas',
      'support': 'Soporte',
      'help_center': 'Centro de ayuda',
      'contact_us': 'Contáctanos',
      'shipping_returns': 'Envíos y devoluciones',
      'start_return_exchange': 'Iniciar devolución o intercambio',
      'add_product': 'Producto',
      'add_collection': 'Colección',
      'create_catalog': 'Crear catálogo',
      'create_page': 'Crear página',
      'mobile': 'Móvil',
      'publish': 'Publicar'
    },
    'French': {
      'subscribe_title': 'Abonnez-vous à nos emails',
      'subscribe_subtitle': 'Soyez le premier à connaître les nouvelles collections et offres exclusives',
      'email_placeholder': 'Email',
      'select_language': 'Sélectionner la langue',
      'store_languages': 'Langues du magasin',
      'language_description': 'Sélectionnez les langues dans lesquelles votre magasin sera affiché. Les clients peuvent basculer entre ces langues en utilisant l\'icône de langue dans la barre du magasin.',
      'save_languages': 'Enregistrer les langues',
      'cancel': 'Annuler',
      'close': 'Fermer',
      'update': 'Mettre à jour',
      'logo_settings': 'Paramètres du logo',
      'store_pages': 'Pages du magasin',
      'home': 'Accueil',
      'product_page': 'Page produit',
      'collections': 'Collections',
      'catalog': 'Catalogue',
      'cart_page': 'Page panier',
      'shipping_pay': 'Livraison et paiement',
      'general_pages': 'Pages générales',
      'collection_page': 'Page de collection',
      'product_page_detail': 'Page produit',
      'catalog_page': 'Page catalogue',
      'language': 'Langue',
      'logout': 'Se déconnecter',
      'welcome_title': 'Bienvenue dans votre magasin',
      'welcome_description': 'Ceci est la zone principale de contenu de votre magasin. Ici, vous pouvez ajouter vos produits, collections et autre contenu du magasin. Le pied de page ci-dessous restera toujours en bas de la page.',
      'free_shipping': 'Livraison gratuite',
      'free_shipping_description': 'Kirrin Finch est fier d\'offrir la livraison gratuite aux États-Unis sur toutes les commandes de 200 $ et plus. Nous offrons également des tarifs bas vers les destinations internationales.',
      'about': 'À propos',
      'our_story': 'Notre histoire',
      'press_media': 'Presse et médias',
      'careers': 'Carrières',
      'sustainability': 'Durabilité',
      'social_giveback': 'Redonner socialement',
      'resources': 'Ressources',
      'blog': 'Blog',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': 'Soins des vêtements',
      'fit_size_guide': 'Guide des tailles',
      'support': 'Support',
      'help_center': 'Centre d\'aide',
      'contact_us': 'Nous contacter',
      'shipping_returns': 'Livraison et retours',
      'start_return_exchange': 'Commencer un retour ou échange',
      'add_product': 'Produit',
      'add_collection': 'Collection',
      'create_catalog': 'Créer un catalogue',
      'create_page': 'Créer une page',
      'mobile': 'Mobile',
      'publish': 'Publier'
    },
    'German': {
      'subscribe_title': 'Abonnieren Sie unsere E-Mails',
      'subscribe_subtitle': 'Seien Sie der Erste, der neue Kollektionen und exklusive Angebote erfährt',
      'email_placeholder': 'E-Mail',
      'select_language': 'Sprache auswählen',
      'store_languages': 'Shop-Sprachen',
      'language_description': 'Wählen Sie die Sprachen aus, in denen Ihr Shop angezeigt wird. Kunden können zwischen diesen Sprachen wechseln, indem sie das Sprachsymbol in der Shop-Leiste verwenden.',
      'save_languages': 'Sprachen speichern',
      'cancel': 'Abbrechen',
      'close': 'Schließen',
      'update': 'Aktualisieren',
      'logo_settings': 'Logo-Einstellungen',
      'store_pages': 'Shop-Seiten',
      'home': 'Startseite',
      'product_page': 'Produktseite',
      'collections': 'Kollektionen',
      'catalog': 'Katalog',
      'cart_page': 'Warenkorb-Seite',
      'shipping_pay': 'Versand und Zahlung',
      'general_pages': 'Allgemeine Seiten',
      'collection_page': 'Kollektion-Seite',
      'product_page_detail': 'Produktseite',
      'catalog_page': 'Katalog-Seite',
      'language': 'Sprache',
      'logout': 'Abmelden',
      'welcome_title': 'Willkommen in Ihrem Shop',
      'welcome_description': 'Dies ist der Hauptinhalt Ihres Shops. Hier können Sie Ihre Produkte, Kollektionen und anderen Shop-Inhalt hinzufügen. Die Fußzeile unten bleibt immer am unteren Rand der Seite.',
      'free_shipping': 'Kostenloser Versand',
      'free_shipping_description': 'Kirrin Finch ist stolz darauf, kostenlosen Versand in den USA bei allen Bestellungen ab 200 $ anzubieten. Wir bieten auch niedrige Tarife für internationale Ziele.',
      'about': 'Über uns',
      'our_story': 'Unsere Geschichte',
      'press_media': 'Presse und Medien',
      'careers': 'Karrieren',
      'sustainability': 'Nachhaltigkeit',
      'social_giveback': 'Soziales Engagement',
      'resources': 'Ressourcen',
      'blog': 'Blog',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': 'Kleidungspflege',
      'fit_size_guide': 'Größenführer',
      'support': 'Support',
      'help_center': 'Hilfezentrum',
      'contact_us': 'Kontaktieren Sie uns',
      'shipping_returns': 'Versand und Rücksendungen',
      'start_return_exchange': 'Rücksendung oder Umtausch starten',
      'add_product': 'Produkt',
      'add_collection': 'Kollektion',
      'create_catalog': 'Katalog erstellen',
      'create_page': 'Seite erstellen',
      'mobile': 'Mobil',
      'publish': 'Veröffentlichen'
    },
    'Portuguese': {
      'subscribe_title': 'Inscreva-se em nossos emails',
      'subscribe_subtitle': 'Seja o primeiro a conhecer novas coleções e ofertas exclusivas',
      'email_placeholder': 'Email',
      'select_language': 'Selecionar idioma',
      'store_languages': 'Idiomas da loja',
      'language_description': 'Selecione os idiomas em que sua loja será exibida. Os clientes podem alternar entre esses idiomas usando o ícone de idioma na barra da loja.',
      'save_languages': 'Salvar idiomas',
      'cancel': 'Cancelar',
      'close': 'Fechar',
      'update': 'Atualizar',
      'logo_settings': 'Configurações do logo',
      'store_pages': 'Páginas da loja',
      'home': 'Início',
      'product_page': 'Página do produto',
      'collections': 'Coleções',
      'catalog': 'Catálogo',
      'cart_page': 'Página do carrinho',
      'shipping_pay': 'Envio e pagamento',
      'general_pages': 'Páginas gerais',
      'collection_page': 'Página da coleção',
      'product_page_detail': 'Página do produto',
      'catalog_page': 'Página do catálogo',
      'language': 'Idioma',
      'logout': 'Sair',
      'welcome_title': 'Bem-vindo à sua loja',
      'welcome_description': 'Esta é a área principal de conteúdo da sua loja. Aqui você pode adicionar seus produtos, coleções e outro conteúdo da loja. O rodapé abaixo sempre permanecerá na parte inferior da página.',
      'free_shipping': 'Frete grátis',
      'free_shipping_description': 'A Kirrin Finch tem orgulho de oferecer frete grátis nos EUA em todos os pedidos de $200 ou mais. Também oferecemos tarifas baixas para destinos internacionais.',
      'about': 'Sobre',
      'our_story': 'Nossa história',
      'press_media': 'Imprensa e mídia',
      'careers': 'Carreiras',
      'sustainability': 'Sustentabilidade',
      'social_giveback': 'Retribuição social',
      'resources': 'Recursos',
      'blog': 'Blog',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': 'Cuidado com roupas',
      'fit_size_guide': 'Guia de tamanhos',
      'support': 'Suporte',
      'help_center': 'Central de ajuda',
      'contact_us': 'Entre em contato',
      'shipping_returns': 'Envio e devoluções',
      'start_return_exchange': 'Iniciar devolução ou troca',
      'add_product': 'Produto',
      'add_collection': 'Coleção',
      'create_catalog': 'Criar catálogo',
      'create_page': 'Criar página',
      'mobile': 'Mobile',
      'publish': 'Publicar'
    },
    'Turkish': {
      'subscribe_title': 'E-postalarımıza abone olun',
      'subscribe_subtitle': 'Yeni koleksiyonlar ve özel teklifler hakkında ilk siz haberdar olun',
      'email_placeholder': 'E-posta',
      'select_language': 'Dil seçin',
      'store_languages': 'Mağaza dilleri',
      'language_description': 'Mağazanızın hangi dillerde görüntüleneceğini seçin. Müşteriler mağaza çubuğundaki dil simgesini kullanarak bu diller arasında geçiş yapabilir.',
      'save_languages': 'Dilleri kaydet',
      'cancel': 'İptal',
      'close': 'Kapat',
      'update': 'Güncelle',
      'logo_settings': 'Logo ayarları',
      'store_pages': 'Mağaza sayfaları',
      'home': 'Ana sayfa',
      'product_page': 'Ürün sayfası',
      'collections': 'Koleksiyonlar',
      'catalog': 'Katalog',
      'cart_page': 'Sepet sayfası',
      'shipping_pay': 'Kargo ve ödeme',
      'general_pages': 'Genel sayfalar',
      'collection_page': 'Koleksiyon sayfası',
      'product_page_detail': 'Ürün sayfası',
      'catalog_page': 'Katalog sayfası',
      'language': 'Dil',
      'logout': 'Çıkış yap',
      'welcome_title': 'Mağazanıza hoş geldiniz',
      'welcome_description': 'Bu mağazanızın ana içerik alanıdır. Burada ürünlerinizi, koleksiyonlarınızı ve diğer mağaza içeriklerinizi ekleyebilirsiniz. Aşağıdaki alt bilgi her zaman sayfanın altında kalacaktır.',
      'free_shipping': 'Ücretsiz kargo',
      'free_shipping_description': 'Kirrin Finch, ABD\'de 200$ ve üzeri tüm siparişlerde ücretsiz kargo sunmaktan gurur duyar. Ayrıca uluslararası destinasyonlara düşük oranlar sunuyoruz.',
      'about': 'Hakkımızda',
      'our_story': 'Hikayemiz',
      'press_media': 'Basın ve medya',
      'careers': 'Kariyer',
      'sustainability': 'Sürdürülebilirlik',
      'social_giveback': 'Sosyal geri verme',
      'resources': 'Kaynaklar',
      'blog': 'Blog',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': 'Giyim bakımı',
      'fit_size_guide': 'Beden rehberi',
      'support': 'Destek',
      'help_center': 'Yardım merkezi',
      'contact_us': 'Bize ulaşın',
      'shipping_returns': 'Kargo ve iadeler',
      'start_return_exchange': 'İade veya değişim başlat',
      'add_product': 'Ürün',
      'add_collection': 'Koleksiyon',
      'create_catalog': 'Katalog oluştur',
      'create_page': 'Sayfa oluştur',
      'mobile': 'Mobil',
      'publish': 'Yayınla'
    },
    'Hindi': {
      'subscribe_title': 'हमारे ईमेल की सदस्यता लें',
      'subscribe_subtitle': 'नई कलेक्शन और विशेष ऑफर के बारे में सबसे पहले जानें',
      'email_placeholder': 'ईमेल',
      'select_language': 'भाषा चुनें',
      'store_languages': 'स्टोर भाषाएं',
      'language_description': 'उन भाषाओं का चयन करें जिनमें आपका स्टोर प्रदर्शित होगा। ग्राहक स्टोर बार में भाषा आइकन का उपयोग करके इन भाषाओं के बीच स्विच कर सकते हैं।',
      'save_languages': 'भाषाएं सहेजें',
      'cancel': 'रद्द करें',
      'close': 'बंद करें',
      'update': 'अपडेट करें',
      'logo_settings': 'लोगो सेटिंग्स',
      'store_pages': 'स्टोर पेज',
      'home': 'होम',
      'product_page': 'उत्पाद पेज',
      'collections': 'कलेक्शन',
      'catalog': 'कैटलॉग',
      'cart_page': 'कार्ट पेज',
      'shipping_pay': 'शिपिंग और भुगतान',
      'general_pages': 'सामान्य पेज',
      'collection_page': 'कलेक्शन पेज',
      'product_page_detail': 'उत्पाद पेज',
      'catalog_page': 'कैटलॉग पेज',
      'language': 'भाषा',
      'logout': 'लॉग आउट',
      'welcome_title': 'आपके स्टोर में आपका स्वागत है',
      'welcome_description': 'यह आपके स्टोर का मुख्य कंटेंट क्षेत्र है। यहां आप अपने उत्पादों, कलेक्शन और अन्य स्टोर कंटेंट जोड़ सकते हैं। नीचे का फुटर हमेशा पेज के निचले भाग में रहेगा।',
      'free_shipping': 'मुफ्त शिपिंग',
      'free_shipping_description': 'किरिन फिंच को $200 और उससे अधिक के सभी ऑर्डर पर अमेरिका में मुफ्त शिपिंग प्रदान करने पर गर्व है। हम अंतर्राष्ट्रीय गंतव्यों के लिए भी कम दरें प्रदान करते हैं।',
      'about': 'हमारे बारे में',
      'our_story': 'हमारी कहानी',
      'press_media': 'प्रेस और मीडिया',
      'careers': 'करियर',
      'sustainability': 'सततता',
      'social_giveback': 'सामाजिक वापसी',
      'resources': 'संसाधन',
      'blog': 'ब्लॉग',
      'dapper_scouts': 'डैपर स्काउट्स',
      'garment_care': 'कपड़ों की देखभाल',
      'fit_size_guide': 'साइज़ गाइड',
      'support': 'सहायता',
      'help_center': 'सहायता केंद्र',
      'contact_us': 'संपर्क करें',
      'shipping_returns': 'शिपिंग और रिटर्न',
      'start_return_exchange': 'रिटर्न या एक्सचेंज शुरू करें',
      'add_product': 'उत्पाद',
      'add_collection': 'कलेक्शन',
      'create_catalog': 'कैटलॉग बनाएं',
      'create_page': 'पेज बनाएं',
      'mobile': 'मोबाइल',
      'publish': 'प्रकाशित करें'
    },
    'Italian': {
      'subscribe_title': 'Iscriviti alle nostre email',
      'subscribe_subtitle': 'Sii il primo a conoscere nuove collezioni e offerte esclusive',
      'email_placeholder': 'Email',
      'select_language': 'Seleziona lingua',
      'store_languages': 'Lingue del negozio',
      'language_description': 'Seleziona le lingue in cui verrà visualizzato il tuo negozio. I clienti possono passare tra queste lingue utilizzando l\'icona della lingua nella barra del negozio.',
      'save_languages': 'Salva lingue',
      'cancel': 'Annulla',
      'close': 'Chiudi',
      'update': 'Aggiorna',
      'logo_settings': 'Impostazioni logo',
      'store_pages': 'Pagine del negozio',
      'home': 'Home',
      'product_page': 'Pagina prodotto',
      'collections': 'Collezioni',
      'catalog': 'Catalogo',
      'cart_page': 'Pagina carrello',
      'shipping_pay': 'Spedizione e pagamento',
      'general_pages': 'Pagine generali',
      'collection_page': 'Pagina collezione',
      'product_page_detail': 'Pagina prodotto',
      'catalog_page': 'Pagina catalogo',
      'language': 'Lingua',
      'logout': 'Disconnetti',
      'welcome_title': 'Benvenuto nel tuo negozio',
      'welcome_description': 'Questa è l\'area principale del contenuto del tuo negozio. Qui puoi aggiungere i tuoi prodotti, collezioni e altro contenuto del negozio. Il piè di pagina qui sotto rimarrà sempre in fondo alla pagina.',
      'free_shipping': 'Spedizione gratuita',
      'free_shipping_description': 'Kirrin Finch è orgogliosa di offrire spedizione gratuita negli Stati Uniti su tutti gli ordini di $200 e oltre. Offriamo anche tariffe basse per destinazioni internazionali.',
      'about': 'Chi siamo',
      'our_story': 'La nostra storia',
      'press_media': 'Stampa e media',
      'careers': 'Carriere',
      'sustainability': 'Sostenibilità',
      'social_giveback': 'Restituzione sociale',
      'resources': 'Risorse',
      'blog': 'Blog',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': 'Cura degli indumenti',
      'fit_size_guide': 'Guida alle taglie',
      'support': 'Supporto',
      'help_center': 'Centro assistenza',
      'contact_us': 'Contattaci',
      'shipping_returns': 'Spedizione e resi',
      'start_return_exchange': 'Inizia reso o scambio',
      'add_product': 'Prodotto',
      'add_collection': 'Collezione',
      'create_catalog': 'Crea catalogo',
      'create_page': 'Crea pagina',
      'mobile': 'Mobile',
      'publish': 'Pubblica'
    },
    'Russian': {
      'subscribe_title': 'Подпишитесь на наши письма',
      'subscribe_subtitle': 'Будьте первыми, кто узнает о новых коллекциях и эксклюзивных предложениях',
      'email_placeholder': 'Электронная почта',
      'select_language': 'Выберите язык',
      'store_languages': 'Языки магазина',
      'language_description': 'Выберите языки, на которых будет отображаться ваш магазин. Клиенты могут переключаться между этими языками, используя значок языка в панели магазина.',
      'save_languages': 'Сохранить языки',
      'cancel': 'Отмена',
      'close': 'Закрыть',
      'update': 'Обновить',
      'logo_settings': 'Настройки логотипа',
      'store_pages': 'Страницы магазина',
      'home': 'Главная',
      'product_page': 'Страница товара',
      'collections': 'Коллекции',
      'catalog': 'Каталог',
      'cart_page': 'Страница корзины',
      'shipping_pay': 'Доставка и оплата',
      'general_pages': 'Общие страницы',
      'collection_page': 'Страница коллекции',
      'product_page_detail': 'Страница товара',
      'catalog_page': 'Страница каталога',
      'language': 'Язык',
      'logout': 'Выйти',
      'welcome_title': 'Добро пожаловать в ваш магазин',
      'welcome_description': 'Это основная область контента вашего магазина. Здесь вы можете добавить свои товары, коллекции и другой контент магазина. Нижний колонтитул ниже всегда будет оставаться внизу страницы.',
      'free_shipping': 'Бесплатная доставка',
      'free_shipping_description': 'Kirrin Finch гордится тем, что предлагает бесплатную доставку в США для всех заказов на сумму $200 и более. Мы также предлагаем низкие тарифы для международных направлений.',
      'about': 'О нас',
      'our_story': 'Наша история',
      'press_media': 'Пресса и СМИ',
      'careers': 'Карьера',
      'sustainability': 'Устойчивость',
      'social_giveback': 'Социальная отдача',
      'resources': 'Ресурсы',
      'blog': 'Блог',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': 'Уход за одеждой',
      'fit_size_guide': 'Руководство по размерам',
      'support': 'Поддержка',
      'help_center': 'Центр помощи',
      'contact_us': 'Связаться с нами',
      'shipping_returns': 'Доставка и возвраты',
      'start_return_exchange': 'Начать возврат или обмен',
      'add_product': 'Товар',
      'add_collection': 'Коллекция',
      'create_catalog': 'Создать каталог',
      'create_page': 'Создать страницу',
      'mobile': 'Мобильный',
      'publish': 'Опубликовать'
    },
    'Japanese': {
      'subscribe_title': 'メール配信に登録',
      'subscribe_subtitle': '新しいコレクションと限定オファーをいち早くお知らせ',
      'email_placeholder': 'メールアドレス',
      'select_language': '言語を選択',
      'store_languages': 'ストア言語',
      'language_description': 'ストアを表示する言語を選択してください。お客様はストアバーの言語アイコンを使用して、これらの言語間を切り替えることができます。',
      'save_languages': '言語を保存',
      'cancel': 'キャンセル',
      'close': '閉じる',
      'update': '更新',
      'logo_settings': 'ロゴ設定',
      'store_pages': 'ストアページ',
      'home': 'ホーム',
      'product_page': '商品ページ',
      'collections': 'コレクション',
      'catalog': 'カタログ',
      'cart_page': 'カートページ',
      'shipping_pay': '配送と支払い',
      'general_pages': '一般ページ',
      'collection_page': 'コレクションページ',
      'product_page_detail': '商品ページ',
      'catalog_page': 'カタログページ',
      'language': '言語',
      'logout': 'ログアウト',
      'welcome_title': 'ストアへようこそ',
      'welcome_description': 'これはストアのメインコンテンツエリアです。ここで商品、コレクション、その他のストアコンテンツを追加できます。下のフッターは常にページの下部に表示されます。',
      'free_shipping': '無料配送',
      'free_shipping_description': 'キリン・フィンチは、$200以上のすべての注文で米国内無料配送を提供することを誇りに思っています。国際配送先にも低料金を提供しています。',
      'about': '私たちについて',
      'our_story': '私たちのストーリー',
      'press_media': 'プレスとメディア',
      'careers': 'キャリア',
      'sustainability': 'サステナビリティ',
      'social_giveback': '社会貢献',
      'resources': 'リソース',
      'blog': 'ブログ',
      'dapper_scouts': 'ダッパースカウツ',
      'garment_care': '衣類ケア',
      'fit_size_guide': 'サイズガイド',
      'support': 'サポート',
      'help_center': 'ヘルプセンター',
      'contact_us': 'お問い合わせ',
      'shipping_returns': '配送と返品',
      'start_return_exchange': '返品または交換を開始',
      'add_product': '商品',
      'add_collection': 'コレクション',
      'create_catalog': 'カタログを作成',
      'create_page': 'ページを作成',
      'mobile': 'モバイル',
      'publish': '公開'
    },
    '中文': {
      'subscribe_title': '订阅我们的邮件',
      'subscribe_subtitle': '第一时间了解新系列和独家优惠',
      'email_placeholder': '电子邮件',
      'select_language': '选择语言',
      'store_languages': '商店语言',
      'language_description': '选择您的商店将显示的语言。客户可以使用商店栏中的语言图标在这些语言之间切换。',
      'save_languages': '保存语言',
      'cancel': '取消',
      'close': '关闭',
      'update': '更新',
      'logo_settings': '标志设置',
      'store_pages': '商店页面',
      'home': '首页',
      'product_page': '产品页面',
      'collections': '系列',
      'catalog': '目录',
      'cart_page': '购物车页面',
      'shipping_pay': '配送和支付',
      'general_pages': '通用页面',
      'collection_page': '系列页面',
      'product_page_detail': '产品页面',
      'catalog_page': '目录页面',
      'language': '语言',
      'logout': '退出登录',
      'welcome_title': '欢迎来到您的商店',
      'welcome_description': '这是您商店的主要内容区域。在这里您可以添加您的产品、系列和其他商店内容。下面的页脚将始终保持在页面底部。',
      'free_shipping': '免费配送',
      'free_shipping_description': 'Kirrin Finch 很自豪为美国所有200美元及以上的订单提供免费配送。我们还为国际目的地提供低费率。',
      'about': '关于我们',
      'our_story': '我们的故事',
      'press_media': '新闻和媒体',
      'careers': '职业',
      'sustainability': '可持续性',
      'social_giveback': '社会回馈',
      'resources': '资源',
      'blog': '博客',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': '服装护理',
      'fit_size_guide': '尺码指南',
      'support': '支持',
      'help_center': '帮助中心',
      'contact_us': '联系我们',
      'shipping_returns': '配送和退货',
      'start_return_exchange': '开始退货或换货',
      'add_product': '产品',
      'add_collection': '系列',
      'create_catalog': '创建目录',
      'create_page': '创建页面',
      'mobile': '移动端',
      'publish': '发布'
    },
    '한국어': {
      'subscribe_title': '이메일 구독',
      'subscribe_subtitle': '새로운 컬렉션과 독점 오퍼를 가장 먼저 알아보세요',
      'email_placeholder': '이메일',
      'select_language': '언어 선택',
      'store_languages': '스토어 언어',
      'language_description': '스토어가 표시될 언어를 선택하세요. 고객은 스토어 바의 언어 아이콘을 사용하여 이러한 언어 간에 전환할 수 있습니다.',
      'save_languages': '언어 저장',
      'cancel': '취소',
      'close': '닫기',
      'update': '업데이트',
      'logo_settings': '로고 설정',
      'store_pages': '스토어 페이지',
      'home': '홈',
      'product_page': '제품 페이지',
      'collections': '컬렉션',
      'catalog': '카탈로그',
      'cart_page': '장바구니 페이지',
      'shipping_pay': '배송 및 결제',
      'general_pages': '일반 페이지',
      'collection_page': '컬렉션 페이지',
      'product_page_detail': '제품 페이지',
      'catalog_page': '카탈로그 페이지',
      'language': '언어',
      'logout': '로그아웃',
      'welcome_title': '스토어에 오신 것을 환영합니다',
      'welcome_description': '이것은 스토어의 주요 콘텐츠 영역입니다. 여기에서 제품, 컬렉션 및 기타 스토어 콘텐츠를 추가할 수 있습니다. 아래 푸터는 항상 페이지 하단에 유지됩니다.',
      'free_shipping': '무료 배송',
      'free_shipping_description': 'Kirrin Finch는 미국에서 $200 이상의 모든 주문에 대해 무료 배송을 제공하는 것을 자랑스럽게 생각합니다. 국제 목적지에도 낮은 요금을 제공합니다.',
      'about': '회사 소개',
      'our_story': '우리의 이야기',
      'press_media': '언론 및 미디어',
      'careers': '채용',
      'sustainability': '지속가능성',
      'social_giveback': '사회적 기여',
      'resources': '리소스',
      'blog': '블로그',
      'dapper_scouts': 'Dapper Scouts',
      'garment_care': '의류 관리',
      'fit_size_guide': '사이즈 가이드',
      'support': '지원',
      'help_center': '도움말 센터',
      'contact_us': '문의하기',
      'shipping_returns': '배송 및 반품',
      'start_return_exchange': '반품 또는 교환 시작',
      'add_product': '제품',
      'add_collection': '컬렉션',
      'create_catalog': '카탈로그 만들기',
      'create_page': '페이지 만들기',
      'mobile': '모바일',
      'publish': '게시'
    }
  };
  */

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





      {/* Main Content - Homepage Card with Design System */}
      <HomePageCard
        verticalPadding={verticalPadding}
        horizontalPadding={horizontalPadding}
        showLogoSettings={showLogoSettings}
        showDesignSystem={true}
        placeholderTitle="Store Homepage Content"
        placeholderDescription="This white card extends from the store bar to the footer with the same layout structure."
      />



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
