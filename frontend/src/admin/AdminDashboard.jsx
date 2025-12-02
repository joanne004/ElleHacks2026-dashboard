import { useEffect, useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { adminToken, logoutAdmin } = useAdminAuth();
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }

    const fetchApps = async () => {
      const res = await API.get("/applications/admin/all", {
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      setApplications(res.data);
    };

    fetchApps();
  }, [adminToken]);

  const updateStatus = async (id, status) => {
    await API.put(
      `/applications/admin/status/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    setApplications((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, status } : app
      )
    );
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={logoutAdmin}>Logout</button>

      <h2>Submitted Applications</h2>

      {applications.map((app) => (
        <div key={app._id} className="admin-app-card">
          <h3>{app.firstName} {app.lastName}</h3>
          <p>Email: {app.email}</p>
          <p>Status: {app.status}</p>

          <button onClick={() => navigate(`/admin/application/${app._id}`)}>
            View Full Application
          </button>

          <select
            value={app.status}
            onChange={(e) => updateStatus(app._id, e.target.value)}
          >
            <option value="submitted">submitted</option>
            <option value="reviewing">reviewing</option>
            <option value="accepted">accepted</option>
            <option value="waitlist">waitlist</option>
            <option value="rejected">rejected</option>
          </select>
        </div>
      ))}
    </div>
  );
}
