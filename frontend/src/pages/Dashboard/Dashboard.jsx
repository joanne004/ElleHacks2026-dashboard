import Sidebar from '../../components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Contact from './Contact/Contact';
import ApplicationForm from './ApplicationForm/ApplicationForm';
import FAQ from './FAQ/FAQ';
import Sponsors from './Sponsors/Sponsors';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div className={styles.dashboardContainer}>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="application-form" element={<ApplicationForm />} />
          <Route path="faq" element={<FAQ />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
