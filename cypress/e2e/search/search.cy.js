let credentials;

describe('search', {
  viewportHeight: 667,
  viewportWidth: 375
}, () => {
  beforeEach(() => {
    cy.task('initializeDb').then(res => credentials = res);
    cy.visit('http://localhost:3000');
  });

  it('Should navigate to the advance search page, search for the word "daft and obtain results"', () => {
    cy.login({userName: credentials.userName, password: credentials.password});
    cy.get('#tab-button-search').click();
    cy.get('[data-cy=search-button]').click();
    cy.get('[data-cy=search-input]').type('daft');
    cy.get('[data-cy=result-items]').children();
  });

  it('should make a search and open a track', () => {
    cy.login({userName: credentials.userName, password: credentials.password});
    cy.get('#tab-button-search').click();
    cy.get('[data-cy=search-button]').click();
    cy.get('[data-cy=search-input]').type('daft');
    cy.get('[data-cy=track-item]').first().click({scrollBehavior: false});
    cy.get('[data-cy=loaded-content]').should('be.visible');
  });

  it('should make a search and open an album', () => {
    cy.login({userName: credentials.userName, password: credentials.password});
    cy.get('#tab-button-search').click();
    cy.get('[data-cy=search-button]').click();
    cy.get('[data-cy=search-input]').type('daft');
    cy.get('[data-cy=album-item]').first().click({scrollBehavior: 'center'});
    cy.get('[data-cy=loaded-content]').should('be.visible');
  });

  it('should make a search and open an artist', () => {
    cy.login({userName: credentials.userName, password: credentials.password});
    cy.get('#tab-button-search').click();
    cy.get('[data-cy=search-button]').click();
    cy.get('[data-cy=search-input]').type('daft');
    cy.get('[data-cy=artist-item]').first().click({scrollBehavior: 'center'});
    cy.get('[data-cy=loaded-content]').should('be.visible');
  });

  it('should clear the search\' store after leaving the advance search page', () => {
    cy.login({userName: credentials.userName, password: credentials.password});
    cy.get('#tab-button-search').click();
    cy.get('[data-cy=search-button]').click();
    cy.get('[data-cy=search-input]').type('daft');
    cy.get('[data-cy=back-button]').click();
    cy.get('[data-cy=search-button]').click();
    cy.get('[data-cy=result-items]').children().should('not.exist');
  });
});
