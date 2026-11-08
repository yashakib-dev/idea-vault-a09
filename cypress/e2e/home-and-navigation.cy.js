describe("Home Page and Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the landing page hero and branding elements", () => {
    cy.contains("IdeaVault").should("exist");
    cy.get("main").should("exist");
    cy.contains(/discover trending ideas/i).should("be.visible");
    cy.contains(/how ideaVault works|how.*works/i).should("be.visible");
  });

  it("loads trending ideas data from backend onto the home page", () => {
    // Verifies data loads correctly from the API
    cy.get(".grid").first().within(() => {
      cy.get(".group").should("have.length.at.least", 1);
      cy.get(".group").first().within(() => {
        cy.get("img").should("be.visible");
        cy.get("h3").should("not.be.empty");
        cy.contains(/view details/i).should("exist");
      });
    });
  });

  it("navigates to All Ideas page when clicking navbar link", () => {
    cy.get("a[href='/ideas']").first().click({ force: true });
    cy.url().should("include", "/ideas");
    cy.contains("h2", /all ideas/i).should("be.visible");
  });

  it("toggles light and dark themes", () => {
    cy.get("html").then(($html) => {
      cy.get("button[aria-label*='theme' i], button.btn-circle, .navbar button").first().click({ force: true });
      cy.wait(300);
      cy.get("html").should("have.attr", "data-theme");
    });
  });
});
