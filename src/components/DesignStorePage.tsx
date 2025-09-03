'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MobileSimulator from './MobileSimulator';
import StoreBar from './StoreBar';
import EditorBarDrawer from './EditorBarDrawer';
import PlatformBar from './PlatformBar';
import Footer from './Footer';
import './DesignStorePage.css';

const DesignStorePage: React.FC = () => {
  const router = useRouter();
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [storeLogo, setStoreLogo] = useState<string | null>(null);
  const [showLogoSettings, setShowLogoSettings] = useState(false);
  const [logoShape, setLogoShape] = useState<'circle' | 'rectangle'>('circle');
  const [logoWidth, setLogoWidth] = useState(64);
  const [logoHeight, setLogoHeight] = useState(64);

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

  // Translation dictionary
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
      'logout': 'Log out'
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
      'logout': 'Cerrar sesión'
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
      'logout': 'Se déconnecter'
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
      'logout': 'Abmelden'
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
      'logout': 'Sair'
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
      'logout': 'Çıkış yap'
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
      'logout': 'लॉग आउट'
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
      'logout': 'Disconnetti'
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
      'logout': 'Выйти'
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
      'logout': 'ログアウト'
    }
  };

  // Translation function
  const t = (key: string) => {
    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations['English']] || translations['English'][key as keyof typeof translations['English']] || key;
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

  const handleSettingsClick = () => {
    setShowLogoSettings(true);
  };

  const handleCloseSettings = () => {
    setShowLogoSettings(false);
  };

  const handleUpdateSettings = () => {
    // Save settings to localStorage or state
    localStorage.setItem('logoSettings', JSON.stringify({
      shape: logoShape,
      width: logoWidth,
      height: logoHeight,
      horizontalPadding,
      verticalPadding
    }));
    setShowLogoSettings(false);
  };

  useEffect(() => {
    // Load saved logo from localStorage
    const savedLogo = localStorage.getItem('storeLogo');
    if (savedLogo) {
      setStoreLogo(savedLogo);
    }

    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('logoSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setLogoShape(settings.shape);
      setLogoWidth(settings.width);
      setLogoHeight(settings.height);
      setHorizontalPadding(settings.horizontalPadding);
      setVerticalPadding(settings.verticalPadding);
    }

    // Load saved languages from localStorage
    const savedLanguages = localStorage.getItem('storeLanguages');
    if (savedLanguages) {
      setSelectedLanguages(JSON.parse(savedLanguages));
    }

    // Load current language from localStorage
    const savedCurrentLanguage = localStorage.getItem('currentLanguage');
    if (savedCurrentLanguage) {
      setCurrentLanguage(savedCurrentLanguage);
    }
  }, []);

  return (
    <div className="design-store-page">
      {/* Top App Bar */}
      <PlatformBar />

      {/* Editor Bar and Drawer Component */}
      <EditorBarDrawer
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
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
                Welcome to Your Store
              </h1>
              <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', maxWidth: '600px', lineHeight: '1.6' }}>
                This is your store's main content area. Here you can add your products, 
                collections, and other store content. The footer below will always stay 
                at the bottom of the page.
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
      <Footer />

    </div>
  );
};

export default DesignStorePage;
