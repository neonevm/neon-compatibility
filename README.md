# UAT for 3rd parties' compatibility

## Preparation
### Globally
```
npm i -g truffle
npm audit fix
```

### Solution-level Node.js
```
cd neon-uat
npm i
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
pytest -rP
```
