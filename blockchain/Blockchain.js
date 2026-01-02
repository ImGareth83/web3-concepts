import Block from './Block.js';

class Blockchain {
    constructor() {
        this.chain = [new Block('Genesis')];
    }

    addBlock(newBlock) {
        const prevBlock = this.chain[this.chain.length-1];
        newBlock.previousHash = prevBlock.toHash();
        this.chain.push(newBlock);
    }

    isValid(){
        for (let i = 1; i < this.chain.length; i++) {
            let current = this.chain[i];
            let previous = this.chain[i-1];
            if (current.previousHash !== previous.toHash()) {
                return false;
            }
        }
        return true;
        
    }
}


export default Blockchain;