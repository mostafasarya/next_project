'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DesignStorePagesLayout from '../../../components/StoreBasicTheme/Layout/DesignStorePagesLayout';
import CatalogPage from '../../../components/StoreBasicTheme/Catalog/CatalogPage';

interface CatalogPageData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
}

const DynamicCatalogPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;
  
  const [catalogData, setCatalogData] = useState<CatalogPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Load catalog page data
  useEffect(() => {
    const loadCatalogData = () => {
      try {
        const savedCatalogPages = localStorage.getItem('catalogPages');
        if (savedCatalogPages) {
          const catalogPages: CatalogPageData[] = JSON.parse(savedCatalogPages).map((page: any) => ({
            ...page,
            createdAt: new Date(page.createdAt)
          }));
          
          const foundPage = catalogPages.find(page => page.slug === slug);
          if (foundPage) {
            setCatalogData(foundPage);
          } else {
            setNotFound(true);
          }
        } else {
          // If no saved catalogs, use default data
          setCatalogData({
            id: 'default',
            name: 'Catalog',
            slug: slug,
            description: 'Welcome to our product catalog',
            createdAt: new Date()
          });
        }
      } catch (error) {
        console.error('Error loading catalog data:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadCatalogData();
    }
  }, [slug]);

  if (loading) {
    return (
      <DesignStorePagesLayout 
        title="Loading..."
        showBackButton={true}
        backUrl="/catalog-management"
      >
        <CatalogPage title="Loading..." description="Please wait..." />
      </DesignStorePagesLayout>
    );
  }

  if (notFound) {
    return (
      <DesignStorePagesLayout 
        title="Catalog Not Found"
        showBackButton={true}
        backUrl="/catalog-management"
      >
        <CatalogPage 
          title="Catalog Not Found" 
          description="The catalog you're looking for doesn't exist."
        />
      </DesignStorePagesLayout>
    );
  }

  return (
    <DesignStorePagesLayout 
      title={catalogData?.name || "Catalog"}
      showBackButton={true}
      backUrl="/catalog-management"
    >
      <CatalogPage 
        title={catalogData?.name}
        description={catalogData?.description}
        catalogSlug={slug}
      />
    </DesignStorePagesLayout>
  );
};

export default DynamicCatalogPage;
