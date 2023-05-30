Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.goToPage('[data-test="login-button"]', 'inventory');
});

Cypress.Commands.add('addToCart', (product) => {
    cy.get(`[data-test="add-to-cart-${product}"]`).click();
});

Cypress.Commands.add('removeItem', (product) => {
    cy.get(`[data-test="remove-${product}"]`).click();
});

Cypress.Commands.add('goToPage', (attribute, page) => {
    cy.get(attribute)
      .click()
      .url()
      .should('contain', `/${page}.html`);
});

Cypress.Commands.add('checkElementVisibility', (element) => {
    cy.contains(element).should('be.visible');
});

Cypress.Commands.add('fillCheckoutForm', (firstName, lastName, postalCode) => {
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(postalCode);
})