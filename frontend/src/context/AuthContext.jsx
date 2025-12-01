import { createContext, useContext, useState } from "react";
import API from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [application, setApplication] = useState(JSON.parse(localStorage.getItem("application")) || null);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  const signup = async (firstName, lastName, email, password) => {
    await API.post("/auth/signup", { firstName, lastName, email, password });
  };

  const forgotPassword = async (firstName, lastName, email, newPassword) => {
    await API.post("/auth/forgotpassword", { firstName, lastName, email, newPassword });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ---------------------------------------------------------
  // 🔥🔥🔥 ADDING LOGS TO SUBMIT FORM
  // ---------------------------------------------------------
  const submitForm = async (userId, formData) => {

    console.log("📥 submitForm() CALLED");
    console.log("👉 userId RECEIVED:", userId);
    console.log("👉 formData RECEIVED:", formData);

    const data = new FormData();
    data.append("userId", userId);

    // Log after appending userId
    console.log("📌 Added userId to FormData");

    // Build FormData
    Object.entries(formData).forEach(([key, value]) => {
      
      console.log(`🔧 Processing field: ${key} =`, value);

      // Resume file
      if (key === "resumeUrl") {
        if (value instanceof File) {
          console.log("📎 Resume file detected:", value.name);
          data.append("resume", value);
        } else if (typeof value === "string") {
          console.log("🔗 Resume URL string detected:", value);
          data.append(`formData[resumeUrl]`, value);
        }
        return;
      }

      // Arrays
      if (Array.isArray(value)) {
        console.log(`📚 Array field detected: ${key} (${value.length} items)`);
        value.forEach((item, i) => {
          data.append(`formData[${key}][${i}]`, item);
        });
        return;
      }

      // Simple field
      data.append(`formData[${key}]`, value);
    });

    // ---------------------------------------------------------
    // LOG FULL FORMDATA CONTENTS
    // ---------------------------------------------------------
    console.log("📦 FINAL FORMDATA ENTRIES:");
    for (let pair of data.entries()) {
      console.log("   →", pair);
    }

    // ---------------------------------------------------------
    // SEND REQUEST
    // ---------------------------------------------------------
    try {
      console.log("🚀 Sending POST to /api/applications ....");
      const response = await API.post("/applications", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ POST SUCCESS — SERVER RESPONSE:", response.data);
      return response;
    } catch (error) {
      console.error("❌ POST ERROR in submitForm()", error.response?.data || error.message);
      throw error;
    }
  };
  // ---------------------------------------------------------

  const getForm = async (userId) => {
    console.log("📥 getForm() CALLED for user:", userId);
    return await API.get(`/applications/${userId}`);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, forgotPassword, logout, submitForm, getForm, application }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
