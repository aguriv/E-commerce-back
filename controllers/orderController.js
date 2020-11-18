const { Order, Product, User } = require("../db");

module.exports = {
  list: async (req, res) => {
    const orders = await Order.find({}).populate("products").populate("buyer");
    res.json(orders);
  },
  userOrder: async (req, res) => {
    const product = Product.find({ slug: req.body.cart });
    const orders = await new Order({
      cart: req.body.cart,
      buyer: req.user.sub,
      totalPrice: req.body.totalPrice,
      orderState: 11,
    });
    orders.save();
    orders.cart.forEach(async (e) => {
      let productUpdated = Product.findById(e.product._id);
      console.log(productUpdated);
      if (await productUpdated) {
        return (productUpdated.stock = productUpdated.stock - e.quantity);
      }
      productUpdated.save();
    });
    res.json(orders);
  },
};
