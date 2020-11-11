const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(
  `mongodb+srv://root:${process.env.DB_PASSWORD}@cluster0.uxv9g.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
);
mongoose.set("useFindAndModify", false);
const UserModel = require("./userModel");
const ProductModel = require("./ProductModel");
const CategoryModel = require("./CategoryModel");
const { Seed } = require("../seeder");

const User = UserModel(mongoose, Schema);
const Product = ProductModel(mongoose, Schema);
const Category = CategoryModel(mongoose, Schema);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", (e) =>
  console.log("¡Conexión con la base de datos establecida!")
);

module.exports = {
  mongoose,
  User,
  Product,
  Category,
};

/* Seed(mongoose, User, Tweet); */
