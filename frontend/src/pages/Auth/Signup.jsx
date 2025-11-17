import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Signup.module.css";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form.firstName, form.lastName, form.email, form.password);
      navigate("/login");
    } catch (err) {
      setError("Error creating account");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input type="text" placeholder="First Name" value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
        <input type="text" placeholder="Last Name" value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
        <input type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
