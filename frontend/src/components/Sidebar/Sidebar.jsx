// frontend/src/components/Sidebar/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useState } from 'react';
import styles from './Sidebar.module.css';
import logo from '../../assets/logo 4.png';
import iconHome from '../../assets/Home.png';
import iconSponsors from '../../assets/coin-hand.png';
import iconContact from '../../assets/email.png';
import iconFaq from '../../assets/message-chat-01.png';
import iconAppForm from '../../assets/appForm.png';

const Sidebar = (props) => {
  const { user, submitForm } = useAuth(); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // <-- create navigate function
  const formData = props.data;

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log(props.data);
    if (formData) {
    if (formData.status === 'draft') {
    try {
      await submitForm(user.id, formData);
    } catch (error) {
      console.error(error);
      alert("Failed to submit application");
    }
    }};  
    localStorage.removeItem('authToken'); 
    localStorage.clear();
    navigate('/login'); // redirect to login page
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <img src={logo} alt="ElleHacks logo" className={styles.brandLogo} />
        <span className={styles.brandName}>ElleHacks</span>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={handleNavClick}
            >
              <img src={iconHome} alt="Home" className={styles.icon} />
              <span className={styles.label}>Home</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/dashboard/sponsors"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={handleNavClick}
            >
              <img src={iconSponsors} alt="Sponsors" className={styles.icon} />
              <span className={styles.label}>Sponsors</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/dashboard/contact"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={handleNavClick}
            >
              <img src={iconContact} alt="Contact" className={styles.icon} />
              <span className={styles.label}>Contact</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/dashboard/application-form"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={handleNavClick}
            >
              <img src={iconAppForm} alt="Application Form" className={styles.icon} />
              <span className={styles.label}>Application Form</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/dashboard/faq"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={handleNavClick}
            >
              <img src={iconFaq} alt="FAQ" className={styles.icon} />
              <span className={styles.label}>FAQ</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </aside>

    {/* Mobile hamburger and dropdown */}
    <button
      className={styles.hamburgerButton}
      aria-label="Open menu"
      onClick={() => setIsMobileMenuOpen((o) => !o)}
    >
      <span className={styles.hamburgerBar} />
      <span className={styles.hamburgerBar} />
      <span className={styles.hamburgerBar} />
    </button>

    {isMobileMenuOpen && (
      <div className={styles.mobileMenu}>
        <nav className={styles.mobileNav}>
          <NavLink to="/dashboard/home" className={styles.mobileLink} onClick={handleNavClick}>
            <img src={iconHome} alt="Home" className={styles.icon} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/dashboard/sponsors" className={styles.mobileLink} onClick={handleNavClick}>
            <img src={iconSponsors} alt="Sponsors" className={styles.icon} />
            <span>Sponsors</span>
          </NavLink>
          <NavLink to="/dashboard/contact" className={styles.mobileLink} onClick={handleNavClick}>
            <img src={iconContact} alt="Contact" className={styles.icon} />
            <span>Contact</span>
          </NavLink>
          <NavLink to="/dashboard/application-form" className={styles.mobileLink} onClick={handleNavClick}>
            <img src={iconAppForm} alt="Application Form" className={styles.icon} />
            <span>Application Form</span>
          </NavLink>
          <NavLink to="/dashboard/faq" className={styles.mobileLink} onClick={handleNavClick}>
            <img src={iconFaq} alt="FAQ" className={styles.icon} />
            <span>FAQ</span>
          </NavLink>
        </nav>
        <button className={styles.mobileLogout} onClick={handleLogout}>Logout</button>
      </div>
    )}
    </>
  );
};

export default Sidebar;
