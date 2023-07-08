import type { Meta, StoryObj } from "@storybook/react";

import Demo from "./Demo";

const meta: Meta<typeof Demo> = {
  title: "Seat Selector/Demo",
  component: Demo,
  parameters: {
    docs: {
      description: {
        component: "A demo of the seat selector.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
