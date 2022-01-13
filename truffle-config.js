const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
module.exports = {
  contracts_build_directory: "./src/contracts",

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `wss://ropsten.infura.io/ws/v3/ab356fb07337451c8284f004c0d054ae`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.10"
    }
  }
};
