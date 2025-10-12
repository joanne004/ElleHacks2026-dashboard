import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Signup.module.css";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });  
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await signup(form.firstName, form.lastName, form.email, form.password);
      navigate("/login");
    } catch (err) {
      setError("Error creating account");
    }
  };

  return (
    <>
     <div className={styles.signupPageBackground}> 
        <div className={styles.signupContainer}> 
          <div className={styles.signupContent}> 
            <h1>Join ElleHacks26</h1>
            <p>Create your account to start your application.</p>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}> 
                <div className={styles.formGroup}> 
                  <label htmlFor="firstName">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="ex. Mary"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}> 
                  <label htmlFor="lastName">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="ex. Smith"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}> 
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  placeholder="ex. mary.smith@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}> 
                <label htmlFor="password">Password*</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create your password..."
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}> 
                <label htmlFor="confirmPassword">Confirm Password*</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password..."
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                />
              </div>
    
              <button type="submit" className={styles.createAccountButton}>Create Account</button> 
              {error && <p className={styles.errorMessage}>{error}</p>} 
              <p className={styles.signinLink}> 
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </form>
          
          </div>
        </div>
      </div>
    </>
  );
}
