import { useState } from "react";
import styled from "styled-components";
import useSearch from "../hooks/useSearch";
import Input from "./Input";
import SearchResults from "./SearchResults";
import Select from "./Select";
import { useFavourites } from "../state/context/FavouritesContext";
import FavouriteTracks from "./FavouriteTracks";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	height: 100%;
`;
const SearchContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-end;
`;

const Search = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [type, setType] = useState<"tracks" | "sfx">("tracks");
	const [page, setPage] = useState<number>(1);
	const { results } = useSearch(searchTerm, type, page);
	const { favourites } = useFavourites();

	return (
		<Container>
			<SearchContainer>
				<Select value={type} onChange={(newType: string) => setType(newType as "tracks" | "sfx")} />
				<div className="space-12" />
				<Input value={searchTerm} onChange={(newSearchTerm: string) => setSearchTerm(newSearchTerm)} />
			</SearchContainer>
			<div className="space-24" />

			<SearchResults
				results={results?.hits || []}
				totalResults={results?.found || 0}
				page={page}
				onPageChange={(newPage: number) => setPage(newPage)}
			/>

			{favourites?.length ? (
				<div>
					<h2>Favourited Tracks</h2>
					<FavouriteTracks />
				</div>
			) : null}
		</Container>
	);
};

export default Search;
