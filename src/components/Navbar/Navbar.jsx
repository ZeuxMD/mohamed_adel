import styles from "./Navbar.module.css";
import Logo from "../Logo";
import { useEffect, useId, useRef, useState } from "react";

function Navbar({ activeSection, handleNavigate, sections }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navId = useId();
  const navRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    function handleOutsidePointerDown(event) {
      if (!navRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("pointerdown", handleOutsidePointerDown);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("pointerdown", handleOutsidePointerDown);
    };
  }, [isMenuOpen]);

  function toggleMenu() {
    setIsMenuOpen((currentValue) => !currentValue);
  }

  return (
    <nav ref={navRef} className={`${styles.nav} breakout`}>
      <button
        type="button"
        className={styles.logoButton}
        onClick={() => {
          handleNavigate(sections[0].ref, sections[0].id);
          setIsMenuOpen(false);
        }}
        aria-label="Go to home section"
      >
        <Logo />
      </button>

      <button
        type="button"
        className={styles.hamburgerButton}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls={navId}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        ☰
      </button>

      <ul
        id={navId}
        className={`${styles.navList} ${isMenuOpen ? styles.active : ""}`}
      >
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              className={`${styles.navBtn} ${
                activeSection === section.id ? styles.navBtnActive : ""
              }`}
              onClick={() => {
                handleNavigate(section.ref, section.id);
                setIsMenuOpen(false);
              }}
              data-active={activeSection === section.id}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
