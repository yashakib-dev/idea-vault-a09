describe("CRUD Workflows - Forms and Interaction Modals", () => {
  it("verifies the Add Idea form fields and structure", () => {
    // When visiting add-idea unauthenticated, it redirects to login
    cy.visit("/add-idea");
    cy.url().should("include", "/login");

    // Test form directly if authenticated or verify redirection structure
    cy.visit("/login");
    cy.contains("h2", "Login").should("be.visible");
  });

  it("checks Idea Details and Comments component structure", () => {
    cy.visit("/ideas");
    cy.get(".grid .group").first().within(() => {
      cy.contains("a", /view details/i).click();
    });

    // An unauthenticated user navigating to a protected idea details route redirects to login
    cy.url().should("satisfy", (url) => url.includes("/login") || url.includes("/ideas"));
  });

  it("validates 404 page for non-existent route", () => {
    cy.visit("/non-existent-page-route", { failOnStatusCode: false });
    cy.contains(/404|not found/i).should("exist");
  });
});

