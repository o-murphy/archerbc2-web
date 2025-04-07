import { StyleSheet } from "react-native";
import { IconButton, Surface, Text } from "react-native-paper"



const TopBar = () => {
    return (
        <Surface style={styles.topBar}>
            <IconButton icon="file-plus" onPress={() => { }} />
            <IconButton icon="file" onPress={() => { }} />
            <IconButton icon="content-save" onPress={() => { }} />
            <IconButton icon="content-save-all" onPress={() => { }} />
            <IconButton icon="file-refresh" onPress={() => { }} />
            <IconButton icon="crosshairs" onPress={() => { }} />
            <IconButton icon="application-import" onPress={() => { }} />
            <IconButton icon="application-export" onPress={() => { }} />
            <IconButton icon="theme-light-dark" onPress={() => { }} />
            <IconButton icon="translate" onPress={() => { }} />
            <Text variant="titleLarge" style={styles.topBarTitle}>ArcherBC2</Text>
        </Surface>
    )
}


const styles = StyleSheet.create({
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        width: "100%",
        paddingRight: 16,
    },
    topBarTitle: {
        flex: 1,
        textAlign: "right",
        alignSelf: "center",
    },
})


export default TopBar;