'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './InvoicePage.css';

interface OrderDetails {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
    image: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  estimatedDelivery: string;
  trackingNumber?: string;
}

const InvoicePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading order details from URL params or localStorage
    const timer = setTimeout(() => {
      const mockOrderDetails: OrderDetails = {
        orderNumber: `ORD-${Date.now().toString().slice(-8)}`,
        orderDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerPhone: '+1 (555) 123-4567',
        shippingAddress: {
          address: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States'
        },
        billingAddress: {
          address: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States'
        },
        paymentMethod: 'Credit Card',
        items: [
          {
            id: '1',
            name: 'Classic White T-Shirt',
            price: 29.99,
            quantity: 2,
            total: 59.98,
            image: 'https://via.placeholder.com/60x60?text=T-Shirt'
          },
          {
            id: '2',
            name: 'Denim Jeans',
            price: 79.99,
            quantity: 1,
            total: 79.99,
            image: 'https://via.placeholder.com/60x60?text=Jeans'
          },
          {
            id: '3',
            name: 'Running Shoes',
            price: 89.99,
            quantity: 1,
            total: 89.99,
            image: 'https://via.placeholder.com/60x60?text=Shoes'
          }
        ],
        subtotal: 229.96,
        shipping: 9.99,
        tax: 23.00,
        total: 262.95,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        trackingNumber: `TRK-${Date.now().toString().slice(-10)}`
      };

      setOrderDetails(mockOrderDetails);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleBackToStore = () => {
    router.push('/Store-homepage');
  };

  const handleTrackOrder = () => {
    // In a real app, this would redirect to a tracking page
    alert(`Track your order: ${orderDetails?.trackingNumber}`);
  };

  if (isLoading) {
    return (
      <div className="invoice-page">
        <div className="invoice-container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Generating your invoice...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="invoice-page">
        <div className="invoice-container">
          <div className="error">
            <h2>Order Not Found</h2>
            <p>Unable to load order details.</p>
            <button onClick={handleBackToStore}>Back to Store</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="invoice-page">
      <div className="invoice-container">
        {/* Header */}
        <div className="invoice-header">
          <div className="header-left">
            <h1>Order Confirmation</h1>
            <p className="order-number">Order #{orderDetails.orderNumber}</p>
            <p className="order-date">Placed on {orderDetails.orderDate}</p>
          </div>
          <div className="header-right">
            <div className="status-badge success">
              <span className="status-icon">✓</span>
              Order Confirmed
            </div>
            <div className="action-buttons">
              <button className="print-btn" onClick={handlePrint}>
                <span className="print-icon">🖨️</span>
                Print Invoice
              </button>
              <button className="track-btn" onClick={handleTrackOrder}>
                <span className="track-icon">📦</span>
                Track Order
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-grid">
            <div className="summary-item">
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> {orderDetails.customerName}</p>
              <p><strong>Email:</strong> {orderDetails.customerEmail}</p>
              <p><strong>Phone:</strong> {orderDetails.customerPhone}</p>
            </div>
            <div className="summary-item">
              <h3>Shipping Address</h3>
              <p>{orderDetails.shippingAddress.address}</p>
              <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}</p>
              <p>{orderDetails.shippingAddress.country}</p>
            </div>
            <div className="summary-item">
              <h3>Payment Method</h3>
              <p><strong>Method:</strong> {orderDetails.paymentMethod}</p>
              <p><strong>Status:</strong> <span className="payment-status">Paid</span></p>
            </div>
            <div className="summary-item">
              <h3>Delivery Information</h3>
              <p><strong>Estimated Delivery:</strong></p>
              <p>{orderDetails.estimatedDelivery}</p>
              {orderDetails.trackingNumber && (
                <p><strong>Tracking:</strong> {orderDetails.trackingNumber}</p>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="order-items">
          <h2>Order Items</h2>
          <div className="items-table">
            <div className="table-header">
              <div className="item-col">Item</div>
              <div className="price-col">Price</div>
              <div className="quantity-col">Qty</div>
              <div className="total-col">Total</div>
            </div>
            {orderDetails.items.map((item) => (
              <div key={item.id} className="item-row">
                <div className="item-col">
                  <div className="item-info">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-id">ID: {item.id}</p>
                    </div>
                  </div>
                </div>
                <div className="price-col">${item.price.toFixed(2)}</div>
                <div className="quantity-col">{item.quantity}</div>
                <div className="total-col">${item.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Totals */}
        <div className="order-totals">
          <div className="totals-table">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>${orderDetails.shipping.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Tax:</span>
              <span>${orderDetails.tax.toFixed(2)}</span>
            </div>
            <div className="total-row total">
              <span>Total:</span>
              <span>${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="invoice-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Thank you for your order!</h3>
              <p>We've received your order and will begin processing it right away. You'll receive an email confirmation with tracking information once your order ships.</p>
            </div>
            <div className="footer-section">
              <h3>Need Help?</h3>
              <p>If you have any questions about your order, please contact our customer support:</p>
              <p><strong>Email:</strong> support@store.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="footer-actions">
            <button className="back-btn" onClick={handleBackToStore}>
              <span className="back-icon">←</span>
              Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
