require('babel-register');

const expect = require('chai').expect;

const Mimo = require('../Mimo.js');
const IPFS = require('ipfs');
const Web3 = require('web3');

console.log(process.env.INFURA_KEY)
// set up necessary nodes
const ipfs = new IPFS();
const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/${process.env.INFURA_KEY}`));


const EthCrypto = require('eth-crypto');

let sig;
let owner;
let alice;
let mimo;

// TODO: Check ipfs and web3 are connected
describe('Mimo.js Test Suite', () => {

    before((done) => {
        identity = EthCrypto.createIdentity();

        // Create Mimo Instance
        ipfs.on('ready', () => {
            console.log('IPFS ready...')
            mimo = new Mimo(web3, ipfs);
            done();
        });
    });


    it.only('should create a profile', async () => {
       
        // First check if a database exists
        const ensName = "mimoapp.eth";

        try{
            // Set up a DB for an ENS name
            alice = await mimo.createProfile(ensName);
            // save the DB address to the blockchain
            mimo.saveProfile(alice, identity.address);
        }catch(e){
            console.log(e);
        }
        console.log('opening profile')
        const aliceCheck = await mimo.openProfile(ensName);

        // Check alice exists
        console.log(aliceCheck);

    });

    it('should add a signature', async () => {

        const claim = '5 stars';

        // Create a signature via module
        const signature = EthCrypto.sign(
          identity.privateKey, 
          EthCrypto.hash.keccak256(claim)
        );

        bob.add({bio: 'I <3 ETH!'}, signature);

        // Get all data published to a user's DB
        const logs = await mimo.getHistory('bobsburgers.eth');
        console.log(logs);

        // expect(logs.length > 0).to.be.equal(true);

    });
});