import { useSeatSelector } from "../../hooks";
import SeatSelector from "../SeatSelector/SeatSelector";

const Demo = () => {
  const seatSelector = useSeatSelector();

  return (
    <SeatSelector
      columnConfig={[3, 4, 3]}
      numOfRows={100}
      reducer={seatSelector}
    />
  );
};

export default Demo;
