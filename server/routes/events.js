const express = require("express");
const router = express.Router();
const {handler} = require("../middleware/upload")
const { eventById, events, addEvents, editEvents, deleteEvents, filterEvents} = require("../controller/eventsController")

router.get("/:id", eventById);
router.get("/", events);
router.post("/",addEvents);
router.put("/",editEvents);
router.delete("/:id",deleteEvents);

module.exports = router;
