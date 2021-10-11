package org.neonlabs.compatibility

import io.github.cdimascio.dotenv.Dotenv

class ConfigKt {
    val config = Dotenv.configure().systemProperties().load()
    val proxyUrl = config["PROXY_URL"]
    val faucetUrl = config["FAUCET_URL"]
    val networkName = config["NETWORK_NAME"]
    val networkId = config["NETWORK_ID"]
    val addressFrom = config["ADDRESS_FROM"]
    val addressTo = config["ADDRESS_TO"]
    val disableConfirmation = config["DISABLE_CONFIRMATION"]
    val privateKey = config["PRIVATE_KEY"]
    val faucetQuotient = config["FAUCET_QUOTIENT"]
}
