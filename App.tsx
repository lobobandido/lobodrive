
import React, { useState, useCallback } from 'react';
import { useFileStore } from './hooks/useFileStore';
import Header from './components/Header';
import FileList from './components/FileList';
import UploadButton from './components/UploadButton';
import AdvancedAnalysisView from './components/AdvancedAnalysisView';
import { FileMetadata, View } from './types';

export default function App() {
  const { myFiles, sharedFiles, addFile, deleteFile, shareFile } = useFileStore();
  const [currentView, setCurrentView] = useState<View>('my-files');
  const [selectedFileForAnalysis, setSelectedFileForAnalysis] = useState<FileMetadata | null>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addFile(e.target.files[0]);
    }
  }, [addFile]);

  const handleAnalyze = useCallback((file: FileMetadata) => {
    setSelectedFileForAnalysis(file);
    setCurrentView('analysis');
  }, []);

  const handleCloseAnalysis = useCallback(() => {
    setSelectedFileForAnalysis(null);
    setCurrentView('my-files');
  }, []);

  const renderContent = () => {
    if (currentView === 'analysis' && selectedFileForAnalysis) {
      return (
        <AdvancedAnalysisView 
          file={selectedFileForAnalysis} 
          onClose={handleCloseAnalysis} 
        />
      );
    }

    const filesToShow = currentView === 'my-files' ? myFiles : sharedFiles;
    
    return (
      <FileList
        files={filesToShow}
        onDelete={deleteFile}
        onShare={shareFile}
        onAnalyze={handleAnalyze}
        isSharedView={currentView === 'shared-with-me'}
      />
    );
  };

  return (
    <div className="min-h-screen font-sans text-brand-dark dark:text-brand-light antialiased">
      <div className="max-w-4xl mx-auto flex flex-col h-screen">
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        
        <main className="flex-grow p-4 overflow-y-auto">
          {renderContent()}
        </main>

        {currentView !== 'analysis' && <UploadButton onFileSelect={handleFileSelect} />}
      </div>
    </div>
  );
}
