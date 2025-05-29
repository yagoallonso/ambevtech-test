Cypress.Commands.add('criarUsuarioFixture', (fixtureName) => {
    cy.fixture(fixtureName).then((usuario) => {
      usuario.email = usuario.email.replace('@', `+${Date.now()}@`); // evita conflito
      return cy.request('POST', 'https://serverest.dev/usuarios', usuario);
    });
  });