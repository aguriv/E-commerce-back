const { Category } = require("../db");

module.exports = {
  listCategories: async (req, res) => {
    const categories = await Category.find().populate("products");
    res.json(categories);
  },

  saveCategory: async (req, res) => {
    const category = await new Category({
      name: req.body.name,
      slug: req.body.slug,
    });
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
};
