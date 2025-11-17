'use client'

import React, { useState, useEffect } from "react";
import "./SearchBar.css";

type Recipe = {
  strMeal: string // title
  strMealThumb: string // image
  idMeal: string // id
}

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState(""); // user input
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false); // waiting on fetchRecipes, used to let client know it is loading

    useEffect(() => {
        if (!searchValue) { // if no input, don't try to fetch
            setRecipes([]);
            return;
        }

    // ----------------------------------------------------------------
    // Searches by !!main!! ingredient, currently does not allow partial matches
    // i.e. "chicken" will bring up all recipes with chicken in the name, but not "chick"
    // since this searches by main ingredient, something like "cabbage" yields no results
    // ----------------------------------------------------------------
    async function fetchRecipes() {
        setLoading(true);
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`);
        const data = await res.json();
        const recipesArray: Recipe[] = data.meals || [];
        setRecipes(recipesArray);
        setLoading(false);
    }

    fetchRecipes();
}, [searchValue]); // fetch whenever user types

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search for an ingredient..."
      />

        {/* Clear button and loading both render conditionally */}
      {searchValue && <button onClick={() => setSearchValue("")}>Clear</button>}

      {loading && <p>Loading...</p>}

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.idMeal}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            {recipe.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;