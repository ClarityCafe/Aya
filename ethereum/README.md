# The Ethereum IPFS delegate

This is where images are delegated to the Ethereum blockchain to be stored in IPFS.

## Testing

```
$ yarn
$ yarn test
```
This will create a mock Ethereum Node with 1ETH balance and run the code to upload to IPFS.

## Deploying

You'll need a Infura account to deploy this.

Go to [Infura's site](https://infura.io) to get one.


Make sure you create a secrets.json that contains your mnemonics and the API key, 
then run `yarn deploy`.