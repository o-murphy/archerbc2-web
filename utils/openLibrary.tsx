
const LIBRARY_PATH = "/a7pIndex/"

export const openLibrary = async () => {
    try {
        // const url = `${window.location.origin}${LIBRARY_PATH}`;
        const url = `https://portfolio.o-murphy.net${LIBRARY_PATH}`;
        console.log(url)
        window.open(url, '_blank');
    } catch (error) {
        console.error("Error fetching file:", error);
        throw error
    }
}