'use client';

import React, { useState, useRef, useEffect } from 'react';
import SystemDrawer from './SystemDrawer';
import './CompSlidingBannerComp.css';

interface BannerImage {
  id: string;
  image: string | null;
  link?: string;
  linkType: 'product' | 'collection' | 'page' | 'external';
  linkTarget?: string;
  title?: string;
}

interface BannerSettings {
  height: number;
  width: number;
  borderRadius: number;
  autoSlide: boolean;
  slideInterval: number;
  showDots: boolean;
  showArrows: boolean;
}

interface CompSlidingBannerCompProps {
  title?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

const CompSlidingBannerComp: React.FC<CompSlidingBannerCompProps> = ({
  title = "Sliding Banner",
  backgroundColor = "#ffffff",
  borderRadius = "16px"
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showLinkDrawer, setShowLinkDrawer] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  
  const [settings, setSettings] = useState<BannerSettings>({
    height: 400,
    width: 800,
    borderRadius: 12,
    autoSlide: true,
    slideInterval: 5,
    showDots: true,
    showArrows: true
  });

  const [bannerImages, setBannerImages] = useState<BannerImage[]>([
    {
      id: '1',
      image: null,
      linkType: 'product',
      title: 'Banner 1'
    }
  ]);

  const [linkData, setLinkData] = useState({
    linkType: 'product' as 'product' | 'collection' | 'page' | 'external',
    linkTarget: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (settings.autoSlide && isAutoSliding && bannerImages.some(img => img.image)) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % bannerImages.length);
      }, settings.slideInterval * 1000);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [settings.autoSlide, settings.slideInterval, isAutoSliding, bannerImages.length]);

  const updateSetting = (key: keyof BannerSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (imageId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBannerImages(prev => prev.map(img => 
        img.id === imageId ? { ...img, image: e.target?.result as string } : img
      ));
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingImageId) {
      handleImageUpload(editingImageId, file);
      setEditingImageId(null);
    }
  };

  const addNewBanner = () => {
    const newId = (bannerImages.length + 1).toString();
    const newBanner: BannerImage = {
      id: newId,
      image: null,
      linkType: 'product',
      title: `Banner ${newId}`
    };
    
    setBannerImages(prev => [...prev, newBanner]);
    setEditingImageId(newId);
    
    // Trigger file input
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 100);
  };

  const editCurrentImage = () => {
    const currentBanner = bannerImages[currentSlide];
    setEditingImageId(currentBanner.id);
    fileInputRef.current?.click();
  };

  const openLinkEditor = () => {
    const currentBanner = bannerImages[currentSlide];
    setLinkData({
      linkType: currentBanner.linkType,
      linkTarget: currentBanner.linkTarget || ''
    });
    setShowLinkDrawer(true);
  };

  const saveLinkData = () => {
    setBannerImages(prev => prev.map(img => 
      img.id === bannerImages[currentSlide].id 
        ? { ...img, linkType: linkData.linkType, linkTarget: linkData.linkTarget }
        : img
    ));
    setShowLinkDrawer(false);
  };

  const deleteBanner = (imageId: string) => {
    if (bannerImages.length <= 1) return;
    
    setBannerImages(prev => prev.filter(img => img.id !== imageId));
    
    // Adjust current slide if necessary
    if (currentSlide >= bannerImages.length - 1) {
      setCurrentSlide(Math.max(0, bannerImages.length - 2));
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoSliding(false);
    // Resume auto-slide after 5 seconds
    setTimeout(() => {
      if (settings.autoSlide) {
        setIsAutoSliding(true);
      }
    }, 5000);
  };

  const goToPrevious = () => {
    setCurrentSlide(prev => prev === 0 ? bannerImages.length - 1 : prev - 1);
    setIsAutoSliding(false);
    setTimeout(() => {
      if (settings.autoSlide) {
        setIsAutoSliding(true);
      }
    }, 5000);
  };

  const goToNext = () => {
    setCurrentSlide(prev => (prev + 1) % bannerImages.length);
    setIsAutoSliding(false);
    setTimeout(() => {
      if (settings.autoSlide) {
        setIsAutoSliding(true);
      }
    }, 5000);
  };

  const handleBannerClick = () => {
    const currentBanner = bannerImages[currentSlide];
    if (currentBanner.linkTarget) {
      // In a real app, this would handle navigation
      console.log(`Navigate to: ${currentBanner.linkType} - ${currentBanner.linkTarget}`);
    }
  };

  const getBannerStyles = () => {
    return {
      width: `${settings.width}px`,
      height: `${settings.height}px`,
      borderRadius: `${settings.borderRadius}px`,
      maxWidth: '100%'
    };
  };

  const getSlideStyles = () => {
    return {
      transform: `translateX(-${currentSlide * 100}%)`,
      transition: 'transform 0.5s ease-in-out'
    };
  };

  return (
    <div 
      className="comp-sliding-banner"
      style={{ 
        backgroundColor,
        borderRadius,
        border: '1px solid #e5e7eb',
        margin: '20px 0',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Header Section */}
      <div className="banner-header">
        <div className="header-content">
          <h2 className="banner-title">{title}</h2>
          
          {/* Toolbar */}
          <div className="banner-toolbar">
            <button
              onClick={addNewBanner}
              className="toolbar-btn add-btn"
              title="Add new banner"
            >
              ➕
            </button>
            <button
              onClick={editCurrentImage}
              className="toolbar-btn camera-btn"
              title="Edit current image"
              disabled={!bannerImages[currentSlide]?.image}
            >
              📷
            </button>
            <button
              onClick={openLinkEditor}
              className="toolbar-btn link-btn"
              title="Add/edit link"
              disabled={!bannerImages[currentSlide]?.image}
            >
              🔗
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="toolbar-btn dimensions-btn"
              title="Dimensions & settings"
            >
              📐
            </button>
            {bannerImages.length > 1 && (
              <button
                onClick={() => deleteBanner(bannerImages[currentSlide].id)}
                className="toolbar-btn delete-btn"
                title="Delete current banner"
              >
                🗑️
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Banner Container */}
      <div className="banner-container" style={getBannerStyles()}>
        <div 
          className="banner-wrapper"
          style={getSlideStyles()}
        >
          {bannerImages.map((banner, index) => (
            <div 
              key={banner.id} 
              className="banner-slide"
              style={{ 
                minWidth: '100%',
                height: '100%'
              }}
            >
              {banner.image ? (
                <div 
                  className="banner-image-container"
                  onClick={handleBannerClick}
                  style={{ cursor: banner.linkTarget ? 'pointer' : 'default' }}
                >
                  <img 
                    src={banner.image} 
                    alt={banner.title || `Banner ${index + 1}`} 
                    className="banner-image"
                  />
                  
                  {/* Link Indicator */}
                  {banner.linkTarget && (
                    <div className="link-indicator">
                      <span className="link-icon">🔗</span>
                      <span className="link-text">{banner.linkType}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div 
                  className="banner-upload-area"
                  onClick={() => {
                    setEditingImageId(banner.id);
                    fileInputRef.current?.click();
                  }}
                >
                  <div className="upload-placeholder">
                    <div className="upload-icon">📷</div>
                    <div className="upload-text">Press camera icon to upload image</div>
                    <div className="upload-subtext">Banner {index + 1}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {settings.showArrows && bannerImages.some(img => img.image) && bannerImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="nav-arrow nav-arrow-left"
              title="Previous banner"
            >
              ❮
            </button>
            <button
              onClick={goToNext}
              className="nav-arrow nav-arrow-right"
              title="Next banner"
            >
              ❯
            </button>
          </>
        )}

        {/* Slide Indicators (Dots) */}
        {settings.showDots && bannerImages.some(img => img.image) && bannerImages.length > 1 && (
          <div className="slide-indicators">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
                title={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Banner Management */}
      <div className="banner-management">
        <div className="banner-info">
          <span className="current-banner">Banner {currentSlide + 1} of {bannerImages.length}</span>
          {bannerImages[currentSlide]?.linkTarget && (
            <span className="link-info">
              Links to: {bannerImages[currentSlide].linkType} ({bannerImages[currentSlide].linkTarget})
            </span>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="file-input"
        style={{ display: 'none' }}
      />

      {/* Settings Drawer */}
      <SystemDrawer
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Banner Settings"
        width={350}
        position="right"
        pushContent={true}
      >
        {/* Dimensions */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Dimensions</h4>
          
          {/* Height */}
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Height</span>
              <span className="drawer-range-value">{settings.height}px</span>
            </div>
            <input
              type="range"
              min="200"
              max="600"
              value={settings.height}
              onChange={(e) => updateSetting('height', Number(e.target.value))}
              className="drawer-range"
            />
          </div>

          {/* Width */}
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Width</span>
              <span className="drawer-range-value">{settings.width}px</span>
            </div>
            <input
              type="range"
              min="300"
              max="1200"
              value={settings.width}
              onChange={(e) => updateSetting('width', Number(e.target.value))}
              className="drawer-range"
            />
          </div>

          {/* Border Radius */}
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Border Radius</span>
              <span className="drawer-range-value">{settings.borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={settings.borderRadius}
              onChange={(e) => updateSetting('borderRadius', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>

        {/* Auto Slide */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Auto Slide</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">
              <input
                type="checkbox"
                checked={settings.autoSlide}
                onChange={(e) => updateSetting('autoSlide', e.target.checked)}
                className="drawer-checkbox"
              />
              Enable auto-slide
            </label>
          </div>
          
          {settings.autoSlide && (
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Slide Interval</span>
                <span className="drawer-range-value">{settings.slideInterval}s</span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                value={settings.slideInterval}
                onChange={(e) => updateSetting('slideInterval', Number(e.target.value))}
                className="drawer-range"
              />
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Navigation</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">
              <input
                type="checkbox"
                checked={settings.showDots}
                onChange={(e) => updateSetting('showDots', e.target.checked)}
                className="drawer-checkbox"
              />
              Show slide dots
            </label>
          </div>
          <div className="drawer-form-group">
            <label className="drawer-form-label">
              <input
                type="checkbox"
                checked={settings.showArrows}
                onChange={(e) => updateSetting('showArrows', e.target.checked)}
                className="drawer-checkbox"
              />
              Show navigation arrows
            </label>
          </div>
        </div>
      </SystemDrawer>

      {/* Link Editor Drawer */}
      <SystemDrawer
        isOpen={showLinkDrawer}
        onClose={() => setShowLinkDrawer(false)}
        title="Add Link to Banner"
        width={350}
        position="right"
        pushContent={true}
      >
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Link Type</h4>
          <div className="drawer-form-group">
            <select
              value={linkData.linkType}
              onChange={(e) => setLinkData(prev => ({ ...prev, linkType: e.target.value as any }))}
              className="drawer-select"
            >
              <option value="product">Product Page</option>
              <option value="collection">Collection Page</option>
              <option value="page">Custom Page</option>
              <option value="external">External URL</option>
            </select>
          </div>
        </div>

        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Link Target</h4>
          <div className="drawer-form-group">
            <input
              type="text"
              value={linkData.linkTarget}
              onChange={(e) => setLinkData(prev => ({ ...prev, linkTarget: e.target.value }))}
              placeholder={
                linkData.linkType === 'product' ? 'Product ID or slug' :
                linkData.linkType === 'collection' ? 'Collection ID or slug' :
                linkData.linkType === 'page' ? 'Page path' :
                'Full URL'
              }
              className="drawer-input"
            />
          </div>
        </div>

        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-form-group">
            <button
              onClick={saveLinkData}
              className="save-link-btn"
            >
              Save Link
            </button>
            <button
              onClick={() => {
                setLinkData({ linkType: 'product', linkTarget: '' });
                setBannerImages(prev => prev.map(img => 
                  img.id === bannerImages[currentSlide].id 
                    ? { ...img, linkTarget: '', linkType: 'product' }
                    : img
                ));
                setShowLinkDrawer(false);
              }}
              className="remove-link-btn"
            >
              Remove Link
            </button>
          </div>
        </div>
      </SystemDrawer>
    </div>
  );
};

export default CompSlidingBannerComp;
