import { render } from "@testing-library/react";
import React from "react";
import Seat from "./Seat";

describe("Seat", () => {
  test("renders the Seat component", () => {
    const { baseElement } = render(<Seat column={2} row={5} />);
    expect(baseElement).toBeTruthy();
  });
});
