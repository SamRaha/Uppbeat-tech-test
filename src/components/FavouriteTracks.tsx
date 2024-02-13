import styled, { keyframes } from "styled-components";
import { useFavourites } from "../state/context/FavouritesContext";
import TrackItem from "./TrackItem";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10px;
	width: 600px;
	animation: ${fadeIn} 0.5s ease-out forwards;
`;

const FavouriteTracks = () => {
	const { favourites } = useFavourites();

	return (
		<Container>
			{favourites.map(({ document: { id, image, name, artist, styles } }) => (
				<TrackItem key={id} id={id} image={image} name={name} artist={artist} styles={styles} />
			))}
		</Container>
	);
};

export default FavouriteTracks;
