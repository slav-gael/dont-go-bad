'use client'

import Link from "next/link";
import SearchBar from "./components/SearchBar/SearchBar";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Don't Go Bad!</h1>
      <p>Find recipes by main ingredient:</p>

      {/* See comment block in SearchBar.tsx to see how it is currently searching. */}
      <SearchBar />

      <Link href="/about">Cool test link!</Link>
    </div>
  );
}
