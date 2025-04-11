import CryptoJS from 'crypto-js';

import { profedit } from './profedit'

const MD5_LENGTH = 32;


export enum TwistDir {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}

export enum BcType {
    G1 = 'G1',
    G7 = 'G7',
    CUSTOM = "CUSTOM"
}

export interface ProfileProps {
    bDiameter: number;
    bLength: number;
    bWeight: number;
    bcType: BcType;
    bulletName: string;
    cMuzzleVelocity: number;
    cTCoeff: number;
    cZeroAirHumidity: number;
    cZeroAirPressure: number;
    cZeroAirTemperature: number;
    cZeroDistanceIdx: number;
    cZeroPTemperature: number;
    cZeroTemperature: number;
    cZeroWPitch: number;
    caliber: string;
    cartridgeName: string;
    coefRows: any[];
    deviceUuid: string;
    distances: number[];
    profileName: string;
    rTwist: number;
    scHeight: number;
    shortNameBot: string;
    shortNameTop: string;
    switches: any[];
    twistDir: TwistDir;
    userNote: string;
    zeroX: number;
    zeroY: number;
}


// Utility function to convert array buffer to base64
export function bufferToBase64(buffer: any): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

// MD5 hash function using Node.js crypto module
export function md5(data: any) {
    // Convert binary string to WordArray for CryptoJS
    const wordArray = CryptoJS.enc.Latin1.parse(data);
    // Calculate MD5 hash and return as hexadecimal string
    const hash = CryptoJS.MD5(wordArray);
    return hash.toString(CryptoJS.enc.Hex);
};



export function buildA7P(profile: ProfileProps): ArrayBuffer {
    const Payload = profedit.Payload;

    // Step 1: Convert profile to payload message
    const payloadMessage = Payload.fromObject({ profile });

    // Step 2: Encode to Uint8Array (protobuf)
    const encoded = Payload.encode(payloadMessage).finish(); // Uint8Array

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
}

export function parseA7P(arrayBuffer: ArrayBuffer): ProfileProps {
    const base64 = bufferToBase64(arrayBuffer);
    const binaryData = atob(base64);
    const md5Checksum = binaryData.slice(0, MD5_LENGTH);
    const actualData = binaryData.slice(MD5_LENGTH);

    const calculatedChecksum = md5(actualData);

    if (md5Checksum !== calculatedChecksum) {
        console.error("Invalid A7P file checksum");
        throw new Error("Invalid A7P file checksum");
    }

    const Payload = profedit.Payload

    try {
        const uint8ArrayData = new Uint8Array(actualData.split('').map(char => char.charCodeAt(0)));
        const payload = Payload.decode(uint8ArrayData);
        const payloadObject = Payload.toObject(payload, {
            longs: Number,
            enums: String,
            bytes: String,
            defaults: true,
            arrays: true
        });
        const profile: ProfileProps = payloadObject.profile;
        return profile;
    } catch (error) {
        console.error(error);
        throw new Error(`Error decoding payload`);
    }
}


export function downloadA7PFile(arrayBuffer: ArrayBuffer, filename: string = 'profile.a7p') {
    if (typeof window === 'undefined') return;

    // Create a Blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });

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