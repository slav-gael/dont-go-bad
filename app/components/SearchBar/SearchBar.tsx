'use client';

import React, { useState, useEffect } from "react";
import "./SearchBar.css";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type FilterResponse = {
  meals: Recipe[] | null;
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

  // Pantry stored locally
  const [pantry, setPantry] = useState<string[]>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("pantry") || "[]")
      : []
  );
  const [usePantry, setUsePantry] = useState(true);
  const toggleUsePantry = (event:any) => {
    setUsePantry(event.target.checked);
  };

  function savePantry(list: string[]) {
    setPantry(list);
    localStorage.setItem("pantry", JSON.stringify(list));
  }

  function addPantryItem(item: string) {
    if (!item.trim()) return;
    const updated = [...new Set([...pantry, item.trim()])];
    savePantry(updated);
  }

  function removePantryItem(item: string) {
    const updated = pantry.filter(i => i !== item);
    savePantry(updated);
  }

  function clearPantry() {
    savePantry([]);
  }

  

  // Load categories + areas
  useEffect(() => {
    async function loadFilters() {
      const catData = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list").then(r => r.json());
      const areaData = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list").then(r => r.json());

      setCategories(catData.meals.map((m: any) => m.strCategory));
      setAreas(areaData.meals.map((m: any) => m.strArea));
    }
    loadFilters();
  }, []);

  // MULTI-FILTER SEARCH
  useEffect(() => {
  async function fetchRecipes() {
  setLoading(true);

  const filterResults: Recipe[][] = [];

  // Search by main
  if (searchValue && searchMode === "ingredient") {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`).then(r => r.json());
    filterResults.push(res.meals ?? []);
  }

  // Pantry ingredients (multi)
  if(usePantry){
    for (const item of pantry) {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${item}`).then(r => r.json());
      filterResults.push(res.meals ?? []);
    }
  }

  if (selectedCategory) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`).then(r => r.json());
    filterResults.push(res.meals ?? []);
  }

  if (selectedArea) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`).then(r => r.json());
    filterResults.push(res.meals ?? []);
  }

  if (searchValue && searchMode === "name") {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`).then(r => r.json());
    filterResults.push(res.meals ?? []);
  }

  // If no filters selected, show empty
  if (filterResults.length === 0) {
    setRecipes([]);
    setLoading(false);
    return;
  }

  // !!Intersect all filter results!!
  let intersection = filterResults[0];
  for (let i = 1; i < filterResults.length; i++) {
    const ids = new Set(filterResults[i].map(m => m.idMeal));
    intersection = intersection.filter(m => ids.has(m.idMeal));
  }

  // Remove duplicates
  const unique = Array.from(new Map(intersection.map(m => [m.idMeal, m])).values());

  setRecipes(unique);
  setLoading(false);
}

  fetchRecipes();
}, [searchValue, searchMode, selectedCategory, selectedArea, pantry, usePantry]);

  // Surprise Me
  async function randomRecipe() {
    const data = await fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(r => r.json());
    setRecipes([data.meals[0]]);
  }

  return (
    <div>
      {/* Search input (FIXED) */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search ingredient or recipe..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen? "Hide Filters": "Show Filters"}
      </button>

      <div className={`search-layout layout-container ${sidebarOpen ? "": "sidebar-hidden"}`}>

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

          {/* Areas */}
          <div className="filter-group">
            <label className="filter-label">Cuisine / Area</label>
            <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
              <option value="">Any</option>
              {areas.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>

          {/* Pantry Section */}
          <div className="filter-group">
            <label className="filter-label">Your Pantry</label>

            <input
              type="text"
              placeholder="Add ingredient..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const input = e.target as HTMLInputElement;
                  addPantryItem(input.value);
                  input.value = ""; 
                };
              }}
            />

            <ul>
              {pantry.map(item => (
                <li key={item}>
                  {item}
                  <button onClick={() => removePantryItem(item)}>X</button>
                </li>
              ))}
            </ul>
            <label style={{display:"flex"}}>
              <input style={{display:"flex"}} type="checkbox" defaultChecked onChange={toggleUsePantry}></input>
              Use pantry to filter search
            </label>

            <button onClick={clearPantry}>Clear Pantry</button>
          </div>

          {/* Random */}
          <button className="random-btn" onClick={randomRecipe}>Surprise Me!</button>

        </div>

        {/* Recipe Results */}
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


// RecipeCard (same as before)
function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [details, setDetails] = useState<any>(null);
  const [expandedIngredients, setExpandedIngredients] = useState(false);
  const [expandedInstructions, setExpandedInstructions] = useState(false);

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
          Watch Video
        </a>
      )}
    </div>
  );
}
