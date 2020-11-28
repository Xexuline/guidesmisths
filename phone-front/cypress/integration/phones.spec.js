/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect */

describe('Integration tests', () => {
  describe('Should load correctly /', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('should show loader while loading', () => {
      cy.get('.icon-spinner')
    })

    it('should render header', () => {
      cy.get('header button.icon-arrow')
      cy.get('header h1')
      cy.get('header button.icon-plus')
    })

    it('should render cards', () => {
      cy.get('.phone-container__wrapper')
    })
  })

  describe('header navigation should navigate correctly', () => {
    it('should navigate to /new', () => {
      cy.visit('http://localhost:3000')
      cy.get('header button.icon-plus').trigger('click')
      cy.location('pathname').should('match', /\/new$/);
    })

    it('should navigate to / on back button', () => {
      cy.get('header button.icon-arrow').trigger('click')
      cy.location('pathname').should('match', /\/$/);
    })
  })

  describe('should create, update and delete phone', () => {

    let id = '' 
    const name = 'cypressName'
    const manufacturer = 'cypressManufacturer'
    const updatedName = 'updatedCypressName'

    it('should create phone', () => {
      cy.intercept('POST', 'api/v1/phone').as('createPhone')
      cy.intercept('GET', 'api/v1/phone').as('getPhoneList')
      cy.intercept('GET', `api/v1/phone/^`).as('getPhoneInfo')
      
      cy.visit('http://localhost:3000/new')
      cy.get('#field_name').type(name)
      cy.get('#field_manufacturer').type(manufacturer)
      
      cy.get('[type="submit"]').trigger('click')
      cy.wait('@createPhone')
        .should(({ response }) => {
          id = response.body.id
          expect(response.statusCode).to.equal(201)
          cy.location('pathname').should('match', /\/*$/);
        })
    })

    it('should update phone', () => {
      cy.intercept('PUT', 'api/v1/phone/').as('updatePhone')
      cy.visit(`http://localhost:3000/update/${id}`)
      cy.get('#field_name').type(updatedName)
      cy.get('[type="submit"]').trigger('click')

      cy.wait('@updatePhone')
        .should(({ response }) => {
          expect(id).to.equal(id)
          expect(response.statusCode).to.equal(200)
          cy.location('pathname').should('match', /\/*$/);
        })
    })

    it('should remove phone', () => {
      cy.intercept('DELETE', 'api/v1/phone/').as('deletePhone')
      cy.intercept('GET', 'api/v1/phone').as('getPhoneList')

      cy.visit(`http://localhost:3000/${id}`)
      cy.wait('@getPhoneList')
      cy.get('button.extra__button').trigger('click')
      
      cy.wait('@deletePhone')
        .should(({ response }) => {
          expect(id).to.equal(id)
          expect(response.statusCode).to.equal(200)
          cy.location('pathname').should('match', /\/$/);
        })
    })
  })
})