import { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import styles from "./navigation.module.css";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={`${styles.logo} interactive`} onClick={closeMobileMenu}>
          RealtyVibe
        </NavLink>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <NavLink to="/" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""} interactive`}>
            Home
          </NavLink>
          <NavLink to="/properties" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""} interactive`}>
            Properties
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""} interactive`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""} interactive`}>
            Contact
          </NavLink>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`${styles.mobileMenuToggle} interactive`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className={styles.mobileNav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ""} interactive`}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/properties"
            className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ""} interactive`}
            onClick={closeMobileMenu}
          >
            Properties
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ""} interactive`}
            onClick={closeMobileMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ""} interactive`}
            onClick={closeMobileMenu}
          >
            Contact
          </NavLink>
        </nav>
      )}
    </header>
  );
}
