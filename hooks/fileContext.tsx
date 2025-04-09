import { ProfileProps } from '@/utils/a7p';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { FileHandleState } from './useFileHandler';

interface ParsedData {
    profile: ProfileProps | null;
    error: string | null;
}

// Define the context value type
interface FileContextType {
    fileState: FileHandleState;
    setFileState: React.Dispatch<React.SetStateAction<FileHandleState>>;
    parsedData: ParsedData;
    setParsedData: React.Dispatch<React.SetStateAction<ParsedData>>;
    backupData: ParsedData;
    setBackupData: React.Dispatch<React.SetStateAction<ParsedData>>;
    syncBackup: () => void;
    restoreBackup: () => void;

    dummyState: boolean; // This state will trigger re-renders
    setDummyState: React.Dispatch<React.SetStateAction<boolean>>; // Function to modify dummy state
}

// Define the props type for FileProvider
interface FileProviderProps {
    children: ReactNode;
}

// Create context with default values
const FileContext = createContext<FileContextType | undefined>(undefined);

// Provider component to wrap around your app
export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
    const [fileState, setFileState] = useState<FileHandleState>({ name: 'Upload file', data: null, error: null });
    const [parsedData, setParsedData] = useState<ParsedData>({ profile: null, error: null });
    const [backupData, setBackupData] = useState<ParsedData>({ profile: null, error: null });

    // Dummy state for forcing re-render
    const [dummyState, setDummyState] = useState<boolean>(false);

    console.log(parsedData.profile)

    useEffect(() => {
        if (parsedData.profile && !backupData.profile) {
            syncBackup()
        }
    }, [parsedData.profile])

    const syncBackup = () => {
        setBackupData(parsedData)
    }

    // FIXME use backup and current diff status
    const restoreBackup = () => {
        setDummyState(prev => !prev); // Increment dummyState to trigger re-render
        setParsedData(backupData)
    }

    return (
        <FileContext.Provider value={{
            fileState, setFileState,
            parsedData, setParsedData,
            backupData, setBackupData,
            syncBackup, restoreBackup,
            dummyState, setDummyState
        }}>
            {children}
        </FileContext.Provider>
    );
};

// Custom hook to access file context
export const useFileContext = (): FileContextType => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error('useFileContext must be used within a FileProvider');
    }
    return context;
};
