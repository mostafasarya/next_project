'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import VariantCreation from './VariantCreation';
import StyleUploadImageFunction from './StyleUploadImageFunction';
import './ProductsManagementPage.css';

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

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  price: number;
  beforePrice: number;
  saveAmount: number;
  variants: ProductVariant[];
  count: number;
  editCount: number;
  ifSoldOut: 'keep selling' | 'stop selling';
  isTracking: boolean;
}

interface Section {
  id: string;
  name: string;
  type: 'section';
  position: number; // Position in the hierarchy
}

const ProductsManagementPage: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedItem, setDraggedItem] = useState<{ id: string; type: 'product' | 'section'; index: number } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<{ id: string; type: 'product' | 'section'; index: number } | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionName, setEditingSectionName] = useState('');
  const [fixedHeaderSection, setFixedHeaderSection] = useState<Section>({
    id: 'fixed-header-section',
    name: 'Section 1',
    type: 'section',
    position: -999 // Very low position to ensure it's always at the top
  });
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: '',
    image: '🦴',
    images: [],
    description: '',
    price: 0,
    beforePrice: 0,
    saveAmount: 0,
    count: 0,
    editCount: 0,
    ifSoldOut: 'keep selling',
    isTracking: false,
    variants: []
  });
  const [newVariants, setNewVariants] = useState<ProductVariant[]>([]);
  const [showVariants, setShowVariants] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ id: string; name: string; type: 'product' | 'variant'; parentId?: string } | null>(null);

  // Mock data matching the image structure
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Hat',
        category: 'women',
        image: '🦴',
        images: ['🦴', '👒', '🎩'],
        description: 'Stylish and comfortable hat for all occasions',
        price: 29.99,
        beforePrice: 39.99,
        saveAmount: 10.00,
        count: 15,
        editCount: 0,
        ifSoldOut: 'stop selling',
        isTracking: true,
        variants: []
      },
      {
        id: '2',
        name: 'Trouser',
        category: 'women',
        image: '🦴',
        images: ['🦴', '👖', '👗'],
        description: 'Elegant trousers perfect for professional and casual wear',
        price: 49.99,
        beforePrice: 59.99,
        saveAmount: 10.00,
        count: 15,
        editCount: 0,
        ifSoldOut: 'stop selling',
        isTracking: true,
        variants: []
      },
      {
        id: '3',
        name: 'Shirt',
        category: 'MEN',
        image: '🦴',
        images: ['🦴', '👕', '🎽'],
        description: 'Classic shirt design with modern comfort',
        price: 34.99,
        beforePrice: 44.99,
        saveAmount: 10.00,
        count: 30,
        editCount: 0,
        ifSoldOut: 'keep selling',
        isTracking: true,
        variants: [
          {
            id: '3-1',
            name: 'small',
            price: 34.99,
            beforePrice: 44.99,
            saveAmount: 10.00,
            count: 20,
            editCount: 0,
            ifSoldOut: 'keep selling',
            isTracking: true,
            parameters: { size: 'S' }
          },
          {
            id: '3-2',
            name: 'medium',
            price: 34.99,
            beforePrice: 44.99,
            saveAmount: 10.00,
            count: 10,
            editCount: 0,
            ifSoldOut: 'keep selling',
            isTracking: true,
            parameters: { size: 'M' }
          }
        ]
      }
    ];
    setProducts(mockProducts);
  }, []);

  // Handle URL query parameter to show Add Product form
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const showAddProduct = urlParams.get('showAddProduct');
    if (showAddProduct === 'true') {
      setShowAddForm(true);
      // Clean up the URL by removing the query parameter
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  const handleEditCount = (productId: string, value: number, variantId?: string) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          if (variantId) {
            // Update variant count
            return {
              ...product,
              variants: product.variants.map(variant => 
                variant.id === variantId 
                  ? { ...variant, editCount: value }
                  : variant
              )
            };
          } else {
            // Update main product count
            return { ...product, editCount: value };
          }
        }
        return product;
      })
    );
  };

  const handleAddCount = (productId: string, variantId?: string) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          if (variantId) {
            // Add to variant count
            return {
              ...product,
              variants: product.variants.map(variant => 
                variant.id === variantId 
                  ? { 
                      ...variant, 
                      count: variant.count + variant.editCount,
                      editCount: 0 
                    }
                  : variant
              )
            };
          } else {
            // Add to main product count
            return { 
              ...product, 
              count: product.count + product.editCount,
              editCount: 0 
            };
          }
        }
        return product;
      })
    );
  };

  const handleDeductCount = (productId: string, variantId?: string) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          if (variantId) {
            // Deduct from variant count
            return {
              ...product,
              variants: product.variants.map(variant => 
                variant.id === variantId 
                  ? { 
                      ...variant, 
                      count: Math.max(0, variant.count - variant.editCount),
                      editCount: 0 
                    }
                  : variant
              )
            };
          } else {
            // Deduct from main product count
            return { 
              ...product, 
              count: Math.max(0, product.count - product.editCount),
              editCount: 0 
            };
          }
        }
        return product;
      })
    );
  };

  const handleIfSoldOutChange = (productId: string, value: 'keep selling' | 'stop selling', variantId?: string) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          if (variantId) {
            // Update variant ifSoldOut
            return {
              ...product,
              variants: product.variants.map(variant => 
                variant.id === variantId 
                  ? { ...variant, ifSoldOut: value }
                  : variant
              )
            };
          } else {
            // Update main product ifSoldOut
            return { ...product, ifSoldOut: value };
          }
        }
        return product;
      })
    );
  };

  const handleTrackingChange = (productId: string, variantId?: string) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          if (variantId) {
            // Toggle variant tracking
            return {
              ...product,
              variants: product.variants.map(variant => 
                variant.id === variantId 
                  ? { ...variant, isTracking: !variant.isTracking }
                  : variant
              )
            };
          } else {
            // Toggle main product tracking
            return { ...product, isTracking: !product.isTracking };
          }
        }
        return product;
      })
    );
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, item: { id: string; type: 'product' | 'section'; index: number }) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
  };

  const handleDragOver = (e: React.DragEvent, item: { id: string; type: 'product' | 'section'; index: number }) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(item);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetItem: { id: string; type: 'product' | 'section'; index: number }) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetItem.id) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    // Handle section dragging
    if (draggedItem.type === 'section') {
      const draggedSection = sections.find(s => s.id === draggedItem.id);
      if (!draggedSection) return;

      console.log('Section drag drop:', {
        draggedSection: draggedSection.name,
        targetItem: targetItem.type,
        targetId: targetItem.id,
        currentSections: sections.map(s => ({ name: s.name, position: s.position }))
      });

      // Use a single state update to avoid race conditions
      setSections(prevSections => {
        const newSections = [...prevSections];
        
        // Remove the dragged section
        const draggedIndex = newSections.findIndex(s => s.id === draggedItem.id);
        if (draggedIndex === -1) return prevSections;
        
        const [draggedSectionData] = newSections.splice(draggedIndex, 1);
        
        // Calculate target position based on the current combined list
        let targetPosition = 0;
        
        if (targetItem.type === 'section') {
          // Insert before another section
          const targetSection = newSections.find(s => s.id === targetItem.id);
          if (targetSection) {
            targetPosition = targetSection.position;
          }
        } else {
          // Insert after a product (at the lower border)
          const targetProduct = products.find(p => p.id === targetItem.id);
          if (targetProduct) {
            const productIndex = products.indexOf(targetProduct);
            
            // Count how many sections currently have positions <= productIndex
            // This tells us how many sections come before this product in the display
            const sectionsBeforeProduct = newSections.filter(s => s.position <= productIndex).length;
            
            // The target position should be the product index + 1 + the number of sections before it
            // This places the section AFTER the product (at its lower border)
            targetPosition = productIndex + 1 + sectionsBeforeProduct;
            
            console.log('Product insertion debug:', {
              targetProduct: targetProduct.name,
              productIndex,
              sectionsBeforeProduct,
              targetPosition,
              sections: newSections.map(s => ({ name: s.name, position: s.position }))
            });
          }
        }

        // Note: Bottom insertion is now handled by the dedicated bottom drop zone

        // Update positions of sections that come after the target position
        newSections.forEach(section => {
          if (section.position >= targetPosition) {
            section.position += 1;
          }
        });
        
        // Insert the dragged section at the target position
        draggedSectionData.position = targetPosition;
        newSections.push(draggedSectionData);
        
        console.log('Section drop result:', {
          targetPosition,
          finalSections: newSections.map(s => ({ name: s.name, position: s.position }))
        });
        
        return newSections;
      });
    } else {
      // Handle product dragging (existing logic)
      setProducts(prevProducts => {
        const newProducts = [...prevProducts];
        
        // Reorder products
        const draggedProduct = newProducts.find(p => p.id === draggedItem.id);
        const targetProduct = newProducts.find(p => p.id === targetItem.id);
        
        if (draggedProduct && targetProduct) {
          const draggedIndex = newProducts.indexOf(draggedProduct);
          const targetIndex = newProducts.indexOf(targetProduct);
          
          // Remove dragged item
          newProducts.splice(draggedIndex, 1);
          // Insert at target position
          newProducts.splice(targetIndex, 0, draggedProduct);
        }
        
        return newProducts;
      });
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // Section Management Functions
  const handleAddSection = () => {
    setShowAddSectionForm(true);
  };

  const handleCloseSectionForm = () => {
    setShowAddSectionForm(false);
    setNewSectionName('');
  };

  const handleCreateSection = () => {
    if (!newSectionName.trim()) return;

    // Use a single state update to avoid race conditions
    setSections(prevSections => {
      const newSections = [...prevSections];
      
      // Find the minimum position among existing sections
      const minPosition = newSections.length > 0 
        ? Math.min(...newSections.map(s => s.position))
        : 0;
      
      // Create new section at position (minPosition - 1) to ensure it's at the very top
      const newSection: Section = {
        id: `section-${Date.now()}`,
        name: newSectionName.trim(),
        type: 'section',
        position: minPosition - 1
      };
      
      newSections.push(newSection);
      return newSections;
    });
    
    handleCloseSectionForm();
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(prevSections => {
      const sectionToDelete = prevSections.find(s => s.id === sectionId);
      if (!sectionToDelete) return prevSections;
      
      const deletedPosition = sectionToDelete.position;
      
      // Remove the section and update positions of sections that come after it
      return prevSections
        .filter(section => section.id !== sectionId)
        .map(section => ({
          ...section,
          position: section.position > deletedPosition ? section.position - 1 : section.position
        }));
    });
  };

  const handleEditSection = (sectionId: string, currentName: string) => {
    setEditingSectionId(sectionId);
    setEditingSectionName(currentName);
  };

  const handleSaveSectionEdit = () => {
    if (editingSectionId && editingSectionName.trim()) {
      setSections(prevSections =>
        prevSections.map(section =>
          section.id === editingSectionId
            ? { ...section, name: editingSectionName.trim() }
            : section
        )
      );
      setEditingSectionId(null);
      setEditingSectionName('');
    }
  };

  const handleCancelSectionEdit = () => {
    setEditingSectionId(null);
    setEditingSectionName('');
  };

  const handleEditFixedHeader = () => {
    setEditingSectionId('fixed-header-section');
    setEditingSectionName(fixedHeaderSection.name);
  };

  const handleSaveFixedHeaderEdit = () => {
    if (editingSectionName.trim()) {
      setFixedHeaderSection(prev => ({
        ...prev,
        name: editingSectionName.trim()
      }));
      setEditingSectionId(null);
      setEditingSectionName('');
    }
  };

  // Add Product Form Handlers
  const handleAddProduct = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setNewProduct({
      name: '',
      category: '',
      image: '🦴',
      images: [],
      description: '',
      price: 0,
      beforePrice: 0,
      saveAmount: 0,
      count: 0,
      editCount: 0,
      ifSoldOut: 'keep selling',
      isTracking: false,
      variants: []
    });
    setNewVariants([]);
    setShowVariants(false);
    setShowAdvancedSettings(false);
  };

  const handleNewProductChange = (field: keyof Product, value: any) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };


  // Image upload handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls: string[] = [];
      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            imageUrls.push(event.target.result as string);
            if (imageUrls.length === files.length) {
              setNewProduct(prev => ({ ...prev, images: [...(prev.images || []), ...imageUrls] }));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  };

  // Delete handlers
  const handleDeleteClick = (id: string, name: string, type: 'product' | 'variant', parentId?: string) => {
    setDeleteItem({ id, name, type, parentId });
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteItem) return;

    if (deleteItem.type === 'product') {
      // Delete product and all its variants
      setProducts(prev => prev.filter(product => product.id !== deleteItem.id));
    } else if (deleteItem.type === 'variant' && deleteItem.parentId) {
      // Delete specific variant
      setProducts(prev => prev.map(product => {
        if (product.id === deleteItem.parentId) {
          return {
            ...product,
            variants: product.variants.filter(variant => variant.id !== deleteItem.id)
          };
        }
        return product;
      }));
    }

    setShowDeleteDialog(false);
    setDeleteItem(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteItem(null);
  };

  // Helper function to format variant names for display
  const formatVariantNames = (variants: ProductVariant[]) => {
    if (!variants || variants.length === 0) return '';
    
    if (variants.length === 1) {
      // Single variant: show parameter combinations
      const variant = variants[0];
      if (!variant || !variant.parameters) return '';
      
      const parameterEntries = Object.entries(variant.parameters);
      if (parameterEntries.length === 0) return '';
      
      return parameterEntries
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    } else {
      // Multiple variants: show combinations in a compact way
      const allParameters = new Set<string>();
      variants.forEach(variant => {
        if (variant && variant.parameters) {
          Object.keys(variant.parameters).forEach(key => allParameters.add(key));
        }
      });
      
      const parameterKeys = Array.from(allParameters);
      const combinations = variants
        .filter(variant => variant && variant.parameters) // Filter out invalid variants
        .map(variant => {
          return parameterKeys
            .map(key => variant.parameters[key] || '-')
            .join(' × ');
        });
      
      // Show first few combinations and "..." if more exist
      if (combinations.length <= 3) {
        return combinations.join(', ');
      } else {
        return `${combinations.slice(0, 2).join(', ')} +${combinations.length - 2} more`;
      }
    }
  };

  const handleSubmitProduct = () => {
    const newId = (products.length + 1).toString();
    const productVariants: ProductVariant[] = newVariants;

    const newProductData: Product = {
      id: newId,
      name: newProduct.name!,
      category: newProduct.category!,
      image: newProduct.image!,
      images: newProduct.images!,
      description: newProduct.description!,
      price: newProduct.price!,
      beforePrice: newProduct.beforePrice!,
      saveAmount: newProduct.saveAmount!,
      count: newProduct.count!,
      editCount: newProduct.editCount!,
      ifSoldOut: newProduct.ifSoldOut!,
      isTracking: newProduct.isTracking!,
      variants: productVariants
    };

    setProducts(prev => [...prev, newProductData]);
    handleCloseForm();
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create combined list of items (sections and products) for rendering
  const allItems = [fixedHeaderSection, ...filteredSections, ...filteredProducts].sort((a, b) => {
    // Get position for comparison
    let posA, posB;
    
    if ('position' in a) {
      // It's a section - use its position directly
      posA = a.position;
    } else {
      // It's a product - use its index in the products array
      const productIndex = filteredProducts.indexOf(a as Product);
      posA = productIndex;
    }
    
    if ('position' in b) {
      // It's a section - use its position directly
      posB = b.position;
    } else {
      // It's a product - use its index in the products array
      const productIndex = filteredProducts.indexOf(b as Product);
      posB = productIndex;
    }
    
    return posA - posB;
  });

  // Calculate global product numbers
  let globalProductNumber = 1;

  return (
    <div className="products-management-container">
      {/* Header */}
      <div className="products-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => router.push('/Store-homepage')}>
            <span className="back-icon">←</span>
            Back to Design
          </button>
          <h1 className="page-title">Products Management</h1>
        </div>
        <div className="header-center">
          <div className="search-input-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="header-right">
          <button className="add-section-btn" onClick={handleAddSection}>
            <span className="add-icon">📋</span>
            ADD section
          </button>
          <button className="add-product-btn" onClick={handleAddProduct}>
            <span className="add-icon">+</span>
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table">
        <div className="table-header">
          <div className="header-cell header-checkbox">
            <input type="checkbox" onChange={(e) => {
              // TODO: Implement select all functionality
            }} />
          </div>
          <div className="header-cell product-col sortable">Product</div>
          <div className="header-cell price-col sortable">Price</div>
          <div className="header-cell count-col sortable">Count</div>
          <div className="header-cell edit-col">Edit Count</div>
          <div className="header-cell sold-out-col">If Sold Out</div>
          <div className="header-cell actions-col">Actions</div>
        </div>

        {allItems.flatMap((item, index) => {
          const rows = [];
          
          // Check if item is a section
          if ('type' in item && item.type === 'section') {
            const section = item as Section;
            const isFixedHeader = section.id === 'fixed-header-section';
            const sectionKey = section.id || `section-${index}`;
            
            rows.push(
              <div 
                key={sectionKey} 
                className={`section-row ${isFixedHeader ? 'fixed-header-section' : 'regular-section'} ${draggedItem?.id === section.id ? 'dragging' : ''} ${dragOverItem?.id === section.id ? 'drag-over' : ''}`}
                draggable={!isFixedHeader}
                onDragStart={!isFixedHeader ? (e) => handleDragStart(e, { id: section.id, type: 'section', index }) : undefined}
                onDragOver={!isFixedHeader ? (e) => handleDragOver(e, { id: section.id, type: 'section', index }) : undefined}
                onDragLeave={!isFixedHeader ? handleDragLeave : undefined}
                onDrop={!isFixedHeader ? (e) => handleDrop(e, { id: section.id, type: 'section', index }) : undefined}
                onDragEnd={!isFixedHeader ? handleDragEnd : undefined}
              >
                <div className="section-cell">
                  {editingSectionId === section.id ? (
                    <div className="section-edit-form">
                      <input
                        type="text"
                        value={editingSectionName}
                        onChange={(e) => setEditingSectionName(e.target.value)}
                        className={`section-edit-input ${isFixedHeader ? 'fixed-header-input' : 'regular-section-input'}`}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            isFixedHeader ? handleSaveFixedHeaderEdit() : handleSaveSectionEdit();
                          } else if (e.key === 'Escape') {
                            handleCancelSectionEdit();
                          }
                        }}
                      />
                      <div className="section-edit-actions">
                        <button 
                          className="section-save-btn"
                          onClick={isFixedHeader ? handleSaveFixedHeaderEdit : handleSaveSectionEdit}
                          title="Save"
                        >
                          ✓
                        </button>
                        <button 
                          className="section-cancel-edit-btn"
                          onClick={handleCancelSectionEdit}
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className={`section-name ${isFixedHeader ? 'fixed-header-name' : 'regular-section-name'}`}>
                      {section.name}
                    </span>
                  )}
                </div>
                <div className="section-actions">
                  {editingSectionId !== section.id && (
                    <button 
                      className={`edit-section-btn ${isFixedHeader ? 'fixed-header-edit-btn' : 'regular-section-edit-btn'}`}
                      onClick={isFixedHeader ? handleEditFixedHeader : () => handleEditSection(section.id, section.name)}
                      title={isFixedHeader ? "Edit Header Name" : "Edit Section Name"}
                    >
                      ✏️
                    </button>
                  )}
                  {!isFixedHeader && (
                    <button 
                      className="delete-section-btn"
                      onClick={() => handleDeleteSection(section.id)}
                      title="Delete Section"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            );
            return rows;
          }

          // Handle product items
          const product = item as Product;
          const currentProductNumber = globalProductNumber++;
          const productKey = product.id || `product-${index}`;
          
          // Add main product row
          rows.push(
            <div 
              key={productKey} 
              className={`product-row ${draggedItem?.id === product.id ? 'dragging' : ''} ${dragOverItem?.id === product.id ? 'drag-over' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, { id: product.id, type: 'product', index })}
              onDragOver={(e) => handleDragOver(e, { id: product.id, type: 'product', index })}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, { id: product.id, type: 'product', index })}
              onDragEnd={handleDragEnd}
            >
              <div className="product-row-checkbox">
                <input 
                  type="checkbox" 
                  onChange={(e) => {
                    // TODO: Implement row selection
                  }} 
                />
              </div>
              <div className="product-cell">
                <span className="product-number">{product.id}</span>
                <div className="product-image-container">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="product-image"
                    />
                  ) : (
                    <span className="product-image">{product.image}</span>
                  )}
                </div>
                <div className="product-name-container">
                  <span 
                    className="product-name clickable"
                    onClick={() => router.push(`/product/${encodeURIComponent(product.name)}`)}
                  >
                    {product.name}
                  </span>
                  {product.variants && product.variants.length > 0 && (
                    <span className="product-variants">
                      {(() => {
                        try {
                          const formattedVariants = formatVariantNames(product.variants);
                          return formattedVariants ? `(${formattedVariants})` : '';
                        } catch (error) {
                          console.warn('Error formatting variants for product:', product.name, error);
                          return `(${product.variants.length} variant${product.variants.length > 1 ? 's' : ''})`;
                        }
                      })()}
                    </span>
                  )}
                </div>
              </div>
              <div className="price-cell">
                {product.variants.length > 0 ? (
                  <span className="variants-indicator">Manage via variants</span>
                ) : (
                  <div className="price-info">
                    <span className="current-price">${product.price}</span>
                    <span className="before-price">${product.beforePrice}</span>
                    <span className="save-amount">Save ${product.saveAmount}</span>
                  </div>
                )}
              </div>
              <div className="count-cell">
                {product.variants.length > 0 ? (
                  <span className="variants-indicator">Manage via variants</span>
                ) : (
                  <span className="count-value">{product.count}</span>
                )}
              </div>
              <div className="edit-count-cell">
                {product.variants.length > 0 ? (
                  <span className="variants-indicator">Manage via variants</span>
                ) : (
                  <>
                    <input
                      type="number"
                      value={product.editCount}
                      onChange={(e) => handleEditCount(product.id, parseInt(e.target.value) || 0)}
                      className="edit-count-input"
                      min="0"
                    />
                    <button 
                      className="add-count-btn"
                      onClick={() => handleAddCount(product.id)}
                    >
                      Add
                    </button>
                    <button 
                      className="deduct-count-btn"
                      onClick={() => handleDeductCount(product.id)}
                    >
                      Deduct
                    </button>
                    <span className="dropdown-arrow">▼</span>
                  </>
                )}
              </div>
              <div className="sold-out-cell">
                {product.variants.length > 0 ? (
                  <span className="variants-indicator">Manage via variants</span>
                ) : (
                  <>
                    <button 
                      className={`selling-btn ${product.ifSoldOut === 'keep selling' ? 'keep-selling' : 'stop-selling'}`}
                      onClick={() => handleIfSoldOutChange(product.id, product.ifSoldOut === 'keep selling' ? 'stop selling' : 'keep selling')}
                    >
                      {product.ifSoldOut === 'keep selling' ? 'Keep selling' : 'Stop selling'}
                    </button>
                    <button 
                      className={`tracking-btn ${product.isTracking ? 'tracking' : 'not-tracking'}`}
                      onClick={() => handleTrackingChange(product.id)}
                    >
                      {product.isTracking ? 'Keep tracking' : 'Stop tracking'}
                    </button>
                  </>
                )}
              </div>
                              <div className="actions-cell">
                  <div className="action-icons">
                    <button className="edit-icon" title="Edit Product">
                      ✏️
                    </button>
                    <button 
                      className="delete-icon" 
                      title="Delete Product"
                      onClick={() => handleDeleteClick(product.id, product.name, 'product')}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
            </div>
          );
          
          // Add variant rows as separate rows
          product.variants.forEach((variant, variantIndex) => {
            const variantNumber = globalProductNumber++;
            const variantKey = variant.id || `${product.id}-variant-${variantIndex}`;
            rows.push(
              <div 
                key={variantKey} 
                className={`variant-row ${draggedItem?.id === variant.id ? 'dragging' : ''} ${dragOverItem?.id === variant.id ? 'drag-over' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, { id: variant.id, type: 'product', index: variantNumber })}
                onDragOver={(e) => handleDragOver(e, { id: variant.id, type: 'product', index: variantNumber })}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, { id: variant.id, type: 'product', index: variantNumber })}
                onDragEnd={handleDragEnd}
              >
                <div className="product-row-checkbox">
                  <input 
                    type="checkbox" 
                    onChange={(e) => {
                      // TODO: Implement variant selection
                    }} 
                  />
                </div>
                <div className="product-cell variant-cell">
                  <span className="product-number">{variant.id}</span>
                  <div className="variant-info">
                    <span className="variant-name">{variant.name}</span>
                    {variant.parameters && typeof variant.parameters === 'object' && (
                      <span className="variant-parameters">
                        {Object.entries(variant.parameters)
                          .filter(([key, value]) => key && value !== null && value !== undefined)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(', ')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="price-cell">
                  <div className="price-info">
                    <span className="current-price">${variant.price}</span>
                    <span className="before-price">${variant.beforePrice}</span>
                    <span className="save-amount">Save ${variant.saveAmount}</span>
                  </div>
                </div>
                <div className="count-cell">
                  <span className="count-value">{variant.count}</span>
                </div>
                <div className="edit-count-cell">
                  <input
                    type="number"
                    value={variant.editCount}
                    onChange={(e) => handleEditCount(product.id, parseInt(e.target.value) || 0, variant.id)}
                    className="edit-count-input"
                    min="0"
                  />
                  <button 
                    className="add-count-btn"
                    onClick={() => handleAddCount(product.id, variant.id)}
                  >
                    Add
                  </button>
                  <button 
                    className="deduct-count-btn"
                    onClick={() => handleDeductCount(product.id, variant.id)}
                  >
                    Deduct
                  </button>
                  <span className="dropdown-arrow">▼</span>
                </div>
                <div className="sold-out-cell">
                  <button 
                    className={`selling-btn ${variant.ifSoldOut === 'keep selling' ? 'keep-selling' : 'stop-selling'}`}
                    onClick={() => handleIfSoldOutChange(product.id, variant.ifSoldOut === 'keep selling' ? 'stop selling' : 'keep selling', variant.id)}
                  >
                    {variant.ifSoldOut === 'keep selling' ? 'Keep selling' : 'Stop selling'}
                  </button>
                  <button 
                    className={`tracking-btn ${variant.isTracking ? 'tracking' : 'not-tracking'}`}
                    onClick={() => handleTrackingChange(product.id, variant.id)}
                  >
                    {variant.isTracking ? 'Keep tracking' : 'Stop tracking'}
                  </button>
                </div>
                <div className="actions-cell">
                  <div className="action-icons">
                    <button className="edit-icon" title="Edit Variant">
                      ✏️
                    </button>
                    <button 
                      className="delete-icon" 
                      title="Delete Variant"
                      onClick={() => handleDeleteClick(variant.id, variant.name, 'variant', product.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          });
          
          return rows;
        })}
        
        {/* Bottom Drop Zone */}
        <div 
          className={`bottom-drop-zone ${dragOverItem?.id === 'bottom-zone' ? 'drag-over' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            setDragOverItem({ id: 'bottom-zone', type: 'section', index: -1 });
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            if (dragOverItem?.id === 'bottom-zone') {
              setDragOverItem(null);
            }
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (draggedItem && draggedItem.type === 'section') {
              const draggedSection = sections.find(s => s.id === draggedItem.id);
              if (!draggedSection) return;

              setSections(prevSections => {
                const newSections = [...prevSections];
                
                // Remove the dragged section
                const draggedIndex = newSections.findIndex(s => s.id === draggedItem.id);
                if (draggedIndex === -1) return prevSections;
                
                const [draggedSectionData] = newSections.splice(draggedIndex, 1);
                
                // Calculate position at the bottom
                const maxPosition = Math.max(
                  ...newSections.map(s => s.position),
                  products.length - 1,
                  -1
                );
                const targetPosition = maxPosition + 1;
                
                // Insert the dragged section at the bottom
                draggedSectionData.position = targetPosition;
                newSections.push(draggedSectionData);
                
                return newSections;
              });
            }
            setDraggedItem(null);
            setDragOverItem(null);
          }}
        >
          <div className="drop-zone-content">
            <span className="drop-zone-text">Drop section here to add at bottom</span>
          </div>
        </div>
      </div>

      {/* Add Product Form Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Product</h2>
              <button className="close-btn" onClick={handleCloseForm}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="form-section">
                                <div className="form-row three-columns">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => handleNewProductChange('name', e.target.value)}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Current Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => handleNewProductChange('price', parseFloat(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Count in Stock</label>
                    <input
                      type="number"
                      value={newProduct.count}
                      onChange={(e) => handleNewProductChange('count', parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Product Images</label>
                    <div className="image-upload-container">
                      <StyleUploadImageFunction
                        onImageUpload={handleImageUpload}
                        acceptedFileTypes="image/*"
                        buttonClassName="image-upload-label"
                        buttonTitle="Upload Product Images"
                        buttonSize="medium"
                        multiple={true}
                        icon={
                          <div className="upload-content">
                            <span className="upload-icon">📁</span>
                            <span className="upload-text">Choose Images</span>
                          </div>
                        }
                      />
                    </div>
                    {newProduct.images && newProduct.images.length > 0 && (
                      <div className="uploaded-images">
                        {newProduct.images.map((image, index) => (
                          <div key={index} className="image-preview">
                            <img src={image} alt={`Product ${index + 1}`} />
                            <button
                              type="button"
                              className="remove-image-btn"
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-row full-width">
                  <div className="form-group">
                    <label>Product Description</label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => handleNewProductChange('description', e.target.value)}
                      placeholder="Enter product description..."
                      rows={4}
                      className="description-textarea"
                    />
                  </div>
                </div>

              <div className="form-section">
                <div className="section-header" onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}>
                  <h3>Advanced Settings (Optional)</h3>
                  <span className={`toggle-icon ${showAdvancedSettings ? 'expanded' : 'collapsed'}`}>▼</span>
                </div>
                {showAdvancedSettings && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Before Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newProduct.beforePrice}
                          onChange={(e) => handleNewProductChange('beforePrice', parseFloat(e.target.value) || 0)}
                          min="0"
                        />
                      </div>
                      <div className="form-group">
                        <label>Save Amount ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newProduct.saveAmount}
                          onChange={(e) => handleNewProductChange('saveAmount', parseFloat(e.target.value) || 0)}
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>
                          If Sold Out
                          <span className="help-icon" title="When the product runs out of stock, choose whether to keep it available for purchase or hide it from customers">?</span>
                        </label>
                        <select
                          value={newProduct.ifSoldOut}
                          onChange={(e) => handleNewProductChange('ifSoldOut', e.target.value as 'keep selling' | 'stop selling')}
                        >
                          <option value="keep selling">Keep selling</option>
                          <option value="stop selling">Stop selling</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>
                          Keep Tracking
                          <span className="help-icon" title="Choose whether to continue monitoring inventory levels and sales data for this product">?</span>
                        </label>
                        <select
                          value={newProduct.isTracking ? 'keep tracking' : 'stop tracking'}
                          onChange={(e) => handleNewProductChange('isTracking', e.target.value === 'keep tracking')}
                        >
                          <option value="keep tracking">Keep tracking</option>
                          <option value="stop tracking">Stop tracking</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
              </div>

              {/* Product Variants Section */}
              <VariantCreation
                variants={newVariants}
                onVariantsChange={setNewVariants}
                className="product-variants-section"
              />
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseForm}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmitProduct}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Section Form Modal */}
      {showAddSectionForm && (
        <div className="modal-overlay" onClick={handleCloseSectionForm}>
          <div className="section-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="section-modal-header">
              <div className="section-modal-title">
                <h2>Create New Section</h2>
              </div>
              <button className="section-close-btn" onClick={handleCloseSectionForm}>
                <span>×</span>
              </button>
            </div>
            
            <div className="section-modal-body">
              <div className="section-description">
                <p>Add a new section to organize your products. Sections can be dragged and dropped between products.</p>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleCreateSection(); }} className="section-form">
                <div className="section-form-group">
                  <label htmlFor="sectionName" className="section-label">
                    <span className="label-icon">🏷️</span>
                    Section Name
                  </label>
                  <input
                    type="text"
                    id="sectionName"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    placeholder="e.g., Featured Products, New Arrivals, Sale Items..."
                    required
                    autoFocus
                    className="section-input"
                  />
                  <div className="section-input-hint">
                    Choose a descriptive name that helps organize your products
                  </div>
                </div>
                
                <div className="section-form-actions">
                  <button type="button" className="section-cancel-btn" onClick={handleCloseSectionForm}>
                    <span className="btn-icon">↩️</span>
                    Cancel
                  </button>
                  <button type="submit" className="section-create-btn" disabled={!newSectionName.trim()}>
                    <span className="btn-icon">✨</span>
                    Create Section
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && deleteItem && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-content delete-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="close-btn" onClick={handleCancelDelete}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="delete-message">
                <div className="delete-icon">⚠️</div>
                <p>
                  Are you sure you want to delete <strong>"{deleteItem.name}"</strong>?
                </p>
                {deleteItem.type === 'product' && (
                  <p className="warning-text">
                    This will also delete all variants associated with this product.
                  </p>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="delete-confirm-btn" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagementPage;
