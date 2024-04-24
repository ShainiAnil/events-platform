const express = require("express");
const router = express.Router();
const {register, login, addEvent, myEvents, deleteMyEvent} = require("../controller/authCountroller");

router.post("/register",register);
router.post("/login",login)
router.post("/addEvent", addEvent);
router.post("/myEvents", myEvents);
router.post("/deleteMyEvent/:eventId", deleteMyEvent)
module.exports = router;