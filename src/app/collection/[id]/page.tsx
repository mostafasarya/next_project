'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import './CollectionDetailPage.css';

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

const CollectionDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for collections and products
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

    const collectionId = params.id as string;
    const foundCollection = mockCollections.find(c => c.id === collectionId);
    
    if (foundCollection) {
      setCollection(foundCollection);
    } else {
      // Handle collection not found
      router.push('/collections');
    }
  }, [params.id, router]);

  const filteredProducts = collection?.products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (!collection) {
    return (
      <div className="collection-detail-page">
        <div className="loading">Loading collection...</div>
      </div>
    );
  }

  return (
    <div className="collection-detail-page">
      {/* Header */}
      <div className="collection-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => router.push('/collections')}>
            <span className="back-icon">←</span>
            Back to Collections
          </button>
        </div>
        <div className="header-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        <h2 className="section-title">Products in this Collection</h2>
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found matching your search.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.images[0] || product.image} 
                    alt={product.name}
                    className="product-thumbnail"
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-price">
                    <span className="current-price">${product.price}</span>
                    {product.beforePrice > product.price && (
                      <span className="before-price">${product.beforePrice}</span>
                    )}
                  </div>
                  <div className="product-meta">
                    <span className="product-id">ID: {product.id}</span>
                    <span className="product-stock">Stock: {product.count}</span>
                  </div>
                </div>
                <div className="product-actions">
                  <button 
                    className="view-product-btn"
                    onClick={() => router.push(`/product/${encodeURIComponent(product.name)}`)}
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetailPage;
