/* eslint-disable no-undef */
describe('template spec', () => {
  it('passes', () => {
      cy.visit('/')
      cy.get("[testid='loginbtn']").click()

      cy.url().should('include', '/login')

      cy.get("input[name='email']").type("Admin@gmail.com").should('have.value', 'Admin@gmail.com')
      cy.get("input[name='password']").type("Admin@123").should('have.value', 'Admin@123')
      cy.get("[testid='loginbtnsubmit']").click()

      cy.window().its('sessionStorage').should('have.property', 'token');
      
  })
})