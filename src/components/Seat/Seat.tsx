import React from "react";
import "./Seat.css";

export interface SeatProps {
  row: string;
  column: number;
  isSelected: boolean;
}

const Seat = (props: SeatProps) => {
  return (
    <button className={`seat-button ${props.isSelected ? "selected" : ""}`}>
      {props.row}
      {props.column}
    </button>
  );
};

export default Seat;
