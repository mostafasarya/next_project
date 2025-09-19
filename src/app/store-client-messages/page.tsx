'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './StoreClientMessages.css';

interface Message {
  id: string;
  text: string;
  sender: 'client' | 'store';
  timestamp: Date;
  isRead: boolean;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  status: 'online' | 'offline' | 'away';
  messages: Message[];
}

const StoreClientMessagesPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId') || 'default-store';
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [storeName, setStoreName] = useState('');

  // Translation dictionary
  const translations = {
    'English': {
      'back': 'Back',
      'messages': 'Messages',
      'search_contacts': 'Search contacts...',
      'type_message': 'Type a message...',
      'send': 'Send',
      'online': 'Online',
      'offline': 'Offline',
      'away': 'Away',
      'no_contacts': 'No contacts found',
      'select_contact': 'Select a contact to start chatting',
      'store_client_messages': 'Store Client Messages'
    },
    'العربية': {
      'back': 'رجوع',
      'messages': 'الرسائل',
      'search_contacts': 'البحث في جهات الاتصال...',
      'type_message': 'اكتب رسالة...',
      'send': 'إرسال',
      'online': 'متصل',
      'offline': 'غير متصل',
      'away': 'بعيد',
      'no_contacts': 'لا توجد جهات اتصال',
      'select_contact': 'اختر جهة اتصال لبدء المحادثة',
      'store_client_messages': 'رسائل عملاء المتجر'
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

  // Load contacts from localStorage (store-specific)
  useEffect(() => {
    const savedContacts = localStorage.getItem(`storeContacts_${storeId}`);
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      
      // Convert string dates back to Date objects
      const contactsWithDates = parsedContacts.map((contact: any) => ({
        ...contact,
        lastMessageTime: contact.lastMessageTime ? new Date(contact.lastMessageTime) : null,
        messages: contact.messages.map((message: any) => ({
          ...message,
          timestamp: new Date(message.timestamp)
        }))
      }));
      
      setContacts(contactsWithDates);
      if (contactsWithDates.length > 0) {
        setSelectedContact(contactsWithDates[0]);
      }
    } else {
      // Default contacts for demo
      const defaultContacts: Contact[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1-555-0123',
          lastMessage: 'Thank you for the quick delivery!',
          lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          unreadCount: 2,
          status: 'online',
          messages: [
            {
              id: '1',
              text: 'Hi, I have a question about my order',
              sender: 'client',
              timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
              isRead: true
            },
            {
              id: '2',
              text: 'Hello! I\'d be happy to help. What\'s your order number?',
              sender: 'store',
              timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
              isRead: true
            },
            {
              id: '3',
              text: 'Thank you for the quick delivery!',
              sender: 'client',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              isRead: false
            }
          ]
        },
        {
          id: '2',
          name: 'Mike Chen',
          email: 'mike.chen@email.com',
          phone: '+1-555-0456',
          lastMessage: 'When will my order be shipped?',
          lastMessageTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          unreadCount: 1,
          status: 'away',
          messages: [
            {
              id: '4',
              text: 'When will my order be shipped?',
              sender: 'client',
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
              isRead: false
            }
          ]
        },
        {
          id: '3',
          name: 'Emma Davis',
          email: 'emma.davis@email.com',
          phone: '+1-555-0789',
          lastMessage: 'Perfect, thank you!',
          lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          unreadCount: 0,
          status: 'offline',
          messages: [
            {
              id: '5',
              text: 'Perfect, thank you!',
              sender: 'client',
              timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
              isRead: true
            }
          ]
        }
      ];
      setContacts(defaultContacts);
      setSelectedContact(defaultContacts[0]);
      localStorage.setItem(`storeContacts_${storeId}`, JSON.stringify(defaultContacts));
    }
  }, [storeId]);

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

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    // Mark messages as read
    const updatedContacts = contacts.map(c => {
      if (c.id === contact.id) {
        return {
          ...c,
          unreadCount: 0,
          messages: c.messages.map(msg => ({ ...msg, isRead: true }))
        };
      }
      return c;
    });
    setContacts(updatedContacts);
    localStorage.setItem(`storeContacts_${storeId}`, JSON.stringify(updatedContacts));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'store',
      timestamp: new Date(),
      isRead: true
    };

    const updatedContacts = contacts.map(contact => {
      if (contact.id === selectedContact.id) {
        const updatedContact = {
          ...contact,
          messages: [...contact.messages, newMsg],
          lastMessage: newMessage,
          lastMessageTime: new Date()
        };
        setSelectedContact(updatedContact);
        return updatedContact;
      }
      return contact;
    });

    setContacts(updatedContacts);
    localStorage.setItem(`storeContacts_${storeId}`, JSON.stringify(updatedContacts));
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) return '';
    
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(dateObj);
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    
    // Convert string to Date if needed
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) return '';
    
    const now = new Date();
    const diffInHours = (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return formatTime(dateObj);
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
      }).format(dateObj);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#26de81';
      case 'away': return '#ffa502';
      case 'offline': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div className="store-messages-page">
      {/* Header */}
      <div className="messages-header">
        <button className="back-btn" onClick={() => router.back()}>
          <span className="back-icon">←</span>
        </button>
        <div className="header-title">
          <h1>{t('store_client_messages')}</h1>
          {storeName && <p className="store-name">{storeName}</p>}
        </div>
        <div className="header-logo">
          <div className="logo-circle">9jkl</div>
        </div>
      </div>

      <div className="messages-container">
        {/* Left Panel - Contacts List */}
        <div className="contacts-panel">
          <div className="contacts-header">
            <h2>{t('messages')}</h2>
            <div className="search-box">
              <input
                type="text"
                placeholder={t('search_contacts')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          
          <div className="contacts-list">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`contact-item ${selectedContact?.id === contact.id ? 'selected' : ''}`}
                  onClick={() => handleContactSelect(contact)}
                >
                  <div className="contact-avatar">
                    {contact.avatar ? (
                      <img src={contact.avatar} alt={contact.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div 
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(contact.status) }}
                    ></div>
                  </div>
                  
                  <div className="contact-info">
                    <div className="contact-name">{contact.name}</div>
                    <div className="contact-last-message">
                      {contact.lastMessage || 'No messages yet'}
                    </div>
                  </div>
                  
                  <div className="contact-meta">
                    <div className="last-message-time">
                      {contact.lastMessageTime ? formatDate(contact.lastMessageTime) : ''}
                    </div>
                    {contact.unreadCount > 0 && (
                      <div className="unread-badge">{contact.unreadCount}</div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-contacts">
                <p>{t('no_contacts')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Chat Interface */}
        <div className="chat-panel">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-contact-info">
                  <div className="chat-avatar">
                    {selectedContact.avatar ? (
                      <img src={selectedContact.avatar} alt={selectedContact.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {selectedContact.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div 
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(selectedContact.status) }}
                    ></div>
                  </div>
                  <div className="contact-details">
                    <div className="contact-name">{selectedContact.name}</div>
                    <div className="contact-status">{t(selectedContact.status)}</div>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="messages-area">
                {selectedContact.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender === 'store' ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">
                      <div className="message-text">{message.text}</div>
                      <div className="message-time">{formatTime(message.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="message-input-area">
                <div className="message-input-container">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('type_message')}
                    rows={1}
                  />
                  <button 
                    className="send-btn"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <span className="send-icon">📤</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="no-chat-icon">💬</div>
              <h3>{t('select_contact')}</h3>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="messages-footer">
        <div className="copyright">2025 - Powersgate</div>
        <div className="settings-icon">⚙️</div>
      </div>
    </div>
  );
};

export default StoreClientMessagesPage;
