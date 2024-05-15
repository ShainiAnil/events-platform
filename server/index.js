const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./config/db");
const authRoute = require("./routes/auth"); 
const eventsRoute = require("./routes/events");
const categoryRoutes = require("./routes/category");
const googleAuthRoutes = require("./routes/googleAuth")

require("dotenv").config();
app.use(express.json());
//app.use(cors());
// app.use(
//    cors({
//      origin: ["http://localhost:5173","https://eventvibe-app.netlify.app"],
//      credentials: true,
//    })
//  );
const corsOptions = {
   origin: ["http://localhost:5173","https://eventvibe-app.netlify.app","https://events-platform-amlk.onrender.com/"], 
   methods: 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
   allowedHeaders: 'Content-Type,Authorization, Access-Control-Allow-Origin',
   credentials: true,
   optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
connectDb();
app.use("/api/auth",authRoute)
app.use("/api/events", eventsRoute)
app.use("/api/categories", categoryRoutes)
app.use("/api/google-auth",googleAuthRoutes)
app.all("*", (req, res) => {
   res.status(404).json("This page does not exist");
});

app.use((err, req, res, next) => {
   // Handle specific error types
   res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
