import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        marginRight: '30px',
        fontSize: '18px',
    }
});

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