import { useMemo, useReducer } from "react";
import {
  SeatLocation,
  initialSeatSelection,
  seatSelectionReducer,
} from "../../hooks";
import { convertRowToAlphabetic } from "../../utils";
import Seat from "../Seat/Seat";

export interface SeatSelectorProps {
  numOfRows: number;
  columnConfig: number[];
}

const SeatSelector = (props: SeatSelectorProps) => {
  const [state, dispatch] = useReducer(
    seatSelectionReducer,
    initialSeatSelection
  );

  const seatLayoutContainerStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${props.numOfRows}, 1fr)`,
    gridTemplateColumns: `repeat(${props.columnConfig.length}, 1fr)`,
    gridGap: "10px",
  };

  const seatMappings: Map<string, string> = useMemo(() => {
    // TODO: Create seat mappings for each row and column (map them to seat locations like A1, B5, etc.)
    const numOfColumns = props.columnConfig.length;
    const numOfRows = props.numOfRows;

    const seatMappings = new Map<string, string>();
    for (let i = 0; i < numOfRows; i++) {
      for (let j = 0; j < numOfColumns; j++) {
        const key = `${i}{j}`;
        seatMappings.set(key, `${convertRowToAlphabetic(j + 1)}${i + 1}}`);
      }
    }
    return seatMappings;
  }, [props.numOfRows, props.columnConfig]);

  const isSeatSelected = (seatLocation: SeatLocation) => {
    const seat = state.find(
      (seat) => seat.row === seatLocation.row && seat.col === seatLocation.col
    );

    if (!seat) {
      return false;
    }

    return true;
  };

  const handleSeatClick = (seatLocation: SeatLocation) => {
    if (isSeatSelected(seatLocation)) {
      handleDeselectSeat(seatLocation);
    } else {
      handleSelectSeat(seatLocation);
    }
  };

  const handleSelectSeat = (seatLocation: SeatLocation) => {
    dispatch({ type: "SELECT_SEAT", payload: seatLocation });
  };

  const handleDeselectSeat = (seatLocation: SeatLocation) => {
    dispatch({ type: "UNSELECT_SEAT", payload: seatLocation });
  };

  const resetSeatSelection = () => {
    dispatch({ type: "RESET_SEATS" });
  };

  return (
    <div style={seatLayoutContainerStyle}>
      {Array.from({
        length: props.numOfRows,
      }).map((_, rowIndex) => {
        return Array.from({
          length: props.columnConfig.length,
        }).map((_, columnIndex) => {
          const seatLocation: SeatLocation = {
            row: rowIndex,
            col: columnIndex,
          };
          const seatId = `${rowIndex}${columnIndex}`;
          const seatNumber = seatMappings.get(seatId);
          // const isSelected = state.selectedSeats.has(seatId);
          return (
            <Seat
              key={seatId}
              seatNumber={seatNumber || ""}
              isSelected={false} // TODO: Pass in the correct isSelected value
              onClick={() => handleSeatClick(seatLocation)}
            />
          );
        });
      })}
    </div>
  );
};

export default SeatSelector;
