const { mongoose, User, Product, Category } = require("../db");

module.exports = {
  listProducts: async (req, res) => {
    const products = await Product.find(req.query).populate("category");
    res.json(products);
  },

  listProduct: async (req, res) => {
    const oneProduct = await Product.findOne({ _id: req.params });
    console.log("oneProduct:", oneProduct);
    res.json(oneProduct);
  },

  oneProduct: async (req, res) => {
    const product = await Product.findOne(req.params).populate("category");
    res.json(product);
  },

  saveProduct: async (req, res) => {
    const category = await Category.findOne({ name: req.body.category });
    await console.log(category);
    if (category !== null) {
      const product = await new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        stock: req.body.stock,
        category: category,
        featured: req.body.featured === "true" ? true : false,
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
  },

  delete: async (req, res) => {
    /* await Product.findByIdAndRemove(req.params._id);*/ const product = await Product.findById(
      req.params.id
    );
    const category = await Category.findById(product.category);
    await category.update({ $pull: { products: req.params.id } });
    await Product.findByIdAndRemove(req.params.id)
      .then(
        res.status(200).json(product)
        /*  console.log(product) */
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          error: err,
        });
      });
  },

  update: async (req, res) => {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        stock: req.body.stock,
        featured: req.body.featured === "true" ? true : false,
        slug: req.body.slug,
        addedBy: req.body.addedBy,
      },
      { new: true }
    );
    await product.save();
    res.status(200).json(product);
  },
};
