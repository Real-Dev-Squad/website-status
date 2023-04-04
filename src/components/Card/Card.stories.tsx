import React from "react";
import { Story, Meta } from "@storybook/react";

import Card, { Props } from "./index";

const handleImageError = () => undefined;

const handleButtonClick = () => undefined;

export default {
	title: "Example/Card",
	component: Card,
	argTypes: {
		title: {
			control: "object",
		},
		data: {
			control: "array",
		},
		assignee: {
			control: "object",
		},
		participants: {
			control: "array",
		},
		button: {
			control: "object",
		},
	},
} as Meta;

const Template: Story<Props> = (args: Props) => <Card {...args} />;

export const Initial = Template.bind({});

Initial.args = {
	title: {
		text: "Card title",
		link: "http:google.com",
	},
	data: [
		{
			key: "Status",
			value: "Active",
		},
	],
	assignee: {
		userName: "nikhil",
		imgUrl: "https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/nikhil/img.png",
		onError: handleImageError,
	},
	participants: [
		{
			firstName: "Pranav",
			lastName: "G",
			userName: "pranav",
			imgUrl: "https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/pranav/img.png",
		},
		{
			firstName: "Ankur",
			lastName: "N",
			userName: "ankur",
			imgUrl: "https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/ankur/img.png",
		},
	],
	button: {
		text: "Click me",
		link: "http://realdevsquad.com",
		onClick: handleButtonClick,
	},
};
