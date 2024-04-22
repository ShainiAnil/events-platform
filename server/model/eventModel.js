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
    default:"https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fHww"
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