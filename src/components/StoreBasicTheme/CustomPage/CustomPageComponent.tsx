'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DesignStorePagesLayout from '../Layout/DesignStorePagesLayout';
import HomePageCard from '../HomePageCardComponents/HomePageCard';
import './CustomPageComponent.css';

interface CustomPageData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
}

const CustomPageComponent: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [pageData, setPageData] = useState<CustomPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPageData = () => {
      try {
        const savedCustomPages = localStorage.getItem('customPages');
        if (savedCustomPages) {
          const customPages = JSON.parse(savedCustomPages);
          const foundPage = customPages.find((page: any) => page.slug === slug);
          
          if (foundPage) {
            setPageData({
              ...foundPage,
              createdAt: new Date(foundPage.createdAt)
            });
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading custom page:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPageData();
    }
  }, [slug]);

  if (loading) {
    return (
      <DesignStorePagesLayout 
        title="Loading..." 
        showBackButton={true}
        backUrl="/custom-page-management"
      >
        <div className="custom-page-loading">
          <div className="loading-spinner"></div>
          <p>Loading custom page...</p>
        </div>
      </DesignStorePagesLayout>
    );
  }

  if (notFound || !pageData) {
    return (
      <DesignStorePagesLayout 
        title="Page Not Found" 
        showBackButton={true}
        backUrl="/custom-page-management"
      >
        <div className="custom-page-not-found">
          <div className="not-found-icon">📄</div>
          <h2>Custom Page Not Found</h2>
          <p>The requested custom page could not be found.</p>
          <button 
            className="back-to-management-btn"
            onClick={() => router.push('/custom-page-management')}
          >
            Back to Custom Pages
          </button>
        </div>
      </DesignStorePagesLayout>
    );
  }

  return (
    <DesignStorePagesLayout 
      title={pageData.name}
      showBackButton={true}
      backUrl="/custom-page-management"
    >
      <div className="custom-page-container">
        {/* Home Page Card - This allows the user to design their custom page */}
        <HomePageCard />
      </div>
    </DesignStorePagesLayout>
  );
};

export default CustomPageComponent;
