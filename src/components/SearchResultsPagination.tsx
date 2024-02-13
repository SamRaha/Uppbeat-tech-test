import styled from "styled-components";
import ArrowRightSrc from "../assets/arrow-right-solid.svg";
import ArrowLeftSrc from "../assets/arrow-left-solid.svg";

interface SearchResultsPaginationProps {
	page: number;
	totalPages: number;
	onPageChange: (newPage: number) => void;
}

const PaginationContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;

const Arrow = styled.img`
	width: 16px;
	cursor: pointer;
`;
const SearchResultsPagination = ({ page, totalPages, onPageChange }: SearchResultsPaginationProps) => {
	const disablePrev = page <= 1;
	const disableNext = page >= totalPages;

	return (
		<PaginationContainer>
			{disablePrev ? (
				<div></div>
			) : (
				<Arrow src={ArrowLeftSrc} alt="Arrow Left" onClick={() => onPageChange(page - 1)} />
			)}
			{disableNext ? (
				<div></div>
			) : (
				<Arrow src={ArrowRightSrc} alt="Arrow Right" onClick={() => onPageChange(page + 1)} />
			)}
		</PaginationContainer>
	);
};

export default SearchResultsPagination;
