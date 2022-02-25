// https://docs.cypress.io/api/table-of-contents

describe('Login Page', () => {
  it('Visit login page', () => {
    cy.visit('/')
    cy.get('.login__label').should('be.visible')
    cy.contains('h1', 'Log in')
    cy.get('input[type=email]').should('be.visible')
    cy.get('input[type=password]').should('be.visible')
    cy.get('.btn__square').should('be.visible')
  })

  it('Login validation', () => {
    cy.on('uncaught:exception', () => false)

    cy.visit('/')
    cy.get('.btn__square').as('btn').click()
    cy.get('.error')
      .should('have.text', 'The email address is badly formatted.')
      .and('have.css', 'color', 'rgba(255, 0, 0, 0.8)')

    // Add email
    cy.get('input[type=email]').type('user1@test.com')
    cy.get('@btn').click()
    cy.get('.error')
      .should('have.text', 'The password is invalid or the user does not have a password.')
  })
})
