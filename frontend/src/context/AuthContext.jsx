import { createContext, useContext, useState } from "react";
import API from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

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
    localStorage.clear();
  };

  const submitForm = async (userId, formData) => {
    console.log("📥 submitForm() CALLED");
    console.log("👉 userId RECEIVED:", userId);
    console.log("formData RECEIVED:", formData);

    const data = new FormData();

    // Add userId
    data.append("userId", userId);

    // Loop through each field
    Object.entries(formData).forEach(([key, value]) => {
      console.log(`🔧 Processing field: ${key} =`, value);

      // Handle FILE (resume)
      if (key === "resumeUrl") {
        if (value instanceof File) {
          console.log(`📎 Resume file detected: ${value.name}`);
          data.append("resumeUrl", value);
        } else if (typeof value === "string") {
          console.log("➡️ Existing resume URL detected:", value);
          data.append("resumeUrl", value);
      }
      return;
    }

    // Handle ARRAYS (ethnicity, dietaryRestrictions, etc.)
    if (Array.isArray(value)) {
      console.log(`📚 Array field detected: ${key} (${value.length} items)`);
      value.forEach((item) => data.append(key, item));
      return;
    }

    // NORMAL fields → no nesting!
    data.append(key, value);
  });

  // Show final formdata before submission
  console.log("🧾 FINAL FORMDATA:");
  for (let pair of data.entries()) {
    console.log("   →", pair);
  }

  console.log("📤 Sending POST to /api/applications ...");

  return await API.post("/applications", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};



  const getForm = async(userId) => {
    return await API.get(`/applications/${userId}`);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, forgotPassword, logout, submitForm, getForm }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;