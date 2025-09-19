'use client';

import React, { useState } from 'react';
import { HiPencil, HiTrash, HiPlus, HiLightBulb, HiX } from 'react-icons/hi';
import StyleTextUser from '../../EditorControls/PropertiesManagement/StyleTextUser';
import '../../EditorControls/PropertiesManagement/SystemControlIcons.css';
import '../../../app/system-control-assets/SystemControlAssets.css';
import './CompMultiColumnDesign.css';

interface ColumnData {
  id: string;
  header: string;
  description: string;
}

interface CompMultiColumnDesignProps {
  title?: string;
  columns?: ColumnData[];
  backgroundColor?: string;
  textColor?: string;
  headerColor?: string;
  maxColumns?: number;
}

const CompMultiColumnDesign: React.FC<CompMultiColumnDesignProps> = ({
  title = "Multi Column title",
  columns: initialColumns,
  backgroundColor = "#ffffff",
  textColor = "#374151",
  headerColor = "#1f2937",
  maxColumns = 4
}) => {
  const defaultColumns: ColumnData[] = [
    {
      id: '1',
      header: 'Column Header',
      description: 'column description'
    },
    {
      id: '2',
      header: 'Column Header',
      description: 'column description'
    },
    {
      id: '3',
      header: 'Column Header',
      description: 'column description'
    }
  ];

  // Title text and styles state
  const [titleText, setTitleText] = useState(title);
  const [titleStyles, setTitleStyles] = useState({
    fontSize: 32,
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#1f2937',
    fontWeight: '700',
    textAlign: 'left' as const
  });
  
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns || defaultColumns);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleColumnUpdate = (id: string, field: 'header' | 'description', value: string) => {
    setColumns(prev => prev.map(col => 
      col.id === id ? { ...col, [field]: value } : col
    ));
  };

  const addColumn = () => {
    if (columns.length >= maxColumns) return;
    
    const newColumn: ColumnData = {
      id: Date.now().toString(),
      header: 'New Column Header',
      description: 'New column description'
    };
    
    setColumns(prev => [...prev, newColumn]);
  };

  const removeColumn = (id: string) => {
    if (columns.length <= 1) return;
    setColumns(prev => prev.filter(col => col.id !== id));
  };

  const handleEditStart = (id: string) => {
    setEditingId(id);
  };

  const handleEditEnd = () => {
    setEditingId(null);
  };

  return (
    <div 
      className="comp-multicolumn-design"
      style={{ 
        backgroundColor,
        color: textColor,
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        margin: '20px 0',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}
    >
      {/* Add Column Tooltip - Top Center */}
      {columns.length < maxColumns && (
        <div
          className="multicolumn-toolbar-tooltip"
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
            onClick={addColumn}
            className="system-control-icon add small"
            title="Add column"
            style={{ fontSize: '20px' }}
          >
            <HiPlus />
          </button>
        </div>
      )}
      {/* Title Text Field */}
      <div style={{ padding: '20px 20px 0 20px' }}>
        <StyleTextUser
          value={titleText}
          onChange={setTitleText}
          styles={titleStyles}
          onStylesChange={setTitleStyles}
        />
      </div>

      {/* Columns Container */}
      <div className="multicolumn-container">
        <div 
          className={`columns-grid columns-${columns.length}`}
          style={{
            gridTemplateColumns: `repeat(${columns.length}, 1fr)`
          }}
        >
          {columns.map((column, index) => (
            <div key={column.id} className="column-item">
              {/* Column Header */}
              <div className="column-header-container">
                {editingId === column.id ? (
                  <input
                    type="text"
                    value={column.header}
                    onChange={(e) => handleColumnUpdate(column.id, 'header', e.target.value)}
                    onBlur={handleEditEnd}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleEditEnd();
                      }
                    }}
                    className="column-input"
                    style={{ color: headerColor }}
                    autoFocus
                  />
                ) : (
                  <h3 
                    className="column-header"
                    style={{ color: headerColor }}
                    onClick={() => handleEditStart(column.id, 'header')}
                  >
                    {column.header}
                  </h3>
                )}
                
                <div className="column-actions">
                  <button
                    className="system-control-icon edit small"
                    onClick={() => handleEditStart(column.id, 'header')}
                    title="Edit header"
                  >
                    <HiPencil />
                  </button>
                  {columns.length > 1 && (
                    <button
                      className="remove-btn"
                      onClick={() => removeColumn(column.id)}
                      title="Remove column"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Column Description */}
              <div className="column-description-container">
                {editingId === column.id ? (
                  <textarea
                    value={column.description}
                    onChange={(e) => handleColumnUpdate(column.id, 'description', e.target.value)}
                    onBlur={handleEditEnd}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleEditEnd();
                      }
                    }}
                    className="column-textarea"
                    style={{ color: textColor }}
                    rows={3}
                    autoFocus
                  />
                ) : (
                  <p 
                    className="column-description"
                    style={{ color: textColor }}
                    onClick={() => handleEditStart(column.id, 'description')}
                  >
                    {column.description}
                  </p>
                )}
                
                <button
                  className="system-control-icon edit small"
                  onClick={() => handleEditStart(column.id, 'description')}
                  title="Edit description"
                >
                  <HiPencil />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CompMultiColumnDesign;
