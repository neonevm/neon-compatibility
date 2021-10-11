package org.neonlabs.compatibility

import io.qameta.allure.Description
import io.qameta.allure.Epic
import io.qameta.allure.Feature
import io.qameta.allure.Story
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test

@Epic("Kotlin frameworks")
@Feature("KEthereum")
class ConnectionKtTest {
    @Test
    @Description("allure description")
    @Story("Connection")
    fun shouldWork() {
        assertEquals(1, ConnectionKt().getId(), "kotlin")
    }

    @Test
    @Description("Connection")
    @Story("Connection")
    fun shouldConnectToNetwork() {
        val config = ConfigKt()
        assertNotNull(config.proxyUrl)
        assertNotNull(config.faucetUrl)
    }
}
