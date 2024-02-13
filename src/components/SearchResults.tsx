import styled from "styled-components";
import { useMemo } from "react";
import TrackItem from "./TrackItem";
import SearchResultsPagination from "./SearchResultsPagination";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10px;
	width: 600px;
`;
interface SearchResult {
	document: {
		artist: string;
		id: string;
		image: string;
		name: string;
		styles: string[];
	};
}

interface SearchResultsProps {
	results: SearchResult[];
	page: number;
	onPageChange: (newPage: number) => void;
	totalResults: number;
}

const SearchResults = ({ results, totalResults, page, onPageChange }: SearchResultsProps) => {
	console.log("results: ", results);
	const perPage = 5;
	const totalPages = useMemo(() => Math.ceil(totalResults / perPage), [totalResults, perPage]);

	return (
		<>
			<Container>
				{results.map(({ document: { id, image, name, artist, styles } }) => (
					<TrackItem key={id} id={id} image={image} name={name} artist={artist} styles={styles} />
				))}
			</Container>
			<SearchResultsPagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
		</>
	);
};

export default SearchResults;
