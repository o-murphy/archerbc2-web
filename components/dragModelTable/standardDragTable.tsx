import { BcType } from "@/utils/a7p";
import { StyleSheet, View } from "react-native"
import { IconButton, Surface, Text, TextInput, useTheme } from "react-native-paper"


const MAX_ITEM_COUNT = 5


const StandardDragHeader = ({ model }: { model: BcType }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.input}>{"Velocity"}</Text>
            <Text style={styles.input}>{`BC (${model})`}</Text>
            <View style={styles.icon}></View>
        </View>
    )
}


const StandardDragRow = ({ velocity = 0, bc = 0 }: { velocity: number, bc: number }) => {
    const theme = useTheme()

    return (
        <View style={styles.row}>
            <TextInput mode="outlined" style={styles.input} value={velocity.toFixed(0)} />
            <TextInput mode="outlined" style={styles.input} value={bc.toFixed(3)} />
            <IconButton size={16} icon={"close"} iconColor={theme.colors.error} style={styles.icon} />
        </View>
    )
}


const StandardDragTable = ({ model }: { model: BcType }) => {

    const rows = [
        { v: 0, bc: 0 },
        { v: 0, bc: 0 },
        { v: 0, bc: 0 },
        { v: 0, bc: 0 },
        { v: 0, bc: 0 },
    ].slice(0, MAX_ITEM_COUNT)

    return (
        <Surface style={styles.surface}>
            <StandardDragHeader model={model} />
            {rows.map((item, index) => <StandardDragRow key={index} velocity={item.v} bc={item.bc} />)}
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