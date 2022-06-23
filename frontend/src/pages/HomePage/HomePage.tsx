import { useState, useEffect } from "react";
import LoginDialog from "./LoginDialog/LoginDialog";
import Text from "../../components/text/Text";
import { Button, Container, Content, Flexbox, FlexboxComponent, Graphic, LatoText, PoppinsText, TextFlexbox, TextFlexboxComponent } from "./style";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import Header from "src/components/Header/Header";
import reviewSrc from 'src/assets/graphics/review.svg';
import laptopSrc from 'src/assets/graphics/laptop.svg';

const HomePage = () => {
  const [loginDialog, setLoginDialog] = useState<boolean>(false);
  const { user } = useAppSelector(selectUser) || {};

  const [landingGraphic, setLandingGraphic] = useState<string>();
  const graphics = [reviewSrc, laptopSrc];
  const randomNumber = Math.floor(Math.random() * graphics.length);

  useEffect(() => {
    setLandingGraphic(graphics[randomNumber])
  }, [])

  return (
    <Content>
      <Header />
      <Flexbox>
        <FlexboxComponent>
          <TextFlexbox>
            <TextFlexboxComponent>
              <LatoText>
                CSEsoc Presents
              </LatoText>
            </TextFlexboxComponent>
            <TextFlexboxComponent>
              <PoppinsText>
                uni-lectives
              </PoppinsText>
            </TextFlexboxComponent>
            <TextFlexboxComponent>
              <LatoText>
                Your one stop shop for UNSW course and electives reviews.
              </LatoText>
            </TextFlexboxComponent>
          </TextFlexbox>
        </FlexboxComponent>
        <FlexboxComponent>
          <Graphic src={landingGraphic}/>
        </FlexboxComponent>
      </Flexbox>
      <Container>
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
