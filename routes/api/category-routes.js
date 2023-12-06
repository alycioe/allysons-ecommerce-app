const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // Find all categories and their respective products, and includes all their attributes within the seed files
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    });
    // If the response is good, show the category data, if not, throw error
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // Find one category where the parameter requested is id
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    });
    // if Category not found by id, send 404 message, if not, call the data
    if (!categoryData) {
      res.status(404).json({ message: `There's no category found with this id.`});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
      res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // Create a new category by adding a name, if it works, put through new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    // if there is an error, display error message
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by id
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    // if there is no category, send 404 not found message
    if (!categoryData) {
      res.status(404).json({ message: `There's no category found with this id.`});
      return;
    }
    // update successful, and if not, error is displayed
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by id
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // if no category found, display 404 not found message
    if (!deleteCategory) {
      res.status(404).json({ message: `There's no category found with this id.` });
      return;
    }
    // if successful, submit deleteCategory variable, but if not, show error
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;