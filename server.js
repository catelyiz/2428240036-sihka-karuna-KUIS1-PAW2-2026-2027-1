import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import songRoutes from "./routes/songRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Routes
app.use("/api/songs", songRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Manajemen Data Lagu berjalan dengan baik",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
