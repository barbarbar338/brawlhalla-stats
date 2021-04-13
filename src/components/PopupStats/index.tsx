import { FC } from "react";
import { useCredentials } from "../../libs/useCredentials";
import { useDate } from "../../libs/useDate";
import { useStats } from "../../libs/useStats";

export const PopupStats: FC = () => {
	const [credentials] = useCredentials();
	const [loading, stats, fetchStats] = useStats(credentials?.bhid);
	const date = useDate(stats?.lastSynced || Date.now());

	return (
		<div>
			<h1 className="mb-1">
				Stats{" "}
				<button
					className="focus:outline-none text-white text-sm py-1 px-3 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
					onClick={fetchStats}
				>
					{loading ? "Syncing" : "Sync"}
				</button>{" "}
			</h1>
			<hr />
			<div className="mt-1">
				<strong>Name:</strong> {loading ? "Loading" : stats?.name}{" "}
				<br />
				<strong>Clan:</strong>{" "}
				{loading ? "Loading" : stats?.clan?.clan_name} <br />
				<strong>Games:</strong> {loading ? "Loading" : stats?.games}{" "}
				<br />
				<strong>Wins:</strong> {loading ? "Loading" : stats?.wins} (%
				{loading
					? "Loading"
					: ((100 * stats!.wins) / stats!.games).toFixed()}
				) <br />
				<strong>Loses:</strong>{" "}
				{loading ? "Loading" : stats!.games - stats!.wins} (%
				{loading
					? "Loading"
					: (
							(100 * (stats!.games - stats!.wins)) /
							stats!.games
					  ).toFixed()}
				) <br />
				<strong>Level:</strong> {loading ? "Loading" : stats?.level} (%
				{loading ? "Loading" : stats?.xp_percentage.toFixed()}) <br />
				<strong>Most Used:</strong>{" "}
				{loading
					? "Loading"
					: stats?.legends.sort(
							(a: any, b: any) => b.games - a.games,
					  )[0].legend_name_key}{" "}
				<br />
				<strong>Most Wins:</strong>{" "}
				{loading
					? "Loading"
					: stats?.legends.sort(
							(a: any, b: any) => b.wins - a.wins,
					  )[0].legend_name_key}{" "}
				<br />
				<strong>Best Legend:</strong>{" "}
				{loading
					? "Loading"
					: stats?.legends.sort(
							(a: any, b: any) =>
								(100 * b.wins) / b.games -
								(100 * a.wins) / a.games,
					  )[0].legend_name_key}{" "}
				<br />
				<strong>Last Sync:</strong> {loading ? "Loading" : date} <br />
			</div>
		</div>
	);
};
