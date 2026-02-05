describe('Recipe Book App - Recipe Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    
    // Login first
    cy.get('input[type="email"]').type('testuser@test.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('button', /login|sign in/i).click();
    
    // Wait for redirect to home
    cy.url().should('include', '/home');
  });

  it('should display recipe list on home page', () => {
    cy.contains(/recipes|dosa|pasta/i).should('exist');
  });

  it('should navigate to add recipe page', () => {
    cy.contains('button', /add|create/i).click();
    cy.url().should('include', '/add-recipe');
    cy.contains(/add recipe|create recipe/i).should('be.visible');
  });

  it('should create a new recipe', () => {
    cy.contains('button', /add|create/i).click();
    
    cy.get('input[placeholder*="title" i], input[name*="title" i]').type('Test Pasta');
    cy.get('input[placeholder*="description" i], input[name*="description" i], textarea').first().type('A delicious test pasta');
    cy.get('textarea, input').eq(2).type('Pasta, tomato, garlic');
    cy.get('textarea, input').eq(3).type('Boil pasta and mix with sauce');
    
    cy.contains('button', /save|submit|create/i).click();
    
    // Should redirect to home or recipe detail
    cy.url().should('not.include', '/add-recipe');
  });

  it('should view recipe details', () => {
    // Click on first recipe (or specific recipe)
    cy.get('[class*="card"], [class*="recipe"]').first().click();
    
    cy.url().should('include', '/recipe/');
    cy.contains(/title|description|ingredients|instructions/i).should('exist');
  });

  it('should edit a recipe', () => {
    // Navigate to a recipe
    cy.get('[class*="card"], [class*="recipe"]').first().click();
    
    // Look for edit button
    cy.contains('button', /edit/i).should('exist').click();
    
    cy.url().should('include', '/edit-recipe/');
    
    // Update a field
    cy.get('input, textarea').first().clear().type('Updated Title');
    cy.contains('button', /save|update/i).click();
    
    // Should redirect back
    cy.url().should('include', '/recipe/').or.include('/home');
  });

  it('should delete a recipe', () => {
    // Navigate to a recipe
    cy.get('[class*="card"], [class*="recipe"]').first().click();
    
    // Look for delete button
    cy.contains('button', /delete|remove/i).should('exist');
    cy.contains('button', /delete|remove/i).click();
    
    // May show confirmation
    cy.contains('button', /confirm|yes|delete/i).should('exist').click();
    
    // Should redirect to home
    cy.url().should('include', '/home');
  });

  it('should search or filter recipes', () => {
    // Look for search input
    cy.get('input[placeholder*="search" i], input[type="text"]').first().type('pasta');
    
    // Results should be filtered
    cy.get('[class*="card"], [class*="recipe"]').should('have.length.greaterThan', 0);
  });

  it('should logout', () => {
    cy.contains('button', /logout|sign out/i).click();
    
    cy.url().should('include', '/login');
    cy.contains('Login').should('be.visible');
  });
});
