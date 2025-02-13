// / <reference types="Cypress" />
// / <reference path="../../support/index.d.ts" />
import { mockErrorResponse } from "../../utils/mockErrorResponse";
import { popconfirmYesClassName } from "../../utils/popconfirm";

const patch = "5ecedafb562343215a7ff297";
const mainlineCommit = "5e4ff3abe3c3317e352062e4";
const versionPath = (id) => `/version/${id}`;

describe("Action Buttons", () => {
  before(() => {
    cy.login();
  });
  beforeEach(() => {
    cy.preserveCookies();
  });
  describe("When Viewing a patch build", () => {
    before(() => {
      cy.visit(versionPath(patch));
    });
    it("Clicking 'Schedule' button shows popconfirm and toast on success", () => {
      cy.dataCy("schedule-patch").click();
      cy.get(popconfirmYesClassName).contains("Yes").click({ force: true });
      cy.dataCy("toast").should("exist");
    });

    it("Error scheduling a version shows error toast", () => {
      cy.dataCy("schedule-patch").click();
      mockErrorResponse({
        errorMessage: "There was an error scheduling tasks",
      });
      cy.get(popconfirmYesClassName).contains("Yes").click({ force: true });
      cy.dataCy("toast").contains("error").should("exist");
    });

    it("Clicking ellipses dropdown shows ellipses options", () => {
      cy.dataCy("ellipsis-btn").click();
      cy.dataCy("card-dropdown").should("exist");
      cy.dataCy("ellipsis-btn").click();
      cy.dataCy("card-dropdown").should("not.exist");
    });
    describe("Version dropdown options", () => {
      beforeEach(() => {
        cy.dataCy("ellipsis-btn").click();
        cy.dataCy("card-dropdown").should("exist");
      });
      afterEach(() => {
        cy.dataCy("ellipsis-btn").click();
      });
      it("Error unscheduling a version shows error toast", () => {
        cy.dataCy("unschedule-patch").click();
        mockErrorResponse({
          errorMessage: "There was an error unscheduling tasks",
        });
        cy.get(popconfirmYesClassName).contains("Yes").click({ force: true });
        cy.dataCy("toast").contains("error").should("exist");
      });

      it("Clicking 'Unschedule' button show popconfirm with abort checkbox and a toast on success", () => {
        cy.dataCy("unschedule-patch").click();
        cy.dataCy("abort-checkbox").check({ force: true });
        cy.get(popconfirmYesClassName).contains("Yes").click({ force: true });
        cy.dataCy("toast").should("exist");
      });

      it("Clicking 'Set Priority' button shows popconfirm with input and toast on success", () => {
        const priority = "99";
        cy.dataCy("prioritize-patch").click();
        cy.dataCy("priority-input").clear().type(priority);
        cy.get(popconfirmYesClassName).contains("Set").click({ force: true });
        cy.dataCy("toast").contains(priority).should("exist");
      });

      it("Error setting priority shows error toast", () => {
        cy.dataCy("prioritize-patch").click();
        cy.dataCy("priority-input").clear().type("88");
        mockErrorResponse({
          errorMessage: "There was an error setting priority",
        });
        cy.get(popconfirmYesClassName).contains("Set").click({ force: true });
        cy.dataCy("toast").contains("error").should("exist");
      });
      it("Should be able to reconfigure the patch", () => {
        cy.dataCy("reconfigure-link").should("not.be.disabled");
        cy.dataCy("reconfigure-link").click();
        cy.location("pathname").should("include", "configure");
        cy.visit(versionPath(patch));
      });
    });
  });

  describe("When Viewing a mainline commit", () => {
    before(() => {
      cy.visit(versionPath(mainlineCommit));
    });
    describe("Version dropdown options", () => {
      beforeEach(() => {
        cy.dataCy("ellipsis-btn").click();
        cy.dataCy("card-dropdown").should("exist");
      });
      afterEach(() => {
        cy.dataCy("ellipsis-btn").click();
      });

      it("Reconfigure link is disabled for mainline commits", () => {
        cy.dataCy("reconfigure-link").should("have.attr", "disabled");
      });
      it("Should not be able to enqueue the version", () => {
        cy.dataCy("enqueue-patch").should("be.disabled");
      });
    });
  });
});
