'use client';

import React, { useState, useEffect, useMemo, use } from 'react';
import { useRouter } from 'next/navigation';
import { HiArrowLeft, HiX, HiInformationCircle, HiExternalLink, HiQuestionMarkCircle } from 'react-icons/hi';
import './PaymentMethods.css';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  config?: {
    clientId?: string;
    secretKey?: string;
    redirectUrl?: string;
    instructions?: string;
  };
}

const PaymentMethodsPage: React.FC<{ params: Promise<{ storeId: string }> }> = ({ params }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const [selectedMethods, setSelectedMethods] = useState<PaymentMethod[]>([]);
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);
  const [expandedElectronicPayment, setExpandedElectronicPayment] = useState(false);
  const [manualPaymentInstructions, setManualPaymentInstructions] = useState('');
  const [paypalConfig, setPaypalConfig] = useState({
    clientId: '',
    secretKey: '',
    redirectUrl: ''
  });
  const [stripeConfig, setStripeConfig] = useState({
    publishableKey: '',
    secretKey: '',
    webhookSecret: ''
  });
  const [checkoutConfig, setCheckoutConfig] = useState({
    merchantId: '',
    secretKey: '',
    publicKey: ''
  });
  const [authorizeNetConfig, setAuthorizeNetConfig] = useState({
    apiLoginId: '',
    transactionKey: '',
    publicKey: ''
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const cashOnDelivery: PaymentMethod = {
    id: 'cash-on-delivery',
    name: 'Cash on Delivery',
    description: 'Customer pay for order when delivered',
    icon: '💰',
    enabled: false
  };

  const electronicPaymentMethods: PaymentMethod[] = useMemo(() => [
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Accept payments via PayPal',
      icon: '💳',
      enabled: false,
      config: {
        clientId: '',
        secretKey: '',
        redirectUrl: ''
      }
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Accept credit card payments via Stripe',
      icon: '💳',
      enabled: false,
      config: {
        publishableKey: '',
        secretKey: '',
        webhookSecret: ''
      }
    },
    {
      id: '2checkout',
      name: '2Checkout (Verifone)',
      description: 'Accept payments via 2Checkout global payment platform',
      icon: '🏪',
      enabled: false,
      config: {
        merchantId: '',
        secretKey: '',
        publicKey: ''
      }
    },
    {
      id: 'authorize-net',
      name: 'Authorize.net',
      description: 'Accept payments via Authorize.net payment gateway',
      icon: '🛡️',
      enabled: false,
      config: {
        apiLoginId: '',
        transactionKey: '',
        publicKey: ''
      }
    },
    {
      id: 'checkout-com',
      name: 'Checkout.com',
      description: 'Accept payments via Checkout.com payment solution',
      icon: '✅',
      enabled: false
    },
    {
      id: 'payoneer',
      name: 'Payoneer',
      description: 'Accept global B2B payments via Payoneer',
      icon: '🏢',
      enabled: false
    },
    {
      id: 'wise',
      name: 'Wise',
      description: 'Accept international payments via Wise',
      icon: '🌍',
      enabled: false
    },
    {
      id: 'paymob',
      name: 'Paymob',
      description: 'Accept credit card payments via Paymob',
      icon: '💳',
      enabled: false
    },
    {
      id: 'hyperpay',
      name: 'Hyperpay',
      description: 'Accept payments via Hyperpay payment service',
      icon: '⚡',
      enabled: false
    },
    {
      id: 'tap-payments',
      name: 'Tap Payments',
      description: 'Accept payments via Tap Payments gateway',
      icon: '👆',
      enabled: false
    },
    {
      id: 'moyasar',
      name: 'Moyasar',
      description: 'Accept payments via Moyasar payment gateway',
      icon: '💳',
      enabled: false
    },
    {
      id: 'paytabs',
      name: 'PayTabs',
      description: 'Accept payments via PayTabs payment solution',
      icon: '💳',
      enabled: false
    },
    {
      id: 'stc-pay',
      name: 'STC Pay',
      description: 'Accept payments via STC Pay mobile wallet',
      icon: '📱',
      enabled: false
    },
    {
      id: 'fawry',
      name: 'Fawry',
      description: 'Accept payments via Fawry payment service',
      icon: '🛒',
      enabled: false
    }
  ], []);

  const otherPaymentMethods: PaymentMethod[] = useMemo(() => [
    {
      id: '9jkl',
      name: 'Get paid by 9jkl',
      description: 'We will receive money and will be directed to you based on a schedule',
      icon: '🏢',
      enabled: false
    },
    {
      id: 'manual-payment',
      name: 'Manual Payment',
      description: 'Provide instructions for customers to receive payments and you will have to verify manually',
      icon: '💵',
      enabled: false,
      config: {
        instructions: ''
      }
    }
  ], []);

  // Load saved payment methods for this store
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMethods = localStorage.getItem(`paymentMethods_${resolvedParams.storeId}`);
      if (savedMethods) {
        const parsedMethods = JSON.parse(savedMethods);
        setSelectedMethods(parsedMethods);
        
        // Update cash on delivery with saved state
        const savedCashOnDelivery = parsedMethods.find((saved: PaymentMethod) => saved.id === cashOnDelivery.id);
        if (savedCashOnDelivery) {
          cashOnDelivery.enabled = true;
        }

        // Update electronic payment methods with saved state
        electronicPaymentMethods.forEach(method => {
          const savedMethod = parsedMethods.find((saved: PaymentMethod) => saved.id === method.id);
          if (savedMethod) {
            method.enabled = true;
            method.config = savedMethod.config;
          }
        });

        // Update other payment methods with saved state
        otherPaymentMethods.forEach(method => {
          const savedMethod = parsedMethods.find((saved: PaymentMethod) => saved.id === method.id);
          if (savedMethod) {
            method.enabled = true;
            method.config = savedMethod.config;
          }
        });
        
        // Set PayPal config if saved
        const savedPaypal = parsedMethods.find((method: PaymentMethod) => method.id === 'paypal');
        if (savedPaypal?.config) {
          setPaypalConfig(savedPaypal.config);
        }
        
        // Set Stripe config if saved
        const savedStripe = parsedMethods.find((method: PaymentMethod) => method.id === 'stripe');
        if (savedStripe?.config) {
          setStripeConfig(savedStripe.config);
        }
        
        // Set 2Checkout config if saved
        const savedCheckout = parsedMethods.find((method: PaymentMethod) => method.id === '2checkout');
        if (savedCheckout?.config) {
          setCheckoutConfig(savedCheckout.config);
        }
        
        // Set Authorize.net config if saved
        const savedAuthorizeNet = parsedMethods.find((method: PaymentMethod) => method.id === 'authorize-net');
        if (savedAuthorizeNet?.config) {
          setAuthorizeNetConfig(savedAuthorizeNet.config);
        }
        
        // Set manual payment instructions if saved
        const savedManual = parsedMethods.find((method: PaymentMethod) => method.id === 'manual-payment');
        if (savedManual?.config?.instructions) {
          setManualPaymentInstructions(savedManual.config.instructions);
        }
      }
    }
    setIsLoaded(true);
  }, [resolvedParams.storeId]);

  const togglePaymentMethod = (method: PaymentMethod) => {
    const isCurrentlySelected = selectedMethods.some(selected => selected.id === method.id);
    
    if (isCurrentlySelected) {
      // Remove from selected methods
      setSelectedMethods(prev => prev.filter(selected => selected.id !== method.id));
      setExpandedMethod(null); // Close config when deselected
    } else {
      // Add to selected methods
      const methodToAdd = {
        ...method,
        enabled: true,
        config: method.id === 'paypal' ? paypalConfig : 
                method.id === 'manual-payment' ? { instructions: manualPaymentInstructions } : 
                method.config
      };
      setSelectedMethods(prev => [...prev, methodToAdd]);
      // Automatically expand config for methods that have one
      if (method.id === 'paypal' || method.id === 'stripe' || method.id === '2checkout' || method.id === 'authorize-net' || method.id === 'manual-payment') {
        setExpandedMethod(method.id);
      }
    }
  };

  const removePaymentMethod = (methodId: string) => {
    setSelectedMethods(prev => prev.filter(method => method.id !== methodId));
  };

  const savePaymentMethods = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`paymentMethods_${resolvedParams.storeId}`, JSON.stringify(selectedMethods));
      alert('Payment methods saved successfully!');
    }
  };

  const handlePaypalConfigChange = (field: string, value: string) => {
    setPaypalConfig(prev => ({ ...prev, [field]: value }));
    
    // Update the selected PayPal method with new config
    setSelectedMethods(prev => prev.map(method => 
      method.id === 'paypal' 
        ? { ...method, config: { ...method.config, [field]: value } }
        : method
    ));
  };

  const handleStripeConfigChange = (field: string, value: string) => {
    setStripeConfig(prev => ({ ...prev, [field]: value }));
    
    // Update the selected Stripe method with new config
    setSelectedMethods(prev => prev.map(method =>
      method.id === 'stripe'
        ? { ...method, config: { ...method.config, [field]: value } }
        : method
    ));
  };

  const handleCheckoutConfigChange = (field: string, value: string) => {
    setCheckoutConfig(prev => ({ ...prev, [field]: value }));
    
    // Update the selected 2Checkout method with new config
    setSelectedMethods(prev => prev.map(method =>
      method.id === '2checkout'
        ? { ...method, config: { ...method.config, [field]: value } }
        : method
    ));
  };

  const handleAuthorizeNetConfigChange = (field: string, value: string) => {
    setAuthorizeNetConfig(prev => ({ ...prev, [field]: value }));
    
    // Update the selected Authorize.net method with new config
    setSelectedMethods(prev => prev.map(method =>
      method.id === 'authorize-net'
        ? { ...method, config: { ...method.config, [field]: value } }
        : method
    ));
  };

  const handleManualPaymentChange = (instructions: string) => {
    setManualPaymentInstructions(instructions);
    
    // Update the selected manual payment method with new instructions
    setSelectedMethods(prev => prev.map(method => 
      method.id === 'manual-payment' 
        ? { ...method, config: { instructions } }
        : method
    ));
  };

  if (!isLoaded) {
    return (
      <div className="payment-methods-page">
        <div className="payment-methods-header">
          <button className="back-button" onClick={() => router.back()}>
            <HiArrowLeft />
          </button>
          <h1>Payment Methods</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-methods-page">
      <div className="payment-methods-header">
        <button className="back-button" onClick={() => router.back()}>
          <HiArrowLeft />
        </button>
        <h1>Payment Methods</h1>
        <p>How do you want to receive your money?</p>
      </div>

      <div className="payment-methods-content">
        <div className="payment-methods-left">
          <div className="available-methods-card">
            <h2>Payment Methods</h2>
            <div className="methods-list">
              {/* Cash on Delivery */}
              <div className={`method-item ${selectedMethods.some(selected => selected.id === cashOnDelivery.id) ? 'selected' : ''}`}>
                <div className="method-item-header">
                  <div className="method-info">
                    <div className="method-icon">{cashOnDelivery.icon}</div>
                    <div className="method-details">
                      <h3>{cashOnDelivery.name}</h3>
                      <p>{cashOnDelivery.description}</p>
                    </div>
                  </div>
                  
                  <div className="method-actions">
                    <button
                      className={`toggle-switch ${selectedMethods.some(selected => selected.id === cashOnDelivery.id) ? 'active' : ''}`}
                      onClick={() => togglePaymentMethod(cashOnDelivery)}
                    >
                      <div className="toggle-slider"></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Electronic Payment Collapsible Section */}
              <div className="electronic-payment-section">
                <div 
                  className="electronic-payment-header"
                  onClick={() => setExpandedElectronicPayment(!expandedElectronicPayment)}
                >
                  <div className="method-item-header">
                    <div className="method-info">
                      <div className="method-icon">💳</div>
                      <div className="method-details">
                        <h3>Direct Electronic Payment</h3>
                        <p>Link your own account</p>
                      </div>
                    </div>
                    
                    <div className="method-actions">
                      <button className="expand-button">
                        {expandedElectronicPayment ? '▲' : '▼'}
                      </button>
                    </div>
                  </div>
                </div>

                {expandedElectronicPayment && (
                  <div className="electronic-payment-methods">
                    {electronicPaymentMethods.map((method) => (
                      <div key={method.id} className={`method-item electronic-method ${selectedMethods.some(selected => selected.id === method.id) ? 'selected' : ''}`}>
                        <div className="method-item-header">
                          <div className="method-info">
                            <div className="method-icon">{method.icon}</div>
                            <div className="method-details">
                              <h3>{method.name}</h3>
                              <p>{method.description}</p>
                            </div>
                          </div>
                          
                          <div className="method-actions">
                            <button
                              className={`toggle-switch ${selectedMethods.some(selected => selected.id === method.id) ? 'active' : ''}`}
                              onClick={() => togglePaymentMethod(method)}
                            >
                              <div className="toggle-slider"></div>
                            </button>
                          </div>
                        </div>

                        {/* Inline Configuration Fields */}
                        {selectedMethods.some(selected => selected.id === method.id) && (
                          <div className="inline-config-fields">
                            {method.id === 'paypal' && (
                              <>
                                <div className="config-header">
                                  <h4>PayPal Configuration</h4>
                                  <div className="config-links">
                                    <a href="#" className="help-link">
                                      <HiQuestionMarkCircle />
                                      How to get credentials
                                    </a>
                                    <a href="#" className="external-link">
                                      <HiExternalLink />
                                      Create Account
                                    </a>
                                  </div>
                                </div>
                                
                                <div className="field-group">
                                  <label>PayPal Client ID</label>
                                  <input
                                    type="text"
                                    value={paypalConfig.clientId}
                                    onChange={(e) => handlePaypalConfigChange('clientId', e.target.value)}
                                    placeholder="Enter PayPal Client ID"
                                  />
                                </div>
                                
                                <div className="field-group">
                                  <label>PayPal Secret Key</label>
                                  <input
                                    type="password"
                                    value={paypalConfig.secretKey}
                                    onChange={(e) => handlePaypalConfigChange('secretKey', e.target.value)}
                                    placeholder="Enter PayPal Secret Key"
                                  />
                                </div>
                                
                                <div className="field-group">
                                  <label>PayPal Redirect URL</label>
                                  <input
                                    type="url"
                                    value={paypalConfig.redirectUrl}
                                    onChange={(e) => handlePaypalConfigChange('redirectUrl', e.target.value)}
                                    placeholder="Enter PayPal Redirect URL"
                                  />
                                </div>
                              </>
                            )}

                            {method.id === 'stripe' && (
                              <>
                                <div className="config-header">
                                  <h4>Stripe Configuration</h4>
                                  <div className="config-links">
                                    <a href="#" className="help-link">
                                      <HiQuestionMarkCircle />
                                      How to get credentials
                                    </a>
                                    <a href="#" className="external-link">
                                      <HiExternalLink />
                                      Create Account
                                    </a>
                                  </div>
                                </div>
                                
                                <div className="field-group">
                                  <label>Stripe Publishable Key</label>
                                  <input
                                    type="text"
                                    value={stripeConfig.publishableKey}
                                    onChange={(e) => handleStripeConfigChange('publishableKey', e.target.value)}
                                    placeholder="Enter Stripe Publishable Key"
                                  />
                                </div>
                                
                                <div className="field-group">
                                  <label>Stripe Secret Key</label>
                                  <input
                                    type="password"
                                    value={stripeConfig.secretKey}
                                    onChange={(e) => handleStripeConfigChange('secretKey', e.target.value)}
                                    placeholder="Enter Stripe Secret Key"
                                  />
                                </div>
                                
                                <div className="field-group">
                                  <label>Stripe Webhook Secret</label>
                                  <input
                                    type="password"
                                    value={stripeConfig.webhookSecret}
                                    onChange={(e) => handleStripeConfigChange('webhookSecret', e.target.value)}
                                    placeholder="Enter Stripe Webhook Secret"
                                  />
                                </div>
                              </>
                            )}

                            {method.id === '2checkout' && (
                              <>
                                <div className="config-header">
                                  <h4>2Checkout Configuration</h4>
                                  <div className="config-links">
                                    <a href="#" className="help-link">
                                      <HiQuestionMarkCircle />
                                      How to get credentials
                                    </a>
                                    <a href="#" className="external-link">
                                      <HiExternalLink />
                                      Create Account
                                    </a>
                                  </div>
                                </div>
                                
                                <div className="field-group">
                                  <label>2Checkout Merchant ID</label>
                                  <input
                                    type="text"
                                    value={checkoutConfig.merchantId}
                                    onChange={(e) => handleCheckoutConfigChange('merchantId', e.target.value)}
                                    placeholder="Enter 2Checkout Merchant ID"
                                  />
                                </div>
                                
                                <div className="field-group">
                                  <label>2Checkout Secret Key</label>
                                  <input
                                    type="password"
                                    value={checkoutConfig.secretKey}
                                    onChange={(e) => handleCheckoutConfigChange('secretKey', e.target.value)}
                                    placeholder="Enter 2Checkout Secret Key"
                                  />
                                </div>
                                
                                <div className="field-group">
                                  <label>2Checkout Public Key</label>
                                  <input
                                    type="text"
                                    value={checkoutConfig.publicKey}
                                    onChange={(e) => handleCheckoutConfigChange('publicKey', e.target.value)}
                                    placeholder="Enter 2Checkout Public Key"
                                  />
                                </div>
                              </>
                            )}

                            {method.id === 'authorize-net' && (
                              <>
                                <div className="config-header">
                                  <h4>Authorize.net Configuration</h4>
                                  <div className="config-links">
                                    <a href="#" className="help-link">
                                      <HiQuestionMarkCircle />
                                      How to get credentials
                                    </a>
                                    <a href="#" className="external-link">
                                      <HiExternalLink />
                                      Create Account
                                    </a>
                                  </div>
                                </div>
                                
                                <div className="field-group">
                                  <label>Authorize.net API Login ID</label>
                                  <input
                                    type="text"
                                    value={authorizeNetConfig.apiLoginId}
                                    onChange={(e) => handleAuthorizeNetConfigChange('apiLoginId', e.target.value)}
                                    placeholder="Enter Authorize.net API Login ID"
                                  />
                                </div>
                                
                                <div className="field-group">
                                  <label>Authorize.net Transaction Key</label>
                                  <input
                                    type="password"
                                    value={authorizeNetConfig.transactionKey}
                                    onChange={(e) => handleAuthorizeNetConfigChange('transactionKey', e.target.value)}
                                    placeholder="Enter Authorize.net Transaction Key"
                                  />
                                </div>
                                
                                <div className="field-group">
                                  <label>Authorize.net Public Key</label>
                                  <input
                                    type="text"
                                    value={authorizeNetConfig.publicKey}
                                    onChange={(e) => handleAuthorizeNetConfigChange('publicKey', e.target.value)}
                                    placeholder="Enter Authorize.net Public Key"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Payment Methods */}
              {otherPaymentMethods.map((method) => (
                <div key={method.id} className={`method-item ${selectedMethods.some(selected => selected.id === method.id) ? 'selected' : ''}`}>
                  <div className="method-item-header">
                    <div className="method-info">
                      <div className="method-icon">{method.icon}</div>
                      <div className="method-details">
                        <h3>{method.name}</h3>
                        <p>{method.description}</p>
                      </div>
                    </div>
                    
                    <div className="method-actions">
                      <button
                        className={`toggle-switch ${selectedMethods.some(selected => selected.id === method.id) ? 'active' : ''}`}
                        onClick={() => togglePaymentMethod(method)}
                      >
                        <div className="toggle-slider"></div>
                      </button>
                    </div>
                  </div>

                  {/* Inline Configuration Fields for Manual Payment */}
                  {method.id === 'manual-payment' && selectedMethods.some(selected => selected.id === method.id) && (
                    <div className="inline-config-fields">
                      <div className="config-header">
                        <h4>Manual Payment Instructions</h4>
                      </div>
                      
                      <div className="field-group">
                        <label>Payment Instructions</label>
                        <textarea
                          value={manualPaymentInstructions}
                          onChange={(e) => handleManualPaymentChange(e.target.value)}
                          placeholder="Enter instructions for customers on how to make payments (e.g., bank transfer details, cash pickup locations, etc.)"
                          rows={4}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>


          <button className="save-button" onClick={savePaymentMethods}>
            Save Changes
          </button>
        </div>

        <div className="payment-methods-right">
          <div className="selected-methods-card">
            <div className="card-header">
              <div className="header-icon">💳</div>
              <h3>Selected Payment Methods</h3>
            </div>
            
            <div className="selected-methods-list">
              {selectedMethods.map((method) => (
                <div key={method.id} className="selected-method-item">
                  <div className="method-info">
                    <div className="method-icon">{method.icon}</div>
                    <div className="method-details">
                      <h4>{method.name}</h4>
                      {method.id === 'manual-payment' && method.config?.instructions && (
                        <p className="method-subtitle">Custom Instructions</p>
                      )}
                    </div>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removePaymentMethod(method.id)}
                  >
                    <HiX />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="total-methods">
              <span>Total Methods:</span>
              <span className="total-count">{selectedMethods.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
