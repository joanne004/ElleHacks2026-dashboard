// Quick test script to verify MongoDB connection and create initial structure
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();

const testConnection = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("✅ Connected to MongoDB!");
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`📍 Host: ${mongoose.connection.host}\n`);
    
    // List existing collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📁 Current collections:");
    if (collections.length === 0) {
      console.log("   (Empty - Collections will be created automatically on first use)");
    } else {
      collections.forEach(col => console.log(`   - ${col.name}`));
    }
    
    console.log("\n✨ Your database is ready!");
    console.log("   → Run your backend server: npm run dev");
    console.log("   → Sign up a user to create the 'users' collection");
    console.log("   → Submit an application to create the 'applications' collection\n");
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Connection failed:", error.message);
    console.error("\n🔧 Troubleshooting:");
    console.error("   1. Check your MONGO_URI in backend/.env");
    console.error("   2. Make sure your IP is whitelisted in MongoDB Atlas");
    console.error("   3. Verify your username/password are correct\n");
    process.exit(1);
  }
};

testConnection();


