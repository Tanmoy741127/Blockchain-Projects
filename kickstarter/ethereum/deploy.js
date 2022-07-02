const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const compiled_contract = require("./compile");
const abi = compiled_contract.abi;
const bytecode = compiled_contract.evm.bytecode.object;

const provider = new HDWalletProvider(
    'letter winner dish oven concert argue cry spare deal tip regular episode',
    'https://rinkeby.infura.io/v3/bd6619a9745a45b48c30a094b1f8a918'
);
const web3 = new Web3(provider);

const deploy = async()=>{
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({
            data: bytecode
        })
        .send({from: accounts[0], gas :'1000000'});
    
    console.log("Contract deployed at",result.options.address);
    console.log(JSON.stringify(abi));
    provider.engine.stop();
};

deploy();