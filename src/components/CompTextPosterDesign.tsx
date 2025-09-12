'use client';

import React, { useState } from 'react';
import './CompTextPosterDesign.css';

interface CompTextPosterDesignProps {
  mainText?: string;
  subText?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  backgroundImage?: string;
  textAlignment?: 'left' | 'center' | 'right';
  posterStyle?: 'modern' | 'classic' | 'bold' | 'minimal';
}

const CompTextPosterDesign: React.FC<CompTextPosterDesignProps> = ({
  mainText = "Your Main Message",
  subText = "Supporting text or call to action",
  backgroundColor = "#1f2937",
  textColor = "#ffffff",
  accentColor = "#3b82f6",
  backgroundImage,
  textAlignment = "center",
  posterStyle = "modern"
}) => {
  const [currentMainText, setCurrentMainText] = useState(mainText);
  const [currentSubText, setCurrentSubText] = useState(subText);
  const [currentBgColor, setCurrentBgColor] = useState(backgroundColor);
  const [currentTextColor, setCurrentTextColor] = useState(textColor);
  const [currentAccentColor, setCurrentAccentColor] = useState(accentColor);
  const [currentAlignment, setCurrentAlignment] = useState(textAlignment);
  const [currentStyle, setCurrentStyle] = useState(posterStyle);
  const [currentBgImage, setCurrentBgImage] = useState(backgroundImage || '');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(false);

  const posterStyles = {
    modern: {
      background: currentBgImage 
        ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${currentBgImage})`
        : `linear-gradient(135deg, ${currentBgColor} 0%, ${currentAccentColor} 100%)`,
      borderRadius: '24px',
      padding: '60px 40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
    },
    classic: {
      background: currentBgImage 
        ? `url(${currentBgImage})`
        : currentBgColor,
      borderRadius: '8px',
      padding: '50px 30px',
      border: `4px solid ${currentAccentColor}`,
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    },
    bold: {
      background: currentBgImage 
        ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${currentBgImage})`
        : `linear-gradient(45deg, ${currentBgColor} 0%, ${currentAccentColor} 50%, ${currentBgColor} 100%)`,
      borderRadius: '16px',
      padding: '70px 50px',
      boxShadow: `0 0 50px ${currentAccentColor}40`,
      border: `2px solid ${currentAccentColor}`
    },
    minimal: {
      background: currentBgImage 
        ? `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${currentBgImage})`
        : '#ffffff',
      borderRadius: '12px',
      padding: '40px 30px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    }
  };

  const getTextStyles = () => {
    const baseColor = currentStyle === 'minimal' ? '#1f2937' : currentTextColor;
    
    return {
      mainText: {
        fontSize: currentStyle === 'bold' ? '48px' : '36px',
        fontWeight: currentStyle === 'bold' ? '900' : '700',
        color: baseColor,
        textAlign: currentAlignment as any,
        marginBottom: '20px',
        lineHeight: '1.2',
        textShadow: currentStyle === 'bold' ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none'
      },
      subText: {
        fontSize: currentStyle === 'bold' ? '20px' : '18px',
        fontWeight: '500',
        color: currentStyle === 'minimal' ? '#6b7280' : `${baseColor}CC`,
        textAlign: currentAlignment as any,
        lineHeight: '1.5',
        textShadow: currentStyle === 'bold' ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
      }
    };
  };

  const handleEdit = (field: string, value: string) => {
    switch (field) {
      case 'mainText':
        setCurrentMainText(value);
        break;
      case 'subText':
        setCurrentSubText(value);
        break;
      case 'bgColor':
        setCurrentBgColor(value);
        break;
      case 'textColor':
        setCurrentTextColor(value);
        break;
      case 'accentColor':
        setCurrentAccentColor(value);
        break;
      case 'bgImage':
        setCurrentBgImage(value);
        break;
    }
  };

  const textStyles = getTextStyles();

  return (
    <div className="comp-textposter-design">
      {/* Controls Panel */}
      <div className={`poster-controls ${showControls ? 'visible' : ''}`}>
        <div className="controls-header">
          <h4>Poster Controls</h4>
          <button 
            className="close-controls"
            onClick={() => setShowControls(false)}
          >
            ✕
          </button>
        </div>
        
        <div className="controls-grid">
          <div className="control-group">
            <label>Style</label>
            <select 
              value={currentStyle} 
              onChange={(e) => setCurrentStyle(e.target.value as any)}
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="bold">Bold</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          <div className="control-group">
            <label>Alignment</label>
            <select 
              value={currentAlignment} 
              onChange={(e) => setCurrentAlignment(e.target.value as any)}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div className="control-group">
            <label>Background Color</label>
            <input 
              type="color" 
              value={currentBgColor}
              onChange={(e) => handleEdit('bgColor', e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>Text Color</label>
            <input 
              type="color" 
              value={currentTextColor}
              onChange={(e) => handleEdit('textColor', e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>Accent Color</label>
            <input 
              type="color" 
              value={currentAccentColor}
              onChange={(e) => handleEdit('accentColor', e.target.value)}
            />
          </div>

          <div className="control-group full-width">
            <label>Background Image URL</label>
            <input 
              type="url" 
              placeholder="https://example.com/image.jpg"
              value={currentBgImage}
              onChange={(e) => handleEdit('bgImage', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Poster Display */}
      <div 
        className={`text-poster ${currentStyle}`}
        style={{
          ...posterStyles[currentStyle],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Control Button */}
        <button 
          className="show-controls-btn"
          onClick={() => setShowControls(true)}
          title="Customize poster"
        >
          ⚙️
        </button>

        {/* Main Text */}
        <div className="poster-text-container">
          {editingField === 'mainText' ? (
            <input
              type="text"
              value={currentMainText}
              onChange={(e) => handleEdit('mainText', e.target.value)}
              onBlur={() => setEditingField(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditingField(null);
                }
              }}
              style={textStyles.mainText}
              className="text-input main-text-input"
              autoFocus
            />
          ) : (
            <h1 
              style={textStyles.mainText}
              onClick={() => setEditingField('mainText')}
              className="poster-main-text editable"
            >
              {currentMainText}
            </h1>
          )}

          {/* Edit Button for Main Text */}
          <button
            className="edit-text-btn main-edit"
            onClick={() => setEditingField('mainText')}
            title="Edit main text"
          >
            ✏️
          </button>
        </div>

        {/* Sub Text */}
        <div className="poster-subtext-container">
          {editingField === 'subText' ? (
            <textarea
              value={currentSubText}
              onChange={(e) => handleEdit('subText', e.target.value)}
              onBlur={() => setEditingField(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  setEditingField(null);
                }
              }}
              style={textStyles.subText}
              className="text-input sub-text-input"
              rows={3}
              autoFocus
            />
          ) : (
            <p 
              style={textStyles.subText}
              onClick={() => setEditingField('subText')}
              className="poster-sub-text editable"
            >
              {currentSubText}
            </p>
          )}

          {/* Edit Button for Sub Text */}
          <button
            className="edit-text-btn sub-edit"
            onClick={() => setEditingField('subText')}
            title="Edit sub text"
          >
            ✏️
          </button>
        </div>

        {/* Accent Elements */}
        {currentStyle === 'modern' && (
          <div className="accent-elements">
            <div 
              className="accent-dot"
              style={{ backgroundColor: currentAccentColor }}
            ></div>
            <div 
              className="accent-line"
              style={{ backgroundColor: currentAccentColor }}
            ></div>
          </div>
        )}

        {currentStyle === 'bold' && (
          <div className="bold-elements">
            <div 
              className="bold-stripe"
              style={{ backgroundColor: currentAccentColor }}
            ></div>
          </div>
        )}
      </div>

    </div>
  );
};

export default CompTextPosterDesign;
