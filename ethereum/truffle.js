const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require("fs");

let secrets;

if (fs.existsSync('./secrets.json')) {
    secrets = JSON.parse(fs.readFileSync('./secrets.json', 'utf8'));
}

module.exports = {
    networks: {
        rinkeby: {
            network_id: '*',
            provider: new HDWalletProvider(secrets.mnemonic, "https://rinkeby.infura.io/v3/" + secrets.infuraApiKey)
        }
    }
}