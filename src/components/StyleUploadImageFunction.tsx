'use client';

import React, { useRef } from 'react';
import { HiCamera } from 'react-icons/hi';
import './SystemControlIcons.css';

interface StyleUploadImageFunctionProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  acceptedFileTypes?: string;
  buttonClassName?: string;
  buttonTitle?: string;
  buttonSize?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  disabled?: boolean;
  multiple?: boolean;
}

const StyleUploadImageFunction: React.FC<StyleUploadImageFunctionProps> = ({
  onImageUpload,
  acceptedFileTypes = "image/*",
  buttonClassName = "system-control-icon camera medium",
  buttonTitle = "Upload Image",
  buttonSize = "medium",
  icon = <HiCamera />,
  disabled = false,
  multiple = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <>
      <button 
        className={`${buttonClassName} ${buttonSize} ${disabled ? 'disabled' : ''}`} 
        onClick={handleUploadClick}
        title={buttonTitle}
        disabled={disabled}
      >
        {icon}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes}
        onChange={onImageUpload}
        style={{ display: 'none' }}
        disabled={disabled}
        multiple={multiple}
      />
    </>
  );
};

export default StyleUploadImageFunction;
