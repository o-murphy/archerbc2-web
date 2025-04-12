import { Profile } from '@/utils/a7p/types';
import { buildA7P, downloadA7PFile } from '@/utils/a7p/a7p';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { FileHandleState } from './useFileHandler';
import { Platform } from 'react-native';


interface ParsedData {
    profile: Profile | null;
    error: Error | null;
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

    closeFile: (save?: boolean) => void;
    saveFile: () => void
}

// Define the props type for FileProvider
interface FileProviderProps {
    children: ReactNode;
}

// Create context with default values
const FileContext = createContext<FileContextType | undefined>(undefined);

const defaultState = { name: null, data: null, error: null }
const defaultData = { profile: null, error: null }

// Provider component to wrap around your app
export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
    const [fileState, setFileState] = useState<FileHandleState>(defaultState);
    const [parsedData, setParsedData] = useState<ParsedData>(defaultData);
    const [backupData, setBackupData] = useState<ParsedData>(defaultData);

    // Dummy state for forcing re-render
    const [dummyState, setDummyState] = useState<boolean>(false);

    if (parsedData.profile) {
        console.log(parsedData.profile)
    }

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

    const saveFile = () => {
        if (parsedData.profile && !parsedData.error) {
            const buffer = buildA7P({
                profile: parsedData.profile
            })
            if (!fileState.name || fileState.name === "Upload file") {
                fileState.name = `${parsedData.profile.profileName}_${parsedData.profile.cartridgeName}.a7p`
            }
            downloadA7PFile(buffer, fileState.name)
        }
    }

    const closeFile = (save: boolean = false) => {
        if (save) {
            saveFile()
        }
        setBackupData(defaultData)
        setParsedData(defaultData)
        setFileState(defaultState)
    }

    useEffect(() => {
        if (Platform.OS !== 'web') return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = 'Input data can be lost';
        };

        if (parsedData.profile !== null) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [parsedData.profile]);

    return (
        <FileContext.Provider value={{
            fileState, setFileState,
            parsedData, setParsedData,
            backupData, setBackupData,
            syncBackup, restoreBackup,
            dummyState, setDummyState,
            closeFile, saveFile,
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
