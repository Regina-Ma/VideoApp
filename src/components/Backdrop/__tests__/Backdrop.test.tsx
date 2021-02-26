import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Backdrop, { Props } from "../Backdrop";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Backdrop isLoading={false}></Backdrop>, div);
});

it("matches snapshot false", () => {
  const tree = renderer
    .create(<Backdrop isLoading={false}></Backdrop>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("matches snapshot true", () => {
  const tree = renderer.create(<Backdrop isLoading={true}></Backdrop>).toJSON();
  expect(tree).toMatchSnapshot();
});

const renderBackdrop = (props: Partial<Props> = {}) => {
  const defaultProps: Props = {
    isLoading: false,
  };
  return render(<Backdrop {...defaultProps} {...props} />);
};

test("should display a backdrop with a paragraph by default", async () => {
  const { findByTestId } = renderBackdrop();

  const backdrop = await findByTestId("backdrop");
  const paragraph = await findByTestId("paragraph");

  expect(backdrop).toContainElement(paragraph);
  expect(paragraph).not.toContainElement(backdrop);
});
