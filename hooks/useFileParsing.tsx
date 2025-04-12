
import { useEffect } from "react";
import { parseA7P } from "@/utils/a7p/a7p";
import { useFileContext } from "@/hooks/fileContext";
import { FileHandleState } from "@/hooks/useFileHandler"; // Assuming this type is imported correctly

// The custom hook to handle file parsing
const useParseFile = (fileHandleState: FileHandleState) => {
    const { setParsedData, setBackupData, setFileState } = useFileContext();

    useEffect(() => {
        if (fileHandleState.data && !fileHandleState.error && fileHandleState.data instanceof ArrayBuffer) {

            try {
                const payload = parseA7P(fileHandleState.data)
                console.log(payload)
                setParsedData({ profile: payload.profile, error: null });
                setBackupData({ profile: payload.profile, error: null });
            } catch (error: any) {
                setParsedData({ profile: null, error: new Error(`Error parsing A7P file: ${error}`) });
            };
        } else if (fileHandleState.error) {
            setParsedData({ profile: null, error: fileHandleState.error });
        }
        setFileState(fileHandleState)
    }, [fileHandleState, setFileState, setParsedData, setBackupData]); // Re-run the effect when fileHandleState changes
};

export default useParseFile;
