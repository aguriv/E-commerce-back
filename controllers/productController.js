const { mongoose, User, Product, Category } = require("../db");

module.exports = {
  listProducts: async (req, res) => {
    const products = await products.find();
    res.json(products);
  },

  saveProduct: async (req, res) => {
    const category = await Category.findOne({ name: req.body.category });

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
  },

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
