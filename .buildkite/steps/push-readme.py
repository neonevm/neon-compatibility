#!/usr/bin/python

import requests
import os
import json
from requests.structures import CaseInsensitiveDict
import logging


logger = logging.getLogger("neon.dockerhubpushrm")

try:
    logger.debug("Getting DHUBU, DHUBP from environment")
    username = os.environ.get("DHUBU")
    password = os.environ.get("DHUBP")

    if username is None or password is None:
        logger.error("Failed to get username and password from environment")
        exit(1)
    url = 'https://hub.docker.com/v2/users/login'
    logger.debug("Request (post) JWT token from: " + url)
    response = requests.post(url, json={"username": username, "password": password})
    if response.status_code != 200:
        logger.error("Failed to get docker hub JWT token: {}".format(response.status_code))
        exit(1)
    token = response.json()["token"]

    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"
    headers["Authorization"] = "Bearer " + token
    headers["Content-Type"] = "application/json"
    logger.debug("Open DOCKERHUB.md")
    with open("DOCKERHUB.md") as readme_file:
        readme_data = readme_file.read()
        json_data = json.dumps({"full_description": readme_data})
        url = "https://hub.docker.com/v2/repositories/neonlabsorg/full_test_suite/"
        logger.debug("Request (patch) to update full_description at " + url)
        response = requests.patch(url, data=json_data, headers=headers)
        if response.status_code != 200:
            logger.error("Failed to patch README at neonlabsorg/full_test_suite: {}".format(response.status_code))
            exit(1)

    logger.debug("Dockerhub readme at neonlabsorg/full_test_suite updated")

except Exception as e:
    logger.error("Failed to update README at neonlabsorg/full_test_suite. Exception: {}".format(e))
    exit(1)
