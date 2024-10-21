const express = require('express');
const router = express.Router();
const Category = require('../models/category'); // Adjust the path as needed

// Create a new category entry
router.post('/', async (req, res) => {
    try {
        const category = new Category({
            title: req.body.title,
            url: req.body.url,
        });
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get all category entries
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get specified type category entries
router.get('/:type', async (req, res) => {
  try {
      const categoryType = req.params.type;
      const categories = await Category.find({ type : categoryType });
      res.json(categories);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Delete a specific category by ID
router.delete('/:id', async (req, res) => {
    try {
      const categoryId = req.params.id;
      
      // Find the category by ID and delete it
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
  
      // If no category is found, return a 404 error
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // If deleted successfully, send the deleted category info as a response
      res.status(200).json({ message: 'Category deleted successfully', deletedCategory });
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
  });

module.exports = router;
