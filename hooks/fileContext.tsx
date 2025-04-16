import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { FileHandleState } from './useFileHandler';
import { Platform } from 'react-native';
import { ParsedData, saveParsedData } from './useFileParsing';
import { SnackbarService } from './snackBarService';


// Define the context value type
interface FileContextType {
    fileState: FileHandleState;
    setFileState: React.Dispatch<React.SetStateAction<FileHandleState>>;
    currentData: ParsedData;
    setCurrentData: React.Dispatch<React.SetStateAction<ParsedData>>;
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

// const useFileBackup = () => {
//     const [isReady, setIsReady] = useState(false);

//     const { fileHandleState, handleFileChange } = useFileHandler(); // Keeping the file handler as it is
  
//     // Function to load the backup and pass it to the file handler without changing useFileHandler
//     const loadBackupToFileHandler = (backupData: ArrayBuffer | null) => {
//         if (backupData) {
//             // Simulate file processing with the loaded backup data
//             const fakeFile = new Blob([backupData]);
//             const file = new File([fakeFile], "backup.a7p", { type: "application/octet-stream" });
  
//             // Process the file like it was a user-uploaded file
//             handleFileChange({ target: { files: [file] } } as any); // Trigger the file handling logic
//         }
//     };
  
//     // Load the backup from storage and process it
//     useLoadBackup((data) => {
//         if (data) {
//             loadBackupToFileHandler(data); // Process the loaded backup data
//         }
//     }, setIsReady);
  
//     useParseFile(fileHandleState);
// }

// Provider component to wrap around your app
export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
    const [fileState, setFileState] = useState<FileHandleState>(defaultState);
    const [currentData, setCurrentData] = useState<ParsedData>(defaultData);
    const [backupData, setBackupData] = useState<ParsedData>(defaultData);

    // Dummy state for forcing re-render
    const [dummyState, setDummyState] = useState<boolean>(false);

    if (currentData.profile) {
        console.log(currentData.profile)
    }

    useEffect(() => {
        if (currentData.profile && !backupData.profile) {
            syncBackup()
        }
    }, [currentData.profile])

    const syncBackup = () => {
        setBackupData(currentData)
    }

    // FIXME use backup and current diff status
    const restoreBackup = () => {
        setDummyState(prev => !prev); // Increment dummyState to trigger re-render
        setCurrentData(backupData)
    }

    const saveFile = () => {
        try {
            saveParsedData(currentData, fileState.name)
        } catch (error: any) {
            console.log(`Error on file download, ${error}`)
            SnackbarService.error(error)
        }
    }

    const closeFile = (save: boolean = false) => {
        if (save) {
            saveFile()
        }
        setBackupData(defaultData)
        setCurrentData(defaultData)
        setFileState(defaultState)
    }

    useEffect(() => {
        if (Platform.OS !== 'web') return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = 'Input data can be lost';
        };

        if (currentData.profile !== null) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [currentData.profile]);

    return (
        <FileContext.Provider value={{
            fileState, setFileState,
            currentData, setCurrentData,
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
