const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(inboxPath, 'utf-8');

const solc_input = {
    "language" : "Solidity",
    "sources": {
        'Lottery.sol' : {
            content : source
        }
    },
    "settings": {
        "outputSelection": {
          '*': {
            '*': ['*']
          }
        }
      }
};

const output = JSON.parse(solc.compile(JSON.stringify(solc_input)));
const contracts = output.contracts;


module.exports = contracts['Lottery.sol']['Lottery'];
