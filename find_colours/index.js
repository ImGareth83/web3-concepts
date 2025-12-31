import { sha256 } from "ethereum-cryptography/sha256.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";

// the possible colors that the hash could represent
const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

// given a hash, return the color that created the hash
function findColor(hash) {
    const target = toHex(hash);

    for (const color of COLORS) {
        const hashedColor = sha256(utf8ToBytes(color));
        if (toHex(hashedColor) === target) {
            return color;
        }
    }

    throw new Error('Unknown colour hash');
    
    
}

export default findColor;