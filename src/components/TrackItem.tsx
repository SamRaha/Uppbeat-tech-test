import React, { memo, useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import playButtonSrc from "../assets/ub-track-play-sm.svg";
import MoreInfoIconSrc from "../assets/uppbeat-icons-more-info.svg";
import FavouriteTrue from "../assets/favourite-true.svg";
import FavouriteFalse from "../assets/favourite-false.svg";
import Modal from "./Modal";
import { useFavourites } from "../state/context/FavouritesContext";

const Tag = styled.span`
	background-color: #323434;
	border-radius: 0.5rem;
	padding: 5px 10px;
	margin-right: 10px;
	font-size: 12px;
	transition: background-color 0.1s;
	cursor: pointer;
	&:hover {
		background-color: var(--button-primary-hover-bg) !important;
	}
`;
const MoreTagsIcon = styled.img`
	width: 14px;
	height: 14px;
	transform: rotate(90deg);
	cursor: pointer;
	background-color: #323434;
	border-radius: 0.5rem;
	padding: 6px;
	transition: background-color 0.1s;
	&:hover {
		background-color: var(--button-primary-hover-bg) !important;
	}
`;

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
	align-items: center;
	margin: 5px 0;
	padding: 12px;
	border-radius: 5px;
	color: #cdd2d1;
	transition: background-color 0.1s;
	animation: ${fadeIn} 0.5s ease-out forwards;

	&:hover {
		background-color: var(--track-player-hover-left-bg);
		${Tag} {
			background-color: var(--button-primary-bg);
		}
		${MoreTagsIcon} {
			background-color: var(--button-primary-bg);
		}
	}
`;

const ImageContainer = styled.div`
	position: relative;
	cursor: pointer;
`;
const Image = styled.img`
	width: 56px;
	height: 56px;
	object-fit: cover;
	border-radius: 50%;
	margin-right: 10px;
`;
const PlayButton = styled.img`
	position: absolute;
	right: -15%;
	bottom: 15px;
	width: 32px;
	height: 32px;
`;

const Details = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: center;

	h3,
	p {
		margin: 0;
		padding: 2px 0;
	}

	h3 {
		font-size: 16px;
		color: #fff;
	}

	p {
		font-size: 12px;
		color: #cdd2d1;
	}
`;

const Info = styled.div`
	width: fit-content;
	cursor: pointer;
`;
const Tags = styled.div`
	display: flex;
	color: var(--button-secondary-c);
	border-radius: 0.5rem;
	position: relative;
	display: flex;
	align-items: center;
`;

const MoreInfoContainer = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
`;

const Artist = styled.div`
	padding: 3px 6px;
	border: 1px solid var(--button-primary-br);
	width: fit-content;
	border-radius: 0.5rem;
	&:hover {
		background-color: var(--button-primary-hover-bg);
	}
`;

const Favourite = styled.img`
	width: 16px;
	cursor: pointer;
`;

interface MusicItemProps {
	id: string;
	image: string;
	name: string;
	artist: string;
	styles: string[];
}

const TrackItem = memo(({ id, image, name, artist, styles }: MusicItemProps) => {
	const { favourites, addFavourite, removeFavourite } = useFavourites();
	const [openModalId, setOpenModalId] = useState<string | null>(null);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const isFavourited = useCallback(
		(trackId: string) => favourites.some(favourite => favourite.document.id === trackId),
		[favourites]
	);

	const handleToggleFavourite = useCallback(() => {
		if (isFavourited(id)) {
			removeFavourite(id);
		} else {
			addFavourite({ document: { id, image, name, artist, styles } });
		}
	}, [id, isFavourited, addFavourite, removeFavourite, image, name, artist, styles]);

	const handleOpenModal = useCallback(
		(tags: string[]) => {
			setSelectedTags(tags);
			setOpenModalId(currentOpenModalId => (currentOpenModalId === id ? null : id));
		},
		[id]
	);

	return (
		<Container>
			<ImageContainer onClick={() => console.log("Play song")}>
				<Image src={image} alt={name} />
				<PlayButton src={playButtonSrc} alt="Play" />
			</ImageContainer>
			<div className="space-24" />
			<Details>
				<Info>
					<h3>{name}</h3>
					<Artist>
						<p>{artist}</p>
					</Artist>
				</Info>
				<Tags>
					{styles.slice(0, 3).map(style => (
						<Tag key={style}>{style}</Tag>
					))}
					{styles.length > 3 && (
						<MoreInfoContainer onClick={() => handleOpenModal(styles)}>
							<MoreTagsIcon src={MoreInfoIconSrc} alt="More" />
							{openModalId === id && (
								<Modal selected={selectedTags} onClose={() => setOpenModalId(null)} />
							)}
						</MoreInfoContainer>
					)}
				</Tags>
			</Details>
			<div className="space-24" />
			<Favourite
				src={isFavourited(id) ? FavouriteTrue : FavouriteFalse}
				alt="Toggle Favourite"
				onClick={handleToggleFavourite}
			/>
		</Container>
	);
});

export default TrackItem;
