const express = require('express');
const router = express.Router();
const settingsContoller = require('../controllers/settings_controller');

router.post("/", settingsContoller.createSettings);
router.get("/:id", settingsContoller.getSettingsById);
router.get("/", settingsContoller.getAllSettings);
router.put("/:id", settingsContoller.updateSettings);
router.delete("/:id", settingsContoller.deleteSettings);

module.exports = router;
