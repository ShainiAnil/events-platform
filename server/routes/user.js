const express = require("express");
const router = express.Router();
const Users = require("../model/userModel");

router.get("/", async (req, res) => {
  try {
    const usersList = await Users.find();
    res.status(200).json(usersList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const isExist = await Users.findOne({ username: req.body.username });
    if (!isExist) {
      const usersList = await Users.create(req.body);
      res.status(200).json(usersList);
    }
    return res.status(400).json({
      message: "Username already exists",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
module.exports = router;
