import fs from 'fs/promises';
import path from 'path';

async function imageToBase64(filePath) {
    try {
        const bitmap = await fs.readFile(filePath);
        return Buffer.from(bitmap).toString('base64');
    } catch (error) {
        console.error(`Error reading file: ${filePath}`, error);
        return null;
    }
}

async function processDirectory(directoryPath, outputObject) {
    try {
        const files = await fs.readdir(directoryPath);

        for (const file of files) {
            const fullPath = path.join(directoryPath, file);
            const stats = await fs.stat(fullPath);
            const ext = path.extname(file).toLowerCase();
            const relativePath = path.relative('./assets/icons', fullPath);
            const parts = relativePath.split(path.sep);
            const themeFromPath = parts[0]; // e.g., 'dark' or 'light'

            console.log(`Processing file/directory: ${fullPath}`);

            if (stats.isDirectory()) {
                console.log(`  Is directory, recursing...`);
                await processDirectory(fullPath, outputObject);
            } else if (ext === '.png' && (themeFromPath === 'dark' || themeFromPath === 'light')) {
                console.log(`  Is PNG file in theme directory: ${themeFromPath}`);
                const baseName = path.basename(file, '.png');
                const iconName = baseName;
                const theme = themeFromPath;

                const base64String = await imageToBase64(fullPath);
                if (base64String) {
                    const base64Uri = `data:image/png;base64,${base64String}`;

                    if (!outputObject[theme]) {
                        outputObject[theme] = {};
                    }
                    outputObject[theme][iconName] = base64Uri;
                    console.log(`    Base64 conversion successful, added to ${theme}.${iconName}`);
                } else {
                    console.log(`    Base64 conversion failed.`);
                }
            } else if (ext === '.png') {
                console.log(`  PNG file not in a theme directory, skipping.`);
            } else {
                console.log(`  Skipping file with extension: ${ext}`);
            }
        }
    } catch (error) {
        console.error(`Error reading directory: ${directoryPath}`, error);
    }
}

async function main() {
    const directoryToScan = './assets/icons';
    const outputFilePath = './components/icons/generatedIcons.ts';

    const generatedIcons = {};
    await processDirectory(directoryToScan, generatedIcons);

    const tsContent = `// Generated on ${new Date().toISOString()}

export const DarkThemeIcon = ${JSON.stringify(generatedIcons.dark || {}, null, 4)};
export const LightThemeIcon = ${JSON.stringify(generatedIcons.light || {}, null, 4)};
`;

    try {
        await fs.writeFile(outputFilePath, tsContent, 'utf-8');
        console.log(`Base64 icon data saved to ${outputFilePath}`);
    } catch (error) {
        console.error('Error writing to output file:', error);
    }
}

main();