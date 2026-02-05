describe('Recipe Book App - Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display login page by default', () => {
    cy.contains('Login').should('be.visible');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
  });

  it('should navigate to register page', () => {
    cy.contains('Register').click();
    cy.url().should('include', '/register');
    cy.contains('Register').should('be.visible');
  });

  it('should register a new user', () => {
    cy.contains('Register').click();
    cy.get('input[type="text"]').first().type('testuser123');
    cy.get('input[type="email"]').type('testuser@test.com');
    cy.get('input[type="password"]').first().type('password123');
    cy.get('input[type="password"]').last().type('password123');
    
    cy.contains('button', /register|sign up/i).click();
    
    // Should either show success or redirect
    cy.url().should('include', '/login').or.include('/home');
  });

  it('should login with valid credentials', () => {
    cy.get('input[type="email"]').type('testuser@test.com');
    cy.get('input[type="password"]').type('password123');
    
    cy.contains('button', /login|sign in/i).click();
    
    // Should redirect to home on success
    cy.url().should('include', '/home');
    cy.contains('Recipes').should('be.visible').or.contains('Add Recipe').should('be.visible');
  });

  it('should show error on invalid login', () => {
    cy.get('input[type="email"]').type('wrong@test.com');
    cy.get('input[type="password"]').type('wrongpassword');
    
    cy.contains('button', /login|sign in/i).click();
    
    // Should stay on login or show error
    cy.url().should('include', '/login');
  });
});
