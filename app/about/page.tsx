import NavBar from "../components/NavBar/NavBar"

import "./About.css"

export default function AboutPage() {
    return (
        
    <>
        <NavBar />
        <div className="textBlurb">
            <h1>About Don't Go Bad</h1>
        </div>
        <div className="textBlurb">
            <h2>
                The Mission
            </h2>
            <p>
                Reducing food waste, saving money, and making cooking easier!
            </p>
        </div>
        <div className="textBlurb">
            <h2>
                What is this website?
            </h2>
            <p>
                Don't Go Bad is a service that helps you use up that 
                leftover food you've had in your freezer for a week 
                and is about to go bad. We provide an easy way to search 
                for recipes that use a specific ingredient.
            </p>
        </div>
        <div className="textBlurb">
            <h2>
                How does it work?
            </h2>
            <p>
                We use TheMealDB API to automatically look up recipes 
                from an extensive database, giving you a wide variety 
                of options to choose from. Simply type the name of the 
                ingredient into the search bar on the home page to get started!
            </p>
        </div>
        <div className="textBlurb">
            <h2>
                Who is this site for?
            </h2>
            <p>
                Busy people, students, families, people who forget what's in their fridge
            </p>
        </div>
        <div className="textBlurb">
            <h2>
                Benefits
            </h2>
            <p>
                Save money and prevent waste, and enjoy delicious food by using up items in your pantry before they're bad!
            </p>
        </div>
        <div className="textBlurb">
            <h2>
                Our Story
            </h2>
            <p>
                We have forgotten kale one too many times in the back of the fridge to not think about how to fix this issue.
            </p>
        </div>
        <div className="textBlurb">
            <h2>
                Current Limitations
            </h2>
            <p>
                Our database depends upon TheMeanDB, so our recipes are limited.
            </p>
        </div>
    </>
    )
            
        }
