'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './AllProductsPage.css';

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

const AllProductsPage: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedItem, setDraggedItem] = useState<{ id: string; type: 'product'; index: number } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<{ id: string; type: 'product'; index: number } | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
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
    isTracking: true,
    variants: []
  });
  const [newVariants, setNewVariants] = useState<Partial<ProductVariant>[]>([
    { name: '', price: 0, beforePrice: 0, saveAmount: 0, count: 0, editCount: 0, ifSoldOut: 'keep selling', isTracking: true }
  ]);
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
            isTracking: true
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
            isTracking: true
          }
        ]
      }
    ];
    setProducts(mockProducts);
  }, []);

  const handleEditCount = (productId: string, variantId?: string, value: number) => {
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

  const handleIfSoldOutChange = (productId: string, variantId?: string, value: 'keep selling' | 'stop selling') => {
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
  const handleDragStart = (e: React.DragEvent, item: { id: string; type: 'product'; index: number }) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
  };

  const handleDragOver = (e: React.DragEvent, item: { id: string; type: 'product'; index: number }) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(item);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetItem: { id: string; type: 'product'; index: number }) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetItem.id) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

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

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
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
      isTracking: true,
      variants: []
    });
    setNewVariants([
      { name: '', price: 0, beforePrice: 0, saveAmount: 0, count: 0, editCount: 0, ifSoldOut: 'keep selling', isTracking: true }
    ]);
    setShowVariants(false);
    setShowAdvancedSettings(false);
  };

  const handleNewProductChange = (field: keyof Product, value: any) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleVariantChange = (index: number, field: keyof ProductVariant, value: any) => {
    setNewVariants(prev => 
      prev.map((variant, i) => 
        i === index ? { ...variant, [field]: value } : variant
      )
    );
  };

  const addVariant = () => {
    setNewVariants(prev => [...prev, { 
      name: '', 
      price: 0, 
      beforePrice: 0, 
      saveAmount: 0, 
      count: 0, 
      editCount: 0, 
      ifSoldOut: 'keep selling', 
      isTracking: true 
    }]);
  };

  const removeVariant = (index: number) => {
    setNewVariants(prev => prev.filter((_, i) => i !== index));
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

  const handleSubmitProduct = () => {
    const newId = (products.length + 1).toString();
    const productVariants: ProductVariant[] = newVariants
      .filter(variant => variant.name && variant.name.trim() !== '')
      .map((variant, index) => ({
        id: `${newId}-${index + 1}`,
        name: variant.name!,
        price: variant.price!,
        beforePrice: variant.beforePrice!,
        saveAmount: variant.saveAmount!,
        count: variant.count!,
        editCount: variant.editCount!,
        ifSoldOut: variant.ifSoldOut!,
        isTracking: variant.isTracking!
      }));

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

  // Calculate global product numbers
  let globalProductNumber = 1;

  return (
    <div className="all-products-page">
      {/* Header */}
      <div className="products-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => router.push('/design')}>
            <span className="back-icon">←</span>
            Back to Design
          </button>
          <h1 className="page-title">All Products</h1>
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
          <button className="add-product-btn" onClick={handleAddProduct}>
            <span className="add-icon">+</span>
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table">
        <div className="table-header">
          <div className="header-cell product-col">product</div>
          <div className="header-cell price-col">price</div>
          <div className="header-cell count-col">count</div>
          <div className="header-cell edit-col">Edit count</div>
          <div className="header-cell sold-out-col">If sold out</div>
          <div className="header-cell actions-col">Actions</div>
        </div>

        {filteredProducts.flatMap((product, index) => {
          const currentProductNumber = globalProductNumber++;
          const rows = [];
          
          // Add main product row
          rows.push(
            <div 
              key={product.id} 
              className={`product-row ${draggedItem?.id === product.id ? 'dragging' : ''} ${dragOverItem?.id === product.id ? 'drag-over' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, { id: product.id, type: 'product', index })}
              onDragOver={(e) => handleDragOver(e, { id: product.id, type: 'product', index })}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, { id: product.id, type: 'product', index })}
              onDragEnd={handleDragEnd}
            >
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
                <span 
                  className="product-name clickable"
                  onClick={() => router.push(`/product/${encodeURIComponent(product.name)}`)}
                >
                  {product.name}
                </span>
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
                      onChange={(e) => handleEditCount(product.id, undefined, parseInt(e.target.value) || 0)}
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
                      onClick={() => handleIfSoldOutChange(product.id, undefined, product.ifSoldOut === 'keep selling' ? 'stop selling' : 'keep selling')}
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
          product.variants.forEach((variant) => {
            const variantNumber = globalProductNumber++;
            rows.push(
              <div 
                key={variant.id} 
                className={`variant-row ${draggedItem?.id === variant.id ? 'dragging' : ''} ${dragOverItem?.id === variant.id ? 'drag-over' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, { id: variant.id, type: 'product', index: variantNumber })}
                onDragOver={(e) => handleDragOver(e, { id: variant.id, type: 'product', index: variantNumber })}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, { id: variant.id, type: 'product', index: variantNumber })}
                onDragEnd={handleDragEnd}
              >
                <div className="product-cell variant-cell">
                  <span className="product-number">{variant.id}</span>
                  <span className="variant-name">{variant.name}</span>
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
                    onChange={(e) => handleEditCount(product.id, variant.id, parseInt(e.target.value) || 0)}
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
                    onClick={() => handleIfSoldOutChange(product.id, variant.id, variant.ifSoldOut === 'keep selling' ? 'stop selling' : 'keep selling')}
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
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="image-upload-input"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="image-upload-label">
                        <span className="upload-icon">📁</span>
                        <span className="upload-text">Choose Images</span>
                      </label>
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

              <div className="form-section">
                <div className="section-header" onClick={() => setShowVariants(!showVariants)}>
                  <h3>Product Variants (Optional)</h3>
                  <span className={`toggle-icon ${showVariants ? 'expanded' : 'collapsed'}`}>▼</span>
                </div>
                {showVariants && (
                  <>
                    {newVariants.map((variant, index) => (
                  <div key={index} className="variant-form">
                    <div className="variant-header">
                      <h4>Variant {index + 1}</h4>
                      {newVariants.length > 1 && (
                        <button 
                          type="button" 
                          className="remove-variant-btn"
                          onClick={() => removeVariant(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Variant Name</label>
                        <input
                          type="text"
                          value={variant.name}
                          onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                          placeholder="e.g., small, medium, large"
                        />
                      </div>
                      <div className="form-group">
                        <label>Count</label>
                        <input
                          type="number"
                          value={variant.count}
                          onChange={(e) => handleVariantChange(index, 'count', parseInt(e.target.value) || 0)}
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={variant.price}
                          onChange={(e) => handleVariantChange(index, 'price', parseFloat(e.target.value) || 0)}
                          min="0"
                        />
                      </div>
                      <div className="form-group">
                        <label>Before Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={variant.beforePrice}
                          onChange={(e) => handleVariantChange(index, 'beforePrice', parseFloat(e.target.value) || 0)}
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Save Amount ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={variant.saveAmount}
                          onChange={(e) => handleVariantChange(index, 'saveAmount', parseFloat(e.target.value) || 0)}
                          min="0"
                        />
                      </div>
                      <div className="form-group">
                        <label>If Sold Out</label>
                        <select
                          value={variant.ifSoldOut}
                          onChange={(e) => handleVariantChange(index, 'ifSoldOut', e.target.value as 'keep selling' | 'stop selling')}
                        >
                          <option value="keep selling">Keep selling</option>
                          <option value="stop selling">Stop selling</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>
                          <input
                            type="checkbox"
                            checked={variant.isTracking}
                            onChange={(e) => handleVariantChange(index, 'isTracking', e.target.checked)}
                          />
                          Keep tracking
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button type="button" className="add-variant-btn" onClick={addVariant}>
                  + Add Variant
                </button>
                  </>
                )}
              </div>
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

export default AllProductsPage;
