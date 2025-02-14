import React from "react";
import styles from "./hero.module.css";

export default function HeroSection() {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>
          Discover <span className={styles.word}>Delicious </span>
          Recipes
        </h1>
        <p>Find and cook amazing dishes with fresh ingredients.</p>
        <button className={styles.exploreBtn}>Explore Recipes</button>
      </div>
    </div>
  );
}
