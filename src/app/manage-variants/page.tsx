'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVariants } from '../../components/EditorControls/PagesManagementComponents/VariantsContext';
import './ManageVariants.css';

interface VariantValue {
  id: string;
  name: string;
  color?: string; // For color variants, store hex color
}

interface VariantType {
  id: string;
  name: string;
  type: 'color' | 'size' | 'custom';
  values: VariantValue[];
}

const ManageVariantsPage: React.FC = () => {
  const router = useRouter();
  const { variants, setVariants, addVariant, updateVariant, deleteVariant, addValueToVariant, updateValueInVariant, deleteValueFromVariant } = useVariants();
  const [editingVariant, setEditingVariant] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string | null>(null);
  const [showAddVariantForm, setShowAddVariantForm] = useState(false);
  const [showAddValueForm, setShowAddValueForm] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [newVariantName, setNewVariantName] = useState('');
  const [newVariantType, setNewVariantType] = useState<'color' | 'size' | 'custom'>('custom');
  const [newValueName, setNewValueName] = useState('');
  const [newValueColor, setNewValueColor] = useState('#000000');

  const handleAddVariant = () => {
    if (!newVariantName.trim()) return;

    const newVariant: VariantType = {
      id: Date.now().toString(),
      name: newVariantName.trim(),
      type: newVariantType,
      values: []
    };

    addVariant(newVariant);
    setNewVariantName('');
    setNewVariantType('custom');
    setShowAddVariantForm(false);
  };

  const handleAddValue = (variantId: string) => {
    if (!newValueName.trim()) return;

    const newValue: VariantValue = {
      id: Date.now().toString(),
      name: newValueName.trim(),
      ...(newVariantType === 'color' && { color: newValueColor })
    };

    addValueToVariant(variantId, newValue);
    setNewValueName('');
    setNewValueColor('#000000');
    setShowAddValueForm(false);
    setSelectedVariantId(null);
  };

  const handleEditVariantName = (variantId: string, newName: string) => {
    if (!newName.trim()) return;

    const variant = variants.find(v => v.id === variantId);
    if (variant) {
      updateVariant(variantId, { ...variant, name: newName.trim() });
    }
    setEditingVariant(null);
  };

  const handleEditValueName = (variantId: string, valueId: string, newName: string) => {
    if (!newName.trim()) return;

    const variant = variants.find(v => v.id === variantId);
    if (variant) {
      const value = variant.values.find(val => val.id === valueId);
      if (value) {
        updateValueInVariant(variantId, valueId, { ...value, name: newName.trim() });
      }
    }
    setEditingValue(null);
  };

  const handleDeleteVariant = (variantId: string) => {
    deleteVariant(variantId);
  };

  const handleDeleteValue = (variantId: string, valueId: string) => {
    deleteValueFromVariant(variantId, valueId);
  };

  const handleUpdateValueColor = (variantId: string, valueId: string, color: string) => {
    const variant = variants.find(v => v.id === variantId);
    if (variant) {
      const value = variant.values.find(val => val.id === valueId);
      if (value) {
        updateValueInVariant(variantId, valueId, { ...value, color });
      }
    }
  };

  return (
    <div className="manage-variants-container">
      <div className="variants-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => router.back()}>
            <span className="back-icon">←</span>
            Back
          </button>
          <h1 className="page-title">Manage Variants</h1>
        </div>
        <div className="header-right">
          <button 
            className="add-variant-btn" 
            onClick={() => setShowAddVariantForm(true)}
          >
            <span className="add-icon">+</span>
            Add Variant Type
          </button>
        </div>
      </div>

      <div className="variants-content">
        {variants.map(variant => (
          <div key={variant.id} className="variant-card">
            <div className="variant-header">
              <div className="variant-title">
                {editingVariant === variant.id ? (
                  <input
                    type="text"
                    value={variant.name}
                    onChange={(e) => setVariants(prev => 
                      prev.map(v => 
                        v.id === variant.id 
                          ? { ...v, name: e.target.value }
                          : v
                      )
                    )}
                    onBlur={(e) => handleEditVariantName(variant.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleEditVariantName(variant.id, e.currentTarget.value);
                      } else if (e.key === 'Escape') {
                        setEditingVariant(null);
                      }
                    }}
                    className="variant-name-input"
                    autoFocus
                  />
                ) : (
                  <h3 
                    className="variant-name"
                    onClick={() => setEditingVariant(variant.id)}
                  >
                    {variant.name}
                  </h3>
                )}
                <span className="variant-type-badge">{variant.type}</span>
              </div>
              <div className="variant-actions">
                <button 
                  className="add-value-btn"
                  onClick={() => {
                    setSelectedVariantId(variant.id);
                    setNewVariantType(variant.type);
                    setShowAddValueForm(true);
                  }}
                >
                  <span className="add-icon">+</span>
                  Add Value
                </button>
                <button 
                  className="delete-variant-btn"
                  onClick={() => handleDeleteVariant(variant.id)}
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="variant-values">
              {variant.values.map(value => (
                <div key={value.id} className="value-item">
                  <div className="value-content">
                    {variant.type === 'color' && value.color && (
                      <div 
                        className="color-preview"
                        style={{ backgroundColor: value.color }}
                      />
                    )}
                    {editingValue === value.id ? (
                      <input
                        type="text"
                        value={value.name}
                        onChange={(e) => setVariants(prev => 
                          prev.map(v => 
                            v.id === variant.id 
                              ? { 
                                  ...v, 
                                  values: v.values.map(val => 
                                    val.id === value.id 
                                      ? { ...val, name: e.target.value }
                                      : val
                                  )
                                }
                              : v
                          )
                        )}
                        onBlur={(e) => handleEditValueName(variant.id, value.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleEditValueName(variant.id, value.id, e.currentTarget.value);
                          } else if (e.key === 'Escape') {
                            setEditingValue(null);
                          }
                        }}
                        className="value-name-input"
                        autoFocus
                      />
                    ) : (
                      <span 
                        className="value-name"
                        onClick={() => setEditingValue(value.id)}
                      >
                        {value.name}
                      </span>
                    )}
                    {variant.type === 'color' && value.color && (
                      <input
                        type="color"
                        value={value.color}
                        onChange={(e) => handleUpdateValueColor(variant.id, value.id, e.target.value)}
                        className="color-picker"
                      />
                    )}
                  </div>
                  <button 
                    className="delete-value-btn"
                    onClick={() => handleDeleteValue(variant.id, value.id)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Variant Form Modal */}
      {showAddVariantForm && (
        <div className="modal-overlay" onClick={() => setShowAddVariantForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Variant Type</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddVariantForm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Variant Name</label>
                <input
                  type="text"
                  value={newVariantName}
                  onChange={(e) => setNewVariantName(e.target.value)}
                  placeholder="e.g., Material, Style, etc."
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Variant Type</label>
                <select
                  value={newVariantType}
                  onChange={(e) => setNewVariantType(e.target.value as 'color' | 'size' | 'custom')}
                  className="form-select"
                >
                  <option value="custom">Custom</option>
                  <option value="color">Color</option>
                  <option value="size">Size</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowAddVariantForm(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleAddVariant}
              >
                Add Variant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Value Form Modal */}
      {showAddValueForm && selectedVariantId && (
        <div className="modal-overlay" onClick={() => setShowAddValueForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Value</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddValueForm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Value Name</label>
                <input
                  type="text"
                  value={newValueName}
                  onChange={(e) => setNewValueName(e.target.value)}
                  placeholder="e.g., Red, Large, Cotton, etc."
                  className="form-input"
                />
              </div>
              {newVariantType === 'color' && (
                <div className="form-group">
                  <label>Color</label>
                  <input
                    type="color"
                    value={newValueColor}
                    onChange={(e) => setNewValueColor(e.target.value)}
                    className="color-input"
                  />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowAddValueForm(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={() => handleAddValue(selectedVariantId)}
              >
                Add Value
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVariantsPage;
