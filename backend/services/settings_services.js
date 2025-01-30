const Settings = require("../models/settings_model");

// Create a new settings
const createSettings = async (businessName, businessType, menuType, mainTheme) => {
    if (!title) {
        throw new Error("Title is required");
    }
    const newSettings = new Settings({ businessName, businessType, menuType, mainTheme });
    return await newSettings.save();
};

// Get all categories
const getAllSettings = async () => {
    return Settings.find();
};

// Get settings by ID
const getSettingsById = async (id) => {
    const settings = await Settings.findById(id);
    if (!settings) {
        throw new Error("Settings not found");
    }
    return settings;
};

// Update a settings
const updateSettings = async (id, businessName, businessType, menuType, mainTheme) => {
    const updatedSettings = await Settings.findByIdAndUpdate(
        id,
        { businessName, businessType, menuType, mainTheme },
        { new: true, runValidators: true }
    );
    if (!updatedSettings) {
        throw new Error("Settings not found");
    }
    return updatedSettings;
};

// Delete a settings
const deleteSettings = async (id) => {
    const deletedSettings = await Settings.findByIdAndDelete(id);
    if (!deletedSettings) {
        throw new Error("Settings not found");
    }
    return deletedSettings;
};


// Export all functions
module.exports = {
    createSettings,
    getAllSettings,
    getSettingsById,
    updateSettings,
    deleteSettings,
};
