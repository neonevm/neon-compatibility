#!/bin/bash

# for f in ./test; do
#     ls basename $f
# done

find "$(pwd)" | grep test.js | ../node_modules/.bin/truffle --network neonlabs test $_
exit


echo "======================================================================"
echo "======= ../node_modules/.bin/truffle --network neonlabs compile ======"
echo "======================================================================"
../node_modules/.bin/truffle --network neonlabs compile

echo "======================================================================"
echo "======= ../node_modules/.bin/truffle --network neonlabs migrate ======"
echo "======================================================================"
../node_modules/.bin/truffle --network neonlabs migrate
# ../node_modules/.bin/truffle --network neonlabs migrate --reset --verbose-rpc

# ../node_modules/.bin/truffle --network neonlabs test
# exit

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
