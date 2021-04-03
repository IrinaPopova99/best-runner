import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar/Navbar';

const useStyles = makeStyles({
    header: {
        background: '#0c369c',
        padding: '15px 50px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
    },
});

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
