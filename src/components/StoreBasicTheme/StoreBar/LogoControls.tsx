'use client';

import React, { useState, useEffect } from 'react';

export interface LogoControlsProps {
  storeLogo: string | null;
  logoShape: 'circle' | 'rectangle';
  logoWidth: number;
  logoHeight: number;
  horizontalPadding: number;
  verticalPadding: number;
  showLogoSettings: boolean;
  onStoreLogoChange: (logo: string | null) => void;
  onLogoShapeChange: (shape: 'circle' | 'rectangle') => void;
  onLogoWidthChange: (width: number) => void;
  onLogoHeightChange: (height: number) => void;
  onHorizontalPaddingChange: (padding: number) => void;
  onVerticalPaddingChange: (padding: number) => void;
  onShowLogoSettingsChange: (show: boolean) => void;
  onCloseLogoSettings: () => void;
  onUpdateLogoSettings: () => void;
}

export interface LogoControlsState {
  storeLogo: string | null;
  logoShape: 'circle' | 'rectangle';
  logoWidth: number;
  logoHeight: number;
  horizontalPadding: number;
  verticalPadding: number;
  showLogoSettings: boolean;
}

export const useLogoControls = (): LogoControlsState & {
  handleLogoShapeChange: (shape: 'circle' | 'rectangle') => void;
  handleLogoWidthChange: (width: number) => void;
  handleLogoHeightChange: (height: number) => void;
  handleHorizontalPaddingChange: (padding: number) => void;
  handleVerticalPaddingChange: (padding: number) => void;
  handleCloseSettings: () => void;
  handleUpdateSettings: () => void;
  handleSettingsClick: () => void;
  setStoreLogo: (logo: string | null) => void;
  setShowLogoSettings: (show: boolean) => void;
} => {
  const [storeLogo, setStoreLogo] = useState<string | null>(null);
  const [showLogoSettings, setShowLogoSettings] = useState(false);
  const [logoShape, setLogoShape] = useState<'circle' | 'rectangle'>('circle');
  const [logoWidth, setLogoWidth] = useState(64);
  const [logoHeight, setLogoHeight] = useState(64);
  const [horizontalPadding, setHorizontalPadding] = useState(16);
  const [verticalPadding, setVerticalPadding] = useState(16);

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
  }, []);

  return {
    storeLogo,
    logoShape,
    logoWidth,
    logoHeight,
    horizontalPadding,
    verticalPadding,
    showLogoSettings,
    handleLogoShapeChange,
    handleLogoWidthChange,
    handleLogoHeightChange: setLogoHeight,
    handleHorizontalPaddingChange: setHorizontalPadding,
    handleVerticalPaddingChange: setVerticalPadding,
    handleCloseSettings,
    handleUpdateSettings,
    handleSettingsClick,
    setStoreLogo,
    setShowLogoSettings,
  };
};

const LogoControls: React.FC<LogoControlsProps> = ({
  storeLogo,
  logoShape,
  logoWidth,
  logoHeight,
  horizontalPadding,
  verticalPadding,
  showLogoSettings,
  onStoreLogoChange,
  onLogoShapeChange,
  onLogoWidthChange,
  onLogoHeightChange,
  onHorizontalPaddingChange,
  onVerticalPaddingChange,
  onShowLogoSettingsChange,
  onCloseLogoSettings,
  onUpdateLogoSettings,
}) => {
  // This component can be used for additional logo control UI if needed
  // For now, it serves as a container for the hook and props interface
  return null;
};

export default LogoControls;
