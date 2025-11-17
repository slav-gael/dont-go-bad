'use client'

import React, { ReactHTMLElement } from "react"
import { useState } from "react"
import "./SearchBar.css"

type SearchBarProps = {
    recipes: string[]
}

const SearchBar = ({ recipes }: SearchBarProps) => {
    // searchValue stores current searchbar input, fill in useState parameter to add placeholder text
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const handleClearClick = () => {
        setSearchValue("")
    }

    // Only display clear button when there is text in the searchbar
    const shouldDisplyButton = searchValue.length > 0;

    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.includes(searchValue)
    })


    // onChange executes function argument when input value changes
    // shouldDisplayButton shortcircuiting - conditionally render if true
    return (
        <div>
            <input className="search-bar" type="text" value={searchValue} onChange={handleInputChange} />
            {shouldDisplyButton && <button onClick={handleClearClick}>clear</button>}

            <ul>
                {filteredRecipes.map((recipe) => {
                    return <li key={recipe}>{recipe}</li>
                })}
            </ul>
        </div>
        )
}

export default SearchBar