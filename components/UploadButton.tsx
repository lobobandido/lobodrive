
import React, { useRef } from 'react';
import { Icon } from './Icon';

interface UploadButtonProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed bottom-6 right-6 z-20">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="bg-brand-blue text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        aria-label="Upload file"
      >
        <Icon name="upload" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default UploadButton;
