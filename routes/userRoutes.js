const jwt = require("express-jwt");

const {
  logIn,
  register,
  findProfile,
  findUser,
  followUser,
} = require("../controllers/userController");

function userRoutes(app) {
  app.post("/api/v1/users/create", (req, res) => {
    register(req, res);
  });

  app.post("/api/v1/users/find", (req, res) => {
    logIn(req, res);
  });

  app.get(
    "/api/v1/users/user",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    (req, res) => {
      findProfile(req, res);
    }
  );

  app.get(
    "/api/v1/users/:username",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    (req, res) => {
      findUser(req, res);
    }
  );

  app.get(
    "/api/v1/users/follow/:_id",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    (req, res) => {
      followUser(req, res);
    }
  );
}

module.exports = userRoutes;
