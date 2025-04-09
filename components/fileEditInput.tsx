import { useFileContext } from "@/hooks/fileContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { DoubleSpinBox } from "./doubleSpinBox";
import { ProfileProps } from "@/utils/a7p";


export function useFileField<K extends keyof ProfileProps, T = ProfileProps[K]>({
    field,
    defaultValue,
    parse = (v: any) => v,
    format = (v: T) => v,
    validate,
}: {
    field: K;
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


// Extend TextInputProps and constrain 'field' to keys of ProfileProps
interface FileEditInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
    field: keyof ProfileProps;
    maxLength?: number;
}

const FileEditInput = ({ field, maxLength, ...props }: FileEditInputProps) => {
    const [value, setValue] = useFileField<typeof field, string>({
        field,
        defaultValue: "",
    });

    return (
        <TextInput
            mode="outlined"
            dense
            value={value}
            onChangeText={setValue}
            maxLength={maxLength}
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

    const [value, setValue] = useFileField<typeof field, string>({
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

    return (
        <>
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
        </>
    );
};



export { FileEditInput, FileEditInputFloat };
