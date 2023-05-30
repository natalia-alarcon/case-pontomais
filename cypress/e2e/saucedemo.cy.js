describe('Complete Order Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  })
  it('should complete the order flow successfully', () => {

    //Login
    cy.login('standard_user', 'secret_sauce');

    //Add items to cart
    cy.addToCart('sauce-labs-backpack');
    cy.addToCart('sauce-labs-bike-light');  
    cy.addToCart('sauce-labs-bolt-t-shirt');
    cy.addToCart('sauce-labs-fleece-jacket');
    cy.get('.shopping_cart_badge').should('contain', '4');

    //Go to cart and remove an item
    cy.goToPage('.shopping_cart_link', 'cart');
    cy.checkElementVisibility('Your Cart');
    cy.removeItem('sauce-labs-backpack');
    cy.get('.shopping_cart_badge').should('contain', '3');

    //Fill form checkout
    cy.goToPage('[data-test="checkout"]', 'checkout-step-one');
    cy.checkElementVisibility('Checkout: Your Information');
    cy.fillCheckoutForm('Natália', 'Alarcon', '01111-200');
    cy.get('[data-test="continue"]').click();

    //Check order infos before submit
    cy.get('.cart_list')
      .within(() => {
        cy.checkElementVisibility('Sauce Labs Bike Light');
        cy.checkElementVisibility('Sauce Labs Bolt T-Shirt');
        cy.checkElementVisibility('Sauce Labs Fleece Jacket');
      });
    cy.get('.summary_info')
      .within(() => {
        cy.checkElementVisibility('Payment Information');
        cy.checkElementVisibility('Shipping Information');
        cy.checkElementVisibility('Price Total');  
      })
    cy.get('.summary_total_label').should('be.visible');  
    
    //Submit order and check success message
    cy.goToPage('[data-test="finish"]', 'checkout-complete');
    cy.checkElementVisibility('Checkout: Complete!');
    cy.checkElementVisibility('Thank you for your order!');

  })
  
})