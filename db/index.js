const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(
  `mongodb+srv://root:${process.env.DB_PASSWORD}@ejercicio-twitter.ojxxy.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
);
mongoose.set("useFindAndModify", false);
const UserModel = require("./userModel");
const TweetModel = require("./tweetModel");
const { Seed } = require("../seeder");

const User = UserModel(mongoose, Schema);
const Tweet = TweetModel(mongoose, Schema);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", (e) =>
  console.log("¡Conexión con la base de datos establecida!")
);

module.exports = {
  mongoose,
  User,
  Tweet,
};

/* Seed(mongoose, User, Tweet); */
