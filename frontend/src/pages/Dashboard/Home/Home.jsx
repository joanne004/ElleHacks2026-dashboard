import { useAuth } from "../../../context/AuthContext";
import styles from "./Home.module.css";

const Home = () => {
  const { user } = useAuth();
  const firstName = user?.firstName || "user name";

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Home</h2>
        <div className={styles.divider}></div>
        <h1 className={styles.greeting}>Hi, {firstName}!</h1>
        <p className={styles.welcome}>Welcome to ElleHacks 26</p>
      </div>
    </div>
  );
};

export default Home;