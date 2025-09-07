'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DesignStorePagesLayout from '../../../components/DesignStorePagesLayout';
import '../CatalogPage.css';

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

interface Category {
  id: string;
  name: string;
  icon: string;
  products: Product[];
}

interface CatalogPage {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
}

const DynamicCatalogPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [catalogPage, setCatalogPage] = useState<CatalogPage | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Load catalog page data
  useEffect(() => {
    const loadCatalogPage = () => {
      try {
        const savedCatalogPages = localStorage.getItem('catalogPages');
        if (savedCatalogPages) {
          const catalogPages: CatalogPage[] = JSON.parse(savedCatalogPages).map((page: any) => ({
            ...page,
            createdAt: new Date(page.createdAt)
          }));
          
          const foundPage = catalogPages.find(page => page.slug === slug);
          if (foundPage) {
            setCatalogPage(foundPage);
            loadMockData();
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading catalog page:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadCatalogPage();
    }
  }, [slug]);

  // Mock data for products and categories
  const loadMockData = () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Classic Hat',
        category: 'hats',
        image: '🦴',
        images: ['🦴', '👒', '🎩'],
        description: 'Stylish and comfortable hat for all occasions. Made with premium materials for lasting comfort.',
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
        name: 'Elegant Trouser',
        category: 'pants',
        image: '🦴',
        images: ['🦴', '👖', '👗'],
        description: 'Elegant trousers perfect for professional and casual wear. Features a modern fit and premium fabric.',
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
        name: 'Premium Shirt',
        category: 'shirts',
        image: '🦴',
        images: ['🦴', '👕', '🎽'],
        description: 'Classic shirt design with modern comfort. Perfect for any professional or casual setting.',
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
      },
      {
        id: '4',
        name: 'Casual Jacket',
        category: 'outerwear',
        image: '🦴',
        images: ['🦴', '🧥', '🥾'],
        description: 'Versatile jacket suitable for all seasons. Features multiple pockets and adjustable fit.',
        price: 79.99,
        beforePrice: 99.99,
        saveAmount: 20.00,
        count: 8,
        editCount: 0,
        ifSoldOut: 'keep selling',
        isTracking: true,
        variants: []
      },
      {
        id: '5',
        name: 'Summer Dress',
        category: 'dresses',
        image: '🦴',
        images: ['🦴', '👗', '🌺'],
        description: 'Light and breezy summer dress perfect for warm weather. Made with breathable fabric.',
        price: 45.99,
        beforePrice: 55.99,
        saveAmount: 10.00,
        count: 12,
        editCount: 0,
        ifSoldOut: 'keep selling',
        isTracking: true,
        variants: []
      }
    ];

    const mockCategories: Category[] = [
      {
        id: 'hats',
        name: 'Hats',
        icon: '👒',
        products: [mockProducts[0]]
      },
      {
        id: 'pants',
        name: 'Pants',
        icon: '👖',
        products: [mockProducts[1]]
      },
      {
        id: 'shirts',
        name: 'Shirts',
        icon: '👕',
        products: [mockProducts[2]]
      },
      {
        id: 'outerwear',
        name: 'Outerwear',
        icon: '🧥',
        products: [mockProducts[3]]
      },
      {
        id: 'dresses',
        name: 'Dresses',
        icon: '👗',
        products: [mockProducts[4]]
      }
    ];

    setCategories(mockCategories);
    setActiveTab(mockCategories[0].id);
  };

  const activeCategory = categories.find(cat => cat.id === activeTab);
  const filteredProducts = activeCategory?.products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleTabClick = (categoryId: string) => {
    setActiveTab(categoryId);
    setSearchTerm('');
  };

  if (loading) {
    return (
      <DesignStorePagesLayout 
        title="Loading..."
        showBackButton={true}
        backUrl="/catalog-management"
      >
        <div className="catalog-page">
          <div className="loading-state">
            <p>Loading catalog page...</p>
          </div>
        </div>
      </DesignStorePagesLayout>
    );
  }

  if (notFound || !catalogPage) {
    return (
      <DesignStorePagesLayout 
        title="Catalog Not Found"
        showBackButton={true}
        backUrl="/catalog-management"
      >
        <div className="catalog-page">
          <div className="not-found-state">
            <div className="not-found-icon">📋</div>
            <h2>Catalog Page Not Found</h2>
            <p>The catalog page you're looking for doesn't exist or may have been deleted.</p>
            <button 
              className="back-to-management-btn"
              onClick={() => router.push('/catalog-management')}
            >
              Back to Catalog Management
            </button>
          </div>
        </div>
      </DesignStorePagesLayout>
    );
  }

  return (
    <DesignStorePagesLayout 
      title={catalogPage.name}
      showBackButton={true}
      backUrl="/catalog-management"
    >
      <div className="catalog-page">
        {/* Hero Section with Image Container */}
        <div className="catalog-hero">
          <div className="hero-image-container">
            <div className="hero-image-placeholder">
              <span className="image-icon">📷</span>
              <p className="image-text">Add Cover Image</p>
            </div>
          </div>
          
          {/* Catalog Header */}
          <div className="catalog-header-section">
            <h1 className="catalog-title" contentEditable suppressContentEditableWarning={true}>
              {catalogPage.name}
            </h1>
            {catalogPage.description && (
              <p className="catalog-subtitle" contentEditable suppressContentEditableWarning={true}>
                {catalogPage.description}
              </p>
            )}
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="category-navigation">
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => handleTabClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="products-section">
          {activeCategory && (
            <div className="section-header">
              <h2 className="section-title">{activeCategory.name}</h2>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found in this category.</p>
            </div>
          ) : (
            <div className="products-list">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-content">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">
                      <span className="price">EGP {product.price}</span>
                    </div>
                  </div>
                  <div className="product-image">
                    <img 
                      src={product.images[0] || product.image} 
                      alt={product.name}
                      className="product-img"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DesignStorePagesLayout>
  );
};

export default DynamicCatalogPage;
