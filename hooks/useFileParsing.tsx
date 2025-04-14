
import { useEffect } from "react";
import { encode, decode } from "@/utils/a7p/a7p";
import { useFileContext } from "@/hooks/fileContext";
import { FileHandleState } from "@/hooks/useFileHandler"; // Assuming this type is imported correctly
import { BcType, CoefRow, Profile } from "@/utils/a7p/types"

export interface ProfileProps extends Profile {
    coefRowsG1: CoefRow[],
    coefRowsG7: CoefRow[],
    coefRowsCustom: CoefRow[],
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
    }
}

export const prepareProfile = (profileProps: ProfileProps): Profile => {
    const {
        coefRowsG1,
        coefRowsG7,
        coefRowsCustom,
        ...rest
    } = profileProps

    let coefRows: CoefRow[] = []

    switch (profileProps.bcType) {
        case BcType.G1:
            coefRows = coefRowsG1
            break
        case BcType.G7:
            coefRows = coefRowsG7
            break
        case BcType.CUSTOM:
            coefRows = coefRowsCustom
            break
    }

    // Filter and sort
    coefRows = coefRows
        .filter(row => !(row.bcCd === 0 && row.mv === 0))
        .sort((a, b) => b.mv - a.mv)

    const profile: Profile = {
        ...rest,
        coefRows,
    }
    console.log("save", profile)
    return profile
}


// The custom hook to handle file parsing
export const useParseFile = (fileHandleState: FileHandleState) => {
    const { setParsedData, setBackupData, setFileState } = useFileContext();

    useEffect(() => {
        if (fileHandleState.data && !fileHandleState.error && fileHandleState.data instanceof ArrayBuffer) {

            try {
                const payload = encode(fileHandleState.data)
                console.log(payload)
                const profileProps = prepareProfileProps(payload.profile)
                setParsedData({ profile: profileProps, error: null });
                setBackupData({ profile: profileProps, error: null });
            } catch (error: any) {
                setParsedData({ profile: null, error: new Error(`Error parsing A7P file: ${error}`) });
            };
        } else if (fileHandleState.error) {
            setParsedData({ profile: null, error: fileHandleState.error });
        }
        setFileState(fileHandleState)
    }, [fileHandleState, setFileState, setParsedData, setBackupData]); // Re-run the effect when fileHandleState changes
};

export const saveParsedData = (data: ParsedData, filename: string | null) => {
    if (data.profile && !data.error) {
        try {
            const buffer = decode({
                profile: prepareProfile(data.profile)
            })

            if (!filename || filename === "Upload file") {
                filename = `${data.profile.profileName}_${data.profile.cartridgeName}.a7p`
            }
            downloadA7PFile(buffer, filename)
        } catch (error) {
            throw new Error(`Error on file download, ${error}`)
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
