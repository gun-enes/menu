const settingsService = require("../services/settings_services");

const createSettings = async (req, res) => {
    try {
        const {businessName, businessType, menuType, mainTheme} = req.body;
        const settings = await settingsService.createSettings(businessName, businessType, menuType, mainTheme);
        console.log("Settings created successfully");
        res.status(201).json(settings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllSettings = async (req, res) => {
    try {
        const categories = await settingsService.getAllSettings();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSettingsById = async (req, res) => {
    try {
        const settings = await settingsService.getSettingsById(req.params.id);
        res.status(200).json(settings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateSettings = async (req, res) => {
    try {
        const { businessName, businessType, menuType, mainTheme } = req.body;
        const settings = await settingsService.updateSettings(req.params.id, businessName, businessType, menuType, mainTheme);
        console.log("Settings updated successfully");
        res.status(200).json(settings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteSettings = async (req, res) => {
    try {
        await settingsService.deleteSettings(req.params.id);
        console.log("Settings deleted successfully");
        res.status(200).json({ message: "Settings deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createSettings,
    getAllSettings,
    getSettingsById,
    updateSettings,
    deleteSettings,
};
