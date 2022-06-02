import { useState } from "react";
import LoginDialog from "./LoginDialog/LoginDialog";
import Text from "../../components/text/Text";
import { Button, Container, Background, Content } from "./style";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import LandingCurve from "src/components/LandingCurve/LandingCurve";
import Header from "src/components/Header/Header";
import mySvg from 'src/assets/curves/curve.svg';


const HomePage = () => {
  const [loginDialog, setLoginDialog] = useState<boolean>(false);
  const { user } = useAppSelector(selectUser) || {};

  return (
    <Content>
      <Container>
        {/* <Background /> */}
        Hello1
        <Button onClick={() => setLoginDialog(true)}>Login</Button>
        {loginDialog && <LoginDialog close={() => setLoginDialog(false)} />}
        <Text>User response:</Text>
        <Text>{JSON.stringify(user)}</Text>
      </Container>
    </Content>
  );
};

export default HomePage;
