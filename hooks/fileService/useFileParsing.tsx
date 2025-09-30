import { useEffect } from "react";
import { encode } from "a7p-js";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { FileHandleState } from "@/hooks/fileService/useFileHandler";
import { savefileBackup } from "../useFileStorege";
import { fromByteArray } from "base64-js";
import { Platform } from "react-native";
import { decode } from "a7p-js";
import { toByteArray } from "base64-js";
import { BcType, CoefRow, Profile } from "a7p-js/types";
import {
    shareBuffer,
    ShareError,
    ShareNotAllowedError,
    ShareNotSupportedError,
} from "@/utils/shareAPI";

export type DistanceTemplateType = Record<string, number[]>;
export const distancesTemplates: DistanceTemplateType = {
    "25-400": [
        25, 50, 75, 100, 110, 120, 130, 140, 150, 155, 160, 165, 170, 175, 180,
        185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250,
        255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320,
        325, 330, 335, 340, 345, 350, 355, 360, 365, 370, 375, 380, 385, 390,
        395, 400,
    ],
    // "Low (100-700m)": [
    "100-700": [
        100, 150, 200, 225, 250, 275, 300, 320, 340, 360, 380, 400, 410, 420,
        430, 440, 450, 460, 470, 480, 490, 500, 505, 510, 515, 520, 525, 530,
        535, 540, 545, 550, 555, 560, 565, 570, 575, 580, 585, 590, 595, 600,
        605, 610, 615, 620, 625, 630, 635, 640, 645, 650, 655, 660, 665, 670,
        675, 680, 685, 690, 695, 700,
    ],
    // "Middle (100-1000m)": [
    "100-1000": [
        100, 200, 250, 300, 325, 350, 375, 400, 420, 440, 460, 480, 500, 520,
        540, 560, 580, 600, 610, 620, 630, 640, 650, 660, 670, 680, 690, 700,
        710, 720, 730, 740, 750, 760, 770, 780, 790, 800, 805, 810, 815, 820,
        825, 830, 835, 840, 845, 850, 855, 860, 865, 870, 875, 880, 885, 890,
        895, 900, 905, 910, 915, 920, 925, 930, 935, 940, 945, 950, 955, 960,
        965, 970, 975, 980, 985, 990, 995, 1000,
    ],
    // "Long (100-1700m)": [
    "100-1700": [
        100, 200, 250, 300, 350, 400, 420, 440, 460, 480, 500, 520, 540, 560,
        580, 600, 610, 620, 630, 640, 650, 660, 670, 680, 690, 700, 710, 720,
        730, 740, 750, 760, 770, 780, 790, 800, 810, 820, 830, 840, 850, 860,
        870, 880, 890, 900, 910, 920, 930, 940, 950, 960, 970, 980, 990, 1000,
        1005, 1010, 1015, 1020, 1025, 1030, 1035, 1040, 1045, 1050, 1055, 1060,
        1065, 1070, 1075, 1080, 1085, 1090, 1095, 1100, 1105, 1110, 1115, 1120,
        1125, 1130, 1135, 1140, 1145, 1150, 1155, 1160, 1165, 1170, 1175, 1180,
        1185, 1190, 1195, 1200, 1205, 1210, 1215, 1220, 1225, 1230, 1235, 1240,
        1245, 1250, 1255, 1260, 1265, 1270, 1275, 1280, 1285, 1290, 1295, 1300,
        1305, 1310, 1315, 1320, 1325, 1330, 1335, 1340, 1345, 1350, 1355, 1360,
        1365, 1370, 1375, 1380, 1385, 1390, 1395, 1400, 1405, 1410, 1415, 1420,
        1425, 1430, 1435, 1440, 1445, 1450, 1455, 1460, 1465, 1470, 1475, 1480,
        1485, 1490, 1495, 1500, 1505, 1510, 1515, 1520, 1525, 1530, 1535, 1540,
        1545, 1550, 1555, 1560, 1565, 1570, 1575, 1580, 1585, 1590, 1595, 1600,
        1605, 1610, 1615, 1620, 1625, 1630, 1635, 1640, 1645, 1650, 1655, 1660,
        1665, 1670, 1675, 1680, 1685, 1690, 1695, 1700,
    ],
    // "Ultra long (100-2000m)": [
    "100-2000": [
        100, 200, 250, 300, 350, 400, 450, 500, 520, 540, 560, 580, 600, 620,
        640, 660, 680, 700, 720, 740, 760, 780, 800, 820, 840, 860, 880, 900,
        920, 940, 960, 980, 1000, 1010, 1020, 1030, 1040, 1050, 1060, 1070,
        1080, 1090, 1100, 1110, 1120, 1130, 1140, 1150, 1160, 1170, 1180, 1190,
        1200, 1210, 1220, 1230, 1240, 1250, 1260, 1270, 1280, 1290, 1300, 1310,
        1320, 1330, 1340, 1350, 1360, 1370, 1380, 1390, 1400, 1410, 1420, 1430,
        1440, 1450, 1460, 1470, 1480, 1490, 1500, 1505, 1510, 1515, 1520, 1525,
        1530, 1535, 1540, 1545, 1550, 1555, 1560, 1565, 1570, 1575, 1580, 1585,
        1590, 1595, 1600, 1605, 1610, 1615, 1620, 1625, 1630, 1635, 1640, 1645,
        1650, 1655, 1660, 1665, 1670, 1675, 1680, 1685, 1690, 1695, 1700, 1705,
        1710, 1715, 1720, 1725, 1730, 1735, 1740, 1745, 1750, 1755, 1760, 1765,
        1770, 1775, 1780, 1785, 1790, 1795, 1800, 1805, 1810, 1815, 1820, 1825,
        1830, 1835, 1840, 1845, 1850, 1855, 1860, 1865, 1870, 1875, 1880, 1885,
        1890, 1895, 1900, 1905, 1910, 1915, 1920, 1925, 1930, 1935, 1940, 1945,
        1950, 1955, 1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005,
        2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060, 2065,
    ],
};

export interface ProfileProps extends Profile {
    coefRowsG1: CoefRow[];
    coefRowsG7: CoefRow[];
    coefRowsCustom: CoefRow[];
}

export interface ParsedData {
    profile: ProfileProps | null;
    error: Error | null;
}

export const prepareProfileProps = (profile: Profile): ProfileProps => {
    return {
        ...profile,
        coefRowsG1: profile.bcType == BcType.G1 ? profile.coefRows : [],
        coefRowsG7: profile.bcType == BcType.G7 ? profile.coefRows : [],
        coefRowsCustom: profile.bcType == BcType.CUSTOM ? profile.coefRows : [],
    };
};

export const prepareProfile = (profileProps: ProfileProps): Profile => {
    const { coefRowsG1, coefRowsG7, coefRowsCustom, ...rest } = profileProps;

    let coefRows: CoefRow[] = [];

    switch (profileProps.bcType) {
        case BcType.G1:
            coefRows = coefRowsG1;
            break;
        case BcType.G7:
            coefRows = coefRowsG7;
            break;
        case BcType.CUSTOM:
            coefRows = coefRowsCustom;
            break;
    }

    // Filter and sort
    coefRows = coefRows
        .filter((row) => !(row.bcCd === 0 && row.mv === 0))
        .sort((a, b) => b.mv - a.mv);

    const profile: Profile = {
        ...rest,
        coefRows,
    };
    return profile;
};

export const parsePayload = (
    data: string | ArrayBuffer,
    setParsedData: (data: any) => void,
    setBackupData: (data: any) => void,
    setFileState: (state: any) => void,
    isFile: boolean = false,
) => {
    try {
        let payload: any;
        let buffer: ArrayBuffer | undefined;

        if (isFile) {
            if (data instanceof ArrayBuffer) {
                buffer = data; // We have the ArrayBuffer directly
                payload = decode(data); // Handle ArrayBuffer decoding
            } else {
                throw new Error("Expected data to be an ArrayBuffer");
            }
        } else {
            if (typeof data === "string") {
                const base64 = decodeURIComponent(data);
                buffer = toByteArray(base64).slice(0).buffer; // Ensure we get an ArrayBuffer here
                payload = decode(buffer);
            } else {
                throw new Error("Expected data to be a string");
            }
        }

        const profileProps = prepareProfileProps(payload.profile);

        setParsedData({ profile: profileProps, error: null });
        setBackupData({ profile: profileProps, error: null });
        setFileState({ name: null, data: buffer, error: null }); // Use `buffer` here, it's always an ArrayBuffer
    } catch (error) {
        setParsedData({ profile: null, error: error });
        setFileState({ name: null, data: null, error: error });
    }
};

// Utility function to generate the filename based on profile data
export const generateFilename = (profile: Profile): string => {
    return `${profile.profileName}_${profile.cartridgeName}.a7p`;
};

export const useParseUrl = (data: string | null) => {
    const {
        setCurrentData: setParsedData,
        setBackupData,
        setFileState,
    } = useFileContext();

    useEffect(() => {
        if (data) {
            parsePayload(data, setParsedData, setBackupData, setFileState);
        }
    }, [data, setFileState, setParsedData, setBackupData]);
};

export const useParseFile = (fileHandleState: FileHandleState) => {
    const {
        setCurrentData: setParsedData,
        setBackupData,
        setFileState,
    } = useFileContext();

    useEffect(() => {
        if (
            fileHandleState.data &&
            !fileHandleState.error &&
            fileHandleState.data instanceof ArrayBuffer
        ) {
            parsePayload(
                fileHandleState.data,
                setParsedData,
                setBackupData,
                setFileState,
                true,
            );
        } else if (fileHandleState.error) {
            setParsedData({ profile: null, error: fileHandleState.error });
        }
        setFileState(fileHandleState);
    }, [fileHandleState, setFileState, setParsedData, setBackupData]);
};

/// Common encode function for payload
const encodeProfileToPayload = (profile: any): string => {
    try {
        const buffer = encode({
            profile: prepareProfile(profile),
        });
        return encodeURIComponent(fromByteArray(new Uint8Array(buffer)));
    } catch (error) {
        throw new Error(`Error on file encode: ${error}`);
    }
};

// Function to encode payload param
export const encodePayloadParam = (data: ParsedData): string | undefined => {
    if (data.profile && !data.error) {
        return encodeProfileToPayload(data.profile);
    }
    return undefined;
};

// Function to encode URL with payload param (only works on web)
export const encodeToUrl = (data: ParsedData): string | undefined => {
    if (Platform.OS !== "web") return;

    if (data.profile && !data.error) {
        const payload = encodeProfileToPayload(data.profile);
        const url = `${window.location.origin}${window.location.pathname}?payload=${payload}`;
        return url;
    }
    return undefined;
};

// Function to save parsed data
export const saveParsedData = async (
    data: ParsedData,
    filename: string | null,
) => {
    // Only proceed if we have a valid profile and no error
    if (data.profile && !data.error) {
        try {
            // Encode the profile data into a buffer for file sharing/downloading
            const buffer = encode({
                profile: prepareProfile(data.profile),
            });

            // If no filename is provided or it matches the placeholder name, generate one
            if (!filename || filename === "Upload file") {
                filename = generateFilename(data.profile);
            }

            // Try to share the file using the Web Share API
            try {
                await shareBuffer({
                    file: {
                        name: filename, // Name of the file
                        type: ".a7p", // Custom file extension/type
                        buffer: buffer, // The encoded binary data
                    },
                });
            } catch (error: unknown) {
                if (error instanceof ShareError) {
                    if (error instanceof ShareNotAllowedError) {
                        downloadA7PFile(buffer, filename);
                    } else if (error instanceof ShareNotSupportedError) {
                        downloadA7PFile(buffer, filename);
                    } else {
                        throw error;
                    }
                } else {
                    throw error;
                }
            } finally {
                // Regardless of sharing or downloading, create a backup of the buffer
                savefileBackup(buffer);
            }
        } catch (error: unknown) {
            throw new Error(
                `Error on file download: ${error instanceof Error ? error.message : String(error)}`,
            );
        }
    }
};

// Function to trigger file download
export function downloadA7PFile(
    buffer: ArrayBuffer,
    filename: string = "profile.a7p",
) {
    if (typeof window === "undefined") return;

    // Create a Blob from the ArrayBuffer
    const blob = new Blob([buffer], { type: "application/octet-stream" });

    // Create a temporary link element
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
