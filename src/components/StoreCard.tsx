'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './StoreCard.css';

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

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Translation dictionary
  const translations = {
    'English': {
      'design_your_store': 'Design your store',
      'store_wallet': 'Store Wallet',
      'marketing': 'Marketing',
      'payment_method': 'Payment Method',
      'my_orders': 'My orders',
      'inventory': 'Inventory',
      'shipping': 'Shipping',
      'customers': 'Customers',
      'store_permissions': 'Store Permissions',
      'messages': 'Messages',
      'edit_info': 'EDIT INFO',
      'deactivate': 'Deactivate',
      'reset': 'Reset',
      'subscription': 'Subscription',
      'delete': 'Delete',
      'billing': 'Billing',
      'store_members': 'Store members',
      'usd_amount': '0 USD',
      'active': 'Active',
      'inactive': 'Inactive'
    },
    'العربية': {
      'design_your_store': 'صمم متجرك',
      'store_wallet': 'محفظة المتجر',
      'marketing': 'التسويق',
      'payment_method': 'طريقة الدفع',
      'my_orders': 'طلباتي',
      'inventory': 'المخزون',
      'shipping': 'الشحن',
      'customers': 'العملاء',
      'store_permissions': 'صلاحيات المتجر',
      'messages': 'الرسائل',
      'edit_info': 'تعديل المعلومات',
      'deactivate': 'إلغاء التفعيل',
      'reset': 'إعادة تعيين',
      'subscription': 'الاشتراك',
      'delete': 'حذف',
      'billing': 'الفواتير',
      'store_members': 'أعضاء المتجر',
      'usd_amount': '0 دولار',
      'active': 'نشط',
      'inactive': 'غير نشط'
    },
    'Español': {
      'design_your_store': 'Diseña tu tienda',
      'store_wallet': 'Cartera de la tienda',
      'marketing': 'Marketing',
      'payment_method': 'Método de pago',
      'my_orders': 'Mis pedidos',
      'inventory': 'Inventario',
      'shipping': 'Envío',
      'customers': 'Clientes',
      'store_permissions': 'Permisos de la tienda',
      'messages': 'Mensajes',
      'edit_info': 'EDITAR INFO',
      'deactivate': 'Desactivar',
      'reset': 'Restablecer',
      'subscription': 'Suscripción',
      'delete': 'Eliminar',
      'billing': 'Facturación',
      'store_members': 'Miembros de la tienda',
      'usd_amount': '0 USD',
      'active': 'Activo',
      'inactive': 'Inactivo'
    },
    'Français': {
      'design_your_store': 'Concevez votre boutique',
      'store_wallet': 'Portefeuille de la boutique',
      'marketing': 'Marketing',
      'payment_method': 'Méthode de paiement',
      'my_orders': 'Mes commandes',
      'inventory': 'Inventaire',
      'shipping': 'Expédition',
      'customers': 'Clients',
      'store_permissions': 'Permissions de la boutique',
      'messages': 'Messages',
      'edit_info': 'MODIFIER INFO',
      'deactivate': 'Désactiver',
      'reset': 'Réinitialiser',
      'subscription': 'Abonnement',
      'delete': 'Supprimer',
      'billing': 'Facturation',
      'store_members': 'Membres de la boutique',
      'usd_amount': '0 USD',
      'active': 'Actif',
      'inactive': 'Inactif'
    },
    'Deutsch': {
      'design_your_store': 'Gestalten Sie Ihren Shop',
      'store_wallet': 'Shop-Geldbörse',
      'marketing': 'Marketing',
      'payment_method': 'Zahlungsmethode',
      'my_orders': 'Meine Bestellungen',
      'inventory': 'Inventar',
      'shipping': 'Versand',
      'customers': 'Kunden',
      'store_permissions': 'Shop-Berechtigungen',
      'messages': 'Nachrichten',
      'edit_info': 'INFO BEARBEITEN',
      'deactivate': 'Deaktivieren',
      'reset': 'Zurücksetzen',
      'subscription': 'Abonnement',
      'delete': 'Löschen',
      'billing': 'Abrechnung',
      'store_members': 'Shop-Mitglieder',
      'usd_amount': '0 USD',
      'active': 'Aktiv',
      'inactive': 'Inaktiv'
    },
    'Português': {
      'design_your_store': 'Projete sua loja',
      'store_wallet': 'Carteira da loja',
      'marketing': 'Marketing',
      'payment_method': 'Método de pagamento',
      'my_orders': 'Meus pedidos',
      'inventory': 'Inventário',
      'shipping': 'Envio',
      'customers': 'Clientes',
      'store_permissions': 'Permissões da loja',
      'messages': 'Mensagens',
      'edit_info': 'EDITAR INFO',
      'deactivate': 'Desativar',
      'reset': 'Redefinir',
      'subscription': 'Assinatura',
      'delete': 'Excluir',
      'billing': 'Cobrança',
      'store_members': 'Membros da loja',
      'usd_amount': '0 USD',
      'active': 'Ativo',
      'inactive': 'Inativo'
    },
    'Türkçe': {
      'design_your_store': 'Mağazanızı tasarlayın',
      'store_wallet': 'Mağaza cüzdanı',
      'marketing': 'Pazarlama',
      'payment_method': 'Ödeme yöntemi',
      'my_orders': 'Siparişlerim',
      'inventory': 'Envanter',
      'shipping': 'Kargo',
      'customers': 'Müşteriler',
      'store_permissions': 'Mağaza izinleri',
      'messages': 'Mesajlar',
      'edit_info': 'BİLGİYİ DÜZENLE',
      'deactivate': 'Devre dışı bırak',
      'reset': 'Sıfırla',
      'subscription': 'Abonelik',
      'delete': 'Sil',
      'billing': 'Faturalandırma',
      'store_members': 'Mağaza üyeleri',
      'usd_amount': '0 USD',
      'active': 'Aktif',
      'inactive': 'Pasif'
    },
    'हिन्दी': {
      'design_your_store': 'अपना स्टोर डिज़ाइन करें',
      'store_wallet': 'स्टोर वॉलेट',
      'marketing': 'मार्केटिंग',
      'payment_method': 'भुगतान विधि',
      'my_orders': 'मेरे ऑर्डर',
      'inventory': 'इन्वेंटरी',
      'shipping': 'शिपिंग',
      'customers': 'ग्राहक',
      'store_permissions': 'स्टोर अनुमतियां',
      'messages': 'संदेश',
      'edit_info': 'जानकारी संपादित करें',
      'deactivate': 'निष्क्रिय करें',
      'reset': 'रीसेट करें',
      'subscription': 'सदस्यता',
      'delete': 'हटाएं',
      'billing': 'बिलिंग',
      'store_members': 'स्टोर सदस्य',
      'usd_amount': '0 USD',
      'active': 'सक्रिय',
      'inactive': 'निष्क्रिय'
    },
    'Italiano': {
      'design_your_store': 'Progetta il tuo negozio',
      'store_wallet': 'Portafoglio del negozio',
      'marketing': 'Marketing',
      'payment_method': 'Metodo di pagamento',
      'my_orders': 'I miei ordini',
      'inventory': 'Inventario',
      'shipping': 'Spedizione',
      'customers': 'Clienti',
      'store_permissions': 'Permessi del negozio',
      'messages': 'Messaggi',
      'edit_info': 'MODIFICA INFO',
      'deactivate': 'Disattiva',
      'reset': 'Reimposta',
      'subscription': 'Abbonamento',
      'delete': 'Elimina',
      'billing': 'Fatturazione',
      'store_members': 'Membri del negozio',
      'usd_amount': '0 USD',
      'active': 'Attivo',
      'inactive': 'Inattivo'
    },
    'Русский': {
      'design_your_store': 'Создайте свой магазин',
      'store_wallet': 'Кошелек магазина',
      'marketing': 'Маркетинг',
      'payment_method': 'Способ оплаты',
      'my_orders': 'Мои заказы',
      'inventory': 'Инвентарь',
      'shipping': 'Доставка',
      'customers': 'Клиенты',
      'store_permissions': 'Разрешения магазина',
      'messages': 'Сообщения',
      'edit_info': 'РЕДАКТИРОВАТЬ ИНФО',
      'deactivate': 'Деактивировать',
      'reset': 'Сбросить',
      'subscription': 'Подписка',
      'delete': 'Удалить',
      'billing': 'Выставление счетов',
      'store_members': 'Участники магазина',
      'usd_amount': '0 USD',
      'active': 'Активный',
      'inactive': 'Неактивный'
    },
    '日本語': {
      'design_your_store': 'ストアをデザイン',
      'store_wallet': 'ストアウォレット',
      'marketing': 'マーケティング',
      'payment_method': '支払い方法',
      'my_orders': '注文履歴',
      'inventory': '在庫',
      'shipping': '配送',
      'customers': '顧客',
      'store_permissions': 'ストア権限',
      'messages': 'メッセージ',
      'edit_info': '情報を編集',
      'deactivate': '無効化',
      'reset': 'リセット',
      'subscription': 'サブスクリプション',
      'delete': '削除',
      'billing': '請求',
      'store_members': 'ストアメンバー',
      'usd_amount': '0 USD',
      'active': 'アクティブ',
      'inactive': '非アクティブ'
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
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Calculate available space and set position
    if (settingsRef.current) {
      const rect = settingsRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const dropdownHeight = 280; // Approximate height of dropdown
      
      if (rect.bottom + dropdownHeight > windowHeight) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
    
    setShowDropdown(!showDropdown);
  };

  const features = [
    { name: t('design_your_store'), icon: '🧠', color: '#20bf6b' },
    { name: t('store_wallet'), icon: '💰', color: '#26de81', value: t('usd_amount') },
    { name: t('marketing'), icon: '📢', color: '#ff4757' },
    { name: t('payment_method'), icon: '💳', color: '#26de81' },
    { name: t('my_orders'), icon: '📋', color: '#3742fa' },
    { name: t('inventory'), icon: '📦', color: '#a55eea' },
    { name: t('shipping'), icon: '🚚', color: '#20bf6b' },
    { name: t('customers'), icon: '👥', color: '#ffa502' },
    { name: t('store_permissions'), icon: '🔐', color: '#26de81' },
    { name: t('messages'), icon: '💬', color: '#ff4757' }
  ];

  const dropdownOptions = [
    { icon: '✏️', text: t('edit_info'), action: () => console.log('Edit Info clicked') },
    { icon: '⏸️', text: t('deactivate'), action: () => console.log('Deactivate clicked') },
    { icon: '⏸️', text: t('reset'), action: () => console.log('Reset clicked') },
    { icon: '📋', text: t('subscription'), action: () => console.log('Subscription clicked') },
    { icon: '🗑️', text: t('delete'), action: () => console.log('Delete clicked') },
    { icon: '💳', text: t('billing'), action: () => console.log('Billing clicked'), highlight: true },
    { icon: '👥', text: t('store_members'), action: () => console.log('Store members clicked') }
  ];

  const handleOptionClick = (action: () => void) => {
    action();
    setShowDropdown(false);
  };

  const handleDesignStore = () => {
    router.push('/Store-homepage');
  };

  const handlePaymentMethods = () => {
    router.push(`/payment-methods/${store.id}`);
  };

  const handleInventory = () => {
    router.push('/products-management');
  };

  const handleStorePermissions = () => {
    router.push(`/store-permissions?storeId=${store.id}`);
  };

  const handleMessages = () => {
    router.push(`/store-client-messages?storeId=${store.id}`);
  };

  const handleMarketing = () => {
    router.push(`/marketing-hub?storeId=${store.id}`);
  };

  return (
    <div className="store-card">
      <div className="store-header">
        <div className="store-info">
          <div className="store-name">
            <div className="store-logo">
              {store.logo ? (
                <img src={store.logo} alt={`${store.name} logo`} className="store-logo-img" />
              ) : (
                <div className="store-logo-default">🏪</div>
              )}
            </div>
            <span className="store-link">{store.name}</span>
            <span className={`status-badge ${store.status}`}>
              {t(store.status)}
            </span>
          </div>
          <div className="store-url">
            <span className="url-text">{store.url}</span>
          </div>
        </div>
        <div className="settings-container" ref={dropdownRef}>
          <div ref={settingsRef}>
            <button className="settings-btn" onClick={handleSettingsClick}>⚙️</button>
          </div>
          {showDropdown && (
            <div className={`settings-dropdown ${dropdownPosition}`}>
              {dropdownOptions.map((option, index) => (
                <div
                  key={index}
                  className={`dropdown-option ${option.highlight ? 'highlighted' : ''}`}
                  onClick={() => handleOptionClick(option.action)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-text">{option.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="store-features">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`feature-card ${feature.name === t('design_your_store') ? 'design-feature' : ''}`}
            onClick={
              feature.name === t('design_your_store') ? handleDesignStore :
              feature.name === t('payment_method') ? handlePaymentMethods :
              feature.name === t('inventory') ? handleInventory :
              feature.name === t('store_permissions') ? handleStorePermissions :
              feature.name === t('messages') ? handleMessages :
              feature.name === t('marketing') ? handleMarketing :
              undefined
            }
          >
            <div 
              className="feature-icon"
              style={{ backgroundColor: feature.color + '20' }}
            >
              <span style={{ color: feature.color }}>{feature.icon}</span>
            </div>
            <div className="feature-info">
              <span className="feature-name">{feature.name}</span>
              {feature.value && (
                <span className="feature-value">{feature.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreCard;

