FROM node:14

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y parallel

RUN mkdir -p /opt/openzeppelin-contracts/pout

ADD openzeppelin-contracts/ /opt/openzeppelin-contracts/


WORKDIR /opt/openzeppelin-contracts

COPY run-test.sh hardhat.config.js package*.json /opt/openzeppelin-contracts/



RUN npm install



## TODO: if you have slow connection uncoment to prevent timeout estimation during downloading solc compiler
#RUN curl https://binaries.soliditylang.org/linux-amd64/solc-linux-amd64-v0.8.10+commit.fc410830 -o /root/.cache/hardhat-nodejs/compilers/linux-amd64/solc-linux-amd64-v0.8.10+commit.fc410830

ENTRYPOINT [ "/bin/bash" ]
