'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HiPlus, HiCamera, HiCog, HiTrash, HiLink, HiSelector } from 'react-icons/hi';
import { HiViewfinderCircle } from 'react-icons/hi2';
import SystemDrawer from '../../EditorControls/PropertiesManagement/SystemDrawer';
import CreateLink, { LinkData } from '../../EditorControls/PropertiesManagement/CreateLink';
import './CompSlidingBannerComp.css';
import '../../EditorControls/PropertiesManagement/SystemControlIcons.css';

interface BannerImage {
  id: string;
  image: string | null;
  link?: string;
  linkType: 'collection' | 'catalog' | 'page' | 'external';
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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [settings, setSettings] = useState<BannerSettings>({
    height: 600,
    width: 100, // Set to full width (100% of screen width)
    borderRadius: 12,
    autoSlide: true,
    slideInterval: 5,
    showDots: true,
    showArrows: true
  });

  const [bannerImages, setBannerImages] = useState<BannerImage[]>([
    {
      id: '1',
      image: null, // No default image
      linkType: 'collection',
      title: 'Banner 1'
    }
  ]);

  const [linkData, setLinkData] = useState<LinkData>({
    linkType: 'collection',
    linkTarget: ''
  });

  // Mock data for available pages
  const availablePages = {
    collection: [
      { id: '1', name: 'Summer Collection', slug: 'summer-collection' },
      { id: '2', name: 'Winter Collection', slug: 'winter-collection' },
      { id: '3', name: 'Spring Collection', slug: 'spring-collection' },
      { id: '4', name: 'Fall Collection', slug: 'fall-collection' }
    ],
    catalog: [
      { id: '1', name: 'Electronics Catalog', slug: 'electronics' },
      { id: '2', name: 'Fashion Catalog', slug: 'fashion' },
      { id: '3', name: 'Home & Garden Catalog', slug: 'home-garden' },
      { id: '4', name: 'Sports Catalog', slug: 'sports' }
    ],
    page: [
      { id: '1', name: 'About Us', slug: 'about' },
      { id: '2', name: 'Contact Page', slug: 'contact' },
      { id: '3', name: 'Privacy Policy', slug: 'privacy' },
      { id: '4', name: 'Terms of Service', slug: 'terms' },
      { id: '5', name: 'FAQ Page', slug: 'faq' }
    ]
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (settings.autoSlide && isAutoSliding && bannerImages.some(img => img.image) && !editingImageId) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % bannerImages.length);
      }, settings.slideInterval * 1000);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [settings.autoSlide, settings.slideInterval, isAutoSliding, bannerImages.length, editingImageId]);

  // Handle file dialog cancellation
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editingImageId && fileInputRef.current && !fileInputRef.current.contains(e.target as Node)) {
        // Check if the file input dialog was cancelled
        setTimeout(() => {
          if (editingImageId && !fileInputRef.current?.files?.length) {
            setEditingImageId(null);
          }
        }, 100);
      }
    };

    if (editingImageId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [editingImageId]);

  const updateSetting = (key: keyof BannerSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (imageId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBannerImages(prev => prev.map(img => 
        img.id === imageId ? { ...img, image: e.target?.result as string } : img
      ));
      
      // Slide to the newly added image
      const newImageIndex = bannerImages.findIndex(banner => banner.id === imageId);
      if (newImageIndex !== -1) {
        setCurrentSlide(newImageIndex);
      }
      
      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); // Hide after 3 seconds
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingImageId) {
      handleImageUpload(editingImageId, file);
      setEditingImageId(null);
    }
    // Clear the input value so the same file can be selected again
    e.target.value = '';
  };

  const addNewBanner = () => {
    const newId = (bannerImages.length + 1).toString();
    const newBanner: BannerImage = {
      id: newId,
      image: null,
      linkType: 'collection',
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

  const cancelEditing = () => {
    setEditingImageId(null);
  };

  const openLinkEditor = () => {
    const currentBanner = bannerImages[currentSlide];
    setLinkData({
      linkType: currentBanner.linkType,
      linkTarget: currentBanner.linkTarget || ''
    });
    setShowLinkDrawer(true);
  };

  const saveLinkData = (linkData: LinkData) => {
    setBannerImages(prev => prev.map(img => 
      img.id === bannerImages[currentSlide].id 
        ? { ...img, linkType: linkData.linkType, linkTarget: linkData.linkTarget }
        : img
    ));
  };

  const removeLinkData = () => {
    setBannerImages(prev => prev.map(img => 
      img.id === bannerImages[currentSlide].id 
        ? { ...img, linkTarget: '', linkType: 'collection' }
        : img
    ));
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
      let targetUrl = '';
      
      switch (currentBanner.linkType) {
        case 'collection':
          targetUrl = `/collection/${currentBanner.linkTarget}`;
          break;
        case 'catalog':
          targetUrl = `/catalog/${currentBanner.linkTarget}`;
          break;
        case 'page':
          targetUrl = `/custom-page/${currentBanner.linkTarget}`;
          break;
        case 'external':
          targetUrl = currentBanner.linkTarget;
          // Open external links in new tab
          window.open(targetUrl, '_blank');
          return;
        default:
          console.log(`Unknown link type: ${currentBanner.linkType}`);
          return;
      }
      
      // Navigate to internal pages
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    }
  };

  const getBannerStyles = () => {
    return {
      width: `${settings.width}%`,
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
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}
    >
      {/* Success Message */}
      {showSuccessMessage && (
        <div 
          className="success-message"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            animation: 'slideInRight 0.3s ease-out'
          }}
        >
          ✅ Image added successfully!
        </div>
      )}
      {/* Drag Handle - Top Left */}
      <button
        className="system-control-icon drag small"
        title="Drag to reorder"
        style={{ 
          cursor: 'grab',
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 10
        }}
      >
        <HiSelector />
      </button>

      {/* Toolbar Controls - Top Center */}
      <div 
        className="banner-toolbar-tooltip"
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '8px',
          backgroundColor: '#2c3e50',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {!bannerImages.some(banner => !banner.image) && (
          <button
            onClick={addNewBanner}
            className="system-control-icon-rectangle add small"
            title="Add new banner"
          >
            <div className="icon-text-container">
              <HiPlus />
              <span className="icon-text">New image</span>
            </div>
          </button>
        )}
        <button
          onClick={editCurrentImage}
          className="system-control-icon-rectangle camera small"
          title="Edit current image"
          disabled={!bannerImages[currentSlide]?.image}
        >
          <div className="icon-text-container">
            <HiCamera />
            <span className="icon-text">Edit image</span>
          </div>
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="system-control-icon-rectangle settings small"
          title="Dimensions & settings"
        >
          <div className="icon-text-container">
            <HiCog />
            <span className="icon-text">Settings</span>
          </div>
        </button>
        {bannerImages.length > 1 && (
          <button
            onClick={() => deleteBanner(bannerImages[currentSlide].id)}
            className="system-control-icon-rectangle delete small"
            title="Delete current banner"
          >
            <div className="icon-text-container">
              <HiTrash />
              <span className="icon-text">Remove</span>
            </div>
          </button>
        )}
        <button
          onClick={openLinkEditor}
          className="system-control-icon-rectangle link small"
          title="Add/edit link"
          disabled={!bannerImages[currentSlide]?.image}
        >
          <div className="icon-text-container">
            <HiLink />
            <span className="icon-text">Create link</span>
          </div>
        </button>
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
                    <div className="upload-icon">
                      <HiCamera />
                    </div>
                    <div className="upload-text">Click to Add your first Photo</div>
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
              max="1200"
              value={settings.height}
              onChange={(e) => updateSetting('height', Number(e.target.value))}
              className="drawer-range"
            />
          </div>

          {/* Width */}
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Width</span>
              <span className="drawer-range-value">{settings.width}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
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
      <CreateLink
        isOpen={showLinkDrawer}
        onClose={() => setShowLinkDrawer(false)}
        title="Add Link to Banner"
        initialLinkData={linkData}
        onSave={saveLinkData}
        onRemove={removeLinkData}
        availablePages={availablePages}
        width={350}
        position="right"
        pushContent={true}
      />
    </div>
  );
};

export default CompSlidingBannerComp;
