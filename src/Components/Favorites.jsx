import React, { useState, useEffect, useContext } from "react";
import styles from "./favorites.module.css";
import { ThemeContext } from "./ThemeContext"; // Import Theme Context
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { darkMode } = useContext(ThemeContext); // Get Dark Mode state

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Remove from favorites
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div
      className={`${styles.favoritesContainer} ${
        darkMode ? styles.darkFavoritesContainer : ""
      }`}
    >
      <h1 className={darkMode ? styles.darkHeading : ""}>
        My Favorite Recipes
      </h1>
      {favorites.length === 0 ? (
        <p className={darkMode ? styles.darkText : ""}>
          No favorite recipes yet. Start adding some! ❤️
        </p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((food) => (
            <div
              key={food.id}
              className={`${styles.favoriteCard} ${
                darkMode ? styles.darkFavoriteCard : ""
              }`}
            >
              <img src={food.image} alt={food.title} className={styles.image} />
              <div className={styles.favoriteRecipeName}>
                <h3 className={darkMode ? styles.darkText : ""}>
                  {food.title}
                </h3>
              </div>
              <div className={styles.removeButtonContainer}>
                <button
                  className={`${styles.removeButton} ${
                    darkMode ? styles.darkRemoveButton : ""
                  }`}
                  onClick={() => removeFavorite(food.id)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
