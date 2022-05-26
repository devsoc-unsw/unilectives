import { useState } from "react";
import LoginDialog from "./LoginDialog/LoginDialog";
import Text from "../../components/text/Text";
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import { Button, Container } from "./style";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";

const HomePage = () => {
  const [loginDialog, setLoginDialog] = useState<boolean>(false);
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const { user } = useAppSelector(selectUser) || {};

  return (
    <Container>
      Hello1
      <Button onClick={() => setLoginDialog(true)}>Login</Button>
      {loginDialog && <LoginDialog close={() => setLoginDialog(false)} />}
      <Text>User response:</Text>
      <Text>{JSON.stringify(user)}</Text>
      Incoming review modal hey
      <Button onClick={() => setReviewModal(true)}>Submit a Review</Button>
      {reviewModal && <ReviewModal close={() => setReviewModal(false)} />}
    </Container>
  );
};

export default HomePage;
