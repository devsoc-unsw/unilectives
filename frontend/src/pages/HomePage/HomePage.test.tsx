import { render } from "src/helpers/rtl";
import HomePage from "./HomePage";

describe("<HomePage/>", () => {
  it("should render", () => {
    const { getByText } = render(<HomePage />);

    expect(getByText("Hello1")).not.toBeNull();
  });
});
