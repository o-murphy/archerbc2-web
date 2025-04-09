import { useFileContext } from "@/hooks/fileContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { DoubleSpinBox } from "./doubleSpinBox";

// Extending TextInputProps with field and maxLength
interface FileEditInputProps extends TextInputProps {
    field: string;
    maxLength?: number;
}

export function useFileField<T>({
    field,
    defaultValue,
    parse = (v: any) => v,
    format = (v: T) => v,
    validate,
}: {
    field: string;
    defaultValue: T;
    parse?: (v: any) => T;
    format?: (v: T) => any;
    validate?: (v: T) => boolean;
}) {
    const { parsedData, setParsedData, dummyState } = useFileContext();
    const isLocalChange = useRef(false);

    const [value, setValue] = useState<T>(
        parsedData.profile?.[field] !== undefined
            ? parse(parsedData.profile?.[field])
            : defaultValue
    );

    useEffect(() => {
        if (parsedData.profile) {
            const newVal = parse(parsedData.profile?.[field]);
            setValue(newVal ?? defaultValue);
        }
    }, [parsedData.profile, field, dummyState]);

    useEffect(() => {
        if (!parsedData.profile || !isLocalChange.current) return;
        if (validate && validate(value)) return;

        setParsedData({
            ...parsedData,
            profile: {
                ...parsedData.profile,
                [field]: format(value),
            },
        });

        isLocalChange.current = false;
    }, [value, parsedData, field, setParsedData]);

    const handleChange = (val: T) => {
        isLocalChange.current = true;
        setValue(val);
    };

    return [value, handleChange] as const;
}

const FileEditInput = ({ field, maxLength, ...props }: FileEditInputProps) => {
    const [value, setValue] = useFileField<string>({
        field,
        defaultValue: "",
    });

    return (
        <TextInput
            mode="outlined"
            dense
            maxLength={maxLength}
            value={value}
            onChangeText={setValue}
            {...props}
        />
    );
};

interface FileEditInputFloatProps extends FileEditInputProps {
    range?: { min?: number; max?: number };
    multiplier?: number;
    fraction?: number;
}

const FileEditInputFloat = ({
    field,
    maxLength,
    range,
    multiplier = 1,
    fraction = 2,
    ...props
}: FileEditInputFloatProps) => {
    const [err, setErr] = useState<Error | null>(null);

    const [value, setValue] = useFileField<string>({
        field,
        defaultValue: "",
        parse: (v) => (v / multiplier).toString(),
        format: (v) => parseFloat(v) * multiplier,
        validate: useCallback(() => {
            return !!err
        }, [err])
    });

    const handleSetValue = (value: number) => {
        setValue(value.toString())
    }
    console.log(field, 'vu', value)
    return (
        <View style={props?.style}>
            <DoubleSpinBox 
                
                floatValue={parseFloat(value)}
                onFloatValueChange={handleSetValue}
                fractionDigits={fraction}
                onError={setErr}
                range={range}

                mode="outlined"
                keyboardType="decimal-pad"
                maxLength={maxLength}
                dense
            />
            <HelperText type="error" visible={!!err}>
                {err?.message}
            </HelperText>
        </View>
    );
};



export { FileEditInput, FileEditInputFloat };
