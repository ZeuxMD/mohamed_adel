import styles from "./Navbar.module.css";
import Logo from "../Logo";
import { useState } from "react";

function Navbar({ refs, handleNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [homeRef, projectsRef, aboutRef, contactRef] = refs;

  return (
    <nav className={`${styles.nav} breakout`}>
      <Logo />

      {/* Hamburger Menu Icon (visible on smaller screens) */}
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
        ☰
      </button>

      <ul className={`${styles.navList} ${isMenuOpen ? styles.active : ""}`}>
        <li>
          <button
            className={`${styles.navBtn} ${styles.active}`}
            onClick={() => {
              handleNavigate(homeRef);
              setIsMenuOpen(false); // Close the menu
            }}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={styles.navBtn}
            onClick={() => {
              handleNavigate(projectsRef);
              setIsMenuOpen(false); // Close the menu
            }}
          >
            Projects
          </button>
        </li>
        <li>
          <button
            className={styles.navBtn}
            onClick={() => {
              handleNavigate(aboutRef);
              setIsMenuOpen(false); // Close the menu
            }}
          >
            About me
          </button>
        </li>
        <li>
          <button
            className={styles.navBtn}
            onClick={() => {
              handleNavigate(contactRef);
              setIsMenuOpen(false); // Close the menu
            }}
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
