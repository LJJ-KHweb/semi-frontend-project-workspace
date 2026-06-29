import { useNavigate } from "react-router-dom";
import { FooterWrapper, FooterLogo, FooterText } from "./Footer.styles";

const Footer = () => {
  const navi = useNavigate();

  return (
    <FooterWrapper>
      <FooterLogo onClick={() => navi("/")}>EV:RE</FooterLogo>
      <FooterText>© 2026 EVRE. All rights reserved.</FooterText>
    </FooterWrapper>
  );
};

export default Footer;
