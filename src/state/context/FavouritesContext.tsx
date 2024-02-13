import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchResult {
	document: {
		artist: string;
		id: string;
		image: string;
		name: string;
		styles: string[];
	};
}

interface FavouritesContextType {
	favourites: SearchResult[];
	addFavourite: (track: SearchResult) => void;
	removeFavourite: (trackId: string) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

interface FavouritesProviderProps {
	children: ReactNode;
}

export const FavouritesProvider = ({ children }: FavouritesProviderProps) => {
	const [favourites, setFavourites] = useState<SearchResult[]>([]);

	const addFavourite = (track: SearchResult) => {
		setFavourites(prev => [...prev, track]);
	};

	const removeFavourite = (trackId: string) => {
		setFavourites(prev => prev.filter(track => track.document.id !== trackId));
	};

	return (
		<FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
			{children}
		</FavouritesContext.Provider>
	);
};

export const useFavourites = (): FavouritesContextType => {
	const context = useContext(FavouritesContext);
	if (context === undefined) {
		throw new Error("useFavourites must be used within a FavouritesProvider");
	}
	return context;
};
