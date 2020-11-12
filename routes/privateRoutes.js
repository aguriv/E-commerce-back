const jwt = require("express-jwt");

const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");

module.exports = function privateRoutes(app) {
  /* RUTAS CATEGORY */
  app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

  app.post("/api/v1/categories", categoryController.saveCategory);
  app.delete("/api/v1/categories/:id", categoryController.delete);
  app.put("/api/v1/categories/:id", categoryController.update);

  /* RUTAS PRODUCTS */
  app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

  app.post("/api/v1/products", productController.saveProduct);
  app.delete("/api/v1/products/:id", productController.delete);
  app.put("/api/v1/products/:id", productController.update);

  /* RUTAS USERS */
  app.get("/api/v1/users", userController.list);
  app.delete("/api/v1/users/:id", userController.delete);
};
