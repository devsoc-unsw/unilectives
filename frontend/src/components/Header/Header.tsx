import { HeaderWave, UniLectives } from "../image/imageIndex";
import { Container, Logo, Wave } from "./style";
import SearchbarWithMenu from "src/components/SearchbarWithMenu/SearchbarWithMenu";
import { ICourse } from "src/interfaces/ResponseInterface";
import { Link } from "react-router-dom";

type HeaderProps = {
  courses: ICourse[];
};

const Header = ({ courses }: HeaderProps) => {
  return (
    <Container>
      <Link to={"/"}>
        <Logo src={UniLectives} />
      </Link>
      <Wave src={HeaderWave} />
      <SearchbarWithMenu courses={courses} />
    </Container>
  );
};

export default Header;
