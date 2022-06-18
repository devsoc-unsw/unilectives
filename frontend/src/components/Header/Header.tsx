import { HeaderWave, UniLectives } from "../image/imageIndex";
import { Container, Logo, Wave } from "./style";

const Header = () => {
  return (
    <Container>
      <Logo src={UniLectives} />
      <Wave src={HeaderWave} />
    </Container>
  );
};

export default Header;
