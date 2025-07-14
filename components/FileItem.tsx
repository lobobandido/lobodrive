
import React, { useState, useRef, useEffect } from 'react';
import { FileMetadata } from '../types';
import { MOCK_USERS } from '../constants';
import { Icon } from './Icon';
import Modal from './Modal';

interface FileItemProps {
  file: FileMetadata;
  onDelete: (fileId: string) => void;
  onShare: (fileId: string, userId: string) => void;
  onAnalyze: (file: FileMetadata) => void;
  isSharedView: boolean;
}

const FileItem: React.FC<FileItemProps> = ({ file, onDelete, onShare, onAnalyze, isSharedView }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isOfficeDoc = file.type.includes('wordprocessingml') || file.type.includes('spreadsheetml');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleShare = (userId: string) => {
    onShare(file.id, userId);
    setShareModalOpen(false);
  };

  const getFileIconName = () => {
    if (file.type.includes('word')) return 'file-word';
    if (file.type.includes('sheet')) return 'file-excel';
    if (file.type.includes('pdf')) return 'file-pdf';
    if (file.type.startsWith('image')) return 'file-image';
    return 'file-generic';
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center space-x-4 transition-shadow hover:shadow-md">
        <Icon name={getFileIconName()} className="w-10 h-10 flex-shrink-0" />
        <div className="flex-grow overflow-hidden">
          <p className="font-semibold text-brand-dark dark:text-white truncate">{file.name}</p>
          <p className="text-sm text-brand-gray">
            {formatBytes(file.size)} &middot; {formatDate(file.createdAt)}
            {isSharedView && ` &middot; Shared by ${file.ownerName}`}
          </p>
        </div>
        <div className="relative flex-shrink-0" ref={menuRef}>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Icon name="dots" className="w-5 h-5 text-brand-gray" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 border border-gray-200 dark:border-gray-700">
              <ul className="py-1">
                {isOfficeDoc && (
                  <li>
                    <button onClick={() => { onAnalyze(file); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                      <Icon name="chart" className="w-4 h-4" />
                      <span>Analyze Data</span>
                    </button>
                  </li>
                )}
                {!isSharedView && (
                  <>
                    <li>
                      <button onClick={() => { setShareModalOpen(true); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                        <Icon name="share" className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </li>
                    <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                    <li>
                      <button onClick={() => { onDelete(file.id); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2">
                        <Icon name="trash" className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)} title="Share File">
          <div className="p-4">
              <p className="text-sm text-brand-gray mb-4">Select a team member to share <span className="font-semibold text-brand-dark dark:text-white">{file.name}</span> with.</p>
              <div className="space-y-2">
                  {MOCK_USERS.filter(u => !file.sharedWith.includes(u.id)).map(user => (
                      <button 
                          key={user.id} 
                          onClick={() => handleShare(user.id)}
                          className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                          {user.name}
                      </button>
                  ))}
                  {MOCK_USERS.filter(u => !file.sharedWith.includes(u.id)).length === 0 && (
                      <p className="text-center text-sm text-brand-gray py-4">Already shared with everyone!</p>
                  )}
              </div>
          </div>
      </Modal>
    </>
  );
};

export default FileItem;
