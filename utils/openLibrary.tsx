
const LIBRARY_PATH = "/a7pIndex/"

// export const openLibrary = async () => {
//     try {
//         const url = `${window.location.origin}${LIBRARY_PATH}`;
//         // const url = `https://portfolio.o-murphy.net${LIBRARY_PATH}`;
//         console.log(url)
//         window.open(url, '_blank');
//     } catch (error) {
//         console.error("Error fetching file:", error);
//         throw error
//     }
// }

export const openLibrary = async () => {
    try {
        const url = `${window.location.origin}${LIBRARY_PATH}`;
        console.log(url);

        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank'; // Відкриває в новій вкладці/вікні
        link.rel = 'noopener noreferrer'; // Рекомендовано для безпеки

        // Програмно ініціювати клік
        document.body.appendChild(link); // Додати до DOM
        link.click();
        document.body.removeChild(link); // Очистити елемент
    } catch (error) {
        console.error("Помилка відкриття бібліотеки:", error);
        throw error;
    }
};