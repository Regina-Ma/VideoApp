import { render, cleanup } from "@testing-library/react";
import Search, { Props, State } from "../Search";

afterEach(cleanup);

const renderSearch = (
  props: Partial<Props> = {},
  state: Partial<State> = {}
) => {
  const defaultProps: Props = {
    selectedQuantity: 1,
    selectedDuration: 10,
    selectQuantity() {
      return;
    },
    selectDuration() {
      return;
    },
    searchVideo() {
      return;
    },
  };
  const defaultState: State = {
    query: "",
    quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    durations: [10, 20, 30],
  };
  return render(
    <Search {...defaultProps} {...props} {...defaultState} {...state} />
  );
};

test("should display props and state values", async () => {
  const { findByTestId } = renderSearch(
    {
      selectedQuantity: 3,
      selectedDuration: 10,
    },
    { query: "lion" }
  );

  const query = await findByTestId("query");
  const quantity = await findByTestId("quantity");
  const duration = await findByTestId("duration");

  expect(query).toBe("lion");
  expect(quantity).toBe(3);
  expect(duration).toBe(10);
});
