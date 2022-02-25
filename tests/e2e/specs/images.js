// https://docs.cypress.io/api/table-of-contents

describe('Home Page', () => {
  const commentText = 'This is a test'

  beforeEach(() => {
    cy.login()
    cy.visit('/home')
  })

  it('Visit home page', () => {
    cy.url().should('include', '/home')
    cy.get('header').should('be.visible')
    cy.get('.router-link-active').should('have.attr', 'href', '/home')
    cy.get('.header-wrapper__user-name').should('have.text', 'user1')
    cy.contains('h1', 'Image Gallery').should('be.visible')
    cy.contains('a', 'Upload').should('have.attr', 'href', '/upload')
    cy.get('.image-details').contains('No image selected')
  })

  it('Search for a non-existent image', () => {
    cy.get('.list__search-input').type('#$%^')
    cy.get('.list__item').should('not.exist')
    cy.get('.list > :nth-child(4)').should('have.text', 'No images')
  })

  it('Leave comment on image', () => {
    cy.get('.list__item-name').first().then((el) => {
      const title = el.text()
      cy.get('.list__item .btn').eq(0).click()
      cy.get('.loader').should('be.visible')
      cy.get('.image-details img').should('be.visible')
      cy.get('.comments__floating').click()
      cy.get('.loader').should('be.visible')
      cy.get('.comments').should('be.visible').contains(title)
      cy.get('.comments__textarea').type(commentText + '{enter}')
      cy.get('.comments__container')
        .contains(commentText)
        .parent()
        .should('have.class', 'comment__text--yellow')
      
    })
  })

  it.only('Edit comment on image', () => {
      cy.get('.list__item .btn').eq(0).click()
      cy.get('.loader').should('be.visible')
      cy.get('.image-details img').should('be.visible')
      cy.get('.comments__floating').click()

      cy.get('.comments__textarea').type(commentText + '{enter}')
      cy.get('.comments__container')
        .contains(commentText)
        .last()
        .parent()
        .invoke('show')
        .should('have.class', 'comment__text--yellow')

    // cy.get('.comment__text').contains(commentText).invoke('show')
    cy.get('.comment__edit').find('button').first().click({force: true})
    cy.get('.comments__textarea').type(' edited{enter}')
    cy.get('.comments__container').contains(commentText + ' edited')
  })
})
