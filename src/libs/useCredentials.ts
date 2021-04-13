import { Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "react-use";

export interface ICredentials {
	bhid: string;
}

export const useCredentials = (): [
	ICredentials | undefined,
	Dispatch<SetStateAction<ICredentials | undefined>>,
] => {
	const [credentials, setCredentials] = useLocalStorage<ICredentials>(
		"brawlhalla_stats_credentials",
	);
	return [credentials, setCredentials];
};
