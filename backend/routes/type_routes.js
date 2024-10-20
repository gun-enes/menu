const express = require('express');
const router = express.Router();
const Type = require('../models/type'); // Adjust the path as needed

// Create a new type entry
router.post('/', async (req, res) => {
    try {
        const type = new Type({
            title: req.body.title,
            url: req.body.url,
        });
        const savedType = await type.save();
        res.status(201).json(savedType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get all type entries
router.get('/', async (req, res) => {
    try {
        const types = await Type.find();
        res.json(types);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a specific type by ID
router.delete('/:id', async (req, res) => {
    try {
      const typeId = req.params.id;
      
      // Find the type by ID and delete it
      const deletedType = await Type.findByIdAndDelete(typeId);
  
      // If no type is found, return a 404 error
      if (!deletedType) {
        return res.status(404).json({ message: 'Type not found' });
      }
  
      // If deleted successfully, send the deleted type info as a response
      res.status(200).json({ message: 'Type deleted successfully', deletedType });
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: 'Error deleting type', error: error.message });
    }
  });

module.exports = router;
