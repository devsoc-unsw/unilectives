import { render } from "src/helpers/rtl";
import { it, expect, describe } from "vitest";
import TCsPage from "./TCsPage";

describe("<HomePage/>", () => {
  it("should render", () => {
    const { getByText } = render(<TCsPage />);

    expect(getByText("Terms and Conditions")).not.toBeNull();
  });
});
