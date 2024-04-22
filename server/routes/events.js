const express = require("express");
const router = express.Router();
const { eventById, events, addEvents, editEvents, deleteEvents, filterEvents} = require("../controller/eventsController")

router.get("/:id", eventById);
router.get("/", events);
router.post("/",addEvents);
router.put("/",editEvents);
router.delete("/:id",deleteEvents);
// router.get("/", async (req, res) => {
//   try {
//     const eventsList = await Events.find();
//     res.status(200).json(eventsList);
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });
// router.post("/", async (req, res) => {
//   try {
//     const isExist = await Events.findOne({ title: req.body.title });
//     if (!isExist) {
//       const eventsList = await Events.create(req.body);
//       res.status(200).json(eventsList);
//     }
   
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });
module.exports = router;
