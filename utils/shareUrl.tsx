export const shareContent = async (url: string) => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Check this out!',
                text: 'This is something cool I wanted to share with you.',
                url: url, // or any specific URL
            });
            console.log('Shared successfully');
        } catch (error) {
            console.error('Error sharing:', error);
            throw error
        }
    } else {
        // alert('Sharing not supported on this browser.');
        throw new Error('Sharing not supported on this browser.')
    }
};