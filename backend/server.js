import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());

// ❗ DO NOT USE express.json() BEFORE multer  
// Multer must receive the raw multipart data.
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
