import styled from "styled-components";
import downArrowIcon from "../assets/down-arrow-icon.svg";

const Dropdown = styled.select`
	width: 100%;
	padding: 17px 12px;
	border: none;
	border-bottom: 1px solid var(--ub-border-light);
	border-radius: 5px;
	background-color: transparent;
	color: rgba(255, 255, 255, 0.7);
	font-size: 20px;
	font-weight: 500;
	appearance: none;
	background-image: url(${downArrowIcon});
	background-repeat: no-repeat;
	background-position: right 10px center;
	background-size: 12px;
	&:focus {
		outline: none;
	}
`;

const SelectWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	border-radius: 20px;
	width: 120px;
`;

interface SelectProps {
	value: string;
	onChange: (value: string) => void;
}

const Select = ({ value, onChange }: SelectProps) => {
	return (
		<SelectWrapper>
			<Dropdown value={value} onChange={e => onChange(e.target.value)}>
				<option value="tracks">Tracks</option>
				<option value="sfx">SFX</option>
			</Dropdown>
		</SelectWrapper>
	);
};

export default Select;
