const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
    
    },
  },
});