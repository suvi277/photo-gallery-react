import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
	<header className="masthead mb-auto fixed-top px-5 pt-3 pb-2">
        <h3 className="masthead-brand">Photo Gallery</h3>
        <div>
            <nav className="nav nav-masthead justify-content-center">
                <Link className="navbar-brand d-flex align-items-center" to="/">Home</Link>
            </nav>
        </div>
    </header>
);

export default Header;