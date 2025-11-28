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

  const submitForm = async (userId, formData) => {
    const response = await API.post("/applications", { userId, formData });
    // setApplication(res.data.application);
    // localStorage(setItem("user", JSON.stringify(res.data.application)));
  };

  const getForm = async(userId) => {
    await API.get(`/applications/${userId}`);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, forgotPassword, logout, submitForm, getForm, application }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;