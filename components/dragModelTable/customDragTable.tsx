import { StyleSheet, View } from "react-native"
import { Button, Divider, IconButton, Surface, Text, TextInput, useTheme } from "react-native-paper"


const MAX_ITEM_COUNT = 200


const CustomDragRow = ({ index, velocity, bc }: { index: number, velocity: number, bc: number }) => {
    const theme = useTheme()

    return (
        <View style={styles.row}>
            <Text style={styles.label}>{`[${index + 1}]`}</Text>
            <Text style={styles.label}>{"Mach"}</Text>
            <TextInput mode="outlined" style={styles.input} value={velocity.toFixed(0)} />
            <Text style={styles.label}>{"Cd"}</Text>
            <TextInput mode="outlined" style={styles.input} value={bc.toFixed(3)} />
            <IconButton size={16} icon={"close"} iconColor={theme.colors.error} style={styles.icon} />
        </View>
    )
}


const CustomDragTable = () => {

    const rows = [
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
        { ma: 0, cd: 0 },
    ].slice(0, MAX_ITEM_COUNT)

    return (
        <Surface style={styles.surface}>
            <View style={styles.row}>
                <Text variant="titleMedium" style={styles.sectionTitle} >{"Coefficients"}</Text>
                <Divider style={styles.divider} />
                <Button icon="plus" mode="outlined" compact style={styles.addBtn}>Add</Button>
            </View>
            {rows.map((item, index) => <CustomDragRow key={index} index={index} velocity={item.ma} bc={item.cd} />)}
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
        flex: 3,
        height: 24
    },
    icon: {
        height: 24
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