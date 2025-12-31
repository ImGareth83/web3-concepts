import hashMessage from './hashMessage.js';
import signMessage from './signMessage.js';
import recoverKey from './recoverKey.js';
import getAddress from './getAddress.js';
import { assert } from 'chai';
import { toHex, hexToBytes } from "ethereum-cryptography/utils";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

const helloWorldHex = '47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad';
const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
const EXPECTED_ADDRESS = "16bB6031CBF3a12B899aB99D96B64b7bbD719705";


describe('Hash Message', () => {
    it('should return the keccak256 hash of hello world', () => {
        const messageHash = hashMessage('hello world');

        assert.equal(toHex(messageHash), helloWorldHex);
    });
});

describe('Recover Key', () => {
    it('should recover the public key from a signed message', async () => {
        const signature = await signMessage('hello world');
        const sig = signature.toCompactRawBytes();
        const recoveryBit = signature.recovery;

        const publicKey = secp256k1.getPublicKey(hexToBytes(PRIVATE_KEY), true);

        const recovered = await recoverKey('hello world', sig, recoveryBit);

        assert.equal(toHex(recovered), toHex(publicKey));
    });
});

describe('Get Address', () => {
    it('should get the address from a public key', async () => {
        const publicKey = secp256k1.getPublicKey(hexToBytes(PRIVATE_KEY), false); // Use uncompressed for address
        
        const address = toHex(getAddress(publicKey));

        assert.equal(address.toLowerCase(), EXPECTED_ADDRESS.toLowerCase());
    });
});