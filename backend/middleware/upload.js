import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute safe path
const uploadPath = path.join(__dirname, "..", "uploads", "resumes");

// Ensure folder exists
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("📁 MULTER destination OK");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    console.log("📝 MULTER filename OK:", file.originalname);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
