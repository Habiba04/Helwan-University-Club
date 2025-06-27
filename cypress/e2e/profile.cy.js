/* eslint-disable no-undef */
describe('template spec', () => {
  it('passes', () => {
      cy.visit('/login')
      cy.get("input[name='email']").type('membo1@gmail.com').should('have.value', 'membo1@gmail.com')
      cy.get("input[name='password']").type('Member@123').should('have.value', 'Member@123')
      cy.get("[testid='loginbtnsubmit']").click()
      cy.window().its('sessionStorage').should('have.property', 'token');
      cy.window().then((win) => {
          const tokenStr = win.sessionStorage.getItem("token");

          if (!tokenStr) {
              throw new Error("Token not found in sessionStorage");
          }

          let tokenObj;
          try {
              tokenObj = JSON.parse(tokenStr);
          } catch (e) {
              throw new Error("Failed to parse token from sessionStorage");
          }

          if (!tokenObj.token) {
              throw new Error("Parsed token object does not contain 'token' property");
          }

          cy.url().should('include', `/profile/${tokenObj.user.Id}`);
          
      });
  })
})