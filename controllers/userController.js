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
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      address: req.body.address,
      phone: req.body.phone,
    });
    user.tokens = [createToken(user.id)];
    user
      .save()
      .then(
        res.json({
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
          usertoken: user.tokens[0],
          address: user.address,
          phone: user.phone,
        }) //res.json(user)
      )
      .catch((error) => {
        console.log(error);
        res.status(400);
      });
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
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        usertoken: newToken,
        address: user.address,
        phone: user.phone,
        admin: user.admin,
      });
    } catch (err) {
      console.log("Something failed", err);
      res.status(500).json({ message: "Something failed on server side" });
    }
  },
};
