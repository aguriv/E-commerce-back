const faker = require("faker");

const Seed = (mongoose, User) => {
  for (let i = 0; i < 5; i++) {
    const user = new User({
      name: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: "admin123",
      tokens: [],
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      orders: [],
    });
  }
};

module.exports = { Seed };
