import { render, fireEvent, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input Component", () => {
	it("renders correctly with initial value", () => {
		const handleChange = jest.fn();
		render(<Input value="Initial" onChange={handleChange} />);

		const inputElement = screen.getByPlaceholderText("Search...");
		expect(inputElement.value).toBe("Initial");
	});

	it("calls onChange when user types in the input", () => {
		const handleChange = jest.fn();
		render(<Input value="" onChange={handleChange} />);

		const inputElement = screen.getByPlaceholderText("Search...");
		fireEvent.change(inputElement, { target: { value: "Uppbeat" } });

		expect(handleChange).toHaveBeenCalledWith("Uppbeat");
	});

	it("displays the correct placeholder", () => {
		const handleChange = jest.fn();
		render(<Input value="" onChange={handleChange} />);

		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
	});
});
