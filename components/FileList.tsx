
import React from 'react';
import { FileMetadata } from '../types';
import FileItem from './FileItem';

interface FileListProps {
  files: FileMetadata[];
  onDelete: (fileId: string) => void;
  onShare: (fileId: string, userId: string) => void;
  onAnalyze: (file: FileMetadata) => void;
  isSharedView: boolean;
}

const FileList: React.FC<FileListProps> = ({ files, onDelete, onShare, onAnalyze, isSharedView }) => {
  if (files.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-brand-gray">No files here. Try uploading something!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {files.map(file => (
        <FileItem
          key={file.id}
          file={file}
          onDelete={onDelete}
          onShare={onShare}
          onAnalyze={onAnalyze}
          isSharedView={isSharedView}
        />
      ))}
    </div>
  );
};

export default FileList;
