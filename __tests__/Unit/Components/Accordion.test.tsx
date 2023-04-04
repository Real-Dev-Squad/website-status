import { render, fireEvent } from "@testing-library/react";
import Accordion from "@/components/Accordion";

const DEFAULT_PROPS = {
	title: "Active",
	open: true,
};

describe("Accordion", () => {
	test("Accordion rendered", () => {
		const { getByTestId } = render(
			<Accordion {...DEFAULT_PROPS}>
				<p>Paragraph text</p>
			</Accordion>
		);

		const accordion = getByTestId("accordion");
		expect(accordion).toBeInTheDocument();
	});

	test("Title is visible", async () => {
		const { getByText, getByTestId } = render(
			<Accordion {...DEFAULT_PROPS}>
				<p>Paragraph text</p>
			</Accordion>
		);
		expect(getByText("Active")).toBeInTheDocument();

		const accordion = getByTestId("accordion");
		expect(accordion.getAttribute("aria-expanded")).toBe("true");
		fireEvent.click(getByText("Active"));
		expect(accordion.getAttribute("aria-expanded")).toBe("false");
	});

	test("Child is present", () => {
		const { getByText } = render(
			<Accordion {...DEFAULT_PROPS}>
				<p>Paragraph text</p>
			</Accordion>
		);

		expect(getByText("Paragraph text")).toBeInTheDocument();
	});

	test("Opens and closes on mouse click", () => {
		const { getByText, getByTestId } = render(
			<Accordion {...DEFAULT_PROPS}>
				<p>Paragraph text</p>
			</Accordion>
		);

		const accordion = getByTestId("accordion");

		// Open by default
		expect(accordion.getAttribute("aria-expanded")).toBe("true");

		// Click on title
		fireEvent.click(getByText("Active"));

		// Closed after mouse click
		expect(accordion.getAttribute("aria-expanded")).toBe("false");
	});
});
