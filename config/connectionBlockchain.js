//Connecting to an existing Contract
const ethers = require('ethers');

function connectContractWrite(privateKey, callback) {
    // The Contract interface
    const abi = [ { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "changeOwner", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_id", "type": "string" }, { "name": "_Certificate", "type": "string" }, { "name": "_date", "type": "string" } ], "name": "includeCertificateBlockchain", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "CertificatesList", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getAllCertificateBlockchain", "outputs": [ { "name": "", "type": "string[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_id", "type": "string" } ], "name": "getCertificateBlockchain", "outputs": [ { "components": [ { "name": "id", "type": "string" }, { "name": "Certificate", "type": "string" }, { "name": "date", "type": "string" } ], "name": "", "type": "tuple" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
    // Connect to the network
    const provider = ethers.getDefaultProvider('rinkeby');

    // The address from the above deployment
    let contractAddress = "0x2823ee308be93fe809ae279ebefbfbe6f5d469b8"
    let wallet = new ethers.Wallet(privateKey, provider);

    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    let contract = new ethers.Contract(contractAddress, abi, wallet);

    return contract;
}

function connectContractRead() {
    // The Contract interface
    const abi = [ { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "changeOwner", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_id", "type": "string" }, { "name": "_Certificate", "type": "string" }, { "name": "_date", "type": "string" } ], "name": "includeCertificateBlockchain", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "CertificatesList", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getAllCertificateBlockchain", "outputs": [ { "name": "", "type": "string[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_id", "type": "string" } ], "name": "getCertificateBlockchain", "outputs": [ { "components": [ { "name": "id", "type": "string" }, { "name": "Certificate", "type": "string" }, { "name": "date", "type": "string" } ], "name": "", "type": "tuple" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
    
    // Connect to the network
    const provider = ethers.getDefaultProvider('rinkeby');

    // The address from the above deployment example
    let contractAddress = "0x2823ee308be93fe809ae279ebefbfbe6f5d469b8";

    let mnemonic = "guard assist nation crush reopen connect cushion tired dynamic evidence horror dragon"
    let wallet = new ethers.Wallet.fromMnemonic(mnemonic);
    wallet = wallet.connect(provider);

    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    let contract = new ethers.Contract(contractAddress, abi, wallet);

    return contract;
}

module.exports = { connectContractWrite, connectContractRead }