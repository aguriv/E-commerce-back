const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

module.exports = (mongoose, Schema) => {
  const UserSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String },
    password: { type: String, required: true },
    tokens: [],
    address: { type: String },
    phone: { type: String },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    admin: { type: Boolean, default: false },
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
