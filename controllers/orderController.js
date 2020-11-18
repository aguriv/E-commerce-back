const { Order, Product, User } = require("../db");

module.exports = {
  list: async (req, res) => {
    const orders = await Order.find({}).populate("products").populate("buyer");
    res.json(orders);
  },
  userOrder: async (req, res) => {
    const product = Product.find({ slug: req.body.cart });
    const order = await new Order({
      cart: req.body.cart,
      buyer: req.user.sub,
      totalPrice: req.body.totalPrice,
      orderState: "no pago",
    });
    order.save();
    order.cart.forEach(async (e) => {
      let productUpdated = await Product.findById(e.product._id);
      console.log(productUpdated);
      if (productUpdated) {
        productUpdated.stock = productUpdated.stock - e.quantity;
        productUpdated.save();
      }
    });
    res.json(order);
  },

  update: async (req, res) => {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderState: req.body.orderState,
      },
      { new: true }
    );
    await order.save();
    res.status(200).json(order);
  },
};
