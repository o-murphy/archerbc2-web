import { ChangeEvent, useState } from "react";

export const AllowedExtensions = [".a7p"];


export type FileDataType = string | ArrayBuffer | null | undefined


// Define the types for file state and parsed data
export interface FileHandleState {
    name: string;
    data: string | ArrayBuffer | null;
    error: string | Error | null;
}

export const useFileHandler = () => {
    const [fileHandleState, setFileHandleState] = useState<FileHandleState>({
        name: "Upload file",
        data: null,
        error: null,
    });

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
        console.log("Selected file extension:", extension);

        if (!AllowedExtensions.includes(extension)) {
            setFileHandleState({
                name: "Upload file",
                data: null,
                error: "Invalid file type, .a7p expected.",
            });
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setFileHandleState({
                name: file.name,
                data: reader.result,
                error: null,
            });
            // console.log(reader.result);  // 
        };

        reader.onerror = () => {
            setFileHandleState({
                name: file.name,
                data: null,
                error: "Failed to read file",
            });
        };

        reader.readAsArrayBuffer(file);
    };

    return { fileHandleState, handleFileChange };
};
