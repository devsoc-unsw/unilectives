import { CSESoc } from "../image/imageIndex";
import { FooterWrapper, Logo, TCsLink } from "./style";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterWrapper>
      <Logo src={CSESoc}  />
      <TCsLink>
        <Link to={'/termsandconditions'}>
          Terms and Conditions 
        </Link>
      </TCsLink>
    </FooterWrapper>
  );
};

export default Footer;