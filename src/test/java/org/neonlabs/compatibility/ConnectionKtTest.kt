package org.neonlabs.compatibility

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class ConnectionKtTest {
    @Test
    fun shouldWork() {
        assertEquals(1, ConnectionKt().getId(), "kotlin")
    }
}
