describe("Mobile Layout & Responsiveness", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.visit("/");
  });

  it("displays the hamburger menu button and hides desktop links", () => {
    // Desktop navigation container should be hidden on mobile
    cy.get(".navbar-center").should("not.be.visible");

    // Hamburger toggle should be visible
    cy.get(".navbar-start .dropdown label").should("be.visible");
  });

  it("opens mobile dropdown navigation on toggle and contains page links", () => {
    // Open hamburger dropdown
    cy.get(".navbar-start .dropdown label").click();

    // Dropdown list should now be visible with navigation links
    cy.get(".navbar-start .dropdown-content").should("be.visible");
    cy.get(".navbar-start .dropdown-content").within(() => {
      cy.contains("a", "Home").should("be.visible");
      cy.contains("a", "Ideas").should("be.visible");
      cy.contains("a", "Add Idea").should("be.visible");
      cy.contains("a", "My Ideas").should("be.visible");
      cy.contains("a", "My Interactions").should("be.visible");
    });
  });

  it("renders ideas in a responsive single-column layout on mobile", () => {
    cy.visit("/ideas");
    cy.viewport("iphone-x");

    cy.contains("h2", "All Ideas").should("be.visible");
    cy.get('input[placeholder*="Search ideas"]').should("be.visible");

    // Cards should stack responsively within viewport width
    cy.get(".grid .group").first().then(($card) => {
      const cardWidth = $card.width();
      expect(cardWidth).to.be.lessThan(400);
    });
  });
});

