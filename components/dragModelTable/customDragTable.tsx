import { ProfileProps } from "@/hooks/useFileParsing"
import { useEffect, useMemo, useRef, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Button, Card, Divider, HelperText, IconButton, Text, Tooltip, useTheme } from "react-native-paper"
import { useFileField } from "../fieldsEdit/fieldEditInput"
import { CoefRow } from "@/utils/a7p/types"
import { DoubleSpinBox, SpinBoxRange } from "../fieldsEdit/doubleSpinBox"



const MAX_CUSTOM_ITEM_COUNT = 200

export interface EditProps {
    value: number;
    onValueChange: (value: number) => void;
    range?: SpinBoxRange;
    fraction?: number;
    affixText?: string;
}

export interface CustomDragRowProps {
    index: number;
    row: {
        velocity: number,
        bc: number,
    };
    setRow: (
        velocity: number | null,
        bc: number | null
    ) => void;
}

export const CustomRowField = ({ value, onValueChange, range = {}, fraction = 2, affixText = "" }: EditProps) => {
    const [editMode, setEditMode] = useState(false)
    const [localValue, setLocalValue] = useState<number>(value)
    const [err, onErr] = useState<Error | null>(null)
    const ref = useRef<any>(null)

    useEffect(() => {
        setLocalValue(value)
    }, [value])

    useEffect(() => {
        if (ref.current && editMode) {
            ref.current.focus();
        }
    }, [editMode, setEditMode])

    const edit = () => setEditMode(true)
    const editEnd = () => {
        setEditMode(false)
        if (!err) {
            onValueChange(localValue)
        } else {
            setLocalValue(value)
        }
    }

    return editMode ? (
        <View style={styles.inputBox}>
            <DoubleSpinBox
                ref={ref}
                floatValue={localValue}
                onFloatValueChange={setLocalValue}
                range={range}
                fraction={fraction}
                onError={onErr}
                onEndEditing={editEnd}
                onSubmitEditing={editEnd}
                onBlur={editEnd}
                mode="outlined"
                style={styles.input}
            // right={<TextInput.Affix text={affixText} />}
            />
            <HelperText visible={!!err} type="error" >
                {err?.message}
            </HelperText>
        </View>
    ) : (
        <Button
            style={[styles.input, {justifyContent: "center"}]}
            onPress={edit}
            labelStyle={{padding: 0, margin: 0, justifyContent: "center", textAlign: "center"}}
        >
            {`${localValue.toFixed(fraction)} ${affixText}`}
        </Button>
    );
}


const FieldProps = {
    mv: {
        range: { min: 0, max: 10 },
        fraction: 2,
        // affixText: "mps"
    },
    cd: {
        range: { min: 0, max: 10 },
        fraction: 3,
        // affixText: ""
    }
}

const CustomDragRow = ({ index, row: { velocity = 0, bc = 0 }, setRow }: CustomDragRowProps) => {
    const theme = useTheme()

    const clearRow = () => {
        setRow(0, 0)
    }

    const handleMvChange = (value: number) => {
        setRow(value, null)
    }

    const handleBcCdChange = (value: number) => {
        setRow(null, value)
    }

    return (
        <View style={styles.row}>
            <Text style={[styles.label, { textAlign: "left" }]}>{`[${index + 1}]`}</Text>
            <Text style={styles.label}>{"Mach"}</Text>
            <CustomRowField value={velocity} onValueChange={handleMvChange} {...FieldProps.mv} />
            <Text style={styles.label}>{"Cd"}</Text>
            <CustomRowField value={bc} onValueChange={handleBcCdChange} {...FieldProps.cd} />
            <Tooltip title="Clear row" leaveTouchDelay={1}>
                <IconButton
                    size={16}
                    icon={"close"}
                    iconColor={theme.colors.error}
                    style={styles.icon}
                    onPress={clearRow}
                />
            </Tooltip>
        </View>
    )
}


const CustomDragTable = () => {

    let field = 'coefRowsCustom' as keyof ProfileProps

    const [value, setValue] = useFileField<keyof ProfileProps, CoefRow[]>({
        field,
        defaultValue: [],
    });

    const rows = useMemo(() => {
        let filledRows = value.slice(0, MAX_CUSTOM_ITEM_COUNT)

        // If there are fewer than 5 rows, fill the rest with { bcCd: 0, mv: 0 }
        while (filledRows.length < MAX_CUSTOM_ITEM_COUNT) {
            filledRows.push({ bcCd: 0, mv: 0 });
        }

        return filledRows.map((item, index) => ({
            id: `${index}`,
            bcCd: item.bcCd / 10000,
            mv: item.mv / 10000
        }));

    }, [value, setValue]);

    const handleChange = (index: number, mv: number | null = null, bcCd: number | null = null) => {

        const newValue = [...value];  // Create a shallow copy of the value array
        while (newValue.length < MAX_CUSTOM_ITEM_COUNT) {
            newValue.push({ bcCd: 0, mv: 0 });
        }

        newValue[index] = {
            ...newValue[index],  // Copy the existing row
            mv: mv !== null && mv >= 0 ? Math.round(mv * 10000) : newValue[index].mv,  // Ensure mv is not 0
            bcCd: bcCd != null && bcCd >= 0 ? Math.round(bcCd * 10000) : newValue[index].bcCd
        };

        setValue(newValue)
    }

    const onSortPress = () => {
        setValue(
            value.filter(row => !(row.bcCd === 0 && row.mv === 0)).sort((a, b) => b.mv - a.mv)
        )
    }

    const renderItem = (item: any) => {
        const index = item.index

        return (
            <CustomDragRow
                key={index}
                index={index}
                row={{
                    velocity: item.item.mv,
                    bc: item.item.bcCd
                }}
                setRow={
                    (mv = null, bc = null) => handleChange(index, mv, bc)
                }
            />
        )
    }
    return (
        <Card elevation={3} style={styles.surface}>
            <View style={styles.row}>
                <Text variant="titleMedium" style={styles.sectionTitle} >{"Coefficients"}</Text>
                <Divider style={styles.divider} />
                <Button icon="sort-variant" mode="outlined" compact style={styles.sortBtn} onPress={onSortPress}>Sort</Button>
            </View>
            <FlatList
                data={rows}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                initialNumToRender={10}
                scrollEnabled={true}
                style={{ flex: 1 }}
                contentContainerStyle={{ maxHeight: 300 }}
            />
        </Card>
    )
}


const styles = StyleSheet.create({
    surface: {
        flex: 1,
        padding: 16,
        gap: 8
    },
    row: {
        flexDirection: "row",
        gap: 8,
    },
    label: {
        flex: 1,
        height: 24,
        textAlign: "right",
        alignSelf: "center",
    },
    input: {
        flex: 3,
        height: 24,
    },
    inputBox: {
        flex: 3
    },
    icon: {
        height: 24,
    },
    sortBtn: {
        flex: 1,
        alignSelf: "flex-end"
    },
    divider: {
        flex: 3,
        alignSelf: "center"
    },
    sectionTitle: {
        flex: 1,
        marginBottom: 4,
        alignSelf: "center"
    },
})

export default CustomDragTable