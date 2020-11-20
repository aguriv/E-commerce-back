const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const ProductSchema = new Schema(
    {
      name: { type: String, required: true, maxlength: 140 },
      description: { type: String, required: true },
      image: { type: String },
      price: { type: Number, required: true },
      stock: { type: Number },
      category: { type: Schema.Types.ObjectId, ref: "Category" },
      featured: { type: Boolean, default: false },
      slug: { type: String, unique: true },
      addedBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
  );

  const Product = mongoose.model("Product", ProductSchema);

  return Product;
};
