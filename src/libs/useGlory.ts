import { useEffect, useState } from "react";

export const useGlory = (
	id?: string,
): [boolean, BrawlhallaStats.IGloryData | undefined, () => Promise<void>] => {
	const [glory, setGlory] = useState<BrawlhallaStats.IGloryData>();
	const [loading, setLoading] = useState(true);

	const fetchGlory = async (bhid: string): Promise<void> => {
		setLoading(true);
		const res = await fetch(
			`https://brawlhalla-api.herokuapp.com/v1/glory/id?brawlhalla_id=${bhid}`,
		);
		const body = await res.json();
		setGlory(body.data);
		setLoading(false);
	};

	useEffect(() => {
		if (id) fetchGlory(id as string);
	}, [id]);

	return [loading, glory, () => fetchGlory(id as string)];
};
