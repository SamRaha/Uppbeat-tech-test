import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "./Search";
import "@testing-library/jest-dom";
import * as FavouritesContext from "../state/context/FavouritesContext";
import useSearch from "../hooks/useSearch";

// Mock hooks
jest.mock("../hooks/useSearch");
jest.mock("../state/context/FavouritesContext");

describe("Search Component", () => {
	beforeEach(() => {
		useSearch.mockReturnValue({ results: { hits: [], found: 0 } });

		jest.spyOn(FavouritesContext, "useFavourites").mockReturnValue({
			favourites: [
				{
					document: {
						id: "8597",
						image: "https://cdn.uppbeat.io/images/Monument-music_Avatar_V2_1458033941094704.jpg",
						name: "Winter Harmony",
						artist: "Monument Music",
						styles: ["Kids"],
					},
				},
			],
		});
	});

	it("renders without crashing", () => {
		render(<Search />);
		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
	});

	it("updates search term on input change", () => {
		render(<Search />);
		const inputElement = screen.getByPlaceholderText("Search...");
		fireEvent.change(inputElement, { target: { value: "New search term" } });
		expect(inputElement.value).toBe("New search term");
	});
});
