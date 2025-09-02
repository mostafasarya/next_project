'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './CollectionsPage.css';

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
  variants: any[];
  count: number;
  editCount: number;
  ifSoldOut: 'keep selling' | 'stop selling';
  isTracking: boolean;
}

interface Collection {
  id: string;
  name: string;
  image: string;
  products: Product[];
  createdAt: Date;
}

const CollectionsPage: React.FC = () => {
  const router = useRouter();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollection, setNewCollection] = useState<Partial<Collection>>({
    name: '',
    image: '',
    products: []
  });
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Mock data for products (same as AllProductsPage)
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

    setAvailableProducts(mockProducts);

    // Mock collections data
    const mockCollections: Collection[] = [
      {
        id: '1',
        name: 'Summer Collection',
        image: '☀️',
        products: [mockProducts[0], mockProducts[1]],
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Winter Essentials',
        image: '❄️',
        products: [mockProducts[2]],
        createdAt: new Date('2024-01-20')
      }
    ];

    setCollections(mockCollections);
  }, []);

  const handleCreateCollection = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setNewCollection({
      name: '',
      image: '',
      products: []
    });
    setSelectedProducts([]);
  };

  const handleNewCollectionChange = (field: keyof Collection, value: any) => {
    setNewCollection(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setNewCollection(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSubmitCollection = () => {
    if (!newCollection.name || selectedProducts.length === 0) {
      alert('Please fill in collection name and select at least one product');
      return;
    }

    const selectedProductObjects = availableProducts.filter(product => 
      selectedProducts.includes(product.id)
    );

    const newCollectionData: Collection = {
      id: (collections.length + 1).toString(),
      name: newCollection.name!,
      image: newCollection.image!,
      products: selectedProductObjects,
      createdAt: new Date()
    };

    setCollections(prev => [...prev, newCollectionData]);
    handleCloseForm();
  };

  const handleDeleteCollection = (collectionId: string) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      setCollections(prev => prev.filter(collection => collection.id !== collectionId));
    }
  };

  return (
    <div className="collections-page">
      {/* Header */}
      <div className="collections-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => router.push('/design')}>
            <span className="back-icon">←</span>
            Back to Design
          </button>
          <h1 className="page-title">All Collections</h1>
        </div>
        <div className="header-right">
          <button className="create-collection-btn" onClick={handleCreateCollection}>
            <span className="add-icon">+</span>
            Create Collection
          </button>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="collections-grid">
        {collections.map((collection) => (
          <div 
            key={collection.id} 
            className="collection-card clickable"
            onClick={() => router.push(`/collection/${collection.id}`)}
          >
            <div className="collection-image">
              {collection.image.startsWith('data:image') ? (
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="collection-uploaded-image"
                />
              ) : (
                <span className="collection-icon">{collection.image}</span>
              )}
            </div>
            <div className="collection-info">
              <h3 className="collection-name">{collection.name}</h3>
              <p className="collection-products">
                {collection.products.length} product{collection.products.length !== 1 ? 's' : ''}
              </p>
              <p className="collection-date">
                Created {collection.createdAt.toLocaleDateString()}
              </p>
            </div>
            <div className="collection-actions" onClick={(e) => e.stopPropagation()}>
              <button className="edit-collection-btn" title="Edit Collection">
                ✏️
              </button>
              <button 
                className="delete-collection-btn" 
                title="Delete Collection"
                onClick={() => handleDeleteCollection(collection.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Collection Modal */}
      {showCreateForm && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Collection</h2>
              <button className="close-btn" onClick={handleCloseForm}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Collection Name</label>
                    <input
                      type="text"
                      value={newCollection.name}
                      onChange={(e) => handleNewCollectionChange('name', e.target.value)}
                      placeholder="Enter collection name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Collection Image</label>
                    <div className="image-upload-container">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="image-upload-input"
                        id="collection-image-upload"
                      />
                      <label htmlFor="collection-image-upload" className="image-upload-label">
                        {newCollection.image ? (
                          <div className="uploaded-image-preview">
                            <img 
                              src={newCollection.image} 
                              alt="Collection preview" 
                              className="collection-preview-image"
                            />
                            <button 
                              type="button" 
                              className="remove-image-btn"
                              onClick={() => setNewCollection(prev => ({ ...prev, image: '' }))}
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="upload-icon">📷</span>
                            <span className="upload-text">Click to upload image</span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Select Products</h3>
                  <div className="products-grid">
                    {availableProducts.map((product) => (
                      <div 
                        key={product.id} 
                        className={`product-item ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
                        onClick={() => handleProductSelection(product.id)}
                      >
                        <div className="product-image">
                          <img 
                            src={product.images[0] || product.image} 
                            alt={product.name}
                            className="product-thumbnail"
                          />
                        </div>
                        <div className="product-info">
                          <h4>{product.name}</h4>
                          <p>${product.price}</p>
                        </div>
                        <div className="selection-indicator">
                          {selectedProducts.includes(product.id) ? '✓' : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseForm}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmitCollection}>
                Create Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
