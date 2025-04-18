import { ChangeEvent, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import { encodePayloadParam, useParseUrl } from "./useFileParsing";
import { useFileContext } from "./fileContext";

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

// Function to update `payload` parameter in the URL (only works on web)
export const updateUrlPayload = (newPayload: string | undefined) => {
    if (Platform.OS === 'web') {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('payload', newPayload ? newPayload : "");
        window.history.replaceState({}, '', currentUrl.toString());
    }
};

export const UrlProfileUpdater = () => {
    const { backupData } = useFileContext()
    const [urlEncoded, setUrlEncoded] = useState<string | undefined>(undefined);

    // Compute URL when currentData changes
    useEffect(() => {
        if (!backupData.error && backupData.profile) {
            try {
                const url = encodePayloadParam(backupData);
                setUrlEncoded(url);
            } catch (error: any) {
                setUrlEncoded(undefined);
            }
        } else {
            setUrlEncoded(undefined);
        }
    }, [backupData]);

    useEffect(() => {
        updateUrlPayload(urlEncoded)
    }, [urlEncoded, setUrlEncoded])


    return null
}

export const UrlProfileLoader = () => {
    // const [urlParams, setUrlParams] = useState<string | null>(null);
    const [urlPayload, setUrlPayload] = useState<string | null>(null);


    useEffect(() => {
        const getInitialURLParams = async () => {
            // Get the initial URL that the app was opened with
            const url = await Linking.getInitialURL();

            if (url) {
                // If a URL exists, parse it and extract parameters
                const urlParams = new URLSearchParams(url.split('?')[1]);
                const myParam = urlParams.get('payload');  // Replace 'payload' with the name of your query param
                // setUrlParams(myParam);
                setUrlPayload(myParam);
            }
        };

        // Check if the app was opened from a URL
        getInitialURLParams();

        // Handle URL changes while the app is in the background or opened via a deep link
        const handleUrlChange = (event: any) => {
            const { url } = event;
            const urlParams = new URLSearchParams(url.split('?')[1]);
            const myParam = urlParams.get('payload');
            // setUrlParams(myParam);
            setUrlPayload(myParam);
        };

        // Add event listener for URL changes
        const urlListener = Linking.addEventListener('url', handleUrlChange);

        // Clean up the event listener when the component unmounts or the effect is cleaned up
        return () => {
            urlListener.remove(); // Remove the event listener when cleaning up
        };
    }, []);

    useParseUrl(urlPayload)

    return null
}



