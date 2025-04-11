// import protobuf from 'protobufjs';
import CryptoJS from 'crypto-js';
import { validateA7P } from './validate.js'
import { profedit } from './profedit.js'

// const root = await protobuf.load("public/proto/profedit.proto");
// const Payload = root.lookupType("Payload");
const Payload = profedit.Payload;

const MD5_LENGTH = 32;

// Utility function to convert array buffer to base64
const bufferToBase64 = (buffer) => {
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
const md5 = (data) => {
    // Convert binary string to WordArray for CryptoJS
    const wordArray = CryptoJS.enc.Latin1.parse(data);
    // Calculate MD5 hash and return as hexadecimal string
    const hash = CryptoJS.MD5(wordArray);
    return hash.toString(CryptoJS.enc.Hex);
};

export const loads = (arrayBuffer) => {
    try {
        const base64 = bufferToBase64(arrayBuffer);

        let binaryData;
        if (typeof atob !== 'undefined') {
            // Browser or Expo (where atob is available)
            binaryData = atob(base64);
        } else {
            // Node.js or React Native (Buffer polyfill)
            const decodedBuffer = Buffer.from(base64, 'base64');
            binaryData = decodedBuffer.toString('binary');
        }

        const md5Checksum = binaryData.slice(0, MD5_LENGTH);
        const actualData = binaryData.slice(MD5_LENGTH);

        const calculatedChecksum = md5(actualData);

        if (md5Checksum !== calculatedChecksum) {
            console.error("Invalid A7P file checksum", md5Checksum, calculatedChecksum);
            throw new Error("Invalid A7P file checksum");
        }

        // Efficiently convert binary data to Uint8Array
        const uint8ArrayData = new Uint8Array(actualData.split('').map(char => char.charCodeAt(0)));

        // Decode and convert the payload
        const payload = Payload.decode(uint8ArrayData);
        const payloadObject = Payload.toObject(payload, {
            longs: Number,
            enums: String,
            bytes: String,
            defaults: true,
            arrays: true
        });

        // Validate the decoded payload object
        validateA7P(payloadObject);

        // Extract profile
        // const profile = payloadObject.profile;
        return payloadObject;

    } catch (error) {
        console.error("Error decoding A7P payload:", error);  // Log the error for debugging
        throw new Error(`Error decoding payload: ${error.message}`);
    }
};



export const dumps = (payload) => {
    try {
        // Validate the profile object synchronously before continuing
        validateA7P(payload);

        // Step 1: Convert profile to payload message
        const payloadMessage = Payload.fromObject({ payload });

        // Step 2: Encode to Uint8Array (protobuf)
        const encoded = Payload.encode(payloadMessage).finish(); // Uint8Array

        // Step 3: Convert Uint8Array to binary string
        const binaryData = Array.from(encoded).map(byte => String.fromCharCode(byte)).join('');

        // Step 4: Calculate MD5 of actual data using CryptoJS
        const checksum = md5(binaryData); // 32-char ASCII hex

        // Step 5: Prepend checksum
        const fullBinary = checksum + binaryData;

        // Step 6: Convert to base64, then back to binary string, then to ArrayBuffer
        let base64;
        if (typeof btoa !== 'undefined') {
            // Browser or Expo
            base64 = btoa(fullBinary);
        } else {
            // Node.js or React Native (using Buffer)
            base64 = Buffer.from(fullBinary, 'binary').toString('base64');
        }

        // Convert base64 -> binary -> ArrayBuffer
        let rawBinary;
        if (typeof atob !== 'undefined') {
            // Browser or Expo (atob is available)
            rawBinary = atob(base64);
        } else {
            // Node.js or React Native (atob is not available, use Buffer)
            const decodedBuffer = Buffer.from(base64, 'base64');
            rawBinary = decodedBuffer.toString('binary');
        }

        const buffer = new Uint8Array(rawBinary.length);
        for (let i = 0; i < rawBinary.length; i++) {
            buffer[i] = rawBinary.charCodeAt(i);
        }

        return buffer.buffer;
    } catch (error) {
        // Provide more specific error information
        console.error("Error building A7P:", error);
        throw new Error(`Error encoding payload: ${error.message}`);
    }
};