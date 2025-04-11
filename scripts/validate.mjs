import * as yup from 'yup';
import { readFile } from 'fs/promises';
import protobuf from 'protobufjs';
import CryptoJS from 'crypto-js';

const root = await protobuf.load("public/proto/profedit.proto");
const MD5_LENGTH = 32;

// Utility function to convert array buffer to base64
export function bufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};

// MD5 hash function using Node.js crypto module
export function md5(data) {
    // Convert binary string to WordArray for CryptoJS
    const wordArray = CryptoJS.enc.Latin1.parse(data);
    // Calculate MD5 hash and return as hexadecimal string
    const hash = CryptoJS.MD5(wordArray);
    return hash.toString(CryptoJS.enc.Hex);
};

export function parseA7P(arrayBuffer) {
    const base64 = bufferToBase64(arrayBuffer);
    const binaryData = atob(base64);
    const md5Checksum = binaryData.slice(0, MD5_LENGTH);
    const actualData = binaryData.slice(MD5_LENGTH);

    const calculatedChecksum = md5(actualData);

    if (md5Checksum !== calculatedChecksum) {
        console.error("Invalid A7P file checksum", md5Checksum, calculatedChecksum);
        throw new Error("Invalid A7P file checksum");
    }

    const Payload = root.lookupType("Payload");

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
        const profile = payloadObject.profile;
        return profile;
    } catch (error) {
        console.error(error);
        throw new Error(`Error decoding payload`);
    }
}

// Define the validation schema for each field
const schema = yup.object().shape({
    profile: yup.object().shape({
        // descriptor
        profileName: yup.string().max(50).required('Profile name is required'),
        cartridgeName: yup.string().max(50).required('Cartridge name is required'),
        bulletName: yup.string().max(50).required('Bullet name is required'),
        shortNameTop: yup.string().max(8).required('Short name top is required'),
        shortNameBot: yup.string().max(8).required('Short name bottom is required'),
        caliber: yup.string().max(50).required('Caliber is required'),
        deviceUuid: yup.string().max(50).notRequired(),
        userNote: yup.string().max(1024).notRequired(),

        // zeroing
        zeroX: yup.number().min(-200000).max(200000).integer().required('Zero X is required'),
        zeroY: yup.number().min(-200000).max(200000).integer().required('Zero Y is required'),

        // lists
        distances: yup.array().of(yup.number().min(100).max(300000).integer().required()).min(1).max(200),
        switches: yup.array().of(
            yup.object().shape({
                // cIdx: yup.number().min(0).max(201).integer().required(),
                cIdx: yup.number().min(0).max(255).integer().required(),
                distanceFrom: yup.mixed().oneOf(['INDEX', 'VALUE']).required(),
                distance: yup.number().min(100).max(300000).integer().required(),
                reticleIdx: yup.number().min(0).max(255).integer().required(),
                zoom: yup.number().min(0).max(255).integer().required(),
            })
        ).min(4),

        // rifle
        scHeight: yup.number().min(-5000).max(5000).integer().required(),
        rTwist: yup.number().min(0).max(10000).integer().required(),
        twistDir: yup.mixed().oneOf(['RIGHT', 'LEFT']).required(),
        
        // cartridge
        cMuzzleVelocity: yup.number().min(100).max(30000).integer().required(),
        cZeroTemperature: yup.number().min(-100).max(100).integer().required(),
        cTCoeff: yup.number().min(0).max(5000).integer().required(),
        
        // zero params
        cZeroDistanceIdx: yup.number().min(0).max(255).integer().required(),
        cZeroAirTemperature: yup.number().min(-100).max(100).integer().required(),
        cZeroAirPressure: yup.number().min(3000).max(15000).integer().required(),
        cZeroAirHumidity: yup.number().min(0).max(100).integer().required(),
        cZeroWPitch: yup.number().min(-90).max(90).integer().required(),
        cZeroPTemperature: yup.number().min(-100).max(100).integer().required(),
        
        // bullet
        bDiameter: yup.number().min(1).max(50000).integer().required(),
        bWeight: yup.number().min(10).max(65535).integer().required(),
        bLength: yup.number().min(1).max(50000).integer().required(),
        
        // drag model
        bcType: yup.mixed().oneOf(['G1', 'G7', 'CUSTOM']).required(),
        coefRows: yup.array().of(
            yup.object().shape({
                bccd: yup.number().when('bcType', {
                    is: 'G1',
                    then: yup.number().min(0).max(100000).integer().required('bccd must be between 0 and 10 for G1'),
                    is: 'G7',
                    then: yup.number().min(0).max(100000).integer().required('bccd must be between 0 and 5 for G7'),
                    is: 'CUSTOM',
                    then: yup.number().min(0).max(100000).integer().required('bccd must be between 0 and 15 for CUSTOM'),
                }),
                v: yup.number().when('bcType', {
                    is: 'G7',
                    then: yup.number().min(0).max(30000).integer().required('v must be between 0 and 20 for G7'),
                    is: 'G1',
                    then: yup.number().min(0).max(30000).integer().required('v must be between 0 and 10 for G1'),
                    is: 'CUSTOM',
                    then: yup.number().min(0).max(100).integer().required('v must be between 0 and 25 for CUSTOM'),
                }),
            })
        ).when('bcType', {
            is: 'G1',
            then: yup.array().min(1).max(5).required('For G1, coefRows must contain between 2 and 5 items'),
            is: 'G7',
            then: yup.array().min(1).max(5).required('For G7, coefRows must contain between 3 and 6 items'),
            is: 'CUSTOM',
            then: yup.array().min(1).max(200).required('For CUSTOM, coefRows must contain between 1 and 10 items'),
        }),
    }),
});

// // Sample data to validate
// const data = {
//     profile: {
//         profileName: "Savage 110A",
//         cartridgeName: "UKROP 338LM 250GRN",
//         bulletName: "SMK 250GRN HPBT",
//         shortNameTop: "338LM",
//         shortNameBot: "250GRN",
//         caliber: "338LM",
//         deviceUuid: "",
//         userNote: "Add your profile specific notes here",
//         zeroX: 0.0,
//         zeroY: 0.0,
//         distances: [100.0, 200.0, 300.0],
//         switches: [
//             { cIdx: 0, distanceFrom: "value", distance: 10000, reticleIdx: 0, zoom: 1 },
//             { cIdx: 1, distanceFrom: "value", distance: 20000, reticleIdx: 0, zoom: 2 },
//             { cIdx: 2, distanceFrom: "value", distance: 30000, reticleIdx: 0, zoom: 3 },
//             { cIdx: 3, distanceFrom: "value", distance: 100000, reticleIdx: 0, zoom: 4 },
//         ],
//         scHeight: 90.0,
//         rTwist: 945,
//         twistDir: "RIGHT",
//         cMuzzleVelocity: 890.0,
//         cZeroTemperature: 25.0,
//         cTCoeff: 1030,
//         cZeroDistanceIdx: 0,
//         cZeroAirTemperature: 15.0,
//         cZeroAirPressure: 10000,
//         cZeroAirHumidity: 40.0,
//         cZeroWPitch: 0.0,
//         cZeroPTemperature: 15.0,
//         bDiameter: 3380,
//         bWeight: 250.0,
//         bLength: 1550,
//         coeffRows: [
//             { bc: 3430, mv: 8500 },
//             { bc: 3350, mv: 6000 },
//             { bc: 3250, mv: 4000 },
//         ],
//         bcType: "G1",
//     },
// };




async function readFileAsBytes(path) {
    try {
        const buffer = await readFile(path); // returns a Buffer
        const byteArray = new Uint8Array(buffer); // convert to Uint8Array if needed
        return byteArray;
    } catch (err) {
        console.error('Failed to read file:', err);
        return null;
    }
}

// Example usage:
const bytes = await readFileAsBytes('./scripts/example.a7p').catch(err => console.log(err));
console.log(bytes); // Uint8Array


const data = {profile: parseA7P(bytes)}

console.log(data)
console.log(data.profile.switches)


// Validate the data
schema.validate(data, { abortEarly: false })
    .then(validData => {
        console.log('Validation succeeded:', validData);
    })
    .catch(error => {
        console.log('Validation failed:', error.errors);
    });