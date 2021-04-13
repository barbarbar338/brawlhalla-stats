import { FC } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import { IndexPage } from "./pages";
import { PopupPage } from "./pages/popup";
import { PopupStatsPage } from "./pages/popupStats";
import { StatsPage } from "./pages/stats";

export const Router: FC = () => {
	return (
		<HashRouter>
			<Switch>
				<Route exact path="/">
					<IndexPage />
				</Route>
				<Route path="/stats">
					<StatsPage />
				</Route>
				<Route exact path="/popup">
					<PopupPage />
				</Route>
				<Route exact path="/popup/stats">
					<PopupStatsPage />
				</Route>
			</Switch>
		</HashRouter>
	);
};
