import { render } from "./helpers/rtl";
import App from "./App";

it("should render Home", () => {
  const { queryByText } = render(<App />);
  expect(queryByText("Home")).not.toBeNull();
});
