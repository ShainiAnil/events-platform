const express = require("express");
const router = express.Router();
const { category, addCategory, editCategory, deleteCategory } = require("../controller/CategoryController");

router.get("/", category);
router.post("/", addCategory);
router.put("/", editCategory);
router.delete("/", deleteCategory);


module.exports = router;