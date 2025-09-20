'use client';

import React, { useState, useEffect } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import './VariantCreation.css';

// API Response Types
interface ParameterOption {
  id: number;
  value: string;
  parameter_id: number;
}

interface Parameter {
  id: number;
  name: string;
  store_id: number;
  options: ParameterOption[];
}

interface ParametersResponse {
  message: string | null;
  data: Parameter[];
  status: string;
}

// Product Variant Types
interface ProductVariant {
  count: number;
  tracking: "yes" | "no";
  keep_selling: "yes" | "no";
  sku_number: string | null;
  option_ids: number[];
}

interface ProductData {
  item_type: string;
  name: string;
  price: number;
  before_price: number | null;
  count: number;
  keep_selling: "yes" | "no";
  tracking: "yes" | "no";
  sku_number: string | null;
  variants: ProductVariant[];
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
  // State for parameters from API
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [selectedParameterIds, setSelectedParameterIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'select' | 'mode' | 'oneByOne' | 'combinations'>('select');
  
  // For one-by-one creation
  const [currentVariantRow, setCurrentVariantRow] = useState<{ [parameterId: number]: number }>({});
  
  // For combinations creation  
  const [parameterValueSets, setParameterValueSets] = useState<{ [parameterId: number]: number[] }>({});
  
  // Collapsible state
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock API data (replace with actual API call)
  const mockParametersData: ParametersResponse = {
    "message": null,
    "data": [
        {
            "id": 2,
            "name": "Color",
            "store_id": 1,
            "options": [
                {
                    "id": 7,
                    "value": "Red",
                    "parameter_id": 2
                },
                {
                    "id": 8,
                    "value": "Blue",
                    "parameter_id": 2
                },
                {
                    "id": 9,
                    "value": "Green",
                    "parameter_id": 2
                },
                {
                    "id": 10,
                    "value": "Yellow",
                    "parameter_id": 2
                },
                {
                    "id": 11,
                    "value": "Orange",
                    "parameter_id": 2
                },
                {
                    "id": 12,
                    "value": "Purple",
                    "parameter_id": 2
                },
                {
                    "id": 13,
                    "value": "Pink",
                    "parameter_id": 2
                },
                {
                    "id": 14,
                    "value": "Brown",
                    "parameter_id": 2
                },
                {
                    "id": 15,
                    "value": "Black",
                    "parameter_id": 2
                },
                {
                    "id": 16,
                    "value": "White",
                    "parameter_id": 2
                }
            ]
        },
        {
            "id": 1,
            "name": "Size",
            "store_id": 1,
            "options": [
                {
                    "id": 1,
                    "value": "S",
                    "parameter_id": 1
                },
                {
                    "id": 2,
                    "value": "M",
                    "parameter_id": 1
                },
                {
                    "id": 3,
                    "value": "L",
                    "parameter_id": 1
                },
                {
                    "id": 4,
                    "value": "XL",
                    "parameter_id": 1
                },
                {
                    "id": 5,
                    "value": "XXL",
                    "parameter_id": 1
                },
                {
                    "id": 6,
                    "value": "XXXL",
                    "parameter_id": 1
                }
            ]
        }
    ],
    "status": "success"
  };

  // Load parameters on component mount
  useEffect(() => {
    loadParameters();
  }, []);

  const loadParameters = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace this with actual API call
      // const response = await fetch('/api/parameters');
      // const data = await response.json();
      
      // Using mock data for now
      const data = mockParametersData;
      
      if (data.status === 'success') {
        setParameters(data.data);
      } else {
        setError('Failed to load parameters');
      }
    } catch (err) {
      setError('Error loading parameters');
      console.error('Error loading parameters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleParameterSelect = (parameterId: number) => {
    setSelectedParameterIds(prev => {
      if (prev.includes(parameterId)) {
        return prev.filter(id => id !== parameterId);
      } else {
        return [...prev, parameterId];
      }
    });
  };

  const proceedToModeSelection = () => {
    if (selectedParameterIds.length > 0) {
      setCurrentStep('mode');
    }
  };

  const selectCreationMode = (mode: 'oneByOne' | 'combinations') => {
    setCurrentStep(mode);
    // Initialize states based on mode
    if (mode === 'oneByOne') {
      setCurrentVariantRow({});
    } else {
      setParameterValueSets({});
    }
  };

  const backToParameterSelection = () => {
    setCurrentStep('select');
  };

  const backToModeSelection = () => {
    setCurrentStep('mode');
  };

  // One-by-one handlers
  const handleVariantRowValueChange = (parameterId: number, optionId: number) => {
    setCurrentVariantRow(prev => ({
      ...prev,
      [parameterId]: optionId
    }));
  };

  const addCurrentVariant = () => {
    const optionIds = Object.values(currentVariantRow).filter(Boolean);
    if (optionIds.length === selectedParameterIds.length) {
      const newVariant: ProductVariant = {
        count: 0,
        tracking: "yes",
        keep_selling: "yes",
        sku_number: null,
        option_ids: optionIds
      };
      onVariantsChange([...variants, newVariant]);
      setCurrentVariantRow({});
    }
  };

  // Combinations handlers
  const handleParameterValueToggle = (parameterId: number, optionId: number) => {
    setParameterValueSets(prev => {
      const currentValues = prev[parameterId] || [];
      if (currentValues.includes(optionId)) {
        return {
          ...prev,
          [parameterId]: currentValues.filter(id => id !== optionId)
        };
      } else {
        return {
          ...prev,
          [parameterId]: [...currentValues, optionId]
        };
      }
    });
  };

  const generateAllCombinations = () => {
    if (selectedParameterIds.length === 0) return;

    // Get value sets for each selected parameter
    const parameterGroups = selectedParameterIds.map(paramId => {
      return parameterValueSets[paramId] || [];
    });

    // Check if all parameters have at least one value selected
    if (parameterGroups.some(group => group.length === 0)) {
      return;
    }

    const combinations: number[][] = [];
    
    const generateCombinations = (currentCombo: number[], depth: number) => {
      if (depth === parameterGroups.length) {
        combinations.push([...currentCombo]);
        return;
      }

      const currentGroup = parameterGroups[depth];
      currentGroup.forEach(optionId => {
        currentCombo.push(optionId);
        generateCombinations(currentCombo, depth + 1);
        currentCombo.pop();
      });
    };

    generateCombinations([], 0);

    // Create variants from combinations
    const newVariants: ProductVariant[] = combinations.map(optionIds => ({
      count: 0,
      tracking: "yes",
      keep_selling: "yes",
      sku_number: null,
      option_ids: optionIds
    }));

    onVariantsChange([...variants, ...newVariants]);
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    const updatedVariants = variants.map((variant, i) => 
      i === index ? { ...variant, [field]: value } : variant
    );
    onVariantsChange(updatedVariants);
  };

  const removeVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    onVariantsChange(updatedVariants);
  };

  const getVariantDisplayName = (variant: ProductVariant) => {
    const optionNames = variant.option_ids.map(optionId => {
      for (const parameter of parameters) {
        const option = parameter.options.find(opt => opt.id === optionId);
        if (option) {
          return option.value;
        }
      }
      return 'Unknown';
    });
    return optionNames.join(' - ') || 'Variant';
  };

  if (loading) {
    return <div className="variant-creation-loading">Loading parameters...</div>;
  }

  if (error) {
    return (
      <div className="variant-creation-error">
        <p>Error: {error}</p>
        <button onClick={loadParameters}>Retry</button>
      </div>
    );
  }

  return (
    <div className={`variant-creation ${className}`}>
      <div 
        className="variant-creation-header collapsible-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="header-content">
          <h3>Product Variants</h3>
          {variants.length > 0 && (
            <span className="variants-count">({variants.length} variants)</span>
          )}
        </div>
        <div className="header-controls">
          {isExpanded && currentStep !== 'select' && (
            <div className="step-breadcrumb">
              <span className={`step ${currentStep === 'select' ? 'active' : 'completed'}`}>
                1. Select Parameters
              </span>
              {currentStep !== 'select' && (
                <span className={`step ${currentStep === 'mode' ? 'active' : 'completed'}`}>
                  2. Choose Mode
                </span>
              )}
              {(currentStep === 'oneByOne' || currentStep === 'combinations') && (
                <span className="step active">
                  3. {currentStep === 'oneByOne' ? 'Create Variants' : 'Configure & Generate'}
                </span>
              )}
            </div>
          )}
          <button className="collapse-toggle" type="button">
            {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
          </button>
        </div>
      </div>

      <div className={`variant-creation-content ${isExpanded ? 'expanded' : 'collapsed'}`}>

      {/* Step 1: Parameter Selection */}
      {currentStep === 'select' && (
        <div className="parameter-selection-step">
          <h4>Select Parameters</h4>
          <p className="step-description">Choose which parameters you want to use for your variants</p>
          
          <div className="parameters-grid">
            {parameters.map((parameter) => (
              <div key={parameter.id} className="parameter-card">
                <label className="parameter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedParameterIds.includes(parameter.id)}
                    onChange={() => handleParameterSelect(parameter.id)}
                  />
                  <span className="parameter-name">{parameter.name}</span>
                </label>
              </div>
            ))}
          </div>

          {selectedParameterIds.length > 0 && (
            <div className="step-actions">
              <button 
                className="proceed-btn"
                onClick={proceedToModeSelection}
              >
                Next: Choose Creation Mode →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Mode Selection */}
      {currentStep === 'mode' && (
        <div className="mode-selection-step">
          <div className="mode-header">
            <h4>Choose Creation Mode</h4>
            <button className="back-btn" onClick={backToParameterSelection}>
              ← Back to Parameters
            </button>
          </div>
          <p className="step-description">How would you like to create your variants?</p>

          <div className="mode-options">
            <div className="mode-card" onClick={() => selectCreationMode('oneByOne')}>
              <div className="mode-icon">📝</div>
              <h5>One by One</h5>
              <p>Create variants individually with precise control over each combination</p>
              <div className="mode-features">
                <span>• Table with parameter columns</span>
                <span>• Manual value assignment</span>
                <span>• Full control per variant</span>
              </div>
            </div>

            <div className="mode-card" onClick={() => selectCreationMode('combinations')}>
              <div className="mode-icon">⚡</div>
              <h5>All Combinations</h5>
              <p>Select values for each parameter and generate all possible combinations</p>
              <div className="mode-features">
                <span>• Bulk value selection</span>
                <span>• Automatic generation</span>
                <span>• Time-saving for many variants</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3a: One by One Creation */}
      {currentStep === 'oneByOne' && (
        <div className="one-by-one-step">
          <div className="step-header">
            <h4>Create Variants One by One</h4>
            <button className="back-btn" onClick={backToModeSelection}>
              ← Back to Mode Selection
            </button>
          </div>

          <div className="variant-table-container">
            <div className="variant-table">
              <div className="table-header">
                {selectedParameterIds.map(parameterId => {
                  const parameter = parameters.find(p => p.id === parameterId);
                  return (
                    <div key={parameterId} className="header-cell">
                      {parameter?.name}
                    </div>
                  );
                })}
                <div className="header-cell actions">Actions</div>
              </div>

              <div className="table-row current-row">
                {selectedParameterIds.map(parameterId => {
                  const parameter = parameters.find(p => p.id === parameterId);
                  return (
                    <div key={parameterId} className="table-cell">
                      <select
                        value={currentVariantRow[parameterId] || ''}
                        onChange={(e) => handleVariantRowValueChange(parameterId, Number(e.target.value))}
                      >
                        <option value="">Select {parameter?.name}</option>
                        {parameter?.options.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
                <div className="table-cell actions">
                  <button 
                    className="add-variant-btn"
                    onClick={addCurrentVariant}
                    disabled={Object.keys(currentVariantRow).length !== selectedParameterIds.length}
                  >
                    + Add Variant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3b: Combinations Creation */}
      {currentStep === 'combinations' && (
        <div className="combinations-step">
          <div className="step-header">
            <h4>Configure Values for All Combinations</h4>
            <button className="back-btn" onClick={backToModeSelection}>
              ← Back to Mode Selection
            </button>
          </div>
          <p className="step-description">Select which values to use for each parameter</p>

          <div className="parameter-value-configuration">
            {selectedParameterIds.map(parameterId => {
              const parameter = parameters.find(p => p.id === parameterId);
              if (!parameter) return null;

              return (
                <div key={parameterId} className="parameter-section">
                  <h5>{parameter.name}</h5>
                  <div className="value-options">
                    {parameter.options.map(option => (
                      <label key={option.id} className="value-option">
                        <input
                          type="checkbox"
                          checked={(parameterValueSets[parameterId] || []).includes(option.id)}
                          onChange={() => handleParameterValueToggle(parameterId, option.id)}
                        />
                        <span>{option.value}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}

            {selectedParameterIds.every(id => (parameterValueSets[id] || []).length > 0) && (
              <div className="generate-section">
                <div className="combinations-preview">
                  <h5>Preview</h5>
                  <p>
                    This will generate {
                      selectedParameterIds.reduce((total, id) => 
                        total * (parameterValueSets[id]?.length || 1), 1
                      )
                    } variants from all possible combinations
                  </p>
                </div>
                <button 
                  className="generate-btn"
                  onClick={generateAllCombinations}
                >
                  Generate All Combinations
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Created Variants Table */}
      {variants.length > 0 && (
        <div className="variants-table-section">
          <h4>Variants ({variants.length})</h4>
          <div className="variants-table-container">
            <table className="variants-table">
              <thead>
                <tr>
                  <th>Variant</th>
                  <th>Count</th>
                  <th>Tracking</th>
                  <th>Keep Selling</th>
                  <th>SKU Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((variant, index) => (
                  <tr key={index}>
                    <td className="variant-name-cell">
                      {getVariantDisplayName(variant)}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={variant.count}
                        onChange={(e) => updateVariant(index, 'count', Number(e.target.value))}
                        min="0"
                        className="variant-input"
                      />
                    </td>
                    <td>
                      <select
                        value={variant.tracking}
                        onChange={(e) => updateVariant(index, 'tracking', e.target.value as "yes" | "no")}
                        className="variant-select"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={variant.keep_selling}
                        onChange={(e) => updateVariant(index, 'keep_selling', e.target.value as "yes" | "no")}
                        className="variant-select"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={variant.sku_number || ''}
                        onChange={(e) => updateVariant(index, 'sku_number', e.target.value || null)}
                        placeholder="SKU"
                        className="variant-input"
                      />
                    </td>
                    <td>
                      <button
                        className="remove-variant-btn"
                        onClick={() => removeVariant(index)}
                        title="Remove variant"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      </div>
    </div>
  );
};

export default VariantCreation;