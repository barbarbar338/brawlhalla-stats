import { FC, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useCredentials } from "../libs/useCredentials";
import { Redirect } from "react-router-dom";
import { Stats } from "../components/Stats";
import { Ranked } from "../components/Ranked";
import { Glory } from "../components/Glory";

export const StatsPage: FC = () => {
	const [credentials] = useCredentials();
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (!credentials || !credentials.bhid) setRedirect(true);
	}, [credentials]);

	return redirect ? (
		<Redirect to="/" />
	) : (
		<Layout>
			<div className="flex bg-gray-200">
				<div className="flex-1 flex flex-col">
					<main className="flex-1">
						<Stats />
						<Glory />
						<Ranked />
					</main>
				</div>
			</div>
		</Layout>
	);
};
