const { Order, Product, User } = require("../db");

module.exports = {
  list: async (req, res) => {
    const orders = await Order.find({}).populate("products").populate("buyer");
    res.json(orders);
  },
  userOrder: async (req, res) => {
    const user = User.findById(req.user._id);
    const orders = await new Order({
      cart: req.body.cart,
      buyer: req.body.user,
      totalPrice: req.body.totalPrice,
      orderState: 11,
    });
    orders
      .save()
      .then(res.status(200).json(orders))
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          error: err,
        });
      });
  },

  /* saveCategory: async (req, res) => {
    const category = await new Category({
      name: req.body.name,
      slug: req.body.slug,
    });
    //Category.find({ name: req.body.category });
    category
      .save()
      .then(res.status(200).json(category))
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          error: err,
        });
      });
  },
  saveProduct: async (req, res) => {
    const category = await Category.findOne({ name: req.body.category });
    if (category !== null) {
      const product = await new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        stock: req.body.stock,
        category: category,
        featured: req.body.featured,
        slug: req.body.slug,
        addedBy: req.body.addedBy,
      });
      product
        .save()
        .then(async (product) => {
          category.products.push(product);
          await category.save();
          res.status(200).json(product);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            error: err,
          });
        });
    } else {
      console.log("no");
      res.status(400).json("Ingrese una categoria valida ney");
    }
  }, */
};
