import { useFileContext } from "@/hooks/fileContext";
import { useState } from "react";
import { PressableProps, StyleSheet } from "react-native";
import { Button, IconButton, Dialog, Portal, Surface, Text, Tooltip, useTheme, DialogProps, FAB, Icon } from "react-native-paper"
import { IconButtonWithToolTip } from "./iconButtonWithTooltip";


export const CloseDialogButton = ({ icon = "close-circle-outline", ...props }) => {
    const theme = useTheme();

    return (
        <IconButtonWithToolTip tooltip="Close" icon={icon} iconColor={theme.colors.error} {...props} />
    )
}

export const CloseDialog: React.FC<any> = (
    { visible, setVisible }:
        { visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>> }
) => {

    const { closeFile, saveFile } = useFileContext()
    const theme = useTheme()

    const savePress = () => {
        saveFile()
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
                    ⚠️ Close File ⚠️
                </Dialog.Title>
                <Dialog.Content style={styles.dialogContent}>
                    <Text variant="bodyLarge" style={{ textAlign: "center" }}>
                        Do you want to save the changes before closing?
                    </Text>
                    <Text variant="bodyLarge" style={[styles.warning, { color: theme.colors.error }]}>
                        🔴 If you don’t, your data will be lost.
                    </Text>
                    <FAB
                        mode="flat"
                        variant="primary"
                        style={styles.fab}
                        icon="file-download"
                        onPress={savePress}
                        label="Download and Close"
                    />
                </Dialog.Content>
                <Dialog.Actions style={styles.dialogActions}>
                    <Button
                        mode="outlined"
                        style={styles.actionButton}
                        icon="delete-forever"
                        onPress={notSavePress}
                    >
                        Close Without Saving
                    </Button>
                    <Button
                        mode="outlined"
                        style={styles.actionButton}
                        icon="cancel"
                        onPress={closeDialog}
                    >
                        Cancel
                    </Button>
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
                <Dialog visible={visible} setVisible={() => setVisible(false)} />
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
    fab: {
        flex: 1,
        marginTop: 16
    },
    warning: {

    }
})


export default CloseDialog;