import { useFileContext } from "@/hooks/fileContext";
import { useState } from "react";
import { PressableProps, StyleSheet } from "react-native";
import { Button, IconButton, Dialog, Portal, Surface, Text, Tooltip, useTheme, DialogProps } from "react-native-paper"


export const CloseDialogButton = ({ icon = "close-circle-outline", ...props }) => {
    const theme = useTheme();

    return (
        <Tooltip title="Close" leaveTouchDelay={0.2}>
            <IconButton icon={icon} iconColor={theme.colors.error} {...props} />
        </Tooltip>
    )
}

export const CloseDialog: React.FC<any> = (
    { visible, setVisible }:
        { visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>> }
) => {

    const { closeFile } = useFileContext()

    const savePress = () => {
        closeFile(true)
        closeDialog()
    }

    const notSavePress = () => {
        closeFile(false)
        closeDialog()
    }

    const closeDialog = () => {
        setVisible(false)
    }

    return (
        <Dialog visible={visible} style={styles.dialog} onDismiss={closeDialog}>
            <Surface elevation={0}>
                <Dialog.Title style={styles.dialogTitle}>
                    Close file
                </Dialog.Title>
                <Dialog.Content style={styles.dialogContent}>
                    <Text variant="bodyLarge">
                        Do you want to save changes?
                    </Text>
                </Dialog.Content>
                <Dialog.Actions style={styles.dialogActions}>
                    <Button mode="contained-tonal" style={styles.actionButton} onPress={savePress}>Save</Button>
                    <Button mode="contained-tonal" style={styles.actionButton} onPress={notSavePress}>Don't save</Button>
                    <Button mode="contained-tonal" style={styles.actionButton} onPress={closeDialog}>Cancel</Button>
                </Dialog.Actions>
            </Surface>
        </Dialog>
    )
}


export const CloseDialogWidget = ({
    Button = CloseDialogButton,
    Dialog = CloseDialog,
}: {
    Button?: React.FC<PressableProps>,
    Dialog?: React.FC<DialogProps>
}) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Tooltip title="Close" leaveTouchDelay={0.2}>
                <Button onPress={() => setVisible(true)} />
            </Tooltip>
            <Portal>
                <Dialog visible={visible} setVisible={setVisible} />
            </Portal>
        </>
    )
}

const styles = StyleSheet.create({
    dialog: {
        width: 400,
        alignSelf: "center",
    },
    dialogTitle: {
        textAlign: "center"
    },
    dialogActions: {
        justifyContent: "space-around"
    },
    dialogContent: {
        alignItems: "center"
    },
    actionButton: {
        flex: 1,
    },
})


export default CloseDialog;