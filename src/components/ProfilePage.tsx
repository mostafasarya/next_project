'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CreateStoreForm from './CreateStoreForm';
import StoreCard from './StoreCard';
import StyleUploadImageFunction from './StyleUploadImageFunction';
import './ProfilePage.css';

interface Store {
  id: string;
  name: string;
  storeType: string;
  country: string;
  city: string;
  currency: string;
  category: string;
  description: string;
  url: string;
  status: 'active' | 'inactive';
  logo?: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const router = useRouter();

  // Translation dictionary
  const translations = {
    'English': {
      'loading': 'Loading...',
      'back': 'Back',
      'create': 'Create',
      'online_store': 'Online Store',
      'stores': 'Stores',
      'no_stores': 'No stores to display',
      'edit_cover': 'Edit Cover',
      'edit_profile': 'Edit Profile',
      'notification': 'Notification',
      'profile_menu': 'Profile Menu'
    },
    'العربية': {
      'loading': 'جاري التحميل...',
      'back': 'رجوع',
      'create': 'إنشاء',
      'online_store': 'متجر إلكتروني',
      'stores': 'المتاجر',
      'no_stores': 'لا توجد متاجر للعرض',
      'edit_cover': 'تعديل الغلاف',
      'edit_profile': 'تعديل الملف الشخصي',
      'notification': 'إشعار',
      'profile_menu': 'قائمة الملف الشخصي'
    },
    'Español': {
      'loading': 'Cargando...',
      'back': 'Atrás',
      'create': 'Crear',
      'online_store': 'Tienda Online',
      'stores': 'Tiendas',
      'no_stores': 'No hay tiendas para mostrar',
      'edit_cover': 'Editar Portada',
      'edit_profile': 'Editar Perfil',
      'notification': 'Notificación',
      'profile_menu': 'Menú de Perfil'
    },
    'Français': {
      'loading': 'Chargement...',
      'back': 'Retour',
      'create': 'Créer',
      'online_store': 'Boutique en ligne',
      'stores': 'Boutiques',
      'no_stores': 'Aucune boutique à afficher',
      'edit_cover': 'Modifier la couverture',
      'edit_profile': 'Modifier le profil',
      'notification': 'Notification',
      'profile_menu': 'Menu du profil'
    },
    'Deutsch': {
      'loading': 'Laden...',
      'back': 'Zurück',
      'create': 'Erstellen',
      'online_store': 'Online-Shop',
      'stores': 'Shops',
      'no_stores': 'Keine Shops anzuzeigen',
      'edit_cover': 'Titelbild bearbeiten',
      'edit_profile': 'Profil bearbeiten',
      'notification': 'Benachrichtigung',
      'profile_menu': 'Profil-Menü'
    },
    'Português': {
      'loading': 'Carregando...',
      'back': 'Voltar',
      'create': 'Criar',
      'online_store': 'Loja Online',
      'stores': 'Lojas',
      'no_stores': 'Nenhuma loja para exibir',
      'edit_cover': 'Editar Capa',
      'edit_profile': 'Editar Perfil',
      'notification': 'Notificação',
      'profile_menu': 'Menu do Perfil'
    },
    'Türkçe': {
      'loading': 'Yükleniyor...',
      'back': 'Geri',
      'create': 'Oluştur',
      'online_store': 'Çevrimiçi Mağaza',
      'stores': 'Mağazalar',
      'no_stores': 'Gösterilecek mağaza yok',
      'edit_cover': 'Kapak Fotoğrafını Düzenle',
      'edit_profile': 'Profili Düzenle',
      'notification': 'Bildirim',
      'profile_menu': 'Profil Menüsü'
    },
    'हिन्दी': {
      'loading': 'लोड हो रहा है...',
      'back': 'वापस',
      'create': 'बनाएं',
      'online_store': 'ऑनलाइन स्टोर',
      'stores': 'स्टोर',
      'no_stores': 'दिखाने के लिए कोई स्टोर नहीं',
      'edit_cover': 'कवर संपादित करें',
      'edit_profile': 'प्रोफ़ाइल संपादित करें',
      'notification': 'अधिसूचना',
      'profile_menu': 'प्रोफ़ाइल मेनू'
    },
    'Italiano': {
      'loading': 'Caricamento...',
      'back': 'Indietro',
      'create': 'Crea',
      'online_store': 'Negozio Online',
      'stores': 'Negozi',
      'no_stores': 'Nessun negozio da visualizzare',
      'edit_cover': 'Modifica Copertina',
      'edit_profile': 'Modifica Profilo',
      'notification': 'Notifica',
      'profile_menu': 'Menu Profilo'
    },
    'Русский': {
      'loading': 'Загрузка...',
      'back': 'Назад',
      'create': 'Создать',
      'online_store': 'Онлайн-магазин',
      'stores': 'Магазины',
      'no_stores': 'Нет магазинов для отображения',
      'edit_cover': 'Редактировать обложку',
      'edit_profile': 'Редактировать профиль',
      'notification': 'Уведомление',
      'profile_menu': 'Меню профиля'
    },
    '日本語': {
      'loading': '読み込み中...',
      'back': '戻る',
      'create': '作成',
      'online_store': 'オンラインストア',
      'stores': 'ストア',
      'no_stores': '表示するストアがありません',
      'edit_cover': 'カバーを編集',
      'edit_profile': 'プロフィールを編集',
      'notification': '通知',
      'profile_menu': 'プロフィールメニュー'
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

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(userData));

    // Load existing stores from localStorage
    const existingStores = localStorage.getItem('stores');
    if (existingStores) {
      setStores(JSON.parse(existingStores));
    }

    // Load profile image from localStorage
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }

    // Load cover image from localStorage
    const savedCoverImage = localStorage.getItem('coverImage');
    if (savedCoverImage) {
      setCoverImage(savedCoverImage);
    }
  }, [router]);

  const handleCreateStore = (storeData: Omit<Store, 'id' | 'url' | 'status'>) => {
    const newStore: Store = {
      ...storeData,
      id: Date.now().toString(),
      url: `https://${storeData.name.toLowerCase().replace(/\s+/g, '')}.9jkl.com`,
      status: 'active'
    };

    const updatedStores = [...stores, newStore];
    setStores(updatedStores);
    localStorage.setItem('stores', JSON.stringify(updatedStores));
    setShowCreateForm(false);
  };

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        localStorage.setItem('profileImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCoverImage(result);
        localStorage.setItem('coverImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <div>{t('loading')}</div>;
  }

  return (
    <div className="profile-page">
      {/* App Bar */}
      <div className="app-bar">
        <div className="app-bar-content">
          <button className="back-btn" onClick={() => router.push('/')}>
            <span className="back-icon">←</span>
          </button>
          <div className="app-title">
            <div className="brand-container">
              <svg className="dragon-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Cute Dragon Body Gradient */}
                  <linearGradient id="cuteDragonBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:"#ff6b6b"}} />
                    <stop offset="50%" style={{stopColor:"#ff8e8e"}} />
                    <stop offset="100%" style={{stopColor:"#ffa8a8"}} />
                  </linearGradient>
                  
                  {/* Cute Fire Gradient */}
                  <radialGradient id="cuteFireGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style={{stopColor:"#ffeb3b", stopOpacity:0.8}} />
                    <stop offset="50%" style={{stopColor:"#ff9800", stopOpacity:0.6}} />
                    <stop offset="100%" style={{stopColor:"#ff5722", stopOpacity:0.4}} />
                  </radialGradient>
                  
                  {/* Cute Scale Pattern */}
                  <pattern id="cuteScales" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                    <circle cx="3" cy="3" r="1.5" fill="#ff8e8e" opacity="0.4"/>
                  </pattern>
                </defs>
                
                {/* Cute Dragon Head - Round and Friendly */}
                <circle cx="50" cy="50" r="25" fill="url(#cuteDragonBody)" stroke="#ff6b6b" strokeWidth="2"/>
                
                {/* Cute Dragon Snout */}
                <ellipse cx="50" cy="60" rx="8" ry="6" fill="url(#cuteDragonBody)" stroke="#ff6b6b" strokeWidth="1"/>
                
                {/* Cute Dragon Eyes - Big and Round */}
                <circle cx="42" cy="45" r="6" fill="#ffffff"/>
                <circle cx="58" cy="45" r="6" fill="#ffffff"/>
                <circle cx="42" cy="45" r="4" fill="#4fc3f7"/>
                <circle cx="58" cy="45" r="4" fill="#4fc3f7"/>
                <circle cx="42" cy="45" r="2" fill="#000000"/>
                <circle cx="58" cy="45" r="2" fill="#000000"/>
                
                {/* Cute Eye Highlights */}
                <circle cx="43" cy="44" r="1" fill="#ffffff"/>
                <circle cx="59" cy="44" r="1" fill="#ffffff"/>
                
                {/* Cute Nostrils */}
                <circle cx="47" cy="58" r="1.5" fill="#ff6b6b"/>
                <circle cx="53" cy="58" r="1.5" fill="#ff6b6b"/>
                
                {/* Cute Smile */}
                <path d="M45 65 Q50 70 55 65" stroke="#ff6b6b" strokeWidth="2" fill="none"/>
                
                {/* Cute Little Horns */}
                <path d="M35 30 Q30 20 35 25" stroke="#ff6b6b" strokeWidth="3" fill="none"/>
                <path d="M65 30 Q70 20 65 25" stroke="#ff6b6b" strokeWidth="3" fill="none"/>
                <path d="M35 30 Q30 20 35 25" stroke="#ff8e8e" strokeWidth="1.5" fill="none"/>
                <path d="M65 30 Q70 20 65 25" stroke="#ff8e8e" strokeWidth="1.5" fill="none"/>
                
                {/* Cute Little Wings */}
                <ellipse cx="25" cy="55" rx="8" ry="12" fill="url(#cuteDragonBody)" stroke="#ff6b6b" strokeWidth="1" opacity="0.8"/>
                <ellipse cx="75" cy="55" rx="8" ry="12" fill="url(#cuteDragonBody)" stroke="#ff6b6b" strokeWidth="1" opacity="0.8"/>
                
                {/* Cute Scale Details */}
                <circle cx="40" cy="35" r="1" fill="#ff8e8e"/>
                <circle cx="60" cy="35" r="1" fill="#ff8e8e"/>
                <circle cx="35" cy="50" r="1" fill="#ff8e8e"/>
                <circle cx="65" cy="50" r="1" fill="#ff8e8e"/>
                
                {/* Cute Little Fire Breath */}
                <path d="M47 70 Q45 80 43 75" fill="url(#cuteFireGradient)" opacity="0.7"/>
                <path d="M53 70 Q55 80 57 75" fill="url(#cuteFireGradient)" opacity="0.7"/>
                <path d="M50 70 Q48 85 46 80" fill="url(#cuteFireGradient)" opacity="0.5"/>
                <path d="M50 70 Q52 85 54 80" fill="url(#cuteFireGradient)" opacity="0.5"/>
                
                {/* Cute Fire Sparkles */}
                <circle cx="45" cy="75" r="1" fill="#ffeb3b"/>
                <circle cx="55" cy="75" r="1" fill="#ffeb3b"/>
                <circle cx="48" cy="80" r="0.8" fill="#ffeb3b"/>
                <circle cx="52" cy="80" r="0.8" fill="#ffeb3b"/>
              </svg>
              <h1 className="brand-text">Dragonists</h1>
            </div>
          </div>
          <div className="app-bar-actions">
            <button className="notification-btn" title={t('notification')}>🔔</button>
            <button className="profile-menu-btn" title={t('profile_menu')}>👤</button>
          </div>
        </div>
      </div>

      {/* Header with Cover Photo and Profile Picture */}
      <div className="profile-header">
        <div className="cover-photo" style={{ backgroundImage: coverImage ? `url(${coverImage})` : undefined }}>
          <div className="cover-overlay"></div>
          <StyleUploadImageFunction
            onImageUpload={handleCoverImageUpload}
            buttonClassName="edit-cover-btn"
            buttonTitle={t('edit_cover')}
            buttonSize="medium"
            icon="📷"
          />
        </div>
        
        <div className="profile-info">
          <div className="profile-picture">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="avatar-image" />
            ) : (
              <div className="avatar">👤</div>
            )}
            <StyleUploadImageFunction
              onImageUpload={handleProfileImageUpload}
              buttonClassName="edit-profile-btn"
              buttonTitle={t('edit_profile')}
              buttonSize="medium"
              icon="📷"
            />
          </div>
          <div className="user-details">
            <h2>{user.name}</h2>
            <button className="menu-btn">⋯</button>
          </div>
        </div>
      </div>

      {/* Create Section */}
      <div className="create-section">
        <h3>{t('create')}</h3>
        <div className="create-options">
          <div className="create-card" onClick={() => setShowCreateForm(true)}>
            <div className="card-icon">🛒</div>
            <button className="create-btn">{t('online_store')}</button>
          </div>
        </div>
      </div>

      {/* Stores Section */}
      <div className="stores-section">
        <h3>{t('stores')}</h3>
        {stores.length > 0 ? (
          <div className="stores-grid">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div className="no-stores">
            <p>{t('no_stores')}</p>
          </div>
        )}
      </div>


      {/* Create Store Form Modal */}
      {showCreateForm && (
        <CreateStoreForm 
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateStore}
        />
      )}
    </div>
  );
};

export default ProfilePage;
