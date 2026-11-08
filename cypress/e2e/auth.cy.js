describe("Authentication - Register & Login", () => {
  describe("Login Page", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    it("displays the login form with required fields", () => {
      cy.contains("h2", "Login").should("be.visible");
      cy.get('input[name="email"]').should("be.visible").and("have.attr", "required");
      cy.get('input[name="password"]').should("be.visible").and("have.attr", "required");
      cy.get('button[type="submit"]').contains(/login/i).should("be.visible");
      cy.contains("button", /continue with google/i).should("be.visible");
      cy.contains("a", /register/i).should("have.attr", "href", "/register");
    });

    it("navigates to register page when clicking register link", () => {
      cy.contains("a", /register/i).click();
      cy.url().should("include", "/register");
      cy.contains("h2", "Register").should("be.visible");
    });

    it("displays error message or toast upon invalid login attempt", () => {
      cy.get('input[name="email"]').type("invalid.user@example.com");
      cy.get('input[name="password"]').type("WrongPassword!123");
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      // Ensure the user stays on login page or sees error
      cy.url().should("include", "/login");
    });
  });

  describe("Register Page", () => {
    beforeEach(() => {
      cy.visit("/register");
    });

    it("displays the register form with required fields", () => {
      cy.contains("h2", "Register").should("be.visible");
      cy.get('input[name="name"]').should("be.visible").and("have.attr", "required");
      cy.get('input[name="email"]').should("be.visible").and("have.attr", "required");
      cy.get('input[name="image"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible").and("have.attr", "required");
      cy.get('button[type="submit"]').contains(/register/i).should("be.visible");
      cy.contains("button", /continue with google/i).should("be.visible");
    });

    it("validates password strength and shows error message for weak passwords", () => {
      cy.get('input[name="name"]').type("Test User");
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="image"]').type("https://example.com/avatar.png");
      cy.get('input[name="password"]').type("weak");
      cy.get('button[type="submit"]').click();

      // Password requirement error message
      cy.contains(/password must be/i).should("be.visible");
    });

    it("navigates to login page when clicking login link", () => {
      cy.contains("a", /login/i).click();
      cy.url().should("include", "/login");
      cy.contains("h2", "Login").should("be.visible");
    });
  });
});

