const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const OrderSchema = new Schema({
    buyer: { type: String, required: true },
    cart: [
      {
        product: {
          name: { type: String, required: true, maxlength: 140 },
          price: { type: Number, required: true },
          _id: { type: String },
          stock: { type: Number },
        },
        quantity: { type: Number },
      },
    ],
    orderState: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  const Order = mongoose.model("Order", OrderSchema);

  return Order;
};
