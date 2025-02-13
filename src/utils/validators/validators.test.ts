import { validatePatchId } from ".";

describe("validatePatchId", () => {
  test("Validates object ids", () => {
    expect(validatePatchId("5f74d99ab2373627c047c5e5")).toBeTruthy();
    expect(validatePatchId("5e6bb9e23066155a993e0f1a")).toBeTruthy();
    expect(
      validatePatchId("spruce_v2.11.1_60eda8722a60ed09bb78a2ff")
    ).toBeFalsy();
    expect(
      validatePatchId(
        "mongodb_mongo_master_16085c4b28bd438e1c7608d0aa645de1c1811e7f"
      )
    ).toBeFalsy();
  });
});
