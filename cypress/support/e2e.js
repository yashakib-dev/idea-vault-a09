import "./commands";

// Prevent Cypress from failing tests when unhandled application exceptions occur
Cypress.on("uncaught:exception", (err) => {
  // Ignore Next.js hydration or client errors that don't break the user flow
  return false;
});

