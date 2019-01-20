import { notDeepEqual } from "assert";

// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');

    cy.get('a.navbar-brand').should('contain', 'Flickr feed');

    cy.get('.navbar-nav').children().should('have.length', 2);

    cy.get('.navbar-nav').children().first().children('a')
      .should('contain', 'Home')
      .and('have.class', 'router-link-exact-active');

    cy.get('.navbar-nav').children().first().next().children('a')
      .should(($a) => {
        // should have found 1 elements
        expect($a).to.have.length(1)

        // make sure the first contains some text content
        expect($a.first()).to.contain('Search')
      })
      .and('not.have.class', 'router-link-exact-active')

    cy.wait(5000)
    //test if first page of 10 feeds is loaded on screen
    cy.get('#feed').children('.row').first().children().should(($a) => {
      // should have found 1 elements
      expect($a).to.have.length(10)
    })
  })

  it('Visits search url', () => {
    cy.visit('/#/search');

    cy.get('a.navbar-brand').should('contain', 'Flickr feed');

    cy.get('.navbar-nav').children().should('have.length', 2);

    cy.get('.navbar-nav').children().first().children('a')
      .should('contain', 'Home')
      .and('not.have.class', 'router-link-exact-active');

    cy.get('.navbar-nav').children().first().next().children('a')
      .should('contain', 'Search')
      .and('have.class', 'router-link-exact-active');

    cy.get('.search-input').type('test');

    // wait to render the UI
    cy.wait(5000)

    //test if first page of 10 feeds is loaded on screen
    cy.get('.results-wrapper').children('.row').first().children().should(($a) => {
      // should have found 1 elements
      expect($a).to.have.length(10)
    })
  })
})
