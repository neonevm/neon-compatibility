FROM node:14

#RUN apt-get update
#RUN DEBIAN_FRONTEND=noninteractive apt-get install -y npm
#RUN rm -rf /var/lib/apt/lists/*

COPY package.json openzeppelin-contracts /opt/

WORKDIR /opt/

RUN npm install -g
RUN npm ci
RUN npm run build --if-present
COPY openzeppelin-contracts /opt/openzeppelin-contracts
RUN mkdir /opt/openzeppelin-contracts/pout

WORKDIR /opt/openzeppelin-contracts
RUN npm install

RUN npx hardhat compile

COPY run-test.sh ./

#RUN npm install dotenv axios
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y parallel
RUN cp /opt/openzeppelin-contracts/hardhat.config.js /opt/openzeppelin-contracts/hardhat.config.js.back
COPY hardhat.config.js /opt/openzeppelin-contracts

# TODO: if you have slow connection uncoment to prevent timeout estimation during downloading solc compiler
RUN curl https://binaries.soliditylang.org/linux-amd64/solc-linux-amd64-v0.8.10+commit.fc410830 -o /root/.cache/hardhat-nodejs/compilers/linux-amd64/solc-linux-amd64-v0.8.10+commit.fc410830
ENTRYPOINT [ "/bin/bash" ]
