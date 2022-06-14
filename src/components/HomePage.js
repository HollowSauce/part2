import React from "react";
import Papers from "./Papers.js";
import paperImg from '../img/papers.jpg';

/**
 * Homepage for part2
 * 
 * Shows a random paper by setting randomPaper to true which is then used in the papers api
 * endpoint to return a random paper. An image is also displayed
 * 
 * @author Bob Auchterlounie
 */
class HomePage extends React.Component {

    render() {
        return (
            <div>
                <h3>Randomly selected paper</h3>
                <Papers randomPaper={true} />
                <img src={paperImg} className="paperImg" alt="papers_img" />
                <p>Spratt, A. 2018. <a href="https://unsplash.com/photos/5cFwQ-WMcJU">Vintage page sheet background</a> [Online]</p>
            </div>
        )
     }
   }
   
   export default HomePage;