'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './StoreStepper.css';

interface StoreStepperProps {
  onClose: () => void;
  onComplete: () => void;
  storeName?: string;
}

const StoreStepper: React.FC<StoreStepperProps> = ({ onClose, onComplete, storeName = "yourstore" }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const steps = [
    {
      title: "Demo Products Created",
      content: (
        <div className="step-content">
          <div className="product-creation-illustration">
            <div className="illustration-title">
              <h4>How to Add More Products</h4>
              <p>Use the +Product button in the navigation bar</p>
            </div>
            <div className="nav-bar-illustration">
              <div className="nav-bar-container">
                <div className="nav-item highlighted">
                  <span className="nav-icon">+</span>
                  <span className="nav-text">Product</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">⭕</span>
                  <span className="nav-text">Collection</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📋</span>
                  <span className="nav-text">Create Catalog</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📄</span>
                  <span className="nav-text">Create Page</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📱</span>
                  <span className="nav-text">Mobile</span>
                </div>
              </div>

            </div>
          </div>
          <h3>We've created 2 demo products for you!</h3>
          <div className="demo-products">
            <div className="demo-product">
              <div className="product-image">📱</div>
              <div className="product-info">
                <h4>iPhone 14 Pro</h4>
                <p>Latest smartphone with advanced features</p>
                <span className="price">$999</span>
              </div>
            </div>
            <div className="demo-product">
              <div className="product-image">💻</div>
              <div className="product-info">
                <h4>MacBook Air</h4>
                <p>Lightweight laptop for productivity</p>
                <span className="price">$1,199</span>
              </div>
            </div>
          </div>
          <p className="step-description">
            These products are ready to showcase your store. You can edit them or add your own products later.
          </p>
        </div>
      )
    },
    {
      title: "Collection Page Ready",
      content: (
        <div className="step-content">
          <div className="collection-creation-illustration">
            <div className="illustration-title">
              <h4>How to Create Collection Pages</h4>
              <p>Use the Collection button in the navigation bar</p>
            </div>
            <div className="nav-bar-illustration">
              <div className="nav-bar-container">
                <div className="nav-item">
                  <span className="nav-icon">+</span>
                  <span className="nav-text">Product</span>
                </div>
                <div className="nav-item highlighted">
                  <span className="nav-icon">⭕</span>
                  <span className="nav-text">Collection</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📋</span>
                  <span className="nav-text">Create Catalog</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📄</span>
                  <span className="nav-text">Create Page</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📱</span>
                  <span className="nav-text">Mobile</span>
                </div>
              </div>
            </div>
          </div>
          
          <h3>Collection Page Example</h3>
          <div className="collection-page-demo">
            <div className="demo-header">
              <div className="demo-title">Bags collection</div>
            </div>
            <div className="demo-layout">
              <div className="demo-main">
                <div className="demo-controls">
                  <div className="sort-dropdown">Sort by: Featured ▼</div>
                  <div className="view-options">
                    <span className="grid-view active">⊞</span>
                    <span className="list-view">☰</span>
                  </div>
                </div>
                <div className="demo-products">
                  <div className="demo-product">
                    <div className="product-img">👜</div>
                    <div className="product-details">
                      <div className="brand">WINTER SESSION</div>
                      <div className="name">Felix Waxed Canvas Bag</div>
                      <div className="price">$311.00</div>
                      <div className="reviews">★★★★★ 5 reviews</div>
                    </div>
                  </div>
                  <div className="demo-product">
                    <div className="product-img">👜</div>
                    <div className="product-details">
                      <div className="brand">WINTER SESSION</div>
                      <div className="name">Felix Waxed Canvas Bag</div>
                      <div className="price">$311.00</div>
                      <div className="reviews">☆☆☆☆☆ No reviews</div>
                    </div>
                  </div>
                  <div className="demo-product">
                    <div className="product-img">👜</div>
                    <div className="product-details">
                      <div className="brand">WINTER SESSION</div>
                      <div className="name">Felix Waxed Canvas Bag</div>
                      <div className="price">$311.00</div>
                      <div className="reviews">☆☆☆☆☆ No reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )
    },
    {
      title: "Create Catalog",
      content: (
        <div className="step-content">
          <div className="catalog-creation-illustration">
            <div className="illustration-title">
              <h4>How to Create Your Catalog</h4>
              <p>Use the Create Catalog button in the navigation bar</p>
            </div>
            <div className="nav-bar-illustration">
              <div className="nav-bar-container">
                <div className="nav-item">
                  <span className="nav-icon">+</span>
                  <span className="nav-text">Product</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">⭕</span>
                  <span className="nav-text">Collection</span>
                </div>
                <div className="nav-item highlighted">
                  <span className="nav-icon">📋</span>
                  <span className="nav-text">Create Catalog</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📄</span>
                  <span className="nav-text">Create Page</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📱</span>
                  <span className="nav-text">Mobile</span>
                </div>
              </div>
            </div>
          </div>
          
          <h3>Catalog Example</h3>
          <div className="catalog-page-demo">
            <div className="demo-header">
              <div className="demo-title">Catalog</div>
            </div>
            <div className="demo-layout">
              <div className="demo-main">
                <div className="catalog-tabs">
                  <div className="catalog-tab active">
                    <span className="tab-icon">🎩</span>
                    <span className="tab-text">Hats (1)</span>
                  </div>
                  <div className="catalog-tab">
                    <span className="tab-icon">👖</span>
                    <span className="tab-text">Pants (1)</span>
                  </div>
                  <div className="catalog-tab">
                    <span className="tab-icon">👕</span>
                    <span className="tab-text">Shirts (1)</span>
                  </div>
                  <div className="catalog-tab">
                    <span className="tab-icon">🧥</span>
                    <span className="tab-text">Outerwear (1)</span>
                  </div>
                  <div className="catalog-tab">
                    <span className="tab-icon">👗</span>
                    <span className="tab-text">Dresses (1)</span>
                  </div>
                </div>
                
                <div className="catalog-content">
                  <div className="category-header">
                    <span className="category-icon">🎩</span>
                    <h4>Hats</h4>
                  </div>
                  
                  <div className="catalog-products">
                    <div className="catalog-product">
                      <div className="product-image-placeholder">
                        <span className="placeholder-text">Classic Hat</span>
                      </div>
                      <div className="product-details">
                        <h5>Classic Hat</h5>
                        <div className="price-info">
                          <span className="current-price">$29.99</span>
                          <span className="original-price">$39.99</span>
                        </div>
                        <p className="product-description">Stylish and comfortable hat for all occasions. Made with premium materials for lasting comfort.</p>
                        <div className="product-meta">
                          <span className="stock-info">In Stock: 15</span>
                          <button className="view-details-btn">View Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Home Page Design",
      content: (
        <div className="step-content">
          <div className="design-creation-illustration">
            <div className="illustration-title">
              <h4>How to Improve Your Home Page</h4>
              <p>Use the ADD DESIGN button to add wonderful designs</p>
            </div>
            <div className="nav-bar-illustration">
              <div className="nav-bar-container">
                <div className="nav-item">
                  <span className="nav-icon">+</span>
                  <span className="nav-text">Product</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">⭕</span>
                  <span className="nav-text">Collection</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📋</span>
                  <span className="nav-text">Create Catalog</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📄</span>
                  <span className="nav-text">Create Page</span>
                </div>
                <div className="nav-item highlighted">
                  <span className="nav-icon">🎨</span>
                  <span className="nav-text">ADD DESIGN</span>
                </div>
              </div>
            </div>
          </div>
          
          <h3>Design Components Available</h3>
          <div className="design-components-demo">
            <div className="components-grid">
              <div className="design-component">
                <div className="component-icon">🖼️</div>
                <h4>Sliding Banner</h4>
                <p>Dynamic banners to showcase your brand</p>
              </div>
              <div className="design-component">
                <div className="component-icon">📦</div>
                <h4>Product Show</h4>
                <p>Display your products in style</p>
              </div>
              <div className="design-component">
                <div className="component-icon">🖼️</div>
                <h4>Photo Grid</h4>
                <p>Beautiful image galleries</p>
              </div>
              <div className="design-component">
                <div className="component-icon">📝</div>
                <h4>Image Text</h4>
                <p>Text overlays on images</p>
              </div>
              <div className="design-component">
                <div className="component-icon">⭐</div>
                <h4>Features Product</h4>
                <p>Highlight your best products</p>
              </div>
              <div className="design-component">
                <div className="component-icon">📧</div>
                <h4>Email Subscription</h4>
                <p>Build your email list</p>
              </div>
            </div>
          </div>
          <p className="step-description">
            By using the ADD DESIGN button, you can add many wonderful designs to improve your home page and create a better shopping experience for your customers.
          </p>
        </div>
      )
    },
    {
      title: "Store is Live!",
      content: (
        <div className="step-content">
          <div className="step-icon">🎉</div>
          <h3>Congratulations! Your Store is Live</h3>
          <div className="store-url-section">
            <h4>Your Store URL:</h4>
            <div className="store-url-display">
              <span className="url-text">https://www.{storeName}.9jkl.com</span>
              <button className="copy-btn">📋</button>
            </div>
          </div>
          <div className="next-steps">
            <p>Share your store address with your customers, you also can buy your personal domain and link it to your store.</p>
          </div>
          <p className="step-description">
            Your store is now live and ready to accept customers! Share your URL and start selling your products.
          </p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
      router.push('/design');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="stepper-overlay">
      <div className="stepper-modal">
        <div className="stepper-header">
          <h2>Setting Up Your Store</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="stepper-progress">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`progress-step ${index + 1 <= currentStep ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="stepper-content">
          {steps[currentStep - 1].content}
        </div>

        <div className="stepper-actions">
          {currentStep > 1 && (
            <button className="prev-btn" onClick={handlePrevious}>
              Previous
            </button>
          )}
          <button className="next-btn" onClick={handleNext}>
            {currentStep === 5 ? 'Go to Design Page' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreStepper;

