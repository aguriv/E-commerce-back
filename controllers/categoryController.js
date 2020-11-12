const { Category, Product } = require("../db");

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

  delete: async (req, res) => {
    await Product.deleteMany({ category: req.params.id });
    await Category.findByIdAndRemove(req.params.id)
      .then(
        res.status(200).json("La categoría fue eliminada")
        /*  console.log(product) */
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          error: err,
        });
      });
  },
};
/* 
    await Product.findByIdAndRemove(req.params._id);
 */
