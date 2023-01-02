let credentials;

describe('auth process', {
  viewportHeight: 667,
  viewportWidth: 375
}, () => {
  beforeEach(() => {
    cy.task('initializeDb').then(res => credentials = res);
    cy.visit('http://localhost:3000');
  })

  it('should login and logout', () => {
    cy.visit('http://localhost:3000');
    cy.get('.login-signin_loginButton__HyOJ2').click();
    cy.get('.login_userNameInput__g71kv > .login_input__xUa-f').type(credentials.userName);
    cy.get('.login_passwordInput__jFaFu > .login_input__xUa-f').type(credentials.password);
    cy.get('.login_loginButton__6JTAa').click();
    cy.get('ion-tab-bar').should('be.visible');

    cy.get(':nth-child(4) > .icon-button_button__wsh1Q').click();
    cy.get('.settings_button__TVN2L').click();
    cy.get('.login-signin_loginButton__HyOJ2').should('be.visible');
  });
});
