import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => (
    <nav className="navbar">
        <NavLink to="/" className="navbar__link">
            <span>Таблица</span>
        </NavLink>
        <NavLink to="/chart" className="navbar__link">
            <span>График</span>
        </NavLink>
    </nav>
);

export default Navbar;