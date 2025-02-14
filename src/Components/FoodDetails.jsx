import { useEffect, useState, useContext } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";
import { ThemeContext } from "./ThemeContext"; // Import Dark Mode Context

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext); // Access Dark Mode state

  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "ebc4e8af59c044258a394db73f0c24dc";

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);

  return (
    <div
      className={`${styles.recipeCard} ${
        darkMode ? styles.darkRecipeCard : ""
      }`}
    >
      <div>
        <div className={styles.recipeName}>
          <h1>{food.title}</h1>
        </div>
        <div>
          <img
            className={styles.recipeImage}
            src={food.image}
            alt={food.title}
          />
        </div>
        <div
          className={`${styles.recipeDetails} ${
            darkMode ? styles.darkRecipeDetails : ""
          }`}
        >
          <span>
            <strong>🕙 {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            <strong>👨🏻‍👩🏻‍👧🏻 Serves {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥗 Vegetarian" : "🥩 Non-Vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "🐮 Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          <strong
            className={`${styles.recipePrice} ${
              darkMode ? styles.darkRecipePrice : ""
            }`}
          >
            💵 ${((food.pricePerServing * 100) / 10000).toFixed(2)} Per Serving
          </strong>
        </div>
        <h2>Ingredients</h2>
        <ItemList food={food} isLoading={isLoading} />
        <h2>Instructions</h2>
        <div
          className={`${styles.recipeInstructions} ${
            darkMode ? styles.darkRecipeInstructions : ""
          }`}
        >
          <ol>
            {isLoading
              ? "Loading...."
              : food.analyzedInstructions?.[0]?.steps.map((step, index) => (
                  <li key={index}>{step.step}</li>
                ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
