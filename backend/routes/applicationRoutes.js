import express from "express";
import Application from "../models/applicationModel.js";
import User from "../models/userModel.js";

const router = express.Router();

/**
 * @route   POST /api/applications
 * @desc    Create or update a user's application
 * @access  Public (can make it protected later using JWT)
 */
router.post("/", async (req, res) => {
  try {
    const { userId, formData } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has an application
    let application = await Application.findOne({ user: userId });

    if (application) {
      // Update existing application
      application = await Application.findOneAndUpdate(
        { user: userId },
        { $set: formData },
        { new: true }
      );
      return res.status(200).json({ message: "Application updated", application });
    } else {
      // Create a new application
      const newApplication = await Application.create({
        user: userId,
        ...formData,
      });

      // Link it to the user
      user.application = newApplication._id;
      await user.save();

      return res.status(201).json({
        message: "Application submitted successfully",
        application: newApplication,
      });
    }
  } catch (error) {
    console.error("❌ Error submitting application:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route   GET /api/applications/:userId
 * @desc    Get a user's application by userId
 * @access  Public (later make it protected)
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const application = await Application.findOne({ user: userId });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("❌ Error fetching application:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route   GET /api/applications
 * @desc    Get all applications (for admin use)
 * @access  Public (restrict later)
 */
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().populate("user", "firstName lastName email");
    res.status(200).json(applications);
  } catch (error) {
    console.error("❌ Error fetching applications:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
