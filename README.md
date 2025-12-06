## Overview
Don't Go Bad is a simple web application built with Next.js, designed to help users reduce food waste by finding recipes using ingredients they already have. The project integrates with TheMealDB API to fetch recipes based on a single ingredient search. It is currently being hosted at https://dont-go-bad.vercel.app

## Features
* Ingredient-Based Recipe Search – Enter an ingredient you want to use up, and the app fetches matching meals from an extensive catalogue with a multitude of filters for either one or multiple ingredients, all at the same time.

* Pantry - A tool for both searching and personal use in keeping up with what groceries are at home.

* Clean, Minimal UI – Easy-to-use interface with a Search Bar and Navigation Bar.

* About Page – Provides the mission, purpose, and background of the site.

* Reusable Components – Modular NavBar and SearchBar components.

* Built on Next.js App Router – Modern file-based routing using the /app directory.

## Built With
**Framework**: NextJS 16, React 18, typescript

**Styling**: CSS Modules

**Data & API**: TheMealDB 

## Setup
If you would like to run this website locally, below are some instructions:

* Install dependencies with: pm install

* Start a development server with: pm run dev

* Visit your version of http://localhost:3000

This specific project is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Integration: TheMealDB
The project integrates with TheMealDB free API. On ingredient search, it sends a request such as:

https://www.themealdb.com/api/json/v1/1/filter.php?i=INGREDIENT

The response includes:

* List of meals

* Meal thumbnails

* Meal IDs for deeper lookup (if expanded later)

## Purpose Follow-up
The goal of the project was to:

* Reduce food waste

* Help users plan meals using what they already have

* Save money and avoid forgotten ingredients from going bad

We succeeded in these goals.

## Project Structure

dont-go-bad/
│  
├── app/  
│ ├── about/  
│ │ ├── About.css  
│ │ └── page.tsx  
│ │  
│ ├── components/  
│ │ ├── NavBar/        
│ │ │ ├── NavBar.css  
│ │ │ └── NavBar.tsx  
│ │ ├── SearchBar/  
│ │ │ ├── SearchBar.css  
│ │ │ └── SearchBar.tsx  
│ │  
│ ├── globals.css  
│ ├── layout.tsx  
│ └── page.tsx (Home page)  
│  
├── public/ (static assets like images)  
│  
├── .gitignore  
├── README.md  
├── eslint.config.mjs  
├── next.config.ts  
├── package.json  
├── package-lock.json  
├── pnpm-lock.yaml  
├── postcss.config.mjs  
└── tsconfig.json  

## Pages Overview
Home Page (app/page.tsx)

* Contains the main search interface where users enter an ingredient.

About Page (app/about/page.tsx)

* Explains:
   - Mission of the project
   - Who the site is for
   - How the service works

* Limitations
   - The About page uses <NavBar /> and styled content blocks.

* Components
   - NavBar
      + Located at: app/components/NavBar/
      + Provides site navigation
      + Styled via NavBar.css
   - SearchBar
      + Located at: app/components/SearchBar/
      + Main input field for ingredient searches
      + Styled via SearchBar.css

## Group Members and Contributions

Cameron Wittrock 
* Creating the About page and home page
* Authoring this README
* Distributing an even workload
* Editing and revising the project

Gillian Hepworth
* Proposing the project name
* Designing the core search mechanism and early project architecture
* Contributing to About page revisions
* Contributing initial styling and general development work

Kade Morrill 
* Developing the Components
* implementing hosting and developement
* completing the full styling pass for the final design
* Editing and revising the project

We all did an equal share, and everyone contributed equal ideas, energy, time, commitment, and actual work.
