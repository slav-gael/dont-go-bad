import NavBar from "../components/NavBar/NavBar"
import "./About.css"

export default function AboutPage() {


    return(
        <>
            <NavBar />
            <div>
                <h1>About Don't Go Bad</h1>
            </div>
            <div className="textBlurb">
                <h2>What is this website?</h2>
                <p>Don't Go Bad is a service that helps you use up that 
                    leftover food you've had in your freezer for a week 
                    and is about to go bad. We provide an easy way to search 
                    for recipes that use a specific ingredient.</p>
            </div>
            <div className="textBlurb">
                <h2>How does it work?</h2>
                <p>We use TheMealDB API to automatically look up recipes 
                    from an extensive database, giving you a wide variety 
                    of options to choose from. Simply type the name of the 
                    ingredient into the search bar on the home page to get started!</p>
            </div>
        </>
    )
}