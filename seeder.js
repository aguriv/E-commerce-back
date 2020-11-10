const faker = require("faker");

const Seed = (mongoose, User, Tweet) => {
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

    for (let j = 0; j < 10; j++) {
      const tweet = new Tweet({
        text: faker.lorem.words(),
        author: user,
        date: faker.date.recent(),
        likes: user,
      });
      tweet.save();
      user.tweets.push(tweet);
    }
    user.save();
  }
};

module.exports = { Seed };
