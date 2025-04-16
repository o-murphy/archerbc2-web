import { Platform } from 'react-native';

export const copyToClipboard = async (text: string | undefined) => {
    if (!text) return;
    if (Platform.OS === 'web') {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Copied to clipboard (web):', text);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    } else {
        // For native platforms
        const { default: Clipboard } = await import('@react-native-clipboard/clipboard');
        Clipboard.setString(text);
        console.log('Copied to clipboard (native):', text);
    }
};