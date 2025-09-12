'use client';

import React, { useState } from 'react';
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

  const [mainTitle, setMainTitle] = useState(title);
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns || defaultColumns);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState(false);

  const handleTitleChange = (newTitle: string) => {
    setMainTitle(newTitle);
  };

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

  const handleEditStart = (id: string, field: 'title' | 'header' | 'description') => {
    if (field === 'title') {
      setEditingTitle(true);
    } else {
      setEditingId(id);
    }
  };

  const handleEditEnd = () => {
    setEditingId(null);
    setEditingTitle(false);
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
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Header Section */}
      <div className="multicolumn-header">
        <div className="title-container">
          {editingTitle ? (
            <input
              type="text"
              value={mainTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              onBlur={handleEditEnd}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEditEnd();
                }
              }}
              className="title-input"
              style={{ color: headerColor }}
              autoFocus
            />
          ) : (
            <h2 
              className="multicolumn-title"
              style={{ color: headerColor }}
              onClick={() => handleEditStart('', 'title')}
            >
              {mainTitle}
            </h2>
          )}
          <button
            className="edit-btn title-edit-btn"
            onClick={() => handleEditStart('', 'title')}
            title="Edit title"
          >
            ✏️
          </button>
        </div>

        {/* Column Controls */}
        <div className="column-controls">
          {columns.length < maxColumns && (
            <button
              onClick={addColumn}
              className="add-column-btn"
              title="Add column"
            >
              + Add Column
            </button>
          )}
          <span className="column-count">
            {columns.length}/{maxColumns} columns
          </span>
        </div>
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
                    className="edit-btn"
                    onClick={() => handleEditStart(column.id, 'header')}
                    title="Edit header"
                  >
                    ✏️
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
                  className="edit-btn description-edit-btn"
                  onClick={() => handleEditStart(column.id, 'description')}
                  title="Edit description"
                >
                  ✏️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="multicolumn-footer">
        <p className="instructions">
          💡 Click on any text to edit • Add up to {maxColumns} columns • Remove columns with ✕
        </p>
      </div>
    </div>
  );
};

export default CompMultiColumnDesign;
