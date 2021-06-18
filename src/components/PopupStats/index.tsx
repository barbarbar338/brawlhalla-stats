import { FC } from "react";
import { useCredentials } from "../../libs/useCredentials";
import { useDate } from "../../libs/useDate";
import { useStats } from "../../libs/useStats";

export const PopupStats: FC = () => {
	const [credentials] = useCredentials();
	const { isValidating, revalidate, data } = useStats(credentials!.bhid);
	const date = useDate(data?.lastSynced || Date.now());

	return (
		<div>
			<h1 className="mb-1">
				Stats{" "}
				<button
					className="focus:outline-none text-white text-sm py-1 px-3 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
					onClick={revalidate}
				>
					{isValidating ? "Syncing" : "Sync"}
				</button>{" "}
			</h1>
			<hr />
			<div className="mt-1">
				<strong>Name:</strong> {isValidating ? "Loading" : data?.name}{" "}
				<br />
				<strong>Clan:</strong>{" "}
				{isValidating ? "Loading" : data?.clan?.clan_name} <br />
				<strong>Games:</strong> {isValidating ? "Loading" : data?.games}{" "}
				<br />
				<strong>Wins:</strong> {isValidating ? "Loading" : data?.wins}{" "}
				(%
				{isValidating
					? "Loading"
					: ((100 * data!.wins) / data!.games).toFixed()}
				) <br />
				<strong>Loses:</strong>{" "}
				{isValidating ? "Loading" : data!.games - data!.wins} (%
				{isValidating
					? "Loading"
					: (
							(100 * (data!.games - data!.wins)) /
							data!.games
					  ).toFixed()}
				) <br />
				<strong>Level:</strong> {isValidating ? "Loading" : data?.level}{" "}
				(%
				{isValidating ? "Loading" : data?.xp_percentage.toFixed()}){" "}
				<br />
				<strong>Most Used:</strong>{" "}
				{isValidating
					? "Loading"
					: data?.legends.sort(
							(a: any, b: any) => b.games - a.games,
					  )[0].legend_name_key}{" "}
				<br />
				<strong>Most Wins:</strong>{" "}
				{isValidating
					? "Loading"
					: data?.legends.sort((a: any, b: any) => b.wins - a.wins)[0]
							.legend_name_key}{" "}
				<br />
				<strong>Best Legend:</strong>{" "}
				{isValidating
					? "Loading"
					: data?.legends.sort(
							(a: any, b: any) =>
								(100 * b.wins) / b.games -
								(100 * a.wins) / a.games,
					  )[0].legend_name_key}{" "}
				<br />
				<strong>Last Sync:</strong> {isValidating ? "Loading" : date}{" "}
				<br />
			</div>
		</div>
	);
};
