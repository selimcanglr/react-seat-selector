import React from "react";
import "./Seat.css";

export interface SeatProps {
  seatNumber: string;
  isSelected: boolean;
  onClick: () => void;
}

const Seat = (props: SeatProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`seat-button ${props.isSelected ? "selected" : ""}`}
    >
      {props.seatNumber}
    </button>
  );
};

export default Seat;
