
import { useState, useEffect, useCallback } from 'react';
import { FileMetadata } from '../types';
import { CURRENT_USER_ID, MOCK_USERS } from '../constants';

const getInitialFiles = (): FileMetadata[] => {
  try {
    const item = window.localStorage.getItem('teamdrive_files');
    if (item) {
      return JSON.parse(item);
    }
  } catch (error) {
    console.error('Error reading from localStorage', error);
  }

  // Generate mock data if localStorage is empty
  return [
    { id: '1', name: 'Q4_Financials.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', size: 120400, createdAt: new Date(Date.now() - 86400000).toISOString(), ownerId: 'user-1', ownerName: 'You', sharedWith: ['user-2'] },
    { id: '2', name: 'Project_Proposal.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 45200, createdAt: new Date(Date.now() - 172800000).toISOString(), ownerId: 'user-1', ownerName: 'You', sharedWith: [] },
    { id: '3', name: 'Team_Photo.png', type: 'image/png', size: 2150000, createdAt: new Date(Date.now() - 259200000).toISOString(), ownerId: 'user-2', ownerName: 'Alice Smith', sharedWith: ['user-1', 'user-3'] },
    { id: '4', name: 'Marketing_Brief.pdf', type: 'application/pdf', size: 890000, createdAt: new Date(Date.now() - 345600000).toISOString(), ownerId: 'user-3', ownerName: 'Bob Johnson', sharedWith: ['user-1'] },
  ];
};

export const useFileStore = () => {
  const [files, setFiles] = useState<FileMetadata[]>(getInitialFiles);

  useEffect(() => {
    try {
      window.localStorage.setItem('teamdrive_files', JSON.stringify(files));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [files]);

  const addFile = useCallback((file: File) => {
    const newFile: FileMetadata = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      createdAt: new Date().toISOString(),
      ownerId: CURRENT_USER_ID,
      ownerName: 'You',
      sharedWith: [],
    };
    setFiles(prevFiles => [newFile, ...prevFiles]);
  }, []);

  const deleteFile = useCallback((fileId: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
  }, []);

  const shareFile = useCallback((fileId: string, userId: string) => {
    setFiles(prevFiles =>
      prevFiles.map(f => {
        if (f.id === fileId && !f.sharedWith.includes(userId)) {
          return { ...f, sharedWith: [...f.sharedWith, userId] };
        }
        return f;
      })
    );
  }, []);
  
  const myFiles = files.filter(f => f.ownerId === CURRENT_USER_ID);
  const sharedFiles = files.filter(f => f.sharedWith.includes(CURRENT_USER_ID));

  return { myFiles, sharedFiles, addFile, deleteFile, shareFile };
};
