describe('API - Testes de Usuários', () => {
  it('deve criar um novo usuário com sucesso', () => {
    // Carrega dados base do usuário e gera e-mail único
    cy.fixture('usuarios.api').then((baseUsuario) => {
      const usuario = {
        ...baseUsuario,
        nome: 'Teste API',
        email: baseUsuario.email.replace('@', `+${Date.now()}@`)
      };

      // Faz a requisição POST para criar usuário
      cy.request('POST', 'https://serverest.dev/usuarios', usuario).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
      });
    });
  });

  it('deve retornar os usuários cadastrados', () => {
    // Faz a requisição GET para listar usuários
    cy.request('GET', 'https://serverest.dev/usuarios').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.usuarios).to.be.an('array');
    });
  });

  it('deve não permitir cadastro com e-mail já existente', () => {
    // Carrega dados base do usuário e gera e-mail único
    cy.fixture('usuarios.api').then((baseUsuario) => {
      const emailDuplicado = baseUsuario.email.replace('@', `+${Date.now()}@`);
      const usuario = {
        ...baseUsuario,
        nome: 'Usuário Duplicado',
        email: emailDuplicado
      };

      // Cria usuário inicialmente para garantir e-mail duplicado
      cy.request('POST', 'https://serverest.dev/usuarios', usuario).then(() => {
        // Tenta criar usuário com e-mail duplicado e espera erro
        cy.request({
          method: 'POST',
          url: 'https://serverest.dev/usuarios',
          failOnStatusCode: false,
          body: usuario
        }).then((res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Este email já está sendo usado');
        });
      });
    });
  });

  it('deve atualizar um usuário existente com sucesso', () => {
    // Carrega dados base do usuário e gera e-mail único para criação
    cy.fixture('usuarios.api').then((baseUsuario) => {
      const usuario = {
        ...baseUsuario,
        nome: 'Usuário para Atualizar',
        email: baseUsuario.email.replace('@', `+${Date.now()}@`)
      };

      // Cria usuário para atualização
      cy.request('POST', 'https://serverest.dev/usuarios', usuario).then((res) => {
        const userId = res.body._id;

        // Monta dados atualizados com novo e-mail único
        const novoUsuario = {
          ...baseUsuario,
          nome: 'Usuário Atualizado',
          email: baseUsuario.email.replace('@', `+${Date.now()}@`),
          administrador: 'false'
        };

        // Faz a requisição PUT para atualizar usuário
        cy.request('PUT', `https://serverest.dev/usuarios/${userId}`, novoUsuario).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq('Registro alterado com sucesso');
        });
      });
    });
  });

  it('deve deletar um usuário existente com sucesso', () => {
    // Carrega dados base do usuário e gera e-mail único para criação
    cy.fixture('usuarios.api').then((baseUsuario) => {
      const usuario = {
        ...baseUsuario,
        nome: 'Usuário para Deletar',
        email: baseUsuario.email.replace('@', `+${Date.now()}@`)
      };

      // Cria usuário para exclusão
      cy.request('POST', 'https://serverest.dev/usuarios', usuario).then((res) => {
        const userId = res.body._id;

        // Faz a requisição DELETE para remover usuário
        cy.request('DELETE', `https://serverest.dev/usuarios/${userId}`).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq('Registro excluído com sucesso');
        });
      });
    });
  });
});