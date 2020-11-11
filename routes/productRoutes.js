const jwt = require("express-jwt");

const productController = require("../controllers/productController");

module.exports = function productRoutes(app) {
  /* RUTAS PRIVADAS */
  app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

  app.get("/api/v1/products", productController.listProducts);

  app.post("/api/v1/products", productController.saveProduct);
};
