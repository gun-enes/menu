const express = require('express');
const router = express.Router();
const Dish = require('../models/dishes');

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

// 1. Get all dishes
router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.status(200).json(dishes);
    } catch (error) {
        console.error('Error fetching all dishes:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// 2. Get dishes by category (using query parameter)
router.get('/category', async (req, res) => {
    try {
        const categoryId = req.query.category; // Get the category ID from the query parameter
        console.log("hiii")
        console.log("category", categoryId)
        // Validate the category ID
        if (!categoryId || typeof categoryId !== 'string' || categoryId.trim() === '') {
            return res.status(400).json({ message: 'Category ID is required' });
        }

        // Fetch dishes by category ID
        const dishes = await Dish.find({ category: categoryId });
        // Return the dishes with a success message
        res.status(200).json(dishes);

    } catch (error) {
        console.error('Error fetching dishes by category:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// 3. Get one dish by ID (using route parameter)
router.get('/:id', async (req, res) => {
    try {
        const dishId = req.params.id; // Get the dish ID from the route parameter

        // Validate the dish ID
        if (!dishId || typeof dishId !== 'string' || dishId.trim() === '') {
            return res.status(400).json({ message: 'Dish ID is required' });
        }
        // Fetch the dish by ID
        const dish = await Dish.findById(dishId);

        // Check if the dish was found
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        // Return the dish with a success message
        res.status(200).json(dish);
    } catch (error) {
        console.error('Error fetching dish by ID:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
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
