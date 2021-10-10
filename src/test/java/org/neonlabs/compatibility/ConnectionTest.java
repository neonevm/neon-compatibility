package org.neonlabs.compatibility;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import io.qameta.allure.Description;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.junit.jupiter.api.Test;

@Epic("Java frameworks")
@Feature("web3j")
class ConnectionTest {
  @Test
  @Description("allure description")
  @Story("allure story")
  void probe() {
    assertEquals(1, new Connection().getId(), "sample assertion");
  }

  @Test
  @Description("Connection web3j")
  @Story("Connection")
  void shouldConnectToNetwork() {
    var config = new Config();
    assertNotNull(config.getProxyUrl());
    assertNotNull(config.getFaucetUrl());
  }
}
