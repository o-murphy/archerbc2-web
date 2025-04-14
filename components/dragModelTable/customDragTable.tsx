import { ProfileProps } from "@/hooks/useFileParsing"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Button, Divider, IconButton, Surface, Text, TextInput, Tooltip, useTheme } from "react-native-paper"
import { useFileField } from "../fieldsEdit/fieldEditInput"
import { CoefRow } from "@/utils/a7p/types"
import { DoubleSpinBox, SpinBoxProps } from "../fieldsEdit/doubleSpinBox"



const MAX_ITEM_COUNT = 200

interface EditProps {
    value: number;
    setRow: (
        velocity: number | null,
        bc: number | null
    ) => void;
    onErr: (err: Error | null) => void;
}

const MvEdit = ({ value, setRow, onErr }: EditProps) => {
    const [editMode, setEditMode] = useState(false)
    const [localValue, setLocalValue] = useState<number>(value)
    const ref = useRef<SpinBoxProps>(null)

    useEffect(() => {
        if (ref.current && editMode) {
            console.log("focus")
            ref.current.focus();
        }
    }, [editMode, setEditMode])

    const edit = () => setEditMode(true)
    const editEnd = () => {
        setEditMode(false)
        setRow(localValue, null)
    }

    return editMode ? (
        <DoubleSpinBox
            ref={ref}
            floatValue={localValue}
            onFloatValueChange={setLocalValue}
            range={{ min: 0, max: 10 }}
            fraction={2}
            onError={onErr}
            onEndEditing={editEnd}
            onSubmitEditing={editEnd}
            onBlur={editEnd}
            mode="outlined"
            style={styles.input}
        />
    ) : (
        <Button icon="pencil" style={styles.input} onPress={edit}>{value.toFixed(2)}</Button>
    );
}


const CoefEdit = ({ value, setRow, onErr }: EditProps) => {
    const [editMode, setEditMode] = useState(false)
    const [localValue, setLocalValue] = useState<number>(value)
    const ref = useRef<SpinBoxProps>(null)

    const edit = () => setEditMode(true)
    const editEnd = () => {
        setEditMode(false)
        setRow(null, localValue)
    }

    useEffect(() => {
        if (ref.current && editMode) {
            console.log("focus")
            ref.current.focus();
        }
    }, [editMode, setEditMode])

    return editMode ? (
        <DoubleSpinBox
            ref={ref}
            floatValue={localValue}
            onFloatValueChange={setLocalValue}
            range={{ min: 0, max: 10 }}
            fraction={3}
            onError={onErr}
            onEndEditing={editEnd}
            onSubmitEditing={editEnd}
            onBlur={editEnd}

            mode="outlined"
            style={styles.input}
        />) : (
        <Button icon="pencil" style={styles.input} onPress={edit}>{value.toFixed(3)}</Button>
    );
}

const CustomDragRow = ({ index, row: { velocity = 0, bc = 0 }, setRow, onError }: {
    index: number,
    row: {
        velocity: number,
        bc: number,
    },
    setRow: (
        velocity: number | null,
        bc: number | null
    ) => void,
    onError: (value: null | Error) => void,
}) => {
    const theme = useTheme()

    const [mvErr, setMvErr] = useState<null | Error>(null)
    const [bcCdErr, setBcCdErr] = useState<null | Error>(null)

    useEffect(() => {
        onError(mvErr || bcCdErr)
    }, [mvErr, bcCdErr])

    const clearRow = () => {
        setRow(0, 0)
    }

    return (
        <View style={styles.row}>
            <Text style={[styles.label, { textAlign: "left" }]}>{`[${index + 1}]`}</Text>
            <Text style={styles.label}>{"Mach"}</Text>
            <MvEdit value={velocity} setRow={setRow} onErr={setMvErr} />
            <Text style={styles.label}>{"Cd"}</Text>
            <CoefEdit value={bc} setRow={setRow} onErr={bcCdErr} />
            <Tooltip title="Clear row">
                <IconButton size={16} icon={"close"} iconColor={theme.colors.error} style={styles.icon} onPress={clearRow} />
            </Tooltip>
        </View>
    )
}


const CustomDragTable = () => {

    let field = 'coefRowsCustom' as keyof ProfileProps

    const [err, setErr] = useState<Error | null>(null);
    const [value, setValue] = useFileField<keyof ProfileProps, CoefRow[]>({
        field,
        defaultValue: [],
        validate: useCallback(() => {
            return !!err
        }, [err])
    });


    const rows = useMemo(() => {
        let filledRows = value.slice(0, MAX_ITEM_COUNT)

        // If there are fewer than 5 rows, fill the rest with { bcCd: 0, mv: 0 }
        while (filledRows.length < MAX_ITEM_COUNT) {
            filledRows.push({ bcCd: 0, mv: 0 });
        }

        filledRows = filledRows.map((item, index) => ({
            id: index,
            bcCd: item.bcCd / 10000,
            mv: item.mv / 10000
        }));

        return filledRows;
    }, [value, setValue]);

    const handleChange = (index: number, mv: number | null = null, bcCd: number | null = null) => {

        if (!err) {
            const newValue = [...value];  // Create a shallow copy of the value array
            while (newValue.length < MAX_ITEM_COUNT) {
                newValue.push({ bcCd: 0, mv: 0 });
            }
            newValue[index] = {
                ...newValue[index],  // Copy the existing row
                mv: mv !== null && mv >= 0 ? mv * 10000 : newValue[index].mv,  // Ensure mv is not 0
                bcCd: bcCd != null && bcCd >= 0 ? bcCd * 10000 : newValue[index].bcCd
            };

            setValue(newValue)
        }
    }

    const onSortPress = () => {
        setValue(
            value.filter(row => !(row.bcCd === 0 && row.mv === 0)).sort((a, b) => b.mv - a.mv)
        )
    }

    const renderItem = (item) => {
        const index = item.index
        return (
            <CustomDragRow
                key={index}
                index={index}
                row={{
                    velocity: item.mv,
                    bc: item.bcCd
                }}
                setRow={
                    (mv = null, bc = null) => handleChange(index, mv, bc)
                }
                onError={setErr}
            />
        )
    }
    return (
        <Surface style={styles.surface}>
            <View style={styles.row}>
                <Text variant="titleMedium" style={styles.sectionTitle} >{"Coefficients"}</Text>
                <Divider style={styles.divider} />
                <Button icon="sort-variant" mode="outlined" compact style={styles.addBtn} onPress={onSortPress}>Sort</Button>
            </View>

            <FlatList
                data={rows}
                renderItem={renderItem}
                keyExtractor={item => item.id} 
                initialNumToRender={10}
                scrollEnabled={true}
                style={{flex:1}}
                contentContainerStyle={{height: 300}}
            />

            {/* {rows.map((item, index) => <CustomDragRow
                key={index}
                index={index}
                row={{
                    velocity: item.mv,
                    bc: item.bcCd
                }}
                setRow={
                    (mv = null, bc = null) => handleChange(index, mv, bc)
                }
                onError={setErr}
            />)} */}
        </Surface>
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
        flex: 2,
        height: 24,
    },
    icon: {
        height: 24,
    },
    addBtn: {
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