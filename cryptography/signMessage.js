import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { hexToBytes } from "ethereum-cryptography/utils";
import hashMessage from './hashMessage.js';

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

async function signMessage(msg) {
    const messageHash = hashMessage(msg);
    const privateKeyBytes = hexToBytes(PRIVATE_KEY);
    const signature = secp256k1.sign(messageHash, privateKeyBytes);
    return signature;
}

export default signMessage;