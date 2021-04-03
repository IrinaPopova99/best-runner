import React from 'react';
import Navbar from './Navbar/Navbar';
import { useStyles } from './HeaderStyles';

function Header() {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <h1>BestRunner</h1>
            <Navbar />
        </div>
    )
}

export default Header;
