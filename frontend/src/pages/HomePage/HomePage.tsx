import { useState } from "react";
import LoginDialog from "./LoginDialog/LoginDialog";
import Text from "../../components/text/Text";
import { Button, Container } from "./style";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import Searchbar from "src/components/Searchbar/Searchbar";

const HomePage = () => {
  const [loginDialog, setLoginDialog] = useState<boolean>(false);
  const { user } = useAppSelector(selectUser) || {};
  // const [courses, setCourses] = useState([]);

  return (
    <Container>
      Hello1
      <Button onClick={() => setLoginDialog(true)}>Login</Button>
      {loginDialog && <LoginDialog close={() => setLoginDialog(false)} />}
      <Text>User response:</Text>
      <Text>{JSON.stringify(user)}</Text>
      <Searchbar displayFilters={true} />
    </Container>
  );
};

export default HomePage;
