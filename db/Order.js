const { Schema } = require("mongoose");

module.exports = (mongoose, Schema) => {
  const OrderSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: "User" },
    cart: [
      {
        product: {
          name: { type: String, required: true, maxlength: 140 },
          price: { type: Number, required: true },
          _id: { type: String },
        },
        quantity: { type: Number },
      },
    ],
    orderState: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  const Order = mongoose.model("Order", OrderSchema);

  return Order;
};
