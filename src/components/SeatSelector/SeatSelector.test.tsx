import { render } from "@testing-library/react";
import React from "react";
import SeatSelector from "./SeatSelector";

describe("SeatSelector", () => {
  test("renders the SeatSelector component", () => {
    const { baseElement } = render(<SeatSelector />);
    expect(baseElement).toBeTruthy();
  });
});
