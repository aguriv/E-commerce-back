const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

module.exports = (mongoose, Schema) => {
  const UserSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    tokens: [],
    description: String,
    image: String,
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  });

  UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  });

  const User = mongoose.model("User", UserSchema);

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  return User;
};
