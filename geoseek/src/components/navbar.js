import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function NavBar (){
return(
    <div className = 'navbar'>
    <h1>geoSeek</h1>
    <Router>
    <Link to = '/CreateGem'>Create a Gem</Link>
    <Link to = '/'>View Gems</Link>
    </Router>
    </div>
);
}

export default NavBar;

