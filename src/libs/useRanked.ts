import { useEffect, useState } from "react";

export const useRanked = (
	id?: string,
): [
	boolean,
	BrawlhallaStats.IPlayerRanked | undefined,
	() => Promise<void>,
] => {
	const [ranked, setRanked] = useState<BrawlhallaStats.IPlayerRanked>();
	const [loading, setLoading] = useState(true);

	const fetchRanked = async (bhid: string): Promise<void> => {
		setLoading(true);
		const res = await fetch(
			`https://brawlhalla-api.herokuapp.com/v1/ranked/id?brawlhalla_id=${bhid}`,
		);
		const body = await res.json();
		setRanked(body.data);
		setLoading(false);
	};

	useEffect(() => {
		if (id) fetchRanked(id as string);
	}, [id]);

	return [loading, ranked, () => fetchRanked(id as string)];
};
