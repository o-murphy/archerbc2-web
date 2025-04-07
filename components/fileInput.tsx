import { ChangeEvent, RefObject } from "react";

type FileInputProps = {
    fileInputRef: RefObject<HTMLInputElement>;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    allowedExtensions: string[];
};

const FileInput: React.FC<FileInputProps> = ({ fileInputRef, handleFileChange, allowedExtensions }) => {
    return (
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }} // Hide the default file input
            id="file-upload" // Give an ID to the input
            onChange={handleFileChange}
            accept={allowedExtensions.join(',')} // Restrict to specific file types
        />
    )
}


export {FileInput, FileInputProps}