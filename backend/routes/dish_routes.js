const express = require('express');
const router = express.Router();
const Dish = require('../models/dishes');
const Category = require("../models/category"); // Adjust the path as needed

// Create a new dish entry
router.post('/', async (req, res) => {
    try {
        const dish = new Dish({
            title: req.body.title,
            content: req.body.content,
            price: req.body.price,
            url: req.body.url,
            category: req.body.category
        });
        const savedDish = await dish.save();
        res.status(201).json(savedDish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const categoryId = req.params.id;
    const updatedCategoryData = req.body;

    try {
        // Find category by id and update it with the new data
        const updatedCategory = await Dish.findByIdAndUpdate(
            categoryId,
            updatedCategoryData,
            { new: true, runValidators: true } // `new: true` returns the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(updatedCategory); // Send back the updated category
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
});


// Get all dish entries
router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get specified type category entries
router.get('/:category', async (req, res) => {
  try {
      const dishCategory = req.params.category;

      if (!dishCategory) {
        return res.status(400).json({ message: 'Category or Type not provided' });
      }

      const dishes = await Dish.find({ category : dishCategory  });
      res.json(dishes);

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Delete a specific dish by ID
router.delete('/:id', async (req, res) => {
    try {
      const dishId = req.params.id;
      
      // Find the dish by ID and delete it
      const deletedDish = await Dish.findByIdAndDelete(dishId);
  
      // If no dish is found, return a 404 error
      if (!deletedDish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
  
      // If deleted successfully, send the deleted dish info as a response
      res.status(200).json({ message: 'Dish deleted successfully', deletedDish });
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: 'Error deleting dish', error: error.message });
    }
  });

module.exports = router;
