import React from "react";
import "./Seat.css";

export interface SeatProps {
  row: number;
  column: number;
}

const Seat = (props: SeatProps) => {
  return (
    <button className="seat-button">
      {props.row}
      {props.column}
    </button>
  );
};

export default Seat;
