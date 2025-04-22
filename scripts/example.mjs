import { readFile } from "fs/promises";
import * as A7P from "a7p-js";

async function readFileAsBytes(path) {
    try {
        const buffer = await readFile(path); // returns a Buffer
        const byteArray = new Uint8Array(buffer); // convert to Uint8Array if needed
        return byteArray;
    } catch (err) {
        console.error("Failed to read file:", err);
        return null;
    }
}

// Example usage:
const bytes = await readFileAsBytes("./scripts/example.a7p").catch((err) =>
    console.log(err),
);
const payload = A7P.decode(bytes);

console.log(payload.profile);
console.log(payload.profile.switches);

const buf = A7P.encode(payload);
console.log(buf);
