const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const CategorySchema = new Schema({
    name: { type: String, required: true, maxlength: 140 },
    slug: { type: String, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    createdAt: { type: Date, default: Date.now },
  });

  const Category = mongoose.model("Category", CategorySchema);

  return Category;
};
