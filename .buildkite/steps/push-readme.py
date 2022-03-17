#!/usr/bin/python

import requests
import os
import json
from requests.structures import CaseInsensitiveDict

try:
    username = os.environ.get("DHUBU")
    password = os.environ.get("DHUBP")

    if username is None or password is None:
        print("Failed to get username and password from environment")
        exit(1)

    url = "https://hub.docker.com/v2/repositories/neonlabsorg/full_test_suite/"
    response = requests.post('https://hub.docker.com/v2/users/login', json={"username": username, "password": password})
    if response.status_code != 200:
        print("Failed to get docker hub JWT token: {}".format(response.status_code))
        exit(1)
    token = response.json()["token"]

    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"
    headers["Authorization"] = "Bearer " + token
    headers["Content-Type"] = "application/json"

    with open("../../DOCKERHUB.md") as readme_file:
        readme_data = readme_file.read()
        json_data = json.dumps({"full_description": readme_data})
        response = requests.patch(url, data=json_data, headers=headers)
        if response.status_code != 200:
            print("Failed to patch README at neonlabsorg/full_test_suite: {}".format(response.status_code))
            exit(1)

    print("Dockerhub readme at neonlabsorg/full_test_suite updated")

except Exception as e:
    print("Failed to update README at neonlabsorg/full_test_suite. Exception: {}".format(e))
    exit(1)
