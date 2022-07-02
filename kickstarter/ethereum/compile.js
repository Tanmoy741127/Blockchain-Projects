const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const vampaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(vampaignPath, 'utf-8');

const solc_input = {
    "language" : "Solidity",
    "sources": {
        'Campaign.sol' : {
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
fs.ensureDirSync(buildPath);

const output = JSON.parse(solc.compile(JSON.stringify(solc_input)));
const contracts = output.contracts;

fs.outputJSONSync(path.resolve(buildPath, "Campaign.json"), contracts['Campaign.sol']['Campaign']);
fs.outputJSONSync(path.resolve(buildPath, "CampaignFactory.json"), contracts['Campaign.sol']['CampaignFactory']);