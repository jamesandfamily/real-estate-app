import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>RealtyVibe</h3>
            <p style={{ color: "var(--color-neutral-11)", lineHeight: 1.6 }}>
              Discover your dream property with our curated collection of exceptional real estate.
            </p>
          </div>

          <div className={styles.section}>
            <h3>Quick Links</h3>
            <div className={styles.links}>
              <Link to="/" className="interactive">Home</Link>
              <Link to="/properties" className="interactive">Properties</Link>
              <Link to="/about" className="interactive">About Us</Link>
              <Link to="/contact" className="interactive">Contact</Link>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Connect</h3>
            <div className={styles.social}>
              <a href="#" className={`${styles.socialLink} interactive`} aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className={`${styles.socialLink} interactive`} aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className={`${styles.socialLink} interactive`} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className={`${styles.socialLink} interactive`} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} RealtyVibe. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="#" className="interactive">Privacy Policy</a>
            <a href="#" className="interactive">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
