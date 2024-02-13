import { useState, useEffect } from "react";

interface SearchResult {
	document: {
		artist: string;
		id: string;
		image: string;
		name: string;
		styles: string[];
	};
}

interface ApiResponse {
	found: number;
	hits: SearchResult[];
}

const useSearch = (searchTerm: string, type: string, page: number) => {
	const [results, setResults] = useState<ApiResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			if (!searchTerm) {
				setResults(null);
				return;
			}
			setLoading(true);

			const params = new URLSearchParams({
				q: searchTerm,
				query_by: "name",
				collection: type,
				page: page.toString(),
				per_page: "5",
			});

			try {
				const response = await fetch(
					`https://3feynu8vjgbqkl27p.a1.typesense.net/collections/tracks/documents/search?${params}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"X-TYPESENSE-API-KEY": "MqZdBn4VL8k7IqhuMKOSNuBxmU0isNLk",
						},
					}
				);
				const data: ApiResponse = await response.json();
				setResults(data);
			} catch (error) {
				console.error("Failed to fetch data:", error);
				setResults(null);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [searchTerm, type, page]);

	return { results, loading };
};

export default useSearch;
