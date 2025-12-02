import express from "express";
import Application from "../models/applicationModel.js";
import User from "../models/userModel.js";
import upload from "../middleware/upload.js";

const router = express.Router();
const parseBool = (v) => {
      return v === "true" ? true : v === "false" ? false : null;
}

/**
 * @route   POST /api/applications
 * @desc    Create or update a user's application
 * @access  Public (can make it protected later using JWT)
 */
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    console.log("🔥 Incoming POST /api/applications");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);



    const data = {
      user: req.body.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      preferredFirstName: req.body.preferredFirstName,
      pronouns: req.body.pronouns,
      email: req.body.email,
      phone: req.body.phone,
      ageOnEvent: req.body.ageOnEvent,
      country: req.body.country,
      province: req.body.province,
      city: req.body.city,
      disability: req.body.disability,
      indigenousIdentity: req.body.indigenousIdentity,
      ethnicity: req.body.ethnicity, // array
      otherEthnicity: req.body.otherEthnicity,
      levelOfStudy: req.body.levelOfStudy,
      school: req.body.school,
      graduationYear: req.body.graduationYear,
      fieldOfStudy: req.body.fieldOfStudy,
      hackathonsAttended: req.body.hackathonsAttended,
      attendedElleHacksBefore: parseBool(req.body.attendedElleHacksBefore),
      yorkStudentNumber: req.body.yorkStudentNumber,
      shareWithSponsors: parseBool(req.body.shareWithSponsors),
      linkedin: req.body.linkedin,
      github: req.body.github,
      dietaryRestrictions: req.body.dietaryRestrictions, // array
      otherDietary: req.body.otherDietary,
      tshirtSize: req.body.tshirtSize,
      whyElleHacks: req.body.whyElleHacks,
      goals: req.body.goals,
      projectStory: req.body.projectStory,
      confirmInPerson: req.body.confirmInPerson,
      overnightStay: parseBool(req.body.overnightStay),
      agreeCodeOfConduct: req.body.agreeCodeOfConduct,
      agreeMLHPrivacy: req.body.agreeMLHPrivacy,
      agreeMLHComms: parseBool(req.body.agreeMLHComms),
      accessibilityRequests: req.body.accessibilityRequests,
      status: req.body.status,
      resumeUrl: req.file ? `/uploads/resumes/${req.file.filename}` : null
    };

    let app = await Application.findOne({ user: req.body.userId });

    if (app) {
      // Update existing application
      app = await Application.findOneAndUpdate(
        { user: req.body.userId },
        { $set: data },
        { new: true }
      );
    } else {
      // Create new application
      app = new Application(data);
      await app.save();
    }

    res.status(201).json(app);

  } catch (err) {
    console.warn("❌ APPLICATION POST ERROR:", err);
    res.status(500).json({ message: "Failed to submit application", error: err.message });
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
