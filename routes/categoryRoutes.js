const jwt = require("express-jwt");

const categoryController = require("../controllers/categoryController");

module.exports = function categoryRoutes(app) {
  /* RUTAS PRIVADAS */
  app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

  app.post("/api/v1/categories", categoryController.saveCategory);
};
