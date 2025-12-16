export const userHandler = {
  URL: Cypress.config('baseUrl'),
  BASE: '/public/v2/users',

  // Methods -------------------------------------------------------------------
  post(token, body) {
    return cy.request({
      url: `${this.URL}${this.BASE}`,
      method: 'POST',
      auth: {
        bearer: token
      },
      body: body,
    })
  },

  getById(token, id) {
    return cy.request({
      url: `${this.URL}${this.BASE}/${id}`,
      method: 'GET',
      auth: {
        bearer: token
      },
    })
  },
}
