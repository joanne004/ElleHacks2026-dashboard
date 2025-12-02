import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router";
import "./index.css";

import { AdminAuthProvider } from "./context/AdminAuthContext"; // ⭐ IMPORTANT

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminAuthProvider> 
      <AppRouter />
    </AdminAuthProvider>
  </React.StrictMode>
);
