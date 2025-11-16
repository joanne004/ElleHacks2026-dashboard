import styles from './Contact.module.css';
import imageTop from '../../../assets/image 28.png';
import imageBottom from '../../../assets/image 26.png';

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Contact Us</h2>
        <div className={styles.divider}></div>
        <h1 className={styles.greeting}>We're here to Support!</h1>

        <img src={imageTop} alt="Support icon" className={styles.imageTop} />

        <p className={styles.paragraph}>
          Throughout the event, we will always have volunteers or organizers available to answer any questions you may have, through any challenges that may arise.
        </p>
        <p className={styles.paragraph}>
          Prior to the event, the best way to reach us is via email at <strong>questions@ellehacks.com</strong>.
        </p>
        <p className={styles.paragraph}>
          During the event, the best way to reach us is via Discord in the <strong>#general-help</strong> channel, or one of the channels under the HELP category. Please tag <strong>@volunteer</strong> or <strong>@organizer</strong> in your message for an urgent response.
        </p>

        <ul className={styles.list}>
          <li>
            <a className={styles.link} href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" target="_blank" rel="noreferrer">MLH Code of Conduct</a>
          </li>
          <li>
            <a className={styles.link} href="https://mlh.io/privacy" target="_blank" rel="noreferrer">MLH Privacy Policy</a>
          </li>
          <li>
            <a className={styles.link} href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noreferrer">MLH Contest Terms</a>
          </li>
          <li>
            <a className={styles.link} href="#" target="_blank" rel="noreferrer">ElleHacks 2026 – Participant Consent, Photo Release, and Code of Conduct.pdf</a>
          </li>
        </ul>

        <img src={imageBottom} alt="ElleHacks illustration" className={styles.imageBottom} />
      </div>
    </div>
  );
};

export default Contact;
