const jwt = require("express-jwt");

const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");

module.exports = function privateRoutes(app) {
  /* RUTAS CATEGORY */
  app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

  app.post("/api/v1/categories", categoryController.saveCategory);

  /* RUTAS PRODUCTS */
  app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

  app.post("/api/v1/products", productController.saveProduct);
};
