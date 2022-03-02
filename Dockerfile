FROM node:14

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y parallel

RUN mkdir -p /opt/openzeppelin-contracts/pout

ADD openzeppelin-contracts/ /opt/openzeppelin-contracts/
COPY reporterConfig.json parallel_report.py fix_allure.py /opt/

WORKDIR /opt/openzeppelin-contracts

COPY run-test.sh hardhat.config.js package*.json /opt/openzeppelin-contracts/

RUN npm install

ENTRYPOINT [ "/bin/bash" ]
