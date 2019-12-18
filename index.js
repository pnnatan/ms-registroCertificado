require("dotenv-safe").config();
const registroCertidao = require('./api/registroCertidao');
const server = require("./server/server");
const repository = require("./repository/repository");

 
server.start(registroCertidao, repository, (err, app) => { 
    // verbose logging when we are starting the server
    console.log('--- Clients Service Connected ---')
});

