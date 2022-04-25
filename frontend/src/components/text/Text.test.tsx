import { render } from "src/helpers/rtl";
import Text from "./Text";

describe("<Text/>", () => {
  it("should render", () => {
    const { getByText } = render(<Text>Hello</Text>);
    const component = getByText("Hello");
    expect(component).toHaveTextContent("Hello");
    expect(component).not.toBeNull();
  });

  it("should render as a <p> tag by default", () => {
    const { container } = render(<Text>Hello</Text>);
    expect(container.querySelector("p")).not.toBeNull();
  });

  it.each(["h1", "h2", "h3", "h4", "h5", "h6"])(
    "should render tag %s",
    (tag: any) => {
      const { container } = render(<Text component={tag}>Hello</Text>);
      expect(container.querySelector(tag)).not.toBeNull();
    }
  );

  it.each(["block", "initial", "inline"])(
    "should have display type of %s",
    (displayType: any) => {
      const { container } = render(
        <Text display={displayType}>Display Type</Text>
      );
      expect(container.firstChild).toHaveStyle(`display: ${displayType}`);
    }
  );

  it.each(["left", "center", "right"])(
    "should have text alignment type of %s",
    (alignment: any) => {
      const { getByText } = render(<Text align={alignment}>Alignment</Text>);
      expect(getByText("Alignment")).toHaveStyle(`text-align: ${alignment}`);
    }
  );

  it("should have no margin when noMargin prop is present", () => {
    const { getByText } = render(<Text noMargin>Margin</Text>);
    expect(getByText("Margin")).toHaveStyle(`margin: 0`);
  });

  it("should have given color when color prop is present", () => {
    const { getByText } = render(<Text color="white">Color</Text>);
    expect(getByText("Color")).toHaveStyle(`color: white`);
  });

  it("should have given font size when font size prop is present", () => {
    const { getByText } = render(<Text fontSize="2rem">Font size</Text>);
    expect(getByText("Font size")).toHaveStyle(`font-size: 2rem`);
  });

  it("should have given width when width prop is present", () => {
    const { getByText } = render(<Text width="100%">Width</Text>);
    expect(getByText("Width")).toHaveStyle(`width: 100%`);
  });

  it("should have given line height when line height prop is present", () => {
    const { getByText } = render(<Text lineHeight="2rem">Line height</Text>);
    expect(getByText("Line height")).toHaveStyle(`line-height: 2rem`);
  });
});
