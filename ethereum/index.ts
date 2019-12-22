/**
 * Solidity Script checker
 * Copyright 2019 (c) Ayane Satomi
 */
import VM from 'ethereumjs-vm';
import * as assert from 'assert';
import * as util from 'ethereumjs-util';
import * as fs from 'fs';
import { promisify } from 'util' ;
import Account from 'ethereumjs-account';
import { Transaction } from 'ethereumjs-tx';
import abi = require('ethereumjs-abi');
import solc = require('solc');

function getSolcOutput () {
    return {
        language: 'Solidity',
        sources: {
            'contracts/IPFSDelegate.sol': {
                content: fs.readFileSync(`${__dirname}/contracts/IPFSDelegate.sol`, 'utf8')
            }
        },
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            },
            evmVersion: 'petersburg',
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode']
                }
            }
        }
    }
}

function compileContracts() {
    const i = getSolcOutput();
    const o = JSON.parse(solc.compile(JSON.stringify(i)));

    let compileFailed = false;

    if (o.errors) {
        for (const e of o.errors) {
            if (e.severity === 'error') {
                console.error(e.formattedMessage);
                compileFailed = true;
            } else {
                console.warn(e.formattedMessage);
            }
        }
    }

    if (compileFailed) {
        return undefined;
    }

    return o;
}

function getDelegateBytecode(solcOutput: any) : any {
    return solcOutput.contracts['contracts/IPFSDelegate.sol'].IPFSDelegate.evm.bytecode.object;
}

async function getAccountNonce(vm: VM, accountPrivateKey: Buffer) {
    const account = (await promisify(vm.stateManager.getAccount.bind(vm.stateManager))(
        util.privateToAddress(accountPrivateKey)
    )) as Account;

    return account.nonce;
}

async function deployContract (vm: VM, senderPrivateKey: Buffer, deploymentBytecode: Buffer, ipfsHash: string): Promise<Buffer> {
    const params = abi.rawEncode(['string'], [ipfsHash])

    const tx = new Transaction({
        value: 0,
        gasLimit: 2000000,
        gasPrice: 1,
        data: `0x${deploymentBytecode + params.toString('hex')}`,
        nonce: await getAccountNonce(vm, senderPrivateKey)
    })

    tx.sign(senderPrivateKey);

    const deploymentRes = await vm.runTx({tx});

    if (deploymentRes.execResult.exceptionError) {
        throw deploymentRes.execResult.exceptionError;
    }

    return deploymentRes.createdAddress;
}

async function setIPFSHash(vm: VM, senderPrivateKey: Buffer, contractAddress: Buffer, ipfsHash: string) {
    const params = abi.rawEncode(['string'], [ipfsHash]);

    const tx  = new Transaction({
        to: contractAddress,
        value: 0,
        gasLimit: 2000000,
        gasPrice: 1,
        data: `0x${abi.methodID('sendHash', ['string']).toString('hex') + params.toString('hex')}`,
        nonce: await getAccountNonce(vm, senderPrivateKey)
    })

    tx.sign(senderPrivateKey)

    const res = await vm.runTx({tx});

    if (res.execResult.exceptionError) {
        throw res.execResult.exceptionError;
    }
}

async function getIPFSHash(vm: VM, contractAddress: Buffer, caller: Buffer) {
    const res = await vm.runCall({
        to:contractAddress,
        caller: caller, // assume tx.origin is also the caller
        origin: caller,
        data: abi.methodID('ipfsHash', [])
    })

    if (res.execResult.exceptionError) {
        throw res.execResult.exceptionError;
    }

    const returnRes = abi.rawDecode(['string'], res.execResult.returnValue);

    return returnRes[0];
}

async function main() {
    const accountPubKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex');
    const accountAddress = util.privateToAddress(accountPubKey);

    console.log("Solidity IPFS tester\n\nVersion 0.0.1");
    console.log(`Address: ${util.bufferToHex(accountAddress)}`);

    const acc = new Account({balance: 1e18});
    const vm = new VM();

    await promisify(vm.stateManager.putAccount.bind(vm.stateManager))(accountAddress, acc);

    console.log('Account set with 1ETH balance');

    console.log('Compiling IPFS Script...');

    const solcOutput = compileContracts();

    if (solcOutput === undefined) {
        throw new Error("Bruh Moment: Compilation failed.");
    } else {
        console.log("Success! Contract is compiled.");
    }

    const bytecode = getDelegateBytecode(solcOutput);

    console.log("Deploying Contract.... If this fails, blame Ovy <3");

    const contractAddress = await deployContract(vm, accountPubKey, bytecode, 'testHash');
    console.log(`Contract Address: ${util.bufferToHex(contractAddress)}`);

    const outputKey = await getIPFSHash(vm, contractAddress, accountAddress);

    console.log(`Contract RPC output: ${outputKey}`);

    //check if its EXACTLY what we got
    assert.equal(outputKey, 'testHash');
}

main().then(() => process.exit(0))
      .catch(e => {
          console.error(e);
          process.exit(1);
      })