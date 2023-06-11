export function convertFlightColumnToAlphabetic(col: number): string {
  if (col < 1 || col > 27) {
    return "";
  }

  return String.fromCharCode(64 + col);
}
