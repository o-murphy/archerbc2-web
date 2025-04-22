import { useFileContext } from "@/hooks/fileService/fileContext";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, Surface, TextInput, Button, Menu } from "react-native-paper"
import { ToolTipIconButton } from "./iconButtonWithTooltip";
import { encodeToUrl } from "@/hooks/fileService/useFileParsing";
import { md3PaperIconSource } from "@/components/icons/md3PaperIcons";
import { copyToClipboard } from "@/utils/copyToClip";
import { toast } from "@/components/services/toastService/toastService";
import { useTranslation } from "react-i18next";
import { shareContent } from "@/utils/shareUrl";


export const ShareDialogButton = ({ icon = md3PaperIconSource({ name: "share", mode: "outline" }), ...props }) => {
    const { t } = useTranslation();

    return (
        <ToolTipIconButton tooltip={t("shareDialog.Tooltip")} icon={icon} {...props} />
    )
}


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

    const { t } = useTranslation();

    return (
        <Dialog visible={visible} style={styles.dialog} onDismiss={closeDialog}>
            <Surface elevation={0}>
                <Dialog.Title style={styles.dialogTitle}>
                    {t("shareDialog.Share")}
                </Dialog.Title>
                <Dialog.Content style={styles.dialogContent}>
                    <TextInput
                        style={{ width: "100%" }}
                        readOnly={true}
                        value={urlEncoded}
                        // left={
                        //     <TextInput.Icon icon={md3PaperIconSource({ name: "share" })} size={24} onPress={shareContent} />
                        // }
                        right={
                            <TextInput.Icon icon={md3PaperIconSource({ name: "content-copy" })} size={24} onPress={onCopyPress} />
                        }
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={closeDialog}>{t("shareDialog.Close")}</Button>
                </Dialog.Actions>
            </Surface>
        </Dialog>
    )
}


export const ShareDialogWidget = () => {
    const { t } = useTranslation();
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
            toast.show(t("shareDialog.Copied"));
        }
    };

    const showDialog = async () => {
        if (isError || !urlEncoded) {
            toast.error(isError);
            return;
        } else {
            try {
                await shareContent(urlEncoded)
            } catch (error) {
                setVisible(true)
            }
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


export const ShareDialogMenuItem = () => {
    const { t } = useTranslation();
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
            toast.show(t("shareDialog.Copied"));
        }
    };

    const showDialog = async () => {
        if (isError || !urlEncoded) {
            toast.error(isError);
            return;
        } else {
            try {
                await shareContent(urlEncoded)
            } catch (error) {
                setVisible(true)
            }
        }
    }

    // const showDialog = () => {
    //     if (isError) {
    //         toast.error(isError);
    //         return;
    //     } else {
    //         setVisible(true)
    //     }
    // }

    return (
        <>
            <Menu.Item leadingIcon={md3PaperIconSource({ name: "share" })} onPress={showDialog} title={t("shareDialog.Share")} />
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