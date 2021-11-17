# Neon EVM Test Truffle suit

## How to get started

* Install truffle globally if not installed using the command `npm install -g truffle`
* Clone the project and then use the command `npm i` to install all the dependencies
* Create a `secrets.json` file with contents as
```js
{
    "mnemonic": "<12 word mnemonic>"
}
```
* Run the contracts on Neon Devnet using the command `truffle migrate --network neonDev --reset`
* Run the contracts on Neon Testnet using the command `truffle migrate --network neonTest --reset`

## Contributions

Contributions are welcomed. Feel free to raise PR with more contracts and test situations in migrations file. 
