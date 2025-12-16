export const blogPostHandler = {
  URL: Cypress.config('baseUrl'),
  BASE: '/public/v2/posts',

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

  getById(token, id, failOnStatusCode = true) {
    return cy.request({
      url: `${this.URL}${this.BASE}/${id}`,
      method: 'GET',
      auth: {
        bearer: token
      },
      failOnStatusCode: failOnStatusCode
    })
  },

  putById(token, id, body) {
    return cy.request({
      url: `${this.URL}${this.BASE}/${id}`,
      method: 'PUT',
      auth: {
        bearer: token
      },
      body: body,
    })
  },

  deleteById(token, id) {
    return cy.request({
      url: `${this.URL}${this.BASE}/${id}`,
      method: 'DELETE',
      auth: {
        bearer: token
      },
    })
  },
}
