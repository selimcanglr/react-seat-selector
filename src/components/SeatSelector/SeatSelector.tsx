import { useMemo, useReducer } from "react";
import {
  SeatLocation,
  initialSeatSelection,
  seatSelectionReducer,
} from "../../hooks";
import { convertRowToAlphabetic as convertColToAlphabetic } from "../../utils";
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

  const seatMappings: Map<string, string> = useMemo(() => {
    // TODO: Create seat mappings for each row and column (map them to seat locations like A1, B5, etc.)
    const numOfColumns = props.columnConfig.length;
    const numOfRows = props.numOfRows;

    let colIndexCount = 0;
    const seatMappings = new Map<string, string>();
    for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
      for (
        let colDivisionIndex = 0;
        colDivisionIndex < numOfColumns;
        colDivisionIndex++
      ) {
        for (
          let colOffset = 0;
          colOffset < props.columnConfig[colDivisionIndex];
          colOffset++
        ) {
          const key = `${rowIndex}${colDivisionIndex}${colOffset}`;
          seatMappings.set(
            key,
            `${rowIndex + 1}${convertColToAlphabetic(colIndexCount + 1)}`
          );
          colIndexCount++;
        }
      }
      colIndexCount = 0;
    }
    return seatMappings;
  }, [props.numOfRows, props.columnConfig]);
  console.log(seatMappings);

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

  const getSeatDisplayString = (
    rowIndex: number,
    colDivisionIndex: number,
    columnIndex: number
  ) => {
    const key = `${rowIndex}${colDivisionIndex}${columnIndex}`;
    const displayStr = seatMappings.get(key);
    return displayStr;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {Array.from({
        length: props.numOfRows,
      }).map((_, rowIndex) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
            }}
          >
            {props.columnConfig.map((sizeOfCol, colDivisionIndex) => {
              return (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${sizeOfCol}, 1fr)`,
                    gap: "5px",
                  }}
                >
                  {Array.from({ length: sizeOfCol }).map((_, colOffset) => {
                    const seatLocation: SeatLocation = {
                      row: rowIndex,
                      col: colDivisionIndex,
                    };
                    const seatNumber = getSeatDisplayString(
                      rowIndex,
                      colDivisionIndex,
                      colOffset
                    );
                    return (
                      <Seat
                        key={seatNumber}
                        seatNumber={seatNumber || ""}
                        isSelected={false}
                        onClick={() => handleSeatClick(seatLocation)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SeatSelector;
