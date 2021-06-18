import { FC, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { PopupRanked } from "../components/PopupRanked";
import { PopupStats } from "../components/PopupStats";
import { useCredentials } from "../libs/useCredentials";

const { shell } = window.require("electron");

export const PopupStatsPage: FC = () => {
	const [credentials] = useCredentials();
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (!credentials || !credentials.bhid) setRedirect(true);
	}, [credentials]);

	const onAPIClick = () => {
		shell.openExternal("https://brawlhalla.vercel.app/");
	};

	return redirect ? (
		<Redirect to="/popup" />
	) : (
		<div className="m-3 text-sm select-none">
			<PopupStats />
			<PopupRanked />
			<div className="mt-5 text-xs">
				<hr />
				<p className="mt-3">
					We are using an{" "}
					<button
						className="text-blue-500 focus:outline-none"
						onClick={onAPIClick}
					>
						external API
					</button>{" "}
					to fetch your stats and ranked data. The reason it does not
					appear here when you make an update on your profile is that
					the API we use updates the data every 15 minutes. To see the
					changes in your profile here, wait 15 minutes and then use
					the "Sync" button.
				</p>
			</div>
		</div>
	);
};
