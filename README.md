# UAT for 3rd parties' compatibility

## Preparation
### Globally
```
brew install python
brew install pipenv
brew install node
brew install npm
```

### Solution-level Node.js
```
cd neon-uat
npm i
npm audit fix
```
### Solution-level Python
```
cd neon-uat
pipenv sync
```

## Run
```
cd neon-uat
pipenv shell
pytest -rP --alluredir=allure-results
allure serve
```
