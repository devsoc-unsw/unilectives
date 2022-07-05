import { CSESoc } from "../image/imageIndex";
import { FooterWrapper, Logo } from "./style";
import {Routes, Route, useNavigate} from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/termsandconditions');
  };

  return (
    <FooterWrapper>
      <Logo src={CSESoc} onClick={navigateHome} />
    </FooterWrapper>
  );
};

export default Footer;
