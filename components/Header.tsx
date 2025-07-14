
import React from 'react';
import { View } from '../types';
import { Icon } from './Icon';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const isAnalysisView = currentView === 'analysis';

  return (
    <header className="bg-white/80 dark:bg-brand-dark/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Icon name="folder" className="w-8 h-8 text-brand-blue" />
            <h1 className="text-xl font-bold text-brand-dark dark:text-white">TeamDrive</h1>
          </div>
        </div>
        {!isAnalysisView && (
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <TabButton
              label="My Files"
              isActive={currentView === 'my-files'}
              onClick={() => setCurrentView('my-files')}
            />
            <TabButton
              label="Shared with me"
              isActive={currentView === 'shared-with-me'}
              onClick={() => setCurrentView('shared-with-me')}
            />
          </div>
        )}
      </div>
    </header>
  );
};

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  const activeClasses = 'border-brand-blue text-brand-blue dark:text-brand-blue';
  const inactiveClasses = 'border-transparent text-brand-gray hover:text-brand-dark dark:hover:text-white';
  
  return (
    <button
      onClick={onClick}
      className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
    >
      {label}
    </button>
  );
};

export default Header;
