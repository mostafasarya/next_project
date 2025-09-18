'use client';

import React from 'react';
import { HiCog } from 'react-icons/hi';

interface StoreBarIconsProps {
  // Icon types
  iconType: 'cart' | 'wishlist' | 'search' | 'notification' | 'user' | 'language' | 'settings' | 'profile' | 'orders' | 'logout' | 'empty-cart' | 'empty-wishlist' | 'no-results' | 'flag';
  
  // Optional props for specific icons
  currentLanguage?: string;
  language?: string;
  
  // Optional styling
  className?: string;
  onClick?: () => void;
}

const StoreBarIcons: React.FC<StoreBarIconsProps> = ({
  iconType,
  currentLanguage,
  language,
  className = '',
  onClick
}) => {
  const getIcon = () => {
    switch (iconType) {
      case 'cart':
        return '🛒';
      case 'wishlist':
        return '❤️';
      case 'search':
        return '🔍';
      case 'notification':
        return '🔔';
      case 'user':
        return '👤';
      case 'language':
        return currentLanguage === 'English' ? 'A' : '🌐';
      case 'settings':
        return <HiCog />;
      case 'profile':
        return '👤';
      case 'orders':
        return '📦';
      case 'logout':
        return '🚪';
      case 'empty-cart':
        return '🛒';
      case 'empty-wishlist':
        return '❤️';
      case 'no-results':
        return '🔍';
      case 'flag':
        return getFlagIcon(language || '');
      default:
        return '❓';
    }
  };

  const getFlagIcon = (lang: string) => {
    const flagMapping: { [key: string]: string } = {
      'English': '🇺🇸',
      'العربية': '🇸🇦',
      'Français': '🇫🇷',
      'Español': '🇪🇸',
      'Deutsch': '🇩🇪',
      'Italiano': '🇮🇹',
      'Português': '🇵🇹',
      'Русский': '🇷🇺',
      'Nederlands': '🇳🇱',
      'Svenska': '🇸🇪',
      'Norsk': '🇳🇴',
      'Dansk': '🇩🇰',
      'Suomi': '🇫🇮',
      'Polski': '🇵🇱',
      'Türkçe': '🇹🇷',
      'हिन्दी': '🇮🇳',
      '日本語': '🇯🇵',
      '中文': '🇨🇳',
      '한국어': '🇰🇷'
    };
    return flagMapping[lang] || '🌐';
  };

  if (onClick) {
    return (
      <span className={className} onClick={onClick}>
        {getIcon()}
      </span>
    );
  }

  return (
    <span className={className}>
      {getIcon()}
    </span>
  );
};

export default StoreBarIcons;
