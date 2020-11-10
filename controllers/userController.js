const jwt = require("jsonwebtoken");
const { User } = require("../db");

const createToken = (user) => {
  return jwt.sign({ sub: user }, process.env.JWT_SECRET);
};

module.exports = {
  register: async (req, res) => {
    const user = await new User({
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      description: req.body.description,
      email: req.body.email,
      image: req.body.image,
    });
    user.tokens = [createToken(user.id)];
    user.save().then(
      res.json({
        following: user.following.length,
        followers: user.followers.length,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        usertoken: user.tokens[0],
        email: user.email,
        image: user.image,
      })
    );
  },

  logIn: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      if (!(await user.validPassword(req.body.password))) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const newToken = createToken(user.id);
      user.tokens.push(newToken);
      user.save();

      res.json({
        following: user.following.length,
        followers: user.followers.length,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        usertoken: newToken,
        description: user.description,
        email: user.email,
        image: user.image,
      });
    } catch (err) {
      console.log("Something failed", err);
      res.status(500).json({ message: "Something failed on server side" });
    }
  },

  findProfile: async (req, res) => {
    await User.findById(req.user.sub, (err, user) => {
      if (err) {
        return err;
      }
    })
      .populate("tweets")
      .exec((err, user) => {
        if (err) {
          return err;
        }
        const newToken = createToken(user.id);
        user.tokens.push(newToken);
        user.save();

        res.json({
          tweets: user.tweets.reverse(),
        });
      });
  },

  findUser: async (req, res) => {
    await User.findOne({ username: req.params.username })
      .populate("tweets")
      .exec((err, user) => {
        if (err) {
          return err;
        }
        res.json({
          following: user.following.length,
          followers: user.followers.length,
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          username: user.username,
          description: user.description,
          email: user.email,
          image: user.image,
          tweets: user.tweets.reverse(),
        });
      });
  },

  followUser: async (req, res) => {
    await User.findById(req.user.sub, (err, user) => {
      const foundObjId = user.following.find(
        (e) => e.toString() === req.params._id.toString()
      );
      if (foundObjId === undefined) {
        user.following.push(req.params._id);
        user.save();
      } else {
        User.updateOne(
          { _id: req.user.sub },
          { $pull: { following: req.params._id } },
          { safe: true, multi: true },
          (err, user) => {
            if (err) {
              return err;
            }
          }
        );
      }
    });
    await User.findById(req.params._id, (err, user) => {
      const foundObjId = user.followers.find(
        (e) => e.toString() === req.user.sub.toString()
      );
      if (foundObjId === undefined) {
        user.followers.push(req.user.sub);
        user.save();
      } else {
        User.updateOne(
          { _id: req.params._id },
          { $pull: { followers: req.user.sub } },
          { safe: true, multi: true },
          (err, user) => {
            if (err) {
              return err;
            }
          }
        );
      }
    });
    res.json("User followed");
  },
};
