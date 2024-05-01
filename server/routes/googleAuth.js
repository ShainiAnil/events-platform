const express = require("express");
const router = express.Router();
const { getToken } = require("../controller/googleAuthController");

router.post("/:id", getToken);

module.exports = router;
