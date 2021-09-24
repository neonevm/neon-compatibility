#!/bin/bash
../node_modules/.bin/truffle --network neonlabs migrate
# ../node_modules/.bin/truffle --network neonlabs migrate --reset --verbose-rpc

../node_modules/.bin/truffle --network neonlabs test ./test/token/access/AccessControl.test.js
../node_modules/.bin/truffle --network neonlabs test ./test/token/access/AccessControlEnumerable.test.js
../node_modules/.bin/truffle --network neonlabs test ./test/token/access/Ownable.test.js
