# Language Translation System Documentation

## Overview

This document explains the comprehensive language translation system implemented in the online store application. The system supports 13 languages with both native script names and English names for maximum compatibility.

## Supported Languages

| **Language** | **Native Script** | **English Name** | **Flag** | **Code** |
|--------------|-------------------|------------------|----------|----------|
| English | English | English | 🇺🇸 | en |
| Arabic | العربية | Arabic | 🇸🇦 | ar |
| Spanish | Español | Spanish | 🇪🇸 | es |
| French | Français | French | 🇫🇷 | fr |
| German | Deutsch | German | 🇩🇪 | de |
| Portuguese | Português | Portuguese | 🇵🇹 | pt |
| Turkish | Türkçe | Turkish | 🇹🇷 | tr |
| Hindi | हिन्दी | Hindi | 🇮🇳 | hi |
| Italian | Italiano | Italian | 🇮🇹 | it |
| Russian | Русский | Russian | 🇷🇺 | ru |
| Japanese | 日本語 | Japanese | 🇯🇵 | ja |
| Chinese | 中文 | Chinese | 🇨🇳 | zh |
| Korean | 한국어 | Korean | 🇰🇷 | ko |

## Architecture

### 1. Translation Data Structure

The translation system uses a nested object structure where each language has its own section:

```typescript
const translations = {
  'English': {
    'welcome_title': 'Welcome to Your Store',
    'add_product': 'Product',
    'add_collection': 'Collection',
    // ... more translations
  },
  'Arabic': {
    'welcome_title': 'مرحباً بك في متجرك',
    'add_product': 'منتج',
    'add_collection': 'مجموعة',
    // ... more translations
  },
  'العربية': { // Native script version
    'welcome_title': 'مرحباً بك في متجرك',
    'add_product': 'منتج',
    'add_collection': 'مجموعة',
    // ... same translations as 'Arabic'
  },
  // ... other languages
};
```

### 2. Language Mapping

A mapping object converts native script names to English names for consistent lookup:

```typescript
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
```

### 3. Translation Function Logic

The core translation function implements a robust lookup system:

```typescript
const t = (key: string) => {
  // Step 1: Try current language directly (for native script names like 'العربية')
  let currentLangTranslations = translations[currentLanguage as keyof typeof translations];
  
  // Step 2: If not found, try mapped language (for English names like 'Arabic')
  if (!currentLangTranslations) {
    const mappedLanguage = languageMapping[currentLanguage] || currentLanguage;
    currentLangTranslations = translations[mappedLanguage as keyof typeof translations];
  }
  
  // Step 3: Fallback to English
  const englishTranslations = translations['English'];
  
  if (currentLangTranslations && currentLangTranslations[key as keyof typeof currentLangTranslations]) {
    return currentLangTranslations[key as keyof typeof currentLangTranslations];
  }
  
  if (englishTranslations && englishTranslations[key as keyof typeof englishTranslations]) {
    return englishTranslations[key as keyof typeof englishTranslations];
  }
  
  // Step 4: Return key if no translation found
  return key;
};
```

## Implementation Details

### 1. State Management

Each component that uses translations maintains:

```typescript
const [currentLanguage, setCurrentLanguage] = useState('English');
```

### 2. Language Persistence

Languages are stored in localStorage for persistence:

```typescript
// Save language selection
localStorage.setItem('currentLanguage', newLanguage);
localStorage.setItem('websiteLanguage', newLanguage);
localStorage.setItem('storeLanguages', JSON.stringify(selectedLanguages));
```

### 3. Language Change Events

Cross-component communication uses custom events:

```typescript
// Dispatch language change event
window.dispatchEvent(new CustomEvent('languageChanged', {
  detail: { language: newLanguage }
}));

// Listen for language changes
useEffect(() => {
  const handleLanguageChange = (event: CustomEvent) => {
    setCurrentLanguage(event.detail.language);
  };
  window.addEventListener('languageChanged', handleLanguageChange as EventListener);
  return () => {
    window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
  };
}, []);
```

### 4. Component Re-rendering

To ensure translations update when language changes, use the `key` prop:

```typescript
<EditorBarDrawer
  key={currentLanguage}  // Forces re-render when language changes
  currentLanguage={currentLanguage}
  t={t}
  // ... other props
/>
```

## Usage Patterns

### 1. Basic Translation

```typescript
// In JSX
<h1>{t('welcome_title')}</h1>
<button>{t('add_product')}</button>
```

### 2. Conditional Translation

```typescript
// For different contexts
const buttonText = isLogin ? t('login') : t('sign_up');
```

### 3. Dynamic Translation Keys

```typescript
// For dynamic content
const statusText = t(store.status); // 'active' or 'inactive'
```

## File Structure

```
src/
├── components/
│   ├── StoreHomePage.tsx            # Main translation hub
│   ├── EditorBarDrawer.tsx          # Uses t() function
│   ├── StoreBar.tsx                 # Language selector
│   ├── LandingPage.tsx              # Landing page translations
│   ├── ProfilePage.tsx              # Profile page translations
│   ├── CreateStoreForm.tsx          # Form translations
│   ├── StoreCard.tsx                # Card translations
│   └── Footer.tsx                   # Footer translations
└── app/
    └── layout.tsx                   # Global typography
```

## Translation Keys Reference

### Common Keys

| **Key** | **English** | **Arabic** | **Spanish** |
|---------|-------------|------------|-------------|
| `welcome_title` | Welcome to Your Store | مرحباً بك في متجرك | Bienvenido a tu tienda |
| `add_product` | Product | منتج | Producto |
| `add_collection` | Collection | مجموعة | Colección |
| `create_catalog` | Create Catalog | إنشاء كتالوج | Crear catálogo |
| `create_page` | Create Page | إنشاء صفحة | Crear página |
| `mobile` | Mobile | موبايل | Móvil |
| `publish` | Publish | نشر | Publicar |
| `store_pages` | Store Pages | صفحات المتجر | Páginas de la tienda |
| `home` | Home | الرئيسية | Inicio |
| `collections` | Collections | المجموعات | Colecciones |
| `catalog` | Catalog | الكاتالوج | Catálogo |
| `support` | Support | الدعم | Soporte |
| `about` | About | حولنا | Acerca de |

### Form Keys

| **Key** | **English** | **Arabic** | **Spanish** |
|---------|-------------|------------|-------------|
| `email` | Email | البريد الإلكتروني | Correo electrónico |
| `password` | Password | كلمة المرور | Contraseña |
| `full_name` | Full Name | الاسم الكامل | Nombre completo |
| `store_name` | Store Name | اسم المتجر | Nombre de la tienda |
| `cancel` | Cancel | إلغاء | Cancelar |
| `save` | Save | حفظ | Guardar |

## Troubleshooting

### 1. Translation Not Appearing

**Problem**: Text shows as key instead of translation
**Solution**: 
- Check if the key exists in the translations object
- Verify the current language is set correctly
- Ensure the component is re-rendering when language changes

### 2. Mixed Languages

**Problem**: Some elements are translated, others are not
**Solution**:
- Check if all components are using the same `t()` function
- Verify the `key={currentLanguage}` prop is set on components
- Ensure all components are listening for language change events

### 3. Language Not Persisting

**Problem**: Language resets on page refresh
**Solution**:
- Check localStorage is being set correctly
- Verify the initialization logic in useEffect
- Ensure the language is loaded on component mount

### 4. Performance Issues

**Problem**: Slow re-rendering when changing languages
**Solution**:
- Use React.memo for components that don't need to re-render
- Optimize the translation function
- Consider using useMemo for expensive translations

## Best Practices

### 1. Key Naming Convention

Use descriptive, hierarchical keys:
```typescript
// Good
'welcome_title'
'add_product'
'create_catalog'
'store_pages'

// Avoid
'title'
'btn1'
'text'
```

### 2. Translation Completeness

Always provide translations for all supported languages:
```typescript
// Ensure every language has the same keys
'English': { 'key1': 'value1', 'key2': 'value2' },
'Arabic': { 'key1': 'value1', 'key2': 'value2' },
// ... all other languages
```

### 3. Fallback Strategy

Always provide English fallback:
```typescript
if (currentLangTranslations && currentLangTranslations[key]) {
  return currentLangTranslations[key];
}
if (englishTranslations && englishTranslations[key]) {
  return englishTranslations[key]; // Fallback to English
}
return key; // Last resort
```

### 4. Component Structure

Keep translation logic centralized:
```typescript
// In StoreHomePage.tsx (main hub)
const translations = { /* all translations */ };
const t = (key: string) => { /* translation logic */ };

// Pass to child components
<ChildComponent t={t} currentLanguage={currentLanguage} />
```

## Future Enhancements

### 1. Dynamic Translation Loading

Load translations from external files:
```typescript
const loadTranslations = async (language: string) => {
  const translations = await import(`./translations/${language}.json`);
  return translations.default;
};
```

### 2. Pluralization Support

Add pluralization rules:
```typescript
const t = (key: string, count?: number) => {
  if (count !== undefined) {
    const pluralKey = count === 1 ? key : `${key}_plural`;
    return translations[currentLanguage][pluralKey];
  }
  return translations[currentLanguage][key];
};
```

### 3. Context-Aware Translations

Support different translations based on context:
```typescript
const t = (key: string, context?: string) => {
  const contextKey = context ? `${key}_${context}` : key;
  return translations[currentLanguage][contextKey];
};
```

## Maintenance

### Adding New Languages

1. Add language to the `languages` array in components
2. Add native script name to `languageMapping`
3. Create translation section in `translations` object
4. Add flag emoji to flag mapping
5. Test all components with the new language

### Adding New Translation Keys

1. Add key to English translations first
2. Add key to all other language sections
3. Use the key in components with `t('new_key')`
4. Test translation in all supported languages

### Updating Translations

1. Update the specific language section
2. Test the change in the application
3. Verify no other languages are affected
4. Update documentation if needed

This translation system provides a robust, scalable solution for multilingual support in the online store application. The dual naming system (native script + English) ensures compatibility across different components and contexts.
