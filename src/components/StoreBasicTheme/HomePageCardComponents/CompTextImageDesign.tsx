'use client';

import React, { useState, useRef } from 'react';
import { HiCamera, HiTrash, HiPencil, HiPhotograph, HiSelector, HiRefresh } from 'react-icons/hi';
import StyleTextUser from '../../EditorControls/PropertiesManagement/StyleTextUser';
import '../../EditorControls/PropertiesManagement/SystemControlIcons.css';
import '../../../app/system-control-assets/SystemControlAssets.css';
import './CompTextImageDesign.css';

interface TextImageRow {
  id: string;
  text: string;
  textStyles: {
    fontSize: number;
    fontFamily: string;
    color: string;
    fontWeight: string;
    bottomSpacing: number;
    textAlign: string;
  };
  image: string | null;
  layout: 'image-left' | 'image-right';
}

interface CompTextImageDesignProps {
  title?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

const CompTextImageDesign: React.FC<CompTextImageDesignProps> = ({
  title = "Content Showcase",
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
  const [rows, setRows] = useState<TextImageRow[]>([
    {
      id: '1',
      text: 'Your main heading goes here',
      textStyles: {
        fontSize: 24,
        fontFamily: 'Inter, sans-serif',
        color: '#1f2937',
        fontWeight: '600',
        bottomSpacing: 16,
        textAlign: 'left'
      },
      image: null,
      layout: 'image-left'
    }
  ]);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [dragStates, setDragStates] = useState<{ [key: string]: boolean }>({});

  const addNewRow = () => {
    const newRow: TextImageRow = {
      id: Date.now().toString(),
      text: 'Add your content here',
      textStyles: {
        fontSize: 18,
        fontFamily: 'Inter, sans-serif',
        color: '#374151',
        fontWeight: '400',
        bottomSpacing: 16,
        textAlign: 'left'
      },
      image: null,
      layout: 'image-left'
    };
    
    setRows(prev => [...prev, newRow]);
  };

  const removeRow = (id: string) => {
    if (rows.length <= 1) return;
    setRows(prev => prev.filter(row => row.id !== id));
  };

  const updateRowText = (id: string, text: string) => {
    setRows(prev => prev.map(row => 
      row.id === id ? { ...row, text } : row
    ));
  };

  const updateRowTextStyles = (id: string, textStyles: any) => {
    setRows(prev => prev.map(row => 
      row.id === id ? { ...row, textStyles } : row
    ));
  };

  const toggleRowLayout = (id: string) => {
    setRows(prev => prev.map(row => 
      row.id === id 
        ? { ...row, layout: row.layout === 'image-left' ? 'image-right' : 'image-left' }
        : row
    ));
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setRows(prev => prev.map(row => 
        row.id === id ? { ...row, image: e.target?.result as string } : row
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
    setRows(prev => prev.map(row => 
      row.id === id ? { ...row, image: null } : row
    ));
    
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id]!.value = '';
    }
  };


  return (
    <div 
      className="comp-textimage-design"
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

      {/* Title Text Field */}
      <div style={{ padding: '20px 20px 0 20px' }}>
        <StyleTextUser
          value={titleText}
          onChange={setTitleText}
          styles={titleStyles}
          onStylesChange={setTitleStyles}
        />
      </div>

      {/* Add Row Button */}
      <div className="textimage-controls" style={{ padding: '10px 20px' }}>
          <button
            onClick={addNewRow}
            className="add-row-btn"
            title="Add new row"
          >
            + Add Row
          </button>
          <span className="row-count">
            {rows.length} row{rows.length !== 1 ? 's' : ''}
          </span>
        </div>

      {/* Content Rows */}
      <div className="textimage-content">
        {rows.map((row, index) => (
          <div key={row.id} className={`textimage-row ${row.layout}`}>
            {/* Row Controls */}
            <div className="row-controls">
              <button
                onClick={() => toggleRowLayout(row.id)}
                className="system-control-icon flip small"
                title="Flip layout"
              >
                <HiRefresh />
              </button>
              {rows.length > 1 && (
                <button
                  onClick={() => removeRow(row.id)}
                  className="remove-row-btn"
                  title="Remove row"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Image Section */}
            <div className="image-section">
              <div 
                className={`image-upload-area ${dragStates[row.id] ? 'dragging' : ''} ${row.image ? 'has-image' : ''}`}
                onDragOver={(e) => handleDragOver(row.id, e)}
                onDragLeave={(e) => handleDragLeave(row.id, e)}
                onDrop={(e) => handleDrop(row.id, e)}
                onClick={() => !row.image && fileInputRefs.current[row.id]?.click()}
              >
                {row.image ? (
                  <div className="uploaded-image-container">
                    <img 
                      src={row.image} 
                      alt={`Row ${index + 1} content`} 
                      className="uploaded-image"
                    />
                    <div className="image-overlay">
                      <button
                        className="system-control-icon camera small"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRefs.current[row.id]?.click();
                        }}
                        title="Change image"
                      >
                        <HiCamera />
                      </button>
                      <button
                        className="system-control-icon delete small"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(row.id);
                        }}
                        title="Remove image"
                      >
                        <HiTrash />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">
                      <HiPhotograph />
                    </div>
                    <div className="upload-text">
                      <strong>Click to upload</strong> or drag and drop
                    </div>
                    <div className="upload-subtext">
                      PNG, JPG, GIF up to 10MB
                    </div>
                  </div>
                )}
              </div>
              
              <input
                ref={(el) => fileInputRefs.current[row.id] = el}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(row.id, e)}
                className="file-input"
                style={{ display: 'none' }}
              />
            </div>

            {/* Text Section */}
            <div className="text-section">
              <StyleTextUser
                value={row.text}
                onChange={(text) => updateRowText(row.id, text)}
                styles={row.textStyles}
                onStylesChange={(styles) => updateRowTextStyles(row.id, styles)}
                placeholder="Click to add your text..."
                className="textimage-style-text"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Row Footer */}
      <div className="textimage-footer">
        <button
          onClick={addNewRow}
          className="add-row-footer-btn"
          title="Add another row"
        >
          <span className="plus-icon">+</span>
          Add Another Row
        </button>
      </div>
    </div>
  );
};

export default CompTextImageDesign;