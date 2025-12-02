import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyCode from "./pages/Auth/VerifyCode";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Dashboard/Home/Home";
import { AuthProvider, useAuth } from "./context/AuthContext";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminViewApplication from "./admin/AdminViewApplication";

import { useAdminAuth } from "./context/AdminAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function AppRouter() {
  const { adminToken } = useAdminAuth();   // ✅ FIXED

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verifycode" element={<VerifyCode />} />

          {/* 🔥 ADMIN ROUTES OUTSIDE NORMAL DASHBOARD */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              adminToken ? <AdminDashboard /> : <Navigate to="/admin/login" />
            }
          />

          <Route
            path="/admin/application/:id"
            element={
              adminToken ? <AdminViewApplication /> : <Navigate to="/admin/login" />
            }
          />

          {/* USER DASHBOARD */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
