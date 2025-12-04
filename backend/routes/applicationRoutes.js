import express from "express";
import Application from "../models/applicationModel.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";

const router = express.Router();
const parseBool = (v) => {
      return v === "true" ? true : v === "false" ? false : null;
}

// -------------------------------------------
// ADMIN ROUTES MUST COME FIRST
// -------------------------------------------

// Admin get all submitted applications
router.get("/admin/all", adminAuth, async (req, res) => {
  try {
    const apps = await Application.find({
      status: { $ne: "draft" }
    }).sort({ createdAt: -1 });

    res.json(apps);
  } catch (error) {
    console.error("Error fetching apps:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update status
router.put("/admin/status/:id", adminAuth, async (req, res) => {
  const { status } = req.body;

  try {
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ message: "Status updated", app });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------------------------
// NORMAL USER ROUTES
// -------------------------------------------

// Submit or update application
router.post("/", upload.single("resumeUrl"), async (req, res) => {
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
      ethnicity: req.body.ethnicity,
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
      dietaryRestrictions: req.body.dietaryRestrictions,
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
      resumeUrl: req.file ? `/uploads/resumes/${req.file.filename}` : req.body.resumeUrl ? req.body.resumeUrl : null
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

// GET application by application ID (ADMIN VIEW)
router.get("/admin/view/:id", adminAuth, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(app);
  } catch (error) {
    console.error("❌ Error fetching application:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


// Fetch single user application AFTER admin routes
router.get("/:userId", async (req, res) => {
  try {
    const application = await Application.findOne({ user: req.params.userId });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    console.error("❌ Error fetching application:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
