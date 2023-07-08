import type { Meta, StoryObj } from "@storybook/react";

import Seat from "./Seat";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Seat> = {
  title: "Seat Selector/Seat",
  component: Seat,
  parameters: {
    docs: {
      description: {
        component: "A single seat in the seat configuration.",
      },
    },
  },
  argTypes: {
    seatNumber: {
      description: "The seat number.",
      control: {
        type: "text",
      },
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
    isSelected: false,
    seatNumber: "A1",
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
    seatNumber: "A1",
  },
};
