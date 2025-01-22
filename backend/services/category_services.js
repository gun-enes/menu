const Category = require("../models/category_model");

// Create a new category
const createCategory = async (title, url) => {
    if (!title) {
        throw new Error("Title is required");
    }
    const newCategory = new Category({ title, url });
    return await newCategory.save();
};

// Get all categories
const getAllCategories = async () => {
    return await Category.find();
};

// Get category by ID
const getCategoryById = async (id) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error("Category not found");
    }
    return category;
};

const getCategoryBySlug = async (slug) => {
    const category = await Category.findOne({ slug: slug });
    if (!category) {
        throw new Error("Category not found");
    }
    return category;
}

// Update a category
const updateCategory = async (id, title, url) => {
    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { title, url },
        { new: true, runValidators: true }
    );
    if (!updatedCategory) {
        throw new Error("Category not found");
    }
    return updatedCategory;
};

// Delete a category
const deleteCategory = async (id) => {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
        throw new Error("Category not found");
    }
    return deletedCategory;
};


// Export all functions
module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getCategoryBySlug
};
