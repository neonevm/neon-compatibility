# Test suites for checking 3rd parties' compatibility
This repository contains compatibility tests for neon-env from different sources which runs in ci pipeline and 
check how neon-evm compatible with ethereum.

## Reports

This project uses ALlure for test reporting.

Reports available at: http://docs.neon-labs.org/neon-compatibility/


## OpenZeppelin contracts testing
1. Install node.js, allure (see the instruction below)
2. Install neon-compatibility dependencies
3. Update openzeppelin-contracts submodule 
```bash
git submodule update --init --recursive
```
4. Install openzeppelin dependencies

```bash
npm i
cd openzeppelin-contracts
npm i
```

4. To work with the network of your interest copy or link the appropriate .env.* file into .env in the root of the solution

| File                  | Description         |
| :-------------------- | :------------------ |
| .env.devnet           | Devnet              |
| .env.testnet          | Testnet             |
| .env.internal.testnet | Test stand          |
| .env.local            | Local run in Docker |

```bash
# in the neon-compatibility folder
rm .env
ln -s ./.env.local ./.env
```

5. Run content of the .github/actions/openzeppelin-preparation, namely (assuming you are in the neon-compatibility folder):

```bash
# in the neon-compatibility folder
rm -rf openzeppelin-contracts
git submodule update --init --recursive
cd openzeppelin-contracts
mkdir allure-results
cp ../categories.json allure-results
cp ../hardhat.config.js ./
```

Now you have:
- the ./openzeppelin-contracts folder with some files and folders
- the ./openzeppelin-contracts/hardhat.config.js file has the same content as ./hardhat.config.js with changes for neon testing
- there is the ./openzeppelin-contracts/allure-results folder and categories.json inside it
6. Run all the tests

```bash
# in the neon-compatibility/openzeppelin-contracts folder
npx hardhat test
```

7. Or run a subfolder with tests, for example

```bash
# in the neon-compatibility/openzeppelin-contracts folder
find "$(pwd)/test/finance" | grep test.js | echo $_ | ../node_modules/.bin/hardhat test $_
```

8. Or run a single test

```bash
# in the neon-compatibility/openzeppelin-contracts folder
../node_modules/.bin/hardhat test ./test/access/AccessControl.test.js
```

9. Having finished, tests leave after themselves folder with test results ./openzeppelin-contracts/allure-results
and you are ready to run allure and get the report

```bash
# in the neon-compatibility/openzeppelin-contracts folder
allure serve
```

You can if you with install hardhat globally by issuing the following command:

```bash
# in any folder
npm i -g hardhat
```

## Preparation

This instruction suggest using package managers heavily, you can obtain brew here:
https://brew.sh/index
or use any alternative solution like SDKMAN, native package managers, etc
Detailed instruction for Linux is here: https://docs.brew.sh/linux

### Globally (Mac OSX)

```bash
brew install python@3.8
brew install pipenv
brew install node
# npm is already here, otherwise brew install npm

brew install allure
```

### Globally (Ubuntu 20.04)

```bash
# assuming that there already is Python 3.8.10,
# otherwise install it by issuing brew install python@3.8
# or any alternate package manager

# pip
# https://pip.pypa.io/en/stable/installation/
sudo apt install python3-pip
sudo -H pip3 install --upgrade pip

# pipenv
# https://pipenv.pypa.io/en/latest/
# https://docs.pipenv.org/install/
sudo apt install pipenv
pip install pipenv

# Node.js, npm
# Do not use standard Linux package manager for installing Node.js
# prefer using brew or nvm
# https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04
brew install node
brew install npm

# Allure
# brew install gcc
sudo apt-add-repository ppa:qameta/allure
sudo apt-get update
sudo apt-get install allure
```

### Solution-level Node.js

```bash
cd neon-compatibility
npm i
npm audit fix --force
```

### Solution-level Python

```bash
cd neon-compatibility
pipenv --python 3.8
pipenv sync
```

## Run

```bash
cd neon-compatibility
pipenv shell
pytest -rP --alluredir=allure-results
allure serve
```

## Workflows
| Workflow | Push | Manual | Schedule |
| :---         | :---         | :---         | :---         |
| Consecutive | - | + | 20:00 UTC |
| Parallel | - | + | - |
