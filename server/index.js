const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./config/db");
const userRoute = require("./routes/user") 
require("dotenv").config();
app.use(cors());
app.use(express.json());
connectDb();
app.use("/api/users", userRoute)
app.all("*", (req, res) => {
   res.status(404).json("This page does not exist");
});

app.use((err, req, res, next) => {
   // Handle specific error types
   res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
