'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import DesignStorePagesLayout from '../../../components/StoreBasicTheme/Layout/DesignStorePagesLayout';
import ProductPageCard from '../../../components/StoreBasicTheme/ProductPageCard/ProductPageCard';

const ProductPage: React.FC = () => {
  const params = useParams();
  const productName = decodeURIComponent(params.id as string);

  // Sample product data - in a real app, this would come from an API or database
  const sampleProduct = {
    name: productName,
    price: 29.99,
    description: "This is a high-quality product with excellent features and great value for money. Perfect for everyday use and built to last.",
    images: [
      "https://via.placeholder.com/400x400/007bff/ffffff?text=Product+Image",
      "https://via.placeholder.com/400x400/28a745/ffffff?text=Image+2",
      "https://via.placeholder.com/400x400/dc3545/ffffff?text=Image+3",
      "https://via.placeholder.com/400x400/ffc107/ffffff?text=Image+4"
    ],
    variants: [
      {
        name: "Size",
        options: ["XS", "S", "M", "L", "XL"]
      },
      {
        name: "Color",
        options: ["Red", "Blue", "Green", "Black", "White"]
      }
    ]
  };

  return (
    <DesignStorePagesLayout 
      title={productName}
      showBackButton={true}
      backUrl="/products-management"
    >
      <ProductPageCard
        productName={sampleProduct.name}
        price={sampleProduct.price}
        description={sampleProduct.description}
        images={sampleProduct.images}
        variants={sampleProduct.variants}
      />
    </DesignStorePagesLayout>
  );
};

export default ProductPage;
