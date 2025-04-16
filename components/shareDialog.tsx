import { useFileContext } from "@/hooks/fileContext";
import { useMemo, useState } from "react";
import { PressableProps, StyleSheet } from "react-native";
import { Dialog, Portal, Surface, Tooltip, useTheme, DialogProps, TextInput, Button } from "react-native-paper"
import { IconButtonWithToolTip } from "./iconButtonWithTooltip";
import { encodeAsUrl } from "@/hooks/useFileParsing";
import { md3PaperIconSource } from "@/theme/md3PaperIcons";
import { copyToClipboard } from "@/utils/copyToClip";
import { RenderSnackBar } from "./fileOpenError";


export const ShareDialogButton = ({ icon = "share", ...props }) => {

    return (
        <IconButtonWithToolTip tooltip="Share" icon={icon} {...props} />
    )
}

interface ShareDialogProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CopiedSnackBar = ({ visible, setVisible }: { visible: boolean, setVisible: (visible: boolean) => void }) => {

    const onDismiss = () => setVisible(false)

    const props = {
        visible: visible,
        onDismiss: onDismiss,
        message: `Link copied to clipboard`,
        isError: false
    }

    return (
        <RenderSnackBar {...props} />
    )
}

export const ShareDialog: React.FC<ShareDialogProps> = (
    { visible, setVisible }:
        { visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>> }
) => {

    const { currentData } = useFileContext()
    const [snackVisible, setSnackVisible] = useState(false)

    const urlEncoded = useMemo(() => {
        try {
            return encodeAsUrl(currentData)
        } catch (error) {
            console.error("Error encode url")
            return ""
        }
    }, [snackVisible])

    const onCopyPress = () => {
        copyToClipboard(urlEncoded)
        setSnackVisible(true)
    }

    const closeDialog = () => {
        setVisible(false)
    }

    return (
        <Dialog visible={visible} style={styles.dialog} onDismiss={closeDialog}>
            <Surface elevation={0}>
                <Dialog.Title style={styles.dialogTitle}>
                    Share
                </Dialog.Title>
                <Dialog.Content style={styles.dialogContent}>
                    <TextInput
                        style={{ width: "100%" }}
                        readOnly={true}
                        value={urlEncoded}
                        right={
                            <TextInput.Icon icon={md3PaperIconSource({ name: "content-copy" })} size={24} onPress={onCopyPress} />
                        }
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={closeDialog}>Close</Button>
                </Dialog.Actions>
            </Surface>
            <CopiedSnackBar visible={snackVisible} setVisible={setSnackVisible} />
        </Dialog>
    )
}


export const ShareDialogWidget = ({
    Button = ShareDialogButton,
    Dialog = ShareDialog,
}: {
    Button?: React.FC<PressableProps>,
    Dialog?: React.FC<ShareDialogProps>
}) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Button onPress={() => setVisible(true)} />
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


export default ShareDialog;