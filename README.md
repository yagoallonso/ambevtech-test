# Ambev Tech Test Yago Alonso Costa Guillén

Este repositório contém testes automatizados E2E para o frontend e para a API da aplicação [ServeRest](https://serverest.dev), utilizando o framework [Cypress](https://www.cypress.io/) com JavaScript.

## ✅ Estrutura dos Testes

- **Frontend (`cypress/e2e/frontend/`)**
  - Login e validação da interface logada
  - Cadastro, listagem e exclusão de produtos
  - Cadastro, listagem e exclusão de usuários
  - Logout e redirecionamento

- **API (`cypress/e2e/api/`)**
  - Criação de usuários
  - Listagem de usuários
  - Atualização e exclusão de usuários
  - Validação de erro em cadastro duplicado

## 📁 Fixtures

Os arquivos de dados utilizados nos testes estão em:

```
cypress/fixtures/
├── produtos.json
├── usuarios.json
└── usuarios.api.json
```

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js (versão 16+)
- npm ou yarn

### Instalação

```bash
git clone https://github.com/yagoallonso/ambevtech-test.git
cd ambevtech-test
npm install
```

### Executar os testes com interface

```bash
npm run test
```

### Executar os testes em modo headless (CI)

```bash
npm run test:headless
```

## 📄 Notas

- Os testes utilizam dados dinâmicos (`Date.now()`) para evitar conflitos em múltiplas execuções.
- Todos os testes usam boas práticas como isolamento de cenário, uso de fixtures e `beforeEach` para setup.
- Os testes cobrem todo o fluxo CRUD de produtos e usuários.

---

Feito por Yago Alonso Costa Guillén