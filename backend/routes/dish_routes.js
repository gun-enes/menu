const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dish_controllers');

router.post("/", dishController.createDish);
router.get("/category/slug/", dishController.getDishByCategorySlug);
router.get("/category", dishController.getDishByCategory);
router.get("/:id", dishController.getDishById);
router.get("/", dishController.getAllDishes);
router.put("/:id", dishController.updateDish);
router.delete("/:id", dishController.deleteDish);

module.exports = router;
