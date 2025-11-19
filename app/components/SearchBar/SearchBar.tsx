'use client';

import React, { useState, useEffect } from "react";
import "./SearchBar.css";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchMode, setSearchMode] = useState("ingredient");
  const [categories, setCategories] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch categories and areas once
  useEffect(() => {
    async function loadFilters() {
      const catData = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list").then(r => r.json());
      const areaData = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list").then(r => r.json());

      setCategories(catData.meals.map((m: any) => m.strCategory));
      setAreas(areaData.meals.map((m: any) => m.strArea));
    }
    loadFilters();
  }, []);

  // Fetch based on selected filters
  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);

      let url = "";

      if (selectedCategory) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      } else if (selectedArea) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
      } else if (searchMode === "ingredient" && searchValue) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`;
      } else if (searchMode === "name" && searchValue) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
      } else {
        setRecipes([]);
        setLoading(false);
        return;
      }

      const res = await fetch(url);
      const data = await res.json();

      setRecipes(data.meals || []);
      setLoading(false);
    }

    fetchRecipes();
  }, [searchValue, searchMode, selectedCategory, selectedArea]);

  // Surprise Me
  async function randomRecipe() {
    const data = await fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(r => r.json());
    setRecipes([data.meals[0]]);
  }

  return (
    <div>
      {/* Toggle for sidebar */}
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen? "Hide Filters": "Show Filters"}
      </button>

      <div className="search-layout">

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "": "hidden"}`}>

          {/* Search mode */}
          <div className="filter-group">
            <label className="filter-label">Search Mode</label>
            <select value={searchMode} onChange={(e) => setSearchMode(e.target.value)}>
              <option value="ingredient">By Ingredient</option>
              <option value="name">By Recipe Name</option>
            </select>
          </div>

          {/* Category */}
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Any</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Area */}
          <div className="filter-group">
            <label className="filter-label">Cuisine / Area</label>
            <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
              <option value="">Any</option>
              {areas.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>

          {/* Random recipe */}
          <button className="random-btn" onClick={randomRecipe}>Surprise Me!</button>

        </div>

        {/* Recipe Grid */}
        <div className="recipe-grid">
          {loading && <p>Loading...</p>}

          {recipes.map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>

      </div>
    </div>
  );
}

//
// RecipeCard inside same file (no new folders)
//
function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [details, setDetails] = useState<any>(null);
  const [expandedIngredients, setExpandedIngredients] = useState(false);
  const [expandedInstructions, setExpandedInstructions] = useState(false);
  
function formatInstructions(instructions: string): string[] {
  return instructions
  .split(/\.(?!\d)/)//splits at the .
  .map(step => step.trim())
  .filter(step => step.length > 0);
}
  // Fetch full recipe details when clicked
  async function loadDetails() {
    if (details) return;
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`).then(r => r.json());
    setDetails(data.meals[0]);
  }

  return (
    <div className="recipe-card">
      <img className="recipe-img" src={recipe.strMealThumb} alt={recipe.strMeal} />

      <h3>{recipe.strMeal}</h3>

      <button
        className="expand-btn"
        onClick={() => {
          setExpandedIngredients(!expandedIngredients);
          loadDetails();
        }}
      >
        {expandedIngredients? "Hide Ingredients": "Show Ingredients"}
      </button>

      {expandedIngredients && details && (
        <ul style={{ textAlign: "left" }}>
          {Object.entries(details)
            .filter(([key, val]) => key.startsWith("strIngredient") && val)
            .map(([key, ing], index) => {
              const measure = details[`strMeasure${index + 1}`];
              return <li key={index}>{ing} — {measure}</li>;
            })}
        </ul>
      )}

      <button
        className="expand-btn"
        onClick={() => {
          setExpandedInstructions(!expandedInstructions);
          loadDetails();
        }}
      >
        {expandedInstructions? "Hide Instructions": "Show Instructions"}
      </button>

      {expandedInstructions && details && (
        <p style={{ textAlign: "left" }}>{details.strInstructions}</p>
      )}

      {details?.strYoutube && (
        <a className="youtube-link" href={details.strYoutube} target="_blank">
          🎥 Watch Video
        </a>
      )}
    </div>
  );
}
