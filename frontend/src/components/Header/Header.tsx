import React from "react";
import Navbar from "./Navbar/Navbar";
import "./Header.scss";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation("common");
  return (
    <div className="header">
      <h1 className="header__title">{t("logoTitle")}</h1>
      <Navbar />
    </div>
  );
};
export default Header;
