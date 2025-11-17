import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },   // Signup field
  lastName: { type: String, required: true },    // Signup field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },


  // Reference to the user's application (links to application model by ID)
  application: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Application" 
  }
}, { timestamps: true });
//timestamps will automatically add createdAt and updatedAt fields

// 🔹 Virtual field lets us access the application status directly from the User
userSchema.virtual("applicationStatus", {
  ref: "Application",             //Reference the application model
  localField: "application",      //match this field in user
  foreignField: "_id",            //with this field in application
  justOne: true,                  // return a single application, since one user has one application
  options: { select: "status" } // only return status field
});

//Create User model from the schema
const User = mongoose.model("User", userSchema);

//Export the model so it can be used in routes, controllers, etc.
export default User;
