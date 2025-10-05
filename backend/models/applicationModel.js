import mongoose from "mongoose";

// Schema for storing application form data
const applicationSchema = new mongoose.Schema({
  // Link application to a specific user
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  // ---- Participants Information ----
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  preferredFirstName: { type: String },
  pronouns: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  ageOnEvent: { type: Number, required: true },
  country: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },

  disability: { 
    type: String, 
    enum: ["Yes", "No", "Prefer not to answer"] 
  },
  indigenousIdentity: { 
    type: String, 
    enum: ["Yes", "No", "Prefer not to answer"],
    required: true
  },
  ethnicity: { type: [String] }, // allow multiple options
  otherEthnicity: { type: String },

  // ---- Education ----
  levelOfStudy: { type: String, required: true },
  school: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  fieldOfStudy: { type: String, required: true },

  // ---- Hackathon Experience ----
  hackathonsAttended: { type: Number, required: true },
  attendedElleHacksBefore: { type: Boolean, required: true },
  yorkStudentNumber: { type: String },

  // ---- Resume & Links ----
  resumeUrl: { type: String },
  shareWithSponsors: { type: Boolean, default: false },
  linkedin: { type: String },
  github: { type: String },

  // ---- Event Logistics ----
  dietaryRestrictions: { type: [String] }, // multiple selections
  otherDietary: { type: String },
  tshirtSize: { type: String, enum: ["XS", "S", "M", "L", "XL"] },

  // ---- Application Questions ----
  whyElleHacks: { type: String, required: true },
  goals: { type: String, required: true },
  projectStory: { type: String, required: true },

  // ---- Final Section ----
  confirmInPerson: { type: Boolean, required: true },
  overnightStay: { type: Boolean, required: true },
  agreeCodeOfConduct: { type: Boolean, required: true },
  agreeMLHPrivacy: { type: Boolean, required: true },
  agreeMLHComms: { type: Boolean, default: false }, // optional
  accessibilityRequests: { type: String },

  // ---- Status ----
  status: { 
    type: String, 
    enum: ["submitted", "reviewing", "accepted", "waitlist", "rejected"], 
    default: "submitted" 
  }
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);

export default Application;
