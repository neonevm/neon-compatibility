#!/bin/bash
echo "======================================================================"
echo "======= ../node_modules/.bin/truffle --network neonlabs compile ======"
echo "======================================================================"
# ../node_modules/.bin/truffle --network neonlabs compile
../node_modules/.bin/truffle compile

echo "======================================================================"
echo "======= ../node_modules/.bin/truffle --network neonlabs migrate ======"
echo "======================================================================"
../node_modules/.bin/truffle --network neonlabs migrate
# ../node_modules/.bin/truffle --network neonlabs migrate --reset --verbose-rpc

find "$(pwd)" | grep test.js | ../node_modules/.bin/truffle --network neonlabs test $_
mv ./allure-results/ ../report/
exit

echo "======================================================================"
echo "======= ../node_modules/.bin/truffle --network neonlabs test ./test/access/AccessControl.test.js ======"
echo "======================================================================"
../node_modules/.bin/truffle --network neonlabs test ./test/access/AccessControl.test.js

echo "======================================================================"
echo "======= ../node_modules/.bin/truffle --network neonlabs test ./test/access/AccessControlEnumerable.test.js ======"
echo "======================================================================"
../node_modules/.bin/truffle --network neonlabs test ./test/access/AccessControlEnumerable.test.js

echo "======================================================================"
echo "======= ../node_modules/.bin/truffle --network neonlabs test ./test/access/Ownable.test.js ======"
echo "======================================================================"
../node_modules/.bin/truffle --network neonlabs test ./test/access/Ownable.test.js

mv ./allure-results/ ../report/
