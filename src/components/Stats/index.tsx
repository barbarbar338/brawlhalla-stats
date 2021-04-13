import { FC } from "react";
import {
	IoAmericanFootballOutline,
	IoSchoolOutline,
	IoSkullOutline,
	IoTrophyOutline,
} from "react-icons/io5";
import { useCredentials } from "../../libs/useCredentials";
import { useDate } from "../../libs/useDate";
import { useStats } from "../../libs/useStats";

export const Stats: FC = () => {
	const [credentials] = useCredentials();
	const [loading, stats, fetchStats] = useStats(credentials?.bhid);
	const date = useDate(stats?.lastSynced || Date.now());

	return (
		<div className="container mx-auto px-6 py-8">
			<h3 className="text-gray-700 text-3xl font-medium">
				Stats{" "}
				<button
					className="focus:outline-none text-white py-1 px-3 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
					onClick={fetchStats}
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
									{loading ? "Loading" : stats?.games}
								</h4>
								<div className="text-gray-500">Games</div>
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
									{loading ? "Loading" : stats?.wins}
								</h4>
								<div className="text-gray-500">
									Wins{" "}
									{!loading &&
										`(${(
											(100 * stats!.wins) /
											stats!.games
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
										: stats!.games - stats!.wins}
								</h4>
								<div className="text-gray-500">
									Loses{" "}
									{!loading &&
										`(${(
											(100 *
												(stats!.games - stats!.wins)) /
											stats!.games
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
									{loading ? "Loading" : stats?.level}
								</h4>
								<div className="text-gray-500">
									Level{" "}
									{!loading &&
										`(${stats!.xp_percentage.toFixed()}%)`}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
