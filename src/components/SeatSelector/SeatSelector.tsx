import { useMemo } from "react";
import {
  SeatLocation,
  SeatSelectionAction,
  SelectedSeatList,
  useSeatSelector,
} from "../../hooks";
import {
  areSeatsEqual,
  convertRowToAlphabetic as convertColToAlphabetic,
} from "../../utils";
import Seat from "../Seat/Seat";

export interface SeatSelectorProps {
  numOfRows: number;
  columnConfig: number[];
  reducer: [SelectedSeatList, React.Dispatch<SeatSelectionAction>];
}

const SeatSelector = (props: SeatSelectorProps) => {
  const [state, dispatch] = props.reducer;

  const seatMappings: Map<string, string> = useMemo(() => {
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

  const handleSeatClick = (seatLocation: SeatLocation) => {
    console.log(seatLocation);
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

  const isSeatSelected = (seatLocation: SeatLocation) => {
    const seat = state.find((seat) => areSeatsEqual(seat, seatLocation));
    return seat ? true : false;
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
                      rowIndex: rowIndex,
                      colDivisionIndex: colDivisionIndex,
                      colOffset: colOffset,
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
                        isSelected={isSeatSelected(seatLocation)}
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
