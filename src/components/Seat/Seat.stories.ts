import type { Meta, StoryObj } from "@storybook/react";

import Seat from "./Seat";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Seat Config/Individual Seat Component",
  component: Seat,
  tags: ["autodocs"],
  argTypes: {
    column: {},
  },
} satisfies Meta<typeof Seat>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    column: 1,
    row: 2,
  },
};
