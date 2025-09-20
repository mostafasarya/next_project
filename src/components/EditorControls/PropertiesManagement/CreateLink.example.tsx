// Example usage of CreateLink component
import React, { useState } from 'react';
import CreateLink, { LinkData, AvailablePages } from './CreateLink';

const CreateLinkExample: React.FC = () => {
  const [showLinkDrawer, setShowLinkDrawer] = useState(false);
  const [currentLinkData, setCurrentLinkData] = useState<LinkData>({
    linkType: 'collection',
    linkTarget: ''
  });

  // Custom available pages (optional - will use defaults if not provided)
  const customAvailablePages: AvailablePages = {
    collection: [
      { id: '1', name: 'Featured Collection', slug: 'featured' },
      { id: '2', name: 'New Arrivals', slug: 'new-arrivals' }
    ],
    catalog: [
      { id: '1', name: 'Premium Catalog', slug: 'premium' }
    ],
    page: [
      { id: '1', name: 'Support Page', slug: 'support' }
    ]
  };

  const handleSaveLink = (linkData: LinkData) => {
    console.log('Link saved:', linkData);
    setCurrentLinkData(linkData);
    // Here you would typically save the link to your component's state
    // or send it to a parent component
  };

  const handleRemoveLink = () => {
    console.log('Link removed');
    setCurrentLinkData({ linkType: 'collection', linkTarget: '' });
    // Here you would typically remove the link from your component's state
  };

  return (
    <div>
      <button onClick={() => setShowLinkDrawer(true)}>
        Add Link
      </button>
      
      <CreateLink
        isOpen={showLinkDrawer}
        onClose={() => setShowLinkDrawer(false)}
        title="Add Link to Component"
        initialLinkData={currentLinkData}
        onSave={handleSaveLink}
        onRemove={handleRemoveLink}
        availablePages={customAvailablePages} // Optional - uses defaults if not provided
        width={400} // Optional - defaults to 350
        position="right" // Optional - defaults to 'right'
        pushContent={true} // Optional - defaults to true
      />
    </div>
  );
};

export default CreateLinkExample;
