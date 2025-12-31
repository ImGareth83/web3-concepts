import { secp256k1 } from "ethereum-cryptography/secp256k1";
import hashMessage from "./hashMessage.js";

async function recoverKey(message, signature, recoveryBit) {
    const messageHash = hashMessage(message);
    // Reconstruct signature from compact bytes and recovery bit
    const sig = secp256k1.Signature.fromCompact(signature).addRecoveryBit(recoveryBit);
    const recoveredPublicKey = sig.recoverPublicKey(messageHash);
    return recoveredPublicKey.toRawBytes(true); // Return compressed public key as bytes
}

export default recoverKey;