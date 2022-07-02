const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");
const compiled_contract = require("../compile");

const abi = compiled_contract.abi;
const bytecode = compiled_contract.evm.bytecode.object;

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async()=>{
    // Fetch list of accounts
    accounts = await web3.eth.getAccounts();
    
    // use one of accounts to deploy contract

    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: bytecode,
            arguments: ['Tanmoy Hi']
        })
        .send({from: accounts[0], gas :'1000000'})

})

describe("Inbox", ()=>{
    it('deploys a contract', ()=>{
        assert.ok(inbox.options.address);
    })

    it('has default message',async()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Tanmoy Hi');
    })

    it('can change the message',async()=>{
        await inbox.methods.setMessage("Hi bro")
            .send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi bro');
    })
})