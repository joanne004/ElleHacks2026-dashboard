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
  firstName: { type: String },
  lastName: { type: String },
  preferredFirstName: { type: String },
  pronouns: { type: String },
  email: { type: String },
  phone: { type: String },

  ageOnEvent: { type: Number },
  country: { type: String },
  province: { type: String },
  city: { type: String },

  disability: { 
    type: String, 
    // enum: ["Yes", "No", "Prefer not to answer"],
    // default: "No"
  },
  indigenousIdentity: { 
    type: String, 
    // enum: ["Yes", "No", "Prefer not to answer"],
    // default: "No"
  },
  ethnicity: { type: [String] }, // allow multiple options
  otherEthnicity: { type: String },

  // ---- Education ----
  levelOfStudy: { type: String },
  school: { type: String },
  graduationYear: { type: Number },
  fieldOfStudy: { type: String },

  // ---- Hackathon Experience ----
  hackathonsAttended: { type: Number },
  attendedElleHacksBefore: { type: Boolean, default: null },
  yorkStudentNumber: { type: String },

  // ---- Resume & Links ----
  resumeUrl: { type: Object },
  shareWithSponsors: { type: Boolean, default: null },
  linkedin: { type: String },
  github: { type: String },

  // ---- Event Logistics ----
  dietaryRestrictions: { type: [String] }, // multiple selections
  otherDietary: { type: String },
  tshirtSize: { type: String, 
    // enum: ["XS", "S", "M", "L", "XL"], 
    // default: "M"
  },

  // ---- Application Questions ----
  whyElleHacks: { type: String },
  goals: { type: String },
  projectStory: { type: String },

  // ---- Final Section ----
  confirmInPerson: { type: Boolean },
  overnightStay: { type: Boolean },
  agreeCodeOfConduct: { type: Boolean },
  agreeMLHPrivacy: { type: Boolean },
  agreeMLHComms: { type: Boolean, default: null }, // optional
  accessibilityRequests: { type: String },

  // ---- Status ----
  status: { 
    type: String, 
    enum: ["draft", "submitted", "reviewing", "accepted", "waitlist", "rejected"], 
    default: "draft" 
  }
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);

export default Application;
