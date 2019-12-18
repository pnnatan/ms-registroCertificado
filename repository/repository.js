const connect = require('../config/connectionBlockchain');
const ethers = require('ethers');
const mongodb = require("../config/mongodb")

// Returns a specific document by searching for ID.
async function returnDocument(id) {
  try {
    let response = await connect.connectContractRead().getCertificateBlockchain(id);

    // Smart contract returns a vector response["id", "document", "timestamp"].
    let document = {
      "id": response[0],
      "document": response[1],
      "timestamp": response[2]
    }

    return document;
  } catch (e) {
    console.log('Error happend while connecting to the Blockchain: ', e.message)
    return (e.message)
  }
}

// Returns a list of IDs of each document registered in order of storage on blockchain.
async function getAllDocuments() {
  try {
    let response = await connect.connectContractRead().getAllCertificateBlockchain();
    console.log(response);
    return response;
  } catch (e) {
    console.log('Error happend while connecting to the Blockchain: ', e.message)
  }
}

// Register a document on blockchain.
async function registerDocument(id, document, privateKey, date) {
  try {
    var options = {
      gasLimit: 3000000,
      gasPrice: ethers.utils.parseUnits('9.0', 'gwei')
    }
    await connect.connectContractWrite(privateKey).includeCertificateBlockchain(id, document, date, options);
    await sleep(30000); // Considering the duration of a transaction to be effective
    return true;
  } catch (err) {
    console.log('Error happend while connecting to the Blockchain: ', err.message);
    return false;
  }
}

function getAllDocumentsBD(callback) {
  mongodb.connect((err, db) => {
    db.collection("registroCertidoes-collection").find().toArray(callback);
  })
}

function insertRegistroCertidao(registroCertidao) {
  mongodb.connect((err, db) => {
    db.collection("registroCertidoes-collection").insertOne(registroCertidao)
  });
}

function disconnect() {
  return mongodb.disconnect();
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

module.exports = {getAllDocumentsBD, getAllDocuments, returnDocument, registerDocument, disconnect, insertRegistroCertidao }

