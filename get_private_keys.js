#!/usr/bin/env node
"use strict";

require('dotenv').config({path: '../.env'});

const axios = require("axios");
const Web3 = require("web3");

const getStringValue = (input) => {
    return input === undefined ? '' : input;
};

const getBooleanValue = (input) => {
    return input.toUpperCase() === "TRUE";
};

const Config = {
    faucetUrl: getStringValue(process.env.FAUCET_URL),
    useFaucet: getBooleanValue(process.env.USE_FAUCET),
    requestAmount: Number.parseInt(getStringValue(process.env.REQUEST_AMOUNT)),
    usersNumber: Number.parseInt(getStringValue(process.env.USERS_NUMBER))
};

if (Config.useFaucet) {
    if (Config.faucetUrl.length === 0) {
        Config.useFaucet = false;
        console.error('Unable to request faucet: FAUCET_URL is empty');
    } else {
        console.error(`Use faucet: ${Config.faucetUrl}`)
    }
} else {
    console.error(`Skipping faucet requests: USE_FAUCET set to false`);
}


function delay(ms) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


const requestFaucet = async (wallet, amount) => {
    if (!Config.useFaucet) {
        return;
    }
    const data = {amount: amount, wallet: wallet};
    try {
        console.error(`Request ${amount} tokens for the wallet ${wallet} from the faucet ${Config.faucetUrl}`)
        const resp = await axios.post(Config.faucetUrl, data);
        console.error(`Faucet response code: ${resp.status}`);
    } catch (err) {
        console.error(`Failed to send request to the faucet: ${err.response.status} ${err.response.data}`);
    }
};

const web3 = new Web3(
    new Web3.providers.HttpProvider(Config.proxyUrl, 3000000)
);

const main = async () => {
    let privateKeys = [];
    let publicKeys = [];

    const requests = Array.from(Array(Config.usersNumber), async (_, x) => {
        const acc = web3.eth.accounts.create();

        privateKeys.push(acc.privateKey);
        publicKeys.push(acc.address);

        return (async (address, amount) => requestFaucet(address, amount))(
            acc.address,
            Config.requestAmount
        );
    });

    await delay(3000);
    [0, 1, 2].forEach((i) => {
            requests.push((async (address, amount) => requestFaucet(address, amount))(
                publicKeys[i],
                Config.requestAmount - Math.round(Math.random() * 100)
            ))
    })

    for (const request of requests) {
        await request;
    }

    console.log(privateKeys.join(','))
};

main()
    .then(() => process.exit(process.exitCode))
    .catch((error) => {
        console.error(`Failed to get private keys: ${error}`);
        process.exit(1);
    });
