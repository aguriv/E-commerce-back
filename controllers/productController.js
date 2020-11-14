const { mongoose, User, Product, Category } = require("../db");

module.exports = {
  listProducts: async (req, res) => {
    const products = await Product.find(req.query).populate("category");
    res.json(products);
  },

  listProduct: async (req, res) => {
    const oneProduct = await Product.findOne({ _id: req.params });
    res.json(oneProduct);
  },

  oneProduct: async (req, res) => {
    const product = await Product.findOne(req.params).populate("category");
    res.json(product);
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
        featured: req.body.featured,
        slug: req.body.slug,
        addedBy: req.body.addedBy,
      },
      { new: true }
    );
    await product.save();
    res.status(200).json(product);
  },

  /*   update: async (req, res) => {
    const category = await Category.findOne({ name: req.body.category });
    req.body.category = category;
    if (category === null)
      return res.status(400).json("Ingrese una categoria valida ney");
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
        category.products.push(product); 
    await category.save();
    res.status(200).json(product);
  }, */

  /*   saveTweet: async (req, res) => {
    const tweet = new Tweet({
      text: req.body.text,
      author: mongoose.Types.ObjectId(req.user.sub),
    });
    tweet.save();
    await User.findById(req.user.sub, (err, user) => {
      user.tweets.push(tweet);
  /* 
  likeTweet: async (req, res) => {
    await Tweet.findById(req.params._id, (err, tweet) => {
      const foundObjId = tweet.likes.find(
        (e) => e.toString() === req.user.sub.toString()
      );
      if (foundObjId === undefined) {
        tweet.likes.push(req.user.sub);
        tweet.save();
      } else {
        Tweet.updateOne(
          { _id: req.params._id },
          { $pull: { likes: req.user.sub } },
          { safe: true, multi: true },
          (err, tweet) => {
            if (err) {
              return err;
            }
          }
        );
      }
    });
    await Tweet.findById(req.params._id, (err, tweet) => {
      res.json(tweet.likes);
    });
  },

  deleteTweet: async (req, res) => {
    await Tweet.findByIdAndRemove(req.params._id, (err, tweet) => {
      if (err) {
        return err;
      }
    });
    res.json("Tweet deleted");
  }, */
};
