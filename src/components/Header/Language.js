import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import enImage from "../../assets/en.png";
import viImage from "../../assets/vi.png";

const Language = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const currentLangImg = i18n.language === "vi" ? viImage : enImage;

  return (
    <NavDropdown
      title={<img src={currentLangImg} width={30} height={30} />}
      id="basic-nav-dropdown2"
      className="languages"
    >
      <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
        <img src={enImage} width={30} height={30} /> EN
      </NavDropdown.Item>
      <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
        <img src={viImage} width={30} height={30} /> VI
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default Language;
