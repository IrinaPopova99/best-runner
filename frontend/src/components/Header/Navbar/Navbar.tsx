import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t } = useTranslation('sidebar');
return (
  <nav className="navbar">
    <NavLink to="/" className="navbar__link">
      <span>{t('table')}</span>
    </NavLink>
    <NavLink to="/chart" className="navbar__link">
      <span>{t('chart')}</span>
    </NavLink>
  </nav>
);
}
export default Navbar;
