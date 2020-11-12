const jwt = require("express-jwt");

const { logIn, register } = require("../controllers/userController");

function userRoutes(app) {
  app.post("/api/v1/users/create", (req, res) => {
    register(req, res);
  });

  app.post("/api/v1/users/find", (req, res) => {
    logIn(req, res);
  });
}

module.exports = userRoutes;
