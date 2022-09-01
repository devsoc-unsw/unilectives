import { HeaderWave, UniLectives } from "../image/imageIndex";
import { Container, Logo, Wave } from "./style";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Link to={"/"}>
        <Logo src={UniLectives} />
      </Link>
      <Wave src={HeaderWave} />
    </Container>
  );
};

export default Header;
