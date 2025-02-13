// / <reference types="Cypress" />

describe("Viewing a patch", () => {
  before(() => {
    cy.login();
  });
  beforeEach(() => {
    cy.preserveCookies();
  });
  describe("Viewing a users own patch", () => {
    before(() => {
      cy.visit(
        "/task/mci_ubuntu1604_display_asdf_patch_a1d2c8f70bf5c543de8b9641ac1ec08def1ddb26_5f74d99ab2373627c047c5e5_20_09_30_19_16_47"
      );
    });
    it("Shows the patches name", () => {
      cy.dataCy("bc-patch").should("include.text", "Patch 234");
    });
    it("Clicking on the patch name breadcrumb from a task should take you to that version", () => {
      cy.dataCy("bc-patch").should("include.text", "Patch 234");
      cy.dataCy("bc-patch").click();
      cy.url().should("include", "/version/5f74d99ab2373627c047c5e5");
    });
    it("Clicking the 'My Patches' breadcrumb goes to the logged in user's Patches Page when the current patch belongs to the logged in user", () => {
      cy.contains("My Patches").click();
      cy.url().should("include", "/user/admin/patches");
    });
  });
  describe("Viewing another users patch", () => {
    before(() => {
      cy.visit(
        "/task/evergreen_ubuntu1604_dist_patch_33016573166a36bd5f46b4111151899d5c4e95b1_5ecedafb562343215a7ff297_20_05_27_21_39_46"
      );
    });
    it("Shows the patches name", () => {
      cy.dataCy("bc-patch").should("include.text", "Patch 1251");
    });
    it("Clicking on the patch name breadcrumb from a task should take you to that version", () => {
      cy.dataCy("bc-patch").should("include.text", "Patch 1251");
      cy.dataCy("bc-patch").click();
      cy.url().should("include", "/version/5ecedafb562343215a7ff297");
    });

    it("Clicking the 'other users' breadcrumb goes to the patch owners Patches Page", () => {
      cy.contains("Annie Black's").click();
      cy.url().should("include", "/user/annie.black/patches");
    });
  });
});

describe("Viewing a mainline commit", () => {
  before(() => {
    cy.login();
    cy.visit(
      "/task/evergreen_ubuntu1604_test_service_patch_5e823e1f28baeaa22ae00823d83e03082cd148ab_5e4ff3abe3c3317e352062e4_20_02_21_15_13_48"
    );
  });
  beforeEach(() => {
    cy.preserveCookies();
  });
  it("Shows the commit hash", () => {
    cy.dataCy("bc-version").should("include.text", "5e823e1");
  });
  it("Clicking the commit hash breadcrumb from a task should take you to that version", () => {
    cy.dataCy("bc-version").should("include.text", "5e823e1");
    cy.dataCy("bc-version").click();
    cy.url().should("include", "/version/5e4ff3abe3c3317e352062e4");
  });
  it.skip("Clicking on the commits link should take you to that versions waterfall", () => {
    cy.dataCy("bc-waterfall").should("include.text", "evergreen's commits");
    cy.contains("evergreen's commits").click();
    cy.url().should("include", "/commits/evergreen");
  });
});
