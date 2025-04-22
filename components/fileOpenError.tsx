import { useFileContext } from "@/hooks/fileService/fileContext";
import { toast } from "@/components/services/toastService/toastService";
import { useEffect } from "react";

export const FileOpenError = () => {
    const { fileState } = useFileContext();
    useEffect(() => {
        if (fileState.error) {
            toast.error(fileState.error.message);
        }
    }, [fileState]);
    return null;
};
