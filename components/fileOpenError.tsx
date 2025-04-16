import { useFileContext } from "@/hooks/fileContext";
import { SnackbarService } from "@/hooks/snackBarService";
import { useEffect, useState } from "react";


export const FileOpenError = () => {

    const { fileState } = useFileContext()
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        if (fileState.error) {
            setVisible(true)
            SnackbarService.error(fileState.error.message)
        }

    }, [fileState])

    const onDismiss = () => setVisible(false)

    const props = {
        visible: visible,
        onDismiss: onDismiss,
        message: `File open error: ${fileState.error?.message}`,
        isError: true
    }

    return null
}