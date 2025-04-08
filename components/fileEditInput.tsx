import { useFileContext } from "@/hooks/fileContext";
import { useEffect, useRef, useState, useCallback } from "react";
import { View } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

// Extending TextInputProps with field and maxLength
interface FileEditInputProps extends TextInputProps {
    field: string;
    maxLength?: number;
}

const FileEditInput = ({ field, maxLength = undefined, ...props }: FileEditInputProps) => {
    const { parsedData, setParsedData, dummyState } = useFileContext();
    const isLocalChange = useRef(false);

    const [value, setValue] = useState<any>(parsedData.profile?.[field] || "");

    // Update local state when parsedData.profile changes (e.g., when a new file is loaded)
    useEffect(() => {
        // if (parsedData.profile && parsedData.profile[field] !== value) {
        if (parsedData.profile) {
            setValue(parsedData.profile[field] || "");
        }
    }, [parsedData.profile, field]);

    // Update parsedData when local state changes
    useEffect(() => {
        if (!parsedData.profile || !isLocalChange.current) return;

        setParsedData({
            ...parsedData,
            profile: {
                ...parsedData.profile,
                [field]: value,
            },
        });

        isLocalChange.current = false;
    }, [value, parsedData, field, setParsedData]);

    // Memoized change handler
    const handleChange = useCallback((val: string) => {
        isLocalChange.current = true;
        setValue(val);
    }, []);

    return (
        <TextInput
            mode="outlined"
            dense
            maxLength={maxLength}
            value={value}
            onChangeText={handleChange}
            {...props}
        />
    );
};

interface FileEditInputIntProps extends FileEditInputProps {
    range?: { min?: number; max?: number };
    multiplier?: number
}

const FileEditInputInt = ({
    field,
    maxLength,
    range,
    multiplier = 1,
    ...props
}: FileEditInputIntProps) => {
    const { parsedData, setParsedData, dummyState } = useFileContext();
    const isLocalChange = useRef(false);

    const [value, setValue] = useState<string>(
        Math.round(parsedData.profile?.[field] / multiplier).toFixed(0) || ""
    );
    const [err, setErr] = useState<Error | null>(null);

    // Update local state when parsedData.profile changes (e.g., when a new file is loaded)
    useEffect(() => {
        // if (parsedData.profile && parsedData.profile[field] !== value) {
        if (parsedData.profile) {
            setValue(Math.round(parsedData.profile?.[field] / multiplier).toFixed(0) || "");
        }
    }, [parsedData.profile, field, dummyState]);

    useEffect(() => {

        // Only update parsedData if the value is valid and profile exists
        if (!parsedData.profile || !isLocalChange.current) return;
        if (!validateRange(value)) return;
        console.log("dump")

        // Update parsedData when value is valid
        setParsedData({
            ...parsedData,
            profile: {
                ...parsedData.profile,
                [field]: Math.round(parseInt(value) * multiplier),
            },
        });

        // Reset flag after update
        isLocalChange.current = false;
    }, [value, parsedData, field, setParsedData]);

    // Memoized change handler
    const handleChange = useCallback((val: string) => {
        isLocalChange.current = true;
        setValue(val);
    }, []);

    const validateRange = (val: string) => {
        const constr = isOutOfRange(val);
        setErr(constr ? new Error(constr) : null);
        return constr === null; // Return true if valid, false if invalid
    };

    const isOutOfRange = (val: string) => {
        const intVal = parseInt(val);
        if (range?.max && intVal > range.max) {
            return `Value must be less than or equal to ${range.max}`;
        }
        if (range?.min && intVal < range.min) {
            return `Value must be greater than or equal to ${range.min}`;
        }
        return null;
    };

    return (
        <View style={props?.style}>
            <TextInput
                {...props}
                error={!!err}
                mode="outlined"
                dense
                maxLength={maxLength}
                value={value}
                onChangeText={handleChange}
            />
            <HelperText type="error" visible={!!err}>
                {err?.message}
            </HelperText>
        </View>
    );
};


export { FileEditInput, FileEditInputInt };
