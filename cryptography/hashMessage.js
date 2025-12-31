import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function hashMessage(message) {
    const byte = utf8ToBytes(message);
    return keccak256(byte);
}

export default hashMessage;