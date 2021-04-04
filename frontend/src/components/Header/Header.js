import React from 'react';
import Navbar from './Navbar/Navbar';
import './Header.scss';

const Header = () => (
    <div className="header">
        <h1 className="header__title">BestRunner</h1>
        <Navbar />
    </div>
)


export default Header;
