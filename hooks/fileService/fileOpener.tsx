import { ChangeEvent, RefObject, useEffect, useRef } from "react";
import {
    AllowedExtensions,
    useFileHandler,
} from "@/hooks/fileService/useFileHandler";
import { useParseFile } from "@/hooks/fileService/useFileParsing";

type FileInputProps = {
    fileInputRef: RefObject<HTMLInputElement>;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    allowedExtensions: string[];
};

const FileInput: React.FC<FileInputProps> = ({
    fileInputRef,
    handleFileChange,
    allowedExtensions,
}) => {
    return (
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the default file input
            key="file-upload" // Give an ID to the input
            onChange={handleFileChange}
            accept={allowedExtensions.join(",")} // Restrict to specific file types
        />
    );
};

class FileOpenerService {
    // This will hold a reference to the file input element, set by FileOpener
    private static fileInputRef: RefObject<HTMLInputElement> | null = null;

    // Method to trigger file input click
    static triggerFileInputClick() {
        if (this.fileInputRef?.current) {
            this.fileInputRef.current.click();
        }
    }

    // Method to set the file input ref from FileOpener
    static setFileInputRef(ref: RefObject<HTMLInputElement>) {
        this.fileInputRef = ref;
    }
}

const FileOpener = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { fileHandleState, handleFileChange } = useFileHandler(); // Use the custom hook

    // Set the file input ref in the service when the component mounts
    useEffect(() => {
        // This is where we set the file input ref in the service
        FileOpenerService.setFileInputRef(fileInputRef);
    }, []);

    // Parse file whenever fileHandleState changes
    useParseFile(fileHandleState);

    // Handle file selection by passing the file to the custom hook for processing
    const handleFileChangeWrapper = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileChange(event); // Process file
        }
    };

    return (
        <FileInput
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChangeWrapper}
            allowedExtensions={AllowedExtensions}
        />
    );
};

export { FileOpenerService, FileOpener };
