describe('Login', () => {
  const user = {
    email: 'pespatron@gmail.com',
    password: 'harnaUkrainkaJa',
    greetingMessage: 'Hello my dear friend, Kozache(ko)',
    wrongEmailMessage: 'No such user',
    wrongPasswordMessage: 'Wrong password',
  };

  beforeEach(() => {
    cy.visit('/login')
    cy.wait(500);
  });

  it('should provide an ability to log in with valid credentials', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type(user.email);
    cy.findByPlaceholder('*********')
      .type(user.password);
    cy.get('.inline-block')
      .click();
    cy.get('.min-h-screen')
      .should('contain', user.greetingMessage);
  });

  it('should provide an ability to not log in with invalid email', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type('wrong' + user.email);
    cy.findByPlaceholder('*********')
      .type(user.password);
    cy.get('.inline-block')
      .click();
    cy.get('.font-medium')
      .should('contain', user.wrongEmailMessage);
  });

  it('should provide an ability to not log in with invalid password', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type(user.email);
    cy.findByPlaceholder('*********')
      .type(user.password + '123');
    cy.get('.inline-block')
      .click();
    cy.get('.font-medium')
      .should('contain', user.wrongPasswordMessage);
  });

  it('should provide an ability to not log in with empty email field', () => {
    cy.findByPlaceholder('*********')
      .type(user.password);
    cy.get('.inline-block')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Заповніть це поле.')
    });
  });

  it('validation message appears when user filling email field only with special symbols', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type('*****');
    cy.get('.block')
      .should('contain', '*Це поле має бути електронною поштою');
  });

  it('validation message appears when user filling email field without "@" symbol', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type('pespatrongmail.com');
    cy.get('.block')
      .should('contain', '*Це поле має бути електронною поштою');
  });
  
  it('should provide an ability to not log in with empty password field', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type(user.email);
    cy.get('.inline-block')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Заповніть це поле.')
    });
  });

  it('should provide an ability to not log in with empty password and email fields', () => {
    cy.get('.inline-block')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Заповніть це поле.')
    });
  });

  it('validation message appears when password field filled less than 3 symbols', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type(user.email);
    cy.findByPlaceholder('*********')
      .type('12');
    cy.get('.block')
      .should('contain', '*Це поле має бути щонайменше 3 символами!')
    });

  it('validation message appears when email field make empty', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
       .type(user.email)
       .clear();
    cy.get('.block')
      .should('contain', '*Це поле є обов*язковим!')
  });
  
  it('validation message appears when password field make empty', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
       .type(user.email);
    cy.findByPlaceholder('*********')
       .type(user.password)
       .clear();
    cy.get('.block')
      .should('contain', '*Це поле є обов*язковим!')
  });

  it('should provide an ability to reset password for existing user', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type(user.email);
    cy.contains('a', 'Забули свій пароль?')
      .click();
    cy.wait(500);  
    cy.url()
      .should('include', 'forgot_password'); 
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type(user.email);
    cy.get('.inline-block')
      .click();
    cy.get('.text-center')
      .should('contain', `Пароль: ${user.password}`);  
  });
  
  it('should provide an ability to not reset password for non-existing user', () => {
    cy.contains('a', 'Забули свій пароль?')
      .click();
    cy.wait(500);  
    cy.url()
      .should('include', 'forgot_password'); 
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type('wrong' + user.email);
    cy.get('.inline-block')
      .click();
    cy.get('.font-medium')
      .should('contain', user.wrongEmailMessage);  
  });
});
