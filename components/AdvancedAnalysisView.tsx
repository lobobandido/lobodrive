
import React, { useState, useCallback } from 'react';
import { FileMetadata } from '../types';
import { generateAnalysisPlan } from '../services/geminiService';
import { Icon } from './Icon';

interface AdvancedAnalysisViewProps {
  file: FileMetadata;
  onClose: () => void;
}

const AdvancedAnalysisView: React.FC<AdvancedAnalysisViewProps> = ({ file, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleGeneratePlan = useCallback(async () => {
    setIsLoading(true);
    setAiResponse('');
    const plan = await generateAnalysisPlan(file.name);
    setAiResponse(plan);
    setIsLoading(false);
  }, [file.name]);
  
  const formattedAiResponse = aiResponse.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 rounded-md p-4 my-4 text-sm overflow-x-auto"><code>$2</code></pre>')
                                          .replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-700 text-red-500 rounded px-1 py-0.5">$1</code>')
                                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                          .replace(/\n/g, '<br />');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="chart" className="w-6 h-6 text-brand-blue" />
          <h2 className="text-xl font-bold text-brand-dark dark:text-white">Document Analysis</h2>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <Icon name="close" className="w-5 h-5 text-brand-gray" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-brand-light dark:bg-gray-900/50 rounded-lg">
        <p className="font-semibold text-brand-dark dark:text-white">{file.name}</p>
        <p className="text-sm text-brand-gray">{file.type}</p>
      </div>

      <div className="flex-grow bg-brand-light dark:bg-gray-900/50 rounded-lg p-6 flex flex-col items-center justify-center text-center">
        <Icon name="tools" className="w-16 h-16 text-brand-gray mb-4" />
        <h3 className="text-lg font-semibold text-brand-dark dark:text-white">Feature in Development</h3>
        <p className="text-sm text-brand-gray max-w-sm mx-auto mb-6">
          This advanced feature will allow you to filter, group, and extract data directly from this document.
        </p>
        <button
          onClick={handleGeneratePlan}
          disabled={isLoading}
          className="bg-brand-blue text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <Icon name="loading" className="w-5 h-5 animate-spin" />
          ) : (
            <Icon name="sparkles" className="w-5 h-5" />
          )}
          <span>{isLoading ? 'Generating Plan...' : 'Ask AI for Implementation Plan'}</span>
        </button>
      </div>
      
      { (isLoading || aiResponse) && (
        <div className="mt-6 flex-grow overflow-y-auto">
          <h4 className="font-semibold mb-2 text-brand-dark dark:text-white">AI-Generated Implementation Plan:</h4>
          {isLoading && <p className="text-brand-gray animate-pulse">The AI is thinking...</p>}
          {aiResponse && (
             <div className="prose prose-sm dark:prose-invert max-w-none text-brand-dark dark:text-gray-300" dangerouslySetInnerHTML={{ __html: formattedAiResponse }} />
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedAnalysisView;
