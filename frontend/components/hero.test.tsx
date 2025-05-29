import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Hero from "./hero";

test("renders the hero heading", () => {
  render(<Hero />);
  expect(screen.getByRole("heading")).toBeInTheDocument();
});
