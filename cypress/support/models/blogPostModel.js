import { faker } from '@faker-js/faker';

export const blogPostModel = {
  generateNewRandomPostForUserId(id) {
    return {
      user_id: id,
      title: faker.lorem.sentence({ min: 3, max: 5 }),
      body: faker.lorem.paragraphs(2),
    }
  },
}
