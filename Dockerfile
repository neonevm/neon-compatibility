FROM node:14-slim

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y parallel python3

RUN mkdir -p /opt/openzeppelin-contracts/pout

ADD openzeppelin-contracts/ /opt/openzeppelin-contracts/
COPY reporterConfig.json parallel_report.py fix_allure.py /opt/

WORKDIR /opt/openzeppelin-contracts

COPY run-test.sh hardhat.config.js /opt/openzeppelin-contracts/

RUN npm install
RUN npm install --save-dev dotenv axios mocha-multi-reporters allure-mocha

ENTRYPOINT [ "/opt/openzeppelin-contracts/run-test.sh" ]
