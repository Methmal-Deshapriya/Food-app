import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "./ThemeContext";

export default function Nav() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className={`${styles.nav} ${darkMode ? styles.darkNav : ""}`}>
      <div className={styles.logo}>
        <span className={styles.food}>FOOD</span>App
      </div>

      {/* Menu Items */}
      <ul className={`${styles.menu} ${isOpen ? styles.showMenu : ""}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favorites"> Favorites</Link>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>

      {/* Dark Mode Toggle Button */}
      <button className={styles.toggleButton} onClick={toggleTheme}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Hamburger Menu */}
      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
}
