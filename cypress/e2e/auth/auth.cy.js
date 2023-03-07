let credentials;

describe('auth process', {
  viewportHeight: 667,
  viewportWidth: 375
}, () => {
  beforeEach(() => {
    cy.task('initializeDb').then(res => credentials = res);
    cy.visit('http://localhost:3000');
  });

  it('should login and logout', () => {
    cy.login({userName: credentials.userName, password: credentials.password});
    cy.get(':nth-child(4) > .icon-button_button__wsh1Q').click();
    cy.get('.settings_button__TVN2L').click();
    cy.get('.login-signin_loginButton__HyOJ2').should('be.visible');
  });
});
