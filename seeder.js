const { Category, Product, db, User } = require("./db");
const {
  productsCleaning,
  productsImage,
  productsOthers,
  productsHeating,
} = require("./initialProducts");

const seeder = async () => {
  await db.dropDatabase();
  const categoryCleaning = new Category({
    name: "Limpieza",
    slug: "limpieza",
  });

  productsCleaning.forEach((product) => {
    product.category = categoryCleaning;
  });
  const insertedProductsCleaning = await Product.insertMany(productsCleaning);
  categoryCleaning.products = insertedProductsCleaning;
  await categoryCleaning.save();

  const categoryImage = new Category({
    name: "Imagen y sonido",
    slug: "imagen-y-sonido",
  });

  productsImage.forEach((product) => {
    product.category = categoryImage;
  });
  const insertedProductsImage = await Product.insertMany(productsImage);
  categoryImage.products = insertedProductsImage;
  await categoryImage.save();

  const categoryOthers = new Category({
    name: "Otros",
    slug: "otros",
  });

  productsOthers.forEach((product) => {
    product.category = categoryOthers;
  });
  const insertedProductsOthers = await Product.insertMany(productsOthers);
  categoryOthers.products = insertedProductsOthers;
  await categoryOthers.save();

  const categoryHeating = new Category({
    name: "Climatización",
    slug: "climatizacion",
  });

  productsHeating.forEach((product) => {
    product.category = categoryHeating;
  });
  const insertedProductsHeating = await Product.insertMany(productsHeating);
  categoryHeating.products = insertedProductsHeating;
  await categoryHeating.save();

  const admin = new User({
    name: "Admin",
    lastname: "Testing",
    email: "admin@electrohack.com",
    username: "admin",
    password: "root",
    tokens: [],
    address: "Colonia 1234",
    phone: "29000000",
    orders: [],
    admin: true,
  });
  admin.save();

  const user = new User({
    name: "User",
    lastname: "Testing",
    email: "usuario@electrohack.com",
    username: "user",
    password: "root",
    tokens: [],
    address: "Colonia 1235",
    phone: "29000001",
    orders: [],
    admin: false,
  });
  user.save();
};

module.exports = seeder;
