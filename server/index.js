const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./config/db");
const authRoute = require("./routes/auth"); 
const eventsRoute = require("./routes/events");
const categoryRoutes = require("./routes/category");
require("dotenv").config();
app.use(express.json());
app.use(cors());


connectDb();
app.use("/api/auth",authRoute)
app.use("/api/events", eventsRoute)
app.use("/api/categories", categoryRoutes)

app.all("*", (req, res) => {
   res.status(404).json("This page does not exist");
});

app.use((err, req, res, next) => {
   // Handle specific error types
   res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
