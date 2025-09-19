'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import './StoreBarElementsPositions.css';

// Icon Options Types
interface IconOption {
  value: string;
  label: string;
  icon: string;
}

// Layout Controls Types
interface LayoutControls {
  desktop: {
    logoPosition: number;
    tabsPosition: number;
    account: { position: number; visible: boolean; iconType: string };
    notifications: { position: number; visible: boolean; iconType: string };
    language: { position: number; visible: boolean; iconType: string };
    cart: { position: number; visible: boolean; iconType: string };
    wishlist: { position: number; visible: boolean; iconType: string };
    search: { position: number; visible: boolean; iconType: string };
  };
  mobile: {
    logoPosition: number;
    drawerPosition: 'left' | 'right';
    account: { position: number; visible: boolean; iconType: string };
    notifications: { position: number; visible: boolean; iconType: string };
    language: { position: number; visible: boolean; iconType: string };
    cart: { position: number; visible: boolean; iconType: string };
    wishlist: { position: number; visible: boolean; iconType: string };
    search: { position: number; visible: boolean; iconType: string };
  };
}

interface StoreBarElementsPositionsContextType {
  isOpen: boolean;
  viewMode: 'desktop' | 'mobile';
  layoutControls: LayoutControls;
  openLayoutControls: () => void;
  closeLayoutControls: () => void;
  setViewMode: (mode: 'desktop' | 'mobile') => void;
  updateLayoutControls: (newControls: LayoutControls) => void;
  resetPositions: () => void;
}

// Icon Options for each action
const iconOptions: Record<string, IconOption[]> = {
  account: [
    { value: 'user', label: 'User', icon: '👤' },
    { value: 'person', label: 'Person', icon: '🧑' },
    { value: 'profile', label: 'Profile', icon: '👨‍💼' },
    { value: 'avatar', label: 'Avatar', icon: '🙋‍♂️' },
    { value: 'admin', label: 'Admin', icon: '👨‍💻' },
    { value: 'customer', label: 'Customer', icon: '🛍️' }
  ],
  notifications: [
    { value: 'bell', label: 'Bell', icon: '🔔' },
    { value: 'notification', label: 'Notification', icon: '📢' },
    { value: 'alert', label: 'Alert', icon: '⚠️' },
    { value: 'message', label: 'Message', icon: '💬' },
    { value: 'inbox', label: 'Inbox', icon: '📥' },
    { value: 'mail', label: 'Mail', icon: '📬' }
  ],
  language: [
    { value: 'globe', label: 'Globe', icon: '🌐' },
    { value: 'world', label: 'World', icon: '🌍' },
    { value: 'translate', label: 'Translate', icon: '🔄' },
    { value: 'language', label: 'Language', icon: '🗣️' },
    { value: 'flag', label: 'Flag', icon: '🏳️' },
    { value: 'earth', label: 'Earth', icon: '🌎' }
  ],
  cart: [
    { value: 'cart', label: 'Cart', icon: '🛒' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'basket', label: 'Basket', icon: '🧺' },
    { value: 'bag', label: 'Bag', icon: '👜' },
    { value: 'trolley', label: 'Trolley', icon: '🛒' },
    { value: 'purchase', label: 'Purchase', icon: '💳' }
  ],
  wishlist: [
    { value: 'heart', label: 'Heart', icon: '❤️' },
    { value: 'love', label: 'Love', icon: '💖' },
    { value: 'favorite', label: 'Favorite', icon: '⭐' },
    { value: 'like', label: 'Like', icon: '👍' },
    { value: 'bookmark', label: 'Bookmark', icon: '🔖' },
    { value: 'star', label: 'Star', icon: '✨' }
  ],
  search: [
    { value: 'search', label: 'Search', icon: '🔍' },
    { value: 'magnifier', label: 'Magnifier', icon: '🔎' },
    { value: 'find', label: 'Find', icon: '🕵️' },
    { value: 'explore', label: 'Explore', icon: '🗺️' },
    { value: 'discover', label: 'Discover', icon: '🔭' },
    { value: 'lookup', label: 'Lookup', icon: '📊' }
  ]
};

const defaultLayoutControls: LayoutControls = {
  desktop: {
    logoPosition: 10,    // Logo on the left
    tabsPosition: 30,    // Tabs at 30%
    account: { position: 85, visible: true, iconType: 'profile' },      // 👨‍💼 Account: 85% (Professional look)
    notifications: { position: 87, visible: true, iconType: 'bell' },   // 🔔 Notifications: 87% (Classic bell)
    language: { position: 89, visible: true, iconType: 'world' },       // 🌍 Language: 89% (World globe)
    cart: { position: 91, visible: true, iconType: 'shopping' },        // 🛍️ Cart: 91% (Shopping bags)
    wishlist: { position: 93, visible: true, iconType: 'favorite' },    // ⭐ Wishlist: 93% (Star favorite)
    search: { position: 95, visible: true, iconType: 'magnifier' }      // 🔎 Search: 95% (Magnifying glass)
  },
  mobile: {
    logoPosition: 15,    // Logo on the left for mobile
    drawerPosition: 'left',
    account: { position: 80, visible: true, iconType: 'profile' },      // 👨‍💼 Mobile icons with proportional spacing
    notifications: { position: 83, visible: true, iconType: 'bell' },   // 🔔 Classic bell for notifications
    language: { position: 86, visible: true, iconType: 'world' },       // 🌍 World for language selection
    cart: { position: 89, visible: true, iconType: 'shopping' },        // 🛍️ Shopping bags for cart
    wishlist: { position: 92, visible: true, iconType: 'favorite' },    // ⭐ Star for favorites/wishlist
    search: { position: 95, visible: true, iconType: 'magnifier' }      // 🔎 Magnifying glass for search
  }
};

const StoreBarElementsPositionsContext = createContext<StoreBarElementsPositionsContextType | undefined>(undefined);

export const useStoreBarElementsPositions = () => {
  const context = useContext(StoreBarElementsPositionsContext);
  if (!context) {
    throw new Error('useStoreBarElementsPositions must be used within a StoreBarElementsPositionsProvider');
  }
  return context;
};

interface StoreBarElementsPositionsProviderProps {
  children: ReactNode;
}

export const StoreBarElementsPositionsProvider: React.FC<StoreBarElementsPositionsProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [layoutControls, setLayoutControls] = useState<LayoutControls>(defaultLayoutControls);

  // Load saved layout controls on mount
  useEffect(() => {
    const saved = localStorage.getItem('storeBarLayoutControls');
    if (saved) {
      try {
        setLayoutControls(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading layout controls:', error);
      }
    }
  }, []);

  const openLayoutControls = () => setIsOpen(true);
  const closeLayoutControls = () => setIsOpen(false);

  const updateLayoutControls = (newControls: LayoutControls) => {
    setLayoutControls(newControls);
    localStorage.setItem('storeBarLayoutControls', JSON.stringify(newControls));
  };

  const resetPositions = () => {
    const newDefaultControls = {
      desktop: {
        logoPosition: 10,    // Logo on the left
        tabsPosition: 30,    // Tabs at 30%
        account: { position: 85, visible: true, iconType: 'profile' },      // 👨‍💼 Account: 85% (Professional look)
        notifications: { position: 87, visible: true, iconType: 'bell' },   // 🔔 Notifications: 87% (Classic bell)
        language: { position: 89, visible: true, iconType: 'world' },       // 🌍 Language: 89% (World globe)
        cart: { position: 91, visible: true, iconType: 'shopping' },        // 🛍️ Cart: 91% (Shopping bags)
        wishlist: { position: 93, visible: true, iconType: 'favorite' },    // ⭐ Wishlist: 93% (Star favorite)
        search: { position: 95, visible: true, iconType: 'magnifier' }      // 🔎 Search: 95% (Magnifying glass)
      },
      mobile: {
        logoPosition: 15,    // Logo on the left for mobile
        drawerPosition: 'left' as 'left' | 'right',
        account: { position: 80, visible: true, iconType: 'profile' },      // 👨‍💼 Mobile icons with proportional spacing
        notifications: { position: 83, visible: true, iconType: 'bell' },   // 🔔 Classic bell for notifications
        language: { position: 86, visible: true, iconType: 'world' },       // 🌍 World for language selection
        cart: { position: 89, visible: true, iconType: 'shopping' },        // 🛍️ Shopping bags for cart
        wishlist: { position: 92, visible: true, iconType: 'favorite' },    // ⭐ Star for favorites/wishlist
        search: { position: 95, visible: true, iconType: 'magnifier' }      // 🔎 Magnifying glass for search
      }
    };
    setLayoutControls(newDefaultControls);
    localStorage.setItem('storeBarLayoutControls', JSON.stringify(newDefaultControls));
  };

  const value: StoreBarElementsPositionsContextType = {
    isOpen,
    viewMode,
    layoutControls,
    openLayoutControls,
    closeLayoutControls,
    setViewMode,
    updateLayoutControls,
    resetPositions
  };

  return (
    <StoreBarElementsPositionsContext.Provider value={value}>
      {children}
      {isOpen && <StoreBarElementsPositionsDrawer />}
    </StoreBarElementsPositionsContext.Provider>
  );
};

// Store Bar Elements Positions Drawer Component
const StoreBarElementsPositionsDrawer: React.FC = () => {
  const {
    viewMode,
    layoutControls,
    closeLayoutControls,
    setViewMode,
    updateLayoutControls,
    resetPositions
  } = useStoreBarElementsPositions();

  return (
    <div className="layout-controls-global-overlay">
      <div className="layout-controls-global-drawer">
        <div className="layout-controls-header">
          <h3 className="layout-controls-title">
            <span className="layout-controls-icon">🎨</span>
            Store Bar Elements Positions
          </h3>
          <button className="close-btn" onClick={closeLayoutControls}>✕</button>
        </div>
        
        <div className="layout-controls-content">
          {/* View Mode Toggle */}
          <div className="view-mode-section">
            <div className="view-mode-buttons">
              <button 
                className={`view-mode-btn ${viewMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setViewMode('desktop')}
              >
                Web View
              </button>
              <button 
                className={`view-mode-btn ${viewMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setViewMode('mobile')}
              >
                Mobile View
              </button>
            </div>
            <button className="reset-positions-btn" onClick={resetPositions}>
              🔄 Reset Positions
            </button>
          </div>

          {/* Desktop View Controls */}
          {viewMode === 'desktop' && (
            <>
              <div className="control-section">
                <div className="control-header">
                  <label>🖼️ Logo Position</label>
                  <span className="control-value">{layoutControls.desktop.logoPosition}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={layoutControls.desktop.logoPosition}
                  onChange={(e) => {
                    const newControls = {
                      ...layoutControls,
                      desktop: {
                        ...layoutControls.desktop,
                        logoPosition: Number(e.target.value)
                      }
                    };
                    updateLayoutControls(newControls);
                  }}
                  className="control-slider"
                />
              </div>

              {/* Tabs Position */}
              <div className="control-section">
                <div className="control-header">
                  <label>📋 Tabs Position</label>
                  <span className="control-value">{layoutControls.desktop.tabsPosition}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="80"
                  value={layoutControls.desktop.tabsPosition}
                  onChange={(e) => {
                    const newControls = {
                      ...layoutControls,
                      desktop: {
                        ...layoutControls.desktop,
                        tabsPosition: Number(e.target.value)
                      }
                    };
                    updateLayoutControls(newControls);
                  }}
                  className="control-slider"
                />
              </div>

              {/* Desktop Icon Controls */}
              {Object.entries(layoutControls.desktop).map(([key, value]) => {
                if (key === 'logoPosition' || key === 'tabsPosition') return null;
                const iconKey = key as keyof typeof layoutControls.desktop;
                const iconData = value as { position: number; visible: boolean; iconType: string };
                
                const icons = {
                  account: { icon: '👤', label: 'Account' },
                  notifications: { icon: '🔔', label: 'Notifications' },
                  language: { icon: '🌐', label: 'Language' },
                  cart: { icon: '🛒', label: 'Cart' },
                  wishlist: { icon: '❤️', label: 'Wishlist' },
                  search: { icon: '🔍', label: 'Search' }
                };

                const iconInfo = icons[iconKey as keyof typeof icons];
                if (!iconInfo) return null;

                // Get current icon based on iconType
                const currentIconOption = iconOptions[key]?.find(option => option.value === iconData.iconType) || iconOptions[key]?.[0];
                const currentIcon = currentIconOption?.icon || iconInfo.icon;

                return (
                  <div key={key} className="control-section">
                    <div className="control-header">
                      <div className="control-label-group">
                        <label>{currentIcon} {iconInfo.label}</label>
                        <span className="control-value">{iconData.position}%</span>
                        
                        {/* Icon Type Dropdown */}
                        <select
                          className="icon-type-select"
                          value={iconData.iconType}
                          onChange={(e) => {
                            const newControls = {
                              ...layoutControls,
                              desktop: {
                                ...layoutControls.desktop,
                                [iconKey]: {
                                  ...iconData,
                                  iconType: e.target.value
                                }
                              }
                            };
                            updateLayoutControls(newControls);
                          }}
                        >
                          {iconOptions[key]?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.icon} {option.label}
                            </option>
                          ))}
                        </select>
                        
                        <div className="visibility-toggle">
                          <input
                            type="checkbox"
                            checked={iconData.visible}
                            onChange={(e) => {
                              const newControls = {
                                ...layoutControls,
                                desktop: {
                                  ...layoutControls.desktop,
                                  [iconKey]: {
                                    ...iconData,
                                    visible: e.target.checked
                                  }
                                }
                              };
                              updateLayoutControls(newControls);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={iconData.position}
                      onChange={(e) => {
                        const newControls = {
                          ...layoutControls,
                          desktop: {
                            ...layoutControls.desktop,
                            [iconKey]: {
                              ...iconData,
                              position: Number(e.target.value)
                            }
                          }
                        };
                        updateLayoutControls(newControls);
                      }}
                      className="control-slider"
                    />
                  </div>
                );
              })}
            </>
          )}

          {/* Mobile View Controls */}
          {viewMode === 'mobile' && (
            <>
              <div className="control-section">
                <div className="control-header">
                  <label>🖼️ Logo Position</label>
                  <span className="control-value">{layoutControls.mobile.logoPosition}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={layoutControls.mobile.logoPosition}
                  onChange={(e) => {
                    const newControls = {
                      ...layoutControls,
                      mobile: {
                        ...layoutControls.mobile,
                        logoPosition: Number(e.target.value)
                      }
                    };
                    updateLayoutControls(newControls);
                  }}
                  className="control-slider"
                />
              </div>

              <div className="control-section">
                <h4>Drawer Position</h4>
                <div className="drawer-position-buttons">
                  <button 
                    className={`drawer-pos-btn ${layoutControls.mobile.drawerPosition === 'left' ? 'active' : ''}`}
                    onClick={() => {
                      const newControls = {
                        ...layoutControls,
                        mobile: {
                          ...layoutControls.mobile,
                          drawerPosition: 'left' as 'left' | 'right'
                        }
                      };
                      updateLayoutControls(newControls);
                    }}
                  >
                    ⬅️ Left Side
                  </button>
                  <button 
                    className={`drawer-pos-btn ${layoutControls.mobile.drawerPosition === 'right' ? 'active' : ''}`}
                    onClick={() => {
                      const newControls = {
                        ...layoutControls,
                        mobile: {
                          ...layoutControls.mobile,
                          drawerPosition: 'right' as 'left' | 'right'
                        }
                      };
                      updateLayoutControls(newControls);
                    }}
                  >
                    ➡️ Right Side
                  </button>
                </div>
              </div>

              {/* Mobile Icon Controls */}
              {Object.entries(layoutControls.mobile).map(([key, value]) => {
                if (key === 'logoPosition' || key === 'drawerPosition') return null;
                const iconKey = key as keyof typeof layoutControls.mobile;
                const iconData = value as { position: number; visible: boolean; iconType: string };
                
                const icons = {
                  account: { icon: '👤', label: 'Account' },
                  notifications: { icon: '🔔', label: 'Notifications' },
                  language: { icon: '🌐', label: 'Language' },
                  cart: { icon: '🛒', label: 'Cart' },
                  wishlist: { icon: '❤️', label: 'Wishlist' },
                  search: { icon: '🔍', label: 'Search' }
                };

                const iconInfo = icons[iconKey as keyof typeof icons];
                if (!iconInfo) return null;

                // Get current icon based on iconType
                const currentIconOption = iconOptions[key]?.find(option => option.value === iconData.iconType) || iconOptions[key]?.[0];
                const currentIcon = currentIconOption?.icon || iconInfo.icon;

                return (
                  <div key={key} className="control-section">
                    <div className="control-header">
                      <div className="control-label-group">
                        <label>{currentIcon} {iconInfo.label}</label>
                        <span className="control-value">{iconData.position}%</span>
                        
                        {/* Icon Type Dropdown */}
                        <select
                          className="icon-type-select"
                          value={iconData.iconType}
                          onChange={(e) => {
                            const newControls = {
                              ...layoutControls,
                              mobile: {
                                ...layoutControls.mobile,
                                [iconKey]: {
                                  ...iconData,
                                  iconType: e.target.value
                                }
                              }
                            };
                            updateLayoutControls(newControls);
                          }}
                        >
                          {iconOptions[key]?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.icon} {option.label}
                            </option>
                          ))}
                        </select>
                        
                        <div className="visibility-toggle">
                          <input
                            type="checkbox"
                            checked={iconData.visible}
                            onChange={(e) => {
                              const newControls = {
                                ...layoutControls,
                                mobile: {
                                  ...layoutControls.mobile,
                                  [iconKey]: {
                                    ...iconData,
                                    visible: e.target.checked
                                  }
                                }
                              };
                              updateLayoutControls(newControls);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={iconData.position}
                      onChange={(e) => {
                        const newControls = {
                          ...layoutControls,
                          mobile: {
                            ...layoutControls.mobile,
                            [iconKey]: {
                              ...iconData,
                              position: Number(e.target.value)
                            }
                          }
                        };
                        updateLayoutControls(newControls);
                      }}
                      className="control-slider"
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
        
        <div className="layout-controls-footer">
          <button className="close-action-btn" onClick={closeLayoutControls}>Close</button>
          <button className="update-btn">Update</button>
        </div>
      </div>
    </div>
  );
};

export default StoreBarElementsPositionsProvider;
