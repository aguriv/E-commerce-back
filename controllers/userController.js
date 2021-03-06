const jwt = require("jsonwebtoken");
const { User } = require("../db");
const bcrypt = require("bcryptjs");

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

  list: async (req, res) => {
    const users = await User.find();
    res.json(users);
  },

  delete: async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json("El usuario fue eliminado");
  },

  update: async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { admin: req.body.admin },
      {
        new: true,
      }
    );
    await user.save();
    res.status(200).json(user);
  },

  resetPassword: async (req, res) => {
    console.log("llego");
    console.log(req.body.actualPassword);
    console.log(req.body.newPassword);

    const oldPassUser = await User.findById(req.user.sub);

    const sonIguales = await bcrypt.compare(
      req.body.actualPassword,
      oldPassUser.password
    );

    await console.log(sonIguales);

    const newHashedPass = await bcrypt.hashSync(req.body.newPassword, 10);

    if (sonIguales) {
      console.log("son iguales");
      const user = await User.findByIdAndUpdate(req.user.sub, {
        password: newHashedPass,
      });
      await user.save();
      res.status(200).json(user);
    } else {
      console.log("no son iguales");
      res.status(404).send("Contraseña incorrecta");
    }
  },

  userUpdate: async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.user.sub,
      {
        name: req.body.name,
        lastname: req.body.lastname,
        address: req.body.address,
        phone: req.body.phone,
      },
      {
        new: true,
      }
    );
    await user.save();
    res.status(200).json(user);
  },
};
