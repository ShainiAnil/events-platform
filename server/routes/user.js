const express = require("express");
const router = express.Router();
const Users = require("../model/userModel");

router.get("/", async (req, res) => {
  try {
    const usersList = await Users.find();
    res.status(200).json(usersList);
  } catch (error) {
    res.status(400).json({
        message: error.message
    })
  }
});
module.exports = router;