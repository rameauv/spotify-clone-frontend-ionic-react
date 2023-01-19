let credentials;

describe('settings', {
  viewportHeight: 667,
  viewportWidth: 375
}, () => {
  beforeEach(() => {
    cy.task('initializeDb').then(res => credentials = res);
    cy.visit('http://localhost:3000');
  })

  it('should navigate to the settings page from the library tab and chagen the profile name to nameChanged', () => {
    const change = 'Changed';
    const changedName = credentials.userName + change;

    cy.login({userName: credentials.userName, password: credentials.password});
    cy.get('#tab-button-library').click();
    cy.get('.library_profileIcon__sqKrD').click();
    cy.get('.settings_profileSettingsButton__P3y6Z').click();
    cy.get('.round-outline-button_editButton__z6fol').click({scrollBehavior: false});
    cy.get('.edit-profile-modal_profileTitleInput__vJVXc').type(change);
    cy.get('.text-button_button__MBibQ').click();
    cy.get('.profile-settings_profileSettingsButton__profileTitle__ax36u')
        .should('have.text', changedName)
  });
});
