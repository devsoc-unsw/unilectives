import { readDataTransferFromClipboard } from "@testing-library/user-event/dist/types/utils";
import { BrowserRouter } from "react-router-dom";
import { render } from "src/helpers/rtl";
import HomePage from "./HomePage";

describe("<HomePage/>", () => {
  it("should render", () => {
    const { getByText } = render(<BrowserRouter><HomePage /></BrowserRouter>);

    expect(getByText("Login")).not.toBeNull();
  });
});
