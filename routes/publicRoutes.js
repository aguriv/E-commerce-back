const jwt = require("express-jwt");

const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");

module.exports = function publicRoutes(app) {
  /* RUTAS LOGIN Y REGISTER */
  app.post("/api/v1/users/create", (req, res) => {
    register(req, res);
  });

  app.post("/api/v1/users/find", (req, res) => {
    logIn(req, res);
  });

  /* RUTAS CATEGORIES */
  app.get("/api/v1/categories", categoryController.listCategories);
  app.get("/api/v1/categories/:slug", categoryController.listOne);

  /* RUTAS PRODUCTS */
  app.get("/api/v1/products", productController.listProducts);
  app.get("/api/v1/:slug", productController.oneProduct);
};
