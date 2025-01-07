import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
    <nav className="navbar justify-content-end px-3 pt-4">
        <Link to="/add-contact" className="btn btn-success">Add a new contact</Link>
    </nav>
);

export default Navbar;