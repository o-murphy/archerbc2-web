import { useEffect, useState } from 'react';
import { NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { TextInput, TextInputProps } from "react-native-paper";


export interface SpinBoxProps extends TextInputProps {
    floatValue?: number;
    onFloatValueChange?: (newValue: number) => void;
    fractionDigits?: number; // Number of decimal places
    range?: { min?: number; max?: number };
    step?: number; // Step increment/decrement value
    strict?: boolean;
    onError?: (error: Error | null) => void;
    debounceDelay?: number;
}

function validateRange(value: number, range?: { min?: number; max?: number }): Error | null {
    if (range?.min !== undefined && value < range.min) {
        return new Error(`Value must be at least ${range.min}`);
    }
    if (range?.max !== undefined && value > range.max) {
        return new Error(`Value must be at most ${range.max}`);
    }
    return null;
}

export const DoubleSpinBox: React.FC<SpinBoxProps> = ({
    floatValue = 0,
    onFloatValueChange = undefined,
    fractionDigits: fixedPoints = 3, // Default to 3 decimal places
    range = undefined,
    step = 1,
    strict = false,
    onError = undefined,
    ...props
}) => {
    const [currentValue, setCurrentValue] = useState<string>(floatValue.toFixed(fixedPoints));
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const error = validateRange(floatValue, range);
        onErrorSet(error)
        setCurrentValue(floatValue.toFixed(fixedPoints))
    }, [floatValue])

    const onErrorSet = (error: Error | null) => {
        setError(error)
        onError?.(error)
    }

    const valueChanged = (value: number) => onFloatValueChange?.(value)

    // Handle digit input from keyboard
    const handleInputChange = (text: string) => {
        const sanitizedText = text.replace(/(?!^-)[^0-9]/g, '');

        if (sanitizedText === '') {
            setCurrentValue('0'.padEnd(fixedPoints + 1, '0'));
            // debouncedValueChange(0);
            valueChanged(0);
            return;
        }

        const isNegative = sanitizedText.startsWith('-');
        const parsedValue = parseInt(sanitizedText, 10);
        const newValue = (parsedValue / Math.pow(10, fixedPoints)).toFixed(fixedPoints);
        const numericValue = parseFloat(newValue);

        const error = validateRange(numericValue, range);
        onErrorSet(error);

        setCurrentValue(isNegative && numericValue === 0 ? "-" + newValue : newValue);

        if (strict && error) {
            return;
        }
        // debouncedValueChange(numericValue);
        valueChanged(numericValue);
    };

    // Add input at the end of the text or handle backspace
    const processKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        const key = e.nativeEvent.key;

        if (key === '-' || key === '+') {
            handleInputChange(!currentValue.includes('-') ? '-' + currentValue : currentValue.slice(1));
        } else {
            const numValue = parseFloat(currentValue);
            if (key === 'ArrowUp') {
                handleInputChange((numValue + step).toFixed(fixedPoints));
            } else if (key === 'ArrowDown') {
                handleInputChange((numValue - step).toFixed(fixedPoints));
            }
        }
    };

    return (
        <>
            <TextInput
                {...props}
                keyboardType="numbers-and-punctuation"  // NOTE: ios only
                returnKeyType="done" // Customize return key type

                error={!!error}
                value={currentValue}
                onKeyPress={processKeyPress}
                onChange={e => handleInputChange(e.nativeEvent.text)}
            />
        </>
    );
};