# UAT for 3rd parties' compatibility

## Preparation

This instruction suggest using package managers heavily, you can obtain brew here:
https://brew.sh/index
or use any alternative solution like SDKMAN, native package managers, etc
Detailed instruction for Linux is here: https://docs.brew.sh/linux

### Globally (Mac OSX)
```
brew install python@3.8
brew install pipenv
brew install node
# npm is already here, otherwise brew install npm

brew install allure
```

### Globally (Ubuntu 20.04)
```
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
```
cd neon-uat
npm i
npm audit fix --force
```
### Solution-level Python
```
cd neon-uat
pipenv sync
```

### Network
Copy content of an environment file into .env in the root of the solution
| File name     | Goal                                 |
| ------------- | ------------------------------------ |
| .env          | Test solution uses this one as input |
| .env.internal.testnet  | Our internal testnet        |
| .env.local   | Connection to a dockerizedd env       |

## Run
```
cd neon-uat
pipenv shell
pytest -rP --alluredir=allure-results
allure serve
```
