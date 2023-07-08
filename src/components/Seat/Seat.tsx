import React from "react";
import "./Seat.css";

export interface SeatProps {
  seatNumber: string;
  isSelected: boolean;
  onClick: () => void;
}

const Seat = (props: SeatProps) => {
  // TODO: Might add price here later
  // TODO: Might add seat type here later
  // TODO: Might add seat availability here later
  // TODO: Customizable seat color

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
