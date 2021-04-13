import { FC, useEffect, useState } from "react";
import Amethyst from "../../assets/amethyst.png";
import {
	IoExpandOutline,
	IoContractOutline,
	IoCloseOutline,
	IoRemove,
} from "react-icons/io5";

const { remote } = window.require("electron");

export const Layout: FC = ({ children }) => {
	const currentWindow = remote.getCurrentWindow();
	const [maximized, setMaximized] = useState(currentWindow.isMaximized());

	useEffect(() => {
		const icon = document.getElementById("icon") as HTMLElement;
		icon.ondragstart = () => false;
	});

	const onMinimize = () => currentWindow.minimize();
	const onMaximize = () => {
		setMaximized(!currentWindow.isMaximized());
		currentWindow.isMaximized()
			? currentWindow.unmaximize()
			: currentWindow.maximize();
	};
	const onQuit = () => remote.app.quit();

	return (
		<>
			<div className="title-bar sticky top-0 select-none">
				<div className="menu-button-container">
					<img
						id="icon"
						src={Amethyst}
						className="menu-icon select-none"
						alt="amethyst"
					/>
				</div>
				<div className="app-name-container select-none">
					<p>Brawlhalla Stats</p>
				</div>
				<div className="window-controls-container">
					<button
						className="minimize-button focus:outline-none hover:bg-gray-700"
						onClick={onMinimize}
					>
						<IoRemove />
					</button>
					<button
						className="min-max-button focus:outline-none hover:bg-gray-700"
						onClick={onMaximize}
					>
						{maximized ? (
							<IoContractOutline />
						) : (
							<IoExpandOutline />
						)}
					</button>
					<button
						className="close-button focus:outline-none hover:bg-gray-700"
						onClick={onQuit}
					>
						<IoCloseOutline />
					</button>
				</div>
			</div>
			<div className="select-none">{children}</div>
		</>
	);
};
