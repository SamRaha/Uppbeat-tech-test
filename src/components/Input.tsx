import styled from "styled-components";
import magnifyingGlassIcon from "../assets/magnifying-glass.svg";
interface InputProps {
	value: string;
	onChange: (value: string) => void;
}

const SearchWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	border-radius: 20px;
	width: 470px;
`;

const SearchIcon = styled.img`
	width: 26px;
	height: 26px;
	position: absolute;
	left: 10px;
	pointer-events: none;
`;

const StyledInput = styled.input`
	width: 100%;
	padding: 10px 20px 10px 52px;
	border: none;
	border-bottom: 1px solid var(--ub-border-light);
	background-color: transparent;
	color: white;
	font-size: 32px;
	&::placeholder {
		color: rgba(255, 255, 255, 0.5);
		font-size: 32px;
	}

	&:focus {
		border: none;
		border-bottom: 1px solid var(--ub-border-dark);
		outline: none;
	}
`;

const Input = ({ value, onChange }: InputProps) => {
	return (
		<SearchWrapper>
			<SearchIcon src={magnifyingGlassIcon} alt="Search" />
			<StyledInput type="text" value={value} onChange={e => onChange(e.target.value)} placeholder="Search..." />
		</SearchWrapper>
	);
};

export default Input;
