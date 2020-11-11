const faker = require("faker");

const Seed = (mongoose, User) => {
  for (let i = 0; i < 5; i++) {
    const user = new User({
      name: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: "admin123",
      token: [],
      description: faker.lorem.paragraph(),
      image:
        "https://randomuser.me/api/portraits/men/" +
        Math.floor(Math.random() * 100) +
        ".jpg",
    });
  }
};

module.exports = { Seed };
