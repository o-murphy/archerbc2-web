import { useFileContext } from "@/hooks/fileContext";
import { useEffect, useState } from "react";
import { Snackbar, useTheme } from "react-native-paper";

export const RenderSnackBar = ({ visible, onDismiss, message, isError = false }: { visible: boolean, onDismiss: () => void, message: string, isError?: boolean }) => {
    const theme = useTheme()

    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            duration={3000}
            style={{
                alignSelf: "center",
                maxWidth: 400,
                marginBottom: 100,
                ...(isError ? { backgroundColor: theme.colors.error } : {}),
            }}
            icon={isError ? "alert-circle" : undefined}
        >
            {message}
        </Snackbar>
    );
}

export const FileOpenError = () => {

    const { fileState } = useFileContext()
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        if (fileState.error) {
            setVisible(true)
        }

    }, [fileState])

    const onDismiss = () => setVisible(false)

    const props = {
        visible: visible,
        onDismiss: onDismiss,
        message: `File open error: ${fileState.error?.message}`,
        isError: true
    }

    return (
        <RenderSnackBar {...props} />
    )
}