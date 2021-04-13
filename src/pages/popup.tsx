import { FC, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useCredentials } from "../libs/useCredentials";

export const PopupPage: FC = () => {
	const [credentials] = useCredentials();
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (credentials?.bhid) setRedirect(true);
	}, [credentials]);

	return redirect ? (
		<Redirect to="/popup/stats" />
	) : (
		<div className="select-none m-5">
			<ul>
				<li>1. Go to application and claim your profile</li>
				<li>
					2. After claiming your profile, use "ctrl + R" combination
					to reload this window.
				</li>
			</ul>
		</div>
	);
};
