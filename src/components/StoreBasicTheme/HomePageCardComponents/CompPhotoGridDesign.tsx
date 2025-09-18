'use client';

import React, { useState, useRef } from 'react';
import { HiPlus, HiCamera, HiCog, HiTrash, HiSelector } from 'react-icons/hi';
import { HiViewfinderCircle } from 'react-icons/hi2';
import SystemDrawer from '../../EditorControls/SystemDrawer';
import StyleTextUser from '../../EditorControls/StyleTextUser';
import '../../EditorControls/SystemControlIcons.css';
import './CompPhotoGridDesign.css';

interface PhotoItem {
  id: string;
  image: string | null;
  caption?: string;
}

interface GridSettings {
  viewType: 'grid' | 'horizontal';
  gridColumns: number;
  imageSpacing: number;
  imageWidth: number;
  imageHeight: number;
  borderRadius: number;
  showCaptions: boolean;
  maxPhotos: number;
}

interface CompPhotoGridDesignProps {
  title?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

const CompPhotoGridDesign: React.FC<CompPhotoGridDesignProps> = ({
  title = "Photo Gallery",
  backgroundColor = "#ffffff",
  borderRadius = "16px"
}) => {
  const [titleText, setTitleText] = useState(title);
  const [titleStyles, setTitleStyles] = useState({
    fontSize: 32,
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#1f2937',
    fontWeight: '700',
    textAlign: 'left' as const
  });
  const [showSettings, setShowSettings] = useState(false);
  const [photos, setPhotos] = useState<PhotoItem[]>([
    { id: '1', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80', caption: 'Photo 1' },
    { id: '2', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80', caption: 'Photo 2' },
    { id: '3', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80', caption: 'Photo 3' },
    { id: '4', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80', caption: 'Photo 4' }
  ]);
  
  const [settings, setSettings] = useState<GridSettings>({
    viewType: 'grid',
    gridColumns: 2,
    imageSpacing: 16,
    imageWidth: 457,
    imageHeight: 457,
    borderRadius: 12,
    showCaptions: true,
    maxPhotos: 12
  });

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [dragStates, setDragStates] = useState<{ [key: string]: boolean }>({});
  const [editingCaption, setEditingCaption] = useState<string | null>(null);

  const addPhoto = () => {
    if (photos.length >= settings.maxPhotos) return;
    
    const newPhoto: PhotoItem = {
      id: Date.now().toString(),
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=457&h=457&fit=crop&crop=center&auto=format&q=80',
      caption: `Photo ${photos.length + 1}`
    };
    
    setPhotos(prev => [...prev, newPhoto]);
  };

  const removePhoto = (id: string) => {
    if (photos.length <= 1) return;
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const updateSetting = (key: keyof GridSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotos(prev => prev.map(photo => 
        photo.id === id ? { ...photo, image: e.target?.result as string } : photo
      ));
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(id, file);
    }
  };

  const handleDragOver = (id: string, e: React.DragEvent) => {
    e.preventDefault();
    setDragStates(prev => ({ ...prev, [id]: true }));
  };

  const handleDragLeave = (id: string, e: React.DragEvent) => {
    e.preventDefault();
    setDragStates(prev => ({ ...prev, [id]: false }));
  };

  const handleDrop = (id: string, e: React.DragEvent) => {
    e.preventDefault();
    setDragStates(prev => ({ ...prev, [id]: false }));
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(id, file);
    }
  };

  const removeImage = (id: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === id ? { ...photo, image: null } : photo
    ));
    
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id]!.value = '';
    }
  };

  const updateCaption = (id: string, caption: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === id ? { ...photo, caption } : photo
    ));
  };


  const getGridStyles = () => {
    if (settings.viewType === 'horizontal') {
      return {
        display: 'flex',
        overflowX: 'auto' as const,
        gap: `${settings.imageSpacing}px`,
        padding: '20px',
        scrollbarWidth: 'thin' as const
      };
    } else {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${settings.gridColumns}, 1fr)`,
        gap: `${settings.imageSpacing}px`,
        padding: '20px'
      };
    }
  };

  const getPhotoStyles = () => {
    return {
      width: `${settings.imageWidth}px`,
      height: `${settings.imageHeight}px`,
      borderRadius: `${settings.borderRadius}px`,
      minWidth: settings.viewType === 'horizontal' ? `${settings.imageWidth}px` : 'auto'
    };
  };

  return (
    <div 
      className="comp-photogrid-design"
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
        className="photogrid-toolbar-tooltip"
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
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="system-control-icon settings small"
          title="Gallery settings"
        >
          <HiCog />
        </button>
        <button
          onClick={addPhoto}
          className="system-control-icon add small"
          title="Add photo"
          disabled={photos.length >= settings.maxPhotos}
        >
          <HiPlus />
        </button>
      </div>

      {/* Title Text Field */}
      <div style={{ padding: '20px 20px 0 20px' }}>
        <StyleTextUser
          value={titleText}
          onChange={setTitleText}
          styles={titleStyles}
          onStylesChange={setTitleStyles}
        />
      </div>


      {/* Photo Grid */}
      <div 
        className={`photo-gallery ${settings.viewType}`}
        style={getGridStyles()}
      >
        {photos.map((photo, index) => (
          <div 
            key={photo.id} 
            className="photo-item"
            style={getPhotoStyles()}
          >
            {/* Photo Container */}
            <div 
              className={`photo-upload-area ${dragStates[photo.id] ? 'dragging' : ''} ${photo.image ? 'has-image' : ''}`}
              onDragOver={(e) => handleDragOver(photo.id, e)}
              onDragLeave={(e) => handleDragLeave(photo.id, e)}
              onDrop={(e) => handleDrop(photo.id, e)}
              onClick={() => !photo.image && fileInputRefs.current[photo.id]?.click()}
              style={{ 
                height: '100%',
                borderRadius: `${settings.borderRadius}px`
              }}
            >
              {/* Photo Controls */}
              <div className="photo-controls">
                {photos.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(photo.id);
                    }}
                    className="remove-photo-btn"
                    title="Remove photo"
                  >
                    ✕
                  </button>
                )}
              </div>

              {photo.image ? (
                <div className="uploaded-photo-container">
                  <img 
                    src={photo.image} 
                    alt={photo.caption || `Photo ${index + 1}`} 
                    className="uploaded-photo"
                    style={{ borderRadius: `${settings.borderRadius}px` }}
                  />
                  <div className="photo-overlay">
                    <button
                      className="system-control-icon camera small"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRefs.current[photo.id]?.click();
                      }}
                      title="Change photo"
                    >
                      <HiCamera />
                    </button>
                    <button
                      className="system-control-icon delete small"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(photo.id);
                      }}
                      title="Remove photo"
                    >
                      <HiTrash />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">
                    <HiCamera />
                  </div>
                  <div className="upload-text">Upload Photo</div>
                  <div className="upload-subtext">Drag & Drop or Click</div>
                </div>
              )}
            </div>

            {/* Caption */}
            {settings.showCaptions && (
              <div className="photo-caption-container">
                {editingCaption === photo.id ? (
                  <input
                    type="text"
                    value={photo.caption || ''}
                    onChange={(e) => updateCaption(photo.id, e.target.value)}
                    onBlur={() => setEditingCaption(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setEditingCaption(null);
                      }
                    }}
                    className="caption-input"
                    autoFocus
                  />
                ) : (
                  <p 
                    className="photo-caption"
                    onClick={() => setEditingCaption(photo.id)}
                  >
                    {photo.caption || 'Click to add caption'}
                  </p>
                )}
              </div>
            )}

            {/* Hidden File Input */}
            <input
              ref={(el) => fileInputRefs.current[photo.id] = el}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(photo.id, e)}
              className="file-input"
              style={{ display: 'none' }}
            />
          </div>
        ))}

        {/* Add Photo Button in Gallery */}
        {photos.length < settings.maxPhotos && (
          <div 
            className="add-photo-slot"
            style={getPhotoStyles()}
            onClick={addPhoto}
          >
            <div className="add-photo-placeholder">
              <div className="add-icon">+</div>
              <div className="add-text">Add Photo</div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Drawer */}
      <SystemDrawer
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Gallery Settings"
        width={350}
        position="right"
        pushContent={true}
      >
        {/* View Type */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">View Type</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Layout Style</label>
            <div className="view-type-buttons">
              <button
                className={`view-type-btn ${settings.viewType === 'grid' ? 'active' : ''}`}
                onClick={() => updateSetting('viewType', 'grid')}
              >
                <HiViewfinderCircle /> Grid
              </button>
              <button
                className={`view-type-btn ${settings.viewType === 'horizontal' ? 'active' : ''}`}
                onClick={() => updateSetting('viewType', 'horizontal')}
              >
                <HiViewfinderCircle /> Horizontal
              </button>
            </div>
          </div>
        </div>

        {/* Grid Columns (only for grid view) */}
        {settings.viewType === 'grid' && (
          <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
            <h4 className="drawer-section-title">Grid Columns</h4>
            <div className="drawer-range-container">
              <div className="drawer-range-label">
                <span>Columns</span>
                <span className="drawer-range-value">{settings.gridColumns}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={settings.gridColumns}
                onChange={(e) => updateSetting('gridColumns', Number(e.target.value))}
                className="drawer-range"
              />
            </div>
          </div>
        )}

        {/* Image Width */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Image Width</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Width</span>
              <span className="drawer-range-value">{settings.imageWidth}px</span>
            </div>
            <input
              type="range"
              min="150"
              max="600"
              value={settings.imageWidth}
              onChange={(e) => updateSetting('imageWidth', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>

        {/* Image Height */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Image Height</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Height</span>
              <span className="drawer-range-value">{settings.imageHeight}px</span>
            </div>
            <input
              type="range"
              min="150"
              max="600"
              value={settings.imageHeight}
              onChange={(e) => updateSetting('imageHeight', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>

        {/* Image Spacing */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Image Spacing</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Spacing</span>
              <span className="drawer-range-value">{settings.imageSpacing}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={settings.imageSpacing}
              onChange={(e) => updateSetting('imageSpacing', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>

        {/* Border Radius */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Border Radius</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Radius</span>
              <span className="drawer-range-value">{settings.borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={settings.borderRadius}
              onChange={(e) => updateSetting('borderRadius', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>

        {/* Show Captions */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Captions</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">
              <input
                type="checkbox"
                checked={settings.showCaptions}
                onChange={(e) => updateSetting('showCaptions', e.target.checked)}
                className="drawer-checkbox"
              />
              Show photo captions
            </label>
          </div>
        </div>

        {/* Max Photos */}
        <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
          <h4 className="drawer-section-title">Maximum Photos</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Max Photos</span>
              <span className="drawer-range-value">{settings.maxPhotos}</span>
            </div>
            <input
              type="range"
              min="4"
              max="20"
              value={settings.maxPhotos}
              onChange={(e) => updateSetting('maxPhotos', Number(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>
      </SystemDrawer>
    </div>
  );
};

export default CompPhotoGridDesign;
