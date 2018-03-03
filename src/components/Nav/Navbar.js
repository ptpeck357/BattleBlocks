import React from "react";
import "./Navbar.css";

const Navbar = props => (

<div >
    <nav className="navbar navbar-dark bg-gunmetal fixed-top">
            <h4 id="title"> {props.headline} </h4>
            <button>Lobby</button>
    </nav>
</div>

);

export default Navbar;
