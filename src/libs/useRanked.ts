import { useAPI } from "./useAPI";

export const useRanked = (id: string) => {
	return useAPI<BrawlhallaStats.IPlayerRanked>(
		`ranked_id_brawlhalla_id_${id}`,
		`ranked/id?brawlhalla_id=${id}`,
	);
};
