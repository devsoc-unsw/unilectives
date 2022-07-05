import { HeaderWave, UniLectives } from "../image/imageIndex";
import { Container, Logo, Wave } from "./style";
import { Routes, Route, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <Logo src={UniLectives} onClick={navigateHome}/>
      <Wave src={HeaderWave} />
    </Container>
  );
};

export default Header;