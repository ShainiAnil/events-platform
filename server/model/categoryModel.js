const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    category:{
        type: String,
        required: true,
        trim: true,
    }
})

module.exports = mongoose.model("Category", categorySchema);