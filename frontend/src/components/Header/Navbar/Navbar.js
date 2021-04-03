import { NavLink } from 'react-router-dom';
import { useStyles } from './NavbarStyles';

const Navbar = () => {
    const classes = useStyles();

    return (
        <nav className={classes.navbar}>
            <NavLink to="/" className={classes.link}>
                <span>Таблица</span>
            </NavLink>
            <NavLink to="/chart" className={classes.link}>
                <span>График</span>
            </NavLink>
        </nav>
    );
}

export default Navbar;