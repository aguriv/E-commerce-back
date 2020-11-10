const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const ProductSchema = new Schema({
    name: { type: String, required: true, maxlength: 140 },
    description: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    featured: { type: Boolean },
    slug: { type: String },

    createdAt: { type: Date, default: Date.now },
  });

  const Product = mongoose.model("Product", ProductSchema);

  return Product;
};
