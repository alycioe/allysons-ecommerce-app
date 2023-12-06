const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include product information
    const tagData = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      }
    })
    // If successful, display tagData, if not, throw error
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find tag by id
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id,
      }
    });
    // if successful, display tagData, if not, throw error
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new tag using the tag parameter, tag_name
    const newTag = await Tag.create({ tag_name: req.body.tag_name });
    // if successful, display new tag, if not, throw error
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // if id of tag is found, update. if not, throw error
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json(tagUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // if id of tag is found, delete tag. Tag deleted if successful, but if not, throw error
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;