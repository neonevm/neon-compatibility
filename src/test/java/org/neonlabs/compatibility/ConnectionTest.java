package org.neonlabs.compatibility;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
  @Story("Connection")
  void probe() {
    assertEquals(1, new Connection().getId(), "sample assertion");
  }
}
