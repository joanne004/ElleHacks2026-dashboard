import { createContext, useContext, useState } from "react";
import API from "../utils/api";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || null);

  const loginAdmin = async (username, password) => {
    const res = await API.post("/admin/login", { username, password });

    const token = res.data.token;
    setAdminToken(token);
    localStorage.setItem("adminToken", token);
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    localStorage.removeItem("adminToken");
  };

  return (
    <AdminAuthContext.Provider value={{ adminToken, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
