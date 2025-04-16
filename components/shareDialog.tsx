import { useFileContext } from "@/hooks/fileContext";
import { useEffect, useState } from "react";
import { PressableProps, StyleSheet } from "react-native";
import { Dialog, Portal, Surface, TextInput, Button } from "react-native-paper"
import { IconButtonWithToolTip } from "./iconButtonWithTooltip";
import { encodeAsUrl } from "@/hooks/useFileParsing";
import { md3PaperIconSource } from "@/theme/md3PaperIcons";
import { copyToClipboard } from "@/utils/copyToClip";
import { SnackbarService } from "@/hooks/snackBarService";


export const ShareDialogButton = ({ icon = "share", ...props }) => {

    return (
        <IconButtonWithToolTip tooltip="Share" icon={icon} {...props} />
    )
}

interface ShareDialogProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShareDialog: React.FC<ShareDialogProps> = (
    { visible, setVisible }:
        { visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>> }
) => {

    const { currentData } = useFileContext();
    const [isError, setIsError] = useState<Error | null>(null);
    const [urlEncoded, setUrlEncoded] = useState<string | undefined>(undefined);
    
    // Compute URL when currentData changes
    useEffect(() => {
        try {
            const url = encodeAsUrl(currentData);
            setUrlEncoded(url);
            setIsError(null);
        } catch (error: any) {
            console.error(error);
            setUrlEncoded(undefined);
            setIsError(error);
        }
    }, [currentData]);

    const onCopyPress = () => {
        if (isError) {
            SnackbarService.error(isError);
            return;
        }
        if (urlEncoded) {
            copyToClipboard(urlEncoded);
            SnackbarService.show("Link copied to clipboard");
        }
    };

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