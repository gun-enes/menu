const dishService = require("../services/dish_services");

// @desc    Create a new dish
// @route   POST /dishes
const createDish = async (req, res) => {
    try {
        const { title, url, content, category, price } = req.body;
        const dish = await dishService.createDish(title, url, content, category, price);
        res.status(201).json(dish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all dishes
// @route   GET /dishes
const getAllDishes = async (req, res) => {
    try {
        const dishes = await dishService.getAllDishes();
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a single dish by ID
// @route   GET /dishes/:id
const getDishById = async (req, res) => {
    try {
        const dish = await dishService.getDishById(req.params.id);
        res.status(200).json(dish);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Update a dish
// @route   PUT /dishes/:id
const updateDish = async (req, res) => {
    try {
        const { title, url, content, category, price } = req.body;
        const dish = await dishService.updateDish(req.params.id, title, url, content, category, price);
        res.status(200).json(dish);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Delete a dish
// @route   DELETE /dishes/:id
const deleteDish = async (req, res) => {
    try {
        await dishService.deleteDish(req.params.id);
        res.status(200).json({ message: "Dish deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getDishByCategory = async (req, res) => {
    try {
        const dish = await dishService.getDishByCategory(req.params.category);
        res.status(200).json(dish);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDishByCategorySlug = async (req, res) => {
    try {
        console.log(req.query.slug);
        const dish = await dishService.getDishByCategorySlug(req.query.slug);
        res.status(200).json(dish);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Export all functions
module.exports = {
    createDish,
    getAllDishes,
    getDishById,
    updateDish,
    deleteDish,
    getDishByCategory,
    getDishByCategorySlug
};
