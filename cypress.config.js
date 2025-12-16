const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: '',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/api/*.cy.js',
    // Authentication Configuration
    token: '',
  },
})
