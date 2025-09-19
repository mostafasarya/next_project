'use client';

import React, { useState } from 'react';
import StyleTextUser from '../../EditorControls/PropertiesManagement/StyleTextUser';
import '../../EditorControls/PropertiesManagement/SystemControlIcons.css';
import './CompTextPosterDesign.css';

interface CompTextPosterDesignProps {
  text?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

const CompTextPosterDesign: React.FC<CompTextPosterDesignProps> = ({
  text = "Your text poster message goes here",
  backgroundColor = "#ffffff",
  borderRadius = "16px"
}) => {
  const [textContent, setTextContent] = useState(text);
  const [textStyles, setTextStyles] = useState({
    fontSize: 36,
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#1f2937',
    fontWeight: '700',
    textAlign: 'center' as const
  });

  return (
    <div 
      className="comp-textposter-design"
      style={{ 
        backgroundColor,
        borderRadius,
        border: '1px solid #e5e7eb',
        margin: '20px 0',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '40px 20px'
      }}
    >
      <StyleTextUser
        value={textContent}
        onChange={setTextContent}
        styles={textStyles}
        onStylesChange={setTextStyles}
        placeholder="Click to add your poster text..."
      />
    </div>
  );
};

export default CompTextPosterDesign;