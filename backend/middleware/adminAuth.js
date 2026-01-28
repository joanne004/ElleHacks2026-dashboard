// backend/middleware/adminAuth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
