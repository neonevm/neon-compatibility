package org.neonlabs.compatibility.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Contains a model.
 */
@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class FaucetRequest {
  String wallet;
  Integer amount;
}
