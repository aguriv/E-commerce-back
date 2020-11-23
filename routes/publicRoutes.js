const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const orderController = require("../controllers/orderController");
const userController = require("../controllers/userController");
const seeder = require("../seeder");

module.exports = function publicRoutes(app) {
  /* RUTAS LOGIN Y REGISTER */
  app.post("/api/v1/users/create", userController.register);

  app.post("/api/v1/users/find", userController.logIn);

  /* RUTAS CATEGORIES */
  app.get("/api/v1/categories", categoryController.listCategories);
  app.get("/api/v1/categories/:slug", categoryController.listOne);

  /* RUTAS PRODUCTS */
  app.get("/api/v1/products", productController.listProducts);
  app.get("/api/v1/product/:slug", productController.oneProduct);

  /*RUTAS ORDERS*/

  /*SEEDER*/
  app.get("/seeder", async (req, res) => {
    await seeder();
    return res.send("Seeder ejecutado");
  });
};
