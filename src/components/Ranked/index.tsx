import { FC } from "react";
import {
	IoAmericanFootballOutline,
	IoSchoolOutline,
	IoSkullOutline,
	IoTrophyOutline,
} from "react-icons/io5";
import { useCredentials } from "../../libs/useCredentials";
import { useDate } from "../../libs/useDate";
import { useRanked } from "../../libs/useRanked";

export const Ranked: FC = () => {
	const [credentials] = useCredentials();
	const [loading, ranked, fetchRanked] = useRanked(credentials?.bhid);
	const date = useDate(ranked?.lastSynced || Date.now());

	return (
		<div className="container mx-auto px-6 py-8">
			<h3 className="text-gray-700 text-3xl font-medium">
				Ranked{" "}
				<button
					className="focus:outline-none text-white py-1 px-3 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
					onClick={fetchRanked}
				>
					{loading ? "Syncing" : "Sync"}
				</button>{" "}
				{!loading && (
					<span className="text-xs">(Last Sync: {date})</span>
				)}
			</h3>
			<div className="mt-4">
				<div className="flex flex-wrap -mx-6">
					<div className="w-full px-6 sm:w-1/2 xl:w-1/4">
						<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
							<div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
								<IoAmericanFootballOutline className="h-8 w-8 text-white" />
							</div>
							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{loading ? "Loading" : ranked?.games}
								</h4>
								<div className="text-gray-500">
									Games {!loading && `(${ranked?.tier})`}
								</div>
							</div>
						</div>
					</div>
					<div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/4 sm:mt-0">
						<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
							<div className="p-3 rounded-full bg-yellow-600 bg-opacity-75">
								<IoTrophyOutline className="h-8 w-8 text-white" />
							</div>
							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{loading ? "Loading" : ranked?.wins}
								</h4>
								<div className="text-gray-500">
									Wins{" "}
									{!loading &&
										`(${(
											(100 * ranked!.wins) /
											ranked!.games
										).toFixed()}%)`}
								</div>
							</div>
						</div>
					</div>
					<div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/4 xl:mt-0">
						<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
							<div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
								<IoSkullOutline className="h-8 w-8 text-white" />
							</div>
							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{loading
										? "Loading"
										: ranked!.games - ranked!.wins}
								</h4>
								<div className="text-gray-500">
									Loses{" "}
									{!loading &&
										`(${(
											(100 *
												(ranked!.games -
													ranked!.wins)) /
											ranked!.games
										).toFixed()}%)`}
								</div>
							</div>
						</div>
					</div>
					<div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/4 xl:mt-0">
						<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
							<div className="p-3 rounded-full bg-blue-600 bg-opacity-75">
								<IoSchoolOutline className="h-8 w-8 text-white" />
							</div>
							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{loading ? "Loading" : ranked?.rating}
								</h4>
								<div className="text-gray-500">
									ELO{" "}
									{!loading &&
										`(Peak: ${ranked?.peak_rating})`}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-8"></div>
			<div className="flex flex-col mt-8">
				<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
						<table className="min-w-full">
							<thead>
								<tr>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										Player 1
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										Player 2
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										ELO
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										Peak ELO
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										Tier
									</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								{loading ? (
									<tr>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											Loading
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											Loading
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											Loading
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											Loading
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											Loading
										</td>
									</tr>
								) : (
									ranked?.["2v2"]
										.sort((a, b) => b.rating - a.rating)
										.map((team, idx) => (
											<tr key={idx}>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													{
														team.teamname.split(
															"+",
														)[0]
													}
												</td>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													{
														team.teamname.split(
															"+",
														)[1]
													}
												</td>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													{team.rating}
												</td>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													{team.peak_rating}
												</td>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													{team.tier}
												</td>
											</tr>
										))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div className="flex flex-col mt-8">
				<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
						<table className="min-w-full">
							<thead>
								<tr>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										Legend
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										Wins
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										ELO
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										Peak ELO
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										Tier
									</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								{loading ? (
									<tr>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											Loading
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											Loading
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											Loading
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											Loading
										</td>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											Loading
										</td>
									</tr>
								) : (
									ranked?.legends
										.sort((a, b) => b.rating - a.rating)
										.map((legend, idx) => (
											<tr key={idx}>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													{legend.legend_name_key}
												</td>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													{legend.wins}
												</td>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													{legend.rating}
												</td>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													{legend.peak_rating}
												</td>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													{legend.tier}
												</td>
											</tr>
										))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
