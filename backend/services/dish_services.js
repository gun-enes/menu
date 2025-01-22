const Dish = require("../models/dish_model");
const Category = require("../models/category_model");
const {Error} = require("mongoose");

// Create a new dish
const createDish = async (title, url, content, category, price) => {
    if (!title || !content || !category || !price) {
        throw new Error("All required fields must be filled");
    }
    const newDish = new Dish({ title, url, content, category, price });
    return await newDish.save();
};

// Get all dishes
const getAllDishes = async () => {
    return Dish.find();
};

// Get dish by ID
const getDishById = async (id) => {
    const dish = await Dish.findById(id);
    if (!dish) {
        throw new Error("Dish not found");
    }
    return dish;
};

// Update a dish
const updateDish = async (id, title, url, content, category, price) => {
    const updatedDish = await Dish.findByIdAndUpdate(
        id,
        { title, url, content, category, price },
        { new: true, runValidators: true }
    );
    if (!updatedDish) {
        throw new Error("Dish not found");
    }
    return updatedDish;
};

// Delete a dish
const deleteDish = async (id) => {
    const deletedDish = await Dish.findByIdAndDelete(id);
    if (!deletedDish) {
        throw new Error("Dish not found");
    }
    return deletedDish;
};

const getDishByCategory = async (category) => {
    const dish = await Dish.find({ category });
    if (!dish) {
        throw new Error("Dish not found");
    }
    return dish;
}

const getDishByCategorySlug = async (slug) => {
    const category = await Category.findOne({ slug: slug });
    if(!category) {
        return Error("Category not found");
    }
    const dish = await Dish.find({ category: category.get('_id') });
    if (!dish) {
        return [];
    }
    console.log(dish);
    return dish;
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
