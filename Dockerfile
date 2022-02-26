FROM node:14

COPY openzeppelin-contracts reporterConfig.json /opt/
COPY package.json /opt/openzeppelin-contracts/

COPY openzeppelin-contracts /opt/openzeppelin-contracts
RUN mkdir /opt/openzeppelin-contracts/pout

COPY hardhat.config.js /opt/openzeppelin-contracts
WORKDIR /opt/openzeppelin-contracts
RUN npm ci


COPY run-test.sh ./

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y parallel

## TODO: if you have slow connection uncoment to prevent timeout estimation during downloading solc compiler
#RUN curl https://binaries.soliditylang.org/linux-amd64/solc-linux-amd64-v0.8.10+commit.fc410830 -o /root/.cache/hardhat-nodejs/compilers/linux-amd64/solc-linux-amd64-v0.8.10+commit.fc410830
RUN npx hardhat compile

ENTRYPOINT [ "/bin/bash" ]
