'use client';

import React, { useState, useRef } from 'react';
import SystemDrawer from './SystemDrawer';
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
  const [componentTitle, setComponentTitle] = useState(title);
  const [editingTitle, setEditingTitle] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [photos, setPhotos] = useState<PhotoItem[]>([
    { id: '1', image: null, caption: 'Photo 1' },
    { id: '2', image: null, caption: 'Photo 2' },
    { id: '3', image: null, caption: 'Photo 3' },
    { id: '4', image: null, caption: 'Photo 4' }
  ]);
  
  const [settings, setSettings] = useState<GridSettings>({
    viewType: 'grid',
    gridColumns: 2,
    imageSpacing: 16,
    imageHeight: 200,
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
      image: null,
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

  const handleTitleEdit = (newTitle: string) => {
    setComponentTitle(newTitle);
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
      height: `${settings.imageHeight}px`,
      borderRadius: `${settings.borderRadius}px`,
      minWidth: settings.viewType === 'horizontal' ? `${settings.imageHeight}px` : 'auto'
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
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Header Section */}
      <div className="photogrid-header">
        <div className="title-container">
          {editingTitle ? (
            <input
              type="text"
              value={componentTitle}
              onChange={(e) => handleTitleEdit(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditingTitle(false);
                }
              }}
              className="title-input"
              autoFocus
            />
          ) : (
            <h2 
              className="photogrid-title"
              onClick={() => setEditingTitle(true)}
            >
              {componentTitle}
            </h2>
          )}
          <button
            className="edit-btn title-edit-btn"
            onClick={() => setEditingTitle(true)}
            title="Edit title"
          >
            ✏️
          </button>
        </div>

        {/* Gallery Controls */}
        <div className="photogrid-controls">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="settings-btn"
            title="Gallery settings"
          >
            ⚙️ Settings
          </button>
          <button
            onClick={addPhoto}
            className="add-photo-btn"
            title="Add photo"
            disabled={photos.length >= settings.maxPhotos}
          >
            📷 Add Photo
          </button>
          <span className="photo-count">
            {photos.length}/{settings.maxPhotos}
          </span>
        </div>
      </div>

      {/* View Type Selector */}
      <div className="view-selector">
        <button
          onClick={() => updateSetting('viewType', 'grid')}
          className={`view-btn ${settings.viewType === 'grid' ? 'active' : ''}`}
        >
          🔲 Grid View
        </button>
        <button
          onClick={() => updateSetting('viewType', 'horizontal')}
          className={`view-btn ${settings.viewType === 'horizontal' ? 'active' : ''}`}
        >
          ↔️ Horizontal Scroll
        </button>
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
                <span className="photo-number">{index + 1}</span>
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
                      className="change-photo-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRefs.current[photo.id]?.click();
                      }}
                      title="Change photo"
                    >
                      📷 Change
                    </button>
                    <button
                      className="remove-image-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(photo.id);
                      }}
                      title="Remove photo"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📷</div>
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
                🔲 Grid
              </button>
              <button
                className={`view-type-btn ${settings.viewType === 'horizontal' ? 'active' : ''}`}
                onClick={() => updateSetting('viewType', 'horizontal')}
              >
                ↔️ Horizontal
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
              max="400"
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
