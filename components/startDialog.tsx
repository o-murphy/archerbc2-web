import { ReactNode, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Surface, Text, TouchableRipple } from "react-native-paper"
import { useFileHandler } from "@/hooks/fileService/useFileHandler";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { DropZoneWeb } from "./dropZone/dropZone";
import { FileOpenerService } from "../hooks/fileService/fileOpener";
import { useParseFile } from "@/hooks/fileService/useFileParsing";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "./languageToggle";

const StartDialogDropZone = ({ children }: { children: ReactNode }) => {
    const { fileHandleState, processFile } = useFileHandler();  // Use the custom hook
    useParseFile(fileHandleState);
    return (
        <DropZoneWeb onDropFile={processFile}>
            {children}
        </DropZoneWeb>
    )
}

const StartDialog = () => {
    const { t } = useTranslation();

    const [visible, setVisible] = useState(true)
    const { fileState, currentData } = useFileContext()


    useEffect(() => {
        if (!fileState.error && currentData.profile) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }, [fileState, currentData])

    const onCreatePress = () => {
        console.log("Create pressed")
    }

    const onOpenPress = () => {
        FileOpenerService.triggerFileInputClick();
    };

    return (
        <Dialog visible={visible} style={styles.dialog} dismissable={false}>
            <StartDialogDropZone>
                <TouchableRipple style={styles.touchable} onPress={onOpenPress}>
                    <Surface elevation={0}>
                        <Dialog.Title style={styles.dialogTitle}>
                            ArcherBC2
                            <LanguageToggle />
                        </Dialog.Title>

                        <Dialog.Content style={styles.dialogContent}>
                            <Text variant="headlineMedium">
                                {t("startDialog.StartMenu")}
                            </Text>
                            <Text variant="bodyLarge">
                                {/* <Dialog.Icon icon="file" /> */}
                                {t("startDialog.OpenOrCreateNewProfile")}
                            </Text>
                            <Text variant="bodyMedium">
                                {t("startDialog.dndHere")}
                            </Text>
                        </Dialog.Content>
                        <Dialog.Actions style={styles.dialogActions}>
                            <Button mode="contained-tonal" style={styles.actionButton} onPress={onCreatePress} disabled>
                                {t("startDialog.CreateNew")}
                            </Button>
                            <Button mode="contained-tonal" style={styles.actionButton} onPress={onOpenPress}>
                                {t("startDialog.Open")}
                            </Button>
                        </Dialog.Actions>
                    </Surface>
                </TouchableRipple>
            </StartDialogDropZone>
        </Dialog>
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
    touchable: {
        borderRadius: 24,
    }
})


export default StartDialog;