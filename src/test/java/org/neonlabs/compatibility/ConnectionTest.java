package org.neonlabs.compatibility;

import static org.junit.jupiter.api.Assertions.assertEquals;

import io.qameta.allure.Description;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.junit.jupiter.api.Test;

@Epic("Java Epic")
@Feature("Java Feature")
class ConnectionTest {
  @Test
  @Description("allure description")
  @Story("Java Story")
  void probe() {
    assertEquals(1, 1, "sample assertion");
  }
}
