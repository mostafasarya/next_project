'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DesignStorePagesLayout from '../../../components/DesignStorePagesLayout';
import CollectionPageCard from '../../../components/CollectionPageCard';
import './CollectionDetailPage.css';

interface Collection {
  id: string;
  name: string;
  description?: string;
}

const CollectionDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [collection, setCollection] = useState<Collection | null>(null);

  // Load collection data
  useEffect(() => {
    const loadCollectionData = () => {
      try {
        const savedCollections = localStorage.getItem('collections');
        if (savedCollections) {
          const parsedCollections = JSON.parse(savedCollections);
          const collectionId = params.id as string;
          const foundCollection = parsedCollections.find((c: any) => c.id === collectionId);
          
          if (foundCollection) {
            setCollection({
              id: foundCollection.id,
              name: foundCollection.name,
              description: foundCollection.description || ''
            });
            return;
          }
        }
        
        // Fallback to basic collection info
        setCollection({
          id: params.id as string,
          name: `Collection ${params.id}`,
          description: 'A beautiful collection of curated products'
        });
      } catch (error) {
        console.error('Error loading collection data:', error);
        // Fallback collection
        setCollection({
          id: params.id as string,
          name: `Collection ${params.id}`,
          description: 'A beautiful collection of curated products'
        });
      }
    };

    loadCollectionData();
  }, [params.id]);

  if (!collection) {
    return (
      <DesignStorePagesLayout>
        <div className="collection-loading">
          <div className="loading-content">
            <div className="loading-icon">📁</div>
            <p>Loading collection...</p>
          </div>
        </div>
      </DesignStorePagesLayout>
    );
  }

  return (
    <DesignStorePagesLayout>
      <CollectionPageCard
        collectionId={collection.id}
        collectionName={collection.name}
        collectionDescription={collection.description}
      />
    </DesignStorePagesLayout>
  );
};

export default CollectionDetailPage;