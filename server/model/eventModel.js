const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
   
  },
  category: [
    { type: mongoose.Schema.Types.ObjectId, 
        ref: "Category", required: false },
  ],
  price: {
    type: String,
    required: true,
    default: "free",
  },
  attendees: [
    { type: mongoose.Schema.Types.ObjectId, 
        ref: "User", required: false },
  ],
  startDate: {
    type: Date,
    required: true,
    
  },
  endDate: {
    type: Date,
    required: true,
    },
});

module.exports = mongoose.model("Event", eventSchema);