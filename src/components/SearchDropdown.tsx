'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
}

interface Collection {
  id: string;
  name: string;
  image: string;
  products: Product[];
}

interface Catalog {
  id: string;
  name: string;
  description?: string;
}

interface SearchResult {
  id: string;
  name: string;
  type: 'product' | 'collection' | 'catalog';
  image?: string;
  price?: number;
}

interface SearchDropdownProps {
  searchType: 'product' | 'collection' | 'catalog';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  searchType,
  value,
  onChange,
  placeholder = "Search...",
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [allItems, setAllItems] = useState<SearchResult[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load data from localStorage and mock data
  useEffect(() => {
    const loadData = () => {
      let items: SearchResult[] = [];

      try {
        if (searchType === 'product') {
          // Load products from localStorage or use mock data
          const savedProducts = localStorage.getItem('products');
          let products: Product[] = [];

          if (savedProducts) {
            products = JSON.parse(savedProducts);
          } else {
            // Mock products data
            products = [
              { id: '1', name: 'Classic Hat', category: 'hats', image: '🦴', price: 29.99 },
              { id: '2', name: 'Elegant Trouser', category: 'pants', image: '🦴', price: 49.99 },
              { id: '3', name: 'Premium Shirt', category: 'shirts', image: '🦴', price: 34.99 },
              { id: '4', name: 'Casual Jeans', category: 'pants', image: '🦴', price: 59.99 },
              { id: '5', name: 'Summer Dress', category: 'dresses', image: '🦴', price: 79.99 },
              { id: '6', name: 'Winter Jacket', category: 'jackets', image: '🦴', price: 129.99 },
              { id: '7', name: 'Running Shoes', category: 'shoes', image: '🦴', price: 89.99 },
              { id: '8', name: 'Leather Bag', category: 'accessories', image: '🦴', price: 119.99 }
            ];
          }

          items = products.map(p => ({
            id: p.id,
            name: p.name,
            type: 'product' as const,
            image: p.image,
            price: p.price
          }));

        } else if (searchType === 'collection') {
          // Load collections from localStorage or use mock data
          const savedCollections = localStorage.getItem('collections');
          let collections: Collection[] = [];

          if (savedCollections) {
            collections = JSON.parse(savedCollections);
          } else {
            // Mock collections data
            collections = [
              { id: '1', name: 'Summer Collection', image: '☀️', products: [] },
              { id: '2', name: 'Winter Collection', image: '❄️', products: [] },
              { id: '3', name: 'Spring Collection', image: '🌸', products: [] },
              { id: '4', name: 'Fall Collection', image: '🍂', products: [] },
              { id: '5', name: 'New Arrivals', image: '✨', products: [] },
              { id: '6', name: 'Best Sellers', image: '🔥', products: [] }
            ];
          }

          items = collections.map(c => ({
            id: c.id,
            name: c.name,
            type: 'collection' as const,
            image: c.image
          }));

        } else if (searchType === 'catalog') {
          // Load catalogs from localStorage or use mock data
          const savedCatalogs = localStorage.getItem('catalogs');
          let catalogs: Catalog[] = [];

          if (savedCatalogs) {
            catalogs = JSON.parse(savedCatalogs);
          } else {
            // Mock catalogs data
            catalogs = [
              { id: '1', name: 'Main Catalog', description: 'Primary product catalog' },
              { id: '2', name: 'Seasonal Catalog', description: 'Seasonal items and promotions' },
              { id: '3', name: 'Premium Catalog', description: 'High-end luxury items' },
              { id: '4', name: 'Sale Catalog', description: 'Discounted and sale items' },
              { id: '5', name: 'New Arrivals Catalog', description: 'Latest product additions' }
            ];
          }

          items = catalogs.map(c => ({
            id: c.id,
            name: c.name,
            type: 'catalog' as const
          }));
        }

        setAllItems(items);
        setResults(items.slice(0, 10)); // Show first 10 results by default
      } catch (error) {
        console.error(`Error loading ${searchType} data:`, error);
      }
    };

    loadData();
  }, [searchType]);

  // Filter results based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults(allItems.slice(0, 10));
    } else {
      const filtered = allItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered.slice(0, 10));
    }
  }, [searchTerm, allItems]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (item: SearchResult) => {
    onChange(item.id);
    setSearchTerm(`${item.name} (ID: ${item.id})`);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    
    // If user is typing an ID directly, update the value
    if (newValue.match(/^[a-zA-Z0-9-_]+$/)) {
      onChange(newValue);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  // Set initial search term if value is provided
  useEffect(() => {
    if (value && !searchTerm) {
      const item = allItems.find(item => item.id === value);
      if (item) {
        setSearchTerm(`${item.name} (ID: ${item.id})`);
      } else {
        setSearchTerm(value);
      }
    }
  }, [value, allItems, searchTerm]);

  return (
    <div className={`search-dropdown ${className}`} ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        className="drawer-form-input"
      />
      
      {isOpen && results.length > 0 && (
        <div className="search-dropdown-results">
          {results.map((item) => (
            <button
              key={item.id}
              className="search-result-item"
              onClick={() => handleSelect(item)}
              type="button"
            >
              <div className="search-result-content">
                {item.image && <span className="search-result-image">{item.image}</span>}
                <div className="search-result-text">
                  <div className="search-result-name">{item.name}</div>
                  <div className="search-result-id">ID: {item.id}</div>
                  {item.price && <div className="search-result-price">${item.price}</div>}
                </div>
              </div>
            </button>
          ))}
          {results.length === 0 && searchTerm && (
            <div className="search-no-results">
              No {searchType}s found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
