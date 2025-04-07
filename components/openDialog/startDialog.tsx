import { ChangeEvent, RefObject, useRef } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, Surface, Text, TouchableRipple } from "react-native-paper"

const AllowedExtensions = [".a7p"]


type FileInputProps = {
    fileInputRef: RefObject<HTMLInputElement>;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    allowedExtensions: string[];
};

const FileInput: React.FC<FileInputProps> = ({ fileInputRef, handleFileChange, allowedExtensions }) => {
    return (
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }} // Hide the default file input
            id="file-upload" // Give an ID to the input
            onChange={handleFileChange}
            accept={allowedExtensions.join(',')} // Restrict to specific file types
        />
    )
}


const StartDialog = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = () => {

    }

    const onCreatePress = () => {
        console.log("Create pressed")
    }

    const onOpenPress = () => {
        console.log("Open pressed");
        if (fileInputRef?.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Portal>
            <Dialog visible={true} style={styles.dialog}>
                <TouchableRipple style={styles.touchable} onPress={onOpenPress}>
                    <Surface elevation={0}>
                        <Dialog.Title>Start menu</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyLarge">Open or create new profile</Text>
                            <Text variant="bodyMedium">(or drag'n'drop file here)</Text>
                        </Dialog.Content>
                        <Dialog.Actions style={styles.dialogActions}>
                            <Button mode="contained-tonal" style={styles.actionButton} onPress={onCreatePress}>Create new</Button>
                            <Button mode="contained-tonal" style={styles.actionButton} onPress={onOpenPress}>Open</Button>
                        </Dialog.Actions>
                    </Surface>
                </TouchableRipple>
            </Dialog>
            <FileInput fileInputRef={fileInputRef} handleFileChange={handleFileChange} allowedExtensions={AllowedExtensions} />
        </Portal>
    )
}


const styles = StyleSheet.create({
    dialog: {
        width: 400,
        alignSelf: "center",
    },
    dialogActions: {
        justifyContent: "space-around",
    },
    actionButton: {
        flex: 1
    },
    touchable: {
        margin: 8,
        marginTop: 8,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#555",
        borderRadius: 24
    }
})


export default StartDialog;