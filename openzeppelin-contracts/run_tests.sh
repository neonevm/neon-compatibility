#!/bin/bash
echo "======================================================================"
echo "======= ../node_modules/.bin/truffle --network neonlabs migrate ======"
echo "======================================================================"
../node_modules/.bin/truffle --network neonlabs migrate
# ../node_modules/.bin/truffle --network neonlabs migrate --reset --verbose-rpc

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
