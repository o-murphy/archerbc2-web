import { useState } from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, Surface, Text, IconButton, Divider } from "react-native-paper"


const EditDialog = () => {

    const [visible, setVisible] = useState(true)

    const closeDialog = () => {
        // setVisible(false)
    }

    return (
        <Portal>
            <Dialog visible={visible} style={styles.dialog} onDismiss={closeDialog}>

                <Dialog.Title style={styles.dialogTitle}>
                    <Surface style={styles.topBar}>
                        <IconButton icon="file-plus" onPress={() => { }} />
                        <IconButton icon="file" onPress={() => { }} />
                        <IconButton icon="content-save" onPress={() => { }} />
                        <IconButton icon="content-save-all" onPress={() => { }} />
                        <IconButton icon="file-refresh" onPress={() => { }} />
                        <IconButton icon="crosshairs" onPress={() => { }} />
                        <IconButton icon="application-import" onPress={() => { }} />
                        <IconButton icon="application-export" onPress={() => { }} />  {/* tray-arrow-up */}
                        <IconButton icon="theme-light-dark" onPress={() => { }} />  {/* tray-arrow-down */}
                        <IconButton icon="translate" onPress={() => { }} />
                        <Text variant="titleLarge" style={styles.topBarTitle}>ArcherBC2</Text>
                    </Surface>
                </Dialog.Title>

                <Dialog.Content style={styles.dialogContent}>

                    <Surface style={styles.sideBar}>
                        <IconButton icon="card-account-details" onPress={() => { }} />
                        <IconButton icon="file" onPress={() => { }} />
                        <IconButton icon="content-save" onPress={() => { }} />
                        <IconButton icon="content-save-all" onPress={() => { }} />
                        <IconButton icon="file-refresh" onPress={() => { }} />
                        <IconButton icon="crosshairs" onPress={() => { }} />
                    </Surface>

                    <Surface style={styles.surfaceContent}>
                        <Text variant="bodyLarge">
                            placeholder
                        </Text>
                    </Surface>

                </Dialog.Content>
            
            </Dialog>
        </Portal>
    )
}


const styles = StyleSheet.create({
    header: {
        // flex: 1,
        // alignItems: "flex-start",
        // overflow: "hidden"
    },
    sideBar: {
        alignItems: "center",
        width: 48,
        borderRadius: 16,
    },
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
        alignSelf: "center"
    },
    surfaceContent: {
        flex: 1,
        marginLeft: 16,
        height: "100%",
        borderRadius: 16,

        // temp
        justifyContent: "center",
        alignItems: "center"
    },
    dialog: {
        width: 800,
        height: 600,
        alignSelf: "center",
    },
    dialogTitle: {
        justifyContent: "center",
    },
    dialogContent: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
    },
})


export default EditDialog;