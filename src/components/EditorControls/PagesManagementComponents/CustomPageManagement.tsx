'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './CustomPageManagement.css';

interface CustomPage {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  description?: string;
}

const CustomPageManagement: React.FC = () => {
  const router = useRouter();
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newPageDescription, setNewPageDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load custom pages from localStorage
  useEffect(() => {
    const loadCustomPages = () => {
      try {
        const savedCustomPages = localStorage.getItem('customPages');
        if (savedCustomPages) {
          const parsedPages = JSON.parse(savedCustomPages).map((page: any) => ({
            ...page,
            createdAt: new Date(page.createdAt)
          }));
          setCustomPages(parsedPages);
        }
      } catch (error) {
        console.error('Error loading custom pages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomPages();
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

  // Save custom pages to localStorage
  const saveCustomPages = (pages: CustomPage[]) => {
    try {
      localStorage.setItem('customPages', JSON.stringify(pages));
    } catch (error) {
      console.error('Error saving custom pages:', error);
    }
  };

  // Create new custom page
  const handleCreatePage = () => {
    if (!newPageName.trim()) return;

    const slug = createSlugFromName(newPageName);
    const newPage: CustomPage = {
      id: Date.now().toString(),
      name: newPageName.trim(),
      slug: slug,
      createdAt: new Date(),
      description: newPageDescription.trim() || undefined
    };

    const updatedPages = [...customPages, newPage];
    setCustomPages(updatedPages);
    saveCustomPages(updatedPages);

    // Reset form
    setNewPageName('');
    setNewPageDescription('');
    setShowCreateModal(false);

    // Navigate to the new page
    router.push(`/custom-page/${slug}`);
  };

  // Delete custom page
  const handleDeletePage = (pageId: string) => {
    if (confirm('Are you sure you want to delete this custom page?')) {
      const updatedPages = customPages.filter(page => page.id !== pageId);
      setCustomPages(updatedPages);
      saveCustomPages(updatedPages);
    }
  };

  // Navigate to custom page
  const handleNavigateToPage = (slug: string) => {
    router.push(`/custom-page/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="custom-page-management">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading custom pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-page-management">
      <div className="management-header">
        <div className="header-content">
          <h1 className="management-title">Custom Pages Management</h1>
          <p className="management-description">
            Create and manage custom pages for your store
          </p>
        </div>
        <button 
          className="create-page-btn"
          onClick={() => setShowCreateModal(true)}
        >
          + Create New Page
        </button>
      </div>

      <div className="pages-grid">
        {customPages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <h3>No Custom Pages Yet</h3>
            <p>Create your first custom page to get started</p>
            <button 
              className="create-first-page-btn"
              onClick={() => setShowCreateModal(true)}
            >
              Create Your First Page
            </button>
          </div>
        ) : (
          customPages.map((page) => (
            <div key={page.id} className="page-card">
              <div className="page-card-header">
                <h3 className="page-card-title">{page.name}</h3>
                <div className="page-card-actions">
                  <button
                    className="view-page-btn"
                    onClick={() => handleNavigateToPage(page.slug)}
                    title="View Page"
                  >
                    👁️
                  </button>
                  <button
                    className="delete-page-btn"
                    onClick={() => handleDeletePage(page.id)}
                    title="Delete Page"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              {page.description && (
                <p className="page-card-description">{page.description}</p>
              )}
              
              <div className="page-card-meta">
                <span className="page-slug">/{page.slug}</span>
                <span className="page-date">
                  Created {page.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Page Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Custom Page</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="pageName">Page Name *</label>
                <input
                  id="pageName"
                  type="text"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  placeholder="Enter page name"
                  autoFocus
                />
                {newPageName && (
                  <p className="slug-preview">
                    URL: /custom-page/{createSlugFromName(newPageName)}
                  </p>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="pageDescription">Description (Optional)</label>
                <textarea
                  id="pageDescription"
                  value={newPageDescription}
                  onChange={(e) => setNewPageDescription(e.target.value)}
                  placeholder="Brief description of this page"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button 
                className="create-btn"
                onClick={handleCreatePage}
                disabled={!newPageName.trim()}
              >
                Create Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPageManagement;
