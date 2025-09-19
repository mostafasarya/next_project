'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './CatalogManagement.css';

interface CatalogPage {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  description?: string;
}

const CatalogManagementPage: React.FC = () => {
  const router = useRouter();
  const [catalogPages, setCatalogPages] = useState<CatalogPage[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCatalogName, setNewCatalogName] = useState('');
  const [newCatalogDescription, setNewCatalogDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load catalog pages from localStorage
  useEffect(() => {
    const loadCatalogPages = () => {
      try {
        const savedCatalogPages = localStorage.getItem('catalogPages');
        if (savedCatalogPages) {
          const parsedPages = JSON.parse(savedCatalogPages).map((page: any) => ({
            ...page,
            createdAt: new Date(page.createdAt)
          }));
          setCatalogPages(parsedPages);
        }
      } catch (error) {
        console.error('Error loading catalog pages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCatalogPages();
  }, []);

  // Check for query parameter to open create modal
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showCreateModal') === 'true') {
      setShowCreateModal(true);
      // Clean up the URL by removing the query parameter
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  // Create slug from name
  const createSlugFromName = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Handle creating a new catalog page
  const handleCreateCatalogPage = () => {
    if (newCatalogName.trim()) {
      const slug = createSlugFromName(newCatalogName);
      
      // Check if slug already exists
      const existingPage = catalogPages.find(page => page.slug === slug);
      if (existingPage) {
        alert('A catalog page with this name already exists. Please choose a different name.');
        return;
      }

      const newCatalogPage: CatalogPage = {
        id: Date.now().toString(),
        name: newCatalogName.trim(),
        slug: slug,
        description: newCatalogDescription.trim() || undefined,
        createdAt: new Date()
      };

      const updatedPages = [...catalogPages, newCatalogPage];
      setCatalogPages(updatedPages);
      
      // Save to localStorage
      localStorage.setItem('catalogPages', JSON.stringify(updatedPages));
      
      // Reset form and close modal
      setNewCatalogName('');
      setNewCatalogDescription('');
      setShowCreateModal(false);
    }
  };

  // Handle deleting a catalog page
  const handleDeleteCatalogPage = (id: string) => {
    if (confirm('Are you sure you want to delete this catalog page? This action cannot be undone.')) {
      const updatedPages = catalogPages.filter(page => page.id !== id);
      setCatalogPages(updatedPages);
      localStorage.setItem('catalogPages', JSON.stringify(updatedPages));
    }
  };

  // Navigate to catalog page
  const handleViewCatalog = (slug: string) => {
    router.push(`/catalog/${slug}`);
  };

  // Navigate to edit catalog (for future implementation)
  const handleEditCatalog = (id: string) => {
    // For now, just navigate to the catalog page
    const catalog = catalogPages.find(page => page.id === id);
    if (catalog) {
      router.push(`/catalog/${catalog.slug}`);
    }
  };

  if (isLoading) {
    return (
      <div className="catalog-management-page">
        <div className="loading-state">
          <p>Loading catalog pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog-management-page">
      {/* Header */}
      <div className="catalog-management-header">
        <div className="header-content">
          <button 
            className="back-btn"
            onClick={() => router.push('/Store-homepage')}
          >
            <span className="back-icon">←</span>
            Back to Design
          </button>
          <h1 className="page-title">Catalog Management</h1>
          <p className="page-description">
            Create and manage multiple catalog pages for your store. Each catalog page can have its own categories and products.
          </p>
        </div>
        <button 
          className="create-catalog-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <span className="btn-icon">+</span>
          Create Catalog Page
        </button>
      </div>

      {/* Catalog Pages Grid */}
      <div className="catalog-pages-section">
        {catalogPages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No Catalog Pages Yet</h3>
            <p>Create your first catalog page to start organizing your products into categories.</p>
            <button 
              className="create-first-btn"
              onClick={() => setShowCreateModal(true)}
            >
              Create Your First Catalog Page
            </button>
          </div>
        ) : (
          <div className="catalog-pages-grid">
            {catalogPages.map((catalog) => (
              <div key={catalog.id} className="catalog-page-card">
                <div className="card-header">
                  <h3 className="catalog-name">{catalog.name}</h3>
                  <div className="card-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEditCatalog(catalog.id)}
                      title="Edit Catalog"
                    >
                      ✏️
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteCatalogPage(catalog.id)}
                      title="Delete Catalog"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                {catalog.description && (
                  <p className="catalog-description">{catalog.description}</p>
                )}
                
                <div className="card-meta">
                  <span className="catalog-slug">/{catalog.slug}</span>
                  <span className="creation-date">
                    Created {catalog.createdAt.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="card-footer">
                  <button 
                    className="view-catalog-btn"
                    onClick={() => handleViewCatalog(catalog.slug)}
                  >
                    View Catalog
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Catalog Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Create New Catalog Page</h2>
              <button 
                className="close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Catalog Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Summer Collection, Electronics, Fashion"
                  value={newCatalogName}
                  onChange={(e) => setNewCatalogName(e.target.value)}
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  className="form-textarea"
                  placeholder="Brief description of this catalog page..."
                  value={newCatalogDescription}
                  onChange={(e) => setNewCatalogDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              {newCatalogName.trim() && (
                <div className="url-preview">
                  <span className="preview-label">URL Preview:</span>
                  <span className="preview-url">/catalog/{createSlugFromName(newCatalogName)}</span>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setShowCreateModal(false);
                  setNewCatalogName('');
                  setNewCatalogDescription('');
                }}
              >
                Cancel
              </button>
              <button 
                className="create-btn"
                onClick={handleCreateCatalogPage}
                disabled={!newCatalogName.trim()}
              >
                Create Catalog Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogManagementPage;
