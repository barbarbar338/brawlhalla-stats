export {};

declare global {
	namespace BrawlhallaStats {
		interface IPlayerStats {
			brawlhalla_id: number;
			name: string;
			xp: number;
			level: number;
			xp_percentage: number;
			games: number;
			wins: number;
			damagebomb: string;
			damagemine: string;
			damagespikeball: string;
			damagesidekick: string;
			hitsnowball: number;
			kobomb: number;
			komine: number;
			kospikeball: number;
			kosidekick: number;
			kosnowball: number;
			legends: ILegendStats[];
			clan: IPlayerClan | undefined;
			lastSynced: number;
		}
		export interface IPlayerClan {
			clan_name: string;
			clan_id: number;
			clan_xp: string;
			personal_xp: number;
		}
		interface ILegendStats {
			legend_id: number;
			legend_name_key: string;
			damagedealt: string;
			damagetaken: string;
			kos: number;
			falls: number;
			suicides: number;
			teamkos: number;
			matchtime: number;
			games: number;
			wins: number;
			damageunarmed: string;
			damagethrownitem: string;
			damageweaponone: string;
			damageweapontwo: string;
			damagegadgets: string;
			kounarmed: number;
			kothrownitem: number;
			koweaponone: number;
			koweapontwo: number;
			kogadgets: number;
			timeheldweaponone: number;
			timeheldweapontwo: number;
			xp: number;
			level: number;
			xp_percentage: number;
		}
		interface IPlayerRanked extends IPlayerSeason {
			name: string;
			brawlhalla_id: number;
			global_rank: number;
			region_rank: number;
			legends: ILegendRanked[];
			"2v2": I2v2Team[];
			lastSynced: number;
		}
		interface IPlayerSeason {
			rating: number;
			peak_rating: number;
			tier: RankedTier;
			wins: number;
			games: number;
			region: RankedRegion;
		}
		interface ILegendRanked {
			legend_id: number;
			legend_name_key: string;
			rating: number;
			peak_rating: number;
			tier: RankedTier;
			wins: number;
			games: number;
		}
		interface I2v2Team {
			brawlhalla_id_one: number;
			brawlhalla_id_two: number;
			rating: number;
			peak_rating: number;
			tier: RankedTier;
			wins: number;
			games: number;
			teamname: string;
			region: RankedRegion;
			global_rank: number;
		}
		interface IGloryData {
			brawlhalla_id: number;
			name: string;
			bestElo: number;
			eloReset: number;
			glory: {
				wins: number;
				rating: number;
			};
			lastSynced: number;
		}
		type RankedTier =
			| "Diamond"
			| "Platinum 5"
			| "Platinum 4"
			| "Platinum 3"
			| "Platinum 2"
			| "Platinum 1"
			| "Gold 5"
			| "Gold 4"
			| "Gold 3"
			| "Gold 2"
			| "Gold 1"
			| "Gold 0"
			| "Silver 5"
			| "Silver 4"
			| "Silver 3"
			| "Silver 2"
			| "Silver 1"
			| "Silver 0"
			| "Bronze 5"
			| "Bronze 4"
			| "Bronze 3"
			| "Bronze 2"
			| "Bronze 1"
			| "Bronze 0"
			| "Tin 5"
			| "Tin 4"
			| "Tin 3"
			| "Tin 2"
			| "Tin 1"
			| "Tin 0";
		type RankedRegion =
			| "all"
			| "ALL"
			| "us-e"
			| "US-E"
			| "eu"
			| "EU"
			| "sea"
			| "SEA"
			| "brz"
			| "BRZ"
			| "aus"
			| "AUS"
			| "us-w"
			| "US-W"
			| "jpn"
			| "JPN";
	}
}
