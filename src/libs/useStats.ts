import { useEffect, useState } from "react";

export const useStats = (
	id?: string,
): [boolean, BrawlhallaStats.IPlayerStats | undefined, () => Promise<void>] => {
	const [stats, setStats] = useState<BrawlhallaStats.IPlayerStats>();
	const [loading, setLoading] = useState(true);

	const fetchStats = async (bhid: string): Promise<void> => {
		setLoading(true);
		const res = await fetch(
			`https://brawlhalla-api.herokuapp.com/v1/stats/id?brawlhalla_id=${bhid}`,
		);
		const body = await res.json();
		setStats(body.data);
		setLoading(false);
	};

	useEffect(() => {
		if (id) fetchStats(id as string);
	}, [id]);

	return [loading, stats, () => fetchStats(id as string)];
};
