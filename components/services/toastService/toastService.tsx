import { useEffect, useState } from "react";
import { Portal, Snackbar, useTheme } from "react-native-paper";

// SnackbarService.ts
type Msg = string | null | undefined | Error;
type SnackbarOptions = {
    message: Msg;
    isError?: boolean;
    duration?: number;
};

export class ToastService {
    private static showCallback: ((options: SnackbarOptions) => void) | null =
        null;

    static register(callback: (options: SnackbarOptions) => void) {
        this.showCallback = callback;
    }

    static show(
        message: Msg,
        isError: boolean = false,
        duration: number = 3000,
    ) {
        if (this.showCallback) {
            this.showCallback({ message: `${message}`, isError, duration });
        } else {
            console.warn("SnackbarService not initialized yet.");
        }
    }

    static error(message: Msg, duration: number = 3000) {
        if (this.showCallback) {
            this.showCallback({
                message: `${message}`,
                isError: true,
                duration,
            });
        } else {
            console.warn("SnackbarService not initialized yet.");
        }
    }
}

export const Toast = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<Msg>(null);
    const [duration, setDuration] = useState<number>(3000);
    const [isError, setIsError] = useState<boolean>(false);
    const theme = useTheme();

    useEffect(() => {
        ToastService.register(({ message, isError, duration }) => {
            setMessage(message);
            setDuration(duration ?? 3000);
            setVisible(true);
            setIsError(isError ?? false);
        });
    }, []);

    return (
        <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={duration}
            style={{
                // position: 'absolute',
                bottom: 100,
                // left: '50%',
                // transform: [{ translateX: -200 }], // half of maxWidth
                alignSelf: "center",
                // zIndex: 9999,
                width: 400,
                ...(isError ? { backgroundColor: theme.colors.error } : {}),
            }}
            icon={isError ? "alert-circle" : undefined}
        >
            {`${message}`}
        </Snackbar>
    );
};

export { ToastService as toast };
