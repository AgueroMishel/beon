import { blogPostHandler } from '../../support/handlers/blogPostHandler'
import { userHandler } from '../../support/handlers/userHandler'
import { blogPostModel } from '../../support/models/blogPostModel'
import { userModel } from '../../support/models/userModel'

describe('Posts API', () => {
  let user
  let post
  let postUpdated
  let postDeleted
  let token = Cypress.config('token')

  it('Scenario 1: CREATE a New User', () => {
    // Description -------------------------------------------------------------
    // Assert: The response status code is 201 Created
    // Test Data ---------------------------------------------------------------
    const userNew = userModel.generateNewUser()

    // Prerequisites -----------------------------------------------------------

    // Test Steps --------------------------------------------------------------
    userHandler.post(token, userNew).then((postUserResponse) => {
      expect(postUserResponse.status).to.eq(201)
      expect(postUserResponse.body.name).to.eq(userNew.name)
      user = postUserResponse.body
    })
  })

  it('Scenario 2: CREATE a Blog Post for the New User', () => {
    // Description -------------------------------------------------------------
    // Assert: The response status code is 201 Created
    // Assert: The user_id in the response body matches the ID of the user you created
    // Test Data ---------------------------------------------------------------
    cy.wrap(user).then(() => {
      const blogPost = blogPostModel.generateNewRandomPostForUserId(user.id)

    // Prerequisites -----------------------------------------------------------

    // Test Steps --------------------------------------------------------------
      blogPostHandler.post(token, blogPost).then((postBlogPostResponse) => {
        expect(postBlogPostResponse.status).to.eq(201)
        expect(postBlogPostResponse.body.user_id).to.eq(user.id)
        post = postBlogPostResponse.body
      })
    })
  })

  it('Scenario 3: READ and Verify the Blog Post', () => {
    // Description -------------------------------------------------------------
    // Assert: The status code is 200 OK
    // Assert: The id, user_id, title, and body in the response match the data you used to
    // Test Data ---------------------------------------------------------------
    cy.wrap(post).then(() => {
    // Prerequisites -----------------------------------------------------------

    // Test Steps --------------------------------------------------------------
      blogPostHandler.getById(token, post.id).then((getBlogPostResponse) => {
        expect(getBlogPostResponse.status).to.eq(200)
        expect(getBlogPostResponse.body.id).to.eq(post.id)
        expect(getBlogPostResponse.body.user_id).to.eq(post.user_id)
        expect(getBlogPostResponse.body.title).to.eq(post.title)
        expect(getBlogPostResponse.body.body).to.eq(post.body)
      })
    })
  })

  it('Scenario 4: UPDATE the Blog Post', () => {
    // Description -------------------------------------------------------------
    // Assert: The status code is 200 OK
    // Assert: The title in the response body reflects the updated value
    // Test Data ---------------------------------------------------------------
    cy.wrap(post).then(() => {
      const newPost = blogPostModel.generateNewRandomPostForUserId(post.user_id)
    // Prerequisites -----------------------------------------------------------

    // Test Steps --------------------------------------------------------------
      blogPostHandler.putById(token, post.id, newPost).then((putBlogPostResponse) => {
        expect(putBlogPostResponse.status).to.eq(200)
        expect(putBlogPostResponse.body.user_id).to.eq(newPost.user_id)
        expect(putBlogPostResponse.body.title).to.eq(newPost.title)
        expect(putBlogPostResponse.body.body).to.eq(newPost.body)
        postUpdated = putBlogPostResponse.body
      })
    })
  })

  it('Scenario 5: DELETE the Blog Post', () => {
    // Description -------------------------------------------------------------
    // Assert: The status code is 204 No Content
    // Test Data ---------------------------------------------------------------
    cy.wrap(postUpdated).then(() => {
    // Prerequisites -----------------------------------------------------------

    // Test Steps --------------------------------------------------------------
      blogPostHandler.deleteById(token, postUpdated.id).then((deleteBlogPostResponse) => {
        expect(deleteBlogPostResponse.status).to.eq(204)
        postDeleted = true
      })
    })
  })

  it('Scenario 6: VERIFY Deletion', () => {
    // Description -------------------------------------------------------------
    // Assert: The response status code is 404 Not Found. This confirms the post was successfully deleted
    // Test Data ---------------------------------------------------------------
    cy.wrap(postDeleted).then(() => {
    // Prerequisites -----------------------------------------------------------

    // Test Steps --------------------------------------------------------------
      blogPostHandler.getById(token, postUpdated.id, false).then((getBlogPostResponse) => {
        expect(getBlogPostResponse.status).to.eq(404)
      })
    })
  })
})
