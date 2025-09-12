'use client';

import React from 'react';
import DesignStorePagesLayout from '../../components/DesignStorePagesLayout';

const ExampleLayoutPage: React.FC = () => {
  return (
    <DesignStorePagesLayout 
      showBackButton={true}
      backUrl="/Store-homepage"
    >
      <div className="content-wrapper fade-in">
        <div className="page-header">
          <h1>Example Layout Page</h1>
          <p>This page demonstrates how to use the DesignStorePagesLayout component</p>
        </div>
        
        <div className="page-content slide-in-left">
          <h2>Features Included</h2>
          <ul>
            <li>✅ PlatformBar with back button and title</li>
            <li>✅ EditorBarDrawer with sidebar and controls</li>
            <li>✅ StoreBar with logo and action buttons</li>
            <li>✅ Mobile Simulator functionality</li>
            <li>✅ Footer component</li>
            <li>✅ Responsive design</li>
            <li>✅ All state management included</li>
          </ul>
        </div>
        
        <div className="page-content scale-in">
          <h2>How to Use</h2>
          <p>
            Simply wrap your page content with the <code>DesignStorePagesLayout</code> component 
            and pass your content as children. The layout will handle all the navigation, 
            state management, and UI components automatically.
          </p>
          
          <h3>Props Available:</h3>
          <ul>
            <li><strong>children</strong>: Your page content</li>
            <li><strong>title</strong>: Page title for the PlatformBar</li>
            <li><strong>showBackButton</strong>: Whether to show back button</li>
            <li><strong>backUrl</strong>: URL to navigate to when back button is clicked</li>
            <li><strong>onBackClick</strong>: Custom back button handler</li>
          </ul>
        </div>
      </div>
    </DesignStorePagesLayout>
  );
};

export default ExampleLayoutPage;
