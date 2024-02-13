import styled from "styled-components";
import Search from "./components/Search";
import "./App.css";
import UbLogo from "./assets/ub-logo-main.svg";
import { FavouritesProvider } from "./state/context/FavouritesContext";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	background-color: var(--main-bg);
	min-height: 100vh;
	width: 100%;
	color: white;
	font-family: "Roboto", sans-serif;
	padding: 24px;
	@media (max-width: 768px) {
		padding: 12px;
	}
	position: relative;
`;

const Logo = styled.img`
	position: fixed;
	top: 0;
	left: 0;
	padding: 24px;
`;

const App = () => {
	return (
		<FavouritesProvider>
			<Container>
				<Logo src={UbLogo} alt="Uppbeeat-logo" />
				<Search />
			</Container>
		</FavouritesProvider>
	);
};

export default App;
