import { useMemo, useReducer } from "react";
import {
  SeatLocation,
  initialSeatSelection,
  seatSelectionReducer,
} from "../../hooks";
import { convertColumnToAlphabetic } from "../../utils";

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

    const seatMappings = new Map<string, string>();
    for (let i = 0; i < numOfRows; i++) {
      for (let j = 0; j < numOfColumns; j++) {
        const key = `${i}{j}`;
        seatMappings.set(key, `${convertColumnToAlphabetic(j + 1)}${i + 1}}`);
      }
    }
    return seatMappings;
  }, [props.numOfRows, props.columnConfig]);

  const handleSelectSeat = (seatLocation: SeatLocation) => {
    dispatch({ type: "SELECT_SEAT", payload: seatLocation });
  };

  const handleDeselectSeat = (seatLocation: SeatLocation) => {
    dispatch({ type: "UNSELECT_SEAT", payload: seatLocation });
  };

  const resetSeatSelection = () => {
    dispatch({ type: "RESET_SEATS" });
  };

  return <div></div>;
};

export default SeatSelector;
