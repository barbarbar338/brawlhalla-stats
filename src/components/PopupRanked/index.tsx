import { FC } from "react";
import { useCredentials } from "../../libs/useCredentials";
import { useDate } from "../../libs/useDate";
import { useGlory } from "../../libs/useGlory";
import { useRanked } from "../../libs/useRanked";

export const PopupRanked: FC = () => {
	const [credentials] = useCredentials();
	const {
		isValidating: isValidatingRanked,
		revalidate: revalidateRanked,
		data: ranked,
	} = useRanked(credentials!.bhid);
	const {
		isValidating: isValidatingGlory,
		revalidate: revalidateGlory,
		data: glory,
	} = useGlory(credentials!.bhid);
	const rankedDate = useDate(ranked?.lastSynced || Date.now());
	const gloryDate = useDate(glory?.lastSynced || Date.now());

	return (
		<div>
			<h1 className="my-1 select-none">
				Ranked{" "}
				<button
					className="focus:outline-none text-white text-sm py-1 px-3 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
					onClick={() => revalidateRanked() && revalidateGlory()}
				>
					{isValidatingGlory || isValidatingRanked
						? "Syncing"
						: "Sync"}
				</button>
			</h1>
			<hr />
			<div>
				<strong>Region:</strong>{" "}
				{isValidatingRanked ? "Loading" : ranked?.region} <br />
				<strong>Games:</strong>{" "}
				{isValidatingRanked ? "Loading" : ranked?.games} <br />
				<strong>Wins:</strong>{" "}
				{isValidatingRanked ? "Loading" : ranked?.wins} (%
				{isValidatingRanked
					? "Loading"
					: ((100 * ranked!.wins) / ranked!.games).toFixed()}
				) <br />
				<strong>Loses:</strong>{" "}
				{isValidatingRanked ? "Loading" : ranked!.games - ranked!.wins}{" "}
				(%
				{isValidatingRanked
					? "Loading"
					: (
							(100 * (ranked!.games - ranked!.wins)) /
							ranked!.games
					  ).toFixed()}
				) <br />
				<strong>ELO:</strong>{" "}
				{isValidatingRanked ? "Loading" : ranked?.tier} <br />
				<strong>Peak:</strong>{" "}
				{isValidatingRanked ? "Loading" : ranked?.peak_rating} <br />
				<strong>Tier:</strong>{" "}
				{isValidatingRanked ? "Loading" : ranked?.tier} <br />
				<strong>Best Teammate:</strong>{" "}
				{isValidatingRanked
					? "Loading"
					: ranked!["2v2"]
							.sort((a, b) => b.rating - a.rating)[0]
							.teamname.replace(ranked!.name, "")
							.replace("+", "")}{" "}
				<br />
				<strong>Team ELO:</strong>{" "}
				{isValidatingRanked
					? "Loading"
					: ranked!["2v2"].sort((a, b) => b.rating - a.rating)[0]
							.rating}{" "}
				<br />
				<strong>Team Tier:</strong>{" "}
				{isValidatingRanked
					? "Loading"
					: ranked!["2v2"].sort((a, b) => b.rating - a.rating)[0]
							.tier}{" "}
				<br />
				<strong>Estimated Glory:</strong>{" "}
				{isValidatingGlory
					? "Loading"
					: glory!.glory.rating + glory!.glory.wins}{" "}
				<br />
				<strong>Most Wins:</strong>{" "}
				{isValidatingRanked
					? "Loading"
					: ranked?.legends.sort((a, b) => b.wins - a.wins)[0]
							.legend_name_key}{" "}
				<br />
				<strong>Most Used:</strong>{" "}
				{isValidatingRanked
					? "Loading"
					: ranked?.legends.sort((a, b) => b.games - a.games)[0]
							.legend_name_key}{" "}
				<br />
				<strong>Best Legend:</strong>{" "}
				{isValidatingRanked
					? "Loading"
					: ranked?.legends.sort(
							(a, b) =>
								(100 * b.wins) / b.games -
								(100 * a.wins) / a.games,
					  )[0].legend_name_key}{" "}
				<br />
				<strong>Highest Legend:</strong>{" "}
				{isValidatingRanked
					? "Loading"
					: ranked?.legends.sort(
							(a: any, b: any) => b.rating - a.rating,
					  )[0].legend_name_key}{" "}
				<br />
				<strong>Ranked Last Sync:</strong>{" "}
				{isValidatingRanked ? "Loading" : rankedDate} <br />
				<strong>Glory Last Sync:</strong>{" "}
				{isValidatingGlory ? "Loading" : gloryDate} <br />
			</div>
		</div>
	);
};
