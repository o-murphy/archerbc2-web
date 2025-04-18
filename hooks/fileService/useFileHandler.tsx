import { ChangeEvent, useEffect, useState } from "react";
import { Platform } from "react-native";
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
const updateUrlPayload = (newPayload: string | undefined) => {
    if (Platform.OS === 'web') {
        const currentUrl = new URL(window.location.href);

        if (newPayload) {
            currentUrl.searchParams.set('payload', newPayload);
        } else {
            currentUrl.searchParams.delete('payload');
        }

        window.history.replaceState({}, '', currentUrl.toString());
    }
};

const useUrlPayloadUpdater = () => {
    const { backupData } = useFileContext();

    useEffect(() => {
        if (backupData?.profile && !backupData.error) {
            const encoded = encodePayloadParam(backupData);
            updateUrlPayload(encoded);
        } else {
            updateUrlPayload(undefined);
        }
    }, [backupData]);
};

const useUrlPayloadLoader = () => {
    const [urlPayload, setUrlPayload] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const payload = searchParams.get('payload');
        setUrlPayload(payload);
    }, []);

    useParseUrl(urlPayload);
};

export const UrlPayloadHandler = () => {
    // order is required!
    useUrlPayloadLoader();
    useUrlPayloadUpdater();
    return null;
};
