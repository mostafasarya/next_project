'use client';

import React, { useState } from 'react';
import { HiSparkles, HiLightBulb, HiEye } from 'react-icons/hi';
import { useViewMode } from '../../ViewModeContext';
import { FaEye } from 'react-icons/fa';
import SystemDrawer from '../../EditorControls/PropertiesManagement/SystemDrawer';
import '../../EditorControls/PropertiesManagement/SystemControlIcons.css';
import CompContactFormDesign from './CompContactFormDesign';
import CompFeaturedProductDesign from './CompFeaturedProductDesign';
import CompEmailSubscriptionDesign from './CompEmailSubscriptionDesign';
import CompMultiColumnDesign from './CompMultiColumnDesign';
import CompTextPosterDesign from './CompTextPosterDesign';
import CompFAQDesign from './CompFAQDesign';
import CompCollageDesign from './CompCollageDesign';
import CompTextImageDesign from './CompTextImageDesign';
import CompPhotoGridDesign from './CompPhotoGridDesign';
import CompProductDisplayDesign from './CompProductDisplayDesign';
import CompSlidingBannerComp from './CompSlidingBannerComp';
import CompNavigationBarwithProductsDesign from './CompNavigationBarwithProductsDesign';
import './HomePageCard.css';

// Simple test component for design drawer
const SimpleTextComponent: React.FC<{ text: string }> = ({ text }) => (
  <div style={{
    padding: '20px',
    margin: '10px 0',
    backgroundColor: '#f8f9fa',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#333',
    fontSize: '16px',
    fontWeight: '500'
  }}>
    {text}
  </div>
);

interface HomePageCardProps {
  children?: React.ReactNode;
  verticalPadding?: number;
  horizontalPadding?: number;
  showLogoSettings?: boolean;
  className?: string;
  style?: React.CSSProperties;
  minHeight?: string;
  showPlaceholder?: boolean;
  placeholderTitle?: string;
  placeholderDescription?: string;
  showDesignSystem?: boolean; // New prop to control design system visibility
  isCustomerView?: boolean; // New prop to control customer view mode
}

const HomePageCard: React.FC<HomePageCardProps> = ({
  children,
  verticalPadding = 16,
  horizontalPadding = 16,
  showLogoSettings = false,
  className = '',
  style = {},
  minHeight = 'calc(100vh - 200px)',
  showPlaceholder = false,
  placeholderTitle = 'Homepage Content',
  placeholderDescription = 'This white card extends from the store bar to the footer with the same layout structure.',
  showDesignSystem = true, // Default to true to show design system
  isCustomerView = false
}) => {
  // Get view mode context
  const { toggleViewMode, isCustomerView: contextIsCustomerView } = useViewMode();
  
  // Design components state
  const [showDesignDrawer, setShowDesignDrawer] = useState(false);
  const [pageComponents, setPageComponents] = useState<{ id: string; component: React.ReactNode }[]>([]);
  const [drawerWidth, setDrawerWidth] = useState(400);
  const [newlyAddedComponentId, setNewlyAddedComponentId] = useState<string | null>(null);
  const [hasInitializedDefaults, setHasInitializedDefaults] = useState(false);

  // Initialize with all components on first load only
  React.useEffect(() => {
    if (!hasInitializedDefaults) {
      const defaultComponents = [
        { id: 'sliding-banner-1', component: <CompSlidingBannerComp key="sliding-banner-1" /> },
        { id: 'product-display-1', component: <CompProductDisplayDesign key="product-display-1" /> },
        { id: 'text-image-1', component: <CompTextImageDesign key="text-image-1" /> },
        { id: 'photo-grid-1', component: <CompPhotoGridDesign key="photo-grid-1" /> },
        { id: 'featured-product-1', component: <CompFeaturedProductDesign key="featured-product-1" /> },
        { id: 'navigation-products-1', component: <CompNavigationBarwithProductsDesign key="navigation-products-1" /> },
        { id: 'collage-1', component: <CompCollageDesign key="collage-1" /> },
        { id: 'multi-column-1', component: <CompMultiColumnDesign key="multi-column-1" /> },
        { id: 'text-poster-1', component: <CompTextPosterDesign key="text-poster-1" /> },
        { id: 'faq-1', component: <CompFAQDesign key="faq-1" /> },
        { id: 'email-subscription-1', component: <CompEmailSubscriptionDesign key="email-subscription-1" /> },
        { id: 'contact-form-1', component: <CompContactFormDesign key="contact-form-1" /> }
      ];
      setPageComponents(defaultComponents);
      setHasInitializedDefaults(true); // Mark as initialized
    }
  }, [hasInitializedDefaults]);

  // Handle scroll and highlight for newly added components
  React.useEffect(() => {
    if (newlyAddedComponentId) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const element = document.getElementById(`component-${newlyAddedComponentId}`);
        if (element) {
          // Scroll to the component with smooth behavior
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
          
          // Remove highlight after 3 seconds
          setTimeout(() => {
            setNewlyAddedComponentId(null);
          }, 3000);
        }
      }, 100);
    }
  }, [newlyAddedComponentId]);

  // Set drawer width to full screen on component mount
  React.useEffect(() => {
    const updateDrawerWidth = () => {
      setDrawerWidth(window.innerWidth);
    };
    
    // Set initial width
    updateDrawerWidth();
    
    // Update width on window resize
    window.addEventListener('resize', updateDrawerWidth);
    
    return () => {
      window.removeEventListener('resize', updateDrawerWidth);
    };
  }, []);

  // Function to add components to the page
  const addComponentToPage = (componentType: string) => {
    const componentId = Date.now().toString();
    let newComponent: React.ReactNode;
    
    switch (componentType) {
      case 'simple-text':
        newComponent = <SimpleTextComponent key={componentId} text="Hello! This is a simple text component." />;
        break;
      case 'welcome-text':
        newComponent = <SimpleTextComponent key={componentId} text="Welcome to our amazing store! Start shopping now." />;
        break;
      case 'promotion-text':
        newComponent = <SimpleTextComponent key={componentId} text="🎉 Special Offer: 50% OFF on all items!" />;
        break;
      case 'contact-form':
        newComponent = <CompContactFormDesign key={componentId} />;
        break;
      case 'featured-product':
        newComponent = <CompFeaturedProductDesign key={componentId} />;
        break;
      case 'email-subscription':
        newComponent = <CompEmailSubscriptionDesign key={componentId} />;
        break;
      case 'multi-column':
        newComponent = <CompMultiColumnDesign key={componentId} />;
        break;
      case 'text-poster':
        newComponent = <CompTextPosterDesign key={componentId} />;
        break;
      case 'faq':
        newComponent = <CompFAQDesign key={componentId} />;
        break;
      case 'collage':
        newComponent = <CompCollageDesign key={componentId} />;
        break;
      case 'text-image':
        newComponent = <CompTextImageDesign key={componentId} />;
        break;
      case 'photo-grid':
        newComponent = <CompPhotoGridDesign key={componentId} />;
        break;
      case 'product-display':
        newComponent = <CompProductDisplayDesign key={componentId} />;
        break;
      case 'sliding-banner':
        newComponent = <CompSlidingBannerComp key={componentId} />;
        break;
      case 'navigation-products':
        newComponent = <CompNavigationBarwithProductsDesign key={componentId} />;
        break;
      default:
        newComponent = <SimpleTextComponent key={componentId} text="New component added successfully!" />;
    }
    
    setPageComponents(prev => [...prev, { id: componentId, component: newComponent }]);
    setNewlyAddedComponentId(componentId); // Set the newly added component ID for scroll and highlight
    setShowDesignDrawer(false);
  };

  // Function to delete a component
  const deleteComponent = (componentId: string) => {
    setPageComponents(prev => prev.filter(item => item.id !== componentId));
  };

  const cardStyle: React.CSSProperties = {
    marginLeft: showLogoSettings ? '300px' : '0',
    transition: 'margin-left 0.3s ease',
    backgroundColor: '#ffffff',
    minHeight: minHeight,
    paddingLeft: `${horizontalPadding}px`,
    paddingRight: `${horizontalPadding}px`,
    paddingTop: '40px',
    paddingBottom: '40px',
    ...style
  };

  return (
    <>
    <div 
      className={`homepage-card ${className}`}
      style={cardStyle}
    >
      <div className="homepage-card-content">
          {showDesignSystem && (
            <>
              {/* Fixed Add Design Button - Left Side */}
              <button
                onClick={() => setShowDesignDrawer(true)}
                style={{
                  position: 'fixed',
                  top: '60%',
                  left: '20px',
                  transform: 'translateY(-50%)',
                  zIndex: 1000,
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '700',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                 /* width: '120px',*/
                  justifyContent: 'center',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
                }}
              >
                <span style={{ fontSize: '18px', color: 'white', display: 'inline-block', marginRight: '8px', fontWeight: 'bold' }}>✨</span>
                Add Design
              </button>


              {/* Show placeholder text when no components added */}
              {pageComponents.length === 0 && (
                <div style={{ 
                  textAlign: 'center', 
                  color: '#666', 
                  fontSize: '16px',
                  padding: '40px 20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '2px dashed #e9ecef',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  <p style={{ margin: '0 0 8px 0', fontWeight: '500' }}>No components added yet</p>
                  <p style={{ margin: '0', fontSize: '14px' }}>Click "ADD Design" above to start building your page</p>
                </div>
              )}

              {/* Display added components */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}>
                {pageComponents.map((item) => (
                  <div 
                    key={item.id} 
                    id={`component-${item.id}`}
                    style={{
                      width: '100%',
                      margin: '0',
                      position: 'relative',
                      border: newlyAddedComponentId === item.id ? '3px solid #3b82f6' : 'none',
                      borderRadius: newlyAddedComponentId === item.id ? '8px' : '0',
                      boxShadow: newlyAddedComponentId === item.id ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none',
                      transition: 'all 0.3s ease',
                      animation: newlyAddedComponentId === item.id ? 'highlightPulse 2s ease-in-out' : 'none'
                    }}>
                    {/* Delete Button - Hidden in customer view */}
                    {!contextIsCustomerView && (
                      <button
                        onClick={() => deleteComponent(item.id)}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#a81313',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          zIndex: 10,
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#a81313';
                          e.currentTarget.style.transform = 'scale(1.1)';
                          e.currentTarget.style.boxShadow = '0 4px 8px rgba(239, 68, 68, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#a81313';
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.3)';
                        }}
                        title="Delete component"
                      >
                        ×
                      </button>
                    )}
                    
                    {/* Component */}
                    {item.component}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Components rendered in customer view (without design system) */}
          {!showDesignSystem && pageComponents.length > 0 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}>
              {pageComponents.map((item) => (
                <div 
                  key={item.id} 
                  style={{
                    width: '100%',
                    margin: '0',
                    position: 'relative'
                  }}>
                  {/* Component content only - no controls */}
                  {item.component}
                </div>
              ))}
            </div>
          )}

          {/* View As Button - Always visible */}
          <button
            onClick={toggleViewMode}
            style={{
              position: 'fixed',
              top: '60%',
              left: '20px',
              transform: 'translateY(-50%)',
              marginTop: contextIsCustomerView ? '0px' : '50px',
              zIndex: 1000,
              backgroundColor: contextIsCustomerView ? '#dc2626' : '#10b981',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              fontSize: '12px',
              fontWeight: '700',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: contextIsCustomerView ? '0 2px 8px rgba(220, 38, 38, 0.3)' : '0 2px 8px rgba(16, 185, 129, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              width: '120px',
              justifyContent: 'center',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = contextIsCustomerView ? '#b91c1c' : '#059669';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
              e.currentTarget.style.boxShadow = contextIsCustomerView ? '0 4px 12px rgba(220, 38, 38, 0.4)' : '0 4px 12px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = contextIsCustomerView ? '#dc2626' : '#10b981';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              e.currentTarget.style.boxShadow = contextIsCustomerView ? '0 2px 8px rgba(220, 38, 38, 0.3)' : '0 2px 8px rgba(16, 185, 129, 0.3)';
            }}
          >
            <FaEye style={{ fontSize: '18px', color: 'white', display: 'inline-block', marginRight: '8px' }} />
            {contextIsCustomerView ? 'Exit View' : 'View As'}
          </button>

          {/* Custom children content */}
        {children ? (
          children
          ) : (!showDesignSystem && showPlaceholder) ? (
          <div className="homepage-placeholder">
            <h2 style={{ 
              fontSize: '24px', 
              color: '#333', 
              textAlign: 'center',
              marginBottom: '16px',
              fontWeight: '500'
            }}>
              {placeholderTitle}
            </h2>
            <p style={{ 
              fontSize: '16px', 
              color: '#666', 
              textAlign: 'center',
              lineHeight: '1.5'
            }}>
              {placeholderDescription}
            </p>
          </div>
        ) : null}
      </div>
    </div>

      {/* Design Components Drawer */}
      {showDesignSystem && (
        <SystemDrawer
          isOpen={showDesignDrawer}
          onClose={() => setShowDesignDrawer(false)}
          title="Design Components"
          width={drawerWidth}
          position="right"
          pushContent={true}
        >
          <div style={{ padding: '40px 60px' }}>
            <h3 style={{ marginBottom: '20px', color: '#333', fontSize: '18px' }}>
              Available Components
            </h3>
            <p style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
              Click any component below to add it to your page. Browse our collection of professional components.
            </p>
            
            {/* Component Options */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px',
              maxWidth: '100%'
            }}>
              
              {/* Sliding Banner */}
              <div
                onClick={() => addComponentToPage('sliding-banner')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  height: '240px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=120&fit=crop&crop=center)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Sliding Banner
                  </div>
                </div>
              </div>

              {/* Product Display */}
              <div
                onClick={() => addComponentToPage('product-display')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  height: '240px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=120&fit=crop&crop=center)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Product Display
                  </div>
                </div>
              </div>

              {/* Photo Grid */}
              <div
                onClick={() => addComponentToPage('photo-grid')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  height: '240px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=120&fit=crop&crop=center)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Photo Grid
                  </div>
                </div>
              </div>

              {/* Text + Image */}
              <div
                onClick={() => addComponentToPage('text-image')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  height: '240px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=120&fit=crop&crop=center)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Text + Image
                  </div>
                </div>
              </div>

              {/* Featured Product */}
              <div
                onClick={() => addComponentToPage('featured-product')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  height: '240px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=120&fit=crop&crop=center)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Featured Product
                  </div>
                </div>
              </div>


              {/* Multi Column */}
              <div
                onClick={() => addComponentToPage('multi-column')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  height: '240px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=120&fit=crop&crop=center)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Multi Column
                  </div>
                </div>
              </div>

              {/* Text Poster */}
              <div
                onClick={() => addComponentToPage('text-poster')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  height: '240px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=120&fit=crop&crop=center)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Text Poster
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div
                onClick={() => addComponentToPage('faq')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  height: '240px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=120&fit=crop&crop=center)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    FAQ Section
                  </div>
                </div>
              </div>

              {/* Product Collage */}
              <div
                onClick={() => addComponentToPage('collage')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  height: '240px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=120&fit=crop&crop=center)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Product Collage
                  </div>
                </div>
              </div>

              {/* Navigation Products */}
              <div
                onClick={() => addComponentToPage('navigation-products')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  height: '240px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=120&fit=crop&crop=center)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Navigation Products
                  </div>
                </div>
              </div>

              {/* Email Subscription */}
              <div
                onClick={() => addComponentToPage('email-subscription')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  height: '240px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=120&fit=crop&crop=center)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Email Subscription
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div
                onClick={() => addComponentToPage('contact-form')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  height: '240px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=120&fit=crop&crop=center)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Contact Form
                  </div>
                </div>
              </div>

            </div>

            {/* Instructions */}
            <div style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: '#f0f9ff',
              border: '1px solid #0ea5e9',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '14px', color: '#0369a1', fontWeight: '500', marginBottom: '8px' }}>
                <HiLightBulb /> How it works:
              </div>
              <div style={{ fontSize: '12px', color: '#0369a1', lineHeight: '1.5' }}>
                • Click any component button to add it to your page<br/>
                • Components will appear below the "ADD Design" button<br/>
                • You can add multiple components and mix different types<br/>
                • All components are fully functional and customizable
              </div>
            </div>
          </div>
        </SystemDrawer>
      )}
    </>
  );
};

export default HomePageCard;
