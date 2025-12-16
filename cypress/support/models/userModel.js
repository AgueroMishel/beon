import { faker } from '@faker-js/faker';

export const userModel = {
  generateNewUser() {
    return {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      gender: faker.person.sex(),
      status: 'active',
    }
  },
}
