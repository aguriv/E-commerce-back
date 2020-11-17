const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const OrderSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: "User" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    orderState: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  const Order = mongoose.model("Order", OrderSchema);

  return Order;
};
