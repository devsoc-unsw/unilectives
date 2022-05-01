import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

const App = () => (
  <main>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </main>
);

export default App;
