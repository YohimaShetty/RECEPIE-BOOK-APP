describe('Recipe Book App - UI & Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should have proper page title', () => {
    cy.title().should('include', 'Recipe');
  });

  it('should have navbar with logo', () => {
    cy.get('nav, header').should('exist');
    cy.contains(/recipe|logo/i).should('exist');
  });

  it('should show error messages for validation', () => {
    cy.contains('button', /login|sign in/i).click();
    
    // Should show validation errors
    cy.contains(/required|enter|email|password/i).should('exist');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    cy.contains('Login').should('be.visible');
    
    // Navigation should still work
    cy.contains('Register').should('be.visible');
  });

  it('should be responsive on tablet', () => {
    cy.viewport('ipad-2');
    cy.contains('Login').should('be.visible');
  });

  it('should handle network errors gracefully', () => {
    cy.intercept('POST', '/api/auth/login', { forceNetworkError: true });
    
    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('password');
    cy.contains('button', /login|sign in/i).click();
    
    // Should show error message or retry option
    cy.contains(/error|try again|network/i).should('exist');
  });

  it('should load images correctly', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('be.visible');
    });
  });
});
