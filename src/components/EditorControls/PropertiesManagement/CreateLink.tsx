import React, { useState } from 'react';
import SystemDrawer from './SystemDrawer';

export interface LinkData {
  linkType: 'collection' | 'catalog' | 'page' | 'external';
  linkTarget: string;
}

export interface AvailablePage {
  id: string;
  name: string;
  slug: string;
}

export interface AvailablePages {
  collection: AvailablePage[];
  catalog: AvailablePage[];
  page: AvailablePage[];
}

interface CreateLinkProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  initialLinkData?: LinkData;
  onSave: (linkData: LinkData) => void;
  onRemove?: () => void;
  availablePages?: AvailablePages;
  width?: number;
  position?: 'left' | 'right';
  pushContent?: boolean;
}

const CreateLink: React.FC<CreateLinkProps> = ({
  isOpen,
  onClose,
  title = "Add Link",
  initialLinkData = { linkType: 'collection', linkTarget: '' },
  onSave,
  onRemove,
  availablePages,
  width = 350,
  position = 'right',
  pushContent = true
}) => {
  const [linkData, setLinkData] = useState<LinkData>(initialLinkData);

  // Default mock data if not provided
  const defaultAvailablePages: AvailablePages = {
    collection: [
      { id: '1', name: 'Summer Collection', slug: 'summer-collection' },
      { id: '2', name: 'Winter Collection', slug: 'winter-collection' },
      { id: '3', name: 'Spring Collection', slug: 'spring-collection' },
      { id: '4', name: 'Fall Collection', slug: 'fall-collection' }
    ],
    catalog: [
      { id: '1', name: 'Electronics Catalog', slug: 'electronics' },
      { id: '2', name: 'Fashion Catalog', slug: 'fashion' },
      { id: '3', name: 'Home & Garden Catalog', slug: 'home-garden' },
      { id: '4', name: 'Sports Catalog', slug: 'sports' }
    ],
    page: [
      { id: '1', name: 'About Us', slug: 'about' },
      { id: '2', name: 'Contact Page', slug: 'contact' },
      { id: '3', name: 'Privacy Policy', slug: 'privacy' },
      { id: '4', name: 'Terms of Service', slug: 'terms' },
      { id: '5', name: 'FAQ Page', slug: 'faq' }
    ]
  };

  const pages = availablePages || defaultAvailablePages;

  const handleSave = () => {
    onSave(linkData);
    onClose();
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
    setLinkData({ linkType: 'collection', linkTarget: '' });
    onClose();
  };

  return (
    <SystemDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      width={width}
      position={position}
      pushContent={pushContent}
    >
      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Link Type</h4>
        <div className="drawer-form-group">
          <select
            value={linkData.linkType}
            onChange={(e) => setLinkData(prev => ({ ...prev, linkType: e.target.value as any }))}
            className="drawer-select"
          >
            <option value="collection">Collection Page</option>
            <option value="catalog">Catalog Page</option>
            <option value="page">General Page</option>
            <option value="external">External URL</option>
          </select>
        </div>
      </div>

      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <h4 className="drawer-section-title">Link Target</h4>
        <div className="drawer-form-group">
          {linkData.linkType === 'external' ? (
            <input
              type="text"
              value={linkData.linkTarget}
              onChange={(e) => setLinkData(prev => ({ ...prev, linkTarget: e.target.value }))}
              placeholder="Full URL (e.g., https://example.com)"
              className="drawer-input"
            />
          ) : (
            <select
              value={linkData.linkTarget}
              onChange={(e) => setLinkData(prev => ({ ...prev, linkTarget: e.target.value }))}
              className="drawer-select"
            >
              <option value="">Select a {linkData.linkType}</option>
              {linkData.linkType === 'collection' && pages.collection.map(page => (
                <option key={page.id} value={page.slug}>
                  {page.name}
                </option>
              ))}
              {linkData.linkType === 'catalog' && pages.catalog.map(page => (
                <option key={page.id} value={page.slug}>
                  {page.name}
                </option>
              ))}
              {linkData.linkType === 'page' && pages.page.map(page => (
                <option key={page.id} value={page.slug}>
                  {page.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="drawer-section" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-form-group">
          <button
            onClick={handleSave}
            className="save-link-btn"
          >
            Save Link
          </button>
          {onRemove && (
            <button
              onClick={handleRemove}
              className="remove-link-btn"
            >
              Remove Link
            </button>
          )}
        </div>
      </div>
    </SystemDrawer>
  );
};

export default CreateLink;
