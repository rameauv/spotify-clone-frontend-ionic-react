const baseUrl = 'http://localhost:3000';
let credentials;

describe('library', {
  viewportHeight: 667,
  viewportWidth: 375
}, () => {
  beforeEach(() => {
    cy.task('initializeDb').then(res => credentials = res);
    cy.visit(baseUrl);
  });

  it('Should properly add and remove liked albums and followed artists to the library page', () => {
    const albumId = '2noRn2Aes5aoNVsU6iWThc';
    const artistId = '4tZwfgrHOc3mvqYlEYSvVi';
    const expectedItemCount = 3;
    const initialItemCount = 1;

    cy.login({userName: credentials.userName, password: credentials.password});
    cy.visit(`${baseUrl}/home/feed/album/${albumId}`);
    cy.get('[data-cy="heart-button"]').click();
    cy.visit(`${baseUrl}/home/feed/artist/${artistId}`);
    cy.get('[data-cy="follow-button"]').click({scrollBehavior: false});
    cy.get('#tab-button-library').click();
    cy.get('[data-cy=library-items]').children().should('have.length', expectedItemCount);

    cy.visit(`${baseUrl}/home/feed/album/${albumId}`);
    cy.get('[data-cy="heart-button"]').click();
    cy.visit(`${baseUrl}/home/feed/artist/${artistId}`);
    cy.get('[data-cy="follow-button"]').click({scrollBehavior: false});
    cy.get('#tab-button-library').click();
    cy.get('[data-cy=library-items]').children().should('have.length', initialItemCount);
  });

  it('should properly add and remove liked tracks to the liked tracks page', () => {
    const trackId = '5W3cjX2J3tjhG8zb6u0qHn';

    cy.login({userName: credentials.userName, password: credentials.password});
    cy.visit(`${baseUrl}/home/feed/song/${trackId}`);
    cy.get('[data-cy=loaded-content]').should('be.visible');
    cy.get('[data-cy=heart-button]').click();
    cy.get('#tab-button-library').click();
    cy.get('[data-cy=liked-tracks-library-item]').click();
    cy.get('[data-cy=item]').should('have.length', 1);

    cy.visit(`${baseUrl}/home/feed/song/${trackId}`);
    cy.get('[data-cy=loaded-content]').should('be.visible');
    cy.get('[data-cy=heart-button]').click();
    cy.get('#tab-button-library').click();
    cy.get('[data-cy=liked-tracks-library-item]').click();
    cy.get('[data-cy=item]').should('have.length', 0);
  });
});
