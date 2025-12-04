import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminViewApplication() {
  const { id } = useParams();
  const { adminToken } = useAdminAuth();

  const [app, setApp] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (!adminToken) return;

    API.get(`/applications/admin/view/${id}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    })
      .then((res) => {
        setApp(res.data);
        setNewStatus(res.data.status);
      })
      .catch((err) => console.error("Error loading application:", err));
  }, [id, adminToken]);

  const updateStatus = async () => {
    await API.put(
      `/applications/admin/status/${id}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    alert("Status updated!");
  };

  if (!app) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {app.firstName} {app.lastName}
      </h1>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Personal Information</h2>
        <Info label="Preferred Name" value={app.preferredFirstName} />
        <Info label="Pronouns" value={app.pronouns} />
        <Info label="Email" value={app.email} />
        <Info label="Phone" value={app.phone} />
        <Info label="Age" value={app.ageOnEvent} />
        <Info label="Country" value={app.country} />
        <Info label="Province" value={app.province} />
        <Info label="City" value={app.city} />
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Education</h2>
        <Info label="Level of Study" value={app.levelOfStudy} />
        <Info label="School" value={app.school} />
        <Info label="Graduation Year" value={app.graduationYear} />
        <Info label="Field of Study" value={app.fieldOfStudy} />
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Hackathon Experience</h2>
        <Info label="# Hackathons Attended" value={app.hackathonsAttended} />
        <Info label="Attended ElleHacks Before?" value={String(app.attendedElleHacksBefore)} />
        <Info label="York Student Number" value={app.yorkStudentNumber} />
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Dietary & Accessibility</h2>
        <Info label="Dietary Restrictions" value={app.dietaryRestrictions?.join(", ")} />
        <Info label="Other Dietary" value={app.otherDietary} />
        <Info label="Accessibility Requests" value={app.accessibilityRequests} />
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Application Answers</h2>
        <Info label="Why ElleHacks?" value={app.whyElleHacks} long />
        <Info label="Goals" value={app.goals} long />
        <Info label="Project Story" value={app.projectStory} long />
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Resume</h2>

        {app.resumeUrl ? (
          <a
            href={`http://localhost:5000${app.resumeUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.resumeButton}
          >
            View Resume PDF
          </a>
        ) : (
          <p>No resume uploaded.</p>
        )}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Status</h2>
        <select
          style={styles.select}
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="submitted">submitted</option>
          <option value="reviewing">reviewing</option>
          <option value="accepted">accepted</option>
          <option value="waitlist">waitlist</option>
          <option value="rejected">rejected</option>
        </select>

        <button onClick={updateStatus} style={styles.saveButton}>
          Save Status
        </button>
      </div>
    </div>
  );
}

/* Small reusable row component */
function Info({ label, value, long }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <strong>{label}:</strong>
      <p style={{ margin: "3px 0", whiteSpace: long ? "pre-wrap" : "normal" }}>
        {value || "—"}
      </p>
    </div>
  );
}

/* Inline styles - replace with CSS later if you want */
const styles = {
  container: {
    width: "75%",
    margin: "auto",
    padding: "30px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
    lineHeight: "1.5"
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "20px"
  },
  section: {
    marginBottom: "30px",
    paddingBottom: "15px",
    borderBottom: "1px solid #ddd"
  },
  sectionTitle: {
    fontSize: "22px",
    borderLeft: "4px solid #444",
    paddingLeft: "10px",
    marginBottom: "10px"
  },
  resumeButton: {
    display: "inline-block",
    padding: "10px 15px",
    background: "#007bff",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none"
  },
  select: {
    padding: "8px",
    width: "200px",
    marginRight: "10px"
  },
  saveButton: {
    padding: "8px 14px",
    background: "#28a745",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer"
  }
};
