describe("All Ideas - Data Loading & Filtering", () => {
  beforeEach(() => {
    cy.visit("/ideas");
  });

  it("loads ideas correctly and displays idea cards", () => {
    cy.contains("h2", "All Ideas").should("be.visible");
    cy.get('input[placeholder*="Search ideas"]').should("be.visible");
    cy.get("select").should("be.visible");

    // Check that idea cards are rendered
    cy.get(".grid .group").should("have.length.at.least", 1);
    cy.get(".grid .group").first().within(() => {
      cy.get("h3").should("not.be.empty");
      cy.get("p").should("exist");
    });
  });

  it("filters ideas dynamically via the search input", () => {
    cy.get('input[placeholder*="Search ideas"]').clear().type("e");
    cy.wait(1000);
    cy.get("body").should("be.visible");
    cy.get(".grid .group").should("have.length.at.least", 1);
  });

  it("filters ideas by category selection", () => {
    cy.get("select").select("Tech");
    cy.wait(1000);

    // If Tech ideas exist, their category tag should display Tech
    cy.get("body").then(($body) => {
      if ($body.find(".grid .group").length > 0) {
        cy.get(".grid .group").first().should("contain.text", "Tech");
      }
    });

    // Reset back to All
    cy.get("select").select("All");
    cy.wait(1000);
    cy.get(".grid .group").should("have.length.at.least", 1);
  });
});
