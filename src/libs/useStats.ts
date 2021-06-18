import { useAPI } from "./useAPI";

export const useStats = (id: string) => {
	return useAPI<BrawlhallaStats.IPlayerStats>(
		`stats_id_brawlhalla_id_${id}`,
		`stats/id?brawlhalla_id=${id}`,
	);
};
