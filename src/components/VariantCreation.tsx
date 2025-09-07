'use client';

import React, { useState } from 'react';
import './VariantCreation.css';

interface VariantParameter {
  id: string;
  name: string;
  values: string[];
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  beforePrice: number;
  saveAmount: number;
  count: number;
  editCount: number;
  ifSoldOut: 'keep selling' | 'stop selling';
  isTracking: boolean;
  parameters: { [key: string]: string };
}

interface VariantCreationProps {
  variants: ProductVariant[];
  onVariantsChange: (variants: ProductVariant[]) => void;
  className?: string;
}

const VariantCreation: React.FC<VariantCreationProps> = ({
  variants,
  onVariantsChange,
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  const [showCustomVariantModal, setShowCustomVariantModal] = useState(false);
  const [selectedParameters, setSelectedParameters] = useState<{ [key: string]: string }>({});
  const [customVariantName, setCustomVariantName] = useState('');
  const [customVariantValues, setCustomVariantValues] = useState<string[]>(['']);

  // Default variant parameters
  const defaultParameters: VariantParameter[] = [
    {
      id: 'size',
      name: 'Size',
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
      id: 'color',
      name: 'Color',
      values: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple']
    },
    {
      id: 'weight',
      name: 'Weight',
      values: ['1', '2', '5', '10', '15', '20']
    }
  ];

  const [availableParameters, setAvailableParameters] = useState<VariantParameter[]>(defaultParameters);

  const handleParameterSelect = (parameterId: string, value: string) => {
    setSelectedParameters(prev => ({
      ...prev,
      [parameterId]: value
    }));
  };

  const handleAddCustomParameter = () => {
    if (customVariantName.trim() && customVariantValues.some(v => v.trim())) {
      const newParameter: VariantParameter = {
        id: customVariantName.toLowerCase().replace(/\s+/g, '_'),
        name: customVariantName,
        values: customVariantValues.filter(v => v.trim()).map(v => v.trim())
      };

      setAvailableParameters(prev => [...prev, newParameter]);
      setCustomVariantName('');
      setCustomVariantValues(['']);
      setShowCustomVariantModal(false);
    }
  };

  const handleAddCustomValue = () => {
    setCustomVariantValues(prev => [...prev, '']);
  };

  const handleRemoveCustomValue = (index: number) => {
    if (customVariantValues.length > 1) {
      setCustomVariantValues(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleCustomValueChange = (index: number, value: string) => {
    setCustomVariantValues(prev =>
      prev.map((v, i) => i === index ? value : v)
    );
  };

  const createSingleVariant = () => {
    if (Object.keys(selectedParameters).length === 0) return;

    const variantName = Object.entries(selectedParameters)
      .map(([key, value]) => value)
      .join(' - ');

    const newVariant: ProductVariant = {
      id: `variant-${Date.now()}`,
      name: variantName,
      price: 0,
      beforePrice: 0,
      saveAmount: 0,
      count: 0,
      editCount: 0,
      ifSoldOut: 'keep selling',
      isTracking: false,
      parameters: selectedParameters
    };

    onVariantsChange([...variants, newVariant]);
    setSelectedParameters({});
  };

  const createBulkVariants = () => {
    if (Object.keys(selectedParameters).length === 0) return;

    const parameterKeys = Object.keys(selectedParameters);
    const parameterValues = parameterKeys.map(key => {
      const parameter = availableParameters.find(p => p.id === key);
      return parameter?.values || [];
    });

    // Generate all combinations
    const combinations: { [key: string]: string }[] = [];
    
    const generateCombinations = (currentCombo: { [key: string]: string }, depth: number) => {
      if (depth === parameterKeys.length) {
        combinations.push({ ...currentCombo });
        return;
      }

      const currentKey = parameterKeys[depth];
      const parameter = availableParameters.find(p => p.id === currentKey);
      
      if (parameter) {
        parameter.values.forEach(value => {
          currentCombo[currentKey] = value;
          generateCombinations(currentCombo, depth + 1);
        });
      }
    };

    generateCombinations({}, 0);

    const newVariants: ProductVariant[] = combinations.map((combo, index) => {
      const variantName = Object.entries(combo)
        .map(([key, value]) => value)
        .join(' - ');

      return {
        id: `variant-${Date.now()}-${index}`,
        name: variantName,
        price: 0,
        beforePrice: 0,
        saveAmount: 0,
        count: 0,
        editCount: 0,
        ifSoldOut: 'keep selling',
        isTracking: false,
        parameters: combo
      };
    });

    onVariantsChange([...variants, ...newVariants]);
    setSelectedParameters({});
  };

  const removeVariant = (variantId: string) => {
    onVariantsChange(variants.filter(v => v.id !== variantId));
  };

  const updateVariant = (variantId: string, field: keyof ProductVariant, value: any) => {
    onVariantsChange(variants.map(v => 
      v.id === variantId ? { ...v, [field]: value } : v
    ));
  };

  return (
    <div className={`variant-creation ${className}`}>
      <div className="variant-creation-header">
        <h3>Product Variants</h3>
        <div className="variant-tabs">
          <button 
            className={`variant-tab ${activeTab === 'single' ? 'active' : ''}`}
            onClick={() => setActiveTab('single')}
          >
            + Single Variant
          </button>
          <button 
            className={`variant-tab ${activeTab === 'bulk' ? 'active' : ''}`}
            onClick={() => setActiveTab('bulk')}
          >
            + Bulk Variant
          </button>
        </div>
      </div>

      <div className="variant-creation-content">
        <h4>{activeTab === 'single' ? 'Create Single Variant' : 'Create Bulk Variants'}</h4>
        
        <div className="variant-parameters">
          <p className="parameters-label">Choose your product variants</p>
          
          <div className="parameters-grid">
            {availableParameters.map((parameter, index) => (
              <div key={parameter.id} className="parameter-group">
                <label>Variant {index + 1} Ex. {parameter.name}</label>
                <select
                  value={selectedParameters[parameter.id] || ''}
                  onChange={(e) => handleParameterSelect(parameter.id, e.target.value)}
                >
                  <option value="">Select {parameter.name}</option>
                  {parameter.values.map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
                
                {selectedParameters[parameter.id] && (
                  <div className="parameter-dropdown">
                    <div className="dropdown-header">
                      <span>No data available</span>
                      <span>Custom Variant Ex. {parameter.name}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Add More Parameters */}
            <div className="parameter-group">
              <button 
                className="add-parameter-btn"
                onClick={() => setShowCustomVariantModal(true)}
              >
                + Add
              </button>
              <button className="close-btn">Close</button>
            </div>
          </div>
        </div>

        {/* Count in stock section */}
        {Object.keys(selectedParameters).length > 0 && (
          <div className="count-section">
            <label>Count in stock</label>
            <input 
              type="number" 
              placeholder="0" 
              min="0"
            />
          </div>
        )}

        {/* Action buttons */}
        {Object.keys(selectedParameters).length > 0 && (
          <div className="variant-actions">
            <button 
              className="create-variant-btn"
              onClick={activeTab === 'single' ? createSingleVariant : createBulkVariants}
            >
              {activeTab === 'single' ? 'Create Single Variant' : 'Create Bulk Variants'}
            </button>
          </div>
        )}
      </div>

      {/* Custom Variant Modal */}
      {showCustomVariantModal && (
        <div className="modal-overlay" onClick={() => setShowCustomVariantModal(false)}>
          <div className="custom-variant-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Custom Variant</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCustomVariantModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Variant name Ex. Size</label>
                <input
                  type="text"
                  value={customVariantName}
                  onChange={(e) => setCustomVariantName(e.target.value)}
                  placeholder="size"
                />
              </div>
              
              <div className="form-group">
                <label>Values</label>
                {customVariantValues.map((value, index) => (
                  <div key={index} className="value-input-group">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleCustomValueChange(index, e.target.value)}
                      placeholder={`Value ${index + 1}`}
                    />
                    {customVariantValues.length > 1 && (
                      <button 
                        className="remove-value-btn"
                        onClick={() => handleRemoveCustomValue(index)}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
                
                <button 
                  className="add-value-btn"
                  onClick={handleAddCustomValue}
                >
                  + Add More Values
                </button>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="create-btn"
                onClick={handleAddCustomParameter}
              >
                Create New Variant
              </button>
              <button 
                className="close-btn"
                onClick={() => setShowCustomVariantModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Created Variants List */}
      {variants.length > 0 && (
        <div className="created-variants">
          <h4>Created Variants ({variants.length})</h4>
          <div className="variants-list">
            {variants.map(variant => (
              <div key={variant.id} className="variant-item">
                <div className="variant-info">
                  <span className="variant-name">{variant.name}</span>
                  <span className="variant-details">
                    Price: ${variant.price} | Count: {variant.count}
                  </span>
                </div>
                <button 
                  className="remove-variant-btn"
                  onClick={() => removeVariant(variant.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantCreation;
