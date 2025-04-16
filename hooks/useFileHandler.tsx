// import { ChangeEvent, useState } from "react";

// export const AllowedExtensions = [".a7p"];


// export type FileDataType = string | ArrayBuffer | null | undefined


// // Define the types for file state and parsed data
// export interface FileHandleState {
//     name: string | null;
//     data: string | ArrayBuffer | null;
//     error: Error | null;
// }

// export const useFileHandler = () => {
//     const [fileHandleState, setFileHandleState] = useState<FileHandleState>({
//         // name: "Upload file",
//         name: null,
//         data: null,
//         error: null,
//     });

//     const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const input = event.target;
//         const file = input.files?.[0];
//         if (!file) return;
    
//         // Reset value to allow same file selection
//         input.value = '';
    
//         const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
//         console.log("Selected file extension:", extension);
    
//         if (!AllowedExtensions.includes(extension)) {
//             setFileHandleState({
//                 name: null,
//                 data: null,
//                 error: new Error("Invalid file type, .a7p expected."),
//             });
//             return;
//         }
    
//         const reader = new FileReader();
    
//         reader.onload = () => {
//             setFileHandleState({
//                 name: file.name,
//                 data: reader.result,
//                 error: null,
//             });
//         };
    
//         reader.onerror = () => {
//             setFileHandleState({
//                 name: file.name,
//                 data: null,
//                 error: new Error("Failed to read file"),
//             });
//         };
    
//         reader.readAsArrayBuffer(file);
//     };

//     return { fileHandleState, handleFileChange };
// };

import { ChangeEvent, useState } from "react";

export const AllowedExtensions = [".a7p"];

export type FileDataType = string | ArrayBuffer | null | undefined;

export interface FileHandleState {
    name: string | null;
    data: string | ArrayBuffer | null;
    error: Error | null;
}

export const useFileHandler = () => {
    const [fileHandleState, setFileHandleState] = useState<FileHandleState>({
        name: null,
        data: null,
        error: null,
    });

    // This processes a File object (used in both input and drop)
    const processFile = (file: File) => {
        const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

        if (!AllowedExtensions.includes(extension)) {
            setFileHandleState({
                name: null,
                data: null,
                error: new Error("Invalid file type, .a7p expected."),
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
        };

        reader.onerror = () => {
            setFileHandleState({
                name: file.name,
                data: null,
                error: new Error("Failed to read file"),
            });
        };

        reader.readAsArrayBuffer(file);
    };

    // Wraps input element change events
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        const file = input.files?.[0];
        if (!file) return;

        input.value = ''; // allow reselecting same file
        processFile(file);
    };

    return { fileHandleState, handleFileChange, processFile };
};
