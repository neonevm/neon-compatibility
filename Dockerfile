FROM node:14-slim

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y parallel python3

ADD openzeppelin-contracts/ /opt/openzeppelin-contracts/
WORKDIR /opt/openzeppelin-contracts/

RUN npm install
RUN npm install --save-dev dotenv axios mocha-multi-reporters allure-mocha

COPY reporterConfig.json parallel_report.py fix_allure.py /opt/
COPY run-test.sh hardhat.config.js get_private_keys.js /opt/openzeppelin-contracts/
RUN mkdir /opt/openzeppelin-contracts/pout

RUN npx hardhat compile


ENTRYPOINT [ "./run-test.sh" ]
