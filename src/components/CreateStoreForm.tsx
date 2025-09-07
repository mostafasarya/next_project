'use client';

import React, { useState, useEffect } from 'react';
import './CreateStoreForm.css';
import StoreStepper from './StoreStepper';

interface StoreFormData {
  name: string;
  storeType: string;
  country: string;
  city: string;
  currency: string;
  category: string;
  description: string;
}

interface CreateStoreFormProps {
  onClose: () => void;
  onSubmit: (data: StoreFormData) => void;
}

const CreateStoreForm: React.FC<CreateStoreFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<StoreFormData>({
    name: '',
    storeType: '',
    country: '',
    city: '',
    currency: '$ US Dollar ($)',
    category: '',
    description: ''
  });
  const [showStepper, setShowStepper] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  // Translation dictionary
  const translations = {
    'English': {
      'create_store': 'Create Your Store',
      'store_name': 'Store Name',
      'store_name_placeholder': 'Store Name*',
      'store_type': 'Store Type',
      'select_store_type': 'Select your store type',
      'online_only': 'Online Only - I only sell online',
      'physical_store': 'Physical Store - I have a physical location',
      'both': 'Both - I sell online and have a physical store',
      'store_type_help': 'This helps us customize your store setup and features.',
      'store_location': 'Store Location',
      'country': 'Country',
      'city': 'City',
      'store_currency': 'Store Currency',
      'currency_help': 'Select the currency your store will use for all products and transactions, you can not change it later.',
      'business_category': 'Business Category',
      'select_category': 'Select a category',
      'category_help': 'Select the category that best describes your business.',
      'store_description': 'Store Description (optional)',
      'description_placeholder': 'Describe your store...',
      'cancel': 'Cancel',
      'create_store_btn': 'Create Store',
      'electronics': 'Electronics',
      'fashion': 'Fashion',
      'home_garden': 'Home & Garden',
      'sports': 'Sports',
      'books': 'Books',
      'health_beauty': 'Health & Beauty',
      'toys_games': 'Toys & Games',
      'automotive': 'Automotive',
      'food_beverages': 'Food & Beverages',
      'jewelry': 'Jewelry'
    },
    'العربية': {
      'create_store': 'إنشاء متجرك',
      'store_name': 'اسم المتجر',
      'store_name_placeholder': 'اسم المتجر*',
      'store_type': 'نوع المتجر',
      'select_store_type': 'اختر نوع متجرك',
      'online_only': 'إلكتروني فقط - أبيع عبر الإنترنت فقط',
      'physical_store': 'متجر فعلي - لدي موقع فعلي',
      'both': 'كلاهما - أبيع عبر الإنترنت ولدي متجر فعلي',
      'store_type_help': 'هذا يساعدنا في تخصيص إعدادات وميزات متجرك.',
      'store_location': 'موقع المتجر',
      'country': 'البلد',
      'city': 'المدينة',
      'store_currency': 'عملة المتجر',
      'currency_help': 'اختر العملة التي سيستخدمها متجرك لجميع المنتجات والمعاملات، لا يمكن تغييرها لاحقاً.',
      'business_category': 'فئة الأعمال',
      'select_category': 'اختر فئة',
      'category_help': 'اختر الفئة التي تصف عملك بشكل أفضل.',
      'store_description': 'وصف المتجر (اختياري)',
      'description_placeholder': 'اوصف متجرك...',
      'cancel': 'إلغاء',
      'create_store_btn': 'إنشاء متجر',
      'electronics': 'إلكترونيات',
      'fashion': 'أزياء',
      'home_garden': 'المنزل والحديقة',
      'sports': 'رياضة',
      'books': 'كتب',
      'health_beauty': 'صحة وجمال',
      'toys_games': 'ألعاب وألعاب',
      'automotive': 'سيارات',
      'food_beverages': 'طعام ومشروبات',
      'jewelry': 'مجوهرات'
    },
    'Español': {
      'create_store': 'Crear Tu Tienda',
      'store_name': 'Nombre de la Tienda',
      'store_name_placeholder': 'Nombre de la Tienda*',
      'store_type': 'Tipo de Tienda',
      'select_store_type': 'Selecciona el tipo de tienda',
      'online_only': 'Solo Online - Solo vendo en línea',
      'physical_store': 'Tienda Física - Tengo una ubicación física',
      'both': 'Ambos - Vendo en línea y tengo una tienda física',
      'store_type_help': 'Esto nos ayuda a personalizar la configuración y características de tu tienda.',
      'store_location': 'Ubicación de la Tienda',
      'country': 'País',
      'city': 'Ciudad',
      'store_currency': 'Moneda de la Tienda',
      'currency_help': 'Selecciona la moneda que tu tienda usará para todos los productos y transacciones, no podrás cambiarla después.',
      'business_category': 'Categoría de Negocio',
      'select_category': 'Selecciona una categoría',
      'category_help': 'Selecciona la categoría que mejor describa tu negocio.',
      'store_description': 'Descripción de la Tienda (opcional)',
      'description_placeholder': 'Describe tu tienda...',
      'cancel': 'Cancelar',
      'create_store_btn': 'Crear Tienda',
      'electronics': 'Electrónicos',
      'fashion': 'Moda',
      'home_garden': 'Hogar y Jardín',
      'sports': 'Deportes',
      'books': 'Libros',
      'health_beauty': 'Salud y Belleza',
      'toys_games': 'Juguetes y Juegos',
      'automotive': 'Automotriz',
      'food_beverages': 'Alimentos y Bebidas',
      'jewelry': 'Joyería'
    },
    'Français': {
      'create_store': 'Créer Votre Boutique',
      'store_name': 'Nom de la Boutique',
      'store_name_placeholder': 'Nom de la Boutique*',
      'store_type': 'Type de Boutique',
      'select_store_type': 'Sélectionnez le type de boutique',
      'online_only': 'En ligne uniquement - Je vends uniquement en ligne',
      'physical_store': 'Boutique physique - J\'ai un emplacement physique',
      'both': 'Les deux - Je vends en ligne et j\'ai une boutique physique',
      'store_type_help': 'Cela nous aide à personnaliser la configuration et les fonctionnalités de votre boutique.',
      'store_location': 'Emplacement de la Boutique',
      'country': 'Pays',
      'city': 'Ville',
      'store_currency': 'Devise de la Boutique',
      'currency_help': 'Sélectionnez la devise que votre boutique utilisera pour tous les produits et transactions, vous ne pourrez pas la changer plus tard.',
      'business_category': 'Catégorie d\'Entreprise',
      'select_category': 'Sélectionnez une catégorie',
      'category_help': 'Sélectionnez la catégorie qui décrit le mieux votre entreprise.',
      'store_description': 'Description de la Boutique (optionnel)',
      'description_placeholder': 'Décrivez votre boutique...',
      'cancel': 'Annuler',
      'create_store_btn': 'Créer la Boutique',
      'electronics': 'Électronique',
      'fashion': 'Mode',
      'home_garden': 'Maison et Jardin',
      'sports': 'Sports',
      'books': 'Livres',
      'health_beauty': 'Santé et Beauté',
      'toys_games': 'Jouets et Jeux',
      'automotive': 'Automobile',
      'food_beverages': 'Aliments et Boissons',
      'jewelry': 'Bijoux'
    },
    'Deutsch': {
      'create_store': 'Erstellen Sie Ihren Shop',
      'store_name': 'Shop-Name',
      'store_name_placeholder': 'Shop-Name*',
      'store_type': 'Shop-Typ',
      'select_store_type': 'Wählen Sie Ihren Shop-Typ',
      'online_only': 'Nur Online - Ich verkaufe nur online',
      'physical_store': 'Physischer Shop - Ich habe einen physischen Standort',
      'both': 'Beide - Ich verkaufe online und habe einen physischen Shop',
      'store_type_help': 'Dies hilft uns, Ihr Shop-Setup und Features anzupassen.',
      'store_location': 'Shop-Standort',
      'country': 'Land',
      'city': 'Stadt',
      'store_currency': 'Shop-Währung',
      'currency_help': 'Wählen Sie die Währung, die Ihr Shop für alle Produkte und Transaktionen verwenden wird, Sie können sie später nicht ändern.',
      'business_category': 'Geschäftskategorie',
      'select_category': 'Wählen Sie eine Kategorie',
      'category_help': 'Wählen Sie die Kategorie, die Ihr Geschäft am besten beschreibt.',
      'store_description': 'Shop-Beschreibung (optional)',
      'description_placeholder': 'Beschreiben Sie Ihren Shop...',
      'cancel': 'Abbrechen',
      'create_store_btn': 'Shop erstellen',
      'electronics': 'Elektronik',
      'fashion': 'Mode',
      'home_garden': 'Haus und Garten',
      'sports': 'Sport',
      'books': 'Bücher',
      'health_beauty': 'Gesundheit und Schönheit',
      'toys_games': 'Spielzeug und Spiele',
      'automotive': 'Automobil',
      'food_beverages': 'Lebensmittel und Getränke',
      'jewelry': 'Schmuck'
    },
    'Português': {
      'create_store': 'Criar Sua Loja',
      'store_name': 'Nome da Loja',
      'store_name_placeholder': 'Nome da Loja*',
      'store_type': 'Tipo de Loja',
      'select_store_type': 'Selecione o tipo de loja',
      'online_only': 'Apenas Online - Vendo apenas online',
      'physical_store': 'Loja Física - Tenho uma localização física',
      'both': 'Ambos - Vendo online e tenho uma loja física',
      'store_type_help': 'Isso nos ajuda a personalizar a configuração e recursos da sua loja.',
      'store_location': 'Localização da Loja',
      'country': 'País',
      'city': 'Cidade',
      'store_currency': 'Moeda da Loja',
      'currency_help': 'Selecione a moeda que sua loja usará para todos os produtos e transações, você não poderá alterá-la depois.',
      'business_category': 'Categoria de Negócio',
      'select_category': 'Selecione uma categoria',
      'category_help': 'Selecione a categoria que melhor descreve seu negócio.',
      'store_description': 'Descrição da Loja (opcional)',
      'description_placeholder': 'Descreva sua loja...',
      'cancel': 'Cancelar',
      'create_store_btn': 'Criar Loja',
      'electronics': 'Eletrônicos',
      'fashion': 'Moda',
      'home_garden': 'Casa e Jardim',
      'sports': 'Esportes',
      'books': 'Livros',
      'health_beauty': 'Saúde e Beleza',
      'toys_games': 'Brinquedos e Jogos',
      'automotive': 'Automotivo',
      'food_beverages': 'Alimentos e Bebidas',
      'jewelry': 'Joias'
    },
    'Türkçe': {
      'create_store': 'Mağazanızı Oluşturun',
      'store_name': 'Mağaza Adı',
      'store_name_placeholder': 'Mağaza Adı*',
      'store_type': 'Mağaza Türü',
      'select_store_type': 'Mağaza türünüzü seçin',
      'online_only': 'Sadece Online - Sadece online satış yapıyorum',
      'physical_store': 'Fiziksel Mağaza - Fiziksel bir konumum var',
      'both': 'Her ikisi - Online satış yapıyorum ve fiziksel mağazam var',
      'store_type_help': 'Bu, mağaza kurulumunuzu ve özelliklerinizi özelleştirmemize yardımcı olur.',
      'store_location': 'Mağaza Konumu',
      'country': 'Ülke',
      'city': 'Şehir',
      'store_currency': 'Mağaza Para Birimi',
      'currency_help': 'Mağazanızın tüm ürünler ve işlemler için kullanacağı para birimini seçin, daha sonra değiştiremezsiniz.',
      'business_category': 'İş Kategorisi',
      'select_category': 'Bir kategori seçin',
      'category_help': 'İşinizi en iyi tanımlayan kategoriyi seçin.',
      'store_description': 'Mağaza Açıklaması (isteğe bağlı)',
      'description_placeholder': 'Mağazanızı açıklayın...',
      'cancel': 'İptal',
      'create_store_btn': 'Mağaza Oluştur',
      'electronics': 'Elektronik',
      'fashion': 'Moda',
      'home_garden': 'Ev ve Bahçe',
      'sports': 'Spor',
      'books': 'Kitaplar',
      'health_beauty': 'Sağlık ve Güzellik',
      'toys_games': 'Oyuncaklar ve Oyunlar',
      'automotive': 'Otomotiv',
      'food_beverages': 'Yiyecek ve İçecekler',
      'jewelry': 'Mücevher'
    },
    'हिन्दी': {
      'create_store': 'अपना स्टोर बनाएं',
      'store_name': 'स्टोर का नाम',
      'store_name_placeholder': 'स्टोर का नाम*',
      'store_type': 'स्टोर का प्रकार',
      'select_store_type': 'अपने स्टोर का प्रकार चुनें',
      'online_only': 'केवल ऑनलाइन - मैं केवल ऑनलाइन बेचता हूं',
      'physical_store': 'भौतिक स्टोर - मेरे पास भौतिक स्थान है',
      'both': 'दोनों - मैं ऑनलाइन बेचता हूं और मेरे पास भौतिक स्टोर है',
      'store_type_help': 'यह हमें आपके स्टोर सेटअप और सुविधाओं को अनुकूलित करने में मदद करता है।',
      'store_location': 'स्टोर का स्थान',
      'country': 'देश',
      'city': 'शहर',
      'store_currency': 'स्टोर मुद्रा',
      'currency_help': 'वह मुद्रा चुनें जो आपका स्टोर सभी उत्पादों और लेनदेन के लिए उपयोग करेगा, आप इसे बाद में नहीं बदल सकते।',
      'business_category': 'व्यापार श्रेणी',
      'select_category': 'एक श्रेणी चुनें',
      'category_help': 'वह श्रेणी चुनें जो आपके व्यापार का सबसे अच्छा वर्णन करती है।',
      'store_description': 'स्टोर विवरण (वैकल्पिक)',
      'description_placeholder': 'अपने स्टोर का वर्णन करें...',
      'cancel': 'रद्द करें',
      'create_store_btn': 'स्टोर बनाएं',
      'electronics': 'इलेक्ट्रॉनिक्स',
      'fashion': 'फैशन',
      'home_garden': 'घर और बगीचा',
      'sports': 'खेल',
      'books': 'पुस्तकें',
      'health_beauty': 'स्वास्थ्य और सौंदर्य',
      'toys_games': 'खिलौने और खेल',
      'automotive': 'ऑटोमोटिव',
      'food_beverages': 'भोजन और पेय',
      'jewelry': 'आभूषण'
    },
    'Italiano': {
      'create_store': 'Crea Il Tuo Negozio',
      'store_name': 'Nome del Negozio',
      'store_name_placeholder': 'Nome del Negozio*',
      'store_type': 'Tipo di Negozio',
      'select_store_type': 'Seleziona il tipo di negozio',
      'online_only': 'Solo Online - Vendo solo online',
      'physical_store': 'Negozio Fisico - Ho una posizione fisica',
      'both': 'Entrambi - Vendo online e ho un negozio fisico',
      'store_type_help': 'Questo ci aiuta a personalizzare la configurazione e le funzionalità del tuo negozio.',
      'store_location': 'Posizione del Negozio',
      'country': 'Paese',
      'city': 'Città',
      'store_currency': 'Valuta del Negozio',
      'currency_help': 'Seleziona la valuta che il tuo negozio userà per tutti i prodotti e le transazioni, non potrai cambiarla dopo.',
      'business_category': 'Categoria di Business',
      'select_category': 'Seleziona una categoria',
      'category_help': 'Seleziona la categoria che descrive meglio il tuo business.',
      'store_description': 'Descrizione del Negozio (opzionale)',
      'description_placeholder': 'Descrivi il tuo negozio...',
      'cancel': 'Annulla',
      'create_store_btn': 'Crea Negozio',
      'electronics': 'Elettronica',
      'fashion': 'Moda',
      'home_garden': 'Casa e Giardino',
      'sports': 'Sport',
      'books': 'Libri',
      'health_beauty': 'Salute e Bellezza',
      'toys_games': 'Giocattoli e Giochi',
      'automotive': 'Automotive',
      'food_beverages': 'Cibo e Bevande',
      'jewelry': 'Gioielli'
    },
    'Русский': {
      'create_store': 'Создайте Ваш Магазин',
      'store_name': 'Название Магазина',
      'store_name_placeholder': 'Название Магазина*',
      'store_type': 'Тип Магазина',
      'select_store_type': 'Выберите тип вашего магазина',
      'online_only': 'Только Онлайн - Я продаю только онлайн',
      'physical_store': 'Физический Магазин - У меня есть физическое местоположение',
      'both': 'Оба - Я продаю онлайн и у меня есть физический магазин',
      'store_type_help': 'Это помогает нам настроить конфигурацию и функции вашего магазина.',
      'store_location': 'Местоположение Магазина',
      'country': 'Страна',
      'city': 'Город',
      'store_currency': 'Валюта Магазина',
      'currency_help': 'Выберите валюту, которую ваш магазин будет использовать для всех товаров и транзакций, вы не сможете изменить её позже.',
      'business_category': 'Категория Бизнеса',
      'select_category': 'Выберите категорию',
      'category_help': 'Выберите категорию, которая лучше всего описывает ваш бизнес.',
      'store_description': 'Описание Магазина (необязательно)',
      'description_placeholder': 'Опишите ваш магазин...',
      'cancel': 'Отмена',
      'create_store_btn': 'Создать Магазин',
      'electronics': 'Электроника',
      'fashion': 'Мода',
      'home_garden': 'Дом и Сад',
      'sports': 'Спорт',
      'books': 'Книги',
      'health_beauty': 'Здоровье и Красота',
      'toys_games': 'Игрушки и Игры',
      'automotive': 'Автомобили',
      'food_beverages': 'Еда и Напитки',
      'jewelry': 'Украшения'
    },
    '日本語': {
      'create_store': 'ストアを作成',
      'store_name': 'ストア名',
      'store_name_placeholder': 'ストア名*',
      'store_type': 'ストアタイプ',
      'select_store_type': 'ストアタイプを選択してください',
      'online_only': 'オンラインのみ - オンラインでのみ販売しています',
      'physical_store': '実店舗 - 実店舗があります',
      'both': '両方 - オンライン販売と実店舗の両方があります',
      'store_type_help': 'これにより、ストアのセットアップと機能をカスタマイズできます。',
      'store_location': 'ストアの場所',
      'country': '国',
      'city': '都市',
      'store_currency': 'ストア通貨',
      'currency_help': 'ストアがすべての商品と取引に使用する通貨を選択してください。後で変更することはできません。',
      'business_category': 'ビジネスカテゴリ',
      'select_category': 'カテゴリを選択',
      'category_help': 'あなたのビジネスを最もよく表すカテゴリを選択してください。',
      'store_description': 'ストアの説明（オプション）',
      'description_placeholder': 'ストアについて説明してください...',
      'cancel': 'キャンセル',
      'create_store_btn': 'ストアを作成',
      'electronics': 'エレクトロニクス',
      'fashion': 'ファッション',
      'home_garden': 'ホーム＆ガーデン',
      'sports': 'スポーツ',
      'books': '本',
      'health_beauty': 'ヘルス＆ビューティー',
      'toys_games': 'おもちゃ＆ゲーム',
      'automotive': '自動車',
      'food_beverages': '食品＆飲料',
      'jewelry': 'ジュエリー'
    }
  };

  // Language mapping from native script names to English names
  const languageMapping: { [key: string]: string } = {
    'English': 'English',
    'العربية': 'Arabic',
    'Español': 'Spanish',
    'Français': 'French',
    'Deutsch': 'German',
    'Português': 'Portuguese',
    'Türkçe': 'Turkish',
    'हिन्दी': 'Hindi',
    'Italiano': 'Italian',
    'Русский': 'Russian',
    '日本語': 'Japanese',
    '中文': 'Chinese',
    '한국어': 'Korean'
  };

  // Translation function
  const t = (key: string) => {
    // First try the current language directly (for native script names like 'العربية')
    let currentLangTranslations = translations[currentLanguage as keyof typeof translations];
    
    // If not found, try the mapped language (for English names like 'Arabic')
    if (!currentLangTranslations) {
      const mappedLanguage = languageMapping[currentLanguage] || currentLanguage;
      currentLangTranslations = translations[mappedLanguage as keyof typeof translations];
    }
    
    const englishTranslations = translations['English'];
    
    if (currentLangTranslations && currentLangTranslations[key as keyof typeof currentLangTranslations]) {
      return currentLangTranslations[key as keyof typeof currentLangTranslations];
    }
    
    if (englishTranslations && englishTranslations[key as keyof typeof englishTranslations]) {
      return englishTranslations[key as keyof typeof englishTranslations];
    }
    
    return key;
  };

  // Load saved language and listen for changes
  useEffect(() => {
    const savedLanguage = localStorage.getItem('websiteLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowStepper(true);
  };

  const handleStepperComplete = () => {
    onSubmit(formData);
  };

  const countries = [
    '🇺🇸 United States', '🇨🇦 Canada', '🇬🇧 United Kingdom', '🇩🇪 Germany', '🇫🇷 France',
    '🇦🇺 Australia', '🇯🇵 Japan', '🇮🇳 India', '🇧🇷 Brazil', '🇲🇽 Mexico',
    '🇪🇸 Spain', '🇮🇹 Italy', '🇳🇱 Netherlands', '🇸🇪 Sweden', '🇳🇴 Norway',
    '🇩🇰 Denmark', '🇫🇮 Finland', '🇨🇭 Switzerland', '🇦🇹 Austria', '🇧🇪 Belgium',
    '🇵🇱 Poland', '🇨🇿 Czech Republic', '🇭🇺 Hungary', '🇷🇴 Romania', '🇧🇬 Bulgaria',
    '🇷🇺 Russia', '🇺🇦 Ukraine', '🇹🇷 Turkey', '🇬🇷 Greece', '🇵🇹 Portugal',
    '🇮🇪 Ireland', '🇳🇿 New Zealand', '🇿🇦 South Africa', '🇪🇬 Egypt', '🇲🇦 Morocco',
    '🇹🇭 Thailand', '🇻🇳 Vietnam', '🇸🇬 Singapore', '🇲🇾 Malaysia', '🇵🇭 Philippines',
    '🇰🇷 South Korea', '🇨🇳 China', '🇹🇼 Taiwan', '🇭🇰 Hong Kong', '🇦🇪 UAE',
    '🇸🇦 Saudi Arabia', '🇶🇦 Qatar', '🇰🇼 Kuwait', '🇧🇭 Bahrain', '🇴🇲 Oman'
  ];

  const cities = {
    '🇺🇸 United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
    '🇨🇦 Canada': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
    '🇬🇧 United Kingdom': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Cardiff'],
    '🇩🇪 Germany': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
    '🇫🇷 France': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
    '🇦🇺 Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Gold Coast', 'Newcastle', 'Sunshine Coast', 'Wollongong'],
    '🇯🇵 Japan': ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Kobe', 'Kyoto', 'Fukuoka', 'Kawasaki', 'Saitama'],
    '🇮🇳 India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'],
    '🇧🇷 Brazil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
    '🇲🇽 Mexico': ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Ciudad Juárez', 'León', 'Zapopan', 'Nezahualcóyotl', 'Guadalupe'],
    '🇪🇸 Spain': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
    '🇮🇹 Italy': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
    '🇳🇱 Netherlands': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen'],
    '🇸🇪 Sweden': ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping'],
    '🇳🇴 Norway': ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen', 'Fredrikstad', 'Kristiansand', 'Sandnes', 'Tromsø', 'Sarpsborg'],
    '🇩🇰 Denmark': ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Randers', 'Kolding', 'Horsens', 'Vejle', 'Roskilde', 'Herning'],
    '🇫🇮 Finland': ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku', 'Jyväskylä', 'Lahti', 'Kuopio', 'Pori'],
    '🇨🇭 Switzerland': ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Winterthur', 'St. Gallen', 'Lucerne', 'Lugano', 'Biel'],
    '🇦🇹 Austria': ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck', 'Klagenfurt', 'Villach', 'Wels', 'Sankt Pölten', 'Dornbirn'],
    '🇧🇪 Belgium': ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges', 'Namur', 'Leuven', 'Mons', 'Aalst'],
    '🇵🇱 Poland': ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Katowice'],
    '🇨🇿 Czech Republic': ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec', 'Olomouc', 'Ústí nad Labem', 'České Budějovice', 'Hradec Králové', 'Pardubice'],
    '🇭🇺 Hungary': ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr', 'Nyíregyháza', 'Kecskemét', 'Székesfehérvár', 'Szombathely'],
    '🇷🇴 Romania': ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Craiova', 'Galați', 'Ploiești', 'Brașov', 'Brăila'],
    '🇧🇬 Bulgaria': ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven', 'Sliven', 'Dobrich', 'Shumen'],
    '🇷🇺 Russia': ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan', 'Nizhny Novgorod', 'Chelyabinsk', 'Samara', 'Omsk', 'Rostov'],
    '🇺🇦 Ukraine': ['Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Donetsk', 'Zaporizhzhia', 'Lviv', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol'],
    '🇹🇷 Turkey': ['Istanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Diyarbakır'],
    '🇬🇷 Greece': ['Athens', 'Thessaloniki', 'Patras', 'Piraeus', 'Larissa', 'Heraklion', 'Peristeri', 'Kallithea', 'Acharnes', 'Kalamaria'],
    '🇵🇹 Portugal': ['Lisbon', 'Porto', 'Vila Nova de Gaia', 'Amadora', 'Braga', 'Funchal', 'Coimbra', 'Setúbal', 'Almada', 'Agualva-Cacém'],
    '🇮🇪 Ireland': ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Drogheda', 'Kilkenny', 'Sligo', 'Wexford', 'Tralee'],
    '🇳🇿 New Zealand': ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Napier-Hastings', 'Dunedin', 'Palmerston North', 'Nelson', 'Rotorua'],
    '🇿🇦 South Africa': ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Kimberley', 'Nelspruit', 'Polokwane'],
    '🇪🇬 Egypt': ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura', 'El-Mahalla El-Kubra', 'Aswan'],
    '🇲🇦 Morocco': ['Casablanca', 'Rabat', 'Fez', 'Marrakech', 'Agadir', 'Tangier', 'Meknes', 'Oujda', 'Kénitra', 'Tetouan'],
    '🇹🇭 Thailand': ['Bangkok', 'Chiang Mai', 'Pattaya', 'Phuket', 'Hat Yai', 'Nakhon Ratchasima', 'Udon Thani', 'Khon Kaen', 'Nakhon Si Thammarat', 'Chiang Rai'],
    '🇻🇳 Vietnam': ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hai Phong', 'Can Tho', 'Bien Hoa', 'Hue', 'Nha Trang', 'Buon Ma Thuot', 'Vung Tau'],
    '🇸🇬 Singapore': ['Singapore'],
    '🇲🇾 Malaysia': ['Kuala Lumpur', 'George Town', 'Ipoh', 'Shah Alam', 'Petaling Jaya', 'Johor Bahru', 'Malacca City', 'Alor Setar', 'Miri', 'Kuching'],
    '🇵🇭 Philippines': ['Manila', 'Quezon City', 'Davao City', 'Caloocan', 'Cebu City', 'Zamboanga City', 'Antipolo', 'Pasig', 'Taguig', 'Valenzuela'],
    '🇰🇷 South Korea': ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Seongnam'],
    '🇨🇳 China': ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Tianjin', 'Chongqing', 'Nanjing', 'Wuhan', 'Xi\'an'],
    '🇹🇼 Taiwan': ['Taipei', 'Kaohsiung', 'Taichung', 'Tainan', 'Banqiao', 'Hsinchu', 'Taoyuan', 'Keelung', 'Chiayi', 'Taitung'],
    '🇭🇰 Hong Kong': ['Hong Kong'],
    '🇦🇪 UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'],
    '🇸🇦 Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Taif', 'Tabuk', 'Buraydah', 'Khamis Mushait', 'Al Hofuf'],
    '🇶🇦 Qatar': ['Doha', 'Al Wakrah', 'Al Khor', 'Lusail', 'Al Rayyan', 'Umm Salal', 'Al Daayen', 'Al Shamal'],
    '🇰🇼 Kuwait': ['Kuwait City', 'Salmiya', 'Hawalli', 'Al Ahmadi', 'Al Jahra', 'Al Farwaniyah', 'Mubarak Al-Kabeer', 'Al Wafra'],
    '🇧🇭 Bahrain': ['Manama', 'Muharraq', 'Riffa', 'Hamad Town', 'A\'ali', 'Isa Town', 'Sitra', 'Al-Malikiyah'],
    '🇴🇲 Oman': ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Saham', 'Barka', 'Rustaq', 'Al Buraimi']
  };

  const currencies = [
    // Major Global Currencies
    '$ US Dollar ($)',
    '€ Euro (€)',
    '£ British Pound (£)',
    '¥ Japanese Yen (¥)',
    
    // Gulf Countries & Arab World
    'د.إ UAE Dirham (AED)',
    'ر.س Saudi Riyal (SAR)', 
    'ر.ق Qatari Riyal (QAR)',
    'د.ك Kuwaiti Dinar (KWD)',
    '.د.ب Bahraini Dinar (BHD)',
    'ر.ع Omani Rial (OMR)',
    'ج.م Egyptian Pound (EGP)',
    'د.م Moroccan Dirham (MAD)',
    'د.ت Tunisian Dinar (TND)',
    'د.ج Algerian Dinar (DZD)',
    'ل.س Syrian Pound (SYP)',
    'ل.ل Lebanese Pound (LBP)',
    'د.ع Iraqi Dinar (IQD)',
    'د.أ Jordanian Dinar (JOD)',
    'ل.س Sudanese Pound (SDG)',
    'ر.ي Yemeni Rial (YER)',
    
    // European Currencies
    'kr Swedish Krona (SEK)',
    'kr Norwegian Krone (NOK)',
    'kr Danish Krone (DKK)',
    'CHF Swiss Franc (CHF)',
    'zł Polish Złoty (PLN)',
    'Kč Czech Koruna (CZK)',
    'Ft Hungarian Forint (HUF)',
    'lei Romanian Leu (RON)',
    'лв Bulgarian Lev (BGN)',
    '₽ Russian Ruble (RUB)',
    '₴ Ukrainian Hryvnia (UAH)',
    '₺ Turkish Lira (TRY)',
    'kn Croatian Kuna (HRK)',
    '₾ Georgian Lari (GEL)',
    
    // Asian Currencies
    '¥ Chinese Yuan (CNY)',
    '₩ South Korean Won (KRW)',
    '₫ Vietnamese Dong (VND)',
    '฿ Thai Baht (THB)',
    'RM Malaysian Ringgit (MYR)',
    'S$ Singapore Dollar (SGD)',
    '₱ Philippine Peso (PHP)',
    'Rp Indonesian Rupiah (IDR)',
    '₨ Pakistani Rupee (PKR)',
    '₨ Sri Lankan Rupee (LKR)',
    '৳ Bangladeshi Taka (BDT)',
    'NT$ New Taiwan Dollar (TWD)',
    'HK$ Hong Kong Dollar (HKD)',
    '₮ Mongolian Tugrik (MNT)',
    
    // South American Currencies
    'R$ Brazilian Real (BRL)',
    '$ Argentine Peso (ARS)',
    '$ Chilean Peso (CLP)',
    '$ Colombian Peso (COP)',
    'S/ Peruvian Sol (PEN)',
    '$ Uruguayan Peso (UYU)',
    'Bs Bolivian Boliviano (BOB)',
    '$ Paraguayan Guaraní (PYG)',
    'G$ Guyanese Dollar (GYD)',
    '$ Surinamese Dollar (SRD)',
    
    // Additional Major Currencies
    'C$ Canadian Dollar (CAD)',
    'A$ Australian Dollar (AUD)',
    'NZ$ New Zealand Dollar (NZD)',
    'R South African Rand (ZAR)',
    '₦ Nigerian Naira (NGN)',
    'KSh Kenyan Shilling (KES)',
    'ETB Ethiopian Birr (ETB)',
    'GH₵ Ghanaian Cedi (GHS)',
    'CFA West African CFA Franc (XOF)',
    'CFA Central African CFA Franc (XAF)'
  ];

  const categories = [
    t('electronics'), t('fashion'), t('home_garden'), t('sports'), t('books'),
    t('health_beauty'), t('toys_games'), t('automotive'), t('food_beverages'), t('jewelry')
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{t('create_store')}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="store-form">
          <div className="form-group">
            <label htmlFor="name">
              <span className="icon">🏪</span>
              {t('store_name')}*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('store_name_placeholder')}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="storeType">
              <span className="icon">🏪</span>
              {t('store_type')}*
            </label>
            <select
              id="storeType"
              name="storeType"
              value={formData.storeType}
              onChange={handleInputChange}
              required
            >
              <option value="">{t('select_store_type')}</option>
              <option value="Online Only">{t('online_only')}</option>
              <option value="Physical Store">{t('physical_store')}</option>
              <option value="Both">{t('both')}</option>
            </select>
            <p className="helper-text">
              {t('store_type_help')}
            </p>
          </div>

          <div className="form-group">
            <label>{t('store_location')}</label>
            <div className="location-inputs">
              <div className="location-field">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{t('country')}*</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="location-field">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.country}
                >
                  <option value="">{t('city')}*</option>
                  {formData.country && cities[formData.country as keyof typeof cities]?.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="currency">
              <span className="icon">💰</span>
              {t('store_currency')}*
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              required
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            <p className="helper-text">
              {t('currency_help')}
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="category">
              <span className="icon">🏷️</span>
              {t('business_category')}*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">{t('select_category')}</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <p className="helper-text">
              {t('category_help')}
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              <span className="icon">📝</span>
              {t('store_description')}
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={t('description_placeholder')}
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              {t('cancel')}
            </button>
            <button type="submit" className="create-store-btn">
              <span className="icon">➕</span>
              {t('create_store_btn')}
            </button>
          </div>
        </form>
      </div>
      
      {showStepper && (
        <StoreStepper
          onClose={() => setShowStepper(false)}
          onComplete={handleStepperComplete}
          storeName={formData.name}
        />
      )}
    </div>
  );
};

export default CreateStoreForm;
