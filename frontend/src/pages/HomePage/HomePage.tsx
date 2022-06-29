import { useState, useEffect } from "react";
import LoginDialog from "./LoginDialog/LoginDialog";
import Text from "../../components/text/Text";
import { Button, Container, Content, Flexbox, FlexboxComponent, Graphic, TextFlexbox, HomeText, ButtonFlexbox } from "./style";
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
        <FlexboxComponent padding="15em">
          <TextFlexbox>
            <HomeText fontFamily={'Lato'} fontWeight={'bold'} fontSize="15px">
              CSEsoc Presents
            </HomeText>
            <HomeText fontFamily={'Poppins'} fontWeight={'bold'} fontSize="70px" color="#1279F2">
              uni-lectives
            </HomeText>
            <HomeText fontFamily={'Lato'} fontWeight={'bold'} fontSize="15px">
              Your one stop shop for UNSW course and electives reviews.
            </HomeText>
            <ButtonFlexbox>
              <Button bg="#3B5DD5">
                <HomeText fontFamily={'Lato'} fontWeight={'bold'}>
                  Browse
                </HomeText>
              </Button>
              <Button bg="#72C1DA">
                <HomeText fontFamily={'Lato'} fontWeight={'bold'}>
                  Add a Review
                </HomeText>
              </Button>
            </ButtonFlexbox>
          </TextFlexbox>
        </FlexboxComponent>
        <FlexboxComponent padding="10em">
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
