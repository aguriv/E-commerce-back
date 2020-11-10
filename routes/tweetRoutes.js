const jwt = require("express-jwt");

const {
  following,
  saveTweet,
  likeTweet,
  deleteTweet,
} = require("../controllers/tweetController");

function tweetRoutes(app) {
  app.get(
    "/api/v1/tweets/following",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    (req, res) => {
      following(req, res);
    }
  );

  app.post(
    "/api/v1/tweets/saveTweet",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    (req, res) => {
      saveTweet(req, res);
    }
  );

  app.get(
    "/api/v1/tweets/like/:_id",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    (req, res) => {
      likeTweet(req, res);
    }
  );

  app.post(
    "/api/v1/tweets/delete/:_id",
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    (req, res) => {
      deleteTweet(req, res);
    }
  );
}

module.exports = tweetRoutes;
