import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h1>Web Viewer</h1>
            <nav>
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/viewer">Web Viewer</NavLink>
            </nav>
        </header>
    )
};

export default Header;