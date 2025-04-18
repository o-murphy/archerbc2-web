import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Portal, Dialog, Button, useTheme, Text } from "react-native-paper";
import { ToolTipIconButton } from "../iconButtonWithTooltip";


export class HelpDialogService {
    private static showCallback: ((content: React.ReactNode) => void) | null = null;

    static register(callback: (content: React.ReactNode) => void) {
        this.showCallback = callback;
    }

    static show(content: React.ReactNode) {
        if (this.showCallback) {
            this.showCallback(content);
        } else {
            console.warn("HelpDialogService not initialized yet.");
        }
    }
}

export const HelpDialogHost = () => {
    const theme = useTheme()

    const [visible, setVisible] = useState(false);
    const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

    useEffect(() => {
        HelpDialogService.register((content) => {
            setDialogContent(content);
            setVisible(true);
        });
    }, []);

    const closeDialog = () => setVisible(false)

    return (
        <Portal>
            <Dialog visible={visible} style={styles.dialog} onDismiss={closeDialog}>
                <Dialog.Title style={{ textAlign: "center" }}>
                    <Dialog.Icon icon={"help-circle-outline"} color={theme.colors.tertiary} />
                    <Text variant="headlineSmall" style={{ marginHorizontal: 8 }}>Help</Text>
                </Dialog.Title>
                <Dialog.ScrollArea>
                    <ScrollView contentContainerStyle={{marginVertical: 8}}>
                        {dialogContent}
                    </ScrollView>
                </Dialog.ScrollArea>
                <Dialog.Actions>
                    <Button onPress={closeDialog}>Close</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export const HelpDialogButton = ({ icon = "help-circle-outline", ...props }) => (
    <ToolTipIconButton tooltip="Help" icon={icon} {...props} />
)

const styles = StyleSheet.create({
    dialog: {
        maxWidth: 500,
        maxHeight: 500,
        alignSelf: "center",
    },
    dialogTitle: {
        textAlign: "center",
        justifyContent: "center"
    },
    header: {
        textAlign: 'center',
    },
})

export { HelpDialogService as help };
