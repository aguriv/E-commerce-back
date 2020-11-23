const { Category, Product, db } = require("./db");
const {
  productsCleaning,
  productsImage,
  productsOthers,
  productsClimatizacion,
} = require("./initialProducts");

const seeder = async () => {
  await db.dropDatabase();
  const category = new Category({
    name: "Cleaning",
    slug: "Cleaning",
  });
  /* await category.save(); */
  productsCleaning.forEach((product) => {
    product.category = category;
  });
  const insertedProducts = await Product.insertMany(productsCleaning);
  category.products = insertedProducts;
  await category.save();
};

module.exports = seeder;
