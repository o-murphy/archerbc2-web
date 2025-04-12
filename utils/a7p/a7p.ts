import CryptoJS from 'crypto-js';
import { Payload } from './types';
import { profedit } from './profedit'
import { validate } from './validate'

const MD5_LENGTH = 32;



// Utility function to convert array buffer to base64
const bufferToBase64 = (buffer: ArrayBuffer): string => {
    if (typeof Buffer !== 'undefined') {
        // Node.js (and environments where Buffer is polyfilled)
        return Buffer.from(buffer).toString('base64');
    }

    // Browser or React Native (Expo)
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    // btoa might not exist in React Native
    if (typeof btoa !== 'undefined') {
        return btoa(binary);
    }

    // Expo / React Native fallback
    // Use globalThis to avoid breaking on iOS/Android
    if (globalThis?.Buffer) {
        return globalThis.Buffer.from(buffer).toString('base64');
    }

    throw new Error("Base64 encoding not supported in this environment");
}

// MD5 hash function using Node.js crypto module
const md5 = (data: string): string => {
    // Convert binary string to WordArray for CryptoJS
    const wordArray = CryptoJS.enc.Latin1.parse(data);
    // Calculate MD5 hash and return as hexadecimal string
    const hash = CryptoJS.MD5(wordArray);
    return hash.toString(CryptoJS.enc.Hex);
};



export function buildA7P(payload: Payload): ArrayBuffer {
    try {
        validate(payload)

        // Step 1: Convert profile to payload message
        const payloadMessage = profedit.Payload.fromObject({ payload });

        // Step 2: Encode to Uint8Array (protobuf)
        const encoded = profedit.Payload.encode(payloadMessage).finish(); // Uint8Array

        // Step 3: Convert Uint8Array to binary string
        const binaryData = Array.from(encoded).map(byte => String.fromCharCode(byte)).join('');

        // Step 4: Calculate MD5 of actual data
        const checksum = md5(binaryData); // Should be 32-char ASCII hex

        // Step 5: Prepend checksum
        const fullBinary = checksum + binaryData;

        // Step 6: Convert to base64, then back to binary string, then to ArrayBuffer
        const base64 = btoa(fullBinary);

        // Convert base64 -> binary -> ArrayBuffer
        const rawBinary = atob(base64);
        const buffer = new Uint8Array(rawBinary.length);
        for (let i = 0; i < rawBinary.length; i++) {
            buffer[i] = rawBinary.charCodeAt(i);
        }

        return buffer.buffer;
    } catch (error: unknown) {
        console.log("f", error)
        if (error instanceof Error) {
            // Provide more specific error information
            console.error("Error building A7P:", error.message);
            throw new Error(`Error encoding payload: ${error.message}`);
        } else {
            console.error("Unknown error:", error);
            throw new Error("Unknown error occurred while encoding the payload.");
        }
    }
}

export function parseA7P(buffer: ArrayBuffer): Payload {
    try {

        const base64 = bufferToBase64(buffer);
        const binaryData = atob(base64);
        const md5Checksum = binaryData.slice(0, MD5_LENGTH);
        const actualData = binaryData.slice(MD5_LENGTH);

        const calculatedChecksum = md5(actualData);

        if (md5Checksum !== calculatedChecksum) {
            console.error("Invalid A7P file checksum");
            throw new Error("Invalid A7P file checksum");
        }


        const uint8ArrayData = new Uint8Array(actualData.split('').map(char => char.charCodeAt(0)));
        const payload = profedit.Payload.decode(uint8ArrayData);
        const payloadObject: Payload = profedit.Payload.toObject(payload, {
            longs: Number,
            enums: String,
            bytes: String,
            defaults: true,
            arrays: true
        }) as Payload;
        validate(payloadObject)
        return payloadObject;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error decoding A7P payload:", error.message);  // Log the error for debugging
            throw new Error(`Error decoding payload: ${error.message}`);
        } else {
            console.error("Unknown error:", error);
            throw new Error("Unknown error occurred while decoding the payload.");
        }
    }
}


export function downloadA7PFile(buffer: ArrayBuffer, filename: string = 'profile.a7p') {
    if (typeof window === 'undefined') return;

    // Create a Blob from the ArrayBuffer
    const blob = new Blob([buffer], { type: 'application/octet-stream' });

    // Create a temporary link element
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}