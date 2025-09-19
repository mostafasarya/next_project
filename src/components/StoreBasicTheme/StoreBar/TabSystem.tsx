'use client';

import React, { useState, useEffect } from 'react';
import { HiPlus, HiX, HiChevronDown, HiPencil } from 'react-icons/hi';
import { useGlobalDrawer } from '../../EditorControls/PropertiesManagement/GlobalDrawerProvider';

export type TabType = 'home' | 'collection' | 'catalog' | 'blank';

export interface SubTab {
  id: string;
  name: string;
  type: 'collection' | 'catalog';
  targetId?: string; // ID of the collection or catalog
}

export interface Tab {
  id: string;
  name: string;
  type: TabType;
  targetId?: string; // For collection/catalog tabs
  subTabs?: SubTab[]; // For blank tabs
  icon?: string; // Custom icon for the tab
  showIcon?: boolean; // Whether to show icon
  iconPosition?: 'left' | 'right'; // Icon position
}

interface TabSystemProps {
  activeTab: string;
  onTabChange: (tabId: string, subTabId?: string) => void;
  isMobile?: boolean;
  customStyles?: {
    fontSize: number;
    fontFamily: string;
    color: string;
    fontWeight: string;
    textAlign: string;
  };
  backgroundType?: 'solid' | 'gradient';
  solidColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
}

const TabSystem: React.FC<TabSystemProps> = ({
  activeTab,
  onTabChange,
  isMobile = false,
  customStyles,
  backgroundType,
  solidColor,
  gradientStart,
  gradientEnd
}) => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'home',
      name: 'Home',
      type: 'home',
      icon: '🏠',
      showIcon: true,
      iconPosition: 'left'
    }
  ]);
  const [showAddTabModal, setShowAddTabModal] = useState(false);
  const [showSubTabModal, setShowSubTabModal] = useState<string | null>(null);
  const [expandedTabs, setExpandedTabs] = useState<Set<string>>(new Set());
  
  // Tab management drawer state
  const [selectedTabForManagement, setSelectedTabForManagement] = useState<Tab | null>(null);
  const [tempTabName, setTempTabName] = useState('');
  const [tempTabIcon, setTempTabIcon] = useState('');
  const [tempShowIcon, setTempShowIcon] = useState(true);
  const [tempIconPosition, setTempIconPosition] = useState<'left' | 'right'>('left');
  
  const { openDrawer, closeDrawer } = useGlobalDrawer();

  // Available icon options for each tab type
  const tabIconOptions = {
    home: ['🏠', '🏡', '🏘️', '🏛️', '⌂'],
    collection: ['📚', '📂', '📁', '🗂️', '📊', '📋', '🎯'],
    catalog: ['📖', '📝', '📄', '🗒️', '📰', '📑', '🗓️'],
    blank: ['📄', '📝', '⭐', '🔥', '💎', '🎨', '✨']
  };

  // Load tabs from localStorage
  useEffect(() => {
    const savedTabs = localStorage.getItem('storeTabs');
    if (savedTabs) {
      try {
        const parsedTabs = JSON.parse(savedTabs);
        setTabs(parsedTabs);
      } catch (error) {
        console.error('Error loading tabs:', error);
      }
    }
  }, []);

  // Save tabs to localStorage
  const saveTabs = (newTabs: Tab[]) => {
    setTabs(newTabs);
    localStorage.setItem('storeTabs', JSON.stringify(newTabs));
  };

  // Load collections and catalogs for dropdown options
  const [collections, setCollections] = useState<any[]>([]);
  const [catalogs, setCatalogs] = useState<any[]>([]);

  useEffect(() => {
    // Load collections
    const savedCollections = localStorage.getItem('collections');
    if (savedCollections) {
      try {
        setCollections(JSON.parse(savedCollections));
      } catch (error) {
        console.error('Error loading collections:', error);
      }
    } else {
      // Add dummy collections if none exist
      const dummyCollections = [
        {
          id: 'collection-1',
          name: 'Summer Collection',
          description: 'Fresh summer styles and accessories',
          productCount: 12
        },
        {
          id: 'collection-2',
          name: 'Winter Essentials',
          description: 'Cozy winter clothing and accessories',
          productCount: 8
        },
        {
          id: 'collection-3',
          name: 'Accessories',
          description: 'Beautiful accessories for every occasion',
          productCount: 15
        },
        {
          id: 'collection-4',
          name: 'New Arrivals',
          description: 'Latest products just added to our store',
          productCount: 6
        }
      ];
      setCollections(dummyCollections);
      localStorage.setItem('collections', JSON.stringify(dummyCollections));
    }

    // Load catalogs
    const savedCatalogPages = localStorage.getItem('catalogPages');
    if (savedCatalogPages) {
      try {
        setCatalogs(JSON.parse(savedCatalogPages));
      } catch (error) {
        console.error('Error loading catalogs:', error);
      }
    } else {
      // Add dummy catalogs if none exist
      const dummyCatalogs = [
        {
          id: 'catalog-1',
          name: 'Main Catalog',
          slug: 'main-catalog',
          description: 'Our complete product catalog',
          productCount: 25
        },
        {
          id: 'catalog-2',
          name: 'Sale Items',
          slug: 'sale-items',
          description: 'Discounted products and special offers',
          productCount: 10
        },
        {
          id: 'catalog-3',
          name: 'Featured Products',
          slug: 'featured-products',
          description: 'Hand-picked featured items',
          productCount: 8
        },
        {
          id: 'catalog-4',
          name: 'Best Sellers',
          slug: 'best-sellers',
          description: 'Our most popular products',
          productCount: 12
        }
      ];
      setCatalogs(dummyCatalogs);
      localStorage.setItem('catalogPages', JSON.stringify(dummyCatalogs));
    }
  }, []);

  const addTab = (type: TabType, name: string, targetId?: string) => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      name,
      type,
      targetId,
      subTabs: type === 'blank' ? [] : undefined,
      icon: getTabIcon(type),
      showIcon: true,
      iconPosition: 'left'
    };

    const updatedTabs = [...tabs, newTab];
    saveTabs(updatedTabs);
    setShowAddTabModal(false);
  };

  const deleteTab = (tabId: string) => {
    if (tabId === 'home') return; // Can't delete home tab
    
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    saveTabs(updatedTabs);
    
    // If deleted tab was active, switch to home
    if (activeTab === tabId) {
      onTabChange('home');
    }
  };


  const addSubTab = (parentTabId: string, type: 'collection' | 'catalog', name: string, targetId: string) => {
    const newSubTab: SubTab = {
      id: `subtab-${Date.now()}`,
      name,
      type,
      targetId
    };

    const updatedTabs = tabs.map(tab => 
      tab.id === parentTabId 
        ? { ...tab, subTabs: [...(tab.subTabs || []), newSubTab] }
        : tab
    );
    saveTabs(updatedTabs);
    setShowSubTabModal(null);
  };

  const deleteSubTab = (parentTabId: string, subTabId: string) => {
    const updatedTabs = tabs.map(tab => 
      tab.id === parentTabId 
        ? { ...tab, subTabs: tab.subTabs?.filter(subTab => subTab.id !== subTabId) }
        : tab
    );
    saveTabs(updatedTabs);
  };

  const toggleTabExpansion = (tabId: string) => {
    const newExpanded = new Set(expandedTabs);
    if (newExpanded.has(tabId)) {
      newExpanded.delete(tabId);
    } else {
      newExpanded.add(tabId);
    }
    setExpandedTabs(newExpanded);
  };

  const getTabIcon = (type: TabType, customIcon?: string) => {
    if (customIcon) return customIcon;
    
    switch (type) {
      case 'home': return '🏠';
      case 'collection': return '📂';
      case 'catalog': return '📋';
      case 'blank': return '📄';
      default: return '📄';
    }
  };


  // Generate background style matching the store bar
  const getTabBackground = () => {
    if (backgroundType === 'gradient' && gradientStart && gradientEnd) {
      return `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`;
    } else if (backgroundType === 'solid' && solidColor) {
      return solidColor;
    }
    return 'transparent'; // Fallback
  };

  // Create the drawer content component
  const TabManagementDrawerContent = () => (
    <div className="tab-management-drawer">
      <h3 className="drawer-title">Tab Management</h3>
      
      {/* Tab Selection */}
      <div className="management-section">
        <h4 className="section-title">Select Tab to Edit</h4>
        <div className="tab-selection-grid">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-selection-btn ${selectedTabForManagement?.id === tab.id ? 'active' : ''}`}
              onClick={() => {
                console.log('Tab selected:', tab.name); // Debug log
                setSelectedTabForManagement(tab);
                setTempTabName(tab.name);
                setTempTabIcon(tab.icon || getTabIcon(tab.type));
                setTempShowIcon(tab.showIcon !== false);
                setTempIconPosition(tab.iconPosition || 'left');
              }}
            >
              <span className="tab-preview-icon">{getTabIcon(tab.type, tab.icon)}</span>
              <span className="tab-preview-name">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedTabForManagement && (
        <>
          {/* Rename Tab */}
          <div className="management-section">
            <h4 className="section-title">Tab Name</h4>
            <input
              type="text"
              className="tab-name-input"
              value={tempTabName}
              onChange={(e) => setTempTabName(e.target.value)}
              placeholder="Enter tab name"
            />
          </div>

          {/* Icon Controls */}
          <div className="management-section">
            <h4 className="section-title">Icon Settings</h4>
            
            {/* Show Icon Toggle */}
            <div className="control-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={tempShowIcon}
                  onChange={(e) => setTempShowIcon(e.target.checked)}
                />
                <span>Show Icon</span>
              </label>
            </div>

            {tempShowIcon && (
              <>
                {/* Icon Selection */}
                <div className="control-group">
                  <label className="control-label">Choose Icon</label>
                  <div className="icon-selection-grid">
                    {tabIconOptions[selectedTabForManagement.type]?.map((icon, index) => (
                      <button
                        key={index}
                        className={`icon-option-btn ${tempTabIcon === icon ? 'active' : ''}`}
                        onClick={() => setTempTabIcon(icon)}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icon Position */}
                <div className="control-group">
                  <label className="control-label">Icon Position</label>
                  <div className="position-buttons">
                    <button
                      className={`position-btn ${tempIconPosition === 'left' ? 'active' : ''}`}
                      onClick={() => setTempIconPosition('left')}
                    >
                      📍 Left
                    </button>
                    <button
                      className={`position-btn ${tempIconPosition === 'right' ? 'active' : ''}`}
                      onClick={() => setTempIconPosition('right')}
                    >
                      Right 📍
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="management-actions">
            <button
              className="save-tab-btn"
              onClick={saveTabChanges}
            >
              Save Changes
            </button>
            
            {selectedTabForManagement.id !== 'home' && (
              <button
                className="delete-tab-btn"
                onClick={() => deleteTabFromManagement(selectedTabForManagement.id)}
              >
                Delete Tab
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );

  // Open tab management drawer
  const openTabManagementDrawer = () => {
    // Create a stable key for the drawer content
    const drawerKey = `tab-management-${selectedTabForManagement?.id || 'none'}`;
    
    openDrawer(
      'tab-management', 
      'Tab Management', 
      <TabManagementDrawerContent key={drawerKey} />, 
      400
    );
  };

  // Save tab changes
  const saveTabChanges = () => {
    if (!selectedTabForManagement) return;

    const updatedTabs = tabs.map(tab => 
      tab.id === selectedTabForManagement.id 
        ? { 
            ...tab, 
            name: tempTabName,
            icon: tempTabIcon,
            showIcon: tempShowIcon,
            iconPosition: tempIconPosition
          }
        : tab
    );

    saveTabs(updatedTabs);
    setSelectedTabForManagement(null);
    closeDrawer();
  };

  // Delete tab from management
  const deleteTabFromManagement = (tabId: string) => {
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    saveTabs(updatedTabs);
    setSelectedTabForManagement(null);
    closeDrawer();
  };


  return (
    <div 
      className={`dynamic-tab-system ${isMobile ? 'mobile-view' : ''}`}
      style={{
        fontSize: customStyles ? `${customStyles.fontSize}px` : undefined,
        fontFamily: customStyles?.fontFamily,
        color: customStyles?.color,
        fontWeight: customStyles?.fontWeight,
        textAlign: customStyles?.textAlign as any,
        background: getTabBackground(),
        position: 'relative'
      }}
    >
      {/* Edit Icon */}
      <button 
        className="tab-system-edit-btn"
        onClick={openTabManagementDrawer}
        title="Manage Tabs"
      >
        <HiPencil />
      </button>
      
      <div className={`store-nav-tabs ${isMobile ? 'mobile-nav-tabs' : ''}`}>
        {tabs.map((tab) => (
          <div key={tab.id} className="tab-container">
            <div className="main-tab">
              <button 
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''} icon-${tab.iconPosition || 'left'}`}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.showIcon !== false && tab.iconPosition !== 'right' && (
                  <span className="tab-icon">{getTabIcon(tab.type, tab.icon)}</span>
                )}
                <span className="tab-name">{tab.name}</span>
                {tab.showIcon !== false && tab.iconPosition === 'right' && (
                  <span className="tab-icon">{getTabIcon(tab.type, tab.icon)}</span>
                )}
                
                {tab.type === 'blank' && tab.subTabs && tab.subTabs.length > 0 && (
                  <button
                    className="expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTabExpansion(tab.id);
                    }}
                  >
                    <HiChevronDown className={expandedTabs.has(tab.id) ? 'expanded' : ''} />
                  </button>
                )}
              </button>
              
              {tab.id !== 'home' && (
                <div className="tab-controls">
                  <button
                    className="tab-control-btn delete-btn"
                    onClick={() => deleteTab(tab.id)}
                    title="Delete tab"
                  >
                    <HiX />
                  </button>
                </div>
              )}
            </div>

            {/* SubTabs for blank tabs */}
            {tab.type === 'blank' && expandedTabs.has(tab.id) && (
              <div className="subtabs-container">
                {tab.subTabs?.map((subTab) => (
                  <div key={subTab.id} className="subtab">
                    <button 
                      className={`nav-subtab ${activeTab === `${tab.id}-${subTab.id}` ? 'active' : ''}`}
                      onClick={() => onTabChange(tab.id, subTab.id)}
                    >
                      <span className="subtab-icon">{getTabIcon(subTab.type)}</span>
                      <span className="subtab-name">{subTab.name}</span>
                    </button>
                    <button
                      className="subtab-delete-btn"
                      onClick={() => deleteSubTab(tab.id, subTab.id)}
                      title="Delete subtab"
                    >
                      <HiX />
                    </button>
                  </div>
                ))}
                
                <button
                  className="add-subtab-btn"
                  onClick={() => setShowSubTabModal(tab.id)}
                  title="Add subtab"
                >
                  <HiPlus />
                  Add SubTab
                </button>
              </div>
            )}
          </div>
        ))}
        
        <button
          className="add-tab-btn"
          onClick={() => {
            console.log('Add Tab button clicked');
            console.log('Collections:', collections);
            console.log('Catalogs:', catalogs);
            setShowAddTabModal(true);
          }}
          title="Add new tab"
        >
          <HiPlus />
          Add Tab
        </button>
      </div>

      {/* Add Tab Modal */}
      {showAddTabModal && (
        <AddTabModal
          onAddTab={addTab}
          onClose={() => setShowAddTabModal(false)}
          collections={collections}
          catalogs={catalogs}
        />
      )}

      {/* Add SubTab Modal */}
      {showSubTabModal && (
        <AddSubTabModal
          parentTabId={showSubTabModal}
          onAddSubTab={addSubTab}
          onClose={() => setShowSubTabModal(null)}
          collections={collections}
          catalogs={catalogs}
        />
      )}
    </div>
  );
};

// Add Tab Modal Component
interface AddTabModalProps {
  onAddTab: (type: TabType, name: string, targetId?: string) => void;
  onClose: () => void;
  collections: any[];
  catalogs: any[];
}

const AddTabModal: React.FC<AddTabModalProps> = ({
  onAddTab,
  onClose,
  collections,
  catalogs
}) => {
  const [selectedType, setSelectedType] = useState<TabType>('blank');
  const [tabName, setTabName] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');

  // Debug logging
  console.log('AddTabModal rendered:', { collections, catalogs, selectedType, tabName, selectedTarget });

  // Auto-generate tab name based on selected collection/catalog
  const getAutoTabName = () => {
    if (selectedType === 'blank') {
      return tabName.trim() || 'New Tab';
    }
    
    if (selectedTarget) {
      const targetList = selectedType === 'collection' ? collections : catalogs;
      const selectedItem = targetList.find(item => item.id === selectedTarget);
      return selectedItem ? selectedItem.name : '';
    }
    
    return '';
  };

  const handleSubmit = () => {
    const finalTabName = getAutoTabName();
    if (!finalTabName) return;
    
    if (selectedType !== 'blank' && !selectedTarget) return;
    
    console.log('Submitting tab:', { selectedType, tabName: finalTabName, selectedTarget });
    
    onAddTab(
      selectedType,
      finalTabName,
      selectedTarget || undefined
    );
  };

  return (
    <div className="tab-system-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New Tab</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <HiX />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label>Tab Type</label>
            <div className="tab-type-options">
              <button
                className={`type-option ${selectedType === 'blank' ? 'active' : ''}`}
                onClick={() => setSelectedType('blank')}
              >
                📄 Blank Tab (with SubTabs)
              </button>
              <button
                className={`type-option ${selectedType === 'collection' ? 'active' : ''}`}
                onClick={() => setSelectedType('collection')}
              >
                📂 Collection Tab
              </button>
              <button
                className={`type-option ${selectedType === 'catalog' ? 'active' : ''}`}
                onClick={() => setSelectedType('catalog')}
              >
                📋 Catalog Tab
              </button>
            </div>
          </div>

          {selectedType === 'blank' && (
            <div className="form-group">
              <label>Tab Name</label>
              <input
                type="text"
                value={tabName}
                onChange={(e) => setTabName(e.target.value)}
                placeholder="Enter tab name"
                autoFocus
              />
            </div>
          )}

          {(selectedType === 'collection' || selectedType === 'catalog') && (
            <div className="form-group">
              <label>Select {selectedType === 'collection' ? 'Collection' : 'Catalog'}</label>
              <select
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
              >
                <option value="">Select {selectedType}...</option>
                {(selectedType === 'collection' ? collections : catalogs).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} {item.productCount ? `(${item.productCount} products)` : ''}
                  </option>
                ))}
              </select>
              {(selectedType === 'collection' ? collections : catalogs).length === 0 && (
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  No {selectedType}s available. Create some {selectedType}s first.
                </p>
              )}
              {selectedTarget && (
                <p style={{ fontSize: '12px', color: '#3b82f6', marginTop: '4px', fontWeight: '500' }}>
                  Tab name will be: "{(() => {
                    const targetList = selectedType === 'collection' ? collections : catalogs;
                    const selectedItem = targetList.find(item => item.id === selectedTarget);
                    return selectedItem ? selectedItem.name : '';
                  })()}"
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="create-btn" 
            onClick={handleSubmit}
            disabled={
              (selectedType === 'blank' && !tabName.trim()) ||
              ((selectedType === 'collection' || selectedType === 'catalog') && !selectedTarget)
            }
          >
            Add Tab
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

// Add SubTab Modal Component
interface AddSubTabModalProps {
  parentTabId: string;
  onAddSubTab: (parentTabId: string, type: 'collection' | 'catalog', name: string, targetId: string) => void;
  onClose: () => void;
  collections: any[];
  catalogs: any[];
}

const AddSubTabModal: React.FC<AddSubTabModalProps> = ({
  parentTabId,
  onAddSubTab,
  onClose,
  collections,
  catalogs
}) => {
  const [selectedType, setSelectedType] = useState<'collection' | 'catalog'>('collection');
  const [subTabName, setSubTabName] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');

  // Debug logging
  console.log('AddSubTabModal rendered:', { collections, catalogs, selectedType, subTabName, selectedTarget });

  // Auto-generate subtab name based on selected collection/catalog
  const getAutoSubTabName = () => {
    if (selectedTarget) {
      const targetList = selectedType === 'collection' ? collections : catalogs;
      const selectedItem = targetList.find(item => item.id === selectedTarget);
      return selectedItem ? selectedItem.name : '';
    }
    return '';
  };

  const handleSubmit = () => {
    const finalSubTabName = getAutoSubTabName();
    if (!finalSubTabName || !selectedTarget) return;
    
    console.log('Submitting subtab:', { parentTabId, selectedType, subTabName: finalSubTabName, selectedTarget });
    
    onAddSubTab(parentTabId, selectedType, finalSubTabName, selectedTarget);
  };

  return (
    <div className="tab-system-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add SubTab</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <HiX />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label>SubTab Type</label>
            <div className="tab-type-options">
              <button
                className={`type-option ${selectedType === 'collection' ? 'active' : ''}`}
                onClick={() => setSelectedType('collection')}
              >
                📂 Collection
              </button>
              <button
                className={`type-option ${selectedType === 'catalog' ? 'active' : ''}`}
                onClick={() => setSelectedType('catalog')}
              >
                📋 Catalog
              </button>
            </div>
          </div>


          <div className="form-group">
            <label>Select {selectedType === 'collection' ? 'Collection' : 'Catalog'}</label>
            <select
              value={selectedTarget}
              onChange={(e) => setSelectedTarget(e.target.value)}
            >
              <option value="">Select {selectedType}...</option>
              {(selectedType === 'collection' ? collections : catalogs).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} {item.productCount ? `(${item.productCount} products)` : ''}
                </option>
              ))}
            </select>
            {(selectedType === 'collection' ? collections : catalogs).length === 0 && (
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                No {selectedType}s available. Create some {selectedType}s first.
              </p>
            )}
            {selectedTarget && (
              <p style={{ fontSize: '12px', color: '#3b82f6', marginTop: '4px', fontWeight: '500' }}>
                SubTab name will be: "{(() => {
                  const targetList = selectedType === 'collection' ? collections : catalogs;
                  const selectedItem = targetList.find(item => item.id === selectedTarget);
                  return selectedItem ? selectedItem.name : '';
                })()}"
              </p>
            )}
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="create-btn" 
            onClick={handleSubmit}
            disabled={!selectedTarget}
          >
            Add SubTab
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TabSystem;
