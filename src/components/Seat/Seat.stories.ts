import type { Meta, StoryObj } from "@storybook/react";

import Seat from "./Seat";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Seat> = {
  title: "Seat Config/Seat",
  component: Seat,
  parameters: {
    docs: {
      description: {
        component: "A single seat in the seat configuration.",
      },
    },
  },
  argTypes: {
    column: {
      description: "The column number of the seat.",
      control: {
        type: "number",
      },
    },
    row: {
      description: "The row representing the location of the seat.",
    },
    isSelected: {
      description: "Whether the seat is selected.",
      control: {
        type: "boolean",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    column: 1,
    row: "A",
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    column: 1,
    row: "A",
    isSelected: true,
  },
};
