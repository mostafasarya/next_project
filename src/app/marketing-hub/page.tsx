'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './MarketingHub.css';

interface MarketingRequest {
  id: string;
  storeId: string;
  message: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const MarketingHubPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId') || 'default-store';
  
  const [marketingMessage, setMarketingMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequests, setSubmittedRequests] = useState<MarketingRequest[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [storeName, setStoreName] = useState('');

  // Translation dictionary
  const translations = {
    'English': {
      'back': 'Back',
      'marketing_hub': 'Marketing Hub',
      'marketing_request': 'Marketing Request',
      'describe_needs': 'Describe your marketing needs',
      'marketing_placeholder': 'Tell us about your marketing goals, target audience, budget, timeline, or any specific requirements...',
      'submit_request': 'Submit Request',
      'submitting': 'Submitting...',
      'request_submitted': 'Request Submitted Successfully!',
      'marketing_team_followup': 'Our marketing team will follow up with you through your store messages.',
      'previous_requests': 'Previous Requests',
      'no_requests': 'No previous requests found',
      'status_pending': 'Pending',
      'status_in_progress': 'In Progress',
      'status_completed': 'Completed',
      'created_at': 'Created',
      'updated_at': 'Updated',
      'marketing_success': 'Marketing Success Stories',
      'success_story_1': 'Increased sales by 300% with targeted social media campaigns',
      'success_story_2': 'Boosted website traffic by 500% through SEO optimization',
      'success_story_3': 'Generated 10,000+ leads with email marketing automation',
      'marketing_services': 'Our Marketing Services',
      'service_1': 'Social Media Marketing',
      'service_2': 'Search Engine Optimization (SEO)',
      'service_3': 'Email Marketing Campaigns',
      'service_4': 'Content Marketing',
      'service_5': 'Paid Advertising (Google Ads, Facebook Ads)',
      'service_6': 'Influencer Partnerships',
      'service_7': 'Brand Development',
      'service_8': 'Analytics & Reporting'
    },
    'العربية': {
      'back': 'رجوع',
      'marketing_hub': 'مركز التسويق',
      'marketing_request': 'طلب تسويقي',
      'describe_needs': 'اوصف احتياجاتك التسويقية',
      'marketing_placeholder': 'أخبرنا عن أهدافك التسويقية، الجمهور المستهدف، الميزانية، الجدول الزمني، أو أي متطلبات محددة...',
      'submit_request': 'إرسال الطلب',
      'submitting': 'جاري الإرسال...',
      'request_submitted': 'تم إرسال الطلب بنجاح!',
      'marketing_team_followup': 'سيتابع فريق التسويق معك من خلال رسائل متجرك.',
      'previous_requests': 'الطلبات السابقة',
      'no_requests': 'لا توجد طلبات سابقة',
      'status_pending': 'في الانتظار',
      'status_in_progress': 'قيد التنفيذ',
      'status_completed': 'مكتمل',
      'created_at': 'تاريخ الإنشاء',
      'updated_at': 'تاريخ التحديث',
      'marketing_success': 'قصص نجاح التسويق',
      'success_story_1': 'زيادة المبيعات بنسبة 300% مع الحملات المستهدفة على وسائل التواصل الاجتماعي',
      'success_story_2': 'زيادة حركة المرور على الموقع بنسبة 500% من خلال تحسين محركات البحث',
      'success_story_3': 'توليد أكثر من 10,000 عميل محتمل مع أتمتة التسويق عبر البريد الإلكتروني',
      'marketing_services': 'خدماتنا التسويقية',
      'service_1': 'التسويق عبر وسائل التواصل الاجتماعي',
      'service_2': 'تحسين محركات البحث (SEO)',
      'service_3': 'حملات التسويق عبر البريد الإلكتروني',
      'service_4': 'التسويق بالمحتوى',
      'service_5': 'الإعلانات المدفوعة (إعلانات جوجل، إعلانات فيسبوك)',
      'service_6': 'شراكات المؤثرين',
      'service_7': 'تطوير العلامة التجارية',
      'service_8': 'التحليلات والتقارير'
    }
  };

  // Language mapping
  const languageMapping: { [key: string]: string } = {
    'English': 'English',
    'العربية': 'Arabic',
    'Español': 'Spanish',
    'Français': 'French',
    'Deutsch': 'German',
    'Português': 'Portuguese',
    'Türkçe': 'Turkish',
    'हिन्दी': 'Hindi',
    'Italiano': 'Italian',
    'Русский': 'Russian',
    '日本語': 'Japanese',
    '中文': 'Chinese',
    '한국어': 'Korean'
  };

  // Translation function
  const t = (key: string) => {
    let currentLangTranslations = translations[currentLanguage as keyof typeof translations];
    
    if (!currentLangTranslations) {
      const mappedLanguage = languageMapping[currentLanguage] || currentLanguage;
      currentLangTranslations = translations[mappedLanguage as keyof typeof translations];
    }
    
    const englishTranslations = translations['English'];
    
    if (currentLangTranslations && currentLangTranslations[key as keyof typeof currentLangTranslations]) {
      return currentLangTranslations[key as keyof typeof currentLangTranslations];
    }
    
    if (englishTranslations && englishTranslations[key as keyof typeof englishTranslations]) {
      return englishTranslations[key as keyof typeof englishTranslations];
    }
    
    return key;
  };

  // Load saved language and listen for changes
  useEffect(() => {
    const savedLanguage = localStorage.getItem('websiteLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  // Load store name
  useEffect(() => {
    const savedStores = localStorage.getItem('stores');
    if (savedStores) {
      const stores = JSON.parse(savedStores);
      const currentStore = stores.find((store: any) => store.id === storeId);
      if (currentStore) {
        setStoreName(currentStore.name);
      }
    }
  }, [storeId]);

  // Load previous marketing requests
  useEffect(() => {
    const savedRequests = localStorage.getItem(`marketingRequests_${storeId}`);
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      // Convert string dates back to Date objects
      const requestsWithDates = parsedRequests.map((request: any) => ({
        ...request,
        createdAt: new Date(request.createdAt),
        updatedAt: new Date(request.updatedAt)
      }));
      setSubmittedRequests(requestsWithDates);
    }
  }, [storeId]);

  const handleSubmitRequest = async () => {
    if (!marketingMessage.trim()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newRequest: MarketingRequest = {
      id: Date.now().toString(),
      storeId,
      message: marketingMessage,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to local storage
    const updatedRequests = [newRequest, ...submittedRequests];
    setSubmittedRequests(updatedRequests);
    localStorage.setItem(`marketingRequests_${storeId}`, JSON.stringify(updatedRequests));

    // Create a message in the store messages system
    const marketingTeamMessage = {
      id: `marketing_${Date.now()}`,
      text: `New marketing request received from ${storeName || 'your store'}. Our team will review your requirements and get back to you soon!`,
      sender: 'store',
      timestamp: new Date(),
      isRead: false,
      type: 'text'
    };

    // Add to store contacts (marketing team contact)
    const savedContacts = localStorage.getItem(`storeContacts_${storeId}`);
    if (savedContacts) {
      const contacts = JSON.parse(savedContacts);
      
      // Find or create marketing team contact
      let marketingContact = contacts.find((contact: any) => contact.email === 'marketing@9jkl.com');
      
      if (!marketingContact) {
        marketingContact = {
          id: 'marketing-team',
          name: 'Marketing Team',
          email: 'marketing@9jkl.com',
          phone: '+1-555-MARKETING',
          lastMessage: 'Marketing support available',
          lastMessageTime: new Date(),
          unreadCount: 0,
          status: 'online',
          messages: []
        };
        contacts.push(marketingContact);
      }

      // Add the new message
      marketingContact.messages.push(marketingTeamMessage);
      marketingContact.lastMessage = marketingTeamMessage.text;
      marketingContact.lastMessageTime = new Date();
      marketingContact.unreadCount += 1;

      // Save updated contacts
      localStorage.setItem(`storeContacts_${storeId}`, JSON.stringify(contacts));
    }

    setMarketingMessage('');
    setIsSubmitting(false);
    
    // Show success message
    alert(t('request_submitted') + '\n\n' + t('marketing_team_followup'));
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#ffa502';
      case 'in-progress': return '#007bff';
      case 'completed': return '#26de81';
      default: return '#6c757d';
    }
  };

  return (
    <div className="marketing-hub-page">
      {/* Header */}
      <div className="marketing-header">
        <button className="back-btn" onClick={() => router.back()}>
          <span className="back-icon">←</span>
        </button>
        <div className="header-title">
          <h1>{t('marketing_hub')}</h1>
          {storeName && <p className="store-name">{storeName}</p>}
        </div>
        <div className="header-logo">
          <div className="logo-circle">9jkl</div>
        </div>
      </div>

      <div className="marketing-container">
        {/* Main Content */}
        <div className="marketing-main">
          {/* Marketing Request Form */}
          <div className="marketing-request-section">
            <div className="section-header">
              <h2>{t('marketing_request')}</h2>
              <p>{t('describe_needs')}</p>
            </div>
            
            <div className="request-form">
              <textarea
                value={marketingMessage}
                onChange={(e) => setMarketingMessage(e.target.value)}
                placeholder={t('marketing_placeholder')}
                rows={8}
                className="marketing-textarea"
              />
              
              <button 
                className="submit-btn"
                onClick={handleSubmitRequest}
                disabled={!marketingMessage.trim() || isSubmitting}
              >
                {isSubmitting ? t('submitting') : t('submit_request')}
              </button>
            </div>
          </div>

          {/* Marketing Services */}
          <div className="marketing-services-section">
            <h3>{t('marketing_services')}</h3>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">📱</div>
                <h4>{t('service_1')}</h4>
              </div>
              <div className="service-card">
                <div className="service-icon">🔍</div>
                <h4>{t('service_2')}</h4>
              </div>
              <div className="service-card">
                <div className="service-icon">📧</div>
                <h4>{t('service_3')}</h4>
              </div>
              <div className="service-card">
                <div className="service-icon">📝</div>
                <h4>{t('service_4')}</h4>
              </div>
              <div className="service-card">
                <div className="service-icon">💰</div>
                <h4>{t('service_5')}</h4>
              </div>
              <div className="service-card">
                <div className="service-icon">⭐</div>
                <h4>{t('service_6')}</h4>
              </div>
              <div className="service-card">
                <div className="service-icon">🎨</div>
                <h4>{t('service_7')}</h4>
              </div>
              <div className="service-card">
                <div className="service-icon">📊</div>
                <h4>{t('service_8')}</h4>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="success-stories-section">
            <h3>{t('marketing_success')}</h3>
            <div className="success-stories">
              <div className="success-story">
                <div className="success-icon">📈</div>
                <p>{t('success_story_1')}</p>
              </div>
              <div className="success-story">
                <div className="success-icon">🚀</div>
                <p>{t('success_story_2')}</p>
              </div>
              <div className="success-story">
                <div className="success-icon">🎯</div>
                <p>{t('success_story_3')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Previous Requests */}
        <div className="marketing-sidebar">
          <h3>{t('previous_requests')}</h3>
          <div className="requests-list">
            {submittedRequests.length > 0 ? (
              submittedRequests.map((request) => (
                <div key={request.id} className="request-item">
                  <div className="request-header">
                    <span 
                      className="request-status"
                      style={{ backgroundColor: getStatusColor(request.status) }}
                    >
                      {t(`status_${request.status}`)}
                    </span>
                    <span className="request-date">{formatDate(request.createdAt)}</span>
                  </div>
                  <div className="request-message">
                    {request.message.length > 100 
                      ? `${request.message.substring(0, 100)}...` 
                      : request.message
                    }
                  </div>
                </div>
              ))
            ) : (
              <div className="no-requests">
                <p>{t('no_requests')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="marketing-footer">
        <div className="copyright">2025 - Powersgate</div>
        <div className="settings-icon">⚙️</div>
      </div>
    </div>
  );
};

export default MarketingHubPage;
