'use client';

import React, { useState } from 'react';
import SystemDrawer from './SystemDrawer';
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
  showDesignSystem = true // Default to true to show design system
}) => {
  // Design components state
  const [showDesignDrawer, setShowDesignDrawer] = useState(false);
  const [pageComponents, setPageComponents] = useState<{ id: string; component: React.ReactNode }[]>([]);

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
    setShowDesignDrawer(false);
  };

  // Function to delete a component
  const deleteComponent = (componentId: string) => {
    setPageComponents(prev => prev.filter(item => item.id !== componentId));
  };

  const cardStyle: React.CSSProperties = {
    marginTop: `${120 + (verticalPadding * 2)}px`, // Increased to clear the store bar completely
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
              {/* ADD Design Button - Always visible */}
              <div style={{ 
                textAlign: 'center', 
                marginTop: '20px',
                marginBottom: '30px',
                padding: '20px',
                backgroundColor: '#f0f9ff',
                borderRadius: '12px',
                border: '2px solid #3b82f6'
              }}>
                <h3 style={{ 
                  margin: '0 0 15px 0', 
                  color: '#1e40af', 
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  🎨 Design Your Page
                </h3>
                <button
                  onClick={() => setShowDesignDrawer(true)}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '15px 30px',
                    fontSize: '18px',
                    fontWeight: '700',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 8px rgba(59, 130, 246, 0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.2)';
                  }}
                >
                  ADD Design
                </button>
              </div>

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
                  <div key={item.id} style={{
                    width: '100%',
                    maxWidth: '800px',
                    margin: '0 auto',
                    position: 'relative'
                  }}>
                    {/* Delete Button */}
                    <button
                      onClick={() => deleteComponent(item.id)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#ef4444',
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
                        e.currentTarget.style.backgroundColor = '#dc2626';
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(239, 68, 68, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ef4444';
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.3)';
                      }}
                      title="Delete component"
                    >
                      ×
                    </button>
                    
                    {/* Component */}
                    {item.component}
                  </div>
                ))}
              </div>
            </>
          )}

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
          width={400}
          position="right"
          pushContent={true}
        >
          <div style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '20px', color: '#333', fontSize: '18px' }}>
              Available Components
            </h3>
            <p style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
              Click any component below to add it to your page. Choose from contact forms, featured products, email subscriptions, multi-column layouts, text posters, FAQ sections, product collages, text + image sections, photo grids, dynamic product displays, sliding banners, and navigation products.
            </p>
            
            {/* Component Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                  e.currentTarget.style.borderColor = '#9333ea';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(147, 51, 234, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Header */}
                <div style={{
                  padding: '16px',
                  borderBottom: '1px solid #e5e7eb',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      padding: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img 
                        src="https://img.icons8.com/ios-filled/16/ffffff/contact-card.png" 
                        alt="Contact"
                        style={{ width: '16px', height: '16px' }}
                      />
                    </div>
                    Contact Form
                  </div>
                </div>

                {/* Preview Content */}
                <div style={{ padding: '16px' }}>
                  {/* Mock Form Preview */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        height: '24px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '4px',
                        border: '1px solid #d1d5db',
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '2px',
                          left: '6px',
                          fontSize: '10px',
                          color: '#9ca3af'
                        }}>Name</div>
                      </div>
                      <div style={{
                        height: '24px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '4px',
                        border: '1px solid #d1d5db',
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '2px',
                          left: '6px',
                          fontSize: '10px',
                          color: '#9ca3af'
                        }}>Email</div>
                      </div>
                    </div>
                    
                    <div style={{
                      height: '24px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '4px',
                      border: '1px solid #d1d5db',
                      marginBottom: '8px',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '2px',
                        left: '6px',
                        fontSize: '10px',
                        color: '#9ca3af'
                      }}>Subject</div>
                    </div>
                    
                    <div style={{
                      height: '40px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '4px',
                      border: '1px solid #d1d5db',
                      marginBottom: '8px',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '2px',
                        left: '6px',
                        fontSize: '10px',
                        color: '#9ca3af'
                      }}>Message...</div>
                    </div>
                    
                    <div style={{
                      height: '20px',
                      width: '60px',
                      backgroundColor: '#667eea',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '8px',
                      color: 'white',
                      fontWeight: '600'
                    }}>
                      Send
                    </div>
                  </div>

                </div>

                {/* Add Button */}
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#f9fafb',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#9333ea'
                  }}>
                    Click to Add Component
                  </div>
                </div>
              </div>

              {/* Featured Product Card */}
              <div
                onClick={() => addComponentToPage('featured-product')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(16, 185, 129, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Trending Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  Hot
                </div>

                {/* Header */}
                <div style={{
                  padding: '20px 20px 16px 20px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  position: 'relative'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=32&h=32&fit=crop&crop=center" 
                        alt="Shopping"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <div>
                      <div>Featured Product</div>
                      <div style={{ 
                        fontSize: '11px', 
                        opacity: 0.9, 
                        fontWeight: '400',
                        marginTop: '2px'
                      }}>
                        Highlight your bestsellers
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div style={{ padding: '20px' }}>
                  {/* Enhanced Product Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      marginBottom: '12px',
                      alignItems: 'center'
                    }}>
                      {/* Enhanced Product Image */}
                      <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                      }}>
                        <img 
                          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=70&h=70&fit=crop&crop=center" 
                          alt="Product"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        {/* Mock Reflection */}
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          width: '20px',
                          height: '20px',
                          background: 'rgba(255, 255, 255, 0.3)',
                          borderRadius: '50%',
                          filter: 'blur(2px)'
                        }}></div>
                      </div>
                      
                      {/* Enhanced Product Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          height: '18px',
                          background: 'linear-gradient(90deg, #374151 0%, #6b7280 100%)',
                          borderRadius: '6px',
                          marginBottom: '8px',
                          width: '85%'
                        }}></div>
                        
                        {/* Stars */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginBottom: '8px'
                        }}>
                          <div style={{ color: '#fbbf24', fontSize: '12px' }}>★★★★★</div>
                          <div style={{
                            height: '8px',
                            backgroundColor: '#e5e7eb',
                            borderRadius: '4px',
                            width: '30px'
                          }}></div>
                        </div>
                        
                        <div style={{
                          height: '14px',
                          background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                          borderRadius: '6px',
                          width: '45%',
                          position: 'relative'
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: '6px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '8px',
                            color: 'white',
                            fontWeight: '600'
                          }}>
                            $299
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Mock Controls */}
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      marginTop: '12px'
                    }}>
                      <div style={{
                        height: '28px',
                        flex: 1,
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: 'white',
                        fontWeight: '600',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                        gap: '4px'
                      }}>
                        <img 
                          src="https://img.icons8.com/ios-filled/16/ffffff/shopping-cart.png" 
                          alt="Cart"
                          style={{ width: '12px', height: '12px' }}
                        />
                        Add to Cart
                      </div>
                      <div style={{
                        height: '28px',
                        width: '32px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                      }}>
                        <img 
                          src="https://img.icons8.com/ios/16/000000/like.png" 
                          alt="Like"
                          style={{ width: '12px', height: '12px' }}
                        />
                      </div>
                      <div style={{
                        height: '28px',
                        width: '32px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px'
                      }}>
                        <img 
                          src="https://img.icons8.com/ios/16/000000/visible.png" 
                          alt="View"
                          style={{ width: '12px', height: '12px' }}
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Enhanced Add Button */}
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#10b981',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <img 
                      src="https://img.icons8.com/emoji/16/000000/sparkles.png" 
                      alt="Sparkle"
                      style={{ width: '14px', height: '14px' }}
                    />
                    Add Featured Product
                    <img 
                      src="https://img.icons8.com/emoji/16/000000/sparkles.png" 
                      alt="Sparkle"
                      style={{ width: '14px', height: '14px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Email Subscription Card */}
              <div
                onClick={() => addComponentToPage('email-subscription')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* New Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  New
                </div>

                {/* Header */}
                <div style={{
                  padding: '20px 20px 16px 20px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  position: 'relative'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px'
                    }}>
                      <img 
                        src="https://img.icons8.com/ios-filled/24/ffffff/email.png" 
                        alt="Email"
                        style={{
                          width: '20px',
                          height: '20px'
                        }}
                      />
                    </div>
                    <div>
                      <div>Email Subscription</div>
                      <div style={{ 
                        fontSize: '11px', 
                        opacity: 0.9, 
                        fontWeight: '400',
                        marginTop: '2px'
                      }}>
                        Capture email subscribers
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div style={{ padding: '20px' }}>
                  {/* Enhanced Email Form Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      marginBottom: '12px'
                    }}>
                      {/* Mock Email Input */}
                      <div style={{
                        display: 'flex',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          flex: 1,
                          padding: '10px 12px',
                          backgroundColor: '#f9fafb',
                          fontSize: '11px',
                          color: '#9ca3af',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          Enter your email address
                        </div>
                        <div style={{
                          backgroundColor: '#3b82f6',
                          padding: '10px 16px',
                          color: 'white',
                          fontSize: '10px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <span>→</span>
                          Subscribe
                        </div>
                      </div>
                      
                      {/* Privacy Notice */}
                      <div style={{
                        fontSize: '9px',
                        color: '#6b7280',
                        textAlign: 'center',
                        marginBottom: '12px'
                      }}>
                        🔒 We respect your privacy. Unsubscribe at any time.
                      </div>
                    </div>
                    
                  </div>
                </div>

                {/* Enhanced Add Button */}
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#3b82f6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <img 
                      src="https://img.icons8.com/ios-filled/16/3b82f6/email.png" 
                      alt="Email"
                      style={{ width: '14px', height: '14px' }}
                    />
                    Add Email Subscription
                    <img 
                      src="https://img.icons8.com/ios-filled/16/3b82f6/email.png" 
                      alt="Email"
                      style={{ width: '14px', height: '14px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Multi-Column Card */}
              <div
                onClick={() => addComponentToPage('multi-column')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f4ff';
                  e.currentTarget.style.borderColor = '#6366f1';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Popular Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  Popular
                </div>

                {/* Header */}
                <div style={{
                  padding: '20px 20px 16px 20px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: 'white',
                  position: 'relative'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px'
                    }}>
                      <img 
                        src="https://img.icons8.com/ios-filled/24/ffffff/view-column.png" 
                        alt="Columns"
                        style={{
                          width: '20px',
                          height: '20px'
                        }}
                      />
                    </div>
                    <div>
                      <div>Multi-Column Layout</div>
                      <div style={{ 
                        fontSize: '11px', 
                        opacity: 0.9, 
                        fontWeight: '400',
                        marginTop: '2px'
                      }}>
                        Organize content in columns
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div style={{ padding: '20px' }}>
                  {/* Multi-Column Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    {/* Main Title Preview */}
                    <div style={{
                      textAlign: 'center',
                      marginBottom: '16px',
                      padding: '8px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#1f2937',
                        marginBottom: '4px'
                      }}>
                        Multi Column title
                      </div>
                      <div style={{
                        fontSize: '9px',
                        color: '#6b7280'
                      }}>
                        + Add Column (3/4 columns)
                      </div>
                    </div>

                    {/* Columns Preview Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      {[1, 2, 3].map((num) => (
                        <div key={num} style={{
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '10px',
                          fontSize: '10px'
                        }}>
                          <div style={{
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}>
                            <span>Column Header</span>
                            <div style={{ display: 'flex', gap: '2px' }}>
                              <span style={{ fontSize: '8px' }}>✏️</span>
                              {num > 1 && <span style={{ fontSize: '8px', color: '#ef4444' }}>✕</span>}
                            </div>
                          </div>
                          <div style={{
                            color: '#6b7280',
                            fontSize: '9px',
                            lineHeight: '1.3'
                          }}>
                            column description
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Instructions Preview */}
                    <div style={{
                      fontSize: '8px',
                      color: '#64748b',
                      textAlign: 'center',
                      padding: '6px',
                      backgroundColor: '#f1f5f9',
                      borderRadius: '4px',
                      fontStyle: 'italic'
                    }}>
                      💡 Click on any text to edit • Add up to 4 columns
                    </div>
                  </div>
                </div>

                {/* Enhanced Add Button */}
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#6366f1',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <img 
                      src="https://img.icons8.com/ios-filled/16/6366f1/view-column.png" 
                      alt="Columns"
                      style={{ width: '14px', height: '14px' }}
                    />
                    Add Multi-Column Layout
                    <img 
                      src="https://img.icons8.com/ios-filled/16/6366f1/view-column.png" 
                      alt="Columns"
                      style={{ width: '14px', height: '14px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Text Poster Card */}
              <div
                onClick={() => addComponentToPage('text-poster')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fefbeb';
                  e.currentTarget.style.borderColor = '#f59e0b';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(245, 158, 11, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Trending Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  Trending
                </div>

                {/* Header */}
                <div style={{
                  padding: '20px 20px 16px 20px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  position: 'relative'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px'
                    }}>
                      <img 
                        src="https://img.icons8.com/ios-filled/24/ffffff/text.png" 
                        alt="Text Poster"
                        style={{
                          width: '20px',
                          height: '20px'
                        }}
                      />
                    </div>
                    <div>
                      <div>Text Poster</div>
                      <div style={{ 
                        fontSize: '11px', 
                        opacity: 0.9, 
                        fontWeight: '400',
                        marginTop: '2px'
                      }}>
                        Create stunning text displays
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div style={{ padding: '20px' }}>
                  {/* Text Poster Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    {/* Mini Poster Preview */}
                    <div style={{
                      background: 'linear-gradient(135deg, #1f2937 0%, #3b82f6 100%)',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '12px',
                      textAlign: 'center',
                      position: 'relative',
                      minHeight: '80px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      {/* Settings Icon */}
                      <div style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        width: '16px',
                        height: '16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px'
                      }}>
                        ⚙️
                      </div>

                      {/* Accent Dot */}
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#3b82f6',
                        borderRadius: '50%'
                      }}></div>

                      {/* Main Text */}
                      <div style={{
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '700',
                        marginBottom: '4px',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                      }}>
                        Your Main Message
                      </div>

                      {/* Sub Text */}
                      <div style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '10px',
                        fontWeight: '500'
                      }}>
                        Supporting text or call to action
                      </div>

                      {/* Edit Indicators */}
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '30px',
                        fontSize: '8px',
                        opacity: 0.7
                      }}>
                        ✏️
                      </div>
                    </div>

                    {/* Style Options Preview */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '4px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px',
                        padding: '4px',
                        fontSize: '8px',
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Modern
                      </div>
                      <div style={{
                        backgroundColor: '#fef3c7',
                        border: '1px solid #f59e0b',
                        borderRadius: '4px',
                        padding: '4px',
                        fontSize: '8px',
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#92400e'
                      }}>
                        Classic
                      </div>
                      <div style={{
                        backgroundColor: '#ddd6fe',
                        border: '1px solid #8b5cf6',
                        borderRadius: '4px',
                        padding: '4px',
                        fontSize: '8px',
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#5b21b6'
                      }}>
                        Bold
                      </div>
                      <div style={{
                        backgroundColor: '#f1f5f9',
                        border: '1px solid #94a3b8',
                        borderRadius: '4px',
                        padding: '4px',
                        fontSize: '8px',
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#475569'
                      }}>
                        Minimal
                      </div>
                    </div>

                    {/* Features List */}
                    <div style={{
                      fontSize: '9px',
                      color: '#64748b',
                      textAlign: 'center',
                      padding: '6px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '4px',
                      lineHeight: '1.3'
                    }}>
                      4 Styles • Custom Colors • Background Images • Text Alignment
                    </div>
                  </div>
                </div>

                {/* Enhanced Add Button */}
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#f59e0b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <img 
                      src="https://img.icons8.com/ios-filled/16/f59e0b/text.png" 
                      alt="Text"
                      style={{ width: '14px', height: '14px' }}
                    />
                    Add Text Poster
                    <img 
                      src="https://img.icons8.com/ios-filled/16/f59e0b/text.png" 
                      alt="Text"
                      style={{ width: '14px', height: '14px' }}
                    />
                  </div>
                </div>
              </div>

              {/* FAQ Card */}
              <div
                onClick={() => addComponentToPage('faq')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Essential Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#059669',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  Essential
                </div>

                {/* Header */}
                <div style={{
                  padding: '20px 20px 16px 20px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  position: 'relative'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px'
                    }}>
                      <img 
                        src="https://img.icons8.com/ios-filled/24/ffffff/faq.png" 
                        alt="FAQ"
                        style={{
                          width: '20px',
                          height: '20px'
                        }}
                      />
                    </div>
                    <div>
                      <div>FAQ Section</div>
                      <div style={{ 
                        fontSize: '11px', 
                        opacity: 0.9, 
                        fontWeight: '400',
                        marginTop: '2px'
                      }}>
                        Frequently asked questions
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div style={{ padding: '20px' }}>
                  {/* FAQ Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    {/* Header Preview */}
                    <div style={{
                      textAlign: 'center',
                      marginBottom: '16px',
                      padding: '8px',
                      backgroundColor: '#eff6ff',
                      borderRadius: '6px',
                      border: '1px solid #3b82f6'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#1e40af',
                        marginBottom: '4px'
                      }}>
                        FAQ
                      </div>
                      <div style={{
                        fontSize: '9px',
                        color: '#6b7280'
                      }}>
                        + Add Question (3/10 questions)
                      </div>
                    </div>

                    {/* FAQ Items Preview */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      {[1, 2, 3].map((num) => (
                        <div key={num} style={{
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}>
                          {/* Question */}
                          <div style={{
                            padding: '12px',
                            backgroundColor: '#f8fafc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '11px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '8px',
                                fontWeight: '600'
                              }}>
                                {num}
                              </div>
                              <span style={{ fontWeight: '600', color: '#374151' }}>
                                {num === 1 ? 'What is your return policy?' : 
                                 num === 2 ? 'How long does shipping take?' : 
                                 'Do you offer international shipping?'}
                              </span>
                            </div>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                              <span style={{ fontSize: '8px' }}>✏️</span>
                              {num > 1 && <span style={{ fontSize: '8px', color: '#ef4444' }}>✕</span>}
                              <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: '600' }}>
                                {num === 1 ? '−' : '+'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Answer (only show for first item) */}
                          {num === 1 && (
                            <div style={{
                              padding: '8px 12px 12px 36px',
                              backgroundColor: '#f8fafc',
                              fontSize: '9px',
                              color: '#6b7280',
                              lineHeight: '1.3',
                              position: 'relative'
                            }}>
                              We offer a 30-day return policy for all items...
                              <span style={{
                                position: 'absolute',
                                top: '4px',
                                right: '8px',
                                fontSize: '8px'
                              }}>✏️</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div style={{
                      fontSize: '8px',
                      color: '#64748b',
                      textAlign: 'center',
                      padding: '6px',
                      backgroundColor: '#f1f5f9',
                      borderRadius: '4px',
                      fontStyle: 'italic'
                    }}>
                      💡 Collapsible Questions • Editable Content • Up to 10 FAQs
                    </div>
                  </div>
                </div>

                {/* Enhanced Add Button */}
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#3b82f6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <img 
                      src="https://img.icons8.com/ios-filled/16/3b82f6/faq.png" 
                      alt="FAQ"
                      style={{ width: '14px', height: '14px' }}
                    />
                    Add FAQ Section
                    <img 
                      src="https://img.icons8.com/ios-filled/16/3b82f6/faq.png" 
                      alt="FAQ"
                      style={{ width: '14px', height: '14px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Collage Card */}
              <div
                onClick={() => addComponentToPage('collage')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fdf2f8';
                  e.currentTarget.style.borderColor = '#ec4899';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(236, 72, 153, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Creative Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  Creative
                </div>

                {/* Header */}
                <div style={{
                  padding: '20px 20px 16px 20px',
                  background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                  color: 'white',
                  position: 'relative'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px'
                    }}>
                      <img 
                        src="https://img.icons8.com/ios-filled/24/ffffff/image-gallery.png" 
                        alt="Collage"
                        style={{
                          width: '20px',
                          height: '20px'
                        }}
                      />
                    </div>
                    <div>
                      <div>Product Collage</div>
                      <div style={{ 
                        fontSize: '11px', 
                        opacity: 0.9, 
                        fontWeight: '400',
                        marginTop: '2px'
                      }}>
                        Image + product showcase
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div style={{ padding: '20px' }}>
                  {/* Collage Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    {/* Header Preview */}
                    <div style={{
                      textAlign: 'center',
                      marginBottom: '16px',
                      padding: '8px',
                      backgroundColor: '#fdf2f8',
                      borderRadius: '6px',
                      border: '1px solid #ec4899'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#be185d',
                        marginBottom: '4px'
                      }}>
                        Product Showcase
                      </div>
                      <div style={{
                        fontSize: '9px',
                        color: '#6b7280',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px'
                      }}>
                        <span>⇄ Image Right</span>
                        <span>🛍️ Change Product</span>
                      </div>
                    </div>

                    {/* Layout Preview */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      marginBottom: '12px',
                      height: '80px'
                    }}>
                      {/* Image Side */}
                      <div style={{
                        backgroundColor: '#f8fafc',
                        border: '2px dashed #d1d5db',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: '#6b7280'
                      }}>
                        <div style={{ fontSize: '16px', marginBottom: '2px' }}>📷</div>
                        <div style={{ fontWeight: '600' }}>Upload Image</div>
                        <div style={{ fontSize: '8px' }}>Drag & Drop</div>
                      </div>

                      {/* Product Side */}
                      <div style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <img 
                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=20&h=20&fit=crop&crop=center"
                            alt="Product"
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '4px',
                              objectFit: 'cover'
                            }}
                          />
                          <div>
                            <div style={{ fontSize: '9px', fontWeight: '600', color: '#374151' }}>
                              Premium Headphones
                            </div>
                            <div style={{ fontSize: '8px', color: '#ec4899', fontWeight: '700' }}>
                              $199.99
                            </div>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: '4px'
                        }}>
                          <div style={{ fontSize: '8px', color: '#6b7280' }}>
                            ⭐ 4.8 (156)
                          </div>
                          <div style={{
                            fontSize: '8px',
                            backgroundColor: '#ec4899',
                            color: 'white',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            fontWeight: '600'
                          }}>
                            🛒
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div style={{
                      fontSize: '8px',
                      color: '#64748b',
                      textAlign: 'center',
                      padding: '6px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '4px',
                      fontStyle: 'italic'
                    }}>
                      📷 Image Upload • 🛍️ Product Selection • ⇄ Layout Toggle
                    </div>
                  </div>
                </div>

                {/* Enhanced Add Button */}
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#ec4899',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <img 
                      src="https://img.icons8.com/ios-filled/16/ec4899/image-gallery.png" 
                      alt="Collage"
                      style={{ width: '14px', height: '14px' }}
                    />
                    Add Product Collage
                    <img 
                      src="https://img.icons8.com/ios-filled/16/ec4899/image-gallery.png" 
                      alt="Collage"
                      style={{ width: '14px', height: '14px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Text + Image Card */}
              <div
                onClick={() => addComponentToPage('text-image')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f0ff';
                  e.currentTarget.style.borderColor = '#7c3aed';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(124, 58, 237, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Flexible Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#0891b2',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  Flexible
                </div>

                {/* Header */}
                <div style={{
                  padding: '20px 20px 16px 20px',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                  color: 'white',
                  position: 'relative'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px'
                    }}>
                      <img 
                        src="https://img.icons8.com/ios-filled/24/ffffff/text-box.png" 
                        alt="Text + Image"
                        style={{
                          width: '20px',
                          height: '20px'
                        }}
                      />
                    </div>
                    <div>
                      <div>Text + Image</div>
                      <div style={{ 
                        fontSize: '11px', 
                        opacity: 0.9, 
                        fontWeight: '400',
                        marginTop: '2px'
                      }}>
                        Multiple content rows
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div style={{ padding: '20px' }}>
                  {/* Text + Image Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    {/* Header Preview */}
                    <div style={{
                      textAlign: 'center',
                      marginBottom: '16px',
                      padding: '8px',
                      backgroundColor: '#f3f0ff',
                      borderRadius: '6px',
                      border: '1px solid #7c3aed'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#5b21b6',
                        marginBottom: '4px'
                      }}>
                        Content Showcase
                      </div>
                      <div style={{
                        fontSize: '9px',
                        color: '#6b7280',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px'
                      }}>
                        <span>+ Add Row</span>
                        <span>2 rows</span>
                      </div>
                    </div>

                    {/* Row Examples */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      {/* Row 1 */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '8px',
                        height: '60px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        {/* Row Controls */}
                        <div style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          display: 'flex',
                          gap: '2px',
                          zIndex: 2
                        }}>
                          <div style={{
                            backgroundColor: '#7c3aed',
                            color: 'white',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '8px',
                            fontWeight: '600'
                          }}>1</div>
                          <div style={{
                            backgroundColor: 'rgba(124, 58, 237, 0.1)',
                            color: '#7c3aed',
                            width: '16px',
                            height: '16px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '8px',
                            fontWeight: '600'
                          }}>⇄</div>
                        </div>

                        {/* Image Side */}
                        <div style={{
                          backgroundColor: '#f8fafc',
                          border: '1px dashed #d1d5db',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '8px',
                          color: '#6b7280'
                        }}>
                          <div style={{ fontSize: '12px', marginBottom: '2px' }}>🖼️</div>
                          <div style={{ fontWeight: '600' }}>Image</div>
                        </div>

                        {/* Text Side */}
                        <div style={{
                          backgroundColor: '#ffffff',
                          padding: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          fontSize: '8px'
                        }}>
                          <div style={{ fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                            Your main heading
                          </div>
                          <div style={{ color: '#6b7280', fontSize: '7px' }}>
                            Styled with rich text editor...
                          </div>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '2px',
                            marginTop: '2px'
                          }}>
                            <span style={{ fontSize: '6px' }}>✏️</span>
                            <span style={{ fontSize: '6px', color: '#7c3aed' }}>Style</span>
                          </div>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '8px',
                        height: '60px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        {/* Row Controls */}
                        <div style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          display: 'flex',
                          gap: '2px',
                          zIndex: 2
                        }}>
                          <div style={{
                            backgroundColor: '#7c3aed',
                            color: 'white',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '8px',
                            fontWeight: '600'
                          }}>2</div>
                          <div style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            width: '16px',
                            height: '16px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '8px'
                          }}>✕</div>
                        </div>

                        {/* Text Side (image-right layout) */}
                        <div style={{
                          backgroundColor: '#ffffff',
                          padding: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          fontSize: '8px'
                        }}>
                          <div style={{ fontWeight: '600', color: '#374151', marginBottom: '2px' }}>
                            Second content row
                          </div>
                          <div style={{ color: '#6b7280', fontSize: '7px' }}>
                            Different layout, flip-able
                          </div>
                        </div>

                        {/* Image Side */}
                        <div style={{
                          backgroundColor: '#f8fafc',
                          border: '1px dashed #d1d5db',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '8px',
                          color: '#6b7280'
                        }}>
                          <div style={{ fontSize: '12px', marginBottom: '2px' }}>🖼️</div>
                          <div style={{ fontWeight: '600' }}>Image</div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div style={{
                      fontSize: '8px',
                      color: '#64748b',
                      textAlign: 'center',
                      padding: '6px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '4px',
                      fontStyle: 'italic'
                    }}>
                      🖼️ Image Upload • ✏️ Rich Text Editor • ⇄ Layout Flip • + Add Rows
                    </div>
                  </div>
                </div>

                {/* Enhanced Add Button */}
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#7c3aed',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <img 
                      src="https://img.icons8.com/ios-filled/16/7c3aed/text-box.png" 
                      alt="Text + Image"
                      style={{ width: '14px', height: '14px' }}
                    />
                    Add Text + Image
                    <img 
                      src="https://img.icons8.com/ios-filled/16/7c3aed/text-box.png" 
                      alt="Text + Image"
                      style={{ width: '14px', height: '14px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Photo Grid Card */}
              <div
                onClick={() => addComponentToPage('photo-grid')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f9ff';
                  e.currentTarget.style.borderColor = '#0ea5e9';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(14, 165, 233, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Visual Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#7c2d12',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  Visual
                </div>

                {/* Header */}
                <div style={{
                  padding: '20px 20px 16px 20px',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  color: 'white',
                  position: 'relative'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px'
                    }}>
                      <img 
                        src="https://img.icons8.com/ios-filled/24/ffffff/image.png" 
                        alt="Photo Grid"
                        style={{
                          width: '20px',
                          height: '20px'
                        }}
                      />
                    </div>
                    <div>
                      <div>Photo Grid</div>
                      <div style={{ 
                        fontSize: '11px', 
                        opacity: 0.9, 
                        fontWeight: '400',
                        marginTop: '2px'
                      }}>
                        Gallery with customization
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div style={{ padding: '20px' }}>
                  {/* Photo Grid Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    {/* Header Preview */}
                    <div style={{
                      textAlign: 'center',
                      marginBottom: '16px',
                      padding: '8px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '6px',
                      border: '1px solid #0ea5e9'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#0284c7',
                        marginBottom: '4px'
                      }}>
                        Photo Gallery
                      </div>
                      <div style={{
                        fontSize: '9px',
                        color: '#6b7280',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px'
                      }}>
                        <span>⚙️ Settings</span>
                        <span>📷 Add Photo</span>
                        <span>4/12</span>
                      </div>
                    </div>

                    {/* View Toggle Preview */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        backgroundColor: '#0ea5e9',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '8px',
                        fontWeight: '600'
                      }}>
                        🔲 Grid View
                      </div>
                      <div style={{
                        backgroundColor: 'white',
                        color: '#0284c7',
                        border: '1px solid #e0f2fe',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '8px',
                        fontWeight: '600'
                      }}>
                        ↔️ Horizontal Scroll
                      </div>
                    </div>

                    {/* Grid Preview */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '6px',
                      marginBottom: '12px'
                    }}>
                      {[1, 2, 3, 4].map((num) => (
                        <div key={num} style={{
                          aspectRatio: '1',
                          backgroundColor: '#f8fafc',
                          border: '2px dashed #cbd5e1',
                          borderRadius: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '8px',
                          color: '#64748b',
                          position: 'relative'
                        }}>
                          {/* Photo Number */}
                          <div style={{
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                            backgroundColor: '#0ea5e9',
                            color: 'white',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '6px',
                            fontWeight: '600'
                          }}>
                            {num}
                          </div>
                          
                          {num === 4 ? (
                            <>
                              <div style={{ fontSize: '10px', marginBottom: '2px' }}>+</div>
                              <div style={{ fontWeight: '600' }}>Add</div>
                            </>
                          ) : (
                            <>
                              <div style={{ fontSize: '10px', marginBottom: '2px' }}>📷</div>
                              <div style={{ fontWeight: '600' }}>Upload</div>
                              {num === 1 && (
                                <div style={{ fontSize: '6px', marginTop: '2px' }}>
                                  Photo 1
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Settings Preview */}
                    <div style={{
                      fontSize: '8px',
                      color: '#64748b',
                      textAlign: 'center',
                      padding: '6px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '4px',
                      fontStyle: 'italic'
                    }}>
                      ⚙️ Settings Panel • 📷 Image Upload • 🔲 Grid/Scroll Views • ✏️ Captions
                    </div>
                  </div>
                </div>

                {/* Enhanced Add Button */}
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#0ea5e9',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <img 
                      src="https://img.icons8.com/ios-filled/16/0ea5e9/image.png" 
                      alt="Photo Grid"
                      style={{ width: '14px', height: '14px' }}
                    />
                    Add Photo Grid
                    <img 
                      src="https://img.icons8.com/ios-filled/16/0ea5e9/image.png" 
                      alt="Photo Grid"
                      style={{ width: '14px', height: '14px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Product Display Card */}
              <div
                onClick={() => addComponentToPage('product-display')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f3ff';
                  e.currentTarget.style.borderColor = '#8b5cf6';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 92, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Commerce Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#059669',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  Commerce
                </div>

                {/* Header */}
                <div style={{
                  padding: '20px 20px 16px 20px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: 'white',
                  position: 'relative'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px'
                    }}>
                      <img
                        src="https://img.icons8.com/ios-filled/24/ffffff/shopping-bag.png"
                        alt="Product Display"
                        style={{
                          width: '20px',
                          height: '20px'
                        }}
                      />
                    </div>
                    <div>
                      <div>Product Display</div>
                      <div style={{
                        fontSize: '11px',
                        opacity: 0.9,
                        fontWeight: '400',
                        marginTop: '2px'
                      }}>
                        Dynamic product showcase
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div style={{ padding: '20px' }}>
                  {/* Product Display Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    {/* Header Preview */}
                    <div style={{
                      textAlign: 'center',
                      marginBottom: '16px',
                      padding: '8px',
                      backgroundColor: '#f5f3ff',
                      borderRadius: '6px',
                      border: '1px solid #8b5cf6'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#7c3aed',
                        marginBottom: '4px'
                      }}>
                        Our Products
                      </div>
                      <div style={{
                        fontSize: '9px',
                        color: '#6b7280',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px'
                      }}>
                        <span>⚙️ Settings</span>
                        <span>🛍️ Add Product</span>
                        <span>6/6</span>
                      </div>
                    </div>

                    {/* View Toggle Preview */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'center',
                      marginBottom: '8px',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{
                        backgroundColor: '#8b5cf6',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '8px',
                        fontWeight: '600'
                      }}>
                        🔲 Grid View
                      </div>
                      <div style={{
                        backgroundColor: 'white',
                        color: '#7c3aed',
                        border: '1px solid #e9d5ff',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '8px',
                        fontWeight: '600'
                      }}>
                        ↔️ Horizontal Scroll
                      </div>
                      <div style={{
                        backgroundColor: '#f3f4f6',
                        color: '#6b7280',
                        padding: '3px 6px',
                        borderRadius: '4px',
                        fontSize: '7px',
                        fontWeight: '600'
                      }}>
                        📱 2 Columns
                      </div>
                    </div>

                    {/* Grid Preview */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '4px',
                      marginBottom: '12px'
                    }}>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={num} style={{
                          aspectRatio: '0.8',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '6px',
                          color: '#64748b',
                          position: 'relative',
                          padding: '2px'
                        }}>
                          {/* Remove Button */}
                          <div style={{
                            position: 'absolute',
                            top: '1px',
                            right: '1px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '5px',
                            fontWeight: '600'
                          }}>
                            ✕
                          </div>
                          
                          {/* Product Image */}
                          <div style={{
                            width: '100%',
                            height: '60%',
                            backgroundColor: '#e2e8f0',
                            borderRadius: '3px',
                            marginBottom: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <div style={{ fontSize: '8px' }}>🛍️</div>
                          </div>
                          
                          {/* Product Info */}
                          <div style={{
                            fontSize: '5px',
                            fontWeight: '600',
                            color: '#374151',
                            textAlign: 'center',
                            lineHeight: 1.2
                          }}>
                            Product {num}
                          </div>
                          <div style={{
                            fontSize: '4px',
                            color: '#8b5cf6',
                            fontWeight: '600'
                          }}>
                            $99
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Settings Preview */}
                    <div style={{
                      fontSize: '8px',
                      color: '#64748b',
                      textAlign: 'center',
                      padding: '6px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '4px',
                      fontStyle: 'italic'
                    }}>
                      ✏️ StyleTextUser Header • ⚙️ Grid/Horizontal Views • 📱 Mobile Columns • 🛍️ Dynamic Add/Remove
                    </div>
                  </div>
                </div>

                {/* Enhanced Add Button */}
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#8b5cf6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <img
                      src="https://img.icons8.com/ios-filled/16/8b5cf6/shopping-bag.png"
                      alt="Product Display"
                      style={{ width: '14px', height: '14px' }}
                    />
                    Add Product Display
                    <img
                      src="https://img.icons8.com/ios-filled/16/8b5cf6/shopping-bag.png"
                      alt="Product Display"
                      style={{ width: '14px', height: '14px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Sliding Banner Card */}
              <div
                onClick={() => addComponentToPage('sliding-banner')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ecfdf5';
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(16, 185, 129, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Interactive Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#4338ca',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  Interactive
                </div>

                {/* Header */}
                <div style={{
                  padding: '20px 20px 16px 20px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  position: 'relative'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px'
                    }}>
                      <img
                        src="https://img.icons8.com/ios-filled/24/ffffff/banner.png"
                        alt="Sliding Banner"
                        style={{
                          width: '20px',
                          height: '20px'
                        }}
                      />
                    </div>
                    <div>
                      <div>Sliding Banner</div>
                      <div style={{
                        fontSize: '11px',
                        opacity: 0.9,
                        fontWeight: '400',
                        marginTop: '2px'
                      }}>
                        Interactive banner slides
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div style={{ padding: '20px' }}>
                  {/* Sliding Banner Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    {/* Toolbar Preview */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      padding: '8px 12px',
                      backgroundColor: '#ecfdf5',
                      borderRadius: '8px',
                      border: '1px solid #10b981'
                    }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#059669'
                      }}>
                        Sliding Banner
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '4px'
                      }}>
                        {['➕', '📷', '🔗', '📐', '🗑️'].map((icon, index) => (
                          <div key={index} style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: index === 0 ? '#10b981' : 
                                           index === 1 ? '#3b82f6' :
                                           index === 2 ? '#a855f7' :
                                           index === 3 ? '#f59e0b' : '#ef4444',
                            color: 'white',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '8px',
                            opacity: 0.8
                          }}>
                            {icon}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Banner Preview */}
                    <div style={{
                      position: 'relative',
                      backgroundColor: '#000',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '12px',
                      height: '100px'
                    }}>
                      {/* Mock Banner */}
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(45deg, #10b981 0%, #059669 50%, #10b981 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        position: 'relative'
                      }}>
                        🏷️
                        
                        {/* Link Indicator */}
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          padding: '3px 6px',
                          borderRadius: '10px',
                          fontSize: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}>
                          🔗 <span>product</span>
                        </div>
                        
                        {/* Navigation Arrows */}
                        <div style={{
                          position: 'absolute',
                          left: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          color: 'white',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '6px'
                        }}>
                          ❮
                        </div>
                        
                        <div style={{
                          position: 'absolute',
                          right: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          color: 'white',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '6px'
                        }}>
                          ❯
                        </div>

                        {/* Slide Dots */}
                        <div style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          display: 'flex',
                          gap: '3px'
                        }}>
                          {[1, 2, 3].map((dot) => (
                            <div key={dot} style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              backgroundColor: dot === 2 ? 'white' : 'rgba(255, 255, 255, 0.5)',
                              border: '1px solid rgba(255, 255, 255, 0.3)'
                            }} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Status Preview */}
                    <div style={{
                      backgroundColor: '#f0fdf4',
                      borderRadius: '6px',
                      padding: '8px',
                      border: '1px solid #bbf7d0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        fontSize: '10px',
                        fontWeight: '600',
                        color: '#065f46'
                      }}>
                        Banner 2 of 3
                      </div>
                      <div style={{
                        fontSize: '8px',
                        color: '#059669',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        padding: '2px 6px',
                        borderRadius: '8px'
                      }}>
                        Links to: product
                      </div>
                    </div>

                    {/* Features Preview */}
                    <div style={{
                      fontSize: '8px',
                      color: '#64748b',
                      textAlign: 'center',
                      padding: '6px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '4px',
                      fontStyle: 'italic',
                      marginTop: '8px'
                    }}>
                      ➕ Add Banners • 📷 Upload Images • 🔗 Link Actions • 📐 Dimensions
                    </div>
                  </div>
                </div>

                {/* Enhanced Add Button */}
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#10b981',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <img
                      src="https://img.icons8.com/ios-filled/16/10b981/banner.png"
                      alt="Sliding Banner"
                      style={{ width: '14px', height: '14px' }}
                    />
                    Add Sliding Banner
                    <img
                      src="https://img.icons8.com/ios-filled/16/10b981/banner.png"
                      alt="Sliding Banner"
                      style={{ width: '14px', height: '14px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Products Card */}
              <div
                onClick={() => addComponentToPage('navigation-products')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#6366f1';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Advanced Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#7c3aed',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  zIndex: 2
                }}>
                  Advanced
                </div>

                {/* Header */}
                <div style={{
                  padding: '20px 20px 16px 20px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: 'white',
                  position: 'relative'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px'
                    }}>
                      <img
                        src="https://img.icons8.com/ios-filled/24/ffffff/tabs.png"
                        alt="Navigation Products"
                        style={{
                          width: '20px',
                          height: '20px'
                        }}
                      />
                    </div>
                    <div>
                      <div>Navigation Products</div>
                      <div style={{
                        fontSize: '11px',
                        opacity: 0.9,
                        fontWeight: '400',
                        marginTop: '2px'
                      }}>
                        Tabbed product showcase
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div style={{ padding: '20px' }}>
                  {/* Navigation Products Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    {/* Controls Preview */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      padding: '8px 12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #6366f1'
                    }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#4f46e5'
                      }}>
                        Product Categories
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '4px'
                      }}>
                        {['➕ Add Tab', '🛍️ Add Product', '⚙️'].map((label, index) => (
                          <div key={index} style={{
                            fontSize: '6px',
                            backgroundColor: index === 0 ? '#22c55e' : 
                                           index === 1 ? '#f59e0b' : '#6366f1',
                            color: 'white',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            fontWeight: '600'
                          }}>
                            {label.split(' ')[0]}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Tabs Preview */}
                    <div style={{
                      display: 'flex',
                      gap: '2px',
                      marginBottom: '12px',
                      padding: '8px 12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '6px'
                    }}>
                      {['New! (2)', 'Dresses (2)', 'Tops (2)'].map((tab, index) => (
                        <div key={index} style={{
                          padding: '4px 8px',
                          fontSize: '8px',
                          fontWeight: '600',
                          borderRadius: '12px',
                          backgroundColor: index === 1 ? '#6366f1' : 'transparent',
                          color: index === 1 ? 'white' : '#64748b',
                          border: index === 1 ? 'none' : '1px solid #e2e8f0'
                        }}>
                          {tab}
                        </div>
                      ))}
                    </div>

                    {/* Products Grid Preview */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '4px',
                      marginBottom: '12px'
                    }}>
                      {[1, 2, 3].map((num) => (
                        <div key={num} style={{
                          aspectRatio: '0.8',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '6px',
                          color: '#64748b',
                          position: 'relative',
                          padding: '2px'
                        }}>
                          {/* Remove Button */}
                          <div style={{
                            position: 'absolute',
                            top: '1px',
                            right: '1px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '5px',
                            fontWeight: '600'
                          }}>
                            ✕
                          </div>
                          
                          {/* Product Image */}
                          <div style={{
                            width: '100%',
                            height: '60%',
                            backgroundColor: '#e2e8f0',
                            borderRadius: '3px',
                            marginBottom: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <div style={{ fontSize: '8px' }}>{num === 1 ? '👗' : num === 2 ? '👚' : '🧥'}</div>
                          </div>
                          
                          {/* Product Info */}
                          <div style={{
                            fontSize: '4px',
                            fontWeight: '600',
                            color: '#374151',
                            textAlign: 'center',
                            lineHeight: 1.2
                          }}>
                            {num === 1 ? 'Dress' : num === 2 ? 'Top' : 'Jacket'}
                          </div>
                          <div style={{
                            fontSize: '4px',
                            color: '#6366f1',
                            fontWeight: '600'
                          }}>
                            ${num === 1 ? '138' : num === 2 ? '85' : '95'}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tab Info Preview */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '6px',
                      padding: '6px 8px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        fontSize: '8px',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Tab: Dresses
                      </div>
                      <div style={{
                        fontSize: '7px',
                        color: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        padding: '2px 4px',
                        borderRadius: '6px'
                      }}>
                        2/8 products
                      </div>
                    </div>

                    {/* Features Preview */}
                    <div style={{
                      fontSize: '8px',
                      color: '#64748b',
                      textAlign: 'center',
                      padding: '6px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '4px',
                      fontStyle: 'italic',
                      marginTop: '8px'
                    }}>
                      📑 Dynamic Tabs • 🛍️ Product Management • 🎨 Style Options • 📊 Grid Layout
                    </div>
                  </div>
                </div>

                {/* Enhanced Add Button */}
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#6366f1',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <img
                      src="https://img.icons8.com/ios-filled/16/6366f1/tabs.png"
                      alt="Navigation Products"
                      style={{ width: '14px', height: '14px' }}
                    />
                    Add Navigation Products
                    <img
                      src="https://img.icons8.com/ios-filled/16/6366f1/tabs.png"
                      alt="Navigation Products"
                      style={{ width: '14px', height: '14px' }}
                    />
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
                💡 How it works:
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