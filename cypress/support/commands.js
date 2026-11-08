// Custom Cypress commands for IdeaVault

Cypress.Commands.add("loginViaUI", (email = "demo.user@example.com", password = "Demo@12345") => {
  cy.visit("/login");
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('button[type="submit"]').contains(/login/i).click();
});

