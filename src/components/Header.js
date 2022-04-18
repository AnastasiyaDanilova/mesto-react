import React from 'react';
import logo from '../images/Logo.svg';

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Место" className="logo" />
        </header>
    );
};

export default Header;