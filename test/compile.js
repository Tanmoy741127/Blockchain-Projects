const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, 'utf-8');

const solc_input = {
    "language" : "Solidity",
    "sources": {
        'Inbox.sol' : {
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


module.exports = contracts['Inbox.sol']['Inbox'];
