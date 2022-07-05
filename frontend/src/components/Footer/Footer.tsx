import { CSESoc } from "../image/imageIndex";
import { FooterWrapper, Logo, Link } from "./style";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/termsandconditions');
  };

  return (
    <FooterWrapper>
      <Logo src={CSESoc}  />
      <Link onClick={navigateHome}> Terms and Conditions </Link>
    </FooterWrapper>
  );
};

export default Footer;