let credentials;

describe('search', {
  viewportHeight: 667,
  viewportWidth: 375
}, () => {
  beforeEach(() => {
    cy.task('initializeDb').then(res => credentials = res);
    cy.visit('http://localhost:3000');
  })

  // it('Should navigate to the advance search page, search for the word "daft and obtain results"', () => {
  //   cy.login({userName: credentials.userName, password: credentials.password});
  //   cy.get('#tab-button-search').click();
  //   cy.get('.search-button_container__URhCK').click();
  //   cy.get('.search-input_input__mOFLn').type('daft');
  //   cy.get('.advanced-search_results__9zedY').children();
  // });
  //
  // it('should make a search and open a track', () => {
  //   cy.login({userName: credentials.userName, password: credentials.password});
  //   cy.get('#tab-button-search').click();
  //   cy.get('.search-button_container__URhCK').click();
  //   cy.get('.search-input_input__mOFLn').type('daft');
  //   cy.get('.advanced-search_results__9zedY').children();
  //   cy.get('.advanced-search_results__9zedY > .search-song_container__bUKdX').children().first().click({scrollBehavior: false});
  //   cy.get('.song_image__BrITQ').should('be.visible');
  // });
  //
  // it('should make a search and open an album', () => {
  //   cy.login({userName: credentials.userName, password: credentials.password});
  //   cy.get('#tab-button-search').click();
  //   cy.get('.search-button_container__URhCK').click();
  //   cy.get('.search-input_input__mOFLn').type('daft');
  //   cy.get('.advanced-search_results__9zedY').children();
  //   cy.get('.advanced-search_results__9zedY > .search-album_container__wbhPz').children().first().click({scrollBehavior: 'center'});
  //   cy.get('.album_imageContainer__Ag5E0').should('be.visible');
  // });
  //
  // it('should make a search and open an album', () => {
  //   cy.login({userName: credentials.userName, password: credentials.password});
  //   cy.get('#tab-button-search').click();
  //   cy.get('.search-button_container__URhCK').click();
  //   cy.get('.search-input_input__mOFLn').type('daft');
  //   cy.get('.advanced-search_results__9zedY').children();
  //   cy.get('.advanced-search_results__9zedY > .search-artist_container__UbbT3').children().first().click({scrollBehavior: 'center'});
  //   cy.get('.artist_header__qcARy').should('be.visible');
  // });

  it('should clear the search\' store after leaving the advance search page', () => {
    cy.login({userName: credentials.userName, password: credentials.password});
    cy.get('#tab-button-search').click();
    cy.get('.search-button_container__URhCK').click();
    cy.get('.search-input_input__mOFLn').type('daft');
    cy.get('.advanced-search_results__9zedY').children();
    cy.get('.search-input_header__backButton__KO-bE').click();
    cy.get('.search-button_container__URhCK').click();
    cy.get('.advanced-search_results__9zedY').children().should('not.exist');
  })
});
