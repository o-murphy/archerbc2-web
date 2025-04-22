export class ShareError extends Error {
    constructor(message = "ShareError", options?: { cause?: unknown }) {
        super(message);
        this.name = "ShareError";
        if (options?.cause) {
            (this as any).cause = options.cause;
        }
    }
}

export class ShareNotSupportedError extends ShareError {
    constructor(message = "Web Share API is not supported") {
        super(message);
        this.name = "ShareNotSupportedError";
    }
}

export class ShareNotAllowedError extends ShareError {
    constructor(
        message = "User denied share request or action is not permitted",
    ) {
        super(message);
        this.name = "ShareNotAllowedError";
    }
}

export class ShareUnknownError extends ShareError {
    constructor(original: unknown) {
        const message =
            original instanceof Error ? original.message : String(original);
        super(message, { cause: original });
        this.name = "ShareUnknownError";
    }
}

export class ShareInvalidInputError extends ShareError {
    constructor(message = "Invalid file object provided to shareBuffer.") {
        super(message);
        this.name = "ShareInvalidInputError";
    }
}

export const shareContent = async (url: string): Promise<void> => {
    if (!navigator.share) {
        throw new ShareNotSupportedError();
    }

    try {
        await navigator.share({
            title: "Check this out!",
            text: "This is something cool I wanted to share with you.",
            url,
        });
        console.log("Shared successfully");
    } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "NotAllowedError") {
            throw new ShareNotAllowedError();
        }
        throw new ShareUnknownError(error);
    }
};

export const shareBuffer = async ({
    file,
}: {
    file: {
        name: string;
        type: string;
        buffer: ArrayBuffer;
    };
}): Promise<void> => {
    if (!file || !file.buffer || !file.name || !file.type) {
        console.warn("Invalid file object provided");
        throw new ShareInvalidInputError();
    }

    const blob = new Blob([file.buffer], {
        type: file.type || "application/octet-stream",
    });

    const newFile = new File([blob], file.name, {
        type: file.type || "application/octet-stream",
    });

    if (
        !navigator.share ||
        !navigator.canShare ||
        !navigator.canShare({ files: [newFile] })
    ) {
        throw new ShareNotSupportedError();
    }

    try {
        await navigator.share({ files: [newFile] });
        console.log("File shared successfully");
    } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "NotAllowedError") {
            throw new ShareNotAllowedError();
        }
        throw new ShareUnknownError(error);
    }
};
