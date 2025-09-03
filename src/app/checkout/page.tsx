'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './CheckoutPage.css';

interface CheckoutFormData {
  // Shipping Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Billing Information
  billingFirstName: string;
  billingLastName: string;
  billingEmail: string;
  billingPhone: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  billingCountry: string;
  
  // Payment Information
  paymentMethod: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  paypalEmail: string;
  
  // Order Summary
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    billingFirstName: '',
    billingLastName: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: '',
    paymentMethod: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: '',
    subtotal: 144.97,
    shipping: 9.99,
    tax: 14.50,
    total: 169.46
  });

  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSameAsShippingChange = () => {
    setSameAsShipping(!sameAsShipping);
    if (!sameAsShipping) {
      // Copy shipping info to billing
      setFormData(prev => ({
        ...prev,
        billingFirstName: prev.firstName,
        billingLastName: prev.lastName,
        billingEmail: prev.email,
        billingPhone: prev.phone,
        billingAddress: prev.address,
        billingCity: prev.city,
        billingState: prev.state,
        billingZipCode: prev.zipCode,
        billingCountry: prev.country
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout submission
    console.log('Checkout submitted:', formData);
    // Redirect to invoice page after successful order placement
    router.push('/checkout/invoice');
  };

  const nextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Header */}
        <div className="checkout-header">
          <button className="back-btn" onClick={() => router.back()}>
            ← Back
          </button>
          <h1>Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="checkout-steps">
          <div className={`step ${activeStep >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className={`step ${activeStep >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Billing</span>
          </div>
          <div className={`step ${activeStep >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Payment</span>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping Information */}
              {activeStep === 1 && (
                <div className="form-step">
                  <h2>Shipping Information</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>ZIP Code *</label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Country *</label>
                      <select
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="next-btn" onClick={nextStep}>
                      Continue to Billing
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Billing Information */}
              {activeStep === 2 && (
                <div className="form-step">
                  <h2>Billing Information</h2>
                  
                  <div className="same-as-shipping">
                    <label>
                      <input
                        type="checkbox"
                        checked={sameAsShipping}
                        onChange={handleSameAsShippingChange}
                      />
                      Same as shipping address
                    </label>
                  </div>

                  {!sameAsShipping && (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label>First Name *</label>
                          <input
                            type="text"
                            value={formData.billingFirstName}
                            onChange={(e) => handleInputChange('billingFirstName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Last Name *</label>
                          <input
                            type="text"
                            value={formData.billingLastName}
                            onChange={(e) => handleInputChange('billingLastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Email *</label>
                          <input
                            type="email"
                            value={formData.billingEmail}
                            onChange={(e) => handleInputChange('billingEmail', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone *</label>
                          <input
                            type="tel"
                            value={formData.billingPhone}
                            onChange={(e) => handleInputChange('billingPhone', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Address *</label>
                        <input
                          type="text"
                          value={formData.billingAddress}
                          onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>City *</label>
                          <input
                            type="text"
                            value={formData.billingCity}
                            onChange={(e) => handleInputChange('billingCity', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>State *</label>
                          <input
                            type="text"
                            value={formData.billingState}
                            onChange={(e) => handleInputChange('billingState', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>ZIP Code *</label>
                          <input
                            type="text"
                            value={formData.billingZipCode}
                            onChange={(e) => handleInputChange('billingZipCode', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Country *</label>
                          <select
                            value={formData.billingCountry}
                            onChange={(e) => handleInputChange('billingCountry', e.target.value)}
                            required
                          >
                            <option value="">Select Country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="form-actions">
                    <button type="button" className="prev-btn" onClick={prevStep}>
                      Back to Shipping
                    </button>
                    <button type="button" className="next-btn" onClick={nextStep}>
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Information */}
              {activeStep === 3 && (
                <div className="form-step">
                  <h2>Payment Information</h2>
                  
                  <div className="payment-methods">
                    <h3>Select Payment Method</h3>
                    
                    <div className="payment-options">
                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        />
                        <div className="payment-option-content">
                          <div className="payment-icon">💵</div>
                          <div className="payment-details">
                            <span className="payment-name">Cash on Delivery</span>
                            <span className="payment-description">Pay when you receive your order</span>
                          </div>
                        </div>
                      </label>

                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        />
                        <div className="payment-option-content">
                          <div className="payment-icon">💳</div>
                          <div className="payment-details">
                            <span className="payment-name">Credit/Debit Card</span>
                            <span className="payment-description">Visa, Mastercard, American Express</span>
                          </div>
                        </div>
                      </label>

                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        />
                        <div className="payment-option-content">
                          <div className="payment-icon">🔵</div>
                          <div className="payment-details">
                            <span className="payment-name">PayPal</span>
                            <span className="payment-description">Pay with your PayPal account</span>
                          </div>
                        </div>
                      </label>

                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="googlepay"
                          checked={formData.paymentMethod === 'googlepay'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        />
                        <div className="payment-option-content">
                          <div className="payment-icon">📱</div>
                          <div className="payment-details">
                            <span className="payment-name">Google Pay</span>
                            <span className="payment-description">Fast and secure mobile payment</span>
                          </div>
                        </div>
                      </label>

                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="applepay"
                          checked={formData.paymentMethod === 'applepay'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        />
                        <div className="payment-option-content">
                          <div className="payment-icon">🍎</div>
                          <div className="payment-details">
                            <span className="payment-name">Apple Pay</span>
                            <span className="payment-description">Simple and secure payment</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Card Payment Form */}
                  {formData.paymentMethod === 'card' && (
                    <div className="card-payment-form">
                      <h3>Card Details</h3>
                      <div className="form-group">
                        <label>Card Number *</label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Name on Card *</label>
                        <input
                          type="text"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Expiry Date *</label>
                          <input
                            type="text"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>CVV *</label>
                          <input
                            type="text"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal Payment Form */}
                  {formData.paymentMethod === 'paypal' && (
                    <div className="paypal-payment-form">
                      <h3>PayPal Details</h3>
                      <div className="form-group">
                        <label>PayPal Email *</label>
                        <input
                          type="email"
                          value={formData.paypalEmail}
                          onChange={(e) => handleInputChange('paypalEmail', e.target.value)}
                          placeholder="your-email@example.com"
                          required
                        />
                      </div>
                      <p className="payment-note">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                    </div>
                  )}

                  {/* Mobile Payment Forms */}
                  {(formData.paymentMethod === 'googlepay' || formData.paymentMethod === 'applepay') && (
                    <div className="mobile-payment-form">
                      <h3>{formData.paymentMethod === 'googlepay' ? 'Google Pay' : 'Apple Pay'} Details</h3>
                      <div className="mobile-payment-info">
                        <div className="payment-icon-large">
                          {formData.paymentMethod === 'googlepay' ? '📱' : '🍎'}
                        </div>
                        <p className="payment-note">
                          {formData.paymentMethod === 'googlepay' 
                            ? 'Google Pay will open automatically to complete your payment.'
                            : 'Apple Pay will open automatically to complete your payment.'
                          }
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Cash on Delivery Info */}
                  {formData.paymentMethod === 'cash' && (
                    <div className="cash-payment-info">
                      <h3>Cash on Delivery</h3>
                      <div className="cash-payment-details">
                        <div className="payment-icon-large">💵</div>
                        <p className="payment-note">
                          You will pay the total amount of <strong>${formData.total.toFixed(2)}</strong> when your order is delivered.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="form-actions">
                    <button type="button" className="prev-btn" onClick={prevStep}>
                      Back to Billing
                    </button>
                    <button 
                      type="submit" 
                      className="place-order-btn"
                      disabled={!formData.paymentMethod}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              <div className="summary-item">
                <span>Hat (2x)</span>
                <span>$59.98</span>
              </div>
              <div className="summary-item">
                <span>Shirt (1x)</span>
                <span>$34.99</span>
              </div>
              <div className="summary-item">
                <span>Trouser (1x)</span>
                <span>$49.99</span>
              </div>
            </div>
            
            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${formData.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>${formData.shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${formData.tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${formData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
