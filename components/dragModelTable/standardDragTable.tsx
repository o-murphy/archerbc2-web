import { BcType } from "@/utils/a7p/types";
import { StyleSheet, View } from "react-native"
import { Button, IconButton, Surface, Text, Tooltip, useTheme } from "react-native-paper"
import { useFileField } from "../fieldsEdit/fieldEditInput";
import { CoefRow } from "@/utils/a7p/types";
import { DoubleSpinBox } from "../fieldsEdit/doubleSpinBox";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProfileProps } from "@/hooks/useFileParsing";


const MAX_ITEM_COUNT = 5


const StandardDragHeader = ({ model, onSortPress }: { model: BcType, onSortPress?: () => void }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.input}>{"Velocity, mps"}</Text>
            <Text style={styles.input}>{`BC (${model})`}</Text>
            {/* <View style={styles.icon}></View> */}
            <Button mode="outlined" icon="sort-variant" onPress={onSortPress}>Sort</Button>
        </View>
    )
}


const StandardDragRow = ({ row: { velocity = 0, bc = 0 }, setRow, onError }: {
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
            <DoubleSpinBox
                floatValue={velocity}
                onFloatValueChange={(value) => setRow(value, null)}
                range={{ min: 0, max: 3000 }}
                fraction={0}
                onError={setMvErr}

                mode="outlined"
                style={styles.input}
            />
            <DoubleSpinBox
                floatValue={bc}
                onFloatValueChange={(value) => setRow(null, value)}
                range={{ min: 0, max: 10 }}
                fraction={3}
                onError={setBcCdErr}

                mode="outlined"
                style={styles.input}
            />
            <Tooltip title="Clear row">
                <IconButton size={16} icon={"close"} iconColor={theme.colors.error} style={styles.icon} onPress={clearRow} />
            </Tooltip>
        </View>
    )
}


const StandardDragTable = ({ model }: { model: BcType }) => {

    let field = 'coefRows' as keyof ProfileProps

    switch (model) {
        case BcType.G1:
            field = 'coefRowsG1'
            break
        case BcType.G7:
            field = 'coefRowsG7'
            break
    }

    const [err, setErr] = useState<Error | null>(null);
    const [value, setValue] = useFileField<keyof ProfileProps, CoefRow[]>({
        field,
        defaultValue: [],
        validate: useCallback(() => {
            return !!err
        }, [err])
    });

    const rows = useMemo(() => {
        const filledRows = value.slice(0, MAX_ITEM_COUNT).map(item => ({
            bcCd: item.bcCd / 10000,
            mv: item.mv / 10
        }));

        // If there are fewer than 5 rows, fill the rest with { bcCd: 0, mv: 0 }
        while (filledRows.length < MAX_ITEM_COUNT) {
            filledRows.push({ bcCd: 0, mv: 0 });
        }

        return filledRows;
    }, [value, setValue]);

    const handleChange = (index: number, mv: number | null = null, bcCd: number | null = null) => {
        console.log('handle', !err)

        if (!err) {
            const newValue = [...value];  // Create a shallow copy of the value array
            while (newValue.length < MAX_ITEM_COUNT) {
                newValue.push({ bcCd: 0, mv: 0 });
            }
            newValue[index] = {
                ...newValue[index],  // Copy the existing row
                mv: mv !== null && mv >= 0 ? mv * 10 : newValue[index].mv,  // Ensure mv is not 0
                bcCd: bcCd != null && bcCd >= 0 ? bcCd * 10000 : newValue[index].bcCd
            };
            console.log(newValue)
            // Filter out rows with bcCd: 0 and mv: 0
            // const filteredValue = newValue.filter(row => row.bcCd !== 0 || row.mv !== 0);

            // console.log("cr", filteredValue);
            // setValue(filteredValue);  // Update state with the filtered array

            setValue(newValue)
        }
    }

    const onSortPress = () => {
        setValue(
            value.filter(row => !(row.bcCd === 0 && row.mv === 0)).sort((a, b) => b.mv - a.mv)
        )
    }

    return (
        <Surface style={styles.surface}>
            <StandardDragHeader model={model} onSortPress={onSortPress}/>
            {rows.map((item, index) => <StandardDragRow
                key={index}
                row={{
                    velocity: item.mv,
                    bc: item.bcCd
                }}
                setRow={
                    (mv = null, bc = null) => handleChange(index, mv, bc)
                }
                onError={setErr}
            />)}
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
    input: {
        flex: 1,
        height: 24
    },
    icon: {
        height: 24
    }
})

export default StandardDragTable