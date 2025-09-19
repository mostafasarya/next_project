'use client';

import React, { useState } from 'react';
import { HiPencil, HiTrash, HiPlus } from 'react-icons/hi';
import '../../EditorControls/PropertiesManagement/SystemControlIcons.css';
import '../../../app/system-control-assets/SystemControlAssets.css';
import './CompFAQDesign.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
}

interface CompFAQDesignProps {
  title?: string;
  faqs?: FAQItem[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  maxFAQs?: number;
}

const CompFAQDesign: React.FC<CompFAQDesignProps> = ({
  title = "FAQ",
  faqs: initialFAQs,
  backgroundColor = "#ffffff",
  textColor = "#374151",
  accentColor = "#3b82f6",
  maxFAQs = 10
}) => {
  const defaultFAQs: FAQItem[] = [
    {
      id: '1',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all items in original condition. Please contact our customer service team to initiate a return.',
      isOpen: false
    },
    {
      id: '2',
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available for faster delivery.',
      isOpen: false
    },
    {
      id: '3',
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship internationally to most countries. Shipping costs and delivery times vary by destination. International orders may be subject to customs duties.',
      isOpen: false
    }
  ];

  const [faqTitle, setFaqTitle] = useState(title);
  const [faqItems, setFaqItems] = useState<FAQItem[]>(initialFAQs || defaultFAQs);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState(false);

  const toggleFAQ = (id: string) => {
    setFaqItems(prev => prev.map(item => 
      item.id === id ? { ...item, isOpen: !item.isOpen } : item
    ));
  };

  const updateFAQ = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addFAQ = () => {
    if (faqItems.length >= maxFAQs) return;
    
    const newFAQ: FAQItem = {
      id: Date.now().toString(),
      question: 'New question here?',
      answer: 'Your answer goes here. Click to edit this text.',
      isOpen: true
    };
    
    setFaqItems(prev => [...prev, newFAQ]);
  };

  const removeFAQ = (id: string) => {
    if (faqItems.length <= 1) return;
    setFaqItems(prev => prev.filter(item => item.id !== id));
  };

  const handleEditStart = (field: string, id?: string) => {
    if (field === 'title') {
      setEditingTitle(true);
    } else {
      setEditingField(`${id}-${field}`);
    }
  };

  const handleEditEnd = () => {
    setEditingField(null);
    setEditingTitle(false);
  };

  return (
    <div 
      className="comp-faq-design"
      style={{ 
        backgroundColor,
        color: textColor,
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        margin: '20px 0',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}
    >
      {/* Add FAQ Tooltip - Top Center */}
      {faqItems.length < maxFAQs && (
        <div
          className="faq-toolbar-tooltip"
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            gap: '8px',
            backgroundColor: '#2c3e50',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <button
            onClick={addFAQ}
            className="system-control-icon add small"
            title="Add new FAQ"
            style={{ fontSize: '20px' }}
          >
            <HiPlus />
          </button>
        </div>
      )}
      {/* Header Section */}
      <div className="faq-header" style={{ backgroundColor: accentColor }}>
        <div className="title-container">
          {editingTitle ? (
            <input
              type="text"
              value={faqTitle}
              onChange={(e) => setFaqTitle(e.target.value)}
              onBlur={handleEditEnd}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEditEnd();
                }
              }}
              className="title-input"
              style={{ color: '#ffffff' }}
              autoFocus
            />
          ) : (
            <h2 
              className="faq-title"
              onClick={() => handleEditStart('title')}
            >
              {faqTitle}
            </h2>
          )}
          <button
            className="system-control-icon edit small"
            onClick={() => handleEditStart('title')}
            title="Edit title"
          >
            <HiPencil />
          </button>
        </div>

      </div>

      {/* FAQ Items */}
      <div className="faq-container">
        {faqItems.map((faq, index) => (
          <div key={faq.id} className={`faq-item ${faq.isOpen ? 'open' : ''}`}>
            {/* Question Section */}
            <div 
              className="faq-question-container"
              onClick={() => !editingField?.includes(faq.id) && toggleFAQ(faq.id)}
            >
              <div className="question-content">
                <div className="question-number">
                  {index + 1}
                </div>
                
                {editingField === `${faq.id}-question` ? (
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                    onBlur={handleEditEnd}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleEditEnd();
                      }
                    }}
                    className="question-input"
                    style={{ color: textColor }}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <h3 
                    className="faq-question"
                    style={{ color: textColor }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditStart('question', faq.id);
                    }}
                  >
                    {faq.question}
                  </h3>
                )}
              </div>

              <div className="question-actions">
                <button
                  className="system-control-icon edit small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditStart('question', faq.id);
                  }}
                  title="Edit question"
                >
                  <HiPencil />
                </button>
                
                {faqItems.length > 1 && (
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFAQ(faq.id);
                    }}
                    title="Remove FAQ"
                  >
                    ✕
                  </button>
                )}
                
                <button
                  className="toggle-btn"
                  style={{ color: accentColor }}
                  title={faq.isOpen ? 'Collapse' : 'Expand'}
                >
                  {faq.isOpen ? '−' : '+'}
                </button>
              </div>
            </div>

            {/* Answer Section */}
            <div className={`faq-answer-container ${faq.isOpen ? 'expanded' : ''}`}>
              <div className="answer-content">
                {editingField === `${faq.id}-answer` ? (
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                    onBlur={handleEditEnd}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleEditEnd();
                      }
                    }}
                    className="answer-textarea"
                    style={{ color: textColor }}
                    rows={4}
                    autoFocus
                  />
                ) : (
                  <p 
                    className="faq-answer"
                    style={{ color: textColor }}
                    onClick={() => handleEditStart('answer', faq.id)}
                  >
                    {faq.answer}
                  </p>
                )}
                
                <button
                  className="system-control-icon edit small"
                  onClick={() => handleEditStart('answer', faq.id)}
                  title="Edit answer"
                >
                  <HiPencil />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CompFAQDesign;
