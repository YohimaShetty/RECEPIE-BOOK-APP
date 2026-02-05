describe('Recipe Book App - Full User Journey', () => {
  it('should complete full user workflow: register -> login -> create recipe -> view -> logout', () => {
    // 1. Visit app
    cy.visit('http://localhost:3000');
    cy.contains('Login').should('be.visible');

    // 2. Register new user
    cy.contains('Register').click();
    cy.url().should('include', '/register');
    
    const randomEmail = `user${Date.now()}@test.com`;
    cy.get('input[type="text"]').first().type(`user${Date.now()}`);
    cy.get('input[type="email"]').type(randomEmail);
    cy.get('input[type="password"]').first().type('testpass123');
    cy.get('input[type="password"]').last().type('testpass123');
    
    cy.contains('button', /register|sign up/i).click();
    
    // 3. Login with new credentials
    cy.url().should('include', '/login');
    cy.get('input[type="email"]').type(randomEmail);
    cy.get('input[type="password"]').type('testpass123');
    cy.contains('button', /login|sign in/i).click();
    
    // 4. Should be on home/recipes page
    cy.url().should('include', '/home');
    
    // 5. Navigate to add recipe
    cy.contains('button', /add|create/i).click();
    cy.url().should('include', '/add-recipe');
    
    // 6. Fill recipe form
    cy.get('input, textarea').eq(0).type('My Signature Dish');
    cy.get('input, textarea').eq(1).type('A unique recipe I created');
    cy.get('input, textarea').eq(2).type('Special ingredients');
    cy.get('input, textarea').eq(3).type('Follow these steps');
    
    // 7. Submit recipe
    cy.contains('button', /save|submit|create/i).click();
    
    // 8. Should be back on home page or recipe detail
    cy.url().should('not.include', '/add-recipe');
    
    // 9. Logout
    cy.contains('button', /logout|sign out/i).should('exist').click();
    cy.url().should('include', '/login');
  });

  it('should prevent access to protected routes without login', () => {
    cy.visit('http://localhost:3000/home');
    
    // Should redirect to login
    cy.url().should('include', '/login');
  });

  it('should persist login across page refresh', () => {
    // Login
    cy.visit('http://localhost:3000');
    cy.get('input[type="email"]').type('testuser@test.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('button', /login|sign in/i).click();
    
    cy.url().should('include', '/home');
    
    // Refresh page
    cy.reload();
    
    // Should still be on home page
    cy.url().should('include', '/home');
  });
});
