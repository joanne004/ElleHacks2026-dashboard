// frontend/src/components/Sidebar/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom'; // <-- import useNavigate
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const navigate = useNavigate(); // <-- create navigate function

  // <-- define handleLogout inside the component
  const handleLogout = () => {
    // Optional: clear auth info
    localStorage.removeItem('authToken'); 
    navigate('/login'); // redirect to login page
  };

  return (
    <div className={styles.sidebar}>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/application-form">My Application</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/faq">FAQ</NavLink>
          </li>
        </ul>
      </nav>
       <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
