import express from "express";
import Application from "../models/applicationModel.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// CREATE or UPDATE APPLICATION
router.post(
  "/",
  upload.single("resume"),
  async (req, res) => {
    console.log("📥 POST /api/applications hit");
    console.log("➡ req.body:", req.body);
    console.log("➡ req.file:", req.file);

    try {
      const userId = req.body.userId;

      if (!userId) {
        return res.status(400).json({
          message: "Missing userId!",
          bodyReceived: req.body
        });
      }

      // Parse formData fields
      const formData = {};
      for (let key in req.body) {
        if (key.startsWith("formData[")) {
          const clean = key.replace("formData[", "").replace("]", "");
          formData[clean] = req.body[key];
        }
      }

      if (req.file) {
        formData.resumeUrl = `/uploads/resumes/${req.file.filename}`;
      }

      const newApplication = await Application.findOneAndUpdate(
        { userId },
        { $set: formData },
        { upsert: true, new: true }
      );

      res.json({
        message: "Application saved",
        application: newApplication
      });

    } catch (error) {
      console.error("❌ SERVER ERROR:", error);
      res.status(500).json({
        message: "Server error",
        error: error.message
      });
    }
  }
);


router.get("/:userId", async (req, res) => {
  try {
    const app = await Application.findOne({ userId: req.params.userId });
    if (!app) return res.status(404).json({ message: "Not found" });
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
