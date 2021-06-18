import { useAPI } from "./useAPI";

export const useGlory = (id: string) => {
	return useAPI<BrawlhallaStats.IGloryData>(
		`glory_id_brawlhalla_id_${id}`,
		`glory/id?brawlhalla_id=${id}`,
	);
};
