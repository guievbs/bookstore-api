const express = require("express");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Server Error");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
