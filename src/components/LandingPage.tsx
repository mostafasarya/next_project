'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WebsitOuterNavigationBar from './WebsitOuterNavigationBar';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const router = useRouter();

  // Translation dictionary
  const translations = {
    'English': {
      'welcome_title': 'Welcome to Online Store',
      'welcome_subtitle': 'Create and manage your online business',
      'login': 'Login',
      'sign_up': 'Sign Up',
      'full_name': 'Full Name',
      'full_name_placeholder': 'Enter your full name',
      'email': 'Email',
      'email_placeholder': 'Enter your email',
      'password': 'Password',
      'password_placeholder': 'Enter your password',
      'confirm_password': 'Confirm Password',
      'confirm_password_placeholder': 'Confirm your password',
      'submit_login': 'Login',
      'submit_signup': 'Sign Up'
    },
    'العربية': {
      'welcome_title': 'مرحباً بك في المتجر الإلكتروني',
      'welcome_subtitle': 'أنشئ وأدر متجرك الإلكتروني',
      'login': 'تسجيل الدخول',
      'sign_up': 'إنشاء حساب',
      'full_name': 'الاسم الكامل',
      'full_name_placeholder': 'أدخل اسمك الكامل',
      'email': 'البريد الإلكتروني',
      'email_placeholder': 'أدخل بريدك الإلكتروني',
      'password': 'كلمة المرور',
      'password_placeholder': 'أدخل كلمة المرور',
      'confirm_password': 'تأكيد كلمة المرور',
      'confirm_password_placeholder': 'أكد كلمة المرور',
      'submit_login': 'تسجيل الدخول',
      'submit_signup': 'إنشاء حساب'
    },
    'Español': {
      'welcome_title': 'Bienvenido a Online Store',
      'welcome_subtitle': 'Crea y gestiona tu negocio en línea',
      'login': 'Iniciar Sesión',
      'sign_up': 'Registrarse',
      'full_name': 'Nombre Completo',
      'full_name_placeholder': 'Ingresa tu nombre completo',
      'email': 'Correo Electrónico',
      'email_placeholder': 'Ingresa tu correo electrónico',
      'password': 'Contraseña',
      'password_placeholder': 'Ingresa tu contraseña',
      'confirm_password': 'Confirmar Contraseña',
      'confirm_password_placeholder': 'Confirma tu contraseña',
      'submit_login': 'Iniciar Sesión',
      'submit_signup': 'Registrarse'
    },
    'Français': {
      'welcome_title': 'Bienvenue sur Online Store',
      'welcome_subtitle': 'Créez et gérez votre entreprise en ligne',
      'login': 'Se connecter',
      'sign_up': 'S\'inscrire',
      'full_name': 'Nom Complet',
      'full_name_placeholder': 'Entrez votre nom complet',
      'email': 'E-mail',
      'email_placeholder': 'Entrez votre e-mail',
      'password': 'Mot de passe',
      'password_placeholder': 'Entrez votre mot de passe',
      'confirm_password': 'Confirmer le mot de passe',
      'confirm_password_placeholder': 'Confirmez votre mot de passe',
      'submit_login': 'Se connecter',
      'submit_signup': 'S\'inscrire'
    },
    'Deutsch': {
      'welcome_title': 'Willkommen bei Online Store',
      'welcome_subtitle': 'Erstellen und verwalten Sie Ihr Online-Geschäft',
      'login': 'Anmelden',
      'sign_up': 'Registrieren',
      'full_name': 'Vollständiger Name',
      'full_name_placeholder': 'Geben Sie Ihren vollständigen Namen ein',
      'email': 'E-Mail',
      'email_placeholder': 'Geben Sie Ihre E-Mail ein',
      'password': 'Passwort',
      'password_placeholder': 'Geben Sie Ihr Passwort ein',
      'confirm_password': 'Passwort bestätigen',
      'confirm_password_placeholder': 'Bestätigen Sie Ihr Passwort',
      'submit_login': 'Anmelden',
      'submit_signup': 'Registrieren'
    },
    'Português': {
      'welcome_title': 'Bem-vindo ao Online Store',
      'welcome_subtitle': 'Crie e gerencie seu negócio online',
      'login': 'Entrar',
      'sign_up': 'Cadastrar',
      'full_name': 'Nome Completo',
      'full_name_placeholder': 'Digite seu nome completo',
      'email': 'E-mail',
      'email_placeholder': 'Digite seu e-mail',
      'password': 'Senha',
      'password_placeholder': 'Digite sua senha',
      'confirm_password': 'Confirmar Senha',
      'confirm_password_placeholder': 'Confirme sua senha',
      'submit_login': 'Entrar',
      'submit_signup': 'Cadastrar'
    },
    'Türkçe': {
      'welcome_title': 'Online Store\'a Hoş Geldiniz',
      'welcome_subtitle': 'Çevrimiçi işinizi oluşturun ve yönetin',
      'login': 'Giriş Yap',
      'sign_up': 'Kayıt Ol',
      'full_name': 'Tam Ad',
      'full_name_placeholder': 'Tam adınızı girin',
      'email': 'E-posta',
      'email_placeholder': 'E-postanızı girin',
      'password': 'Şifre',
      'password_placeholder': 'Şifrenizi girin',
      'confirm_password': 'Şifreyi Onayla',
      'confirm_password_placeholder': 'Şifrenizi onaylayın',
      'submit_login': 'Giriş Yap',
      'submit_signup': 'Kayıt Ol'
    },
    'हिन्दी': {
      'welcome_title': 'ऑनलाइन स्टोर में आपका स्वागत है',
      'welcome_subtitle': 'अपना ऑनलाइन व्यवसाय बनाएं और प्रबंधित करें',
      'login': 'लॉग इन',
      'sign_up': 'साइन अप',
      'full_name': 'पूरा नाम',
      'full_name_placeholder': 'अपना पूरा नाम दर्ज करें',
      'email': 'ईमेल',
      'email_placeholder': 'अपना ईमेल दर्ज करें',
      'password': 'पासवर्ड',
      'password_placeholder': 'अपना पासवर्ड दर्ज करें',
      'confirm_password': 'पासवर्ड की पुष्टि करें',
      'confirm_password_placeholder': 'अपने पासवर्ड की पुष्टि करें',
      'submit_login': 'लॉग इन',
      'submit_signup': 'साइन अप'
    },
    'Italiano': {
      'welcome_title': 'Benvenuto in Online Store',
      'welcome_subtitle': 'Crea e gestisci la tua attività online',
      'login': 'Accedi',
      'sign_up': 'Registrati',
      'full_name': 'Nome Completo',
      'full_name_placeholder': 'Inserisci il tuo nome completo',
      'email': 'E-mail',
      'email_placeholder': 'Inserisci la tua e-mail',
      'password': 'Password',
      'password_placeholder': 'Inserisci la tua password',
      'confirm_password': 'Conferma Password',
      'confirm_password_placeholder': 'Conferma la tua password',
      'submit_login': 'Accedi',
      'submit_signup': 'Registrati'
    },
    'Русский': {
      'welcome_title': 'Добро пожаловать в Online Store',
      'welcome_subtitle': 'Создавайте и управляйте своим онлайн-бизнесом',
      'login': 'Войти',
      'sign_up': 'Зарегистрироваться',
      'full_name': 'Полное имя',
      'full_name_placeholder': 'Введите ваше полное имя',
      'email': 'Электронная почта',
      'email_placeholder': 'Введите вашу электронную почту',
      'password': 'Пароль',
      'password_placeholder': 'Введите ваш пароль',
      'confirm_password': 'Подтвердить пароль',
      'confirm_password_placeholder': 'Подтвердите ваш пароль',
      'submit_login': 'Войти',
      'submit_signup': 'Зарегистрироваться'
    },
    '日本語': {
      'welcome_title': 'Online Storeへようこそ',
      'welcome_subtitle': 'オンラインビジネスを作成・管理しましょう',
      'login': 'ログイン',
      'sign_up': 'サインアップ',
      'full_name': 'フルネーム',
      'full_name_placeholder': 'フルネームを入力してください',
      'email': 'メールアドレス',
      'email_placeholder': 'メールアドレスを入力してください',
      'password': 'パスワード',
      'password_placeholder': 'パスワードを入力してください',
      'confirm_password': 'パスワード確認',
      'confirm_password_placeholder': 'パスワードを確認してください',
      'submit_login': 'ログイン',
      'submit_signup': 'サインアップ'
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in a real app, you'd validate against a backend
    if (isLogin) {
      if (formData.email && formData.password) {
        // Store user info in localStorage for demo purposes
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          name: formData.email.split('@')[0] // Use email prefix as name for demo
        }));
        router.push('/profile');
      }
    } else {
      if (formData.email && formData.password && formData.name && formData.password === formData.confirmPassword) {
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          name: formData.name
        }));
        router.push('/profile');
      }
    }
  };

  return (
    <div className="landing-page">
      <WebsitOuterNavigationBar />
      <div className="auth-container">
        <div className="auth-header">
          <h1>{t('welcome_title')}</h1>
          <p>{t('welcome_subtitle')}</p>
        </div>
        
        <div className="auth-tabs">
          <button 
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            {t('login')}
          </button>
          <button 
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            {t('sign_up')}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">{t('full_name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('full_name_placeholder')}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t('email_placeholder')}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">{t('password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={t('password_placeholder')}
              required
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">{t('confirm_password')}</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={t('confirm_password_placeholder')}
                required
              />
            </div>
          )}
          
          <button type="submit" className="submit-btn">
            {isLogin ? t('submit_login') : t('submit_signup')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
