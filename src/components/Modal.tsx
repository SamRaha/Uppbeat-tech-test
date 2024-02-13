import styled from "styled-components";

const ModalOverlay = styled.div`
	position: absolute;
	margin: 12px 0 0 0;
	top: 100%;
	right: 0px;
	width: max-content;
	z-index: 1;
`;

const ModalContent = styled.div`
	background-color: #151919;
	padding: 4px;
	border-radius: 0.5rem;
	color: #cdd2d1;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 10px;
	overflow-y: auto;
	border: 1px solid var(--button-dropdown-br);
`;

const Tag = styled.span`
	padding: 6px 12px;
	font-size: 12px;
	border-radius: 0.5rem;
	text-align: center;
	cursor: pointer;
	&:hover {
		background-color: var(--button-primary-hover-bg);
	}
`;

interface ModalProps {
	selected: string[];
	onClose: () => void;
}

const Modal = ({ selected, onClose }: ModalProps) => {
	return (
		<ModalOverlay onClick={onClose}>
			<ModalContent onClick={e => e.stopPropagation()}>
				{selected.map((tag, index) => (
					<Tag key={index}>{tag}</Tag>
				))}
			</ModalContent>
		</ModalOverlay>
	);
};

export default Modal;
