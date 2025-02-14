import { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./Components/Search";
import FoodList from "./Components/FoodLIst";
import Nav from "./Components/Nav";
import "./app.module.css";
import Container from "./Components/Container";
import InnerContainer from "./Components/InnerContainer";
import FoodDetails from "./Components/FoodDetails";
import HeroSection from "./Components/HeroSection";
import Favorites from "./Components/Favorites";
import styles from "./app.module.css";
import { ThemeProvider, ThemeContext } from "./Components/ThemeContext";

function AppContent() {
  const [foodData, setFoodData] = useState([]);
  const [foodId, setFoodId] = useState("658615");
  const { darkMode } = useContext(ThemeContext); // Access Dark Mode state

  return (
    <div className={`${styles.appContainer} ${darkMode ? styles.dark : ""}`}>
      <Nav />
      <HeroSection />
      <Search foodData={foodData} setFoodData={setFoodData} />

      <Routes>
        {/* Home Route (Default) */}
        <Route
          path="/"
          element={
            <Container>
              <InnerContainer>
                <FoodList setFoodId={setFoodId} foodData={foodData} />
              </InnerContainer>
              <InnerContainer>
                <FoodDetails foodId={foodId} />
              </InnerContainer>
            </Container>
          }
        />

        {/* Favorites Page Route */}
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
