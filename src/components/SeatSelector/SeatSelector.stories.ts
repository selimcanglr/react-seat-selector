import type { Meta, StoryObj } from "@storybook/react";

import SeatSelector from "./SeatSelector";

const meta: Meta<typeof SeatSelector> = {
  title: "Seat Config/SeatSelector",
  component: SeatSelector,
  parameters: {
    docs: {
      description: {
        component:
          "The seat selector component that includes the listing of all seats.",
      },
    },
  },
  argTypes: {
    columnConfig: {
      description:
        "The configuration of the columns in the seat selector. The column configuration is provided as a list of numbers, where each number represents the number of seats in that column. For example, [3, 4, 3] means that there are 3 seats in the first column, 4 seats in the second column, and 3 seats in the third column.",
    },
    numOfRows: {},
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columnConfig: [3, 4, 3],
    numOfRows: 3,
  },
};
