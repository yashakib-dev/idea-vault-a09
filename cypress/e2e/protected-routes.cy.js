describe("Protected Routes Redirection", () => {
  it("redirects unauthenticated user from /add-idea to /login", () => {
    cy.visit("/add-idea");
    cy.url().should("include", "/login");
    cy.url().should("include", "callbackUrl");
    cy.contains("h2", "Login").should("be.visible");
  });

  it("redirects unauthenticated user from /my-ideas to /login", () => {
    cy.visit("/my-ideas");
    cy.url().should("include", "/login");
    cy.url().should("include", "callbackUrl");
    cy.contains("h2", "Login").should("be.visible");
  });

  it("redirects unauthenticated user from /my-interactions to /login", () => {
    cy.visit("/my-interactions");
    cy.url().should("include", "/login");
    cy.url().should("include", "callbackUrl");
    cy.contains("h2", "Login").should("be.visible");
  });

  it("redirects unauthenticated user from /ideas/[id] to /login", () => {
    cy.visit("/ideas/64f0dfc7d1144d3c1fef1234");
    cy.url().should("include", "/login");
    cy.url().should("include", "callbackUrl");
    cy.contains("h2", "Login").should("be.visible");
  });
});

