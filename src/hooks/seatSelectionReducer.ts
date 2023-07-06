import { areSeatsEqual } from "../utils";

export type SeatLocation = {
  rowIndex: number;
  colDivisionIndex: number;
  colOffset: number;
};
export type SelectedSeatList = SeatLocation[];

export type SeatSelectionActionType =
  | "SELECT_SEAT"
  | "UNSELECT_SEAT"
  | "RESET_SEATS"
  | "GET_SEATS";
export type SeatSelectionPayload = SeatLocation;
export type SeatSelectionAction = {
  type: SeatSelectionActionType;
  payload?: SeatSelectionPayload;
};

export const initialSeatSelection: SelectedSeatList = [];

export function seatSelectionReducer(
  seats: SelectedSeatList,
  action: SeatSelectionAction
) {
  const payload = action.payload;

  switch (action.type) {
    case "GET_SEATS":
      return seats;
    case "SELECT_SEAT":
      if (!payload) {
        return seats;
      } else {
        return [...seats, payload];
      }
    case "UNSELECT_SEAT":
      if (!payload) {
        return seats;
      } else {
        return seats.filter((s) => !areSeatsEqual(s, payload));
      }
    case "RESET_SEATS":
      return [];
    default:
      throw new Error("Invalid action type");
  }
}
