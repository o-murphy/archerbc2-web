
import { useEffect } from "react";
import parseA7P from "@/utils/a7p";
import { useFileContext } from "@/hooks/fileContext";
import { FileHandleState } from "@/hooks/useFileHandler"; // Assuming this type is imported correctly

// The custom hook to handle file parsing
const useParseFile = (fileHandleState: FileHandleState) => {
    const { setParsedData, setBackupData } = useFileContext();

    useEffect(() => {
        if (fileHandleState.data && !fileHandleState.error) {
            // Parse the file data using parseA7P
            parseA7P(fileHandleState.data)
                .then((props) => {
                    setParsedData({ profile: props, error: null });
                    setBackupData({ profile: props, error: null });
                })
                .catch((error) => {
                    console.error("Error parsing A7P file:", error);
                    setParsedData({ profile: null, error });
                });
        } else if (fileHandleState.error) {
            console.error(fileHandleState.error); // Log the error if it's present in the fileState
        }
    }, [fileHandleState, setParsedData, setBackupData]); // Re-run the effect when fileHandleState changes
};

export default useParseFile;
