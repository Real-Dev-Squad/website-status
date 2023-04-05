import React from "react";
import { Story, Meta } from "@storybook/react";

import Accordion, { Props } from "./index";

export default {
    title: "Example/Accordion",
    component: Accordion,
    argTypes: {
        title: { control: "text" },
        open: { control: "boolean" },
    },
} as Meta;

const Template: Story<Props> = (args) => <Accordion {...args} />;

export const Open = Template.bind({});

Open.args = {
    title: "Accordion Title",
    open: false,
    children: <h1>Content</h1>,
};
