import { useFileContext } from "@/hooks/fileService/fileContext";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, Surface, TextInput, Button } from "react-native-paper"
import { ToolTipIconButton } from "./iconButtonWithTooltip";
import { encodeToUrl } from "@/hooks/fileService/useFileParsing";
import { md3PaperIconSource } from "@/components/icons/md3PaperIcons";
import { copyToClipboard } from "@/utils/copyToClip";
import { toast } from "@/components/services/toastService/toastService";


export const ShareDialogButton = ({ icon = "share", ...props }) => (
    <ToolTipIconButton tooltip="Share" icon={icon} {...props} />
)


interface ShareDialogProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    urlEncoded: string | undefined;
    onCopyPress: () => void;
}


export const ShareDialog: React.FC<ShareDialogProps> = (
    { visible, setVisible, urlEncoded, onCopyPress }) => {

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


export const ShareDialogWidget = () => {
    const [visible, setVisible] = useState(false)

    const { currentData } = useFileContext();
    const [isError, setIsError] = useState<Error | null>(null);
    const [urlEncoded, setUrlEncoded] = useState<string | undefined>(undefined);

    // Compute URL when currentData changes
    useEffect(() => {
        try {
            const url = encodeToUrl(currentData);
            setUrlEncoded(url);
            setIsError(null);
        } catch (error: any) {
            setUrlEncoded(undefined);
            setIsError(error);
        }
    }, [currentData]);

    const onCopyPress = () => {
        if (urlEncoded) {
            copyToClipboard(urlEncoded);
            toast.show("Link copied to clipboard");
        }
    };

    const showDialog = () => {
        if (isError) {
            toast.error(isError);
            return;
        } else {
            setVisible(true)
        }
    }

    return (
        <>
            <ShareDialogButton onPress={showDialog} />
            <Portal>
                <ShareDialog
                    visible={visible}
                    setVisible={setVisible}
                    urlEncoded={urlEncoded}
                    onCopyPress={onCopyPress}
                />
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
    dialogContent: {
        alignItems: "center"
    },
})


export default ShareDialog;