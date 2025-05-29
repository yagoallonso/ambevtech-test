describe('Interface logado - Validação inicial', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="email"]').type('fulano@qa.com');
    cy.get('[data-testid="senha"]').type('teste');
    cy.get('[data-testid="entrar"]').click();
    cy.url().should('include', '/home');
  });

  it('deve cadastrar múltiplos produtos e exibi-los na listagem', () => {
    cy.fixture('produtos').then((produtos) => {
      produtos.forEach((produto) => {
        const nomeProduto = `${produto.nome} ${Date.now()}`;

        cy.contains('Cadastrar Produtos').click();
        cy.get('[data-testid="nome"]').type(nomeProduto);
        cy.get('[data-testid="preco"]').type(produto.preco);
        cy.get('[data-testid="descricao"]').type(produto.descricao);
        cy.get('[data-testid="quantity"]').type(produto.quantidade);
        cy.get('[data-testid="cadastarProdutos"]').click();

        cy.contains('Listar Produtos').click();
        cy.contains(nomeProduto)
          .should('be.visible')
          .parents('tr')
          .within(() => {
            cy.contains('Excluir').click();
            cy.wait(500); // Aguarda meio segundo após exclusão
          });
      });
    });
  });
  it('deve cadastrar múltiplos usuários e excluí-los da listagem', () => {
    cy.fixture('usuarios').then((usuarios) => {
      usuarios.forEach((usuario) => {
        const emailUnico = `teste-${Date.now()}@qa.com.br`;

        cy.get('[data-testid="cadastrar-usuarios"]').click();
        cy.get('[data-testid="nome"]').type(usuario.nome);
        cy.get('[data-testid="email"]').type(emailUnico);
        cy.get('[data-testid="password"]').type(usuario.password);

        if (usuario.administrador === "true") {
          cy.get('[data-testid="checkbox"]').check();
        }

        cy.get('[data-testid="cadastrarUsuario"]').click();
        cy.contains('Listar Usuários').click();
        cy.contains(emailUnico)
          .should('be.visible')
          .parents('tr')
          .within(() => {
            cy.contains('Excluir').click();
            cy.wait(500);
          });
      });
    });
  });
  it('deve realizar logout e redirecionar para a tela de login', () => {
    cy.contains('logout', { matchCase: false }).click();
    cy.url().should('include', '/login');
    cy.get('[data-testid="entrar"]').should('be.visible');
  });
});