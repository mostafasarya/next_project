'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const StorePage: React.FC = () => {
  const params = useParams();
  const storeName = params.storeName as string;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Store Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        textAlign: 'center',
        borderBottom: '1px solid #e9ecef',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          margin: 0,
          color: '#333',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          {storeName.charAt(0).toUpperCase() + storeName.slice(1)} Store
        </h1>
        <p style={{
          margin: '8px 0 0 0',
          color: '#666',
          fontSize: '14px'
        }}>
          Welcome to our online store
        </p>
      </div>

      {/* Store Content */}
      <div style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            margin: '0 0 16px 0',
            color: '#333',
            fontSize: '20px'
          }}>
            Featured Products
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {/* Sample Products */}
            {[
              { name: 'Classic T-Shirt', price: '$29.99', image: '👕' },
              { name: 'Denim Jeans', price: '$59.99', image: '👖' },
              { name: 'Running Shoes', price: '$89.99', image: '👟' },
              { name: 'Backpack', price: '$39.99', image: '🎒' }
            ].map((product, index) => (
              <div key={index} style={{
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                backgroundColor: 'white'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '12px'
                }}>
                  {product.image}
                </div>
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: '16px',
                  color: '#333'
                }}>
                  {product.name}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#007bff'
                }}>
                  {product.price}
                </p>
                <button style={{
                  marginTop: '12px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Store Info */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            margin: '0 0 16px 0',
            color: '#333',
            fontSize: '20px'
          }}>
            About Our Store
          </h2>
          <p style={{
            margin: 0,
            color: '#666',
            lineHeight: '1.6'
          }}>
            Welcome to {storeName.charAt(0).toUpperCase() + storeName.slice(1)} Store! 
            We offer high-quality products at competitive prices. 
            Browse our collection and find the perfect items for your needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
