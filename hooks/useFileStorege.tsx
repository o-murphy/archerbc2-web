import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect } from "react";

const FILE_BACKUP_KEY = "file_backup";

// Helper to decode base64 to ArrayBuffer
export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binaryString = atob(base64); // atob decodes base64 string
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};

// Helper to encode ArrayBuffer to base64
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary); // btoa is base64 encode
};

// Load backup from storage (moved here for clarity)
export const loadBackup = async (
    setValue: (value: ArrayBuffer | null) => void,
    setIsReady: (value: boolean) => void,
) => {
    try {
        const stored = await AsyncStorage.getItem(FILE_BACKUP_KEY);
        console.log(stored);
        if (stored) {
            const decodedData = base64ToArrayBuffer(stored);
            setValue(decodedData);
        } else {
            setValue(null); // Handle case where there is no backup
        }
    } catch (e) {
        console.error("Failed to load backup", e);
        setValue(null); // In case of error, set value to null
    } finally {
        setIsReady(true);
    }
};

// Load backup from storage
export const useLoadBackup = (
    setValue: (value: ArrayBuffer | null) => void,
    setIsReady: (value: boolean) => void,
) => {
    useEffect(() => {
        const loadData = async () => {
            await loadBackup(setValue, setIsReady);
        };

        loadData(); // Run the async loading process

        // Empty dependency array ensures it only runs once when the component mounts
    }, []); // `[]` ensures this effect runs only once
};

export const savefileBackup = async (data: ArrayBuffer | null) => {
    try {
        if (data) {
            const base64 = arrayBufferToBase64(data);
            await AsyncStorage.setItem(FILE_BACKUP_KEY, base64);
        } else {
            await AsyncStorage.removeItem(FILE_BACKUP_KEY);
        }
    } catch (error) {
        console.error("Failed to save backup", error);
        throw error;
    }
    return data;
};

export const useSaveBackup = (data: ArrayBuffer | null) => {
    return useCallback(() => {
        savefileBackup(data);
    }, [data]);
};
