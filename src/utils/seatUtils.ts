import { SeatLocation } from "../hooks";

export function convertRowToAlphabetic(col: number): string {
  if (col < 1 || col > 27) {
    return "";
  }

  return String.fromCharCode(64 + col);
}

export function areSeatsEqual(a: SeatLocation, b: SeatLocation) {
  return (
    a.rowIndex === b.rowIndex &&
    a.colDivisionIndex === b.colDivisionIndex &&
    a.colOffset === b.colOffset
  );
}
