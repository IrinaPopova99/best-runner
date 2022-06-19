import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { SignInContext } from "../../../context";
import * as urls from "../../../constants/urls";

const Navbar: React.FC = () => {
  const { t } = useTranslation("sidebar");
  const { isSignIn } = useContext(SignInContext);

  return (
    <nav className="navbar">
      {isSignIn ? (
        <>
          <NavLink to={urls.baseUrl} className="navbar__link">
            <span>{t("table")}</span>
          </NavLink>
          <NavLink to={urls.chartUrl} className="navbar__link">
            <span>{t("chart")}</span>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to={urls.signInUrl} className="navbar__link">
            <span>{t("signin")}</span>
          </NavLink>
          <NavLink to={urls.signUpUrl} className="navbar__link">
            <span>{t("signup")}</span>
          </NavLink>
        </>
      )}
    </nav>
  );
};
export default Navbar;
