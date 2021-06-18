import { FC } from "react";
import {
	IoTrophyOutline,
	IoRibbonOutline,
	IoCashOutline,
	IoAlertCircleOutline,
} from "react-icons/io5";
import { useCredentials } from "../../libs/useCredentials";
import { useDate } from "../../libs/useDate";
import { useGlory } from "../../libs/useGlory";

export const Glory: FC = () => {
	const [credentials] = useCredentials();
	const { isValidating, data, revalidate } = useGlory(credentials!.bhid);
	const date = useDate(data?.lastSynced || Date.now());

	return (
		<div className="container mx-auto px-6 py-8">
			<h3 className="text-gray-700 text-3xl font-medium">
				Glory{" "}
				<button
					className="focus:outline-none text-white py-1 px-3 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
					onClick={revalidate}
				>
					{isValidating ? "Syncing" : "Sync"}
				</button>{" "}
				{!isValidating && (
					<span className="text-xs">(Last Sync: {date})</span>
				)}
			</h3>
			<div className="mt-4">
				<div className="flex flex-wrap -mx-6">
					<div className="w-full px-6 sm:w-1/2 xl:w-1/4">
						<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
							<div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
								<IoCashOutline className="h-8 w-8 text-white" />
							</div>
							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{isValidating
										? "Loading"
										: data!.glory.wins + data!.glory.rating}
								</h4>
								<div className="text-gray-500">
									Estimated Glory
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
									{isValidating
										? "Loading"
										: data!.glory.wins}
								</h4>
								<div className="text-gray-500">
									Wins{" "}
									{!isValidating &&
										`(${(
											(100 * data!.glory.wins) /
											(data!.glory.wins +
												data!.glory.rating)
										).toFixed()}%)`}
								</div>
							</div>
						</div>
					</div>
					<div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/4 xl:mt-0">
						<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
							<div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
								<IoRibbonOutline className="h-8 w-8 text-white" />
							</div>
							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{isValidating
										? "Loading"
										: data!.glory.rating}
								</h4>
								<div className="text-gray-500">
									Rating{" "}
									{!isValidating &&
										`(${(
											(100 * data!.glory.rating) /
											(data!.glory.wins +
												data!.glory.rating)
										).toFixed()}%)`}
								</div>
							</div>
						</div>
					</div>
					<div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/4 xl:mt-0">
						<div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
							<div className="p-3 rounded-full bg-red-600 bg-opacity-75">
								<IoAlertCircleOutline className="h-8 w-8 text-white" />
							</div>
							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{isValidating ? "Loading" : data?.eloReset}
								</h4>
								<div className="text-gray-500">ELO Reset</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
