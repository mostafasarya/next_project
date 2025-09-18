'use client';

import React, { useState, useEffect } from 'react';
import { HiPlus, HiX, HiChevronDown, HiCog, HiPencil } from 'react-icons/hi';
import { useGlobalDrawer } from '../../EditorControls/GlobalDrawerProvider';
import './TabsStoreBar.css';

export type TabType = 'home' | 'collection' | 'catalog' | 'general' | 'blank';

export interface SubTab {
  id: string;
  name: string;
  type: 'collection' | 'catalog' | 'general';
  targetId?: string;
}

export interface Tab {
  id: string;
  name: string;
  type: TabType;
  targetId?: string;
  subTabs?: SubTab[];
  icon?: string;
  showIcon?: boolean;
  iconPosition?: 'left' | 'right';
}

interface TabsStoreBarProps {
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

const TabsStoreBar: React.FC<TabsStoreBarProps> = ({
  activeTab,
  onTabChange,
  isMobile = false,
  customStyles,
  backgroundType = 'solid',
  solidColor = '#ffffff',
  gradientStart = '#ffffff',
  gradientEnd = '#ffffff'
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
  const [layoutMode, setLayoutMode] = useState<'inline' | 'double-row'>('inline');
  
  // Tab styles state
  const [tabStyles, setTabStyles] = useState({
    fontSize: 14,
    fontFamily: 'Arial',
    color: '#333333',
    fontWeight: 'normal',
    textAlign: 'left'
  });

  const { openDrawer, closeDrawer } = useGlobalDrawer();


  // Available icon options for each tab type
  const tabIconOptions = {
    home: ['🏠', '🏡', '🏘️', '🏛️', '⌂'],
    collection: ['📚', '📂', '📁', '🗂️', '📊', '📋', '🎯'],
    catalog: ['📖', '📝', '📄', '🗒️', '📰', '📑', '🗓️'],
    general: ['📄', '📋', '📝', '🗞️', '📰', '📜', '🗂️'],
    blank: ['📄', '📝', '⭐', '🔥', '💎', '🎨', '✨']
  };

  // Load saved data from localStorage
  useEffect(() => {
    const savedTabs = localStorage.getItem('storeBarTabs');
    if (savedTabs) {
      try {
        const parsedTabs = JSON.parse(savedTabs);
        // Ensure blank tabs have subTabs array initialized
        const migratedTabs = parsedTabs.map((tab: Tab) => {
          if (tab.type === 'blank' && !tab.subTabs) {
            return { ...tab, subTabs: [] };
          }
          return tab;
        });
        setTabs(migratedTabs);
        // Save migrated tabs back to localStorage if any changes were made
        const hasChanges = migratedTabs.some((tab: Tab, index: number) => 
          tab.type === 'blank' && !parsedTabs[index].subTabs
        );
        if (hasChanges) {
          localStorage.setItem('storeBarTabs', JSON.stringify(migratedTabs));
        }
      } catch (error) {
        console.error('Error loading tabs:', error);
      }
    }

    const savedLayout = localStorage.getItem('storeBarTabsLayout');
    if (savedLayout) {
      setLayoutMode(savedLayout as 'inline' | 'double-row');
    }

    const savedStyles = localStorage.getItem('storeBarTabsStyles');
    if (savedStyles) {
      try {
        setTabStyles(JSON.parse(savedStyles));
      } catch (error) {
        console.error('Error loading tab styles:', error);
      }
    }
  }, []);

  // Save functions
  const saveTabs = (newTabs: Tab[]) => {
    setTabs(newTabs);
    localStorage.setItem('storeBarTabs', JSON.stringify(newTabs));
  };

  const saveLayout = (newLayout: 'inline' | 'double-row') => {
    setLayoutMode(newLayout);
    localStorage.setItem('storeBarTabsLayout', newLayout);
  };

  const saveTabStyles = (newStyles: typeof tabStyles) => {
    setTabStyles(newStyles);
    localStorage.setItem('storeBarTabsStyles', JSON.stringify(newStyles));
  };

  // Tab management functions
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

    saveTabs([...tabs, newTab]);
    setShowAddTabModal(false);
  };

  const deleteTab = (tabId: string) => {
    if (tabId === 'home') return; // Can't delete home tab
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    saveTabs(updatedTabs);
  };

  const updateTab = (tabId: string, updates: Partial<Tab>) => {
    const updatedTabs = tabs.map(tab =>
      tab.id === tabId ? { ...tab, ...updates } : tab
    );
    saveTabs(updatedTabs);
  };

  const reorderTabs = (fromIndex: number, toIndex: number) => {
    const newTabs = [...tabs];
    const [removed] = newTabs.splice(fromIndex, 1);
    newTabs.splice(toIndex, 0, removed);
    saveTabs(newTabs);
  };

  const addSubTab = (parentTabId: string, name: string, type: 'collection' | 'catalog' | 'general', targetId?: string) => {
    const newSubTab: SubTab = {
      id: `subtab-${Date.now()}`,
      name,
      type,
      targetId
    };

    const updatedTabs = tabs.map(tab => {
      if (tab.id === parentTabId) {
        // Initialize subTabs array if it doesn't exist (for blank tabs)
        const currentSubTabs = tab.subTabs || [];
        return { ...tab, subTabs: [...currentSubTabs, newSubTab] };
      }
      return tab;
    });

    saveTabs(updatedTabs);
    setShowSubTabModal(null);
  };

  const deleteSubTab = (parentTabId: string, subTabId: string) => {
    const updatedTabs = tabs.map(tab => {
      if (tab.id === parentTabId && tab.subTabs) {
        return { ...tab, subTabs: tab.subTabs.filter(st => st.id !== subTabId) };
      }
      return tab;
    });
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
      case 'general': return '📄';
      case 'blank': return '📝';
      default: return '📄';
    }
  };

  // Open settings drawer
  const openSettingsDrawer = () => {
    const SettingsDrawerContent = () => (
      <div className="tabs-settings-drawer">
        <h3 className="drawer-title">Tab Settings</h3>
        
        {/* Layout Mode Toggle */}
        <div className="settings-section">
          <h4 className="section-title">Layout Mode</h4>
          <div className="layout-mode-toggle">
            <button
              className={`mode-btn ${layoutMode === 'inline' ? 'active' : ''}`}
              onClick={() => saveLayout('inline')}
            >
              Single Row
            </button>
            <button
              className={`mode-btn ${layoutMode === 'double-row' ? 'active' : ''}`}
              onClick={() => saveLayout('double-row')}
            >
              Double Row
            </button>
          </div>
        </div>

        {/* Tab Management */}
        <div className="settings-section">
          <h4 className="section-title">Manage Tabs</h4>
          <div className="tabs-list">
            {tabs.map((tab, index) => (
              <div key={tab.id} className="tab-item">
                <div className="tab-info">
                  <span className="tab-icon">{getTabIcon(tab.type, tab.icon)}</span>
                  <span className="tab-name">{tab.name}</span>
                </div>
                <div className="tab-actions">
                  <button 
                    className="action-btn rename-btn"
                    onClick={() => {
                      const newName = prompt('Enter new tab name:', tab.name);
                      if (newName && newName.trim()) {
                        updateTab(tab.id, { name: newName.trim() });
                      }
                    }}
                  >
                    Rename
                  </button>
                  {tab.id !== 'home' && (
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => deleteTab(tab.id)}
                    >
                      Delete
                    </button>
                  )}
                  <button 
                    className="action-btn move-up-btn"
                    onClick={() => index > 0 && reorderTabs(index, index - 1)}
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <button 
                    className="action-btn move-down-btn"
                    onClick={() => index < tabs.length - 1 && reorderTabs(index, index + 1)}
                    disabled={index === tabs.length - 1}
                  >
                    ↓
                  </button>
                  {tab.type === 'blank' && (
                    <button 
                      className="action-btn subtabs-btn"
                      onClick={() => setShowSubTabModal(tab.id)}
                    >
                      + SubTab
                    </button>
                  )}
                </div>
                
                {/* Show existing subtabs for blank tabs */}
                {tab.type === 'blank' && tab.subTabs && tab.subTabs.length > 0 && (
                  <div className="subtabs-list">
                    <h5 className="subtabs-title">SubTabs:</h5>
                    {tab.subTabs.map((subTab) => (
                      <div key={subTab.id} className="subtab-item-settings">
                        <div className="subtab-info">
                          <span className="subtab-icon">{getTabIcon(subTab.type)}</span>
                          <span className="subtab-name">{subTab.name}</span>
                          <span className="subtab-type">({subTab.type})</span>
                        </div>
                        <div className="subtab-actions">
                          <button
                            className="action-btn subtab-rename-btn"
                            onClick={() => {
                              const newName = prompt('Enter new subtab name:', subTab.name);
                              if (newName && newName.trim()) {
                                const updatedTabs = tabs.map(t => {
                                  if (t.id === tab.id && t.subTabs) {
                                    return {
                                      ...t,
                                      subTabs: t.subTabs.map(st =>
                                        st.id === subTab.id ? { ...st, name: newName.trim() } : st
                                      )
                                    };
                                  }
                                  return t;
                                });
                                saveTabs(updatedTabs);
                              }
                            }}
                          >
                            Rename
                          </button>
                          <button
                            className="action-btn subtab-delete-btn"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this subtab?')) {
                                deleteSubTab(tab.id, subTab.id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <button 
            className="add-new-tab-btn"
            onClick={() => setShowAddTabModal(true)}
          >
            + Add New Tab
          </button>
        </div>
      </div>
    );

    openDrawer('tabs-settings', 'Tab Settings', <SettingsDrawerContent />, 400);
  };

  // Open styling drawer
  const openStylingDrawer = () => {
    const StylingDrawerContent = () => (
      <div className="tabs-styling-drawer">
        <h3 className="drawer-title">Tab Styling</h3>
        
        <div className="styling-section">
          <div className="control-group">
            <label>Font Size</label>
            <input
              type="range"
              min="10"
              max="24"
              value={tabStyles.fontSize}
              onChange={(e) => saveTabStyles({ ...tabStyles, fontSize: Number(e.target.value) })}
            />
            <span>{tabStyles.fontSize}px</span>
          </div>

          <div className="control-group">
            <label>Font Family</label>
            <select
              value={tabStyles.fontFamily}
              onChange={(e) => saveTabStyles({ ...tabStyles, fontFamily: e.target.value })}
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>

          <div className="control-group">
            <label>Text Color</label>
            <input
              type="color"
              value={tabStyles.color}
              onChange={(e) => saveTabStyles({ ...tabStyles, color: e.target.value })}
            />
          </div>

          <div className="control-group">
            <label>Font Weight</label>
            <select
              value={tabStyles.fontWeight}
              onChange={(e) => saveTabStyles({ ...tabStyles, fontWeight: e.target.value })}
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="lighter">Lighter</option>
              <option value="bolder">Bolder</option>
            </select>
          </div>

          <div className="control-group">
            <label>Text Align</label>
            <select
              value={tabStyles.textAlign}
              onChange={(e) => saveTabStyles({ ...tabStyles, textAlign: e.target.value })}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      </div>
    );

    openDrawer('tabs-styling', 'Tab Styling', <StylingDrawerContent />, 350);
  };

  const appliedStyles = customStyles || tabStyles;

  return (
    <div 
      className={`tabs-store-bar ${isMobile ? 'mobile-view' : ''} ${layoutMode}`}
      style={{
        fontSize: `${appliedStyles.fontSize}px`,
        fontFamily: appliedStyles.fontFamily,
        color: appliedStyles.color,
        fontWeight: appliedStyles.fontWeight,
        textAlign: appliedStyles.textAlign as any,
        background: backgroundType === 'solid' 
          ? solidColor 
          : `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
        borderRadius: '8px',
        padding: '8px 12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      {!isMobile && (
        <div className="tabs-controls">
          <button 
            className="system-control-icon settings"
            onClick={openSettingsDrawer}
            title="Tab Settings"
          >
            <HiCog />
          </button>
          <button 
            className="system-control-icon edit"
            onClick={openStylingDrawer}
            title="Tab Styling"
          >
            <HiPencil />
          </button>
        </div>
      )}

      <div className="tabs-container">
        {tabs.map((tab) => (
          <div key={tab.id} className="tab-wrapper" data-tab-id={tab.id}>
            <button
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''} icon-${tab.iconPosition || 'left'}`}
              onClick={() => onTabChange(tab.id)}
              onMouseEnter={(e) => {
                if (tab.type === 'blank' && !isMobile) {
                  // Calculate position based on the tab button
                  const tabButton = e.currentTarget as HTMLElement;
                  const rect = tabButton.getBoundingClientRect();
                  const leftPosition = rect.left + (rect.width / 2);
                  console.log('Tab hover position calculation:', { rect, leftPosition, tabId: tab.id });
                  document.documentElement.style.setProperty('--dropdown-left', `${leftPosition}px`);
                  
                  setExpandedTabs(prev => new Set(prev).add(tab.id));
                }
              }}
              onMouseLeave={() => {
                if (tab.type === 'blank' && !isMobile) {
                  setTimeout(() => {
                    const dropdownElement = document.querySelector('.subtabs-container:hover');
                    if (!dropdownElement) {
                      setExpandedTabs(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(tab.id);
                        return newSet;
                      });
                    }
                  }, 100);
                }
              }}
            >
              {tab.showIcon !== false && tab.iconPosition !== 'right' && (
                <span className="tab-icon">{getTabIcon(tab.type, tab.icon)}</span>
              )}
              <span className="tab-name">{tab.name}</span>
              {tab.showIcon !== false && tab.iconPosition === 'right' && (
                <span className="tab-icon">{getTabIcon(tab.type, tab.icon)}</span>
              )}
            </button>
            
            {tab.type === 'blank' && (
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

            {/* SubTabs Dropdown */}
            {tab.type === 'blank' && expandedTabs.has(tab.id) && (
              <div 
                className="subtabs-container"
                onMouseEnter={() => {
                  // Keep dropdown open when hovering over it
                  if (!isMobile) {
                    setExpandedTabs(prev => new Set(prev).add(tab.id));
                  }
                }}
                onMouseLeave={() => {
                  // Close dropdown when leaving it
                  if (!isMobile) {
                    setTimeout(() => {
                      const tabButton = document.querySelector(`[data-tab-id="${tab.id}"]:hover`);
                      if (!tabButton) {
                        setExpandedTabs(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(tab.id);
                          return newSet;
                        });
                      }
                    }, 100);
                  }
                }}
              >
                  {(tab.subTabs || []).map((subTab) => (
                    <div key={subTab.id} className="subtab-item">
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
                  >
                    <HiPlus /> Add SubTab
                  </button>
              </div>
            )}
          </div>
        ))}
        
        <button
          className="add-tab-btn"
          onClick={() => setShowAddTabModal(true)}
          title="Add new tab"
        >
          <HiPlus />
        </button>
      </div>

      {/* Add Tab Modal */}
      {showAddTabModal && (
        <div className="modal-overlay" onClick={() => setShowAddTabModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Tab</h3>
              <button className="modal-close-btn" onClick={() => setShowAddTabModal(false)}>
                <HiX />
              </button>
            </div>
            <div className="modal-body">
              <AddTabForm 
                onSubmit={addTab}
                onCancel={() => setShowAddTabModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Add SubTab Modal */}
      {showSubTabModal && (
        <div className="modal-overlay" onClick={() => setShowSubTabModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add SubTab</h3>
              <button className="modal-close-btn" onClick={() => setShowSubTabModal(null)}>
                <HiX />
              </button>
            </div>
            <div className="modal-body">
              <AddSubTabForm 
                onSubmit={(name, type, targetId) => addSubTab(showSubTabModal, name, type, targetId)}
                onCancel={() => setShowSubTabModal(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add Tab Form Component
const AddTabForm: React.FC<{
  onSubmit: (type: TabType, name: string, targetId?: string) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [tabType, setTabType] = useState<TabType>('blank');
  const [tabName, setTabName] = useState('');
  const [targetId, setTargetId] = useState('');
  
  // Load available options for dropdowns
  const [collections, setCollections] = useState<any[]>([]);
  const [catalogPages, setCatalogPages] = useState<any[]>([]);
  const [customPages, setCustomPages] = useState<any[]>([]);

  useEffect(() => {
    // Load collections
    const loadCollections = () => {
      try {
        const savedCollections = localStorage.getItem('collections');
        if (savedCollections) {
          setCollections(JSON.parse(savedCollections));
        }
      } catch (error) {
        console.error('Error loading collections:', error);
      }
    };

    // Load catalog pages
    const loadCatalogPages = () => {
      try {
        const savedCatalogPages = localStorage.getItem('catalogPages');
        if (savedCatalogPages) {
          setCatalogPages(JSON.parse(savedCatalogPages));
        }
      } catch (error) {
        console.error('Error loading catalog pages:', error);
      }
    };

    // Load custom pages (general pages)
    const loadCustomPages = () => {
      try {
        const savedCustomPages = localStorage.getItem('customPages');
        if (savedCustomPages) {
          setCustomPages(JSON.parse(savedCustomPages));
        }
      } catch (error) {
        console.error('Error loading custom pages:', error);
      }
    };

    loadCollections();
    loadCatalogPages();
    loadCustomPages();
  }, []);

  // Reset targetId when tab type changes
  useEffect(() => {
    setTargetId('');
  }, [tabType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tabName.trim()) {
      onSubmit(tabType, tabName.trim(), targetId || undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-tab-form">
      <div className="form-group">
        <label>Tab Type</label>
        <select value={tabType} onChange={(e) => setTabType(e.target.value as TabType)}>
          <option value="collection">Collection Page</option>
          <option value="catalog">Catalog Page</option>
          <option value="general">General Page</option>
          <option value="blank">Blank Tab (with SubTabs)</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Tab Name</label>
        <input
          type="text"
          value={tabName}
          onChange={(e) => setTabName(e.target.value)}
          placeholder="Enter tab name"
          required
        />
      </div>
      
      {tabType === 'collection' && (
        <div className="form-group">
          <label>Select Collection</label>
          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          >
            <option value="">-- Select a Collection --</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
          {collections.length === 0 && (
            <p className="no-options-text">No collections available. Create a collection first.</p>
          )}
        </div>
      )}
      
      {tabType === 'catalog' && (
        <div className="form-group">
          <label>Select Catalog Page</label>
          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          >
            <option value="">-- Select a Catalog Page --</option>
            {catalogPages.map((catalog) => (
              <option key={catalog.id} value={catalog.id}>
                {catalog.name}
              </option>
            ))}
          </select>
          {catalogPages.length === 0 && (
            <p className="no-options-text">No catalog pages available. Create a catalog page first.</p>
          )}
        </div>
      )}
      
      {tabType === 'general' && (
        <div className="form-group">
          <label>Select Custom Page</label>
          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          >
            <option value="">-- Select a Custom Page --</option>
            {customPages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>
          {customPages.length === 0 && (
            <p className="no-options-text">No custom pages available. Create a custom page first.</p>
          )}
        </div>
      )}
      
      <div className="modal-footer">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="create-btn">
          Create Tab
        </button>
      </div>
    </form>
  );
};

// Add SubTab Form Component
const AddSubTabForm: React.FC<{
  onSubmit: (name: string, type: 'collection' | 'catalog' | 'general', targetId?: string) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [subTabType, setSubTabType] = useState<'collection' | 'catalog' | 'general'>('collection');
  const [subTabName, setSubTabName] = useState('');
  const [targetId, setTargetId] = useState('');

  // Load available options for dropdowns
  const [collections, setCollections] = useState<any[]>([]);
  const [catalogPages, setCatalogPages] = useState<any[]>([]);
  const [customPages, setCustomPages] = useState<any[]>([]);

  useEffect(() => {
    // Load collections
    const loadCollections = () => {
      try {
        const savedCollections = localStorage.getItem('collections');
        if (savedCollections) {
          setCollections(JSON.parse(savedCollections));
        }
      } catch (error) {
        console.error('Error loading collections:', error);
      }
    };

    // Load catalog pages
    const loadCatalogPages = () => {
      try {
        const savedCatalogPages = localStorage.getItem('catalogPages');
        if (savedCatalogPages) {
          setCatalogPages(JSON.parse(savedCatalogPages));
        }
      } catch (error) {
        console.error('Error loading catalog pages:', error);
      }
    };

    // Load custom pages (general pages)
    const loadCustomPages = () => {
      try {
        const savedCustomPages = localStorage.getItem('customPages');
        if (savedCustomPages) {
          setCustomPages(JSON.parse(savedCustomPages));
        }
      } catch (error) {
        console.error('Error loading custom pages:', error);
      }
    };

    loadCollections();
    loadCatalogPages();
    loadCustomPages();
  }, []);

  // Reset targetId when subtab type changes
  useEffect(() => {
    setTargetId('');
  }, [subTabType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subTabName.trim()) {
      onSubmit(subTabName.trim(), subTabType, targetId || undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-subtab-form">
      <div className="form-group">
        <label>SubTab Type</label>
        <select value={subTabType} onChange={(e) => setSubTabType(e.target.value as 'collection' | 'catalog' | 'general')}>
          <option value="collection">Collection Page</option>
          <option value="catalog">Catalog Page</option>
          <option value="general">General Page</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>SubTab Name</label>
        <input
          type="text"
          value={subTabName}
          onChange={(e) => setSubTabName(e.target.value)}
          placeholder="Enter subtab name"
          required
        />
      </div>
      
      {subTabType === 'collection' && (
        <div className="form-group">
          <label>Select Collection</label>
          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          >
            <option value="">-- Select a Collection --</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
          {collections.length === 0 && (
            <p className="no-options-text">No collections available. Create a collection first.</p>
          )}
        </div>
      )}
      
      {subTabType === 'catalog' && (
        <div className="form-group">
          <label>Select Catalog Page</label>
          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          >
            <option value="">-- Select a Catalog Page --</option>
            {catalogPages.map((catalog) => (
              <option key={catalog.id} value={catalog.id}>
                {catalog.name}
              </option>
            ))}
          </select>
          {catalogPages.length === 0 && (
            <p className="no-options-text">No catalog pages available. Create a catalog page first.</p>
          )}
        </div>
      )}
      
      {subTabType === 'general' && (
        <div className="form-group">
          <label>Select Custom Page</label>
          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          >
            <option value="">-- Select a Custom Page --</option>
            {customPages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>
          {customPages.length === 0 && (
            <p className="no-options-text">No custom pages available. Create a custom page first.</p>
          )}
        </div>
      )}
      
      <div className="modal-footer">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="create-btn">
          Create SubTab
        </button>
      </div>
    </form>
  );
};

export default TabsStoreBar;
