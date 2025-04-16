import { useFileContext } from "@/hooks/fileContext";
import { toast } from "@/components/toast/toastService";
import { useEffect } from "react";


export const FileOpenError = () => {
    const { fileState } = useFileContext()
    useEffect(() => {
        if (fileState.error) {
            toast.error(fileState.error.message)
        }
    }, [fileState])
    return null
}