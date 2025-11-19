'use client'

import Link from "next/link";
import SearchBar from "./components/SearchBar/SearchBar";
import NavBar from "./components/NavBar/NavBar"

export default function Home() {
  return (
    <>
      <NavBar />
      <div style={{ padding: "20px" }}>
        <h1>Don't Go Bad!</h1>
        <p>Find recipes by main ingredient:</p>

        <SearchBar />
      </div>
    </>
  );
}
