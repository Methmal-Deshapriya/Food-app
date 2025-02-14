import React, { useState, useEffect, useContext } from "react";
import styles from "./fooditem.module.css";
import { ThemeContext } from "./ThemeContext"; // Import Theme Context

export default function FoodItem({ food, setFoodId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { darkMode } = useContext(ThemeContext); // Get Dark Mode state

  // Check if the recipe is already in favorites (on mount)
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(savedFavorites.some((item) => item.id === food.id));
  }, [food.id]);

  // Handle adding/removing from favorites
  const toggleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      savedFavorites = savedFavorites.filter((item) => item.id !== food.id);
    } else {
      savedFavorites.push(food);
    }

    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className={`${styles.itemContainer} ${
        darkMode ? styles.darkItemContainer : ""
      }`}
    >
      <img className={styles.itemImage} src={food.image} alt={food.title} />
      <div className={styles.itemContent}>
        <p className={styles.itemName}>{food.title}</p>
      </div>
      <div className={styles.buttonContainer}>
        {/* Favorite Button */}
        <button
          className={`${styles.favoriteButton} ${
            darkMode ? styles.darkFavoriteButton : ""
          }`}
          onClick={toggleFavorite}
        >
          {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
        </button>

        {/* View Recipe Button */}
        <button
          onClick={() => {
            setFoodId(food.id);
          }}
          className={`${styles.itemButton} ${
            darkMode ? styles.darkItemButton : ""
          }`}
        >
          View Recipe 🔎
        </button>
      </div>
    </div>
  );
}
